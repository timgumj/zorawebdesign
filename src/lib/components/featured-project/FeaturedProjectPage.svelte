<script>
  import { onMount } from "svelte";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let { content, media, websiteUrl = "https://evaeichinger.com" } = $props();

  let comparisonPosition = $state(50);

  let lightboxImage = $state("");
  let lightboxAlt = $state("");

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

  const performanceScores = [
    ["98", "Performance"],
    ["95", "Accessibility"],
    ["96", "Best Practices"],
    ["100", "SEO"],
  ];

  function getTechnologyItem(name) {
    return (
      content.technology?.items?.find(
        (item) => item.name?.toLowerCase() === name.toLowerCase(),
      ) ?? {}
    );
  }

  const technologyCards = $derived([
    {
      ...getTechnologyItem("WordPress"),

      name: "WordPress",

      role:
        getTechnologyItem("WordPress").role ??
        (content.language === "de"
          ? "Headless Content-Management"
          : "Headless Content Management"),

      image: media.wordpress,

      description:
        getTechnologyItem("WordPress").description ??
        (content.language === "de"
          ? "WordPress bleibt das vertraute und einfach bedienbare System für Inhalte, Bilder und redaktionelle Änderungen."
          : "WordPress remains the familiar and easy-to-use system for content, images and editorial updates."),
    },

    {
      ...getTechnologyItem("Vercel"),

      name: "Vercel",

      role:
        getTechnologyItem("Vercel").role ??
        (content.language === "de"
          ? "Deployment & Auslieferung"
          : "Deployment & Delivery"),

      image: media.vercel,

      description:
        getTechnologyItem("Vercel").description ??
        (content.language === "de"
          ? "Automatisierte Deployments über GitHub sorgen für eine schnelle und zuverlässige Auslieferung der Website."
          : "Automated deployments through GitHub provide fast and reliable delivery of the website."),
    },

    {
      ...getTechnologyItem("SvelteKit"),

      name: "SvelteKit",

      role: getTechnologyItem("SvelteKit").role ?? "Frontend Framework",

      image: media.sveltekit ?? "/images/sveltekit_eva_result.webp",

      description:
        getTechnologyItem("SvelteKit").description ??
        (content.language === "de"
          ? "Das individuelle Frontend wurde mit SvelteKit entwickelt. Dadurch bleibt die Website schnell, flexibel und unabhängig von einem schweren Page Builder."
          : "The custom frontend was built with SvelteKit, keeping the website fast, flexible and independent from a heavy page builder."),
    },
  ]);

  function openLightbox(src, alt) {
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

  function scrollToSection(event, id) {
    event.preventDefault();

    const section = document.getElementById(id);

    if (!section) return;

    const headerHeight =
      document.querySelector(".site-header")?.getBoundingClientRect().height ??
      0;

    window.scrollTo({
      top:
        section.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        16,

      behavior: "smooth",
    });
  }

  onMount(() => {
    document.documentElement.lang = content.language;
  });
</script>

<svelte:window onkeydown={handleKeydown} />

<svelte:head>
  <title>
    {content.seo.title}
  </title>

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

  <meta
    property="og:image"
    content="https://www.zorawebdesign.com/images/new_website_design_result.webp"
  />
</svelte:head>

<Header nav={content.nav} />

<ThemeToggle />

<main class="project-page">
  <!-- =====================================================
       HERO
       TEXT LEFT / IMAGE RIGHT
  ====================================================== -->

  <section class="project-hero">
    <div class="hero-shell">
      <!-- LEFT -->

      <div class="hero-content">
        <div class="project-kicker">
          {content.hero.eyebrow}
        </div>

        <h1 class="hero-title">
          <span>
            {content.hero.title}
          </span>

          <span>
            {content.hero.outlinedTitle}
          </span>
        </h1>

        <p class="hero-subtitle">
          {content.hero.subtitle}
        </p>

        <p class="hero-description">
          {content.hero.description}
        </p>

        <div class="hero-actions">
          <a
            href="#overview"
            class="hero-button"
            onclick={(event) => scrollToSection(event, "overview")}
          >
            <span>
              {content.hero.primaryButton}
            </span>

            <span aria-hidden="true"> → </span>
          </a>

          <a
            href={websiteUrl}
            class="hero-button hero-button-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content.hero.websiteButton}
          </a>
        </div>
      </div>

      <!-- RIGHT -->

      <div class="hero-media">
        <img
          src={media.newWebsiteImage}
          alt={content.comparison.after.title}
          fetchpriority="high"
        />
      </div>
    </div>
  </section>

  <!-- =====================================================
       OVERVIEW
       NOW DIRECTLY AFTER HERO
  ====================================================== -->

  <section id="overview" class="project-section">
    <div class="section-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div
        class="section-header single-header centered-section-header overview-section-header"
      >
        <div class="section-heading">
          <h2>
            {content.overview.title}
          </h2>
        </div>
      </div>

      <div class="overview-grid">
        <div class="overview-copy">
          <p class="section-description overview-introduction">
            {content.overview.introduction}
          </p>

          <p class="section-description secondary-description">
            {content.overview.description}
          </p>
        </div>

        <div class="overview-meta">
          {#each content.meta as item}
            <div>
              <span>
                {item[0]}
              </span>

              <strong>
                {item[1]}
              </strong>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- =====================================================
       COMPARISON
  ====================================================== -->

  <section
    id="comparison"
    class="project-section comparison-section"
    style="margin-top: calc(var(--section-space) / -1.5);"
  >
    <div class="section-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="section-header">
        <div class="section-heading">
          <h2>
            {content.comparison.title}
          </h2>
        </div>

        <p class="section-description section-header-description">
          {content.language === "de"
            ? "Ziehe den Regler nach links oder rechts, um die alte Website direkt mit dem neuen Design zu vergleichen."
            : "Drag the control left or right to compare the previous website directly with the redesigned version."}
        </p>
      </div>

      <div class="comparison-stage-wrap">
        <div class="before-after-stage">
          <div class="comparison-inside-label comparison-before-label">
            <span>
              {content.comparison.before.label}
            </span>

            <strong>
              {content.comparison.before.title}
            </strong>
          </div>

          <div class="comparison-inside-label comparison-after-label">
            <span>
              {content.comparison.after.label}
            </span>

            <strong>
              {content.comparison.after.title}
            </strong>
          </div>

          <img
            class="comparison-sizer"
            src={media.newWebsiteImage}
            alt=""
            aria-hidden="true"
          />

          <img
            class="comparison-layer"
            src={media.oldWebsiteImage}
            alt={content.comparison.before.title}
            loading="lazy"
          />

          <div
            class="after-mask"
            style={`clip-path: inset(0 ${100 - comparisonPosition}% 0 0)`}
          >
            <img
              class="comparison-layer"
              src={media.newWebsiteImage}
              alt={content.comparison.after.title}
              loading="lazy"
            />
          </div>

          <div class="comparison-line" style={`left: ${comparisonPosition}%`}>
            <span aria-hidden="true"> ↔ </span>
          </div>

          <input
            class="comparison-range"
            type="range"
            min="0"
            max="100"
            step="1"
            bind:value={comparisonPosition}
            aria-label={content.language === "de"
              ? "Vorher-Nachher-Vergleich"
              : "Before and after comparison"}
          />
        </div>
      </div>
    </div>
  </section>

  <!-- =====================================================
       TECHNOLOGY
  ====================================================== -->

  <section id="technology" class="project-section">
    <div class="section-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="section-header">
        <div class="section-heading">
          <h2>
            {content.technology.title}
          </h2>
        </div>

        <p class="section-description section-header-description">
          {content.language === "de"
            ? "Ein einfaches WordPress-Backend kombiniert mit einem individuellen SvelteKit-Frontend und einer schnellen Auslieferung über Vercel."
            : "A simple WordPress backend combined with a custom SvelteKit frontend and fast deployment through Vercel."}
        </p>
      </div>

      <div class="technology-grid">
        {#each technologyCards as item}
          <article class="technology-card">
            <div class="technology-image">
              <img
                src={item.image}
                alt={`${item.name} – Eva Eichinger Website`}
                loading="lazy"
              />
            </div>

            <div class="technology-copy">
              <span class="small-label">
                {item.role}
              </span>

              <h3>
                {item.name}
              </h3>

              <p class="section-description">
                {item.description}
              </p>
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- =====================================================
       PERFORMANCE
  ====================================================== -->

  <section id="performance" class="project-section">
    <div class="section-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="section-header single-header">
        <div class="section-heading">
          <h2>
            {content.performance.title}
          </h2>
        </div>
      </div>

      <div class="performance-layout">
        <div class="performance-copy">
          <p class="section-description">
            {content.performance.description}
          </p>

          <div class="performance-score-grid">
            {#each performanceScores as score}
              <article>
                <strong>
                  {score[0]}
                </strong>

                <span>
                  {score[1]}
                </span>
              </article>
            {/each}
          </div>
        </div>

        <div class="performance-proof">
          <div class="performance-proof-header">
            <div>
              <span>
                {content.performance.afterLabel}
              </span>

              <strong>
                {content.performance.afterTitle}
              </strong>
            </div>

            <button
              type="button"
              aria-label="Open performance screenshot"
              onclick={() =>
                openLightbox(
                  media.speedTestNew,
                  content.performance.afterTitle,
                )}
            >
              ↗
            </button>
          </div>

          <button
            class="performance-image"
            type="button"
            onclick={() =>
              openLightbox(media.speedTestNew, content.performance.afterTitle)}
          >
            <img
              src={media.speedTestNew}
              alt={content.performance.afterTitle}
              loading="lazy"
            />
          </button>
        </div>
      </div>
    </div>
  </section>

  <!-- =====================================================
       RESULTS
  ====================================================== -->

  <section id="results" class="project-section">
    <div class="section-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="results-layout">
        <div class="results-heading">
          <h2>
            {content.results.title}
          </h2>
        </div>

        <div class="results-list">
          {#each content.results.items.slice(0, 3) as item}
            <article>
              <span class="result-line" aria-hidden="true"></span>

              <p class="section-description">
                {item}
              </p>
            </article>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- =====================================================
       CTA
  ====================================================== -->

  <section class="project-section project-cta">
    <div class="section-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>

      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="cta-layout">
        <div>
          <div class="cta-kicker">
            {content.cta.eyebrow}
          </div>

          <h2>
            {content.cta.title}
          </h2>
        </div>

        <div class="cta-right">
          <p class="section-description">
            {content.cta.description}
          </p>

          <div class="cta-actions">
            <a href={content.cta.href ?? configuratorUrl} class="cta-primary">
              <span>
                {content.cta.button}
              </span>

              <span aria-hidden="true"> → </span>
            </a>

            <a
              href={websiteUrl}
              class="cta-secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.language === "de" ? "LIVE-WEBSITE" : "LIVE WEBSITE"}
            </a>
          </div>
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

<!-- =====================================================
     FOOTER
====================================================== -->

<div class="project-footer">
  <Footer
    location={footerContent.location}
    imprintText={footerContent.imprintText}
    language={content.language}
  />
</div>

<style>
  /* =========================================================
     GLOBAL
  ========================================================= */

  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;

    background: #000000;

    color: #ffffff;
  }

  :global(body.light) {
    background: #ffffff !important;

    color: #111111;
  }

  .project-page {
    --blue: #0043ff;

    --bg: #000000;

    --surface: #0d0d0e;

    --text: #f2f2f2;

    --muted: rgba(255, 255, 255, 0.62);

    --line: rgba(255, 255, 255, 0.08);

    --line-strong: rgba(255, 255, 255, 0.14);

    /*
     * ONE COPY SYSTEM
     */

    --copy-size: 15px;

    --copy-line: 1.7;

    --copy-weight: 400;

    /*
     * EVERY SECTION AFTER HERO
     * USES THIS SAME TOP/BOTTOM SPACE
     */

    --section-space: clamp(96px, 8vw, 128px);

    width: 100%;

    overflow: clip;

    background: var(--bg);

    color: var(--text);

    font-family: "Space Grotesk", Arial, Helvetica, sans-serif;
  }

  :global(body.light) .project-page {
    --bg: #ffffff;

    --surface: #ffffff;

    --text: #111111;

    --muted: rgba(0, 0, 0, 0.62);

    --line: rgba(0, 0, 0, 0.08);

    --line-strong: rgba(0, 0, 0, 0.14);

    background: #ffffff !important;
  }

  /* =========================================================
     BODY COPY
  ========================================================= */

  .section-description,
  .hero-description,
  .technology-copy p,
  .cta-right p {
    font-size: var(--copy-size);

    font-weight: var(--copy-weight);

    line-height: var(--copy-line);

    letter-spacing: 0;
  }

  .section-description {
    margin: 0;

    color: var(--muted);
  }

  /* =========================================================
     ALL SECTIONS AFTER HERO
  ========================================================= */

  .project-section {
    width: 100%;

    background: var(--bg);

    color: var(--text);
  }

  :global(body.light) .project-section {
    background: #ffffff !important;
  }

  .section-shell {
    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding: var(--section-space) 40px;
  }

  /* =========================================================
     EDGE LINES
  ========================================================= */

  .edge-line {
    position: absolute;

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
     HERO
  ========================================================= */

  .project-hero {
    width: 100%;

    padding: clamp(42px, 5vw, 72px) 0 0;

    background: var(--bg);

    color: var(--text);
  }

  :global(body.light) .project-hero {
    background: #ffffff !important;
  }

  .hero-shell {
    width: min(1540px, 94%);

    min-height: 540px;

    margin: 0 auto;

    display: grid;

    grid-template-columns:
      minmax(360px, 0.85fr)
      minmax(0, 1.55fr);

    align-items: stretch;

    overflow: hidden;

    border: 0;
  }

  /* =========================================================
     HERO TEXT
  ========================================================= */

  .hero-content {
    width: 100%;

    padding: clamp(48px, 5vw, 76px) clamp(34px, 4vw, 62px);

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    justify-content: center;

    background: #000000;
  }

  :global(body.light) .hero-content {
    background: #ffffff;
  }

  /* =========================================================
     HERO IMAGE
     NO CROPPING
  ========================================================= */

  .hero-media {
    position: relative;

    min-width: 0;

    min-height: 540px;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;

    background: var(--surface);
  }

  :global(body.light) .hero-media {
    background: #ffffff;
  }

  .hero-media img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: contain;

    object-position: center center;
  }

  /* =========================================================
     HERO EYEBROW
  ========================================================= */

  .project-kicker {
    width: fit-content;

    margin-bottom: 24px;

    padding-bottom: 7px;

    border-bottom: 1px solid #0043ff;

    color: var(--muted);

    font-size: 11px;

    font-weight: 500;

    line-height: 1.3;

    letter-spacing: 0.08em;
  }

  /* =========================================================
     HERO TITLE
  ========================================================= */

  .hero-title {
    width: 100%;

    margin: 0;

    display: flex;

    flex-direction: column;

    gap: 7px;

    color: var(--text);

    font-size: clamp(1.45rem, 2.25vw, 2.55rem);

    font-weight: 600;

    line-height: 0.98;

    letter-spacing: -0.025em;

    text-transform: uppercase;
  }

  .hero-title span {
    display: block;
  }

  /* =========================================================
     HERO COPY
  ========================================================= */

  .hero-subtitle {
    max-width: 520px;

    margin: 24px 0 0;

    color: var(--text);

    font-size: 16px;

    font-weight: 500;

    line-height: 1.55;
  }

  .hero-description {
    max-width: 520px;

    margin: 13px 0 0;

    color: var(--muted);
  }

  /* =========================================================
     HERO BUTTONS
  ========================================================= */

  .hero-actions {
    margin-top: 27px;

    display: flex;

    flex-wrap: wrap;

    gap: 11px;
  }

  .hero-button {
    min-height: 42px;

    padding: 0 17px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    border: 1px solid #ffffff;

    background: #ffffff;

    color: #000000;

    font-size: 10px;

    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.07em;

    text-decoration: none;

    text-transform: uppercase;

    transition:
      transform 0.25s ease,
      background 0.25s ease,
      color 0.25s ease;
  }

  .hero-button:hover {
    transform: translateY(-3px);
  }

  .hero-button-secondary {
    border-color: rgba(255, 255, 255, 0.36);

    background: transparent;

    color: #ffffff;
  }

  .hero-button-secondary:hover {
    border-color: #ffffff;

    background: #ffffff;

    color: #000000;
  }

  :global(body.light) .hero-button {
    border-color: #111111;

    background: #111111;

    color: #ffffff;
  }

  :global(body.light) .hero-button-secondary {
    border-color: rgba(0, 0, 0, 0.3);

    background: #ffffff;

    color: #111111;
  }

  /* =========================================================
     SECTION HEADERS
  ========================================================= */

  .section-header {
    width: 100%;

    margin-bottom: 56px;

    padding-bottom: 31px;

    border-bottom: 1px solid #0043ff;

    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(280px, 420px);

    align-items: end;

    gap: 60px;
  }

  .section-header.single-header {
    display: block;
  }

  .section-heading {
    display: block;
  }

  .section-heading h2 {
    max-width: 760px;

    margin: 0;

    color: var(--text);

    font-size: clamp(24px, 2.1vw, 34px);

    font-weight: 600;

    line-height: 1.12;

    letter-spacing: -0.035em;
  }

  .section-header-description {
    max-width: 420px;
  }

  /* =========================================================
     OVERVIEW HEADER
     CENTERED + NO BLUE LINE
  ========================================================= */

  .overview-section-header {
    padding-bottom: 0;

    border-bottom: 0;
  }

  .centered-section-header {
    text-align: center;
  }

  .centered-section-header .section-heading {
    display: flex;

    justify-content: center;
  }

  .centered-section-header .section-heading h2 {
    margin-left: auto;

    margin-right: auto;
  }

  /* =========================================================
     OVERVIEW
  ========================================================= */

  .overview-grid {
    width: min(1100px, 100%);

    margin: 0 auto;

    display: grid;

    grid-template-columns:
      minmax(0, 1.18fr)
      minmax(260px, 0.72fr);

    gap: clamp(60px, 8vw, 110px);

    align-items: center;
  }

  .overview-copy {
    max-width: 680px;
  }

  .overview-introduction {
    color: var(--text);
  }

  .secondary-description {
    margin-top: 20px;
  }

  .overview-meta {
    border-top: 1px solid var(--line-strong);
  }

  .overview-meta div {
    padding: 13px 0;

    border-bottom: 1px solid var(--line);

    display: grid;

    grid-template-columns:
      95px
      minmax(0, 1fr);

    gap: 20px;
  }

  .overview-meta span {
    color: var(--muted);

    font-size: 9px;

    font-weight: 600;

    line-height: 1.4;

    letter-spacing: 0.08em;
  }

  .overview-meta strong {
    color: var(--text);

    font-size: 12px;

    font-weight: 450;

    line-height: 1.4;
  }

  /* =========================================================
     COMPARISON
  ========================================================= */

  .comparison-stage-wrap {
    width: min(960px, 100%);

    margin: 0 auto;
  }

  .before-after-stage {
    position: relative;

    width: 100%;

    overflow: hidden;

    border: 1px solid var(--line-strong);

    background: var(--surface);
  }

  .comparison-sizer {
    width: 100%;

    height: auto;

    display: block;

    visibility: hidden;
  }

  .comparison-layer,
  .after-mask {
    position: absolute;

    inset: 0;

    width: 100%;

    height: 100%;
  }

  .comparison-layer {
    display: block;

    object-fit: contain;

    object-position: top center;

    background: var(--surface);
  }

  .after-mask {
    overflow: hidden;
  }

  /* =========================================================
     COMPARISON LABELS
  ========================================================= */

  .comparison-inside-label {
    position: absolute;

    z-index: 7;

    top: 15px;

    min-width: 110px;

    padding: 9px 11px;

    border: 1px solid rgba(255, 255, 255, 0.18);

    background: #000000;

    color: #ffffff;

    pointer-events: none;
  }

  .comparison-before-label {
    left: 15px;
  }

  .comparison-after-label {
    right: 15px;

    text-align: right;
  }

  .comparison-inside-label span,
  .comparison-inside-label strong {
    display: block;
  }

  .comparison-inside-label span {
    color: #0043ff;

    font-size: 8px;

    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.1em;
  }

  .comparison-inside-label strong {
    margin-top: 4px;

    color: inherit;

    font-size: 10px;

    font-weight: 500;

    line-height: 1.3;
  }

  :global(body.light) .comparison-inside-label {
    border-color: rgba(0, 0, 0, 0.14);

    background: #ffffff;

    color: #111111;
  }

  :global(body.light) .comparison-inside-label span {
    color: #0043ff;
  }

  :global(body.light) .comparison-section .section-description {
    color: rgba(0, 0, 0, 0.62);
  }

  /* =========================================================
     COMPARISON HANDLE
  ========================================================= */

  .comparison-line {
    position: absolute;

    z-index: 5;

    top: 0;

    bottom: 0;

    width: 1px;

    background: #ffffff;

    transform: translateX(-50%);

    pointer-events: none;
  }

  .comparison-line span {
    position: absolute;

    top: 50%;

    left: 50%;

    width: 38px;

    height: 38px;

    display: grid;

    place-items: center;

    border: 1px solid rgba(255, 255, 255, 0.35);

    background: #000000;

    color: #ffffff;

    font-size: 12px;

    transform: translate(-50%, -50%);
  }

  :global(body.light) .comparison-line {
    background: #111111;
  }

  :global(body.light) .comparison-line span {
    border-color: rgba(0, 0, 0, 0.25);

    background: #ffffff;

    color: #111111;
  }

  .comparison-range {
    position: absolute;

    z-index: 8;

    inset: 0;

    width: 100%;

    height: 100%;

    margin: 0;

    opacity: 0;

    cursor: ew-resize;
  }

  /* =========================================================
     TECHNOLOGY
  ========================================================= */

  .technology-grid {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: clamp(22px, 2.5vw, 36px);

    align-items: start;
  }

  .technology-card {
    min-width: 0;

    padding-top: 16px;

    border-top: 1px solid var(--line-strong);
  }

  .technology-image {
    width: 100%;

    height: clamp(185px, 16vw, 245px);

    overflow: hidden;

    border: 1px solid var(--line);

    background: var(--surface);
  }

  :global(body.light) .technology-image {
    background: #ffffff;
  }

  .technology-image img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: contain;

    object-position: top left;
  }

  .technology-copy {
    max-width: 430px;

    margin-top: 20px;
  }

  .small-label {
    color: #0043ff;

    font-size: 9px;

    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .technology-copy h3 {
    margin: 9px 0 11px;

    color: var(--text);

    font-size: clamp(20px, 1.5vw, 25px);

    font-weight: 600;

    line-height: 1.15;

    letter-spacing: -0.03em;
  }

  /* =========================================================
     PERFORMANCE
  ========================================================= */

  .performance-layout {
    width: 100%;

    display: grid;

    grid-template-columns:
      minmax(0, 0.65fr)
      minmax(0, 1.35fr);

    gap: clamp(50px, 6vw, 90px);

    align-items: center;
  }

  .performance-copy {
    max-width: 500px;
  }

  .performance-score-grid {
    margin-top: 34px;

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    border-top: 1px solid var(--line-strong);
  }

  .performance-score-grid article {
    padding: 19px 12px 18px 0;

    border-right: 1px solid var(--line);

    border-bottom: 1px solid var(--line);
  }

  .performance-score-grid article:nth-child(2n) {
    padding-left: 18px;

    border-right: 0;
  }

  .performance-score-grid strong {
    display: block;

    color: #0043ff;

    font-size: clamp(1.7rem, 2.8vw, 3rem);

    font-weight: 500;

    line-height: 1;
  }

  .performance-score-grid span {
    display: block;

    margin-top: 6px;

    color: var(--muted);

    font-size: 9px;

    font-weight: 500;

    line-height: 1.4;
  }

  .performance-proof {
    width: 100%;
    max-width: 850px;

    border: 1px solid var(--line-strong);

    background: var(--surface);
  }

  :global(body.light) .performance-proof {
    background: #ffffff;
  }

  .performance-proof-header {
    padding: 12px 14px;

    border-bottom: 1px solid var(--line);

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 15px;
  }

  .performance-proof-header div {
    display: flex;

    align-items: baseline;

    gap: 9px;
  }

  .performance-proof-header span {
    color: #0043ff;

    font-size: 8px;

    font-weight: 600;

    letter-spacing: 0.08em;
  }

  .performance-proof-header strong {
    color: var(--text);

    font-size: 10px;

    font-weight: 500;
  }

  .performance-proof-header button {
    padding: 0;

    border: 0;

    background: transparent;

    color: var(--text);

    font-size: 16px;

    cursor: pointer;
  }

  .performance-image {
    width: 100%;

    padding: 0;

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
     RESULTS
  ========================================================= */

  .results-layout {
    width: 100%;

    display: grid;

    grid-template-columns:
      minmax(0, 0.9fr)
      minmax(0, 1.1fr);

    gap: clamp(65px, 8vw, 120px);

    align-items: center;
  }

  .results-heading {
    max-width: 560px;
  }

  .results-heading h2 {
    margin: 0;

    color: var(--text);

    font-size: clamp(24px, 2.1vw, 34px);

    font-weight: 600;

    line-height: 1.12;

    letter-spacing: -0.035em;
  }

  .results-list {
    border-top: 1px solid var(--line-strong);
  }

  .results-list article {
    min-height: 82px;

    padding: 20px 0;

    border-bottom: 1px solid var(--line-strong);

    display: grid;

    grid-template-columns:
      26px
      minmax(0, 1fr);

    align-items: center;

    gap: 16px;
  }

  .result-line {
    width: 8px;
    height: 8px;

    display: block;

    border-radius: 50%;

    background: #0043ff;
  }

  /* =========================================================
     CTA
  ========================================================= */

  .project-cta {
    border-top: 1px solid var(--line);
  }

  .cta-layout {
    width: 100%;

    display: grid;

    grid-template-columns:
      minmax(0, 1.15fr)
      minmax(300px, 0.85fr);

    gap: clamp(65px, 8vw, 120px);

    align-items: center;
  }

  .cta-kicker {
    width: fit-content;

    padding-bottom: 7px;

    border-bottom: 1px solid #0043ff;

    color: var(--muted);

    font-size: 9px;

    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.1em;

    text-transform: uppercase;
  }

  .cta-layout h2 {
    max-width: 760px;

    margin: 25px 0 0;

    color: var(--text);

    font-size: clamp(29px, 3.2vw, 48px);

    font-weight: 600;

    line-height: 1.08;

    letter-spacing: -0.04em;
  }

  .cta-right {
    max-width: 520px;
  }

  .cta-actions {
    margin-top: 26px;

    display: flex;

    flex-wrap: wrap;

    gap: 11px;
  }

  .cta-primary,
  .cta-secondary {
    min-height: 43px;

    padding: 0 18px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    gap: 10px;

    border: 1px solid #ffffff;

    font-size: 10px;

    font-weight: 700;

    letter-spacing: 0.07em;

    text-decoration: none;

    text-transform: uppercase;
  }

  .cta-primary {
    background: #ffffff;

    color: #000000;
  }

  .cta-secondary {
    border-color: rgba(255, 255, 255, 0.35);

    background: transparent;

    color: #ffffff;
  }

  :global(body.light) .cta-primary {
    border-color: #111111;

    background: #111111;

    color: #ffffff;
  }

  :global(body.light) .cta-secondary {
    border-color: rgba(0, 0, 0, 0.3);

    background: #ffffff;

    color: #111111;
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

    font-size: 1.4rem;

    cursor: pointer;
  }

  /* =========================================================
     FOOTER
  ========================================================= */

  .project-footer {
    width: 100%;
  }

  :global(.project-footer .site-footer) {
    width: 100%;

    margin-top: 0 !important;

    font-family: "Space Grotesk", Arial, Helvetica, sans-serif !important;
  }

  :global(.project-footer .site-footer .footer-row) {
    margin-left: auto !important;

    margin-right: auto !important;
  }

  :global(body.light .project-footer .site-footer) {
    background: #ffffff !important;

    color: #111111 !important;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (min-width: 768px) and (max-width: 1100px) {
    .project-page {
      --section-space: 88px;
    }

    .hero-shell {
      width: min(calc(100% - 32px), 1100px);

      min-height: 500px;

      grid-template-columns:
        minmax(320px, 0.9fr)
        minmax(0, 1.1fr);
    }

    .hero-content {
      padding: 44px 34px;
    }

    .hero-media {
      min-height: 500px;
    }

    .hero-media img {
      object-fit: contain;

      object-position: center center;
    }

    .section-header {
      grid-template-columns:
        minmax(0, 1fr)
        minmax(240px, 330px);

      gap: 40px;
    }

    .overview-grid,
    .performance-layout,
    .results-layout,
    .cta-layout {
      gap: 52px;
    }

    .technology-grid {
      gap: 20px;
    }

    .technology-image {
      height: clamp(160px, 18vw, 220px);
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .project-page {
      --copy-size: 14px;

      --copy-line: 1.65;

      --section-space: 72px;
    }

    /* HERO */

    .project-hero {
      padding-top: 0;
    }

    .hero-shell {
      width: 100%;

      min-height: 600px;

      margin: 0;

      display: grid;

      grid-template-columns:
        minmax(0, 56%)
        minmax(0, 44%);

      align-items: stretch;
    }

    .hero-content {
      min-width: 0;

      padding: 52px 16px 48px 22px;

      justify-content: center;
    }

    .hero-media {
      min-width: 0;

      min-height: 600px;

      height: auto;

      display: flex;

      align-items: center;

      justify-content: center;
    }

    .hero-media img {
      width: 100%;

      height: 100%;

      object-fit: contain;

      object-position: center center;
    }

    .project-kicker {
      margin-bottom: 18px;

      font-size: 9px;
    }

    .hero-title {
      font-size: clamp(1.1rem, 5vw, 1.55rem);

      font-weight: 500;

      line-height: 1;

      text-transform: none;
    }

    .hero-subtitle {
      margin-top: 18px;

      font-size: 14px;

      line-height: 1.5;
    }

    .hero-description {
      margin-top: 10px;

      font-size: 12px;

      line-height: 1.55;
    }

    .hero-actions {
      margin-top: 20px;

      gap: 8px;
    }

    .hero-button {
      min-height: 36px;

      padding: 0 10px;

      font-size: 8px;
    }

    /* SECTIONS */

    .section-shell {
      width: calc(100% - 20px);

      padding: var(--section-space) 18px;
    }

    /* HEADERS */

    .section-header {
      grid-template-columns: 1fr;

      gap: 20px;

      margin-bottom: 42px;

      padding-bottom: 25px;
    }

    /*
     * Overview still has no blue line,
     * including mobile.
     */

    .overview-section-header {
      padding-bottom: 0;

      border-bottom: 0;
    }

    .section-heading h2,
    .results-heading h2 {
      font-size: clamp(21px, 6vw, 27px);
    }

    /* OVERVIEW */

    .overview-grid {
      grid-template-columns: 1fr;

      gap: 42px;

      align-items: start;
    }

    .overview-meta {
      width: 100%;

      max-width: 440px;
    }

    /* COMPARISON */

    .comparison-inside-label {
      top: 9px;

      min-width: 82px;

      padding: 6px 7px;
    }

    .comparison-before-label {
      left: 9px;
    }

    .comparison-after-label {
      right: 9px;
    }

    .comparison-inside-label span {
      font-size: 7px;
    }

    .comparison-inside-label strong {
      font-size: 9px;
    }

    .comparison-line span {
      width: 34px;

      height: 34px;
    }

    /* TECHNOLOGY */

    .technology-grid {
      grid-template-columns: 1fr;

      gap: 48px;
    }

    .technology-card {
      width: 100%;

      max-width: 520px;
    }

    .technology-image {
      height: auto;
    }

    .technology-image img {
      height: auto;

      max-height: 320px;
    }

    /* PERFORMANCE */

    .performance-layout {
      grid-template-columns: 1fr;

      gap: 44px;

      align-items: start;
    }

    .performance-proof {
      width: 100%;
    }

    /* RESULTS */

    .results-layout {
      grid-template-columns: 1fr;

      gap: 38px;

      align-items: start;
    }

    /* CTA */

    .cta-layout {
      grid-template-columns: 1fr;

      gap: 30px;

      align-items: start;
    }

    .cta-layout h2 {
      font-size: clamp(27px, 8vw, 38px);
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 480px) {
    .hero-shell {
      grid-template-columns:
        minmax(0, 59%)
        minmax(0, 41%);
    }

    .hero-content {
      padding-left: 18px;

      padding-right: 12px;
    }

    .hero-title {
      font-size: clamp(1rem, 5vw, 1.35rem);
    }

    .hero-subtitle {
      font-size: 13px;
    }

    .hero-description {
      font-size: 11px;

      line-height: 1.5;
    }

    .hero-actions {
      flex-direction: column;

      align-items: flex-start;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
  }
</style>
