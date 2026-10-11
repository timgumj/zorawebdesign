<script>
  import { onMount } from "svelte";
  import "$lib/service-page-spacing.css";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MoreServices from "$lib/components/MoreServices.svelte";
  import ProjectsHeader from "$lib/components/ProjectsHeader.svelte";
  import Projects from "$lib/components/Projects.svelte";

  import { projects } from "$lib/data/projects.js";

  /* =========================================================
     SEO — GERMAN WEBDESIGN SERVICE PAGE
  ========================================================= */

  const siteUrl = "https://www.zorawebdesign.com";
  const canonical = `${siteUrl}/webdesign/`;
  const englishUrl = `${siteUrl}/en-2/web-design/`;

  const seo = {
    title: "Webdesign Wien | Websites erstellen lassen – ZoraWebDesign",

    description:
      "Individuelles Webdesign in Wien von Julius Timgum. Moderne WordPress Websites, responsive Entwicklung und SEO. Projekte ansehen & unverbindlich anfragen.",

    canonical,
  };

  /* =========================================================
     NAVIGATION
  ========================================================= */

  const nav = {
    tagline: "SEO • WEBDESIGN • BRANDING",

    services: "[LEISTUNGEN]",
    projects: "[PROJEKTE]",
    process: "[ABLAUF]",
    reviews: "[REVIEWS]",
    faq: "[FAQ]",
    contact: "[KONTAKT]",

    servicesLink: "/#services",
    projectsLink: "/#projects",
    processLink: "/#process",
    reviewsLink: "/#reviews",
    faqLink: "/#faq",
    contactLink: "/#contact",

    languageLabel: "[EN]",
    languageLink: "/en-2/web-design/",
    languageTitle: "Switch to English Web Design",

    freebies: {
      label: "[FREEBIES]",
      items: [
        {
          label: "[WEBSITE AUDIT]",
          href: "/website-audit/",
          title: "Kostenlosen Website-Audit öffnen",
        },
      ],
    },
  };

  const arrowPath = "M2 8H14 M10 4L14 8L10 12";

  /* =========================================================
     WEBDESIGN LEISTUNGEN
  ========================================================= */

  const services = [
    {
      title: "INDIVIDUELLES WEBDESIGN",

      description:
        "Professionelles Webdesign beginnt mit deinen Zielen und den Bedürfnissen deiner Besucher. Ich entwickle eine individuelle Gestaltung mit klarer Navigation, passender Typografie und einer visuellen Sprache, die dein Unternehmen authentisch präsentiert. Statt einer austauschbaren Vorlage erhältst du ein Design, das zu deinen Inhalten und deiner Marke passt.",

      tags: ["UI DESIGN", "UX", "RESPONSIVE"],
    },

    {
      title: "WORDPRESS WEBSITES",

      description:
        "Du möchtest eine WordPress Website erstellen lassen und ihre Inhalte später selbst bearbeiten? Ich entwickle individuell gestaltete WordPress Websites mit einer verständlichen Inhaltsverwaltung. Texte, Bilder und wichtige Seitenbereiche lassen sich nach dem Launch aktualisieren, ohne dass du dafür programmieren können musst.",

      tags: ["WORDPRESS", "CMS", "GUTENBERG"],
    },

    {
      title: "RESPONSIVE WEBDESIGN",

      description:
        "Eine professionelle Website muss auf Smartphone, Tablet und Desktop zuverlässig funktionieren. Ich entwickle responsive Layouts mit flexibler Typografie, übersichtlicher Navigation und gut bedienbaren Elementen. Dabei wird die mobile Nutzererfahrung von Anfang an berücksichtigt und nicht erst nachträglich angepasst.",

      tags: ["MOBILE", "TABLET", "DESKTOP"],
    },

    {
      title: "SEO & WEBSITE-PERFORMANCE",

      description:
        "Eine ansprechende Website sollte auch technisch gut aufgebaut und für Suchmaschinen verständlich sein. Deshalb berücksichtige ich semantisches HTML, eine nachvollziehbare Überschriftenstruktur, Meta-Daten, interne Verlinkungen, Bildoptimierung und Ladezeiten bereits bei der Entwicklung. So entsteht eine solide Grundlage für weitere SEO-Maßnahmen.",

      tags: ["SEO", "CORE WEB VITALS", "PERFORMANCE"],
    },
  ];

  /* =========================================================
     WEBSITE-ERSTELLUNG — PROZESS
  ========================================================= */

  const process = [
    {
      title: "ERSTGESPRÄCH & ZIELE",

      description:
        "Wir besprechen, was deine neue Website erreichen soll, welche Zielgruppe du ansprechen möchtest und welche Inhalte oder Funktionen du benötigst. Du erhältst eine erste Einschätzung zum Projektumfang und den nächsten Schritten.",
    },

    {
      title: "KONZEPT & WEBDESIGN",

      description:
        "Auf Basis deiner Ziele entwickle ich eine sinnvolle Seitenstruktur und die visuelle Richtung. Wir stimmen Gestaltung, Nutzerführung und Inhalte gemeinsam ab, bevor die technische Entwicklung beginnt.",
    },

    {
      title: "ENTWICKLUNG & OPTIMIERUNG",

      description:
        "Ich setze das Design technisch um und prüfe Navigation, responsive Darstellung, Ladezeiten und wichtige SEO-Grundlagen. Bei WordPress-Projekten achte ich zusätzlich darauf, dass du deine Inhalte später möglichst einfach selbst bearbeiten kannst.",
    },

    {
      title: "TESTING, LAUNCH & SUPPORT",

      description:
        "Vor der Veröffentlichung kontrolliere ich die wichtigsten Funktionen und die Darstellung auf unterschiedlichen Geräten. Nach dem Launch kannst du deine Website selbst verwalten oder mich auf Wunsch mit Hosting, Updates und laufender Betreuung beauftragen.",
    },
  ];

  /* =========================================================
     AUSGEWÄHLTE PROJEKTE
     SAME COMPONENT AS THE HOMEPAGE
  ========================================================= */

  const selectedProjects = projects.slice(0, 6);

  /* =========================================================
     WEBSITE-PREISE — INFORMATIV, OHNE FESTPREISE
  ========================================================= */

  const priceFactors = [
    {
      title: "UMFANG & SEITENSTRUKTUR",

      description:
        "Eine kompakte Website mit wenigen Unterseiten benötigt normalerweise weniger Aufwand als ein größerer Unternehmensauftritt mit mehreren Leistungsseiten, Referenzen und individuellen Inhaltsbereichen.",
    },

    {
      title: "DESIGN & FUNKTIONEN",

      description:
        "Der Preis hängt auch davon ab, wie individuell das Design ist und welche Funktionen integriert werden sollen. Buchungssysteme, Mehrsprachigkeit oder spezielle Schnittstellen können den Entwicklungsaufwand erhöhen.",
    },

    {
      title: "INHALTE & TECHNISCHE UMSETZUNG",

      description:
        "Vorhandene Texte, Bilder und ein klares Gestaltungskonzept erleichtern die Umsetzung. Zusätzliche Arbeiten wie Content-Erstellung, aufwendige Migrationen oder individuelle technische Lösungen werden bei der Planung berücksichtigt.",
    },

    {
      title: "HOSTING & LAUFENDE BETREUUNG",

      description:
        "Neben der einmaligen Erstellung können Kosten für Domain, Hosting, kostenpflichtige Drittanbieter und gegebenenfalls WordPress-Wartung entstehen. Ich erkläre dir vorab, welche laufenden Leistungen tatsächlich benötigt werden.",
    },
  ];

  /* =========================================================
     FREE WEBSITE TOOLS
  ========================================================= */

  const freeTools = [
    {
      title: "WEBSITE-KONFIGURATOR",

      description:
        "Du möchtest eine Website erstellen lassen, weißt aber noch nicht genau, welche Seiten und Funktionen du benötigst? Mein kostenloser Website-Konfigurator hilft dir, dein Projekt Schritt für Schritt zu planen.",

      href: "/website-konfigurator/",

      button: "WEBSITE PLANEN",
    },

    {
      title: "KOSTENLOSER WEBSITE-AUDIT",

      description:
        "Du hast bereits eine Website und möchtest wissen, wo Verbesserungsmöglichkeiten bestehen? Analysiere wichtige technische Faktoren wie SEO, Performance, Sicherheit und Barrierefreiheit.",

      href: "/website-audit/",

      button: "WEBSITE PRÜFEN",
    },
  ];

  /* =========================================================
     TOOL MARQUEE
  ========================================================= */

  const tools = [
    { src: "/images/google-analytics.png", alt: "Google Analytics" },
    { src: "/images/google-ads.png", alt: "Google Ads" },
    { src: "/images/hubspot.png", alt: "HubSpot" },
    { src: "/images/mailchimp.png", alt: "Mailchimp" },
    { src: "/images/openai.png", alt: "OpenAI" },
    { src: "/images/vercel-logotype-dark.svg", alt: "Vercel" },
    { src: "/images/svelte.png", alt: "Svelte" },
    { src: "/images/woocommerce.png", alt: "WooCommerce" },
    { src: "/images/shopify.png", alt: "Shopify" },
    { src: "/images/wordpress.png", alt: "WordPress" },
  ];

  const marqueeTools = [...tools, ...tools];

  /* =========================================================
     FAQ — SEARCH INTENT
  ========================================================= */

  const faqs = [
    {
      question: "Wie viel kostet eine Website in Wien?",

      answer:
        "Die Kosten einer professionellen Website hängen von Umfang, Gestaltung und Funktionen ab. Eine kleine Unternehmenswebsite ist in der Regel weniger aufwendig als ein mehrsprachiger Webauftritt mit individuellen Integrationen. Nach einem unverbindlichen Erstgespräch erstelle ich ein Angebot, das zu deinen tatsächlichen Anforderungen passt.",
    },

    {
      question: "Wie lange dauert es, eine Website erstellen zu lassen?",

      answer:
        "Die Projektdauer richtet sich nach der Anzahl der Seiten, den gewünschten Funktionen und der Verfügbarkeit von Texten und Bildern. Eine überschaubare Website lässt sich meist schneller realisieren als ein komplexes Projekt. Vor Projektbeginn stimmen wir einen realistischen Zeitplan ab.",
    },

    {
      question:
        "Was ist der Unterschied zwischen Webdesign und Webentwicklung?",

      answer:
        "Webdesign beschäftigt sich mit der visuellen Gestaltung, der Benutzerfreundlichkeit und der Struktur einer Website. Webentwicklung setzt diese Gestaltung technisch um und sorgt dafür, dass Navigation, Funktionen, Inhaltsverwaltung und die Darstellung auf verschiedenen Geräten funktionieren. Ich biete beide Leistungen aus einer Hand an.",
    },

    {
      question:
        "Kann ich meine WordPress Website nach dem Launch selbst bearbeiten?",

      answer:
        "Ja. Ich entwickle WordPress Websites mit einer verständlichen Inhaltsverwaltung. Damit kannst du wichtige Inhalte wie Texte, Bilder und Seitenbereiche selbst aktualisieren. Auf Wunsch zeige ich dir bei der Übergabe, wie du deine Website eigenständig verwaltest.",
    },

    {
      question: "Wird meine neue Website für Google optimiert?",

      answer:
        "Ich berücksichtige bereits während der Umsetzung wichtige technische SEO-Grundlagen. Dazu gehören semantisches HTML, passende Meta-Daten, eine klare Überschriftenstruktur, interne Links, mobile Nutzbarkeit und Ladezeiten. Gute Rankings hängen allerdings auch von Wettbewerb, Inhalten und weiteren Faktoren ab und können nicht garantiert werden.",
    },

    {
      question: "Kann ich meine bestehende Website neu gestalten lassen?",

      answer:
        "Ja. Bei einem Website-Redesign prüfe ich zunächst, welche Inhalte und Funktionen erhalten bleiben sollen und welche Bereiche verbessert werden können. Dabei achte ich auf die bestehende Seitenstruktur, wichtige URLs und SEO-relevante Inhalte, damit bei einem Relaunch möglichst wenig wertvolle Sichtbarkeit verloren geht.",
    },

    {
      question: "Bietest du auch WordPress Hosting und Wartung an?",

      answer:
        "Ja. Auf Wunsch unterstütze ich dich auch nach dem Launch mit Hosting, Backups, WordPress-Updates, Sicherheitsmaßnahmen und technischer Wartung. Der konkrete Betreuungsumfang wird individuell vereinbart.",
    },

    {
      question: "Arbeitest du nur mit Unternehmen aus Wien?",

      answer:
        "Nein. Ich arbeite als selbstständiger Webdesigner von Wien aus auch mit Unternehmen, Selbstständigen und Organisationen in anderen Teilen Österreichs, in Deutschland und international zusammen. Viele Projekte lassen sich vollständig remote umsetzen.",
    },
  ];

  /* =========================================================
     STRUCTURED DATA
  ========================================================= */

  const structuredData = {
    "@context": "https://schema.org",

    "@graph": [
      {
        "@type": "Service",

        "@id": `${canonical}#service`,

        name: "Webdesign Wien – Professionelle Websites erstellen lassen",

        serviceType: "Webdesign und WordPress Website-Erstellung",

        description: seo.description,

        url: canonical,

        inLanguage: "de-AT",

        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#business`,
          name: "ZoraWebDesign",
          url: `${siteUrl}/`,
        },

        areaServed: [
          {
            "@type": "City",
            name: "Wien",
          },

          {
            "@type": "Country",
            name: "Österreich",
          },
        ],
      },

      {
        "@type": "BreadcrumbList",

        "@id": `${canonical}#breadcrumbs`,

        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Startseite",
            item: `${siteUrl}/`,
          },

          {
            "@type": "ListItem",
            position: 2,
            name: "Webdesign Wien",
            item: canonical,
          },
        ],
      },
    ],
  };

  /* =========================================================
     PAGE THEME
  ========================================================= */

  onMount(() => {
    const body = document.body;
    const html = document.documentElement;

    const hadLight = body.classList.contains("light");
    const htmlHadLight = html.classList.contains("light");

    html.lang = "de";

    html.classList.remove("light");
    body.classList.remove("light");
    body.classList.add("service-dark-page");

    return () => {
      body.classList.remove("service-dark-page");

      if (hadLight) body.classList.add("light");
      if (htmlHadLight) html.classList.add("light");
    };
  });
