<script>
  let { project, language = "en" } = $props();

  const feature = $derived(project.feature);

  const projectAchievements = $derived(
    language === "de"
      ? [
          "Stärkere lokale Sichtbarkeit in der Google-Suche in Wien.",
          "Schnellere zweisprachige Website für Desktop und Mobile.",
          "Klarere Patientenreise von der Suche bis zur Terminbuchung.",
          "Lokale SEO-Präsenz über Google Business und DocFinder optimiert.",
        ]
      : [
          "Stronger local Google visibility for relevant searches in Vienna.",
          "Faster bilingual website across desktop and mobile.",
          "Clearer patient journey from search to appointment booking.",
          "Local SEO presence strengthened across Google Business and DocFinder.",
        ],
  );
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

          <ul class="project-achievements">
            {#each projectAchievements as achievement}
              <li>{achievement}</li>
            {/each}
          </ul>

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
             PROJECT RESULT STATS
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

        <!-- =================================================
             DESKTOP / TABLET IMAGE
        ================================================== -->

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
      </header>

      <!-- =====================================================
           SEO GRAPH
      ====================================================== -->

      <section
        class="feature-dashboard"
        aria-label={language === "de"
          ? "SEO-Projektergebnisse"
          : "SEO project results"}
      >
        <div class="feature-panel">
          <div class="feature-visual">
            <div class="feature-visual-inner">
              <div class="search-chart">
                <!-- ===========================================
                     GRAPH HEADER
                ============================================ -->

                <div class="chart-top">
                  <div class="chart-heading">
                    <span>
                      {feature.graph.eyebrow}
                    </span>
                  </div>

                  <!-- =======================================
                       GROWTH METRICS
                  ======================================== -->

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

                <!-- ===========================================
                     GRAPH KEY
                ============================================ -->

                <div class="chart-key">
                  <span class="visitors-label">
                    {feature.graph.visitorsLegend}
                  </span>

                  <span class="enquiries-label">
                    {feature.graph.enquiriesLegend}
                  </span>
                </div>

                <!-- ===========================================
                     GRAPH
                ============================================ -->

                <div class="graph-area">
                  <div class="graph-plot">
                    <!-- HORIZONTAL GRID -->

                    <span class="graph-grid graph-grid-a" aria-hidden="true"
                    ></span>

                    <span class="graph-grid graph-grid-b" aria-hidden="true"
                    ></span>

                    <span class="graph-grid graph-grid-c" aria-hidden="true"
                    ></span>

                    <!-- VERTICAL GRID -->

                    <span class="graph-v-grid graph-v-grid-a" aria-hidden="true"
                    ></span>

                    <span class="graph-v-grid graph-v-grid-b" aria-hidden="true"
                    ></span>

                    <span class="graph-v-grid graph-v-grid-c" aria-hidden="true"
                    ></span>

                    <span class="graph-v-grid graph-v-grid-d" aria-hidden="true"
                    ></span>

                    <span class="graph-v-grid graph-v-grid-e" aria-hidden="true"
                    ></span>

                    <!-- =======================================
                         SVG LINES + FILLS
                    ======================================== -->

                    <svg
                      class="graph-svg"
                      viewBox="0 0 1000 320"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <!-- ENQUIRIES FILL -->

                      <path
                        class="enquiries-fill"
                        d="
                          M0 294
                          C90 292 155 287 220 270
                          C270 256 290 208 320 169
                          C350 132 382 128 417 157
                          C451 187 474 212 507 201
                          C548 188 573 148 612 120
                          C646 97 676 108 710 132
                          C744 156 771 151 806 122
                          C842 94 868 83 898 93
                          C932 104 963 65 1000 34
                          L1000 320
                          L0 320
                          Z
                        "
                      ></path>

                      <!-- ENQUIRIES LINE -->

                      <path
                        class="enquiries-line"
                        d="
                          M0 294
                          C90 292 155 287 220 270
                          C270 256 290 208 320 169
                          C350 132 382 128 417 157
                          C451 187 474 212 507 201
                          C548 188 573 148 612 120
                          C646 97 676 108 710 132
                          C744 156 771 151 806 122
                          C842 94 868 83 898 93
                          C932 104 963 65 1000 34
                        "
                      ></path>

                      <!-- VISITORS FILL -->

                      <path
                        class="visitors-fill"
                        d="
                          M0 300
                          C125 296 210 287 300 265
                          C391 244 468 230 548 207
                          C632 183 699 157 762 125
                          C824 93 873 62 921 40
                          C955 24 980 17 1000 13
                          L1000 320
                          L0 320
                          Z
                        "
                      ></path>

                      <!-- VISITORS LINE -->

                      <path
                        class="visitors-line"
                        d="
                          M0 300
                          C125 296 210 287 300 265
                          C391 244 468 230 548 207
                          C632 183 699 157 762 125
                          C824 93 873 62 921 40
                          C955 24 980 17 1000 13
                        "
                      ></path>
                    </svg>
                  </div>

                  <!-- =========================================
                       X AXIS
                  ========================================== -->

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
    --graph-bg: #242526;

    --evidence-height: 330px;

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
  ========================================================= */

  .project-kicker {
    display: inline-block;

    width: fit-content;

    margin: 0 0 12px;

    padding-bottom: 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: #fff;

    font-size: 11px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.12em;

    text-transform: uppercase;
  }

  .project-header h2 {
    margin: 0 0 10px;

    color: #fff;

    font-size: clamp(24px, 2.1vw, 34px);
    font-weight: 600;
    line-height: 1.08;

    letter-spacing: -0.035em;
  }

  /* =========================================================
     PROJECT SUMMARY
  ========================================================= */

  .project-lead {
    max-width: 670px;

    margin: 0 0 12px;

    color: rgba(255, 255, 255, 0.72);

    font-size: 16px;
    font-weight: 500;
    line-height: 1.55;
  }

  .project-achievements {
    max-width: 670px;

    margin: 0 0 20px;

    padding: 0;

    list-style: none;

    color: #999;

    font-size: 16px;
    font-weight: 400;
    line-height: 1.55;
  }

  .project-achievements li {
    position: relative;

    padding-left: 18px;
  }

  .project-achievements li + li {
    margin-top: 6px;
  }

  .project-achievements li::before {
    position: absolute;

    top: 0.72em;
    left: 0;

    width: 5px;
    height: 5px;

    border-radius: 50%;

    background: var(--accent-blue);

    content: "";

    transform: translateY(-50%);
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
    font-weight: 600;
    line-height: 1;

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

  .desktop-project-image {
    display: block;

    margin-top: 34px;
  }

  .responsive-project-image {
    display: none;
  }

  /* =========================================================
     HEADER RESULT STATS
  ========================================================= */

  .header-stats {
    display: grid;

    grid-template-columns: repeat(2, 1fr);

    gap: 8px;

    width: max-content;
  }

  .header-stat {
    position: relative;

    width: 100%;

    min-width: 0;

    padding: 8px 0;

    box-sizing: border-box;

    text-align: left;
  }

  .header-stat strong {
    display: block;

    margin-bottom: 6px;

    color: #fff;

    font-size: 22px;
    line-height: 1;

    font-weight: 700;

    letter-spacing: -0.03em;

    text-align: left;
  }

  .header-stat span {
    display: block;

    color: rgba(255, 255, 255, 0.52);

    font-size: 11px;
    font-weight: 500;
    line-height: 1.3;

    letter-spacing: 0.045em;

    text-transform: uppercase;

    text-align: left;
  }

  /* =========================================================
     FEATURE DASHBOARD
  ========================================================= */

  .feature-dashboard {
    width: 100%;

    margin-top: 34px;
  }

  .feature-panel {
    width: 100%;

    border-top: 1px solid rgba(255, 255, 255, 0.12);
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
  }

  .feature-visual {
    width: 100%;

    display: flex;

    background: var(--graph-bg);

    box-sizing: border-box;
  }

  .feature-visual-inner {
    width: 100%;

    padding: 34px;

    box-sizing: border-box;
  }

  /* =========================================================
     SEARCH CHART
  ========================================================= */

  .search-chart {
    position: relative;

    width: min(100%, 1160px);

    margin: 0 auto;
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
    font-weight: 700;
    line-height: 1.3;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  /* =========================================================
     GROWTH METRICS
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
    font-weight: 600;
    line-height: 1.25;

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
     GRAPH KEY
  ========================================================= */

  .chart-key {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 9px;

    margin-top: 21px;
  }

  .chart-key span {
    width: fit-content;

    padding-bottom: 4px;

    color: rgba(255, 255, 255, 0.82);

    font-size: 12px;
    font-weight: 500;
    line-height: 1.2;
  }

  .chart-key .visitors-label {
    border-bottom: 1px solid var(--accent-blue);
  }

  .chart-key .enquiries-label {
    border-bottom: 1px solid #c9d0ee;
  }

  /* =========================================================
     GRAPH
  ========================================================= */

  .graph-area {
    position: relative;

    width: 100%;

    margin-top: 28px;
  }

  .graph-plot {
    position: relative;

    width: 100%;

    height: var(--evidence-height);

    overflow: hidden;
  }

  /* =========================================================
     HORIZONTAL GRID
  ========================================================= */

  .graph-grid {
    position: absolute;

    right: 0;
    left: 0;

    z-index: 0;

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

  /* =========================================================
     VERTICAL GRID
  ========================================================= */

  .graph-v-grid {
    position: absolute;

    top: 0;
    bottom: 0;

    z-index: 0;

    width: 1px;

    background: rgba(255, 255, 255, 0.028);
  }

  .graph-v-grid-a {
    left: 20%;
  }

  .graph-v-grid-b {
    left: 40%;
  }

  .graph-v-grid-c {
    left: 60%;
  }

  .graph-v-grid-d {
    left: 80%;
  }

  .graph-v-grid-e {
    left: 90%;
  }

  /* =========================================================
     SVG
  ========================================================= */

  .graph-svg {
    position: absolute;

    inset: 0;

    z-index: 1;

    display: block;

    width: 100%;
    height: 100%;

    overflow: visible;
  }

  /* =========================================================
     ENQUIRIES
  ========================================================= */

  .enquiries-fill {
    fill: rgba(201, 208, 238, 0.11);
  }

  .enquiries-line {
    fill: none;

    stroke: #c9d0ee;

    stroke-width: 1.4;

    stroke-linejoin: round;

    stroke-linecap: round;

    vector-effect: non-scaling-stroke;
  }

  /* =========================================================
     VISITORS
  ========================================================= */

  .visitors-fill {
    fill: rgba(0, 67, 255, 0.22);
  }

  .visitors-line {
    fill: none;

    stroke: var(--accent-blue);

    stroke-width: 1.8;

    stroke-linejoin: round;

    stroke-linecap: round;

    vector-effect: non-scaling-stroke;
  }

  /* =========================================================
     X AXIS
  ========================================================= */

  .graph-timeline {
    display: grid;

    grid-template-columns: repeat(6, minmax(0, 1fr));

    gap: 0;

    width: 100%;

    margin-top: 14px;
  }

  .graph-timeline span {
    color: rgba(255, 255, 255, 0.55);

    font-size: 10px;
    font-weight: 500;
    line-height: 1.2;

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
     DESKTOP / TABLET HEADER GRID
  ========================================================= */

  @media (min-width: 768px) {
    .project-header {
      grid-template-columns:
        minmax(0, 2fr)
        minmax(0, 3fr);

      grid-template-areas:
        "copy image"
        "stats image";

      column-gap: clamp(24px, 3vw, 48px);

      row-gap: 26px;

      align-items: start;
    }

    .project-header-copy {
      grid-area: copy;

      min-width: 0;

      max-width: none;
    }

    .header-stats {
      grid-area: stats;

      grid-template-columns: repeat(4, minmax(0, 1fr));

      align-self: end;

      width: 100%;

      min-width: 0;

      gap: 16px;
    }

    .header-stat {
      padding: 6px 0;
    }

    .header-stat strong {
      font-size: clamp(19px, 1.55vw, 23px);

      text-align: left;
    }

    .header-stat span {
      font-size: clamp(8px, 0.72vw, 10px);

      white-space: normal;

      overflow-wrap: normal;

      text-align: left;
    }

    .desktop-project-image {
      grid-area: image;

      display: block;

      margin-top: 0;
    }

    .responsive-project-image {
      display: none;
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .featured-project {
      --evidence-height: 285px;
    }

    .shell-line {
      display: none;
    }

    .featured-shell {
      width: 90%;

      padding: 85px 0;
    }

    .project-header {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      grid-template-areas:
        "copy image"
        "stats stats";
    }

    .project-lead,
    .project-achievements {
      max-width: 700px;

      font-size: 14px;
    }

    .desktop-project-image {
      position: relative;

      align-self: stretch;

      min-height: 0;
    }

    .desktop-project-image img {
      position: absolute;

      inset: 0;

      width: 100%;
      height: 100%;

      object-fit: contain;

      object-position: center;
    }

    .header-stats {
      gap: 24px;
    }

    .header-stat {
      padding: 6px 0;

      border: 0;
    }

    .header-stat strong {
      font-size: 20px;

      text-align: left;
    }

    .header-stat span {
      font-size: 9px;

      text-align: left;
    }

    .feature-visual-inner {
      padding: 28px 24px;
    }

    .search-chart {
      width: 100%;
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

    .graph-timeline span {
      font-size: 9px;
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
    .project-achievements {
      max-width: 100%;

      font-size: 14px;
    }

    .project-achievements {
      margin-bottom: 20px;
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
       HEADER STATS
    ====================================================== */

    .header-stats {
      display: flex;

      flex-wrap: nowrap;

      align-items: flex-start;

      justify-content: space-between;

      gap: 8px;

      width: 100%;

      max-width: 100%;
    }

    .header-stat {
      flex: 1 1 0;

      width: auto;

      min-width: 0;

      padding: 8px 0;
    }

    .header-stat strong {
      font-size: 19px;

      text-align: left;
    }

    .header-stat span {
      font-size: clamp(7px, 2.2vw, 9px);

      white-space: normal;

      text-align: left;
    }

    /* =====================================================
       GRAPH
    ====================================================== */

    .feature-dashboard {
      margin-top: 28px;
    }

    .feature-visual-inner {
      padding: 22px 14px;
    }

    .search-chart {
      width: 100%;
    }

    .chart-top {
      display: block;
    }

    .chart-heading span {
      font-size: 10px;
    }

    /* =====================================================
       GROWTH METRICS
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
       KEY
    ====================================================== */

    .chart-key {
      margin-top: 17px;
    }

    .chart-key span {
      font-size: 11px;
    }

    /* =====================================================
       GRAPH
    ====================================================== */

    .graph-area {
      margin-top: 24px;
    }

    /* =====================================================
       X AXIS
    ====================================================== */

    .graph-timeline {
      margin-top: 12px;
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

    .header-stat strong {
      font-size: 18px;
    }

    .header-stat span {
      font-size: 8px;
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

    .graph-timeline span {
      font-size: 7.5px;
    }
  }
</style>
