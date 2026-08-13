export const STANDARD_INCLUDED_FEATURE_IDS = [
  "responsive-design",
  "basic-seo",
  "performance-foundation",
  "security-foundation",
  "accessibility-foundation",
];

export const WEBSITE_TYPE_RECOMMENDED_FEATURE_IDS = {
  business: [
    "contact-form",
    "analytics",
    "map-location",
    "testimonials",
  ],

  other: [
  "contact-form",
  "analytics",
  "newsletter",
],

  freelancer: [
    "contact-form",
    "analytics",
    "portfolio-filter",
    "appointment-booking",
  ],

  "online-shop": [
    "online-payments",
    "product-management",
    "customer-account",
    "order-emails",
    "analytics",
  ],

  ngo: [
    "contact-form",
    "newsletter",
    "event-management",
    "donation-payment",
    "analytics",
  ],

  artist: [
    "gallery-lightbox",
    "portfolio-filter",
    "event-management",
    "contact-form",
  ],

  restaurant: [
    "reservation-system",
    "map-location",
    "menu-management",
    "contact-form",
  ],

  event: [
    "event-management",
    "registration-form",
    "ticketing",
    "newsletter",
  ],

  medical: [
    "appointment-booking",
    "contact-form",
    "map-location",
    "secure-forms",
  ],

  hotel: [
    "booking-system",
    "availability-calendar",
    "map-location",
    "gallery-lightbox",
  ],

  wellness: [
    "appointment-booking",
    "course-management",
    "newsletter",
    "online-payments",
  ],

  "real-estate": [
    "property-filter",
    "advanced-search",
    "contact-form",
    "map-location",
  ],

  education: [
    "course-management",
    "registration-form",
    "online-payments",
    "newsletter",
  ],

  membership: [
    "user-registration",
    "member-login",
    "protected-content",
    "subscription-payments",
  ],

  blog: [
    "content-management",
    "newsletter",
    "social-sharing",
    "advanced-search",
  ],

  "web-app": [
    "user-registration",
    "member-login",
    "user-dashboard",
    "custom-database",
  ],

  other: [
    "contact-form",
    "analytics",
    "newsletter",
  ],
};

