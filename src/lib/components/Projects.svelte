<script>
  import { onDestroy } from "svelte";

  let {
    title,
    subtitle,
    eyebrow = "",
    projects = [],
    loadMoreCopy = "Want to see more",
    loadMoreText = "Load more projects",
    loadMoreAria = "Load more projects",
    viewProjectText = "LIVE SITE",
    viewDetailsText = "View Details",
    viewDetailsLink = "featured-project/",
    projectTagsLabel = "Project services",
    defaultProjectTags = [
      "Web design",
      "WordPress",
      "Webshop",
      "+1 year support",
    ],
  } = $props();

  /*
   * 7 projects + Load More = 8 cards on initial load.
   * Every click adds 2 projects.
   *
   * Performance change:
   * only the projects the visitor can actually see are rendered.
   * Previously all 19 cards existed in the DOM and the remaining
   * cards were hidden with CSS.
   */
  let visibleCount = $state(7);
  let headerVisible = $state(false);
  let expandedProjectDescription = $state(0);

  /*
   * =========================================================
   * SCROLL PREVIEW STATE
   * =========================================================
   *
   * Only one project preview may be active at any time.
   *
   * The component does NOT know which project is Eva, reSOMA,
   * Baldauf, etc.
   *
   * It simply checks:
   *
   * project.scrollImage
   *
   * That property will be supplied from projects.js /
   * projects-en.js.
   */
  let activePreviewIndex = $state(null);

  let previewResetTimer = null;

  let initialPreviewPlayed = false;

  /*
   * Mobile projects automatically preview only once per
   * page visit.
   */
  const mobilePreviewPlayed = new Set();

  const LOAD_MORE_COUNT = 2;

  /*
   * Default duration of the website screenshot scroll.
   */
  const PREVIEW_DURATION_MS = 11000;

  /*
   * Small pause after reaching the footer before the automatic
   * preview returns to the normal thumbnail.
   */
  const PREVIEW_END_PAUSE_MS = 900;

  /*
   * A tiny transparent pixel prevents the browser from downloading
   * the real project image too early.
   */
  const EMPTY_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  function cleanNumber(value) {
    return String(value ?? "")
      .replace(/\//g, "")
      .trim();
  }

  function normalizeLink(url) {
    const value = String(url ?? "").trim();

    if (!value) return "#";

    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("mailto:") ||
      value.startsWith("tel:") ||
      value.startsWith("/") ||
      value.startsWith("#")
    ) {
      return value;
    }

    return `https://${value}`;
  }

  function getAccent(index) {
    const accents = [
      "#1b2d2a",
      "#2b2334",
      "#2c2920",
      "#1f2a36",
      "#2f2323",
      "#1f3027",
    ];

    return accents[index % accents.length];
  }

  function getDescription(project) {
    return (
      project.description ||
      "A selected project showcasing thoughtful design, structure, and visual clarity."
    );
  }

  function getProjectTags(project) {
    const projectTags = Array.isArray(project?.tags) ? project.tags : [];

    const tags = projectTags.length ? projectTags : defaultProjectTags;

    return tags.filter(Boolean).slice(0, 4);
  }

  /*
   * A project supports the website-scroll preview only when
   * its project data explicitly contains:
   *
   * scrollImage: "/images/example.webp"
   */
  function hasScrollPreview(project) {
    return Boolean(String(project?.scrollImage ?? "").trim());
  }

  /*
   * Used to remember which mobile projects have already
   * automatically previewed.
   */
  function getProjectPreviewKey(project, index) {
    return String(project?.link || project?.title || project?.number || index);
  }

  /*
   * =========================================================
   * DEVICE CAPABILITY HELPERS
   * =========================================================
   */

  function hasFineHover() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function isMobileLayout() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(max-width: 767px)").matches;
  }

  function prefersReducedMotion() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /*
   * =========================================================
   * PREVIEW CONTROL
   * =========================================================
   */

  function clearPreviewResetTimer() {
    if (previewResetTimer) {
      clearTimeout(previewResetTimer);
      previewResetTimer = null;
    }
  }

  function stopPreview(index = null) {
    clearPreviewResetTimer();

    if (index === null || activePreviewIndex === index) {
      activePreviewIndex = null;
    }
  }

  function startPreview(project, index, { autoReset = false } = {}) {
    if (!hasScrollPreview(project)) return;

    if (prefersReducedMotion()) return;

    clearPreviewResetTimer();

    /*
     * Reset first if the same card is being restarted.
     *
     * This allows a touch user to replay the animation.
     */
    if (activePreviewIndex === index) {
      activePreviewIndex = null;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activePreviewIndex = index;
        });
      });
    } else {
      activePreviewIndex = index;
    }

    if (autoReset) {
      previewResetTimer = setTimeout(() => {
        if (activePreviewIndex === index) {
          activePreviewIndex = null;
        }

        previewResetTimer = null;
      }, PREVIEW_DURATION_MS + PREVIEW_END_PAUSE_MS);
    }
  }

  /*
   * =========================================================
   * DESKTOP
   *
   * Desktop mouse hover controls project previews.
   * =========================================================
   */

  function handlePreviewEnter(project, index) {
    if (!hasScrollPreview(project)) return;

    if (!hasFineHover()) return;

    startPreview(project, index);
  }

  function handlePreviewLeave(project, index) {
    if (!hasScrollPreview(project)) return;

    if (!hasFineHover()) return;

    stopPreview(index);
  }

  /*
   * =========================================================
   * TOUCH
   *
   * Tablet uses tap because it still has two columns but does
   * not have a reliable hover state.
   *
   * Mobile can also be tapped to manually replay a preview.
   * =========================================================
   */

  function handlePreviewClick(project, index) {
    if (!hasScrollPreview(project)) return;

    /*
     * Desktop is controlled entirely by hover.
     */
    if (hasFineHover()) return;

    /*
     * Tapping an already running preview stops it.
     */
    if (activePreviewIndex === index) {
      stopPreview(index);
      return;
    }

    startPreview(project, index, {
      autoReset: true,
    });
  }

  /*
   * Keyboard users can activate the website preview using
   * Enter or Space.
   */
  function handlePreviewKeydown(event, project, index) {
    if (!hasScrollPreview(project)) return;

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    if (activePreviewIndex === index) {
      stopPreview(index);
      return;
    }

    startPreview(project, index, {
      autoReset: true,
    });
  }

  /*
   * =========================================================
   * HEADER OBSERVER
   * =========================================================
   */

  function observeHeader(node) {
    if (typeof IntersectionObserver === "undefined") {
      headerVisible = true;

      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerVisible = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  /*
   * =========================================================
   * PROJECT IMAGE LAZY LOADER
   * =========================================================
   *
   * The real image starts loading 500px before the image enters
   * the viewport.
   *
   * This action is used by both:
   *
   * - project.image
   * - project.scrollImage
   */
  function observeProjectImage(node, imageUrl) {
    let currentUrl = imageUrl;
    let observer;

    function loadImage(url = currentUrl) {
      if (!url || node.dataset.imageLoaded === "true") {
        return;
      }

      node.dataset.imageLoaded = "true";
      node.src = url;
    }

    if (typeof IntersectionObserver === "undefined") {
      loadImage();

      return {
        update(nextUrl) {
          currentUrl = nextUrl;

          if (node.dataset.imageLoaded === "true" && nextUrl) {
            node.src = nextUrl;
          }
        },

        destroy() {},
      };
    }

    observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          loadImage();
          observer.disconnect();
        }
      },
      {
        threshold: 0.01,
        rootMargin: "500px 0px",
      },
    );

    observer.observe(node);

    return {
      update(nextUrl) {
        currentUrl = nextUrl;

        if (node.dataset.imageLoaded === "true" && nextUrl) {
          node.src = nextUrl;
        }
      },

      destroy() {
        observer?.disconnect();
      },
    };
  }

  /*
   * =========================================================
   * PROJECT LIST
   * =========================================================
   */

  const hasMoreProjects = $derived(visibleCount < projects.length);

  /*
   * Rendering only the visible projects reduces initial DOM
   * size while preserving the existing Load More behaviour.
   */
  const visibleProjects = $derived(
    projects.slice(0, Math.min(visibleCount, projects.length)),
  );

  const visibleProgress = $derived(
    `${Math.min(visibleCount, projects.length)}/${projects.length}`,
  );

  /*
   * The first project that actually contains a scrollImage is
   * the automatic demonstration project.
   *
   * This is deliberately NOT hardcoded to array position 0.
   */
  const firstPreviewIndex = $derived(
    visibleProjects.findIndex((project) => hasScrollPreview(project)),
  );

  /*
   * =========================================================
   * PREVIEW VIEWPORT OBSERVER
   * =========================================================
   *
   * DESKTOP:
   * first preview automatically demonstrates once.
   *
   * TABLET:
   * first preview automatically demonstrates once.
   * Other cards are tap controlled.
   *
   * MOBILE:
   * cards are one column, so each preview automatically runs
   * once when its image becomes clearly visible.
   */
  function observeProjectPreview(node, config) {
    let currentConfig = config;
    let observer;

    function createObserver() {
      if (typeof IntersectionObserver === "undefined") {
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          const { project, index, isFirst } = currentConfig;

          if (!hasScrollPreview(project)) {
            return;
          }

          if (prefersReducedMotion()) {
            return;
          }

          const mobile = isMobileLayout() && !hasFineHover();

          /*
           * MOBILE
           *
           * Because there is only one column, viewport activation
           * works naturally.
           */
          if (mobile) {
            const previewKey = getProjectPreviewKey(project, index);

            if (
              entry.isIntersecting &&
              entry.intersectionRatio >= 0.55 &&
              !mobilePreviewPlayed.has(previewKey)
            ) {
              mobilePreviewPlayed.add(previewKey);

              startPreview(project, index, {
                autoReset: true,
              });

              return;
            }

            /*
             * If the visitor scrolls away before the animation
             * finishes, stop it instead of continuing off-screen.
             */
            if (
              entry.intersectionRatio < 0.15 &&
              activePreviewIndex === index
            ) {
              stopPreview(index);
            }

            return;
          }

          /*
           * DESKTOP + TABLET
           *
           * Only the first preview automatically demonstrates.
           */
          if (
            isFirst &&
            !initialPreviewPlayed &&
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.45
          ) {
            initialPreviewPlayed = true;

            startPreview(project, index, {
              autoReset: true,
            });
          }
        },
        {
          threshold: [0, 0.15, 0.45, 0.55, 0.75, 1],
          rootMargin: "0px 0px -4% 0px",
        },
      );

      observer.observe(node);
    }

    createObserver();

    return {
      update(nextConfig) {
        currentConfig = nextConfig;
      },

      destroy() {
        observer?.disconnect();
      },
    };
  }

  function loadMoreProjects() {
    visibleCount = Math.min(visibleCount + LOAD_MORE_COUNT, projects.length);
  }

  function toggleProjectDescription(index) {
    expandedProjectDescription =
      expandedProjectDescription === index ? null : index;
  }

  onDestroy(() => {
    clearPreviewResetTimer();
  });
