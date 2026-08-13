export const STANDARD_INCLUDED_PAGE_IDS = [
  "404-page",
  "privacy-policy",
  "legal-notice",
  "cookie-settings",
  "confirmation-page",
];

export const WEBSITE_TYPE_RECOMMENDED_PAGE_IDS = {
  business: [
    "home",
    "about",
    "services-overview",
    "contact",
  ],

    "law-firm": [
    "home",
    "about",
    "services-overview",
    "team",
    "contact",
  ],

  freelancer: [
    "home",
    "about",
    "services-overview",
    "portfolio",
    "contact",
  ],

  "online-shop": [
    "home",
    "shop",
    "product-categories",
    "product-detail",
    "cart",
    "checkout",
    "customer-account",
    "contact",
  ],

  ngo: [
    "home",
    "about",
    "projects",
    "news",
    "events",
    "contact",
    "donations",
  ],

  artist: [
    "home",
    "portfolio",
    "about",
    "projects",
    "events",
    "contact",
  ],

  restaurant: [
    "home",
    "about",
    "restaurant-menu",
    "reservations",
    "gallery",
    "contact",
  ],

  event: [
    "home",
    "about",
    "events",
    "event-detail",
    "programme",
    "registration",
    "contact",
  ],

  medical: [
    "home",
    "about",
    "services-overview",
    "team",
    "appointment-booking",
    "contact",
  ],

  hotel: [
    "home",
    "about",
    "rooms",
    "booking",
    "gallery",
    "locations",
    "contact",
  ],

  wellness: [
    "home",
    "about",
    "services-overview",
    "courses",
    "appointment-booking",
    "team",
    "contact",
  ],

  "real-estate": [
    "home",
    "about",
    "property-listings",
    "property-detail",
    "services-overview",
    "contact",
  ],

  education: [
    "home",
    "about",
    "courses",
    "course-detail",
    "registration",
    "contact",
  ],

  membership: [
    "home",
    "about",
    "membership",
    "registration",
    "login",
    "members-area",
    "user-dashboard",
    "contact",
  ],

  blog: [
    "home",
    "about",
    "blog",
    "article-detail",
    "newsletter-archive",
    "contact",
  ],

  "web-app": [
    "home",
    "about",
    "registration",
    "login",
    "user-dashboard",
    "contact",
  ],

  other: [
    "home",
    "about",
    "contact",
  ],
};

