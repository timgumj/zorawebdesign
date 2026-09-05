<script>
  import { onMount } from "svelte";
  let { hero, projects = [] } = $props();
  let isDesktop = $state(false);
  let isTablet = $state(false);
  let isMobile = $state(false);
  let showSingleMarquee = $state(false);
  let showMarquee = $state(false);
  let greetingText = $state("");
  let greetingIcon = $state("");
  let greetingAlt = $state("Greeting Icon");
  let activePopover = $state(null);
  const heroColumnOne = $derived(projects.slice(0, 5));
  const heroColumnTwo = $derived(projects.slice(5, 10));
  const heroSingleColumn = $derived(projects.slice(0, 6));
  const heroColumnOneRender = $derived(
    isDesktop ? [...heroColumnOne, ...heroColumnOne] : heroColumnOne,
  );
  const heroColumnTwoRender = $derived(
    isDesktop ? [...heroColumnTwo, ...heroColumnTwo] : heroColumnTwo,
  );
  const heroSingleColumnRender = $derived(
    showSingleMarquee ? [...heroSingleColumn, ...heroSingleColumn] : [],
  );
  const isGerman = $derived(hero.language === "de" || hero.lang === "de");
  const heroSocialLinks = [
    {
      type: "linkedin",
      label: "LinkedIn",
      href: "https://at.linkedin.com/in/juliustimgum",
    },
    {
      type: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/zorawebdesign/",
    },
    {
      type: "whatsapp",
      label: "WhatsApp",
      href: "https://wa.me/4367764859839",
    },
  ];
  function formatHeroTitle(text = "") {
    const locale = isGerman ? "de-DE" : "en-US";
    return text
      .toLocaleLowerCase(locale)
      .replace(
        /(^|[\s\-–—/])(\p{L})/gu,
        (_, separator, letter) =>
          `${separator}${letter.toLocaleUpperCase(locale)}`,
      );
  }
  const formattedHeroTitleLines = $derived(
    hero.titleLines?.filter(Boolean).map((line) => formatHeroTitle(line)) ?? [],
  );
  const visibleHeroTitleLines = $derived(formattedHeroTitleLines);
  const primaryCtaTitle = $derived(
    hero.ctaTitle ??
      (isGerman
        ? "Kostenloses Erstgespräch über Calendly vereinbaren"
        : "Schedule a free introductory meeting on Calendly"),
  );
  const secondaryCtaTitle = $derived(
    hero.secondaryCtaTitle ??
      (isGerman
        ? "Ausgewählte Webdesign-Projekte ansehen"
        : "View selected web design projects"),
  );
  const secondaryCtaText = $derived(
    hero.secondaryCta ??
      hero.projectsCta ??
      (isGerman ? "PROJEKTE" : "PROJECTS"),
  );
  const secondaryCtaLink = $derived(
    hero.secondaryCtaLink ??
      hero.projectsLink ??
      (isGerman ? "#projekte" : "#projects"),
  );
  const defaultGreetingIcons = {
    morning: "/images/croissant.webp",
    day: "/images/italian-coffee-maker.webp",
    evening: "/images/martini-glass-citrus.webp",
  };
  const fallbackGreetings = {
    morning: {
      text: "Good morning!",
      icon: defaultGreetingIcons.morning,
      alt: "Morning",
    },
    day: {
      text: "Good afternoon!",
      icon: defaultGreetingIcons.day,
      alt: "Day",
    },
    evening: {
      text: "Good evening!",
      icon: defaultGreetingIcons.evening,
      alt: "Evening",
    },
  };
  const fallbackConnectionItems = [
    {
      title: "Easy to talk to",
      popup:
        "Clients love feeling relaxed from the first call. A warm and clear process makes it easier to share ideas, ask questions, and build something that truly feels like them.",
    },
    {
      title: "Feels personal",
      popup:
        "People appreciate a designer who listens before designing. When the work reflects their story, values, and style, the final website feels human instead of generic.",
    },
    {
      title: "Built with care",
      popup:
        "It means a lot when details are handled thoughtfully. Fast replies, honest guidance, and careful design choices help clients feel supported and respected throughout the project.",
    },
  ];
  const connectionItems = $derived(
    fallbackConnectionItems.map((item, index) => ({
      title: hero.connectionItems?.[index]?.title ?? item.title,
      popup: hero.connectionItems?.[index]?.popup ?? item.popup,
    })),
  );
  function formatGreeting(text = "") {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
  function getGreetingByTime() {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      return hero.greetings?.morning ?? fallbackGreetings.morning;
    }
    if (hour >= 12 && hour < 18) {
      return hero.greetings?.day ?? fallbackGreetings.day;
    }
    return hero.greetings?.evening ?? fallbackGreetings.evening;
  }
  function updateGreeting() {
    const greeting = getGreetingByTime();
    greetingText = formatGreeting(greeting.text);
    greetingIcon = greeting.icon;
    greetingAlt = greeting.alt;
  }
  function updateViewportState() {
    const width = window.innerWidth;
    isDesktop = width > 1100;
    isTablet = width <= 1100 && width > 767;
    isMobile = width <= 767;
    showSingleMarquee = !isDesktop;
    if (isDesktop) {
      activePopover = null;
    }
  }
  function togglePopover(index) {
    if (isDesktop) return;
    activePopover = activePopover === index ? null : index;
  }

  function trackCenteredThumbnail(node) {
    let activeThumbnail = null;
    let animationFrame = 0;
    let lastMeasurement = 0;

    function updateActiveThumbnail(timestamp) {
      if (timestamp - lastMeasurement >= 60) {
        const thumbnails = Array.from(
          node.querySelectorAll(".hero-project-thumb"),
        );
        const viewportCenter = window.innerHeight / 2;
        let closestThumbnail = null;
        let closestDistance = Infinity;

        for (const thumbnail of thumbnails) {
          const thumbnailRect = thumbnail.getBoundingClientRect();
          const thumbnailCenter = thumbnailRect.top + thumbnailRect.height / 2;
          const distance = Math.abs(thumbnailCenter - viewportCenter);

          if (distance < closestDistance) {
            closestDistance = distance;
            closestThumbnail = thumbnail;
          }
        }

        if (closestThumbnail !== activeThumbnail) {
          activeThumbnail?.classList.remove("is-centered");
          closestThumbnail?.classList.add("is-centered");
          activeThumbnail = closestThumbnail;
        }

        lastMeasurement = timestamp;
      }

      animationFrame = requestAnimationFrame(updateActiveThumbnail);
    }

    animationFrame = requestAnimationFrame(updateActiveThumbnail);

    return {
      destroy() {
        cancelAnimationFrame(animationFrame);
        activeThumbnail?.classList.remove("is-centered");
      },
    };
  }

  onMount(() => {
    updateViewportState();
    updateGreeting();
    showMarquee = true;
    const handleResize = () => updateViewportState();
    const handleDocumentClick = (event) => {
      if (isDesktop) return;
      if (!event.target.closest(".connection-card")) {
        activePopover = null;
      }
    };
    window.addEventListener("resize", handleResize);
    document.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("click", handleDocumentClick);
    };
  });
