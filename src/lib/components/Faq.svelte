<script>
  let {
    title = "FAQ",
    subtitle = "",
    eyebrow = "FAQ",
    items = [],
    fullWidth = true,
    language = "de",
    configuratorEyebrow = "",
    configuratorBadge = "",
    configuratorText = "",
    configuratorBenefits = [],
    configuratorMeta = "",
    configuratorButtonText = "",
    configuratorLink = "",
  } = $props();

  let headerVisible = $state(false);
  let openIndex = $state(null);

  const plannerContent = $derived(
    language === "en"
      ? {
          eyebrow: "WEBSITE PLANNER",
          badge: "RECOMMENDED",
          text: "Planning a new website, redesigning your existing website, or adding new content and features? Use the free Website Planner. It clearly shows you what your project needs.",
          benefitLabel: "WHAT YOU GET",
          benefits: [
            "CLARIFY YOUR STARTING POINT AND GOALS",
            "CHOOSE PAGES AND FEATURES",
            "RECEIVE A SUITABLE RECOMMENDATION AND QUOTE",
          ],
          meta: "FREE · APPROX. 5 MINUTES",
          buttonText: "START WEBSITE PLANNER",
          link: "/en-2/website-configurator/",
        }
      : {
          eyebrow: "PROJEKTPLANER",
          badge: "EMPFOHLEN",
          text: "Du planst eine neue Website, möchtest deine bestehende Website erneuern oder sie um weitere Inhalte und Funktionen erweitern? Nutze den kostenlosen Projektplaner. Er zeigt dir verständlich, was du für dein Projekt brauchst.",
          benefitLabel: "WAS DU BEKOMMST",
          benefits: [
            "DEINE AUSGANGSLAGE UND ZIELE KLÄREN",
            "SEITEN UND FUNKTIONEN AUSWÄHLEN",
            "PASSENDE EMPFEHLUNG UND ANGEBOT ERHALTEN",
          ],
          meta: "KOSTENLOS · CA. 5 MINUTEN",
          buttonText: "PROJEKTPLANER STARTEN",
          link: "/website-konfigurator/",
        },
  );

  const resolvedConfiguratorEyebrow = $derived(
    configuratorEyebrow || plannerContent.eyebrow,
  );

  const resolvedConfiguratorBadge = $derived(
    configuratorBadge || plannerContent.badge,
  );

  const resolvedConfiguratorText = $derived(
    configuratorText || plannerContent.text,
  );

  const resolvedConfiguratorBenefits = $derived(
    configuratorBenefits?.length
      ? configuratorBenefits
      : plannerContent.benefits,
  );

  const resolvedConfiguratorMeta = $derived(
    configuratorMeta || plannerContent.meta,
  );

  const resolvedConfiguratorButtonText = $derived(
    configuratorButtonText || plannerContent.buttonText,
  );

  const resolvedConfiguratorLink = $derived(
    configuratorLink || plannerContent.link,
  );

  const resolvedBenefitLabel = $derived(plannerContent.benefitLabel);

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

  function formatNumber(index) {
    return String(index + 1).padStart(2, "0");
  }

  function toggleFaq(event, index) {
    event.preventDefault();

    if (openIndex === index) {
      openIndex = null;
      return;
    }

    openIndex = index;
  }
</script>

