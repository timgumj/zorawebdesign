<script>
  let {
    title = "FAQ",
    subtitle = "",
    eyebrow = "FAQ",
    items = [],
    fullWidth = true,
  } = $props();

  let lineVisible = $state(false);
  let openIndex = $state(null);

  function observeLine(node) {
    if (typeof IntersectionObserver === "undefined") {
      lineVisible = true;

      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lineVisible = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
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
         HEADER
    ====================================================== -->

    <div class="faq-header" use:observeLine>
      <div class="faq-header-row">
        <div class="faq-title-area">
          <div class="faq-title-row">
            <span
              class="section-pulse"
              class:visible={lineVisible}
              aria-hidden="true"
            ></span>

            <h2>{title}</h2>
          </div>

          <div
            class="faq-line"
            class:visible={lineVisible}
            aria-hidden="true"
          ></div>
        </div>

        {#if subtitle}
          <p>{subtitle}</p>
        {/if}
      </div>
    </div>

    <!-- =====================================================
         FAQ LIST
    ====================================================== -->

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

            <span class="faq-arrow" aria-hidden="true">
              <svg
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 2.5V12.5"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                />

                <path
                  d="M4.5 9L8 12.5L11.5 9"
                  stroke="currentColor"
                  stroke-width="1.4"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </span>
          </summary>

          <div class="faq-answer">
            {@html item.answer}
          </div>
        </details>
      {/each}
    </div>
  </div>
</section>

<style>
  /* =========================================================
     SECTION
  ========================================================= */

  .faq {
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
     HEADER
  ========================================================= */

  .faq-header {
    width: 100%;
    margin-bottom: 70px;
  }

  .faq-header-row {
    width: 100%;

    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      auto;

    align-items: end;

    gap: 24px;
  }

  /* =========================================================
     HEADER TITLE AREA
  ========================================================= */

  .faq-title-area {
    display: flex;
    flex-direction: column;

    gap: 20px;

    overflow: visible;
  }

  .faq-title-row {
    display: inline-flex;

    align-items: center;
    justify-content: flex-start;

    gap: 20px;
  }

  /* =========================================================
     ANIMATED HEADER LINE
  ========================================================= */

  .faq-line {
    width: 100%;
    height: 2px;

    background: #ffffff;

    transform: scaleX(0.01);
    transform-origin: left center;

    transition:
      transform 1s ease-out,
      background 0.3s ease;
  }

  .faq-line.visible {
    transform: scaleX(1);
  }

  :global(body.light) .faq-line {
    background: #111111;
  }

  /* =========================================================
     BLUE PULSE
  ========================================================= */

  .section-pulse {
    position: relative;

    width: 28px;
    height: 28px;

    flex-shrink: 0;

    border-radius: 50%;

    background: #0043ff;

    opacity: 0;

    transform: scale(0.6);

    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }

  .section-pulse.visible {
    opacity: 1;
    transform: scale(1);
  }

  .section-pulse.visible::before,
  .section-pulse.visible::after {
    content: "";

    position: absolute;
    inset: 0;

    border-radius: 50%;

    background: rgba(0, 67, 255, 0.42);

    animation: sectionPulse 1.8s ease-out infinite;
  }

  .section-pulse.visible::after {
    animation-delay: 0.9s;
  }

  @keyframes sectionPulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }

    100% {
      transform: scale(3.2);
      opacity: 0;
    }
  }

  /* =========================================================
     HEADER TITLE
  ========================================================= */

  .faq-header h2 {
    margin: 0;

    color: #ffffff;

    font-size: clamp(18px, 2vw, 28px);

    line-height: 1.1;

    letter-spacing: 0.08em;

    font-weight: 700;

    text-transform: uppercase;

    transition: color 0.3s ease;
  }

  :global(body.light) .faq-header h2 {
    color: #111111;
  }

  /* =========================================================
     HEADER SUBTITLE
  ========================================================= */

  .faq-header p {
    margin: 0;

    max-width: 520px;

    display: flex;
    align-items: center;

    color: #bfbfbf;

    font-size: 16px;

    line-height: 1.4;

    letter-spacing: 0.04em;

    text-align: left;

    border-left: 2px solid #0043ff;

    padding-left: 20px;

    transform: translateY(-2px);

    transition:
      color 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .faq-header p {
    color: rgba(0, 0, 0, 0.68);
  }

  /* =========================================================
     FAQ LIST
  ========================================================= */

  .faq-list {
    width: 52%;
    max-width: 760px;

    margin-left: 0;
    margin-right: auto;
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

    font-size: 14px;

    font-weight: 400;

    line-height: 1.45;

    letter-spacing: 0.01em;

    text-transform: none;

    transition: none;
  }

  :global(body.light) .faq-question {
    color: #111111;
  }

  /* =========================================================
     BLUE DOWN / UP ARROW
  ========================================================= */

  .faq-arrow {
    width: 18px;
    height: 18px;

    display: flex;

    align-items: center;
    justify-content: center;

    justify-self: end;

    color: #0043ff;

    transform: rotate(0deg);

    transition: transform 0.25s ease;
  }

  .faq-arrow svg {
    display: block;

    width: 16px;
    height: 16px;
  }

  .faq-item[open] .faq-arrow {
    transform: rotate(180deg);
  }

  /* =========================================================
     FAQ ANSWER
  ========================================================= */

  .faq-answer {
    max-width: 92%;

    margin: 0;

    padding: 0 40px 23px 58px;

    color: #b5b5b5;

    font-size: 14px;

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
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .faq {
      padding: 110px 0 82px;
    }

    .faq-header {
      margin-bottom: 50px;
    }

    .faq-header-row {
      grid-template-columns:
        minmax(0, 0.8fr)
        minmax(330px, 1.2fr);

      align-items: end;

      gap: 28px;
    }

    .faq-title-area {
      min-width: 0;

      gap: 20px;
    }

    .faq-title-row {
      min-width: 0;

      gap: 14px;
    }

    .faq-header h2 {
      font-size: 15px;

      line-height: 1.1;

      white-space: nowrap;
    }

    .faq-header p {
      max-width: 520px;

      font-size: 13px;

      line-height: 1.45;

      padding-left: 16px;

      transform: translateY(-2px);
    }

    .faq-list {
      width: 70%;

      max-width: 680px;

      margin-left: 0;
      margin-right: auto;
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
      margin-bottom: 46px;

      text-align: left;
    }

    .faq-header-row {
      grid-template-columns: 1fr;

      align-items: stretch;

      gap: 20px;
    }

    .faq-title-area {
      gap: 14px;
    }

    .faq-title-row {
      gap: 12px;
    }

    .section-pulse {
      width: 22px;
      height: 22px;
    }

    .faq-header h2 {
      font-size: clamp(18px, 7vw, 24px);
    }

    .faq-header p {
      max-width: 100%;

      margin: 0;

      padding: 16px 0 16px 18px;

      font-size: 14px;

      line-height: 1.6;

      text-align: left;

      transform: none;
    }

    /* FAQ list remains full-width on mobile */

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
      font-size: 13px;

      font-weight: 400;

      line-height: 1.45;
    }

    .faq-answer {
      max-width: 100%;

      padding: 0 34px 21px 46px;

      font-size: 14px;

      line-height: 1.6;
    }

    .faq-arrow {
      width: 17px;
      height: 17px;
    }

    .faq-arrow svg {
      width: 15px;
      height: 15px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 420px) {
    .faq {
      padding: 100px 20px;
    }

    .faq-header-row {
      gap: 10px;
    }

    .section-pulse {
      width: 18px;
      height: 18px;
    }

    .faq-header h2 {
      font-size: 18px;
    }

    .faq-header p {
      padding: 18px 0 18px 16px;
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
      font-size: 13px;

      font-weight: 400;
    }

    .faq-answer {
      padding: 0 30px 20px 42px;
    }

    .faq-arrow {
      width: 16px;
      height: 16px;
    }

    .faq-arrow svg {
      width: 14px;
      height: 14px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .faq-line,
    .section-pulse,
    .faq-arrow {
      transition: none;
    }

    .section-pulse.visible::before,
    .section-pulse.visible::after {
      animation: none;
    }
  }
</style>
