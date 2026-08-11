<script>
  let {
    title = "REVIEWS",
    subtitle = "WHAT MY CLIENTS SAY.",
    reviews = [],
  } = $props();

  let lineVisible = $state(false);

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
</script>

<section class="reviews" id="reviews">
  <div class="reviews-shell">
    <div class="container reviews-container">
      <div class="reviews-header" use:observeLine>
        <div class="reviews-header-row">
          <div class="reviews-title-area">
            <div class="reviews-title-row">
              <span
                class="section-pulse"
                class:visible={lineVisible}
                aria-hidden="true"
              ></span>

              <h2>{title}</h2>
            </div>

            <div
              class="reviews-line"
              class:visible={lineVisible}
              aria-hidden="true"
            ></div>
          </div>

          {#if subtitle}
            <p>{subtitle}</p>
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
     HEADER
     ========================================================= */

  .reviews-header {
    width: 100%;
    margin-bottom: 70px;
  }

  .reviews-header-row {
    width: 100%;

    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;

    gap: 24px;
  }

  .reviews-title-area {
    display: flex;
    flex-direction: column;
    gap: 20px;

    overflow: visible;
  }

  .reviews-title-row {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;

    gap: 20px;
  }

  .reviews-line {
    width: 100%;
    height: 2px;

    background: #ffffff;

    transform: scaleX(0.01);
    transform-origin: left center;

    transition:
      transform 1s ease-out,
      background 0.3s ease;
  }

  .reviews-line.visible {
    transform: scaleX(1);
  }

  :global(body.light) .reviews-line {
    background: #111111;
  }

  /* =========================================================
     PULSE
     ========================================================= */

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

  .reviews-header h2 {
    margin: 0;

    color: #ffffff;

    font-size: clamp(18px, 2vw, 28px);
    line-height: 1.1;

    letter-spacing: 0.08em;
    font-weight: 700;
    text-transform: uppercase;

    transition: color 0.3s ease;
  }

  :global(body.light) .reviews-header h2 {
    color: #111111;
  }

  .reviews-header p {
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

  :global(body.light) .reviews-header p {
    color: rgba(0, 0, 0, 0.68);
    border-color: rgba(0, 0, 0, 0.2);
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
      --shell-x: 32px;

      width: min(1540px, calc(100% - 28px));

      padding-top: 110px;
      padding-right: var(--shell-x);
      padding-bottom: 82px;
      padding-left: var(--shell-x);
    }

    .reviews-header {
      margin-bottom: 50px;
    }

    .reviews-header-row {
      grid-template-columns:
        minmax(0, 0.8fr)
        minmax(330px, 1.2fr);

      align-items: end;

      gap: 28px;
    }

    .reviews-title-area {
      min-width: 0;
      gap: 20px;
    }

    .reviews-title-row {
      min-width: 0;
      gap: 14px;
    }

    .reviews-header h2 {
      font-size: 15px;
      line-height: 1.1;

      white-space: nowrap;
    }

    .reviews-header p {
      max-width: 520px;

      font-size: 13px;
      line-height: 1.45;

      padding-left: 16px;

      transform: translateY(-2px);
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
      width: 100%;

      padding: 110px 40px;
    }

    .reviews-header {
      margin-bottom: 46px;

      text-align: left;
    }

    .reviews-header-row {
      grid-template-columns: 1fr;

      align-items: stretch;

      gap: 20px;
    }

    .reviews-title-area {
      gap: 14px;
    }

    .reviews-title-row {
      gap: 12px;
    }

    .reviews-header p {
      max-width: 100%;

      margin: 0;

      padding: 16px 0 16px 18px;

      font-size: 14px;
      line-height: 1.6;

      text-align: left;

      transform: none;
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

    .section-pulse {
      width: 22px;
      height: 22px;
    }

    .reviews-header h2 {
      font-size: clamp(18px, 7vw, 24px);
    }
  }

  /* =========================================================
     SMALL MOBILE
     ========================================================= */

  @media (max-width: 420px) {
    .reviews-header-row {
      gap: 10px;
    }

    .section-pulse {
      width: 18px;
      height: 18px;
    }

    .reviews-header h2 {
      font-size: 18px;
    }

    .reviews-header p {
      padding: 18px 0 18px 16px;
    }

    .review-card {
      min-height: 320px;
    }
  }

  /* =========================================================
     REDUCED MOTION
     ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .reviews-line,
    .section-pulse {
      transition: none;
    }

    .section-pulse.visible::before,
    .section-pulse.visible::after {
      animation: none;
    }
  }
</style>
