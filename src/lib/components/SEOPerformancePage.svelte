<script>
  import { onMount } from "svelte";
  import "$lib/service-page-spacing.css";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import MoreServices from "$lib/components/MoreServices.svelte";
  import ProjectsHeader from "$lib/components/ProjectsHeader.svelte";
  import Projects from "$lib/components/Projects.svelte";

  import { projects as germanProjects } from "$lib/data/projects.js";
  import { projects as englishProjects } from "$lib/data/projects-en.js";

  let { language = "de" } = $props();

  const isGerman = $derived(language === "de");

  const siteUrl = "https://www.zorawebdesign.com";
  const germanUrl = `${siteUrl}/seo-performance/`;
  const englishUrl = `${siteUrl}/en-2/seo-performance/`;

  const content = {
    de: {
      seo: {
        title: "SEO Wien & Website Performance | ZoraWebDesign",
        description:
          "Technische SEO und Website-Performance in Wien. Ladezeiten, Core Web Vitals, On-Page-SEO und WordPress optimieren – persönlich mit Julius Timgum.",
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
        languageLink: "/en-2/seo-performance/",
        languageTitle: "Switch to English SEO & Performance",
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
        first: "SEO WIEN",
        second: "& WEBSITE-PERFORMANCE",
        lead: "Deine Website soll nicht nur gut aussehen, sondern auch schnell laden und von Suchmaschinen verstanden werden. Ich unterstütze Unternehmen und Selbstständige mit technischer Suchmaschinenoptimierung, besseren Ladezeiten und einer klaren Website-Struktur.",
        primary: "SEO-ANFRAGE SENDEN",
        secondary: "LEISTUNGEN ANSEHEN",
      },

      intro: {
        title: "WAS BRINGEN SEO UND WEBSITE-PERFORMANCE?",
        paragraphs: [
          "Suchmaschinenoptimierung (SEO) hilft Suchmaschinen dabei, deine Inhalte zu finden, einzuordnen und für passende Suchanfragen bereitzustellen. Gleichzeitig unterstützt eine technisch saubere Website Besucher dabei, sich schnell zurechtzufinden und die gewünschten Informationen zu erreichen.",
          "Ich bin Julius Timgum, selbstständiger Webdesigner und Webentwickler in Wien. Ich verbinde technisches SEO mit Webentwicklung, Performance-Optimierung und einer verständlichen Inhaltsstruktur – besonders für WordPress Websites und individuell entwickelte Webprojekte.",
          "Mein Schwerpunkt liegt auf Maßnahmen, die sich technisch prüfen und nachvollziehbar verbessern lassen. Dazu gehören Ladezeiten, mobile Nutzbarkeit, Seitenstruktur, interne Verlinkungen, Meta-Daten und die technische Indexierbarkeit. Google-Rankings lassen sich nicht garantieren, aber eine solide Grundlage lässt sich gezielt aufbauen.",
        ],
        benefits: [
          "Bessere technische Voraussetzungen für Suchmaschinen",
          "Schnellere, benutzerfreundlichere Websites",
          "Klare Seitenstruktur und verständliche Inhalte",
          "Nachvollziehbare Analyse und gezielte Optimierung",
        ],
      },

      servicesHeader: {
        title: "WELCHE SEO-LEISTUNGEN BIETE ICH IN WIEN AN?",
        subtitle:
          "Von der technischen Website-Analyse über On-Page-SEO bis zur Optimierung von Ladezeiten: Ich helfe dir dabei, Schwachstellen zu erkennen und deinen Webauftritt nachhaltig zu verbessern.",
      },

      services: [
        {
          title: "TECHNISCHES SEO",
          description:
            "Ich überprüfe, ob Suchmaschinen wichtige Seiten zuverlässig crawlen und indexieren können. Dazu gehören Canonical-Tags, XML-Sitemaps, Weiterleitungen, Robots-Anweisungen, strukturierte Daten und technische Fehler, die die Auffindbarkeit beeinträchtigen können.",
          tags: ["CRAWLING", "INDEXIERUNG", "SCHEMA"],
        },
        {
          title: "ON-PAGE-SEO",
          description:
            "Ich optimiere die technischen und strukturellen Grundlagen einzelner Seiten: Seitentitel, Meta-Descriptions, H1–H3-Hierarchie, interne Links, Bildbeschreibungen und klare Informationsarchitektur. Dabei stehen die tatsächlichen Suchabsichten deiner Zielgruppe im Mittelpunkt.",
          tags: ["META-DATEN", "CONTENT", "INTERN LINKS"],
        },
        {
          title: "CORE WEB VITALS & LADEZEITEN",
          description:
            "Langsame Seiten und instabile Layouts beeinträchtigen die Nutzererfahrung. Ich untersuche Bilder, Fonts, JavaScript, CSS, Caching und Rendering, um unnötige Ladezeit zu reduzieren und die Core Web Vitals gezielt zu verbessern.",
          tags: ["LCP", "INP", "CLS"],
        },
        {
          title: "WORDPRESS PERFORMANCE",
          description:
            "WordPress kann schnell und wartungsfreundlich sein, wenn Theme, Plugins, Medien und Hosting gut zusammenspielen. Ich prüfe technische Engpässe, unnötige Ressourcen und Optimierungsmöglichkeiten, ohne wichtige Funktionen oder die Inhaltsverwaltung zu gefährden.",
          tags: ["WORDPRESS", "CACHING", "HOSTING"],
        },
        {
          title: "SEO-AUDIT & FEHLERANALYSE",
          description:
            "Ein Website-Audit zeigt, welche technischen Probleme und strukturellen Schwächen zuerst behoben werden sollten. Ich untersuche zentrale Seiten und priorisiere Maßnahmen nach ihrer Relevanz, dem technischen Aufwand und den Zielen deines Unternehmens.",
          tags: ["AUDIT", "ANALYSE", "PRIORITÄTEN"],
        },
        {
          title: "SEO BEIM WEBSITE-RELAUNCH",
          description:
            "Bei einem Redesign oder Plattformwechsel sollten bestehende URLs, relevante Inhalte und interne Verlinkungen berücksichtigt werden. Ich unterstütze bei der technischen Planung von Weiterleitungen, Canonicals, Sitemaps und Tests vor und nach dem Relaunch.",
          tags: ["REDIRECTS", "MIGRATION", "RELAUNCH"],
        },
      ],

      metricsHeader: {
        title: "WAS SIND CORE WEB VITALS?",
        subtitle:
          "Google verwendet Core Web Vitals, um wichtige Aspekte der tatsächlichen Nutzererfahrung zu beschreiben. Drei Kennzahlen stehen besonders im Mittelpunkt.",
      },

      metrics: [
        {
          label: "LCP",
          title: "LARGEST CONTENTFUL PAINT",
          threshold: "≤ 2,5 s",
          description:
            "Misst, wann das größte sichtbare Inhaltselement geladen ist. Bilder, Serverantworten und blockierende Ressourcen können diesen Wert beeinflussen.",
        },
        {
          label: "INP",
          title: "INTERACTION TO NEXT PAINT",
          threshold: "≤ 200 ms",
          description:
            "Misst die Reaktionsfähigkeit der Seite bei Nutzerinteraktionen. Aufwendiges JavaScript und lange Aufgaben im Hauptthread können Verzögerungen verursachen.",
        },
        {
          label: "CLS",
          title: "CUMULATIVE LAYOUT SHIFT",
          threshold: "≤ 0,1",
          description:
            "Misst unerwartete Layoutverschiebungen. Fehlende Bildabmessungen, nachladende Inhalte oder Webfonts können die visuelle Stabilität beeinträchtigen.",
        },
      ],

      metricsNote:
        "Die Werte sind Googles empfohlene Grenzwerte für eine gute Nutzererfahrung. Entscheidend sind insbesondere reale Nutzerdaten am 75. Perzentil. Ein guter Labortest allein garantiert noch keine guten Feldwerte.",

      processHeader: {
        title: "WIE LÄUFT EINE SEO-OPTIMIERUNG AB?",
        subtitle:
          "Statt wahllos Keywords einzubauen, beginnen wir mit einer nachvollziehbaren Analyse und setzen die wichtigsten Verbesserungen gezielt um.",
      },

      process: [
        {
          title: "ANALYSE & ZIELE",
          description:
            "Wir besprechen deine Zielgruppe, wichtigen Seiten und geschäftlichen Ziele. Anschließend prüfe ich den technischen Zustand und vorhandene Daten, soweit Zugriff besteht.",
        },
        {
          title: "PRIORITÄTEN FESTLEGEN",
          description:
            "Ich ordne die gefundenen Probleme nach Bedeutung und Aufwand. Nicht jede Warnung aus einem SEO-Tool ist gleich wichtig.",
        },
        {
          title: "TECHNISCHE UMSETZUNG",
          description:
            "Ich verbessere relevante Seitenelemente, technische Strukturen und Performance-Faktoren. Änderungen werden so umgesetzt, dass die Website weiterhin zuverlässig funktioniert.",
        },
        {
          title: "TESTING & MONITORING",
          description:
            "Nach der Umsetzung kontrolliere ich die wichtigsten Ergebnisse. Mit Google Search Console und passenden Performance-Daten lassen sich Entwicklungen anschließend beobachten.",
        },
      ],

      projectsHeader: {
        title: "AUSGEWÄHLTE WEBSITE-PROJEKTE",
        subtitle:
          "Einblicke in meine Webdesign- und Entwicklungsarbeit. Die Projekte zeigen unterschiedliche technische Anforderungen, Inhaltsstrukturen und responsive Umsetzungen.",
      },

      projectsButton: "ALLE PROJEKTE ANSEHEN",

      pricingHeader: {
        title: "WAS KOSTET SEO UND WEBSITE-OPTIMIERUNG IN WIEN?",
        subtitle:
          "Die Kosten hängen davon ab, ob du eine technische Analyse, einzelne Optimierungen oder eine umfassendere Überarbeitung deiner Website benötigst.",
      },

      pricingIntro: [
        "Eine SEO-Optimierung hat keinen einheitlichen Festpreis. Eine kleine Website mit wenigen technischen Problemen erfordert meist weniger Aufwand als ein umfangreicher WordPress-Auftritt mit zahlreichen Unterseiten, veralteten Plugins oder komplexen Integrationen.",
        "Ich prüfe zunächst, welche Maßnahmen für dein Projekt sinnvoll sind. Auf dieser Grundlage lässt sich der Umfang transparent vereinbaren – beispielsweise ein einmaliger technischer Audit, eine Performance-Optimierung oder die technische Begleitung eines Relaunches.",
      ],

      pricingFactors: [
        {
          title: "UMFANG DER WEBSITE",
          description:
            "Die Anzahl der Seiten, Sprachen, Seitentypen und eingebundenen Systeme beeinflusst den Prüf- und Umsetzungsaufwand.",
        },
        {
          title: "TECHNISCHER ZUSTAND",
          description:
            "Bestehende Fehler, langsame Themes, Plugins oder veraltete Strukturen können zusätzliche Analyse und Entwicklung erforderlich machen.",
        },
        {
          title: "GEWÜNSCHTE LEISTUNGEN",
          description:
            "Ein einmaliger SEO-Audit, gezielte Core-Web-Vitals-Optimierung und umfassende technische Betreuung haben unterschiedliche Anforderungen.",
        },
        {
          title: "LAUFENDE BETREUUNG",
          description:
            "Ob regelmäßige Kontrollen, Updates oder wiederkehrende SEO-Analysen sinnvoll sind, hängt von deiner Website und deinen Zielen ab.",
        },
      ],

      pricingCtaTitle: "DU MÖCHTEST DEINE WEBSITE VERBESSERN?",
      pricingCtaText:
        "Starte mit meinem kostenlosen Website-Audit oder kontaktiere mich für eine individuelle technische Einschätzung.",
      pricingCtaButton: "WEBSITE PRÜFEN",

      freeToolsHeader: {
        title: "KOSTENLOSE SEO- UND WEBSITE-TOOLS",
        subtitle:
          "Analysiere technische Grundlagen deiner bestehenden Website oder plane deinen nächsten Webauftritt mit einer klaren Struktur.",
      },

      freeTools: [
        {
          title: "KOSTENLOSER WEBSITE-AUDIT",
          description:
            "Prüfe deine Website auf wichtige technische Faktoren rund um SEO, Performance, Sicherheit und Barrierefreiheit. Der Audit hilft dir, erste Ansatzpunkte zu erkennen.",
          href: "/website-audit/",
          button: "WEBSITE PRÜFEN",
        },
        {
          title: "WEBSITE-KONFIGURATOR",
          description:
            "Plane einen neuen Webauftritt oder Relaunch. Lege fest, welche Inhalte, Seiten und Funktionen du benötigst, und strukturiere dein Projekt vor der Umsetzung.",
          href: "/website-konfigurator/",
          button: "WEBSITE PLANEN",
        },
      ],

      toolkit: "MEIN DIGITALER TOOLKIT",

      faqHeader: {
        title: "HÄUFIGE FRAGEN ZU SEO UND WEBSITE-PERFORMANCE",
        subtitle:
          "Antworten auf typische Fragen zur Suchmaschinenoptimierung, Ladezeiten, Google-Rankings und technischen Website-Verbesserungen.",
      },

      faqs: [
        {
          question: "WAS IST TECHNISCHES SEO?",
          answer:
            "Technisches SEO umfasst Maßnahmen, die Suchmaschinen beim Crawlen und Verstehen einer Website unterstützen. Dazu gehören unter anderem Indexierbarkeit, Seitenstruktur, Canonical-Tags, Sitemaps, Weiterleitungen und strukturierte Daten.",
        },
        {
          question: "WIE LANGE DAUERT ES, BIS SEO ERGEBNISSE ZEIGT?",
          answer:
            "Technische Verbesserungen können unmittelbar umgesetzt werden. Änderungen in den Google-Suchergebnissen benötigen jedoch oft Zeit und hängen unter anderem vom Crawling, dem Wettbewerb, der Qualität der Inhalte und der bisherigen Sichtbarkeit ab.",
        },
        {
          question: "KANNST DU PLATZ 1 BEI GOOGLE GARANTIEREN?",
          answer:
            "Nein. Niemand kann seriös eine bestimmte Google-Position garantieren. Ich konzentriere mich auf nachvollziehbare technische Verbesserungen, relevante Inhalte und eine gute Nutzererfahrung.",
        },
        {
          question: "WAS SIND CORE WEB VITALS?",
          answer:
            "Core Web Vitals sind Kennzahlen für Ladegeschwindigkeit, Reaktionsfähigkeit und visuelle Stabilität. Zu den aktuellen Metriken gehören Largest Contentful Paint (LCP), Interaction to Next Paint (INP) und Cumulative Layout Shift (CLS).",
        },
        {
          question: "WIE KANN ICH MEINE WORDPRESS WEBSITE SCHNELLER MACHEN?",
          answer:
            "Mögliche Maßnahmen sind die Optimierung von Bildern und Fonts, die Reduzierung unnötiger Plugins, Caching, gutes Hosting und weniger blockierendes CSS oder JavaScript. Welche Schritte sinnvoll sind, sollte anhand einer Analyse entschieden werden.",
        },
        {
          question:
            "HILFT EINE SCHNELLE WEBSITE AUTOMATISCH BEIM GOOGLE-RANKING?",
          answer:
            "Eine gute Nutzererfahrung und Website-Performance sind wichtig, aber schnelle Ladezeiten allein garantieren keine höheren Rankings. Relevanz, hilfreiche Inhalte und zahlreiche weitere Signale spielen ebenfalls eine Rolle.",
        },
        {
          question: "KANNST DU SEO BEI EINEM WEBSITE-RELAUNCH BERÜCKSICHTIGEN?",
          answer:
            "Ja. Bei einer Migration oder einem Redesign prüfe ich unter anderem bestehende URLs, wichtige Inhalte, Weiterleitungen und technische Indexierungssignale, um unnötige Verluste bei der Auffindbarkeit zu vermeiden.",
        },
        {
          question: "BIETEST DU SEO AUCH FÜR KLEINE UNTERNEHMEN IN WIEN AN?",
          answer:
            "Ja. Ich arbeite mit Selbstständigen, kleinen Unternehmen und Organisationen in Wien sowie remote mit Kunden in anderen Regionen zusammen. Der Umfang richtet sich nach der Website und dem tatsächlichen Bedarf.",
        },
      ],

      final: {
        eyebrow: "DEINE WEBSITE KANN MEHR",
        title: "WEBSITE ZU LANGSAM ODER SCHLECHT AUFFINDBAR?",
        description:
          "Lass uns herausfinden, welche technischen Verbesserungen für deine Website wirklich sinnvoll sind. Ich unterstütze dich persönlich mit SEO-Analyse, Performance-Optimierung und sauberer Webentwicklung.",
        button: "PROJEKT ANFRAGEN",
      },

      projectProps: {
        viewDetailsLink: "/referenzprojekt/",
        projectTagsLabel: "Projektleistungen",
        defaultProjectTags: ["Webdesign", "WordPress", "SEO", "Performance"],
      },

      footer: {
        location: "HACKENGASSE 22, 1150 WIEN",
        imprint: "IMPRESSUM",
      },
    },

    en: {
      seo: {
        title: "SEO Vienna & Website Performance | ZoraWebDesign",
        description:
          "Technical SEO and website performance optimization in Vienna. Improve page speed, Core Web Vitals, on-page SEO and WordPress with Julius Timgum.",
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
        languageLink: "/seo-performance/",
        languageTitle: "Zur deutschen SEO-Seite wechseln",
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
        first: "SEO VIENNA",
        second: "& WEBSITE PERFORMANCE",
        lead: "Your website should do more than look great. It should load quickly, work smoothly and be understandable to search engines. I help businesses and freelancers improve technical SEO, page speed, Core Web Vitals and website structure.",
        primary: "DISCUSS YOUR SEO PROJECT",
        secondary: "EXPLORE SERVICES",
      },

      intro: {
        title: "HOW DO SEO AND WEBSITE PERFORMANCE HELP YOUR BUSINESS?",
        paragraphs: [
          "Search engine optimization (SEO) helps search engines discover, understand and present your website for relevant searches. A technically sound website also makes it easier for visitors to find information, navigate your content and take action.",
          "I am Julius Timgum, a freelance web designer and developer based in Vienna. I combine technical SEO, modern development and performance optimization, particularly for WordPress websites and custom frontend projects.",
          "My approach focuses on improvements that can be tested and explained: page speed, mobile usability, content structure, internal linking, metadata and technical indexability. No one can guarantee a specific Google ranking, but we can build a stronger technical foundation for your website.",
        ],
        benefits: [
          "Stronger technical foundations for search visibility",
          "Faster, more user-friendly websites",
          "Clearer page structure and content organization",
          "Measurable improvements based on real analysis",
        ],
      },

      servicesHeader: {
        title: "WHAT SEO SERVICES DO I OFFER IN VIENNA?",
        subtitle:
          "From technical website audits and on-page SEO to page speed improvements, I help identify technical problems and make your website easier to use and understand.",
      },

      services: [
        {
          title: "TECHNICAL SEO",
          description:
            "I review whether search engines can properly crawl and index your important pages. This includes canonical tags, XML sitemaps, redirects, robots directives, structured data and technical problems that may affect discoverability.",
          tags: ["CRAWLING", "INDEXING", "SCHEMA"],
        },
        {
          title: "ON-PAGE SEO",
          description:
            "I improve the technical and structural foundations of individual pages, including titles, meta descriptions, heading hierarchy, internal linking, image descriptions and information architecture, with a focus on what your audience is actually searching for.",
          tags: ["METADATA", "CONTENT", "INTERNAL LINKS"],
        },
        {
          title: "CORE WEB VITALS & PAGE SPEED",
          description:
            "Slow pages and unstable layouts can frustrate visitors. I examine images, fonts, JavaScript, CSS, caching and rendering to reduce unnecessary loading work and improve Core Web Vitals where possible.",
          tags: ["LCP", "INP", "CLS"],
        },
        {
          title: "WORDPRESS PERFORMANCE",
          description:
            "WordPress can deliver excellent performance when its theme, plugins, images and hosting are configured appropriately. I investigate bottlenecks and unnecessary resources while protecting important website features and content-editing workflows.",
          tags: ["WORDPRESS", "CACHING", "HOSTING"],
        },
        {
          title: "SEO AUDITS & TECHNICAL ANALYSIS",
          description:
            "A website audit reveals technical issues and structural weaknesses. I review important pages and prioritize improvements based on potential impact, implementation effort and your business goals.",
          tags: ["AUDIT", "ANALYSIS", "PRIORITIES"],
        },
        {
          title: "SEO-FRIENDLY WEBSITE REDESIGNS",
          description:
            "During a redesign or platform migration, existing URLs, valuable content and internal links need careful attention. I can help plan redirects, canonical signals, sitemaps and pre-launch and post-launch checks.",
          tags: ["REDIRECTS", "MIGRATION", "RELAUNCH"],
        },
      ],

      metricsHeader: {
        title: "WHAT ARE CORE WEB VITALS?",
        subtitle:
          "Google's Core Web Vitals measure important aspects of real-world page experience. Three metrics are particularly relevant.",
      },

      metrics: [
        {
          label: "LCP",
          title: "LARGEST CONTENTFUL PAINT",
          threshold: "≤ 2.5 s",
          description:
            "Measures when the largest visible content element finishes rendering. Server response time, images and render-blocking resources can affect this metric.",
        },
        {
          label: "INP",
          title: "INTERACTION TO NEXT PAINT",
          threshold: "≤ 200 ms",
          description:
            "Measures responsiveness to user interactions. Heavy JavaScript and long tasks on the main thread can cause delays.",
        },
        {
          label: "CLS",
          title: "CUMULATIVE LAYOUT SHIFT",
          threshold: "≤ 0.1",
          description:
            "Measures unexpected layout movement. Missing image dimensions, injected content and webfonts can affect visual stability.",
        },
      ],

      metricsNote:
        "These are Google's recommended thresholds for a good experience. Real-user data at the 75th percentile is particularly important. A good laboratory score alone does not guarantee good field performance.",

      processHeader: {
        title: "HOW DOES TECHNICAL SEO OPTIMIZATION WORK?",
        subtitle:
          "Rather than adding keywords everywhere, I begin with a structured assessment and implement the improvements that matter most.",
      },

      process: [
        {
          title: "AUDIT & OBJECTIVES",
          description:
            "We discuss your audience, key pages and business goals. I then review the technical condition of your website and available performance or search data.",
        },
        {
          title: "SET PRIORITIES",
          description:
            "I organize findings by importance and effort. Not every warning in an automated SEO report deserves the same attention.",
        },
        {
          title: "IMPLEMENT IMPROVEMENTS",
          description:
            "I address relevant page elements, technical structures and performance bottlenecks while keeping your website functional and manageable.",
        },
        {
          title: "TEST & MONITOR",
          description:
            "After implementation, I check the most important results. Search Console and appropriate performance measurements can help track changes over time.",
        },
      ],

      projectsHeader: {
        title: "SELECTED WEBSITE PROJECTS",
        subtitle:
          "Explore examples of my web design and development work, including projects with different technical requirements, content structures and responsive implementations.",
      },

      projectsButton: "VIEW ALL PROJECTS",

      pricingHeader: {
        title: "HOW MUCH DO SEO AND WEBSITE OPTIMIZATION COST IN VIENNA?",
        subtitle:
          "The cost depends on whether you need a focused technical audit, specific performance improvements or a broader optimization of your website.",
      },

      pricingIntro: [
        "SEO optimization does not have one universal price. A small website with a few technical issues usually requires less work than a large WordPress website with numerous pages, outdated plugins or complex integrations.",
        "I start by identifying the work that is relevant to your goals. We can then agree on a clear scope, whether that means a one-time technical audit, performance optimization or technical SEO support during a website redesign.",
      ],

      pricingFactors: [
        {
          title: "WEBSITE SIZE",
          description:
            "The number of pages, languages, content types and connected systems influences the time required for auditing and implementation.",
        },
        {
          title: "TECHNICAL CONDITION",
          description:
            "Existing errors, slow themes, plugins and outdated structures can require additional investigation and development.",
        },
        {
          title: "SERVICES REQUIRED",
          description:
            "A technical SEO audit, Core Web Vitals optimization and ongoing technical support involve different levels of work.",
        },
        {
          title: "ONGOING SUPPORT",
          description:
            "Regular monitoring, updates and recurring SEO reviews may or may not be necessary depending on your website and business goals.",
        },
      ],

      pricingCtaTitle: "READY TO IMPROVE YOUR WEBSITE?",
      pricingCtaText:
        "Start with my free Website Audit or contact me for an individual technical assessment.",
      pricingCtaButton: "AUDIT YOUR WEBSITE",

      freeToolsHeader: {
        title: "FREE SEO & WEBSITE TOOLS",
        subtitle:
          "Analyze your current website's technical foundations or plan your next project with a clearer structure.",
      },

      freeTools: [
        {
          title: "FREE WEBSITE AUDIT",
          description:
            "Check important technical factors covering SEO, performance, security and accessibility. The audit helps identify potential starting points for improvement.",
          href: "/en-2/website-audit/",
          button: "AUDIT YOUR WEBSITE",
        },
        {
          title: "WEBSITE CONFIGURATOR",
          description:
            "Plan a new website or redesign. Identify the pages, content and functionality your project needs before development begins.",
          href: "/en-2/website-configurator/",
          button: "PLAN YOUR WEBSITE",
        },
      ],

      toolkit: "MY DIGITAL TOOLKIT",

      faqHeader: {
        title: "FREQUENTLY ASKED QUESTIONS ABOUT SEO & PERFORMANCE",
        subtitle:
          "Clear answers about technical SEO, website speed, Google rankings, Core Web Vitals and technical website improvements.",
      },

      faqs: [
        {
          question: "WHAT IS TECHNICAL SEO?",
          answer:
            "Technical SEO refers to improvements that help search engines crawl and understand a website. Examples include indexability, site architecture, canonical tags, XML sitemaps, redirects and structured data.",
        },
        {
          question: "HOW LONG DOES SEO TAKE TO SHOW RESULTS?",
          answer:
            "Technical fixes can be implemented immediately, but changes in Google Search results may take longer. Timing depends on crawling, competition, content quality and the site's existing search visibility.",
        },
        {
          question: "CAN YOU GUARANTEE FIRST PLACE ON GOOGLE?",
          answer:
            "No. No reputable provider can guarantee a specific Google ranking. My work focuses on verifiable technical improvements, relevant content and a good user experience.",
        },
        {
          question: "WHAT ARE CORE WEB VITALS?",
          answer:
            "Core Web Vitals are performance measurements covering loading experience, responsiveness and visual stability. They include Largest Contentful Paint (LCP), Interaction to Next Paint (INP) and Cumulative Layout Shift (CLS).",
        },
        {
          question: "HOW CAN I MAKE MY WORDPRESS WEBSITE FASTER?",
          answer:
            "Common improvements include optimizing images and fonts, reducing unnecessary plugins, implementing caching, using suitable hosting and minimizing blocking CSS or JavaScript. The best approach depends on a technical assessment.",
        },
        {
          question: "DOES A FAST WEBSITE AUTOMATICALLY RANK HIGHER?",
          answer:
            "No. Website performance matters for user experience, but speed alone does not guarantee better rankings. Search relevance, useful content and many other signals also influence visibility.",
        },
        {
          question: "CAN YOU HELP PRESERVE SEO DURING A WEBSITE REDESIGN?",
          answer:
            "Yes. I can review existing URLs, important content, redirects and indexability signals during a redesign or migration to reduce avoidable losses in organic visibility.",
        },
        {
          question: "DO YOU OFFER SEO FOR SMALL BUSINESSES IN VIENNA?",
          answer:
            "Yes. I work with freelancers, small businesses and organizations in Vienna and remotely with clients in other locations. Each project is scoped according to the website's actual needs.",
        },
      ],

      final: {
        eyebrow: "YOUR WEBSITE CAN DO MORE",
        title: "SLOW WEBSITE OR LOW SEARCH VISIBILITY?",
        description:
          "Let's identify the technical improvements that make sense for your website. I provide personal support with SEO audits, performance optimization and clean web development.",
        button: "DISCUSS YOUR PROJECT",
      },

      projectProps: {
        viewDetailsLink: "/en-2/reference-project/",
        projectTagsLabel: "Project services",
        defaultProjectTags: ["Web Design", "WordPress", "SEO", "Performance"],
      },

      footer: {
        location: "HACKENGASSE 22, 1150 VIENNA",
        imprint: "IMPRINT",
      },
    },
  };

  const copy = $derived(isGerman ? content.de : content.en);
  const canonical = $derived(isGerman ? germanUrl : englishUrl);

  const selectedProjects = $derived(
    (isGerman ? germanProjects : englishProjects).slice(0, 6),
  );

  const homeUrl = $derived(isGerman ? "/" : "/en-2/");
  const contactUrl = $derived(`${homeUrl}#contact`);
  const projectsUrl = $derived(`${homeUrl}#projects`);
  const servicesUrl = $derived(`${homeUrl}#services`);

  const nav = $derived({
    ...copy.nav,
    servicesLink: servicesUrl,
    projectsLink: projectsUrl,
    processLink: `${homeUrl}#process`,
    reviewsLink: `${homeUrl}#reviews`,
    faqLink: `${homeUrl}#faq`,
    contactLink: contactUrl,
  });

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

  const schema = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: isGerman
          ? "Technisches SEO und Website-Performance in Wien"
          : "Technical SEO and Website Performance in Vienna",
        serviceType: isGerman
          ? "Technische Suchmaschinenoptimierung und Website Performance"
          : "Technical SEO and Website Performance Optimization",
        description: copy.seo.description,
        url: canonical,
        inLanguage: isGerman ? "de-AT" : "en",
        provider: {
          "@type": "ProfessionalService",
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
              ? "SEO & Performance Wien"
              : "SEO & Performance Vienna",
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
    body.classList.add("seo-performance-dark");

    return () => {
      body.classList.remove("seo-performance-dark");
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

  {@html `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`}
</svelte:head>

<Header {nav} showStaticThemeIcon={false} />

<main class="seo-page compact-service-page">
  <!-- HERO -->

  <section class="intro-section">
    <div class="page-shell intro-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="reading-column hero">
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

          <a href="#seo-services" class="button button-outline">
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

  <!-- SEO SERVICES -->

  <section id="seo-services" class="content-section">
    <ProjectsHeader
      title={copy.servicesHeader.title}
      subtitle={copy.servicesHeader.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.services as service}
          <article class="info-card">
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

  <!-- CORE WEB VITALS -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.metricsHeader.title}
      subtitle={copy.metricsHeader.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="metrics-grid">
        {#each copy.metrics as metric}
          <article class="metric-card">
            <div class="metric-top">
              <span class="blue-dot" aria-hidden="true"></span>
              <span class="metric-label">{metric.label}</span>
            </div>

            <strong class="metric-value">{metric.threshold}</strong>
            <h3>{metric.title}</h3>
            <p>{metric.description}</p>
          </article>
        {/each}
      </div>

      <p class="metrics-note">{copy.metricsNote}</p>
    </div>
  </section>

  <!-- PROCESS -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.processHeader.title}
      subtitle={copy.processHeader.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.process as step}
          <article class="info-card">
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
      title={copy.projectsHeader.title}
      subtitle={copy.projectsHeader.subtitle}
    />

    <Projects
      projects={selectedProjects}
      loadMoreCopy={isGerman ? "Mehr sehen" : "See more"}
      loadMoreText={isGerman ? "Weitere Projekte laden" : "Load more projects"}
      loadMoreAria={isGerman ? "Weitere Projekte laden" : "Load more projects"}
      viewProjectText="LIVE SITE"
      viewDetailsText={isGerman ? "Details ansehen" : "View details"}
      viewDetailsLink={copy.projectProps.viewDetailsLink}
      projectTagsLabel={copy.projectProps.projectTagsLabel}
      defaultProjectTags={copy.projectProps.defaultProjectTags}
    />

    <div class="projects-more">
      <a href={projectsUrl} class="button button-outline">
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
      title={copy.pricingHeader.title}
      subtitle={copy.pricingHeader.subtitle}
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
          <article class="info-card">
            <span class="blue-dot" aria-hidden="true"></span>
            <h3>{factor.title}</h3>
            <p>{factor.description}</p>
          </article>
        {/each}
      </div>

      <div class="pricing-bottom">
        <div>
          <h3>{copy.pricingCtaTitle}</h3>
          <p>{copy.pricingCtaText}</p>
        </div>

        <a
          href={isGerman ? "/website-audit/" : "/en-2/website-audit/"}
          class="button button-outline"
        >
          {copy.pricingCtaButton}
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

  <!-- FREE TOOLS & MARQUEE -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.freeToolsHeader.title}
      subtitle={copy.freeToolsHeader.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.freeTools as tool}
          <article class="info-card tool-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{tool.title}</h3>
            <p>{tool.description}</p>

            <a class="tool-link" href={tool.href}>
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
      title={copy.faqHeader.title}
      subtitle={copy.faqHeader.subtitle}
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
  <MoreServices language={language} currentService="seo-performance" />
</main>

<Footer
  homepage
  location={copy.footer.location}
  imprintText={copy.footer.imprint}
  language={isGerman ? "de" : "en"}
/>

<style>
  :global(body.seo-performance-dark) {
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .seo-page {
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

  .seo-page * {
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

  .intro-section {
    border-top: 1px solid var(--line);
  }

  .intro-shell {
    padding-top: 86px;
    padding-bottom: 105px;
  }

  .eyebrow {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.08em;
    line-height: 1.4;
    color: var(--muted);
    text-transform: uppercase;
  }

  .hero h1 {
    display: flex;
    flex-direction: column;
    gap: 7px;
    margin: 27px 0 0;
    font-size: clamp(28px, 3.25vw, 52px);
    font-weight: 600;
    line-height: 1.03;
    letter-spacing: -0.035em;
    text-transform: uppercase;
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
    letter-spacing: 0.06em;
    line-height: 1.4;
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

  .overview {
    margin-top: 90px;
  }

  .overview h2 {
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
    left: 0;
    top: 0.65em;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: var(--accent);
    content: "";
  }

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

  .info-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    min-width: 0;
    padding: clamp(32px, 4vw, 65px);
    background: #000;
  }

  .info-card h3 {
    margin: 35px 0 0;
    font-size: clamp(20px, 1.7vw, 27px);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .info-card p {
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

  .metrics-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1px;
    border: 1px solid var(--line);
    background: var(--line);
  }

  .metric-card {
    min-width: 0;
    padding: clamp(28px, 3vw, 48px);
    background: #000;
  }

  .metric-top {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .metric-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .metric-value {
    display: block;
    margin-top: 38px;
    color: #fff;
    font-size: clamp(28px, 3vw, 46px);
    font-weight: 500;
    letter-spacing: -0.035em;
    line-height: 1.1;
  }

  .metric-card h3 {
    margin: 20px 0 0;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.4;
  }

  .metric-card p {
    margin: 18px 0 0;
    color: var(--muted);
    font-size: 14px;
    line-height: 1.75;
  }

  .metrics-note {
    max-width: 800px;
    margin: 30px auto 0;
    color: var(--muted);
    font-size: 13px;
    line-height: 1.75;
  }

  .projects-section {
    padding-bottom: 110px;
  }

  .projects-more {
    display: flex;
    justify-content: center;
    padding: 0 24px 30px;
  }

  .section-intro {
    padding-bottom: 55px;
  }

  .pricing-bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 45px;
    padding-top: 50px;
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

  .tool-card {
    padding-bottom: 0;
  }

  .tool-card p {
    padding-bottom: 35px;
  }

  .tool-link {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    width: calc(100% + clamp(64px, 8vw, 130px));
    margin-top: auto;
    margin-left: calc(-1 * clamp(32px, 4vw, 65px));
    padding: 25px clamp(32px, 4vw, 65px);
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

    .info-card {
      padding: 35px;
    }

    .tool-link {
      width: calc(100% + 70px);
      margin-left: -35px;
      padding-left: 35px;
      padding-right: 35px;
    }

    .pricing-bottom {
      align-items: flex-start;
      flex-direction: column;
      gap: 25px;
    }
  }

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

    .hero-lead,
    .overview p,
    .section-intro p {
      font-size: 15px;
    }

    .overview {
      margin-top: 72px;
    }

    .overview h2 {
      font-size: 24px;
    }

    .content-shell,
    .faq-shell {
      padding-top: 45px;
      padding-bottom: 75px;
    }

    .card-grid,
    .metrics-grid {
      grid-template-columns: 1fr;
    }

    .info-card,
    .metric-card {
      padding: 30px 22px;
    }

    .tool-card {
      padding-bottom: 0;
    }

    .info-card h3 {
      font-size: 21px;
    }

    .tool-link {
      width: calc(100% + 44px);
      margin-left: -22px;
      padding: 22px;
    }

    .metric-value {
      font-size: 36px;
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
