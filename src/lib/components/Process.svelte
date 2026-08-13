<script>
  let {
    title,
    subtitle,
    eyebrow = "",
    steps = [],
    imageCredits = [],
  } = $props();

  let headerVisible = $state(false);

  const processImages = [
    "/images/meet-700.webp",
    "/images/project_process-700.webp",
    "/images/Isa-700.webp",
    "/images/support-700.webp",
  ];

  const defaultImageCredits = ["Ines and Andy JUBS", "", "Isabella reSOMA", ""];

  function getImageCredit(index) {
    return imageCredits[index] ?? defaultImageCredits[index] ?? "";
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

  function observeImage(node) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("image-visible");
          observer.disconnect();
        }
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -5% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function scrollProgressLine(node) {
    function updateLine() {
      const rect = node.getBoundingClientRect();
      const viewportTrigger = window.innerHeight * 0.55;
      const total = rect.height;
      const passed = viewportTrigger - rect.top;
      const progress = Math.min(Math.max(passed / total, 0), 1);

      node.style.setProperty("--line-progress", progress);
    }

    updateLine();

    window.addEventListener("scroll", updateLine, {
      passive: true,
    });

    window.addEventListener("resize", updateLine);

    return {
      destroy() {
        window.removeEventListener("scroll", updateLine);
        window.removeEventListener("resize", updateLine);
      },
    };
  }
</script>

