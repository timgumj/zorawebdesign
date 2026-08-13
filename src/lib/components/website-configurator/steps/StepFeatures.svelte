<script>
  import {
    getFeatureOptionById,
    getFeaturesContent,
    getRecommendedFeatureIds,
  } from "$lib/data/website-configurator/features-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    selectedFeatures = $bindable([]),
    websiteLanguages = $bindable(""),
    customIntegration = $bindable(""),
    onBack = () => {},
    onContinue = () => {},
  } = $props();

  let screen = $state(1);
  let selectedPurposeId = $state("");
  let selectedExtraIds = $state([]);

  const text = $derived(getFeaturesContent(language));

  const recommendedFeatureIds = $derived(
    getRecommendedFeatureIds(selectedWebsiteType),
  );

  const ui = $derived(
    language === "en"
      ? {
          stages: {
            purpose: "Purpose",
            essentials: "Essentials",
            extras: "Additional",
            languages: "Languages",
          },

          optional: "Optional",
          selected: "Selected",

          purposeTitle: "What is the main thing your website should do?",

          purposeText:
            "Choose the option that comes closest. You can add other functions afterwards.",

          detailTitle: "Which functions are essential for that?",

          detailText:
            "We have suggested a suitable starting point. Keep the functions you need and remove anything unnecessary.",

          extrasTitle: "Would anything else be useful?",

          extrasText:
            "This step is optional. Add only functions that clearly support the website.",

          languageTitle: "How many languages will your website have?",

          languageText:
            "Choose the approximate number for now. The exact languages can be confirmed later.",

          noExtras: "No additional functions",

          back: "Back",
          continue: "Continue",
          finish: "Continue to timeline",

          required: "Choose one option to continue.",

          detailRequired: "Select at least one essential function.",

          languageRequired: "Choose the number of website languages.",

          mainPurpose: "Main purpose",
        }
      : {
          stages: {
            purpose: "Zweck",
            essentials: "Grundlagen",
            extras: "Zusätzlich",
            languages: "Sprachen",
          },

          optional: "Optional",
          selected: "Ausgewählt",

          purposeTitle: "Was ist die wichtigste Aufgabe Ihrer Website?",

          purposeText:
            "Wählen Sie die Antwort, die am besten passt. Weitere Funktionen können Sie anschließend ergänzen.",

          detailTitle: "Welche Funktionen sind dafür wesentlich?",

          detailText:
            "Wir haben eine passende Grundlage vorgeschlagen. Behalten Sie, was Sie benötigen, und entfernen Sie Unnötiges.",

          extrasTitle: "Soll die Website noch etwas Zusätzliches können?",

          extrasText:
            "Dieser Schritt ist optional. Ergänzen Sie nur Funktionen, die für das Projekt wirklich sinnvoll sind.",

          languageTitle: "Wie viele Sprachen soll Ihre Website haben?",

          languageText:
            "Wählen Sie zunächst nur die ungefähre Anzahl. Die konkreten Sprachen können später festgelegt werden.",

          noExtras: "Keine zusätzlichen Funktionen",

          back: "Zurück",
          continue: "Weiter",
          finish: "Weiter zum Zeitplan",

          required: "Bitte wählen Sie eine Option.",

          detailRequired:
            "Bitte wählen Sie mindestens eine wesentliche Funktion.",

          languageRequired: "Bitte wählen Sie die Anzahl der Website-Sprachen.",

          mainPurpose: "Hauptfunktion",
        },
  );

  const purposes = $derived(
    language === "en"
      ? [
          {
            id: "enquiries",
            label: "Generate enquiries",
            description:
              "Help visitors contact you, request information or ask for an offer.",
            featureIds: ["contact-form", "testimonials", "map-location"],
          },
          {
            id: "commerce",
            label: "Sell products",
            description:
              "Present products and accept online payments through the website.",
            featureIds: [
              "product-management",
              "online-payments",
              "order-emails",
              "customer-account",
            ],
          },
          {
            id: "booking",
            label: "Accept bookings",
            description:
              "Let visitors reserve appointments, services or places online.",
            featureIds: [
              "appointment-booking",
              "availability-calendar",
              "reservation-system",
              "registration-form",
            ],
          },
          {
            id: "portfolio",
            label: "Showcase my work",
            description:
              "Present projects, images, services, case studies or references.",
            featureIds: [
              "portfolio-filter",
              "gallery-lightbox",
              "testimonials",
              "contact-form",
            ],
          },
          {
            id: "content",
            label: "Share information",
            description:
              "Publish articles, news, resources, documents or other useful content.",
            featureIds: [
              "content-management",
              "newsletter",
              "advanced-search",
              "document-library",
            ],
          },
          {
            id: "community",
            label: "Build a community",
            description: "Create member access, accounts or protected areas.",
            featureIds: [
              "user-registration",
              "member-login",
              "protected-content",
              "user-dashboard",
            ],
          },
          {
            id: "unsure",
            label: "I’m not sure yet",
            description:
              "We can recommend a suitable setup based on the rest of your project.",
            featureIds: [],
          },
        ]
      : [
          {
            id: "enquiries",
            label: "Anfragen erhalten",
            description:
              "Besucher sollen Kontakt aufnehmen, Informationen anfragen oder ein Angebot erhalten können.",
            featureIds: ["contact-form", "testimonials", "map-location"],
          },
          {
            id: "commerce",
            label: "Produkte verkaufen",
            description:
              "Produkte präsentieren und Zahlungen direkt über die Website ermöglichen.",
            featureIds: [
              "product-management",
              "online-payments",
              "order-emails",
              "customer-account",
            ],
          },
          {
            id: "booking",
            label: "Buchungen annehmen",
            description:
              "Termine, Leistungen oder Plätze direkt online reservieren lassen.",
            featureIds: [
              "appointment-booking",
              "availability-calendar",
              "reservation-system",
              "registration-form",
            ],
          },
          {
            id: "portfolio",
            label: "Arbeiten präsentieren",
            description:
              "Projekte, Bilder, Leistungen, Fallstudien oder Referenzen zeigen.",
            featureIds: [
              "portfolio-filter",
              "gallery-lightbox",
              "testimonials",
              "contact-form",
            ],
          },
          {
            id: "content",
            label: "Informationen teilen",
            description:
              "Artikel, Neuigkeiten, Ressourcen, Dokumente oder andere Inhalte veröffentlichen.",
            featureIds: [
              "content-management",
              "newsletter",
              "advanced-search",
              "document-library",
            ],
          },
          {
            id: "community",
            label: "Community aufbauen",
            description:
              "Mitgliederzugänge, Benutzerkonten oder geschützte Inhalte anbieten.",
            featureIds: [
              "user-registration",
              "member-login",
              "protected-content",
              "user-dashboard",
            ],
          },
          {
            id: "unsure",
            label: "Noch nicht sicher",
            description:
              "Wir können auf Basis des restlichen Projekts eine passende Lösung empfehlen.",
            featureIds: [],
          },
        ],
  );

  const extras = $derived(
    language === "en"
      ? [
          {
            id: "events",
            label: "Events",
            featureIds: ["event-management"],
          },
          {
            id: "newsletter",
            label: "Newsletter",
            featureIds: ["newsletter"],
          },
          {
            id: "members",
            label: "Members area",
            featureIds: ["member-login", "protected-content"],
          },
          {
            id: "payments",
            label: "Online payments",
            featureIds: ["online-payments"],
          },
          {
            id: "gallery",
            label: "Gallery or portfolio",
            featureIds: ["gallery-lightbox", "portfolio-filter"],
          },
          {
            id: "search",
            label: "Advanced search",
            featureIds: ["advanced-search"],
          },
        ]
      : [
          {
            id: "events",
            label: "Veranstaltungen",
            featureIds: ["event-management"],
          },
          {
            id: "newsletter",
            label: "Newsletter",
            featureIds: ["newsletter"],
          },
          {
            id: "members",
            label: "Mitgliederbereich",
            featureIds: ["member-login", "protected-content"],
          },
          {
            id: "payments",
            label: "Online-Zahlungen",
            featureIds: ["online-payments"],
          },
          {
            id: "gallery",
            label: "Galerie oder Portfolio",
            featureIds: ["gallery-lightbox", "portfolio-filter"],
          },
          {
            id: "search",
            label: "Erweiterte Suche",
            featureIds: ["advanced-search"],
          },
        ],
  );

  const selectedPurpose = $derived(
    purposes.find((item) => item.id === selectedPurposeId) ?? null,
  );

  const purposeFeatureIds = $derived.by(() => {
    if (!selectedPurpose) {
      return [];
    }

    if (selectedPurpose.id === "unsure") {
      return recommendedFeatureIds.length
        ? recommendedFeatureIds.slice(0, 4)
        : ["contact-form"];
    }

    return selectedPurpose.featureIds;
  });

  const purposeFeatures = $derived(
    purposeFeatureIds
      .map((id) => getFeatureOptionById(id, language))
      .filter(Boolean),
  );

  const canMoveForward = $derived(
    screen === 1
      ? Boolean(selectedPurposeId)
      : screen === 2
        ? purposeFeatureIds.some((id) => selectedFeatures.includes(id))
        : screen === 3
          ? true
          : Boolean(websiteLanguages),
  );

  function selectPurpose(option) {
    const managedIds = new Set([
      ...purposes.flatMap((item) => item.featureIds),
      ...extras.flatMap((item) => item.featureIds),
      ...recommendedFeatureIds,
    ]);

    selectedFeatures = selectedFeatures.filter((id) => !managedIds.has(id));

    selectedPurposeId = option.id;

    selectedExtraIds = [];

    const defaults =
      option.id === "unsure"
        ? recommendedFeatureIds.slice(0, 2)
        : option.featureIds.slice(0, 2);

    selectedFeatures = [...new Set([...selectedFeatures, ...defaults])];
  }

  function toggleFeature(featureId) {
    selectedFeatures = selectedFeatures.includes(featureId)
      ? selectedFeatures.filter((id) => id !== featureId)
      : [...selectedFeatures, featureId];
  }

  function toggleExtra(option) {
    const active = selectedExtraIds.includes(option.id);

    if (active) {
      selectedExtraIds = selectedExtraIds.filter((id) => id !== option.id);

      selectedFeatures = selectedFeatures.filter(
        (id) =>
          !option.featureIds.includes(id) || purposeFeatureIds.includes(id),
      );

      return;
    }

    selectedExtraIds = [...selectedExtraIds, option.id];

    selectedFeatures = [
      ...new Set([...selectedFeatures, ...option.featureIds]),
    ];
  }

  function clearExtras() {
    const extraFeatureIds = new Set(extras.flatMap((item) => item.featureIds));

    selectedExtraIds = [];

    selectedFeatures = selectedFeatures.filter(
      (id) => !extraFeatureIds.has(id) || purposeFeatureIds.includes(id),
    );
  }

  function goForward() {
    if (!canMoveForward) {
      return;
    }

    if (screen < 4) {
      screen += 1;
      return;
    }

    onContinue();
  }

  function goBack() {
    if (screen > 1) {
      screen -= 1;
      return;
    }

    onBack();
  }

  function handleKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    callback();
  }

  function getPurposeIcon(id) {
    const iconMap = {
      enquiries: "message",
      commerce: "shop",
      booking: "calendar",
      portfolio: "portfolio",
      content: "document",
      community: "community",
      unsure: "question",
    };

    return iconMap[id] ?? "document";
  }

  function getFeatureIcon(id) {
    const iconMap = {
      "contact-form": "message",
      newsletter: "mail",
      analytics: "analytics",
      "map-location": "location",
      "social-sharing": "share",
      testimonials: "reviews",
      "content-management": "document",
      "advanced-search": "search",

      "appointment-booking": "calendar",
      "booking-system": "calendar",
      "reservation-system": "calendar",
      "availability-calendar": "calendar",
      "registration-form": "registration",
      "event-management": "event",
      ticketing: "ticket",

      "online-payments": "payment",
      "product-management": "product",
      "customer-account": "account",
      "order-emails": "mail",
      "subscription-payments": "repeat-payment",
      "donation-payment": "donation",
      "discount-codes": "tag",

      "user-registration": "registration",
      "member-login": "login",
      "protected-content": "lock",
      "user-dashboard": "dashboard",
      "user-roles": "users",

      "portfolio-filter": "portfolio",
      "gallery-lightbox": "gallery",
      "course-management": "education",
      "menu-management": "menu",
      "property-filter": "filter",
      "document-library": "library",

      "crm-integration": "integration",
      "email-marketing": "mail",
      "calendar-integration": "calendar",
      "accounting-integration": "integration",
      "external-api": "api",
      automation: "automation",

      "secure-forms": "lock",
      "custom-database": "database",
      "advanced-filtering": "filter",
      "interactive-calculator": "calculator",
      "ai-function": "ai",
      "custom-feature": "custom",
    };

    return iconMap[id] ?? "custom";
  }

  function getExtraIcon(id) {
    const iconMap = {
      events: "event",
      newsletter: "mail",
      members: "users",
      payments: "payment",
      gallery: "gallery",
      search: "search",
    };

    return iconMap[id] ?? "custom";
  }
