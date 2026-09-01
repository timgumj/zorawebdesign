<script>
  let {
    title = "FAQ",
    subtitle = "",
    eyebrow = "FAQ",
    items = [],
    fullWidth = true,
    language = "de",
  } = $props();

  let headerVisible = $state(false);

  let openIndex = $state(null);

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
         FAQ CONTENT
    ====================================================== -->

    <div class="faq-content">
      <div class="faq-list">
        {#each items as item, index}
          <details class="faq-item" open={openIndex === index}>
            <summary onclick={(event) => toggleFaq(event, index)}>
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
     SECTION HEADER
  ========================================================= */

  .faq-header {
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

  .faq-header.visible {
    opacity: 1;

    transform: translateY(0);
  }

  .faq-header-inner {
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

  .faq-header-main {
    --section-title-marker-size: clamp(18px, 1.6125vw, 25.5px);

    min-width: 0;

    display: grid;

    grid-template-columns: var(--section-title-marker-size) minmax(0, 1fr);

    align-items: start;

    gap: 18px;
  }

  .faq-header-main::before {
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

  .faq-header h2 {
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

  .faq-subtitle {
    max-width: 520px;

    margin: 0;

    padding: 0;

    color: rgba(255, 255, 255, 0.62);

    font-size: 16px;

    line-height: 1.65;

    letter-spacing: 0;

    font-weight: 400;
  }

  :global(body.light) .faq-header {
    background: transparent;

    color: #111111;
  }

  :global(body.light) .faq-header h2 {
    color: #111111;
  }

  :global(body.light) .faq-subtitle {
    color: rgba(0, 0, 0, 0.62);
  }

  @media (min-width: 1025px) {
    .faq-subtitle {
      width: min(460px, 100%);

      justify-self: end;

      margin-left: auto;

      margin-right: 0;

      padding-right: 0;

      text-align: left;
    }
  }

  /* =========================================================
     FAQ CONTENT

     Desktop:
     single centered FAQ column.

     Tablet/mobile:
     full available width.
  ========================================================= */

  .faq-content {
    width: min(920px, 100%);

    margin: 0 auto;
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

    padding: 0 40px 23px 0;

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
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .faq-header-main {
      --section-title-marker-size: 28.8px;
    }

    .faq {
      padding: 110px 0 82px;
    }

    .faq-container {
      width: 90%;
    }

    .faq-header {
      margin-bottom: 56px;
    }

    .faq-header-inner {
      min-height: 0;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 36px 0;
    }

    .faq-header h2 {
      font-size: 24px;

      line-height: 1.15;
    }

    .faq-subtitle {
      font-size: 13px;

      line-height: 1.55;
    }

    /*
     * FAQ uses the complete container width
     * from tablet downward.
     */

    .faq-content {
      width: 100%;

      margin: 0;
    }

    .faq-answer {
      max-width: 94%;

      padding-right: 40px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .faq {
      padding: 110px 20px;
    }

    .faq-container {
      width: 100%;
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

      padding: 32px 0;
    }

    .faq-header-main {
      --section-title-marker-size: clamp(26.4px, 7.2vw, 32.4px);

      width: 100%;
    }

    .faq-header h2 {
      max-width: 100%;

      font-size: clamp(22px, 6vw, 27px);

      line-height: 1.15;
    }

    .faq-subtitle {
      max-width: 100%;

      font-size: 14px;

      line-height: 1.6;
    }

    .faq-content {
      width: 100%;

      margin: 0;
    }

    .faq-list {
      width: 100%;

      max-width: none;

      margin-left: 0;

      margin-right: 0;
    }

    .faq-item summary {
      grid-template-columns:
        minmax(0, 1fr)
        22px;

      gap: 14px;

      padding: 18px 0;
    }

    .faq-question {
      font-size: 14px;

      font-weight: 600;

      line-height: 1.45;
    }

    .faq-answer {
      max-width: 100%;

      padding: 0 34px 21px 0;

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
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 480px) {
    .faq-header-inner {
      padding: 28px 0;
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

      padding: 28px 0;
    }

    .faq-header h2 {
      font-size: 22px;
    }

    .faq-subtitle {
      font-size: 14px;
    }

    .faq-item summary {
      grid-template-columns:
        minmax(0, 1fr)
        20px;

      gap: 12px;

      padding: 17px 0;
    }

    .faq-question {
      font-size: 14px;

      font-weight: 600;
    }

    .faq-answer {
      padding: 0 30px 20px 0;
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

    .faq-header-main::before {
      animation: none;
    }

    .faq-icon::before,
    .faq-icon::after {
      transition: none;
    }
  }
</style>
