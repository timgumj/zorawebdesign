<script>
  import { onMount } from "svelte";

  let { project, language = "en" } = $props();

  let activeFeatureIndex = $state(0);
  let detailsOpen = $state(false);

  let tabScroller = $state(null);
  let tabProgressSize = $state(25);
  let tabProgressOffset = $state(0);

  const activeFeature = $derived(project.features[activeFeatureIndex]);

  /* =========================================================
     TAB SELECTION
  ========================================================= */

  function selectFeature(index, event) {
    activeFeatureIndex = index;

    /*
     * Tablet/mobile copy starts closed
     * whenever another feature is selected.
     */
    detailsOpen = false;

    if (typeof window !== "undefined" && window.innerWidth <= 767) {
      requestAnimationFrame(() => {
        event?.currentTarget?.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });

        requestAnimationFrame(updateTabProgress);
      });
    }
  }

  function toggleDetails() {
    detailsOpen = !detailsOpen;
  }

  /* =========================================================
     MOBILE TAB PROGRESS
  ========================================================= */

  function updateTabProgress() {
    if (!tabScroller) {
      return;
    }

    const scrollWidth = tabScroller.scrollWidth;

    const clientWidth = tabScroller.clientWidth;

    const maxScroll = Math.max(0, scrollWidth - clientWidth);

    const visibleRatio = scrollWidth > 0 ? clientWidth / scrollWidth : 1;

    const size = Math.min(100, Math.max(18, visibleRatio * 100));

    const scrollRatio = maxScroll > 0 ? tabScroller.scrollLeft / maxScroll : 0;

    tabProgressSize = size;

    tabProgressOffset = scrollRatio * (100 - size);
  }

  onMount(() => {
    const frame = requestAnimationFrame(updateTabProgress);

    window.addEventListener("resize", updateTabProgress);

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener("resize", updateTabProgress);
    };
  });
</script>

<section
  id="featured-project"
  class="featured-project"
  aria-labelledby="featured-project-title"
