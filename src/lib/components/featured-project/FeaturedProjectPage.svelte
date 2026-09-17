<script>
  import { onMount } from "svelte";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  let { content, media, websiteUrl = "" } = $props();

  let lightboxImage = $state("");
  let lightboxAlt = $state("");

  const projectWebsiteUrl = $derived(websiteUrl || content.websiteUrl || "#");

  const fullWebsiteScreenshot = $derived(
    media.fullWebsiteScreenshot ?? media.newWebsiteImage ?? "",
  );

  const isBaldauf = $derived(
    Boolean(media.ranking && media.performance && media.booking),
  );

  const configuratorUrl = $derived(
    content.language === "de"
      ? "/website-konfigurator/"
      : "/en-2/website-configurator/",
  );

  const footerContent = $derived(
    content.language === "de"
      ? {
          location: "WIEN / ÖSTERREICH",
          imprintText: "IMPRESSUM",
        }
      : {
          location: "VIENNA / AUSTRIA",
          imprintText: "IMPRINT",
        },
  );

  /* =========================================================
     PROJECT FACTS
  ========================================================= */

  const projectFacts = $derived(
    content.meta?.map((item) => item[1]).filter(Boolean) ?? [],
  );

  /* =========================================================
     TECHNOLOGY STACK
  ========================================================= */

  const technologyStack = $derived(
    content.technology?.items?.map((item) => item.name).filter(Boolean) ?? [
      "SvelteKit",
      "WordPress",
      "Vercel",
    ],
  );

  /* =========================================================
     OVERVIEW ITEMS
  ========================================================= */

  const overviewItems = $derived(
    content.overview?.items ??
      content.overview?.bullets ??
      content.approach?.cards?.slice(0, 3).map((item) => item.text) ??
      content.challenge?.points?.slice(0, 3) ??
      [],
  );

  /* =========================================================
     RESULT SCORES
  ========================================================= */

  const performanceScores = $derived(
    isBaldauf
      ? content.language === "de"
        ? [
            ["TOP 10", "LOKALE SUCHE"],
            ["200×", "WEBSITE-BESUCHE"],
            ["28×", "ANFRAGEN"],
            ["100", "SEO"],
          ]
        : [
            ["TOP 10", "LOCAL SEARCH"],
            ["200×", "WEBSITE VISITS"],
            ["28×", "ENQUIRIES"],
            ["100", "SEO"],
          ]
      : content.performance?.scores?.length
        ? content.performance.scores.map((score) => [score.value, score.label])
        : [
            ["98", "Performance"],
            [
              "95",
              content.language === "de" ? "Barrierefreiheit" : "Accessibility",
            ],
            ["96", "Best Practices"],
            ["100", "SEO"],
          ],
  );

  /* =========================================================
     COPY
  ========================================================= */

  const copy = $derived(
    content.language === "de"
      ? {
          overviewTitle: content.overview?.eyebrow ?? "PROJEKTÜBERSICHT",

          overviewText: content.overview?.introduction ?? "",

          transformationTitle:
            content.transformation?.title ?? "WEBSITE TRANSFORMATION",

          oldWebsite: content.comparison?.before?.label ?? "ALTE WEBSITE",

          oldWebsiteTitle: content.comparison?.before?.title ?? "Ausgangspunkt",

          newWebsite: content.comparison?.after?.label ?? "NEUE WEBSITE",

          newWebsiteTitle: content.comparison?.after?.title ?? "Neues Design",

          fullWebsite: "GESAMTE WEBSITE",

          fullWebsiteTitle: "Scroll-Ansicht",

          resultTitle: isBaldauf
            ? "HOHE TERMINAUSLASTUNG"
            : (content.results?.eyebrow ?? "ERGEBNIS"),

          resultText: isBaldauf
            ? "Die gestiegene Suchsichtbarkeit führt inzwischen zu deutlich mehr Nachfrage nach Terminen."
            : (content.results?.description ?? content.results?.title ?? ""),

          performanceTest: isBaldauf
            ? "TERMINBUCHUNG"
            : (content.performance?.eyebrow ?? "PERFORMANCE TEST"),

          ctaTitle: content.cta?.title ?? "HAST DU EIN PROJEKT IM KOPF?",

          ctaText: content.cta?.description ?? "",

          ctaButton: content.cta?.button ?? "PROJEKT STARTEN",

          liveWebsite: content.hero?.websiteButton ?? "LIVE-WEBSITE",

          rankingLabel: "GOOGLE RANKING",

          rankingTitle: "Lokale Sichtbarkeit",

          performanceLabel: "CORE WEB VITALS",

          performanceTitle: "Technische Performance",
        }
      : {
          overviewTitle: content.overview?.eyebrow ?? "PROJECT OVERVIEW",

          overviewText: content.overview?.introduction ?? "",

          transformationTitle:
            content.transformation?.title ?? "WEBSITE TRANSFORMATION",

          oldWebsite: content.comparison?.before?.label ?? "OLD WEBSITE",

          oldWebsiteTitle:
            content.comparison?.before?.title ?? "Starting Point",

          newWebsite: content.comparison?.after?.label ?? "NEW WEBSITE",

          newWebsiteTitle: content.comparison?.after?.title ?? "New Design",

          fullWebsite: "FULL WEBSITE",

          fullWebsiteTitle: "Scroll View",

          resultTitle: isBaldauf
            ? "HIGH APPOINTMENT DEMAND"
            : (content.results?.eyebrow ?? "RESULT"),

          resultText: isBaldauf
            ? "Increased search visibility is now generating significantly stronger appointment demand."
            : (content.results?.description ?? content.results?.title ?? ""),

          performanceTest: isBaldauf
            ? "APPOINTMENT BOOKING"
            : (content.performance?.eyebrow ?? "PERFORMANCE TEST"),

          ctaTitle: content.cta?.title ?? "HAVE A PROJECT IN MIND?",

          ctaText: content.cta?.description ?? "",

          ctaButton: content.cta?.button ?? "START A PROJECT",

          liveWebsite: content.hero?.websiteButton ?? "LIVE WEBSITE",

          rankingLabel: "GOOGLE RANKING",

          rankingTitle: "Local visibility",

          performanceLabel: "CORE WEB VITALS",

          performanceTitle: "Technical performance",
        },
  );

  /* =========================================================
     FULL WEBSITE ALT
  ========================================================= */

  const fullWebsiteAlt = $derived(
    content.language === "de"
      ? `${content.hero.title} Website Gesamtansicht`
      : `${content.hero.title} full website screenshot`,
  );

  /* =========================================================
     THREE VISUALS

     EVA
     1. Old website
     2. New website
     3. Full website

     BALDAUF
     1. Google ranking
     2. Core Web Vitals
     3. Full website
  ========================================================= */

  const transformationItems = $derived.by(() => {
    if (isBaldauf) {
      return [
        {
          label: copy.rankingLabel,
          title: copy.rankingTitle,
          image: media.ranking,
          alt:
            content.language === "de"
              ? "Google Ranking der Website von Dr. Bosede Baldauf"
              : "Google ranking for the Dr. Bosede Baldauf website",
          type: "static",
        },

        {
          label: copy.performanceLabel,
          title: copy.performanceTitle,
          image: media.performance,
          alt:
            content.language === "de"
              ? "Core Web Vitals und Performance der Website von Dr. Bosede Baldauf"
              : "Core Web Vitals and performance for the Dr. Bosede Baldauf website",
          type: "static",
        },

        {
          label: copy.fullWebsite,
          title: copy.fullWebsiteTitle,
          image: fullWebsiteScreenshot,
          alt: fullWebsiteAlt,
          type: "scroll",
        },
      ];
    }

    return [
      {
        label: copy.oldWebsite,
        title: copy.oldWebsiteTitle,
        image: media.oldWebsiteImage,
        alt: content.comparison?.before?.title ?? copy.oldWebsiteTitle,
        type: "static",
      },

      {
        label: copy.newWebsite,
        title: copy.newWebsiteTitle,
        image: media.newWebsiteImage,
        alt: content.comparison?.after?.title ?? copy.newWebsiteTitle,
        type: "static",
      },

      {
        label: copy.fullWebsite,
        title: copy.fullWebsiteTitle,
        image: fullWebsiteScreenshot,
        alt: fullWebsiteAlt,
        type: "scroll",
      },
    ];
  });

  /* =========================================================
     RESULT IMAGE

     EVA     -> performance screenshot
     BALDAUF -> booking image
  ========================================================= */

  const resultImage = $derived(isBaldauf ? media.booking : media.speedTestNew);

  const resultImageAlt = $derived(
    isBaldauf
      ? content.language === "de"
        ? "Online-Terminbuchung der Website von Dr. Bosede Baldauf"
        : "Online appointment booking on the Dr. Bosede Baldauf website"
      : (content.performance?.afterTitle ?? copy.performanceTest),
  );

  /* =========================================================
     OG IMAGE
  ========================================================= */

  const ogImage = $derived.by(() => {
    const image = media.ogImage ?? media.newWebsiteImage ?? media.ranking ?? "";

    if (!image) {
      return "";
    }

    if (image.startsWith("http://") || image.startsWith("https://")) {
      return image;
    }

    return `https://www.zorawebdesign.com${
      image.startsWith("/") ? image : `/${image}`
    }`;
  });

  /* =========================================================
     LIGHTBOX
  ========================================================= */

  function openLightbox(src, alt) {
    if (!src) {
      return;
    }

    lightboxImage = src;
    lightboxAlt = alt;

    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightboxImage = "";
    lightboxAlt = "";

    document.body.style.overflow = "";
  }

  function handleKeydown(event) {
    if (event.key === "Escape" && lightboxImage) {
      closeLightbox();
    }
  }

  /* =========================================================
     FULL WEBSITE SCROLL
  ========================================================= */

  function scrollPreview(node) {
    const image = node.querySelector("img");

    if (!image) {
      return {
        destroy() {},
      };
    }

    let resizeObserver;

    function updateDistance() {
      requestAnimationFrame(() => {
        const imageHeight = image.offsetHeight;

        const frameHeight = node.clientHeight;

        const distance = Math.max(0, imageHeight - frameHeight);

        node.style.setProperty("--scroll-distance", `${distance}px`);
      });
    }

    if (image.complete) {
      updateDistance();
    }

    image.addEventListener("load", updateDistance);

    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(updateDistance);

      resizeObserver.observe(node);
      resizeObserver.observe(image);
    }

    updateDistance();

    return {
      destroy() {
        image.removeEventListener("load", updateDistance);

        resizeObserver?.disconnect();
      },
    };
  }

  /* =========================================================
     FORCE PROJECT PAGES TO DARK MODE

     The user's previous theme is restored when leaving
     the project page.
  ========================================================= */

  onMount(() => {
    document.documentElement.lang = content.language;

    const body = document.body;

    const hadLightMode = body.classList.contains("light");

    body.classList.remove("light");
    body.classList.add("project-dark-page");

    return () => {
      body.classList.remove("project-dark-page");

      if (hadLightMode) {
        body.classList.add("light");
      }
    };
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
  <title>{content.seo.title}</title>

  <meta name="description" content={content.seo.description} />

  <link rel="canonical" href={content.seo.canonical} />

  <link
    rel="alternate"
    hreflang={content.language}
    href={content.seo.canonical}
  />

  <link
    rel="alternate"
    hreflang={content.language === "de" ? "en" : "de"}
    href={content.seo.alternate}
  />

  <meta property="og:type" content="website" />

  <meta property="og:title" content={content.seo.title} />

  <meta property="og:description" content={content.seo.description} />

  <meta property="og:url" content={content.seo.canonical} />

  {#if ogImage}
    <meta property="og:image" content={ogImage} />
  {/if}
</svelte:head>

<Header nav={content.nav} showThemeControl={false} />

<main class="project-page">
  <!-- =====================================================
       01 — PROJECT
  ====================================================== -->

  <section class="project-section">
    <div class="page-shell intro-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column">
        <div class="project-hero">
          <span class="eyebrow">
            {content.hero.eyebrow}
          </span>

          <h1>
            <span>
              {content.hero.title}
            </span>

            <span>
              {content.hero.outlinedTitle}
            </span>
          </h1>

          <p class="hero-lead">
            {content.hero.subtitle}
          </p>

          <a
            href={projectWebsiteUrl}
            class="live-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>
              {copy.liveWebsite}
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
        </div>

        <!-- PROJECT OVERVIEW -->

        <div class="overview">
          <h2>
            {copy.overviewTitle}
          </h2>

          <p class="overview-text">
            {copy.overviewText}
          </p>

          {#if content.overview?.description}
            <p class="overview-text overview-text-secondary">
              {content.overview.description}
            </p>
          {/if}

          {#if overviewItems.length}
            <ul class="overview-list">
              {#each overviewItems as item}
                <li>
                  {item}
                </li>
              {/each}
            </ul>
          {/if}

          <!-- PROJECT FACTS -->

          {#if projectFacts.length}
            <div class="project-facts">
              {#each projectFacts as fact, index}
                {#if index > 0}
                  <span class="fact-divider" aria-hidden="true"> · </span>
                {/if}

                <span>
                  {fact}
                </span>
              {/each}
            </div>
          {/if}

          <!-- TECHNOLOGY STACK -->

          {#if technologyStack.length}
            <div class="stack">
              {#each technologyStack as technology, index}
                {#if index > 0}
                  <span class="stack-divider" aria-hidden="true"> · </span>
                {/if}

                <span>
                  {technology}
                </span>
              {/each}
            </div>
          {/if}
        </div>
      </div>
    </div>
  </section>

  <!-- =====================================================
       02 — WEBSITE TRANSFORMATION
  ====================================================== -->

  <section class="project-section">
    <div class="page-shell transformation-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="section-title centered-title">
        <h2>
          {copy.transformationTitle}
        </h2>
      </div>

      <div class="visual-grid">
        {#each transformationItems as item}
          <article class="visual-column">
            <div class="visual-label">
              <span>
                {item.label}
              </span>

              <h3>
                {item.title}
              </h3>
            </div>

            {#if item.type === "scroll"}
              <button
                type="button"
                class="visual-frame scroll-frame"
                onclick={() => openLightbox(item.image, item.alt)}
              >
                <div class="scroll-preview" use:scrollPreview>
                  <img
                    class="scroll-image"
                    src={item.image}
                    alt={item.alt}
                    loading="lazy"
                  />
                </div>

                <span class="zoom-indicator" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6"></circle>

                    <path d="M15.5 15.5L20 20"></path>

                    <path d="M8 11H14"></path>

                    <path d="M11 8V14"></path>
                  </svg>
                </span>
              </button>
            {:else}
              <button
                type="button"
                class="visual-frame"
                onclick={() => openLightbox(item.image, item.alt)}
              >
                <img
                  class="static-image"
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                />

                <span class="zoom-indicator" aria-hidden="true">
                  <svg viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="6"></circle>

                    <path d="M15.5 15.5L20 20"></path>

                    <path d="M8 11H14"></path>

                    <path d="M11 8V14"></path>
                  </svg>
                </span>
              </button>
            {/if}
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- =====================================================
       03 — RESULT
  ====================================================== -->

  <section class="project-section">
    <div class="page-shell result-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="result-intro">
        <h2>
          {copy.resultTitle}
        </h2>

        <p>
          {copy.resultText}
        </p>
      </div>

      <!-- RESULT METRICS -->

      <div class="performance-scores" class:baldauf-scores={isBaldauf}>
        {#each performanceScores as score}
          <article>
            {#if isBaldauf}
              <div class="score-bracket-group">
                <div class="score-content">
                  <strong>
                    {score[0]}
                  </strong>

                  <span class="score-label">
                    {score[1]}
                  </span>
                </div>
              </div>
            {:else}
              <strong>
                {score[0]}
              </strong>

              <span>
                {score[1]}
              </span>
            {/if}
          </article>
        {/each}
      </div>

      <!-- SINGLE RESULT IMAGE -->

      {#if resultImage}
        <div class="performance-proof">
          <div class="performance-label">
            {copy.performanceTest}
          </div>

          <button
            type="button"
            class="performance-image"
            onclick={() => openLightbox(resultImage, resultImageAlt)}
          >
            <img src={resultImage} alt={resultImageAlt} loading="lazy" />

            <span class="zoom-indicator" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="6"></circle>

                <path d="M15.5 15.5L20 20"></path>

                <path d="M8 11H14"></path>

                <path d="M11 8V14"></path>
              </svg>
            </span>
          </button>
        </div>
      {/if}
    </div>
  </section>

  <!-- =====================================================
       04 — CTA
  ====================================================== -->

  <section class="project-section">
    <div class="page-shell cta-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="cta-column">
        <h2>
          {copy.ctaTitle}
        </h2>

        <p>
          {copy.ctaText}
        </p>

        <div class="cta-actions">
          <a href={content.cta?.href ?? configuratorUrl} class="primary-button">
            <span>
              {copy.ctaButton}
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
        </div>
      </div>
    </div>
  </section>
</main>

<!-- =====================================================
     LIGHTBOX
====================================================== -->

{#if lightboxImage}
  <div class="lightbox" role="presentation" onclick={closeLightbox}>
    <div
      class="lightbox-dialog"
      role="dialog"
      aria-modal="true"
      aria-label={lightboxAlt}
      onclick={(event) => event.stopPropagation()}
    >
      <button
        class="lightbox-close"
        type="button"
        onclick={closeLightbox}
        aria-label="Close"
      >
        ×
      </button>

      <img src={lightboxImage} alt={lightboxAlt} />
    </div>
  </div>
{/if}

<div class="project-footer">
  <Footer
    homepage
    location={footerContent.location}
    imprintText={footerContent.imprintText}
    language={content.language}
  />
</div>

<style>
  /* =========================================================
     BASE — DARK MODE ONLY
  ========================================================= */

  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body.project-dark-page) {
    margin: 0;

    background: #000000 !important;
    color: #f5f5f5 !important;

    color-scheme: dark;
  }

  .project-page {
    --blue: #0043ff;

    --bg: #000000;
    --text: #f5f5f5;

    --muted: rgba(255, 255, 255, 0.64);

    --line: rgba(255, 255, 255, 0.08);

    --line-strong: rgba(255, 255, 255, 0.16);

    --bracket-line: rgba(255, 255, 255, 0.48);

    --hero-size: clamp(1.45rem, 2.25vw, 2.55rem);

    --heading-size: clamp(21px, 1.65vw, 27px);

    width: 100%;

    overflow: clip;

    background: #000000;
    color: #f5f5f5;

    color-scheme: dark;

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     SECTION FRAME
  ========================================================= */

  .project-section {
    position: relative;

    width: 100%;

    border-top: 1px solid var(--line);

    background: #000000;

    color: var(--text);
  }

  .project-section:last-child {
    border-bottom: 1px solid var(--line);
  }

  .page-shell {
    --shell-x: 40px;

    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding-left: var(--shell-x);

    padding-right: var(--shell-x);
  }

  /* =========================================================
     VERTICAL GUIDE LINES
  ========================================================= */

  .edge-line {
    position: absolute;

    z-index: 2;

    top: 0;
    bottom: 0;

    width: 1px;

    background: var(--line);

    pointer-events: none;
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  /* =========================================================
     READING COLUMN
  ========================================================= */

  .reading-column {
    width: min(800px, 100%);

    margin: 0 auto;
  }

  /* =========================================================
     INTRO
  ========================================================= */

  .intro-shell {
    padding-top: 86px;
    padding-bottom: 98px;
  }

  .eyebrow {
    display: block;

    color: var(--muted);

    font-size: 11px;

    font-weight: 600;

    line-height: 1.4;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .project-hero h1 {
    margin: 27px 0 0;

    display: flex;

    flex-direction: column;

    gap: 5px;

    color: var(--text);

    font-size: var(--hero-size);

    font-weight: 600;

    line-height: 0.98;

    letter-spacing: -0.025em;

    text-transform: uppercase;
  }

  .project-hero h1 span {
    display: block;
  }

  .hero-lead {
    max-width: 630px;

    margin: 24px 0 0;

    color: var(--muted);

    font-size: 16px;

    line-height: 1.7;
  }

  /* =========================================================
     LIVE WEBSITE
  ========================================================= */

  .live-link {
    width: fit-content;

    min-height: 43px;

    margin-top: 28px;

    padding: 0 18px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 11px;

    border: 1px solid #ffffff;

    background: #ffffff;

    color: #050505;

    font-size: 11px;

    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.06em;

    text-decoration: none;

    text-transform: uppercase;
  }

  .live-link svg,
  .primary-button svg {
    width: 16px;
    height: 16px;

    flex: 0 0 auto;
  }

  /* =========================================================
     OVERVIEW
  ========================================================= */

  .overview {
    margin-top: 78px;
  }

  .overview h2 {
    margin: 0;

    color: var(--text);

    font-size: var(--heading-size);

    font-weight: 600;

    line-height: 1.15;

    letter-spacing: -0.025em;
  }

  .overview-text {
    max-width: 720px;

    margin: 21px 0 0;

    color: var(--muted);

    font-size: 16px;

    line-height: 1.75;
  }

  .overview-text-secondary {
    margin-top: 15px;
  }

  /* =========================================================
     OVERVIEW BULLETS
  ========================================================= */

  .overview-list {
    max-width: 720px;

    margin: 32px 0 0;

    padding: 0;

    list-style: none;
  }

  .overview-list li {
    position: relative;

    margin: 0;

    padding-left: 24px;

    color: var(--muted);

    font-size: 16px;

    line-height: 1.7;
  }

  .overview-list li + li {
    margin-top: 13px;
  }

  .overview-list li::before {
    content: "";

    position: absolute;

    top: 0.68em;
    left: 0;

    width: 6px;
    height: 6px;

    border-radius: 50%;

    background: var(--blue);
  }

  /* =========================================================
     PROJECT FACTS
  ========================================================= */

  .project-facts {
    margin-top: 38px;

    display: flex;

    flex-wrap: wrap;

    align-items: center;

    gap: 8px;

    color: var(--text);

    font-size: 14px;

    line-height: 1.65;
  }

  .fact-divider {
    color: var(--blue);
  }

  /* =========================================================
     STACK
  ========================================================= */

  .stack {
    margin-top: 11px;

    display: flex;

    flex-wrap: wrap;

    align-items: center;

    gap: 5px;

    color: #ffffff;

    font-size: 14px;

    font-weight: 700;

    line-height: 1.65;
  }

  .stack span {
    color: inherit;

    font-weight: inherit;
  }

  .stack-divider {
    color: rgba(255, 255, 255, 0.7);
  }

  /* =========================================================
     TRANSFORMATION
  ========================================================= */

  .transformation-shell {
    padding-top: 82px;
    padding-bottom: 94px;
  }

  .section-title {
    margin-bottom: 50px;
  }

  .centered-title {
    text-align: center;
  }

  .section-title h2 {
    margin: 0;

    color: var(--text);

    font-size: var(--heading-size);

    font-weight: 600;

    line-height: 1.15;

    letter-spacing: -0.025em;
  }

  /* =========================================================
     THREE VISUAL COLUMNS
  ========================================================= */

  .visual-grid {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: clamp(22px, 2.3vw, 34px);

    align-items: stretch;
  }

  .visual-column {
    min-width: 0;

    display: grid;

    grid-template-rows:
      auto
      minmax(0, 1fr);
  }

  .visual-label {
    min-height: 74px;

    margin-bottom: 18px;

    text-align: center;
  }

  .visual-label > span {
    display: block;

    color: var(--muted);

    font-size: 11px;

    font-weight: 600;

    line-height: 1.4;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  .visual-label h3 {
    margin: 8px 0 0;

    color: var(--text);

    font-size: 16px;

    font-weight: 500;

    line-height: 1.35;

    letter-spacing: -0.015em;
  }

  /* =========================================================
     VISUAL FRAME
  ========================================================= */

  .visual-frame {
    position: relative;

    width: 100%;

    height: clamp(400px, 36vw, 540px);

    padding: 0;

    overflow: hidden;

    border: 0;

    display: block;

    background: #0b0b0b;

    cursor: zoom-in;
  }

  .static-image {
    width: 100%;
    height: 100%;

    display: block;

    object-fit: cover;

    object-position: top center;
  }

  /* =========================================================
     FULL WEBSITE SCROLL
  ========================================================= */

  .scroll-frame {
    overflow: hidden;
  }

  .scroll-preview {
    --scroll-distance: 0px;

    position: absolute;

    inset: 0;

    width: 100%;
    height: 100%;

    overflow: hidden;
  }

  .scroll-image {
    position: absolute;

    top: 0;
    left: 0;

    width: 100%;
    height: auto;

    max-width: none;

    display: block;

    transform: translate3d(0, 0, 0);

    transition: transform 7s linear;

    will-change: transform;
  }

  .scroll-frame:hover .scroll-image,
  .scroll-frame:focus-visible .scroll-image {
    transform: translate3d(0, calc(-1 * var(--scroll-distance)), 0);
  }

  /* =========================================================
     ZOOM
  ========================================================= */

  .zoom-indicator {
    position: absolute;

    z-index: 5;

    top: 50%;
    left: 50%;

    width: 46px;
    height: 46px;

    display: grid;

    place-items: center;

    border: 1px solid rgba(255, 255, 255, 0.48);

    background: rgba(0, 0, 0, 0.68);

    color: #ffffff;

    transform: translate(-50%, -50%);

    pointer-events: none;
  }

  .zoom-indicator svg {
    width: 20px;
    height: 20px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.5;

    stroke-linecap: round;

    stroke-linejoin: round;
  }

  /* =========================================================
     RESULT
  ========================================================= */

  .result-shell {
    padding-top: 82px;
    padding-bottom: 96px;
  }

  .result-intro {
    width: min(730px, 100%);

    margin: 0 auto;

    text-align: center;
  }

  .result-intro h2 {
    margin: 0;

    color: var(--text);

    font-size: var(--heading-size);

    font-weight: 600;

    line-height: 1.15;

    letter-spacing: -0.025em;
  }

  .result-intro p {
    max-width: 630px;

    margin: 20px auto 0;

    color: var(--muted);

    font-size: 16px;

    line-height: 1.7;
  }

  /* =========================================================
     EVA RESULT SCORES
  ========================================================= */

  .performance-scores {
    width: min(860px, calc(100% - 80px));

    margin: 62px auto 0;

    display: grid;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: clamp(30px, 4vw, 60px);

    text-align: center;
  }

  .performance-scores article {
    min-width: 0;
  }

  .performance-scores > article > strong {
    display: block;

    color: var(--text);

    font-size: clamp(28px, 2.5vw, 42px);

    font-weight: 500;

    line-height: 1;

    letter-spacing: -0.03em;
  }

  .performance-scores > article > span {
    display: block;

    margin-top: 12px;

    color: var(--muted);

    font-size: 12px;

    font-weight: 500;

    line-height: 1.45;
  }

  /* =========================================================
     BALDAUF RESULT SCORES

     1px graphic brackets.
     Centered text.
     Bracket width follows content.
  ========================================================= */

  .performance-scores.baldauf-scores {
    width: 100%;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: clamp(10px, 2vw, 28px);

    align-items: center;

    text-align: center;
  }

  .baldauf-scores article {
    min-width: 0;

    display: flex;

    align-items: center;

    justify-content: center;
  }

  .score-bracket-group {
    position: relative;

    width: fit-content;

    max-width: 100%;

    min-height: 64px;

    padding: 9px 16px;

    display: inline-flex;

    align-items: center;

    justify-content: center;
  }

  .score-bracket-group::before,
  .score-bracket-group::after {
    content: "";

    position: absolute;

    top: 0;
    bottom: 0;

    width: 7px;

    pointer-events: none;
  }

  .score-bracket-group::before {
    left: 0;

    border-top: 1px solid var(--bracket-line);

    border-bottom: 1px solid var(--bracket-line);

    border-left: 1px solid var(--bracket-line);
  }

  .score-bracket-group::after {
    right: 0;

    border-top: 1px solid var(--bracket-line);

    border-right: 1px solid var(--bracket-line);

    border-bottom: 1px solid var(--bracket-line);
  }

  .score-content {
    width: fit-content;

    display: flex;

    flex-direction: column;

    align-items: center;

    justify-content: center;

    text-align: center;
  }

  .score-content strong {
    display: block;

    margin: 0 0 6px;

    color: #ffffff;

    font-size: clamp(19px, 1.55vw, 23px);

    font-weight: 600;

    line-height: 1;

    letter-spacing: -0.03em;

    text-align: center;

    white-space: nowrap;
  }

  .score-label {
    display: block;

    margin: 0;

    color: rgba(255, 255, 255, 0.58);

    font-size: clamp(8px, 0.72vw, 10px);

    font-weight: 500;

    line-height: 1.25;

    letter-spacing: 0.01em;

    text-align: center;

    white-space: nowrap;
  }

  /* =========================================================
     RESULT IMAGE
  ========================================================= */

  .performance-proof {
    width: min(940px, calc(100% - 80px));

    margin: 68px auto 0;
  }

  .performance-label {
    margin-bottom: 14px;

    color: var(--muted);

    font-size: 11px;

    font-weight: 600;

    line-height: 1.4;

    letter-spacing: 0.06em;

    text-align: center;

    text-transform: uppercase;
  }

  .performance-image {
    position: relative;

    width: 100%;

    padding: 0;

    overflow: hidden;

    border: 0;

    display: block;

    background: transparent;

    cursor: zoom-in;
  }

  .performance-image img {
    width: 100%;
    height: auto;

    display: block;
  }

  /* =========================================================
     CTA
  ========================================================= */

  .cta-shell {
    padding-top: 76px;
    padding-bottom: 84px;
  }

  .cta-column {
    width: min(730px, 100%);

    margin: 0 auto;

    text-align: center;
  }

  .cta-column h2 {
    margin: 0;

    color: var(--text);

    font-size: var(--heading-size);

    font-weight: 600;

    line-height: 1.15;

    letter-spacing: -0.025em;
  }

  .cta-column p {
    max-width: 580px;

    margin: 20px auto 0;

    color: var(--muted);

    font-size: 16px;

    line-height: 1.7;
  }

  .cta-actions {
    margin-top: 28px;

    display: flex;

    justify-content: center;
  }

  /* =========================================================
     CTA BUTTON
  ========================================================= */

  .primary-button {
    min-height: 43px;

    padding: 0 18px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    border: 1px solid #ffffff;

    background: #ffffff;

    color: #050505;

    font-size: 11px;

    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.06em;

    text-decoration: none;

    text-transform: uppercase;
  }

  /* =========================================================
     LIGHTBOX
  ========================================================= */

  .lightbox {
    position: fixed;

    z-index: 9999;

    inset: 0;

    padding: 20px;

    display: grid;

    place-items: center;

    background: rgba(0, 0, 0, 0.94);
  }

  .lightbox-dialog {
    position: relative;

    width: min(1500px, 100%);

    max-height: calc(100vh - 40px);

    overflow: auto;

    background: #080808;
  }

  .lightbox-dialog img {
    width: 100%;
    height: auto;

    display: block;
  }

  .lightbox-close {
    position: sticky;

    z-index: 2;

    top: 12px;

    width: 42px;
    height: 42px;

    margin: 12px 12px -54px auto;

    border: 1px solid rgba(255, 255, 255, 0.35);

    display: grid;

    place-items: center;

    background: #000000;

    color: #ffffff;

    font-size: 18px;

    cursor: pointer;
  }

  /* =========================================================
     FOOTER
  ========================================================= */

  .project-footer {
    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    background: #000000;
  }

  :global(.project-footer .site-footer) {
    width: 100% !important;

    margin: 0 auto !important;

    box-sizing: border-box;

    background: #000000 !important;

    color: #ffffff !important;

    font-family: "DM Sans", Arial, sans-serif !important;
  }

  :global(.project-footer .site-footer .footer-row) {
    width: 100% !important;

    max-width: none !important;

    margin-left: auto !important;

    margin-right: auto !important;

    box-sizing: border-box;

    padding-left: 40px !important;

    padding-right: 40px !important;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1100px) {
    .project-page {
      --hero-size: clamp(1.5rem, 4.5vw, 2.45rem);

      --heading-size: 22px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .page-shell {
      width: 90%;

      padding-left: 28px;
      padding-right: 28px;
    }

    .intro-shell {
      padding-top: 72px;

      padding-bottom: 84px;
    }

    .transformation-shell,
    .result-shell {
      padding-top: 72px;

      padding-bottom: 82px;
    }

    .reading-column {
      width: min(700px, 100%);
    }

    /* SAME HEIGHT FOR ALL 3 */

    .visual-column {
      grid-template-rows:
        auto
        400px;
    }

    .visual-frame {
      width: 100%;

      height: 400px;

      min-height: 400px;

      max-height: 400px;
    }

    .static-image {
      width: 100%;

      height: 100%;
    }

    .scroll-preview {
      height: 100%;
    }

    /* BALDAUF SCORES */

    .performance-scores.baldauf-scores {
      width: 100%;

      grid-template-columns: repeat(4, minmax(0, 1fr));

      gap: 8px;
    }

    .score-bracket-group {
      min-height: 60px;

      padding: 8px 12px;
    }

    .score-content strong {
      font-size: 20px;
    }

    .score-label {
      font-size: 9px;
    }

    .performance-proof {
      width: min(840px, calc(100% - 40px));
    }

    .project-footer {
      width: 90%;
    }

    :global(.project-footer .site-footer .footer-row) {
      padding-left: 28px !important;

      padding-right: 28px !important;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .project-page {
      --hero-size: clamp(1.15rem, 5.3vw, 1.7rem);

      --heading-size: clamp(20px, 5.5vw, 24px);
    }

    .page-shell {
      width: calc(100% - 20px);

      padding-left: 20px;

      padding-right: 20px;
    }

    .intro-shell,
    .transformation-shell,
    .result-shell,
    .cta-shell {
      padding-top: 58px;

      padding-bottom: 64px;
    }

    .project-hero h1 {
      margin-top: 21px;

      font-weight: 500;

      letter-spacing: -0.04em;

      text-transform: none;
    }

    .hero-lead,
    .overview-text,
    .overview-list li,
    .result-intro p,
    .cta-column p {
      font-size: 14px;

      line-height: 1.65;
    }

    .overview {
      margin-top: 60px;
    }

    .overview-text {
      margin-top: 17px;
    }

    .overview-text-secondary {
      margin-top: 13px;
    }

    .overview-list {
      margin-top: 27px;
    }

    .project-facts {
      margin-top: 32px;
    }

    /* =====================================================
       VISUALS
    ====================================================== */

    .section-title {
      margin-bottom: 40px;
    }

    .visual-grid {
      grid-template-columns: 1fr;

      gap: 46px;
    }

    .visual-column {
      grid-template-rows:
        auto
        390px;
    }

    .visual-label {
      min-height: auto;

      margin-bottom: 16px;
    }

    .visual-frame {
      height: 390px;

      min-height: 390px;

      max-height: 390px;
    }

    /* =====================================================
       BALDAUF RESULTS
       ONE ROW ON MOBILE
    ====================================================== */

    .performance-scores.baldauf-scores {
      width: 100%;

      margin-top: 46px;

      grid-template-columns: repeat(4, minmax(0, 1fr));

      gap: 3px;
    }

    .baldauf-scores article {
      min-width: 0;
    }

    .score-bracket-group {
      min-height: 54px;

      padding: 6px 7px;
    }

    .score-bracket-group::before,
    .score-bracket-group::after {
      width: 4px;
    }

    .score-content strong {
      margin-bottom: 5px;

      font-size: clamp(15px, 4.7vw, 19px);
    }

    .score-label {
      font-size: clamp(6px, 1.9vw, 8px);

      line-height: 1.15;

      white-space: normal;
    }

    /* EVA KEEPS 2 × 2 MOBILE */

    .performance-scores:not(.baldauf-scores) {
      width: 100%;

      margin-top: 48px;

      grid-template-columns: repeat(2, minmax(0, 1fr));

      gap: 36px 22px;
    }

    .performance-proof {
      width: 100%;

      margin-top: 54px;
    }

    /* =====================================================
       CTA MOBILE
       LEFT ALIGNED
    ====================================================== */

    .cta-column {
      text-align: left;
    }

    .cta-column h2 {
      text-align: left;
    }

    .cta-column p {
      max-width: 100%;

      margin-left: 0;

      margin-right: 0;

      text-align: left;
    }

    .cta-actions {
      justify-content: flex-start;
    }

    /* =====================================================
       FOOTER
    ====================================================== */

    .project-footer {
      width: calc(100% - 20px);
    }

    :global(.project-footer .site-footer .footer-row) {
      padding-left: 20px !important;

      padding-right: 20px !important;
    }
  }

  @media (max-width: 420px) {
    .visual-column {
      grid-template-rows:
        auto
        340px;
    }

    .visual-frame {
      height: 340px;

      min-height: 340px;

      max-height: 340px;
    }

    .performance-scores.baldauf-scores {
      gap: 1px;
    }

    .score-bracket-group {
      padding: 6px 5px;
    }

    .score-content strong {
      font-size: 16px;
    }

    .score-label {
      font-size: 6px;
    }

    .project-facts,
    .stack {
      line-height: 1.8;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }

    .scroll-image {
      transition: none;
    }
  }
</style>
