<script>
  import {
    getContentReadinessContent,
    getContentReadinessOption,
    isValidReferenceUrl,
  } from "$lib/data/website-configurator/content-readiness-data.js";

  import { getWebsiteTypeById } from "$lib/data/website-configurator/configurator-data.js";

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
  } = $props();

  const text = $derived(getContentReadinessContent(language));

  const interfaceText = $derived(
    language === "de"
      ? {
          part: "Teil",
          of: "von",
          selected: "Ausgewählt",
          continue: "Weiter",
          back: "Zurück",
          optional: "Optional",
          requiredHint: "Bitte wähle eine Option aus.",
          finishHint:
            "Diese Auswahl ist optional. Du kannst direkt fortfahren.",
          stages: {
            content: "Inhalte",
            visual: "Bilder",
            branding: "Marke",
            direction: "Design",
            support: "Unterstützung",
          },
        }
      : {
          part: "Part",
          of: "of",
          selected: "Selected",
          continue: "Continue",
          back: "Back",
          optional: "Optional",
          requiredHint: "Please select one option.",
          finishHint:
            "This selection is optional. You can continue without choosing anything.",
          stages: {
            content: "Content",
            visual: "Images",
            branding: "Branding",
            direction: "Design",
            support: "Support",
          },
        },
  );

  const stages = $derived([
    {
      id: "content",
      number: "01",
      label: interfaceText.stages.content,
    },
    {
      id: "visual",
      number: "02",
      label: interfaceText.stages.visual,
    },
    {
      id: "branding",
      number: "03",
      label: interfaceText.stages.branding,
    },
    {
      id: "direction",
      number: "04",
      label: interfaceText.stages.direction,
    },
    {
      id: "support",
      number: "05",
      label: interfaceText.stages.support,
    },
  ]);

  const currentStageIndex = $derived(
    Math.max(
      0,
      stages.findIndex((stage) => stage.id === contentStage),
    ),
  );

  const selectedWebsiteTypeOption = $derived(
    getWebsiteTypeById(selectedWebsiteType, language),
  );

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

  const selectedSupportOptions = $derived(
    supportNeeds
      .map((supportId) =>
        text.supportOptions.find((option) => option.id === supportId),
      )
      .filter(Boolean),
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
        selectedOption: selectedContentOption,
      };
    }

    if (contentStage === "visual") {
      return {
        id: "visual",
        title: text.visualTitle,
        description: text.visualDescription,
        options: text.visualOptions,
        selectedId: visualReadiness,
        selectedOption: selectedVisualOption,
      };
    }

    if (contentStage === "branding") {
      return {
        id: "branding",
        title: text.brandingTitle,
        description: text.brandingDescription,
        options: text.brandingOptions,
        selectedId: brandingReadiness,
        selectedOption: selectedBrandingOption,
      };
    }

    if (contentStage === "direction") {
      return {
        id: "direction",
        title: text.directionTitle,
        description: text.directionDescription,
        options: text.directionOptions,
        selectedId: designDirection,
        selectedOption: selectedDirectionOption,
      };
    }

    return null;
  });

  const referenceLinksValid = $derived(
    designReferenceLinks.every((link) => isValidReferenceUrl(link ?? "")),
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

  function stageIsComplete(stageId) {
    if (stageId === "content") {
      return Boolean(contentReadiness);
    }

    if (stageId === "visual") {
      return Boolean(visualReadiness);
    }

    if (stageId === "branding") {
      return Boolean(brandingReadiness);
    }

    if (stageId === "direction") {
      return Boolean(designDirection) && referenceLinksValid;
    }

    if (stageId === "support") {
      return contentStage === "support";
    }

    return false;
  }

  function canOpenStage(stageId) {
    const targetIndex = stages.findIndex((stage) => stage.id === stageId);

    if (targetIndex <= currentStageIndex) {
      return true;
    }

    if (stageId === "visual") {
      return Boolean(contentReadiness);
    }

    if (stageId === "branding") {
      return Boolean(contentReadiness && visualReadiness);
    }

    if (stageId === "direction") {
      return Boolean(contentReadiness && visualReadiness && brandingReadiness);
    }

    if (stageId === "support") {
      return Boolean(
        contentReadiness &&
          visualReadiness &&
          brandingReadiness &&
          designDirection &&
          referenceLinksValid,
      );
    }

    return false;
  }

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

  function openStage(stageId) {
    if (!canOpenStage(stageId)) {
      return;
    }

    contentStage = stageId;
    scrollToTop();
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
    scrollToTop();
  }

  function goToPreviousStage() {
    const previousStage = stages[currentStageIndex - 1];

    if (!previousStage) {
      return;
    }

    contentStage = previousStage.id;
    scrollToTop();
  }

  function scrollToTop() {
    requestAnimationFrame(() => {
      document.querySelector(".content-readiness-step")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
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
  <nav class="stage-navigation" aria-label="Content readiness progress">
    {#each stages as stage, index}
      <button
        type="button"
        class="stage-button"
        class:active={contentStage === stage.id}
        class:completed={stageIsComplete(stage.id)}
        disabled={!canOpenStage(stage.id)}
        onclick={() => openStage(stage.id)}
      >
        <span class="stage-number">
          {stage.number}
        </span>

        <span class="stage-label">
          {stage.label}
        </span>
      </button>

      {#if index < stages.length - 1}
        <span
          class="stage-line"
          class:completed-line={stageIsComplete(stage.id)}
          aria-hidden="true"
        ></span>
      {/if}
    {/each}
  </nav>

  <div class="step-layout">
    <main class="selection-area">
      {#if currentQuestion}
        <section
          class="question-panel"
          aria-labelledby={`${currentQuestion.id}-question-title`}
        >
          <header class="question-header">
            <div class="question-heading-copy">
              <span class="question-stage">
                {interfaceText.part}
                {currentStageIndex + 1}
                {interfaceText.of}
                {stages.length}
              </span>

              <h2 id={`${currentQuestion.id}-question-title`}>
                {currentQuestion.title}
              </h2>

              <p>
                {currentQuestion.description}
              </p>
            </div>

            {#if currentQuestion.selectedOption}
              <div class="selected-answer">
                <span>
                  {interfaceText.selected}
                </span>

                <strong>
                  {currentQuestion.selectedOption.label}
                </strong>
              </div>
            {/if}
          </header>

          <div
            class="option-grid"
            role="radiogroup"
            aria-label={currentQuestion.title}
          >
            {#each currentQuestion.options as option}
              <div
                class="selection-card"
                class:selected={currentQuestion.selectedId === option.id}
                role="radio"
                aria-checked={currentQuestion.selectedId === option.id}
                tabindex="0"
                onclick={() => selectOption(currentQuestion.id, option.id)}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () =>
                    selectOption(currentQuestion.id, option.id),
                  )}
              >
                <div class="selection-indicator" aria-hidden="true">
                  <span></span>
                </div>

                <div class="option-copy">
                  <h3>{option.label}</h3>

                  <p>
                    {option.description}
                  </p>
                </div>
              </div>
            {/each}
          </div>

          {#if contentStage === "direction" && showReferenceFields}
            <div class="reference-panel">
              <div class="reference-heading">
                <div>
                  <h3>
                    {text.referencesTitle}
                  </h3>

                  <p>
                    {text.referencesDescription}
                  </p>
                </div>

                <span class="optional-label">
                  {text.optionalLabel}
                </span>
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
                    placeholder={text.referencePlaceholder}
                    value={designReferenceLinks[0] ?? ""}
                    aria-invalid={!isValidReferenceUrl(
                      designReferenceLinks[0] ?? "",
                    )}
                    oninput={(event) =>
                      updateReferenceLink(0, event.currentTarget.value)}
                  />

                  {#if !isValidReferenceUrl(designReferenceLinks[0] ?? "")}
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
                    placeholder={text.referencePlaceholder}
                    value={designReferenceLinks[1] ?? ""}
                    aria-invalid={!isValidReferenceUrl(
                      designReferenceLinks[1] ?? "",
                    )}
                    oninput={(event) =>
                      updateReferenceLink(1, event.currentTarget.value)}
                  />

                  {#if !isValidReferenceUrl(designReferenceLinks[1] ?? "")}
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
            <div class="question-heading-copy">
              <span class="question-stage">
                {interfaceText.part}
                {currentStageIndex + 1}
                {interfaceText.of}
                {stages.length}
              </span>

              <div class="title-row">
                <h2 id="support-needs-title">
                  {text.supportTitle}
                </h2>

                <span class="optional-label">
                  {text.optionalLabel}
                </span>
              </div>

              <p>
                {text.supportDescription}
              </p>
            </div>

            {#if selectedSupportOptions.length > 0}
              <div class="selection-count">
                <strong>
                  {selectedSupportOptions.length}
                </strong>

                <span>
                  {interfaceText.selected}
                </span>
              </div>
            {/if}
          </header>

          <div class="support-grid" role="group" aria-label={text.supportTitle}>
            {#each text.supportOptions as option}
              <div
                class="support-option"
                class:selected={supportNeeds.includes(option.id)}
                role="checkbox"
                aria-checked={supportNeeds.includes(option.id)}
                tabindex="0"
                onclick={() => toggleSupportNeed(option.id)}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () =>
                    toggleSupportNeed(option.id),
                  )}
              >
                <span class="support-indicator" aria-hidden="true"></span>

                <span>
                  {option.label}
                </span>
              </div>
            {/each}
          </div>

          <p class="optional-hint">
            {interfaceText.finishHint}
          </p>
        </section>
      {/if}

      <div class="internal-navigation">
        {#if currentStageIndex > 0}
          <button
            type="button"
            class="internal-back-button"
            onclick={goToPreviousStage}
          >
            <span aria-hidden="true">←</span>
            {interfaceText.back}
          </button>
        {:else}
          <span class="navigation-placeholder" aria-hidden="true"></span>
        {/if}

        {#if contentStage !== "support"}
          <div class="internal-continue-area">
            {#if !currentStageComplete}
              <span class="internal-hint">
                {interfaceText.requiredHint}
              </span>
            {/if}

            <button
              type="button"
              class="internal-continue-button"
              disabled={!currentStageComplete}
              onclick={goToNextStage}
            >
              {interfaceText.continue}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        {/if}
      </div>
    </main>

    <aside class="guidance-panel">
      <div class="selection-summary">
        <span class="panel-label">
          {text.summaryLabel}
        </span>

        <div class="summary-item">
          <span>
            {text.websiteTypeLabel}
          </span>

          <strong class:empty-selection={!selectedWebsiteTypeOption}>
            {selectedWebsiteTypeOption?.label ?? "—"}
          </strong>
        </div>

        <div class="summary-item">
          <span>{text.contentLabel}</span>

          <strong class:empty-selection={!selectedContentOption}>
            {selectedContentOption?.label ?? text.nothingSelected}
          </strong>
        </div>

        <div class="summary-item">
          <span>{text.visualLabel}</span>

          <strong class:empty-selection={!selectedVisualOption}>
            {selectedVisualOption?.label ?? text.nothingSelected}
          </strong>
        </div>

        <div class="summary-item">
          <span>{text.brandingLabel}</span>

          <strong class:empty-selection={!selectedBrandingOption}>
            {selectedBrandingOption?.label ?? text.nothingSelected}
          </strong>
        </div>

        <div class="summary-item">
          <span>{text.directionLabel}</span>

          <strong class:empty-selection={!selectedDirectionOption}>
            {selectedDirectionOption?.label ?? text.nothingSelected}
          </strong>
        </div>

        {#if contentStage === "direction" || contentStage === "support"}
          <div class="summary-item">
            <span>
              {text.referencesLabel}
            </span>

            {#if designReferenceLinks.some((link) => link.trim())}
              <div class="reference-summary">
                {#each designReferenceLinks.filter( (link) => link.trim(), ) as link}
                  <span>{link}</span>
                {/each}
              </div>
            {:else}
              <strong class="empty-selection">
                {text.noReferences}
              </strong>
            {/if}
          </div>
        {/if}

        {#if contentStage === "support"}
          <div class="summary-item">
            <span>
              {text.supportLabel}
            </span>

            {#if selectedSupportOptions.length > 0}
              <div class="support-summary">
                {#each selectedSupportOptions as option}
                  <span>
                    {option.label}
                  </span>
                {/each}
              </div>
            {:else}
              <strong class="empty-selection">
                {text.noSupport}
              </strong>
            {/if}
          </div>
        {/if}
      </div>

      <div class="recommendation">
        <span class="recommendation-mark" aria-hidden="true"> Z </span>

        <div>
          <span class="panel-label">
            {text.recommendationLabel}
          </span>

          <p>
            {text.recommendationText}
          </p>
        </div>
      </div>
    </aside>
  </div>
</div>

<style>
  .content-readiness-step {
    width: 100%;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .stage-navigation {
    display: grid;
    grid-template-columns:
      auto minmax(16px, 1fr)
      auto minmax(16px, 1fr)
      auto minmax(16px, 1fr)
      auto minmax(16px, 1fr)
      auto;
    align-items: center;
    gap: 9px;
    padding: 20px 0;
    border-bottom: 1px solid #292929;
  }

  .stage-button {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #555555;
    font-family: inherit;
    cursor: pointer;
  }

  .stage-button:disabled {
    cursor: not-allowed;
    opacity: 0.55;
  }

  .stage-button.active {
    color: #f0f0f0;
  }

  .stage-button.completed:not(.active) {
    color: #8b8b8b;
  }

  .stage-number {
    display: grid;
    width: 23px;
    height: 23px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #353535;
    font-size: 7px;
    font-weight: 700;
    box-sizing: border-box;
  }

  .stage-button.active .stage-number {
    border-color: #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .stage-button.completed:not(.active) .stage-number {
    border-color: #777777;
  }

  .stage-label {
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .stage-line {
    width: 100%;
    height: 1px;
    background: #292929;
  }

  .stage-line.completed-line {
    background: #666666;
  }

  .step-layout {
    display: grid;
    grid-template-columns:
      minmax(0, 1fr)
      minmax(220px, 270px);
    gap: clamp(22px, 3vw, 42px);
    padding: clamp(22px, 3vw, 34px) 0;
  }

  .selection-area {
    min-width: 0;
  }

  .question-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
    margin-bottom: 16px;
  }

  .question-heading-copy {
    min-width: 0;
  }

  .question-stage {
    display: block;
    margin-bottom: 9px;
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .question-header h2 {
    margin: 0 0 6px;
    color: #eeeeee;
    font-size: clamp(20px, 2vw, 27px);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .question-header p {
    max-width: 660px;
    margin: 0;
    color: #929292;
    font-size: 11px;
    line-height: 1.5;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .selected-answer {
    min-width: 118px;
    max-width: 170px;
    padding: 10px;
    border: 1px solid #303030;
    box-sizing: border-box;
  }

  .selected-answer span {
    display: block;
    margin-bottom: 5px;
    color: #777777;
    font-size: 7px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .selected-answer strong {
    display: block;
    color: #4f76ff;
    font-size: 10px;
    font-weight: 500;
    line-height: 1.4;
  }

  .selection-count {
    display: grid;
    min-width: 64px;
    place-items: center;
    padding: 10px;
    border: 1px solid #303030;
    box-sizing: border-box;
  }

  .selection-count strong {
    color: #4f76ff;
    font-size: 18px;
  }

  .selection-count span {
    color: #777777;
    font-size: 7px;
    font-weight: 700;
    text-transform: uppercase;
  }

  .option-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .selection-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 10px;
    min-height: 78px;
    padding: 12px;
    border: 1px solid #292929;
    background: #0c0c0c;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    transition:
      border-color 180ms ease,
      background 180ms ease;
  }

  .selection-card:hover {
    border-color: #555555;
    background: #101010;
  }

  .selection-card:focus-visible {
    border-color: #d7d7d7;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.12);
  }

  .selection-card.selected {
    border-color: #d0d0d0;
  }

  .selection-indicator {
    display: grid;
    width: 16px;
    height: 16px;
    place-items: center;
    margin-top: 1px;
    border: 1px solid #626262;
    box-sizing: border-box;
  }

  .selection-indicator span {
    width: 6px;
    height: 6px;
    background: transparent;
  }

  .selection-card.selected .selection-indicator {
    border-color: #d0d0d0;
  }

  .selection-card.selected .selection-indicator span {
    background: #0043ff;
  }

  .selection-card.selected .option-copy h3 {
    color: #4f76ff;
  }

  .option-copy h3 {
    margin: 0 0 4px;
    color: #eeeeee;
    font-size: 12px;
    font-weight: 600;
    line-height: 1.25;
  }

  .option-copy p {
    margin: 0;
    color: #999999;
    font-size: 9px;
    line-height: 1.4;
  }

  .reference-panel {
    margin-top: 14px;
    padding: 18px;
    border: 1px solid #464646;
    background: #0c0c0c;
  }

  .reference-heading {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 16px;
  }

  .reference-heading h3 {
    margin: 0 0 6px;
    color: #eeeeee;
    font-size: 14px;
  }

  .reference-heading p {
    margin: 0;
    color: #929292;
    font-size: 11px;
    line-height: 1.5;
  }

  .optional-label {
    flex: 0 0 auto;
    color: #4f76ff;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .reference-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .reference-grid label {
    display: grid;
    gap: 7px;
  }

  .reference-grid label > span {
    color: #a2a2a2;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .reference-grid input {
    width: 100%;
    min-height: 46px;
    padding: 0 12px;
    border: 1px solid #3a3a3a;
    border-radius: 0;
    background: #080808;
    color: #eeeeee;
    font-family: inherit;
    font-size: 12px;
    box-sizing: border-box;
    outline: none;
  }

  .reference-grid input:focus {
    border-color: #d0d0d0;
  }

  .reference-grid input[aria-invalid="true"] {
    border-color: #777777;
  }

  .field-error {
    color: #b2b2b2;
    font-size: 9px;
  }

  .reference-note,
  .optional-hint {
    margin: 12px 0 0;
    color: #727272;
    font-size: 10px;
    line-height: 1.5;
  }

  .support-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .support-option {
    display: flex;
    min-height: 44px;
    align-items: center;
    gap: 9px;
    padding: 0 11px;
    border: 1px solid #3a3a3a;
    background: #0c0c0c;
    color: #b8b8b8;
    font-size: 10px;
    cursor: pointer;
    box-sizing: border-box;
    outline: none;
  }

  .support-option:hover,
  .support-option:focus-visible {
    border-color: #d0d0d0;
  }

  .support-option.selected {
    border-color: #d0d0d0;
    color: #4f76ff;
  }

  .support-indicator {
    width: 8px;
    height: 8px;
    flex: 0 0 auto;
    border: 1px solid #8c8c8c;
  }

  .support-option.selected .support-indicator {
    border-color: #d0d0d0;
    background: #0043ff;
  }

  .internal-navigation {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 16px;
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid #292929;
  }

  .navigation-placeholder {
    display: block;
  }

  .internal-continue-area {
    display: flex;
    align-items: center;
    gap: 14px;
  }

  .internal-hint {
    color: #666666;
    font-size: 9px;
  }

  .internal-back-button,
  .internal-continue-button {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 9px;
    padding: 0 17px;
    border-radius: 0;
    font-family: inherit;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .internal-back-button {
    border: 1px solid #3b3b3b;
    background: transparent;
    color: #c4c4c4;
  }

  .internal-back-button:hover {
    border-color: #777777;
  }

  .internal-continue-button {
    border: 1px solid #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .internal-continue-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  .guidance-panel {
    position: sticky;
    top: 110px;
    align-self: start;
    border-top: 1px solid #303030;
  }

  .selection-summary,
  .recommendation {
    padding: 16px 0;
    border-bottom: 1px solid #292929;
  }

  .panel-label {
    display: block;
    margin-bottom: 10px;
    color: #777777;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .summary-item {
    padding: 9px 0;
    border-top: 1px solid #242424;
  }

  .summary-item:first-of-type {
    border-top: 0;
  }

  .summary-item > span {
    display: block;
    margin-bottom: 6px;
    color: #707070;
    font-size: 8px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .summary-item strong {
    display: block;
    color: #4f76ff;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.4;
  }

  .empty-selection {
    color: #707070 !important;
    font-weight: 400 !important;
  }

  .support-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .support-summary span {
    padding: 5px 7px;
    border: 1px solid #505050;
    color: #4f76ff;
    font-size: 9px;
  }

  .reference-summary {
    display: grid;
    gap: 5px;
  }

  .reference-summary span {
    overflow-wrap: anywhere;
    color: #4f76ff;
    font-size: 9px;
  }

  .recommendation {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
  }

  .recommendation-mark {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border: 1px solid #d0d0d0;
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
  }

  .recommendation p {
    margin: 0;
    color: #8a8a8a;
    font-size: 11px;
    line-height: 1.55;
  }

  @media (max-width: 1050px) {
    .stage-label {
      display: none;
    }
  }

  @media (max-width: 950px) {
    .step-layout {
      grid-template-columns: 1fr;
    }

    .guidance-panel {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      border-top: 0;
    }

    .selection-summary,
    .recommendation {
      padding: 16px;
      border: 1px solid #292929;
    }
  }

  @media (max-width: 700px) {
    .stage-navigation {
      gap: 5px;
      padding: 17px 0;
    }

    .stage-number {
      width: 21px;
      height: 21px;
    }

    .step-layout {
      gap: 24px;
      padding: 26px 0;
    }

    .question-header {
      gap: 12px;
    }

    .selected-answer {
      display: none;
    }

    .option-grid,
    .support-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
    }

    .reference-grid {
      grid-template-columns: 1fr;
    }

    .selection-card {
      min-height: 74px;
      padding: 10px;
      gap: 8px;
    }

    .option-copy h3 {
      font-size: 11px;
    }

    .option-copy p {
      font-size: 8.5px;
      line-height: 1.35;
    }

    .support-option {
      min-height: 42px;
      padding: 0 9px;
      font-size: 9px;
    }

    .internal-navigation {
      align-items: stretch;
      flex-direction: column-reverse;
    }

    .internal-continue-area {
      align-items: stretch;
      flex-direction: column;
    }

    .internal-hint {
      text-align: left;
    }

    .internal-back-button,
    .internal-continue-button {
      width: 100%;
    }

    .guidance-panel {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 430px) {
    .option-grid,
    .support-grid {
      grid-template-columns: 1fr;
    }

    .selection-card {
      min-height: 68px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .selection-card {
      transition: none;
    }
  }
</style>