export const featuresContent = {
  de: {
    stepLabel: "Schritt 5 von 6",
    progressLabel: "Fortschritt",
    eyebrow: "Funktionen und Integrationen",
    title: "Welche Funktionen benötigt Ihre Website?",
    description:
      "Wir haben passende Funktionen für Ihr Projekt vorausgewählt. Ergänzen Sie nur, was für Ihre Besucher oder internen Abläufe wirklich relevant ist.",

    includedTitle: "Technische Grundlagen inklusive",
    includedDescription:
      "Diese technischen Grundlagen gehören standardmäßig zu jedem Website-Projekt und müssen nicht zusätzlich ausgewählt werden.",

    recommendedTitle: "Für Ihr Projekt empfohlen",
    recommendedDescription:
      "Diese Funktionen passen zur gewählten Website-Art und sind bereits vorausgewählt.",

    commonTitle: "Häufig benötigte Funktionen",
    commonDescription:
      "Wählen Sie weitere Funktionen, die Ihr Projekt sinnvoll unterstützen.",

    moreOpen: "Weitere Funktionen anzeigen",
    moreClose: "Weitere Funktionen ausblenden",

    includedLabel: "Inklusive",
    recommendedLabel: "Empfohlen",

    languageTitle: "In wie vielen Sprachen soll die Website verfügbar sein?",
    languageDescription:
      "Mehrsprachigkeit beeinflusst die Inhaltsstruktur, Übersetzungen und technische Einrichtung.",

    customTitle: "Besondere Integration",
    customDescription:
      "Benötigen Sie eine Verbindung zu einer bestimmten Software oder Plattform?",
    customPlaceholder:
      "Zum Beispiel: HubSpot, Salesforce, Vereinssoftware oder internes System",
    optionalLabel: "Optional",

    summaryLabel: "Funktionsübersicht",
    websiteTypeLabel: "Website-Art",
    selectedFeaturesLabel: "Gewählte Funktionen",
    languagesLabel: "Sprachen",
    customIntegrationLabel: "Besondere Integration",

    noFeatures: "Noch keine zusätzlichen Funktionen ausgewählt",
    noLanguage: "Noch nicht ausgewählt",
    noCustomIntegration: "Keine besondere Integration angegeben",

    recommendationLabel: "Zora Empfehlung",
    recommendationText:
      "Jede zusätzliche Funktion sollte einen klaren Nutzen haben. Eine schlanke Website ist meist einfacher zu bedienen, schneller und langfristig leichter zu betreuen.",

    backButton: "Zurück",
    continueButton: "Weiter",
    continueDisabledHint:
      "Wählen Sie mindestens eine Funktion und die Anzahl der Website-Sprachen.",

    standardIncludedFeatures: [
      {
        id: "responsive-design",
        label: "Responsive Design",
        description:
          "Optimierte Darstellung auf Smartphone, Tablet und Desktop.",
      },
      {
        id: "basic-seo",
        label: "Grundlegende SEO-Einrichtung",
        description:
          "Seitentitel, Beschreibungen und eine suchmaschinenfreundliche Struktur.",
      },
      {
        id: "performance-foundation",
        label: "Performance-Grundlagen",
        description:
          "Optimierte Bilder, saubere Ladeprozesse und schnelle Seitendarstellung.",
      },
      {
        id: "security-foundation",
        label: "Sicherheitsgrundlagen",
        description:
          "Grundlegende technische Schutzmaßnahmen und sichere Konfiguration.",
      },
      {
        id: "accessibility-foundation",
        label: "Grundlagen der Barrierefreiheit",
        description:
          "Sinnvolle Struktur, Tastaturbedienung und zugängliche Bedienelemente.",
      },
    ],

    featureOptions: [
      {
        id: "contact-form",
        label: "Kontaktformular",
        description:
          "Strukturierte Anfragen direkt über die Website erhalten.",
        category: "common",
      },
      {
        id: "newsletter",
        label: "Newsletter-Anmeldung",
        description:
          "Interessenten für Newsletter und regelmäßige Informationen gewinnen.",
        category: "common",
      },
      {
        id: "analytics",
        label: "Website-Statistiken",
        description:
          "Besucherzahlen und wichtige Nutzungsmuster datenschutzfreundlich messen.",
        category: "common",
      },
      {
        id: "map-location",
        label: "Karte und Standort",
        description:
          "Standorte, Anfahrt oder mehrere Niederlassungen darstellen.",
        category: "common",
      },
      {
        id: "social-sharing",
        label: "Social-Media-Teilen",
        description:
          "Inhalte direkt auf relevanten sozialen Plattformen teilen.",
        category: "common",
      },
      {
        id: "testimonials",
        label: "Bewertungen und Kundenstimmen",
        description:
          "Bewertungen oder Empfehlungen strukturiert präsentieren.",
        category: "common",
      },
      {
        id: "content-management",
        label: "Einfache Inhaltsverwaltung",
        description:
          "Texte, Bilder, Beiträge und grundlegende Inhalte selbst aktualisieren.",
        category: "common",
      },
      {
        id: "advanced-search",
        label: "Erweiterte Suche",
        description:
          "Umfangreiche Inhalte über Suchbegriffe schnell auffindbar machen.",
        category: "common",
      },

      {
        id: "appointment-booking",
        label: "Online-Terminbuchung",
        description:
          "Verfügbare Termine anzeigen und direkt online buchbar machen.",
        category: "booking",
      },
      {
        id: "booking-system",
        label: "Buchungssystem",
        description:
          "Unterkünfte, Leistungen oder Zeiträume online buchen.",
        category: "booking",
      },
      {
        id: "reservation-system",
        label: "Reservierungssystem",
        description:
          "Tische, Plätze oder Angebote online reservieren.",
        category: "booking",
      },
      {
        id: "availability-calendar",
        label: "Verfügbarkeitskalender",
        description:
          "Freie und belegte Termine oder Zeiträume anzeigen.",
        category: "booking",
      },
      {
        id: "registration-form",
        label: "Anmeldeformular",
        description:
          "Anmeldungen für Veranstaltungen, Kurse oder Programme erfassen.",
        category: "booking",
      },
      {
        id: "event-management",
        label: "Veranstaltungsverwaltung",
        description:
          "Events, Termine, Orte und Programmpunkte verwalten.",
        category: "booking",
      },
      {
        id: "ticketing",
        label: "Ticketverkauf",
        description:
          "Tickets oder Teilnahmeplätze online anbieten und verwalten.",
        category: "booking",
      },

      {
        id: "online-payments",
        label: "Online-Zahlungen",
        description:
          "Zahlungen über Anbieter wie Stripe oder PayPal ermöglichen.",
        category: "commerce",
      },
      {
        id: "product-management",
        label: "Produktverwaltung",
        description:
          "Produkte, Preise, Varianten und Lagerbestände verwalten.",
        category: "commerce",
      },
      {
        id: "customer-account",
        label: "Kundenkonto",
        description:
          "Bestellungen, Adressen und persönliche Daten verwalten.",
        category: "commerce",
      },
      {
        id: "order-emails",
        label: "Automatische Bestell-E-Mails",
        description:
          "Bestätigungen und Statusmeldungen automatisch versenden.",
        category: "commerce",
      },
      {
        id: "subscription-payments",
        label: "Abonnements und wiederkehrende Zahlungen",
        description:
          "Mitgliedschaften oder wiederkehrende Leistungen abrechnen.",
        category: "commerce",
      },
      {
        id: "donation-payment",
        label: "Online-Spenden",
        description:
          "Einmalige oder wiederkehrende Spenden sicher ermöglichen.",
        category: "commerce",
      },
      {
        id: "discount-codes",
        label: "Gutscheine und Rabattcodes",
        description:
          "Rabatte, Aktionen oder Gutscheine verwalten.",
        category: "commerce",
      },

      {
        id: "user-registration",
        label: "Benutzerregistrierung",
        description:
          "Neue Nutzer oder Mitglieder können eigene Konten erstellen.",
        category: "accounts",
      },
      {
        id: "member-login",
        label: "Login-Bereich",
        description:
          "Geschützter Zugang für Kunden, Mitglieder oder Mitarbeiter.",
        category: "accounts",
      },
      {
        id: "protected-content",
        label: "Geschützte Inhalte",
        description:
          "Bestimmte Inhalte nur für angemeldete Benutzer anzeigen.",
        category: "accounts",
      },
      {
        id: "user-dashboard",
        label: "Benutzer-Dashboard",
        description:
          "Persönliche Daten, Inhalte oder Funktionen übersichtlich bereitstellen.",
        category: "accounts",
      },
      {
        id: "user-roles",
        label: "Unterschiedliche Benutzerrollen",
        description:
          "Verschiedene Zugriffsrechte für Administratoren, Mitglieder oder Kunden.",
        category: "accounts",
      },

      {
        id: "portfolio-filter",
        label: "Portfolio-Filter",
        description:
          "Projekte oder Arbeiten nach Kategorien filtern.",
        category: "content",
      },
      {
        id: "gallery-lightbox",
        label: "Bildergalerie mit Großansicht",
        description:
          "Bilder und Arbeiten in einer interaktiven Galerie betrachten.",
        category: "content",
      },
      {
        id: "course-management",
        label: "Kursverwaltung",
        description:
          "Kurse, Termine, Teilnehmer und Inhalte organisieren.",
        category: "content",
      },
      {
        id: "menu-management",
        label: "Speisekartenverwaltung",
        description:
          "Speisen, Getränke, Preise und Kategorien selbst pflegen.",
        category: "content",
      },
      {
        id: "property-filter",
        label: "Immobilienfilter",
        description:
          "Objekte nach Preis, Lage, Größe oder anderen Kriterien filtern.",
        category: "content",
      },
      {
        id: "document-library",
        label: "Dokumentenbibliothek",
        description:
          "PDFs, Formulare und andere Dateien strukturiert bereitstellen.",
        category: "content",
      },

      {
        id: "crm-integration",
        label: "CRM-Integration",
        description:
          "Anfragen oder Kontakte an ein Kundenverwaltungssystem übertragen.",
        category: "integrations",
      },
      {
        id: "email-marketing",
        label: "E-Mail-Marketing-Integration",
        description:
          "Verbindung mit Mailchimp, Brevo oder einem ähnlichen System.",
        category: "integrations",
      },
      {
        id: "calendar-integration",
        label: "Kalender-Integration",
        description:
          "Termine mit Google Calendar oder anderen Kalendern synchronisieren.",
        category: "integrations",
      },
      {
        id: "accounting-integration",
        label: "Buchhaltungs-Integration",
        description:
          "Bestellungen oder Rechnungsdaten an Buchhaltungssoftware übertragen.",
        category: "integrations",
      },
      {
        id: "external-api",
        label: "Externe API-Anbindung",
        description:
          "Daten mit einer externen Plattform oder Software austauschen.",
        category: "integrations",
      },
      {
        id: "automation",
        label: "Automatisierte Abläufe",
        description:
          "Wiederkehrende Aufgaben über Integrationen automatisch ausführen.",
        category: "integrations",
      },

      {
        id: "secure-forms",
        label: "Sensible oder geschützte Formulare",
        description:
          "Formulare für vertrauliche oder besonders schützenswerte Angaben.",
        category: "advanced",
      },
      {
        id: "custom-database",
        label: "Individuelle Datenbank",
        description:
          "Strukturierte Datensätze für besondere Inhalte oder Prozesse verwalten.",
        category: "advanced",
      },
      {
        id: "advanced-filtering",
        label: "Erweiterte Filterfunktionen",
        description:
          "Inhalte nach mehreren Eigenschaften oder Kriterien filtern.",
        category: "advanced",
      },
      {
        id: "interactive-calculator",
        label: "Rechner oder Konfigurator",
        description:
          "Interaktive Berechnungen, Empfehlungen oder Konfigurationen anbieten.",
        category: "advanced",
      },
      {
        id: "ai-function",
        label: "KI-gestützte Funktion",
        description:
          "Eine sinnvolle KI-Funktion in den Website-Prozess integrieren.",
        category: "advanced",
      },
      {
        id: "custom-feature",
        label: "Individuelle Funktion",
        description:
          "Eine besondere Funktion, die nicht in der Liste enthalten ist.",
        category: "advanced",
      },
    ],

    categoryLabels: {
      booking: "Buchung und Veranstaltungen",
      commerce: "Verkauf und Zahlungen",
      accounts: "Benutzer und Mitglieder",
      content: "Inhalte und Darstellung",
      integrations: "Externe Integrationen",
      advanced: "Erweiterte Funktionen",
    },

    languageOptions: [
      {
        id: "one-language",
        label: "Eine Sprache",
        description:
          "Die gesamte Website wird in einer Sprache bereitgestellt.",
      },
      {
        id: "two-languages",
        label: "Zwei Sprachen",
        description:
          "Die Website erhält zwei vollständig gepflegte Sprachversionen.",
      },
      {
        id: "three-languages",
        label: "Drei Sprachen",
        description:
          "Die Website wird in drei Sprachen strukturiert und gepflegt.",
      },
      {
        id: "more-languages",
        label: "Mehr als drei Sprachen",
        description:
          "Das Projekt benötigt eine umfangreiche mehrsprachige Struktur.",
      },
      {
        id: "not-sure",
        label: "Noch nicht sicher",
        description:
          "Die passende Sprachstruktur soll gemeinsam festgelegt werden.",
      },
    ],
  },

  en: {
    stepLabel: "Step 5 of 6",
    progressLabel: "Progress",
    eyebrow: "Features and integrations",
    title: "Which features does your website need?",
    description:
      "We have preselected suitable features for your project. Add only what genuinely supports your visitors or internal processes.",

    includedTitle: "Technical foundations included",
    includedDescription:
      "These technical foundations are included in every website project and do not need to be selected separately.",

    recommendedTitle: "Recommended for your project",
    recommendedDescription:
      "These features suit the selected website type and have been preselected.",

    commonTitle: "Common website features",
    commonDescription:
      "Choose any additional features that meaningfully support your project.",

    moreOpen: "Show more features",
    moreClose: "Hide additional features",

    includedLabel: "Included",
    recommendedLabel: "Recommended",

    languageTitle: "How many languages should the website support?",
    languageDescription:
      "Multilingual websites require additional content structure, translation and technical configuration.",

    customTitle: "Special integration",
    customDescription:
      "Do you need the website to connect with a particular platform or system?",
    customPlaceholder:
      "For example: HubSpot, Salesforce, membership software or an internal system",
    optionalLabel: "Optional",

    summaryLabel: "Feature overview",
    websiteTypeLabel: "Website type",
    selectedFeaturesLabel: "Selected features",
    languagesLabel: "Languages",
    customIntegrationLabel: "Special integration",

    noFeatures: "No additional features selected yet",
    noLanguage: "Not selected yet",
    noCustomIntegration: "No special integration provided",

    recommendationLabel: "Zora recommendation",
    recommendationText:
      "Every additional feature should serve a clear purpose. A focused website is usually easier to use, faster and simpler to maintain.",

    backButton: "Back",
    continueButton: "Continue",
    continueDisabledHint:
      "Select at least one feature and the number of website languages.",

    standardIncludedFeatures: [
      {
        id: "responsive-design",
        label: "Responsive design",
        description:
          "Optimised presentation on smartphones, tablets and desktop screens.",
      },
      {
        id: "basic-seo",
        label: "Basic SEO setup",
        description:
          "Page titles, descriptions and a search-friendly site structure.",
      },
      {
        id: "performance-foundation",
        label: "Performance foundations",
        description:
          "Optimised images, efficient loading and fast page presentation.",
      },
      {
        id: "security-foundation",
        label: "Security foundations",
        description:
          "Essential technical protection and secure configuration.",
      },
      {
        id: "accessibility-foundation",
        label: "Accessibility foundations",
        description:
          "Meaningful structure, keyboard access and accessible controls.",
      },
    ],

    featureOptions: [
      {
        id: "contact-form",
        label: "Contact form",
        description:
          "Receive structured enquiries directly through the website.",
        category: "common",
      },
      {
        id: "newsletter",
        label: "Newsletter signup",
        description:
          "Build an audience for newsletters and regular updates.",
        category: "common",
      },
      {
        id: "analytics",
        label: "Website analytics",
        description:
          "Measure visitor numbers and important usage patterns.",
        category: "common",
      },
      {
        id: "map-location",
        label: "Map and location",
        description:
          "Show directions, locations or multiple branches.",
        category: "common",
      },
      {
        id: "social-sharing",
        label: "Social sharing",
        description:
          "Allow visitors to share relevant content on social platforms.",
        category: "common",
      },
      {
        id: "testimonials",
        label: "Reviews and testimonials",
        description:
          "Present reviews and recommendations in a structured format.",
        category: "common",
      },
      {
        id: "content-management",
        label: "Simple content management",
        description:
          "Update text, images, articles and basic website content.",
        category: "common",
      },
      {
        id: "advanced-search",
        label: "Advanced search",
        description:
          "Make larger collections of content easier to search.",
        category: "common",
      },

      {
        id: "appointment-booking",
        label: "Online appointment booking",
        description:
          "Show available appointments and allow direct online booking.",
        category: "booking",
      },
      {
        id: "booking-system",
        label: "Booking system",
        description:
          "Book accommodation, services or date ranges online.",
        category: "booking",
      },
      {
        id: "reservation-system",
        label: "Reservation system",
        description:
          "Reserve tables, seats or other offers online.",
        category: "booking",
      },
      {
        id: "availability-calendar",
        label: "Availability calendar",
        description:
          "Display available and unavailable dates or time periods.",
        category: "booking",
      },
      {
        id: "registration-form",
        label: "Registration form",
        description:
          "Collect registrations for events, courses or programmes.",
        category: "booking",
      },
      {
        id: "event-management",
        label: "Event management",
        description:
          "Manage events, dates, locations and programme information.",
        category: "booking",
      },
      {
        id: "ticketing",
        label: "Ticket sales",
        description:
          "Sell and manage tickets or participation places online.",
        category: "booking",
      },

      {
        id: "online-payments",
        label: "Online payments",
        description:
          "Accept payments through providers such as Stripe or PayPal.",
        category: "commerce",
      },
      {
        id: "product-management",
        label: "Product management",
        description:
          "Manage products, prices, variations and inventory.",
        category: "commerce",
      },
      {
        id: "customer-account",
        label: "Customer account",
        description:
          "Manage orders, addresses and personal account details.",
        category: "commerce",
      },
      {
        id: "order-emails",
        label: "Automated order emails",
        description:
          "Automatically send confirmations and status updates.",
        category: "commerce",
      },
      {
        id: "subscription-payments",
        label: "Subscriptions and recurring payments",
        description:
          "Charge for memberships or recurring services.",
        category: "commerce",
      },
      {
        id: "donation-payment",
        label: "Online donations",
        description:
          "Accept secure one-time or recurring donations.",
        category: "commerce",
      },
      {
        id: "discount-codes",
        label: "Discount and voucher codes",
        description:
          "Manage promotions, discounts and vouchers.",
        category: "commerce",
      },

      {
        id: "user-registration",
        label: "User registration",
        description:
          "Allow users or members to create their own accounts.",
        category: "accounts",
      },
      {
        id: "member-login",
        label: "Login area",
        description:
          "Protected access for clients, members or employees.",
        category: "accounts",
      },
      {
        id: "protected-content",
        label: "Protected content",
        description:
          "Show selected content only to authenticated users.",
        category: "accounts",
      },
      {
        id: "user-dashboard",
        label: "User dashboard",
        description:
          "Provide personal data, content and functions in one area.",
        category: "accounts",
      },
      {
        id: "user-roles",
        label: "Different user roles",
        description:
          "Provide different permissions for administrators, members or customers.",
        category: "accounts",
      },

      {
        id: "portfolio-filter",
        label: "Portfolio filtering",
        description:
          "Filter work or projects by category.",
        category: "content",
      },
      {
        id: "gallery-lightbox",
        label: "Gallery with enlarged view",
        description:
          "View images and creative work in an interactive gallery.",
        category: "content",
      },
      {
        id: "course-management",
        label: "Course management",
        description:
          "Manage courses, dates, participants and learning content.",
        category: "content",
      },
      {
        id: "menu-management",
        label: "Menu management",
        description:
          "Manage food, drinks, prices and categories.",
        category: "content",
      },
      {
        id: "property-filter",
        label: "Property filtering",
        description:
          "Filter properties by price, location, size or other criteria.",
        category: "content",
      },
      {
        id: "document-library",
        label: "Document library",
        description:
          "Provide PDFs, forms and other files in a structured library.",
        category: "content",
      },

      {
        id: "crm-integration",
        label: "CRM integration",
        description:
          "Send enquiries and contacts to a customer management system.",
        category: "integrations",
      },
      {
        id: "email-marketing",
        label: "Email marketing integration",
        description:
          "Connect Mailchimp, Brevo or a similar marketing platform.",
        category: "integrations",
      },
      {
        id: "calendar-integration",
        label: "Calendar integration",
        description:
          "Synchronise appointments with Google Calendar or similar tools.",
        category: "integrations",
      },
      {
        id: "accounting-integration",
        label: "Accounting integration",
        description:
          "Send order or invoice data to accounting software.",
        category: "integrations",
      },
      {
        id: "external-api",
        label: "External API connection",
        description:
          "Exchange data with another platform or software system.",
        category: "integrations",
      },
      {
        id: "automation",
        label: "Automated workflows",
        description:
          "Automate recurring tasks through connected systems.",
        category: "integrations",
      },

      {
        id: "secure-forms",
        label: "Sensitive or protected forms",
        description:
          "Forms intended for confidential or sensitive information.",
        category: "advanced",
      },
      {
        id: "custom-database",
        label: "Custom database",
        description:
          "Manage structured records for specialised content or processes.",
        category: "advanced",
      },
      {
        id: "advanced-filtering",
        label: "Advanced filtering",
        description:
          "Filter content using multiple properties or criteria.",
        category: "advanced",
      },
      {
        id: "interactive-calculator",
        label: "Calculator or configurator",
        description:
          "Offer interactive calculations, recommendations or configurations.",
        category: "advanced",
      },
      {
        id: "ai-function",
        label: "AI-assisted feature",
        description:
          "Integrate an appropriate AI function into the website process.",
        category: "advanced",
      },
      {
        id: "custom-feature",
        label: "Custom feature",
        description:
          "A special function that is not included in the available list.",
        category: "advanced",
      },
    ],

    categoryLabels: {
      booking: "Booking and events",
      commerce: "Sales and payments",
      accounts: "Users and memberships",
      content: "Content and presentation",
      integrations: "External integrations",
      advanced: "Advanced features",
    },

    languageOptions: [
      {
        id: "one-language",
        label: "One language",
        description:
          "The entire website will be available in one language.",
      },
      {
        id: "two-languages",
        label: "Two languages",
        description:
          "The website will have two fully maintained language versions.",
      },
      {
        id: "three-languages",
        label: "Three languages",
        description:
          "The website will be structured and maintained in three languages.",
      },
      {
        id: "more-languages",
        label: "More than three languages",
        description:
          "The project needs an extensive multilingual structure.",
      },
      {
        id: "not-sure",
        label: "Not sure yet",
        description:
          "The most suitable language structure should be planned together.",
      },
    ],
  },
};

export function getFeaturesContent(language = "de") {
  return featuresContent[language] ?? featuresContent.de;
}

export function getFeatureOptionById(id, language = "de") {
  if (!id) return null;

  return (
    getFeaturesContent(language).featureOptions.find(
      (feature) => feature.id === id,
    ) ?? null
  );
}

export function getRecommendedFeatureIds(websiteTypeId) {
  return (
    WEBSITE_TYPE_RECOMMENDED_FEATURE_IDS[websiteTypeId] ??
    WEBSITE_TYPE_RECOMMENDED_FEATURE_IDS.other
  );
}