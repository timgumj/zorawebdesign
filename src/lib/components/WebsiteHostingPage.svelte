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
  const germanUrl = `${siteUrl}/webhosting/`;
  const englishUrl = `${siteUrl}/en-2/website-hosting/`;

  /* =========================================================
     BILINGUAL SEO & CONTENT
  ========================================================= */

  const translations = {
    de: {
      seo: {
        title: "Webhosting Wien | WordPress Hosting – ZoraWebDesign",
        description:
          "Webhosting und WordPress Hosting in Wien. Unterstützung bei Hosting, Domains, SSL, Website-Umzug und technischer Betreuung – persönlich von ZoraWebDesign.",
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
        languageLink: "/en-2/website-hosting/",
        languageTitle: "Switch to English Website Hosting",
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
        first: "WEBHOSTING WIEN",
        second: "& WORDPRESS HOSTING",
        lead: "Deine Website braucht eine zuverlässige technische Grundlage. Ich unterstütze dich bei der Auswahl, Einrichtung und Verwaltung einer passenden Hosting-Lösung – von WordPress Hosting über Domains und SSL bis zur Migration deiner bestehenden Website.",
        primary: "HOSTING ANFRAGEN",
        secondary: "LEISTUNGEN ANSEHEN",
      },

      intro: {
        title: "WARUM IST GUTES WEBHOSTING WICHTIG?",
        paragraphs: [
          "Webhosting ist die technische Grundlage, auf der deine Website erreichbar ist. Die Qualität der Hosting-Umgebung beeinflusst unter anderem Ladezeiten, Stabilität, verfügbare Funktionen und die Möglichkeiten für Backups und Sicherheitsmaßnahmen.",
          "Ich bin Julius Timgum, selbstständiger Webdesigner und Webentwickler in Wien. Ich begleite Unternehmen und Selbstständige nicht nur bei der Erstellung ihrer Website, sondern auch bei technischen Fragen rund um Hosting, Domains und Veröffentlichung.",
          "Dabei geht es nicht darum, dir das teuerste Hosting-Paket zu verkaufen. Wir wählen eine Lösung, die zu deiner Website, deinem Budget und deinem Verwaltungsbedarf passt. Die tatsächlichen Serverleistungen, Standorte und Verfügbarkeiten hängen vom gewählten Hosting-Anbieter und Tarif ab.",
        ],
        benefits: [
          "Hosting-Lösungen passend zum Website-Projekt",
          "Unterstützung bei Domain und SSL-Einrichtung",
          "Begleitung bei Website-Umzug und Veröffentlichung",
          "Persönliche technische Unterstützung aus Wien",
        ],
      },

      servicesHeading: {
        title: "WELCHE WEBHOSTING-LEISTUNGEN BIETE ICH IN WIEN AN?",
        subtitle:
          "Von der Wahl des Hosting-Pakets bis zum technischen Launch: Ich unterstütze dich bei der Einrichtung und Organisation einer geeigneten Website-Infrastruktur.",
      },

      services: [
        {
          title: "WORDPRESS HOSTING",
          description:
            "Ich unterstütze bei der Auswahl und Einrichtung einer Hosting-Umgebung für WordPress. Dabei berücksichtige ich die Anforderungen deines Themes, der Plugins, der Datenbank und der benötigten Ressourcen. Ziel ist eine passende technische Grundlage für deinen Webauftritt.",
          tags: ["WORDPRESS", "PHP", "DATABASE"],
        },
        {
          title: "DOMAIN & DNS-VERWALTUNG",
          description:
            "Ich helfe bei der technischen Einrichtung von Domains und DNS-Einträgen. Dazu gehören beispielsweise die Verbindung einer Domain mit dem Hosting, Weiterleitungen und die notwendigen Einstellungen beim Website-Launch.",
          tags: ["DOMAIN", "DNS", "CONFIGURATION"],
        },
        {
          title: "SSL & HTTPS-EINRICHTUNG",
          description:
            "Eine verschlüsselte HTTPS-Verbindung gehört heute zur grundlegenden Website-Einrichtung. Ich unterstütze bei der Einrichtung und Prüfung von SSL/TLS-Zertifikaten, soweit der gewählte Hosting-Anbieter dies ermöglicht.",
          tags: ["SSL", "HTTPS", "SECURITY"],
        },
        {
          title: "WEBSITE-MIGRATION",
          description:
            "Du möchtest mit deiner bestehenden Website zu einem anderen Hoster wechseln? Ich unterstütze bei der Planung, Sicherung und Übertragung von Dateien und Datenbanken sowie bei den erforderlichen Tests vor und nach dem Umzug.",
          tags: ["MIGRATION", "BACKUPS", "DNS"],
        },
        {
          title: "HOSTING & PERFORMANCE",
          description:
            "Serverantwortzeiten, Caching, Ressourcen und die technische Konfiguration wirken sich auf die Website-Performance aus. Ich überprüfe, ob die Hosting-Umgebung zu den Anforderungen deiner Website passt, und bespreche mögliche Optimierungen.",
          tags: ["CACHING", "PERFORMANCE", "SERVER"],
        },
        {
          title: "HOSTING-SUPPORT & BETREUUNG",
          description:
            "Ich unterstütze bei Fragen zur Hosting-Konfiguration, beim Website-Launch und bei technischen Problemen. WordPress-Updates, laufende Sicherheitsprüfungen und regelmäßige Website-Wartung können ergänzend vereinbart werden.",
          tags: ["SUPPORT", "MAINTENANCE", "MONITORING"],
        },
      ],

      optionsHeading: {
        title: "WELCHE HOSTING-LÖSUNG PASST ZU DEINER WEBSITE?",
        subtitle:
          "Nicht jede Website benötigt denselben Server oder dasselbe Hosting-Modell. Entscheidend sind Technologie, Besucheraufkommen, Verwaltungsaufwand und langfristige Anforderungen.",
      },

      options: [
        {
          title: "WORDPRESS & KLASSISCHES WEBHOSTING",
          description:
            "Für viele WordPress Websites ist ein gut konfiguriertes Webhosting-Paket mit PHP und Datenbank eine sinnvolle Lösung. Wichtig sind passende Ressourcen, aktuelle Softwareversionen, Backup-Möglichkeiten und ein verlässlicher technischer Betrieb.",
          tags: ["WORDPRESS", "PHP", "MYSQL"],
        },
        {
          title: "MODERNES FRONTEND-HOSTING",
          description:
            "Individuell entwickelte Websites, zum Beispiel mit SvelteKit, können je nach Architektur von spezialisierten Hosting- und Deployment-Plattformen profitieren. Welche Umgebung geeignet ist, hängt von statischem Rendering, Serverfunktionen und Datenquellen ab.",
          tags: ["SVELTEKIT", "VERCEL", "DEPLOYMENT"],
        },
      ],

      processHeading: {
        title: "WIE LÄUFT DIE EINRICHTUNG VON WEBHOSTING AB?",
        subtitle:
          "Ein strukturierter Ablauf hilft dabei, Domain, Website, technische Anforderungen und Zuständigkeiten sauber aufeinander abzustimmen.",
      },

      process: [
        {
          title: "WEBSITE & ANFORDERUNGEN PRÜFEN",
          description:
            "Wir klären, welche Website-Technologie du verwendest, ob bereits Hosting vorhanden ist und welche Funktionen, Zugänge und Ressourcen benötigt werden.",
        },
        {
          title: "HOSTING-LÖSUNG AUSWÄHLEN",
          description:
            "Ich bespreche die geeigneten Hosting-Optionen sowie verfügbare Leistungen, laufende Kosten und die Zuständigkeit für Domain und Hosting-Vertrag.",
        },
        {
          title: "EINRICHTUNG & MIGRATION",
          description:
            "Die Hosting-Umgebung wird vorbereitet. Bei einem Umzug planen wir Sicherungen, Datenübertragung, Konfiguration und gegebenenfalls die DNS-Umstellung.",
        },
        {
          title: "TESTING & LIVE-SCHALTUNG",
          description:
            "Vor und nach der Veröffentlichung prüfe ich vereinbarte Funktionen, HTTPS und die Erreichbarkeit der Website. Weitere technische Betreuung kann bei Bedarf folgen.",
        },
      ],

      projectsHeading: {
        title: "AUSGEWÄHLTE WEBSITE-PROJEKTE",
        subtitle:
          "Einblicke in meine Webdesign- und Entwicklungsarbeit. Diese Referenzen zeigen unterschiedliche Website-Technologien und Umsetzungen, nicht ausschließlich Hosting-Projekte.",
      },
      projectsButton: "ALLE PROJEKTE ANSEHEN",

      pricingHeading: {
        title: "WAS KOSTET WEBHOSTING IN WIEN?",
        subtitle:
          "Hosting-Kosten hängen vom Anbieter, Tarif und den technischen Anforderungen ab. Hinzu kommen gegebenenfalls Kosten für Einrichtung, Migration und Betreuung.",
      },

      pricingIntro: [
        "Die monatlichen oder jährlichen Kosten für Webhosting unterscheiden sich je nach Anbieter und Leistungsumfang. Eine kleine WordPress Website benötigt normalerweise andere Ressourcen als ein umfangreicher Onlineshop oder eine individuell entwickelte Webanwendung.",
        "Ich helfe dir, zwischen den Kosten des Hosting-Anbieters und meiner technischen Dienstleistung zu unterscheiden. Domain, Hosting-Abonnement, eventuelle Zusatzdienste und Wartung werden bei der Projektplanung transparent berücksichtigt.",
      ],

      pricingFactors: [
        {
          title: "HOSTING-TARIF & RESSOURCEN",
          description:
            "Speicherplatz, technische Ressourcen, Datenbankfunktionen und verfügbare Zusatzleistungen beeinflussen die laufenden Hosting-Kosten.",
        },
        {
          title: "DOMAIN & E-MAIL",
          description:
            "Domainregistrierung und geschäftliche E-Mail-Postfächer können im Tarif enthalten sein oder separat berechnet werden.",
        },
        {
          title: "EINRICHTUNG & UMZUG",
          description:
            "Die erstmalige Konfiguration, Datenübertragung, DNS-Änderungen und notwendige Tests beeinflussen den einmaligen Arbeitsaufwand.",
        },
        {
          title: "WARTUNG & SUPPORT",
          description:
            "Regelmäßige WordPress-Updates, Backups und zusätzliche technische Betreuung können als eigene Leistungen vereinbart werden.",
        },
      ],

      pricingCta: {
        title: "DU SUCHST EINE PASSENDE HOSTING-LÖSUNG?",
        description:
          "Erzähl mir von deiner Website und deinen Anforderungen. Wir besprechen, welche technische Infrastruktur sinnvoll ist und welche laufenden Kosten entstehen können.",
        button: "HOSTING ANFRAGEN",
      },

      relatedHeading: {
        title: "WEBHOSTING ODER WEBSITE-WARTUNG – WAS IST DER UNTERSCHIED?",
        subtitle:
          "Hosting stellt die technische Umgebung bereit. Wartung kümmert sich um die Software und den Zustand deiner Website. Beides ergänzt sich, ist aber nicht dasselbe.",
      },

      related: [
        {
          title: "WEBHOSTING",
          description:
            "Webhosting stellt Speicher, Serverressourcen und technische Dienste bereit, damit deine Website im Internet erreichbar ist. Umfang und Verantwortlichkeiten hängen vom Anbieter und Vertrag ab.",
          tags: ["SERVER", "DOMAIN", "INFRASTRUCTURE"],
        },
        {
          title: "WEBSITE-WARTUNG",
          description:
            "Website-Wartung umfasst beispielsweise WordPress-Updates, Funktionskontrollen, Fehlerbehebung und die Überprüfung von Backups. Diese Leistungen sind nicht automatisch Bestandteil jedes Hosting-Pakets.",
          tags: ["UPDATES", "BACKUPS", "SUPPORT"],
        },
      ],

      relatedLink: {
        text: "MEHR ÜBER WEBSITE-WARTUNG ERFAHREN",
        href: "/website-wartung/",
      },

      toolsHeading: {
        title: "KOSTENLOSE TOOLS FÜR DEINE WEBSITE",
        subtitle:
          "Prüfe die technischen Grundlagen deiner bestehenden Website oder plane einen neuen Webauftritt.",
      },

      freeTools: [
        {
          title: "KOSTENLOSER WEBSITE-AUDIT",
          description:
            "Analysiere wichtige technische Faktoren rund um SEO, Performance, Sicherheit und Barrierefreiheit und erkenne erste Verbesserungsmöglichkeiten.",
          href: "/website-audit/",
          button: "WEBSITE PRÜFEN",
        },
        {
          title: "WEBSITE-KONFIGURATOR",
          description:
            "Plane deine neue Website Schritt für Schritt. Definiere die wichtigsten Seiten und Funktionen, bevor die technische Umsetzung beginnt.",
          href: "/website-konfigurator/",
          button: "WEBSITE PLANEN",
        },
      ],

      toolkit: "MEIN DIGITALER TOOLKIT",

      faqHeading: {
        title: "HÄUFIGE FRAGEN ZU WEBHOSTING & WORDPRESS HOSTING",
        subtitle:
          "Antworten auf Fragen zu Domains, SSL, Hosting-Kosten, Serverstandorten, Website-Umzug und technischer Betreuung.",
      },

      faqs: [
        {
          question: "WAS IST WEBHOSTING?",
          answer:
            "Webhosting stellt die technische Infrastruktur bereit, über die eine Website im Internet erreichbar ist. Je nach Tarif gehören dazu Speicherplatz, Serverressourcen, Datenbankfunktionen und weitere Dienste.",
        },
        {
          question: "WELCHES HOSTING IST FÜR WORDPRESS GEEIGNET?",
          answer:
            "WordPress benötigt eine kompatible Serverumgebung mit unterstützter PHP-Version und Datenbank. Darüber hinaus sind geeignete Ressourcen, Backups, Sicherheitsmaßnahmen und ein zuverlässiger Betrieb wichtig. Die passende Lösung hängt von deiner Website ab.",
        },
        {
          question: "WAS KOSTET WORDPRESS HOSTING IN WIEN?",
          answer:
            "Die Kosten hängen von Anbieter, Tarif und Ressourcen ab. Domain, E-Mail, zusätzliche Dienste und technische Betreuung können weitere Kosten verursachen. Nach einer kurzen Einschätzung kann ich passende Optionen mit dir besprechen.",
        },
        {
          question: "KANNST DU MEINE WEBSITE ZU EINEM ANDEREN HOSTER UMZIEHEN?",
          answer:
            "Ja. Ich kann die technische Migration unterstützen, sofern die erforderlichen Zugänge und Sicherungen verfügbar sind. Dabei berücksichtige ich Website-Dateien, Datenbanken, Domain-Einstellungen und wichtige Tests.",
        },
        {
          question: "IST EIN SSL-ZERTIFIKAT BEIM HOSTING ENTHALTEN?",
          answer:
            "Viele Hosting-Anbieter stellen SSL/TLS-Zertifikate bereit, aber die konkreten Konditionen unterscheiden sich. Ich prüfe die Möglichkeiten des gewählten Tarifs und unterstütze bei der HTTPS-Einrichtung.",
        },
        {
          question: "SIND E-MAIL-POSTFÄCHER UND DOMAINS INKLUSIVE?",
          answer:
            "Das hängt vom Hosting-Anbieter und Tarif ab. Domains und E-Mail-Dienste können enthalten sein oder separat berechnet werden. Vor der Einrichtung klären wir, welche Dienste du benötigst.",
        },
        {
          question: "IST WEBHOSTING DASSELBE WIE WORDPRESS-WARTUNG?",
          answer:
            "Nein. Hosting stellt die Serverumgebung bereit. WordPress-Wartung betrifft unter anderem Softwareupdates, Funktionsprüfungen und technische Fehlerbehebung. Beide Leistungen können kombiniert werden, müssen aber nicht beim selben Anbieter liegen.",
        },
        {
          question: "MUSS MEIN HOSTING-SERVER IN WIEN STEHEN?",
          answer:
            "Nein. Der geeignete Serverstandort hängt unter anderem von Zielgruppe, Performance, vertraglichen Vorgaben und Datenschutzanforderungen ab. Ich helfe dir, diese Aspekte bei der Anbieterwahl zu berücksichtigen.",
        },
        {
          question: "KANN ICH MEINE DOMAIN UND MEIN HOSTING SELBST BESITZEN?",
          answer:
            "Ja. Ich empfehle grundsätzlich, dass Domain und Hosting-Vertrag nach Möglichkeit auf den Kunden beziehungsweise das eigene Unternehmen registriert werden. Ich kann bei der technischen Einrichtung unterstützen, ohne dass du die Kontrolle über deine Zugänge abgeben musst.",
        },
      ],

      final: {
        eyebrow: "DIE TECHNISCHE BASIS DEINER WEBSITE",
        title: "DU SUCHST ZUVERLÄSSIGES WEBHOSTING?",
        description:
          "Ob neue WordPress Website, Domain-Einrichtung oder Hosting-Wechsel: Ich unterstütze dich bei der technischen Planung und Umsetzung einer Lösung, die zu deinem Projekt passt.",
        button: "HOSTING ANFRAGEN",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 WIEN",
        imprint: "IMPRESSUM",
      },

      projectProps: {
        details: "Details ansehen",
        detailsLink: "/referenzprojekt/",
        tags: "Projektleistungen",
        defaults: ["Webdesign", "WordPress", "Entwicklung", "Support"],
      },
    },

    en: {
      seo: {
        title: "Website Hosting Vienna | WordPress Hosting – ZoraWebDesign",
        description:
          "Website and WordPress hosting assistance in Vienna. Help with domains, SSL, website migration, hosting setup and technical support by ZoraWebDesign.",
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
        languageLink: "/webhosting/",
        languageTitle: "Zur deutschen Webhosting-Seite wechseln",
        freebies: {
          label: "WEBSITE TOOLS",
          items: [
            {
              label: "WEBSITE AUDIT",
              href: "/en-2/website-audit/",
              title: "Open the Website Audit",
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
        first: "WEBSITE HOSTING VIENNA",
        second: "& WORDPRESS HOSTING",
        lead: "Every website needs a dependable technical foundation. I help businesses select, configure and manage suitable hosting solutions – from WordPress hosting and domain setup to SSL certificates and website migrations.",
        primary: "DISCUSS YOUR HOSTING",
        secondary: "EXPLORE SERVICES",
      },

      intro: {
        title: "WHY DOES RELIABLE WEBSITE HOSTING MATTER?",
        paragraphs: [
          "Web hosting provides the infrastructure that makes your website accessible online. The quality and configuration of your hosting environment can influence loading speed, stability, available features, backups and security options.",
          "I'm Julius Timgum, a freelance web designer and developer based in Vienna, Austria. I support clients beyond website design and development with the technical decisions involved in hosting, domains and deployment.",
          "The objective is not to choose the most expensive hosting plan. It's to find an environment that fits your website, budget and management requirements. Actual server resources, locations and availability depend on the hosting provider and selected plan.",
        ],
        benefits: [
          "Hosting solutions matched to your website's needs",
          "Assistance with domains and SSL configuration",
          "Support during website migration and deployment",
          "Direct technical communication with a developer in Vienna",
        ],
      },

      servicesHeading: {
        title: "WHAT WEBSITE HOSTING SERVICES DO I OFFER IN VIENNA?",
        subtitle:
          "From selecting a hosting plan to launching your website, I help organize the technical infrastructure your business needs.",
      },

      services: [
        {
          title: "WORDPRESS HOSTING SETUP",
          description:
            "I help select and configure a hosting environment suitable for WordPress. This includes considering the requirements of your theme, plugins, database and available server resources.",
          tags: ["WORDPRESS", "PHP", "DATABASE"],
        },
        {
          title: "DOMAIN & DNS CONFIGURATION",
          description:
            "I assist with connecting domain names to hosting services and managing relevant DNS records. This may include domain configuration, redirects and the technical changes required for a website launch.",
          tags: ["DOMAIN", "DNS", "CONFIGURATION"],
        },
        {
          title: "SSL & HTTPS SETUP",
          description:
            "Encrypted HTTPS connections are an essential part of modern website infrastructure. I help configure and check SSL/TLS certificates where supported by the hosting provider.",
          tags: ["SSL", "HTTPS", "SECURITY"],
        },
        {
          title: "WEBSITE MIGRATION",
          description:
            "Moving your website to a different hosting provider? I assist with planning, backups, file and database transfers, and the appropriate checks before and after migration.",
          tags: ["MIGRATION", "BACKUPS", "DNS"],
        },
        {
          title: "HOSTING PERFORMANCE",
          description:
            "Server response times, caching, available resources and configuration can affect how quickly a website loads. I review whether the hosting setup matches your website's technical requirements.",
          tags: ["CACHING", "PERFORMANCE", "SERVER"],
        },
        {
          title: "HOSTING SUPPORT & MANAGEMENT",
          description:
            "I help with hosting configuration questions, deployments and technical troubleshooting. Ongoing WordPress maintenance, updates and additional security checks can be arranged separately.",
          tags: ["SUPPORT", "MAINTENANCE", "MONITORING"],
        },
      ],

      optionsHeading: {
        title: "WHICH HOSTING SOLUTION IS RIGHT FOR YOUR WEBSITE?",
        subtitle:
          "Not every website requires the same hosting infrastructure. The right choice depends on technology, expected usage, content management and long-term needs.",
      },

      options: [
        {
          title: "WORDPRESS & TRADITIONAL WEB HOSTING",
          description:
            "Many WordPress websites work well with a properly configured hosting plan providing PHP and database support. Suitable resources, current software versions, backup options and reliable technical operations are important considerations.",
          tags: ["WORDPRESS", "PHP", "MYSQL"],
        },
        {
          title: "MODERN FRONTEND HOSTING",
          description:
            "Custom websites built with technologies such as SvelteKit may benefit from specialized hosting and deployment platforms. The appropriate setup depends on whether the project uses static rendering, server-side functions or external data sources.",
          tags: ["SVELTEKIT", "VERCEL", "DEPLOYMENT"],
        },
      ],

      processHeading: {
        title: "HOW DOES WEBSITE HOSTING SETUP WORK?",
        subtitle:
          "A structured setup process helps ensure your domain, website, technical requirements and responsibilities are correctly aligned.",
      },

      process: [
        {
          title: "REVIEW YOUR REQUIREMENTS",
          description:
            "We identify your website technology, current hosting arrangements and the access, functions and resources required.",
        },
        {
          title: "SELECT THE HOSTING APPROACH",
          description:
            "I explain suitable hosting options, available features, recurring costs and who will own the domain and hosting contract.",
        },
        {
          title: "CONFIGURATION & MIGRATION",
          description:
            "We prepare the hosting environment. For migrations, we plan backups, transfers, configuration and any necessary DNS changes.",
        },
        {
          title: "TESTING & WEBSITE LAUNCH",
          description:
            "Before and after launch, I review agreed functionality, HTTPS configuration and website accessibility. Additional technical support can be arranged if needed.",
        },
      ],

      projectsHeading: {
        title: "SELECTED WEBSITE PROJECTS",
        subtitle:
          "Explore my web design and development work across different technologies and businesses. These references illustrate website implementation rather than exclusively hosting projects.",
      },
      projectsButton: "VIEW ALL PROJECTS",

      pricingHeading: {
        title: "HOW MUCH DOES WEBSITE HOSTING COST IN VIENNA?",
        subtitle:
          "Hosting prices depend on the provider, subscription and technical requirements. Setup, migrations and ongoing support may involve additional costs.",
      },

      pricingIntro: [
        "Website hosting costs vary by provider and plan. A small WordPress website typically has different resource requirements from a large online store or custom web application.",
        "I help distinguish between the fees charged by the hosting provider and the cost of technical services I perform. Domain registration, hosting subscriptions, optional services and maintenance can be considered separately during project planning.",
      ],

      pricingFactors: [
        {
          title: "HOSTING PLAN & RESOURCES",
          description:
            "Storage, available computing resources, database support and included features influence recurring hosting costs.",
        },
        {
          title: "DOMAINS & EMAIL",
          description:
            "Domain registration and business email hosting may be included in a plan or billed separately.",
        },
        {
          title: "SETUP & MIGRATION",
          description:
            "Initial configuration, data transfer, DNS changes and necessary testing can influence one-time project costs.",
        },
        {
          title: "MAINTENANCE & SUPPORT",
          description:
            "WordPress updates, backups and additional technical support can be arranged as separate ongoing services.",
        },
      ],

      pricingCta: {
        title: "LOOKING FOR THE RIGHT HOSTING SOLUTION?",
        description:
          "Tell me about your website and technical requirements. We can discuss a suitable hosting approach and the recurring costs involved.",
        button: "DISCUSS HOSTING",
      },

      relatedHeading: {
        title: "WEB HOSTING VS WEBSITE MAINTENANCE – WHAT'S THE DIFFERENCE?",
        subtitle:
          "Hosting provides the infrastructure. Maintenance takes care of the website's software and technical condition. They complement each other but are not the same service.",
      },

      related: [
        {
          title: "WEB HOSTING",
          description:
            "Hosting provides storage, server resources and technical services that make your website available online. The exact scope depends on your provider and contract.",
          tags: ["SERVER", "DOMAIN", "INFRASTRUCTURE"],
        },
        {
          title: "WEBSITE MAINTENANCE",
          description:
            "Website maintenance covers tasks such as WordPress updates, functionality checks, troubleshooting and reviewing backups. These services are not automatically included in every hosting plan.",
          tags: ["UPDATES", "BACKUPS", "SUPPORT"],
        },
      ],

      relatedLink: {
        text: "EXPLORE WEBSITE MAINTENANCE",
        href: "/en-2/website-maintenance/",
      },

      toolsHeading: {
        title: "FREE WEBSITE TOOLS",
        subtitle:
          "Review the technical foundations of your existing website or plan a new online presence.",
      },

      freeTools: [
        {
          title: "FREE WEBSITE AUDIT",
          description:
            "Review technical aspects of your website including SEO, performance, security and accessibility to identify possible improvements.",
          href: "/en-2/website-audit/",
          button: "AUDIT YOUR WEBSITE",
        },
        {
          title: "WEBSITE CONFIGURATOR",
          description:
            "Plan your next website step by step. Identify important pages and features before development begins.",
          href: "/en-2/website-configurator/",
          button: "PLAN YOUR WEBSITE",
        },
      ],

      toolkit: "MY DIGITAL TOOLKIT",

      faqHeading: {
        title: "FREQUENTLY ASKED QUESTIONS ABOUT WEBSITE HOSTING",
        subtitle:
          "Answers to common questions about WordPress hosting, domains, SSL, pricing, migrations and ongoing technical support.",
      },

      faqs: [
        {
          question: "WHAT IS WEBSITE HOSTING?",
          answer:
            "Website hosting provides the infrastructure that makes a website accessible over the internet. Depending on the plan, it can include storage, server resources, databases and other technical services.",
        },
        {
          question: "WHAT TYPE OF HOSTING DOES WORDPRESS NEED?",
          answer:
            "WordPress requires a compatible environment with supported PHP and database versions. Suitable resources, backup options, security measures and reliable operation are also important. The appropriate plan depends on the website.",
        },
        {
          question: "HOW MUCH DOES WORDPRESS HOSTING COST?",
          answer:
            "Costs vary depending on the provider, plan and available resources. Domains, email, additional services and maintenance may involve separate charges. I can help assess suitable options for your website.",
        },
        {
          question: "CAN YOU MOVE MY WEBSITE TO ANOTHER HOSTING PROVIDER?",
          answer:
            "Yes. I can assist with a technical migration when the necessary credentials and backups are available. This may involve website files, databases, domain configuration and testing.",
        },
        {
          question: "IS AN SSL CERTIFICATE INCLUDED WITH HOSTING?",
          answer:
            "Many hosting companies provide SSL/TLS certificates, but the conditions vary. I can review the selected hosting plan and help configure HTTPS.",
        },
        {
          question: "ARE EMAIL ACCOUNTS AND DOMAINS INCLUDED?",
          answer:
            "This depends on the hosting provider and subscription. Domains and email services may be included or charged separately. We can clarify which services your business needs before setup.",
        },
        {
          question: "IS HOSTING THE SAME AS WORDPRESS MAINTENANCE?",
          answer:
            "No. Hosting provides the server environment, while WordPress maintenance covers software updates, functionality checks and technical troubleshooting. The services can be combined but do not have to be provided by the same company.",
        },
        {
          question: "DOES MY WEBSITE SERVER NEED TO BE IN VIENNA?",
          answer:
            "No. A suitable server location depends on your visitors, performance needs, contractual requirements and data protection considerations. These factors should be considered when choosing a hosting provider.",
        },
        {
          question: "CAN I OWN MY DOMAIN AND HOSTING ACCOUNT?",
          answer:
            "Yes. I generally recommend that clients register their domain and hosting account in their own name or business name whenever possible. I can help configure the services while you retain control of the accounts.",
        },
      ],

      final: {
        eyebrow: "THE FOUNDATION OF YOUR WEBSITE",
        title: "LOOKING FOR RELIABLE WEBSITE HOSTING?",
        description:
          "Whether you're launching a WordPress website, setting up a domain or moving to a new hosting provider, I can help plan and implement the right technical approach.",
        button: "DISCUSS YOUR HOSTING",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 VIENNA",
        imprint: "IMPRINT",
      },

      projectProps: {
        details: "View details",
        detailsLink: "/en-2/reference-project/",
        tags: "Project services",
        defaults: ["Web Design", "WordPress", "Development", "Support"],
      },
    },
  };

  /* =========================================================
     SHARED VALUES
  ========================================================= */

  const copy = $derived(isGerman ? translations.de : translations.en);
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

  /* =========================================================
     SCHEMA.ORG
  ========================================================= */

  const structuredData = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: isGerman
          ? "Webhosting Wien und WordPress Hosting"
          : "Website Hosting Vienna and WordPress Hosting",
        serviceType: isGerman
          ? "WordPress Hosting, Domain-Einrichtung und Website-Migration"
          : "WordPress Hosting, Domain Setup and Website Migration",
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
            name: isGerman ? "Webhosting Wien" : "Website Hosting Vienna",
            item: canonical,
          },
        ],
      },
    ],
  });

  /* =========================================================
     PAGE THEME
  ========================================================= */

  onMount(() => {
    const html = document.documentElement;
    const body = document.body;

    const previousLanguage = html.lang;
    const hadBodyLight = body.classList.contains("light");
    const hadHtmlLight = html.classList.contains("light");

    html.lang = isGerman ? "de" : "en";
    html.classList.remove("light");
    body.classList.remove("light");
    body.classList.add("hosting-dark-page");

    return () => {
      body.classList.remove("hosting-dark-page");
      html.lang = previousLanguage;

      if (hadBodyLight) body.classList.add("light");
      if (hadHtmlLight) html.classList.add("light");
    };
  });
