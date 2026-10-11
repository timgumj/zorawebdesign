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
  const germanUrl = `${siteUrl}/webshop/`;
  const englishUrl = `${siteUrl}/en-2/e-commerce/`;

  /* =========================================================
     BILINGUAL SEO & CONTENT
  ========================================================= */

  const translations = {
    de: {
      seo: {
        title: "Webshop erstellen lassen Wien | WooCommerce – ZoraWebDesign",
        description:
          "Professionellen Webshop erstellen lassen in Wien. Individuelles E-Commerce Webdesign, WooCommerce, Shopify und responsive Onlineshops von ZoraWebDesign.",
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
        languageLink: "/en-2/e-commerce/",
        languageTitle: "Switch to English E-Commerce",
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
        first: "WEBSHOP ERSTELLEN LASSEN",
        second: "E-COMMERCE & WOOCOMMERCE WIEN",
        lead: "Du möchtest Produkte oder Dienstleistungen online verkaufen? Ich unterstütze dich bei der Gestaltung und Entwicklung eines professionellen Webshops – mit klarer Produktpräsentation, mobiler Nutzerführung und einem durchdachten Bestellprozess.",
        primary: "WEBSHOP ANFRAGEN",
        secondary: "LEISTUNGEN ANSEHEN",
      },

      intro: {
        title: "WAS MACHT EINEN PROFESSIONELLEN WEBSHOP ERFOLGREICH?",
        paragraphs: [
          "Ein guter Onlineshop muss mehr können, als Produkte anzuzeigen. Er sollte Besucher schnell zu den passenden Angeboten führen, wichtige Informationen verständlich präsentieren und einen reibungslosen Weg vom Produkt bis zur Bestellung ermöglichen.",
          "Ich bin Julius Timgum, selbstständiger Webdesigner und Webentwickler in Wien. Ich unterstütze Unternehmen, Marken und Selbstständige bei individuellen E-Commerce-Websites – von der Gestaltung über die technische Umsetzung bis zur Vorbereitung des Launches.",
          "Je nach Anforderungen können WooCommerce mit WordPress, Shopify oder eine individuell entwickelte Lösung sinnvoll sein. Gemeinsam wählen wir eine technische Grundlage, die zu deinem Produktsortiment, deinem Arbeitsablauf und deinen langfristigen Zielen passt.",
        ],
        benefits: [
          "Individuelles Shopdesign passend zu deiner Marke",
          "Mobile Optimierung und übersichtliche Produktseiten",
          "Verständliche Bestellprozesse und passende Integrationen",
          "Einfache Produkt- und Inhaltsverwaltung",
        ],
      },

      servicesHeading: {
        title: "WELCHE E-COMMERCE-LEISTUNGEN BIETE ICH IN WIEN AN?",
        subtitle:
          "Von der ersten Shopstruktur über Produktseiten und Checkout bis zur technischen Umsetzung: Ich entwickle Onlineshops, die zu deinem Unternehmen und deinen Kunden passen.",
      },

      services: [
        {
          title: "INDIVIDUELLES WEBSHOP-DESIGN",
          description:
            "Ich gestalte einen Onlineshop, der deine Marke erkennbar macht und Produkte übersichtlich präsentiert. Dazu gehören Startseite, Produktübersichten, Produktdetailseiten, Navigation und eine klare visuelle Hierarchie.",
          tags: ["E-COMMERCE DESIGN", "UX", "UI"],
        },
        {
          title: "WOOCOMMERCE WEBSHOPS",
          description:
            "Mit WooCommerce lässt sich WordPress um Shopfunktionen erweitern. Ich unterstütze bei der Gestaltung und Einrichtung von Produktkatalog, Warenkorb, Checkout, Versand- und Zahlungsoptionen sowie einer verständlichen Verwaltung.",
          tags: ["WORDPRESS", "WOOCOMMERCE", "CMS"],
        },
        {
          title: "SHOPIFY WEBSHOPS",
          description:
            "Shopify kann für Unternehmen interessant sein, die eine gehostete E-Commerce-Plattform bevorzugen. Ich helfe dir bei der Gestaltung, der Struktur deines Sortiments und der Anpassung wichtiger Shopbereiche.",
          tags: ["SHOPIFY", "SHOP DESIGN", "PRODUCTS"],
        },
        {
          title: "RESPONSIVE SHOPPING-ERLEBNISSE",
          description:
            "Viele Kunden entdecken Produkte auf dem Smartphone. Deshalb achte ich auf gut bedienbare Filter, verständliche Produktinformationen, übersichtliche Warenkörbe und mobilfreundliche Bestellabläufe.",
          tags: ["MOBILE", "RESPONSIVE", "CHECKOUT"],
        },
        {
          title: "ZAHLUNGEN & SHOP-INTEGRATIONEN",
          description:
            "Je nach Plattform und Anforderungen können geeignete Zahlungsanbieter, Versandoptionen, E-Mail-Benachrichtigungen und weitere Schnittstellen eingebunden werden. Die Auswahl stimmen wir auf deinen tatsächlichen Verkaufsprozess ab.",
          tags: ["PAYMENTS", "SHIPPING", "INTEGRATIONS"],
        },
        {
          title: "WEBSHOP SEO & PERFORMANCE",
          description:
            "Ich berücksichtige technische SEO-Grundlagen, verständliche Produkt-URLs, Seitentitel, strukturierte Inhalte, Bildoptimierung und Ladezeiten. Für E-Commerce sind besonders mobile Nutzbarkeit und eine saubere Produktstruktur wichtig.",
          tags: ["SEO", "PERFORMANCE", "STRUCTURE"],
        },
      ],

      platformHeading: {
        title: "WOOCOMMERCE ODER SHOPIFY – WAS PASST ZU DEINEM SHOP?",
        subtitle:
          "Nicht jeder Onlineshop benötigt die gleiche technische Lösung. Die richtige Plattform hängt davon ab, wie du Produkte verwalten, Bestellungen bearbeiten und deinen Shop langfristig erweitern möchtest.",
      },

      platforms: [
        {
          title: "WOOCOMMERCE",
          description:
            "WooCommerce ist eine E-Commerce-Erweiterung für WordPress. Die Lösung eignet sich besonders, wenn Website-Inhalte und Shop in einem gemeinsamen WordPress-System verwaltet werden sollen. Design, Hosting, Wartung und Erweiterungen können individuell gestaltet werden.",
          tags: ["WORDPRESS", "FLEXIBILITY", "OWN HOSTING"],
        },
        {
          title: "SHOPIFY",
          description:
            "Shopify bietet eine gehostete Shopplattform mit integrierten Verwaltungsfunktionen. Das kann den technischen Betriebsaufwand reduzieren. Gleichzeitig sollten laufende Plattformkosten, App-Abhängigkeiten und Anpassungsmöglichkeiten berücksichtigt werden.",
          tags: ["HOSTED PLATFORM", "COMMERCE", "APPS"],
        },
      ],

      processHeading: {
        title: "WIE LÄUFT DIE ERSTELLUNG EINES WEBSHOPS AB?",
        subtitle:
          "Ein strukturierter Ablauf sorgt dafür, dass Sortiment, Design, Bestellprozess und technische Anforderungen von Anfang an zusammenpassen.",
      },

      process: [
        {
          title: "BERATUNG & SHOP-KONZEPT",
          description:
            "Wir besprechen Produkte, Zielgruppe, Umfang, gewünschte Zahlungsmethoden und Versandprozesse. Daraus entsteht ein klarer Projektrahmen.",
        },
        {
          title: "DESIGN & NUTZERFÜHRUNG",
          description:
            "Ich entwickle die Shopstruktur sowie die Gestaltung der wichtigsten Seiten und Bestellschritte. Produktinformationen und Nutzerführung stehen im Mittelpunkt.",
        },
        {
          title: "ENTWICKLUNG & INTEGRATION",
          description:
            "Der Shop wird technisch eingerichtet und angepasst. Produktverwaltung, Warenkorb, Checkout und vereinbarte Integrationen werden umgesetzt.",
        },
        {
          title: "TESTING, LAUNCH & ÜBERGABE",
          description:
            "Wir prüfen wichtige Shopabläufe, responsive Darstellung und die vereinbarten Funktionen. Anschließend erfolgt der Launch und eine Einführung in die Verwaltung.",
        },
      ],

      projectsHeading: {
        title: "AUSGEWÄHLTE WEBDESIGN- UND ENTWICKLUNGSPROJEKTE",
        subtitle:
          "Einblicke in meine bisherigen digitalen Projekte. Sie zeigen meine Arbeit an individuellen Layouts, responsiven Websites und technischen Lösungen – nicht ausschließlich E-Commerce-Projekte.",
      },
      projectsButton: "ALLE PROJEKTE ANSEHEN",

      pricingHeading: {
        title: "WAS KOSTET ES, EINEN WEBSHOP ERSTELLEN ZU LASSEN?",
        subtitle:
          "Die Kosten eines Onlineshops richten sich nach Produktumfang, Gestaltung, Plattform, benötigten Funktionen und technischen Integrationen.",
      },

      pricingIntro: [
        "Ein kleiner Webshop mit wenigen Produkten und einem überschaubaren Bestellprozess erfordert meist weniger Aufwand als ein größerer Shop mit Produktvarianten, mehreren Sprachen, komplexen Versandregeln oder individuellen Schnittstellen.",
        "Vor der Angebotserstellung besprechen wir, welche Funktionen du zum Verkaufsstart wirklich benötigst. Auch laufende Kosten wie Hosting, Plattform-Abonnements, Zahlungsgebühren oder Erweiterungen werden bei der Planung berücksichtigt.",
      ],

      pricingFactors: [
        {
          title: "PRODUKTE & KATEGORIEN",
          description:
            "Anzahl und Struktur der Produkte, Produktvarianten, Filter und notwendige Datenimporte beeinflussen den Umfang.",
        },
        {
          title: "DESIGN & FUNKTIONEN",
          description:
            "Individuelle Shoplayouts, besondere Produktdarstellungen oder zusätzliche Funktionen benötigen unterschiedliche Entwicklungszeiten.",
        },
        {
          title: "CHECKOUT & INTEGRATIONEN",
          description:
            "Zahlungsarten, Versandlogik, Steuereinstellungen und externe Systeme werden passend zu den Anforderungen geplant.",
        },
        {
          title: "BETRIEB & WARTUNG",
          description:
            "Hosting, Plattform-Abonnements, Updates, Sicherheitsmaßnahmen und laufende Betreuung können zusätzliche Kosten verursachen.",
        },
      ],

      pricingCta: {
        title: "DU PLANST DEINEN EIGENEN ONLINESHOP?",
        description:
          "Mit meinem Website-Konfigurator kannst du deine ersten Anforderungen strukturieren. Anschließend besprechen wir die passende Lösung.",
        button: "PROJEKT PLANEN",
        href: "/website-konfigurator/",
      },

      toolsHeading: {
        title: "KOSTENLOSE TOOLS FÜR DEIN ONLINE-PROJEKT",
        subtitle:
          "Plane deine neue Website oder prüfe die technische Qualität deines bestehenden Webauftritts.",
      },

      freeTools: [
        {
          title: "WEBSITE-KONFIGURATOR",
          description:
            "Strukturiere dein digitales Projekt und überlege, welche Seiten, Funktionen und Inhalte du benötigst.",
          href: "/website-konfigurator/",
          button: "WEBSITE PLANEN",
        },
        {
          title: "KOSTENLOSER WEBSITE-AUDIT",
          description:
            "Prüfe wichtige technische Grundlagen deiner bestehenden Website, beispielsweise SEO, Performance und Sicherheit.",
          href: "/website-audit/",
          button: "WEBSITE PRÜFEN",
        },
      ],

      toolkit: "MEIN DIGITALER TOOLKIT",

      faqHeading: {
        title: "HÄUFIGE FRAGEN ZUR WEBSHOP-ERSTELLUNG",
        subtitle:
          "Antworten auf Fragen zu WooCommerce, Shopify, Online-Shop-Kosten, Zahlungsmethoden und der späteren Verwaltung.",
      },

      faqs: [
        {
          question: "WAS KOSTET EIN PROFESSIONELLER WEBSHOP IN WIEN?",
          answer:
            "Die Kosten richten sich nach Plattform, Gestaltung, Produktanzahl und gewünschten Funktionen. Nach einem Gespräch über deinen Bedarf erstelle ich ein individuelles Angebot. Wiederkehrende Plattform-, Hosting- und Transaktionskosten sind dabei gesondert zu berücksichtigen.",
        },
        {
          question: "SOLLTE ICH WOOCOMMERCE ODER SHOPIFY VERWENDEN?",
          answer:
            "WooCommerce ist häufig interessant, wenn du bereits WordPress nutzt oder viel Kontrolle über Gestaltung und Hosting möchtest. Shopify kann sich anbieten, wenn du eine gehostete Shoplösung bevorzugst. Die Entscheidung hängt vom Geschäftsmodell, Budget, technischen Aufwand und gewünschten Funktionen ab.",
        },
        {
          question: "KANN ICH PRODUKTE UND PREISE SELBST ÄNDERN?",
          answer:
            "Ja. Sowohl WooCommerce als auch Shopify bieten Verwaltungsoberflächen, über die du Produkte, Preise, Bilder und viele Shopinhalte selbst aktualisieren kannst. Ich kann dich bei der Übergabe in die Nutzung einführen.",
        },
        {
          question: "WELCHE ZAHLUNGSMETHODEN KANN MEIN WEBSHOP ANBIETEN?",
          answer:
            "Je nach Plattform, Land und Zahlungsanbieter können beispielsweise Kartenzahlung und weitere digitale Zahlungsarten eingerichtet werden. Welche Methoden tatsächlich verfügbar sind, hängt von den gewählten Anbietern und deren Bedingungen ab.",
        },
        {
          question: "IST MEIN WEBSHOP FÜR SMARTPHONES OPTIMIERT?",
          answer:
            "Responsive Gestaltung gehört zu meinem Entwicklungsansatz. Produktseiten, Navigation, Warenkorb und Checkout werden für unterschiedliche Bildschirmgrößen berücksichtigt und vor dem Launch getestet.",
        },
        {
          question: "WIRD MEIN ONLINESHOP FÜR GOOGLE OPTIMIERT?",
          answer:
            "Ich berücksichtige grundlegende technische SEO-Maßnahmen wie sprechende URLs, Seitentitel, strukturierte Produktinformationen, interne Links und Ladezeiten. Dauerhafte Suchmaschinenoptimierung und bestimmte Rankings können nicht garantiert werden.",
        },
        {
          question: "KANN EIN BESTEHENDER SHOP NEU GESTALTET WERDEN?",
          answer:
            "Ja. Bei einem Redesign prüfen wir, welche Produkte, Inhalte und Abläufe erhalten bleiben sollen. Bestehende URLs, Produktdaten und wichtige SEO-Signale werden bei der Planung berücksichtigt.",
        },
        {
          question: "WAS MUSS ICH RECHTLICH BEI EINEM WEBSHOP BEACHTEN?",
          answer:
            "Je nach Markt können unter anderem Impressum, Datenschutz, Verbraucherinformationen, Widerrufsregeln und steuerliche Vorgaben relevant sein. Ich kann technische Inhalte und Funktionen nach bereitgestellten Anforderungen integrieren; eine individuelle rechtliche oder steuerliche Prüfung muss durch qualifizierte Fachpersonen erfolgen.",
        },
      ],

      final: {
        eyebrow: "DEIN NÄCHSTES E-COMMERCE-PROJEKT",
        title: "BEREIT FÜR DEINEN EIGENEN WEBSHOP?",
        description:
          "Du möchtest einen neuen Onlineshop erstellen lassen oder einen bestehenden Shop modernisieren? Lass uns über deine Produkte, deine Kunden und die passende technische Lösung sprechen.",
        button: "WEBSHOP ANFRAGEN",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 WIEN",
        imprint: "IMPRESSUM",
      },

      projectProps: {
        details: "Details ansehen",
        detailsLink: "/referenzprojekt/",
        tags: "Projektleistungen",
        defaults: ["Webdesign", "WordPress", "Webshop", "Entwicklung"],
      },
    },

    en: {
      seo: {
        title: "E-Commerce Web Design Vienna | WooCommerce – ZoraWebDesign",
        description:
          "Custom e-commerce website design in Vienna. WooCommerce and Shopify development, responsive online stores and SEO-friendly solutions by ZoraWebDesign.",
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
        languageLink: "/webshop/",
        languageTitle: "Zur deutschen Webshop-Seite wechseln",
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
        first: "E-COMMERCE WEB DESIGN",
        second: "ONLINE STORES & WOOCOMMERCE VIENNA",
        lead: "Want to sell products or services online? I design and develop professional e-commerce websites with clear product presentation, mobile-friendly shopping experiences and carefully planned checkout flows.",
        primary: "DISCUSS YOUR ONLINE STORE",
        secondary: "EXPLORE SERVICES",
      },

      intro: {
        title: "WHAT MAKES A PROFESSIONAL E-COMMERCE WEBSITE EFFECTIVE?",
        paragraphs: [
          "A successful online store needs more than an attractive product catalogue. It should help shoppers discover the right products, understand important details and complete purchases without unnecessary friction.",
          "I'm Julius Timgum, a freelance web designer and developer based in Vienna, Austria. I work with businesses, brands and independent professionals on e-commerce websites, combining custom design, frontend development and practical content management.",
          "Depending on your requirements, WooCommerce, Shopify or a custom solution may be appropriate. Together, we choose a platform that fits your products, internal workflows and longer-term business plans.",
        ],
        benefits: [
          "Custom online store design tailored to your brand",
          "Responsive product pages and mobile shopping",
          "Clear checkout journeys and suitable integrations",
          "Practical product and content management",
        ],
      },

      servicesHeading: {
        title: "WHAT E-COMMERCE SERVICES DO I OFFER IN VIENNA?",
        subtitle:
          "From store architecture and product pages to checkout design and technical implementation, I create online shopping experiences tailored to your business.",
      },

      services: [
        {
          title: "CUSTOM E-COMMERCE DESIGN",
          description:
            "I create online stores that represent your brand and organize products clearly. This includes the homepage, product listings, product detail pages, navigation and a consistent visual hierarchy.",
          tags: ["E-COMMERCE DESIGN", "UX", "UI"],
        },
        {
          title: "WOOCOMMERCE DEVELOPMENT",
          description:
            "WooCommerce adds e-commerce capabilities to WordPress. I help design and configure product catalogues, shopping carts, checkout flows, shipping and payment options, alongside a manageable editing experience.",
          tags: ["WORDPRESS", "WOOCOMMERCE", "CMS"],
        },
        {
          title: "SHOPIFY STORE DESIGN",
          description:
            "Shopify can suit businesses that prefer a hosted e-commerce platform. I help structure product collections, customize store presentation and develop a consistent customer experience.",
          tags: ["SHOPIFY", "STORE DESIGN", "PRODUCTS"],
        },
        {
          title: "MOBILE E-COMMERCE EXPERIENCES",
          description:
            "Many customers shop on their phones. I focus on usable product navigation, filtering, accessible controls, clear information and mobile-friendly checkout flows.",
          tags: ["MOBILE", "RESPONSIVE", "CHECKOUT"],
        },
        {
          title: "PAYMENTS & INTEGRATIONS",
          description:
            "Depending on your chosen platform and requirements, suitable payment gateways, shipping options, notification systems and other services can be integrated into your store.",
          tags: ["PAYMENTS", "SHIPPING", "INTEGRATIONS"],
        },
        {
          title: "E-COMMERCE SEO & PERFORMANCE",
          description:
            "I consider technical SEO, understandable product URLs, page titles, structured content, optimized images and loading performance. Mobile usability and clear product architecture are especially valuable for online stores.",
          tags: ["SEO", "PERFORMANCE", "STRUCTURE"],
        },
      ],

      platformHeading: {
        title: "WOOCOMMERCE VS SHOPIFY – WHICH PLATFORM FITS YOUR BUSINESS?",
        subtitle:
          "The right platform depends on how you want to manage products, handle orders and grow your online store.",
      },

      platforms: [
        {
          title: "WOOCOMMERCE",
          description:
            "WooCommerce is an e-commerce extension for WordPress. It is especially useful when website content and online shopping need to work within one WordPress system. Design, hosting, maintenance and extensions can be customized.",
          tags: ["WORDPRESS", "FLEXIBILITY", "OWN HOSTING"],
        },
        {
          title: "SHOPIFY",
          description:
            "Shopify is a hosted commerce platform with built-in store management. It can reduce infrastructure responsibilities, while recurring subscription costs, app dependencies and customization limitations should be considered.",
          tags: ["HOSTED PLATFORM", "COMMERCE", "APPS"],
        },
      ],

      processHeading: {
        title: "HOW DOES THE ONLINE STORE DEVELOPMENT PROCESS WORK?",
        subtitle:
          "A clear process makes sure your product catalogue, design, checkout and technical requirements work together from the beginning.",
      },

      process: [
        {
          title: "CONSULTATION & PLANNING",
          description:
            "We discuss your products, audience, store size, payment preferences and shipping requirements. From there, we define the project scope.",
        },
        {
          title: "DESIGN & CUSTOMER JOURNEY",
          description:
            "I plan the main store pages, product presentation and shopping flow. We review how customers will browse products and complete their orders.",
        },
        {
          title: "DEVELOPMENT & INTEGRATIONS",
          description:
            "The store is configured and customized. Product management, shopping cart, checkout and agreed integrations are implemented.",
        },
        {
          title: "TESTING, LAUNCH & HANDOVER",
          description:
            "We check essential shopping flows, responsive design and agreed functionality before launch. I then guide you through your store's management tools.",
        },
      ],

      projectsHeading: {
        title: "SELECTED WEB DESIGN & DEVELOPMENT PROJECTS",
        subtitle:
          "Explore examples of my design and development work across different industries. These references demonstrate responsive layouts and technical solutions; they are not all e-commerce stores.",
      },
      projectsButton: "VIEW ALL PROJECTS",

      pricingHeading: {
        title: "HOW MUCH DOES AN E-COMMERCE WEBSITE COST IN VIENNA?",
        subtitle:
          "Online store pricing depends on the size of your catalogue, the platform, design requirements and the functionality your business needs.",
      },

      pricingIntro: [
        "A smaller online store with a limited product range and straightforward checkout usually requires less work than a larger shop with complex product variations, multiple languages, advanced shipping rules or custom integrations.",
        "Before preparing a proposal, we identify what your business needs for launch. We also consider ongoing expenses such as hosting, platform subscriptions, payment processing and optional extensions.",
      ],

      pricingFactors: [
        {
          title: "PRODUCTS & CATEGORIES",
          description:
            "Catalogue size, product variations, filtering and possible data imports influence implementation work.",
        },
        {
          title: "DESIGN & FEATURES",
          description:
            "Custom layouts, specialized product displays and additional features affect project complexity.",
        },
        {
          title: "CHECKOUT & INTEGRATIONS",
          description:
            "Payment methods, shipping rules, tax configuration and external systems must fit your business processes.",
        },
        {
          title: "HOSTING & MAINTENANCE",
          description:
            "Hosting, platform subscriptions, updates, security measures and ongoing support may create recurring costs.",
        },
      ],

      pricingCta: {
        title: "PLANNING YOUR FIRST ONLINE STORE?",
        description:
          "Use my Website Configurator to organize your requirements, then let's discuss the most appropriate technical solution.",
        button: "PLAN YOUR PROJECT",
        href: "/en-2/website-configurator/",
      },

      toolsHeading: {
        title: "FREE TOOLS FOR YOUR ONLINE BUSINESS",
        subtitle:
          "Plan your new online presence or review the technical quality of an existing website.",
      },

      freeTools: [
        {
          title: "WEBSITE CONFIGURATOR",
          description:
            "Plan your digital project and identify the pages, content and features you need.",
          href: "/en-2/website-configurator/",
          button: "PLAN YOUR WEBSITE",
        },
        {
          title: "FREE WEBSITE AUDIT",
          description:
            "Review important technical foundations of your website, including SEO, performance and security.",
          href: "/en-2/website-audit/",
          button: "AUDIT YOUR WEBSITE",
        },
      ],

      toolkit: "MY DIGITAL TOOLKIT",

      faqHeading: {
        title: "FREQUENTLY ASKED QUESTIONS ABOUT E-COMMERCE WEBSITES",
        subtitle:
          "Answers to common questions about WooCommerce, Shopify, online store pricing, payments and managing products.",
      },

      faqs: [
        {
          question: "HOW MUCH DOES A PROFESSIONAL ONLINE STORE COST?",
          answer:
            "The cost depends on the platform, design, number of products and required features. Following an initial consultation, I prepare a proposal based on your needs. Recurring hosting, platform and transaction fees should also be considered.",
        },
        {
          question: "SHOULD I CHOOSE WOOCOMMERCE OR SHOPIFY?",
          answer:
            "WooCommerce may be suitable if you already use WordPress or want more control over hosting and customization. Shopify may be a better fit if you prefer a hosted commerce platform. The decision depends on your business model, budget and technical needs.",
        },
        {
          question: "CAN I MANAGE PRODUCTS AND PRICES MYSELF?",
          answer:
            "Yes. WooCommerce and Shopify both provide interfaces for managing products, prices, images and other store content. I can walk you through the relevant tools during handover.",
        },
        {
          question: "WHICH PAYMENT METHODS CAN MY SHOP ACCEPT?",
          answer:
            "Depending on the country, platform and payment provider, options may include payment cards and other digital payment methods. Actual availability depends on the selected provider and its conditions.",
        },
        {
          question: "WILL MY ONLINE STORE WORK ON MOBILE DEVICES?",
          answer:
            "Responsive design is part of my development process. Product browsing, navigation, shopping cart and checkout are considered across screen sizes and tested before launch.",
        },
        {
          question: "WILL MY E-COMMERCE WEBSITE BE SEO-FRIENDLY?",
          answer:
            "I implement relevant technical SEO foundations such as descriptive URLs, page titles, structured product information, internal linking and performance considerations. Specific search rankings cannot be guaranteed.",
        },
        {
          question: "CAN YOU REDESIGN MY EXISTING ONLINE STORE?",
          answer:
            "Yes. We review which product data, content and shopping processes should be preserved. Existing URLs and other important SEO signals are considered during redesign planning.",
        },
        {
          question: "WHAT LEGAL REQUIREMENTS APPLY TO AN ONLINE STORE?",
          answer:
            "Requirements vary by market and may include business disclosures, privacy policies, consumer information, cancellation rights and tax rules. I can implement provided legal content and technical requirements, but qualified legal and tax professionals should review compliance.",
        },
      ],

      final: {
        eyebrow: "YOUR NEXT E-COMMERCE PROJECT",
        title: "READY TO LAUNCH YOUR ONLINE STORE?",
        description:
          "Whether you're starting a new online shop or redesigning an existing one, let's discuss your products, customers and the right technical solution for your business.",
        button: "DISCUSS YOUR ONLINE STORE",
      },

      footer: {
        location: "HACKENGASSE 22, 1150 VIENNA",
        imprint: "IMPRINT",
      },

      projectProps: {
        details: "View details",
        detailsLink: "/en-2/reference-project/",
        tags: "Project services",
        defaults: ["Web Design", "WordPress", "E-Commerce", "Development"],
      },
    },
  };

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

  const structuredData = $derived({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "@id": `${canonical}#service`,
        name: isGerman
          ? "Webshop erstellen lassen – E-Commerce Wien"
          : "E-Commerce Web Design and Online Store Development Vienna",
        serviceType: isGerman
          ? "Webshop-Erstellung, WooCommerce und E-Commerce Webdesign"
          : "E-Commerce Web Design, WooCommerce and Shopify Development",
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
            name: isGerman ? "Webshop erstellen lassen" : "E-Commerce",
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
    body.classList.add("ecommerce-dark-page");

    return () => {
      body.classList.remove("ecommerce-dark-page");
      html.lang = previousLanguage;

      if (hadBodyLight) body.classList.add("light");
      if (hadHtmlLight) html.classList.add("light");
    };
  });
