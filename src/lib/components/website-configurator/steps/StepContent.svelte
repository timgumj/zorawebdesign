<script>
  import {
    getContentReadinessContent,
    getContentReadinessOption,
    isValidReferenceUrl,
  } from "$lib/data/website-configurator/content-readiness-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    contentReadiness = $bindable(""),
    visualReadiness = $bindable(""),
    brandingReadiness = $bindable(""),
    designDirection = $bindable(""),
    designReferenceLinks = $bindable(["", ""]),
    supportNeeds = $bindable([]),
    contentStage = $bindable("content"),
    onSubstepChange = () => {},
  } = $props();

  const text = $derived(getContentReadinessContent(language));

  const interfaceText = $derived(
    language === "en"
      ? {
          optional: "Optional",
          selected: "Selected",
          back: "Back",
          continue: "Continue",

          requiredHint: "Choose one option to continue.",

          supportHint:
            "Optional — select only the areas where you would like support.",

          stages: {
            content: "Content",
            visual: "Images",
            branding: "Branding",
            direction: "Design",
            support: "Support",
          },
        }
      : {
          optional: "Optional",
          selected: "Ausgewählt",
          back: "Zurück",
          continue: "Weiter",

          requiredHint: "Wählen Sie eine Option aus.",

          supportHint:
            "Optional — wählen Sie nur die Bereiche aus, bei denen Sie Unterstützung möchten.",

          stages: {
            content: "Inhalte",
            visual: "Bilder",
            branding: "Marke",
            direction: "Design",
            support: "Unterstützung",
          },
        },
  );

  const stages = $derived([
    {
      id: "content",
      label: interfaceText.stages.content,
    },
    {
      id: "visual",
      label: interfaceText.stages.visual,
    },
    {
      id: "branding",
      label: interfaceText.stages.branding,
    },
    {
      id: "direction",
      label: interfaceText.stages.direction,
    },
    {
      id: "support",
      label: interfaceText.stages.support,
      optional: true,
    },
  ]);

  const currentStageIndex = $derived(
    Math.max(
      0,
      stages.findIndex((stage) => stage.id === contentStage),
    ),
  );

  const currentStage = $derived(stages[currentStageIndex]);

  const selectedContentOption = $derived(
    getContentReadinessOption("contentOptions", contentReadiness, language),
  );

  const selectedVisualOption = $derived(
    getContentReadinessOption("visualOptions", visualReadiness, language),
  );

  const selectedBrandingOption = $derived(
    getContentReadinessOption("brandingOptions", brandingReadiness, language),
  );

  const selectedDirectionOption = $derived(
    getContentReadinessOption("directionOptions", designDirection, language),
  );

  const showReferenceFields = $derived(
    Boolean(selectedDirectionOption?.showLinks),
  );

  const currentQuestion = $derived.by(() => {
    if (contentStage === "content") {
      return {
        id: "content",
        title: text.contentTitle,
        description: text.contentDescription,
        options: text.contentOptions,
        selectedId: contentReadiness,
      };
    }

    if (contentStage === "visual") {
      return {
        id: "visual",
        title: text.visualTitle,
        description: text.visualDescription,
        options: text.visualOptions,
        selectedId: visualReadiness,
      };
    }

    if (contentStage === "branding") {
      return {
        id: "branding",
        title: text.brandingTitle,
        description: text.brandingDescription,
        options: text.brandingOptions,
        selectedId: brandingReadiness,
      };
    }

    if (contentStage === "direction") {
      return {
        id: "direction",
        title: text.directionTitle,
        description: text.directionDescription,
        options: text.directionOptions,
        selectedId: designDirection,
      };
    }

    return null;
  });

  function referenceLinkIsValid(link = "") {
    const value = String(link).trim();

    if (!value) {
      return true;
    }

    return isValidReferenceUrl(value);
  }

  const referenceLinksValid = $derived(
    designReferenceLinks.every((link) => referenceLinkIsValid(link ?? "")),
  );

  const currentStageComplete = $derived(
    contentStage === "content"
      ? Boolean(contentReadiness)
      : contentStage === "visual"
        ? Boolean(visualReadiness)
        : contentStage === "branding"
          ? Boolean(brandingReadiness)
          : contentStage === "direction"
            ? Boolean(designDirection) && referenceLinksValid
            : true,
  );

  function selectOption(group, optionId) {
    if (group === "content") {
      contentReadiness = optionId;
      return;
    }

    if (group === "visual") {
      visualReadiness = optionId;
      return;
    }

    if (group === "branding") {
      brandingReadiness = optionId;
      return;
    }

    if (group === "direction") {
      designDirection = optionId;

      const selectedOption = text.directionOptions.find(
        (option) => option.id === optionId,
      );

      if (!selectedOption?.showLinks) {
        designReferenceLinks = ["", ""];
      }
    }
  }

  function toggleSupportNeed(optionId) {
    if (optionId === "support-unsure") {
      supportNeeds = supportNeeds.includes(optionId) ? [] : [optionId];

      return;
    }

    const withoutUnsure = supportNeeds.filter((id) => id !== "support-unsure");

    if (withoutUnsure.includes(optionId)) {
      supportNeeds = withoutUnsure.filter((id) => id !== optionId);

      return;
    }

    supportNeeds = [...withoutUnsure, optionId];
  }

  function updateReferenceLink(index, value) {
    const updatedLinks = [...designReferenceLinks];

    updatedLinks[index] = value;

    designReferenceLinks = updatedLinks;
  }

  function goToNextStage() {
    if (!currentStageComplete) {
      return;
    }

    const nextStage = stages[currentStageIndex + 1];

    if (!nextStage) {
      return;
    }

    contentStage = nextStage.id;

    onSubstepChange();
  }

  function goToPreviousStage() {
    const previousStage = stages[currentStageIndex - 1];

    if (!previousStage) {
      return;
    }

    contentStage = previousStage.id;

    onSubstepChange();
  }

  function handleSelectableKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    callback();
  }
