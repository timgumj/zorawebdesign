export const CONFIGURATOR_TOTAL_QUESTION_STEPS = 6;
export const CONFIGURATOR_TOTAL_SCREENS = 7;

/*
 * Website type IDs are intentionally kept stable because the pages,
 * features and report data files use these IDs for recommendations.
 */
const WEBSITE_TYPE_GOAL_IDS = {
  business: [
    "generate-enquiries",
    "present-services",
    "build-trust",
    "improve-visibility",
    "showcase-work",
    "recruitment",
    "book-appointments",
    "automate-processes",
    "basic-seo",
    "advanced-seo",
  ],

  artist: [
    "showcase-work",
    "build-reputation",
    "sell-products",
    "promote-events",
    "collect-subscribers",
    "improve-visibility",
    "generate-enquiries",
    "basic-seo",
  ],

  "online-shop": [
    "sell-products",
    "increase-sales",
    "build-trust",
    "improve-visibility",
    "automate-processes",
    "customer-support",
    "collect-subscribers",
    "advanced-seo",
  ],

  restaurant: [
    "show-menu",
    "accept-reservations",
    "online-ordering",
    "show-location",
    "build-trust",
    "improve-visibility",
    "promote-events",
    "basic-seo",
  ],

  medical: [
    "present-services",
    "book-appointments",
    "build-trust",
    "share-information",
    "show-location",
    "improve-visibility",
    "generate-enquiries",
    "basic-seo",
  ],

  "law-firm": [
    "present-practice-areas",
    "request-consultation",
    "build-trust",
    "share-information",
    "improve-visibility",
    "generate-enquiries",
    "build-reputation",
    "basic-seo",
  ],

  ngo: [
    "explain-mission",
    "build-community",
    "collect-donations",
    "promote-events",
    "share-updates",
    "recruit-members",
    "collect-subscribers",
    "build-trust",
    "improve-visibility",
    "basic-seo",
  ],

  education: [
    "present-courses",
    "collect-registrations",
    "sell-courses",
    "share-information",
    "build-trust",
    "improve-visibility",
    "collect-subscribers",
    "basic-seo",
  ],

  event: [
    "promote-events",
    "sell-tickets",
    "share-programme",
    "collect-registrations",
    "build-reputation",
    "collect-subscribers",
    "improve-visibility",
    "basic-seo",
  ],

  "web-app": [
    "provide-online-service",
    "manage-users",
    "collect-data",
    "sell-subscriptions",
    "automate-processes",
    "improve-existing-system",
    "build-trust",
    "customer-support",
  ],
};

const WEBSITE_TYPE_RECOMMENDED_GOAL_IDS = {
  business: ["generate-enquiries", "present-services", "build-trust"],
  artist: ["showcase-work", "build-reputation", "generate-enquiries"],
  "online-shop": ["sell-products", "increase-sales", "build-trust"],
  restaurant: ["show-menu", "accept-reservations", "show-location"],
  medical: ["present-services", "book-appointments", "build-trust"],
  "law-firm": ["present-practice-areas", "request-consultation", "build-trust"],
  ngo: ["explain-mission", "build-community", "collect-donations"],
  education: ["present-courses", "collect-registrations", "build-trust"],
  event: ["promote-events", "share-programme", "collect-registrations"],
  "web-app": ["provide-online-service", "manage-users", "automate-processes"],
};

