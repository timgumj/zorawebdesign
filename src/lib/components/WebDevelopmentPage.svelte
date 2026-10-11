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
  const germanUrl = `${siteUrl}/webentwicklung/`;
  const englishUrl = `${siteUrl}/en-2/web-development/`;

  /* =========================================================
     BILINGUAL SEO & CONTENT
  ========================================================= */

  const translations = {
    de: {
      seo: {
        title: "Webentwicklung Wien | WordPress Entwickler – ZoraWebDesign",
        description:
          "Individuelle Webentwicklung in Wien mit Julius Timgum. WordPress Programmierung, moderne Webanwendungen, SvelteKit, APIs und technische Website-Lösungen.",
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
        languageLink: "/en-2/web-development/",
        languageTitle: "Switch to English Web Development",
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
        first: "WEBENTWICKLUNG WIEN",
        second: "WORDPRESS & INDIVIDUELLE WEBLÖSUNGEN",
        lead: "Du benötigst mehr als eine Website-Vorlage? Ich entwickle individuelle, responsive Websites und technische Weblösungen – von der WordPress-Programmierung über moderne Frontends bis zur Integration von APIs und Content-Management-Systemen.",
        primary: "PROJEKT ANFRAGEN",
        secondary: "LEISTUNGEN ANSEHEN",
      },

      intro: {
        title: "WAS MACHT PROFESSIONELLE WEBENTWICKLUNG AUS?",
        paragraphs: [
          "Professionelle Webentwicklung verbindet eine verständliche Nutzeroberfläche mit zuverlässiger Technik. Eine Website soll nicht nur gut aussehen, sondern auf unterschiedlichen Geräten funktionieren, Inhalte korrekt darstellen und ihre Aufgaben langfristig erfüllen.",
          "Ich bin Julius Timgum, selbstständiger Webentwickler und Webdesigner in Wien. Mein Schwerpunkt liegt auf WordPress-Entwicklung, individueller Frontend-Programmierung und der technischen Umsetzung von Websites für Unternehmen, Selbstständige und Organisationen.",
          "Je nach Projekt arbeite ich mit WordPress, PHP, JavaScript, TypeScript oder SvelteKit. Dabei steht nicht eine bestimmte Technologie im Mittelpunkt, sondern eine Lösung, die zu den Anforderungen, dem Budget und der späteren Verwaltung deiner Website passt.",
        ],
        benefits: [
          "Individuelle Entwicklung statt unnötiger Standardlösungen",
          "WordPress Websites mit verständlicher Inhaltsverwaltung",
          "Responsive Frontends und saubere technische Strukturen",
          "Direkte Zusammenarbeit mit einem Entwickler in Wien",
        ],
      },

      servicesHeading: {
        title: "WELCHE WEBENTWICKLUNGS-LEISTUNGEN BIETE ICH IN WIEN AN?",
        subtitle:
          "Von individuellen WordPress-Funktionen über moderne Frontends bis zu Schnittstellen und Performance-Optimierung: Ich entwickle Lösungen passend zu deinen Anforderungen.",
      },

      services: [
        {
          title: "WORDPRESS ENTWICKLUNG",
          description:
            "Ich entwickle und passe WordPress Websites technisch an – mit individuellen Themes, Gutenberg-Blöcken, wiederverwendbaren Seitenvorlagen und passenden Erweiterungen. Dabei berücksichtige ich eine verständliche Bedienung im Backend, damit du wichtige Inhalte später selbst verwalten kannst.",
          tags: ["WORDPRESS", "PHP", "GUTENBERG"],
        },
        {
          title: "INDIVIDUELLE FRONTEND-ENTWICKLUNG",
          description:
            "Mit HTML, CSS, JavaScript und TypeScript setze ich responsive Benutzeroberflächen um. Für geeignete Projekte nutze ich moderne Frameworks wie SvelteKit, um individuelle Komponenten, Interaktionen und Seitenstrukturen zu entwickeln.",
          tags: ["HTML", "CSS", "JAVASCRIPT", "SVELTEKIT"],
        },
        {
          title: "CMS & HEADLESS WORDPRESS",
          description:
            "Ein Content-Management-System soll die Pflege deiner Website erleichtern. Je nach Projekt kann WordPress als klassische Website oder als Headless-CMS mit einem getrennten Frontend eingesetzt werden. Entscheidend sind Wartbarkeit, Anforderungen und redaktioneller Arbeitsablauf.",
          tags: ["CMS", "HEADLESS", "REST API"],
        },
        {
          title: "API-INTEGRATIONEN & SCHNITTSTELLEN",
          description:
            "Ich verbinde Websites mit geeigneten externen Diensten oder Datenquellen. Dazu können REST-APIs, Formulare, Kalender, Buchungslösungen und andere Integrationen gehören. Vor der Umsetzung prüfen wir technische Voraussetzungen, Zugriffsrechte und Datenschutzanforderungen.",
          tags: ["REST API", "INTEGRATION", "DATA"],
        },
        {
          title: "WEBSITE-RELAUNCH & MIGRATION",
          description:
            "Bei einem technischen Relaunch unterstütze ich die Überarbeitung oder den Wechsel bestehender Websites. Ich berücksichtige wichtige Inhalte, bestehende URLs, Weiterleitungen und die spätere Verwaltung, damit der Übergang möglichst kontrolliert erfolgt.",
          tags: ["MIGRATION", "REDIRECTS", "RELAUNCH"],
        },
        {
          title: "PERFORMANCE & TECHNISCHES SEO",
          description:
            "Ich achte auf semantischen HTML-Aufbau, Ladezeiten, responsive Darstellung und eine verständliche Seitenstruktur. Bestehende Websites können außerdem auf technische Engpässe, überflüssige Ressourcen und mögliche Verbesserungen untersucht werden.",
          tags: ["SEO", "CORE WEB VITALS", "PERFORMANCE"],
        },
      ],

      technologyHeading: {
        title: "WORDPRESS ODER MODERNE WEBENTWICKLUNG – WAS IST SINNVOLL?",
        subtitle:
          "Nicht jedes Projekt braucht dasselbe technische System. Ich unterstütze dich bei der Auswahl einer Lösung, die sich gut entwickeln, pflegen und erweitern lässt.",
      },

      technologies: [
        {
          title: "WORDPRESS & PHP",
          description:
            "WordPress eignet sich besonders für Websites, deren Inhalte regelmäßig von nichttechnischen Personen gepflegt werden. Mit eigenen Themes, Gutenberg-Strukturen und PHP-Anpassungen lässt sich eine individuelle Lösung entwickeln, ohne die vertraute Inhaltsverwaltung aufzugeben.",
          tags: ["WORDPRESS", "PHP", "CUSTOM THEMES"],
        },
        {
          title: "SVELTEKIT & JAVASCRIPT",
          description:
            "SvelteKit kann sinnvoll sein, wenn ein Projekt ein individuell entwickeltes Frontend, spezielle Interaktionen oder die Integration externer Daten benötigt. Die Wahl hängt unter anderem von Hosting, Content-Workflow und technischen Anforderungen ab.",
          tags: ["SVELTEKIT", "TYPESCRIPT", "FRONTEND"],
        },
      ],

      processHeading: {
        title: "WIE LÄUFT EIN WEBENTWICKLUNGS-PROJEKT AB?",
        subtitle:
          "Von der technischen Planung bis zur Veröffentlichung: Ein klarer Entwicklungsprozess sorgt dafür, dass Ziele, Funktionen und Wartbarkeit zusammenpassen.",
      },

      process: [
        {
          title: "ANFORDERUNGEN & BERATUNG",
          description:
            "Wir klären, welche Funktionen, Inhalte und Integrationen benötigt werden. Ich prüfe, welche technische Lösung dafür geeignet ist und welche Voraussetzungen bereits bestehen.",
        },
        {
          title: "ARCHITEKTUR & KONZEPT",
          description:
            "Ich plane die Seitenstruktur, Komponenten, Datenflüsse und gegebenenfalls das CMS. Dabei berücksichtige ich den späteren Bearbeitungs- und Wartungsaufwand.",
        },
        {
          title: "PROGRAMMIERUNG & TESTING",
          description:
            "Die vereinbarten Funktionen werden entwickelt und getestet. Ich prüfe wichtige Abläufe, responsive Darstellung und grundlegende Performance- und SEO-Aspekte.",
        },
        {
          title: "DEPLOYMENT & ÜBERGABE",
          description:
            "Nach der Freigabe wird die Website veröffentlicht. Ich unterstütze bei der technischen Übergabe und kann auf Wunsch weitere Wartung oder Anpassungen übernehmen.",
        },
      ],

      projectsHeading: {
        title: "WEBENTWICKLUNGS-PROJEKTE UND REFERENZEN",
        subtitle:
          "Einblicke in meine Arbeit mit WordPress, individuellen Frontends und unterschiedlichen Website-Anforderungen. Die Projekte zeigen sowohl gestalterische als auch technische Umsetzungen.",
      },

      projectsButton: "ALLE PROJEKTE ANSEHEN",

      pricingHeading: {
        title: "WAS KOSTET INDIVIDUELLE WEBENTWICKLUNG IN WIEN?",
        subtitle:
          "Die Entwicklungskosten richten sich nach Funktionen, technischer Komplexität, Content-Management und bestehenden Systemen.",
      },

      pricingIntro: [
        "Die Kosten einer professionellen Webentwicklung hängen vom Umfang des Projekts ab. Eine bestehende WordPress Website anzupassen ist etwas anderes, als ein individuelles Frontend mit mehreren Schnittstellen oder einer eigenen Inhaltsarchitektur neu zu entwickeln.",
        "Deshalb besprechen wir zuerst die notwendigen Funktionen, Inhalte und technischen Voraussetzungen. Danach kann ich den Umfang einschätzen und ein transparentes individuelles Angebot erstellen. Laufende Kosten für Hosting, Lizenzen oder Wartung werden bei Bedarf separat berücksichtigt.",
      ],

      pricingFactors: [
        {
          title: "FUNKTIONSUMFANG",
          description:
            "Formulare, Buchungen, Benutzeroberflächen, Datenquellen oder individuelle Komponenten beeinflussen die Entwicklungszeit.",
        },
        {
          title: "CMS & BACKEND",
          description:
            "Ob WordPress, ein Headless-CMS oder eine andere Architektur sinnvoll ist, hängt auch davon ab, wie Inhalte verwaltet werden sollen.",
        },
        {
          title: "SCHNITTSTELLEN",
          description:
            "Die Anbindung externer Systeme kann zusätzliche Planung, Authentifizierung, Fehlerbehandlung und Tests erfordern.",
        },
        {
          title: "WARTUNG & BETRIEB",
          description:
            "Hosting, Sicherheitsupdates, Monitoring und laufende Anpassungen können zum langfristigen Projektumfang gehören.",
        },
      ],

      pricingCta: {
        title: "DU PLANST EIN INDIVIDUELLES WEBPROJEKT?",
        description:
          "Nutze meinen kostenlosen Website-Konfigurator, um erste Anforderungen festzuhalten. Gemeinsam können wir danach den passenden Entwicklungsansatz besprechen.",
        button: "PROJEKT PLANEN",
        href: "/website-konfigurator/",
      },

      toolsHeading: {
        title: "KOSTENLOSE TOOLS FÜR WEBSITE-PLANUNG UND ANALYSE",
        subtitle:
          "Plane die Anforderungen deines neuen Webprojekts oder prüfe wichtige technische Grundlagen einer bestehenden Website.",
      },

      freeTools: [
        {
          title: "WEBSITE-KONFIGURATOR",
          description:
            "Strukturiere dein nächstes Website-Projekt. Definiere wichtige Seiten, Funktionen und Anforderungen, bevor die Entwicklung beginnt.",
          href: "/website-konfigurator/",
          button: "WEBSITE PLANEN",
        },
        {
          title: "KOSTENLOSER WEBSITE-AUDIT",
          description:
            "Analysiere relevante technische Bereiche wie SEO, Performance, Sicherheit und Barrierefreiheit deiner bestehenden Website.",
          href: "/website-audit/",
          button: "WEBSITE PRÜFEN",
        },
      ],

      toolkit: "MEIN DIGITALER TOOLKIT",

      faqHeading: {
        title: "HÄUFIGE FRAGEN ZUR WEBENTWICKLUNG IN WIEN",
        subtitle:
          "Antworten auf Fragen rund um WordPress-Programmierung, individuelle Entwicklung, Kosten, CMS und technische Betreuung.",
      },

      faqs: [
        {
          question:
            "WAS IST DER UNTERSCHIED ZWISCHEN WEBDESIGN UND WEBENTWICKLUNG?",
          answer:
            "Webdesign beschäftigt sich vor allem mit Gestaltung, Benutzerfreundlichkeit und Seitenstruktur. Webentwicklung setzt diese Konzepte technisch um und entwickelt die benötigten Funktionen. Ich verbinde beide Bereiche, damit Gestaltung und technische Umsetzung zusammenpassen.",
        },
        {
          question:
            "KANNST DU EINE INDIVIDUELLE WORDPRESS WEBSITE PROGRAMMIEREN?",
          answer:
            "Ja. Ich entwickle WordPress Websites mit eigenen Themes, Gutenberg-Strukturen und passenden technischen Anpassungen. Dabei achte ich auf eine verständliche Inhaltsverwaltung und eine wartbare Umsetzung.",
        },
        {
          question: "WAS KOSTET EIN WEBENTWICKLER IN WIEN?",
          answer:
            "Die Kosten hängen davon ab, ob einzelne Funktionen angepasst oder ganze Websites neu entwickelt werden sollen. Technische Komplexität, Schnittstellen und Projektumfang beeinflussen den Aufwand. Nach einem Erstgespräch kann ich ein individuelles Angebot erstellen.",
        },
        {
          question: "IST WORDPRESS ODER SVELTEKIT BESSER?",
          answer:
            "Das hängt von deinem Projekt ab. WordPress eignet sich besonders für redaktionell gepflegte Websites mit vertrauter Inhaltsverwaltung. SvelteKit kann für individuelle Frontends und spezielle Anwendungen sinnvoll sein. Beide Technologien können je nach Architektur auch kombiniert werden.",
        },
        {
          question: "KANN ICH MEINE WEBSITE SPÄTER SELBST BEARBEITEN?",
          answer:
            "Ja, sofern eine geeignete Inhaltsverwaltung Bestandteil des Projekts ist. Bei WordPress lassen sich Texte, Bilder und Seitenbereiche über den Editor verwalten. Bei individuell entwickelten Websites planen wir die passende Lösung bereits zu Projektbeginn.",
        },
        {
          question: "KANNST DU EXTERNE APIS ODER DIENSTE EINBINDEN?",
          answer:
            "Ja. Je nach Anforderungen und Dokumentation lassen sich Websites mit externen APIs und Diensten verbinden. Vor der Umsetzung klären wir Zugriffsrechte, Sicherheit, technische Grenzen und den gewünschten Datenfluss.",
        },
        {
          question: "ÜBERNIMMST DU AUCH BESTEHENDE WORDPRESS WEBSITES?",
          answer:
            "Ja. Ich kann bestehende WordPress Websites prüfen, technisch erweitern, überarbeiten oder bei einem Relaunch unterstützen. Zunächst sehen wir uns Theme, Plugins, Hosting und die vorhandene Struktur an.",
        },
        {
          question: "BIETEST DU WEBENTWICKLUNG AUCH AUSSERHALB VON WIEN AN?",
          answer:
            "Ja. Ich arbeite von Wien aus mit Unternehmen, Selbstständigen und Organisationen in Österreich, Deutschland und international zusammen. Viele Entwicklungsprojekte lassen sich vollständig remote umsetzen.",
        },
      ],

      final: {
        eyebrow: "DEIN NÄCHSTES ENTWICKLUNGSPROJEKT",
        title: "DU BRAUCHST EINE INDIVIDUELLE WEBLÖSUNG?",
        description:
          "Ob WordPress-Entwicklung, ein modernes Frontend oder die technische Erweiterung einer bestehenden Website: Lass uns deine Anforderungen besprechen und eine passende Lösung entwickeln.",
        button: "PROJEKT ANFRAGEN",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 WIEN",
        imprint: "IMPRESSUM",
      },

      projectProps: {
        details: "Details ansehen",
        detailsLink: "/referenzprojekt/",
        tags: "Projektleistungen",
        defaults: ["Webdesign", "WordPress", "Webentwicklung", "Support"],
      },
    },

    en: {
      seo: {
        title: "Web Developer Vienna | WordPress & SvelteKit – ZoraWebDesign",
        description:
          "Custom web development in Vienna by Julius Timgum. WordPress development, SvelteKit frontends, API integrations and responsive websites for businesses.",
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
        languageLink: "/webentwicklung/",
        languageTitle: "Zur deutschen Webentwicklungs-Seite wechseln",
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
        first: "WEB DEVELOPMENT VIENNA",
        second: "WORDPRESS & CUSTOM WEB SOLUTIONS",
        lead: "Need more than an off-the-shelf website template? I develop responsive websites and custom web solutions, from WordPress development and modern frontends to API integrations and content management systems.",
        primary: "DISCUSS YOUR PROJECT",
        secondary: "EXPLORE SERVICES",
      },

      intro: {
        title: "WHAT MAKES PROFESSIONAL WEB DEVELOPMENT EFFECTIVE?",
        paragraphs: [
          "Professional web development combines an intuitive user experience with reliable technology. A well-built website needs to work across devices, present content clearly and support the tasks your business requires.",
          "I'm Julius Timgum, a freelance web developer and designer based in Vienna, Austria. I specialize in WordPress development, custom frontend engineering and technical website solutions for businesses, freelancers and organizations.",
          "Depending on the project, I work with WordPress, PHP, JavaScript, TypeScript and SvelteKit. Rather than choosing a technology simply because it's popular, I focus on maintainability, your content workflow and the functionality you actually need.",
        ],
        benefits: [
          "Custom development tailored to real project requirements",
          "WordPress websites with manageable content editing",
          "Responsive frontends and clean technical structures",
          "Direct collaboration with a developer based in Vienna",
        ],
      },

      servicesHeading: {
        title: "WHAT WEB DEVELOPMENT SERVICES DO I OFFER IN VIENNA?",
        subtitle:
          "From custom WordPress functionality and modern frontends to API integrations and performance improvements, I build technical solutions around your business requirements.",
      },

      services: [
        {
          title: "WORDPRESS DEVELOPMENT",
          description:
            "I develop and customize WordPress websites using custom themes, Gutenberg blocks, reusable page patterns and appropriate extensions. I also focus on creating an intuitive editing experience, so your team can manage important content after launch.",
          tags: ["WORDPRESS", "PHP", "GUTENBERG"],
        },
        {
          title: "CUSTOM FRONTEND DEVELOPMENT",
          description:
            "I use HTML, CSS, JavaScript and TypeScript to build responsive user interfaces. For suitable projects, I work with frameworks such as SvelteKit to create custom components, interactions and website structures.",
          tags: ["HTML", "CSS", "JAVASCRIPT", "SVELTEKIT"],
        },
        {
          title: "CMS & HEADLESS WORDPRESS",
          description:
            "Your content management system should support the way you work. Depending on your needs, WordPress can power a traditional website or serve content through an API to a separate frontend. The right approach depends on maintenance, complexity and your team's editing requirements.",
          tags: ["CMS", "HEADLESS", "REST API"],
        },
        {
          title: "API INTEGRATIONS",
          description:
            "I connect websites to suitable third-party services and data sources, including REST APIs, forms, calendars, booking tools and other integrations. Before development, we review technical requirements, permissions and security considerations.",
          tags: ["REST API", "INTEGRATIONS", "DATA"],
        },
        {
          title: "WEBSITE REDESIGN & MIGRATION",
          description:
            "I support technical website rebuilds, platform changes and migrations. Existing content, important URLs, redirects and future content management requirements are considered to help make the transition as controlled as possible.",
          tags: ["MIGRATION", "REDIRECTS", "RELAUNCH"],
        },
        {
          title: "PERFORMANCE & TECHNICAL SEO",
          description:
            "I consider semantic HTML, loading speed, responsive behavior and logical site architecture throughout development. Existing websites can also be reviewed for performance bottlenecks and unnecessary technical complexity.",
          tags: ["SEO", "CORE WEB VITALS", "PERFORMANCE"],
        },
      ],

      technologyHeading: {
        title: "WORDPRESS OR CUSTOM FRONTEND DEVELOPMENT – WHICH IS BETTER?",
        subtitle:
          "Not every project needs the same technical stack. I help select a solution that can be developed, maintained and extended efficiently.",
      },

      technologies: [
        {
          title: "WORDPRESS & PHP",
          description:
            "WordPress is particularly useful for content-driven websites where nontechnical editors need a familiar publishing experience. Custom themes, Gutenberg structures and PHP development make it possible to tailor the website without losing accessible content management.",
          tags: ["WORDPRESS", "PHP", "CUSTOM THEMES"],
        },
        {
          title: "SVELTEKIT & JAVASCRIPT",
          description:
            "SvelteKit can be a good choice for websites requiring a highly customized frontend, specific interactions or external data integrations. Hosting, content editing workflows and technical complexity should all be considered when making this decision.",
          tags: ["SVELTEKIT", "TYPESCRIPT", "FRONTEND"],
        },
      ],

      processHeading: {
        title: "HOW DOES A WEB DEVELOPMENT PROJECT WORK?",
        subtitle:
          "From technical planning to deployment, a structured development process helps align business goals, functionality and long-term maintainability.",
      },

      process: [
        {
          title: "REQUIREMENTS & CONSULTATION",
          description:
            "We clarify which features, content and integrations your project requires. I review the available technical options and any existing systems.",
        },
        {
          title: "ARCHITECTURE & PLANNING",
          description:
            "I plan the site structure, components, data flows and content management approach, with attention to future maintenance and editing needs.",
        },
        {
          title: "DEVELOPMENT & TESTING",
          description:
            "I implement and test the agreed functionality, responsive layouts and essential performance and technical SEO requirements.",
        },
        {
          title: "DEPLOYMENT & HANDOVER",
          description:
            "After approval, your website is deployed. I help with the technical handover and can provide optional support for maintenance and future improvements.",
        },
      ],

      projectsHeading: {
        title: "SELECTED WEB DEVELOPMENT PROJECTS",
        subtitle:
          "Explore examples of my work with WordPress, custom frontend development and different website requirements, combining technical implementation with thoughtful design.",
      },

      projectsButton: "VIEW ALL PROJECTS",

      pricingHeading: {
        title: "HOW MUCH DOES CUSTOM WEB DEVELOPMENT COST IN VIENNA?",
        subtitle:
          "Development costs depend on functionality, technical complexity, content management requirements and the systems involved.",
      },

      pricingIntro: [
        "The cost of professional web development depends on the scope of the project. Improving an existing WordPress website is different from building a custom frontend with several integrations or developing a new content architecture.",
        "I begin by understanding your requirements, content and technical constraints. From there, I can estimate the development scope and provide an individual proposal. Hosting, licenses and ongoing maintenance are discussed separately where relevant.",
      ],

      pricingFactors: [
        {
          title: "FEATURES & FUNCTIONALITY",
          description:
            "Forms, booking systems, user interfaces, external data and custom components can all influence development time.",
        },
        {
          title: "CMS & BACKEND",
          description:
            "The choice between WordPress, a headless CMS or another architecture also depends on how you want to manage content.",
        },
        {
          title: "INTEGRATIONS",
          description:
            "Connecting third-party systems may require additional planning, authentication, error handling and testing.",
        },
        {
          title: "MAINTENANCE & HOSTING",
          description:
            "Hosting, security updates, monitoring and ongoing improvements may form part of a long-term support agreement.",
        },
      ],

      pricingCta: {
        title: "PLANNING A CUSTOM WEB PROJECT?",
        description:
          "Use my free Website Configurator to organize your requirements. We can then discuss the most suitable development approach.",
        button: "PLAN YOUR PROJECT",
        href: "/en-2/website-configurator/",
      },

      toolsHeading: {
        title: "FREE WEBSITE PLANNING & AUDIT TOOLS",
        subtitle:
          "Plan the requirements of your next web project or review the technical foundations of your existing website.",
      },

      freeTools: [
        {
          title: "WEBSITE CONFIGURATOR",
          description:
            "Define the important pages, features and requirements of your new website before development begins.",
          href: "/en-2/website-configurator/",
          button: "PLAN YOUR WEBSITE",
        },
        {
          title: "FREE WEBSITE AUDIT",
          description:
            "Review relevant technical areas including SEO, performance, security and accessibility on your existing website.",
          href: "/en-2/website-audit/",
          button: "AUDIT YOUR WEBSITE",
        },
      ],

      toolkit: "MY DIGITAL TOOLKIT",

      faqHeading: {
        title: "FREQUENTLY ASKED QUESTIONS ABOUT WEB DEVELOPMENT",
        subtitle:
          "Answers to common questions about WordPress development, custom websites, pricing, content management and ongoing support.",
      },

      faqs: [
        {
          question:
            "WHAT IS THE DIFFERENCE BETWEEN WEB DESIGN AND WEB DEVELOPMENT?",
          answer:
            "Web design focuses mainly on visual appearance, usability and information architecture. Web development implements the technical functionality that makes a website work. I provide both services so design and development can be considered together.",
        },
        {
          question: "CAN YOU BUILD A CUSTOM WORDPRESS WEBSITE?",
          answer:
            "Yes. I develop WordPress websites with custom themes, Gutenberg structures and appropriate functionality. I focus on maintainable implementation and an understandable editing experience.",
        },
        {
          question: "HOW MUCH DOES A WEB DEVELOPER COST IN VIENNA?",
          answer:
            "The cost depends on whether you need improvements to an existing website or a completely new solution. Technical complexity, integrations and project scope influence pricing. I provide an individual proposal following an initial discussion.",
        },
        {
          question: "IS WORDPRESS OR SVELTEKIT BETTER?",
          answer:
            "That depends on your requirements. WordPress suits many content-driven websites with familiar editorial workflows. SvelteKit can be suitable for custom frontends and specialized functionality. The technologies can also be combined in certain architectures.",
        },
        {
          question: "WILL I BE ABLE TO EDIT MY WEBSITE MYSELF?",
          answer:
            "Yes, when an appropriate content management solution is included. WordPress provides familiar tools for editing pages, text and images. For custom-developed websites, we plan the editing workflow before development starts.",
        },
        {
          question: "CAN YOU CONNECT MY WEBSITE TO EXTERNAL APIS?",
          answer:
            "Yes. Depending on technical documentation and requirements, I can integrate external APIs and services. We first clarify authentication, permissions, security and how data should move between systems.",
        },
        {
          question: "CAN YOU WORK ON AN EXISTING WORDPRESS WEBSITE?",
          answer:
            "Yes. I can review, customize, expand or rebuild existing WordPress websites. An initial technical review helps identify how the theme, plugins, hosting and existing content are organized.",
        },
        {
          question: "DO YOU WORK WITH CLIENTS OUTSIDE VIENNA?",
          answer:
            "Yes. I work with businesses, freelancers and organizations across Austria, Germany and internationally. Many web development projects can be completed entirely remotely.",
        },
      ],

      final: {
        eyebrow: "YOUR NEXT DEVELOPMENT PROJECT",
        title: "NEED A CUSTOM WEB SOLUTION?",
        description:
          "Whether you need WordPress development, a modern frontend or additional functionality for an existing website, let's discuss your requirements and find an appropriate solution.",
        button: "DISCUSS YOUR PROJECT",
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
     STRUCTURED DATA
  ========================================================= */

  const structuredData = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: isGerman
          ? "Webentwicklung Wien – WordPress und individuelle Weblösungen"
          : "Web Development Vienna – WordPress and Custom Web Solutions",
        serviceType: isGerman
          ? "WordPress Entwicklung und individuelle Webentwicklung"
          : "WordPress Development and Custom Web Development",
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
            name: isGerman ? "Webentwicklung Wien" : "Web Development Vienna",
            item: canonical,
          },
        ],
      },
    ],
  });

  /* =========================================================
     DARK THEME
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
    body.classList.add("webdevelopment-dark-page");

    return () => {
      body.classList.remove("webdevelopment-dark-page");
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

<main class="webdevelopment-page compact-service-page">
  <!-- =======================================================
       HERO
  ======================================================== -->

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

            <a href="#webdevelopment-services" class="button button-outline">
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

  <!-- =======================================================
       DEVELOPMENT SERVICES
  ======================================================== -->

  <section id="webdevelopment-services" class="content-section">
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

  <!-- =======================================================
       DEVELOPMENT TECHNOLOGIES
  ======================================================== -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.technologyHeading.title}
      subtitle={copy.technologyHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.technologies as technology}
          <article class="content-card">
            <span class="blue-dot" aria-hidden="true"></span>

            <h3>{technology.title}</h3>
            <p>{technology.description}</p>

            <div class="tag-list">
              {#each technology.tags as tag}
                <span>{tag}</span>
              {/each}
            </div>
          </article>
        {/each}
      </div>
    </div>
  </section>

  <!-- =======================================================
       PROCESS
  ======================================================== -->

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

  <!-- =======================================================
       PROJECTS
  ======================================================== -->

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

  <!-- =======================================================
       PRICING
  ======================================================== -->

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

  <!-- =======================================================
       FREE TOOLS
  ======================================================== -->

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

      <!-- TOOL MARQUEE -->

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

  <!-- =======================================================
       FAQ
  ======================================================== -->

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

  <!-- =======================================================
       FINAL CTA
  ======================================================== -->

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
  <MoreServices language={language} currentService="webentwicklung" />
</main>

<Footer
  homepage
  location={copy.footer.location}
  imprintText={copy.footer.imprint}
  language={isGerman ? "de" : "en"}
/>

<!-- =========================================================
     STYLES
========================================================= -->

<style>
  :global(body.webdevelopment-dark-page) {
    margin: 0;
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .webdevelopment-page {
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

  .webdevelopment-page * {
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
    font-size: 11px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.08em;
    color: var(--muted);
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
     CONTENT
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
     MARQUEE
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