<section class="faq" class:full-width={fullWidth} id="faq">
  <div class="container faq-container">
    <!-- =====================================================
         BLUE SECTION HEADER
    ====================================================== -->
    <div class="faq-header" class:visible={headerVisible} use:observeHeader>
      <div class="faq-header-inner">
        <div class="faq-header-main">
          <h2>{title}</h2>
        </div>

        {#if subtitle}
          <p class="faq-subtitle">{subtitle}</p>
        {/if}
      </div>
    </div>

    <!-- =====================================================
         FAQ + PROJECT PLANNER
    ====================================================== -->
    <div class="faq-content-grid">
      <!-- ===================================================
           LEFT COLUMN — FAQ
      ==================================================== -->
      <div class="faq-column">
        <div class="faq-list">
          {#each items as item, index}
            <details class="faq-item" open={openIndex === index}>
              <summary onclick={(event) => toggleFaq(event, index)}>
                <span class="faq-number">
                  {formatNumber(index)}
                </span>

                <span class="faq-question">
                  {item.question}
                </span>

                <span class="faq-icon" aria-hidden="true"></span>
              </summary>

              <div class="faq-answer">
                {@html item.answer}
              </div>
            </details>
          {/each}
        </div>
      </div>

      <!-- ===================================================
           RIGHT COLUMN — PROJECT PLANNER
      ==================================================== -->
      <div class="planner-column">
        <article class="configurator-card">
          <div class="planner-top-detail" aria-hidden="true">
            <span></span>
            <span></span>
          </div>

          <div class="card-header">
            <div class="card-heading-wrap">
              <span class="card-kicker"> 01 </span>

              <h3 class="card-eyebrow">
                {resolvedConfiguratorEyebrow}
              </h3>
            </div>

            {#if resolvedConfiguratorBadge}
              <span class="recommended-badge">
                {resolvedConfiguratorBadge}
              </span>
            {/if}
          </div>

          <div class="configurator-card-content">
            <p>
              {resolvedConfiguratorText}
            </p>

            {#if resolvedConfiguratorBenefits?.length}
              <div class="benefit-label">
                {resolvedBenefitLabel}
              </div>

              <ul class="configurator-benefits">
                {#each resolvedConfiguratorBenefits as benefit, index}
                  <li>
                    <span class="benefit-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span class="benefit-text">
                      {benefit}
                    </span>
                  </li>
                {/each}
              </ul>
            {/if}
          </div>

          <div class="configurator-card-footer">
            {#if resolvedConfiguratorMeta}
              <div class="configurator-meta-row">
                <span class="meta-dot" aria-hidden="true"></span>

                <span class="configurator-meta">
                  {resolvedConfiguratorMeta}
                </span>
              </div>
            {/if}

            <a
              href={resolvedConfiguratorLink}
              class="configurator-link"
              title={resolvedConfiguratorButtonText}
            >
              <span>
                {resolvedConfiguratorButtonText}
              </span>

              <span class="configurator-arrow" aria-hidden="true"> → </span>
            </a>
          </div>
        </article>
      </div>
    </div>
  </div>
</section>

<style>
  /* =========================================================
     SECTION
  ========================================================= */

  .faq {
    position: relative;
    padding: 130px 0;
    background: #111111;
    color: #ffffff;
    font-family: "Space Grotesk", Arial, sans-serif;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  .faq.full-width {
    width: 100vw;
    margin-left: calc(50% - 50vw);
  }

  :global(body.light) .faq {
    background: #f7f7f4;
    color: #111111;
  }

  .faq-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* =========================================================
     BLUE SECTION HEADER
  ========================================================= */

  .faq-header {
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

  .faq-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .faq-header-inner {
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

  .faq-header-main {
    min-width: 0;
  }

  /* =========================================================
     HEADER TITLE
  ========================================================= */

  .faq-header h2 {
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

  .faq-subtitle {
    max-width: 520px;
    margin: 0;
    padding: 0;
    color: rgba(255, 255, 255, 0.82);
    font-size: 16px;
    line-height: 1.65;
    letter-spacing: 0;
    font-weight: 400;
  }

  :global(body.light) .faq-header {
    background: #0043ff;
    color: #ffffff;
  }

  :global(body.light) .faq-header h2 {
    color: #ffffff;
  }

  :global(body.light) .faq-subtitle {
    color: rgba(255, 255, 255, 0.82);
  }

  /* =========================================================
     TWO COLUMN CONTENT
  ========================================================= */

  .faq-content-grid {
    width: 100%;
    display: grid;
    grid-template-columns:
      minmax(0, 3fr)
      minmax(300px, 2fr);
    gap: 54px;
    align-items: stretch;
  }

  .faq-column,
  .planner-column {
    min-width: 0;
  }

  .faq-column {
    display: flex;
  }

  .planner-column {
    display: flex;
  }

  /* =========================================================
     FAQ LIST
  ========================================================= */

  .faq-list {
    width: 100%;
    max-width: none;
    margin: 0;
  }

  /* =========================================================
     FAQ ITEM
  ========================================================= */

  .faq-item {
    width: 100%;
    margin: 0;
    padding: 0;
    background: transparent;
    border: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
    border-radius: 0;
  }

  .faq-item:first-child {
    border-top: 1px solid rgba(255, 255, 255, 0.22);
  }

  :global(body.light) .faq-item {
    border-bottom-color: rgba(0, 0, 0, 0.2);
  }

  :global(body.light) .faq-item:first-child {
    border-top-color: rgba(0, 0, 0, 0.2);
  }

  /* =========================================================
     FAQ QUESTION ROW
  ========================================================= */

  .faq-item summary {
    width: 100%;
    list-style: none;
    display: grid;
    grid-template-columns:
      40px
      minmax(0, 1fr)
      24px;
    align-items: center;
    gap: 18px;
    margin: 0;
    padding: 19px 0;
    cursor: pointer;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-item summary::marker {
    content: "";
  }

  /* =========================================================
     FAQ NUMBER
  ========================================================= */

  .faq-number {
    color: #0043ff;
    font-size: 11px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }

  /* =========================================================
     FAQ QUESTION TITLE
  ========================================================= */

  .faq-question {
    color: #ffffff;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.45;
    letter-spacing: 0.01em;
    text-transform: none;
    transition: none;
  }

  :global(body.light) .faq-question {
    color: #111111;
  }

  /* =========================================================
     BLUE PLUS / MINUS ICON
  ========================================================= */

  .faq-icon {
    position: relative;
    width: 18px;
    height: 18px;
    display: block;
    justify-self: end;
    flex-shrink: 0;
  }

  .faq-icon::before,
  .faq-icon::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background: #0043ff;
    border-radius: 1px;
    transform: translate(-50%, -50%);
    transition:
      opacity 0.2s ease,
      transform 0.2s ease;
  }

  .faq-icon::before {
    width: 14px;
    height: 1.5px;
  }

  .faq-icon::after {
    width: 1.5px;
    height: 14px;
  }

  .faq-item[open] .faq-icon::after {
    opacity: 0;
    transform: translate(-50%, -50%) scaleY(0);
  }

  /* =========================================================
     FAQ ANSWER
  ========================================================= */

  .faq-answer {
    max-width: 92%;
    margin: 0;
    padding: 0 40px 23px 58px;
    color: #b5b5b5;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.65;
    letter-spacing: 0;
    transition: color 0.3s ease;
  }

  :global(body.light) .faq-answer {
    color: rgba(0, 0, 0, 0.72);
  }

  .faq-answer :global(p) {
    margin: 0 0 12px;
  }

  .faq-answer :global(p:last-child) {
    margin-bottom: 0;
  }

  .faq-answer :global(ul) {
    margin: 0 0 12px 18px;
    padding: 0;
  }

  .faq-answer :global(ol) {
    margin: 0 0 12px 18px;
    padding: 0;
  }

  .faq-answer :global(li) {
    margin-bottom: 6px;
  }

  .faq-answer :global(li:last-child) {
    margin-bottom: 0;
  }

  .faq-answer :global(strong) {
    color: #ffffff;
  }

  :global(body.light) .faq-answer :global(strong) {
    color: #111111;
  }

  .faq-answer :global(a) {
    color: inherit;
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* =========================================================
     PROJECT PLANNER CARD
  ========================================================= */

  .configurator-card {
    position: relative;
    width: 100%;
    min-width: 0;
    height: 100%;
    padding: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    border: 1px solid rgba(255, 255, 255, 0.16);
    border-top-color: rgba(0, 67, 255, 0.75);
    background: #0c0c0c;
    color: #ffffff;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.025),
      inset 1px 0 0 rgba(0, 67, 255, 0.08);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .configurator-card {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 0.14);
    border-top-color: rgba(0, 67, 255, 0.75);
    color: #111111;
    box-shadow:
      inset 0 1px 0 rgba(255, 255, 255, 0.6),
      inset 1px 0 0 rgba(0, 67, 255, 0.08);
  }

  /* =========================================================
     TINY TOP DETAIL
  ========================================================= */

  .planner-top-detail {
    position: absolute;
    top: -1px;
    right: 30px;
    display: flex;
    align-items: center;
    gap: 5px;
    height: 2px;
  }

  .planner-top-detail span:first-child {
    width: 30px;
    height: 2px;
    background: #0043ff;
  }

  .planner-top-detail span:last-child {
    width: 7px;
    height: 2px;
    background: rgba(0, 67, 255, 0.4);
  }

  /* =========================================================
     CARD HEADER
  ========================================================= */

  .card-header {
    min-height: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    padding-bottom: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
  }

  :global(body.light) .card-header {
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }

  .card-heading-wrap {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .card-kicker {
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
  }

  .card-eyebrow {
    margin: 0;
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.3;
    letter-spacing: 0.075em;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  :global(body.light) .card-eyebrow {
    color: #111111;
  }

  /* =========================================================
     RECOMMENDED BADGE
  ========================================================= */

  .recommended-badge {
    flex-shrink: 0;
    display: inline-flex;
    align-items: center;
    min-height: 24px;
    padding: 0 9px;
    border: 1px solid rgba(0, 67, 255, 0.52);
    background: rgba(0, 67, 255, 0.07);
    color: #6f91ff;
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :global(body.light) .recommended-badge {
    background: rgba(0, 67, 255, 0.045);
    color: #0043ff;
  }

  /* =========================================================
     CARD CONTENT
  ========================================================= */

  .configurator-card-content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .configurator-card-content > p {
    max-width: 94%;
    margin: 28px 0 0;
    color: #a9a9a9;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.72;
    letter-spacing: 0;
    transition: color 0.3s ease;
  }

  :global(body.light) .configurator-card-content > p {
    color: rgba(0, 0, 0, 0.66);
  }

  /* =========================================================
     BENEFIT LABEL
  ========================================================= */

  .benefit-label {
    margin-top: 34px;
    margin-bottom: 12px;
    color: #6d6d6d;
    font-size: 9px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  :global(body.light) .benefit-label {
    color: rgba(0, 0, 0, 0.44);
  }

  /* =========================================================
     BENEFITS
  ========================================================= */

  .configurator-benefits {
    margin: 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
  }

  :global(body.light) .configurator-benefits {
    border-top-color: rgba(0, 0, 0, 0.12);
  }

  .configurator-benefits li {
    position: relative;
    margin: 0;
    padding: 15px 0;
    display: grid;
    grid-template-columns:
      30px
      minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
    transition:
      border-color 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .configurator-benefits li {
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }

  .benefit-number {
    padding-top: 2px;
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.4;
    letter-spacing: 0.08em;
    font-variant-numeric: tabular-nums;
  }

  .benefit-text {
    color: #d0d0d0;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
    letter-spacing: 0.055em;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  :global(body.light) .benefit-text {
    color: rgba(0, 0, 0, 0.76);
  }

  /* =========================================================
     CARD FOOTER
  ========================================================= */

  .configurator-card-footer {
    margin-top: auto;
    padding-top: 32px;
  }

  .configurator-meta-row {
    display: flex;
    align-items: center;
    gap: 9px;
    margin-bottom: 14px;
  }

  .meta-dot {
    width: 5px;
    height: 5px;
    flex-shrink: 0;
    background: #0043ff;
  }

  .configurator-meta {
    color: #777777;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  :global(body.light) .configurator-meta {
    color: rgba(0, 0, 0, 0.48);
  }

  /* =========================================================
     CTA
  ========================================================= */

  .configurator-link {
    position: relative;
    min-height: 52px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    overflow: hidden;
    border: 1px solid #0043ff;
    background: #0043ff;
    color: #ffffff;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      border-color 0.25s ease;
  }

  .configurator-link::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    right: 48px;
    width: 1px;
    background: rgba(255, 255, 255, 0.24);
    pointer-events: none;
  }

  .configurator-link:hover {
    background: transparent;
    color: #ffffff;
  }

  :global(body.light) .configurator-link:hover {
    color: #0043ff;
  }

  .configurator-arrow {
    position: relative;
    z-index: 1;
    width: 20px;
    display: inline-flex;
    justify-content: center;
    color: #ffffff;
    font-size: 17px;
    font-weight: 400;
    transition:
      transform 0.25s ease,
      color 0.25s ease;
  }

  .configurator-link:hover .configurator-arrow {
    transform: translateX(3px);
    color: #0043ff;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .faq {
      padding: 110px 0 82px;
    }

    .faq-header {
      margin-bottom: 56px;
    }

    .faq-header-inner {
      min-height: 140px;
      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);
      gap: 38px;
      padding: 42px 44px;
    }

    .faq-header h2 {
      font-size: 26px;
      line-height: 1.15;
    }

    .faq-subtitle {
      font-size: 13px;
      line-height: 1.55;
    }

    .faq-content-grid {
      grid-template-columns:
        minmax(0, 3fr)
        minmax(280px, 2fr);
      gap: 34px;
      align-items: stretch;
    }

    .faq-list {
      width: 100%;
      max-width: none;
      margin: 0;
    }

    .configurator-card {
      padding: 24px;
    }

    .planner-top-detail {
      right: 24px;
    }

    .card-header {
      gap: 14px;
      padding-bottom: 20px;
    }

    .card-heading-wrap {
      gap: 9px;
    }

    .card-eyebrow {
      font-size: 12px;
    }

    .recommended-badge {
      min-height: 22px;
      padding: 0 7px;
      font-size: 8px;
    }

    .configurator-card-content > p {
      max-width: 100%;
      font-size: 12px;
      line-height: 1.65;
    }

    .benefit-label {
      margin-top: 28px;
    }

    .configurator-benefits li {
      grid-template-columns:
        26px
        minmax(0, 1fr);
      gap: 8px;
      padding: 12px 0;
    }

    .benefit-text {
      font-size: 10px;
    }

    .configurator-card-footer {
      padding-top: 26px;
    }

    .configurator-meta {
      font-size: 9px;
    }

    .configurator-link {
      min-height: 48px;
      font-size: 10px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .faq {
      padding: 110px 20px;
    }

    .faq-header {
      margin-bottom: 50px;
    }

    .faq-header-inner {
      min-height: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      padding: 38px 30px;
    }

    .faq-header-main {
      width: 100%;
    }

    .faq-header h2 {
      max-width: 100%;
      font-size: clamp(24px, 7vw, 30px);
      line-height: 1.15;
    }

    .faq-subtitle {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
    }

    .faq-content-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 44px;
    }

    .faq-list {
      width: 100%;
      max-width: none;
      margin-left: 0;
      margin-right: 0;
    }

    .faq-item summary {
      grid-template-columns:
        32px
        minmax(0, 1fr)
        22px;
      gap: 14px;
      padding: 18px 0;
    }

    .faq-number {
      font-size: 10px;
    }

    .faq-question {
      font-size: 14px;
      font-weight: 600;
      line-height: 1.45;
    }

    .faq-answer {
      max-width: 100%;
      padding: 0 34px 21px 46px;
      font-size: 14px;
      line-height: 1.6;
    }

    .faq-icon {
      width: 17px;
      height: 17px;
    }

    .faq-icon::before {
      width: 13px;
    }

    .faq-icon::after {
      height: 13px;
    }

    .planner-column {
      display: block;
    }

    .configurator-card {
      width: 100%;
      height: auto;
      padding: 26px;
    }

    .planner-top-detail {
      right: 26px;
    }

    .card-eyebrow {
      font-size: 13px;
    }

    .configurator-card-content > p {
      max-width: 100%;
      font-size: 13px;
      line-height: 1.7;
    }

    .benefit-text {
      font-size: 11px;
    }

    .configurator-meta {
      font-size: 10px;
    }

    .configurator-link {
      font-size: 11px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 480px) {
    .faq-header-inner {
      padding: 34px 24px;
    }

    .configurator-card {
      padding: 22px;
    }

    .planner-top-detail {
      right: 22px;
    }

    .card-header {
      gap: 12px;
      padding-bottom: 20px;
    }

    .card-heading-wrap {
      gap: 9px;
    }

    .recommended-badge {
      min-height: 22px;
      padding: 0 7px;
      font-size: 8px;
    }

    .configurator-card-content > p {
      margin-top: 24px;
    }

    .benefit-label {
      margin-top: 28px;
    }

    .configurator-card-footer {
      padding-top: 28px;
    }
  }

  @media (max-width: 420px) {
    .faq {
      padding: 100px 20px;
    }

    .faq-header {
      margin-bottom: 46px;
    }

    .faq-header-inner {
      gap: 20px;
      padding: 30px 22px;
    }

    .faq-header h2 {
      font-size: 23px;
    }

    .faq-subtitle {
      font-size: 14px;
    }

    .faq-content-grid {
      gap: 38px;
    }

    .faq-item summary {
      grid-template-columns:
        30px
        minmax(0, 1fr)
        20px;
      gap: 12px;
      padding: 17px 0;
    }

    .faq-number {
      font-size: 9px;
    }

    .faq-question {
      font-size: 14px;
      font-weight: 600;
    }

    .faq-answer {
      padding: 0 30px 20px 42px;
    }

    .faq-icon {
      width: 16px;
      height: 16px;
    }

    .faq-icon::before {
      width: 12px;
    }

    .faq-icon::after {
      height: 12px;
    }

    .configurator-card {
      padding: 20px;
    }

    .planner-top-detail {
      right: 20px;
    }

    .card-kicker {
      font-size: 9px;
    }

    .card-eyebrow {
      font-size: 11px;
    }

    .recommended-badge {
      font-size: 7px;
    }

    .configurator-card-content > p {
      font-size: 12px;
    }

    .configurator-benefits li {
      grid-template-columns:
        25px
        minmax(0, 1fr);
      gap: 7px;
    }

    .benefit-number {
      font-size: 8px;
    }

    .benefit-text {
      font-size: 10px;
    }

    .configurator-meta {
      font-size: 9px;
    }

    .configurator-link {
      min-height: 48px;
      padding: 0 14px;
      font-size: 10px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .faq-header {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .faq-icon::before,
    .faq-icon::after,
    .configurator-arrow {
      transition: none;
    }
  }
</style>
