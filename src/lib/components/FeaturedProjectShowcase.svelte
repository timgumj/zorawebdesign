<script>
  let { project, language = "en" } = $props();

  let activeProject = $state("baldauf");

  /* =========================================================
     BALDAUF
  ========================================================= */

  const baldaufFeature = $derived(project.feature);

  /* =========================================================
     PROJECTS
  ========================================================= */

  const projects = $derived(
    language === "de"
      ? [
          {
            id: "baldauf",
            toggle: "DR. BOSEDE BALDAUF",
            link: "/dr-bosede-baldauf/",
            linkText: "PROJEKT ANSEHEN",
            graphType: "baldauf",
          },
          {
            id: "eva",
            toggle: "EVA EICHINGER",
            link: "/referenzprojekt/",
            linkText: "PROJEKT ANSEHEN",
            graphType: "eva",
          },
        ]
      : [
          {
            id: "baldauf",
            toggle: "DR. BOSEDE BALDAUF",
            link: "/en-2/dr-bosede-baldauf/",
            linkText: "VIEW CASE STUDY",
            graphType: "baldauf",
          },
          {
            id: "eva",
            toggle: "EVA EICHINGER",
            link: "/en-2/featured-project/",
            linkText: "VIEW CASE STUDY",
            graphType: "eva",
          },
        ],
  );

  const activeData = $derived(
    projects.find((item) => item.id === activeProject) ?? projects[0],
  );

  /* =========================================================
     EVA TECHNICAL AUDIT
  ========================================================= */

  const evaGraph = $derived(
    language === "de"
      ? {
          eyebrow: "TECHNISCHE WEBSITE-QUALITÄT",

          loadValue: "< 1s",
          loadLabel: "DESKTOP-LADEERLEBNIS",

          keyLabel: "TECHNISCHER AUDIT",

          values: [
            {
              label: "CORE WEB VITALS",
              value: "94",
              score: 94,
            },
            {
              label: "SICHERHEIT",
              value: "95",
              score: 95,
            },
            {
              label: "WEB-STANDARDS",
              value: "96",
              score: 96,
            },
            {
              label: "WEBSITE-ZUVERLÄSSIGKEIT",
              value: "93",
              score: 93,
            },
          ],
        }
      : {
          eyebrow: "TECHNICAL WEBSITE QUALITY",

          loadValue: "< 1s",
          loadLabel: "DESKTOP LOADING EXPERIENCE",

          keyLabel: "TECHNICAL AUDIT",

          values: [
            {
              label: "CORE WEB VITALS",
              value: "94",
              score: 94,
            },
            {
              label: "SECURITY",
              value: "95",
              score: 95,
            },
            {
              label: "WEB STANDARDS",
              value: "96",
              score: 96,
            },
            {
              label: "SITE RELIABILITY",
              value: "93",
              score: 93,
            },
          ],
        },
  );

  /* =========================================================
     TOGGLE
  ========================================================= */

  function selectProject(id) {
    activeProject = id;
  }

  function handleTabKeydown(event, index) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
      return;
    }

    event.preventDefault();

    const direction = event.key === "ArrowRight" ? 1 : -1;

    const nextIndex = (index + direction + projects.length) % projects.length;

    activeProject = projects[nextIndex].id;
  }
</script>

<section
  id="featured-project"
  class="featured-project"
  aria-labelledby="featured-project-label"