</script>

<!-- =========================================================
     SEO HEAD
========================================================= -->

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

<main class="hosting-page compact-service-page">
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

            <a href="#hosting-services" class="button button-outline">
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

  <!-- HOSTING SERVICES -->

  <section id="hosting-services" class="content-section">
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

  <!-- HOSTING OPTIONS -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.optionsHeading.title}
      subtitle={copy.optionsHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.options as option}
          <article class="content-card">
            <span class="blue-dot" aria-hidden="true"></span>
            <h3>{option.title}</h3>
            <p>{option.description}</p>

            <div class="tag-list">
              {#each option.tags as tag}
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

        <a href={contactUrl} class="button button-outline">
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

  <!-- HOSTING VS MAINTENANCE -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.relatedHeading.title}
      subtitle={copy.relatedHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.related as item}
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

      <div class="related-link-wrap">
        <a href={copy.relatedLink.href} class="button button-outline">
          {copy.relatedLink.text}

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

      <!-- TECHNOLOGY MARQUEE -->

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
  <MoreServices language={language} currentService="webhosting" />
</main>

<Footer
  homepage
  location={copy.footer.location}
  imprintText={copy.footer.imprint}
  language={isGerman ? "de" : "en"}
/>

<style>
  /* =========================================================
     BASE
  ========================================================= */

  :global(body.hosting-dark-page) {
    margin: 0;
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .hosting-page {
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

  .hosting-page * {
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
    max-width: 680px;
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

  /* =========================================================
     CONTENT CARDS
  ========================================================= */

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
     PRICING
  ========================================================= */

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

  .related-link-wrap {
    display: flex;
    justify-content: center;
    margin-top: 45px;
  }

  /* =========================================================
     FREE TOOLS
  ========================================================= */

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

  /* =========================================================
     TECHNOLOGY MARQUEE
  ========================================================= */

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

  .button:focus-visible,
  .tool-link:focus-visible,
  .faq-item summary:focus-visible {
    outline: 2px solid var(--accent);
    outline-offset: 4px;
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

    .related-link-wrap {
      margin-top: 32px;
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