</script>

<!-- =========================================================
     SEO META
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

<main class="ecommerce-page compact-service-page">
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

            <a href="#ecommerce-services" class="button button-outline">
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

  <!-- E-COMMERCE SERVICES -->

  <section id="ecommerce-services" class="content-section">
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

  <!-- PLATFORMS -->

  <section class="content-section">
    <ProjectsHeader
      title={copy.platformHeading.title}
      subtitle={copy.platformHeading.subtitle}
    />

    <div class="page-shell content-shell">
      <span class="edge-line edge-left" aria-hidden="true"></span>
      <span class="edge-line edge-right" aria-hidden="true"></span>

      <div class="card-grid">
        {#each copy.platforms as platform}
          <article class="content-card">
            <span class="blue-dot" aria-hidden="true"></span>
            <h3>{platform.title}</h3>
            <p>{platform.description}</p>

            <div class="tag-list">
              {#each platform.tags as tag}
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

      <!-- MARQUEE -->

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
  <MoreServices language={language} currentService="webshop" />
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
  :global(body.ecommerce-dark-page) {
    margin: 0;
    background: #000 !important;
    color: #f5f5f5 !important;
    color-scheme: dark;
  }

  .ecommerce-page {
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

  .ecommerce-page * {
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

  /* BUTTONS */

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

  /* SECTION LAYOUT */

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