>
  <div class="featured-shell">
    <span class="shell-line edge-left" aria-hidden="true"></span>
    <span class="shell-line edge-right" aria-hidden="true"></span>

    <div class="featured-container">
      <!-- =====================================================
           TITLE
      ====================================================== -->

      <div class="featured-heading">
        <span id="featured-project-label">
          {language === "de" ? "AUSGEWÄHLTES PROJEKT" : "FEATURED PROJECT"}
        </span>
      </div>

      <!-- =====================================================
           PROJECT TOGGLE
      ====================================================== -->

      <div
        class="project-toggle"
        role="tablist"
        aria-label={language === "de"
          ? "Ausgewählte Projekte"
          : "Featured projects"}
      >
        {#each projects as item, index}
          <button
            type="button"
            role="tab"
            class="project-toggle-button"
            class:active={activeProject === item.id}
            aria-selected={activeProject === item.id}
            tabindex={activeProject === item.id ? 0 : -1}
            onclick={() => selectProject(item.id)}
            onkeydown={(event) => handleTabKeydown(event, index)}
          >
            {item.toggle}
          </button>
        {/each}
      </div>

      <!-- =====================================================
           DASHBOARD
      ====================================================== -->

      <section
        class="feature-dashboard"
        aria-live="polite"
        aria-label={language === "de"
          ? `${activeData.toggle} Projektergebnisse`
          : `${activeData.toggle} project results`}
      >
        <div class="feature-panel">
          <div class="feature-visual">
            <div class="feature-visual-inner">
              {#if activeData.graphType === "baldauf"}
                <!-- =================================================
                     BALDAUF
                ================================================== -->

                <div class="dashboard-layout baldauf-layout">
                  <!-- KEY -->

                  <div class="dashboard-key">
                    <div class="chart-key">
                      <span class="chart-key-item">
                        <span
                          class="chart-key-dot visitors-dot"
                          aria-hidden="true"
                        ></span>

                        <span>
                          {baldaufFeature.graph.visitorsLegend}
                        </span>
                      </span>

                      <span class="chart-key-item">
                        <span
                          class="chart-key-dot enquiries-dot"
                          aria-hidden="true"
                        ></span>

                        <span>
                          {baldaufFeature.graph.enquiriesLegend}
                        </span>
                      </span>
                    </div>
                  </div>

                  <!-- GRAPH -->

                  <div class="dashboard-graph">
                    <div class="graph-area">
                      <div class="graph-plot">
                        <!-- HORIZONTAL GRID -->

                        <span
                          class="graph-grid graph-grid-top"
                          aria-hidden="true"
                        ></span>

                        <span class="graph-grid graph-grid-a" aria-hidden="true"
                        ></span>

                        <span class="graph-grid graph-grid-b" aria-hidden="true"
                        ></span>

                        <span class="graph-grid graph-grid-c" aria-hidden="true"
                        ></span>

                        <!-- VERTICAL GRID -->

                        <span
                          class="graph-v-grid graph-v-grid-a"
                          aria-hidden="true"
                        ></span>

                        <span
                          class="graph-v-grid graph-v-grid-b"
                          aria-hidden="true"
                        ></span>

                        <span
                          class="graph-v-grid graph-v-grid-c"
                          aria-hidden="true"
                        ></span>

                        <span
                          class="graph-v-grid graph-v-grid-d"
                          aria-hidden="true"
                        ></span>

                        <span
                          class="graph-v-grid graph-v-grid-e"
                          aria-hidden="true"
                        ></span>

                        <!-- DESKTOP GRAPH -->

                        <svg
                          class="graph-svg graph-svg-desktop"
                          viewBox="0 0 1000 320"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <!-- ENQUIRIES FILL -->

                          <path
                            class="enquiries-fill"
                            d="
                              M0 300
                              L130 299
                              L205 286
                              L280 168
                              L350 150
                              L420 225
                              L505 158
                              L585 96
                              L655 70
                              L725 104
                              L790 55
                              L855 78
                              L930 58
                              L1000 38
                              L1000 320
                              L0 320
                              Z
                            "
                          ></path>

                          <!-- ENQUIRIES LINE -->

                          <path
                            class="enquiries-line"
                            d="
                              M0 300
                              L130 299
                              L205 286
                              L280 168
                              L350 150
                              L420 225
                              L505 158
                              L585 96
                              L655 70
                              L725 104
                              L790 55
                              L855 78
                              L930 58
                              L1000 38
                            "
                          ></path>

                          <!-- VISITORS FILL -->

                          <path
                            class="visitors-fill"
                            d="
                              M0 300
                              L110 294
                              L205 282
                              L300 260
                              L390 248
                              L490 220
                              L575 180
                              L650 125
                              L715 58
                              L770 50
                              L825 20
                              L875 30
                              L930 12
                              L1000 4
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
                              L110 294
                              L205 282
                              L300 260
                              L390 248
                              L490 220
                              L575 180
                              L650 125
                              L715 58
                              L770 50
                              L825 20
                              L875 30
                              L930 12
                              L1000 4
                            "
                          ></path>
                        </svg>

                        <!-- TABLET / MOBILE GRAPH -->

                        <svg
                          class="graph-svg graph-svg-responsive"
                          viewBox="0 0 1000 320"
                          preserveAspectRatio="none"
                          aria-hidden="true"
                        >
                          <!-- ENQUIRIES -->

                          <path
                            class="enquiries-fill"
                            d="
                              M0 300
                              L165 294
                              L285 190
                              L410 207
                              L535 145
                              L650 82
                              L760 101
                              L865 71
                              L1000 38
                              L1000 320
                              L0 320
                              Z
                            "
                          ></path>

                          <path
                            class="enquiries-line"
                            d="
                              M0 300
                              L165 294
                              L285 190
                              L410 207
                              L535 145
                              L650 82
                              L760 101
                              L865 71
                              L1000 38
                            "
                          ></path>

                          <!-- VISITORS -->

                          <path
                            class="visitors-fill"
                            d="
                              M0 300
                              L180 287
                              L345 253
                              L500 215
                              L635 140
                              L750 68
                              L845 38
                              L925 18
                              L1000 4
                              L1000 320
                              L0 320
                              Z
                            "
                          ></path>

                          <path
                            class="visitors-line"
                            d="
                              M0 300
                              L180 287
                              L345 253
                              L500 215
                              L635 140
                              L750 68
                              L845 38
                              L925 18
                              L1000 4
                            "
                          ></path>
                        </svg>
                      </div>

                      <!-- TIMELINE -->

                      <div class="graph-timeline">
                        {#each baldaufFeature.graph.timeline as period}
                          <span>
                            {period}
                          </span>
                        {/each}
                      </div>
                    </div>
                  </div>

                  <!-- INFO -->

                  <aside class="dashboard-info">
                    <span class="dashboard-eyebrow">
                      {baldaufFeature.graph.eyebrow}
                    </span>

                    <div class="growth-metrics">
                      <div class="growth-metric">
                        <div class="growth-value">
                          <strong>
                            {baldaufFeature.graph.visitorsGrowth}
                          </strong>

                          <span>
                            {baldaufFeature.graph.visitorsGrowthWord}
                          </span>
                        </div>

                        <small>
                          {baldaufFeature.graph.visitorsGrowthLabel}
                        </small>
                      </div>

                      <div class="growth-metric">
                        <div class="growth-value">
                          <strong>
                            {baldaufFeature.graph.enquiriesGrowth}
                          </strong>

                          <span>
                            {baldaufFeature.graph.enquiriesGrowthWord}
                          </span>
                        </div>

                        <small>
                          {baldaufFeature.graph.enquiriesGrowthLabel}
                        </small>
                      </div>
                    </div>

                    <a href={activeData.link} class="graph-link">
                      <span>
                        {activeData.linkText}
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
                  </aside>
                </div>
              {:else}
                <!-- =================================================
                     EVA
                ================================================== -->

                <div class="dashboard-layout eva-layout">
                  <!-- KEY -->

                  <div class="dashboard-key eva-key">
                    <span class="eva-key-dot" aria-hidden="true"></span>

                    <span class="eva-key-item">
                      {evaGraph.keyLabel}
                    </span>
                  </div>

                  <!-- GRAPH -->

                  <div class="dashboard-graph eva-graph">
                    <div class="eva-score-list">
                      {#each evaGraph.values as item}
                        <div class="eva-score-row">
                          <div class="eva-score-copy">
                            <span>
                              {item.label}
                            </span>

                            <strong>
                              {item.value}
                            </strong>
                          </div>

                          <div
                            class="eva-score-track"
                            aria-label={`${item.label}: ${item.value} von 100`}
                          >
                            <div
                              class="eva-score-fill"
                              style={`--score: ${item.score}%`}
                            >
                              <span class="eva-score-point" aria-hidden="true"
                              ></span>
                            </div>
                          </div>
                        </div>
                      {/each}
                    </div>

                    <div class="eva-scale">
                      <span>0</span>
                      <span>25</span>
                      <span>50</span>
                      <span>75</span>
                      <span>100</span>
                    </div>
                  </div>

                  <!-- INFO -->

                  <aside class="dashboard-info">
                    <span class="dashboard-eyebrow">
                      {evaGraph.eyebrow}
                    </span>

                    <div class="eva-load-metric">
                      <strong>
                        {evaGraph.loadValue}
                      </strong>

                      <span>
                        {evaGraph.loadLabel}
                      </span>
                    </div>

                    <a href={activeData.link} class="graph-link">
                      <span>
                        {activeData.linkText}
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
                  </aside>
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

    --section-bg: #000000;
    --section-text: #ffffff;

    --inactive-toggle-bg: #000000;
    --inactive-toggle-text: rgba(255, 255, 255, 0.56);

    --graph-bg: #242526;

    --graph-height: 300px;

    --metric-width: 180px;

    --desktop-column-gap: clamp(42px, 4vw, 64px);
    --desktop-divider-offset: clamp(21px, 2vw, 32px);

    width: 100vw;

    margin-left: calc(50% - 50vw);

    overflow: clip;

    background: var(--section-bg);

    color: var(--section-text);

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     LIGHT MODE
  ========================================================= */

  :global(body.light) .featured-project {
    --section-bg: #ffffff;
    --section-text: #111111;

    --inactive-toggle-bg: #ffffff;
    --inactive-toggle-text: #111111;

    background: #ffffff;

    color: #111111;
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

    background: var(--section-bg);

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

  :global(body.light) .shell-line {
    background: rgba(0, 0, 0, 0.07);
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  /* =========================================================
     HEADING
  ========================================================= */

  .featured-heading {
    margin-bottom: 32px;
  }

  .featured-heading span {
    display: inline-block;

    padding-bottom: 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: var(--section-text);

    font-size: 11px;

    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.11em;

    text-transform: uppercase;
  }

  /* =========================================================
     TOGGLE
  ========================================================= */

  .project-toggle {
    display: flex;

    align-items: stretch;

    justify-content: flex-start;

    width: fit-content;

    max-width: 100%;

    margin: 0;

    padding: 0;

    border: 0;
  }

  .project-toggle-button {
    min-height: 48px;

    padding: 0 21px;

    border: 0;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    background: var(--inactive-toggle-bg);

    color: var(--inactive-toggle-text);

    font: inherit;

    font-size: 12px;

    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.045em;

    text-transform: uppercase;

    cursor: pointer;
  }

  .project-toggle-button.active {
    background: var(--graph-bg);

    color: #ffffff;
  }

  .project-toggle-button:hover {
    color: var(--section-text);
  }

  .project-toggle-button.active:hover {
    color: #ffffff;
  }

  .project-toggle-button:focus-visible {
    outline: 1px solid var(--accent-blue);

    outline-offset: -3px;
  }

  /* =========================================================
     PANEL
  ========================================================= */

  .feature-dashboard {
    width: 100%;

    margin: 0;
  }

  .feature-panel {
    width: 100%;
  }

  .feature-visual {
    width: 100%;

    background: var(--graph-bg);

    color: #ffffff;
  }

  .feature-visual-inner {
    width: 100%;

    min-height: 510px;

    padding: 46px 38px;

    box-sizing: border-box;
  }

  /* =========================================================
     DESKTOP MASTER LAYOUT

     Graph now receives significantly more width.

     The right information column is intentionally narrower.

     The graph itself and separator share the same vertical
     centre so neither appears shifted up/down.
  ========================================================= */

  .dashboard-layout {
    width: min(100%, 1260px);

    min-height: 418px;

    margin: 0 auto;

    display: grid;

    grid-template-columns:
      minmax(0, 1.72fr)
      minmax(185px, 0.28fr);

    grid-template-rows:
      auto
      minmax(0, 1fr);

    grid-template-areas:
      "key info"
      "graph info";

    column-gap: var(--desktop-column-gap);

    row-gap: 22px;

    align-items: stretch;
  }

  .dashboard-key {
    grid-area: key;

    min-width: 0;

    align-self: end;
  }

  /* =========================================================
     GRAPH COLUMN

     Important change:
     the separator belongs to the graph itself.

     This means the line and graph always have exactly
     the same vertical centre.
  ========================================================= */

  .dashboard-graph {
    grid-area: graph;

    position: relative;

    min-width: 0;

    width: 100%;

    min-height: calc(var(--graph-height) + 30px);

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-self: center;
  }

  .dashboard-graph::after {
    content: "";

    position: absolute;

    z-index: 4;

    top: 50%;

    right: calc(-1 * var(--desktop-divider-offset));

    width: 1px;

    height: var(--graph-height);

    background: rgba(255, 255, 255, 0.09);

    transform: translateY(-50%);

    pointer-events: none;
  }

  /* =========================================================
     INFO COLUMN
  ========================================================= */

  .dashboard-info {
    grid-area: info;

    min-width: 0;

    padding: 0;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    align-self: center;

    text-align: center;
  }

  /* old divider removed */

  .dashboard-info::before {
    content: none;
  }

  /* =========================================================
     RIGHT INFO
  ========================================================= */

  .dashboard-eyebrow {
    display: block;

    max-width: 190px;

    color: rgba(255, 255, 255, 0.68);

    font-size: 11px;

    font-weight: 700;

    line-height: 1.4;

    letter-spacing: 0.06em;

    text-align: center;

    text-transform: uppercase;
  }

  /* =========================================================
     LINK
  ========================================================= */

  .graph-link {
    width: fit-content;

    margin-top: 32px;

    display: inline-flex;

    align-items: center;

    gap: 8px;

    color: #ffffff;

    font-size: 10px;

    font-weight: 600;

    line-height: 1;

    letter-spacing: 0.05em;

    text-decoration: none;

    text-transform: uppercase;
  }

  .graph-link > span {
    padding-bottom: 5px;

    border-bottom: 1px solid var(--accent-blue);
  }

  .graph-link svg {
    width: 14px;
    height: 14px;

    flex: 0 0 auto;

    color: var(--accent-blue);
  }

  /* =========================================================
     BALDAUF KEY
  ========================================================= */

  .chart-key {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 10px;
  }

  .chart-key-item {
    display: inline-flex;

    align-items: center;

    gap: 9px;

    width: fit-content;

    color: rgba(255, 255, 255, 0.82);

    font-size: 12px;

    font-weight: 500;

    line-height: 1.2;
  }

  .chart-key-dot {
    width: 9px;
    height: 9px;

    flex: 0 0 9px;

    border-radius: 50%;
  }

  .visitors-dot {
    background: var(--accent-blue);
  }

  .enquiries-dot {
    background: #c9d0ee;
  }

  /* =========================================================
     BALDAUF METRICS
  ========================================================= */

  .growth-metrics {
    margin-top: 30px;

    display: flex;

    flex-direction: column;

    align-items: center;

    gap: 14px;
  }

  .growth-metric {
    --growth-border: rgba(255, 255, 255, 0.42);

    position: relative;

    width: var(--metric-width);

    min-height: 76px;

    padding: 11px 15px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    box-sizing: border-box;

    text-align: center;
  }

  .growth-metric::before,
  .growth-metric::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 8px;

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

    justify-content: center;

    gap: 7px;

    width: 100%;

    text-align: center;
  }

  .growth-value strong {
    color: #ffffff;

    font-size: clamp(28px, 2.6vw, 40px);

    font-weight: 500;

    line-height: 0.95;

    letter-spacing: -0.04em;
  }

  .growth-value span,
  .growth-metric small {
    color: rgba(255, 255, 255, 0.66);

    font-size: 10px;

    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.035em;
  }

  .growth-metric small {
    display: block;

    width: 100%;

    margin-top: 7px;

    text-align: center;

    text-transform: uppercase;
  }

  /* =========================================================
     BALDAUF GRAPH
  ========================================================= */

  .graph-area {
    width: 100%;
  }

  .graph-plot {
    position: relative;

    width: 100%;

    height: var(--graph-height);

    overflow: hidden;
  }

  .graph-grid {
    position: absolute;

    right: 0;
    left: 0;

    z-index: 0;

    height: 1px;

    background: rgba(255, 255, 255, 0.055);
  }

  .graph-grid-top {
    top: 0;
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

  .graph-svg {
    position: absolute;

    inset: 0;

    z-index: 1;

    display: block;

    width: 100%;
    height: 100%;

    overflow: visible;
  }

  .graph-svg-desktop {
    display: block;
  }

  .graph-svg-responsive {
    display: none;
  }

  .enquiries-fill {
    fill: rgba(201, 208, 238, 0.1);
  }

  .enquiries-line {
    fill: none;

    stroke: #c9d0ee;

    stroke-width: 1.4;

    stroke-linejoin: miter;

    stroke-linecap: square;

    vector-effect: non-scaling-stroke;
  }

  .visitors-fill {
    fill: rgba(0, 67, 255, 0.2);
  }

  .visitors-line {
    fill: none;

    stroke: var(--accent-blue);

    stroke-width: 1.8;

    stroke-linejoin: miter;

    stroke-linecap: square;

    vector-effect: non-scaling-stroke;
  }

  /* =========================================================
     TIMELINE
  ========================================================= */

  .graph-timeline {
    display: grid;

    grid-template-columns: repeat(6, minmax(0, 1fr));

    width: 100%;

    margin-top: 14px;
  }

  .graph-timeline span {
    color: rgba(255, 255, 255, 0.52);

    font-size: 9px;

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
     EVA KEY
  ========================================================= */

  .eva-key {
    display: flex;

    align-items: center;

    gap: 8px;
  }

  .eva-key-dot {
    width: 8px;
    height: 8px;

    flex: 0 0 8px;

    border-radius: 50%;

    background: var(--accent-blue);
  }

  .eva-key-item {
    color: rgba(255, 255, 255, 0.68);

    font-size: 10px;

    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.055em;

    text-transform: uppercase;
  }

  /* =========================================================
     EVA GRAPH
  ========================================================= */

  .eva-graph {
    min-height: calc(var(--graph-height) + 30px);

    display: flex;

    flex-direction: column;

    justify-content: center;
  }

  .eva-score-list {
    width: 100%;

    display: grid;

    gap: 31px;
  }

  .eva-score-row {
    display: grid;

    grid-template-columns:
      minmax(175px, 0.24fr)
      minmax(0, 1fr);

    align-items: center;

    gap: 28px;
  }

  .eva-score-copy {
    display: flex;

    align-items: baseline;

    justify-content: space-between;

    gap: 14px;
  }

  .eva-score-copy span {
    color: rgba(255, 255, 255, 0.64);

    font-size: 10px;

    font-weight: 600;

    line-height: 1.2;

    letter-spacing: 0.045em;

    text-transform: uppercase;
  }

  .eva-score-copy strong {
    flex: 0 0 auto;

    color: #ffffff;

    font-size: clamp(22px, 1.9vw, 29px);

    font-weight: 500;

    line-height: 1;

    letter-spacing: -0.035em;
  }

  /* =========================================================
     EVA SCORE TRACK
  ========================================================= */

  .eva-score-track {
    position: relative;

    width: 100%;

    height: 11px;
  }

  .eva-score-track::before {
    content: "";

    position: absolute;

    top: 50%;
    right: 0;
    left: 0;

    height: 1px;

    background: rgba(255, 255, 255, 0.14);

    transform: translateY(-50%);
  }

  .eva-score-fill {
    position: absolute;

    z-index: 1;

    top: 50%;
    left: 0;

    width: var(--score);

    height: 3px;

    background: #0043ff;

    transform: translateY(-50%);
  }

  .eva-score-point {
    position: absolute;

    top: 50%;
    right: -4px;

    width: 8px;
    height: 8px;

    border: 2px solid #0043ff;

    border-radius: 50%;

    background: var(--graph-bg);

    transform: translateY(-50%);
  }

  /* =========================================================
     EVA SCALE
  ========================================================= */

  .eva-scale {
    margin: 22px 0 0 calc(24% + 28px);

    display: grid;

    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .eva-scale span {
    color: rgba(255, 255, 255, 0.4);

    font-size: 8px;

    font-weight: 500;

    line-height: 1;

    text-align: center;
  }

  .eva-scale span:first-child {
    text-align: left;
  }

  .eva-scale span:last-child {
    text-align: right;
  }

  /* =========================================================
     EVA LOAD RESULT
  ========================================================= */

  .eva-load-metric {
    --metric-border: rgba(255, 255, 255, 0.42);

    position: relative;

    width: var(--metric-width);

    min-height: 76px;

    margin-top: 30px;

    padding: 11px 15px;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    box-sizing: border-box;

    text-align: center;
  }

  .eva-load-metric::before,
  .eva-load-metric::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 8px;

    border-top: 1px solid var(--metric-border);

    border-bottom: 1px solid var(--metric-border);
  }

  .eva-load-metric::before {
    left: 0;

    border-left: 1px solid var(--metric-border);
  }

  .eva-load-metric::after {
    right: 0;

    border-right: 1px solid var(--metric-border);
  }

  .eva-load-metric strong {
    color: #ffffff;

    font-size: clamp(30px, 2.8vw, 40px);

    font-weight: 500;

    line-height: 0.95;

    letter-spacing: -0.04em;
  }

  .eva-load-metric span {
    display: block;

    width: 100%;

    margin-top: 8px;

    color: rgba(255, 255, 255, 0.62);

    font-size: 9px;

    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.04em;

    text-align: center;

    text-transform: uppercase;
  }

  /* =========================================================
     LARGE DESKTOP

     Give the graph even more visual dominance.
  ========================================================= */

  @media (min-width: 1200px) {
    .dashboard-layout {
      grid-template-columns:
        minmax(0, 1.82fr)
        minmax(180px, 0.25fr);
    }

    .feature-visual-inner {
      padding-left: 46px;
      padding-right: 46px;
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .featured-project {
      --graph-height: 280px;

      --metric-width: 166px;
    }

    .shell-line {
      display: none;
    }

    .featured-shell {
      width: 90%;

      padding: 85px 0;
    }

    .featured-heading {
      margin-bottom: 29px;
    }

    .project-toggle {
      width: fit-content;

      max-width: 100%;
    }

    .project-toggle-button {
      flex: 0 0 auto;

      min-width: 0;

      min-height: 46px;

      padding: 0 16px;

      justify-content: flex-start;

      text-align: left;

      font-size: 11px;
    }

    .feature-visual-inner {
      min-height: 550px;

      padding: 38px 26px;
    }

    /* =====================================================
       TABLET

       KEY LEFT
       INFO RIGHT
       GRAPH FULL WIDTH BELOW
    ====================================================== */

    .dashboard-layout {
      min-height: 474px;

      grid-template-columns:
        minmax(0, 1fr)
        auto;

      grid-template-rows:
        auto
        1fr;

      grid-template-areas:
        "key info"
        "graph graph";

      column-gap: 28px;

      row-gap: 30px;
    }

    .dashboard-graph {
      min-height: calc(var(--graph-height) + 26px);

      align-self: center;
    }

    .dashboard-graph::after {
      display: none;
    }

    .dashboard-info {
      padding-left: 0;

      align-items: flex-end;

      justify-content: flex-start;

      align-self: start;

      text-align: right;
    }

    .dashboard-eyebrow {
      text-align: right;
    }

    .growth-metrics {
      margin-top: 18px;

      flex-direction: row;

      align-items: center;

      gap: 10px;
    }

    .growth-metric {
      min-height: 68px;

      padding: 9px 11px;
    }

    .growth-value strong {
      font-size: 24px;
    }

    .growth-value span,
    .growth-metric small {
      font-size: 8px;
    }

    .graph-link {
      margin-top: 17px;

      font-size: 9px;
    }

    .dashboard-key {
      align-self: center;
    }

    .graph-svg-desktop {
      display: none;
    }

    .graph-svg-responsive {
      display: block;
    }

    /* EVA */

    .eva-score-list {
      gap: 25px;
    }

    .eva-score-row {
      grid-template-columns:
        minmax(170px, 0.28fr)
        minmax(0, 1fr);

      gap: 22px;
    }

    .eva-scale {
      margin-left: calc(28% + 22px);
    }

    .eva-load-metric {
      min-height: 68px;

      margin-top: 18px;
    }

    .eva-load-metric strong {
      font-size: 26px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .featured-project {
      --graph-height: clamp(255px, 73vw, 305px);

      --metric-width: 126px;
    }

    .shell-line {
      display: none;
    }

    .featured-shell {
      width: calc(100% - 40px);

      padding: 70px 0;
    }

    .featured-heading {
      margin-bottom: 25px;
    }

    .featured-heading span {
      font-size: 10px;
    }

    /* =====================================================
       TOGGLE
    ====================================================== */

    .project-toggle {
      width: fit-content;

      max-width: 100%;
    }

    .project-toggle-button {
      flex: 0 0 auto;

      min-width: 0;

      min-height: 44px;

      padding: 0 10px;

      justify-content: flex-start;

      text-align: left;

      font-size: clamp(8px, 2.35vw, 9.5px);

      letter-spacing: 0.015em;

      white-space: nowrap;
    }

    .feature-visual-inner {
      min-height: 580px;

      padding: 28px 14px;
    }

    /* =====================================================
       KEY LEFT / INFO RIGHT
       GRAPH FULL WIDTH
    ====================================================== */

    .dashboard-layout {
      min-height: 524px;

      grid-template-columns:
        minmax(0, 1fr)
        auto;

      grid-template-rows:
        auto
        1fr;

      grid-template-areas:
        "key info"
        "graph graph";

      column-gap: 12px;

      row-gap: 27px;
    }

    .dashboard-key {
      align-self: start;
    }

    .dashboard-graph {
      min-height: calc(var(--graph-height) + 22px);

      align-self: center;
    }

    .dashboard-graph::after {
      display: none;
    }

    .dashboard-info {
      padding-left: 0;

      align-items: flex-end;

      justify-content: flex-start;

      align-self: start;

      text-align: right;
    }

    .dashboard-eyebrow {
      max-width: 145px;

      font-size: 8px;

      line-height: 1.35;

      text-align: right;
    }

    /* =====================================================
       BALDAUF
    ====================================================== */

    .chart-key {
      gap: 8px;
    }

    .chart-key-item {
      gap: 6px;

      font-size: 8px;
    }

    .chart-key-dot {
      width: 6px;
      height: 6px;

      flex: 0 0 6px;
    }

    .growth-metrics {
      margin-top: 14px;

      flex-direction: column;

      align-items: flex-end;

      gap: 7px;
    }

    .growth-metric {
      min-height: 54px;

      padding: 6px 7px;
    }

    .growth-metric::before,
    .growth-metric::after {
      width: 5px;
    }

    .growth-value {
      gap: 4px;
    }

    .growth-value strong {
      font-size: 18px;
    }

    .growth-value span {
      font-size: 6.5px;
    }

    .growth-metric small {
      margin-top: 4px;

      font-size: 6.5px;
    }

    .graph-link {
      margin-top: 14px;

      gap: 5px;

      font-size: 7px;

      line-height: 1.2;
    }

    .graph-link svg {
      width: 11px;
      height: 11px;
    }

    .dashboard-graph {
      width: 100%;
    }

    .graph-svg-desktop {
      display: none;
    }

    .graph-svg-responsive {
      display: block;
    }

    .enquiries-line,
    .visitors-line {
      stroke-linejoin: miter;

      stroke-linecap: square;
    }

    .graph-timeline {
      margin-top: 10px;
    }

    .graph-timeline span {
      font-size: 6.5px;

      white-space: nowrap;
    }

    /* =====================================================
       EVA
    ====================================================== */

    .eva-key {
      gap: 6px;
    }

    .eva-key-dot {
      width: 6px;
      height: 6px;

      flex: 0 0 6px;
    }

    .eva-key-item {
      font-size: 8px;
    }

    .eva-graph {
      width: 100%;

      min-height: calc(var(--graph-height) + 25px);
    }

    .eva-score-list {
      gap: 22px;
    }

    .eva-score-row {
      grid-template-columns: 1fr;

      gap: 8px;
    }

    .eva-score-copy {
      justify-content: space-between;
    }

    .eva-score-copy span {
      font-size: 8px;
    }

    .eva-score-copy strong {
      font-size: 18px;
    }

    .eva-score-track {
      height: 9px;
    }

    .eva-score-fill {
      height: 3px;
    }

    .eva-score-point {
      width: 7px;
      height: 7px;

      right: -3px;
    }

    .eva-scale {
      margin: 15px 0 0;
    }

    .eva-scale span {
      font-size: 6px;
    }

    .eva-load-metric {
      min-height: 54px;

      margin-top: 14px;

      padding: 6px 7px;
    }

    .eva-load-metric::before,
    .eva-load-metric::after {
      width: 5px;
    }

    .eva-load-metric strong {
      font-size: 20px;
    }

    .eva-load-metric span {
      margin-top: 5px;

      font-size: 6.5px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .featured-shell {
      padding: 62px 0;
    }

    .featured-heading {
      margin-bottom: 23px;
    }

    .project-toggle-button {
      min-height: 42px;

      padding: 0 8px;

      font-size: 8px;
    }

    .feature-visual-inner {
      min-height: 560px;

      padding-top: 26px;
      padding-bottom: 26px;
    }

    .dashboard-layout {
      row-gap: 24px;
    }

    .eva-score-list {
      gap: 20px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .project-toggle-button {
      transition: none;
    }
  }
</style>