</script>

<!-- =========================================================
     SEO HEAD
========================================================= -->

<svelte:head>
  <title>{seo.title}</title>

  <meta name="description" content={seo.description} />

  <meta name="robots" content="index, follow, max-image-preview:large" />

  <meta name="author" content="Julius Timgum – ZoraWebDesign" />

  <link rel="canonical" href={canonical} />

  <!-- HREFLANG -->

  <link rel="alternate" hreflang="de" href={canonical} />

  <link rel="alternate" hreflang="en" href={englishUrl} />

  <link rel="alternate" hreflang="x-default" href={canonical} />

  <!-- OPEN GRAPH -->

  <meta property="og:type" content="website" />

  <meta property="og:site_name" content="ZoraWebDesign" />

  <meta property="og:locale" content="de_AT" />

  <meta property="og:locale:alternate" content="en_US" />

  <meta property="og:title" content={seo.title} />

  <meta property="og:description" content={seo.description} />

  <meta property="og:url" content={canonical} />

  <meta property="og:image" content={`${siteUrl}/images/meet-700.webp`} />

  <!-- SOCIAL -->

  <meta name="twitter:card" content="summary_large_image" />

  <meta name="twitter:title" content={seo.title} />

  <meta name="twitter:description" content={seo.description} />

  <meta name="twitter:image" content={`${siteUrl}/images/meet-700.webp`} />

  <!-- STRUCTURED DATA -->

  {@html `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`}
