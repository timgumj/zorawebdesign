<script>
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

  let lineVisible = $state(false);
  let openProblemIndex = $state(0);

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

  function getServiceTags(service) {
    const serviceTitle = service?.title?.toLowerCase() ?? "";
    const foundKey = Object.keys(serviceKeywords).find((key) =>
      serviceTitle.includes(key),
    );

    return foundKey ? serviceKeywords[foundKey] : fallbackServiceTags;
  }

  function observeLine(node) {
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
          <aside class="experience-rail" aria-label="Experience">
            <div class="experience-list">
              {#each normalizedStats as stat}
                <article class="experience-item">
                  <div class="experience-copy">
                    <h3>{stat.title}</h3>
                    <span class="experience-accent" aria-hidden="true"></span>
                    <p>{stat.label}</p>
                  </div>
                </article>
              {/each}
            </div>
          </aside>

          <div class="about-editorial">
            <div class="about-editorial-copy">
              <span class="about-kicker">
                {problemEyebrow || stats?.eyebrow || eyebrow}
              </span>

              <h2 id="premium-about-title" class="about-editorial-title">
                {problemTitle}
              </h2>

              <p class="about-editorial-text">
                {problemText}
              </p>

              <div class="about-editorial-figure">
                <span class="profile-name">{profileName}</span>
                <span class="profile-role">{profileRole}</span>
              </div>
            </div>

            <div class="about-profile">
              <div class="about-image-wrap">
                <img
                  src="/images/Julius_Timgum-700.webp"
                  alt={profileImageAlt}
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </section>
      {/if}

      <div class="services-header" use:observeLine>
        <div class="services-header-row">
          <div class="services-title-area">
            <div class="services-title-row">
              <span
                class="section-pulse"
                class:visible={lineVisible}
                aria-hidden="true"
              ></span>

              <h2>{title}</h2>
            </div>

            <div class="services-line" class:visible={lineVisible}></div>
          </div>

          {#if subtitle}
            <p>{subtitle}</p>
          {/if}
        </div>
      </div>

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
                    <span class="problem-item-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h4 class="problem-item-title">{item.title}</h4>

                    <span class="problem-item-toggle" aria-hidden="true">
                      {openProblemIndex === index ? "↑" : "↓"}
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

      <!-- Main service cards: intentionally kept unchanged -->
      <div class="services-grid">
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

      <section class="free-tools-section" aria-labelledby="free-tools-title">
        <div class="free-tools-heading">
          <span>{toolsLabel}</span>
          <h2 id="free-tools-title">{toolsSectionTitle}</h2>
        </div>

        <div class="free-tools-grid">
          {#each toolLinks as tool, index}
            <a class="website-tool-card" href={tool.href} title={tool.title}>
              <div class="website-tool-card-inner">
                <div class="website-tool-topline">
                  <span class="website-tool-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span class="website-tool-arrow" aria-hidden="true">↗</span>
                </div>

                <div class="website-tool-copy">
                  <span class="website-tool-eyebrow">{toolsLabel}</span>
                  <h3>{tool.title}</h3>
                  <p>{tool.text}</p>
                </div>

                <span class="website-tool-cta">{tool.linkLabel}</span>
              </div>
            </a>
          {/each}
        </div>

        <article class="tools-marquee-card">
          <div class="tools-marquee-header">
            <h3>{toolsMarqueeTitle}</h3>
          </div>

          <div class="tools-marquee" aria-label={toolsAlt}>
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
  .services {
    --type-label: 11px;
    --type-small: 13px;
    --type-body: 15px;
    --type-subheading: 18px;
    --type-heading: 28px;
    --weight-regular: 400;
    --weight-semibold: 600;
    --weight-bold: 700;

    width: 100vw;
    margin-left: calc(50% - 50vw);
    padding: 0;
    overflow: hidden;
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
    margin: 140px auto;
    padding: 0 var(--shell-x) 140px;
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
     ABOUT / EXPERIENCE
     ========================================================= */

  .premium-about {
    width: 100%;
    margin: 0 auto;
    padding: 50px 0 82px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.11);
    box-sizing: border-box;
  }

  :global(body.light) .premium-about {
    border-bottom-color: rgba(0, 0, 0, 0.11);
  }

  /* Experience strip spans the full width before the profile content. */
  .experience-rail {
    width: min(100%, 980px);
    min-width: 0;
    margin: 0 auto 64px;
  }
  .experience-list {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 0;
    padding: 0;
  }

  .experience-item {
    min-width: 0;
    display: flex;
    align-items: flex-start;
    padding: 8px clamp(6px, 0.8vw, 12px);
    border: 0;
    background: transparent;
    box-sizing: border-box;
  }

  .experience-item:first-child {
    padding-left: 0;
  }

  .experience-copy {
    width: 100%;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: clamp(10px, 0.9vw, 15px);
    border-left: 1px solid #0043ff;
    box-sizing: border-box;
  }

  .experience-item:first-child .experience-copy {
    padding-left: 0;
    border-left: 0;
  }

  :global(body.light) .experience-copy {
    border-left-color: rgba(0, 0, 0, 0.14);
  }

  .experience-copy h3 {
    margin: 0;
    color: #ffffff;
    font-size: var(--type-small);
    font-weight: var(--weight-semibold);
    line-height: 1.38;
    letter-spacing: 0.03em;
    text-transform: uppercase;
  }

  :global(body.light) .experience-copy h3 {
    color: #111111;
  }

  .experience-accent {
    width: 22px;
    height: 2px;
    display: block;
    margin: 8px 0 5px;
    background: none;
  }

  .experience-copy p {
    margin: 0;
    color: #989898;
    font-size: var(--type-body);
    font-weight: var(--weight-regular);
    line-height: 1.45;
  }

  :global(body.light) .experience-copy p {
    color: rgba(0, 0, 0, 0.65);
  }

  /* Text and portrait form one centred two-column composition. */
  .about-editorial {
    width: min(100%, 980px);
    min-width: 0;
    margin: 0 auto;
    display: grid;
    grid-template-columns: minmax(0, 0.82fr) minmax(360px, 1.18fr);
    gap: clamp(42px, 5vw, 72px);
    align-items: start;
  }

  .about-editorial-copy {
    min-width: 0;
    width: 100%;
    margin: 0;
    padding: 4px 0 0;
    text-align: left;
  }

  .about-kicker {
    display: block;
    margin: 0 0 15px;
    color: #0043ff;
    font-size: var(--type-label);
    font-weight: var(--weight-bold);
    line-height: 1;
    letter-spacing: 0.17em;
    text-transform: uppercase;
  }

  .about-editorial-title {
    width: 100%;
    max-width: 410px;
    margin: 0;
    color: #ffffff;
    font-size: 20px;
    font-weight: var(--weight-semibold);
    line-height: 1.3;
    letter-spacing: 0.035em;
    text-transform: uppercase;
    text-wrap: balance;
  }

  :global(body.light) .about-editorial-title {
    color: #111111;
  }

  .about-editorial-text {
    width: 100%;
    max-width: 410px;
    margin: 22px 0 0;
    color: #989898;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.62;
    text-wrap: pretty;
  }

  :global(body.light) .about-editorial-text {
    color: rgba(0, 0, 0, 0.66);
  }

  /* Profile details remain with the written introduction; image column stays image-only. */
  .about-editorial-figure {
    width: 100%;
    max-width: 410px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
    margin-top: 34px;
    padding-top: 15px;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
    background: transparent;
    box-sizing: border-box;
  }

  :global(body.light) .about-editorial-figure {
    border-top-color: rgba(0, 0, 0, 0.13);
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
    color: #8d8d8d;
    font-size: 11px;
    font-weight: var(--weight-semibold);
    line-height: 1.45;
    letter-spacing: 0.07em;
    text-align: left;
    text-transform: uppercase;
  }

  :global(body.light) .profile-role {
    color: rgba(0, 0, 0, 0.62);
  }

  .about-profile {
    min-width: 0;
    width: 100%;
    margin: 0;
  }

  .about-image-wrap {
    width: 100%;
    height: 430px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    overflow: hidden;
    background: transparent !important;
  }

  :global(body.light) .about-image-wrap {
    background: transparent !important;
  }

  .about-image-wrap img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: contain;
    object-position: center bottom;
    background: transparent !important;
    filter: grayscale(1);
  }

  :global(body.light) .about-image-wrap img {
    background: transparent !important;
  }

  /* =========================================================
     MAIN SECTION HEADING
     ========================================================= */

  .services-header {
    width: 100%;
    margin: 112px 0 78px;
  }

  .services-header-row {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 24px;
  }

  .services-title-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .services-title-row {
    display: inline-flex;
    align-items: center;
    gap: 20px;
  }

  .services-header h2 {
    margin: 0;
    color: #ffffff;
    font-size: var(--type-heading);
    font-weight: var(--weight-bold);
    line-height: 1.1;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :global(body.light) .services-header h2 {
    color: #111111;
  }

  .services-line {
    width: 100%;
    height: 2px;
    background: #ffffff;
    transform-origin: left center;
    transform: scaleX(0.01);
    transition:
      transform 1s ease-out,
      background 0.3s ease;
  }

  .services-line.visible {
    transform: scaleX(1);
  }

  :global(body.light) .services-line {
    background: #111111;
  }

  .services-header p {
    max-width: 520px;
    margin: 0;
    padding-left: 20px;
    border-left: 2px solid #0043ff;
    color: #bfbfbf;
    font-size: 16px;
    font-weight: var(--weight-regular);
    line-height: 1.4;
    letter-spacing: 0.04em;
  }

  :global(body.light) .services-header p {
    color: rgba(0, 0, 0, 0.68);
  }

  .section-pulse {
    position: relative;
    width: 28px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 50%;
    background: #0043ff;
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

  /* =========================================================
     PROBLEM / SOLUTION ACCORDION
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
    border: 1px solid #0043ff;
    color: #0043ff;
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
    border-top: 1px solid rgba(255, 255, 255, 0.15);
  }

  :global(body.light) .problem-accordion {
    border-top-color: rgba(0, 0, 0, 0.15);
  }

  .problem-item {
    padding: 0;
    border-right: 0;
    border-bottom: 1px solid rgba(255, 255, 255, 0.13);
    border-left: 0;
    background: transparent;
  }

  :global(body.light) .problem-item {
    border-bottom-color: rgba(0, 0, 0, 0.13);
    background: transparent;
  }

  .problem-item summary {
    min-height: 76px;
    display: grid;
    grid-template-columns: 48px minmax(0, 1fr) 34px;
    align-items: center;
    gap: 18px;
    padding: 18px 0;
    color: #ffffff;
    cursor: pointer;
    list-style: none;
    background: transparent;
    box-sizing: border-box;
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

  .problem-item-number {
    color: #0043ff;
    font-size: var(--type-label);
    font-weight: var(--weight-bold);
    line-height: 1;
    letter-spacing: 0.08em;
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
    text-decoration-line: underline;
    text-decoration-color: #0043ff;
    text-decoration-thickness: 1px;
    text-underline-offset: 6px;
    text-transform: uppercase;
  }

  :global(body.light) .problem-item-title {
    color: #111111;
  }

  .problem-item-toggle {
    width: 34px;
    height: 34px;
    flex: 0 0 34px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    justify-self: end;
    align-self: center;
    padding: 0;
    border: 1px solid #0043ff;
    color: #0043ff;
    font-size: 17px;
    font-weight: var(--weight-regular);
    line-height: 1;
    background: transparent;
    box-sizing: border-box;
    transform: none;
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
    transform: none;
  }

  .problem-item[open] .problem-item-toggle,
  .problem-item:not([open]) .problem-item-toggle {
    transform: none;
  }

  .problem-item-content {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 34px;
    margin-left: 66px;
    padding: 30px 0 34px;
    border-top: 1px solid rgba(255, 255, 255, 0.13);
  }

  :global(body.light) .problem-item-content {
    border-top-color: rgba(0, 0, 0, 0.13);
  }

  .problem-solution-row {
    display: grid;
    grid-template-columns: 10px minmax(0, 1fr);
    gap: 13px;
    align-items: start;
  }

  .problem-solution-marker {
    width: 9px;
    height: 9px;
    margin-top: 4px;
  }

  .problem-marker {
    background: #f2c94c;
  }

  .solution-marker {
    background: #0043ff;
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
     MAIN SERVICE CARDS — KEPT UNCHANGED
     ========================================================= */

  .services-grid {
    width: 100%;
    display: grid;
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

  .service-tags span {
    min-height: 30px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 6px 12px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    color: #ffffff;
    font-size: 12px;
    font-weight: 600;
    line-height: 1;
  }

  :global(body.light) .service-tags span {
    border-color: rgba(0, 0, 0, 0.28);
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
    color: #0043ff;
    font-size: var(--type-label);
    font-weight: var(--weight-bold);
    line-height: 1;
    letter-spacing: 0.15em;
    text-transform: uppercase;
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
    justify-content: space-between;
    align-items: flex-start;
  }

  .website-tool-number {
    color: #7f7f7f;
    font-size: var(--type-label);
    font-weight: var(--weight-bold);
    line-height: 1;
    letter-spacing: 0.1em;
  }

  .website-tool-arrow {
    width: 38px;
    height: 38px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #0043ff;
    color: #0043ff;
    font-size: 18px;
    font-weight: var(--weight-regular);
    line-height: 1;
    transition:
      transform 0.25s ease,
      background 0.25s ease,
      color 0.25s ease;
  }

  .website-tool-card:hover .website-tool-arrow {
    transform: translate(2px, -2px);
    background: #0043ff;
    color: #ffffff;
  }

  .website-tool-copy {
    margin-top: 72px;
  }

  .website-tool-eyebrow {
    display: block;
    margin-bottom: 16px;
    color: #0043ff;
    font-size: var(--type-label);
    font-weight: var(--weight-bold);
    line-height: 1;
    letter-spacing: 0.13em;
    text-transform: uppercase;
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
    border-bottom: 1px solid #0043ff;
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
    margin-top: 20px;
    padding: 28px 0 24px;
    border-top: 1px solid rgba(255, 255, 255, 0.22);
    border-bottom: 1px solid rgba(255, 255, 255, 0.22);
    overflow: hidden;
  }

  :global(body.light) .tools-marquee-card {
    border-color: rgba(0, 0, 0, 0.22);
  }

  .tools-marquee-header {
    margin-bottom: 24px;
  }

  .tools-marquee-header h3 {
    margin: 0;
    color: #ffffff;
    font-size: 15px;
    font-weight: var(--weight-semibold);
    line-height: 1.3;
    letter-spacing: 0.055em;
    text-transform: uppercase;
  }

  :global(body.light) .tools-marquee-header h3 {
    color: #111111;
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
     RESPONSIVE
     ========================================================= */

  @media (min-width: 1025px) {
    .experience-copy h3,
    .experience-copy p {
      white-space: nowrap;
    }
  }

  @media (max-width: 1200px) {
    .about-editorial {
      width: min(100%, 900px);
      grid-template-columns: minmax(0, 0.86fr) minmax(330px, 1.14fr);
      gap: 44px;
    }

    .about-image-wrap {
      height: 390px;
    }

    .experience-item {
      padding-right: 8px;
      padding-left: 8px;
    }

    .experience-item:first-child {
      padding-left: 0;
    }

    .problem-workspace {
      grid-template-columns: 210px minmax(0, 1fr);
      gap: 42px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .services-shell {
      --shell-x: 32px;

      width: min(1540px, calc(100% - 28px));
      padding-bottom: 96px;
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
      width: 100%;
      margin-right: 0;
      margin-left: 0;
      padding: 42px 0 70px;
    }

    .experience-rail {
      width: 100%;
      margin: 0 0 54px;
    }

    .experience-list {
      width: 100%;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      row-gap: 28px;
    }

    .experience-item {
      min-height: 0;
      padding: 6px 10px;
      border: 0;
    }

    .experience-item:nth-child(3n + 1) {
      padding-left: 0;
    }

    .experience-item:nth-child(3n + 1) .experience-copy {
      padding-left: 0;
      border-left: 0;
    }

    .experience-item:not(:nth-child(3n + 1)) .experience-copy {
      padding-left: 14px;
      border-left: 1px solid rgba(255, 255, 255, 0.14);
    }

    :global(body.light)
      .experience-item:not(:nth-child(3n + 1))
      .experience-copy {
      border-left-color: rgba(0, 0, 0, 0.14);
    }

    .experience-copy h3 {
      font-size: 12px;
    }

    .experience-copy p {
      font-size: 15px;
    }

    .about-editorial {
      width: 100%;
      max-width: none;
      margin-right: 0;
      margin-left: 0;
      grid-template-columns: minmax(0, 0.92fr) minmax(300px, 1.08fr);
      gap: 34px;
    }

    .about-editorial-title {
      font-size: 18px;
    }

    .about-editorial-text {
      font-size: 14px;
    }

    .about-image-wrap {
      height: 350px;
      justify-content: flex-start;
    }

    .about-image-wrap img {
      object-position: left bottom;
    }

    .services-header {
      margin: 92px 0 62px;
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
      grid-template-columns: 34px minmax(0, 1fr) 32px;
      gap: 10px;
      padding: 14px 0;
    }

    .problem-item-title {
      font-size: 11px;
    }

    .problem-item-toggle {
      width: 32px;
      height: 32px;
      flex-basis: 32px;
    }

    .problem-item-content {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-left: 44px;
      padding: 26px 0 30px;
    }

    /* Main service cards: unchanged responsive behaviour */
    .services-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .service-card,
    .services-grid > .service-card:nth-child(3n + 2),
    .services-grid > .service-card:nth-child(3n + 3) {
      min-height: 330px;
      padding: 28px 28px 30px 10px;
      border-left: 0;
    }

    .services-grid > .service-card:nth-child(2n + 2) {
      padding-left: 34px;
      border-left: 1px solid rgba(255, 255, 255, 0.08);
    }

    :global(body.light) .services-grid > .service-card:nth-child(2n + 2) {
      border-left-color: rgba(0, 0, 0, 0.08);
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

  @media (max-width: 767px) {
    .services-shell {
      --shell-x: 22px;

      width: min(1540px, calc(100% - 20px));
      padding: 0 var(--shell-x) 72px;
    }

    .shell-line,
    .shell-bottom-line {
      display: none;
    }

    .premium-about {
      width: 100%;
      margin-right: 0;
      margin-left: 0;
      padding: 34px 0 62px;
    }

    .experience-rail {
      width: 100%;
      margin: 0 0 44px;
    }

    .experience-list {
      width: 100%;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      justify-items: center;
      column-gap: 0;
      row-gap: 24px;
    }

    .experience-item,
    .experience-item:nth-child(3n + 1) {
      width: 100%;
      min-height: 0;
      justify-content: center;
      padding: 4px 8px;
      border: 0;
      text-align: center;
    }

    .experience-copy {
      width: fit-content;
      max-width: 100%;
      align-items: center;
      padding-left: 14px;
      border-left: 1px solid rgba(255, 255, 255, 0.14);
    }

    .experience-item:nth-child(2n + 1) .experience-copy {
      padding-left: 0;
      border-left: 0;
    }

    :global(body.light) .experience-copy {
      border-left-color: rgba(0, 0, 0, 0.14);
    }

    .experience-copy h3 {
      font-size: 12px;
      text-align: center;
    }

    .experience-copy p {
      display: none;
    }

    .experience-accent {
      margin-right: auto;
      margin-left: auto;
    }

    .about-editorial {
      width: 100%;
      max-width: none;
      margin-right: 0;
      margin-left: 0;
      grid-template-columns: 1fr;
      gap: 30px;
    }

    .about-editorial-copy {
      width: 100%;
      max-width: 100%;
      padding-top: 0;
    }

    .about-editorial-title {
      max-width: 100%;
      font-size: 18px;
    }

    .about-editorial-text {
      max-width: 100%;
      margin-top: 19px;
      font-size: 14px;
    }

    .about-editorial-figure {
      max-width: 100%;
      margin-top: 26px;
    }

    .about-profile {
      width: 100%;
      max-width: 100%;
    }

    .about-image-wrap {
      height: 310px;
      justify-content: flex-start;
    }

    .about-image-wrap img {
      object-position: left bottom;
    }

    .profile-role {
      max-width: 100%;
      text-align: left;
    }

    .services-header {
      margin: 76px 0 48px;
    }

    .services-header-row {
      grid-template-columns: 1fr;
      gap: 20px;
    }

    .services-header p {
      max-width: 100%;
      padding: 16px 0 16px 18px;
      font-size: 14px;
      line-height: 1.6;
    }

    .section-pulse {
      width: 22px;
      height: 22px;
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

    .problem-item summary {
      min-height: 56px;
      grid-template-columns: 28px minmax(0, 1fr) 32px;
      gap: 9px;
      padding: 12px 0;
    }

    .problem-item-number {
      font-size: 9px;
    }

    .problem-item-title {
      font-size: 10px;
      line-height: 1.45;
      text-underline-offset: 5px;
    }

    .problem-item-toggle {
      width: 32px;
      height: 32px;
      flex-basis: 32px;
      font-size: 16px;
    }

    .problem-item-content {
      grid-template-columns: 1fr;
      gap: 20px;
      margin-left: 37px;
      padding: 26px 0 28px;
    }

    .problem-solution-label {
      font-size: 9px;
    }

    .problem-solution-row p {
      font-size: 12.5px;
    }

    /* Main service cards: unchanged responsive behaviour */
    .services-grid {
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
      justify-content: flex-end;
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
      margin-top: 14px;
      padding: 24px 0 20px;
    }

    .tools-marquee-header {
      margin-bottom: 18px;
    }

    .tools-marquee-header h3 {
      font-size: 13px;
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

  @media (max-width: 480px) {
    .services-shell {
      --shell-x: 18px;

      width: min(1540px, calc(100% - 16px));
      padding-bottom: 64px;
    }

    .experience-item,
    .experience-item:nth-child(3n + 1) {
      padding-right: 6px;
      padding-left: 6px;
    }

    .experience-copy {
      padding-left: 12px;
    }

    .experience-item:nth-child(2n + 1) .experience-copy {
      padding-left: 0;
    }

    .about-image-wrap {
      height: 270px;
    }

    .profile-name {
      font-size: 11px;
    }

    .profile-role {
      font-size: 10px;
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

  @media (prefers-reduced-motion: reduce) {
    .section-pulse,
    .section-pulse::before,
    .section-pulse::after,
    .website-tool-arrow,
    .tools-marquee-track {
      animation-duration: 0.01ms;
      animation-iteration-count: 1;
      transition-duration: 0.01ms;
    }

    .tools-marquee-track {
      transform: none;
    }
  }
</style>
