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

    serviceDescriptionToggleLabel = "Leistungsbeschreibung ein- oder ausblenden",

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

    problemListTitle = "KOMMEN DIR DIESE PROBLEME BEKANNT VOR?",

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

  let openServiceIndex = $state(-1);

  function toggleServiceDescription(index) {
    openServiceIndex = openServiceIndex === index ? -1 : index;
  }

  let experienceViewport = $state(null);

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
    <div class="shell-line edge-left" aria-hidden="true"></div>

    <div class="shell-line edge-right" aria-hidden="true"></div>

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

                <div class="service-mobile-heading">
                  <h3>{service.title}</h3>

                  <button
                    class="service-description-toggle"
                    type="button"
                    aria-expanded={openServiceIndex === index}
                    aria-controls={`service-description-${index}`}
                    aria-label={`${serviceDescriptionToggleLabel}: ${service.title}`}
                    onclick={() => toggleServiceDescription(index)}
                  >
                    <span aria-hidden="true">
                      {openServiceIndex === index ? "−" : "+"}
                    </span>
                  </button>
                </div>

                {#if openServiceIndex === index}
                  <p
                    class="service-mobile-description"
                    id={`service-description-${index}`}
                  >
                    {service.text}
                  </p>
                {/if}

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
            <article class="website-tool-card">
              <div class="website-tool-card-inner">
                <div class="website-tool-copy">
                  <h3>{tool.title}</h3>

                  <p>{tool.text}</p>
                </div>

                <div class="website-tool-cta-row">
                  <a
                    class="website-tool-cta"
                    href={tool.href}
                    title={tool.title}
                  >
                    {tool.linkLabel}
                  </a>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="none"
                    class="website-tool-arrow"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 8H14"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                    <path
                      d="M10 4L14 8L10 12"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </article>
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
    background: #ffffff;

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

    gap: 90px;

    margin: 0;

    padding: 0;
  }

  .experience-item {
    --experience-border: rgba(255, 255, 255, 0.42);

    position: relative;

    min-width: 0;
    min-height: 13px;

    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;

    padding: 8px 24px;

    border: 0;
    border-radius: 0;
    background: transparent;

    box-sizing: border-box;
  }

  /* LEFT BRACKET */
  .experience-item::before {
    content: "";
    position: absolute;

    top: 0;
    bottom: 0;
    left: 0;

    width: 28px;

    border-left: 1px solid var(--experience-border);
    border-top: 1px solid var(--experience-border);
    border-bottom: 1px solid var(--experience-border);

    pointer-events: none;
  }

  /* RIGHT BRACKET */
  .experience-item::after {
    content: "";
    position: absolute;

    top: 0;
    bottom: 0;
    right: 0;

    width: 28px;

    border-right: 1px solid var(--experience-border);
    border-top: 1px solid var(--experience-border);
    border-bottom: 1px solid var(--experience-border);

    pointer-events: none;
  }

  /* LIGHT MODE */
  :global(body.light) .experience-item {
    --experience-border: rgba(0, 0, 0, 0.4);

    background: transparent;
  }

  .experience-title {
    position: relative;
    z-index: 1;

    width: 100%;
    max-width: 100%;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    text-align: center;

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
    --about-marquee-edge-fade: 16px;

    position: absolute;

    right: 20px;

    bottom: 16px;

    left: 20px;

    z-index: 3;

    width: auto;

    margin: 0;

    overflow: hidden;

    -webkit-mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 var(--about-marquee-edge-fade),
      #000 calc(100% - var(--about-marquee-edge-fade)),
      transparent 100%
    );

    mask-image: linear-gradient(
      to right,
      transparent 0,
      #000 var(--about-marquee-edge-fade),
      #000 calc(100% - var(--about-marquee-edge-fade)),
      transparent 100%
    );

    color: #ffffff;

    font-size: clamp(28.8px, 3.564vw, 56px);

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
    grid-column: 2;
    grid-row: 1;

    width: 100%;

    justify-self: stretch;
    align-self: start;

    display: grid;
    grid-template-rows: auto auto;
    justify-items: end;
    align-content: start;

    row-gap: 7px;
  }

  .about-kicker {
    display: inline-flex;

    align-items: center;

    gap: 12px;

    margin: 0 0 14px;

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
    --editorial-border: rgba(255, 255, 255, 0.34);

    position: relative;

    width: 100%;
    max-width: 680px;

    margin: 9px 0 0;
    padding: 16px 24px;

    box-sizing: border-box;

    color: #9a9a9a;
    font-size: 17px;
    font-weight: 400;
    line-height: 1.68;
    text-align: left;
    text-wrap: pretty;
  }

  /* =========================================================
   ABOUT EDITORIAL OPEN BRACKETS
========================================================= */

  .about-editorial-text::before,
  .about-editorial-text::after {
    content: "";
    position: absolute;

    top: 0;
    height: 100%;

    width: 28px;

    box-sizing: border-box;

    border-top: 1px solid var(--editorial-border);
    border-bottom: 1px solid var(--editorial-border);

    pointer-events: none;
  }

  /* LEFT */
  .about-editorial-text::before {
    left: 0;
    border-left: 1px solid var(--editorial-border);
  }

  /* RIGHT */
  .about-editorial-text::after {
    right: 0;
    border-right: 1px solid var(--editorial-border);
  }

  /* LIGHT MODE */
  :global(body.light) .about-editorial-text {
    --editorial-border: rgba(0, 0, 0, 0.34);
    color: rgba(0, 0, 0, 0.66);
  }

  .about-editorial-figure {
    position: relative;

    width: fit-content;
    min-width: 0;

    justify-self: end;
    align-self: center;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 0;

    margin: 0;
    padding: 0;

    border: 0;

    text-align: left;

    box-sizing: border-box;
  }

  /* NAME — OUTSIDE THE BRACKET */
  .profile-name {
    display: block;

    margin: 0 0 12px;

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

  /* ROLES */
  .profile-role {
    max-width: 100%;

    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: flex-start;

    gap: 6px;

    margin: 0;

    color: #888888;

    font-size: 13px;
    font-weight: var(--weight-semibold);
    line-height: 1.45;
    letter-spacing: 0.07em;

    text-align: left;
    text-transform: uppercase;
  }

  .profile-role > span {
    display: block;
    width: 100%;
  }

  /* REMOVE OLD DOT SEPARATORS */
  .profile-role > span:not(:last-child)::after {
    content: none;
    display: none;
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
    --services-title-marker-size: clamp(18px, 1.6125vw, 25.5px);

    min-width: 0;

    display: grid;

    grid-template-columns: var(--services-title-marker-size) minmax(0, 1fr);

    align-items: start;

    gap: 18px;
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

  @media (max-width: 1100px) {
    .services-header-main {
      align-items: center;
    }

    .services-header-main::before {
      align-self: center;
      margin-top: 0;
    }
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

    font-weight: 600;

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
    background: #ffffff;
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
    gap: 4px;
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
    box-shadow: none;
  }

  :global(body.light) .service-detail-panel {
    border-bottom-color: rgba(0, 0, 0, 0.14);
  }

  :global(body.light) .service-detail-panel.active {
    background: #ffffff;
    box-shadow: none;
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

    .about-kicker {
      width: 100%;
      max-width: 720px;

      justify-self: end;
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
      grid-template-columns: minmax(300px, 360px) minmax(0, 1fr);
      gap: clamp(36px, 5vw, 80px);
      align-items: start;
      padding-top: 30px;
    }

    /* LEFT — JULIUS PROFILE */
    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: 360px;

      justify-self: start;
      align-self: start;
    }

    /* RIGHT — EDITORIAL */
    .about-top-copy {
      grid-column: 2;
      grid-row: 1;

      width: 100%;

      justify-self: stretch;
      align-self: start;

      display: grid;
      grid-template-rows: auto auto;
      align-content: start;
      row-gap: 7px;
    }

    .about-editorial-text {
      width: 100%;
      max-width: 720px;

      margin-top: 0;

      justify-self: end;

      line-height: 1.58;
    }

    /* NAME ABOVE THE BRACKET */
    .profile-name {
      line-height: 1;
      margin: 0 0 12px;
    }

    /* STACKED ROLES */
    .profile-role {
      --profile-border: rgba(255, 255, 255, 0.34);

      position: relative;

      width: 100%;

      display: flex;
      flex-direction: column;
      flex-wrap: nowrap;
      align-items: flex-start;

      gap: 7px;

      margin: 0;
      padding: 16px 24px;

      box-sizing: border-box;
    }

    .profile-role > span {
      display: block;
      width: 100%;
    }

    .profile-role > span:not(:last-child)::after {
      content: none;
      display: none;
    }

    /* OPEN BRACKETS */
    .profile-role::before,
    .profile-role::after {
      content: "";
      position: absolute;

      top: 0;
      height: 100%;

      width: 28px;

      box-sizing: border-box;

      border-top: 1px solid var(--profile-border);
      border-bottom: 1px solid var(--profile-border);

      pointer-events: none;
    }

    .profile-role::before {
      left: 0;
      border-left: 1px solid var(--profile-border);
    }

    .profile-role::after {
      right: 0;
      border-right: 1px solid var(--profile-border);
    }

    :global(body.light) .profile-role {
      --profile-border: rgba(0, 0, 0, 0.34);
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

  :global(body.light) .service-detail-panel.active .service-bg-number {
    color: rgba(0, 0, 0, 0.18);
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
    gap: 7px;
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
    min-height: 25px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 8px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 0;
    color: #ffffff;
    font-size: 11px;
    font-weight: 400;
    line-height: 1;
    letter-spacing: 0.035em;
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
    display: none;
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

    gap: 94px;
    padding-bottom: 40px;
  }

  .website-tool-card {
    --tool-border: rgba(255, 255, 255, 0.34);

    position: relative;

    min-width: 0;
    min-height: 195px;

    display: flex;

    padding: 34px;

    border: 0;
    background: transparent;

    color: #ffffff;
    text-decoration: none;

    box-sizing: border-box;
    overflow: hidden;
  }

  /* LEFT + RIGHT OPEN BRACKETS */
  .website-tool-card::before,
  .website-tool-card::after {
    content: "";

    position: absolute;

    top: 0;
    height: 100%;

    width: 28px;

    box-sizing: border-box;

    border-top: 1px solid var(--tool-border);
    border-bottom: 1px solid var(--tool-border);

    pointer-events: none;
  }

  /* LEFT */
  .website-tool-card::before {
    left: 0;

    border-left: 1px solid var(--tool-border);
  }

  /* RIGHT */
  .website-tool-card::after {
    right: 0;

    border-right: 1px solid var(--tool-border);
  }

  /* LIGHT MODE */
  :global(body.light) .website-tool-card {
    --tool-border: rgba(0, 0, 0, 0.34);

    color: #111111;
  }

  .website-tool-card::before,
  .website-tool-card::after {
    width: 24px;
  }

  .website-tool-card-inner {
    height: 100%;

    width: auto;

    display: flex;

    flex-direction: column;

    justify-content: center;
  }

  .website-tool-arrow {
    width: 18px;

    height: 18px;

    flex: 0 0 18px;

    display: block;

    color: var(--accent-blue);
  }

  .website-tool-copy {
    margin-top: 0;
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

  .website-tool-cta-row {
    width: fit-content;

    display: flex;

    align-items: center;

    gap: 10px;

    margin-top: 22px;
  }

  .website-tool-cta {
    width: fit-content;

    padding: 0 0 5px;

    border-bottom: 1px solid var(--accent-blue);

    color: #ffffff;

    text-decoration: none;

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
    .services-header-main {
      --services-title-marker-size: 28.8px;
    }

    .free-tools-grid {
      gap: 47px;
    }

    .services-shell {
      --shell-x: 0px;

      width: 90%;

      padding: 110px var(--shell-x) 96px;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
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

      padding: 10px 22px;

      scroll-snap-align: start;
    }

    .experience-title {
      font-size: 21px;

      font-weight: 700;

      line-height: 1.18;
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
      gap: 20px;
      padding-top: 28px;
    }

    .about-kicker {
      font-size: 11px;
    }

    .about-editorial-text {
      max-width: 100%;

      margin-top: 7px;

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
      min-height: 165px;

      padding: 28px;
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

      padding: 10px 20px;

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
      --about-marquee-edge-fade: 8px;

      right: 10px;

      bottom: 8px;

      left: 10px;

      font-size: clamp(21px, 6.3vw, 31px);

      line-height: 0.92;
    }

    .about-title-track {
      animation-duration: 21s;
    }

    .about-below-copy {
      grid-template-columns: 1fr;

      align-items: start;

      gap: 18px;

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

      margin-top: 6px;

      font-size: 12.5px;

      line-height: 1.6;
    }
    .about-editorial-figure {
      width: 100%;
      max-width: none;
      justify-self: start;
      align-self: start;
      gap: 2px;
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
      --services-title-marker-size: clamp(26.4px, 7.2vw, 32.4px);

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
      min-height: 0;

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

      justify-content: flex-start;
    }

    .service-mobile-heading {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 18px;
    }

    .service-mobile-heading h3 {
      margin-bottom: 0;
    }

    .service-description-toggle {
      width: 26px;
      height: 26px;
      flex: 0 0 26px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      margin: -3px 0 0;
      padding: 0;
      border: 0;
      background: transparent;
      color: var(--accent-blue);
      font: inherit;
      font-size: 22px;
      font-weight: 300;
      line-height: 1;
      cursor: pointer;
      transition: opacity 0.2s ease;
    }

    .service-description-toggle:hover,
    .service-description-toggle[aria-expanded="true"] {
      color: var(--accent-blue);
      background: transparent;
      opacity: 0.72;
    }

    .service-description-toggle:focus-visible {
      outline: 1px solid currentColor;
      outline-offset: 2px;
    }

    .service-mobile-description {
      margin-top: 16px;
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
      font-size: 10px;
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

      gap: 42px;
    }

    .website-tool-card {
      min-height: 150px;

      padding: 26px 22px;
    }
    .website-tool-card::before,
    .website-tool-card::after {
      width: 20px;
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

      padding: 10px 18px;
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
      gap: 18px;

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
      min-height: 140px;
    }

    .website-tool-copy h3 {
      font-size: 17px;
    }

    .website-tool-copy p {
      font-size: 14px;
    }

    .service-tags span {
      font-size: 8px;
    }

    .service-tags {
      width: 100%;
      max-width: none;
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

  /* =========================================================
   MOBILE ABOUT — FINAL PROFILE LAYOUT
========================================================= */

  @media (max-width: 767px) {
    /* Two main sections still stack */
    .about-below-copy {
      grid-template-columns: 1fr;
    }

    /* PROFILE FIRST */
    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: none;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;

      gap: 14px;

      margin: 0;
      padding: 0;
    }

    /* NAME — same horizontal row */
    .profile-name {
      flex: 0 0 auto;

      margin: 0;

      white-space: nowrap;
    }

    /* WEB DESIGN / DEVELOPMENT / WORDPRESS — horizontal */
    .profile-role {
      position: relative;

      width: auto;

      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;

      gap: 6px 10px;

      margin: 0;
      padding: 0;
    }

    .profile-role > span {
      display: inline-flex;
      width: auto;
      white-space: nowrap;
    }

    /* NO DOTS */
    .profile-role > span:not(:last-child)::after {
      content: none !important;
      display: none !important;
      margin: 0 !important;
    }

    /* NO PROFILE BRACKET ON MOBILE */
    .profile-role::before,
    .profile-role::after,
    .about-editorial-figure::before,
    .about-editorial-figure::after {
      content: none !important;
      display: none !important;
    }

    /* EDITORIAL SECOND */
    .about-top-copy {
      grid-column: 1;
      grid-row: 2;

      width: 100%;
    }
  }
  @media (max-width: 767px) {
    .about-kicker {
      width: 100%;
      margin-left: 0;
      margin-right: 0;

      align-self: flex-start;
      justify-self: start;

      text-align: left;
    }
  }

  @media (max-width: 767px) {
    /* WHOLE TITLE + TEXT BECOMES THE BRACKET CONTAINER */
    .about-top-copy {
      --editorial-border: rgba(255, 255, 255, 0.34);

      position: relative;

      width: 100%;

      display: flex;
      flex-direction: column;
      align-items: flex-start;

      padding: 18px 20px;

      box-sizing: border-box;
      text-align: left;
    }

    /* LEFT + RIGHT OPEN BRACKETS */
    .about-top-copy::before,
    .about-top-copy::after {
      content: "";
      position: absolute;

      top: 0;
      height: 100%;

      width: 22px;

      box-sizing: border-box;

      border-top: 1px solid var(--editorial-border);
      border-bottom: 1px solid var(--editorial-border);

      pointer-events: none;
    }

    .about-top-copy::before {
      left: 0;
      border-left: 1px solid var(--editorial-border);
    }

    .about-top-copy::after {
      right: 0;
      border-right: 1px solid var(--editorial-border);
    }

    /* TITLE — NOW INSIDE THE BRACKET */
    .about-kicker {
      width: 100%;

      margin: 0 0 12px;

      align-self: flex-start;
      justify-content: flex-start;

      text-align: left;
    }

    /* TEXT — REMOVE ITS OWN SEPARATE BRACKET */
    .about-editorial-text {
      width: 100%;
      max-width: none;

      margin: 0;
      padding: 0;

      text-align: left;
    }

    .about-editorial-text::before,
    .about-editorial-text::after {
      content: none;
      display: none;
    }

    /* LIGHT MODE */
    :global(body.light) .about-top-copy {
      --editorial-border: rgba(0, 0, 0, 0.34);
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .about-below-copy {
      display: grid;
      grid-template-columns: 1fr;

      gap: 28px;
    }

    /* JULIUS / PROFILE FIRST */
    .about-editorial-figure {
      grid-column: 1;
      grid-row: 1;

      width: 100%;
      max-width: none;

      justify-self: start;
      align-self: start;

      padding: 0;
    }

    /* EDITORIAL TEXT SECOND */
    .about-top-copy {
      grid-column: 1;
      grid-row: 2;

      width: 100%;

      justify-self: start;
      align-self: start;
    }

    /* PROFILE ROLES — ONE LINE ON TABLET */
    .profile-role {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;

      align-items: center;

      gap: 14px;

      margin: 0;
      padding: 0;
    }

    .profile-role > span {
      display: inline-flex;
      width: auto;

      white-space: nowrap;
    }

    .profile-role > span:not(:last-child)::after {
      content: none;
      display: none;
    }

    /* NO PROFILE BRACKETS ON TABLET */
    .profile-role::before,
    .profile-role::after,
    .about-editorial-figure::before,
    .about-editorial-figure::after {
      content: none;
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .about-kicker {
      width: 100%;
      max-width: none;

      justify-self: start;
      align-self: flex-start;
      justify-content: flex-start;

      margin-left: 0;
      margin-right: 0;

      text-align: left;
    }
  }
</style>