export const websiteConfiguratorContent = {
  de: {
    steps: {
      websiteType: {
        stepLabel: "Schritt 1 von 6",
        progressLabel: "Fortschritt Schritt 1",
        eyebrow: "Projektgrundlage",
        title: "Welche Art von Website benötigen Sie?",
        description:
          "Wählen Sie die Option, die Ihr Projekt am besten beschreibt. Sie können Ihre Auswahl später noch ändern.",

        primaryGroupLabel: "Website-Art",
        additionalGroupLabel: "",
        additionalOpenLabel: "",
        additionalCloseLabel: "",

        selectionLabel: "Ihre Auswahl",
        selectionEmpty: "Noch keine Website-Art ausgewählt",

        recommendationLabel: "Zora Empfehlung",
        recommendationText:
          "Wählen Sie die Kategorie nach der wichtigsten Aufgabe Ihrer Website. Details und Sonderfunktionen klären wir in den nächsten Schritten.",

        backButton: "Zurück",
        continueButton: "Weiter zu den Zielen",
        continueDisabledHint:
          "Wählen Sie zuerst eine Website-Art aus.",

        options: [
          {
            id: "business",
            label: "Unternehmenswebsite",
            shortLabel: "Unternehmen",
            description:
              "Für Unternehmen, Selbstständige und Dienstleister, die Leistungen präsentieren und Anfragen gewinnen möchten.",
            primary: true,
          },
          {
            id: "artist",
            label: "Portfolio oder Kreativwebsite",
            shortLabel: "Portfolio",
            description:
              "Für Künstler, Fotografen, Designer und Kreative, die ihre Arbeiten professionell präsentieren möchten.",
            primary: true,
          },
          {
            id: "online-shop",
            label: "Onlineshop",
            shortLabel: "Onlineshop",
            description:
              "Für den Verkauf von Produkten, digitalen Inhalten oder buchbaren Leistungen.",
            primary: true,
          },
          {
            id: "restaurant",
            label: "Restaurant oder Gastronomie",
            shortLabel: "Gastronomie",
            description:
              "Für Restaurants, Cafés und Bars mit Speisekarte, Reservierungen oder Online-Bestellungen.",
            primary: true,
          },
          {
            id: "medical",
            label: "Praxis oder Therapie",
            shortLabel: "Praxis",
            description:
              "Für medizinische, therapeutische und beratende Praxen mit klaren Leistungen und Terminwegen.",
            primary: true,
          },
          {
            id: "law-firm",
            label: "Kanzlei oder Rechtsberatung",
            shortLabel: "Kanzlei",
            description:
              "Für Anwälte, Kanzleien und rechtliche Beratungsangebote mit klaren Fachgebieten.",
            primary: true,
          },
          {
            id: "ngo",
            label: "Verein oder Organisation",
            shortLabel: "Organisation",
            description:
              "Für Vereine, NGOs, Initiativen und gemeinnützige Projekte mit Mission, Community oder Spenden.",
            primary: true,
          },
          {
            id: "education",
            label: "Bildung oder Kurse",
            shortLabel: "Bildung",
            description:
              "Für Schulen, Akademien, Trainer, Workshops und digitale Lernangebote.",
            primary: true,
          },
          {
            id: "event",
            label: "Event oder Veranstaltung",
            shortLabel: "Event",
            description:
              "Für Konferenzen, Festivals und Veranstaltungen mit Programm, Tickets oder Anmeldung.",
            primary: true,
          },
          {
            id: "web-app",
            label: "Webanwendung oder Plattform",
            shortLabel: "Webanwendung",
            description:
              "Für Portale, Mitgliederbereiche, Online-Dienste und individuelle digitale Funktionen.",
            primary: true,
          },
        ],
      },

      goals: {
        stepLabel: "Schritt 2 von 6",
        progressLabel: "Fortschritt Schritt 2",
        eyebrow: "Ziele und Ausgangslage",
        title: "Was soll Ihre Website erreichen?",
        description:
          "Wählen Sie die wichtigsten Ziele. Mehrere Antworten sind möglich.",

        goalsGroupLabel: "Wichtigste Ziele",
        multipleChoiceLabel: "Mehrfachauswahl möglich",
        recommendedLabel: "Empfohlen",
        selectedGoalsLabel: "Ausgewählte Ziele",
        selectedGoalsEmpty: "Noch keine Ziele ausgewählt",

        statusTitle: "Wie ist der aktuelle Stand Ihres Projekts?",
        statusDescription:
          "Wählen Sie die Option, die Ihre Situation am besten beschreibt.",

        summaryLabel: "Projektübersicht",
        websiteTypeLabel: "Website-Art",
        projectStatusLabel: "Projektstatus",

        recommendationLabel: "Zora Empfehlung",
        recommendationText:
          "Konzentrieren Sie sich auf zwei oder drei Hauptziele. So bleibt die Website klar und führt Besucher gezielt zur nächsten Handlung.",

        backButton: "Zurück",
        continueButton: "Weiter zu den Inhalten",
        continueDisabledHint:
          "Wählen Sie mindestens ein Ziel und einen Projektstatus aus.",

        projectStatuses: [
          {
            id: "new-website",
            label: "Komplett neue Website",
            description:
              "Es gibt noch keine Website oder das Projekt beginnt vollständig neu.",
          },
          {
            id: "redesign",
            label: "Redesign einer bestehenden Website",
            description:
              "Die aktuelle Website soll gestalterisch, strukturell und technisch erneuert werden.",
          },
          {
            id: "extension",
            label: "Bestehende Website erweitern",
            description:
              "Die Website bleibt bestehen und benötigt neue Inhalte, Seiten oder Funktionen.",
          },
          {
            id: "not-sure",
            label: "Noch nicht sicher",
            description:
              "Sie möchten zuerst herausfinden, welche Lösung für Ihr Projekt sinnvoll ist.",
          },
        ],

        goals: [
          {
            id: "generate-enquiries",
            label: "Mehr Anfragen erhalten",
            description:
              "Besucher gezielt zu einer Kontaktaufnahme oder Angebotsanfrage führen.",
          },
          {
            id: "present-services",
            label: "Leistungen klar präsentieren",
            description:
              "Angebot, Arbeitsweise und Mehrwert verständlich erklären.",
          },
          {
            id: "build-trust",
            label: "Vertrauen aufbauen",
            description:
              "Kompetenz, Qualität und Glaubwürdigkeit sichtbar machen.",
          },
          {
            id: "improve-visibility",
            label: "Besser gefunden werden",
            description:
              "Die Sichtbarkeit in Suchmaschinen und lokalen Ergebnissen verbessern.",
          },
          {
            id: "showcase-work",
            label: "Arbeiten oder Projekte zeigen",
            description:
              "Referenzen, Fallstudien, Kunstwerke oder kreative Arbeiten präsentieren.",
          },
          {
            id: "build-reputation",
            label: "Profil und Bekanntheit stärken",
            description:
              "Eine klare Identität und professionelle öffentliche Präsenz aufbauen.",
          },
          {
            id: "recruitment",
            label: "Mitarbeiter gewinnen",
            description:
              "Offene Stellen und das Unternehmen als Arbeitgeber präsentieren.",
          },
          {
            id: "book-appointments",
            label: "Termine ermöglichen",
            description:
              "Besuchern eine einfache Online-Terminvereinbarung anbieten.",
          },
          {
            id: "sell-products",
            label: "Produkte oder Leistungen verkaufen",
            description:
              "Produkte, digitale Inhalte oder buchbare Leistungen online anbieten.",
          },
          {
            id: "increase-sales",
            label: "Online-Verkäufe steigern",
            description:
              "Den Kaufprozess verbessern und mehr Besucher zu Kunden machen.",
          },
          {
            id: "automate-processes",
            label: "Abläufe automatisieren",
            description:
              "Manuelle Aufgaben durch Formulare, Buchungen und Integrationen reduzieren.",
          },
          {
            id: "customer-support",
            label: "Kunden besser unterstützen",
            description:
              "Informationen, Antworten und Kontaktmöglichkeiten leichter zugänglich machen.",
          },
          {
            id: "explain-mission",
            label: "Mission und Wirkung erklären",
            description:
              "Ziele, Werte und gesellschaftliche Wirkung verständlich vermitteln.",
          },
          {
            id: "build-community",
            label: "Eine Community aufbauen",
            description:
              "Menschen verbinden und langfristige Beteiligung fördern.",
          },
          {
            id: "collect-donations",
            label: "Spenden sammeln",
            description:
              "Unterstützern einen klaren und sicheren Spendenprozess anbieten.",
          },
          {
            id: "promote-events",
            label: "Veranstaltungen bewerben",
            description:
              "Events, Termine und Programme sichtbar und aktuell präsentieren.",
          },
          {
            id: "share-updates",
            label: "Neuigkeiten veröffentlichen",
            description:
              "Aktuelle Meldungen, Beiträge oder Entwicklungen regelmäßig teilen.",
          },
          {
            id: "recruit-members",
            label: "Mitglieder oder Unterstützer gewinnen",
            description:
              "Interessierte zu einer Mitgliedschaft oder aktiven Beteiligung führen.",
          },
          {
            id: "collect-subscribers",
            label: "Newsletter-Abonnenten gewinnen",
            description:
              "Eine Leserschaft aufbauen und Interessenten langfristig erreichen.",
          },
          {
            id: "show-menu",
            label: "Speisekarte oder Angebot zeigen",
            description:
              "Speisen, Getränke, Preise und Angebote übersichtlich präsentieren.",
          },
          {
            id: "accept-reservations",
            label: "Reservierungen ermöglichen",
            description:
              "Gästen eine einfache Tischreservierung über die Website anbieten.",
          },
          {
            id: "online-ordering",
            label: "Online-Bestellungen anbieten",
            description:
              "Abholung oder Lieferung direkt über die Website ermöglichen.",
          },
          {
            id: "show-location",
            label: "Standort und Öffnungszeiten zeigen",
            description:
              "Wichtige Besuchsinformationen schnell auffindbar machen.",
          },
          {
            id: "share-information",
            label: "Wichtige Informationen bereitstellen",
            description:
              "Besuchern verlässliche und gut strukturierte Informationen anbieten.",
          },
          {
            id: "present-practice-areas",
            label: "Rechtsgebiete klar präsentieren",
            description:
              "Leistungen und rechtliche Schwerpunkte verständlich strukturieren.",
          },
          {
            id: "request-consultation",
            label: "Erstgespräche anfragen lassen",
            description:
              "Interessenten gezielt zu einer Beratungsanfrage führen.",
          },
          {
            id: "present-courses",
            label: "Kurse oder Programme präsentieren",
            description:
              "Lernangebote, Inhalte und Teilnahmebedingungen klar erklären.",
          },
          {
            id: "collect-registrations",
            label: "Anmeldungen sammeln",
            description:
              "Teilnehmer, Interessenten oder Bewerbungen online erfassen.",
          },
          {
            id: "sell-courses",
            label: "Kurse online verkaufen",
            description:
              "Bezahlte Kurse, Workshops oder digitale Lerninhalte anbieten.",
          },
          {
            id: "sell-tickets",
            label: "Tickets verkaufen",
            description:
              "Eintrittskarten oder Teilnahmeplätze direkt online anbieten.",
          },
          {
            id: "share-programme",
            label: "Programm oder Zeitplan zeigen",
            description:
              "Programmpunkte, Zeiten und Beteiligte verständlich darstellen.",
          },
          {
            id: "provide-online-service",
            label: "Digitale Dienstleistung anbieten",
            description:
              "Eine zentrale Funktion oder Dienstleistung direkt im Browser bereitstellen.",
          },
          {
            id: "manage-users",
            label: "Benutzerkonten verwalten",
            description:
              "Registrierung, Anmeldung und unterschiedliche Benutzerrollen ermöglichen.",
          },
          {
            id: "collect-data",
            label: "Daten oder Eingaben erfassen",
            description:
              "Formulare, Anträge oder strukturierte Informationen sammeln.",
          },
          {
            id: "sell-subscriptions",
            label: "Abonnements anbieten",
            description:
              "Wiederkehrende digitale Leistungen oder Zugänge verkaufen.",
          },
          {
            id: "improve-existing-system",
            label: "Bestehendes System verbessern",
            description:
              "Eine vorhandene Plattform technisch oder funktional weiterentwickeln.",
          },
          {
            id: "basic-seo",
            label: "Basis-SEO einplanen",
            description:
              "Seitentitel, Inhalte, Metadaten und wichtige Onpage-Grundlagen optimieren.",
            seoLevel: "basic",
          },
          {
            id: "advanced-seo",
            label: "Erweitertes SEO einplanen",
            description:
              "Technisches SEO, strukturierte Daten und eine umfassendere Suchstrategie berücksichtigen.",
            seoLevel: "advanced",
            packageSignal: "advanced",
          },
        ],
      },
    },
  },

  en: {
    steps: {
      websiteType: {
        stepLabel: "Step 1 of 6",
        progressLabel: "Step 1 progress",
        eyebrow: "Project foundation",
        title: "What kind of website do you need?",
        description:
          "Choose the option that best describes your project. You can change it later.",

        primaryGroupLabel: "Website type",
        additionalGroupLabel: "",
        additionalOpenLabel: "",
        additionalCloseLabel: "",

        selectionLabel: "Your selection",
        selectionEmpty: "No website type selected yet",

        recommendationLabel: "Zora recommendation",
        recommendationText:
          "Choose the category based on the website's main purpose. We will clarify details and special functionality in the next steps.",

        backButton: "Back",
        continueButton: "Continue to goals",
        continueDisabledHint:
          "Select a website type before continuing.",

        options: [
          {
            id: "business",
            label: "Business website",
            shortLabel: "Business",
            description:
              "For companies, freelancers and service providers that want to present services and generate enquiries.",
            primary: true,
          },
          {
            id: "artist",
            label: "Portfolio or creative website",
            shortLabel: "Portfolio",
            description:
              "For artists, photographers, designers and creatives who want to present their work professionally.",
            primary: true,
          },
          {
            id: "online-shop",
            label: "Online shop",
            shortLabel: "Online shop",
            description:
              "For selling products, digital content or bookable services online.",
            primary: true,
          },
          {
            id: "restaurant",
            label: "Restaurant or hospitality",
            shortLabel: "Restaurant",
            description:
              "For restaurants, cafés and bars with menus, reservations or online ordering.",
            primary: true,
          },
          {
            id: "medical",
            label: "Medical or therapy practice",
            shortLabel: "Practice",
            description:
              "For medical, therapeutic and advisory practices with clear services and appointment paths.",
            primary: true,
          },
          {
            id: "law-firm",
            label: "Law firm or legal practice",
            shortLabel: "Law firm",
            description:
              "For lawyers, law firms and legal advisory services with clearly presented practice areas.",
            primary: true,
          },
          {
            id: "ngo",
            label: "NGO or organisation",
            shortLabel: "Organisation",
            description:
              "For associations, charities, initiatives and nonprofits with a mission, community or donations.",
            primary: true,
          },
          {
            id: "education",
            label: "Education or courses",
            shortLabel: "Education",
            description:
              "For schools, academies, trainers, workshops and digital learning offers.",
            primary: true,
          },
          {
            id: "event",
            label: "Event or conference",
            shortLabel: "Event",
            description:
              "For conferences, festivals and events with programmes, tickets or registrations.",
            primary: true,
          },
          {
            id: "web-app",
            label: "Web application or platform",
            shortLabel: "Web app",
            description:
              "For portals, member areas, online services and custom digital functionality.",
            primary: true,
          },
        ],
      },

      goals: {
        stepLabel: "Step 2 of 6",
        progressLabel: "Step 2 progress",
        eyebrow: "Goals and starting point",
        title: "What should your website achieve?",
        description:
          "Choose the most important goals. You can select more than one.",

        goalsGroupLabel: "Main goals",
        multipleChoiceLabel: "Multiple selections allowed",
        recommendedLabel: "Recommended",
        selectedGoalsLabel: "Selected goals",
        selectedGoalsEmpty: "No goals selected yet",

        statusTitle: "What is the current status of your project?",
        statusDescription:
          "Choose the option that best describes your situation.",

        summaryLabel: "Project overview",
        websiteTypeLabel: "Website type",
        projectStatusLabel: "Project status",

        recommendationLabel: "Zora recommendation",
        recommendationText:
          "Focus on two or three primary goals. This keeps the website clear and guides visitors towards the right next action.",

        backButton: "Back",
        continueButton: "Continue to content",
        continueDisabledHint:
          "Select at least one goal and one project status.",

        projectStatuses: [
          {
            id: "new-website",
            label: "Completely new website",
            description:
              "There is no current website, or the project is starting from the beginning.",
          },
          {
            id: "redesign",
            label: "Redesign an existing website",
            description:
              "The current website needs a new design, structure and technical rebuild.",
          },
          {
            id: "extension",
            label: "Extend an existing website",
            description:
              "The website remains in place and needs new content, pages or functionality.",
          },
          {
            id: "not-sure",
            label: "Not sure yet",
            description:
              "You first want to understand which solution would be most suitable.",
          },
        ],

        goals: [
          {
            id: "generate-enquiries",
            label: "Generate more enquiries",
            description:
              "Guide visitors towards making contact or requesting a quote.",
          },
          {
            id: "present-services",
            label: "Present services clearly",
            description:
              "Explain the offer, working process and value clearly.",
          },
          {
            id: "build-trust",
            label: "Build trust",
            description:
              "Make expertise, quality and credibility visible.",
          },
          {
            id: "improve-visibility",
            label: "Improve online visibility",
            description:
              "Become easier to find in search engines and local results.",
          },
          {
            id: "showcase-work",
            label: "Showcase work or projects",
            description:
              "Present references, case studies, artworks or creative work.",
          },
          {
            id: "build-reputation",
            label: "Strengthen reputation and profile",
            description:
              "Build a clear identity and professional public presence.",
          },
          {
            id: "recruitment",
            label: "Attract employees",
            description:
              "Present open roles and the organisation as an employer.",
          },
          {
            id: "book-appointments",
            label: "Enable appointment booking",
            description:
              "Allow visitors to arrange appointments online.",
          },
          {
            id: "sell-products",
            label: "Sell products or services",
            description:
              "Offer products, digital content or bookable services online.",
          },
          {
            id: "increase-sales",
            label: "Increase online sales",
            description:
              "Improve the buying journey and convert more visitors into customers.",
          },
          {
            id: "automate-processes",
            label: "Automate processes",
            description:
              "Reduce manual work through forms, bookings and integrations.",
          },
          {
            id: "customer-support",
            label: "Improve customer support",
            description:
              "Make information, answers and contact options easier to access.",
          },
          {
            id: "explain-mission",
            label: "Explain the mission and impact",
            description:
              "Communicate the organisation's purpose, values and impact clearly.",
          },
          {
            id: "build-community",
            label: "Build a community",
            description:
              "Connect people and encourage long-term participation.",
          },
          {
            id: "collect-donations",
            label: "Collect donations",
            description:
              "Provide supporters with a clear and secure donation process.",
          },
          {
            id: "promote-events",
            label: "Promote events",
            description:
              "Present events, dates and programmes clearly and keep them current.",
          },
          {
            id: "share-updates",
            label: "Publish news and updates",
            description:
              "Regularly share announcements, articles or project developments.",
          },
          {
            id: "recruit-members",
            label: "Attract members or supporters",
            description:
              "Guide interested people towards membership or participation.",
          },
          {
            id: "collect-subscribers",
            label: "Grow a newsletter audience",
            description:
              "Build a readership and stay connected with interested visitors.",
          },
          {
            id: "show-menu",
            label: "Show the menu or offer",
            description:
              "Present food, drinks, prices and available offers clearly.",
          },
          {
            id: "accept-reservations",
            label: "Accept reservations",
            description:
              "Allow guests to reserve a table through the website.",
          },
          {
            id: "online-ordering",
            label: "Offer online ordering",
            description:
              "Enable collection or delivery orders through the website.",
          },
          {
            id: "show-location",
            label: "Show location and opening hours",
            description:
              "Make important visitor information easy to find.",
          },
          {
            id: "share-information",
            label: "Provide important information",
            description:
              "Offer visitors reliable and clearly structured information.",
          },
          {
            id: "present-practice-areas",
            label: "Present practice areas clearly",
            description:
              "Structure legal services and areas of expertise clearly.",
          },
          {
            id: "request-consultation",
            label: "Generate consultation requests",
            description:
              "Guide prospective clients towards requesting an initial consultation.",
          },
          {
            id: "present-courses",
            label: "Present courses or programmes",
            description:
              "Explain learning offers, content and participation requirements.",
          },
          {
            id: "collect-registrations",
            label: "Collect registrations",
            description:
              "Capture participants, applicants or interested people online.",
          },
          {
            id: "sell-courses",
            label: "Sell courses online",
            description:
              "Offer paid courses, workshops or digital learning content.",
          },
          {
            id: "sell-tickets",
            label: "Sell tickets",
            description:
              "Offer tickets or participation places directly online.",
          },
          {
            id: "share-programme",
            label: "Show a programme or schedule",
            description:
              "Present sessions, times and participants clearly.",
          },
          {
            id: "provide-online-service",
            label: "Provide a digital service",
            description:
              "Deliver a central service or function directly in the browser.",
          },
          {
            id: "manage-users",
            label: "Manage user accounts",
            description:
              "Provide registration, login and different user roles.",
          },
          {
            id: "collect-data",
            label: "Collect data or submissions",
            description:
              "Capture forms, applications or structured information.",
          },
          {
            id: "sell-subscriptions",
            label: "Offer subscriptions",
            description:
              "Sell recurring digital services or access.",
          },
          {
            id: "improve-existing-system",
            label: "Improve an existing system",
            description:
              "Develop an existing platform technically or functionally.",
          },
          {
            id: "basic-seo",
            label: "Include essential SEO",
            description:
              "Optimise page titles, content, metadata and essential on-page foundations.",
            seoLevel: "basic",
          },
          {
            id: "advanced-seo",
            label: "Include advanced SEO",
            description:
              "Plan technical SEO, structured data and a broader search strategy.",
            seoLevel: "advanced",
            packageSignal: "advanced",
          },
        ],
      },
    },
  },
};