</script>

<section id="projects" class="projects">
  <div class="projects-shell">
    <div class="project-v-line edge-left"></div>

    <div class="project-v-line edge-right"></div>

    <div class="container projects-container">
      <!-- =====================================================
           BLUE SECTION HEADER
      ====================================================== -->

      <div
        class="projects-header"
        class:visible={headerVisible}
        use:observeHeader
      >
        <div class="projects-header-inner">
          <div class="projects-header-main">
            <h2>{title}</h2>
          </div>

          {#if subtitle}
            <p class="projects-subtitle">
              {subtitle}
            </p>
          {/if}
        </div>
      </div>

      <!-- =====================================================
           PROJECT GRID
      ====================================================== -->

      <div class="projects-grid-view">
        <div class="projects-grid">
          {#each visibleProjects as project, index}
            <article
              class="project-card"
              class:has-scroll-preview={hasScrollPreview(project)}
              style={`--card-accent:${getAccent(index)};`}
            >
              <div class="project-bg-number">
                {cleanNumber(project.number)}
              </div>

              <!-- =================================================
                   PROJECT IMAGE
              ================================================== -->

              <div
                class="project-image-wrap"
                class:has-scroll-preview={hasScrollPreview(project)}
                class:preview-active={hasScrollPreview(project) &&
                  activePreviewIndex === index}
                role={hasScrollPreview(project) ? "button" : undefined}
                tabindex={hasScrollPreview(project) ? 0 : undefined}
                aria-label={hasScrollPreview(project)
                  ? `Preview ${project.title} website`
                  : undefined}
                use:observeProjectPreview={{
                  project,
                  index,
                  isFirst: index === firstPreviewIndex,
                }}
                onmouseenter={() => handlePreviewEnter(project, index)}
                onmouseleave={() => handlePreviewLeave(project, index)}
                onclick={() => handlePreviewClick(project, index)}
                onkeydown={(event) =>
                  handlePreviewKeydown(event, project, index)}
              >
                <!-- EXISTING THUMBNAIL -->

                <img
                  class="project-thumbnail"
                  src={EMPTY_IMAGE}
                  data-original-src={project.image}
                  alt={project.alt ??
                    `Webdesign Referenzprojekt ${project.title}`}
                  loading="lazy"
                  fetchpriority="low"
                  decoding="async"
                  width="625"
                  height="352"
                  use:observeProjectImage={project.image}
                />

                <!-- FULL WEBSITE SCREENSHOT -->

                {#if hasScrollPreview(project)}
                  <img
                    class="project-scroll-image"
                    class:active={activePreviewIndex === index}
                    src={EMPTY_IMAGE}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    fetchpriority="low"
                    decoding="async"
                    use:observeProjectImage={project.scrollImage}
                  />
                {/if}
              </div>

              <!-- =================================================
                   PROJECT CONTENT
              ================================================== -->

              <div class="project-content">
                <div class="project-copy">
                  <div class="project-title-wrap">
                    <h3>
                      {project.title}
                    </h3>

                    <button
                      type="button"
                      class="project-description-toggle"
                      aria-controls={`project-description-${index}`}
                      aria-expanded={expandedProjectDescription === index}
                      aria-label={`Toggle description for ${project.title}`}
                      onclick={() => toggleProjectDescription(index)}
                    >
                      <span aria-hidden="true">
                        {expandedProjectDescription === index ? "−" : "+"}
                      </span>
                    </button>
                  </div>

                  <p
                    class="project-description"
                    class:expanded={expandedProjectDescription === index}
                    id={`project-description-${index}`}
                  >
                    {getDescription(project)}
                  </p>
                </div>

                <!-- PROJECT TAGS -->

                <div
                  class="project-tags"
                  role="list"
                  aria-label={projectTagsLabel}
                >
                  {#each getProjectTags(project) as tag}
                    <span role="listitem">
                      {tag}
                    </span>
                  {/each}
                </div>

                <!-- PROJECT FOOTER -->

                <div class="project-footer" class:has-details={index === 0}>
                  <a
                    href={normalizeLink(project.link)}
                    class="project-view-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.linkText ?? viewProjectText}: ${project.title}`}
                  >
                    <span>
                      {project.linkText ?? viewProjectText}
                    </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      viewBox="0 0 16 16"
                      fill="none"
                      class="project-link-arrow btn-icon-svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M4.3418 11.6582L11.6587 4.3413"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>

                      <path
                        d="M4.58714 4.34104H11.6582V11.4121"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      ></path>
                    </svg>
                  </a>

                  {#if index === 0}
                    <a
                      href={project.detailsLink ?? viewDetailsLink}
                      class="project-details-link"
                      aria-label={`${project.detailsText ?? viewDetailsText}: ${project.title}`}
                    >
                      <span>
                        {project.detailsText ?? viewDetailsText}
                      </span>

                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="100%"
                        viewBox="0 0 16 16"
                        fill="none"
                        class="project-link-arrow btn-icon-svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M3 8H13"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>

                        <path
                          d="M9.5 4.5L13 8L9.5 11.5"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </a>
                  {/if}
                </div>
              </div>
            </article>
          {/each}

          <!-- =================================================
               LOAD MORE
          ================================================== -->

          {#if hasMoreProjects}
            <button
              type="button"
              class="project-load-card"
              onclick={loadMoreProjects}
              aria-label={loadMoreAria}
            >
              <span class="project-load-plus"> + </span>

              <span class="project-load-copy">
                {loadMoreCopy}
              </span>

              <span class="project-load-strong">
                {loadMoreText}
              </span>

              <span class="project-load-progress">
                {visibleProgress}
              </span>
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* =========================================================
     SECTION
  ========================================================= */

  .projects {
    padding: 0;

    font-family: "DM Sans", Arial, sans-serif;

    background: #000;

    color: #fff;

    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .projects {
    background: #fff;

    color: #111;
  }

  .projects-shell {
    --shell-x: 40px;

    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding: 150px var(--shell-x);

    box-sizing: border-box;
  }

  /* =========================================================
     VERTICAL SHELL LINES
  ========================================================= */

  .project-v-line {
    position: absolute;

    top: 0;
    bottom: 0;

    width: 1px;

    background: rgba(255, 255, 255, 0.08);

    pointer-events: none;

    z-index: 10;
  }

  :global(body.light) .project-v-line {
    background: rgba(0, 0, 0, 0.08);
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  .projects-container {
    position: relative;

    z-index: 1;

    width: 100%;
  }

  /* =========================================================
     SECTION HEADER
  ========================================================= */

  .projects-header {
    width: 100%;

    margin-bottom: 80px;

    box-sizing: border-box;

    border-bottom: 1px solid #0043ff;

    background: transparent;

    color: #f2f2f2;

    opacity: 0;

    transform: translateY(18px);

    transition:
      opacity 0.7s ease,
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .projects-header.visible {
    opacity: 1;

    transform: translateY(0);
  }

  .projects-header-inner {
    width: 100%;

    min-height: 0;

    box-sizing: border-box;

    display: grid;

    grid-template-columns:
      minmax(0, 1.15fr)
      minmax(320px, 0.85fr);

    align-items: center;

    gap: 80px;

    padding: 44px 0;
  }

  .projects-header-main {
    --section-title-marker-size: clamp(18px, 1.6125vw, 25.5px);

    min-width: 0;

    display: grid;

    grid-template-columns:
      var(--section-title-marker-size)
      minmax(0, 1fr);

    align-items: start;

    gap: 18px;
  }

  .projects-header-main::before {
    width: var(--section-title-marker-size);

    height: var(--section-title-marker-size);

    margin-top: 0.48em;

    border-radius: 50%;

    background: #0043ff;

    content: "";

    transform-origin: center;

    animation: section-title-pulse 1.65s ease-in-out infinite;

    will-change: transform, box-shadow;
  }

  @media (max-width: 1100px) {
    .projects-header-main {
      align-items: center;
    }

    .projects-header-main::before {
      align-self: center;

      margin-top: 0;
    }
  }

  @keyframes section-title-pulse {
    0%,
    100% {
      transform: scale(0.82);

      box-shadow: 0 0 0 0 rgba(0, 67, 255, 0);
    }

    50% {
      transform: scale(1.18);

      box-shadow: 0 0 0 8px rgba(0, 67, 255, 0.16);
    }
  }

  /* =========================================================
     HEADER TITLE
  ========================================================= */

  .projects-header h2 {
    max-width: 720px;

    margin: 0;

    color: #f2f2f2;

    font-size: clamp(24px, 2.15vw, 34px);

    line-height: 1.12;

    letter-spacing: -0.035em;

    font-weight: 600;

    text-transform: none;
  }

  /* =========================================================
     HEADER SUBTITLE
  ========================================================= */

  .projects-subtitle {
    max-width: 520px;

    margin: 0;

    padding: 0;

    color: rgba(255, 255, 255, 0.62);

    font-size: 16px;

    line-height: 1.65;

    letter-spacing: 0;

    font-weight: 400;
  }

  :global(body.light) .projects-header {
    background: transparent;

    color: #111111;
  }

  :global(body.light) .projects-header h2 {
    color: #111111;
  }

  :global(body.light) .projects-subtitle {
    color: rgba(0, 0, 0, 0.62);
  }

  @media (min-width: 1025px) {
    .projects-subtitle {
      width: min(460px, 100%);

      justify-self: end;

      margin-left: auto;
      margin-right: 0;

      padding-right: 0;

      text-align: left;
    }
  }

  /* =========================================================
     PROJECT GRID
  ========================================================= */

  .projects-grid {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    grid-auto-rows: 1fr;

    column-gap: 40px;

    row-gap: 40px;

    align-items: stretch;
  }

  /* =========================================================
     PROJECT CARD
  ========================================================= */

  .project-card {
    --stagger-y: 0px;

    position: relative;

    display: flex;

    flex-direction: column;

    min-height: 520px;

    height: 100%;

    overflow: hidden;

    border: 0;

    background: #121214;

    transform: translateY(var(--stagger-y));

    transition:
      transform 0.35s ease,
      box-shadow 0.3s ease;
  }

  :global(body.light) .project-card {
    background: #fafafa;

    border: 0;

    box-shadow: none;
  }

  .project-card:hover {
    transform: translateY(calc(var(--stagger-y) - 4px));

    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
  }

  :global(body.light) .project-card:hover {
    border: 0;

    box-shadow: none;
  }

  /* =========================================================
     DESKTOP STAGGER
  ========================================================= */

  @media (min-width: 1025px) {
    .projects-grid > .project-card:nth-child(2n + 1) {
      --stagger-y: -20px;
    }

    .projects-grid > .project-card:nth-child(2n) {
      --stagger-y: 20px;
    }

    .project-load-card {
      transform: translateY(20px);
    }
  }

  /* =========================================================
     BACKGROUND NUMBER
  ========================================================= */

  .project-bg-number {
    position: absolute;

    top: -4px;

    left: 16px;

    z-index: 4;

    color: rgba(170, 170, 170, 0.08);

    font-size: clamp(6rem, 10vw, 9rem);

    line-height: 0.85;

    font-weight: 800;

    pointer-events: none;
  }

  :global(body.light) .project-bg-number {
    color: rgba(0, 0, 0, 0.05);
  }

  /* =========================================================
     PROJECT IMAGE
  ========================================================= */

  .project-image-wrap {
    position: relative;

    display: block;

    height: 400px;

    padding: 18px;

    background: var(--card-accent, #151515);

    overflow: hidden;

    flex-shrink: 0;
  }

  /*
   * There is intentionally NO visible label, icon or instruction.
   *
   * The first automatic demonstration teaches the interaction.
   */
  .project-image-wrap.has-scroll-preview {
    cursor: pointer;

    outline: none;

    -webkit-tap-highlight-color: transparent;
  }

  .project-image-wrap.has-scroll-preview:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: -2px;
  }

  /*
   * Original project thumbnail.
   *
   * This retains the same appearance and scale as the
   * original Projects component.
   */
  .project-thumbnail {
    position: relative;

    z-index: 1;

    width: 100%;

    height: 100%;

    display: block;

    object-fit: contain;

    transform: scale(0.94);

    opacity: 1;

    transition:
      transform 0.35s ease,
      opacity 0.3s ease;
  }

  /*
   * =========================================================
   * FULL WEBSITE SCREENSHOT
   * =========================================================
   *
   * The screenshot is positioned directly over the existing
   * thumbnail.
   *
   * object-position moves the very tall image from its top
   * to its bottom while the project frame itself stays still.
   */
  .project-scroll-image {
    position: absolute;

    z-index: 2;

    top: 18px;
    right: 18px;
    bottom: 18px;
    left: 18px;

    width: calc(100% - 36px);

    height: calc(100% - 36px);

    display: block;

    object-fit: cover;

    object-position: center top;

    transform: scale(0.94);

    opacity: 0;

    pointer-events: none;

    transition: opacity 0.3s ease;

    backface-visibility: hidden;
  }

  /*
   * Active preview.
   *
   * The screenshot fades in and slowly moves from the website
   * hero to its footer.
   */
  .project-scroll-image.active {
    opacity: 1;

    object-position: center bottom;

    transition:
      opacity 0.3s ease,
      object-position 11s cubic-bezier(0.22, 0.61, 0.36, 1);

    will-change: object-position, opacity;
  }

  /*
   * Fade the normal project thumbnail underneath the screenshot.
   */
  .project-image-wrap.preview-active .project-thumbnail {
    opacity: 0;
  }

  /* =========================================================
     PROJECT CONTENT
  ========================================================= */

  .project-content {
    min-height: 240px;

    padding: 24px 22px;

    display: flex;

    flex: 1;

    flex-direction: column;

    background: #141416;

    color: inherit;

    box-sizing: border-box;

    border: 0;
  }

  :global(body.light) .project-content {
    background: #f5f5f5;

    border: 0;
  }

  /* =========================================================
     PROJECT TAGS
  ========================================================= */

  .project-tags {
    display: flex;

    flex-wrap: wrap;

    gap: 7px;

    margin: 18px 0 0;
  }

  .project-tags span {
    min-height: 25px;

    padding: 4px 8px;

    border: 1px solid rgba(255, 255, 255, 0.28);

    display: inline-flex;

    align-items: center;

    background: transparent;

    color: #ffffff;

    font-size: 11px;

    font-weight: 500;

    line-height: 1;

    letter-spacing: 0.035em;
  }

  :global(body.light) .project-tags span {
    border-color: rgba(0, 0, 0, 0.26);

    background: transparent;

    color: #111111;
  }

  /* =========================================================
     PROJECT COPY
  ========================================================= */

  .project-copy {
    width: 100%;

    min-width: 0;
  }

  .project-title-wrap {
    width: 100%;

    min-width: 0;

    margin: 0 0 12px;
  }

  .project-title-wrap h3 {
    width: 100%;

    margin: 0;

    color: #ffffff;

    font-size: 20px;

    line-height: 1.22;

    font-weight: 700;

    letter-spacing: 0.03em;

    text-transform: uppercase;

    text-decoration: none;

    text-wrap: balance;
  }

  .project-description-toggle {
    display: none;
  }

  :global(body.light) .project-title-wrap h3 {
    color: #111111;
  }

  .project-description {
    width: 100%;

    max-width: none;

    margin: 0;

    color: #9a9a9a;

    font-size: 16px;

    font-weight: 500;

    line-height: 1.55;

    letter-spacing: 0;

    text-wrap: pretty;
  }

  :global(body.light) .project-description {
    color: rgba(0, 0, 0, 0.68);
  }

  /* =========================================================
     PROJECT FOOTER
  ========================================================= */

  .project-footer {
    width: 100%;

    margin-top: auto;

    padding-top: 32px;

    display: flex;

    align-items: flex-end;

    justify-content: flex-start;

    gap: 24px;
  }

  .project-footer.has-details {
    justify-content: space-between;
  }

  .project-view-link,
  .project-details-link {
    min-height: auto;

    flex: 0 0 auto;

    padding: 0;

    border: 0;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 9px;

    background: transparent;

    color: #ffffff;

    font-size: 14px;

    font-weight: 600;

    text-transform: uppercase;

    line-height: 1;

    letter-spacing: 0.015em;

    text-decoration: none;

    transition: color 0.25s ease;
  }

  .project-view-link {
    margin-bottom: 6px;
  }

  @media (min-width: 1025px) {
    .project-view-link {
      margin-bottom: 10px;
    }
  }

  .project-view-link > span,
  .project-details-link > span {
    padding-bottom: 7px;

    border-bottom: 1px solid #0043ff;
  }

  .project-view-link:hover,
  .project-details-link:hover {
    background: transparent;

    color: #0043ff;
  }

  :global(body.light) .project-view-link,
  :global(body.light) .project-details-link {
    background: transparent;

    color: #111111;
  }

  :global(body.light) .project-view-link:hover,
  :global(body.light) .project-details-link:hover {
    background: transparent;

    color: #0043ff;
  }

  .project-link-arrow {
    width: 16px;

    height: 16px;

    flex: 0 0 16px;

    display: block;

    color: #0043ff;
  }

  .project-link-arrow path {
    stroke: #0043ff;
  }

  @media (min-width: 768px) {
    .project-tags span {
      font-weight: 400;

      text-transform: uppercase;
    }

    /*
     * Preserve the original thumbnail hover scale.
     */
    .project-card:hover .project-thumbnail {
      transform: scale(1);
    }

    /*
     * The full-page screenshot should not zoom when hovered.
     */
    .project-card:hover .project-scroll-image {
      transform: scale(0.94);
    }
  }

  /* =========================================================
     LOAD MORE CARD
  ========================================================= */

  .project-load-card {
    min-height: 520px;

    height: 100%;

    margin: 0;

    padding: 28px;

    border: 0;

    display: flex;

    flex-direction: column;

    justify-content: flex-end;

    align-items: flex-start;

    align-self: stretch;

    gap: 10px;

    overflow: hidden;

    background: linear-gradient(180deg, #151518, #0e0e10);

    color: #fff;

    text-align: left;

    cursor: pointer;

    box-sizing: border-box;
  }

  :global(body.light) .project-load-card {
    border: 0;

    background: #fafafa;

    color: #111;
  }

  .project-load-plus {
    color: #0043ff;

    font-size: 60px;

    line-height: 1;

    font-weight: 300;
  }

  .project-load-copy {
    color: #b8b8b8;

    font-size: 14px;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .project-load-strong {
    max-width: 12ch;

    font-size: 28px;

    line-height: 1.05;

    font-weight: 700;

    text-transform: uppercase;
  }

  .project-load-progress {
    margin-top: auto;

    padding-top: 16px;

    color: #0043ff;

    font-size: 14px;

    letter-spacing: 0.06em;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .projects-header-main {
      --section-title-marker-size: 28.8px;
    }

    .project-v-line {
      display: none;
    }

    .projects-shell {
      width: 90%;

      padding: 110px 0;
    }

    .projects-header {
      margin-bottom: 56px;
    }

    .projects-header-inner {
      min-height: 0;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 36px 0;
    }

    .projects-header h2 {
      font-size: 24px;

      line-height: 1.15;
    }

    .projects-subtitle {
      font-size: 13px;

      line-height: 1.55;
    }

    .projects-grid {
      column-gap: 18px;

      row-gap: 18px;
    }

    .project-card,
    .project-load-card {
      min-height: 470px;

      transform: none;
    }

    .project-load-card {
      margin: 0;

      align-self: stretch;

      transform: none;
    }

    .project-image-wrap {
      height: 360px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .project-v-line {
      display: none;
    }

    .projects-shell {
      width: calc(100% - 40px);

      padding: 110px 0;
    }

    .projects-header {
      margin-bottom: 50px;
    }

    .projects-header-inner {
      min-height: 0;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      gap: 24px;

      padding: 32px 0;
    }

    .projects-header-main {
      --section-title-marker-size: clamp(26.4px, 7.2vw, 32.4px);

      width: 100%;
    }

    .projects-header h2 {
      max-width: 100%;

      font-size: clamp(22px, 6vw, 27px);

      line-height: 1.15;
    }

    .projects-subtitle {
      max-width: 100%;

      font-size: 14px;

      line-height: 1.6;
    }

    .projects-grid {
      grid-auto-rows: auto;

      grid-template-columns: 1fr;

      column-gap: 0;

      row-gap: 30px;
    }

    .project-card,
    .project-load-card {
      min-height: auto;

      transform: none;
    }

    .project-image-wrap {
      height: auto;

      padding: 10px;
    }

    /*
     * Existing thumbnail layout remains 16:9 on mobile.
     */
    .project-thumbnail {
      height: auto;

      aspect-ratio: 16 / 9;

      object-fit: contain;
    }

    /*
     * The screenshot sits inside the same 10px mobile padding.
     */
    .project-scroll-image {
      top: 10px;
      right: 10px;
      bottom: 10px;
      left: 10px;

      width: calc(100% - 20px);

      height: calc(100% - 20px);

      transform: scale(0.94);
    }

    .project-content {
      min-height: 0;

      padding: 18px 14px 16px;
    }

    .project-tags {
      flex-wrap: nowrap;

      gap: 4px;

      margin: 16px 0 0;
    }

    .project-tags span {
      min-height: 23px;

      padding: 4px 5px;

      font-size: 8px;

      letter-spacing: 0.035em;

      text-transform: uppercase;

      white-space: nowrap;
    }

    .project-title-wrap {
      display: grid;

      grid-template-columns:
        minmax(0, 1fr)
        36px;

      align-items: start;

      gap: 12px;

      margin-bottom: 0;
    }

    .project-description-toggle {
      width: 36px;

      height: 36px;

      display: inline-grid;

      place-items: center;

      justify-self: end;

      margin: -7px 0 0;

      padding: 0;

      border: 0;

      background: transparent;

      color: #0043ff;

      font: inherit;

      font-size: 32.5px;

      font-weight: 400;

      line-height: 1;

      cursor: pointer;

      -webkit-tap-highlight-color: transparent;
    }

    :global(body.light) .project-description-toggle {
      color: #0043ff;
    }

    .project-description {
      width: 100%;

      max-width: none;

      display: none;

      margin-top: 12px;

      font-size: 14px;

      font-weight: 400;

      line-height: 1.55;
    }

    .project-description.expanded {
      display: block;
    }

    .project-footer {
      padding-top: 28px;
    }

    .project-title-wrap h3 {
      font-size: 18px;
    }

    .project-view-link,
    .project-details-link {
      min-height: auto;

      padding: 0;

      font-size: 12px;

      white-space: nowrap;
    }

    .project-load-card {
      padding: 24px 20px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 480px) {
    .projects-header-inner {
      padding: 28px 0;
    }
  }

  @media (max-width: 420px) {
    .projects-header {
      margin-bottom: 46px;
    }

    .projects-header-inner {
      gap: 20px;

      padding: 28px 0;
    }

    .projects-header h2 {
      font-size: 22px;
    }

    .projects-subtitle {
      font-size: 14px;
    }

    .project-footer {
      gap: 16px;
    }

    .project-view-link,
    .project-details-link {
      font-size: 11px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .projects-header {
      opacity: 1;

      transform: none;

      transition: none;
    }

    .projects-header-main::before {
      animation: none;

      transform: none;
    }

    /*
     * Leave the normal project thumbnail visible.
     * No long website scrolling animation is performed.
     */
    .project-scroll-image,
    .project-scroll-image.active {
      opacity: 0;

      object-position: center top;

      transition: none;
    }

    .project-image-wrap.preview-active .project-thumbnail {
      opacity: 1;
    }
  }
</style>
