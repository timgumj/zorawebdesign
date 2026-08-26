<script>
  let {
    title,
    subtitle,
    eyebrow = "",
    projects = [],
    loadMoreCopy = "Want to see more",
    loadMoreText = "Load more projects",
    loadMoreAria = "Load more projects",
    viewProjectText = "View Project",
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

  let visibleCount = $state(9);
  let headerVisible = $state(false);

  const LOAD_MORE_COUNT = 2;

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

  const hasMoreProjects = $derived(visibleCount < projects.length);

  const visibleProgress = $derived(
    `${Math.min(visibleCount, projects.length)}/${projects.length}`,
  );

  function loadMoreProjects() {
    visibleCount = Math.min(visibleCount + LOAD_MORE_COUNT, projects.length);
  }
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
            <p class="projects-subtitle">{subtitle}</p>
          {/if}
        </div>
      </div>

      <!-- =====================================================
           PROJECT GRID LABEL
      ====================================================== -->
      <div class="projects-grid-label">
        <span>{eyebrow || "SELECTED PROJECTS"}</span>
        <span>{String(projects.length).padStart(2, "0")} PROJECTS</span>
      </div>

      <!-- =====================================================
           PROJECT GRID
      ====================================================== -->
      <div class="projects-grid-view">
        <div class="projects-grid">
          {#each projects as project, index}
            <article
              class="project-card"
              class:seo-hidden={index >= visibleCount}
              style={`--card-accent:${getAccent(index)};`}
            >
              <div class="project-bg-number">
                {cleanNumber(project.number)}
              </div>

              <div class="project-image-wrap">
                <img
                  src={project.image}
                  alt={project.alt ??
                    `Webdesign Referenzprojekt ${project.title}`}
                  loading="lazy"
                  decoding="async"
                  width="625"
                  height="352"
                />
              </div>

              <div class="project-content">
                <div
                  class="project-tags"
                  role="list"
                  aria-label={projectTagsLabel}
                >
                  {#each getProjectTags(project) as tag}
                    <span role="listitem">{tag}</span>
                  {/each}
                </div>

                <div class="project-copy">
                  <div class="project-title-wrap">
                    <h3>{project.title}</h3>
                  </div>

                  <p class="project-description">
                    {getDescription(project)}
                  </p>
                </div>

                <div class="project-footer" class:has-details={index === 0}>
                  <a
                    href={normalizeLink(project.link)}
                    class="project-view-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.linkText ?? viewProjectText}: ${project.title}`}
                  >
                    <span>{project.linkText ?? viewProjectText}</span>

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

          {#if hasMoreProjects}
            <button
              type="button"
              class="project-load-card"
              onclick={loadMoreProjects}
              aria-label={loadMoreAria}
            >
              <span class="project-load-plus">+</span>
              <span class="project-load-copy">{loadMoreCopy}</span>
              <span class="project-load-strong">{loadMoreText}</span>
              <span class="project-load-progress">{visibleProgress}</span>
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

  :global(.project-card.seo-hidden) {
    display: none !important;
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
     BLUE SECTION HEADER
  ========================================================= */
  .projects-header {
    width: 100%;
    margin-bottom: 80px;
    box-sizing: border-box;
    background: #0043ff;
    color: #ffffff;
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
    min-height: 140px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns:
      minmax(0, 1.15fr)
      minmax(320px, 0.85fr);
    align-items: center;
    gap: 80px;
    padding: 58px 64px;
  }

  .projects-header-main {
    min-width: 0;
  }

  /* =========================================================
     HEADER TITLE
  ========================================================= */
  .projects-header h2 {
    max-width: 720px;
    margin: 0;
    color: #ffffff;
    font-size: clamp(26px, 2.5vw, 40px);
    line-height: 1.12;
    letter-spacing: -0.035em;
    font-weight: 500;
    text-transform: none;
  }

  /* =========================================================
     HEADER SUBTITLE
  ========================================================= */
  .projects-subtitle {
    max-width: 520px;
    margin: 0;
    padding: 0;
    color: rgba(255, 255, 255, 0.82);
    font-size: 16px;
    line-height: 1.65;
    letter-spacing: 0;
    font-weight: 400;
  }

  :global(body.light) .projects-header {
    background: #0043ff;
    color: #ffffff;
  }

  :global(body.light) .projects-header h2 {
    color: #ffffff;
  }

  :global(body.light) .projects-subtitle {
    color: rgba(255, 255, 255, 0.82);
  }

  /* =========================================================
     PROJECT GRID LABEL
  ========================================================= */
  .projects-grid-label {
    margin-bottom: 30px;
    padding-bottom: 15px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    display: flex;
    justify-content: space-between;
    gap: 20px;
    color: rgba(255, 255, 255, 0.46);
    font-size: 11px;
    letter-spacing: 0.13em;
    text-transform: uppercase;
  }

  :global(body.light) .projects-grid-label {
    border-bottom-color: rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.45);
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
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: #121214;
    transform: translateY(var(--stagger-y));
    transition:
      transform 0.35s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  :global(body.light) .project-card {
    background: #fff;
    border-color: rgba(0, 0, 0, 0.08);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.04);
  }

  .project-card:hover {
    transform: translateY(calc(var(--stagger-y) - 4px));
    border-color: rgba(255, 255, 255, 0.18);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
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

    /*
     * The Load More box occupies the right-hand column.
     * It therefore uses the exact same +20px stagger as the
     * right-column project cards.
     */
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

  .project-image-wrap img {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    transform: scale(0.94);
    transition: transform 0.35s ease;
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
  }

  :global(body.light) .project-content {
    background: #fff;
  }

  /* =========================================================
     PROJECT TAGS
  ========================================================= */
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    margin-bottom: 18px;
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
    padding: 0 0 7px;
    border: 0;
    border-bottom: 1px solid #0043ff;
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
    transition:
      border-color 0.25s ease,
      color 0.25s ease;
  }

  .project-view-link:hover,
  .project-details-link:hover {
    border-bottom-color: #0043ff;
    background: transparent;
    color: #0043ff;
  }

  :global(body.light) .project-view-link,
  :global(body.light) .project-details-link {
    border-bottom-color: #0043ff;
    background: transparent;
    color: #111111;
  }

  :global(body.light) .project-view-link:hover,
  :global(body.light) .project-details-link:hover {
    border-bottom-color: #0043ff;
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

  @media (min-width: 768px) {
    .project-card:hover .project-image-wrap img {
      transform: scale(1);
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
    border: 1px solid rgba(255, 255, 255, 0.08);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    align-self: stretch;
    gap: 10px;
    background: linear-gradient(180deg, #151518, #0e0e10);
    color: #fff;
    text-align: left;
    cursor: pointer;
  }

  :global(body.light) .project-load-card {
    border-color: rgba(0, 0, 0, 0.08);
    background: linear-gradient(180deg, #fff, #f4f4f1);
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
  @media (max-width: 1024px) {
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
      min-height: 140px;
      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);
      gap: 38px;
      padding: 42px 44px;
    }

    .projects-header h2 {
      font-size: 26px;
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
      padding: 38px 30px;
    }

    .projects-header-main {
      width: 100%;
    }

    .projects-header h2 {
      max-width: 100%;
      font-size: clamp(24px, 7vw, 30px);
      line-height: 1.15;
    }

    .projects-subtitle {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
    }

    .projects-grid {
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

    .project-image-wrap img {
      height: auto;
      aspect-ratio: 16 / 9;
      object-fit: contain;
    }

    .project-content {
      min-height: 220px;
      padding: 18px 14px 16px;
    }

    .project-tags {
      gap: 6px;
      margin-bottom: 16px;
    }

    .project-tags span {
      min-height: 23px;
      padding: 4px 7px;
      font-size: 10px;
    }

    .project-description {
      width: 100%;
      max-width: none;
      font-size: 16px;
      line-height: 1.55;
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
      padding: 0 0 7px;
      font-size: 12px;
      white-space: nowrap;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */
  @media (max-width: 480px) {
    .projects-header-inner {
      padding: 34px 24px;
    }
  }

  @media (max-width: 420px) {
    .projects-header {
      margin-bottom: 46px;
    }

    .projects-header-inner {
      gap: 20px;
      padding: 30px 22px;
    }

    .projects-header h2 {
      font-size: 23px;
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
  }
</style>