</script>

<div class="content-readiness-step">
  {#if currentQuestion}
    <section
      class="question-panel"
      aria-labelledby={`${currentQuestion.id}-question-title`}
    >
      <header class="question-header">
        <span class="substep-label">
          {currentStage.label}
          ·
          {currentStageIndex + 1}
          /
          {stages.length}
        </span>

        <h1 id={`${currentQuestion.id}-question-title`}>
          {currentQuestion.title}
        </h1>

        <p>
          {currentQuestion.description}
        </p>
      </header>

      <div
        class="option-grid"
        role="radiogroup"
        aria-label={currentQuestion.title}
      >
        {#each currentQuestion.options as option}
          {@const selected = currentQuestion.selectedId === option.id}

          <div
            class="selection-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectOption(currentQuestion.id, option.id)}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () =>
                selectOption(currentQuestion.id, option.id),
              )}
          >
            <div class="option-icon" aria-hidden="true">
              {#if option.id === "content-ready"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h14M17 26h10" />
                  <circle cx="31" cy="33" r="8" />
                  <path d="m27 33 3 3 5-6" />
                </svg>
              {:else if option.id === "content-mostly-ready"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h14M17 26h14M17 32h8" />
                  <path d="M31 32h7" />
                </svg>
              {:else if option.id === "content-some"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h12M17 26h8" />
                  <path d="m26 36 10-10 4 4-10 10-6 2 2-6Z" />
                </svg>
              {:else if option.id === "content-scratch"}
                <svg viewBox="0 0 48 48">
                  <path d="M13 8h18l6 6v26H13V8Z" />
                  <path d="M31 8v8h6" />
                  <path d="m10 34 15-15 5 5-15 15-7 2 2-7Z" />
                </svg>
              {:else if option.id === "visual-ready"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 33 9-9 6 6 5-5 7 8" />
                  <circle cx="36" cy="34" r="7" />
                  <path d="m33 34 2 2 4-5" />
                </svg>
              {:else if option.id === "visual-some"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="26" height="24" />
                  <rect x="15" y="6" width="26" height="24" />
                  <circle cx="24" cy="15" r="3" />
                  <path d="m18 26 6-6 5 5 4-4 5 5" />
                </svg>
              {:else if option.id === "visual-stock"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="28" height="26" />
                  <circle cx="16" cy="16" r="3" />
                  <path d="m11 29 7-7 5 5 4-4 5 6" />
                  <circle cx="35" cy="34" r="7" />
                  <path d="m40 39-3.5-3.5" />
                </svg>
              {:else if option.id === "visual-photography"}
                <svg viewBox="0 0 48 48">
                  <path d="M10 15h8l3-5h8l3 5h6v24H10V15Z" />
                  <circle cx="24" cy="27" r="8" />
                  <circle cx="24" cy="27" r="3" />
                </svg>
              {:else if option.id === "branding-complete"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="7" width="34" height="34" />
                  <rect x="12" y="12" width="10" height="10" />
                  <rect x="26" y="12" width="10" height="10" />
                  <rect x="12" y="26" width="10" height="10" />
                  <path d="M27 31h9" />
                </svg>
              {:else if option.id === "branding-logo-colors"}
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="18" r="9" />
                  <path d="M18 9v18M9 18h18" />
                  <path
                    d="M28 30c0-5 4-9 9-9 0 0 4 2 4 6 0 5-5 5-5 9 0 3-2 5-5 5-2 0-4-1-5-3"
                  />
                </svg>
              {:else if option.id === "branding-logo"}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <circle cx="24" cy="24" r="9" />
                  <path d="M24 15v18M15 24h18" />
                </svg>
              {:else if option.id === "branding-none"}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <path d="M13 35 35 13" />
                  <path d="M14 14h8M26 34h8" />
                </svg>
              {:else if option.id === "direction-references"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <path d="M7 16h34" />
                  <path d="M14 23h20M14 29h14" />
                  <path d="M33 33h7v7" />
                </svg>
              {:else if option.id === "direction-rough"}
                <svg viewBox="0 0 48 48">
                  <path d="m10 35 17-17 6 6-17 17-8 2 2-8Z" />
                  <path d="m29 16 4-4 6 6-4 4" />
                  <path d="M9 10h13M9 16h9" />
                </svg>
              {:else if option.id === "direction-open"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="m30 18-5 9-9 5 5-9 9-5Z" />
                  <circle
                    cx="24"
                    cy="24"
                    r="2"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              {:else if option.id === "direction-unsure"}
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

              {#if option.description}
                <p>
                  {option.description}
                </p>
              {/if}
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

      {#if contentStage === "direction" && showReferenceFields}
        <div class="reference-panel">
          <div class="reference-heading">
            <div class="reference-title-row">
              <h2>
                {text.referencesTitle}
              </h2>

              <span>
                {text.optionalLabel}
              </span>
            </div>

            <p>
              {text.referencesDescription}
            </p>
          </div>

          <div class="reference-grid">
            <label>
              <span>
                {text.referenceOneLabel}
              </span>

              <input
                type="url"
                inputmode="url"
                autocomplete="url"
                placeholder={language === "en"
                  ? "https://example.com"
                  : "https://beispiel.at"}
                value={designReferenceLinks[0] ?? ""}
                aria-invalid={!referenceLinkIsValid(
                  designReferenceLinks[0] ?? "",
                )}
                oninput={(event) =>
                  updateReferenceLink(0, event.currentTarget.value)}
              />

              {#if !referenceLinkIsValid(designReferenceLinks[0] ?? "")}
                <small class="field-error">
                  {text.invalidUrl}
                </small>
              {/if}
            </label>

            <label>
              <span>
                {text.referenceTwoLabel}
              </span>

              <input
                type="url"
                inputmode="url"
                autocomplete="url"
                placeholder={language === "en"
                  ? "https://example.com"
                  : "https://beispiel.at"}
                value={designReferenceLinks[1] ?? ""}
                aria-invalid={!referenceLinkIsValid(
                  designReferenceLinks[1] ?? "",
                )}
                oninput={(event) =>
                  updateReferenceLink(1, event.currentTarget.value)}
              />

              {#if !referenceLinkIsValid(designReferenceLinks[1] ?? "")}
                <small class="field-error">
                  {text.invalidUrl}
                </small>
              {/if}
            </label>
          </div>

          <p class="reference-note">
            {text.referenceNote}
          </p>
        </div>
      {/if}
    </section>
  {:else if contentStage === "support"}
    <section class="question-panel" aria-labelledby="support-needs-title">
      <header class="question-header">
        <span class="substep-label">
          {currentStage.label}
          ·
          {currentStageIndex + 1}
          /
          {stages.length}
          ·
          {interfaceText.optional}
        </span>

        <h1 id="support-needs-title">
          {text.supportTitle}
        </h1>

        <p>
          {text.supportDescription}
        </p>
      </header>

      <div class="support-grid" role="group" aria-label={text.supportTitle}>
        {#each text.supportOptions as option}
          {@const selected = supportNeeds.includes(option.id)}

          <div
            class="support-card"
            class:selected
            role="checkbox"
            aria-checked={selected}
            tabindex="0"
            onclick={() => toggleSupportNeed(option.id)}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () =>
                toggleSupportNeed(option.id),
              )}
          >
            <div class="option-icon support-icon" aria-hidden="true">
              {#if option.id === "support-copywriting"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 21h14M17 27h10" />
                  <path d="m27 37 9-9 4 4-9 9-6 2 2-6Z" />
                </svg>
              {:else if option.id === "support-content-planning"}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <path d="M14 16h20M14 24h12M14 32h8" />
                  <path d="M31 29h7M34.5 25.5v7" />
                </svg>
              {:else if option.id === "support-image-sourcing"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="28" height="26" />
                  <circle cx="16" cy="16" r="3" />
                  <path d="m11 29 7-7 5 5 4-4 5 6" />
                  <circle cx="35" cy="34" r="7" />
                  <path d="m40 39-3.5-3.5" />
                </svg>
              {:else if option.id === "support-photography"}
                <svg viewBox="0 0 48 48">
                  <path d="M10 15h8l3-5h8l3 5h6v24H10V15Z" />
                  <circle cx="24" cy="27" r="8" />
                  <circle cx="24" cy="27" r="3" />
                </svg>
              {:else if option.id === "support-branding"}
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="18" r="9" />
                  <path d="M18 9v18M9 18h18" />
                  <path
                    d="M28 30c0-5 4-9 9-9 0 0 4 2 4 6 0 5-5 5-5 9 0 3-2 5-5 5-2 0-4-1-5-3"
                  />
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

      <p class="support-helper">
        {interfaceText.supportHint}
      </p>
    </section>
  {/if}

  <!-- =====================================================
       INTERNAL NAVIGATION
  ====================================================== -->

  <div class="internal-navigation">
    <div>
      {#if currentStageIndex > 0}
        <button type="button" class="back-button" onclick={goToPreviousStage}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {interfaceText.back}
          </span>
        </button>
      {/if}
    </div>

    {#if contentStage !== "support"}
      <div class="continue-area">
        {#if !currentStageComplete}
          <span class="hint">
            {interfaceText.requiredHint}
          </span>
        {/if}

        <button
          type="button"
          class="continue-button"
          disabled={!currentStageComplete}
          onclick={goToNextStage}
        >
          <span>
            {interfaceText.continue}
          </span>

          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
          </svg>
        </button>
      </div>
    {:else}
      <span class="support-finish-state">
        {supportNeeds.length > 0
          ? `${supportNeeds.length} ${interfaceText.selected}`
          : interfaceText.optional}
      </span>
    {/if}
  </div>
</div>

<style>
  .content-readiness-step {
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
     OPTION GRID
  ========================================================= */

  .option-grid,
  .support-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;

    width: 100%;
  }

  /* =========================================================
     CARDS
  ========================================================= */

  .selection-card,
  .support-card {
    position: relative;

    display: flex;

    min-width: 0;
    min-height: 150px;

    flex-direction: column;

    align-items: flex-start;

    padding: 17px 18px 15px;

    border: 1px solid var(--step-border);

    border-radius: 0;

    background: var(--step-card);

    cursor: pointer;

    box-sizing: border-box;

    outline: none;

    transition:
      border-color 150ms ease,
      background 150ms ease;
  }

  .selection-card:hover,
  .support-card:hover {
    border-color: var(--step-border-hover);

    background: var(--step-card-hover);
  }

  .selection-card.selected,
  .support-card.selected {
    border-color: var(--step-accent);

    background: var(--step-accent-soft);
  }

  .selection-card:focus-visible,
  .support-card:focus-visible {
    outline: 2px solid var(--step-accent);

    outline-offset: 2px;
  }

  /* =========================================================
     ICONS
  ========================================================= */

  .option-icon {
    display: grid;

    width: 46px;
    height: 46px;

    place-items: center;

    margin-bottom: 12px;

    color: var(--step-text);
  }

  .option-icon svg {
    width: 40px;
    height: 40px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.5;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .selection-card.selected .option-icon,
  .support-card.selected .option-icon {
    color: var(--step-accent);
  }

  /* =========================================================
     COPY
  ========================================================= */

  .option-copy {
    width: 100%;

    min-width: 0;

    padding-right: 28px;
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

    font-size: 10px;

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

    top: 16px;
    right: 16px;

    display: grid;

    width: 20px;
    height: 20px;

    place-items: center;

    border: 1px solid #4b4b4b;

    border-radius: 0;

    box-sizing: border-box;
  }

  .selection-state svg {
    width: 13px;
    height: 13px;

    fill: none;

    stroke: #ffffff;

    stroke-width: 1.8;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .selection-card.selected .selection-state,
  .support-card.selected .selection-state {
    border-color: var(--step-accent);

    background: var(--step-accent);
  }

  /* =========================================================
     REFERENCES
  ========================================================= */

  .reference-panel {
    margin-top: 14px;

    padding: 16px;

    border: 1px solid var(--step-border);

    background: var(--step-card);
  }

  .reference-heading {
    margin-bottom: 14px;
  }

  .reference-title-row {
    display: flex;

    align-items: center;

    gap: 10px;

    margin-bottom: 5px;
  }

  .reference-title-row h2 {
    margin: 0;

    color: var(--step-text);

    font-size: 13px;
    font-weight: 600;
  }

  .reference-title-row span {
    color: var(--step-accent);

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .reference-heading p {
    max-width: 640px;

    margin: 0;

    color: var(--step-copy);

    font-size: 10.5px;

    line-height: 1.45;
  }

  .reference-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;
  }

  .reference-grid label {
    display: grid;

    gap: 6px;
  }

  .reference-grid label > span {
    color: var(--step-muted);

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .reference-grid input {
    width: 100%;

    min-height: 42px;

    padding: 0 11px;

    border: 1px solid #3a3a3a;

    border-radius: 0;

    background: #070707;

    color: var(--step-text);

    font-family: inherit;

    font-size: 11px;

    box-sizing: border-box;

    outline: none;
  }

  .reference-grid input:focus {
    border-color: var(--step-accent);
  }

  .reference-grid input[aria-invalid="true"] {
    border-color: #777777;
  }

  .field-error {
    color: #b5b5b5;

    font-size: 9px;
  }

  .reference-note {
    margin: 10px 0 0;

    color: var(--step-muted);

    font-size: 9px;

    line-height: 1.45;
  }

  /* =========================================================
     SUPPORT
  ========================================================= */

  .support-card {
    min-height: 126px;
  }

  .support-icon {
    margin-bottom: 10px;
  }

  .support-helper {
    margin: 10px 0 0;

    color: var(--step-muted);

    font-size: 9px;

    line-height: 1.4;
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

    gap: 14px;
  }

  .hint {
    max-width: 210px;

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

    line-height: 1;

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

  .support-finish-state {
    color: var(--step-muted);

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
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

    .option-grid,
    .support-grid {
      gap: 8px;
    }

    .selection-card {
      min-height: 136px;

      padding: 15px;
    }

    .support-card {
      min-height: 116px;

      padding: 15px;
    }

    .option-icon {
      width: 42px;
      height: 42px;

      margin-bottom: 10px;
    }

    .option-icon svg {
      width: 36px;
      height: 36px;
    }

    .selection-state {
      top: 14px;
      right: 14px;

      width: 18px;
      height: 18px;
    }

    .option-copy h2 {
      font-size: 12px;
    }

    .option-copy p {
      font-size: 9.5px;
    }

    .internal-navigation {
      margin-top: 18px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 560px) {
    .question-header {
      margin-bottom: 15px;
    }

    .option-grid,
    .support-grid,
    .reference-grid {
      grid-template-columns: 1fr;

      gap: 7px;
    }

    .selection-card {
      min-height: 126px;
    }

    .support-card {
      min-height: 108px;
    }

    .reference-panel {
      padding: 14px;
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

    .support-finish-state {
      text-align: right;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .selection-card,
    .support-card,
    .continue-button {
      transition: none;
    }
  }
</style>