<section class="process" id="process">
  <div class="process-shell">
    <div class="shell-line edge-left"></div>
    <div class="shell-line col-1"></div>
    <div class="shell-line col-2"></div>
    <div class="shell-line col-3"></div>
    <div class="shell-line edge-right"></div>

    <div class="container process-container">
      <!-- =====================================================
           BLUE SECTION HEADER
      ====================================================== -->
      <div
        class="process-header"
        class:visible={headerVisible}
        use:observeHeader
      >
        <div class="process-header-inner">
          <div class="process-header-main">
            {#if eyebrow}
              <span class="process-eyebrow">{eyebrow}</span>
            {/if}

            <h2>{title}</h2>
          </div>

          {#if subtitle}
            <p class="process-subtitle">{subtitle}</p>
          {/if}
        </div>
      </div>

      <!-- =====================================================
           PROCESS LIST
      ====================================================== -->
      <div class="process-list">
        {#each steps as step, index}
          <article class="process-stage">
            <div class="stage-left">
              <div class="stage-number-wrap">
                <span class="stage-number">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {#if index !== steps.length - 1}
                  <span class="stage-line" use:scrollProgressLine>
                    <span class="stage-line-fill"></span>
                  </span>
                {/if}
              </div>

              <div class="stage-content">
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>

            <div class="stage-right">
              {#if processImages[index]}
                <div class="stage-image-wrap" use:observeImage>
                  <img
                    src={processImages[index]}
                    alt={step.title}
                    class:process-feature-image={index === 2}
                    loading="lazy"
                    decoding="async"
                  />

                  {#if getImageCredit(index)}
                    <div class="image-credit">
                      <span class="image-credit-line" aria-hidden="true"></span>
                      <span class="image-credit-text">
                        {getImageCredit(index)}
                      </span>
                    </div>
                  {/if}
                </div>
              {/if}
            </div>
          </article>
        {/each}
      </div>
    </div>
  </div>
</section>

<style>
  /* =========================================================
     SECTION
  ========================================================= */
  .process {
    padding: 0;
    background: #111111;
    color: #ffffff;
    font-family: "Space Grotesk", Arial, sans-serif;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .process {
    background: #f7f7f4;
    color: #111111;
  }

  .process-shell {
    --shell-x: 40px;

    position: relative;
    width: min(1540px, calc(100% - 32px));
    margin: 0 auto;
    padding-top: 140px;
    padding-right: var(--shell-x);
    padding-bottom: 140px;
    padding-left: var(--shell-x);
    box-sizing: border-box;
  }

  /* =========================================================
     SHELL LINES
  ========================================================= */
  .shell-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    z-index: 0;
    transition: background 0.3s ease;
  }

  :global(body.light) .shell-line {
    background: rgba(0, 0, 0, 0.08);
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  .col-1 {
    left: calc(var(--shell-x) + ((100% - (var(--shell-x) * 2)) / 4));
  }

  .col-2 {
    left: calc(var(--shell-x) + (((100% - (var(--shell-x) * 2)) / 4) * 2));
  }

  .col-3 {
    left: calc(var(--shell-x) + (((100% - (var(--shell-x) * 2)) / 4) * 3));
  }

  .process-container {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
  }

  /* =========================================================
     BLUE SECTION HEADER
  ========================================================= */
  .process-header {
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

  .process-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .process-header-inner {
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

  .process-header-main {
    min-width: 0;
  }

  /* =========================================================
     EYEBROW
  ========================================================= */
  .process-eyebrow {
    display: block;
    margin: 0 0 18px;
    color: rgba(255, 255, 255, 0.78);
    font-size: 11px;
    line-height: 1.2;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  /* =========================================================
     HEADER TITLE
  ========================================================= */
  .process-header h2 {
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
  .process-subtitle {
    max-width: 520px;
    margin: 0;
    padding: 0;
    color: rgba(255, 255, 255, 0.82);
    font-size: 16px;
    line-height: 1.65;
    letter-spacing: 0;
    font-weight: 400;
  }

  :global(body.light) .process-header {
    background: #0043ff;
    color: #ffffff;
  }

  :global(body.light) .process-header h2 {
    color: #ffffff;
  }

  :global(body.light) .process-eyebrow {
    color: rgba(255, 255, 255, 0.78);
  }

  :global(body.light) .process-subtitle {
    color: rgba(255, 255, 255, 0.82);
  }

  /* =========================================================
     PROCESS LIST
  ========================================================= */
  .process-list {
    display: flex;
    flex-direction: column;
  }

  .process-stage {
    position: relative;
    display: grid;
    grid-template-columns:
      minmax(0, 1fr)
      minmax(320px, 0.75fr);
    gap: 80px;
    align-items: start;
    min-height: 320px;
    padding-top: 54px;
    padding-bottom: 54px;
  }

  .process-stage:first-child {
    padding-top: 0;
  }

  .process-stage::after {
    content: "";
    position: absolute;
    right: calc(-1 * var(--shell-x));
    bottom: 0;
    left: calc(-1 * var(--shell-x));
    height: 1px;
    background: rgba(255, 255, 255, 0.12);
    pointer-events: none;
    transition: background 0.3s ease;
  }

  :global(body.light) .process-stage::after {
    background: rgba(0, 0, 0, 0.1);
  }

  .process-stage:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    min-height: auto;
  }

  .process-stage:last-child::after {
    display: none;
  }

  /* =========================================================
     STAGE LEFT
  ========================================================= */
  .stage-left {
    display: grid;
    grid-template-columns:
      58px
      minmax(0, 1fr);
    gap: 34px;
    min-height: 320px;
  }

  .stage-number-wrap {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .stage-number {
    position: relative;
    z-index: 2;
    color: #ffffff;
    font-size: 20px;
    line-height: 1.15;
    letter-spacing: 0.04em;
    font-weight: 700;
    padding-top: 0;
    transition: color 0.3s ease;
  }

  :global(body.light) .stage-number {
    color: #111111;
  }

  /* =========================================================
     VERTICAL PROGRESS LINE
  ========================================================= */
  .stage-line {
    --line-progress: 0;

    position: absolute;
    top: 36px;
    bottom: 10px;
    left: 50%;
    width: 1px;
    background: transparent;
    transform: translateX(-50%);
    overflow: hidden;
  }

  .stage-line-fill {
    display: block;
    width: 100%;
    height: 100%;
    background: #0043ff;
    transform: scaleY(var(--line-progress));
    transform-origin: top;
    will-change: transform;
  }

  /* =========================================================
     STAGE CONTENT
  ========================================================= */
  .stage-content {
    max-width: 620px;
  }

  .stage-content h3 {
    margin: 0 0 16px;
    color: #ffffff;
    font-size: 20px;
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    font-weight: 700;
    transition: color 0.3s ease;
  }

  :global(body.light) .stage-content h3 {
    color: #111111;
  }

  .stage-content p {
    max-width: 620px;
    margin: 0;
    color: #9a9a9a;
    font-size: 16px;
    line-height: 1.7;
    transition: color 0.3s ease;
  }

  :global(body.light) .stage-content p {
    color: rgba(0, 0, 0, 0.68);
  }

  /* =========================================================
     STAGE IMAGE
  ========================================================= */
  .stage-right {
    width: 100%;
    min-height: 300px;
  }

  .stage-image-wrap {
    width: 100%;
    max-width: 460px;
    margin: 0 auto;
    overflow: hidden;
    opacity: 0.4;
    transform: scale(0.6);
    transform-origin: center;
    transition:
      opacity 0.9s ease,
      transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
      background 0.3s ease;
    will-change: opacity, transform;
  }

  .stage-image-wrap:global(.image-visible) {
    opacity: 1;
    transform: scale(1);
  }

  .stage-right img {
    display: block;
    width: 100%;
    height: 300px;
    object-fit: cover;
    object-position: center center;
  }

  /* =========================================================
     THIRD IMAGE
     ISABELLA / reSOMA
     SPECIAL IMAGE TREATMENT
  ========================================================= */
  .stage-right img.process-feature-image {
    filter: none;
    object-fit: cover;
    object-position: center 35%;
  }

  /* =========================================================
     IMAGE CAPTION
  ========================================================= */
  .image-credit {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 12px 0 0;
    min-height: 18px;
  }

  .image-credit-line {
    width: 22px;
    height: 1px;
    flex: 0 0 auto;
    background: #0043ff;
  }

  .image-credit-text {
    color: #b3b3b3;
    font-size: 11px;
    line-height: 1.35;
    font-weight: 600;
    letter-spacing: 0.055em;
    text-transform: uppercase;
  }

  :global(body.light) .image-credit-text {
    color: rgba(0, 0, 0, 0.62);
  }

  .process-stage:last-child .stage-left {
    min-height: 220px;
  }

  /* =========================================================
     TABLET / RESPONSIVE PROCESS LAYOUT
  ========================================================= */
  @media (max-width: 1024px) {
    .shell-line {
      display: none;
    }

    .process-header {
      margin-bottom: 60px;
    }

    .process-header-inner {
      min-height: 140px;
      grid-template-columns:
        minmax(0, 1fr)
        minmax(280px, 0.9fr);
      gap: 48px;
      padding: 48px 52px;
    }

    .process-header h2 {
      font-size: clamp(24px, 3vw, 34px);
    }

    .process-subtitle {
      font-size: 15px;
      line-height: 1.6;
    }

    .process-stage {
      display: grid;
      grid-template-columns:
        58px
        minmax(0, 1fr);
      gap: 34px;
      min-height: auto;
      padding-top: 46px;
      padding-bottom: 46px;
      align-items: stretch;
    }

    .process-stage:first-child {
      padding-top: 0;
    }

    .process-stage::after {
      right: calc(-1 * var(--shell-x));
      left: calc(-1 * var(--shell-x));
    }

    .stage-left {
      display: contents;
    }

    .stage-number-wrap {
      grid-column: 1;
      grid-row: 1 / span 2;
      position: relative;
      display: flex;
      justify-content: center;
      align-self: stretch;
      min-height: 100%;
    }

    .stage-number {
      font-size: 20px;
    }

    .stage-line {
      top: 36px;
      bottom: 10px;
      height: auto;
    }

    .stage-content {
      grid-column: 2;
      grid-row: 1;
      width: 100%;
      max-width: none;
    }

    .stage-content p {
      max-width: none;
    }

    .stage-right {
      grid-column: 2;
      grid-row: 2;
      width: 100%;
      min-height: auto;
      padding-left: 0;
    }

    .stage-image-wrap {
      width: 100%;
      max-width: none;
      margin-left: 0;
    }

    /*
     * ALL TABLET IMAGES:
     * EXACT SAME WIDTH + HEIGHT
     */
    .stage-right img,
    .stage-right img.process-feature-image {
      display: block;
      width: 100%;
      height: 330px;
      object-fit: cover;
      object-position: center center;
    }

    /*
     * Isabella keeps only the slightly higher crop.
     * Size remains identical to every other image.
     */
    .stage-right img.process-feature-image {
      object-position: center 35%;
    }

    .process-stage:last-child .stage-number-wrap {
      grid-row: 1;
    }

    .process-stage:last-child .stage-left {
      min-height: auto;
    }

    .process-shell {
      padding-top: 140px;
      padding-right: var(--shell-x);
      padding-bottom: 80px;
      padding-left: var(--shell-x);
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */
  @media (min-width: 768px) and (max-width: 1024px) {
    .process-shell {
      --shell-x: 32px;

      width: min(1540px, calc(100% - 28px));
      padding-top: 110px;
      padding-right: var(--shell-x);
      padding-bottom: 82px;
      padding-left: var(--shell-x);
    }

    .process-header {
      margin-bottom: 56px;
    }

    .process-header-inner {
      min-height: 140px;
      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);
      gap: 38px;
      padding: 42px 44px;
    }

    .process-eyebrow {
      margin-bottom: 14px;
      font-size: 9px;
    }

    .process-header h2 {
      font-size: 26px;
      line-height: 1.15;
    }

    .process-subtitle {
      font-size: 13px;
      line-height: 1.55;
    }

    .image-credit {
      margin-top: 11px;
    }

    .image-credit-text {
      font-size: 10px;
      letter-spacing: 0.05em;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */
  @media (max-width: 767px) {
    .process-shell {
      --shell-x: 18px;

      padding-top: 110px;
      padding-right: var(--shell-x);
      padding-bottom: 60px;
      padding-left: var(--shell-x);
    }

    .process-header {
      margin-bottom: 50px;
    }

    .process-header-inner {
      min-height: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      padding: 38px 30px;
    }

    .process-header-main {
      width: 100%;
    }

    .process-eyebrow {
      margin-bottom: 14px;
      font-size: 9px;
      letter-spacing: 0.17em;
    }

    .process-header h2 {
      max-width: 100%;
      font-size: clamp(24px, 7vw, 30px);
      line-height: 1.15;
    }

    .process-subtitle {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
    }

    .process-stage {
      grid-template-columns:
        42px
        minmax(0, 1fr);
      gap: 20px;
      padding-top: 46px;
      padding-bottom: 46px;
    }

    .stage-number {
      font-size: 18px;
    }

    .stage-content h3 {
      font-size: 18px;
    }

    .stage-content p {
      font-size: 16px;
      line-height: 1.4;
    }

    .stage-right {
      width: 100%;
      padding-left: 0;
    }

    .stage-image-wrap {
      width: 100%;
      max-width: none;
      background: #111111;
    }

    :global(body.light) .stage-image-wrap {
      background: #ffffff;
    }

    /*
     * ALL MOBILE IMAGES:
     * SAME WIDTH
     * SAME HEIGHT
     * SAME CROPPING METHOD
     */
    .stage-right img,
    .stage-right img.process-feature-image {
      display: block;
      width: 100%;
      height: 250px;
      object-fit: cover;
      object-position: center center;
    }

    /*
     * Isabella can keep the slightly higher crop,
     * but still has exactly the same dimensions.
     */
    .stage-right img.process-feature-image {
      object-position: center 35%;
    }

    .image-credit {
      gap: 9px;
      margin-top: 10px;
    }

    .image-credit-line {
      width: 18px;
    }

    .image-credit-text {
      font-size: 9px;
      line-height: 1.4;
      letter-spacing: 0.05em;
    }

    .stage-line {
      top: 32px;
      bottom: 10px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */
  @media (max-width: 480px) {
    .process-header-inner {
      padding: 34px 24px;
    }

    .stage-right {
      padding-left: 0;
    }

    /*
     * ALL SMALL MOBILE IMAGES:
     * EXACT SAME DIMENSIONS
     */
    .stage-right img,
    .stage-right img.process-feature-image {
      display: block;
      width: 100%;
      height: 230px;
      object-fit: cover;
      object-position: center center;
    }

    .stage-right img.process-feature-image {
      object-position: center 35%;
    }

    .image-credit {
      margin-top: 9px;
    }

    .image-credit-text {
      font-size: 9px;
    }
  }

  @media (max-width: 420px) {
    .process-header {
      margin-bottom: 46px;
    }

    .process-header-inner {
      gap: 20px;
      padding: 30px 22px;
    }

    .process-header h2 {
      font-size: 23px;
    }

    .process-subtitle {
      font-size: 14px;
    }

    .stage-right img,
    .stage-right img.process-feature-image {
      width: 100%;
      height: 220px;
      object-fit: cover;
    }

    .stage-right img.process-feature-image {
      object-position: center 35%;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */
  @media (prefers-reduced-motion: reduce) {
    .process-header {
      opacity: 1;
      transform: none;
      transition: none;
    }
  }
</style>