>
  <div class="featured-shell">
    <span class="shell-line edge-left" aria-hidden="true"></span>

    <span class="shell-line edge-right" aria-hidden="true"></span>

    <div class="featured-container">
      <!-- =====================================================
           PROJECT INTRO
      ====================================================== -->

      <header class="project-header">
        <div class="project-header-copy">
          <span class="project-kicker">
            {project.sectionTitle}
          </span>

          <h2 id="featured-project-title">
            {project.projectTitle}
          </h2>

          <p class="project-lead">
            {project.projectLead}
          </p>

          <p class="project-text">
            {project.projectText}
          </p>

          <a
            href={project.websiteUrl}
            class="project-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {project.websiteLabel}
            </span>

            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
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
        </div>

        <!-- =================================================
             INDIVIDUAL RESULT BRACKETS
        ================================================== -->

        <div
          class="header-stats"
          aria-label={language === "de"
            ? "Projektergebnisse"
            : "Project results"}
        >
          {#each project.stats as stat}
            <div class="header-stat">
              <strong>
                {stat.value}
              </strong>

              <span>
                {stat.label}
              </span>
            </div>
          {/each}
        </div>
      </header>

      <!-- =====================================================
           PROJECT IMAGE
      ====================================================== -->

      <div class="project-image">
        <img
          src={project.heroImage}
          alt={project.heroImageAlt}
          width="1448"
          height="1086"
          loading="eager"
          decoding="async"
        />
      </div>

      <!-- =====================================================
           FEATURE DASHBOARD
      ====================================================== -->

      <section
        class="feature-dashboard"
        aria-label={language === "de" ? "Projektresultate" : "Project results"}
      >
        <!-- =================================================
             FEATURE TABS
        ================================================== -->

        <div class="feature-tabs-wrap">
          <div
            class="feature-tabs"
            bind:this={tabScroller}
            role="tablist"
            aria-label={language === "de" ? "Projektbereiche" : "Project areas"}
            onscroll={updateTabProgress}
          >
            {#each project.features as feature, index}
              <button
                type="button"
                class="feature-tab"
                class:active={activeFeatureIndex === index}
                role="tab"
                aria-selected={activeFeatureIndex === index}
                aria-controls="featured-project-panel"
                onclick={(event) => selectFeature(index, event)}
              >
                <!-- =====================================
                     ICON
                ====================================== -->

                <span class="feature-tab-icon" aria-hidden="true">
                  <!-- SEARCH -->

                  {#if feature.icon === "search"}
                    <svg
                      class="native-toggle-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle class="magnifier-ring" cx="10.5" cy="10.5" r="5.7"
                      ></circle>

                      <path class="magnifier-handle" d="m14.7 14.7 4.4 4.4"
                      ></path>

                      <path class="magnifier-detail" d="M8.5 10.5h4"></path>
                    </svg>

                    <!-- PERFORMANCE -->
                  {:else if feature.icon === "performance"}
                    <svg
                      class="native-toggle-icon"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path class="speed-arc" d="M5 17.5a8 8 0 1 1 14 0"></path>

                      <path d="M7.1 15.7h9.8"></path>

                      <path class="speed-needle" d="m12 14.6 3.3-5.2"></path>

                      <circle class="speed-center" cx="12" cy="14.6" r="1.3"
                      ></circle>
                    </svg>

                    <!-- GOOGLE BUSINESS -->
                  {:else if feature.icon === "business"}
                    <img
                      class="lord-toggle-icon"
                      src="https://media.lordicon.com/icons/wired/outline/18-location-pin.svg"
                      alt=""
                      width="34"
                      height="34"
                      loading="eager"
                    />

                    <!-- BOOKING -->
                  {:else}
                    <img
                      class="lord-toggle-icon"
                      src="https://media.lordicon.com/icons/system/outline/364-calendar-dots.svg"
                      alt=""
                      width="34"
                      height="34"
                      loading="eager"
                    />
                  {/if}
                </span>

                <!-- =====================================
                     COPY
                ====================================== -->

                <span class="feature-tab-copy">
                  <span class="feature-tab-title">
                    {feature.tabTitle}
                  </span>

                  <span class="feature-tab-hint">
                    {feature.tabHint}
                  </span>
                </span>
              </button>
            {/each}
          </div>

          <!-- ===========================================
               CUSTOM MOBILE SCROLL INDICATOR

               Browser scrollbar remains hidden.
               This is the only visible progress line.
          ============================================ -->

          <div
            class="mobile-tab-progress"
            style={`--progress-size: ${tabProgressSize}%; --progress-offset: ${tabProgressOffset}%;`}
            aria-hidden="true"
          >
            <span></span>
          </div>
        </div>

        <!-- =================================================
             ACTIVE PANEL
        ================================================== -->

        <div class="feature-panel" id="featured-project-panel" role="tabpanel">
          <!-- ===============================================
               COPY
          ================================================ -->

          <div class="feature-copy">
            <div class="feature-copy-inner" class:details-open={detailsOpen}>
              <div class="feature-copy-heading">
                <h3>
                  {activeFeature.title}
                </h3>

                <!-- TABLET / MOBILE ONLY -->

                <button
                  type="button"
                  class="details-toggle"
                  aria-expanded={detailsOpen}
                  aria-label={detailsOpen
                    ? language === "de"
                      ? "Details schließen"
                      : "Close details"
                    : language === "de"
                      ? "Details öffnen"
                      : "Open details"}
                  onclick={toggleDetails}
                >
                  <span>
                    {detailsOpen ? "−" : "+"}
                  </span>
                </button>
              </div>

              <div class="feature-detail-body">
                <p class="feature-description">
                  {activeFeature.text}
                </p>

                <!-- =====================================
                     [] SUMMARIES
                     PURE WHITE AGAIN
                ====================================== -->

                <div class="feature-tags">
                  {#each activeFeature.work as item}
                    <span>
                      {item}
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <!-- ===============================================
               VISUAL
          ================================================ -->

          <div class="feature-visual">
            <div class="feature-visual-inner">
              <!-- ===========================================
                   SEARCH
              ============================================ -->

              {#if activeFeature.id === "visibility"}
                <div class="search-chart">
                  <!-- TOP -->

                  <div class="chart-top">
                    <div class="chart-heading">
                      <span>
                        {activeFeature.graph.eyebrow}
                      </span>
                    </div>

                    <!-- =====================================
                         INDIVIDUAL [] METRIC BRACKETS
                    ====================================== -->

                    <div class="growth-metrics">
                      <div class="growth-metric">
                        <div class="growth-value">
                          <strong>
                            {activeFeature.graph.visitorsGrowth}
                          </strong>

                          <span>
                            {activeFeature.graph.visitorsGrowthWord}
                          </span>
                        </div>

                        <small>
                          {activeFeature.graph.visitorsGrowthLabel}
                        </small>
                      </div>

                      <div class="growth-metric">
                        <div class="growth-value">
                          <strong>
                            {activeFeature.graph.enquiriesGrowth}
                          </strong>

                          <span>
                            {activeFeature.graph.enquiriesGrowthWord}
                          </span>
                        </div>

                        <small>
                          {activeFeature.graph.enquiriesGrowthLabel}
                        </small>
                      </div>
                    </div>
                  </div>

                  <!-- =====================================
                       KEY
                  ====================================== -->

                  <div class="chart-key">
                    <span>
                      <i class="key-visitors"></i>

                      {activeFeature.graph.visitorsLegend}
                    </span>

                    <span>
                      <i class="key-enquiries"></i>

                      {activeFeature.graph.enquiriesLegend}
                    </span>
                  </div>

                  <!-- =====================================
                       GRAPH
                  ====================================== -->

                  <div class="graph-area">
                    <span class="graph-grid graph-grid-a"></span>
                    <span class="graph-grid graph-grid-b"></span>
                    <span class="graph-grid graph-grid-c"></span>

                    <!-- =================================
                         IMPACT NOTE
                    ================================== -->

                    <div class="graph-impact">
                      <strong>
                        {activeFeature.graph.impactTitle}
                      </strong>

                      <p>
                        {activeFeature.graph.impactText}
                      </p>
                    </div>

                    <!-- =================================
                         GRAPH CURVES
                    ================================== -->

                    <svg
                      viewBox="0 0 1000 400"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <!-- ===============================
                           ENQUIRIES

                           Controlled rises and dips.
                           No sharp cheap-looking zigzag.
                      ================================ -->

                      <path
                        class="enquiries-fill"
                        d="
                          M35 356

                          C115 354
                          175 350
                          225 331

                          C267 315
                          288 254
                          318 210

                          C347 168
                          378 161
                          410 194

                          C445 229
                          464 260
                          500 249

                          C538 237
                          565 181
                          602 151

                          C635 124
                          667 139
                          700 168

                          C732 196
                          760 186
                          793 153

                          C826 120
                          854 104
                          883 116

                          C915 129
                          943 84
                          965 45

                          L965 390
                          L35 390
                          Z
                        "
                      ></path>

                      <path
                        class="enquiries-line"
                        d="
                          M35 356

                          C115 354
                          175 350
                          225 331

                          C267 315
                          288 254
                          318 210

                          C347 168
                          378 161
                          410 194

                          C445 229
                          464 260
                          500 249

                          C538 237
                          565 181
                          602 151

                          C635 124
                          667 139
                          700 168

                          C732 196
                          760 186
                          793 153

                          C826 120
                          854 104
                          883 116

                          C915 129
                          943 84
                          965 45
                        "
                      ></path>

                      <!-- ===============================
                           WEBSITE VISITORS
                      ================================ -->

                      <path
                        class="visitors-fill"
                        d="
                          M35 360

                          C135 356
                          208 344
                          292 321

                          C378 298
                          450 282
                          527 259

                          C607 235
                          673 206
                          736 168

                          C798 130
                          846 90
                          890 58

                          C922 35
                          947 22
                          965 14

                          L965 390
                          L35 390
                          Z
                        "
                      ></path>

                      <path
                        class="visitors-line"
                        d="
                          M35 360

                          C135 356
                          208 344
                          292 321

                          C378 298
                          450 282
                          527 259

                          C607 235
                          673 206
                          736 168

                          C798 130
                          846 90
                          890 58

                          C922 35
                          947 22
                          965 14
                        "
                      ></path>

                      <!-- QUARTER MARKERS -->

                      <circle class="visitor-dot" cx="208" cy="344" r="4"
                      ></circle>

                      <circle class="visitor-dot" cx="378" cy="298" r="4"
                      ></circle>

                      <circle class="visitor-dot" cx="560" cy="249" r="4"
                      ></circle>

                      <circle class="visitor-dot" cx="736" cy="168" r="4"
                      ></circle>

                      <circle class="visitor-dot" cx="890" cy="58" r="4"
                      ></circle>

                      <circle
                        class="visitor-dot final-dot"
                        cx="965"
                        cy="14"
                        r="6"
                      ></circle>
                    </svg>

                    <!-- =================================
                         X AXIS
                    ================================== -->

                    <div class="graph-timeline">
                      {#each activeFeature.graph.timeline as period}
                        <span>
                          {period}
                        </span>
                      {/each}
                    </div>
                  </div>
                </div>

                <!-- ===========================================
                   CORE WEB VITALS
              ============================================ -->
              {:else if activeFeature.id === "performance"}
                <div class="image-evidence">
                  <div class="evidence-heading">
                    <span>
                      {activeFeature.imageLabel}
                    </span>

                    <strong>
                      {activeFeature.imageResult}
                    </strong>
                  </div>

                  <div class="evidence-image">
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.imageAlt}
                      width="1448"
                      height="1086"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p class="evidence-note">
                    {activeFeature.imageNote}
                  </p>
                </div>

                <!-- ===========================================
                   GOOGLE BUSINESS
              ============================================ -->
              {:else if activeFeature.id === "business"}
                <div class="image-evidence">
                  <div class="evidence-heading">
                    <span>
                      {activeFeature.imageLabel}
                    </span>

                    <strong>
                      {activeFeature.imageResult}
                    </strong>
                  </div>

                  <div class="evidence-image">
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.imageAlt}
                      width="1448"
                      height="1086"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p class="evidence-note">
                    {activeFeature.imageNote}
                  </p>
                </div>

                <!-- ===========================================
                   BOOKING
              ============================================ -->
              {:else}
                <div class="image-evidence">
                  <div class="evidence-heading">
                    <span>
                      {activeFeature.imageLabel}
                    </span>

                    <strong>
                      {activeFeature.imageResult}
                    </strong>
                  </div>

                  <div class="evidence-image">
                    <img
                      src={activeFeature.image}
                      alt={activeFeature.imageAlt}
                      width="1448"
                      height="1086"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>

                  <p class="evidence-note">
                    {activeFeature.imageNote}
                  </p>
                </div>
              {/if}
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</section>

<style>
  /* =========================================================
     BASE
  ========================================================= */

  .featured-project {
    --accent-blue: #0043ff;

    --section-bg: #0c0c0c;
    --panel-bg: #121212;
    --graph-bg: #242526;

    --evidence-height: 338px;

    width: 100vw;

    margin-left: calc(50% - 50vw);

    overflow: clip;

    background: var(--section-bg);

    color: #fff;

    color-scheme: dark;

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     SHELL
  ========================================================= */

  .featured-shell {
    --shell-x: 40px;

    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding: 95px var(--shell-x);

    box-sizing: border-box;
  }

  .featured-container {
    position: relative;

    z-index: 1;

    width: 100%;
  }

  .shell-line {
    position: absolute;

    top: 0;
    bottom: 0;

    width: 1px;

    background: rgba(255, 255, 255, 0.045);

    pointer-events: none;
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  /* =========================================================
     PROJECT HEADER
  ========================================================= */

  .project-header {
    display: grid;

    grid-template-columns:
      minmax(0, 1.12fr)
      auto;

    gap: clamp(48px, 7vw, 105px);

    align-items: center;

    padding: 0 0 34px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
  }

  .project-header-copy {
    max-width: 760px;
  }

  .project-kicker {
    display: block;

    margin: 0 0 10px;

    color: rgba(255, 255, 255, 0.5);

    font-size: 11px;
    line-height: 1;

    font-weight: 600;

    letter-spacing: 0.12em;

    text-transform: uppercase;
  }

  .project-header h2 {
    margin: 0 0 10px;

    color: #fff;

    font-size: clamp(24px, 2.1vw, 34px);

    line-height: 1.08;

    letter-spacing: -0.035em;

    font-weight: 600;
  }

  .project-lead {
    max-width: 720px;

    margin: 0 0 7px;

    color: rgba(255, 255, 255, 0.72);

    font-size: 16px;
    line-height: 1.55;

    font-weight: 500;
  }

  .project-text {
    max-width: 720px;

    margin: 0 0 18px;

    color: #999;

    font-size: 16px;
    line-height: 1.6;

    font-weight: 400;
  }

  /* =========================================================
     PROJECT LINK
  ========================================================= */

  .project-link {
    display: inline-flex;

    align-items: center;

    gap: 8px;

    color: #fff;

    font-size: 12px;
    line-height: 1;

    font-weight: 600;

    letter-spacing: 0.05em;

    text-transform: uppercase;

    text-decoration: none;
  }

  .project-link > span {
    padding-bottom: 6px;

    border-bottom: 1px solid var(--accent-blue);
  }

  .project-link svg {
    width: 14px;
    height: 14px;

    color: var(--accent-blue);
  }

  /* =========================================================
     INDIVIDUAL HEADER STAT BRACKETS
  ========================================================= */

  .header-stats {
    display: grid;

    grid-template-columns: repeat(2, auto);

    gap: 9px;

    width: fit-content;
  }

  .header-stat {
    --stat-border: rgba(255, 255, 255, 0.38);

    position: relative;

    min-width: 126px;

    padding: 11px 17px;

    box-sizing: border-box;
  }

  .header-stat::before,
  .header-stat::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 10px;

    box-sizing: border-box;

    border-top: 1px solid var(--stat-border);

    border-bottom: 1px solid var(--stat-border);
  }

  .header-stat::before {
    left: 0;

    border-left: 1px solid var(--stat-border);
  }

  .header-stat::after {
    right: 0;

    border-right: 1px solid var(--stat-border);
  }

  .header-stat strong {
    display: block;

    margin-bottom: 4px;

    color: #fff;

    font-size: 22px;
    line-height: 1;

    font-weight: 700;

    letter-spacing: -0.03em;
  }

  .header-stat span {
    display: block;

    color: rgba(255, 255, 255, 0.52);

    font-size: 11px;
    line-height: 1.25;

    font-weight: 500;

    letter-spacing: 0.045em;

    text-transform: uppercase;
  }

  /* =========================================================
     PROJECT IMAGE
  ========================================================= */

  .project-image {
    width: 100%;

    margin-top: 34px;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.12);

    background: #111;

    box-sizing: border-box;
  }

  .project-image img {
    display: block;

    width: 100%;
    height: auto;
  }

  /* =========================================================
     DASHBOARD
  ========================================================= */

  .feature-dashboard {
    width: 100%;

    margin-top: 34px;
  }

  /* =========================================================
     DESKTOP TABS

     Centered with tiny gap below.
  ========================================================= */

  .feature-tabs-wrap {
    display: flex;

    flex-direction: column;

    align-items: center;

    width: 100%;

    margin-bottom: 8px;
  }

  .feature-tabs {
    display: grid;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    width: min(1180px, 88%);

    border-top: 1px solid rgba(255, 255, 255, 0.16);

    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  }

  .feature-tab {
    appearance: none;

    position: relative;

    display: grid;

    grid-template-columns:
      34px
      minmax(0, 1fr);

    align-items: center;

    gap: 13px;

    min-width: 0;

    min-height: 86px;

    margin: 0;

    padding: 14px 17px;

    border: 0;

    border-left: 1px solid rgba(255, 255, 255, 0.16);

    border-radius: 0;

    background: transparent;

    color: rgba(255, 255, 255, 0.46);

    font: inherit;

    text-align: left;

    cursor: pointer;

    transition:
      color 0.2s ease,
      background 0.2s ease;
  }

  .feature-tab:last-child {
    border-right: 1px solid rgba(255, 255, 255, 0.16);
  }

  .feature-tab::after {
    content: "";

    position: absolute;

    right: 0;
    bottom: -1px;
    left: 0;

    height: 1px;

    background: transparent;
  }

  .feature-tab.active {
    background: #181818;

    color: #fff;
  }

  .feature-tab.active::after {
    background: #fff;
  }

  .feature-tab:hover {
    color: rgba(255, 255, 255, 0.82);
  }

  .feature-tab:focus-visible {
    outline: 1px solid rgba(255, 255, 255, 0.8);

    outline-offset: -2px;
  }

  /* =========================================================
     ICONS
  ========================================================= */

  .feature-tab-icon {
    display: flex;

    align-items: center;

    justify-content: center;

    width: 34px;
    height: 34px;

    color: rgba(255, 255, 255, 0.5);
  }

  .feature-tab.active .feature-tab-icon {
    color: #fff;
  }

  .native-toggle-icon {
    display: block;

    width: 31px;
    height: 31px;

    overflow: visible;

    stroke: currentColor;

    stroke-width: 1.35;

    stroke-linecap: round;

    stroke-linejoin: round;
  }

  .lord-toggle-icon {
    display: block;

    width: 33px;
    height: 33px;

    object-fit: contain;

    filter: brightness(0) invert(1);

    opacity: 0.5;
  }

  .feature-tab.active .lord-toggle-icon {
    opacity: 1;
  }

  .speed-needle {
    transform-box: fill-box;

    transform-origin: 0% 100%;

    transition: transform 0.25s ease;
  }

  .feature-tab:hover .speed-needle,
  .feature-tab.active .speed-needle {
    transform: rotate(7deg);
  }

  /* =========================================================
     TAB COPY
  ========================================================= */

  .feature-tab-copy {
    min-width: 0;

    display: flex;

    flex-direction: column;

    justify-content: center;

    gap: 5px;
  }

  .feature-tab-title {
    color: inherit;

    font-size: 13px;
    line-height: 1.25;

    font-weight: 700;

    letter-spacing: 0.04em;

    text-transform: uppercase;
  }

  .feature-tab-hint {
    color: rgba(255, 255, 255, 0.38);

    font-size: 11px;
    line-height: 1.25;

    font-weight: 500;

    text-transform: uppercase;
  }

  .feature-tab.active .feature-tab-hint {
    color: rgba(255, 255, 255, 0.66);
  }

  /* =========================================================
     MOBILE CUSTOM PROGRESS

     Hidden everywhere except mobile.
  ========================================================= */

  .mobile-tab-progress {
    display: none;
  }

  /* =========================================================
     PANEL
  ========================================================= */

  .feature-panel {
    display: grid;

    grid-template-columns:
      minmax(320px, 0.72fr)
      minmax(0, 1.28fr);

    min-height: 500px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* =========================================================
     COPY
  ========================================================= */

  .feature-copy {
    min-width: 0;

    display: flex;

    align-items: center;

    background: var(--panel-bg);

    border-right: 1px solid rgba(255, 255, 255, 0.11);

    box-sizing: border-box;
  }

  .feature-copy-inner {
    width: 100%;

    padding: 34px;

    box-sizing: border-box;
  }

  .feature-copy-heading {
    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 18px;
  }

  .feature-copy h3 {
    max-width: 470px;

    margin: 0 0 14px;

    color: #fff;

    font-size: 15px;
    line-height: 1.4;

    font-weight: 700;

    letter-spacing: 0.05em;

    text-transform: uppercase;
  }

  .details-toggle {
    display: none;
  }

  .feature-description {
    max-width: 500px;

    margin: 0 0 24px;

    color: #999;

    font-size: 16px;
    line-height: 1.6;

    font-weight: 400;
  }

  /* =========================================================
     [] SUMMARY

     WHITE AGAIN.
  ========================================================= */

  .feature-tags {
    display: flex;

    flex-wrap: wrap;

    gap: 8px 12px;
  }

  .feature-tags span {
    color: #fff;

    font-size: 11px;
    line-height: 1.3;

    font-weight: 500;

    letter-spacing: 0.035em;

    text-transform: uppercase;
  }

  .feature-tags span::before {
    content: "[";

    margin-right: 3px;

    color: #fff;
  }

  .feature-tags span::after {
    content: "]";

    margin-left: 3px;

    color: #fff;
  }

  /* =========================================================
     VISUAL SIDE
  ========================================================= */

  .feature-visual {
    min-width: 0;

    display: flex;

    background: var(--graph-bg);

    box-sizing: border-box;
  }

  .feature-visual-inner {
    width: 100%;

    padding: 30px 34px;

    box-sizing: border-box;
  }

  /* =========================================================
     SEARCH CHART
  ========================================================= */

  .search-chart {
    position: relative;

    width: 100%;

    min-height: calc(var(--evidence-height) + 102px);
  }

  .chart-top {
    display: flex;

    align-items: flex-start;

    justify-content: space-between;

    gap: 32px;
  }

  .chart-heading span {
    color: rgba(255, 255, 255, 0.78);

    font-size: 11px;
    line-height: 1.3;

    font-weight: 700;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  /* =========================================================
     GROWTH METRIC BRACKETS
  ========================================================= */

  .growth-metrics {
    display: flex;

    align-items: flex-start;

    gap: 13px;
  }

  .growth-metric {
    --growth-border: rgba(255, 255, 255, 0.38);

    position: relative;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    min-width: 185px;

    padding: 11px 17px;

    box-sizing: border-box;

    text-align: left;
  }

  .growth-metric::before,
  .growth-metric::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 10px;

    box-sizing: border-box;

    border-top: 1px solid var(--growth-border);

    border-bottom: 1px solid var(--growth-border);
  }

  .growth-metric::before {
    left: 0;

    border-left: 1px solid var(--growth-border);
  }

  .growth-metric::after {
    right: 0;

    border-right: 1px solid var(--growth-border);
  }

  .growth-value {
    display: flex;

    align-items: baseline;

    justify-content: flex-start;

    gap: 7px;

    width: 100%;
  }

  .growth-value strong {
    color: #fff;

    font-size: clamp(30px, 3vw, 43px);

    line-height: 0.95;

    letter-spacing: -0.04em;

    font-weight: 500;
  }

  /*
   * "more / mehr"
   * and the label below now share
   * the same typography.
   */

  .growth-value span,
  .growth-metric small {
    color: rgba(255, 255, 255, 0.67);

    font-size: 11px;
    line-height: 1.25;

    font-weight: 600;

    letter-spacing: 0.035em;
  }

  .growth-value span {
    text-transform: none;
  }

  .growth-metric small {
    display: block;

    width: 100%;

    margin-top: 8px;

    text-align: left;

    text-transform: uppercase;
  }

  /* =========================================================
     KEY
  ========================================================= */

  .chart-key {
    display: flex;

    flex-direction: column;

    gap: 9px;

    margin-top: 21px;
  }

  .chart-key span {
    display: inline-flex;

    align-items: center;

    gap: 9px;

    width: fit-content;

    color: rgba(255, 255, 255, 0.82);

    font-size: 12px;
    line-height: 1.2;

    font-weight: 500;
  }

  .chart-key i {
    display: block;

    width: 10px;
    height: 10px;

    border-radius: 50%;
  }

  .key-visitors {
    background: var(--accent-blue);
  }

  .key-enquiries {
    background: #c9d0ee;
  }

  /* =========================================================
     GRAPH
  ========================================================= */

  .graph-area {
    position: absolute;

    right: 0;
    bottom: 0;
    left: 0;

    height: var(--evidence-height);
  }

  .graph-grid {
    position: absolute;

    right: 0;
    left: 0;

    height: 1px;

    background: rgba(255, 255, 255, 0.055);
  }

  .graph-grid-a {
    top: 25%;
  }

  .graph-grid-b {
    top: 50%;
  }

  .graph-grid-c {
    top: 75%;
  }

  .graph-area > svg {
    position: absolute;

    inset: 0;

    z-index: 1;

    width: 100%;

    height: calc(100% - 36px);

    overflow: visible;
  }

  /* =========================================================
     ENQUIRIES
  ========================================================= */

  .enquiries-fill {
    fill: rgba(201, 208, 238, 0.13);
  }

  .enquiries-line {
    fill: none;

    stroke: #c9d0ee;

    stroke-width: 1.35;
  }

  /* =========================================================
     VISITORS
  ========================================================= */

  .visitors-fill {
    fill: rgba(0, 67, 255, 0.25);
  }

  .visitors-line {
    fill: none;

    stroke: var(--accent-blue);

    stroke-width: 1.7;
  }

  .visitor-dot {
    fill: var(--graph-bg);

    stroke: var(--accent-blue);

    stroke-width: 2;
  }

  .final-dot {
    fill: var(--accent-blue);
  }

  /* =========================================================
     IMPACT
  ========================================================= */

  .graph-impact {
    position: absolute;

    top: 64px;
    left: 22px;

    z-index: 3;

    width: min(290px, 37%);

    padding-left: 14px;

    border-left: 2px solid var(--accent-blue);
  }

  .graph-impact strong {
    display: block;

    margin-bottom: 6px;

    color: #fff;

    font-size: 13px;
    line-height: 1.3;

    font-weight: 700;

    letter-spacing: 0.04em;

    text-transform: uppercase;
  }

  .graph-impact p {
    margin: 0;

    color: rgba(255, 255, 255, 0.64);

    font-size: 12px;
    line-height: 1.5;
  }

  /* =========================================================
     X AXIS
  ========================================================= */

  .graph-timeline {
    position: absolute;

    right: 0;
    bottom: 0;
    left: 0;

    z-index: 2;

    display: grid;

    grid-template-columns: repeat(6, minmax(0, 1fr));

    gap: 5px;
  }

  .graph-timeline span {
    color: rgba(255, 255, 255, 0.6);

    font-size: 11px;
    line-height: 1.2;

    font-weight: 500;

    text-align: center;

    text-transform: uppercase;
  }

  .graph-timeline span:first-child {
    text-align: left;
  }

  .graph-timeline span:last-child {
    text-align: right;
  }

  /* =========================================================
     IMAGE EVIDENCE

     SAME HEIGHT AS GRAPH.
     WIDE FRAME MEANS COVER CROPS VERTICALLY,
     NOT HORIZONTALLY.
  ========================================================= */

  .image-evidence {
    display: flex;

    flex-direction: column;

    width: 100%;
  }

  .evidence-heading {
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 24px;

    min-height: 42px;

    margin-bottom: 18px;
  }

  .evidence-heading > span {
    color: rgba(255, 255, 255, 0.73);

    font-size: 11px;
    line-height: 1.3;

    font-weight: 700;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  .evidence-heading strong {
    color: #fff;

    font-size: 18px;
    line-height: 1.2;

    font-weight: 600;

    text-align: right;
  }

  .evidence-image {
    width: 100%;

    height: var(--evidence-height);

    overflow: hidden;

    background: transparent;

    border: 1px solid rgba(255, 255, 255, 0.1);

    box-sizing: border-box;
  }

  .evidence-image img {
    display: block;

    width: 100%;
    height: 100%;

    object-fit: cover;

    object-position: center center;
  }

  .evidence-note {
    margin: 15px 0 0;

    color: rgba(255, 255, 255, 0.6);

    font-size: 13px;
    line-height: 1.5;

    font-weight: 400;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .featured-project {
      --evidence-height: 300px;
    }

    .shell-line {
      display: none;
    }

    .featured-shell {
      width: 90%;

      padding: 85px 0;
    }

    .project-header {
      gap: 35px;
    }

    .project-lead,
    .project-text {
      font-size: 14px;
    }

    /* -----------------------------------------
       HEADER STATS
    ----------------------------------------- */

    .header-stats {
      gap: 7px;
    }

    .header-stat {
      min-width: 102px;

      padding: 10px 14px;
    }

    .header-stat strong {
      font-size: 20px;
    }

    /* -----------------------------------------
       TABS

       Keep tablet full width / left aligned.
       Remove desktop gap underneath.
    ----------------------------------------- */

    .feature-tabs-wrap {
      align-items: flex-start;

      margin-bottom: 0;
    }

    .feature-tabs {
      width: 100%;
    }

    .feature-tab {
      grid-template-columns:
        27px
        minmax(0, 1fr);

      min-height: 68px;

      padding: 10px 12px;
    }

    .feature-tab-icon {
      width: 27px;
      height: 27px;
    }

    .native-toggle-icon {
      width: 26px;
      height: 26px;
    }

    .lord-toggle-icon {
      width: 27px;
      height: 27px;
    }

    .feature-tab-title {
      font-size: 11px;
    }

    .feature-tab-hint {
      display: none;
    }

    /* -----------------------------------------
       ONE COLUMN
    ----------------------------------------- */

    .feature-panel {
      display: block;

      min-height: 0;
    }

    .feature-copy {
      display: block;

      border-right: 0;

      border-bottom: 1px solid rgba(255, 255, 255, 0.11);
    }

    .feature-copy-inner {
      padding: 18px 20px;
    }

    .feature-copy-heading {
      align-items: center;
    }

    .feature-copy h3 {
      max-width: calc(100% - 45px);

      margin: 0;

      font-size: 13px;
    }

    .details-toggle {
      appearance: none;

      display: flex;

      flex: 0 0 32px;

      align-items: center;

      justify-content: center;

      width: 32px;
      height: 32px;

      margin: 0;

      padding: 0;

      border: 1px solid rgba(255, 255, 255, 0.18);

      border-radius: 0;

      background: transparent;

      color: #fff;

      font: inherit;

      cursor: pointer;
    }

    .details-toggle span {
      font-size: 19px;
      line-height: 1;

      font-weight: 300;
    }

    /*
     * No dead vertical space when closed.
     */

    .feature-detail-body {
      display: none;
    }

    .feature-copy-inner.details-open .feature-detail-body {
      display: block;

      margin-top: 17px;
    }

    .feature-description {
      max-width: 760px;

      margin-bottom: 18px;

      font-size: 14px;
    }

    /* -----------------------------------------
       VISUAL
    ----------------------------------------- */

    .feature-visual-inner {
      padding: 26px;
    }

    .search-chart {
      min-height: calc(var(--evidence-height) + 106px);
    }

    /* -----------------------------------------
       GROWTH BRACKETS
    ----------------------------------------- */

    .growth-metrics {
      gap: 10px;
    }

    .growth-metric {
      min-width: 145px;

      padding: 10px 14px;
    }

    .growth-value strong {
      font-size: 27px;
    }

    .growth-value span,
    .growth-metric small {
      font-size: 11px;
    }

    /* -----------------------------------------
       IMPACT

       Same left edge as key.
    ----------------------------------------- */

    .graph-impact {
      left: 0;

      width: min(300px, 43%);
    }

    .graph-timeline span {
      font-size: 10px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .featured-project {
      --evidence-height: clamp(190px, 58vw, 250px);
    }

    .shell-line {
      display: none;
    }

    .featured-shell {
      width: calc(100% - 40px);

      padding: 70px 0;
    }

    /* -----------------------------------------
       HEADER
    ----------------------------------------- */

    .project-header {
      grid-template-columns: 1fr;

      gap: 24px;

      padding-bottom: 28px;
    }

    .project-header h2 {
      font-size: 24px;
    }

    .project-lead,
    .project-text {
      font-size: 14px;
    }

    /* -----------------------------------------
       HEADER STATS
    ----------------------------------------- */

    .header-stats {
      width: 100%;

      grid-template-columns: repeat(2, minmax(0, 1fr));

      gap: 7px;
    }

    .header-stat {
      min-width: 0;

      padding: 10px 14px;
    }

    .header-stat strong {
      font-size: 20px;
    }

    .project-image {
      margin-top: 28px;
    }

    /* =====================================================
       COMPACT MOBILE TAB RAIL
    ====================================================== */

    .feature-dashboard {
      margin-top: 28px;
    }

    .feature-tabs-wrap {
      display: block;

      width: 100%;

      margin-bottom: 0;
    }

    .feature-tabs {
      display: flex;

      width: 100%;

      overflow-x: auto;

      overflow-y: hidden;

      overscroll-behavior-x: contain;

      scroll-snap-type: x proximity;

      -webkit-overflow-scrolling: touch;

      /*
       * Hide ALL native browser scrollbars.
       */

      scrollbar-width: none;
      -ms-overflow-style: none;
    }

    .feature-tabs::-webkit-scrollbar {
      display: none;

      width: 0;
      height: 0;
    }

    /*
     * Compact fixed-width cards.
     * Around 2–3 tabs remain visible,
     * making the horizontal interaction obvious.
     */

    .feature-tab {
      flex: 0 0 142px;

      width: 142px;

      scroll-snap-align: start;

      grid-template-columns:
        23px
        minmax(0, 1fr);

      gap: 7px;

      min-height: 56px;

      padding: 7px 8px;
    }

    .feature-tab-icon {
      width: 23px;
      height: 23px;
    }

    .native-toggle-icon {
      width: 22px;
      height: 22px;
    }

    .lord-toggle-icon {
      width: 23px;
      height: 23px;
    }

    .feature-tab-title {
      font-size: 11px;
      line-height: 1.2;

      letter-spacing: 0.015em;

      white-space: normal;
    }

    .feature-tab-hint {
      display: none;
    }

    /* =====================================================
       CUSTOM 1PX MOBILE SCROLL PROGRESS
    ====================================================== */

    .mobile-tab-progress {
      position: relative;

      display: block;

      width: 100%;
      height: 1px;

      margin-top: 7px;

      overflow: hidden;

      background: rgba(255, 255, 255, 0.18);
    }

    .mobile-tab-progress span {
      position: absolute;

      top: 0;

      left: var(--progress-offset);

      width: var(--progress-size);

      height: 1px;

      background: #fff;

      transition:
        left 0.12s linear,
        width 0.12s linear;
    }

    /* =====================================================
       ONE COLUMN / COLLAPSIBLE COPY
    ====================================================== */

    .feature-panel {
      display: block;

      min-height: 0;
    }

    .feature-copy {
      display: block;

      border-right: 0;

      border-bottom: 1px solid rgba(255, 255, 255, 0.11);
    }

    .feature-copy-inner {
      padding: 15px 0;
    }

    .feature-copy-heading {
      align-items: center;
    }

    .feature-copy h3 {
      max-width: calc(100% - 44px);

      margin: 0;

      font-size: 12px;
      line-height: 1.4;
    }

    .details-toggle {
      appearance: none;

      display: flex;

      flex: 0 0 31px;

      align-items: center;

      justify-content: center;

      width: 31px;
      height: 31px;

      margin: 0;

      padding: 0;

      border: 1px solid rgba(255, 255, 255, 0.18);

      border-radius: 0;

      background: transparent;

      color: #fff;

      font: inherit;

      cursor: pointer;
    }

    .details-toggle span {
      font-size: 19px;
      line-height: 1;

      font-weight: 300;
    }

    /*
     * Completely removed before + is opened.
     */

    .feature-detail-body {
      display: none;
    }

    .feature-copy-inner.details-open .feature-detail-body {
      display: block;

      margin-top: 15px;
    }

    .feature-description {
      max-width: 100%;

      margin-bottom: 17px;

      font-size: 14px;
    }

    .feature-tags {
      gap: 7px 10px;
    }

    .feature-tags span {
      color: #fff;

      font-size: 10px;
    }

    .feature-tags span::before,
    .feature-tags span::after {
      color: #fff;
    }

    /* =====================================================
       VISUAL
    ====================================================== */

    .feature-visual-inner {
      padding: 22px 14px;
    }

    .search-chart {
      min-height: calc(var(--evidence-height) + 188px);
    }

    /* =====================================================
       SEARCH HEADER
    ====================================================== */

    .chart-top {
      display: block;
    }

    .chart-heading span {
      font-size: 10px;
    }

    /* =====================================================
       MOBILE GROWTH BRACKETS
    ====================================================== */

    .growth-metrics {
      display: grid;

      grid-template-columns: repeat(2, minmax(0, 1fr));

      gap: 8px;

      margin-top: 18px;
    }

    .growth-metric {
      min-width: 0;

      padding: 9px 11px;
    }

    .growth-value {
      gap: 5px;
    }

    .growth-value strong {
      font-size: clamp(20px, 6vw, 25px);
    }

    .growth-value span,
    .growth-metric small {
      font-size: 9px;
      line-height: 1.2;
    }

    .growth-metric small {
      margin-top: 6px;
    }

    /* =====================================================
       KEY
    ====================================================== */

    .chart-key {
      margin-top: 17px;
    }

    .chart-key span {
      font-size: 11px;
    }

    /* =====================================================
       IMPACT

       Exact left alignment with key.
    ====================================================== */

    .graph-impact {
      top: 39px;
      left: 0;

      width: min(225px, 68%);

      padding-left: 10px;
    }

    .graph-impact strong {
      font-size: 11px;
    }

    .graph-impact p {
      font-size: 10px;
      line-height: 1.45;
    }

    /* =====================================================
       X AXIS
    ====================================================== */

    .graph-timeline {
      gap: 1px;
    }

    .graph-timeline span {
      font-size: 8px;
      line-height: 1.15;

      letter-spacing: -0.015em;

      white-space: nowrap;
    }

    /* =====================================================
       SCREENSHOTS

       Exactly the same visual height as graph.
       Wide frame means crop is vertical.
    ====================================================== */

    .image-evidence {
      min-height: 0;
    }

    .evidence-heading {
      min-height: 0;

      margin-bottom: 14px;
    }

    .evidence-heading > span {
      font-size: 10px;
    }

    .evidence-heading strong {
      font-size: 13px;
    }

    .evidence-image {
      width: 100%;

      height: var(--evidence-height);
    }

    .evidence-image img {
      display: block;

      width: 100%;
      height: 100%;

      object-fit: cover;

      object-position: center center;
    }

    .evidence-note {
      margin-top: 12px;

      font-size: 11px;
    }
  }

  /* =========================================================
     VERY SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .featured-shell {
      padding: 62px 0;
    }

    /*
     * Slightly narrower cards.
     * Still fully swipeable.
     */

    .feature-tab {
      flex-basis: 134px;

      width: 134px;

      padding: 7px;
    }

    .feature-tab-title {
      font-size: 10.5px;
    }

    .growth-value strong {
      font-size: 20px;
    }

    .growth-value span,
    .growth-metric small {
      font-size: 8.5px;
    }

    .graph-impact {
      width: 72%;
    }

    .graph-timeline span {
      font-size: 7.5px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .feature-tab,
    .speed-needle,
    .mobile-tab-progress span {
      transition: none;
    }
  }
</style>
