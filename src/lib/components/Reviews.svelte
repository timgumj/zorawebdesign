<script>
  let {
    title = "REVIEWS",
    subtitle = "WHAT MY CLIENTS SAY.",
    reviews = [],
  } = $props();

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

<section class="reviews" id="reviews">
  <div class="reviews-shell">
    <div class="container reviews-container">
      <!-- =====================================================
           BLUE SECTION HEADER
      ====================================================== -->
      <div
        class="reviews-header"
        class:visible={headerVisible}
        use:observeHeader
      >
        <div class="reviews-header-inner">
          <div class="reviews-header-main">
            <h2>{title}</h2>
          </div>

          {#if subtitle}
            <p class="reviews-subtitle">{subtitle}</p>
          {/if}
        </div>
      </div>

      {#if reviews.length}
        <div class="reviews-grid" aria-label="Client reviews">
          {#each reviews as review}
            <article class="review-card">
              <div
                class="review-stars"
                role="img"
                aria-label={`${review.stars || 5} out of 5 stars`}
              >
                <span aria-hidden="true">
                  {"★".repeat(review.stars || 5)}
                </span>
              </div>

              <p class="review-text">
                “{review.text}”
              </p>

              <div class="review-author">
                {#if review.image}
                  <img
                    src={review.image}
                    alt={review.name}
                    class="review-avatar"
                    loading="lazy"
                    decoding="async"
                  />
                {/if}

                <div class="review-author-details">
                  <h3>{review.name}</h3>

                  {#if review.role}
                    <h4>{review.role}</h4>
                  {/if}
                </div>
              </div>
            </article>
          {/each}
        </div>
      {/if}
    </div>
  </div>
</section>

<style>
  .reviews {
    padding: 0;
    overflow: hidden;
    background: #000000;
    color: #ffffff;
    font-family: "Space Grotesk", Arial, sans-serif;
    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  .reviews-shell {
    --shell-x: 40px;
    position: relative;
    width: min(1540px, calc(100% - 32px));
    margin: 0 auto;
    padding: 150px var(--shell-x);
    box-sizing: border-box;
  }

  :global(body.light) .reviews {
    background: #ffffff;
    color: #111111;
  }

  .reviews-container {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* =========================================================
     SECTION HEADER
  ========================================================= */
  .reviews-header {
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

  .reviews-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .reviews-header-inner {
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

  .reviews-header-main {
    --section-title-marker-size: clamp(12px, 1.075vw, 17px);

    min-width: 0;
    display: grid;
    grid-template-columns: var(--section-title-marker-size) minmax(0, 1fr);
    align-items: start;
    gap: 16px;
  }

  .reviews-header-main::before {
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
  .reviews-header h2 {
    max-width: 720px;
    margin: 0;
    color: #f2f2f2;
    font-size: clamp(24px, 2.15vw, 34px);
    line-height: 1.12;
    letter-spacing: -0.035em;
    font-weight: 500;
    text-transform: none;
  }

  /* =========================================================
     HEADER SUBTITLE
  ========================================================= */
  .reviews-subtitle {
    max-width: 520px;
    margin: 0;
    padding: 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 16px;
    line-height: 1.65;
    letter-spacing: 0;
    font-weight: 400;
  }

  :global(body.light) .reviews-header {
    background: transparent;
    color: #111111;
  }

  :global(body.light) .reviews-header h2 {
    color: #111111;
  }

  :global(body.light) .reviews-subtitle {
    color: rgba(0, 0, 0, 0.62);
  }

  @media (min-width: 1025px) {
    .reviews-subtitle {
      width: min(460px, 100%);
      justify-self: end;
      margin-left: auto;
      margin-right: 0;
      padding-right: 0;
      text-align: left;
    }
  }

  /* =========================================================
     REVIEWS GRID
  ========================================================= */
  .reviews-grid {
    width: 100%;
    min-width: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
  }

  /* =========================================================
     REVIEW CARD
  ========================================================= */
  .review-card {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    min-height: 366px;
    display: flex;
    flex-direction: column;
    padding: 30px;
    background: #050505;
    border: 1px solid rgba(255, 255, 255, 0.14);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }

  :global(body.light) .review-card {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 0.1);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.06);
  }

  .review-card::before {
    content: "“";
    position: absolute;
    top: 10px;
    right: 20px;
    color: rgba(255, 255, 255, 0.08);
    font-size: 80px;
    line-height: 1;
    font-family: Georgia, serif;
    pointer-events: none;
    transition: color 0.3s ease;
  }

  :global(body.light) .review-card::before {
    color: rgba(0, 0, 0, 0.08);
  }

  /* =========================================================
     STARS
  ========================================================= */
  .review-stars {
    position: relative;
    z-index: 1;
    color: #0043ff;
    font-size: 18px;
    line-height: 1;
    letter-spacing: 3px;
    margin-bottom: 20px;
  }

  /* =========================================================
     REVIEW TEXT
  ========================================================= */
  .review-text {
    position: relative;
    z-index: 1;
    margin: 0;
    color: #bfbfbf;
    font-size: 15px;
    line-height: 1.7;
    overflow-wrap: anywhere;
    transition: color 0.3s ease;
  }

  :global(body.light) .review-text {
    color: rgba(0, 0, 0, 0.72);
  }

  /* =========================================================
     REVIEW AUTHOR
  ========================================================= */
  .review-author {
    position: relative;
    z-index: 1;
    margin-top: auto;
    padding-top: 28px;
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .review-avatar {
    width: 54px;
    height: 54px;
    flex: 0 0 54px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.75);
    transition: border-color 0.3s ease;
  }

  :global(body.light) .review-avatar {
    border-color: rgba(0, 0, 0, 0.18);
  }

  .review-author-details {
    min-width: 0;
  }

  .review-author h3 {
    margin: 0 0 4px;
    color: #ffffff;
    font-size: 14px;
    line-height: 1.3;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    overflow-wrap: anywhere;
    transition: color 0.3s ease;
  }

  :global(body.light) .review-author h3 {
    color: #111111;
  }

  .review-author h4 {
    margin: 0;
    color: #8a8a8a;
    font-size: 12px;
    line-height: 1.4;
    font-weight: 400;
    overflow-wrap: anywhere;
    transition: color 0.3s ease;
  }

  :global(body.light) .review-author h4 {
    color: rgba(0, 0, 0, 0.58);
  }

  /* =========================================================
     TABLET
     2 COLUMNS
  ========================================================= */
  @media (min-width: 768px) and (max-width: 1100px) {
    .reviews-shell {
      --shell-x: 0px;
      width: 90%;
      padding-top: 110px;
      padding-right: var(--shell-x);
      padding-bottom: 82px;
      padding-left: var(--shell-x);
    }

    .reviews-header {
      margin-bottom: 56px;
    }

    .reviews-header-inner {
      min-height: 0;
      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);
      gap: 38px;
      padding: 36px 0;
    }

    .reviews-header h2 {
      font-size: 24px;
      line-height: 1.15;
    }

    .reviews-subtitle {
      font-size: 13px;
      line-height: 1.55;
    }

    .reviews-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 14px;
    }

    .review-card {
      min-height: 340px;
      padding: 26px;
    }

    .review-stars {
      font-size: 16px;
      margin-bottom: 18px;
    }

    .review-text {
      font-size: 13px;
      line-height: 1.65;
    }

    .review-author {
      padding-top: 24px;
      gap: 12px;
    }

    .review-avatar {
      width: 48px;
      height: 48px;
      flex-basis: 48px;
    }

    .review-author h3 {
      font-size: 12px;
    }

    .review-author h4 {
      font-size: 10px;
    }

    .review-card::before {
      top: 8px;
      right: 16px;
      font-size: 68px;
    }
  }

  /* =========================================================
     MOBILE
     1 COLUMN
  ========================================================= */
  @media (max-width: 767px) {
    .reviews-shell {
      --shell-x: 0px;
      width: calc(100% - 40px);
      padding: 110px 0;
    }

    .reviews-header {
      margin-bottom: 50px;
    }

    .reviews-header-inner {
      min-height: 0;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 24px;
      padding: 32px 0;
    }

    .reviews-header-main {
      --section-title-marker-size: clamp(11px, 3vw, 13.5px);

      width: 100%;
    }

    .reviews-header h2 {
      max-width: 100%;
      font-size: clamp(22px, 6vw, 27px);
      line-height: 1.15;
    }

    .reviews-subtitle {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
    }

    .reviews-grid {
      grid-template-columns: 1fr;
      gap: 14px;
    }

    .review-card {
      min-height: 330px;
      padding: 24px;
    }

    .review-text {
      font-size: 14px;
    }

    .review-stars {
      font-size: 16px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */
  @media (max-width: 480px) {
    .reviews-header-inner {
      padding: 28px 0;
    }
  }

  @media (max-width: 420px) {
    .reviews-header {
      margin-bottom: 46px;
    }

    .reviews-header-inner {
      gap: 20px;
      padding: 28px 0;
    }

    .reviews-header h2 {
      font-size: 22px;
    }

    .reviews-subtitle {
      font-size: 14px;
    }

    .review-card {
      min-height: 320px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */
  @media (prefers-reduced-motion: reduce) {
    .reviews-header {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .reviews-header-main::before {
      animation: none;
    }
  }
</style>
