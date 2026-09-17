<script>
  let { title = "", subtitle = "" } = $props();

  let headerVisible = $state(false);

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
</script>

<div class="projects-header-section">
  <div class="projects-header-shell">
    <div class="container projects-header-container">
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
    </div>
  </div>
</div>

<style>
  /* =========================================================
     SECTION
  ========================================================= */

  .projects-header-section {
    width: 100%;

    padding: 0;

    background: #000000;

    color: #ffffff;

    font-family: "DM Sans", Arial, sans-serif;

    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .projects-header-section {
    background: #ffffff;

    color: #111111;
  }

  /* =========================================================
     SHELL

     Matches the width of Projects.svelte and
     FeaturedProjectShowcase.svelte.
  ========================================================= */

  .projects-header-shell {
    --shell-x: 40px;

    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding: 150px var(--shell-x) 0;

    box-sizing: border-box;
  }

  .projects-header-container {
    position: relative;

    z-index: 1;

    width: 100%;
  }

  /* =========================================================
     PROJECTS HEADER
  ========================================================= */

  .projects-header {
    width: 100%;

    margin: 0;

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

  /* =========================================================
     HEADER INNER
  ========================================================= */

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

  /* =========================================================
     TITLE + BLUE PULSE
  ========================================================= */

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
     TITLE
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
     SUBTITLE
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

  /* =========================================================
     LIGHT MODE
  ========================================================= */

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

  /* =========================================================
     DESKTOP
  ========================================================= */

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
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .projects-header-shell {
      width: 90%;

      padding: 110px 0 0;
    }

    .projects-header-inner {
      min-height: 0;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 36px 0;
    }

    .projects-header-main {
      --section-title-marker-size: 28.8px;
    }

    .projects-header h2 {
      font-size: 24px;

      line-height: 1.15;
    }

    .projects-subtitle {
      font-size: 13px;

      line-height: 1.55;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .projects-header-shell {
      width: calc(100% - 40px);

      padding: 110px 0 0;
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
      width: 100%;

      max-width: 100%;

      font-size: 14px;

      line-height: 1.6;
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
  }
</style>