</script>

<div class="features-step">
  {#if screen === 1}
    <!-- =====================================================
         PURPOSE · 1 / 4
    ====================================================== -->

    <section class="question-panel" aria-labelledby="feature-purpose-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.purpose}
          · 1 / 4
        </span>

        <h1 id="feature-purpose-title">
          {ui.purposeTitle}
        </h1>

        <p>
          {ui.purposeText}
        </p>
      </header>

      <div class="purpose-grid" role="radiogroup" aria-label={ui.purposeTitle}>
        {#each purposes as option}
          {@const selected = selectedPurposeId === option.id}

          {@const iconType = getPurposeIcon(option.id)}

          <div
            class="selection-card purpose-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectPurpose(option)}
            onkeydown={(event) =>
              handleKeydown(event, () => selectPurpose(option))}
          >
            <div class="option-icon" aria-hidden="true">
              {#if iconType === "message"}
                <svg viewBox="0 0 48 48">
                  <path d="M7 8h34v25H20l-9 7v-7H7V8Z" />
                  <path d="M14 16h20M14 22h14" />
                </svg>
              {:else if iconType === "shop"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 18h26l-2 21H13l-2-21Z" />
                  <path d="M18 19v-4a6 6 0 0 1 12 0v4" />
                  <path d="M17 26h14" />
                </svg>
              {:else if iconType === "calendar"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="m15 29 5 5 12-12" />
                </svg>
              {:else if iconType === "portfolio"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 33 9-9 6 6 5-5 7 8" />
                </svg>
              {:else if iconType === "document"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h14M17 26h14M17 32h9" />
                </svg>
              {:else if iconType === "community"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="15" r="5" />
                  <circle cx="12" cy="21" r="4" />
                  <circle cx="36" cy="21" r="4" />
                  <path d="M15 39c0-7 3.5-11 9-11s9 4 9 11" />
                  <path d="M4 38c0-6 3-10 8-10 2 0 4 .7 5.5 2" />
                  <path d="M44 38c0-6-3-10-8-10-2 0-4 .7-5.5 2" />
                </svg>
              {:else}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M18 18a6 6 0 1 1 8 5.7c-1.5.6-2 1.5-2 3.3" />
                  <circle
                    cx="24"
                    cy="33"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              {/if}
            </div>

            <div class="option-copy">
              <h2>
                {option.label}
              </h2>

              <p>
                {option.description}
              </p>
            </div>

            <span class="selection-state" aria-hidden="true">
              {#if selected}
                <svg viewBox="0 0 20 20">
                  <path d="m5 10.25 3.15 3.1L15 6.75" />
                </svg>
              {/if}
            </span>
          </div>
        {/each}
      </div>
    </section>
  {:else if screen === 2}
    <!-- =====================================================
         ESSENTIALS · 2 / 4
    ====================================================== -->

    <section class="question-panel" aria-labelledby="feature-essentials-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.essentials}
          · 2 / 4
        </span>

        <h1 id="feature-essentials-title">
          {ui.detailTitle}
        </h1>

        <p>
          {ui.detailText}
        </p>
      </header>

      {#if selectedPurpose}
        <div class="purpose-context">
          <span>
            {ui.mainPurpose}
          </span>

          <strong>
            {selectedPurpose.label}
          </strong>
        </div>
      {/if}

      <div class="feature-grid" role="group" aria-label={ui.detailTitle}>
        {#each purposeFeatures as feature}
          {@const selected = selectedFeatures.includes(feature.id)}

          {@const iconType = getFeatureIcon(feature.id)}

          <button
            type="button"
            class="selection-card feature-card"
            class:selected
            aria-pressed={selected}
            onclick={() => toggleFeature(feature.id)}
          >
            <div class="option-icon" aria-hidden="true">
              {#if iconType === "message"}
                <svg viewBox="0 0 48 48">
                  <path d="M7 8h34v25H20l-9 7v-7H7V8Z" />
                  <path d="M14 16h20M14 22h14" />
                </svg>
              {:else if iconType === "reviews"}
                <svg viewBox="0 0 48 48">
                  <path d="M7 9h34v24H20l-9 7v-7H7V9Z" />
                  <path
                    d="m24 15 2.2 4.4 4.8.7-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8-3.5-3.4 4.8-.7L24 15Z"
                  />
                </svg>
              {:else if iconType === "location"}
                <svg viewBox="0 0 48 48">
                  <path
                    d="M24 42S11 29 11 19a13 13 0 0 1 26 0c0 10-13 23-13 23Z"
                  />
                  <circle cx="24" cy="19" r="5" />
                </svg>
              {:else if iconType === "product"}
                <svg viewBox="0 0 48 48">
                  <path d="m24 6 16 9v18l-16 9-16-9V15l16-9Z" />
                  <path d="m8 15 16 9 16-9M24 24v18" />
                </svg>
              {:else if iconType === "payment"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="12" width="34" height="24" />
                  <path d="M7 19h34" />
                  <path d="M13 29h8" />
                  <path d="m29 28 3 3 6-7" />
                </svg>
              {:else if iconType === "mail"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="11" width="34" height="26" />
                  <path d="m8 14 16 13 16-13" />
                </svg>
              {:else if iconType === "account"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="16" r="7" />
                  <path d="M10 40c0-9 5-15 14-15s14 6 14 15" />
                </svg>
              {:else if iconType === "calendar" || iconType === "event"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M15 25h6v6h-6zM27 25h6v6h-6z" />
                </svg>
              {:else if iconType === "registration"}
                <svg viewBox="0 0 48 48">
                  <rect x="9" y="7" width="30" height="34" />
                  <circle cx="18" cy="17" r="4" />
                  <path d="M13 28c1-5 3-7 5-7s4 2 5 7" />
                  <path d="M27 17h7M27 23h7M27 29h7" />
                </svg>
              {:else if iconType === "portfolio"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <path d="M7 16h34" />
                  <path d="M13 23h8M27 23h8M13 30h8M27 30h8" />
                </svg>
              {:else if iconType === "gallery"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 33 9-9 6 6 5-5 7 8" />
                </svg>
              {:else if iconType === "document"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h14M17 26h14M17 32h9" />
                </svg>
              {:else if iconType === "search"}
                <svg viewBox="0 0 48 48">
                  <circle cx="20" cy="20" r="11" />
                  <path d="m28 28 12 12" />
                  <path d="M15 20h10M20 15v10" />
                </svg>
              {:else if iconType === "library"}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="7" width="9" height="34" />
                  <rect x="20" y="7" width="9" height="34" />
                  <path d="m32 9 8-2 6 32-8 2-6-32Z" />
                </svg>
              {:else if iconType === "login"}
                <svg viewBox="0 0 48 48">
                  <path d="M22 8h18v32H22" />
                  <path d="M7 24h22" />
                  <path d="m22 17 7 7-7 7" />
                </svg>
              {:else if iconType === "lock"}
                <svg viewBox="0 0 48 48">
                  <rect x="9" y="20" width="30" height="21" />
                  <path d="M16 20v-6a8 8 0 0 1 16 0v6" />
                  <circle cx="24" cy="30" r="2" />
                  <path d="M24 32v4" />
                </svg>
              {:else if iconType === "dashboard"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="32" />
                  <path d="M7 16h34" />
                  <rect x="12" y="21" width="10" height="13" />
                  <rect x="27" y="21" width="9" height="5" />
                  <rect x="27" y="29" width="9" height="5" />
                </svg>
              {:else if iconType === "analytics"}
                <svg viewBox="0 0 48 48">
                  <path d="M8 39V9" />
                  <path d="M8 39h33" />
                  <path d="m14 31 8-9 7 5 10-14" />
                  <path d="M34 13h5v5" />
                </svg>
              {:else if iconType === "database"}
                <svg viewBox="0 0 48 48">
                  <ellipse cx="24" cy="11" rx="15" ry="6" />
                  <path d="M9 11v12c0 3 7 6 15 6s15-3 15-6V11" />
                  <path d="M9 23v12c0 3 7 6 15 6s15-3 15-6V23" />
                </svg>
              {:else}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <path d="M24 15v18M15 24h18" />
                </svg>
              {/if}
            </div>

            <div class="option-copy">
              <h2>
                {feature.label}
              </h2>

              <p>
                {feature.description}
              </p>
            </div>

            <span class="selection-state" aria-hidden="true">
              {#if selected}
                <svg viewBox="0 0 20 20">
                  <path d="m5 10.25 3.15 3.1L15 6.75" />
                </svg>
              {/if}
            </span>
          </button>
        {/each}
      </div>
    </section>
  {:else if screen === 3}
    <!-- =====================================================
         ADDITIONAL · 3 / 4
    ====================================================== -->

    <section class="question-panel" aria-labelledby="feature-extras-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.extras}
          · 3 / 4 ·
          {ui.optional}
        </span>

        <h1 id="feature-extras-title">
          {ui.extrasTitle}
        </h1>

        <p>
          {ui.extrasText}
        </p>
      </header>

      <div class="extras-grid" role="group" aria-label={ui.extrasTitle}>
        {#each extras as option}
          {@const selected = selectedExtraIds.includes(option.id)}

          {@const iconType = getExtraIcon(option.id)}

          <button
            type="button"
            class="selection-card extra-card"
            class:selected
            aria-pressed={selected}
            onclick={() => toggleExtra(option)}
          >
            <div class="option-icon" aria-hidden="true">
              {#if iconType === "event"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M15 25h6v6h-6zM27 25h6v6h-6z" />
                </svg>
              {:else if iconType === "mail"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="11" width="34" height="26" />
                  <path d="m8 14 16 13 16-13" />
                </svg>
              {:else if iconType === "users"}
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="16" r="6" />
                  <circle cx="34" cy="18" r="4" />
                  <path d="M7 40c0-9 4-14 11-14s11 5 11 14" />
                  <path d="M29 29c2-2 4-3 6-3 5 0 8 4 8 12" />
                </svg>
              {:else if iconType === "payment"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="12" width="34" height="24" />
                  <path d="M7 19h34" />
                  <path d="M13 29h8" />
                  <path d="m29 28 3 3 6-7" />
                </svg>
              {:else if iconType === "gallery"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 33 9-9 6 6 5-5 7 8" />
                </svg>
              {:else if iconType === "search"}
                <svg viewBox="0 0 48 48">
                  <circle cx="20" cy="20" r="11" />
                  <path d="m28 28 12 12" />
                </svg>
              {:else}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <path d="M24 15v18M15 24h18" />
                </svg>
              {/if}
            </div>

            <div class="option-copy">
              <h2>
                {option.label}
              </h2>
            </div>

            <span class="selection-state" aria-hidden="true">
              {#if selected}
                <svg viewBox="0 0 20 20">
                  <path d="m5 10.25 3.15 3.1L15 6.75" />
                </svg>
              {/if}
            </span>
          </button>
        {/each}

        <button
          type="button"
          class="selection-card extra-card no-extra-card"
          class:selected={selectedExtraIds.length === 0}
          aria-pressed={selectedExtraIds.length === 0}
          onclick={clearExtras}
        >
          <div class="option-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="17" />
              <path d="M13 35 35 13" />
            </svg>
          </div>

          <div class="option-copy">
            <h2>
              {ui.noExtras}
            </h2>
          </div>

          <span class="selection-state" aria-hidden="true">
            {#if selectedExtraIds.length === 0}
              <svg viewBox="0 0 20 20">
                <path d="m5 10.25 3.15 3.1L15 6.75" />
              </svg>
            {/if}
          </span>
        </button>
      </div>
    </section>
  {:else}
    <!-- =====================================================
         LANGUAGES · 4 / 4
    ====================================================== -->

    <section class="question-panel" aria-labelledby="feature-language-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.languages}
          · 4 / 4
        </span>

        <h1 id="feature-language-title">
          {ui.languageTitle}
        </h1>

        <p>
          {ui.languageText}
        </p>
      </header>

      <div
        class="language-grid"
        role="radiogroup"
        aria-label={ui.languageTitle}
      >
        {#each text.languageOptions as option}
          {@const selected = websiteLanguages === option.id}

          <div
            class="selection-card language-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => {
              websiteLanguages = option.id;
            }}
            onkeydown={(event) =>
              handleKeydown(event, () => {
                websiteLanguages = option.id;
              })}
          >
            <div class="language-icon" aria-hidden="true">
              {#if option.id === "one-language"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M7 24h34" />
                  <path d="M24 7c5 5 8 11 8 17s-3 12-8 17" />
                  <path d="M24 7c-5 5-8 11-8 17s3 12 8 17" />
                </svg>
              {:else if option.id === "two-languages"}
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="22" r="13" />
                  <circle cx="31" cy="27" r="11" />
                  <path d="M5 22h26M18 9c4 4 6 8 6 13" />
                </svg>
              {:else if option.id === "three-languages"}
                <svg viewBox="0 0 48 48">
                  <circle cx="15" cy="19" r="9" />
                  <circle cx="33" cy="19" r="9" />
                  <circle cx="24" cy="32" r="9" />
                </svg>
              {:else if option.id === "more-languages"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M7 24h34" />
                  <path d="M24 7c5 5 8 11 8 17s-3 12-8 17" />
                  <path d="M24 7c-5 5-8 11-8 17s3 12 8 17" />
                  <path d="M14 14h20M14 34h20" />
                </svg>
              {:else}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M18 18a6 6 0 1 1 8 5.7c-1.5.6-2 1.5-2 3.3" />
                  <circle
                    cx="24"
                    cy="33"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              {/if}
            </div>

            <div class="option-copy">
              <h2>
                {option.label}
              </h2>

              <p>
                {option.description}
              </p>
            </div>

            <span class="selection-state" aria-hidden="true">
              {#if selected}
                <svg viewBox="0 0 20 20">
                  <path d="m5 10.25 3.15 3.1L15 6.75" />
                </svg>
              {/if}
            </span>
          </div>
        {/each}
      </div>
    </section>
  {/if}

  <!-- =====================================================
       NAVIGATION
  ====================================================== -->

  <div class="internal-navigation">
    <div>
      <button type="button" class="back-button" onclick={goBack}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M11.75 4.75 6.5 10l5.25 5.25" />
        </svg>

        <span>
          {ui.back}
        </span>
      </button>
    </div>

    <div class="continue-area">
      {#if !canMoveForward}
        <span class="hint">
          {screen === 1
            ? ui.required
            : screen === 2
              ? ui.detailRequired
              : ui.languageRequired}
        </span>
      {/if}

      <button
        type="button"
        class="continue-button"
        disabled={!canMoveForward}
        onclick={goForward}
      >
        <span>
          {screen === 4 ? ui.finish : ui.continue}
        </span>

        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
  .features-step {
    --step-bg: #080808;
    --step-card: #0c0c0c;
    --step-card-hover: #101010;

    --step-text: #f3f3f3;
    --step-copy: #888888;
    --step-muted: #666666;

    --step-border: #2c2c2c;
    --step-border-hover: #505050;

    --step-accent: #0043ff;
    --step-accent-hover: #1b56ff;
    --step-accent-soft: rgba(0, 67, 255, 0.08);

    width: 100%;

    margin: 0;
    padding: 0;

    background: var(--step-bg);

    color: var(--step-text);

    font-family: "DM Sans", Arial, sans-serif;

    box-sizing: border-box;
  }

  /* =========================================================
     QUESTION
  ========================================================= */

  .question-panel {
    width: 100%;
  }

  .question-header {
    width: 100%;

    margin: 0 0 20px;
  }

  .substep-label {
    display: block;

    margin: 0 0 9px;

    color: var(--step-accent);

    font-size: 9px;
    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .question-header h1 {
    max-width: 900px;

    margin: 0 0 6px;

    color: var(--step-text);

    font-size: clamp(26px, 2.5vw, 36px);

    font-weight: 600;

    line-height: 1.08;

    letter-spacing: -0.035em;
  }

  .question-header p {
    max-width: 760px;

    margin: 0;

    color: var(--step-copy);

    font-size: 12px;

    line-height: 1.45;
  }

  /* =========================================================
     GRIDS
  ========================================================= */

  .purpose-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 9px;
  }

  .feature-grid,
  .extras-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 9px;
  }

  .language-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 9px;
  }

  /* =========================================================
     CARDS
  ========================================================= */

  .selection-card {
    position: relative;

    display: flex;

    width: 100%;

    min-width: 0;
    min-height: 142px;

    flex-direction: column;

    align-items: flex-start;

    padding: 15px 16px 14px;

    border: 1px solid var(--step-border);

    border-radius: 0;

    background: var(--step-card);

    color: inherit;

    font-family: inherit;

    text-align: left;

    cursor: pointer;

    box-sizing: border-box;

    outline: none;

    transition:
      border-color 150ms ease,
      background 150ms ease;
  }

  .purpose-card {
    min-height: 150px;
  }

  .feature-card {
    min-height: 138px;
  }

  .extra-card {
    min-height: 120px;
  }

  .language-card {
    min-height: 144px;
  }

  .selection-card:hover {
    border-color: var(--step-border-hover);

    background: var(--step-card-hover);
  }

  .selection-card.selected {
    border-color: var(--step-accent);

    background: var(--step-accent-soft);
  }

  .selection-card:focus-visible {
    outline: 2px solid var(--step-accent);

    outline-offset: 2px;
  }

  /* =========================================================
     ICON
  ========================================================= */

  .option-icon,
  .language-icon {
    display: grid;

    width: 45px;
    height: 45px;

    place-items: center;

    margin-bottom: 11px;

    color: var(--step-text);
  }

  .option-icon svg,
  .language-icon svg {
    width: 39px;
    height: 39px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.45;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .selection-card.selected .option-icon,
  .selection-card.selected .language-icon {
    color: var(--step-accent);
  }

  /* =========================================================
     COPY
  ========================================================= */

  .option-copy {
    width: 100%;

    min-width: 0;

    padding-right: 26px;
  }

  .option-copy h2 {
    margin: 0;

    color: var(--step-text);

    font-size: 13px;
    font-weight: 600;

    line-height: 1.25;

    overflow-wrap: anywhere;
  }

  .option-copy p {
    display: -webkit-box;

    margin: 5px 0 0;

    overflow: hidden;

    color: var(--step-copy);

    font-size: 9.5px;

    line-height: 1.4;

    overflow-wrap: anywhere;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* =========================================================
     SELECTION STATE
  ========================================================= */

  .selection-state {
    position: absolute;

    top: 14px;
    right: 14px;

    display: grid;

    width: 19px;
    height: 19px;

    place-items: center;

    border: 1px solid #4b4b4b;

    border-radius: 0;

    box-sizing: border-box;
  }

  .selection-state svg {
    width: 12px;
    height: 12px;

    fill: none;

    stroke: #ffffff;

    stroke-width: 1.8;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .selection-card.selected .selection-state {
    border-color: var(--step-accent);

    background: var(--step-accent);
  }

  /* =========================================================
     PURPOSE CONTEXT
  ========================================================= */

  .purpose-context {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 16px;

    margin: -6px 0 12px;

    padding: 10px 12px;

    border: 1px solid var(--step-border);

    background: var(--step-card);
  }

  .purpose-context span {
    color: var(--step-muted);

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .purpose-context strong {
    color: var(--step-accent);

    font-size: 10px;
    font-weight: 600;
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  .internal-navigation {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;

    margin-top: 20px;
  }

  .continue-area {
    display: flex;

    align-items: center;
    justify-content: flex-end;

    gap: 12px;
  }

  .hint {
    max-width: 220px;

    color: var(--step-muted);

    font-size: 9px;

    line-height: 1.35;

    text-align: right;
  }

  .continue-button,
  .back-button {
    display: inline-flex;

    min-height: 44px;

    align-items: center;
    justify-content: center;

    gap: 8px;

    border-radius: 0;

    font-family: inherit;

    font-size: 10px;
    font-weight: 650;

    cursor: pointer;

    box-sizing: border-box;
  }

  .continue-button svg,
  .back-button svg {
    width: 16px;
    height: 16px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .continue-button {
    min-width: 145px;

    padding: 0 16px;

    border: 1px solid var(--step-accent);

    background: var(--step-accent);

    color: #ffffff;
  }

  .continue-button:hover:not(:disabled) {
    border-color: var(--step-accent-hover);

    background: var(--step-accent-hover);
  }

  .continue-button:disabled {
    border-color: var(--step-border);

    background: #151515;

    color: #555555;

    cursor: default;
  }

  .back-button {
    padding: 0 4px;

    border: 0;

    background: transparent;

    color: #999999;
  }

  .back-button:hover {
    color: #ffffff;
  }

  .continue-button:focus-visible,
  .back-button:focus-visible {
    outline: 2px solid var(--step-accent);

    outline-offset: 3px;
  }

  /* =========================================================
     LARGE TABLET
  ========================================================= */

  @media (max-width: 1050px) {
    .purpose-grid,
    .language-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 760px) {
    .question-header {
      margin-bottom: 17px;
    }

    .question-header h1 {
      font-size: clamp(23px, 6vw, 30px);
    }

    .question-header p {
      font-size: 11px;
    }

    .selection-card {
      min-height: 132px;

      padding: 14px;
    }

    .purpose-card {
      min-height: 140px;
    }

    .extra-card {
      min-height: 112px;
    }

    .option-icon,
    .language-icon {
      width: 42px;
      height: 42px;

      margin-bottom: 9px;
    }

    .option-icon svg,
    .language-icon svg {
      width: 36px;
      height: 36px;
    }

    .selection-state {
      top: 13px;
      right: 13px;

      width: 18px;
      height: 18px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 560px) {
    .purpose-grid,
    .feature-grid,
    .extras-grid,
    .language-grid {
      grid-template-columns: 1fr;

      gap: 7px;
    }

    .selection-card,
    .purpose-card,
    .feature-card,
    .extra-card,
    .language-card {
      min-height: 118px;
    }

    .purpose-context {
      align-items: flex-start;

      flex-direction: column;

      gap: 4px;
    }

    .internal-navigation {
      align-items: stretch;

      flex-direction: column-reverse;

      gap: 8px;

      margin-top: 16px;
    }

    .continue-area {
      width: 100%;

      align-items: stretch;

      flex-direction: column;

      gap: 7px;
    }

    .hint {
      max-width: none;

      text-align: left;
    }

    .continue-button {
      width: 100%;

      min-height: 46px;
    }

    .back-button {
      width: fit-content;

      min-height: 38px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .selection-card,
    .continue-button {
      transition: none;
    }
  }
</style>
