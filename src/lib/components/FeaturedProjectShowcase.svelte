<script>
  let { project, language = "en" } = $props();

  let detailsOpen = $state(false);

  const feature = $derived(project.feature);

  function toggleDetails() {
    detailsOpen = !detailsOpen;
  }
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

          <!-- =================================================
               TABLET / MOBILE IMAGE

               Directly after live website link.
          ================================================== -->

          <div class="project-image responsive-project-image">
            <img
              src={project.heroImage}
              alt={project.heroImageAlt}
              width="1448"
              height="1086"
              loading="eager"
              decoding="async"
            />
          </div>
        </div>

        <!-- =================================================
             PROJECT RESULT BRACKETS
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
           DESKTOP IMAGE

           Desktop remains in its current position,
           underneath the complete header.
      ====================================================== -->

      <div class="project-image desktop-project-image">
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
           SINGLE CASE-STUDY RESULT
      ====================================================== -->

      <section
        class="feature-dashboard"
        aria-label={language === "de"
          ? "SEO-Projektergebnisse"
          : "SEO project results"}
      >
        <div class="feature-panel">
          <!-- ===============================================
               LEFT COLUMN
          ================================================ -->

          <div class="feature-copy">
            <div class="feature-copy-inner" class:details-open={detailsOpen}>
              <!-- =========================================
                   TABLET / MOBILE TITLE ROW
              ========================================== -->

              <div class="responsive-feature-heading">
                <span class="responsive-feature-title">
                  {feature.sectionTitle}
                </span>

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

              <!-- =========================================
                   CONTENT
              ========================================== -->

              <div class="feature-detail-body">
                <h3>
                  {feature.title}
                </h3>

                <p class="feature-description">
                  {feature.text}
                </p>

                <div class="feature-tags">
                  {#each feature.work as item}
                    <span>
                      {item}
                    </span>
                  {/each}
                </div>
              </div>
            </div>
          </div>

          <!-- ===============================================
               GRAPH COLUMN
          ================================================ -->

          <div class="feature-visual">
            <div class="feature-visual-inner">
              <div class="search-chart">
                <!-- =====================================
                     GRAPH HEADER
                ====================================== -->

                <div class="chart-top">
                  <div class="chart-heading">
                    <span>
                      {feature.graph.eyebrow}
                    </span>
                  </div>

                  <!-- ===================================
                       RESULT BRACKETS
                  ==================================== -->

                  <div class="growth-metrics">
                    <div class="growth-metric">
                      <div class="growth-value">
                        <strong>
                          {feature.graph.visitorsGrowth}
                        </strong>

                        <span>
                          {feature.graph.visitorsGrowthWord}
                        </span>
                      </div>

                      <small>
                        {feature.graph.visitorsGrowthLabel}
                      </small>
                    </div>

                    <div class="growth-metric">
                      <div class="growth-value">
                        <strong>
                          {feature.graph.enquiriesGrowth}
                        </strong>

                        <span>
                          {feature.graph.enquiriesGrowthWord}
                        </span>
                      </div>

                      <small>
                        {feature.graph.enquiriesGrowthLabel}
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

                    {feature.graph.visitorsLegend}
                  </span>

                  <span>
                    <i class="key-enquiries"></i>

                    {feature.graph.enquiriesLegend}
                  </span>
                </div>

                <!-- =====================================
                     GRAPH
                ====================================== -->

                <div class="graph-area">
                  <!-- GRID -->

                  <span class="graph-grid graph-grid-a"></span>
                  <span class="graph-grid graph-grid-b"></span>
                  <span class="graph-grid graph-grid-c"></span>

                  <!-- IMPACT -->

                  <div class="graph-impact">
                    <strong>
                      {feature.graph.impactTitle}
                    </strong>

                    <p>
                      {feature.graph.impactText}
                    </p>
                  </div>

                  <!-- =================================================
                       DESKTOP + TABLET GRAPH

                       Sharper / more angular progression.
                       Starts exactly at x=0.
                       Ends exactly at x=1000.
                  ================================================== -->

                  <svg
                    class="graph-svg graph-svg-sharp"
                    viewBox="0 0 1000 400"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <!-- ENQUIRIES FILL -->

                    <path
                      class="enquiries-fill"
                      d="
                        M0 356
                        L170 344
                        L285 315
                        L330 188
                        L405 170
                        L490 252
                        L590 146
                        L670 122
                        L735 170
                        L805 118
                        L870 154
                        L930 92
                        L1000 42
                        L1000 390
                        L0 390
                        Z
                      "
                    ></path>

                    <!-- ENQUIRIES LINE -->

                    <path
                      class="enquiries-line"
                      d="
                        M0 356
                        L170 344
                        L285 315
                        L330 188
                        L405 170
                        L490 252
                        L590 146
                        L670 122
                        L735 170
                        L805 118
                        L870 154
                        L930 92
                        L1000 42
                      "
                    ></path>

                    <!-- VISITORS FILL -->

                    <path
                      class="visitors-fill"
                      d="
                        M0 360
                        L200 341
                        L400 296
                        L600 238
                        L800 151
                        L900 61
                        L1000 14
                        L1000 390
                        L0 390
                        Z
                      "
                    ></path>

                    <!-- VISITORS LINE -->

                    <path
                      class="visitors-line"
                      d="
                        M0 360
                        L200 341
                        L400 296
                        L600 238
                        L800 151
                        L900 61
                        L1000 14
                      "
                    ></path>

                    <!-- MARKERS -->

                    <circle class="visitor-dot" cx="200" cy="341" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="400" cy="296" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="600" cy="238" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="800" cy="151" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="900" cy="61" r="4"></circle>

                    <circle
                      class="visitor-dot final-dot"
                      cx="1000"
                      cy="14"
                      r="6"
                    ></circle>
                  </svg>

                  <!-- =================================================
                       MOBILE GRAPH

                       Keeps softer curved progression.
                       Also aligned exactly from 0 → 1000.
                  ================================================== -->

                  <svg
                    class="graph-svg graph-svg-smooth"
                    viewBox="0 0 1000 400"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                  >
                    <!-- ENQUIRIES FILL -->

                    <path
                      class="enquiries-fill"
                      d="
                        M0 356

                        C95 354
                        160 350
                        220 330

                        C265 315
                        287 255
                        320 208

                        C350 167
                        382 160
                        415 194

                        C450 230
                        470 258
                        505 248

                        C545 236
                        570 181
                        610 150

                        C644 124
                        676 139
                        710 168

                        C744 196
                        770 185
                        805 152

                        C840 118
                        866 104
                        895 116

                        C930 130
                        960 82
                        1000 42

                        L1000 390
                        L0 390
                        Z
                      "
                    ></path>

                    <!-- ENQUIRIES LINE -->

                    <path
                      class="enquiries-line"
                      d="
                        M0 356

                        C95 354
                        160 350
                        220 330

                        C265 315
                        287 255
                        320 208

                        C350 167
                        382 160
                        415 194

                        C450 230
                        470 258
                        505 248

                        C545 236
                        570 181
                        610 150

                        C644 124
                        676 139
                        710 168

                        C744 196
                        770 185
                        805 152

                        C840 118
                        866 104
                        895 116

                        C930 130
                        960 82
                        1000 42
                      "
                    ></path>

                    <!-- VISITORS FILL -->

                    <path
                      class="visitors-fill"
                      d="
                        M0 360

                        C130 356
                        205 344
                        300 320

                        C390 297
                        462 281
                        545 256

                        C630 231
                        697 201
                        760 163

                        C823 125
                        872 85
                        920 54

                        C954 32
                        980 20
                        1000 14

                        L1000 390
                        L0 390
                        Z
                      "
                    ></path>

                    <!-- VISITORS LINE -->

                    <path
                      class="visitors-line"
                      d="
                        M0 360

                        C130 356
                        205 344
                        300 320

                        C390 297
                        462 281
                        545 256

                        C630 231
                        697 201
                        760 163

                        C823 125
                        872 85
                        920 54

                        C954 32
                        980 20
                        1000 14
                      "
                    ></path>

                    <!-- MARKERS -->

                    <circle class="visitor-dot" cx="200" cy="343" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="400" cy="294" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="600" cy="240" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="800" cy="140" r="4"
                    ></circle>

                    <circle class="visitor-dot" cx="920" cy="54" r="4"></circle>

                    <circle
                      class="visitor-dot final-dot"
                      cx="1000"
                      cy="14"
                      r="6"
                    ></circle>
                  </svg>

                  <!-- =================================
                       X AXIS
                  ================================== -->

                  <div class="graph-timeline">
                    {#each feature.graph.timeline as period}
                      <span>
                        {period}
                      </span>
                    {/each}
                  </div>
                </div>
              </div>
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

  /* =========================================================
     FEATURED PROJECT KICKER

     White + restrained blue underline.
  ========================================================= */

  .project-kicker {
    display: inline-block;

    width: fit-content;

    margin: 0 0 12px;

    padding-bottom: 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: #fff;

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
    max-width: 670px;

    margin: 0 0 6px;

    color: rgba(255, 255, 255, 0.72);

    font-size: 16px;
    line-height: 1.5;

    font-weight: 500;
  }

  .project-text {
    max-width: 670px;

    margin: 0 0 18px;

    color: #999;

    font-size: 16px;
    line-height: 1.55;

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
     PROJECT IMAGES
  ========================================================= */

  .project-image {
    width: 100%;

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

  /*
   * Desktop image stays exactly where it was:
   * underneath the header.
   */

  .desktop-project-image {
    display: block;

    margin-top: 34px;
  }

  /*
   * Responsive image sits after the live link
   * but is hidden on desktop.
   */

  .responsive-project-image {
    display: none;
  }

  /* =========================================================
     HEADER RESULT BRACKETS

     Desktop and tablet brackets share the longest item's width.
  ========================================================= */

  .header-stats {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 8px;

    width: max-content;
  }

  .header-stat {
    --stat-border: rgba(255, 255, 255, 0.38);

    position: relative;

    width: 100%;

    min-width: 0;

    padding: 10px 12px;

    box-sizing: border-box;
  }

  .header-stat::before,
  .header-stat::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 8px;

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

    white-space: nowrap;
  }

  /* =========================================================
     SINGLE FEATURE
  ========================================================= */

  .feature-dashboard {
    width: 100%;

    margin-top: 34px;
  }

  .feature-panel {
    display: grid;

    grid-template-columns:
      minmax(320px, 0.72fr)
      minmax(0, 1.28fr);

    min-height: 500px;

    border-top: 1px solid rgba(255, 255, 255, 0.12);

    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  /* =========================================================
     LEFT COLUMN
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

  .responsive-feature-heading {
    display: none;
  }

  /* =========================================================
     CONTENT
  ========================================================= */

  .feature-detail-body {
    max-width: 520px;

    padding-left: 20px;

    border-left: 1px solid var(--accent-blue);

    box-sizing: border-box;
  }

  .feature-detail-body h3 {
    max-width: 470px;

    margin: 0 0 14px;

    color: #fff;

    font-size: 15px;
    line-height: 1.4;

    font-weight: 700;

    letter-spacing: 0.05em;

    text-transform: uppercase;
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
     [] TAGS
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
     GRAPH COLUMN
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
     RESULT BRACKETS

     Desktop also hugs content.
  ========================================================= */

  .growth-metrics {
    display: flex;

    align-items: flex-start;

    gap: 8px;
  }

  .growth-metric {
    --growth-border: rgba(255, 255, 255, 0.38);

    position: relative;

    display: flex;

    flex: 0 0 auto;

    flex-direction: column;

    align-items: flex-start;

    width: max-content;

    min-width: 0;

    padding: 10px 12px;

    box-sizing: border-box;

    text-align: left;
  }

  .growth-metric::before,
  .growth-metric::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 8px;

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

    width: max-content;
  }

  .growth-value strong {
    color: #fff;

    font-size: clamp(30px, 3vw, 43px);

    line-height: 0.95;

    letter-spacing: -0.04em;

    font-weight: 500;
  }

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

    width: max-content;

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

     Everything now shares the exact same horizontal
     start/end point.
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

  .graph-svg {
    position: absolute;

    top: 0;
    right: 0;
    left: 0;

    z-index: 1;

    display: block;

    width: 100%;

    height: calc(100% - 36px);

    overflow: visible;
  }

  .graph-svg-smooth {
    display: none;
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

    stroke-linejoin: miter;

    stroke-linecap: butt;
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

    stroke-linejoin: miter;

    stroke-linecap: butt;
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

     First / last labels sit directly at graph edges.
  ========================================================= */

  .graph-timeline {
    position: absolute;

    right: 0;
    bottom: 0;
    left: 0;

    z-index: 2;

    display: grid;

    grid-template-columns: repeat(6, minmax(0, 1fr));

    gap: 0;
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

    /* =====================================================
       HEADER BECOMES ONE COLUMN

       Image now appears directly after link.
    ====================================================== */

    .project-header {
      grid-template-columns: 1fr;

      gap: 24px;
    }

    .project-header-copy {
      max-width: none;
    }

    .project-lead,
    .project-text {
      max-width: 700px;

      font-size: 14px;
    }

    .desktop-project-image {
      display: none;
    }

    .responsive-project-image {
      display: block;

      width: 100%;

      margin-top: 28px;
    }

    .header-stats {
      grid-template-columns: repeat(4, 1fr);

      gap: 7px;
    }

    .header-stat {
      width: 100%;

      min-width: 0;

      padding: 9px 11px;
    }

    .header-stat strong {
      font-size: 20px;
    }

    /* =====================================================
       ONE COLUMN FEATURE
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
      padding: 17px 20px;
    }

    .responsive-feature-heading {
      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 18px;
    }

    .responsive-feature-title {
      color: #fff;

      font-size: 13px;
      line-height: 1.3;

      font-weight: 700;

      letter-spacing: 0.04em;

      text-transform: uppercase;
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

    .feature-detail-body {
      display: none;

      max-width: 760px;
    }

    .feature-copy-inner.details-open .feature-detail-body {
      display: block;

      margin-top: 17px;

      padding-left: 18px;
    }

    .feature-detail-body h3 {
      max-width: 760px;

      font-size: 13px;
    }

    .feature-description {
      max-width: 760px;

      margin-bottom: 18px;

      font-size: 14px;
    }

    .feature-visual-inner {
      padding: 26px;
    }

    .search-chart {
      min-height: calc(var(--evidence-height) + 106px);
    }

    .growth-metrics {
      gap: 8px;
    }

    .growth-metric {
      width: max-content;

      min-width: 0;

      padding: 9px 11px;
    }

    .growth-value strong {
      font-size: 27px;
    }

    .growth-value span,
    .growth-metric small {
      font-size: 11px;
    }

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
      --evidence-height: clamp(205px, 61vw, 255px);
    }

    .shell-line {
      display: none;
    }

    .featured-shell {
      width: calc(100% - 40px);

      padding: 70px 0;
    }

    /* =====================================================
       PROJECT HEADER

       Image comes immediately after link.
    ====================================================== */

    .project-header {
      grid-template-columns: 1fr;

      gap: 24px;

      padding-bottom: 28px;
    }

    .project-header-copy {
      max-width: none;
    }

    .project-header h2 {
      font-size: 24px;
    }

    .project-lead,
    .project-text {
      max-width: 100%;

      font-size: 14px;
    }

    .desktop-project-image {
      display: none;
    }

    .responsive-project-image {
      display: block;

      width: 100%;

      margin-top: 28px;
    }

    /* =====================================================
       STATS
    ====================================================== */

    .header-stats {
      display: flex;

      flex-wrap: wrap;

      align-items: flex-start;

      gap: 7px;

      width: 100%;

      max-width: 100%;
    }

    .header-stat {
      flex: 0 0 auto;

      width: fit-content;

      min-width: 0;

      padding: 9px 11px;
    }

    .header-stat strong {
      font-size: 19px;
    }

    .header-stat span {
      font-size: 10px;

      white-space: nowrap;
    }

    .header-stat::before,
    .header-stat::after {
      display: none;
    }

    /* =====================================================
       FEATURE
    ====================================================== */

    .feature-dashboard {
      margin-top: 28px;
    }

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

    .responsive-feature-heading {
      display: flex;

      align-items: center;

      justify-content: space-between;

      gap: 18px;
    }

    .responsive-feature-title {
      color: #fff;

      font-size: 13px;
      line-height: 1.3;

      font-weight: 700;

      letter-spacing: 0.04em;

      text-transform: uppercase;
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

    .feature-detail-body {
      display: none;

      max-width: 100%;
    }

    .feature-copy-inner.details-open .feature-detail-body {
      display: block;

      margin-top: 15px;

      padding-left: 15px;
    }

    .feature-detail-body h3 {
      max-width: 100%;

      font-size: 12px;
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
      font-size: 10px;
    }

    /* =====================================================
       GRAPH
    ====================================================== */

    .feature-visual-inner {
      padding: 22px 14px;
    }

    .search-chart {
      min-height: calc(var(--evidence-height) + 190px);
    }

    .chart-top {
      display: block;
    }

    .chart-heading span {
      font-size: 10px;
    }

    /* =====================================================
       GROWTH BRACKETS
    ====================================================== */

    .growth-metrics {
      display: flex;

      flex-wrap: wrap;

      align-items: flex-start;

      gap: 8px;

      margin-top: 18px;
    }

    .growth-metric {
      flex: 0 0 auto;

      width: fit-content;

      min-width: 0;

      padding: 8px 11px;
    }

    .growth-metric::before,
    .growth-metric::after {
      width: 8px;
    }

    .growth-value {
      width: auto;

      gap: 5px;
    }

    .growth-value strong {
      font-size: clamp(20px, 6vw, 24px);
    }

    .growth-value span,
    .growth-metric small {
      font-size: 9px;
      line-height: 1.2;
    }

    .growth-metric small {
      width: auto;

      margin-top: 6px;

      white-space: nowrap;
    }

    /* =====================================================
       MOBILE CURVES

       Smooth version only.
    ====================================================== */

    .graph-svg-sharp {
      display: none;
    }

    .graph-svg-smooth {
      display: block;
    }

    .enquiries-line,
    .visitors-line {
      stroke-linejoin: round;

      stroke-linecap: round;
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
    ====================================================== */

    .graph-impact {
      top: 42px;
      left: 0;

      width: min(225px, 70%);

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
      gap: 0;
    }

    .graph-timeline span {
      font-size: 8px;
      line-height: 1.15;

      letter-spacing: -0.015em;

      white-space: nowrap;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .featured-shell {
      padding: 62px 0;
    }

    .header-stat {
      padding: 8px 10px;
    }

    .header-stat strong {
      font-size: 18px;
    }

    .header-stat span {
      font-size: 9px;
    }

    .growth-metric {
      padding: 8px 10px;
    }

    .growth-value strong {
      font-size: 20px;
    }

    .growth-value span,
    .growth-metric small {
      font-size: 8.5px;
    }

    .graph-impact {
      width: 74%;
    }

    .graph-timeline span {
      font-size: 7.5px;
    }
  }
</style>
