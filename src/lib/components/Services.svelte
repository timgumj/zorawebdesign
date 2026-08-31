<script>
  import { onMount } from "svelte";

  let {
    title,

    subtitle,

    eyebrow = "",

    services = [],

    stats = null,

    experienceLabel = "Experience point",

    toolsLabel = "TOOLS",

    toolsAlt = "Tools",

    serviceKeywordsLabel = "Service keywords",

    extraExperienceItems = [
      { title: "All in one solution" },

      { title: "Agency quality" },
    ],

    serviceKeywords = {
      "web design": [
        "UI Design",

        "UX",

        "Responsive",

        "Brand Look",

        "Wireframes",
      ],

      "web development": [
        "SvelteKit",

        "WordPress",

        "Frontend",

        "Backend",

        "Clean Code",
      ],

      wordpress: ["Themes", "Plugins", "CMS", "WooCommerce"],

      seo: ["Keywords", "On Page SEO", "Analytics", "Performance", "Search"],

      ecommerce: ["Shopify", "WooCommerce", "Checkout", "Products", "Payments"],

      branding: ["Logo", "Identity", "Typography", "Colors", "Style Guide"],

      marketing: ["Campaigns", "Ads", "Content", "Tracking", "Growth"],
    },

    fallbackServiceTags = ["Strategy", "Design", "Build", "Optimize"],

    problemEyebrow = "WIE ICH DIR HELFEN KANN",

    problemTitle = "EINE WEBSITE SOLLTE DEINEN ALLTAG EINFACHER MACHEN",

    problemText = "Viele meiner Kundinnen und Kunden kommen zu mir, weil der Weg zur richtigen Website unklar, technisch oder unnötig kompliziert wirkt. Ich begleite dich persönlich und sorge dafür, dass du jederzeit weißt, was als Nächstes passiert.",

    problemListTitle = "KOMMEN DIR DIESE HERAUSFORDERUNGEN BEKANNT VOR?",

    problemLabel = "DAS PROBLEM",

    solutionLabel = "MEINE LÖSUNG",

    problemItems = [
      {
        title: "DU WEISST NICHT, WO DU ANFANGEN SOLLST",

        problem:
          "Du möchtest eine neue Website, aber Seiten, Inhalte, Funktionen und Kosten wirken schnell überwältigend.",

        solution:
          "Ich strukturiere dein Projekt gemeinsam mit dir, erkläre die nächsten Schritte verständlich und entwickle eine klare Lösung, die zu deinen tatsächlichen Zielen passt.",
      },

      {
        title: "DEINE BESTEHENDE WEBSITE FUNKTIONIERT NICHT MEHR FÜR DICH",

        problem:
          "Das Design wirkt veraltet, Inhalte sind unübersichtlich oder einzelne Bereiche funktionieren nicht mehr zuverlässig.",

        solution:
          "Ich prüfe, was erhalten werden kann, überarbeite Design und Struktur und bringe deine Website technisch und visuell wieder auf einen professionellen Stand.",
      },

      {
        title: "DU KANNST INHALTE NICHT EINFACH SELBST ÄNDERN",

        problem:
          "Für kleine Text- oder Bildänderungen bist du jedes Mal auf einen Entwickler angewiesen.",

        solution:
          "Ich baue deine Website so, dass du wichtige Inhalte selbst bearbeiten kannst, und zeige dir persönlich, wie alles funktioniert.",
      },

      {
        title: "DEINE WEBSITE IST LANGSAM",

        problem:
          "Seiten laden zu lange, Bilder sind zu groß oder technische Altlasten bremsen deine Website aus.",

        solution:
          "Ich optimiere Bilder, Code, Hosting und Ladeprozesse, damit deine Website schneller und angenehmer zu bedienen ist.",
      },

      {
        title: "DIE KOMMUNIKATION MIT DEINEM WEB DESIGNER IST SCHWIERIG",

        problem:
          "Antworten kommen erst nach Tagen oder Wochen und du weißt nicht, wie weit dein Projekt ist.",

        solution:
          "Du arbeitest direkt mit mir. Ich kommuniziere klar, gebe regelmäßige Updates und bin während des gesamten Projekts zuverlässig erreichbar.",
      },

      {
        title: "DU MÖCHTEST KEINE UNNÖTIGEN MONATLICHEN ABOS",

        problem:
          "Deine Website soll nicht von laufenden Gebühren für Funktionen abhängen, die du eigentlich gar nicht brauchst.",

        solution:
          "Ich setze auf transparente Kosten und wähle Lösungen ohne unnötige Abhängigkeiten. Laufende Kosten entstehen nur dort, wo sie wirklich sinnvoll oder technisch notwendig sind.",
      },
    ],

    toolsSectionTitle = "TOOLS FÜR DEINE WEBSITE",

    toolsMoreLabel = "MEHR",

    toolsMarqueeTitle = "MEIN DIGITALER TOOLKIT",

    profileName = "JULIUS TIMGUM",

    profileRole = "WEBDESIGN · DEVELOPMENT · WORDPRESS",

    profileImageAlt = "Julius Timgum, freelance web designer and WordPress developer in Vienna",

    toolLinks = [
      {
        title: "WEBSITE-PROJEKTPLANER",

        text: "Beantworte einige einfache Fragen und erhalte eine passende Empfehlung für dein Website-Projekt.",

        href: "/website-konfigurator/",

        linkLabel: "PROJEKT PLANEN",
      },

      {
        title: "KOSTENLOSER WEBSITE-AUDIT",

        text: "Prüfe deine Website auf SEO, Leistung, Sicherheit und Barrierefreiheit.",

        href: "/website-audit/",

        linkLabel: "WEBSITE PRÜFEN",
      },
    ],
  } = $props();

  let headerVisible = $state(false);

  let openProblemIndex = $state(0);

  onMount(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");

    const syncProblemState = () => {
      openProblemIndex = mobileQuery.matches ? -1 : 0;
    };

    syncProblemState();
    mobileQuery.addEventListener("change", syncProblemState);

    return () => mobileQuery.removeEventListener("change", syncProblemState);
  });

  let activeServiceIndex = $state(0);

  let experienceViewport;

  function moveExperience(direction) {
    if (!experienceViewport) return;

    const firstItem = experienceViewport.querySelector(".experience-item");

    if (!firstItem) return;

    const gap = parseFloat(getComputedStyle(experienceViewport).columnGap) || 0;

    const step = firstItem.getBoundingClientRect().width + gap;

    const maxScroll =
      experienceViewport.scrollWidth - experienceViewport.clientWidth;

    if (maxScroll <= 0) return;

    let target = experienceViewport.scrollLeft + direction * step;

    if (direction > 0 && experienceViewport.scrollLeft >= maxScroll - 2) {
      target = 0;
    }

    if (direction < 0 && experienceViewport.scrollLeft <= 2) {
      target = maxScroll;
    }

    experienceViewport.scrollTo({
      left: Math.max(0, Math.min(target, maxScroll)),

      behavior: "smooth",
    });
  }

  function autoplayExperience(node) {
    experienceViewport = node.querySelector(".experience-list");

    if (
      typeof window === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return {
        destroy() {},
      };
    }

    const sliderQuery = window.matchMedia("(max-width: 1024px)");

    let hovered = false;

    let focused = false;

    let resumeTimer;

    const onPointerEnter = () => {
      hovered = true;
    };

    const onPointerLeave = () => {
      hovered = false;
    };

    const onFocusIn = () => {
      focused = true;
    };

    const onFocusOut = () => {
      focused = false;
    };

    const pauseTemporarily = () => {
      if (!sliderQuery.matches) return;

      focused = true;

      window.clearTimeout(resumeTimer);

      resumeTimer = window.setTimeout(() => {
        focused = false;
      }, 7000);
    };

    const interval = window.setInterval(() => {
      if (sliderQuery.matches && !hovered && !focused && !document.hidden) {
        moveExperience(1);
      }
    }, 5200);

    node.addEventListener("pointerenter", onPointerEnter);

    node.addEventListener("pointerleave", onPointerLeave);

    node.addEventListener("focusin", onFocusIn);

    node.addEventListener("focusout", onFocusOut);

    node.addEventListener("pointerdown", pauseTemporarily, { passive: true });

    node.addEventListener("wheel", pauseTemporarily, { passive: true });

    return {
      destroy() {
        window.clearInterval(interval);

        window.clearTimeout(resumeTimer);

        node.removeEventListener("pointerenter", onPointerEnter);

        node.removeEventListener("pointerleave", onPointerLeave);

        node.removeEventListener("focusin", onFocusIn);

        node.removeEventListener("focusout", onFocusOut);

        node.removeEventListener("pointerdown", pauseTemporarily);

        node.removeEventListener("wheel", pauseTemporarily);
      },
    };
  }

  const reorderedServices = $derived(services);

  const normalizedStats = $derived(
    [...(stats?.items ?? []), ...extraExperienceItems]

      .filter((item) => {
        const itemTitle =
          typeof item === "string"
            ? item
            : (item.title ?? item.label ?? item.value ?? "");

        return !["bespoke design", "location independent"].includes(
          itemTitle.toLowerCase().trim(),
        );
      })

      .map((item) => {
        const itemTitle =
          typeof item === "string"
            ? item
            : (item.title ?? item.label ?? item.value ?? "");

        return {
          title: itemTitle,

          label:
            typeof item === "string"
              ? experienceLabel
              : (item.label ?? experienceLabel),
        };
      })

      .slice(0, 4),
  );

  const tools = [
    "/images/google-analytics.png",

    "/images/google-ads.png",

    "/images/hubspot.png",

    "/images/mailchimp.png",

    "/images/openai.png",

    "/images/woocommerce.png",

    "/images/shopify.png",

    "/images/wordpress.png",
  ];

  const marqueeTools = $derived([...tools, ...tools]);

  function selectProblem(event, index) {
    event.preventDefault();

    openProblemIndex = openProblemIndex === index ? -1 : index;
  }

  function scrollToService(event, index) {
    event.preventDefault();

    activeServiceIndex = index;

    const target = document.getElementById(`service-${index}`);

    if (!target) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    target.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "start",
    });
  }

  function observeServicePanel(node, index) {
    if (typeof IntersectionObserver === "undefined") {
      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activeServiceIndex = index;
        }
      },
      {
        threshold: 0,
        rootMargin: "-18% 0px -68% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }

  function getServiceTags(service) {
    const serviceTitle = service?.title?.toLowerCase() ?? "";

    const foundKey = Object.keys(serviceKeywords).find((key) =>
      serviceTitle.includes(key),
    );

    return foundKey ? serviceKeywords[foundKey] : fallbackServiceTags;
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
</script>

<section id="services" class="services">
  <div class="services-shell">
    <div class="shell-line edge-left"></div>

    <div class="shell-line col-1"></div>

    <div class="shell-line col-2"></div>

    <div class="shell-line edge-right"></div>

    <div class="shell-bottom-line"></div>

    <div class="container services-container">
      {#if stats}
        <section class="premium-about" aria-labelledby="premium-about-title">
          <!-- =================================================

               EXPERIENCE

          ================================================== -->

          <aside
            class="experience-rail"
            aria-label={experienceLabel}
            use:autoplayExperience
          >
            <div class="experience-toolbar">
              <div class="experience-controls">
                <button
                  type="button"
                  class="experience-nav"
                  onclick={() => moveExperience(-1)}
                  aria-label="Previous experience point"
                >
                  ←
                </button>

                <button
                  type="button"
                  class="experience-nav"
                  onclick={() => moveExperience(1)}
                  aria-label="Next experience point"
                >
                  →
                </button>
              </div>
            </div>

            <div class="experience-list" bind:this={experienceViewport}>
              {#each normalizedStats as stat}
                <article class="experience-item">
                  <div class="experience-copy">
                    <p class="experience-title">
                      <span class="experience-title-first"
                        >{stat.title.split(/\s+/)[0]}</span
                      >{#if stat.title.split(/\s+/).slice(1).length}
                        {" "}
                        <span class="experience-title-rest">
                          {stat.title.split(/\s+/).slice(1).join(" ")}</span
                        >
                      {/if}
                    </p>

                    <p>{stat.label}</p>
                  </div>
                </article>
              {/each}
            </div>
          </aside>

          <!-- =================================================

               ABOUT

          ================================================== -->

          <div class="about-editorial">
            <div class="about-profile">
              <div class="about-image-wrap">
                <img
                  src="/images/Julius_Timgum-700.webp"
                  alt={profileImageAlt}
                  loading="eager"
                  decoding="async"
                />
              </div>

              <h2 id="premium-about-title" class="about-editorial-title">
                <span class="sr-only">{problemTitle}</span>

                <span class="about-title-track" aria-hidden="true">
                  <span class="about-title-run">
                    <span>{problemTitle}</span>

                    <span class="about-title-separator">—</span>
                  </span>

                  <span class="about-title-run">
                    <span>{problemTitle}</span>

                    <span class="about-title-separator">—</span>
                  </span>
                </span>
              </h2>
            </div>

            <div class="about-below-copy">
              <div class="about-top-copy">
                <span class="about-kicker">
                  {problemEyebrow || stats?.eyebrow || eyebrow}
                </span>

                <p class="about-editorial-text">
                  {problemText}
                </p>
              </div>

              <div class="about-editorial-figure">
                <span class="profile-name">{profileName}</span>

                <span class="profile-role">
                  {#each profileRole.split(/\s*·\s*/) as role}
                    <span>{role}</span>
                  {/each}
                </span>
              </div>
            </div>
          </div>
        </section>
      {/if}

      <!-- =====================================================

           SECTION HEADER

      ====================================================== -->

      <div
        class="services-header"
        class:visible={headerVisible}
        use:observeHeader
      >
        <div class="services-header-inner">
          <div class="services-header-main">
            <h2>{title}</h2>
          </div>

          {#if subtitle}
            <p class="services-subtitle">{subtitle}</p>
          {/if}
        </div>
      </div>

      <!-- =====================================================

           PROBLEM / SOLUTION

      ====================================================== -->

      {#if problemItems?.length}
        <section
          class="problem-workspace"
          aria-labelledby="problem-solution-title"
        >
          <div class="problem-intro">
            <h3 id="problem-solution-title">{problemListTitle}</h3>

            <span class="problem-direction-arrow" aria-hidden="true">
              <span class="problem-direction-desktop">→</span>

              <span class="problem-direction-mobile">↓</span>
            </span>
          </div>

          <div class="problem-accordion-column">
            <div class="problem-accordion">
              {#each problemItems as item, index}
                <details class="problem-item" open={openProblemIndex === index}>
                  <summary onclick={(event) => selectProblem(event, index)}>
                    <h4 class="problem-item-title">{item.title}</h4>

                    <span class="problem-item-toggle" aria-hidden="true">
                      {openProblemIndex === index ? "−" : "+"}
                    </span>
                  </summary>

                  <div class="problem-item-content">
                    <div class="problem-solution-row">
                      <span
                        class="problem-solution-marker problem-marker"
                        aria-hidden="true"
                      ></span>

                      <div>
                        <span class="problem-solution-label">
                          {problemLabel}
                        </span>

                        <p>{item.problem}</p>
                      </div>
                    </div>

                    <div class="problem-solution-row">
                      <span
                        class="problem-solution-marker solution-marker"
                        aria-hidden="true"
                      ></span>

                      <div>
                        <span class="problem-solution-label">
                          {solutionLabel}
                        </span>

                        <p>{item.solution}</p>
                      </div>
                    </div>
                  </div>
                </details>
              {/each}
            </div>
          </div>
        </section>
      {/if}

      <!-- =====================================================

           SERVICES

      ====================================================== -->

      <section class="services-showcase" aria-label={title}>
        <div class="services-desktop-workspace">
          <nav class="service-trigger-list" aria-label={title}>
            {#each reorderedServices as service, index}
              <a
                class="service-trigger"
                class:active={activeServiceIndex === index}
                href={"#service-" + index}
                aria-current={activeServiceIndex === index ? "true" : undefined}
                onclick={(event) => scrollToService(event, index)}
              >
                {#if service.icon}
                  <img
                    src={service.icon}
                    alt=""
                    class="service-trigger-icon"
                    loading="lazy"
                    decoding="async"
                  />
                {/if}
                <span>{service.title}</span>
              </a>
            {/each}
          </nav>

          <div class="service-detail-list">
            {#each reorderedServices as service, index}
              <article
                class="service-detail-panel"
                class:active={activeServiceIndex === index}
                id={"service-" + index}
                use:observeServicePanel={index}
              >
                <div
                  class="service-bg-number service-detail-number"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div class="service-detail-heading">
                  <h3>{service.title}</h3>
                </div>

                <p class="service-detail-text">{service.text}</p>

                <div
                  class="service-tags service-detail-tags"
                  role="group"
                  aria-label={serviceKeywordsLabel}
                >
                  {#each getServiceTags(service) as tag}
                    <span>{tag}</span>
                  {/each}
                </div>
              </article>
            {/each}
          </div>
        </div>

        <div class="services-grid services-mobile-grid">
          {#each reorderedServices as service, index}
            <article class="service-card">
              <div class="service-bg-number" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div class="service-content">
                {#if service.icon}
                  <img
                    src={service.icon}
                    alt={service.alt ?? ""}
                    class="service-icon"
                    loading="lazy"
                    decoding="async"
                  />
                {/if}

                <h3>{service.title}</h3>
                <p>{service.text}</p>

                <div
                  class="service-tags"
                  role="group"
                  aria-label={serviceKeywordsLabel}
                >
                  {#each getServiceTags(service) as tag}
                    <span>{tag}</span>
                  {/each}
                </div>
              </div>
            </article>
          {/each}
        </div>
      </section>

      <!-- =====================================================

           FREE TOOLS

      ====================================================== -->

      <section class="free-tools-section" aria-labelledby="free-tools-title">
        <div class="free-tools-heading">
          <span>{toolsLabel}</span>

          <h2 id="free-tools-title">{toolsSectionTitle}</h2>
        </div>

        <div class="free-tools-grid">
          {#each toolLinks as tool}
            <a class="website-tool-card" href={tool.href} title={tool.title}>
              <div class="website-tool-card-inner">
                <div class="website-tool-topline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="website-tool-arrow"
                    aria-hidden="true"
                  >
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
                </div>

                <div class="website-tool-copy">
                  <h3>{tool.title}</h3>

                  <p>{tool.text}</p>
                </div>

                <span class="website-tool-cta">
                  {tool.linkLabel}
                </span>
              </div>
            </a>
          {/each}
        </div>

        <article class="tools-marquee-card" aria-label={toolsAlt}>
          <div class="tools-marquee">
            <div class="tools-marquee-track">
              {#each marqueeTools as tool, index}
                <div
                  class="tool-marquee-item"
                  aria-hidden={index >= tools.length}
                >
                  <img src={tool} alt="" loading="lazy" decoding="async" />
                </div>
              {/each}
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</section>

<style>
  /* =========================================================

     SECTION

  ========================================================= */

  .services {
    --type-label: 11px;

    --type-small: 13px;

    --type-body: 15px;

    --type-subheading: 18px;

    --type-heading: 28px;

    --weight-regular: 400;

    --weight-semibold: 600;

    --weight-bold: 700;

    --accent-blue: #0043ff;

    --about-content-width: 1100px;

    width: 100vw;

    margin-left: calc(50% - 50vw);

    padding: 0;

    overflow: clip;

    background: #0c0c0c;

    color: #ffffff;

    font-family: "Space Grotesk", Arial, sans-serif;

    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .services {
    background: #f7f7f4;

    color: #111111;
  }

  .services-shell {
    --shell-x: 40px;

    position: relative;

    width: min(1540px, calc(100% - 32px));

    margin: 0 auto;

    padding: 140px var(--shell-x);

    box-sizing: border-box;
  }

  .shell-line {
    position: absolute;

    top: 0;

    bottom: 0;

    width: 1px;

    background: rgba(255, 255, 255, 0.045);

    pointer-events: none;

    z-index: 0;
  }

  :global(body.light) .shell-line {
    background: rgba(0, 0, 0, 0.05);
  }

  .shell-bottom-line {
    position: absolute;

    right: 0;

    bottom: 0;

    left: 0;

    height: 1px;

    background: rgba(255, 255, 255, 0.05);

    pointer-events: none;
  }

  :global(body.light) .shell-bottom-line {
    background: rgba(0, 0, 0, 0.06);
  }

  .edge-left {
    left: 0;
  }

  .edge-right {
    right: 0;
  }

  .col-1 {
    left: calc(var(--shell-x) + ((100% - (var(--shell-x) * 2)) / 3));
  }

  .col-2 {
    left: calc(var(--shell-x) + (((100% - (var(--shell-x) * 2)) / 3) * 2));
  }

  .services-container {
    position: relative;

    z-index: 1;

    width: 100%;

    display: flex;

    flex-direction: column;
  }

  /* =========================================================

     ABOUT / EXPERIENCE WRAPPER

  ========================================================= */

  .premium-about {
    width: 100%;

    margin: 0 auto;

    padding: 0 0 92px;

    box-sizing: border-box;
  }

  /* =========================================================

     EXPERIENCE

     Desktop = four static columns. Tablet/mobile = slider.

  ========================================================= */

  .experience-rail {
    width: 100%;

    min-width: 0;

    margin: 0 0 38px;
  }

  .experience-toolbar {
    display: none;
  }

  .experience-list {
    position: relative;

    width: 100%;

    display: grid;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: 12px;

    margin: 0;

    padding: 0;
  }

  .experience-item {
    position: relative;

    min-width: 0;

    min-height: 13px;

    display: flex;

    align-items: center;

    padding: 20px 24px;

    border: 1px solid rgba(255, 255, 255, 0.16);

    border-top-color: rgba(255, 255, 255, 0.32);

    border-radius: 0;

    background: rgba(255, 255, 255, 0.018);

    box-sizing: border-box;
  }

  :global(body.light) .experience-item {
    border-color: rgba(0, 0, 0, 0.15);

    border-top-color: rgba(0, 0, 0, 0.28);

    background: rgba(0, 0, 0, 0.012);
  }

  .experience-copy {
    width: 100%;

    min-width: 0;

    display: flex;

    flex-direction: column;

    align-items: flex-start;
  }

  .experience-title {
    width: 100%;

    max-width: 100%;

    margin: 0;

    padding: 0;

    color: #ffffff;

    font-size: clamp(20px, 1.45vw, 24px);

    font-weight: 700;

    line-height: 1.16;

    letter-spacing: -0.015em;

    text-transform: uppercase;

    text-wrap: balance;
  }

  .experience-title-first {
    font-size: 1.1em;
  }

  .experience-title-rest {
    font-size: 0.72em;

    font-weight: 400;

    letter-spacing: 0.01em;
  }

  :global(body.light) .experience-title {
    color: #111111;
  }

  .experience-copy p:not(.experience-title) {
    max-width: 280px;

    margin: 11px 0 0;

    color: #8f8f8f;

    font-size: 12px;

    font-weight: 400;

    line-height: 1.5;

    letter-spacing: 0.015em;
  }

  :global(body.light) .experience-copy p:not(.experience-title) {
    color: rgba(0, 0, 0, 0.58);
  }

  /* =========================================================

     ABOUT

  ========================================================= */

  .about-editorial {
    width: 100%;

    min-width: 0;

    margin: 0;
  }

  .about-profile {
    position: relative;

    width: 100%;

    min-width: 0;

    overflow: hidden;

    border: 1px solid rgba(255, 255, 255, 0.13);

    background: #111111;

    box-sizing: border-box;

    isolation: isolate;
  }

  :global(body.light) .about-profile {
    border-color: rgba(0, 0, 0, 0.14);

    background: #e7e7e7;
  }

  .about-image-wrap {
    position: relative;

    z-index: 0;

    width: 100%;

    height: 70vh;

    min-height: 520px;

    max-height: 760px;

    display: flex;

    align-items: center;

    justify-content: center;

    overflow: hidden;

    background: #111111;
  }

  .about-image-wrap::after {
    content: "";

    position: absolute;

    inset: auto 0 0;

    z-index: 1;

    height: 24%;

    pointer-events: none;

    background: linear-gradient(
      to top,

      rgba(8, 8, 8, 0.46) 0%,

      rgba(8, 8, 8, 0.14) 48%,

      rgba(8, 8, 8, 0) 100%
    );
  }

  .about-image-wrap img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: cover;

    object-position: left top;

    background: transparent;

    filter: grayscale(1);
  }

  .about-editorial-title {
    position: absolute;

    right: 0;

    bottom: 16px;

    left: 0;

    z-index: 3;

    width: 100%;

    margin: 0;

    overflow: hidden;

    color: #ffffff;

    font-size: clamp(36px, 4.455vw, 70px);

    font-weight: 500;

    line-height: 0.92;

    letter-spacing: 0.01em;

    text-transform: uppercase;

    white-space: nowrap;

    pointer-events: none;
  }

  .about-title-track {
    width: max-content;

    display: flex;

    will-change: transform;

    animation: aboutTitleMarquee 25s linear infinite;
  }

  .about-title-run {
    flex: 0 0 auto;

    display: inline-flex;

    align-items: center;

    gap: 0.3em;

    padding-right: 0.3em;

    color: rgba(255, 255, 255, 0.94);
  }

  .about-title-separator {
    color: var(--accent-blue);

    font-weight: 400;
  }

  @keyframes aboutTitleMarquee {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      transform: translate3d(-50%, 0, 0);
    }
  }

  .about-below-copy {
    width: 100%;

    display: grid;

    grid-template-columns: minmax(0, 1.45fr) minmax(240px, 0.55fr);

    gap: clamp(48px, 7vw, 110px);

    align-items: center;

    padding: 34px 0 0;

    box-sizing: border-box;
  }

  .about-top-copy {
    min-width: 0;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    text-align: left;
  }

  .about-kicker {
    display: inline-flex;

    align-items: center;

    gap: 12px;

    margin: 0;

    color: #ffffff;

    font-size: 12px;

    font-weight: var(--weight-bold);

    line-height: 1;

    letter-spacing: 0.14em;

    text-transform: uppercase;
  }

  :global(body.light) .about-kicker {
    color: #111111;
  }

  .about-editorial-text {
    width: 100%;

    max-width: 680px;

    margin: 18px 0 0;

    color: #9a9a9a;

    font-size: 17px;

    font-weight: 400;

    line-height: 1.68;

    text-align: left;

    text-wrap: pretty;
  }

  :global(body.light) .about-editorial-text {
    color: rgba(0, 0, 0, 0.66);
  }

  .about-editorial-figure {
    width: fit-content;

    min-width: 0;

    justify-self: end;

    align-self: center;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 5px;

    margin: 0;

    padding: 0;

    border-left: 0;

    text-align: left;

    box-sizing: border-box;
  }

  .profile-name {
    color: #ffffff;

    font-size: 12px;

    font-weight: var(--weight-bold);

    line-height: 1.3;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  :global(body.light) .profile-name {
    color: #111111;
  }

  .profile-role {
    max-width: 100%;

    color: #888888;

    font-size: 13px;

    font-weight: var(--weight-semibold);

    line-height: 1.45;

    letter-spacing: 0.07em;

    text-align: left;

    text-transform: uppercase;
  }

  :global(body.light) .profile-role {
    color: rgba(0, 0, 0, 0.56);
  }

  .sr-only {
    position: absolute;

    width: 1px;

    height: 1px;

    padding: 0;

    margin: -1px;

    overflow: hidden;

    clip: rect(0, 0, 0, 0);

    white-space: nowrap;

    border: 0;
  }

  /* =========================================================

     SERVICES HEADER

  ========================================================= */

  .services-header {
    width: 100%;

    margin: 112px 0 78px;

    box-sizing: border-box;

    border-bottom: 1px solid var(--accent-blue);

    background: transparent;

    color: #f2f2f2;

    opacity: 0;

    transform: translateY(18px);

    transition:
      opacity 0.7s ease,
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .services-header.visible {
    opacity: 1;

    transform: translateY(0);
  }

  .services-header-inner {
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

  .services-header-main {
    --services-title-marker-size: clamp(12px, 1.075vw, 17px);

    min-width: 0;

    display: grid;

    grid-template-columns: var(--services-title-marker-size) minmax(0, 1fr);

    align-items: start;

    gap: 16px;
  }

  .services-header-main::before {
    width: var(--services-title-marker-size);

    height: var(--services-title-marker-size);

    margin-top: 0.48em;

    border-radius: 50%;

    background: var(--accent-blue);

    content: "";

    transform-origin: center;

    animation: services-title-pulse 1.65s ease-in-out infinite;

    will-change: transform, box-shadow;
  }

  @keyframes services-title-pulse {
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

  .services-header h2 {
    max-width: 720px;

    margin: 0;

    color: #f2f2f2;

    font-size: clamp(24px, 2.15vw, 34px);

    line-height: 1.12;

    letter-spacing: -0.035em;

    font-weight: 500;

    text-transform: none;
  }

  .services-subtitle {
    max-width: 520px;

    margin: 0;

    padding: 0;

    color: rgba(255, 255, 255, 0.62);

    font-size: 16px;

    font-weight: 400;

    line-height: 1.65;

    letter-spacing: 0;
  }

  :global(body.light) .services-header {
    background: transparent;

    color: #111111;
  }

  :global(body.light) .services-header h2 {
    color: #111111;
  }

  :global(body.light) .services-subtitle {
    color: rgba(0, 0, 0, 0.62);
  }

  @media (min-width: 1025px) {
    .services-subtitle {
      width: min(460px, 100%);

      justify-self: end;

      margin-left: auto;

      margin-right: 0;

      padding-right: 0;

      text-align: left;
    }
  }

  /* =========================================================

     PROBLEM / SOLUTION

  ========================================================= */

  .problem-workspace {
    width: 100%;

    display: grid;

    grid-template-columns: minmax(240px, 0.64fr) minmax(0, 1.36fr);

    gap: clamp(42px, 5vw, 78px);

    align-items: start;

    margin-bottom: 112px;
  }

  .problem-intro {
    position: sticky;

    top: 120px;

    display: flex;

    flex-direction: row;

    align-items: flex-start;

    justify-content: flex-start;

    gap: 14px;

    padding: 0;
  }

  .problem-intro h3 {
    flex: 0 1 auto;

    max-width: 280px;

    margin: 0;

    color: #ffffff;

    font-size: var(--type-subheading);

    font-weight: var(--weight-semibold);

    line-height: 1.52;

    letter-spacing: 0.045em;

    text-transform: uppercase;
  }

  :global(body.light) .problem-intro h3 {
    color: #111111;
  }

  .problem-direction-arrow {
    width: 30px;

    height: 30px;

    flex: 0 0 30px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    margin-top: -3px;

    border: 1px solid var(--accent-blue);

    color: var(--accent-blue);

    font-size: 17px;

    font-weight: var(--weight-regular);

    line-height: 1;
  }

  .problem-direction-mobile {
    display: none;
  }

  .problem-accordion-column {
    min-width: 0;
  }

  .problem-accordion {
    width: 100%;

    border-top: 0;
  }

  .problem-item + .problem-item {
    margin-top: 4px;
  }

  .problem-item {
    padding: 0;

    border: 0;

    background: transparent;
  }

  .problem-item summary {
    min-height: 76px;

    display: grid;

    grid-template-columns: 36px minmax(0, 1fr) 34px;

    align-items: center;

    gap: 18px;

    padding: 18px 0;

    color: #ffffff;

    cursor: pointer;

    list-style: none;

    box-sizing: border-box;
  }

  .problem-item summary::before {
    content: "";
    width: 22px;
    height: 1px;
    display: block;
    background: var(--accent-blue);
    transition: width 0.22s ease;
  }

  .problem-item[open] summary::before {
    width: 32px;
  }

  .problem-item summary::-webkit-details-marker {
    display: none;
  }

  .problem-item summary::marker {
    content: "";
  }

  :global(body.light) .problem-item summary {
    color: #111111;
  }

  .problem-item-title {
    width: fit-content;

    max-width: 100%;

    margin: 0;

    color: #ffffff;

    font-size: var(--type-small);

    font-weight: var(--weight-semibold);

    line-height: 1.4;

    letter-spacing: 0.045em;

    text-decoration: none;

    text-transform: uppercase;
  }

  :global(body.light) .problem-item-title {
    color: #111111;
  }

  .problem-item-toggle {
    width: 30px;

    height: 30px;

    flex: 0 0 30px;

    display: inline-flex;

    align-items: center;

    justify-content: center;

    justify-self: end;

    padding: 0;

    border: 0;

    color: var(--accent-blue);

    font-size: 25px;

    font-weight: 300;

    line-height: 1;

    background: transparent;
  }

  .problem-item[open],
  .problem-item[open] summary,
  :global(body.light) .problem-item[open],
  :global(body.light) .problem-item[open] summary {
    padding-right: 0;

    padding-left: 0;

    border-right: 0;

    border-left: 0;

    background: transparent;
  }

  .problem-item-content {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 34px;

    margin-left: 28px;

    padding: 10px 0 34px;

    border-top: 0;
  }

  .problem-solution-row {
    display: grid;

    grid-template-columns: 10px minmax(0, 1fr);

    gap: 13px;

    align-items: start;

    padding-left: 14px;
  }

  .problem-solution-row:first-child {
    border-left: 1px solid #f2c94c;
  }

  .problem-solution-row:last-child {
    border-left: 1px solid var(--accent-blue);
  }

  .problem-solution-marker {
    width: 9px;

    height: 9px;

    margin-top: 4px;
  }

  .problem-marker {
    background: #f2c94c;
    border: 0;
    box-sizing: border-box;
  }

  .solution-marker {
    background: var(--accent-blue);
  }

  .problem-solution-label {
    display: block;

    margin-bottom: 8px;

    color: #ffffff;

    font-size: var(--type-label);

    font-weight: var(--weight-bold);

    line-height: 1.2;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  :global(body.light) .problem-solution-label {
    color: #111111;
  }

  .problem-solution-row p {
    margin: 0;

    color: #a5a5a5;

    font-size: 14px;

    font-weight: var(--weight-regular);

    line-height: 1.58;
  }

  :global(body.light) .problem-solution-row p {
    color: rgba(0, 0, 0, 0.68);
  }

  /* =========================================================

     SERVICES

     Desktop/tablet = navigation list + all service details.

     Mobile = original cards.

  ========================================================= */

  .services-showcase {
    width: 100%;
    padding: clamp(30px, 3.3vw, 48px);
    background: rgba(255, 255, 255, 0.022);
    box-sizing: border-box;
  }

  :global(body.light) .services-showcase {
    background: rgba(0, 0, 0, 0.025);
  }

  .services-desktop-workspace {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(220px, 0.58fr) minmax(0, 1.42fr);
    gap: clamp(54px, 6vw, 94px);
    align-items: start;
  }

  .service-trigger-list {
    position: sticky;
    top: 120px;
    align-self: start;
    max-height: calc(100vh - 160px);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 2px;
  }

  .service-trigger {
    position: relative;
    width: 100%;
    min-height: 52px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 11px;
    padding: 9px 0;
    border: 0;
    border-radius: 0;
    background: transparent;
    color: #777777;
    font: inherit;
    font-size: 20px;
    font-weight: 650;
    line-height: 1.25;
    letter-spacing: 0.025em;
    text-align: left;
    text-decoration: none;
    text-transform: uppercase;
    transition: color 0.2s ease;
  }

  .service-trigger::after {
    content: "";
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    margin-left: auto;
    border-radius: 50%;
    background: var(--accent-blue);
    opacity: 0;
    transform: scale(0);
    transition:
      opacity 0.2s ease,
      transform 0.22s ease;
  }

  .service-trigger:hover,
  .service-trigger:focus-visible,
  .service-trigger.active {
    color: #ffffff;
    outline: none;
  }

  .service-trigger.active::after,
  .service-trigger:hover::after,
  .service-trigger:focus-visible::after {
    opacity: 1;
    transform: scale(1);
  }

  .service-trigger-list:has(.service-trigger:hover)
    .service-trigger.active:not(:hover)::after {
    opacity: 0;
    transform: scale(0);
  }

  .service-trigger-list:has(.service-trigger:focus-visible)
    .service-trigger.active:not(:focus-visible)::after {
    opacity: 0;
    transform: scale(0);
  }

  :global(body.light) .service-trigger {
    color: rgba(0, 0, 0, 0.48);
  }

  :global(body.light) .service-trigger:hover,
  :global(body.light) .service-trigger:focus-visible,
  :global(body.light) .service-trigger.active {
    color: #111111;
  }

  .service-trigger-icon {
    width: 20px;
    height: 20px;
    flex: 0 0 20px;
    display: block;
    object-fit: contain;
    filter: brightness(0) invert(1);
    opacity: 0.42;
    transition: opacity 0.2s ease;
  }

  .service-trigger:hover .service-trigger-icon,
  .service-trigger:focus-visible .service-trigger-icon,
  .service-trigger.active .service-trigger-icon {
    opacity: 1;
  }

  :global(body.light) .service-trigger-icon {
    filter: brightness(0);
    opacity: 0.38;
  }

  :global(body.light) .service-trigger:hover .service-trigger-icon,
  :global(body.light) .service-trigger:focus-visible .service-trigger-icon,
  :global(body.light) .service-trigger.active .service-trigger-icon {
    opacity: 1;
  }

  .service-detail-list {
    min-width: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  :global(body.light) .service-detail-list {
    border-top-color: rgba(0, 0, 0, 0.14);
  }

  .service-detail-panel {
    position: relative;
    min-width: 0;
    min-height: 255px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 38px 94px 38px 22px;
    overflow: hidden;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
    background: transparent;
    box-shadow: inset 0 0 0 rgba(255, 255, 255, 0);
    box-sizing: border-box;
    scroll-margin-top: 110px;
    transition:
      background-color 0.25s ease,
      box-shadow 0.25s ease;
  }

  .service-detail-panel.active {
    background: rgba(255, 255, 255, 0.045);
    box-shadow: inset 1px 0 0 rgba(255, 255, 255, 0.5);
  }

  :global(body.light) .service-detail-panel {
    border-bottom-color: rgba(0, 0, 0, 0.14);
  }

  :global(body.light) .service-detail-panel.active {
    background: rgba(0, 0, 0, 0.035);
    box-shadow: inset 1px 0 0 rgba(0, 0, 0, 0.4);
  }

  .service-detail-heading {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .service-detail-heading h3 {
    max-width: 680px;
    margin: 0;
    color: #737373;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    transition: color 0.25s ease;
  }

  :global(body.light) .service-detail-heading h3 {
    color: rgba(0, 0, 0, 0.44);
  }

  .service-detail-panel.active .service-detail-heading h3 {
    color: #ffffff;
  }

  :global(body.light) .service-detail-panel.active .service-detail-heading h3 {
    color: #111111;
  }

  .service-detail-text {
    position: relative;
    z-index: 1;
    max-width: 720px;
    margin: 18px 0 0;
    color: #6f6f6f;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.5;
    text-wrap: pretty;
    transition: color 0.25s ease;
  }

  :global(body.light) .service-detail-text {
    color: rgba(0, 0, 0, 0.46);
  }

  .service-detail-panel.active .service-detail-text {
    color: rgba(255, 255, 255, 0.62);
  }

  :global(body.light) .service-detail-panel.active .service-detail-text {
    color: rgba(0, 0, 0, 0.78);
  }

  @media (min-width: 1025px) {
    .service-trigger {
      font-size: 18.4px;
    }

    .problem-item summary {
      grid-template-columns: 10px minmax(0, 1fr) 34px;
    }

    .problem-item summary::before,
    .problem-item[open] summary::before {
      width: 7px;
      height: 7px;
      display: block;
      border-radius: 50%;
    }

    .about-below-copy {
      align-items: start;
    }

    .about-editorial-figure {
      align-self: start;
    }

    .profile-name {
      line-height: 1;
    }

    .profile-role {
      margin-top: 18px;
      line-height: 1.68;
    }

    .profile-role > span {
      display: block;
    }

    .service-detail-panel {
      padding-top: 42px;
      padding-bottom: 42px;
    }

    .service-detail-text {
      width: min(620px, calc(100% - 110px));
      max-width: none;
      text-wrap: pretty;
      text-align: left;
    }
  }

  .service-detail-number {
    z-index: 0;
  }

  .service-detail-tags {
    position: relative;
    z-index: 1;
    margin-top: 18px;
  }

  .service-detail-tags span {
    font-weight: 400;
  }

  .services-mobile-grid {
    display: none;
  }

  .services-grid {
    width: 100%;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 0;
  }

  .service-card {
    position: relative;
    min-height: 360px;
    display: flex;
    padding: 34px 34px 38px 10px;
    overflow: hidden;
    box-sizing: border-box;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  :global(body.light) .service-card {
    border-top-color: rgba(0, 0, 0, 0.1);
  }

  .services-grid > .service-card:nth-child(3n + 2),
  .services-grid > .service-card:nth-child(3n + 3) {
    padding-left: 40px;
    border-left: 1px solid rgba(255, 255, 255, 0.08);
  }

  :global(body.light) .services-grid > .service-card:nth-child(3n + 2),
  :global(body.light) .services-grid > .service-card:nth-child(3n + 3) {
    border-left-color: rgba(0, 0, 0, 0.08);
  }

  .service-bg-number {
    position: absolute;
    top: 18px;
    right: 18px;
    color: rgba(180, 180, 180, 0.09);
    font-size: clamp(5rem, 8vw, 8rem);
    font-weight: 800;
    line-height: 0.9;
    pointer-events: none;
  }

  :global(body.light) .service-bg-number {
    color: rgba(0, 0, 0, 0.07);
  }

  .service-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 450px;
    display: flex;
    flex-direction: column;
  }

  .service-icon {
    width: 42px;
    height: 42px;
    display: block;
    margin-bottom: 22px;
    object-fit: contain;
  }

  :global(body.light) .service-icon {
    filter: invert(1) brightness(0.12);
  }

  .service-content h3 {
    margin: 0 0 14px;
    color: #ffffff;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.15;
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }

  :global(body.light) .service-content h3 {
    color: #111111;
  }

  .service-content p {
    margin: 0;
    color: #989898;
    font-size: 16px;
    line-height: 1.5;
  }

  :global(body.light) .service-content p {
    color: rgba(0, 0, 0, 0.68);
  }

  .service-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 18px;
  }

  @media (min-width: 768px) {
    .problem-item[open] {
      border-top: 1px solid rgba(160, 160, 160, 0.32);
      border-bottom: 1px solid rgba(160, 160, 160, 0.32);
    }

    .service-content {
      height: 100%;
    }

    .service-tags {
      margin-top: auto;
      padding-top: 18px;
    }

    .service-detail-tags {
      margin-top: 18px;
      padding-top: 0;
    }
  }

  .service-tags span {
    min-height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 0;
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 1;
    text-transform: uppercase;
  }

  :global(body.light) .service-tags span {
    border-color: rgba(0, 0, 0, 0.28);
    color: #111111;
  }

  .service-detail-panel:not(.active) .service-detail-tags span {
    border-color: rgba(255, 255, 255, 0.16);
    color: rgba(255, 255, 255, 0.44);
  }

  .service-detail-panel.active .service-detail-tags span {
    border-color: rgba(255, 255, 255, 0.42);
    color: #ffffff;
  }

  :global(body.light)
    .service-detail-panel:not(.active)
    .service-detail-tags
    span {
    border-color: rgba(0, 0, 0, 0.16);
    color: rgba(0, 0, 0, 0.44);
  }

  :global(body.light) .service-detail-panel.active .service-detail-tags span {
    border-color: rgba(0, 0, 0, 0.32);
    color: #111111;
  }

  /* =========================================================

     FREE TOOLS

  ========================================================= */

  .free-tools-section {
    margin-top: 120px;
  }

  .free-tools-heading {
    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 13px;

    margin-bottom: 42px;
  }

  .free-tools-heading > span {
    color: var(--accent-blue);

    font-size: var(--type-label);

    font-weight: var(--weight-bold);

    line-height: 1;

    letter-spacing: 0.15em;

    text-transform: uppercase;
  }

  :global(body.light) .free-tools-heading > span {
    color: var(--accent-blue);
  }

  .free-tools-heading h2 {
    max-width: 760px;

    margin: 0;

    color: #ffffff;

    font-size: 20px;

    font-weight: var(--weight-semibold);

    line-height: 1.3;

    letter-spacing: 0.035em;

    text-transform: uppercase;
  }

  :global(body.light) .free-tools-heading h2 {
    color: #111111;
  }

  .free-tools-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 14px;
  }

  .website-tool-card {
    min-width: 0;

    min-height: 390px;

    display: block;

    padding: 34px;

    border: 1px solid rgba(255, 255, 255, 0.26);

    color: #ffffff;

    text-decoration: none;

    box-sizing: border-box;

    overflow: hidden;
  }

  :global(body.light) .website-tool-card {
    border-color: rgba(0, 0, 0, 0.26);

    color: #111111;
  }

  .website-tool-card-inner {
    height: 100%;

    display: flex;

    flex-direction: column;
  }

  .website-tool-topline {
    display: flex;

    justify-content: flex-end;

    align-items: flex-start;
  }

  .website-tool-arrow {
    width: 18px;

    height: 18px;

    flex: 0 0 18px;

    display: block;

    color: var(--accent-blue);
  }

  .website-tool-copy {
    margin-top: 58px;
  }

  .website-tool-copy h3 {
    max-width: 520px;

    margin: 0;

    color: inherit;

    font-size: 20px;

    font-weight: var(--weight-semibold);

    line-height: 1.25;

    letter-spacing: 0.035em;

    text-transform: uppercase;
  }

  .website-tool-copy p {
    max-width: 460px;

    margin: 22px 0 0;

    color: #989898;

    font-size: var(--type-body);

    font-weight: var(--weight-regular);

    line-height: 1.58;
  }

  :global(body.light) .website-tool-copy p {
    color: rgba(0, 0, 0, 0.68);
  }

  .website-tool-cta {
    width: fit-content;

    margin-top: auto;

    padding: 30px 0 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: #ffffff;

    font-size: 12px;

    font-weight: var(--weight-bold);

    line-height: 1.2;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  :global(body.light) .website-tool-cta {
    color: #111111;
  }

  .tools-marquee-card {
    margin: 20px 0 0;

    padding: 28px 0 24px;

    border-top: 1px solid rgba(255, 255, 255, 0.22);

    border-bottom: 1px solid rgba(255, 255, 255, 0.22);

    overflow: hidden;
  }

  :global(body.light) .tools-marquee-card {
    border-color: rgba(0, 0, 0, 0.22);
  }

  .tools-marquee {
    width: 100%;

    overflow: hidden;

    mask-image: linear-gradient(
      to right,

      transparent,
      black 5%,

      black 95%,

      transparent
    );
  }

  .tools-marquee-track {
    width: max-content;

    display: flex;

    align-items: center;

    gap: 54px;

    animation: toolsMarquee 28s linear infinite;
  }

  .tool-marquee-item {
    width: 110px;

    height: 76px;

    flex: 0 0 110px;

    display: flex;

    align-items: center;

    justify-content: center;
  }

  .tool-marquee-item img {
    width: 110px;

    height: 110px;

    display: block;

    object-fit: contain;
  }

  :global(body.light) .tool-marquee-item img {
    filter: invert(1) brightness(0.12);
  }

  @keyframes toolsMarquee {
    from {
      transform: translate3d(0, 0, 0);
    }

    to {
      transform: translate3d(calc(-50% - 27px), 0, 0);
    }
  }

  /* =========================================================

     TABLET

  ========================================================= */

  @media (min-width: 768px) and (max-width: 1024px) {
    .services-shell {
      --shell-x: 0px;

      width: 90%;

      padding: 110px var(--shell-x) 96px;
    }

    .edge-left,
    .edge-right,
    .col-2,
    .shell-bottom-line {
      display: none;
    }

    .col-1 {
      left: 50%;

      opacity: 0.55;
    }

    .premium-about {
      padding: 0 0 70px;
    }

    /* =====================================================

       TABLET EXPERIENCE / ABOUT

    ====================================================== */

    .experience-rail {
      width: 100%;

      margin-bottom: 32px;
    }

    .experience-toolbar {
      min-height: 42px;

      display: flex;

      align-items: center;

      justify-content: flex-end;

      gap: 24px;

      margin-bottom: 16px;
    }

    .experience-controls {
      display: flex;

      align-items: center;

      gap: 8px;
    }

    .experience-nav {
      width: 40px;

      height: 40px;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      padding: 0;

      border: 1px solid rgba(255, 255, 255, 0.28);

      border-radius: 0;

      background: transparent;

      color: #ffffff;

      font: inherit;

      font-size: 17px;

      line-height: 1;

      cursor: pointer;
    }

    :global(body.light) .experience-nav {
      border-color: rgba(0, 0, 0, 0.24);

      color: #111111;
    }

    .experience-list {
      display: flex;

      grid-template-columns: none;

      gap: 14px;

      overflow-x: auto;

      overflow-y: hidden;

      scroll-snap-type: x mandatory;

      scroll-behavior: smooth;

      scrollbar-width: none;

      overscroll-behavior-inline: contain;
    }

    .experience-list::-webkit-scrollbar {
      display: none;
    }

    .experience-item {
      min-height: 16px;

      flex: 0 0 calc((100% - 14px) / 2);

      align-items: center;

      padding: 21px 22px;

      scroll-snap-align: start;
    }

    .experience-title {
      font-size: 21px;

      font-weight: 700;

      line-height: 1.18;
    }

    .experience-copy p:not(.experience-title) {
      margin-top: 9px;

      font-size: 11px;
    }

    .about-profile {
      padding: 0;
    }

    .about-image-wrap {
      width: 100%;

      height: auto;

      min-height: 0;

      max-height: none;

      aspect-ratio: 16 / 10;
    }

    .about-image-wrap img {
      object-position: left top;
    }

    .about-editorial-title {
      bottom: 10px;

      font-size: clamp(29px, 4.59vw, 45px);
    }

    .about-below-copy {
      grid-template-columns: 1fr;
      align-items: start;
      gap: 24px;
      padding-top: 28px;
    }

    .about-kicker {
      font-size: 11px;
    }

    .about-editorial-text {
      max-width: 100%;

      margin-top: 14px;

      font-size: 15px;

      line-height: 1.6;
    }

    .about-editorial-figure {
      width: 100%;
      max-width: none;
      justify-self: start;
      align-self: start;
      padding-left: 0;
    }

    .profile-role {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }

    .profile-role > span {
      display: inline-flex;
      align-items: center;
    }

    .profile-role > span:not(:last-child)::after {
      content: "·";
      margin-left: 6px;
    }

    .services-header {
      margin: 92px 0 62px;
    }

    .services-header-inner {
      min-height: 0;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 36px 0;
    }

    .services-header h2 {
      font-size: 24px;

      line-height: 1.15;
    }

    .services-subtitle {
      font-size: 13px;

      line-height: 1.55;
    }

    .problem-workspace {
      grid-template-columns: 180px minmax(0, 1fr);

      gap: 30px;

      margin-bottom: 82px;
    }

    .problem-intro {
      top: 90px;

      gap: 10px;
    }

    .problem-intro h3 {
      max-width: 150px;

      font-size: 16px;

      line-height: 1.55;
    }

    .problem-direction-arrow {
      width: 28px;

      height: 28px;

      flex-basis: 28px;
    }

    .problem-item summary {
      min-height: 62px;

      grid-template-columns: 10px minmax(0, 1fr) 30px;

      gap: 10px;

      padding: 14px 0;
    }

    .problem-item summary::before,
    .problem-item[open] summary::before {
      width: 7px;
      height: 7px;
      display: block;
      border-radius: 50%;
    }

    .problem-item-title {
      font-size: 9.9px;
    }

    .problem-item-toggle {
      width: 28px;

      height: 28px;

      font-size: 23px;
    }

    .problem-item-content {
      grid-template-columns: 1fr;

      gap: 20px;

      margin-left: 20px;

      padding: 10px 0 30px;
    }

    .services-showcase {
      padding: 28px;
    }

    .services-desktop-workspace {
      grid-template-columns: minmax(180px, 0.58fr) minmax(0, 1.42fr);

      gap: 34px;
    }

    .service-trigger-list {
      top: 90px;
    }

    .service-trigger {
      min-height: 48px;

      gap: 10px;

      padding: 8px 0;

      font-size: 16.2px;
    }

    .service-trigger-icon {
      width: 18px;

      height: 18px;

      flex-basis: 18px;
    }

    .service-detail-panel {
      min-height: 230px;

      padding: 32px 76px 32px 18px;

      scroll-margin-top: 88px;
    }

    .service-detail-heading h3 {
      font-size: 18px;
    }

    .service-detail-text {
      width: 100%;

      max-width: 100%;

      margin-top: 16px;

      font-size: 14px;

      line-height: 1.55;

      text-wrap: pretty;
    }

    .service-detail-tags {
      margin-top: 16px;
    }

    .free-tools-section {
      margin-top: 92px;
    }

    .website-tool-card {
      min-height: 330px;

      padding: 28px;
    }

    .website-tool-copy {
      margin-top: 54px;
    }

    .tools-marquee-track {
      gap: 38px;
    }
  }

  /* =========================================================

     MOBILE

  ========================================================= */

  @media (max-width: 767px) {
    .services-shell {
      --shell-x: 0px;

      width: calc(100% - 40px);

      margin: 0 auto;

      padding: 110px var(--shell-x) 72px;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
    }

    .premium-about {
      padding: 0 0 62px;
    }

    /* =====================================================

       MOBILE EXPERIENCE / ABOUT

    ====================================================== */

    .experience-rail {
      width: 100%;

      margin-bottom: 28px;

      box-sizing: border-box;
    }

    .experience-toolbar {
      min-height: 40px;

      display: flex;

      align-items: center;

      justify-content: flex-end;

      gap: 20px;

      margin-bottom: 14px;
    }

    .experience-controls {
      display: flex;

      align-items: center;

      gap: 8px;
    }

    .experience-nav {
      width: 38px;

      height: 38px;

      display: inline-flex;

      align-items: center;

      justify-content: center;

      padding: 0;

      border: 1px solid rgba(255, 255, 255, 0.28);

      border-radius: 0;

      background: transparent;

      color: #ffffff;

      font: inherit;

      font-size: 17px;

      line-height: 1;

      cursor: pointer;
    }

    :global(body.light) .experience-nav {
      border-color: rgba(0, 0, 0, 0.24);

      color: #111111;
    }

    .experience-list {
      display: flex;

      grid-template-columns: none;

      gap: 12px;

      overflow-x: auto;

      overflow-y: hidden;

      scroll-snap-type: x mandatory;

      scroll-behavior: smooth;

      scroll-padding-inline: 0;

      scrollbar-width: none;

      overscroll-behavior-inline: contain;
    }

    .experience-list::-webkit-scrollbar {
      display: none;
    }

    .experience-item {
      min-height: 14px;

      flex: 0 0 calc((100% - 12px) / 2);

      align-items: center;

      padding: 19px 20px;

      scroll-snap-align: start;
    }

    .experience-title {
      font-size: 20px;

      font-weight: 700;

      line-height: 1.18;
    }

    .experience-title-first {
      font-size: 0.88em;

      font-weight: 700;
    }

    .experience-copy p:not(.experience-title) {
      display: block;

      margin-top: 9px;

      font-size: 11px;
    }

    .about-editorial {
      width: 100%;

      max-width: none;

      margin: 0;
    }

    .about-profile {
      width: 100%;

      max-width: none;

      margin: 0;

      padding: 0;
    }

    .about-image-wrap {
      width: 100%;

      height: auto;

      min-height: 0;

      max-height: none;

      aspect-ratio: 4 / 5;
    }

    .about-image-wrap img {
      object-position: 42% center;
    }

    .about-image-wrap::after {
      height: 28%;

      background: linear-gradient(
        to top,

        rgba(8, 8, 8, 0.48) 0%,

        rgba(8, 8, 8, 0.14) 50%,

        rgba(8, 8, 8, 0) 100%
      );
    }

    .about-editorial-title {
      bottom: 8px;

      font-size: clamp(21px, 6.3vw, 31px);

      line-height: 0.92;
    }

    .about-title-track {
      animation-duration: 21s;
    }

    .about-below-copy {
      grid-template-columns: 1fr;

      align-items: start;

      gap: 24px;

      padding-top: 24px;
    }

    .about-top-copy {
      width: 100%;
    }

    .about-kicker {
      gap: 0;

      font-size: 10px;
    }

    .about-editorial-text {
      max-width: 100%;

      margin-top: 12px;

      font-size: 12.5px;

      line-height: 1.6;
    }
    .about-editorial-figure {
      width: 100%;
      max-width: none;
      justify-self: start;
      align-self: start;
      gap: 4px;
      padding-left: 0;
    }

    .profile-role {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 6px;
    }

    .profile-role > span {
      display: inline-flex;
      align-items: center;
    }

    .profile-role > span:not(:last-child)::after {
      content: "·";
      margin-left: 6px;
    }

    .profile-name {
      font-size: 11px;
    }

    .profile-role {
      max-width: none;

      font-size: 9.5px;

      line-height: 1.4;
    }

    .services-header {
      margin: 76px 0 50px;
    }

    .services-header-inner {
      min-height: 0;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      gap: 24px;

      padding: 32px 0;
    }

    .services-header-main {
      --services-title-marker-size: clamp(11px, 3vw, 13.5px);

      width: 100%;
    }

    .services-header h2 {
      max-width: 100%;

      font-size: clamp(22px, 6vw, 27px);

      line-height: 1.15;
    }

    .services-subtitle {
      max-width: 100%;

      font-size: 14px;

      line-height: 1.6;
    }

    .problem-workspace {
      grid-template-columns: 1fr;

      gap: 30px;

      margin-bottom: 68px;
    }

    .problem-intro {
      position: static;

      align-items: flex-start;

      gap: 12px;
    }

    .problem-intro h3 {
      max-width: calc(100% - 42px);

      font-size: 17px;

      line-height: 1.55;
    }

    .problem-direction-arrow {
      width: 28px;

      height: 28px;

      flex-basis: 28px;

      margin-top: -2px;

      font-size: 17px;
    }

    .problem-direction-desktop {
      display: none;
    }

    .problem-direction-mobile {
      display: inline;
    }

    .problem-item {
      border-bottom: 1px solid rgba(160, 160, 160, 0.32);
    }

    .problem-item summary {
      min-height: 56px;

      grid-template-columns: minmax(0, 1fr) 28px;

      gap: 9px;

      padding: 12px 0;
    }

    .problem-item summary::before {
      display: none;
    }

    .problem-item-title {
      font-size: 10px;

      line-height: 1.7;

      text-underline-offset: 5px;
    }

    .problem-item-toggle {
      width: 26px;

      height: 26px;

      font-size: 22px;
    }

    .problem-item-content {
      grid-template-columns: 1fr;

      gap: 20px;

      margin-left: 0;

      padding: 8px 0 28px;
    }

    .problem-solution-label {
      font-size: 9px;
    }

    .problem-solution-row p {
      font-size: 12.5px;
    }

    .services-showcase {
      padding: 0;

      background: transparent;
    }

    :global(body.light) .services-showcase {
      background: transparent;
    }

    .services-desktop-workspace {
      display: none;
    }

    .services-mobile-grid {
      display: grid;

      grid-template-columns: 1fr;
    }

    .service-card,
    .services-grid > .service-card:nth-child(3n + 2),
    .services-grid > .service-card:nth-child(3n + 3),
    .services-grid > .service-card:nth-child(2n + 2) {
      min-height: 280px;

      padding: 28px 18px 30px 10px;

      border-left: 0;

      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    }

    :global(body.light) .service-card {
      border-bottom-color: rgba(0, 0, 0, 0.1);
    }

    .service-bg-number {
      top: 14px;

      right: 8px;

      font-size: clamp(5.2rem, 26vw, 7.2rem);
    }

    .service-content {
      height: auto;

      justify-content: flex-end;
    }

    /*

     * Mobile keeps its original natural tag position.

     */

    .service-tags {
      margin-top: 18px;

      padding-top: 0;
    }

    .service-content p {
      max-width: 95%;

      font-size: 15px;
    }

    .service-tags span {
      font-size: 11px;
    }

    .free-tools-section {
      margin-top: 78px;
    }

    .free-tools-heading {
      gap: 11px;

      margin-bottom: 30px;
    }

    .free-tools-heading h2 {
      font-size: 18px;
    }

    .free-tools-grid {
      grid-template-columns: 1fr;

      gap: 12px;
    }

    .website-tool-card {
      min-height: 300px;

      padding: 26px 22px;
    }

    .website-tool-copy {
      margin-top: 44px;
    }

    .website-tool-copy h3 {
      font-size: 18px;
    }

    .tools-marquee-card {
      margin: 14px 0 0;

      padding: 24px 0 20px;
    }

    .tools-marquee-track {
      gap: 28px;

      animation-duration: 22s;
    }

    .tool-marquee-item {
      width: 82px;

      height: 58px;

      flex-basis: 82px;
    }

    .tool-marquee-item img {
      width: 82px;

      height: 82px;
    }
  }

  /* =========================================================

     SMALL MOBILE

  ========================================================= */

  @media (max-width: 480px) {
    .services-shell {
      --shell-x: 0px;

      width: calc(100% - 40px);

      padding: 100px var(--shell-x) 64px;
    }

    .experience-rail {
      margin-bottom: 24px;
    }

    .experience-item {
      min-height: 15px;

      padding: 17px 18px;
    }

    .experience-title {
      font-size: 15px;
    }

    .about-image-wrap {
      aspect-ratio: 4 / 5;
    }

    .about-editorial-title {
      font-size: clamp(20px, 5.94vw, 27px);
    }

    .about-below-copy {
      gap: 22px;

      padding-top: 22px;
    }

    .about-editorial-text {
      font-size: 12px;
    }

    .profile-name {
      font-size: 10.5px;
    }

    .profile-role {
      font-size: 9px;
    }

    .services-header-inner {
      padding: 28px 0;
    }

    .service-content h3 {
      font-size: 17px;
    }

    .service-content p {
      font-size: 14px;
    }

    .website-tool-card {
      min-height: 280px;
    }

    .website-tool-copy h3 {
      font-size: 17px;
    }

    .website-tool-copy p {
      font-size: 14px;
    }
  }

  /* =========================================================

     VERY SMALL MOBILE

  ========================================================= */

  @media (max-width: 420px) {
    .experience-nav {
      width: 36px;

      height: 36px;
    }

    .about-editorial-title {
      font-size: clamp(18px, 5.76vw, 24px);
    }

    .about-editorial-text {
      font-size: 11.5px;
    }

    .services-header {
      margin-bottom: 46px;
    }

    .services-header-inner {
      gap: 20px;

      padding: 28px 0;
    }

    .services-header h2 {
      font-size: 22px;
    }

    .services-subtitle {
      font-size: 14px;
    }
  }

  /* =========================================================

     REDUCED MOTION

  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .services-header {
      opacity: 1;

      transform: none;

      transition: none;
    }

    .services-header-main::before {
      animation: none;
    }

    .about-title-track {
      animation: none;

      transform: none;
    }

    .tools-marquee-track {
      animation-duration: 0.01ms;

      animation-iteration-count: 1;

      transition-duration: 0.01ms;

      transform: none;
    }
  }
</style>
