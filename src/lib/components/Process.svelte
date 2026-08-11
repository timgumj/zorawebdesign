<script>
  let {
    title,
    subtitle,
    eyebrow = "",
    steps = [],
    imageCredits = [],
  } = $props();

  let lineVisible = $state(false);

  const processImages = [
    "/images/meet-700.webp",
    "/images/Isa-700.webp",
    "/images/design-700.webp",
    "/images/support-700.webp",
  ];

  const defaultImageCredits = ["Ines and Andy JUBS", "Isabella reSOMA", "", ""];

  function getImageCredit(index) {
    return imageCredits[index] ?? defaultImageCredits[index] ?? "";
  }

  function observeHeaderLine(node) {
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

    window.addEventListener("scroll", updateLine, { passive: true });
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
      <div class="process-header" use:observeHeaderLine>
        <div class="process-header-row">
          <div class="process-title-area">
            <div class="process-title-row">
              <span
                class="section-pulse"
                class:visible={lineVisible}
                aria-hidden="true"
              ></span>

              <h2>{title}</h2>
            </div>

            <div class="process-line" class:visible={lineVisible}></div>
          </div>

          {#if subtitle}
            <p>{subtitle}</p>
          {/if}
        </div>
      </div>

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
                    class:grayscale-image={index === 2}
                    loading="lazy"
                    decoding="async"
                  />

                  {#if getImageCredit(index)}
                    <p class="image-credit">{getImageCredit(index)}</p>
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

  .process-header {
    width: 100%;
    margin-bottom: 70px;
  }

  .process-header-row {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 24px;
  }

  .process-title-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: visible;
  }

  .process-title-row {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }

  .process-line {
    width: 100%;
    height: 2px;
    background: #ffffff;
    transform-origin: left center;
    transform: scaleX(0.01);
    transition:
      transform 1s ease-out,
      background 0.3s ease;
  }

  .process-line.visible {
    transform: scaleX(1);
  }

  :global(body.light) .process-line {
    background: #111111;
  }

  .section-pulse {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #0043ff;
    flex-shrink: 0;
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

  .process-header h2 {
    margin: 0;
    color: #ffffff;
    font-size: clamp(18px, 2vw, 28px);
    line-height: 1.1;
    letter-spacing: 0.08em;
    font-weight: 700;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  :global(body.light) .process-header h2 {
    color: #111111;
  }

  .process-header p {
    margin: 0;
    max-width: 520px;
    color: #bfbfbf;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.04em;
    text-align: left;
    display: flex;
    align-items: center;
    border-left: 2px solid #0043ff;
    padding-left: 20px;
    transform: translateY(-2px);
    transition:
      color 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .process-header p {
    color: rgba(0, 0, 0, 0.68);
  }

  .process-list {
    display: flex;
    flex-direction: column;
  }

  .process-stage {
    position: relative;
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.75fr);
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

  .stage-left {
    display: grid;
    grid-template-columns: 58px minmax(0, 1fr);
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
  }

  .stage-right img.grayscale-image {
    filter: grayscale(100%);
  }

  .image-credit {
    margin: 8px 0 0;
    color: #9a9a9a;
    font-size: 12px;
    line-height: 1.4;
    letter-spacing: 0.03em;
    transition: color 0.3s ease;
  }

  :global(body.light) .image-credit {
    color: rgba(0, 0, 0, 0.58);
  }

  .process-stage:last-child .stage-left {
    min-height: 220px;
  }

  @media (max-width: 1024px) {
    .shell-line {
      display: none;
    }

    .process-header {
      margin-bottom: 50px;
    }

    .process-header-row {
      gap: 20px;
      align-items: end;
    }

    .process-title-area {
      gap: 5px;
    }

    .process-title-row {
      gap: 18px;
    }

    .process-header p {
      transform: translateY(10px);
    }

    .process-stage {
      display: grid;
      grid-template-columns: 58px minmax(0, 1fr);
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
      min-height: auto;
      padding-left: 0;
      width: 100%;
    }

    .stage-image-wrap {
      max-width: none;
      margin-left: 0;
    }

    .stage-right img {
      height: 330px;
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
      margin-bottom: 50px;
    }

    .process-header-row {
      width: 100%;
      display: grid;
      grid-template-columns: minmax(0, 0.8fr) minmax(330px, 1.2fr);
      align-items: end;
      gap: 28px;
    }

    .process-title-area {
      min-width: 0;
      gap: 20px;
    }

    .process-title-row {
      min-width: 0;
      gap: 14px;
    }

    .process-header h2 {
      font-size: 15px;
      line-height: 1.1;
      white-space: nowrap;
    }

    .process-line {
      width: 100%;
    }

    .process-header p {
      max-width: 520px;
      font-size: 13px;
      line-height: 1.45;
      padding-left: 16px;
      transform: translateY(-2px);
    }

    .section-pulse {
      width: 28px;
      height: 28px;
    }
  }

  @media (max-width: 767px) {
    .process-header-row {
      grid-template-columns: 1fr;
      align-items: stretch;
      gap: 20px;
    }

    .process-title-area {
      gap: 14px;
    }

    .process-title-row {
      gap: 12px;
    }

    .process-header p {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
      padding: 16px 0 16px 18px;
      transform: none;
    }

    .section-pulse {
      width: 22px;
      height: 22px;
    }

    .process-stage {
      grid-template-columns: 42px minmax(0, 1fr);
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
      padding-left: 0;
    }

    .stage-image-wrap {
      background: #111111;
    }

    :global(body.light) .stage-image-wrap {
      background: #ffffff;
    }

    .stage-right img {
      height: 250px;
      object-fit: contain;
      object-position: center center;
    }

    .stage-line {
      top: 32px;
      bottom: 10px;
    }

    .process-shell {
      --shell-x: 18px;
      padding-top: 110px;
      padding-right: var(--shell-x);
      padding-bottom: 60px;
      padding-left: var(--shell-x);
    }
  }

  @media (max-width: 600px) {
    .section-pulse {
      width: 22px;
      height: 22px;
    }

    .process-header h2 {
      font-size: clamp(18px, 7vw, 24px);
    }
  }

  @media (max-width: 480px) {
    .stage-right {
      padding-left: 0;
    }

    .stage-right img {
      height: 230px;
      object-fit: contain;
      object-position: center center;
    }
  }

  @media (max-width: 420px) {
    .process-title-row {
      gap: 10px;
    }

    .section-pulse {
      width: 18px;
      height: 18px;
    }

    .process-header h2 {
      font-size: 18px;
    }

    .process-header p {
      padding: 18px 0 18px 16px;
    }
  }
</style>
