<!-- PREMIUM FIXED VERSION — JULY 2026 -->
<script>
  import { onMount } from "svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import ThemeToggle from "$lib/components/ThemeToggle.svelte";

  let { content, media, websiteUrl = "https://evaeichinger.com" } = $props();

  let activeSection = $state("overview");
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
      ? { location: "WIEN / ÖSTERREICH", imprintText: "IMPRESSUM" }
      : { location: "VIENNA / AUSTRIA", imprintText: "IMPRINT" },
  );

  const desktopScores = [
    ["98", "Performance"],
    ["95", "Accessibility"],
    ["96", "Best Practices"],
    ["100", "SEO"],
    ["2/2", "Agentic browsing"],
    ["98", "FCP"],
    ["+10", "LCP"],
  ];

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
    if (event.key === "Escape" && lightboxImage) closeLightbox();
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

    history.pushState(null, "", `#${id}`);
  }

  onMount(() => {
    document.documentElement.lang = content.language;

    const sections = content.sections
      .map(([id]) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) activeSection = visible[0].target.id;
      },
      { rootMargin: "-25% 0px -60% 0px", threshold: [0.15, 0.35] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
  <meta
    property="og:image"
    content="https://zorawebdesign.com/images/new_website_design_result.webp"
  />
</svelte:head>

<Header nav={content.nav} />
<ThemeToggle />

<main class="project-page" data-version="premium-fixed-july-2026">
  <section class="project-hero">
    <div class="hero-image-grid" aria-hidden="true">
      <figure>
        <img src={media.oldWebsiteImage} alt="" fetchpriority="high" />
        <span>{content.comparison.before.label}</span>
      </figure>

      <figure>
        <img src={media.newWebsiteImage} alt="" fetchpriority="high" />
        <span>{content.comparison.after.label}</span>
      </figure>
    </div>

    <div class="hero-overlay"></div>

    <div class="page-shell hero-shell">
      <div class="hero-content">
        <p class="eyebrow">{content.hero.eyebrow}</p>

        <h1>
          <span>{content.hero.title}</span>
          <span class="outlined">{content.hero.outlinedTitle}</span>
        </h1>

        <p class="hero-subtitle">{content.hero.subtitle}</p>
        <p class="hero-description">{content.hero.description}</p>

        <div class="hero-actions">
          <a
            href="#overview"
            onclick={(event) => scrollToSection(event, "overview")}
          >
            {content.hero.primaryButton}
          </a>

          <a
            class="secondary"
            href={websiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            {content.hero.websiteButton}
          </a>
        </div>
      </div>

      <div class="hero-meta">
        {#each content.meta as item}
          <div>
            <span>{item[0]}</span>
            <strong>{item[1]}</strong>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <div class="page-shell project-layout">
    <aside class="project-navigation" aria-label="Project sections">
      <span class="navigation-title">
        {content.language === "de" ? "PROJEKTINHALTE" : "PROJECT CONTENTS"}
      </span>

      <nav>
        {#each content.sections as section}
          <a
            href={`#${section[0]}`}
            class:active={activeSection === section[0]}
            onclick={(event) => scrollToSection(event, section[0])}
          >
            <span>{section[1]}</span>
            <strong>{section[2]}</strong>
          </a>
        {/each}
      </nav>

      <a class="live-link" href={websiteUrl} target="_blank" rel="noreferrer">
        {content.language === "de" ? "LIVE-WEBSITE ↗" : "LIVE WEBSITE ↗"}
      </a>
    </aside>

    <div class="project-content">
      <section id="overview" class="content-section overview-section">
        <div class="section-heading">
          <p class="eyebrow">{content.overview.eyebrow}</p>
          <h2>{content.overview.title}</h2>
        </div>

        <div class="two-column-copy">
          <p class="lead">{content.overview.introduction}</p>
          <p>{content.overview.description}</p>
        </div>

        <div class="stats-grid">
          {#each content.overview.stats as stat}
            <article>
              <strong>{stat[0]}</strong>
              <span>{stat[1]}</span>
            </article>
          {/each}
        </div>
      </section>

      <section id="comparison" class="content-section comparison-section">
        <div class="section-heading compact-heading">
          <p class="eyebrow">{content.comparison.eyebrow}</p>
          <h2>{content.comparison.title}</h2>
          <p class="section-intro">
            {content.language === "de"
              ? "Ziehe den Regler, um die vollständigen Website-Ansichten zu vergleichen. Keine der beiden Ansichten wird zugeschnitten."
              : "Drag the control to compare the complete website views. Neither screenshot is cropped."}
          </p>
        </div>

        <div class="comparison-heading-row" aria-hidden="true">
          <div>
            <span>{content.comparison.before.label}</span>
            <strong>{content.comparison.before.title}</strong>
          </div>

          <div>
            <span>{content.comparison.after.label}</span>
            <strong>{content.comparison.after.title}</strong>
          </div>
        </div>

        <div class="before-after-stage">
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
            <span aria-hidden="true">↔</span>
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

        <div class="comparison-points">
          <article>
            {#each content.comparison.before.points as point}
              <p><span>—</span>{point}</p>
            {/each}
          </article>

          <article>
            {#each content.comparison.after.points as point}
              <p><span>—</span>{point}</p>
            {/each}
          </article>
        </div>
      </section>

      <section id="challenge" class="content-section dark-section">
        <div class="section-heading">
          <p class="eyebrow">{content.challenge.eyebrow}</p>
          <h2>{content.challenge.title}</h2>
        </div>

        <div class="challenge-grid">
          <p>{content.challenge.text}</p>

          <ul class="numbered-list">
            {#each content.challenge.points as point, index}
              <li>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{point}</strong>
              </li>
            {/each}
          </ul>
        </div>
      </section>

      <section id="approach" class="content-section raised-section">
        <div class="section-heading compact-heading">
          <p class="eyebrow">{content.approach.eyebrow}</p>
          <h2>{content.approach.title}</h2>
        </div>

        <div class="approach-grid">
          {#each content.approach.cards as card}
            <article>
              <span>{card.number}</span>
              <h3>{card.title}</h3>
              <p>{card.text}</p>
            </article>
          {/each}
        </div>
      </section>

      <section id="technology" class="content-section technology-section">
        <div class="section-heading compact-heading">
          <p class="eyebrow">{content.technology.eyebrow}</p>
          <h2>{content.technology.title}</h2>
        </div>

        <div class="technology-list">
          {#each content.technology.items as item}
            <article class="technology-card">
              <div class="technology-media-frame">
                {#if item.image}
                  <img
                    src={item.image}
                    alt={`${item.name} project screenshot`}
                    loading="lazy"
                  />
                {:else}
                  <div
                    class="code-window"
                    aria-label="SvelteKit code illustration"
                  >
                    <div class="code-window-bar">
                      <span></span><span></span><span></span>
                      <strong>FeaturedProjectPage.svelte</strong>
                    </div>

                    <pre><code
                        >&lt;script&gt;
  import {`{ onMount }`} from "svelte";
  let works = $state([]);
&lt;/script&gt;

&lt;section class="selected-work"&gt;
  {`{#each works as work}`}
    &lt;article&gt;...&lt;/article&gt;
  {`{/each}`}
&lt;/section&gt;</code
                      ></pre>
                  </div>
                {/if}
              </div>

              <div class="technology-copy">
                <div class="technology-topline">
                  <span>{item.number}</span>
                  <p>{item.role}</p>
                </div>

                <h3>{item.name}</h3>
                <p class="technology-description">{item.description}</p>

                <ul>
                  {#each item.points as point}
                    <li>{point}</li>
                  {/each}
                </ul>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <section
        id="performance"
        class="content-section raised-section performance-section"
      >
        <div class="section-heading compact-heading">
          <p class="eyebrow">{content.performance.eyebrow}</p>
          <h2>{content.performance.title}</h2>
          <p class="section-intro">{content.performance.description}</p>
        </div>

        <div class="score-summary">
          <div class="score-title">
            <span>{content.language === "de" ? "DESKTOP" : "DESKTOP"}</span>
            <strong>
              {content.language === "de"
                ? "Performance-Probleme diagnostizieren"
                : "Diagnose performance issues"}
            </strong>
          </div>

          <div class="score-grid">
            {#each desktopScores as score}
              <article>
                <strong>{score[0]}</strong>
                <span>{score[1]}</span>
              </article>
            {/each}
          </div>
        </div>

        <div class="performance-stack">
          <article class="performance-card">
            <header>
              <span>{content.performance.beforeLabel}</span>
              <h3>{content.performance.beforeTitle}</h3>
              <button
                type="button"
                onclick={() =>
                  openLightbox(
                    media.speedTestOld,
                    content.performance.beforeTitle,
                  )}
              >
                {content.language === "de" ? "VOLLBILD" : "FULL IMAGE"}
              </button>
            </header>

            <button
              class="performance-image"
              type="button"
              onclick={() =>
                openLightbox(
                  media.speedTestOld,
                  content.performance.beforeTitle,
                )}
              aria-label={`${content.performance.beforeTitle} full image`}
            >
              <img
                src={media.speedTestOld}
                alt={content.performance.beforeTitle}
                loading="lazy"
              />
            </button>
          </article>

          <article class="performance-card featured">
            <header>
              <span>{content.performance.afterLabel}</span>
              <h3>{content.performance.afterTitle}</h3>
              <button
                type="button"
                onclick={() =>
                  openLightbox(
                    media.speedTestNew,
                    content.performance.afterTitle,
                  )}
              >
                {content.language === "de" ? "VOLLBILD" : "FULL IMAGE"}
              </button>
            </header>

            <button
              class="performance-image"
              type="button"
              onclick={() =>
                openLightbox(
                  media.speedTestNew,
                  content.performance.afterTitle,
                )}
              aria-label={`${content.performance.afterTitle} full image`}
            >
              <img
                src={media.speedTestNew}
                alt={content.performance.afterTitle}
                loading="lazy"
              />
            </button>
          </article>
        </div>
      </section>

      <section id="results" class="content-section results-section">
        <div class="section-heading compact-heading">
          <p class="eyebrow">{content.results.eyebrow}</p>
          <h2>{content.results.title}</h2>
        </div>

        <div class="results-grid">
          {#each content.results.items as item, index}
            <article>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{item}</p>
            </article>
          {/each}
        </div>
      </section>

      <section id="summary" class="content-section summary-section">
        <p class="eyebrow">{content.summary.eyebrow}</p>
        <div class="summary-grid">
          <h2>{content.summary.title}</h2>
          <p>{content.summary.text}</p>
        </div>
      </section>
    </div>
  </div>

  <section class="project-cta">
    <div class="page-shell cta-grid">
      <div>
        <p class="eyebrow">{content.cta.eyebrow}</p>
        <h2>{content.cta.title}</h2>
      </div>

      <div>
        <p>{content.cta.description}</p>
        <a href={configuratorUrl}>{content.cta.button}</a>
      </div>
    </div>
  </section>
</main>

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
        type="button"
        class="lightbox-close"
        onclick={closeLightbox}
        aria-label="Close"
      >
        ×
      </button>
      <img src={lightboxImage} alt={lightboxAlt} />
    </div>
  </div>
{/if}

<Footer
  location={footerContent.location}
  imprintText={footerContent.imprintText}
/>

<style>
  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    background: #050505;
    color: #f4f4f4;
    font-family: "DM Sans", Arial, sans-serif;
  }

  :global(body.light) {
    background: #f3f3f0;
    color: #101010;
  }

  .project-page {
    --blue: #0043ff;
    --bg: #050505;
    --bg-soft: #0a0a0c;
    --surface: #111114;
    --surface-raised: #17171b;
    --text: #f4f4f4;
    --muted: rgba(255, 255, 255, 0.62);
    --line: rgba(255, 255, 255, 0.12);
    overflow: clip;
    background: var(--bg);
    color: var(--text);
    font-family: "DM Sans", Arial, sans-serif;
  }

  :global(body.light) .project-page {
    --bg: #f3f3f0;
    --bg-soft: #e8e8e4;
    --surface: #ffffff;
    --surface-raised: #f8f8f6;
    --text: #101010;
    --muted: rgba(0, 0, 0, 0.6);
    --line: rgba(0, 0, 0, 0.12);
  }

  .page-shell {
    width: min(1540px, calc(100% - 48px));
    margin: 0 auto;
  }

  .eyebrow {
    margin: 0 0 14px;
    color: var(--blue);
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
  }

  .project-hero {
    position: relative;
    min-height: calc(100vh - 78px);
    display: flex;
    align-items: flex-end;
    overflow: hidden;
    background: #050505;
    color: #fff;
    isolation: isolate;
  }

  .hero-image-grid,
  .hero-overlay {
    position: absolute;
    inset: 0;
  }

  .hero-image-grid {
    z-index: -3;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .hero-image-grid figure {
    position: relative;
    margin: 0;
    overflow: hidden;
  }

  .hero-image-grid figure + figure {
    border-left: 1px solid rgba(255, 255, 255, 0.18);
  }

  .hero-image-grid img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    object-position: top center;
    filter: grayscale(1);
    opacity: 0.52;
  }

  .hero-image-grid figure > span {
    position: absolute;
    top: 22px;
    left: 22px;
    color: rgba(255, 255, 255, 0.66);
    font-size: 0.66rem;
    letter-spacing: 0.14em;
  }

  .hero-overlay {
    z-index: -2;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.24)),
      linear-gradient(0deg, rgba(0, 0, 0, 0.96), transparent 65%);
  }

  .hero-shell {
    padding: clamp(90px, 11vw, 145px) 0 42px;
  }

  .hero-content {
    width: min(690px, 100%);
  }

  .project-hero h1 {
    margin: 0;
    display: flex;
    flex-direction: column;
    font-size: clamp(1.7rem, 3.7vw, 3.65rem);
    font-weight: 430;
    line-height: 0.94;
    letter-spacing: -0.045em;
  }

  .project-hero h1 .outlined {
    color: transparent;
    -webkit-text-stroke: 1px rgba(255, 255, 255, 0.78);
  }

  .hero-subtitle {
    max-width: 560px;
    margin: 24px 0 0;
    font-size: clamp(0.98rem, 1.3vw, 1.24rem);
    line-height: 1.45;
  }

  .hero-description {
    max-width: 560px;
    margin: 14px 0 0;
    color: rgba(255, 255, 255, 0.62);
    font-size: 0.88rem;
    line-height: 1.65;
  }

  .hero-actions {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .hero-actions a,
  .project-cta a {
    min-height: 46px;
    padding: 0 18px;
    border: 1px solid var(--blue);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: var(--blue);
    color: #fff;
    font-size: 0.73rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-decoration: none;
  }

  .hero-actions a.secondary {
    background: rgba(0, 0, 0, 0.3);
    border-color: rgba(255, 255, 255, 0.4);
  }

  .hero-meta {
    margin-top: 42px;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }

  .hero-meta div {
    padding: 18px 16px 0 0;
  }

  .hero-meta span,
  .hero-meta strong {
    display: block;
  }

  .hero-meta span {
    color: rgba(255, 255, 255, 0.42);
    font-size: 0.61rem;
    letter-spacing: 0.1em;
  }

  .hero-meta strong {
    margin-top: 6px;
    font-size: 0.84rem;
    font-weight: 450;
  }

  .project-layout {
    display: grid;
    grid-template-columns: 225px minmax(0, 1fr);
  }

  .project-navigation {
    position: sticky;
    top: 78px;
    height: calc(100vh - 78px);
    padding: 42px 24px;
    border-right: 1px solid var(--line);
    display: flex;
    flex-direction: column;
    background: var(--bg-soft);
  }

  .navigation-title {
    color: var(--muted);
    font-size: 0.61rem;
    letter-spacing: 0.13em;
  }

  .project-navigation nav {
    margin-top: 26px;
    display: grid;
  }

  .project-navigation nav a {
    padding: 10px 0;
    border-bottom: 1px solid var(--line);
    display: grid;
    grid-template-columns: 30px 1fr;
    color: var(--muted);
    font-size: 0.72rem;
    text-decoration: none;
  }

  .project-navigation nav a span {
    color: var(--blue);
  }

  .project-navigation nav a strong {
    font-weight: 450;
  }

  .project-navigation nav a.active {
    color: var(--text);
  }

  .live-link {
    margin-top: auto;
    color: var(--text);
    font-size: 0.69rem;
    font-weight: 600;
    text-decoration: none;
  }

  .project-content {
    min-width: 0;
  }

  .content-section {
    padding: clamp(62px, 7vw, 92px) clamp(22px, 4.4vw, 64px);
    border-bottom: 1px solid var(--line);
    background: var(--bg);
  }

  .raised-section {
    background: var(--surface);
  }

  .dark-section {
    background: #08080a;
    color: #fff;
  }

  :global(body.light) .dark-section {
    background: #17171a;
  }

  .section-heading {
    max-width: 760px;
  }

  .compact-heading {
    max-width: 680px;
  }

  .section-heading h2,
  .summary-section h2,
  .project-cta h2 {
    margin: 0;
    font-size: clamp(1.15rem, 1.55vw, 1.68rem);
    font-weight: 420;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .section-intro {
    max-width: 590px;
    margin: 17px 0 0;
    color: var(--muted);
    font-size: 0.86rem;
    line-height: 1.62;
  }

  .two-column-copy {
    margin-top: 38px;
    display: grid;
    grid-template-columns: 1.05fr 0.95fr;
    gap: clamp(30px, 5vw, 65px);
  }

  .two-column-copy p,
  .challenge-grid > p,
  .summary-grid > p,
  .project-cta p {
    margin: 0;
    color: var(--muted);
    font-size: 0.88rem;
    line-height: 1.68;
  }

  .two-column-copy .lead {
    color: var(--text);
    font-size: clamp(1rem, 1.3vw, 1.22rem);
    line-height: 1.48;
  }

  .stats-grid {
    margin-top: 42px;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    border-top: 1px solid var(--line);
  }

  .stats-grid article {
    padding: 22px 16px 0 0;
  }

  .stats-grid strong,
  .stats-grid span {
    display: block;
  }

  .stats-grid strong {
    color: var(--blue);
    font-size: clamp(1.6rem, 2.4vw, 2.6rem);
    font-weight: 450;
  }

  .stats-grid span {
    margin-top: 5px;
    color: var(--muted);
    font-size: 0.66rem;
    text-transform: uppercase;
  }

  .comparison-heading-row {
    margin-top: 38px;
    margin-bottom: 14px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .comparison-heading-row > div:last-child {
    text-align: right;
  }

  .comparison-heading-row span,
  .comparison-heading-row strong {
    display: block;
  }

  .comparison-heading-row span {
    color: var(--blue);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
  }

  .comparison-heading-row strong {
    margin-top: 5px;
    font-size: 0.95rem;
    font-weight: 450;
  }

  .before-after-stage {
    position: relative;
    width: 100%;
    overflow: hidden;
    border: 1px solid var(--line);
    background: var(--bg-soft);
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
    background: var(--bg-soft);
  }

  .after-mask {
    overflow: hidden;
  }

  .comparison-line {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: #fff;
    transform: translateX(-50%);
    pointer-events: none;
  }

  .comparison-line span {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 42px;
    height: 42px;
    border: 1px solid rgba(255, 255, 255, 0.55);
    display: grid;
    place-items: center;
    background: #050505;
    color: #fff;
    transform: translate(-50%, -50%);
  }

  .comparison-range {
    position: absolute;
    inset: 0;
    z-index: 4;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: ew-resize;
  }

  .comparison-points {
    display: grid;
    grid-template-columns: 1fr 1fr;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    border-left: 1px solid var(--line);
  }

  .comparison-points article {
    padding: 16px 20px;
  }

  .comparison-points article + article {
    border-left: 1px solid var(--line);
  }

  .comparison-points p {
    margin: 0;
    padding: 7px 0;
    color: var(--muted);
    font-size: 0.78rem;
  }

  .comparison-points p span {
    margin-right: 8px;
    color: var(--blue);
  }

  .challenge-grid {
    margin-top: 38px;
    display: grid;
    grid-template-columns: 0.8fr 1.2fr;
    gap: clamp(30px, 5vw, 68px);
  }

  .numbered-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .numbered-list li {
    padding: 13px 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    display: grid;
    grid-template-columns: 42px 1fr;
  }

  .numbered-list span {
    color: var(--blue);
    font-size: 0.72rem;
  }

  .numbered-list strong {
    font-size: 0.86rem;
    font-weight: 450;
  }

  .approach-grid {
    margin-top: 38px;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    border-top: 1px solid var(--line);
    border-left: 1px solid var(--line);
  }

  .approach-grid article {
    min-height: 210px;
    padding: 24px;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .approach-grid article > span {
    color: var(--blue);
    font-size: 0.68rem;
  }

  .approach-grid h3 {
    margin: 32px 0 10px;
    font-size: 1.02rem;
    font-weight: 450;
  }

  .approach-grid p {
    margin: 0;
    color: var(--muted);
    font-size: 0.79rem;
    line-height: 1.58;
  }

  .technology-list {
    margin-top: 40px;
    display: grid;
    gap: 18px;
  }

  .technology-card {
    display: grid;
    grid-template-columns: minmax(0, 1.08fr) minmax(290px, 0.92fr);
    border: 1px solid var(--line);
    background: var(--surface-raised);
  }

  .technology-media-frame {
    min-width: 0;
    margin: 4px;
    overflow: hidden;
    border: 1px solid var(--line);
    background: #0c0c0f;
  }

  .technology-media-frame > img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    display: block;
    object-fit: contain;
    object-position: top left;
    background: #0c0c0f;
  }

  .technology-copy {
    padding: clamp(24px, 3.4vw, 42px);
  }

  .technology-topline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .technology-topline span {
    color: var(--blue);
    font-size: 0.68rem;
  }

  .technology-topline p {
    margin: 0;
    color: var(--muted);
    font-size: 0.63rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .technology-copy h3 {
    margin: 26px 0 14px;
    font-size: clamp(1.45rem, 2.1vw, 2.35rem);
    font-weight: 430;
    letter-spacing: -0.035em;
  }

  .technology-description {
    margin: 0;
    color: var(--muted);
    font-size: 0.82rem;
    line-height: 1.62;
  }

  .technology-copy ul {
    margin: 18px 0 0;
    padding: 0;
    list-style: none;
  }

  .technology-copy li {
    padding: 7px 0;
    border-bottom: 1px solid var(--line);
    color: var(--muted);
    font-size: 0.76rem;
  }

  .technology-copy li::before {
    content: "—";
    margin-right: 8px;
    color: var(--blue);
  }

  .code-window {
    height: 100%;
    min-height: 320px;
    padding: 18px;
    background: #0b0c10;
    color: #d7d9e1;
  }

  .code-window-bar {
    display: flex;
    align-items: center;
    gap: 7px;
    padding-bottom: 14px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .code-window-bar span {
    width: 8px;
    height: 8px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    border-radius: 50%;
  }

  .code-window-bar strong {
    margin-left: auto;
    color: rgba(255, 255, 255, 0.4);
    font-size: 0.62rem;
    font-weight: 400;
  }

  .code-window pre {
    margin: 30px 0 0;
    white-space: pre-wrap;
    font-family: Consolas, monospace;
    font-size: clamp(0.65rem, 0.85vw, 0.78rem);
    line-height: 1.7;
  }

  .score-summary {
    margin-top: 38px;
    padding: 24px;
    border: 1px solid var(--line);
    background: var(--surface-raised);
  }

  .score-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .score-title span {
    color: var(--blue);
    font-size: 0.65rem;
    letter-spacing: 0.12em;
  }

  .score-title strong {
    font-size: 0.95rem;
    font-weight: 450;
  }

  .score-grid {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    border-top: 1px solid var(--line);
  }

  .score-grid article {
    padding: 18px 12px 0 0;
  }

  .score-grid strong,
  .score-grid span {
    display: block;
  }

  .score-grid strong {
    color: var(--blue);
    font-size: clamp(1.25rem, 1.9vw, 1.9rem);
    font-weight: 450;
  }

  .score-grid span {
    margin-top: 4px;
    color: var(--muted);
    font-size: 0.61rem;
  }

  .performance-stack {
    margin-top: 22px;
    display: grid;
    gap: 26px;
  }

  .performance-card {
    padding: 4px;
    border: 1px solid var(--line);
    background: var(--surface-raised);
  }

  .performance-card.featured {
    border-color: var(--blue);
  }

  .performance-card header {
    padding: 16px 18px;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 16px;
  }

  .performance-card header > span {
    color: var(--blue);
    font-size: 0.64rem;
    letter-spacing: 0.12em;
  }

  .performance-card h3 {
    margin: 0;
    font-size: 0.96rem;
    font-weight: 450;
  }

  .performance-card header button {
    border: 0;
    border-bottom: 1px solid var(--blue);
    padding: 0 0 3px;
    background: transparent;
    color: var(--text);
    font: inherit;
    font-size: 0.63rem;
    letter-spacing: 0.1em;
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

  .results-grid {
    margin-top: 38px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border-top: 1px solid var(--line);
    border-left: 1px solid var(--line);
  }

  .results-grid article {
    min-height: 125px;
    padding: 22px;
    border-right: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
  }

  .results-grid span {
    color: var(--blue);
    font-size: 0.68rem;
  }

  .results-grid p {
    margin: 24px 0 0;
    font-size: 0.88rem;
    line-height: 1.48;
  }

  .summary-section {
    background: var(--blue);
    color: #fff;
  }

  .summary-section .eyebrow {
    color: rgba(255, 255, 255, 0.7);
  }

  .summary-grid {
    display: grid;
    grid-template-columns: 1fr 0.8fr;
    gap: 55px;
    align-items: start;
  }

  .summary-grid > p {
    color: rgba(255, 255, 255, 0.75);
  }

  .project-cta {
    padding: clamp(70px, 8vw, 110px) 0;
    background: #09090b;
    color: #fff;
  }

  .cta-grid {
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    gap: 65px;
    align-items: end;
  }

  .project-cta p {
    color: rgba(255, 255, 255, 0.62);
  }

  .project-cta a {
    margin-top: 24px;
  }

  .lightbox {
    position: fixed;
    inset: 0;
    z-index: 9999;
    padding: 20px;
    display: grid;
    place-items: center;
    background: rgba(0, 0, 0, 0.94);
  }

  .lightbox-dialog {
    position: relative;
    width: min(1600px, 100%);
    max-height: calc(100vh - 40px);
    overflow: auto;
    background: #08080a;
  }

  .lightbox-dialog img {
    width: 100%;
    height: auto;
    display: block;
  }

  .lightbox-close {
    position: sticky;
    top: 12px;
    z-index: 2;
    width: 42px;
    height: 42px;
    margin: 12px 12px -54px auto;
    border: 1px solid rgba(255, 255, 255, 0.35);
    display: grid;
    place-items: center;
    background: #050505;
    color: #fff;
    font-size: 1.45rem;
    cursor: pointer;
  }

  :global(.site-footer) {
    margin-top: 0 !important;
  }

  @media (max-width: 1180px) {
    .approach-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .score-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: 14px 0;
    }

    .results-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 1040px) {
    .project-layout {
      width: 100%;
      display: block;
    }

    .project-navigation {
      z-index: 30;
      top: 0;
      width: 100%;
      height: auto;
      padding: 0 18px;
      border-right: 0;
      border-bottom: 1px solid var(--line);
      display: block;
      overflow-x: auto;
      white-space: nowrap;
    }

    .navigation-title,
    .live-link {
      display: none;
    }

    .project-navigation nav {
      margin: 0;
      display: flex;
    }

    .project-navigation nav a {
      min-width: max-content;
      padding: 14px 17px 13px 0;
      border: 0;
      display: inline-flex;
      gap: 6px;
    }

    .technology-card {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 720px) {
    .page-shell {
      width: calc(100% - 28px);
    }

    .project-hero {
      min-height: 700px;
    }

    .hero-image-grid {
      grid-template-columns: 1fr;
    }

    .hero-image-grid figure:first-child {
      display: none;
    }

    .hero-shell {
      padding-top: 82px;
      padding-bottom: 26px;
    }

    .project-hero h1 {
      font-size: clamp(1.65rem, 9vw, 3rem);
    }

    .hero-meta,
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .content-section {
      padding: 58px 18px;
    }

    .two-column-copy,
    .challenge-grid,
    .summary-grid,
    .cta-grid,
    .comparison-points,
    .comparison-heading-row,
    .approach-grid,
    .results-grid {
      grid-template-columns: 1fr;
    }

    .comparison-heading-row > div:last-child {
      text-align: left;
    }

    .comparison-points article + article {
      border-top: 1px solid var(--line);
      border-left: 0;
    }

    .technology-media-frame > img,
    .code-window {
      min-height: 250px;
    }

    .score-title,
    .performance-card header {
      align-items: start;
    }

    .score-title {
      flex-direction: column;
    }

    .score-grid {
      grid-template-columns: repeat(2, 1fr);
    }

    .performance-card header {
      grid-template-columns: 1fr;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }
  }
</style>