</script>

<section class="hero">
  <div class="container hero-shell">
    <span class="hero-edge-line" aria-hidden="true"></span>
    <nav
      class="hero-social-rail"
      aria-label={isGerman
        ? "Social Media und Messenger"
        : "Social media and messaging"}
    >
      <span class="hero-social-line hero-social-line-top" aria-hidden="true"
      ></span>
      <div class="hero-social-links">
        {#each heroSocialLinks as social}
          <a
            href={social.href}
            aria-label={social.label}
            title={social.label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {#if social.type === "linkedin"}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M5.2 8.1v10.7M5.2 5.2v.1M9.7 18.8v-6.1c0-2.2 1.3-4 3.7-4s3.4 1.6 3.4 4v6.1M9.7 9v9.8"
                />
              </svg>
            {:else if social.type === "instagram"}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.8"
                  r=".7"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            {:else}
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  d="M20 11.6a8 8 0 0 1-11.8 7l-4.2 1.1 1.1-4A8 8 0 1 1 20 11.6Z"
                />
                <path
                  d="M8.4 7.8c.3-.4.6-.4.9-.1l1.1 1.5c.2.3.1.6-.1.9l-.5.6c.8 1.5 1.9 2.6 3.5 3.4l.6-.7c.2-.3.5-.3.8-.2l1.7.8c.3.2.4.5.3.8-.3 1.2-1.3 1.8-2.5 1.7-3.8-.5-7.1-3.5-7.6-7.1-.1-.6.7-1.6 1.8-1.6Z"
                />
              </svg>
            {/if}
          </a>
        {/each}
      </div>
      <span class="hero-social-line hero-social-line-bottom" aria-hidden="true"
      ></span>
    </nav>
    <div class="hero-bg-stage" aria-hidden="true">
      {#if isDesktop}
        <div
          class="hero-bg-wall hero-bg-wall-desktop"
          class:visible={showMarquee}
        >
          <div class="hero-marquee hero-marquee-up" use:trackCenteredThumbnail>
            <div class="hero-marquee-track">
              {#each heroColumnOneRender as project, index}
                <div class="hero-project-thumb">
                  <img
                    src={project.image}
                    alt={isGerman
                      ? `Webdesign Projekt ${project.title}`
                      : `Web design project ${project.title}`}
                    title={project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={index === 0 ? "high" : "low"}
                    width="470"
                    height="264"
                  />
                </div>
              {/each}
            </div>
          </div>
          <div
            class="hero-marquee hero-marquee-down"
            use:trackCenteredThumbnail
          >
            <div class="hero-marquee-track">
              {#each heroColumnTwoRender as project, index}
                <div class="hero-project-thumb">
                  <img
                    src={project.image}
                    alt={isGerman
                      ? `Webdesign Projekt ${project.title}`
                      : `Web design project ${project.title}`}
                    title={project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={index === 0 ? "high" : "low"}
                    width="470"
                    height="264"
                  />
                </div>
              {/each}
            </div>
          </div>
          <div class="hero-bg-fade"></div>
        </div>
      {/if}
      {#if !isDesktop}
        <div
          class="hero-bg-wall hero-bg-wall-single"
          class:mobile-wall={isMobile}
          class:tablet-wall={isTablet}
          class:visible={showMarquee}
        >
          <div class="hero-marquee hero-marquee-up" use:trackCenteredThumbnail>
            <div class="hero-marquee-track">
              {#each heroSingleColumnRender as project, index}
                <div class="hero-project-thumb">
                  <img
                    src={project.image}
                    alt={isGerman
                      ? `Webdesign Projekt ${project.title}`
                      : `Web design project ${project.title}`}
                    title={project.title}
                    loading={index === 0 ? "eager" : "lazy"}
                    decoding="async"
                    fetchpriority={index === 0 ? "high" : "low"}
                    width="470"
                    height="264"
                  />
                </div>
              {/each}
            </div>
          </div>
          <div class="hero-bg-fade"></div>
        </div>
      {/if}
    </div>
    <div class="hero-content">
      <div class="hero-inner">
        <div class="hero-heading">
          <div class="hero-person">
            {#if hero.avatar}
              <img
                class="hero-avatar"
                src={hero.avatar}
                alt={hero.avatarAlt || "Julius Timgum"}
                width="154"
                height="154"
                fetchpriority="high"
                loading="eager"
                decoding="async"
              />
            {/if}
            {#if greetingIcon}
              <img
                class="hero-meta-icon"
                src={greetingIcon}
                alt={greetingAlt}
                width="20"
                height="20"
                loading="eager"
                decoding="async"
              />
            {/if}
            <span class="hero-person-copy">
              <span class="hero-greeting-text">{greetingText}</span>
              {#if hero.name}
                <span class="hero-name">{hero.name.toUpperCase()}</span>
              {/if}
            </span>
          </div>
          {#if visibleHeroTitleLines.length}
            <h1 class="hero-title">
              <span class="hero-title-visual">
                {#each visibleHeroTitleLines as titleLine, index}
                  <span class="hero-line">
                    <span
                      class="hero-word"
                      class:hero-word-wien={index ===
                        visibleHeroTitleLines.length - 1}
                    >
                      {titleLine}{index < visibleHeroTitleLines.length - 1
                        ? " "
                        : ""}
                    </span>
                  </span>
                {/each}
              </span>
            </h1>
          {/if}
          {#if hero.text}
            <div class="hero-text-accent">
              <p class="hero-text">{hero.text}</p>
            </div>
          {/if}
        </div>
        {#if hero.cta}
          <div class="hero-actions">
            <a
              href={hero.ctaLink ?? "#"}
              title={primaryCtaTitle}
              target={hero.ctaTarget ?? "_blank"}
              rel={hero.ctaRel ?? "noopener noreferrer"}
              class="cta-link"
            >
              {hero.cta}
              <span aria-hidden="true">→</span>
            </a>
            <a
              href={secondaryCtaLink}
              title={secondaryCtaTitle}
              class="cta-link cta-link-secondary"
            >
              {secondaryCtaText}
            </a>
          </div>
        {/if}
        <div
          class="hero-connection-strip"
          role="group"
          aria-label={hero.connectionAriaLabel ?? "What clients appreciate"}
        >
          {#each connectionItems as item, index}
            <div
              class="connection-card connection-card-{index}"
              class:is-open={activePopover === index}
            >
              <button
                class="connection-trigger"
                type="button"
                aria-label={item.title}
                aria-expanded={activePopover === index}
                onclick={(e) => {
                  e.stopPropagation();
                  togglePopover(index);
                }}
              >
                <span class="connection-title">{item.title}</span>
              </button>
              <div class="connection-popover" role="tooltip">
                <p>{item.popup}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  :global(*) {
    box-sizing: border-box;
  }
  :global(html),
  :global(body) {
    overflow-x: clip;
  }
  .hero {
    font-family: "DM Sans", Arial, sans-serif;
    --hero-max-width: 1540px;
    --hero-side-pad: 30px;
    --hero-inner-pad: 0px;
    --hero-block-pad: clamp(18px, 2.8vh, 34px);
    --hero-card-radius: 0;
    --hero-card-min-height: auto;
    --hero-icon-wrap: clamp(26px, 2.2vw, 34px);
    --hero-icon-size: clamp(17px, 1.6vw, 21px);
    /* Slightly smaller than before */
    --hero-title-size: clamp(1.45rem, 2.25vw, 2.55rem);
    --hero-title-leading: 0.98;
    --hero-track-gap: clamp(14px, 1.4vw, 18px);
    --hero-content-width: 700px;
    position: relative;
    width: 100%;
    max-width: 100%;
    height: 92svh;
    min-height: 92svh;
    max-height: 92svh;
    overflow: hidden;
    color: #ffffff;
    border-bottom: 1px solid rgba(255, 255, 255, 0.12);
    background: radial-gradient(
        circle at 90% 80%,
        rgba(255, 255, 255, 0.05),
        transparent 34%
      ),
      #000;
    transition:
      background 0.3s ease,
      color 0.3s ease,
      border-color 0.3s ease;
  }
  :global(body.light) .hero {
    color: #111111;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    background: #ffffff;
  }
  .hero-shell {
    position: relative;
    width: min(var(--hero-max-width), calc(100% - 48px));
    max-width: 100%;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    margin: 0 auto;
    padding-left: var(--hero-side-pad);
    padding-right: var(--hero-side-pad);
    isolation: isolate;
    overflow: visible;
  }
  .hero-edge-line {
    position: absolute;
    z-index: -1;
    top: 0;
    bottom: 0;
    left: 0;
    width: 0.1px;
    background: rgba(255, 255, 255, 0.08);
    pointer-events: none;
    transition: background 0.3s ease;
  }
  :global(body.light) .hero-edge-line {
    background: rgba(0, 0, 0, 0.08);
  }
  .hero-social-rail {
    display: none;
  }
  /* =========================================================
     PROJECT MARQUEE
  ========================================================= */
  .hero-bg-stage {
    position: absolute;
    inset: 0;
    z-index: 1;
    max-width: 100%;
    overflow: hidden;
    pointer-events: none;
  }
  .hero-bg-wall {
    position: absolute;
    top: 0;
    right: clamp(0px, 2vw, 32px);
    height: 100%;
    max-width: 100%;
    overflow: hidden;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.6s ease;
    mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
    -webkit-mask-image: linear-gradient(
      to bottom,
      transparent 0%,
      black 10%,
      black 90%,
      transparent 100%
    );
  }
  .hero-bg-wall.visible {
    opacity: 1;
  }
  .hero-bg-wall.visible .hero-project-thumb img {
    opacity: 0.52;
    filter: grayscale(0.5) brightness(0.72) saturate(0.68);
  }
  :global(body.light) .hero-bg-wall.visible .hero-project-thumb img {
    opacity: 0.55;
    filter: grayscale(0.5) brightness(1) saturate(0.68);
  }
  .hero-bg-wall.visible .hero-project-thumb:global(.is-centered) img {
    opacity: 1;
    filter: grayscale(0) brightness(0.9) saturate(1);
  }
  :global(body.light)
    .hero-bg-wall.visible
    .hero-project-thumb:global(.is-centered)
    img {
    opacity: 1;
    filter: grayscale(0) brightness(1) saturate(1);
  }
  .hero-bg-wall-desktop {
    width: clamp(36%, 42vw, 50%);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--hero-track-gap);
  }
  .hero-bg-wall-single {
    width: clamp(24%, 28vw, 34%);
    display: block;
  }
  :global(body.light) .hero-bg-wall,
  :global(body.light) .hero-marquee,
  :global(body.light) .hero-marquee-track {
    background: #ffffff;
  }
  .hero-marquee {
    position: relative;
    z-index: 1;
    height: 100%;
    overflow: hidden;
    line-height: 0;
  }
  .hero-marquee-track {
    display: flex;
    flex-direction: column;
    gap: var(--hero-track-gap);
    margin: 0;
    padding: 0;
    will-change: transform;
  }
  .hero-marquee-up .hero-marquee-track {
    animation: heroScrollUp 28s linear infinite;
  }
  .hero-marquee-down .hero-marquee-track {
    animation: heroScrollDown 28s linear infinite;
  }
  .hero-project-thumb {
    margin: 0;
    padding: 0;
    overflow: hidden;
    line-height: 0;
    background: #0b0b0b;
    border: 1px solid #161616;
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.28);
    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      box-shadow 0.3s ease;
  }
  :global(body.light) .hero-project-thumb {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 0.12);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
  }
  .hero-project-thumb img {
    display: block;
    width: 100%;
    height: clamp(180px, 18vw, 264px);
    margin: 0;
    padding: 0;
    object-fit: contain;
    object-position: center center;
    background: #0b0b0b;
    transition:
      background 0.3s ease,
      filter 0.45s ease,
      opacity 0.45s ease;
  }
  :global(body.light) .hero-project-thumb img {
    background: #ffffff;
  }
  .hero-bg-fade {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: linear-gradient(
        to left,
        rgba(0, 0, 0, 0.04),
        rgba(0, 0, 0, 0.14)
      ),
      radial-gradient(
        circle at left center,
        rgba(0, 0, 0, 0.74) 0%,
        rgba(0, 0, 0, 0.48) 28%,
        rgba(0, 0, 0, 0.1) 62%,
        rgba(0, 0, 0, 0.08) 100%
      );
    transition: background 0.3s ease;
  }
  :global(body.light) .hero-bg-fade {
    background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.04),
        rgba(255, 255, 255, 0.2)
      ),
      radial-gradient(
        circle at left center,
        rgba(255, 255, 255, 0.96) 0%,
        rgba(255, 255, 255, 0.78) 28%,
        rgba(255, 255, 255, 0.24) 62%,
        rgba(255, 255, 255, 0.08) 100%
      );
  }
  /* =========================================================
     MAIN CONTENT
  ========================================================= */
  .hero-content {
    position: relative;
    z-index: 3;
    height: 100%;
    min-height: 100%;
    max-height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-top: var(--hero-block-pad);
    padding-bottom: var(--hero-block-pad);
  }
  .hero-inner {
    --hero-item-gap: clamp(12px, 1.4vw, 20px);

    width: min(var(--hero-content-width), 90%);
    max-height: 100%;
    padding-left: var(--hero-inner-pad);
    padding-right: var(--hero-inner-pad);
    display: grid;
    gap: var(--hero-item-gap);
    justify-items: start;
  }
  .hero-heading {
    position: relative;
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: clamp(7px, 1vw, 14px);
    align-items: flex-start;
    text-align: left;
  }
  /* =========================================================
     HERO TITLE
  ========================================================= */
  .hero-title {
    width: 100%;
    margin: 0;
    /*
     * Adds the requested small breathing room
     * between the H1 and the image marquee.
     */
    padding: 0 6px 0 0;
    display: flex;
    flex-direction: column;
    gap: clamp(7px, 1vw, 14px);
    align-items: flex-start;
    text-align: left;
  }
  .hero-title-visual {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: clamp(7px, 1vw, 14px);
    align-items: flex-start;
    text-align: left;
  }
  /* =========================================================
     PERSON / GREETING
  ========================================================= */
  .hero-person {
    width: fit-content;
    max-width: 100%;
    display: inline-flex;
    align-items: center;
    gap: clamp(8px, 1vw, 12px);
    margin: 0 0 clamp(6px, 1vw, 12px);
    padding: 0 0 8px;
    border-radius: 0;
    background: transparent;
    border: 0;
    border-bottom: 1px solid #151516;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    white-space: nowrap;
    transition: border-color 0.3s ease;
  }
  :global(body.light) .hero-person {
    background: transparent;
    border-color: #0043ff;
  }
  .hero-avatar {
    width: clamp(60px, 6vw, 84px);
    height: clamp(60px, 6vw, 84px);
    border-radius: 50%;
    object-fit: cover;
    display: block;
    border: 0;
    flex-shrink: 0;
  }
  .hero-meta-icon {
    width: 18px;
    height: 18px;
    object-fit: contain;
    flex-shrink: 0;
    filter: brightness(0) invert(1);
  }
  :global(body.light) .hero-meta-icon {
    filter: brightness(0);
  }
  .hero-person-copy {
    display: inline-flex;
    align-items: center;
    gap: clamp(8px, 1vw, 12px);
  }
  .hero-greeting-text {
    color: rgba(246, 246, 242, 0.78);
    font-size: clamp(0.9rem, 0.4vw + 0.8rem, 1.1rem);
    line-height: 1.2;
    font-weight: 300;
    letter-spacing: 0.08em;
    text-transform: none;
    transition: color 0.3s ease;
  }
  :global(body.light) .hero-greeting-text {
    color: rgba(0, 0, 0, 0.68);
  }
  .hero-name {
    color: #ffffff;
    font-size: clamp(0.84rem, 0.32vw + 0.78rem, 1rem);
    line-height: 1.1;
    font-weight: 500;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }
  :global(body.light) .hero-name {
    color: #111111;
  }
  /* =========================================================
     H1 WORDS
  ========================================================= */
  .hero-line {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    gap: clamp(14px, 1.6vw, 20px);
    min-width: 0;
    text-align: left;
  }
  .hero-word {
    display: block;
    color: #f5f5f5;
    font-size: var(--hero-title-size);
    line-height: var(--hero-title-leading);
    /* slightly lighter than previous 700 */
    font-weight: 600;
    letter-spacing: -0.025em;
    text-transform: uppercase;
    text-wrap: balance;
    text-align: left;
    transition: color 0.3s ease;
  }
  :global(body.light) .hero-word {
    color: #111111;
  }
  .hero-word-center,
  .hero-word-mid,
  .hero-word-wien {
    width: 100%;
    text-align: left;
  }
  .hero-line-bottom {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    gap: clamp(8px, 1vw, 12px);
  }
  .hero-word-wien {
    white-space: normal;
  }
  /* =========================================================
     BLUE HERO STATEMENT
     Small execution of the large blue section-header system.
  ========================================================= */
  .hero-text-accent {
    width: fit-content;
    max-width: min(90%, 570px);
    margin-top: clamp(4px, 0.7vh, 9px);
    padding: 13px 17px 14px;
    background: #0043ff;
    box-sizing: border-box;
    align-self: flex-start;
    justify-self: start;
  }
  .hero-text {
    width: 100%;
    max-width: 100%;
    margin: 0;
    color: #ffffff;
    font-size: 20px;
    font-weight: 300;
    line-height: 1.5;
    letter-spacing: 0;
    text-align: left;
    text-wrap: pretty;
  }
  :global(body.light) .hero-text-accent {
    background: #0043ff;
  }
  :global(body.light) .hero-text {
    color: #ffffff;
  }
  /* =========================================================
     ACTIONS
  ========================================================= */
  .hero-actions {
    width: 100%;
    margin-top: max(0px, calc(20px - var(--hero-item-gap)));
    display: flex;
    justify-content: flex-start;
    gap: clamp(10px, 1.2vw, 16px);
  }
  .cta-link {
    min-height: clamp(38px, 4.6vh, 46px);
    padding: 0 clamp(16px, 1.7vw, 24px);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: #050505;
    background: #ffffff;
    border: 1px solid #ffffff;
    text-decoration: none;
    font-size: clamp(0.66rem, 0.16vw + 0.63rem, 0.76rem);
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    transition:
      transform 0.25s ease,
      background 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease;
  }
  .cta-link:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.82);
    border-color: rgba(255, 255, 255, 0.82);
  }
  :global(body.light) .cta-link {
    color: #ffffff;
    background: #050505;
    border-color: #050505;
  }
  :global(body.light) .cta-link:hover {
    color: #ffffff;
    background: #0043ff;
    border-color: #0043ff;
  }
  .cta-link-secondary {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.02);
    border-color: rgba(255, 255, 255, 0.52);
  }
  .cta-link-secondary:hover {
    color: #050505;
    background: #ffffff;
    border-color: #ffffff;
  }
  :global(body.light) .cta-link-secondary {
    color: #050505;
    background: rgba(0, 0, 0, 0.02);
    border-color: rgba(0, 0, 0, 0.42);
  }
  :global(body.light) .cta-link-secondary:hover {
    color: #ffffff;
    background: #050505;
    border-color: #050505;
  }
  /* =========================================================
     CONNECTION STRIP
  ========================================================= */
  .hero-connection-strip {
    position: relative;
    z-index: 5;
    width: 100%;
    max-width: 100%;
    margin-top: clamp(8px, 1.3vh, 14px);
    padding-top: clamp(3px, 0.7vh, 6px);
    display: grid;
    grid-template-columns: repeat(3, max-content);
    gap: clamp(14px, 1.6vw, 24px);
    align-self: flex-start;
    justify-self: start;
    justify-content: start;
    background: transparent;
  }
  .connection-card {
    position: relative;
    min-width: 0;
    width: max-content;
  }
  .connection-trigger {
    position: relative;
    width: auto;
    min-height: 0;
    padding: 0;
    border: 0;
    background: transparent;
    color: #f5f5f5;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 8px;
    text-align: left;
    cursor: pointer;
    overflow: visible;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      color 0.3s ease;
  }
  :global(body.light) .connection-trigger {
    color: #111111;
  }
  .connection-trigger:hover,
  .connection-trigger:focus-visible {
    background: transparent;
    outline: none;
    opacity: 0.78;
    transform: translateY(-1px);
  }
  .connection-icon-wrap {
    width: var(--hero-icon-wrap);
    height: var(--hero-icon-wrap);
    border-radius: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    background: transparent;
    border: 0;
    flex-shrink: 0;
    transition: color 0.3s ease;
  }
  :global(body.light) .connection-icon-wrap {
    color: #111111;
  }
  .connection-icon {
    width: var(--hero-icon-size);
    height: var(--hero-icon-size);
    display: block;
  }
  .connection-title {
    color: rgba(255, 255, 255, 0.92);
    font-size: clamp(0.72rem, 0.26vw + 0.68rem, 0.84rem);
    line-height: 1.25;
    font-weight: 400;
    letter-spacing: 0;
    text-wrap: balance;
    text-align: left;
    text-decoration: underline;
    text-decoration-color: #0043ff;
    text-underline-offset: 4px;
    text-decoration-thickness: 1px;
    transition: color 0.3s ease;
  }
  :global(body.light) .connection-title {
    color: rgba(0, 0, 0, 0.86);
  }
  /* =========================================================
     CONNECTION POPOVER
  ========================================================= */
  .connection-popover {
    position: absolute;
    left: 0;
    bottom: calc(100% + 14px);
    transform: translateY(10px);
    width: min(280px, calc(100vw - 40px));
    padding: 16px 16px 17px;
    border-radius: 0;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 18px 45px rgba(0, 0, 0, 0.35);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition:
      opacity 0.22s ease,
      transform 0.22s ease,
      visibility 0.22s ease,
      background 0.3s ease,
      border-color 0.3s ease;
  }
  :global(body.light) .connection-popover {
    background: #050505;
    border-color: rgba(255, 255, 255, 0.12);
  }
  .connection-popover::after {
    content: "";
    position: absolute;
    left: 18px;
    top: 100%;
    transform: rotate(45deg);
    width: 12px;
    height: 12px;
    background: #ffffff;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    transition:
      background 0.3s ease,
      border-color 0.3s ease;
  }
  :global(body.light) .connection-popover::after {
    background: #050505;
    border-right-color: rgba(255, 255, 255, 0.12);
    border-bottom-color: rgba(255, 255, 255, 0.12);
  }
  .connection-popover p {
    margin: 0;
    color: #000000;
    font-size: clamp(0.84rem, 0.22vw + 0.82rem, 0.9rem);
    line-height: 1.55;
    text-align: left;
    transition: color 0.3s ease;
  }
  :global(body.light) .connection-popover p {
    color: #ffffff;
  }
  @media (hover: hover) and (pointer: fine) {
    .connection-card:hover .connection-popover,
    .connection-card:focus-within .connection-popover {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
  }
  /* =========================================================
     MARQUEE ANIMATION
  ========================================================= */
  @keyframes heroScrollUp {
    0% {
      transform: translateY(0);
    }
    100% {
      transform: translateY(calc(-50% - 9px));
    }
  }
  @keyframes heroScrollDown {
    0% {
      transform: translateY(calc(-50% - 9px));
    }
    100% {
      transform: translateY(0);
    }
  }
  /* =========================================================
     SMALL DESKTOP
  ========================================================= */
  @media (max-width: 1360px) {
    .hero {
      --hero-side-pad: clamp(20px, 3vw, 42px);
      --hero-inner-pad: 0px;
      --hero-title-size: clamp(1.3rem, 2vw, 2.05rem);
      --hero-content-width: 700px;
    }
    .hero-bg-wall-desktop {
      width: clamp(34%, 39vw, 46%);
    }
    .hero-text {
      font-size: 19px;
    }
  }
  /* =========================================================
     TABLET
  ========================================================= */
  @media (max-width: 1100px) {
    .hero {
      --hero-side-pad: clamp(18px, 3.5vw, 32px);
      --hero-inner-pad: 0px;
      --hero-title-size: clamp(1.5rem, 4.5vw, 2.45rem);
      --hero-icon-wrap: 28px;
      --hero-icon-size: 16px;
      --hero-block-pad: clamp(18px, 3vh, 28px);
      height: 88svh;
      min-height: 88svh;
      max-height: 88svh;
    }
    .hero-shell {
      width: min(var(--hero-max-width), calc(100% - 20px));
    }
    .hero-bg-wall-single {
      width: clamp(36%, 43vw, 50%);
      right: 12px;
    }
    .hero-project-thumb img {
      height: clamp(180px, 24vw, 264px);
    }
    .hero-bg-fade {
      background: linear-gradient(
          to left,
          rgba(0, 0, 0, 0.02),
          rgba(0, 0, 0, 0.08)
        ),
        radial-gradient(
          circle at left center,
          rgba(0, 0, 0, 0.6) 0%,
          rgba(0, 0, 0, 0.34) 28%,
          rgba(0, 0, 0, 0.08) 62%,
          rgba(0, 0, 0, 0.04) 100%
        );
    }
    :global(body.light) .hero-bg-fade {
      background: linear-gradient(
          to left,
          rgba(255, 255, 255, 0.02),
          rgba(255, 255, 255, 0.12)
        ),
        radial-gradient(
          circle at left center,
          rgba(255, 255, 255, 0.94) 0%,
          rgba(255, 255, 255, 0.78) 28%,
          rgba(255, 255, 255, 0.22) 62%,
          rgba(255, 255, 255, 0.06) 100%
        );
    }
    .hero-content {
      align-items: center;
      justify-content: flex-start;
      padding-top: var(--hero-block-pad);
      padding-bottom: var(--hero-block-pad);
    }
    .hero-inner {
      --hero-item-gap: clamp(12px, 1.6vh, 18px);

      width: min(640px, 72%);
      gap: var(--hero-item-gap);
      justify-items: start;
      align-content: center;
    }
    .hero-heading {
      width: 100%;
      gap: clamp(10px, 1.5vh, 17px);
      align-items: flex-start;
      text-align: left;
    }
    .hero-title {
      width: min(92%, 560px);
      align-items: flex-start;
      text-align: left;
      gap: clamp(5px, 0.8vh, 9px);
      padding-right: 6px;
    }
    .hero-title-visual {
      align-items: flex-start;
      text-align: left;
      gap: clamp(5px, 0.8vh, 9px);
    }
    .hero-person {
      margin: 0 0 clamp(4px, 1vh, 10px);
    }
    .hero-avatar {
      width: clamp(58px, 7.2vw, 77px);
      height: clamp(58px, 7.2vw, 77px);
    }
    .hero-greeting-text {
      font-size: clamp(0.82rem, 1vw, 0.98rem);
      text-transform: none;
    }
    .hero-line,
    .hero-line-right,
    .hero-line-middle,
    .hero-line-bottom,
    .hero-line-title-first {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: clamp(5px, 0.8vh, 9px);
      min-height: auto;
      position: static;
      width: 100%;
      text-align: left;
    }
    .hero-word,
    .hero-word-center,
    .hero-word-mid,
    .hero-word-wien {
      width: 100%;
      text-align: left;
      line-height: 0.99;
      letter-spacing: -0.045em;
      font-weight: 500;
      text-transform: none;
    }
    /* Minimal statement accent on tablet */
    .hero-text-accent {
      width: fit-content;
      max-width: min(70%, 480px);
      margin-top: 4px;
      padding: 0 0 0 14px;
      align-self: flex-start;
      justify-self: start;
      background: transparent;
      border-left: 1px solid #0043ff;
    }
    .hero-text {
      max-width: 100%;
      margin: 0;
      font-size: 19px;
      font-weight: 300;
      line-height: 1.5;
      text-align: left;
    }
    :global(body.light) .hero-text-accent {
      background: transparent;
    }
    :global(body.light) .hero-text {
      color: rgba(0, 0, 0, 0.68);
    }
    .hero-actions {
      justify-content: flex-start;
      gap: clamp(10px, 1.5vh, 16px);
    }
    .hero-connection-strip {
      margin: clamp(4px, 0.9vh, 9px) 0 0;
      padding-top: clamp(2px, 0.5vh, 5px);
      width: min(100%, 480px);
      grid-template-columns: repeat(3, max-content);
      gap: 6px;
      justify-self: start;
      justify-content: start;
      align-self: flex-start;
    }
    .connection-card {
      width: 100%;
    }
    .connection-trigger {
      width: 100%;
      min-height: 0;
      padding: 0;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 4px;
      text-align: left;
    }
    .connection-title {
      font-size: 1rem;
      line-height: 1.12;
      text-align: left;
      font-weight: 400;
    }
    .connection-popover {
      left: 50%;
      bottom: calc(100% + 12px);
      transform: translate(-50%, 10px);
      width: min(260px, calc(100vw - 32px));
      padding: 15px 15px 16px;
    }
    .connection-popover p {
      font-size: 0.92rem;
      line-height: 1.5;
    }
    .connection-popover::after {
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
    .connection-card:hover .connection-popover,
    .connection-card:focus-within .connection-popover {
      opacity: 0;
      visibility: hidden;
      transform: translate(-50%, 10px);
    }
    .connection-card.is-open .connection-popover {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translate(-50%, 0);
    }
    .connection-card-0 .connection-popover {
      left: 0;
      right: auto;
      transform: translate(0, 10px);
    }
    .connection-card-0 .connection-popover::after {
      left: 24px;
      transform: rotate(45deg);
    }
    .connection-card-0.is-open .connection-popover {
      transform: translate(0, 0);
    }
    .connection-card-2 .connection-popover {
      left: auto;
      right: 0;
      transform: translate(0, 10px);
    }
    .connection-card-2 .connection-popover::after {
      left: auto;
      right: 24px;
      transform: rotate(45deg);
    }
    .connection-card-2.is-open .connection-popover {
      transform: translate(0, 0);
    }
  }
  /* =========================================================
     TABLET SOCIAL RAIL
  ========================================================= */
  @media (min-width: 768px) and (max-width: 1100px) {
    .hero-social-rail {
      position: absolute;
      z-index: 5;
      top: 50%;
      left: clamp(2px, 0.7vw, 8px);
      width: 30px;
      height: min(520px, 66%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
      transform: translateY(-50%);
    }
    .hero-social-line {
      position: relative;
      width: 1px;
      min-height: 32px;
      flex: 1;
      background: rgba(255, 255, 255, 0.28);
    }
    .hero-social-line-top::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 1px;
      height: 30px;
      background: #0043ff;
    }
    .hero-social-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 15px;
    }
    .hero-social-links a {
      width: 27px;
      height: 27px;
      display: grid;
      place-items: center;
      color: rgba(255, 255, 255, 0.78);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .hero-social-links a:hover,
    .hero-social-links a:focus-visible {
      color: #0043ff;
    }
    .hero-social-links a:focus-visible {
      outline: 1px solid #0043ff;
      outline-offset: 3px;
    }
    .hero-social-links svg {
      width: 17px;
      height: 17px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    :global(body.light) .hero-social-line {
      background: rgba(0, 0, 0, 0.24);
    }
    :global(body.light) .hero-social-line-top::after {
      background: #0043ff;
    }
    :global(body.light) .hero-social-links a {
      color: rgba(0, 0, 0, 0.66);
    }
    :global(body.light) .hero-social-links a:hover,
    :global(body.light) .hero-social-links a:focus-visible {
      color: #0043ff;
    }
    .hero-content {
      padding-left: clamp(48px, 6.5vw, 66px);
    }
  }
  /* =========================================================
     MOBILE
  ========================================================= */
  @media (max-width: 767px) {
    .hero {
      --hero-side-pad: 18px;
      --hero-title-size: clamp(1.15rem, 5.3vw, 1.7rem);
      --hero-icon-wrap: 24px;
      --hero-icon-size: 13px;
      --hero-block-pad: clamp(16px, 2.8vh, 24px);
      height: 90svh;
      min-height: 90svh;
      max-height: 90svh;
    }
    .hero-shell {
      width: 100%;
      padding-left: calc(var(--hero-side-pad) + 18px);
      padding-right: var(--hero-side-pad);
    }
    .hero-bg-wall-single {
      width: 39%;
      right: 14px;
    }
    .hero-project-thumb img {
      height: clamp(170px, 34vw, 240px);
    }
    .hero-bg-fade {
      background: linear-gradient(
          to left,
          rgba(0, 0, 0, 0.02),
          rgba(0, 0, 0, 0.08)
        ),
        radial-gradient(
          circle at left center,
          rgba(0, 0, 0, 0.58) 0%,
          rgba(0, 0, 0, 0.34) 30%,
          rgba(0, 0, 0, 0.08) 62%,
          rgba(0, 0, 0, 0.04) 100%
        );
    }
    :global(body.light) .hero-bg-fade {
      background: linear-gradient(
          to left,
          rgba(255, 255, 255, 0.02),
          rgba(255, 255, 255, 0.1)
        ),
        radial-gradient(
          circle at left center,
          rgba(255, 255, 255, 0.92) 0%,
          rgba(255, 255, 255, 0.76) 30%,
          rgba(255, 255, 255, 0.22) 62%,
          rgba(255, 255, 255, 0.06) 100%
        );
    }
    .hero-content {
      justify-content: flex-start;
    }
    .hero-inner {
      --hero-item-gap: clamp(10px, 1.5vh, 15px);

      width: min(68%, 360px);
      gap: var(--hero-item-gap);
      justify-items: start;
      align-content: center;
    }
    .hero-heading {
      width: 100%;
      gap: clamp(9px, 1.4vh, 14px);
      align-items: flex-start;
      text-align: left;
    }
    .hero-person {
      display: inline-flex;
      gap: 7px;
      max-width: 100%;
      margin: 0 0 clamp(3px, 0.7vh, 7px);
      padding: 0 0 7px;
    }
    .hero-avatar {
      width: 49px;
      height: 49px;
    }
    .hero-meta-icon {
      width: 13px;
      height: 13px;
    }
    .hero-person-copy {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      gap: 1px;
    }
    .hero-greeting-text {
      font-size: 0.72rem;
      line-height: 1.1;
      letter-spacing: 0.05em;
      text-transform: none;
      font-weight: 300;
    }
    .hero-name {
      font-size: 0.68rem;
      line-height: 1.1;
      text-transform: uppercase;
    }
    .hero-title {
      width: 100%;
      padding-right: 6px;
    }
    .hero-title-visual {
      align-items: flex-start;
      text-align: left;
    }
    .hero-line,
    .hero-line-mobile-title {
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
    }
    .hero-word,
    .hero-word-mobile {
      width: 100%;
      text-align: left;
      font-size: clamp(1.2rem, 5.5vw, 1.8rem);
      line-height: 1.02;
      letter-spacing: -0.035em;
      font-weight: 500;
      text-transform: none;
    }
    /* =====================================================
       MOBILE BLUE STATEMENT
    ====================================================== */
    .hero-text-accent {
      width: fit-content;
      max-width: min(70%, 250px);
      margin-top: 3px;
      margin-right: auto;
      padding: 0 0 0 11px;
      align-self: flex-start;
      justify-self: start;
      background: transparent;
      border-left: 1px solid #0043ff;
      position: relative;
      z-index: 4;
    }
    .hero-text {
      width: 100%;
      max-width: 100%;
      margin: 0;
      color: rgba(255, 255, 255, 0.72);
      font-size: 15px;
      font-weight: 300;
      line-height: 1.48;
      text-align: left;
    }
    :global(body.light) .hero-text-accent {
      background: transparent;
    }
    :global(body.light) .hero-text {
      color: rgba(0, 0, 0, 0.68);
    }
    .hero-actions {
      width: 100%;
      justify-content: flex-start;
      gap: clamp(8px, 1.2vh, 12px);
    }
    .cta-link {
      min-height: 38px;
      padding: 0 12px;
      font-size: 0.6rem;
      flex: 0 1 auto;
    }
    .hero-connection-strip {
      width: min(100%, 300px);
      margin: clamp(4px, 0.9vh, 9px) 0 0;
      padding-top: clamp(2px, 0.5vh, 5px);
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 5px;
      justify-self: start;
      justify-content: start;
      align-self: flex-start;
    }
    .connection-card {
      width: 100%;
    }
    .connection-trigger {
      width: 100%;
      min-height: 0;
      padding: 0;
      align-items: flex-start;
      justify-content: flex-start;
      text-align: left;
      gap: 4px;
    }
    .connection-title {
      font-size: 0.68rem;
      line-height: 1.08;
      text-align: left;
      font-weight: 400;
    }
    .connection-popover {
      left: 50%;
      bottom: calc(100% + 11px);
      width: min(235px, calc(100vw - 28px));
      padding: 14px 14px 15px;
      transform: translate(-50%, 8px);
    }
    .connection-popover p {
      font-size: 0.86rem;
      line-height: 1.48;
    }
    .connection-popover::after {
      left: 50%;
      transform: translateX(-50%) rotate(45deg);
    }
    .connection-card:hover .connection-popover,
    .connection-card:focus-within .connection-popover {
      opacity: 0;
      visibility: hidden;
      transform: translate(-50%, 8px);
    }
    .connection-card.is-open .connection-popover {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translate(-50%, 0);
    }
    .connection-card-0 .connection-popover {
      left: 0;
      right: auto;
      transform: translate(0, 8px);
    }
    .connection-card-0 .connection-popover::after {
      left: 22px;
      transform: rotate(45deg);
    }
    .connection-card-0.is-open .connection-popover {
      transform: translate(0, 0);
    }
    .connection-card-1 .connection-popover {
      left: 50%;
      transform: translate(-50%, 8px);
    }
    .connection-card-1.is-open .connection-popover {
      transform: translate(-50%, 0);
    }
    .connection-card-2 .connection-popover {
      left: auto;
      right: 0;
      transform: translate(0, 8px);
    }
    .connection-card-2 .connection-popover::after {
      left: auto;
      right: 22px;
      transform: rotate(45deg);
    }
    .connection-card-2.is-open .connection-popover {
      transform: translate(0, 0);
    }
  }
  /* =========================================================
     SMALL MOBILE
  ========================================================= */
  @media (max-width: 420px) {
    .hero-shell {
      padding-left: calc(var(--hero-side-pad) + 14px);
    }
    .hero {
      --hero-title-size: clamp(1.15rem, 5.5vw, 1.7rem);
    }
    .hero-inner {
      width: min(64%, 300px);
    }
    .hero-word,
    .hero-word-mobile {
      font-size: clamp(1.15rem, 5.4vw, 1.65rem);
    }
    .hero-text-accent {
      max-width: min(70%, 210px);
      padding: 0 0 0 10px;
    }
    .hero-text {
      width: 100%;
      max-width: 100%;
      font-size: 14px;
      font-weight: 300;
      line-height: 1.48;
      text-align: left;
      align-self: flex-start;
      justify-self: start;
    }
    .connection-title {
      font-size: 0.62rem;
    }
    .hero-connection-strip {
      width: min(100%, 260px);
      gap: 4px;
    }
    .connection-popover {
      width: min(225px, calc(100vw - 24px));
    }
  }
  /* =========================================================
     DESKTOP REFERENCE DETAILS
     Kept outside tablet and mobile layouts.
  ========================================================= */
  @media (min-width: 1101px) {
    .hero-social-rail {
      position: absolute;
      z-index: 5;
      top: 50%;
      left: clamp(4px, 0.8vw, 14px);
      width: 34px;
      height: min(610px, 72%);
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 22px;
      transform: translateY(-50%);
    }
    .hero-social-line {
      position: relative;
      width: 1px;
      min-height: 38px;
      flex: 1;
      background: rgba(255, 255, 255, 0.28);
    }
    .hero-social-line-top::after {
      content: "";
      position: absolute;
      right: 0;
      bottom: 0;
      width: 1px;
      height: 34px;
      background: #0043ff;
    }
    .hero-social-links {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 18px;
    }
    .hero-social-links a {
      width: 30px;
      height: 30px;
      display: grid;
      place-items: center;
      color: rgba(255, 255, 255, 0.78);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .hero-social-links a:hover,
    .hero-social-links a:focus-visible {
      color: #0043ff;
    }
    .hero-social-links a:focus-visible {
      outline: 1px solid #0043ff;
      outline-offset: 3px;
    }
    .hero-social-links svg {
      width: 19px;
      height: 19px;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    :global(body.light) .hero-social-line {
      background: rgba(0, 0, 0, 0.24);
    }
    :global(body.light) .hero-social-line-top::after {
      background: #0043ff;
    }
    :global(body.light) .hero-social-links a {
      color: rgba(0, 0, 0, 0.66);
    }
    :global(body.light) .hero-social-links a:hover,
    :global(body.light) .hero-social-links a:focus-visible {
      color: #0043ff;
    }
    .hero-content {
      padding-left: clamp(62px, 5.6vw, 88px);
    }
    .hero-inner {
      --hero-item-gap: clamp(13px, 1.2vw, 18px);

      width: min(680px, 90%);
      gap: var(--hero-item-gap);
    }
    .hero-actions {
      margin-top: max(0px, calc(40px - var(--hero-item-gap)));
    }
    .hero-heading {
      gap: clamp(9px, 0.8vw, 13px);
    }
    .hero-person {
      margin-bottom: clamp(8px, 0.8vw, 12px);
    }
    .hero-title {
      width: min(88%, 520px);
    }
    .hero-title,
    .hero-title-visual {
      gap: clamp(3px, 0.45vw, 7px);
    }
    .hero-word {
      font-size: clamp(2.1rem, 3.2vw, 3.35rem);
      line-height: 0.98;
      font-weight: 500;
      letter-spacing: -0.045em;
      text-transform: none;
    }
    .hero-word-wien::after {
      content: ".";
      margin-left: 0.06em;
      color: #0043ff;
    }
    .hero-text-accent {
      width: min(88%, 520px);
      max-width: none;
      margin-top: clamp(8px, 0.8vh, 12px);
      padding: 0 0 0 16px;
      background: transparent;
      border-left: 1px solid #0043ff;
    }
    .hero-text {
      color: rgba(255, 255, 255, 0.66);
      font-size: clamp(17px, calc(0.9vw + 2px), 19px);
      line-height: 1.62;
    }
    :global(body.light) .hero-text-accent {
      background: transparent;
    }
    :global(body.light) .hero-text {
      color: rgba(0, 0, 0, 0.64);
    }
  }
  /* =========================================================
     REDUCED MOTION
  ========================================================= */
  @media (prefers-reduced-motion: reduce) {
    .hero-marquee-track {
      animation: none;
    }
    .hero-bg-wall {
      transition: none;
    }
    .hero-project-thumb img {
      transition: none;
    }
    .cta-link,
    .connection-trigger,
    .connection-popover {
      transition: none;
    }
  }

  /* =========================================================
   LIGHT MODE ONLY — WHITE MARQUEE + SUBTLE CONNECTING LINES
========================================================= */

  :global(body.light) .hero-bg-wall,
  :global(body.light) .hero-bg-wall-desktop,
  :global(body.light) .hero-bg-wall-single,
  :global(body.light) .hero-marquee,
  :global(body.light) .hero-marquee-track,
  :global(body.light) .hero-project-thumb,
  :global(body.light) .hero-project-thumb img {
    background: #ffffff !important;
  }

  /* Very faint outline around each image */
  :global(body.light) .hero-project-thumb {
    position: relative;
    overflow: visible;
    border: 1px solid #f8f8f8 !important;
    box-shadow: none !important;
  }

  /* Vertical connector from each image to the next */
  :global(body.light) .hero-project-thumb::after {
    content: "";
    position: absolute;

    left: 50%;
    top: 100%;

    width: 1px;
    height: var(--hero-track-gap);

    transform: translateX(-50%);

    background: #f8f8f8;

    pointer-events: none;
  }

  /* Make sure there is NO divider between the two columns */
  :global(body.light) .hero-bg-wall-desktop::after {
    content: none !important;
    display: none !important;
  }
</style>
