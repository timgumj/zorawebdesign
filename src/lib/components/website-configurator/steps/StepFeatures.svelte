<script>
  import {
    getFeatureOptionById,
    getFeaturesContent,
    getRecommendedFeatureIds,
  } from "$lib/data/website-configurator/features-data.js";
  import { getWebsiteTypeById } from "$lib/data/website-configurator/configurator-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    selectedFeatures = $bindable([]),
    websiteLanguages = $bindable(""),
    customIntegration = $bindable(""),

    onContinue = () => {},
  } = $props();

  let screen = $state(1);
  let selectedPurposeId = $state("");
  let selectedExtraIds = $state([]);

  const text = $derived(getFeaturesContent(language));
  const selectedWebsiteTypeOption = $derived(
    getWebsiteTypeById(selectedWebsiteType, language),
  );
  const recommendedFeatureIds = $derived(
    getRecommendedFeatureIds(selectedWebsiteType),
  );

  const ui = $derived(
    language === "en"
      ? {
          step: "Step 5",
          title: "Website functionality",
          intro: "Let’s decide what your visitors should be able to do.",
          websiteType: "Selected website type",
          progress: ["Purpose", "Essentials", "Extras", "Languages"],
          purposeEyebrow: "Main purpose",
          purposeTitle:
            "What is the single most important thing your website should do?",
          purposeText:
            "Choose the closest answer. You can add more afterwards.",
          detailEyebrow: "Essential functions",
          detailTitle: "What does this need to include?",
          detailText: "We have kept this to the fundamentals.",
          extrasEyebrow: "Optional",
          extrasTitle: "Should the website do anything else?",
          extrasText: "Select only additional areas that are clearly relevant.",
          noExtras: "No, that is all",
          languageEyebrow: "Almost done",
          languageTitle: "How many languages will your website have?",
          languageText: "You can tell us which languages later.",
          back: "Back",
          continue: "Continue",
          finish: "Continue to timeline",
          completed: "All Step 5 questions answered.",
          required: "Choose one option to continue.",
          detailRequired: "Choose at least one essential function.",
          languageRequired: "Choose the number of website languages.",
          summary: "Step 5 summary",
          mainPurpose: "Main purpose",
          additional: "Additional",
          languages: "Languages",
          none: "None",
          notSelected: "Not selected",
          changeLater: "Everything can still be changed later.",
          purposes: [
            {
              id: "enquiries",
              label: "Generate enquiries",
              description: "Help visitors contact you or request an offer.",
              featureIds: ["contact-form", "testimonials", "map-location"],
            },
            {
              id: "commerce",
              label: "Sell products",
              description: "Present products and accept online payments.",
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
                "Let visitors reserve appointments, services or places.",
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
                "Present projects, images, services or case studies.",
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
              description: "Publish useful content, news or resources.",
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
              description: "Create member access or protected content.",
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
              description: "We will recommend the right setup later.",
              featureIds: [],
            },
          ],
          extras: [
            { id: "events", label: "Events", featureIds: ["event-management"] },
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
          ],
        }
      : {
          step: "Schritt 5",
          title: "Website-Funktionen",
          intro:
            "Legen wir fest, was Ihre Besucher auf der Website tun können sollen.",
          websiteType: "Gewählte Website-Art",
          progress: ["Zweck", "Grundlagen", "Zusätzlich", "Sprachen"],
          purposeEyebrow: "Hauptfunktion",
          purposeTitle: "Was ist die wichtigste Aufgabe Ihrer Website?",
          purposeText:
            "Wählen Sie die passendste Antwort. Weitere Funktionen können Sie danach ergänzen.",
          detailEyebrow: "Wesentliche Funktionen",
          detailTitle: "Was soll dafür enthalten sein?",
          detailText: "Wir zeigen nur die wichtigsten Grundlagen.",
          extrasEyebrow: "Optional",
          extrasTitle: "Soll die Website noch etwas Zusätzliches können?",
          extrasText:
            "Wählen Sie nur weitere Bereiche, die eindeutig relevant sind.",
          noExtras: "Nein, das ist alles",
          languageEyebrow: "Fast geschafft",
          languageTitle: "Wie viele Sprachen soll Ihre Website haben?",
          languageText:
            "Welche Sprachen es sind, können Sie uns später mitteilen.",
          back: "Zurück",
          continue: "Weiter",
          finish: "Weiter zum Zeitplan",
          completed: "Alle Fragen in Schritt 5 sind beantwortet.",
          required: "Bitte wählen Sie eine Option.",
          detailRequired:
            "Bitte wählen Sie mindestens eine wesentliche Funktion.",
          languageRequired: "Bitte wählen Sie die Anzahl der Website-Sprachen.",
          summary: "Übersicht Schritt 5",
          mainPurpose: "Hauptfunktion",
          additional: "Zusätzlich",
          languages: "Sprachen",
          none: "Keine",
          notSelected: "Nicht gewählt",
          changeLater: "Alle Angaben können später noch geändert werden.",
          purposes: [
            {
              id: "enquiries",
              label: "Anfragen erhalten",
              description:
                "Besucher sollen Kontakt aufnehmen oder ein Angebot anfragen.",
              featureIds: ["contact-form", "testimonials", "map-location"],
            },
            {
              id: "commerce",
              label: "Produkte verkaufen",
              description:
                "Produkte präsentieren und Online-Zahlungen ermöglichen.",
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
                "Termine, Leistungen oder Plätze online reservieren lassen.",
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
                "Projekte, Bilder, Leistungen oder Referenzen zeigen.",
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
                "Inhalte, Neuigkeiten oder Dokumente veröffentlichen.",
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
                "Mitgliederzugänge oder geschützte Inhalte anbieten.",
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
              description: "Wir empfehlen später die passende Lösung.",
              featureIds: [],
            },
          ],
          extras: [
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
        },
  );

  const selectedPurpose = $derived(
    ui.purposes.find((item) => item.id === selectedPurposeId) ?? null,
  );

  const purposeFeatureIds = $derived.by(() => {
    if (!selectedPurpose) return [];
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

  const selectedExtras = $derived(
    ui.extras.filter((item) => selectedExtraIds.includes(item.id)),
  );

  const selectedLanguage = $derived(
    text.languageOptions.find((item) => item.id === websiteLanguages) ?? null,
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
      ...ui.purposes.flatMap((item) => item.featureIds),
      ...ui.extras.flatMap((item) => item.featureIds),
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
      ...new Set([...selectedFeatures, option.featureIds[0]]),
    ];
  }

  function clearExtras() {
    const extraIds = new Set(ui.extras.flatMap((item) => item.featureIds));
    selectedExtraIds = [];
    selectedFeatures = selectedFeatures.filter(
      (id) => !extraIds.has(id) || purposeFeatureIds.includes(id),
    );
  }

  function handleKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    callback();
  }
</script>

<div class="step-shell">
  <header class="compact-hero">
    <div>
      <span class="step-label">{ui.step}</span>
      <h2>{ui.title}</h2>
      <p>{ui.intro}</p>
    </div>

    <div class="website-type">
      <span>{ui.websiteType}</span>
      <strong>{selectedWebsiteTypeOption?.label ?? "—"}</strong>
    </div>
  </header>

  <nav class="micro-progress" aria-label="Step 5 progress">
    {#each ui.progress as label, index}
      <button
        type="button"
        class:active={screen === index + 1}
        class:complete={screen > index + 1}
        disabled={index + 1 > screen}
        onclick={() => {
          if (index + 1 < screen) screen = index + 1;
        }}
      >
        <span>{String(index + 1).padStart(2, "0")}</span>
        <small>{label}</small>
      </button>
    {/each}
  </nav>

  <div class="content-layout">
    <main class="question-panel">
      {#if screen === 1}
        <section class="screen">
          <div class="question-copy">
            <span class="eyebrow">{ui.purposeEyebrow}</span>
            <h3>{ui.purposeTitle}</h3>
            <p>{ui.purposeText}</p>
          </div>

          <div class="purpose-grid" role="radiogroup">
            {#each ui.purposes as option}
              <div
                class:selected={selectedPurposeId === option.id}
                class="purpose-option"
                role="radio"
                aria-checked={selectedPurposeId === option.id}
                tabindex="0"
                onclick={() => selectPurpose(option)}
                onkeydown={(event) =>
                  handleKeydown(event, () => selectPurpose(option))}
              >
                <span class="radio"><span></span></span>
                <span>
                  <strong>{option.label}</strong>
                  <small>{option.description}</small>
                </span>
              </div>
            {/each}
          </div>

          {#if !selectedPurposeId}
            <p class="validation">{ui.required}</p>
          {/if}
        </section>
      {:else if screen === 2}
        <section class="screen">
          <div class="question-copy">
            <span class="eyebrow">{ui.detailEyebrow}</span>
            <h3>{ui.detailTitle}</h3>
            <p>{ui.detailText}</p>
          </div>

          <div class="selected-purpose-banner">
            <span>{ui.mainPurpose}</span>
            <strong>{selectedPurpose?.label}</strong>
          </div>

          <div class="detail-list">
            {#each purposeFeatures as feature}
              <button
                type="button"
                class:selected={selectedFeatures.includes(feature.id)}
                class="detail-option"
                aria-pressed={selectedFeatures.includes(feature.id)}
                onclick={() => toggleFeature(feature.id)}
              >
                <span class="check"><span></span></span>
                <span>
                  <strong>{feature.label}</strong>
                  <small>{feature.description}</small>
                </span>
              </button>
            {/each}
          </div>

          {#if !canMoveForward}
            <p class="validation">{ui.detailRequired}</p>
          {/if}
        </section>
      {:else if screen === 3}
        <section class="screen">
          <div class="question-copy">
            <span class="eyebrow">{ui.extrasEyebrow}</span>
            <h3>{ui.extrasTitle}</h3>
            <p>{ui.extrasText}</p>
          </div>

          <div class="extras-grid">
            {#each ui.extras as option}
              <button
                type="button"
                class:selected={selectedExtraIds.includes(option.id)}
                class="extra-option"
                aria-pressed={selectedExtraIds.includes(option.id)}
                onclick={() => toggleExtra(option)}
              >
                <span class="check"><span></span></span>
                <strong>{option.label}</strong>
              </button>
            {/each}

            <button
              type="button"
              class:selected={selectedExtraIds.length === 0}
              class="extra-option no-extra"
              aria-pressed={selectedExtraIds.length === 0}
              onclick={clearExtras}
            >
              <span class="check"><span></span></span>
              <strong>{ui.noExtras}</strong>
            </button>
          </div>
        </section>
      {:else}
        <section class="screen">
          <div class="question-copy">
            <span class="eyebrow">{ui.languageEyebrow}</span>
            <h3>{ui.languageTitle}</h3>
            <p>{ui.languageText}</p>
          </div>

          <div class="language-grid" role="radiogroup">
            {#each text.languageOptions as option}
              <div
                class:selected={websiteLanguages === option.id}
                class="language-option"
                role="radio"
                aria-checked={websiteLanguages === option.id}
                tabindex="0"
                onclick={() => (websiteLanguages = option.id)}
                onkeydown={(event) =>
                  handleKeydown(event, () => (websiteLanguages = option.id))}
              >
                <span class="radio"><span></span></span>
                <strong>{option.label}</strong>
              </div>
            {/each}
          </div>

          {#if !websiteLanguages}
            <p class="validation">{ui.languageRequired}</p>
          {/if}
        </section>
      {/if}

      <div class="screen-actions">
        {#if screen > 1}
          <button
            type="button"
            class="back-button"
            onclick={() => (screen -= 1)}
          >
            ← {ui.back}
          </button>
        {:else}
          <span></span>
        {/if}

        {#if screen < 4}
          <button
            type="button"
            class="continue-button"
            disabled={!canMoveForward}
            onclick={() => (screen += 1)}
          >
            {ui.continue} →
          </button>
        {:else if websiteLanguages}
          <div class="completion-action">
            <span class="completion-status">
              <span aria-hidden="true">✓</span>
              <strong>{ui.completed}</strong>
            </span>

            <button
              type="button"
              class="continue-button timeline-button"
              onclick={onContinue}
            >
              {ui.finish} →
            </button>
          </div>
        {:else}
          <div class="final-message">
            <span aria-hidden="true">→</span>
            <strong>{ui.languageRequired}</strong>
          </div>
        {/if}
      </div>
    </main>

    <aside class="summary-panel">
      <span class="summary-label">{ui.summary}</span>

      <div class="summary-item">
        <span>{ui.mainPurpose}</span>
        <strong class:muted={!selectedPurpose}>
          {selectedPurpose?.label ?? ui.notSelected}
        </strong>
      </div>

      <div class="summary-item">
        <span>{ui.additional}</span>
        {#if selectedExtras.length}
          <div class="summary-list">
            {#each selectedExtras as option}
              <strong>{option.label}</strong>
            {/each}
          </div>
        {:else}
          <strong class="muted">{ui.none}</strong>
        {/if}
      </div>

      <div class="summary-item">
        <span>{ui.languages}</span>
        <strong class:muted={!selectedLanguage}>
          {selectedLanguage?.label ?? ui.notSelected}
        </strong>
      </div>

      <p class="change-note">{ui.changeLater}</p>
    </aside>
  </div>
</div>

<style>
  .step-shell {
    padding: clamp(24px, 3.5vw, 44px) 0;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .compact-hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(180px, 240px);
    gap: 32px;
    align-items: end;
    padding-bottom: 24px;
    border-bottom: 1px solid #292929;
  }

  .step-label,
  .eyebrow,
  .website-type span,
  .summary-label,
  .summary-item > span,
  .selected-purpose-banner span {
    color: #777777;
    font-size: 9px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .step-label,
  .eyebrow {
    display: block;
    margin-bottom: 9px;
    color: #0043ff;
  }

  .compact-hero h2 {
    margin: 0 0 8px;
    color: #eeeeee;
    font-size: clamp(27px, 3vw, 42px);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.035em;
  }

  .compact-hero p,
  .question-copy p {
    max-width: 660px;
    margin: 0;
    color: #858585;
    font-size: 12px;
    line-height: 1.6;
  }

  .website-type {
    padding: 14px 0;
    border-top: 1px solid #303030;
    border-bottom: 1px solid #303030;
  }

  .website-type span {
    display: block;
    margin-bottom: 6px;
  }

  .website-type strong {
    color: #4f76ff;
    font-size: 12px;
    font-weight: 600;
  }

  .micro-progress {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    margin: 18px 0 28px;
    border: 1px solid #292929;
  }

  .micro-progress button {
    min-height: 54px;
    padding: 11px 13px;
    display: flex;
    align-items: center;
    gap: 9px;
    border: 0;
    border-right: 1px solid #292929;
    border-radius: 0;
    background: #090909;
    color: #666666;
    font-family: inherit;
    text-align: left;
  }

  .micro-progress button:last-child {
    border-right: 0;
  }
  .micro-progress button:not(:disabled) {
    cursor: pointer;
  }
  .micro-progress button.active {
    background: #101010;
    color: #eeeeee;
  }
  .micro-progress button.complete {
    color: #4f76ff;
  }

  .micro-progress button span {
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
  }

  .micro-progress button small {
    overflow: hidden;
    font-size: 10px;
    font-weight: 600;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .content-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(220px, 280px);
    gap: clamp(28px, 4vw, 56px);
    align-items: start;
  }

  .screen {
    min-height: 430px;
  }
  .question-copy {
    margin-bottom: 22px;
  }

  .question-copy h3 {
    max-width: 720px;
    margin: 0 0 8px;
    color: #eeeeee;
    font-size: clamp(22px, 2.4vw, 32px);
    font-weight: 600;
    line-height: 1.12;
    letter-spacing: -0.025em;
  }

  .purpose-grid,
  .extras-grid,
  .language-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 9px;
  }

  .purpose-option,
  .extra-option,
  .language-option,
  .detail-option {
    border: 1px solid #292929;
    border-radius: 0;
    background: #0b0b0b;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .purpose-option {
    min-height: 105px;
    padding: 17px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
    outline: none;
  }

  .purpose-option:hover,
  .purpose-option:focus-visible,
  .purpose-option.selected,
  .extra-option:hover,
  .extra-option.selected,
  .language-option:hover,
  .language-option.selected,
  .detail-option:hover,
  .detail-option.selected {
    border-color: #bdbdbd;
  }

  .radio,
  .check {
    display: grid;
    width: 17px;
    height: 17px;
    place-items: center;
    margin-top: 1px;
    border: 1px solid #575757;
    box-sizing: border-box;
  }

  .radio,
  .radio span {
    border-radius: 50%;
  }

  .radio span,
  .check span {
    width: 7px;
    height: 7px;
    background: transparent;
  }

  .selected .radio,
  .selected .check {
    border-color: #d0d0d0;
  }
  .selected .radio span,
  .selected .check span {
    background: #0043ff;
  }

  .purpose-option strong,
  .detail-option strong,
  .extra-option strong,
  .language-option strong {
    display: block;
    color: #e4e4e4;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.35;
  }

  .purpose-option strong {
    margin-bottom: 5px;
    font-size: 13px;
  }
  .selected strong {
    color: #4f76ff;
  }

  .purpose-option small,
  .detail-option small {
    display: block;
    color: #7d7d7d;
    font-size: 10px;
    line-height: 1.5;
  }

  .selected-purpose-banner {
    margin-bottom: 10px;
    padding: 14px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    border: 1px solid #292929;
    background: #090909;
  }

  .selected-purpose-banner strong {
    color: #4f76ff;
    font-size: 12px;
  }

  .detail-list {
    display: grid;
    gap: 8px;
  }

  .detail-option {
    width: 100%;
    min-height: 78px;
    padding: 15px 17px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
    align-items: start;
  }

  .extra-option,
  .language-option {
    min-height: 74px;
    padding: 15px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 11px;
    align-items: center;
  }

  .no-extra {
    grid-column: 1 / -1;
  }

  .validation {
    margin: 10px 0 0;
    color: #777777;
    font-size: 10px;
  }

  .screen-actions {
    min-height: 62px;
    margin-top: 25px;
    padding-top: 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid #292929;
  }

  .back-button,
  .continue-button {
    min-height: 44px;
    padding: 0 18px;
    border-radius: 0;
    font-family: inherit;
    font-size: 11px;
    font-weight: 700;
    cursor: pointer;
  }

  .back-button {
    border: 1px solid #343434;
    background: transparent;
    color: #b4b4b4;
  }

  .continue-button {
    border: 1px solid #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .continue-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  .final-message {
    margin-left: auto;
    min-height: 44px;
    padding: 0 15px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #343434;
    color: #777777;
  }

  .final-message.complete {
    border-color: #0043ff;
    color: #eeeeee;
  }

  .final-message span {
    color: #0043ff;
  }

  .completion-action {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }

  .completion-status {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    color: #d8d8d8;
    font-size: 10px;
    line-height: 1.4;
  }

  .completion-status > span {
    color: #0043ff;
    font-size: 14px;
    font-weight: 700;
  }

  .completion-status strong {
    font-weight: 600;
  }

  .timeline-button {
    min-width: 190px;
  }

  .summary-panel {
    position: sticky;
    top: 110px;
    padding: 20px;
    border: 1px solid #292929;
    background: #090909;
  }

  .summary-label {
    display: block;
    margin-bottom: 12px;
  }

  .summary-item {
    padding: 14px 0;
    border-top: 1px solid #242424;
  }

  .summary-item > span {
    display: block;
    margin-bottom: 7px;
  }

  .summary-item > strong,
  .summary-list strong {
    display: block;
    color: #4f76ff;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.45;
  }

  .summary-list {
    display: grid;
    gap: 5px;
  }
  .summary-list strong::before {
    content: "✓";
    margin-right: 7px;
  }
  .muted {
    color: #666666 !important;
    font-weight: 400 !important;
  }

  .change-note {
    margin: 0;
    padding-top: 14px;
    border-top: 1px solid #242424;
    color: #686868;
    font-size: 10px;
    line-height: 1.55;
  }

  @media (max-width: 900px) {
    .content-layout {
      grid-template-columns: 1fr;
    }
    .summary-panel {
      position: static;
    }
    .screen {
      min-height: 0;
    }
  }

  @media (max-width: 680px) {
    .compact-hero {
      grid-template-columns: 1fr;
      gap: 18px;
    }
    .micro-progress button {
      min-height: 47px;
      justify-content: center;
      padding: 9px 5px;
    }
    .micro-progress button small {
      display: none;
    }
    .purpose-grid,
    .extras-grid,
    .language-grid {
      grid-template-columns: 1fr;
    }
    .purpose-option {
      min-height: 92px;
    }
    .no-extra {
      grid-column: auto;
    }
    .back-button,
    .continue-button {
      flex: 1;
    }
    .final-message {
      width: 100%;
      justify-content: center;
    }

    .completion-action {
      align-items: stretch;
      flex-direction: column;
    }

    .completion-status {
      justify-content: center;
      text-align: center;
    }

    .timeline-button {
      width: 100%;
    }
  }
</style>
