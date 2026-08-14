export const evaProjectMedia = {
  wordpress: "/images/wordpress_cms_blog_result.webp",
  vercel: "/images/vercel_deployment_result.webp",
  speedTestNew: "/images/eva_speed_test_new_website_result.webp",
  speedTestOld: "/images/eva_speed_test_old_website_result.webp",
  newWebsiteImage: "/images/new_website_design_result.webp",
  oldWebsiteImage: "/images/old_website%20design_result.webp",
  oldWebsiteVideo: "/images/oldwebsite%20menu.mp4",
  newWebsiteVideo: "/images/oldwebsite%20video.mp4",
};

export const evaProjectContent = {
  de: {
    language: "de",
    homeUrl: "/",
    alternateUrl: "/en-2/featured-project/",
    nav: {
      tagline: "SEO • WEBDESIGN • WORDPRESS",
      services: "[LEISTUNGEN]",
      projects: "[PROJEKTE]",
      reviews: "[BEWERTUNGEN]",
      contact: "[KONTAKT]",
      servicesLink: "/#services",
      projectsLink: "/#projects",
      reviewsLink: "/#reviews",
      contactLink: "/#contact",
      languageLink: "/en-2/featured-project/",
      languageLabel: "[EN]",
    },
    seo: {
      title:
        "Eva Eichinger Referenzprojekt | Webdesign Wien – Julius Timgum",
      description:
        "Website-Redesign für die Wiener Künstlerin Eva Eichinger mit SvelteKit, Headless WordPress und Vercel.",
      canonical: "https://www.zorawebdesign.com/referenzprojekt/",
      alternate: "https://www.zorawebdesign.com/en-2/featured-project/",
    },
    hero: {
      eyebrow: "REFERENZPROJEKT",
      title: "EVA EICHINGER",
      outlinedTitle: "WEBSITE",
      subtitle:
        "Eine schnelle, klare und ausdrucksstarke digitale Plattform für eine zeitgenössische Künstlerin in Wien.",
      description:
        "Ein vollständiges Website-Redesign mit UX-Konzept, individuellem Webdesign, Headless WordPress und einem leistungsstarken SvelteKit-Frontend.",
      primaryButton: "PROJEKT ENTDECKEN",
      websiteButton: "LIVE-WEBSITE",
    },
    meta: [
      ["KUNDIN", "Eva Eichinger"],
      ["LEISTUNG", "Webdesign & Entwicklung"],
      ["STANDORT", "Wien, Österreich"],
      ["JAHR", "2026"],
    ],
    sections: [
      ["overview", "01", "Übersicht"],
      ["comparison", "02", "Vorher / Nachher"],
      ["challenge", "03", "Herausforderung"],
      ["approach", "04", "Umsetzung"],
      ["technology", "05", "Technologie"],
      ["performance", "06", "Performance"],
      ["results", "07", "Ergebnisse"],
      ["summary", "08", "Zusammenfassung"],
    ],
    overview: {
      eyebrow: "PROJEKTÜBERSICHT",
      title:
        "Die Website einer Künstlerin sollte sich wie eine Erweiterung ihrer Arbeit anfühlen.",
      introduction:
        "Das Ziel war nicht nur, eine bestehende Website moderner zu gestalten. Eva Eichinger benötigte ein neues digitales System, das ihre Arbeiten klar präsentiert und gleichzeitig ihren experimentellen und zeitgenössischen Charakter bewahrt.",
      description:
        "Ich entwickelte die gesamte Nutzerführung neu, erstellte ein modulares visuelles System und verband die redaktionelle Benutzerfreundlichkeit von WordPress mit der Geschwindigkeit und gestalterischen Freiheit von SvelteKit.",
      stats: [
        ["90+", "Performance"],
        ["100", "Barrierefreiheit"],
        ["100", "SEO"],
        ["< 1s", "Desktop-Ladeerlebnis"],
      ],
    },
    comparison: {
      eyebrow: "VORHER / NACHHER",
      title:
        "Von einem klassischen Portfolio zu einer immersiven Kunstplattform.",
      instruction:
        "Bewege den Mauszeiger über eine Vorschau, um die Website abzuspielen. Auf Touch-Geräten kannst du das Video antippen.",
      before: {
        label: "VORHER",
        title: "Alte Website",
        action: "HOVER ZUM ABSPIELEN",
        points: [
          "Unklare visuelle Hierarchie",
          "Eingeschränkte Projektnavigation",
          "Konventionelle Portfolio-Struktur",
        ],
      },
      after: {
        label: "NACHHER",
        title: "Neue Website",
        action: "HOVER ZUM ABSPIELEN",
        points: [
          "Redaktionelle Art Direction",
          "Gezielte Projektnavigation",
          "Schnelle und responsive Interaktionen",
        ],
      },
    },
    challenge: {
      eyebrow: "HERAUSFORDERUNG",
      title:
        "Eine große Menge visueller Arbeiten musste klar strukturiert werden, ohne die Persönlichkeit der Künstlerin zu verlieren.",
      text:
        "Die bestehende Website erfüllte ihre grundlegende Funktion, bot aber keine klare visuelle Hierarchie und machte es schwer, zwischen Gemälden, Ausstellungen, Performances und Events zu navigieren. Gleichzeitig musste das neue System für die Kundin einfach zu pflegen bleiben.",
      points: [
        "Viele unterschiedliche Werk- und Inhaltstypen",
        "Große, hochauflösende Bilddateien",
        "Eigenständige Inhaltsverwaltung durch die Kundin",
        "Individuelle Gestaltung ohne schweres Page-Builder-System",
      ],
    },
    approach: {
      eyebrow: "DESIGN & ENTWICKLUNG",
      title:
        "Das System wurde von der Kunst aus gedacht – nicht von einem fertigen Template.",
      cards: [
        {
          number: "01",
          title: "Klare Informationsarchitektur",
          text:
            "Die Inhalte wurden in verständliche Bereiche gegliedert, damit Besucher Arbeiten schnell entdecken und einordnen können.",
        },
        {
          number: "02",
          title: "Editoriales Designsystem",
          text:
            "Typografie, Abstände, Farben und Interaktionen wurden als flexibles System entwickelt, das die Kunst unterstützt.",
        },
        {
          number: "03",
          title: "Headless WordPress",
          text:
            "WordPress bleibt das vertraute Backend, während SvelteKit die vollständige Kontrolle über Darstellung und Performance übernimmt.",
        },
        {
          number: "04",
          title: "Responsive Interaktionen",
          text:
            "Alle Seiten, Filter, Galerien und Navigationselemente wurden für Desktop, Tablet und Smartphone individuell optimiert.",
        },
      ],
    },
    technology: {
      eyebrow: "TECHNOLOGIE-STACK",
      title:
        "Moderne Technologie mit einer einfachen redaktionellen Verwaltung.",
      items: [
        {
          number: "01",
          name: "SvelteKit",
          role: "Frontend Framework",
          image: null,
          description:
            "Die öffentliche Website wurde mit SvelteKit entwickelt, um ein schnelles, responsives und interaktives Frontend zu schaffen.",
          points: [
            "Statisch generierte Seiten",
            "Responsive Komponenten",
            "Flüssige Übergänge",
            "Wenig clientseitiges JavaScript",
          ],
        },
        {
          number: "02",
          name: "WordPress",
          role: "Headless Content-Management",
          image: evaProjectMedia.wordpress,
          description:
            "WordPress dient als vertrautes Redaktionssystem. Die Kundin kann Gemälde, Ausstellungen, Performances und Events selbstständig verwalten.",
          points: [
            "Individuelle Inhaltstypen",
            "Einfache redaktionelle Abläufe",
            "Strukturierte Projektdaten",
            "Unabhängige Inhaltsverwaltung",
          ],
        },
        {
          number: "03",
          name: "Vercel",
          role: "Deployment & Auslieferung",
          image: evaProjectMedia.vercel,
          description:
            "Das SvelteKit-Frontend wird über Vercel bereitgestellt und profitiert von automatisierten Deployments und einer schnellen globalen Auslieferung.",
          points: [
            "Automatische Deployments",
            "Globale Auslieferung",
            "Vorschau-Umgebungen",
            "Zuverlässiges Hosting",
          ],
        },
      ],
    },
    performance: {
      eyebrow: "PERFORMANCE",
      title:
        "Eine visuelle Transformation mit messbaren Verbesserungen.",
      description:
        "Die neue Website wurde für hochauflösende Inhalte optimiert und bleibt dabei schnell, zugänglich und suchmaschinenfreundlich.",
      beforeLabel: "VORHER",
      beforeTitle: "Alte Website",
      afterLabel: "NACHHER",
      afterTitle: "Neue Website",
    },
    results: {
      eyebrow: "ERGEBNISSE",
      title:
        "Ein Portfolio, das sich eigenständig anfühlt und trotzdem einfach verwaltet werden kann.",
      items: [
        "Schnellere und klarere Nutzerführung",
        "Stärkere visuelle Positionierung der Künstlerin",
        "Flexible Verwaltung über WordPress",
        "Optimierte Darstellung auf allen Bildschirmgrößen",
        "Bessere technische Grundlage für SEO und zukünftige Inhalte",
      ],
    },
    summary: {
      eyebrow: "ZUSAMMENFASSUNG",
      title:
        "Das Ergebnis verbindet individuelle Gestaltung mit einer zuverlässigen technischen Grundlage.",
      text:
        "Die neue Eva-Eichinger-Website ist kein gewöhnliches Portfolio-Template. Sie wurde als individuelles digitales System entwickelt, das Kunst, Inhalte und Navigation in einer klaren, schnellen und ausdrucksstarken Erfahrung zusammenführt.",
    },
    cta: {
      eyebrow: "DEIN PROJEKT KÖNNTE DAS NÄCHSTE SEIN",
      title:
        "Brauchst du eine Website, die den tatsächlichen Wert deiner Arbeit sichtbar macht?",
      description:
        "Ich konzipiere und entwickle individuelle, schnelle und einfach verwaltbare Websites für Unternehmen, Organisationen und Kreative.",
      button: "PROJEKT STARTEN",
      href: "/#contact",
    },
  },

  en: {
    language: "en",
    homeUrl: "/en-2/",
    alternateUrl: "/referenzprojekt/",
    nav: {
      tagline: "SEO • WEB DESIGN • WORDPRESS",
      services: "[SERVICES]",
      projects: "[PROJECTS]",
      reviews: "[REVIEWS]",
      contact: "[CONTACT]",
      servicesLink: "/en-2/#services",
      projectsLink: "/en-2/#projects",
      reviewsLink: "/en-2/#reviews",
      contactLink: "/en-2/#contact",
      languageLink: "/referenzprojekt/",
      languageLabel: "[DE]",
    },
    seo: {
      title:
        "Eva Eichinger Website Case Study | Web Designer Vienna – Julius Timgum",
      description:
        "Website redesign for Vienna artist Eva Eichinger using SvelteKit, headless WordPress and Vercel.",
      canonical: "https://zorawebdesign.com/en-2/featured-project/",
      alternate: "https://zorawebdesign.com/referenzprojekt/",
    },
    hero: {
      eyebrow: "FEATURED PROJECT",
      title: "EVA EICHINGER",
      outlinedTitle: "WEBSITE",
      subtitle:
        "A faster, clearer and more expressive digital platform for a contemporary artist in Vienna.",
      description:
        "A complete website transformation combining UX strategy, custom web design, headless WordPress and a high-performance SvelteKit frontend.",
      primaryButton: "EXPLORE THE PROJECT",
      websiteButton: "LIVE WEBSITE",
    },
    meta: [
      ["CLIENT", "Eva Eichinger"],
      ["SERVICE", "Web Design & Development"],
      ["LOCATION", "Vienna, Austria"],
      ["YEAR", "2026"],
    ],
    sections: [
      ["overview", "01", "Overview"],
      ["comparison", "02", "Before / After"],
      ["challenge", "03", "Challenge"],
      ["approach", "04", "Approach"],
      ["technology", "05", "Technology"],
      ["performance", "06", "Performance"],
      ["results", "07", "Results"],
      ["summary", "08", "Summary"],
    ],
    overview: {
      eyebrow: "PROJECT OVERVIEW",
      title:
        "An artist’s website should feel like an extension of the work itself.",
      introduction:
        "The objective was not simply to modernise an existing website. Eva Eichinger needed a new digital system that could present her work clearly while preserving its experimental and contemporary character.",
      description:
        "I redesigned the complete user experience, created a modular visual system and combined the editorial convenience of WordPress with the speed and creative flexibility of SvelteKit.",
      stats: [
        ["90+", "Performance"],
        ["100", "Accessibility"],
        ["100", "SEO"],
        ["< 1s", "Desktop loading experience"],
      ],
    },
    comparison: {
      eyebrow: "BEFORE / AFTER",
      title:
        "From a conventional portfolio to an immersive art platform.",
      instruction:
        "Move your cursor over either preview to play the website. On touch devices, tap a preview to start or pause it.",
      before: {
        label: "BEFORE",
        title: "Previous Website",
        action: "HOVER TO PLAY",
        points: [
          "Fragmented visual hierarchy",
          "Limited project exploration",
          "Conventional portfolio structure",
        ],
      },
      after: {
        label: "AFTER",
        title: "New Website",
        action: "HOVER TO PLAY",
        points: [
          "Editorial art direction",
          "Purpose-built project discovery",
          "Fast and responsive interactions",
        ],
      },
    },
    challenge: {
      eyebrow: "THE CHALLENGE",
      title:
        "A large body of visual work needed structure without losing the artist’s personality.",
      text:
        "The previous website performed its basic function, but lacked a strong visual hierarchy and made it difficult to move between paintings, exhibitions, performances and events. The new system also had to remain simple for the client to maintain.",
      points: [
        "Several different project and content types",
        "Large, high-resolution visual assets",
        "Independent content management for the client",
        "A distinctive design without a heavy page builder",
      ],
    },
    approach: {
      eyebrow: "DESIGN & DEVELOPMENT",
      title:
        "The system was designed around the art, not around a ready-made template.",
      cards: [
        {
          number: "01",
          title: "Clear information architecture",
          text:
            "Content was organised into understandable sections so visitors can discover and contextualise the work quickly.",
        },
        {
          number: "02",
          title: "Editorial design system",
          text:
            "Typography, spacing, colour and interactions were developed as a flexible system that supports the artwork.",
        },
        {
          number: "03",
          title: "Headless WordPress",
          text:
            "WordPress remains the familiar backend while SvelteKit provides complete control over presentation and performance.",
        },
        {
          number: "04",
          title: "Responsive interactions",
          text:
            "Every page, filter, gallery and navigation element was individually optimised for desktop, tablet and mobile.",
        },
      ],
    },
    technology: {
      eyebrow: "TECHNOLOGY STACK",
      title:
        "Modern technology with a simple editorial experience.",
      items: [
        {
          number: "01",
          name: "SvelteKit",
          role: "Frontend Framework",
          image: null,
          description:
            "The public-facing website was developed with SvelteKit to create a fast, responsive and interaction-rich frontend.",
          points: [
            "Statically generated pages",
            "Responsive components",
            "Smooth transitions",
            "Minimal client-side JavaScript",
          ],
        },
        {
          number: "02",
          name: "WordPress",
          role: "Headless Content Management",
          image: evaProjectMedia.wordpress,
          description:
            "WordPress remains the familiar editorial backend, allowing the client to manage paintings, exhibitions, performances and events independently.",
          points: [
            "Custom content types",
            "Simple editorial workflow",
            "Structured project information",
            "Independent content management",
          ],
        },
        {
          number: "03",
          name: "Vercel",
          role: "Deployment & Delivery",
          image: evaProjectMedia.vercel,
          description:
            "The SvelteKit frontend is deployed through Vercel, providing automatic deployments and fast global content delivery.",
          points: [
            "Automatic deployments",
            "Global content delivery",
            "Preview environments",
            "Reliable hosting",
          ],
        },
      ],
    },
    performance: {
      eyebrow: "PERFORMANCE",
      title:
        "A visual transformation supported by measurable improvements.",
      description:
        "The redesigned website was optimised for high-resolution visual content while remaining fast, accessible and search-engine friendly.",
      beforeLabel: "BEFORE",
      beforeTitle: "Previous Website",
      afterLabel: "AFTER",
      afterTitle: "New Website",
    },
    results: {
      eyebrow: "RESULTS",
      title:
        "A distinctive portfolio that remains simple for the client to manage.",
      items: [
        "Faster and clearer project discovery",
        "Stronger visual positioning for the artist",
        "Flexible content management through WordPress",
        "Optimised presentation across every screen size",
        "A stronger technical foundation for SEO and future content",
      ],
    },
    summary: {
      eyebrow: "SUMMARY",
      title:
        "The result combines individual design with a reliable technical foundation.",
      text:
        "The new Eva Eichinger website is not a conventional portfolio template. It was developed as an individual digital system that brings art, content and navigation together in a clear, fast and expressive experience.",
    },
    cta: {
      eyebrow: "YOUR PROJECT COULD BE NEXT",
      title:
        "Need a website that shows the true value of your work?",
      description:
        "I design and develop distinctive, fast and easy-to-manage websites for businesses, organisations and creative professionals.",
      button: "START A PROJECT",
      href: "/en-2/#contact",
    },
  },
};