export function getConfiguratorContent(language = "de") {
  return (
    websiteConfiguratorContent[language] ??
    websiteConfiguratorContent.de
  );
}

export function getWebsiteTypeOptions(language = "de") {
  return getConfiguratorContent(language).steps.websiteType.options;
}

export function getWebsiteTypeById(id, language = "de") {
  if (!id) return null;

  return (
    getWebsiteTypeOptions(language).find(
      (option) => option.id === id,
    ) ?? null
  );
}

export function getGoalOptions(language = "de") {
  return getConfiguratorContent(language).steps.goals.goals;
}

export function getGoalById(id, language = "de") {
  if (!id) return null;

  return (
    getGoalOptions(language).find(
      (goal) => goal.id === id,
    ) ?? null
  );
}

export function getRelevantGoals(
  websiteTypeId,
  language = "de",
) {
  const allGoals = getGoalOptions(language);

  const relevantGoalIds =
    WEBSITE_TYPE_GOAL_IDS[websiteTypeId] ??
    WEBSITE_TYPE_GOAL_IDS.business;

  return relevantGoalIds
    .map((goalId) =>
      allGoals.find((goal) => goal.id === goalId),
    )
    .filter(Boolean);
}

export function getRecommendedGoalIds(websiteTypeId) {
  return (
    WEBSITE_TYPE_RECOMMENDED_GOAL_IDS[websiteTypeId] ??
    WEBSITE_TYPE_RECOMMENDED_GOAL_IDS.business
  );
}

export function getProjectStatusById(
  id,
  language = "de",
) {
  if (!id) return null;

  return (
    getConfiguratorContent(
      language,
    ).steps.goals.projectStatuses.find(
      (status) => status.id === id,
    ) ?? null
  );
}