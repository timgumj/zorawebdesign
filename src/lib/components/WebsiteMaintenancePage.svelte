<script>
  import { onMount } from "svelte";
  import "$lib/service-page-spacing.css";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MoreServices from "$lib/components/MoreServices.svelte";
  import ProjectsHeader from "$lib/components/ProjectsHeader.svelte";
  import Projects from "$lib/components/Projects.svelte";

  import { projects as projectsDE } from "$lib/data/projects.js";
  import { projects as projectsEN } from "$lib/data/projects-en.js";

  let { language = "de" } = $props();

  const isGerman = $derived(language === "de");

  const siteUrl = "https://www.zorawebdesign.com";
  const germanUrl = `${siteUrl}/website-wartung/`;
  const englishUrl = `${siteUrl}/en-2/website-maintenance/`;

  const content = {
    de: {
      seo: {
        title: "Website Wartung Wien | WordPress Support – ZoraWebDesign",
        description:
          "Website Betreuung und WordPress Wartung in Wien. Updates, Backups, Sicherheit, Fehlerbehebung und technischer Support – persönlich von ZoraWebDesign.",
      },

      nav: {
        tagline: "SEO • WEBDESIGN • BRANDING",
        services: "[LEISTUNGEN]",
        projects: "[PROJEKTE]",
        process: "[ABLAUF]",
        reviews: "[REVIEWS]",
        faq: "[FAQ]",
        contact: "[KONTAKT]",
        languageLabel: "[EN]",
        languageLink: "/en-2/website-maintenance/",
        languageTitle: "Switch to English Website Maintenance",
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
      },

      hero: {
        eyebrow: "ZORAWEBDESIGN / WIEN / ÖSTERREICH",
        first: "WEBSITE WARTUNG WIEN",
        second: "& WORDPRESS SUPPORT",
        lead: "Deine Website ist online – aber wer kümmert sich um Updates, Backups, Sicherheit und technische Probleme? Ich unterstütze Unternehmen und Selbstständige in Wien bei der laufenden Betreuung ihrer WordPress Websites und bestehenden Webauftritte.",
        primary: "SUPPORT ANFRAGEN",
        secondary: "LEISTUNGEN ANSEHEN",
      },

      intro: {
        title: "WARUM IST REGELMÄSSIGE WEBSITE-WARTUNG WICHTIG?",
        paragraphs: [
          "Eine professionelle Website braucht auch nach dem Launch Aufmerksamkeit. Veraltete Software, fehlende Backups, technische Fehler oder nicht mehr funktionierende Formulare können Sicherheit, Nutzererfahrung und Geschäftsabläufe beeinträchtigen.",
          "Website-Wartung hilft dabei, Probleme frühzeitig zu erkennen und die technische Grundlage zuverlässig zu halten. Dazu gehören geplante Updates, Sicherheitsmaßnahmen, Backups, Funktionsprüfungen und die Behebung von Fehlern.",
          "Ich bin Julius Timgum, selbstständiger Webdesigner und WordPress Entwickler in Wien. Ich unterstütze dich persönlich bei technischen Fragen, Wartungsarbeiten und Verbesserungen deiner Website – ohne unnötig komplizierte Support-Prozesse.",
        ],
        benefits: [
          "Regelmäßige WordPress- und Plugin-Updates",
          "Backups und Unterstützung bei der Wiederherstellung",
          "Technische Fehlerbehebung und Funktionskontrollen",
          "Persönlicher Ansprechpartner für Website-Support",
        ],
      },

      servicesHeading: {
        title: "WELCHE WEBSITE-WARTUNGSLEISTUNGEN BIETE ICH AN?",
        subtitle:
          "Von regelmäßigen Updates über technische Unterstützung bis zu Sicherheit und Backups: Ich helfe dabei, deine Website funktionsfähig und wartbar zu halten.",
      },

      services: [
        {
          title: "WORDPRESS UPDATES",
          description:
            "Ich unterstütze bei Updates von WordPress Core, Themes und Plugins. Bei größeren Änderungen werden Kompatibilität und wichtige Website-Funktionen geprüft, damit Probleme nach einem Update möglichst früh erkannt werden.",
          tags: ["WORDPRESS", "PLUGINS", "THEMES"],
        },
        {
          title: "BACKUPS & WIEDERHERSTELLUNG",
          description:
            "Regelmäßige Sicherungen sind eine wichtige Grundlage für den Website-Betrieb. Ich helfe bei der Einrichtung einer geeigneten Backup-Strategie und bei der Wiederherstellung vorhandener Sicherungen, sofern die technischen Voraussetzungen gegeben sind.",
          tags: ["BACKUPS", "RESTORE", "RECOVERY"],
        },
        {
          title: "WEBSITE-SICHERHEIT",
          description:
            "Ich prüfe grundlegende Sicherheitsmaßnahmen, Softwarestände und relevante Konfigurationen. Dazu können Zugriffsschutz, geeignete Updates, sichere Verbindungen und technische Empfehlungen zur Risikoreduzierung gehören.",
          tags: ["SECURITY", "SSL", "ACCESS"],
        },
        {
          title: "TECHNISCHER WORDPRESS SUPPORT",
          description:
            "Fehlermeldungen, defekte Layouts, Plugin-Konflikte oder nicht funktionierende Formulare? Ich untersuche die Ursache und unterstütze bei der Fehlerbehebung, soweit dies mit den vorhandenen Zugriffsrechten und Systemen möglich ist.",
          tags: ["TROUBLESHOOTING", "DEBUGGING", "SUPPORT"],
        },
        {
          title: "PERFORMANCE & FUNKTIONSKONTROLLE",
          description:
            "Ich kann wichtige Website-Funktionen und technische Leistungswerte kontrollieren. Bei Ladezeitproblemen prüfe ich unter anderem Bilder, Plugins, Caching und andere mögliche Engpässe.",
          tags: ["PERFORMANCE", "CORE WEB VITALS", "TESTING"],
        },
        {
          title: "WEBSITE-ANPASSUNGEN & BETREUUNG",
          description:
            "Neben der technischen Wartung unterstütze ich bei kleineren Änderungen an Layouts, Inhalten und bestehenden Funktionen. Größere Erweiterungen oder Redesigns werden bei Bedarf als separates Projekt geplant.",
          tags: ["CONTENT", "IMPROVEMENTS", "MAINTENANCE"],
        },
      ],

      coverageHeading: {
        title: "WAS GEHÖRT ZU EINER LAUFENDEN WEBSITE-BETREUUNG?",
        subtitle:
          "Eine Wartungsvereinbarung sollte klar festhalten, welche Aufgaben regelmäßig erledigt werden und welche zusätzlichen Arbeiten separat vereinbart werden.",
      },

      coverage: [
        {
          title: "REGELMÄSSIGE WARTUNG",
          description:
            "Vereinbarte Software-Updates, Backup-Kontrollen, grundlegende Funktionsprüfungen und technische Empfehlungen können Bestandteil einer laufenden Betreuung sein.",
          tags: ["UPDATES", "BACKUPS", "CHECKS"],
        },
        {
          title: "SUPPORT BEI BEDARF",
          description:
            "Einzelne technische Probleme, Änderungen oder Fragen lassen sich auch nach Absprache bearbeiten. Umfang, Verfügbarkeit und Reaktionszeiten werden vorab geklärt.",
          tags: ["HELP", "FIXES", "CHANGES"],
        },
      ],

      processHeading: {
        title: "WIE LÄUFT DIE WORDPRESS-BETREUUNG AB?",
        subtitle:
          "Damit die Zusammenarbeit nachvollziehbar bleibt, beginnen wir mit einer technischen Bestandsaufnahme und legen die benötigten Leistungen gemeinsam fest.",
      },

      process: [
        {
          title: "WEBSITE PRÜFEN",
          description:
            "Ich verschaffe mir einen Überblick über WordPress, Themes, Plugins, Hosting und vorhandene Sicherungen. Dabei identifizieren wir mögliche Risiken und aktuelle Probleme.",
        },
        {
          title: "BETREUUNGSUMFANG FESTLEGEN",
          description:
            "Wir klären, welche Aufgaben regelmäßig erledigt werden sollen und welche Leistungen nur bei Bedarf benötigt werden. Auch Zuständigkeiten und Zugriffsrechte werden abgestimmt.",
        },
        {
          title: "WARTUNG & SUPPORT",
          description:
            "Ich übernehme die vereinbarten technischen Aufgaben, dokumentiere wichtige Änderungen nach Bedarf und prüfe relevante Website-Funktionen.",
        },
        {
          title: "KONTROLLE & WEITERE BETREUUNG",
          description:
            "Bei wiederkehrender Betreuung besprechen wir auffällige Probleme, technische Empfehlungen und notwendige nächste Schritte.",
        },
      ],

      projectsHeading: {
        title: "AUSGEWÄHLTE WEBSITE-PROJEKTE",
        subtitle:
          "Einblicke in meine Arbeit mit WordPress, Webdesign und technischer Website-Entwicklung. Diese Referenzen zeigen unterschiedliche Website-Projekte, nicht ausschließlich laufende Wartungsverträge.",
      },

      projectsButton: "ALLE PROJEKTE ANSEHEN",

      pricingHeading: {
        title: "WAS KOSTET WEBSITE-WARTUNG UND WORDPRESS SUPPORT IN WIEN?",
        subtitle:
          "Die Kosten hängen vom technischen Zustand, der Anzahl der Websites, dem Wartungsumfang und dem gewünschten Support ab.",
      },

      pricingIntro: [
        "Eine kleine Unternehmenswebsite mit wenigen Plugins und überschaubaren Funktionen benötigt meist weniger Wartungsaufwand als ein mehrsprachiger WordPress-Auftritt mit individuellen Erweiterungen oder einem Onlineshop.",
        "Je nach Bedarf kann eine einmalige technische Unterstützung oder eine regelmäßige Betreuung sinnvoll sein. Nach einer kurzen Einschätzung deiner Website können wir Leistungen, Zuständigkeiten und Kosten transparent vereinbaren.",
      ],

      pricingFactors: [
        {
          title: "TECHNISCHE KOMPLEXITÄT",
          description:
            "Themes, Plugins, individuelle Funktionen und externe Integrationen beeinflussen den erforderlichen Wartungs- und Testaufwand.",
        },
        {
          title: "WARTUNGSINTERVALL",
          description:
            "Wie häufig Aktualisierungen, Prüfungen und Sicherungen durchgeführt werden sollen, wird passend zum System vereinbart.",
        },
        {
          title: "SUPPORT-UMFANG",
          description:
            "Geplante Wartung unterscheidet sich von zusätzlichen Fehlerbehebungen, Funktionsänderungen oder umfangreicheren Entwicklungsaufgaben.",
        },
        {
          title: "HOSTING & ZUGRIFFE",
          description:
            "Hosting-Umgebung, verfügbare Zugänge, Backup-Möglichkeiten und Drittanbieter beeinflussen die technische Umsetzung.",
        },
      ],

      pricingCta: {
        title: "DU BRAUCHST UNTERSTÜTZUNG MIT DEINER WEBSITE?",
        description:
          "Starte mit meinem kostenlosen Website-Audit oder beschreibe mir direkt dein technisches Problem.",
        button: "WEBSITE PRÜFEN",
        href: "/website-audit/",
      },

      toolsHeading: {
        title: "KOSTENLOSE TOOLS FÜR WEBSITE-CHECK UND PLANUNG",
        subtitle:
          "Prüfe wichtige technische Grundlagen deiner Website oder plane eine zukünftige Modernisierung.",
      },

      freeTools: [
        {
          title: "KOSTENLOSER WEBSITE-AUDIT",
          description:
            "Untersuche technische Faktoren rund um SEO, Performance, Sicherheit und Barrierefreiheit. Der Audit kann erste Hinweise auf Verbesserungsmöglichkeiten geben.",
          href: "/website-audit/",
          button: "WEBSITE PRÜFEN",
        },
        {
          title: "WEBSITE-KONFIGURATOR",
          description:
            "Du planst eine größere Überarbeitung oder einen Relaunch? Strukturiere deine Anforderungen und die gewünschten Funktionen mit meinem kostenlosen Konfigurator.",
          href: "/website-konfigurator/",
          button: "WEBSITE PLANEN",
        },
      ],

      toolkit: "MEIN DIGITALER TOOLKIT",

      faqHeading: {
        title: "HÄUFIGE FRAGEN ZU WORDPRESS WARTUNG & SUPPORT",
        subtitle:
          "Antworten auf häufige Fragen zu Updates, Backups, Sicherheit, Supportkosten und der Betreuung bestehender Websites.",
      },

      faqs: [
        {
          question: "WIE OFT SOLLTE EINE WORDPRESS WEBSITE GEWARTET WERDEN?",
          answer:
            "Das hängt von den installierten Plugins, dem Theme, dem Hosting und der Nutzung der Website ab. Sicherheitsrelevante Updates sollten zeitnah geprüft werden. Ein geeignetes Wartungsintervall wird auf Basis des tatsächlichen Systems festgelegt.",
        },
        {
          question: "WAS KOSTET WORDPRESS WARTUNG IN WIEN?",
          answer:
            "Die Kosten richten sich nach Website-Größe, technischem Zustand, Wartungshäufigkeit und zusätzlichen Supportleistungen. Nach einer kurzen technischen Einschätzung kann ich ein individuelles Angebot erstellen.",
        },
        {
          question:
            "WAS PASSIERT, WENN EIN WORDPRESS UPDATE MEINE WEBSITE BESCHÄDIGT?",
          answer:
            "Updates können gelegentlich zu Konflikten führen. Deshalb sind geeignete Backups und Funktionsprüfungen wichtig. Wenn ein Problem auftritt, untersuche ich die Ursache und unterstütze bei einer Reparatur oder Wiederherstellung, soweit dies technisch möglich ist.",
        },
        {
          question:
            "KANNST DU AUCH EINE WEBSITE BETREUEN, DIE DU NICHT ERSTELLT HAST?",
          answer:
            "Ja, grundsätzlich ist das möglich. Vor der Übernahme prüfe ich die technische Struktur, vorhandene Erweiterungen, Hosting und Zugriffsrechte, um den benötigten Aufwand einschätzen zu können.",
        },
        {
          question: "SIND BACKUPS UND SICHERHEITSUPDATES INKLUSIVE?",
          answer:
            "Das hängt vom vereinbarten Betreuungsumfang ab. Wir legen vorab fest, welche Aufgaben enthalten sind, wie häufig diese durchgeführt werden und welche externen Dienste gegebenenfalls benötigt werden.",
        },
        {
          question: "BIETEST DU AUCH HILFE BEI WORDPRESS FEHLERN AN?",
          answer:
            "Ja. Ich unterstütze bei der Untersuchung von Fehlermeldungen, Plugin-Konflikten, Darstellungsproblemen und anderen technischen Schwierigkeiten. Die Möglichkeiten hängen von der Ursache und den verfügbaren Systemzugängen ab.",
        },
        {
          question: "BRAUCHE ICH EINEN MONATLICHEN WARTUNGSVERTRAG?",
          answer:
            "Nicht unbedingt. Für manche Websites ist regelmäßige Betreuung sinnvoll, während andere nur gelegentliche technische Unterstützung benötigen. Wir können den passenden Umfang gemeinsam besprechen.",
        },
        {
          question: "BIETEST DU WORDPRESS SUPPORT AUCH AUSSERHALB WIENS AN?",
          answer:
            "Ja. Ich arbeite von Wien aus auch remote mit Unternehmen und Selbstständigen in anderen Regionen Österreichs, Deutschland und international zusammen.",
        },
      ],

      final: {
        eyebrow: "DEINE WEBSITE IN GUTEN HÄNDEN",
        title: "WORDPRESS PROBLEM ODER WARTUNG NÖTIG?",
        description:
          "Du benötigst technische Unterstützung, regelmäßige Updates oder Hilfe bei einer bestehenden Website? Beschreibe mir dein Anliegen und wir besprechen die nächsten Schritte.",
        button: "SUPPORT ANFRAGEN",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 WIEN",
        imprint: "IMPRESSUM",
      },

      projectProps: {
        details: "Details ansehen",
        detailsLink: "/referenzprojekt/",
        tags: "Projektleistungen",
        defaults: ["Webdesign", "WordPress", "Wartung", "Support"],
      },
    },

    en: {
      seo: {
        title: "Website Maintenance Vienna | WordPress Support – ZoraWebDesign",
        description:
          "WordPress maintenance and website support in Vienna. Updates, backups, security checks, troubleshooting and ongoing technical support by ZoraWebDesign.",
      },

      nav: {
        tagline: "SEO • WEB DESIGN • BRANDING",
        services: "SERVICES",
        projects: "PROJECTS",
        process: "PROCESS",
        reviews: "REVIEWS",
        faq: "FAQ",
        contact: "CONTACT",
        languageLabel: "DE",
        languageLink: "/website-wartung/",
        languageTitle: "Zur deutschen Wartungs-Seite wechseln",
        freebies: {
          label: "WEBSITE TOOLS",
          items: [
            {
              label: "WEBSITE AUDIT",
              href: "/en-2/website-audit/",
              title: "Open the free Website Audit",
            },
            {
              label: "WEBSITE CONFIGURATOR",
              href: "/en-2/website-configurator/",
              title: "Open the Website Configurator",
            },
          ],
        },
      },

      hero: {
        eyebrow: "ZORAWEBDESIGN / VIENNA / AUSTRIA",
        first: "WEBSITE MAINTENANCE VIENNA",
        second: "& WORDPRESS SUPPORT",
        lead: "Your website is live, but who takes care of updates, backups, security and technical problems? I help businesses and freelancers maintain their WordPress websites with practical technical support and ongoing maintenance.",
        primary: "REQUEST SUPPORT",
        secondary: "EXPLORE SERVICES",
      },

      intro: {
        title: "WHY IS REGULAR WEBSITE MAINTENANCE IMPORTANT?",
        paragraphs: [
          "A professional website needs attention after launch. Outdated software, missing backups, technical errors or broken forms can affect security, user experience and important business processes.",
          "Regular website maintenance helps identify potential problems before they become more serious. Typical tasks include software updates, backups, basic security measures, functionality checks and troubleshooting.",
          "I'm Julius Timgum, a freelance web designer and WordPress developer based in Vienna. I provide personal technical assistance, website maintenance and practical improvements without unnecessarily complicated support arrangements.",
        ],
        benefits: [
          "WordPress core, theme and plugin updates",
          "Backups and recovery assistance",
          "Troubleshooting and functionality checks",
          "Direct communication with your website developer",
        ],
      },

      servicesHeading: {
        title: "WHAT WEBSITE MAINTENANCE SERVICES DO I OFFER?",
        subtitle:
          "From regular WordPress updates to technical troubleshooting, backups and security, I help keep business websites functional and manageable.",
      },

      services: [
        {
          title: "WORDPRESS UPDATES",
          description:
            "I help manage updates to WordPress core, themes and plugins. For larger changes, I review compatibility and important website functions to identify potential problems as early as possible.",
          tags: ["WORDPRESS", "PLUGINS", "THEMES"],
        },
        {
          title: "WEBSITE BACKUPS & RECOVERY",
          description:
            "Reliable backups are an important part of website maintenance. I help establish an appropriate backup approach and assist with restoring existing backups when the technical requirements are in place.",
          tags: ["BACKUPS", "RESTORE", "RECOVERY"],
        },
        {
          title: "WEBSITE SECURITY",
          description:
            "I review essential security measures, software versions and relevant settings. This may include access protection, secure connections, update practices and technical recommendations to reduce avoidable risks.",
          tags: ["SECURITY", "SSL", "ACCESS"],
        },
        {
          title: "TECHNICAL WORDPRESS SUPPORT",
          description:
            "Dealing with errors, broken layouts, plugin conflicts or forms that no longer work? I investigate technical problems and help resolve them based on the available access and website configuration.",
          tags: ["TROUBLESHOOTING", "DEBUGGING", "SUPPORT"],
        },
        {
          title: "PERFORMANCE & FUNCTION CHECKS",
          description:
            "I can review essential website features and performance indicators. For loading issues, I examine potential bottlenecks involving images, plugins, caching and other technical resources.",
          tags: ["PERFORMANCE", "CORE WEB VITALS", "TESTING"],
        },
        {
          title: "WEBSITE CHANGES & ONGOING CARE",
          description:
            "Alongside routine maintenance, I can assist with smaller layout, content and functionality changes. Larger development projects and redesigns can be discussed separately.",
          tags: ["CONTENT", "IMPROVEMENTS", "MAINTENANCE"],
        },
      ],

      coverageHeading: {
        title: "WHAT IS INCLUDED IN ONGOING WEBSITE SUPPORT?",
        subtitle:
          "A maintenance arrangement should make clear which tasks are handled regularly and which additional services are agreed separately.",
      },

      coverage: [
        {
          title: "SCHEDULED MAINTENANCE",
          description:
            "Agreed software updates, backup checks, essential functionality reviews and technical recommendations can form part of an ongoing support arrangement.",
          tags: ["UPDATES", "BACKUPS", "CHECKS"],
        },
        {
          title: "SUPPORT WHEN NEEDED",
          description:
            "Individual technical problems, changes and questions can also be handled by arrangement. Scope, availability and response expectations are discussed in advance.",
          tags: ["HELP", "FIXES", "CHANGES"],
        },
      ],

      processHeading: {
        title: "HOW DOES WORDPRESS MAINTENANCE WORK?",
        subtitle:
          "We begin by reviewing your website's existing technical setup and agreeing on a support arrangement that reflects your actual needs.",
      },

      process: [
        {
          title: "REVIEW YOUR WEBSITE",
          description:
            "I assess WordPress, installed themes and plugins, hosting arrangements and existing backups. We identify current problems and potential risks.",
        },
        {
          title: "DEFINE THE SUPPORT SCOPE",
          description:
            "We agree on routine maintenance tasks, occasional support requirements, access permissions and responsibilities.",
        },
        {
          title: "MAINTENANCE & TROUBLESHOOTING",
          description:
            "I carry out the agreed technical tasks, document relevant changes where appropriate and review important website functions.",
        },
        {
          title: "FOLLOW-UP & IMPROVEMENTS",
          description:
            "For ongoing arrangements, we can review technical concerns, recommendations and any further work required.",
        },
      ],

      projectsHeading: {
        title: "SELECTED WEBSITE PROJECTS",
        subtitle:
          "Explore examples of my WordPress, web design and development work. These projects demonstrate different website implementations rather than exclusively ongoing maintenance contracts.",
      },

      projectsButton: "VIEW ALL PROJECTS",

      pricingHeading: {
        title: "HOW MUCH DOES WEBSITE MAINTENANCE COST IN VIENNA?",
        subtitle:
          "Maintenance pricing depends on your website's complexity, technical condition and the level of support you require.",
      },

      pricingIntro: [
        "A small business website with a simple WordPress setup usually requires less maintenance than a complex multilingual website, custom platform or online store with many integrations.",
        "Depending on your needs, we can discuss one-time technical assistance or ongoing maintenance. After reviewing your website, I can explain the appropriate scope and provide an individual proposal.",
      ],

      pricingFactors: [
        {
          title: "WEBSITE COMPLEXITY",
          description:
            "Themes, plugins, custom features and third-party integrations influence the maintenance and testing effort.",
        },
        {
          title: "MAINTENANCE FREQUENCY",
          description:
            "The frequency of software updates, checks and backups can be agreed according to the needs of the website.",
        },
        {
          title: "SUPPORT REQUIREMENTS",
          description:
            "Routine maintenance differs from additional troubleshooting, feature changes or larger development tasks.",
        },
        {
          title: "HOSTING & ACCESS",
          description:
            "Your hosting environment, available credentials, backup options and third-party services affect what can be managed.",
        },
      ],

      pricingCta: {
        title: "NEED HELP WITH YOUR EXISTING WEBSITE?",
        description:
          "Start with my free Website Audit or get in touch to describe the technical issue you're facing.",
        button: "AUDIT YOUR WEBSITE",
        href: "/en-2/website-audit/",
      },

      toolsHeading: {
        title: "FREE WEBSITE AUDIT & PLANNING TOOLS",
        subtitle:
          "Review important technical aspects of your current website or plan its future improvements.",
      },

      freeTools: [
        {
          title: "FREE WEBSITE AUDIT",
          description:
            "Check important technical areas including SEO, performance, security and accessibility. The audit can help identify potential improvements.",
          href: "/en-2/website-audit/",
          button: "AUDIT YOUR WEBSITE",
        },
        {
          title: "WEBSITE CONFIGURATOR",
          description:
            "Planning a larger website update or redesign? Organize your project requirements and desired features with my free planning tool.",
          href: "/en-2/website-configurator/",
          button: "PLAN YOUR WEBSITE",
        },
      ],

      toolkit: "MY DIGITAL TOOLKIT",

      faqHeading: {
        title: "FREQUENTLY ASKED QUESTIONS ABOUT WORDPRESS MAINTENANCE",
        subtitle:
          "Answers to common questions about updates, backups, security, support costs and maintaining existing websites.",
      },

      faqs: [
        {
          question: "HOW OFTEN SHOULD A WORDPRESS WEBSITE BE MAINTAINED?",
          answer:
            "The appropriate schedule depends on your themes, plugins, hosting and website usage. Security-related updates should be reviewed promptly. A suitable maintenance schedule can be agreed after assessing your setup.",
        },
        {
          question: "HOW MUCH DOES WORDPRESS MAINTENANCE COST IN VIENNA?",
          answer:
            "Costs depend on website size, technical condition, maintenance frequency and additional support requirements. I can prepare an individual proposal after a brief technical review.",
        },
        {
          question: "WHAT IF A WORDPRESS UPDATE BREAKS MY WEBSITE?",
          answer:
            "Updates can occasionally create conflicts. Suitable backups and functionality checks are therefore important. If an issue occurs, I can investigate and help repair or restore the website where technically possible.",
        },
        {
          question: "CAN YOU MAINTAIN A WEBSITE YOU DIDN'T BUILD?",
          answer:
            "Yes, in many cases. Before accepting responsibility, I review the website's structure, extensions, hosting and access permissions so I can understand the work involved.",
        },
        {
          question: "ARE BACKUPS AND SECURITY UPDATES INCLUDED?",
          answer:
            "This depends on the agreed maintenance scope. We define the tasks, frequency and any required third-party services before the work begins.",
        },
        {
          question: "CAN YOU HELP WITH WORDPRESS ERRORS AND PLUGIN CONFLICTS?",
          answer:
            "Yes. I help investigate error messages, plugin conflicts, display issues and other technical problems. The available solutions depend on the cause and the access provided.",
        },
        {
          question: "DO I NEED A MONTHLY WEBSITE MAINTENANCE PLAN?",
          answer:
            "Not necessarily. Some websites benefit from regular scheduled maintenance, while others need occasional technical assistance. We can choose an arrangement that fits your requirements.",
        },
        {
          question: "DO YOU OFFER REMOTE WORDPRESS SUPPORT?",
          answer:
            "Yes. I am based in Vienna and also work remotely with businesses and freelancers throughout Austria, Germany and internationally.",
        },
      ],

      final: {
        eyebrow: "KEEP YOUR WEBSITE RUNNING",
        title: "NEED WORDPRESS SUPPORT OR WEBSITE MAINTENANCE?",
        description:
          "Whether you need technical assistance, regular updates or help with an existing website, tell me what you're experiencing and we can discuss the next steps.",
        button: "REQUEST SUPPORT",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 VIENNA",
        imprint: "IMPRINT",
      },

      projectProps: {
        details: "View details",
        detailsLink: "/en-2/reference-project/",
        tags: "Project services",
        defaults: ["Web Design", "WordPress", "Maintenance", "Support"],
      },
    },
  };

  const copy = $derived(isGerman ? content.de : content.en);
  const canonical = $derived(isGerman ? germanUrl : englishUrl);
  const homeUrl = $derived(isGerman ? "/" : "/en-2/");
  const contactUrl = $derived(`${homeUrl}#contact`);

  const nav = $derived({
    ...copy.nav,
    servicesLink: `${homeUrl}#services`,
    projectsLink: `${homeUrl}#projects`,
    processLink: `${homeUrl}#process`,
    reviewsLink: `${homeUrl}#reviews`,
    faqLink: `${homeUrl}#faq`,
    contactLink: contactUrl,
  });

  const selectedProjects = $derived(
    (isGerman ? projectsDE : projectsEN).slice(0, 6),
  );

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

  const structuredData = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: isGerman
          ? "Website Wartung und WordPress Support in Wien"
          : "Website Maintenance and WordPress Support in Vienna",
        serviceType: isGerman
          ? "WordPress Wartung, Website Betreuung und technischer Support"
          : "WordPress Maintenance, Website Care and Technical Support",
        description: copy.seo.description,
        url: canonical,
        inLanguage: isGerman ? "de-AT" : "en",
        provider: {
          "@type": "ProfessionalService",
          "@id": `${siteUrl}/#business`,
          name: "ZoraWebDesign",
          url: `${siteUrl}/`,
        },
        areaServed: [
          { "@type": "City", name: "Vienna" },
          { "@type": "Country", name: "Austria" },
        ],
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonical}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: isGerman ? "Startseite" : "Home",
            item: `${siteUrl}${homeUrl}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: isGerman
              ? "Website Wartung Wien"
              : "Website Maintenance Vienna",
            item: canonical,
          },
        ],
      },
    ],
  });

  onMount(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousLanguage = html.lang;
    const hadBodyLight = body.classList.contains("light");
    const hadHtmlLight = html.classList.contains("light");

    html.lang = isGerman ? "de" : "en";
    html.classList.remove("light");
    body.classList.remove("light");
    body.classList.add("maintenance-dark-page");

    return () => {
      body.classList.remove("maintenance-dark-page");
      html.lang = previousLanguage;

      if (hadBodyLight) body.classList.add("light");
      if (hadHtmlLight) html.classList.add("light");
    };
  });
</script>

<svelte:head>
  <title>{copy.seo.title}</title>

  <meta name="description" content={copy.seo.description} />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="author" content="Julius Timgum – ZoraWebDesign" />

  <link rel="canonical" href={canonical} />

  <link rel="alternate" hreflang="de" href={germanUrl} />
  <link rel="alternate" hreflang="en" href={englishUrl} />
  <link rel="alternate" hreflang="x-default" href={germanUrl} />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="ZoraWebDesign" />
  <meta property="og:locale" content={isGerman ? "de_AT" : "en_US"} />
  <meta property="og:title" content={copy.seo.title} />
  <meta property="og:description" content={copy.seo.description} />
  <meta property="og:url" content={canonical} />

  <meta property="og:image" content={`${siteUrl}/images/meet-700.webp`} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={copy.seo.title} />
  <meta name="twitter:description" content={copy.seo.description} />

  <meta name="twitter:image" content={`${siteUrl}/images/meet-700.webp`} />

  {@html `<script type="application/ld+json">${JSON.stringify(structuredData).replace(/</g, "\\u003c")}</script>`}
</svelte:head>

<Header {nav} showStaticThemeIcon={false} />

<main class="maintenance-page compact-service-page">
  <!-- HERO -->

  <section class="intro-section">
    <div class="page-shell intro-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column">
        <div class="hero">
          <span class="eyebrow">{copy.hero.eyebrow}</span>

          <h1>
            <span>{copy.hero.first}</span>
            <span class="outlined-title">{copy.hero.second}</span>
          </h1>

          <p class="hero-lead">{copy.hero.lead}</p>

          <div class="hero-actions">
            <a href={contactUrl} class="button button-primary">
              {copy.hero.primary}
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

            <a href="#maintenance-services" class="button button-outline">
              {copy.hero.secondary}
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

        <div class="overview">
          <h2>{copy.intro.title}</h2>

          {#each copy.intro.paragraphs as paragraph}
            <p>{paragraph}</p>
          {/each}

          <ul class="benefit-list">
            {#each copy.intro.benefits as benefit}
              <li>{benefit}</li>
            {/each}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- MAINTENANCE SERVICES -->

  <section id="maintenance-services" class="content-section">
    <ProjectsHeader
      title={copy.servicesHeading.title}
      subtitle={copy.servicesHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.services as service}
          <article class="content-card">
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
    </div>
  </section>

  <!-- TYPES OF SUPPORT -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.coverageHeading.title}
      subtitle={copy.coverageHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.coverage as item}
          <article class="content-card">
            <span class="blue-dot" aria-hidden="true"></span>
            <h3>{item.title}</h3>
            <p>{item.description}</p>

            <div class="tag-list">
              {#each item.tags as tag}
                <span>{tag}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- PROCESS -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.processHeading.title}
      subtitle={copy.processHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.process as step}
          <article class="content-card">
            <span class="blue-dot" aria-hidden="true"></span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- PROJECTS -->

  <section class="projects-section">
    <ProjectsHeader
      title={copy.projectsHeading.title}
      subtitle={copy.projectsHeading.subtitle}
    />

    <Projects
      projects={selectedProjects}
      loadMoreCopy={isGerman ? "Mehr sehen" : "See more"}
      loadMoreText={isGerman ? "Weitere Projekte laden" : "Load more projects"}
      loadMoreAria={isGerman ? "Weitere Projekte laden" : "Load more projects"}
      viewProjectText="LIVE SITE"
      viewDetailsText={copy.projectProps.details}
      viewDetailsLink={copy.projectProps.detailsLink}
      projectTagsLabel={copy.projectProps.tags}
      defaultProjectTags={copy.projectProps.defaults}
    />

    <div class="projects-more">
      <a href={`${homeUrl}#projects`} class="button button-outline">
        {copy.projectsButton}

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

  <!-- PRICING -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.pricingHeading.title}
      subtitle={copy.pricingHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column section-intro">
        {#each copy.pricingIntro as paragraph}
          <p>{paragraph}</p>
        {/each}
      </div>

      <div class="card-grid">
        {#each copy.pricingFactors as factor}
          <article class="content-card">
            <span class="blue-dot" aria-hidden="true"></span>
            <h3>{factor.title}</h3>
            <p>{factor.description}</p>
          </article>
        {/each}
      </div>

      <div class="pricing-bottom">
        <div>
          <h3>{copy.pricingCta.title}</h3>
          <p>{copy.pricingCta.description}</p>
        </div>

        <a href={copy.pricingCta.href} class="button button-outline">
          {copy.pricingCta.button}

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

  <!-- FREE TOOLS -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.toolsHeading.title}
      subtitle={copy.toolsHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.freeTools as tool}
          <article class="content-card free-tool-card">
            <div class="tool-body">
              <span class="blue-dot" aria-hidden="true"></span>
              <h3>{tool.title}</h3>
              <p>{tool.description}</p>
            </div>

            <a href={tool.href} class="tool-link">
              <span>{tool.button}</span>

              <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M2 8H14M10 4L14 8L10 12"
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

      <div class="marquee-heading">
        <span class="blue-dot" aria-hidden="true"></span>
        <h3>{copy.toolkit}</h3>
      </div>

      <div
        class="tools-marquee"
        aria-label={isGerman
          ? "Technologien und Werkzeuge"
          : "Technologies and tools"}
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

  <!-- FAQ -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.faqHeading.title}
      subtitle={copy.faqHeading.subtitle}
    />

    <div class="page-shell faq-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column faq-list">
        {#each copy.faqs as faq}
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
                  stroke-linejoin="round"
                />
              </svg>
            </summary>

            <p>{faq.answer}</p>
          </details>
        {/each}
      </div>
    </div>
  </section>

  <!-- FINAL CTA -->

  <section class="final-section">
    <div class="page-shell final-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column final-content">
        <span class="eyebrow">{copy.final.eyebrow}</span>
        <h2>{copy.final.title}</h2>
        <p>{copy.final.description}</p>

        <a href={contactUrl} class="button button-primary">
          {copy.final.button}

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
  <MoreServices language={language} currentService="website-wartung" />
</main>

<Footer
  homepage
  location={copy.footer.location}
  imprintText={copy.footer.imprint}
  language={isGerman ? "de" : "en"}
/>

<style>
  :global(body.maintenance-dark-page) {
    margin: 0;
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .maintenance-page {
    --accent: #0043ff;
    --text: #f5f5f5;
    --muted: rgba(255, 255, 255, 0.65);
    --line: rgba(255, 255, 255, 0.09);

    width: 100%;
    overflow: clip;
    background: #000;
    color: var(--text);
    color-scheme: dark;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .maintenance-page * {
    box-sizing: border-box;
  }

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

  /* HERO */

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
    max-width: 680px;
    margin: 28px 0 0;
    color: var(--muted);
    font-size: 17px;
    line-height: 1.75;
  }

  /* BUTTONS */

  .hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 30px;
  }

  .button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    min-height: 46px;
    padding: 12px 20px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    line-height: 1.3;
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

  /* INTRO */

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

  .overview p,
  .section-intro p {
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

  /* CONTENT */

  .content-shell {
    padding-top: 65px;
    padding-bottom: 125px;
  }

  .blue-dot {
    display: block;
    width: 11px;
    height: 11px;
    flex: 0 0 auto;
    border-radius: 50%;
    background: var(--accent);
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .content-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    padding: clamp(32px, 4vw, 65px);
    background: #000;
  }

  .content-card h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.7vw, 27px);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .content-card p {
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

  /* PROJECTS */

  .projects-section {
    padding-bottom: 110px;
  }

  .projects-more {
    display: flex;
    justify-content: center;
    padding: 0 24px 30px;
  }

  /* PRICING */

  .section-intro {
    padding-bottom: 55px;
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

  /* FREE TOOLS */

  .free-tool-card {
    padding: 0;
  }

  .tool-body {
    flex: 1;
    padding: clamp(32px, 4vw, 65px);
  }

  .tool-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: 100%;
    min-height: 75px;
    padding: 20px clamp(32px, 4vw, 65px);
    border-top: 1px solid var(--line);
    color: #fff;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.04em;
    text-decoration: none;
    transition: background 0.2s ease;
  }

  .tool-link:hover {
    background: #101010;
  }

  .tool-link svg {
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
    transition: transform 0.2s ease;
  }

  .tool-link:hover svg {
    transform: translateX(5px);
  }

  /* MARQUEE */

  .marquee-heading {
    display: flex;
    align-items: center;
    gap: 15px;
    margin: 95px 0 30px;
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

  /* FAQ */

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

  /* FINAL CTA */

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

  .button:focus-visible,
  .tool-link:focus-visible,
  .faq-item summary:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
  }

  /* TABLET */

  @media (max-width: 1024px) {
    .page-shell {
      padding-left: 26px;
      padding-right: 26px;
    }

    .intro-shell {
      padding-top: 75px;
      padding-bottom: 85px;
    }

    .content-shell {
      padding-top: 55px;
      padding-bottom: 95px;
    }

    .content-card,
    .tool-body {
      padding: 35px;
    }

    .free-tool-card {
      padding: 0;
    }

    .tool-link {
      padding-left: 35px;
      padding-right: 35px;
    }

    .pricing-bottom {
      align-items: flex-start;
      flex-direction: column;
      gap: 25px;
    }
  }

  /* MOBILE */

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

    .overview {
      margin-top: 72px;
    }

    .overview h2 {
      font-size: 24px;
    }

    .overview p,
    .section-intro p {
      font-size: 15px;
    }

    .content-shell,
    .faq-shell {
      padding-top: 45px;
      padding-bottom: 75px;
    }

    .card-grid {
      grid-template-columns: 1fr;
    }

    .content-card,
    .tool-body {
      padding: 30px 22px;
    }

    .free-tool-card {
      padding: 0;
    }

    .content-card h3 {
      font-size: 21px;
    }

    .tool-link {
      padding: 20px 22px;
    }

    .section-intro {
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

  @media (prefers-reduced-motion: reduce) {
    .tools-marquee-track {
      animation: none;
    }

    .button,
    .button svg,
    .tool-link,
    .tool-link svg,
    .faq-icon {
      transition: none;
    }
  }
</style>