</svelte:head>

<!-- =========================================================
     HEADER
========================================================= -->

<Header {nav} showStaticThemeIcon={false} />

<main class="webdesign-page compact-service-page">
  <!-- =======================================================
       HERO
  ======================================================== -->

  <section class="intro-section">
    <div class="page-shell intro-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column">
        <div class="hero">
          <span class="eyebrow"> ZORAWEBDESIGN / WIEN / ÖSTERREICH </span>

          <h1>
            <span>WEBDESIGN WIEN</span>
            <span class="outlined-title">
              PROFESSIONELLE WEBSITES ERSTELLEN LASSEN
            </span>
          </h1>

          <p class="hero-lead">
            Du möchtest eine moderne Website erstellen lassen, die professionell
            aussieht und deine Besucher überzeugt? Ich gestalte und entwickle
            individuelle, responsive Websites für Selbstständige, Unternehmen
            und Organisationen – persönlich, technisch sauber und mit Blick auf
            Suchmaschinenoptimierung.
          </p>

          <div class="hero-actions">
            <a href="/#contact" class="button button-primary">
              <span>PROJEKT ANFRAGEN</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>

            <a href="#webdesign-projekte" class="button button-outline">
              <span>PROJEKTE ANSEHEN</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M8 2V14M3 9L8 14L13 9"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>

        <!-- =================================================
             INTRODUCTION
        ================================================== -->

        <div class="overview">
          <h2>WAS MACHT PROFESSIONELLES WEBDESIGN ERFOLGREICH?</h2>

          <p>
            Erfolgreiches Webdesign verbindet eine ansprechende Gestaltung mit
            einer verständlichen Seitenstruktur, guter Benutzerfreundlichkeit
            und einer zuverlässigen technischen Umsetzung. Eine professionelle
            Website sollte deine Leistungen klar erklären, Vertrauen schaffen
            und deinen Besuchern helfen, den nächsten Schritt zu gehen.
          </p>

          <p>
            Ich bin Julius Timgum, selbstständiger Webdesigner und Webentwickler
            in Wien. Ich erstelle individuelle Websites für Selbstständige,
            kleine Unternehmen, Kreative und Organisationen. Mein Schwerpunkt
            liegt auf professionellem Webdesign, WordPress und moderner
            Frontend-Entwicklung.
          </p>

          <p>
            Bei jedem Projekt achte ich darauf, dass Design, Inhalte und Technik
            zusammenpassen. Du arbeitest direkt mit mir – von der Planung über
            das Webdesign bis zur Veröffentlichung deiner Website. Auch nach dem
            Launch kann ich dich bei der Betreuung unterstützen.
          </p>

          <ul class="benefit-list">
            <li>Individuelles Webdesign passend zu deinem Unternehmen</li>

            <li>Responsive Websites für Smartphone, Tablet und Desktop</li>

            <li>SEO-freundliche Seitenstruktur und technische Grundlagen</li>

            <li>Persönliche Zusammenarbeit mit einem Webdesigner in Wien</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       SERVICES
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="WELCHE WEBDESIGN-LEISTUNGEN BIETE ICH IN WIEN AN?"
      subtitle="Von der individuellen Gestaltung bis zur technischen Entwicklung: Ich unterstütze dich beim Aufbau einer professionellen Website, die zu deinem Unternehmen und deinen Zielen passt."
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="service-grid">
        {#each services as service}
          <article class="service-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{service.title}</h3>

            <p>{service.description}</p>

            <div class="tag-list">
              {#each service.tags as tag}
                <span>{tag}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>

      <div class="section-note">
        <p>
          Du suchst nicht nur ein schönes Layout, sondern eine zuverlässige
          technische Umsetzung? Auf meiner
          <a href="/#services">Leistungsübersicht</a>
          findest du auch Informationen zu weiteren Angeboten rund um WordPress,
          Webentwicklung, Hosting und Support.
        </p>
      </div>
    </div>
  </section>

  <!-- =======================================================
       PROJECTS
  ======================================================== -->

  <section id="webdesign-projekte" class="projects-section">
    <ProjectsHeader
      title="WEBDESIGN-PROJEKTE UND REFERENZEN"
      subtitle="Einblicke in echte Website-Projekte für Unternehmen, Selbstständige, Kreative und Organisationen. Jedes Projekt verbindet individuelle Gestaltung mit den Anforderungen seiner Zielgruppe."
    />

    <Projects
      projects={selectedProjects}
      loadMoreCopy="Mehr sehen"
      loadMoreText="Weitere Projekte laden"
      loadMoreAria="Weitere Projekte laden"
      viewProjectText="LIVE SITE"
      viewDetailsText="Details ansehen"
      viewDetailsLink="/referenzprojekt/"
      projectTagsLabel="Projektleistungen"
      defaultProjectTags={["Webdesign", "WordPress", "Webshop", "Support"]}
    />

    <div class="projects-more">
      <a href="/#projects" class="button button-outline">
        <span>ALLE PROJEKTE ANSEHEN</span>

        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </a>
    </div>
  </section>

  <!-- =======================================================
       WORK PROCESS
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="WIE LÄUFT DIE ERSTELLUNG EINER WEBSITE AB?"
      subtitle="Von der ersten Anfrage über Konzeption, Webdesign und Entwicklung bis zum Launch: Ein klarer Projektablauf sorgt dafür, dass du weißt, was als Nächstes passiert."
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="process-grid">
        {#each process as step}
          <article class="process-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{step.title}</h3>

            <p>{step.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- =======================================================
       WEBSITE PRICING — NEW SEO SECTION
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="WAS KOSTET EINE PROFESSIONELLE WEBSITE IN WIEN?"
      subtitle="Die Kosten für Webdesign hängen von den Anforderungen deines Projekts ab. Ich erkläre dir, welche Faktoren den Aufwand beeinflussen und wie wir gemeinsam einen passenden Projektrahmen festlegen."
    />

    <div class="page-shell pricing-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column pricing-intro">
        <p>
          Wenn du eine professionelle Website erstellen lassen möchtest, gibt es
          keinen einheitlichen Preis für jedes Projekt. Eine kleine
          Unternehmenswebsite mit wenigen Seiten benötigt normalerweise weniger
          Entwicklungsaufwand als ein umfangreicher Webauftritt mit
          individuellen Funktionen, mehreren Sprachen oder speziellen
          Integrationen.
        </p>

        <p>
          Deshalb bespreche ich mit dir zuerst, welche Inhalte, Seiten und
          Funktionen tatsächlich wichtig sind. Anschließend kann ich den Umfang
          einschätzen und ein individuelles Angebot erstellen. So erhältst du
          eine Lösung, die deinen Anforderungen entspricht, ohne unnötige
          Funktionen einzuplanen.
        </p>
      </div>

      <div class="pricing-grid">
        {#each priceFactors as factor}
          <article class="pricing-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{factor.title}</h3>

            <p>{factor.description}</p>
          </article>
        {/each}
      </div>

      <div class="pricing-bottom">
        <div>
          <h3>DU MÖCHTEST DIE KOSTEN DEINES PROJEKTS EINSCHÄTZEN?</h3>

          <p>
            Nutze meinen kostenlosen Website-Konfigurator, um deine
            Anforderungen zu strukturieren. Danach können wir gemeinsam
            besprechen, welche Umsetzung für dich sinnvoll ist.
          </p>
        </div>

        <a href="/website-konfigurator/" class="button button-outline">
          <span>WEBSITE PLANEN</span>

          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- =======================================================
       FREE TOOLS
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="KOSTENLOSE TOOLS ZUR WEBSITE-PLANUNG UND ANALYSE"
      subtitle="Plane deine neue Website oder prüfe deinen bestehenden Webauftritt. Meine kostenlosen Online-Tools helfen dir, Anforderungen besser zu verstehen und Verbesserungspotenziale zu erkennen."
    />

    <div class="page-shell tools-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="free-tools-grid">
        {#each freeTools as tool}
          <article class="free-tool-card">
            <div class="free-tool-content">
              <span class="blue-dot" aria-hidden="true"></span>

              <h3>{tool.title}</h3>

              <p>{tool.description}</p>
            </div>

            <a href={tool.href} class="free-tool-link">
              <span>{tool.button}</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d={arrowPath}
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </article>
        {/each}
      </div>

      <!-- TECHNOLOGY MARQUEE -->

      <div class="marquee-heading">
        <span class="blue-dot" aria-hidden="true"></span>

        <h3>MEIN DIGITALER TOOLKIT</h3>
      </div>

      <div
        class="tools-marquee"
        aria-label="Technologien und Werkzeuge, mit denen ich arbeite"
      >
        <div class="tools-marquee-track">
          {#each marqueeTools as tool, index}
            <div
              class="marquee-item"
              class:vercel-logo={tool.alt === "Vercel"}
              class:svelte-logo={tool.alt === "Svelte"}
              aria-hidden={index >= tools.length}
            >
              <img
                src={tool.src}
                alt={index < tools.length ? tool.alt : ""}
                loading="lazy"
                decoding="async"
              />
            </div>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       FAQ
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title="HÄUFIGE FRAGEN ZUM WEBDESIGN IN WIEN"
      subtitle="Antworten auf häufige Fragen rund um Website-Kosten, WordPress, Webdesign, SEO, die Projektdauer und die Zusammenarbeit mit einem selbstständigen Webdesigner."
    />

    <div class="page-shell faq-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column">
        <div class="faq-list">
          {#each faqs as faq}
            <details class="faq-item">
              <summary>
                <span>{faq.question}</span>

                <svg
                  class="faq-icon"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 4V16M4 10H16"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </summary>

              <p>{faq.answer}</p>
            </details>
          {/each}
        </div>
      </div>
    </div>
  </section>

  <!-- =======================================================
       FINAL CTA
  ======================================================== -->

  <section class="final-section">
    <div class="page-shell final-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column final-content">
        <span class="eyebrow"> DEIN NÄCHSTES WEBDESIGN-PROJEKT </span>

        <h2>WEBSITE ERSTELLEN LASSEN? LASS UNS ÜBER DEIN PROJEKT SPRECHEN.</h2>

        <p>
          Du planst eine neue Website für dein Unternehmen oder möchtest deinen
          bestehenden Webauftritt modernisieren? Als selbstständiger Webdesigner
          in Wien unterstütze ich dich persönlich – von der ersten Idee bis zur
          fertigen Website.
        </p>

        <a href="/#contact" class="button button-primary">
          <span>PROJEKT ANFRAGEN</span>

          <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M4.34 11.66L11.66 4.34M4.59 4.34H11.66V11.41"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
    </div>
  </section>
  <MoreServices language="de" currentService="webdesign" />
</main>

<!-- =========================================================
     FOOTER
========================================================= -->

<div class="service-footer">
  <Footer
    homepage
    location="HACKENGASSE 22, 1150 WIEN"
    imprintText="IMPRESSUM"
    language="de"
  />
</div>

<!-- =========================================================
     STYLES
========================================================= -->

<style>
  /* =========================================================
     BASE
  ========================================================= */

  :global(body.service-dark-page) {
    margin: 0;
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .webdesign-page {
    --accent: #0043ff;
    --text: #f5f5f5;
    --muted: rgba(255, 255, 255, 0.65);
    --line: rgba(255, 255, 255, 0.09);

    width: 100%;
    overflow: clip;
    background: #000;
    color: var(--text);
    font-family: "DM Sans", Arial, sans-serif;
  }

  .webdesign-page * {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  /* =========================================================
     PAGE SHELL
  ========================================================= */

  .page-shell {
    position: relative;
    width: min(1540px, calc(100% - 32px));
    margin: 0 auto;
    padding-left: 40px;
    padding-right: 40px;
  }

  .edge-line {
    position: absolute;
    z-index: 1;
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

  .reading-column {
    width: min(800px, 100%);
    margin: 0 auto;
  }

  .intro-section,
  .content-section,
  .projects-section,
  .final-section {
    background: #000;
  }

  /* =========================================================
     HERO
  ========================================================= */

  .intro-section {
    border-top: 1px solid var(--line);
  }

  .intro-shell {
    padding-top: 86px;
    padding-bottom: 100px;
  }

  .eyebrow {
    display: block;
    color: var(--muted);
    font-size: 11px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .hero h1 {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 27px 0 0;
    color: var(--text);
    font-size: clamp(28px, 3.25vw, 52px);
    font-weight: 600;
    line-height: 1.03;
    letter-spacing: -0.035em;
    text-transform: uppercase;
  }

  .hero h1 span {
    display: block;
  }

  .outlined-title {
    color: transparent;
    -webkit-text-stroke: 1px #f5f5f5;
  }

  .hero-lead {
    max-width: 650px;
    margin: 28px 0 0;
    color: var(--muted);
    font-size: 17px;
    line-height: 1.75;
  }

  /* =========================================================
     BUTTONS
  ========================================================= */

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
    margin-top: 30px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 46px;
    padding: 0 20px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.06em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
      background 0.25s ease,
      color 0.25s ease;
  }

  .button svg {
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    transition: transform 0.25s ease;
  }

  .button:hover svg {
    transform: translate(3px, -2px);
  }

  .button-primary {
    background: #fff;
    color: #000;
  }

  .button-primary:hover {
    background: transparent;
    color: #fff;
  }

  .button-outline {
    background: transparent;
    color: #fff;
  }

  .button-outline:hover {
    background: #fff;
    color: #000;
  }

  .button:focus-visible,
  .free-tool-link:focus-visible,
  .faq-item summary:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  /* =========================================================
     INTRODUCTION
  ========================================================= */

  .overview {
    margin-top: 90px;
  }

  .overview h2 {
    max-width: 750px;
    margin: 0;
    font-size: clamp(23px, 2vw, 32px);
    font-weight: 600;
    line-height: 1.16;
    letter-spacing: -0.025em;
  }

  .overview p {
    margin: 25px 0 0;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
  }

  .benefit-list {
    display: grid;
    gap: 18px;
    margin: 35px 0 0;
    padding: 0;
    list-style: none;
  }

  .benefit-list li {
    position: relative;
    padding-left: 23px;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.65;
  }

  .benefit-list li::before {
    position: absolute;
    top: 0.65em;
    left: 0;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    content: "";
  }

  /* =========================================================
     SECTION SPACING
  ========================================================= */

  .content-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  .blue-dot {
    display: block;
    flex: 0 0 auto;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: var(--accent);
  }

  /* =========================================================
     SERVICE CARDS
  ========================================================= */

  .service-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .service-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    padding: clamp(32px, 4vw, 65px);
    background: #000;
  }

  .service-card h3 {
    margin: 35px 0 0;
    color: var(--text);
    font-size: clamp(20px, 1.7vw, 27px);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .service-card p {
    max-width: 540px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: auto;
    padding-top: 35px;
  }

  .tag-list span {
    padding: 7px 10px;
    border: 1px solid var(--line);
    color: rgba(255, 255, 255, 0.8);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .section-note {
    max-width: 800px;
    margin: 48px auto 0;
  }

  .section-note p {
    margin: 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .section-note a {
    color: #fff;
    text-decoration-color: var(--accent);
    text-underline-offset: 4px;
  }

  /* =========================================================
     PROJECTS
  ========================================================= */

  .projects-section {
    padding-bottom: 110px;
  }

  .projects-more {
    display: flex;
    justify-content: center;
    padding: 0 24px 30px;
  }

  /* =========================================================
     PROCESS
  ========================================================= */

  .process-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .process-card {
    min-width: 0;
    padding: clamp(32px, 4vw, 60px);
    background: #000;
  }

  .process-card h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.6vw, 25px);
    line-height: 1.2;
    font-weight: 600;
  }

  .process-card p {
    max-width: 550px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  /* =========================================================
     PRICING — NEW
  ========================================================= */

  .pricing-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  .pricing-intro {
    padding-bottom: 55px;
  }

  .pricing-intro p {
    margin: 0 0 22px;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.8;
  }

  .pricing-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .pricing-card {
    min-width: 0;
    padding: clamp(32px, 4vw, 60px);
    background: #000;
  }

  .pricing-card h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.6vw, 25px);
    font-weight: 600;
    line-height: 1.2;
  }

  .pricing-card p {
    max-width: 540px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .pricing-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 45px;
    padding: 50px 0 0;
  }

  .pricing-bottom > div {
    max-width: 650px;
  }

  .pricing-bottom h3 {
    margin: 0;
    font-size: clamp(19px, 1.5vw, 25px);
    font-weight: 600;
    line-height: 1.25;
  }

  .pricing-bottom p {
    margin: 18px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .pricing-bottom .button {
    flex: 0 0 auto;
  }

  /* =========================================================
     FREE TOOLS
  ========================================================= */

  .tools-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  .free-tools-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .free-tool-card {
    display: flex;
    flex-direction: column;
    min-width: 0;
    background: #000;
  }

  .free-tool-content {
    flex: 1;
    padding: clamp(30px, 4vw, 60px);
  }

  .free-tool-content h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.65vw, 27px);
    font-weight: 600;
    line-height: 1.2;
  }

  .free-tool-content p {
    max-width: 530px;
    margin: 22px 0 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  .free-tool-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    min-height: 75px;
    padding: 20px clamp(30px, 4vw, 60px);
    border-top: 1px solid var(--line);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .free-tool-link:hover {
    background: #101010;
  }

  .free-tool-link svg {
    width: 18px;
    height: 18px;
    transition: transform 0.2s ease;
  }

  .free-tool-link:hover svg {
    transform: translateX(5px);
  }

  /* =========================================================
     MARQUEE
  ========================================================= */

  .marquee-heading {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 95px;
    margin-bottom: 30px;
  }

  .marquee-heading h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.04em;
  }

  .tools-marquee {
    width: 100%;
    overflow: hidden;
    border-top: 1px solid var(--line);
    border-bottom: 1px solid var(--line);
    background: #000;
  }

  .tools-marquee-track {
    display: flex;
    align-items: center;
    width: max-content;
    animation: tools-scroll 45s linear infinite;
  }

  .tools-marquee:hover .tools-marquee-track {
    animation-play-state: paused;
  }

  .marquee-item {
    display: flex;
    flex: 0 0 170px;
    align-items: center;
    justify-content: center;
    height: 115px;
    padding: 20px 35px;
  }

  .marquee-item img {
    display: block;
    max-width: 100%;
    max-height: 48px;
    width: auto;
    height: auto;
    object-fit: contain;
  }

  .marquee-item.vercel-logo img {
    filter: invert(1);
  }

  .marquee-item.svelte-logo img {
    max-height: 44px;
  }

  @keyframes tools-scroll {
    from {
      transform: translateX(0);
    }

    to {
      transform: translateX(-50%);
    }
  }

  /* =========================================================
     FAQ
  ========================================================= */

  .faq-shell {
    padding-top: 65px;
    padding-bottom: 135px;
  }

  .faq-list {
    border-top: 1px solid var(--line);
  }

  .faq-item {
    border-bottom: 1px solid var(--line);
  }

  .faq-item summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
    padding: 26px 0;
    cursor: pointer;
    color: var(--text);
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    list-style: none;
  }

  .faq-item summary::-webkit-details-marker {
    display: none;
  }

  .faq-icon {
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
    color: var(--accent);
    transition: transform 0.25s ease;
  }

  .faq-item[open] .faq-icon {
    transform: rotate(45deg);
  }

  .faq-item p {
    margin: 0;
    padding: 0 30px 28px 0;
    color: var(--muted);
    font-size: 15px;
    line-height: 1.8;
  }

  /* =========================================================
     FINAL CTA
  ========================================================= */

  .final-section {
    border-top: 1px solid var(--line);
  }

  .final-shell {
    padding-top: 115px;
    padding-bottom: 130px;
  }

  .final-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .final-content h2 {
    max-width: 700px;
    margin: 25px 0 0;
    font-size: clamp(26px, 3vw, 45px);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.035em;
  }

  .final-content p {
    max-width: 630px;
    margin: 25px 0 0;
    color: var(--muted);
    font-size: 16px;
    line-height: 1.75;
  }

  .final-content .button {
    margin-top: 35px;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1024px) {
    .page-shell {
      padding-left: 26px;
      padding-right: 26px;
    }

    .intro-shell {
      padding-top: 75px;
      padding-bottom: 85px;
    }

    .content-shell,
    .tools-shell,
    .pricing-shell {
      padding-top: 55px;
      padding-bottom: 95px;
    }

    .service-card,
    .process-card,
    .pricing-card,
    .free-tool-content {
      padding: 35px;
    }

    .free-tool-link {
      padding-left: 35px;
      padding-right: 35px;
    }

    .pricing-bottom {
      align-items: flex-start;
      flex-direction: column;
      gap: 25px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .page-shell {
      width: calc(100% - 24px);
      padding-left: 14px;
      padding-right: 14px;
    }

    .intro-shell {
      padding-top: 55px;
      padding-bottom: 70px;
    }

    .hero h1 {
      font-size: clamp(28px, 7vw, 40px);
      overflow-wrap: anywhere;
    }

    .outlined-title {
      -webkit-text-stroke: 0.8px #f5f5f5;
    }

    .hero-lead {
      font-size: 15px;
    }

    .hero-actions {
      align-items: stretch;
    }

    .button {
      min-height: 45px;
    }

    .overview {
      margin-top: 72px;
    }

    .overview h2 {
      font-size: 24px;
    }

    .overview p,
    .pricing-intro p {
      font-size: 15px;
    }

    .content-shell,
    .tools-shell,
    .faq-shell,
    .pricing-shell {
      padding-top: 45px;
      padding-bottom: 75px;
    }

    .service-grid,
    .process-grid,
    .pricing-grid,
    .free-tools-grid {
      grid-template-columns: 1fr;
    }

    .service-card,
    .process-card,
    .pricing-card,
    .free-tool-content {
      padding: 30px 22px;
    }

    .service-card h3,
    .process-card h3,
    .pricing-card h3,
    .free-tool-content h3 {
      font-size: 21px;
    }

    .service-card p,
    .process-card p,
    .pricing-card p,
    .free-tool-content p {
      font-size: 15px;
    }

    .free-tool-link {
      padding: 20px 22px;
    }

    .pricing-intro {
      padding-bottom: 30px;
    }

    .pricing-bottom {
      padding-top: 35px;
    }

    .projects-section {
      padding-bottom: 75px;
    }

    .marquee-heading {
      margin-top: 65px;
    }

    .marquee-item {
      flex-basis: 125px;
      height: 90px;
      padding: 15px 25px;
    }

    .marquee-item img {
      max-height: 36px;
    }

    .faq-item summary {
      font-size: 15px;
    }

    .final-shell {
      padding-top: 80px;
      padding-bottom: 95px;
    }

    .final-content h2 {
      font-size: 29px;
    }

    .final-content p {
      font-size: 15px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }

    .tools-marquee-track {
      animation: none;
    }

    .button,
    .button svg,
    .free-tool-link svg,
    .faq-icon {
      transition: none;
    }
  }
</style>