export const pagesContent = {
  de: {
    stepLabel: "Schritt 4 von 6",
    progressLabel: "Fortschritt",
    eyebrow: "Seiten und Struktur",
    title: "Welche Seiten soll Ihre Website enthalten?",
    description:
      "Wir haben passende Seiten für Ihr Projekt vorausgewählt. Sie können Seiten entfernen oder weitere ergänzen.",

    includedTitle: "Automatisch enthalten",
    includedDescription:
      "Diese grundlegenden Seiten und technischen Bestandteile sind standardmäßig enthalten und müssen nicht ausgewählt werden.",

    recommendedTitle: "Für Ihr Projekt empfohlen",
    recommendedDescription:
      "Diese Seiten wurden anhand Ihrer gewählten Website-Art vorausgewählt.",

    commonTitle: "Häufig ergänzte Seiten",
    commonDescription:
      "Wählen Sie weitere Seiten, die für Ihr Projekt relevant sind.",

    morePagesOpen: "Weitere Seiten anzeigen",
    morePagesClose: "Weitere Seiten ausblenden",

    selectedLabel: "Ausgewählte Seiten",
    recommendedLabel: "Empfohlen",
    includedLabel: "Inklusive",

    volumeTitle: "Wie viele wiederkehrende Detailseiten benötigen Sie?",
    volumeDescription:
      "Damit sind beispielsweise einzelne Leistungen, Produkte, Immobilien, Kurse, Projekte oder Teamprofile gemeint.",

    customTitle: "Individuelle Seiten",
    customDescription:
      "Tragen Sie optional bis zu drei eigene Seitennamen ein.",
    customPlaceholder: "Zum Beispiel: Spenden, Presse, Förderprojekte",

    summaryLabel: "Seitenübersicht",
    websiteTypeLabel: "Website-Art",
    selectedPagesLabel: "Projektseiten",
    volumeLabel: "Detailseiten",
    customPagesLabel: "Eigene Seiten",
    noPages: "Noch keine Projektseiten ausgewählt",
    noCustomPages: "Keine eigenen Seiten eingetragen",

    recommendationLabel: "Zora Empfehlung",
    recommendationText:
      "Eine klare Seitenstruktur ist wichtiger als möglichst viele Seiten. Jede Seite sollte eine konkrete Aufgabe für Ihre Besucher erfüllen.",

    backButton: "Zurück",
    continueButton: "Weiter",
    continueDisabledHint:
      "Wählen Sie mindestens eine Projektseite und den ungefähren Umfang der Detailseiten.",

    standardIncludedPages: [
      {
        id: "404-page",
        label: "404-Fehlerseite",
        description:
          "Eine hilfreiche Seite für nicht mehr vorhandene oder falsch aufgerufene Links.",
      },
      {
        id: "privacy-policy",
        label: "Datenschutzerklärung",
        description:
          "Grundlegende Datenschutzseite für die Website.",
      },
      {
        id: "legal-notice",
        label: "Impressum",
        description:
          "Rechtliche Anbieterinformationen für die Website.",
      },
      {
        id: "cookie-settings",
        label: "Cookie-Einstellungen",
        description:
          "Möglichkeit zur Verwaltung von Einwilligungen und Cookie-Auswahl.",
      },
      {
        id: "confirmation-page",
        label: "Bestätigungsseite",
        description:
          "Rückmeldung nach Kontaktformularen, Anmeldungen oder anderen Eingaben.",
      },
    ],

    pageOptions: [
      {
        id: "home",
        label: "Startseite",
        description:
          "Die zentrale Einstiegsseite mit den wichtigsten Informationen und Handlungsaufforderungen.",
        category: "common",
      },
      {
        id: "about",
        label: "Über uns",
        description:
          "Geschichte, Werte, Arbeitsweise und Hintergrund des Unternehmens oder Projekts.",
        category: "common",
      },
      {
        id: "services-overview",
        label: "Leistungsübersicht",
        description:
          "Übersicht über angebotene Leistungen, Lösungen oder Schwerpunkte.",
        category: "common",
      },
      {
        id: "contact",
        label: "Kontakt",
        description:
          "Kontaktinformationen, Formular, Standort und weitere Kontaktmöglichkeiten.",
        category: "common",
      },
      {
        id: "team",
        label: "Team",
        description:
          "Vorstellung von Mitarbeitern, Verantwortlichen oder Vorstandsmitgliedern.",
        category: "common",
      },
      {
        id: "testimonials",
        label: "Kundenstimmen",
        description:
          "Bewertungen, Empfehlungen und Erfahrungen bisheriger Kunden.",
        category: "common",
      },
      {
        id: "faq",
        label: "Häufige Fragen",
        description:
          "Antworten auf wichtige Fragen zu Leistungen, Abläufen oder Angeboten.",
        category: "common",
      },
      {
        id: "portfolio",
        label: "Portfolio",
        description:
          "Präsentation ausgewählter Arbeiten, Referenzen oder kreativer Projekte.",
        category: "common",
      },
      {
        id: "projects",
        label: "Projekte",
        description:
          "Übersicht über abgeschlossene, laufende oder geplante Projekte.",
        category: "common",
      },
      {
        id: "blog",
        label: "Blog",
        description:
          "Bereich für regelmäßig veröffentlichte Beiträge und Fachinhalte.",
        category: "common",
      },
      {
        id: "news",
        label: "Neuigkeiten",
        description:
          "Aktuelle Meldungen, Ankündigungen und Entwicklungen.",
        category: "common",
      },
      {
        id: "events",
        label: "Veranstaltungen",
        description:
          "Übersicht über kommende und vergangene Veranstaltungen.",
        category: "common",
      },

      {
        id: "service-detail",
        label: "Einzelne Leistungsseiten",
        description:
          "Ausführliche Seiten für einzelne Leistungen oder Angebote.",
        category: "business",
      },
      {
        id: "case-studies",
        label: "Fallstudien",
        description:
          "Detaillierte Darstellung von Projekten, Ergebnissen und Vorgehensweisen.",
        category: "business",
      },
      {
        id: "process",
        label: "Ablauf oder Arbeitsweise",
        description:
          "Erklärung des Projektablaufs oder der Zusammenarbeit.",
        category: "business",
      },
      {
        id: "pricing",
        label: "Pakete oder Leistungsmodelle",
        description:
          "Darstellung verschiedener Angebots- oder Leistungsumfänge.",
        category: "business",
      },
      {
        id: "careers",
        label: "Karriere",
        description:
          "Informationen für Bewerber und potenzielle Mitarbeiter.",
        category: "business",
      },
      {
        id: "job-detail",
        label: "Stellenausschreibungen",
        description:
          "Einzelne Seiten für offene Positionen und Bewerbungsinformationen.",
        category: "business",
      },
      {
        id: "partners",
        label: "Partner",
        description:
          "Vorstellung von Kooperationspartnern und unterstützenden Organisationen.",
        category: "business",
      },
      {
        id: "sponsors",
        label: "Sponsoren",
        description:
          "Darstellung von Sponsoren, Förderern und Unterstützern.",
        category: "business",
      },

      {
        id: "article-detail",
        label: "Beitragsseiten",
        description:
          "Einzelansichten für Artikel, Meldungen oder redaktionelle Inhalte.",
        category: "content",
      },
      {
        id: "gallery",
        label: "Galerie",
        description:
          "Bild- oder Mediengalerie für Arbeiten, Räume oder Veranstaltungen.",
        category: "content",
      },
      {
        id: "downloads",
        label: "Downloads",
        description:
          "Bereitstellung von Broschüren, Formularen, PDFs oder Dokumenten.",
        category: "content",
      },
      {
        id: "resources",
        label: "Ressourcen",
        description:
          "Sammlung hilfreicher Inhalte, Materialien oder externer Verweise.",
        category: "content",
      },
      {
        id: "newsletter-archive",
        label: "Newsletter-Archiv",
        description:
          "Übersicht über bisherige Newsletter oder Mitteilungen.",
        category: "content",
      },
      {
        id: "press",
        label: "Presse und Medien",
        description:
          "Presseinformationen, Medienberichte, Downloads und Ansprechpartner.",
        category: "content",
      },
      {
        id: "search",
        label: "Website-Suche",
        description:
          "Eigene Suchseite für umfangreiche Inhalte.",
        category: "content",
      },

      {
        id: "event-detail",
        label: "Einzelne Veranstaltungsseiten",
        description:
          "Detaillierte Seiten für einzelne Events, Termine oder Programmpunkte.",
        category: "events",
      },
      {
        id: "programme",
        label: "Programm oder Zeitplan",
        description:
          "Darstellung von Abläufen, Zeiten, Sprechern oder Programmpunkten.",
        category: "events",
      },
      {
        id: "registration",
        label: "Anmeldung oder Registrierung",
        description:
          "Seite für Veranstaltungs-, Kurs- oder Benutzeranmeldungen.",
        category: "events",
      },
      {
        id: "donations",
        label: "Spenden",
        description:
          "Informationen und Möglichkeiten zur finanziellen Unterstützung.",
        category: "events",
      },
      {
        id: "membership",
        label: "Mitgliedschaft",
        description:
          "Informationen über Mitgliedschaften, Vorteile und Teilnahme.",
        category: "events",
      },

      {
        id: "shop",
        label: "Shop",
        description:
          "Übersicht über Produkte, Kategorien und Angebote.",
        category: "commerce",
      },
      {
        id: "product-categories",
        label: "Produktkategorien",
        description:
          "Strukturierte Übersichten für verschiedene Produktgruppen.",
        category: "commerce",
      },
      {
        id: "product-detail",
        label: "Produktseiten",
        description:
          "Einzelne Produktseiten mit Bildern, Varianten und Informationen.",
        category: "commerce",
      },
      {
        id: "cart",
        label: "Warenkorb",
        description:
          "Übersicht der ausgewählten Produkte vor dem Kauf.",
        category: "commerce",
      },
      {
        id: "checkout",
        label: "Kasse und Bezahlung",
        description:
          "Kaufabschluss mit Adresse, Versand und Zahlungsoptionen.",
        category: "commerce",
      },
      {
        id: "customer-account",
        label: "Kundenkonto",
        description:
          "Bereich für Bestellungen, Adressen und persönliche Kontodaten.",
        category: "commerce",
      },
      {
        id: "booking",
        label: "Buchung",
        description:
          "Online-Buchung von Unterkünften, Leistungen oder Zeiträumen.",
        category: "commerce",
      },
      {
        id: "appointment-booking",
        label: "Terminbuchung",
        description:
          "Online-Auswahl und Buchung verfügbarer Termine.",
        category: "commerce",
      },
      {
        id: "reservations",
        label: "Reservierungen",
        description:
          "Reservierung von Tischen, Plätzen oder anderen Angeboten.",
        category: "commerce",
      },
      {
        id: "restaurant-menu",
        label: "Speisekarte oder Angebot",
        description:
          "Darstellung von Speisen, Getränken, Preisen und besonderen Angeboten.",
        category: "commerce",
      },

      {
        id: "login",
        label: "Login",
        description:
          "Anmeldung für Kunden, Mitglieder oder registrierte Benutzer.",
        category: "accounts",
      },
      {
        id: "members-area",
        label: "Mitgliederbereich",
        description:
          "Geschützter Bereich für exklusive Inhalte und Informationen.",
        category: "accounts",
      },
      {
        id: "user-dashboard",
        label: "Benutzer-Dashboard",
        description:
          "Persönlicher Bereich mit Daten, Aktivitäten und Funktionen.",
        category: "accounts",
      },
      {
        id: "courses",
        label: "Kursübersicht",
        description:
          "Übersicht über Kurse, Workshops oder Bildungsangebote.",
        category: "accounts",
      },
      {
        id: "course-detail",
        label: "Einzelne Kursseiten",
        description:
          "Detaillierte Informationen zu einzelnen Kursen oder Programmen.",
        category: "accounts",
      },
      {
        id: "learning-area",
        label: "Lernbereich",
        description:
          "Geschützter Bereich für Lektionen, Materialien und Fortschritt.",
        category: "accounts",
      },

      {
        id: "rooms",
        label: "Zimmer oder Unterkünfte",
        description:
          "Darstellung einzelner Zimmer, Apartments oder Unterkunftstypen.",
        category: "industry",
      },
      {
        id: "property-listings",
        label: "Immobilienübersicht",
        description:
          "Filterbare Übersicht verfügbarer Immobilien oder Objekte.",
        category: "industry",
      },
      {
        id: "property-detail",
        label: "Immobiliendetailseiten",
        description:
          "Einzelne Objektseiten mit Bildern, Daten und Anfrageoption.",
        category: "industry",
      },
      {
        id: "locations",
        label: "Standorte",
        description:
          "Übersicht über Niederlassungen, Filialen oder Veranstaltungsorte.",
        category: "industry",
      },

      {
        id: "accessibility",
        label: "Barrierefreiheitserklärung",
        description:
          "Informationen zur Zugänglichkeit und Barrierefreiheit der Website.",
        category: "legal",
      },
      {
        id: "terms",
        label: "Allgemeine Geschäftsbedingungen",
        description:
          "Vertragliche Bedingungen für Leistungen, Buchungen oder Verkäufe.",
        category: "legal",
      },
      {
        id: "returns",
        label: "Widerruf und Rückgabe",
        description:
          "Informationen zu Widerruf, Stornierung oder Rücksendungen.",
        category: "legal",
      },

      {
        id: "custom-page",
        label: "Eigene Seite",
        description:
          "Eine besondere Seite, die nicht in der Liste enthalten ist.",
        category: "custom",
      },
    ],

    categoryLabels: {
      business: "Unternehmen und Vertrauen",
      content: "Inhalte und Marketing",
      events: "Veranstaltungen und Community",
      commerce: "Verkauf und Buchung",
      accounts: "Mitglieder und Benutzerkonten",
      industry: "Branchenspezifische Seiten",
      legal: "Weitere rechtliche Seiten",
      custom: "Individuelle Seiten",
    },

    volumeOptions: [
      {
        id: "none",
        label: "Keine",
        description:
          "Es werden keine wiederkehrenden Detailseiten benötigt.",
      },
      {
        id: "1-3",
        label: "1–3 Seiten",
        description:
          "Kleine Anzahl einzelner Leistungen, Projekte oder Angebote.",
      },
      {
        id: "4-7",
        label: "4–7 Seiten",
        description:
          "Mehrere Detailseiten mit ähnlicher Grundstruktur.",
      },
      {
        id: "8-15",
        label: "8–15 Seiten",
        description:
          "Größerer Inhaltsumfang mit vielen einzelnen Einträgen.",
      },
      {
        id: "more-15",
        label: "Mehr als 15",
        description:
          "Umfangreiche Website mit vielen Produkten, Projekten oder Inhalten.",
      },
      {
        id: "not-sure",
        label: "Noch nicht sicher",
        description:
          "Der genaue Umfang soll gemeinsam geplant werden.",
      },
    ],
  },

  en: {
    stepLabel: "Step 4 of 6",
    progressLabel: "Progress",
    eyebrow: "Pages and structure",
    title: "Which pages should your website include?",
    description:
      "We have preselected suitable pages for your project. You can remove them or add further pages.",

    includedTitle: "Included as standard",
    includedDescription:
      "These essential pages and technical foundations are included automatically and do not need to be selected.",

    recommendedTitle: "Recommended for your project",
    recommendedDescription:
      "These pages were preselected based on the website type you chose.",

    commonTitle: "Common additional pages",
    commonDescription:
      "Choose any further pages that are relevant to your project.",

    morePagesOpen: "Show more page options",
    morePagesClose: "Hide additional page options",

    selectedLabel: "Selected pages",
    recommendedLabel: "Recommended",
    includedLabel: "Included",

    volumeTitle: "How many repeating detail pages do you need?",
    volumeDescription:
      "Examples include individual services, products, properties, courses, projects or team profiles.",

    customTitle: "Custom pages",
    customDescription:
      "Optionally add up to three custom page names.",
    customPlaceholder: "For example: Donations, Press, Residency programme",

    summaryLabel: "Page overview",
    websiteTypeLabel: "Website type",
    selectedPagesLabel: "Project pages",
    volumeLabel: "Detail pages",
    customPagesLabel: "Custom pages",
    noPages: "No project pages selected yet",
    noCustomPages: "No custom pages added",

    recommendationLabel: "Zora recommendation",
    recommendationText:
      "A clear page structure is more important than having as many pages as possible. Every page should serve a specific visitor need.",

    backButton: "Back",
    continueButton: "Continue",
    continueDisabledHint:
      "Select at least one project page and the approximate number of detail pages.",

    standardIncludedPages: [
      {
        id: "404-page",
        label: "404 error page",
        description:
          "A helpful page for missing or incorrectly entered links.",
      },
      {
        id: "privacy-policy",
        label: "Privacy policy",
        description:
          "The essential privacy information for the website.",
      },
      {
        id: "legal-notice",
        label: "Legal notice",
        description:
          "Required provider and legal business information.",
      },
      {
        id: "cookie-settings",
        label: "Cookie settings",
        description:
          "A way for visitors to manage consent and cookie preferences.",
      },
      {
        id: "confirmation-page",
        label: "Confirmation page",
        description:
          "Feedback after forms, registrations or other submissions.",
      },
    ],

    pageOptions: [
      {
        id: "home",
        label: "Home",
        description:
          "The main entry page with key information and calls to action.",
        category: "common",
      },
      {
        id: "about",
        label: "About",
        description:
          "The story, values, approach and background of the organisation.",
        category: "common",
      },
      {
        id: "services-overview",
        label: "Services overview",
        description:
          "An overview of services, solutions or areas of expertise.",
        category: "common",
      },
      {
        id: "contact",
        label: "Contact",
        description:
          "Contact details, form, location and other ways to get in touch.",
        category: "common",
      },
      {
        id: "team",
        label: "Team",
        description:
          "Profiles of employees, leadership or board members.",
        category: "common",
      },
      {
        id: "testimonials",
        label: "Testimonials",
        description:
          "Reviews, recommendations and experiences from previous clients.",
        category: "common",
      },
      {
        id: "faq",
        label: "Frequently asked questions",
        description:
          "Answers to important questions about services and processes.",
        category: "common",
      },
      {
        id: "portfolio",
        label: "Portfolio",
        description:
          "A presentation of selected work, references or creative projects.",
        category: "common",
      },
      {
        id: "projects",
        label: "Projects",
        description:
          "An overview of completed, current or planned projects.",
        category: "common",
      },
      {
        id: "blog",
        label: "Blog",
        description:
          "A section for regularly published articles and expertise.",
        category: "common",
      },
      {
        id: "news",
        label: "News",
        description:
          "Current announcements, updates and developments.",
        category: "common",
      },
      {
        id: "events",
        label: "Events",
        description:
          "An overview of upcoming and past events.",
        category: "common",
      },

      {
        id: "service-detail",
        label: "Individual service pages",
        description:
          "Detailed pages for individual services or offers.",
        category: "business",
      },
      {
        id: "case-studies",
        label: "Case studies",
        description:
          "Detailed project examples, results and working methods.",
        category: "business",
      },
      {
        id: "process",
        label: "Process or approach",
        description:
          "An explanation of the project process or collaboration.",
        category: "business",
      },
      {
        id: "pricing",
        label: "Packages or service models",
        description:
          "A presentation of different service or project scopes.",
        category: "business",
      },
      {
        id: "careers",
        label: "Careers",
        description:
          "Information for applicants and potential employees.",
        category: "business",
      },
      {
        id: "job-detail",
        label: "Job listings",
        description:
          "Individual pages for open roles and application information.",
        category: "business",
      },
      {
        id: "partners",
        label: "Partners",
        description:
          "A presentation of cooperation partners and related organisations.",
        category: "business",
      },
      {
        id: "sponsors",
        label: "Sponsors",
        description:
          "A presentation of sponsors, funders and supporters.",
        category: "business",
      },

      {
        id: "article-detail",
        label: "Article pages",
        description:
          "Individual views for articles, news or editorial content.",
        category: "content",
      },
      {
        id: "gallery",
        label: "Gallery",
        description:
          "An image or media gallery for work, spaces or events.",
        category: "content",
      },
      {
        id: "downloads",
        label: "Downloads",
        description:
          "Brochures, forms, PDFs or other documents.",
        category: "content",
      },
      {
        id: "resources",
        label: "Resources",
        description:
          "A collection of useful content, materials or external links.",
        category: "content",
      },
      {
        id: "newsletter-archive",
        label: "Newsletter archive",
        description:
          "An overview of previous newsletters or updates.",
        category: "content",
      },
      {
        id: "press",
        label: "Press and media",
        description:
          "Press information, media coverage, downloads and contacts.",
        category: "content",
      },
      {
        id: "search",
        label: "Website search",
        description:
          "A dedicated search page for larger websites.",
        category: "content",
      },

      {
        id: "event-detail",
        label: "Individual event pages",
        description:
          "Detailed pages for specific events, dates or sessions.",
        category: "events",
      },
      {
        id: "programme",
        label: "Programme or schedule",
        description:
          "Sessions, times, speakers and programme information.",
        category: "events",
      },
      {
        id: "registration",
        label: "Registration",
        description:
          "Registration for events, courses or user accounts.",
        category: "events",
      },
      {
        id: "donations",
        label: "Donations",
        description:
          "Information and options for financial support.",
        category: "events",
      },
      {
        id: "membership",
        label: "Membership",
        description:
          "Information about membership, benefits and participation.",
        category: "events",
      },

      {
        id: "shop",
        label: "Shop",
        description:
          "An overview of products, categories and offers.",
        category: "commerce",
      },
      {
        id: "product-categories",
        label: "Product categories",
        description:
          "Structured overviews for different product groups.",
        category: "commerce",
      },
      {
        id: "product-detail",
        label: "Product pages",
        description:
          "Individual product pages with images, options and information.",
        category: "commerce",
      },
      {
        id: "cart",
        label: "Shopping cart",
        description:
          "An overview of selected products before purchase.",
        category: "commerce",
      },
      {
        id: "checkout",
        label: "Checkout and payment",
        description:
          "Purchase completion with address, delivery and payment.",
        category: "commerce",
      },
      {
        id: "customer-account",
        label: "Customer account",
        description:
          "Orders, addresses and personal account information.",
        category: "commerce",
      },
      {
        id: "booking",
        label: "Booking",
        description:
          "Online booking of accommodation, services or date ranges.",
        category: "commerce",
      },
      {
        id: "appointment-booking",
        label: "Appointment booking",
        description:
          "Online selection and booking of available appointments.",
        category: "commerce",
      },
      {
        id: "reservations",
        label: "Reservations",
        description:
          "Reservations for tables, seats or other offers.",
        category: "commerce",
      },
      {
        id: "restaurant-menu",
        label: "Menu or offer",
        description:
          "Food, drinks, prices and special offers.",
        category: "commerce",
      },

      {
        id: "login",
        label: "Login",
        description:
          "Access for clients, members or registered users.",
        category: "accounts",
      },
      {
        id: "members-area",
        label: "Members area",
        description:
          "A protected area for exclusive content and information.",
        category: "accounts",
      },
      {
        id: "user-dashboard",
        label: "User dashboard",
        description:
          "A personal area with data, activity and functions.",
        category: "accounts",
      },
      {
        id: "courses",
        label: "Course overview",
        description:
          "An overview of courses, workshops or learning programmes.",
        category: "accounts",
      },
      {
        id: "course-detail",
        label: "Individual course pages",
        description:
          "Detailed information about individual courses or programmes.",
        category: "accounts",
      },
      {
        id: "learning-area",
        label: "Learning area",
        description:
          "A protected area for lessons, materials and progress.",
        category: "accounts",
      },

      {
        id: "rooms",
        label: "Rooms or accommodation",
        description:
          "Individual rooms, apartments or accommodation types.",
        category: "industry",
      },
      {
        id: "property-listings",
        label: "Property listings",
        description:
          "A filterable overview of available properties.",
        category: "industry",
      },
      {
        id: "property-detail",
        label: "Property detail pages",
        description:
          "Individual property pages with images, information and enquiries.",
        category: "industry",
      },
      {
        id: "locations",
        label: "Locations",
        description:
          "An overview of branches, offices or venues.",
        category: "industry",
      },

      {
        id: "accessibility",
        label: "Accessibility statement",
        description:
          "Information about the website’s accessibility.",
        category: "legal",
      },
      {
        id: "terms",
        label: "Terms and conditions",
        description:
          "Contractual terms for services, bookings or purchases.",
        category: "legal",
      },
      {
        id: "returns",
        label: "Returns and cancellation",
        description:
          "Information about returns, withdrawal or cancellation.",
        category: "legal",
      },

      {
        id: "custom-page",
        label: "Custom page",
        description:
          "A special page that is not included in the available list.",
        category: "custom",
      },
    ],

    categoryLabels: {
      business: "Business and trust",
      content: "Content and marketing",
      events: "Events and community",
      commerce: "Sales and booking",
      accounts: "Membership and user accounts",
      industry: "Industry-specific pages",
      legal: "Additional legal pages",
      custom: "Custom pages",
    },

    volumeOptions: [
      {
        id: "none",
        label: "None",
        description:
          "No repeating detail pages are needed.",
      },
      {
        id: "1-3",
        label: "1–3 pages",
        description:
          "A small number of individual services, projects or offers.",
      },
      {
        id: "4-7",
        label: "4–7 pages",
        description:
          "Several detail pages with a similar base structure.",
      },
      {
        id: "8-15",
        label: "8–15 pages",
        description:
          "A larger content scope with many individual entries.",
      },
      {
        id: "more-15",
        label: "More than 15",
        description:
          "A substantial website with many products, projects or entries.",
      },
      {
        id: "not-sure",
        label: "Not sure yet",
        description:
          "The exact scope should be planned together.",
      },
    ],
  },
};

export function getPagesContent(language = "de") {
  return pagesContent[language] ?? pagesContent.de;
}

export function getPageOptionById(id, language = "de") {
  if (!id) return null;

  return (
    getPagesContent(language).pageOptions.find(
      (page) => page.id === id,
    ) ?? null
  );
}

export function getRecommendedPageIds(websiteTypeId) {
  return (
    WEBSITE_TYPE_RECOMMENDED_PAGE_IDS[websiteTypeId] ??
    WEBSITE_TYPE_RECOMMENDED_PAGE_IDS.other
  );
}

export function getRecommendedPages(
  websiteTypeId,
  language = "de",
) {
  const content = getPagesContent(language);
  const ids = getRecommendedPageIds(websiteTypeId);

  return ids
    .map((id) =>
      content.pageOptions.find((page) => page.id === id),
    )
    .filter(Boolean);
}