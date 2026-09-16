<script>
  import { onDestroy, onMount } from "svelte";

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

  let visibleCount = $state(7);
  let headerVisible = $state(false);
  let expandedProjectDescription = $state(0);

  /* =========================================================
     PREVIEW STATE
  ========================================================= */

  let activePreviewIndex = $state(null);

  /*
   * desktop
   * tap
   * mobile-auto
   * tablet-scroll
   */
  let activePreviewMode = $state(null);

  /*
   * Tablet only.
   * Mobile does NOT use this.
   */
  let previewPositionByIndex = $state({});

  let previewResetTimer = null;
  let initialPreviewPlayed = false;

  const previewNodes = new Map();

  let touchScrollFrame = null;

  /*
   * Mobile selection state.
   *
   * Mobile does not control screenshot progress.
   * It only decides WHICH card should start its normal
   * top-to-bottom animation.
   */
  let mobileFocusedIndex = null;
  let mobileCandidateIndex = null;
  let mobileActivationTimer = null;

  const LOAD_MORE_COUNT = 2;

  const PREVIEW_DURATION_MS = 11000;
  const PREVIEW_END_PAUSE_MS = 900;

  /*
   * Prevents a very fast page scroll from briefly triggering
   * every card it passes.
   */
  const MOBILE_ACTIVATION_DELAY_MS = 110;

  const EMPTY_IMAGE =
    "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";

  /* =========================================================
     BASIC HELPERS
  ========================================================= */

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

  function hasScrollPreview(project) {
    return Boolean(String(project?.scrollImage ?? "").trim());
  }

  function clamp(value, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
  }

  /* =========================================================
     DEVICE HELPERS
  ========================================================= */

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

  function isTabletLayout() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(min-width: 768px) and (max-width: 1024px)")
      .matches;
  }

  function isTouchPreviewLayout() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.innerWidth <= 1024 && !hasFineHover();
  }

  function prefersReducedMotion() {
    if (typeof window === "undefined") {
      return false;
    }

    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }

  /* =========================================================
     PREVIEW TIMERS
  ========================================================= */

  function clearPreviewResetTimer() {
    if (previewResetTimer !== null) {
      clearTimeout(previewResetTimer);

      previewResetTimer = null;
    }
  }

  function clearMobileActivationTimer() {
    if (mobileActivationTimer !== null) {
      clearTimeout(mobileActivationTimer);

      mobileActivationTimer = null;
    }
  }

  function scheduleTouchPreviewUpdate() {
    if (typeof window === "undefined" || !isTouchPreviewLayout()) {
      return;
    }

    if (touchScrollFrame !== null) {
      return;
    }

    touchScrollFrame = requestAnimationFrame(() => {
      touchScrollFrame = null;

      updateTouchScrollPreview();
    });
  }

  function stopPreview(index = null, { resumeTouch = true } = {}) {
    clearPreviewResetTimer();

    if (index === null || activePreviewIndex === index) {
      activePreviewIndex = null;
      activePreviewMode = null;
    }

    if (resumeTouch) {
      scheduleTouchPreviewUpdate();
    }
  }

  /*
   * Standard timed preview.
   *
   * Used by:
   *
   * desktop hover
   * mobile automatic activation
   * touch/tap replay
   *
   * The screenshot ALWAYS travels from top to bottom by itself.
   */
  function startPreview(
    project,
    index,
    { autoReset = false, mode = "desktop" } = {},
  ) {
    if (!hasScrollPreview(project)) {
      return;
    }

    if (prefersReducedMotion()) {
      return;
    }

    clearPreviewResetTimer();

    /*
     * Restart same card from the beginning.
     */
    if (activePreviewIndex === index) {
      activePreviewIndex = null;
      activePreviewMode = null;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          activePreviewIndex = index;
          activePreviewMode = mode;
        });
      });
    } else {
      activePreviewIndex = index;
      activePreviewMode = mode;
    }

    if (autoReset) {
      previewResetTimer = setTimeout(() => {
        if (activePreviewIndex === index && activePreviewMode === mode) {
          activePreviewIndex = null;
          activePreviewMode = null;
        }

        previewResetTimer = null;

        scheduleTouchPreviewUpdate();
      }, PREVIEW_DURATION_MS + PREVIEW_END_PAUSE_MS);
    }
  }

  /*
   * Tablet-only scroll-position control.
   *
   * Mobile intentionally does NOT use this.
   */
  function activateTabletScrollPreview(project, index, progress) {
    if (!hasScrollPreview(project)) {
      return;
    }

    clearPreviewResetTimer();

    const percentage = clamp(progress) * 100;

    const oldValue = previewPositionByIndex[index];

    if (oldValue === undefined || Math.abs(oldValue - percentage) >= 0.2) {
      previewPositionByIndex[index] = percentage;
    }

    activePreviewIndex = index;
    activePreviewMode = "tablet-scroll";
  }

  /* =========================================================
     DESKTOP
     UNCHANGED
  ========================================================= */

  function handlePreviewEnter(project, index) {
    if (!hasScrollPreview(project)) {
      return;
    }

    if (!hasFineHover()) {
      return;
    }

    startPreview(project, index, {
      mode: "desktop",
    });
  }

  function handlePreviewLeave(project, index) {
    if (!hasScrollPreview(project)) {
      return;
    }

    if (!hasFineHover()) {
      return;
    }

    stopPreview(index, {
      resumeTouch: false,
    });
  }

  /* =========================================================
     TOUCH / TAP
  ========================================================= */

  function handlePreviewClick(project, index) {
    if (!hasScrollPreview(project)) {
      return;
    }

    if (hasFineHover()) {
      return;
    }

    /*
     * Tapping always RESTARTS the full automatic
     * top-to-bottom animation.
     */
    if (isMobileLayout()) {
      mobileFocusedIndex = index;
      mobileCandidateIndex = index;

      clearMobileActivationTimer();
    }

    startPreview(project, index, {
      autoReset: true,
      mode: "tap",
    });
  }

  function handlePreviewKeydown(event, project, index) {
    if (!hasScrollPreview(project)) {
      return;
    }

    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    startPreview(project, index, {
      autoReset: true,
      mode: "tap",
    });
  }

  /* =========================================================
     HEADER OBSERVER
  ========================================================= */

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

  /* =========================================================
     PROJECT IMAGE LAZY LOADER
  ========================================================= */

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

  /* =========================================================
     PROJECT LIST
  ========================================================= */

  const hasMoreProjects = $derived(visibleCount < projects.length);

  const visibleProjects = $derived(
    projects.slice(0, Math.min(visibleCount, projects.length)),
  );

  const visibleProgress = $derived(
    `${Math.min(visibleCount, projects.length)}/${projects.length}`,
  );

  const firstPreviewIndex = $derived(
    visibleProjects.findIndex((project) => hasScrollPreview(project)),
  );

  /* =========================================================
     VISIBILITY HELPERS
  ========================================================= */

  function getVisibleRatio(rect, viewportHeight) {
    const visibleTop = Math.max(0, rect.top);

    const visibleBottom = Math.min(viewportHeight, rect.bottom);

    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

    const referenceHeight = Math.max(1, Math.min(rect.height, viewportHeight));

    return visibleHeight / referenceHeight;
  }

  function getPreviewEntries() {
    if (typeof window === "undefined") {
      return [];
    }

    const viewportHeight = window.innerHeight;

    const entries = [];

    for (const { node, config } of previewNodes.values()) {
      const { project, index } = config;

      if (!hasScrollPreview(project)) {
        continue;
      }

      const rect = node.getBoundingClientRect();

      entries.push({
        node,
        project,
        index,
        rect,

        visibleRatio: getVisibleRatio(rect, viewportHeight),

        center: rect.top + rect.height / 2,
      });
    }

    return entries;
  }

  /* =========================================================
     MOBILE
     AUTOMATIC TOP -> BOTTOM PREVIEW
  ========================================================= */

  /*
   * Finds ONE mobile screenshot that is currently the
   * strongest candidate.
   *
   * Page scroll only decides the card.
   *
   * It does NOT decide the screenshot position.
   */
  function getMobileCandidate(entries, viewportHeight) {
    const focusPoint = viewportHeight * 0.5;

    const candidates = entries.filter((entry) => {
      return (
        entry.visibleRatio >= 0.28 &&
        entry.rect.bottom > viewportHeight * 0.12 &&
        entry.rect.top < viewportHeight * 0.88
      );
    });

    if (!candidates.length) {
      return null;
    }

    let best = candidates.reduce((currentBest, entry) => {
      const score = Math.abs(entry.center - focusPoint);

      if (!currentBest || score < currentBest.score) {
        return {
          entry,
          score,
        };
      }

      return currentBest;
    }, null);

    /*
     * Keep the current card slightly longer.
     *
     * This avoids flickering if two stacked cards are
     * briefly visible around the same time.
     */
    if (mobileFocusedIndex !== null) {
      const current = candidates.find(
        (entry) => entry.index === mobileFocusedIndex,
      );

      if (current) {
        const currentScore = Math.abs(current.center - focusPoint);

        const switchMargin = viewportHeight * 0.07;

        if (currentScore <= best.score + switchMargin) {
          best = {
            entry: current,
            score: currentScore,
          };
        }
      }
    }

    return best.entry;
  }

  /*
   * Called only after the same candidate remained
   * selected for a short time.
   *
   * This is the important protection against
   * fast scrolling.
   */
  function commitMobileCandidate(expectedIndex) {
    mobileActivationTimer = null;

    if (!isMobileLayout() || hasFineHover() || prefersReducedMotion()) {
      return;
    }

    const entries = getPreviewEntries();

    const candidate = getMobileCandidate(entries, window.innerHeight);

    if (!candidate || candidate.index !== expectedIndex) {
      return;
    }

    /*
     * Already activated while inside this viewing zone.
     *
     * Do not restart repeatedly while the user remains
     * on the same card.
     */
    if (mobileFocusedIndex === candidate.index) {
      return;
    }

    mobileFocusedIndex = candidate.index;

    /*
     * THIS starts the normal CSS animation.
     *
     * It always starts at the website top and runs
     * automatically to the bottom.
     */
    startPreview(candidate.project, candidate.index, {
      autoReset: true,
      mode: "mobile-auto",
    });
  }

  function updateMobileAutoPreview(entries, viewportHeight) {
    /*
     * If a tapped screenshot is still visible,
     * leave it alone until the user scrolls away.
     */
    if (activePreviewMode === "tap" && activePreviewIndex !== null) {
      const tappedEntry = entries.find(
        (entry) => entry.index === activePreviewIndex,
      );

      if (tappedEntry && tappedEntry.visibleRatio >= 0.16) {
        return;
      }

      stopPreview(activePreviewIndex, {
        resumeTouch: false,
      });

      mobileFocusedIndex = null;
      mobileCandidateIndex = null;
    }

    /*
     * If the currently focused card has genuinely left
     * the viewing area, re-arm it.
     *
     * Therefore scrolling back upward can activate
     * the same project again from the top.
     */
    if (mobileFocusedIndex !== null) {
      const focusedEntry = entries.find(
        (entry) => entry.index === mobileFocusedIndex,
      );

      if (!focusedEntry || focusedEntry.visibleRatio < 0.14) {
        if (
          activePreviewIndex === mobileFocusedIndex &&
          activePreviewMode === "mobile-auto"
        ) {
          stopPreview(mobileFocusedIndex, {
            resumeTouch: false,
          });
        }

        mobileFocusedIndex = null;
      }
    }

    const candidate = getMobileCandidate(entries, viewportHeight);

    /*
     * Nothing suitable is currently in the viewing zone.
     */
    if (!candidate) {
      clearMobileActivationTimer();

      mobileCandidateIndex = null;

      if (mobileFocusedIndex === null && activePreviewMode === "mobile-auto") {
        stopPreview(activePreviewIndex, {
          resumeTouch: false,
        });
      }

      return;
    }

    /*
     * Same already-active mobile card.
     */
    if (candidate.index === mobileFocusedIndex) {
      mobileCandidateIndex = candidate.index;

      clearMobileActivationTimer();

      return;
    }

    /*
     * The candidate changed.
     *
     * Start a short stability timer.
     *
     * If the user is flying through the page, another
     * card becomes the candidate before this timer
     * completes, so nothing flashes unnecessarily.
     */
    if (mobileCandidateIndex !== candidate.index) {
      mobileCandidateIndex = candidate.index;

      clearMobileActivationTimer();

      mobileActivationTimer = setTimeout(() => {
        commitMobileCandidate(candidate.index);
      }, MOBILE_ACTIVATION_DELAY_MS);
    }
  }

  /* =========================================================
     TABLET
     EXISTING TWO-COLUMN LOGIC
  ========================================================= */

  function buildTabletRows(entries) {
    const sorted = [...entries].sort((a, b) => {
      const verticalDifference = a.rect.top - b.rect.top;

      if (Math.abs(verticalDifference) > 40) {
        return verticalDifference;
      }

      return a.rect.left - b.rect.left;
    });

    const rows = [];

    for (const entry of sorted) {
      let row = rows.find(
        (candidate) => Math.abs(candidate.referenceTop - entry.rect.top) <= 48,
      );

      if (!row) {
        row = {
          referenceTop: entry.rect.top,

          entries: [],
        };

        rows.push(row);
      }

      row.entries.push(entry);
    }

    return rows.map((row) => {
      row.entries.sort((a, b) => a.rect.left - b.rect.left);

      const top = Math.min(...row.entries.map((entry) => entry.rect.top));

      const bottom = Math.max(...row.entries.map((entry) => entry.rect.bottom));

      return {
        ...row,

        top,
        bottom,

        center: top + (bottom - top) / 2,
      };
    });
  }

  function updateTabletScrollPreview(entries, viewportHeight) {
    const eligibleEntries = entries.filter(
      (entry) =>
        entry.visibleRatio >= 0.12 &&
        entry.rect.bottom > 0 &&
        entry.rect.top < viewportHeight,
    );

    if (!eligibleEntries.length) {
      if (activePreviewMode === "tablet-scroll") {
        stopPreview(activePreviewIndex, {
          resumeTouch: false,
        });
      }

      return;
    }

    const rows = buildTabletRows(eligibleEntries);

    const viewportFocus = viewportHeight * 0.5;

    let bestRow = rows.reduce((currentBest, row) => {
      const score = Math.abs(row.center - viewportFocus);

      if (!currentBest || score < currentBest.score) {
        return {
          row,
          score,
        };
      }

      return currentBest;
    }, null);

    if (activePreviewMode === "tablet-scroll" && activePreviewIndex !== null) {
      const currentRow = rows.find((row) =>
        row.entries.some((entry) => entry.index === activePreviewIndex),
      );

      if (currentRow) {
        const currentScore = Math.abs(currentRow.center - viewportFocus);

        const rowSwitchMargin = viewportHeight * 0.08;

        if (currentScore <= bestRow.score + rowSwitchMargin) {
          bestRow = {
            row: currentRow,
            score: currentScore,
          };
        }
      }
    }

    const row = bestRow.row;

    const rowStart = viewportHeight * 0.84;

    const rowEnd = viewportHeight * 0.16;

    const rowProgress = clamp((rowStart - row.center) / (rowStart - rowEnd));

    if (row.entries.length === 1) {
      const selected = row.entries[0];

      activateTabletScrollPreview(
        selected.project,
        selected.index,
        rowProgress,
      );

      return;
    }

    const first = row.entries[0];

    const second = row.entries[1];

    let selected;

    if (
      activePreviewMode === "tablet-scroll" &&
      activePreviewIndex === first.index &&
      rowProgress < 0.56
    ) {
      selected = first;
    } else if (
      activePreviewMode === "tablet-scroll" &&
      activePreviewIndex === second.index &&
      rowProgress > 0.44
    ) {
      selected = second;
    } else {
      selected = rowProgress < 0.5 ? first : second;
    }

    let localProgress;

    if (selected.index === first.index) {
      localProgress = clamp(rowProgress / 0.56);
    } else {
      localProgress = clamp((rowProgress - 0.44) / 0.56);
    }

    activateTabletScrollPreview(
      selected.project,
      selected.index,
      localProgress,
    );
  }

  /* =========================================================
     GLOBAL TOUCH UPDATE
  ========================================================= */

  function updateTouchScrollPreview() {
    if (!isTouchPreviewLayout() || prefersReducedMotion()) {
      return;
    }

    const entries = getPreviewEntries();

    const viewportHeight = window.innerHeight;

    /*
     * MOBILE
     *
     * Page position selects the card.
     * Screenshot animation remains automatic.
     */
    if (isMobileLayout()) {
      updateMobileAutoPreview(entries, viewportHeight);

      return;
    }

    /*
     * TABLET
     */
    if (isTabletLayout()) {
      /*
       * Manual tap temporarily takes priority.
       */
      if (activePreviewMode === "tap" && activePreviewIndex !== null) {
        const tappedEntry = entries.find(
          (entry) => entry.index === activePreviewIndex,
        );

        if (tappedEntry && tappedEntry.visibleRatio >= 0.12) {
          return;
        }

        stopPreview(activePreviewIndex, {
          resumeTouch: false,
        });
      }

      updateTabletScrollPreview(entries, viewportHeight);
    }
  }

  /* =========================================================
     PROJECT PREVIEW ACTION
  ========================================================= */

  function observeProjectPreview(node, config) {
    let currentConfig = config;

    let desktopObserver;

    previewNodes.set(node, {
      node,
      config: currentConfig,
    });

    scheduleTouchPreviewUpdate();

    /*
     * Desktop automatic first-project demonstration.
     */
    if (typeof IntersectionObserver !== "undefined") {
      desktopObserver = new IntersectionObserver(
        ([entry]) => {
          const { project, index, isFirst } = currentConfig;

          if (!hasScrollPreview(project)) {
            return;
          }

          if (prefersReducedMotion()) {
            return;
          }

          if (isTouchPreviewLayout()) {
            return;
          }

          if (!hasFineHover()) {
            return;
          }

          if (
            isFirst &&
            !initialPreviewPlayed &&
            entry.isIntersecting &&
            entry.intersectionRatio >= 0.45
          ) {
            initialPreviewPlayed = true;

            startPreview(project, index, {
              autoReset: true,
              mode: "desktop",
            });
          }
        },
        {
          threshold: [0, 0.15, 0.45, 0.55, 0.75, 1],

          rootMargin: "0px 0px -4% 0px",
        },
      );

      desktopObserver.observe(node);
    }

    return {
      update(nextConfig) {
        currentConfig = nextConfig;

        previewNodes.set(node, {
          node,
          config: currentConfig,
        });

        scheduleTouchPreviewUpdate();
      },

      destroy() {
        desktopObserver?.disconnect();

        previewNodes.delete(node);

        scheduleTouchPreviewUpdate();
      },
    };
  }

  /* =========================================================
     LOAD MORE
  ========================================================= */

  function loadMoreProjects() {
    visibleCount = Math.min(visibleCount + LOAD_MORE_COUNT, projects.length);

    requestAnimationFrame(() => {
      scheduleTouchPreviewUpdate();
    });
  }

  function toggleProjectDescription(index) {
    expandedProjectDescription =
      expandedProjectDescription === index ? null : index;
  }

  /* =========================================================
     GLOBAL SCROLL LISTENERS
  ========================================================= */

  onMount(() => {
    function handleScroll() {
      scheduleTouchPreviewUpdate();
    }

    function handleResize() {
      if (!isMobileLayout()) {
        clearMobileActivationTimer();

        mobileFocusedIndex = null;
        mobileCandidateIndex = null;
      }

      scheduleTouchPreviewUpdate();
    }

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", handleResize, {
      passive: true,
    });

    window.addEventListener("orientationchange", handleResize, {
      passive: true,
    });

    requestAnimationFrame(() => {
      scheduleTouchPreviewUpdate();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      window.removeEventListener("resize", handleResize);

      window.removeEventListener("orientationchange", handleResize);
    };
  });

  onDestroy(() => {
    clearPreviewResetTimer();
    clearMobileActivationTimer();

    if (touchScrollFrame !== null) {
      cancelAnimationFrame(touchScrollFrame);

      touchScrollFrame = null;
    }

    previewNodes.clear();
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
            <h2>
              {title}
            </h2>
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
                <!-- THUMBNAIL -->

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
                    class:tablet-scroll-controlled={activePreviewIndex ===
                      index && activePreviewMode === "tablet-scroll"}
                    style={`--preview-position: ${previewPositionByIndex[index] ?? 0}%;`}
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

    color: #fff;
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

  .project-image-wrap.has-scroll-preview {
    cursor: pointer;

    outline: none;

    -webkit-tap-highlight-color: transparent;
  }

  .project-image-wrap.has-scroll-preview:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: -2px;
  }

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

  /* =========================================================
     FULL WEBSITE SCREENSHOT
  ========================================================= */

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

    /*
     * Every inactive screenshot is always reset to its TOP.
     */
    object-position: center top;

    transform: scale(0.94);

    opacity: 0;

    pointer-events: none;

    transition: opacity 0.3s ease;

    backface-visibility: hidden;
  }

  /*
   * Normal automatic animation.
   *
   * Desktop, tap AND mobile automatic activation all
   * use exactly this.
   *
   * It always runs:
   *
   * TOP -> BOTTOM
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
   * TABLET ONLY.
   *
   * Tablet may still use viewport position because of its
   * two-column row behaviour.
   *
   * MOBILE NEVER receives this class.
   */
  .project-scroll-image.active.tablet-scroll-controlled {
    object-position: center var(--preview-position, 0%);

    transition:
      opacity 0.22s ease,
      object-position 70ms linear;

    will-change: object-position, opacity;
  }

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

    .project-card:hover .project-thumbnail {
      transform: scale(1);
    }

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
     TOUCH
  ========================================================= */

  @media (hover: none) and (pointer: coarse) and (max-width: 1024px) {
    .project-image-wrap.has-scroll-preview {
      /*
       * Normal vertical page scrolling remains completely free.
       */
      touch-action: pan-y;
    }

    .project-card:hover {
      transform: none;

      box-shadow: none;
    }

    .project-card:hover .project-thumbnail {
      transform: scale(0.94);
    }
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

    .project-scroll-image.active.tablet-scroll-controlled {
      transition:
        opacity 0.2s ease,
        object-position 65ms linear;
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

    .project-thumbnail {
      height: auto;

      aspect-ratio: 16 / 9;

      object-fit: contain;
    }

    .project-scroll-image {
      top: 10px;
      right: 10px;
      bottom: 10px;
      left: 10px;

      width: calc(100% - 20px);

      height: calc(100% - 20px);

      transform: scale(0.94);
    }

    /*
     * IMPORTANT:
     *
     * Mobile uses the NORMAL .active animation.
     *
     * No object-position tied to page scroll.
     * No finger-controlled screenshot progress.
     *
     * Once activated:
     *
     * TOP -> BOTTOM automatically in 11 seconds.
     */

    .project-scroll-image.active {
      object-position: center bottom;

      transition:
        opacity 0.3s ease,
        object-position 11s cubic-bezier(0.22, 0.61, 0.36, 1);
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

    .project-scroll-image,
    .project-scroll-image.active,
    .project-scroll-image.active.tablet-scroll-controlled {
      opacity: 0;

      object-position: center top;

      transition: none;
    }

    .project-image-wrap.preview-active .project-thumbnail {
      opacity: 1;
    }
  }
</style>
