<script>
  import {
    getTimelineOption,
    getTimelineSupportContent,
  } from "$lib/data/website-configurator/timeline-support-data.js";

  let {
    language = "de",

    projectStart = $bindable(""),
    launchTimeline = $bindable(""),
    collaborationModel = $bindable(""),
    ongoingSupport = $bindable([]),
    trainingPreference = $bindable(""),
    timelineNote = $bindable(""),

    finalFeatureAdditions = $bindable([]),
    finalRequirementNote = $bindable(""),

    onReviewFeatures = () => {},
    onContinue = () => {},
  } = $props();

  let activeSection = $state(1);
  let stepTopElement = $state(null);

  const text = $derived(getTimelineSupportContent(language));

  const finalUi = $derived(
    language === "en"
      ? {
          complete: "All timeline questions answered.",
          viewReport: "View final recommendation",
          required: "Complete the required timeline questions first.",
        }
      : {
          complete: "Alle Fragen zum Zeitplan sind beantwortet.",
          viewReport: "Finale Empfehlung ansehen",
          required:
            "Bitte beantworten Sie zuerst die erforderlichen Zeitplanfragen.",
        },
  );

  const selectedStartOption = $derived(
    getTimelineOption("startOptions", projectStart, language),
  );

  const selectedLaunchOption = $derived(
    getTimelineOption("launchOptions", launchTimeline, language),
  );

  const selectedCollaborationOption = $derived(
    getTimelineOption("collaborationOptions", collaborationModel, language),
  );

  const selectedTrainingOption = $derived(
    getTimelineOption("trainingOptions", trainingPreference, language),
  );

  const selectedSupportOptions = $derived(
    ongoingSupport
      .map((supportId) =>
        text.supportOptions.find((option) => option.id === supportId),
      )
      .filter(Boolean),
  );

  const selectedFinalRequirementOptions = $derived(
    finalFeatureAdditions
      .map((optionId) =>
        text.finalRequirementOptions.find((option) => option.id === optionId),
      )
      .filter(Boolean),
  );

  const timelineComplete = $derived(
    Boolean(
      projectStart &&
        launchTimeline &&
        collaborationModel &&
        ongoingSupport.length > 0 &&
        trainingPreference,
    ),
  );

  const sectionCount = 5;

  function handleSelectableKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    callback();
  }

  function scrollToStepTop() {
    requestAnimationFrame(() => {
      stepTopElement?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function goToSection(sectionNumber) {
    if (sectionNumber < 1 || sectionNumber > sectionCount) {
      return;
    }

    activeSection = sectionNumber;
    scrollToStepTop();
  }

  function goToNextSection() {
    if (activeSection >= sectionCount || !isSectionComplete(activeSection)) {
      return;
    }

    activeSection += 1;
    scrollToStepTop();
  }

  function goToPreviousSection() {
    if (activeSection <= 1) {
      return;
    }

    activeSection -= 1;
    scrollToStepTop();
  }

  function toggleSupport(optionId) {
    const exclusiveIds = ["support-none", "support-unsure"];

    if (ongoingSupport.includes(optionId)) {
      ongoingSupport = ongoingSupport.filter((id) => id !== optionId);

      return;
    }

    if (exclusiveIds.includes(optionId)) {
      ongoingSupport = [optionId];
      return;
    }

    ongoingSupport = ongoingSupport.filter((id) => !exclusiveIds.includes(id));

    ongoingSupport = [...ongoingSupport, optionId];
  }

  function toggleFinalRequirement(optionId) {
    if (finalFeatureAdditions.includes(optionId)) {
      finalFeatureAdditions = finalFeatureAdditions.filter(
        (id) => id !== optionId,
      );

      return;
    }

    if (optionId === "final-unsure") {
      finalFeatureAdditions = [optionId];
      return;
    }

    finalFeatureAdditions = finalFeatureAdditions.filter(
      (id) => id !== "final-unsure",
    );

    finalFeatureAdditions = [...finalFeatureAdditions, optionId];
  }

  function isSectionComplete(sectionNumber) {
    if (sectionNumber === 1) {
      return Boolean(projectStart);
    }

    if (sectionNumber === 2) {
      return Boolean(launchTimeline);
    }

    if (sectionNumber === 3) {
      return Boolean(collaborationModel);
    }

    if (sectionNumber === 4) {
      return ongoingSupport.length > 0 && Boolean(trainingPreference);
    }

    if (sectionNumber === 5) {
      return true;
    }

    return false;
  }
</script>

<div class="step-layout" bind:this={stepTopElement}>
  <div class="selection-area">
    <nav
      class="internal-navigation"
      aria-label={language === "en"
        ? "Step 6 questions"
        : "Fragen in Schritt 6"}
    >
      <div class="internal-progress-header">
        <span>
          {text.sectionProgress}
          {activeSection}
          {text.sectionOf}
          {sectionCount}
        </span>

        <strong>
          {text.sectionNames[activeSection - 1]}
        </strong>
      </div>

      <div class="internal-progress-track">
        <span style={`width: ${(activeSection / sectionCount) * 100}%`}></span>
      </div>

      <div class="internal-stage-list">
        {#each text.sectionNames as sectionName, index}
          {@const sectionNumber = index + 1}

          <button
            type="button"
            class:active={activeSection === sectionNumber}
            class:complete={isSectionComplete(sectionNumber)}
            class="stage-button"
            aria-current={activeSection === sectionNumber ? "step" : undefined}
            onclick={() => goToSection(sectionNumber)}
          >
            <span class="stage-number">
              {String(sectionNumber).padStart(2, "0")}
            </span>

            <span class="stage-copy">
              <strong>{sectionName}</strong>

              <small>
                {activeSection === sectionNumber
                  ? text.currentLabel
                  : isSectionComplete(sectionNumber)
                    ? text.completedLabel
                    : ""}
              </small>
            </span>
          </button>
        {/each}
      </div>
    </nav>

    <div class="active-question">
      <div class="question-context">
        <span>
          {String(activeSection).padStart(2, "0")}
        </span>

        <p>
          {text.sectionDescriptions[activeSection - 1]}
        </p>
      </div>

      {#if activeSection === 1}
        <section class="timeline-section" aria-labelledby="project-start-title">
          <div class="section-heading">
            <span class="section-number"> 01 </span>

            <div>
              <h2 id="project-start-title">
                {text.startTitle}
              </h2>

              <p>
                {text.startDescription}
              </p>
            </div>
          </div>

          <div
            class="option-grid"
            role="radiogroup"
            aria-label={text.startTitle}
          >
            {#each text.startOptions as option}
              <div
                class:selected={projectStart === option.id}
                class="selection-card"
                role="radio"
                aria-checked={projectStart === option.id}
                tabindex="0"
                onclick={() => {
                  projectStart = option.id;
                }}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () => {
                    projectStart = option.id;
                  })}
              >
                <span class="selection-indicator" aria-hidden="true">
                  <span></span>
                </span>

                <div>
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {:else if activeSection === 2}
        <section
          class="timeline-section"
          aria-labelledby="launch-timeline-title"
        >
          <div class="section-heading">
            <span class="section-number"> 02 </span>

            <div>
              <h2 id="launch-timeline-title">
                {text.launchTitle}
              </h2>

              <p>
                {text.launchDescription}
              </p>
            </div>
          </div>

          <div
            class="option-grid"
            role="radiogroup"
            aria-label={text.launchTitle}
          >
            {#each text.launchOptions as option}
              <div
                class:selected={launchTimeline === option.id}
                class="selection-card"
                role="radio"
                aria-checked={launchTimeline === option.id}
                tabindex="0"
                onclick={() => {
                  launchTimeline = option.id;
                }}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () => {
                    launchTimeline = option.id;
                  })}
              >
                <span class="selection-indicator" aria-hidden="true">
                  <span></span>
                </span>

                <div>
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
              </div>
            {/each}
          </div>

          <div class="timeline-note">
            <span aria-hidden="true">i</span>

            <div>
              <strong>
                {text.urgencyNoteTitle}
              </strong>

              <p>
                {text.urgencyNoteText}
              </p>
            </div>
          </div>
        </section>
      {:else if activeSection === 3}
        <section class="timeline-section" aria-labelledby="collaboration-title">
          <div class="section-heading">
            <span class="section-number"> 03 </span>

            <div>
              <h2 id="collaboration-title">
                {text.collaborationTitle}
              </h2>

              <p>
                {text.collaborationDescription}
              </p>
            </div>
          </div>

          <div
            class="option-grid"
            role="radiogroup"
            aria-label={text.collaborationTitle}
          >
            {#each text.collaborationOptions as option}
              <div
                class:selected={collaborationModel === option.id}
                class="selection-card"
                role="radio"
                aria-checked={collaborationModel === option.id}
                tabindex="0"
                onclick={() => {
                  collaborationModel = option.id;
                }}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () => {
                    collaborationModel = option.id;
                  })}
              >
                <span class="selection-indicator" aria-hidden="true">
                  <span></span>
                </span>

                <div>
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {:else if activeSection === 4}
        <section class="timeline-section" aria-labelledby="support-title">
          <div class="section-heading">
            <span class="section-number"> 04 </span>

            <div>
              <h2 id="support-title">
                {text.supportTitle}
              </h2>

              <p>
                {text.supportDescription}
              </p>
            </div>
          </div>

          <div class="option-grid" role="group" aria-label={text.supportTitle}>
            {#each text.supportOptions as option}
              <div
                class:selected={ongoingSupport.includes(option.id)}
                class="selection-card"
                role="checkbox"
                aria-checked={ongoingSupport.includes(option.id)}
                tabindex="0"
                onclick={() => toggleSupport(option.id)}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () =>
                    toggleSupport(option.id),
                  )}
              >
                <span
                  class="selection-indicator checkbox-indicator"
                  aria-hidden="true"
                >
                  <span></span>
                </span>

                <div>
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
              </div>
            {/each}
          </div>

          <div class="training-block">
            <div class="subsection-heading">
              <h3>
                {text.trainingTitle}
              </h3>

              <p>
                {text.trainingDescription}
              </p>
            </div>

            <div
              class="training-grid"
              role="radiogroup"
              aria-label={text.trainingTitle}
            >
              {#each text.trainingOptions as option}
                <div
                  class:selected={trainingPreference === option.id}
                  class="training-card"
                  role="radio"
                  aria-checked={trainingPreference === option.id}
                  tabindex="0"
                  onclick={() => {
                    trainingPreference = option.id;
                  }}
                  onkeydown={(event) =>
                    handleSelectableKeydown(event, () => {
                      trainingPreference = option.id;
                    })}
                >
                  <span class="selection-indicator" aria-hidden="true">
                    <span></span>
                  </span>

                  <div>
                    <h3>{option.label}</h3>
                    <p>{option.description}</p>
                  </div>
                </div>
              {/each}
            </div>
          </div>

          <div class="additional-note-block">
            <div class="optional-heading">
              <h3>
                {text.additionalNoteTitle}
              </h3>

              <span>
                {text.optionalLabel}
              </span>
            </div>

            <p>
              {text.additionalNoteDescription}
            </p>

            <textarea
              rows="5"
              maxlength="700"
              placeholder={text.additionalNotePlaceholder}
              value={timelineNote}
              oninput={(event) => {
                timelineNote = event.currentTarget.value;
              }}
            ></textarea>
          </div>
        </section>
      {:else if activeSection === 5}
        <section
          class="timeline-section"
          aria-labelledby="final-requirements-title"
        >
          <div class="section-heading">
            <span class="section-number"> 05 </span>

            <div>
              <div class="optional-heading">
                <h2 id="final-requirements-title">
                  {text.finalRequirementsTitle}
                </h2>

                <span>
                  {text.optionalLabel}
                </span>
              </div>

              <p>
                {text.finalRequirementsDescription}
              </p>
            </div>
          </div>

          <div
            class="option-grid"
            role="group"
            aria-label={text.finalRequirementsTitle}
          >
            {#each text.finalRequirementOptions as option}
              <div
                class:selected={finalFeatureAdditions.includes(option.id)}
                class="selection-card"
                role="checkbox"
                aria-checked={finalFeatureAdditions.includes(option.id)}
                tabindex="0"
                onclick={() => toggleFinalRequirement(option.id)}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () =>
                    toggleFinalRequirement(option.id),
                  )}
              >
                <span
                  class="selection-indicator checkbox-indicator"
                  aria-hidden="true"
                >
                  <span></span>
                </span>

                <div>
                  <h3>{option.label}</h3>
                  <p>{option.description}</p>
                </div>
              </div>
            {/each}
          </div>

          <div class="additional-note-block">
            <div class="optional-heading">
              <h3>
                {text.finalRequirementNoteTitle}
              </h3>

              <span>
                {text.optionalLabel}
              </span>
            </div>

            <p>
              {text.finalRequirementNoteDescription}
            </p>

            <textarea
              rows="5"
              maxlength="700"
              placeholder={text.finalRequirementNotePlaceholder}
              value={finalRequirementNote}
              oninput={(event) => {
                finalRequirementNote = event.currentTarget.value;
              }}
            ></textarea>
          </div>

          <div class="review-features-panel">
            <div>
              <strong>
                {text.reviewFeaturesButton}
              </strong>

              <p>
                {text.reviewFeaturesDescription}
              </p>
            </div>

            <button type="button" onclick={onReviewFeatures}>
              <span>
                {text.reviewFeaturesButton}
              </span>

              <span aria-hidden="true"> ← </span>
            </button>
          </div>
        </section>
      {/if}

      <div class="internal-actions">
        {#if activeSection > 1}
          <button
            type="button"
            class="previous-question-button"
            onclick={goToPreviousSection}
          >
            <span aria-hidden="true"> ← </span>

            {text.previousQuestion}
          </button>
        {:else}
          <span></span>
        {/if}

        {#if activeSection < sectionCount}
          <button
            type="button"
            class="next-question-button"
            disabled={!isSectionComplete(activeSection)}
            onclick={goToNextSection}
          >
            <span>
              {text.nextLabels[activeSection - 1]}
            </span>

            <span aria-hidden="true"> → </span>
          </button>
        {:else}
          <div class:complete={timelineComplete} class="finish-action">
            <div class="finish-copy">
              <span aria-hidden="true">
                {timelineComplete ? "✓" : "→"}
              </span>

              <span>
                {timelineComplete ? finalUi.complete : finalUi.required}
              </span>
            </div>

            <button
              type="button"
              class="report-button"
              disabled={!timelineComplete}
              onclick={onContinue}
            >
              {finalUi.viewReport}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        {/if}
      </div>
    </div>
  </div>

  <aside class="guidance-panel">
    <div class="selection-summary">
      <span class="panel-label">
        {text.summaryLabel}
      </span>

      <div class="summary-item">
        <span>
          {text.startSummaryLabel}
        </span>

        <strong class:empty-selection={!selectedStartOption}>
          {selectedStartOption?.label ?? text.nothingSelected}
        </strong>
      </div>

      <div class="summary-item">
        <span>
          {text.launchSummaryLabel}
        </span>

        <strong class:empty-selection={!selectedLaunchOption}>
          {selectedLaunchOption?.label ?? text.nothingSelected}
        </strong>
      </div>

      <div class="summary-item">
        <span>
          {text.collaborationSummaryLabel}
        </span>

        <strong class:empty-selection={!selectedCollaborationOption}>
          {selectedCollaborationOption?.label ?? text.nothingSelected}
        </strong>
      </div>

      <div class="summary-item">
        <span>
          {text.supportSummaryLabel}
        </span>

        {#if selectedSupportOptions.length > 0}
          <div class="selected-list">
            {#each selectedSupportOptions as option}
              <span>{option.label}</span>
            {/each}
          </div>
        {:else}
          <strong class="empty-selection">
            {text.noSupportSelected}
          </strong>
        {/if}
      </div>

      <div class="summary-item">
        <span>
          {text.trainingSummaryLabel}
        </span>

        <strong class:empty-selection={!selectedTrainingOption}>
          {selectedTrainingOption?.label ?? text.nothingSelected}
        </strong>
      </div>

      <div class="summary-item">
        <span>
          {text.noteSummaryLabel}
        </span>

        <strong class:empty-selection={!timelineNote.trim()}>
          {timelineNote.trim() || text.noAdditionalNote}
        </strong>
      </div>

      <div class="summary-item">
        <span>
          {text.finalRequirementsSummaryLabel}
        </span>

        {#if selectedFinalRequirementOptions.length > 0}
          <div class="selected-list">
            {#each selectedFinalRequirementOptions as option}
              <span>{option.label}</span>
            {/each}
          </div>
        {:else}
          <strong class="empty-selection">
            {text.noFinalRequirements}
          </strong>
        {/if}
      </div>

      <div class="summary-item">
        <span>
          {text.finalRequirementNoteSummaryLabel}
        </span>

        <strong class:empty-selection={!finalRequirementNote.trim()}>
          {finalRequirementNote.trim() || text.noAdditionalNote}
        </strong>
      </div>
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

<style>
  .step-layout {
    display: grid;
    grid-template-columns:
      minmax(0, 1fr)
      minmax(250px, 320px);
    gap: clamp(32px, 5vw, 72px);
    padding: clamp(32px, 4vw, 56px) 0;
    font-family: "DM Sans", Arial, sans-serif;
    scroll-margin-top: 110px;
  }

  .selection-area {
    min-width: 0;
  }

  .internal-navigation {
    margin-bottom: 28px;
    border: 1px solid #292929;
    background: #0b0b0b;
  }

  .internal-progress-header {
    min-height: 52px;
    padding: 0 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-bottom: 1px solid #292929;
  }

  .internal-progress-header > span {
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  .internal-progress-header strong {
    color: #e7e7e7;
    font-size: 12px;
    font-weight: 600;
  }

  .internal-progress-track {
    height: 2px;
    background: #242424;
  }

  .internal-progress-track span {
    display: block;
    height: 100%;
    background: #0043ff;
    transition: width 220ms ease;
  }

  .internal-stage-list {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .stage-button {
    min-height: 76px;
    padding: 13px;
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 9px;
    align-items: start;
    border: 0;
    border-right: 1px solid #292929;
    border-radius: 0;
    background: transparent;
    color: #7e7e7e;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
  }

  .stage-button:last-child {
    border-right: 0;
  }

  .stage-button:hover,
  .stage-button:focus-visible {
    background: #101010;
    outline: none;
  }

  .stage-button.active {
    background: #101010;
    color: #eeeeee;
  }

  .stage-button.complete:not(.active) .stage-number {
    color: #0043ff;
  }

  .stage-number {
    color: #666666;
    font-size: 9px;
    font-weight: 700;
  }

  .stage-button.active .stage-number {
    color: #0043ff;
  }

  .stage-copy {
    display: grid;
    gap: 5px;
  }

  .stage-copy strong {
    color: inherit;
    font-size: 10px;
    font-weight: 600;
    line-height: 1.3;
  }

  .stage-copy small {
    min-height: 12px;
    color: #676767;
    font-size: 8px;
    line-height: 1.2;
    text-transform: uppercase;
  }

  .stage-button.active .stage-copy small {
    color: #4f76ff;
  }

  .active-question {
    border-top: 1px solid #292929;
  }

  .question-context {
    min-height: 62px;
    padding: 0 2px;
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 16px;
    align-items: center;
    border-bottom: 1px solid #292929;
  }

  .question-context > span {
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
  }

  .question-context p {
    margin: 0;
    color: #8e8e8e;
    font-size: 12px;
    line-height: 1.55;
  }

  .timeline-section {
    min-height: 390px;
    padding: clamp(28px, 4vw, 42px) 0;
  }

  .section-heading {
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 16px;
    margin-bottom: 22px;
  }

  .section-number {
    margin-top: 4px;
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
  }

  .section-heading h2 {
    margin: 0 0 8px;
    color: #eeeeee;
    font-size: clamp(20px, 2vw, 28px);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .section-heading p {
    max-width: 720px;
    margin: 0;
    color: #929292;
    font-size: 13px;
    line-height: 1.6;
  }

  .option-grid,
  .training-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
  }

  .selection-card,
  .training-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 16px;
    min-height: 118px;
    padding: 20px;
    border: 1px solid #292929;
    background: #0c0c0c;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    transition:
      border-color 180ms ease,
      background 180ms ease;
  }

  .selection-card:hover,
  .training-card:hover,
  .selection-card:focus-visible,
  .training-card:focus-visible {
    border-color: #d0d0d0;
  }

  .selection-card.selected,
  .training-card.selected {
    border-color: #d0d0d0;
    background: #0c0c0c;
  }

  .selection-card.selected h3,
  .training-card.selected h3 {
    color: #4f76ff;
  }

  .selection-card h3,
  .training-card h3 {
    margin: 0 0 7px;
    color: #eeeeee;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.3;
  }

  .selection-card p,
  .training-card p {
    margin: 0;
    color: #a0a0a0;
    font-size: 14px;
    line-height: 1.55;
  }

  .selection-indicator {
    display: grid;
    width: 17px;
    height: 17px;
    place-items: center;
    margin-top: 2px;
    border: 1px solid #626262;
    box-sizing: border-box;
  }

  .selection-indicator span {
    width: 7px;
    height: 7px;
    background: transparent;
  }

  .selected .selection-indicator {
    border-color: #d0d0d0;
  }

  .selected .selection-indicator span {
    background: #0043ff;
  }

  .checkbox-indicator {
    position: relative;
  }

  .selected .checkbox-indicator::after {
    content: "";
    position: relative;
    z-index: 2;
    width: 6px;
    height: 3px;
    border-bottom: 1px solid #080808;
    border-left: 1px solid #080808;
    transform: rotate(-45deg);
  }

  .timeline-note {
    margin-top: 16px;
    padding: 18px;
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 14px;
    border: 1px solid #303030;
    background: #0c0c0c;
  }

  .timeline-note > span {
    display: grid;
    width: 26px;
    height: 26px;
    place-items: center;
    border: 1px solid #d0d0d0;
    color: #0043ff;
    font-size: 11px;
    font-weight: 700;
  }

  .timeline-note strong {
    display: block;
    margin-bottom: 6px;
    color: #dddddd;
    font-size: 12px;
    font-weight: 600;
  }

  .timeline-note p {
    margin: 0;
    color: #8f8f8f;
    font-size: 12px;
    line-height: 1.6;
  }

  .training-block,
  .additional-note-block {
    margin-top: 34px;
    padding-top: 28px;
    border-top: 1px solid #292929;
  }

  .subsection-heading {
    margin-bottom: 18px;
  }

  .subsection-heading h3,
  .optional-heading h3 {
    margin: 0 0 7px;
    color: #eeeeee;
    font-size: 18px;
    font-weight: 600;
  }

  .optional-heading h2 {
    margin: 0;
    color: #eeeeee;
    font-size: clamp(20px, 2vw, 28px);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .subsection-heading p,
  .additional-note-block > p {
    max-width: 700px;
    margin: 0;
    color: #929292;
    font-size: 13px;
    line-height: 1.6;
  }

  .optional-heading {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
  }

  .optional-heading h3 {
    margin-bottom: 0;
  }

  .optional-heading span {
    color: #4f76ff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .additional-note-block textarea {
    width: 100%;
    min-height: 140px;
    margin-top: 14px;
    padding: 14px;
    resize: vertical;
    border: 1px solid #3a3a3a;
    border-radius: 0;
    background: #080808;
    color: #eeeeee;
    font-family: inherit;
    font-size: 14px;
    line-height: 1.55;
    box-sizing: border-box;
    outline: none;
  }

  .additional-note-block textarea:focus {
    border-color: #d0d0d0;
  }

  .review-features-panel {
    margin-top: 24px;
    padding: 18px;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 20px;
    align-items: center;
    border: 1px solid #303030;
    background: #0c0c0c;
  }

  .review-features-panel strong {
    display: block;
    margin-bottom: 6px;
    color: #eeeeee;
    font-size: 13px;
    font-weight: 600;
  }

  .review-features-panel p {
    max-width: 620px;
    margin: 0;
    color: #898989;
    font-size: 12px;
    line-height: 1.6;
  }

  .review-features-panel button {
    min-height: 46px;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid #d0d0d0;
    border-radius: 0;
    background: #0b0b0b;
    color: #4f76ff;
    font-family: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .review-features-panel button:hover {
    background: #111111;
  }

  .review-features-panel button:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 3px;
  }

  .internal-actions {
    min-height: 78px;
    padding-top: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    border-top: 1px solid #292929;
  }

  .previous-question-button,
  .next-question-button {
    min-height: 48px;
    padding: 0 17px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border-radius: 0;
    font-family: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .previous-question-button {
    border: 1px solid #3c3c3c;
    background: transparent;
    color: #b8b8b8;
  }

  .previous-question-button:hover {
    border-color: #d0d0d0;
  }

  .next-question-button {
    border: 1px solid #d0d0d0;
    background: #0c0c0c;
    color: #4f76ff;
  }

  .next-question-button:hover:not(:disabled) {
    background: #111111;
  }

  .next-question-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  .finish-message {
    min-height: 48px;
    padding: 0 15px;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #3c3c3c;
    background: #0c0c0c;
    color: #8d8d8d;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .finish-message > span:first-child {
    color: #0043ff;
  }

  .finish-action {
    width: 100%;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    border: 1px solid #3c3c3c;
    background: #0c0c0c;
    box-sizing: border-box;
  }

  .finish-action.complete {
    border-color: #0043ff;
  }

  .finish-copy {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    color: #8d8d8d;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.5;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .finish-copy > span:first-child {
    color: #0043ff;
    font-size: 14px;
  }

  .report-button {
    min-height: 48px;
    padding: 0 18px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    border: 1px solid #0043ff;
    border-radius: 0;
    background: #0043ff;
    color: #ffffff;
    font-family: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .report-button:hover:not(:disabled) {
    border-color: #1b56ff;
    background: #1b56ff;
  }

  .report-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  .report-button:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 3px;
  }

  .guidance-panel {
    align-self: start;
    position: sticky;
    top: 110px;
    border-top: 1px solid #303030;
  }

  .selection-summary,
  .recommendation {
    padding: 22px 0;
    border-bottom: 1px solid #292929;
  }

  .panel-label {
    display: block;
    margin-bottom: 12px;
    color: #777777;
    font-size: 12px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .summary-item {
    padding: 15px 0;
    border-top: 1px solid #242424;
  }

  .summary-item:first-of-type {
    border-top: 0;
  }

  .summary-item > span {
    display: block;
    margin-bottom: 7px;
    color: #707070;
    font-size: 9px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .summary-item strong {
    display: block;
    overflow-wrap: anywhere;
    color: #4f76ff;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.45;
    white-space: pre-wrap;
  }

  .empty-selection {
    color: #707070 !important;
    font-weight: 400 !important;
  }

  .selected-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .selected-list span {
    padding: 6px 8px;
    border: 1px solid #d0d0d0;
    background: #0c0c0c;
    color: #4f76ff;
    font-size: 10px;
    line-height: 1.3;
  }

  .recommendation {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
  }

  .recommendation p {
    margin: 0;
    color: #8a8a8a;
    font-size: 12px;
    line-height: 1.6;
  }

  .recommendation-mark {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 1px solid #d0d0d0;
    background: #0c0c0c;
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
  }

  @media (max-width: 1050px) {
    .step-layout {
      grid-template-columns: 1fr;
    }

    .guidance-panel {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      border-top: 0;
    }

    .selection-summary,
    .recommendation {
      padding: 20px;
      border: 1px solid #292929;
    }
  }

  @media (max-width: 700px) {
    .step-layout {
      gap: 32px;
      padding: 30px 0;
      scroll-margin-top: 90px;
    }

    .internal-stage-list {
      grid-template-columns: repeat(5, minmax(76px, 1fr));
      overflow-x: auto;
    }

    .stage-button {
      min-width: 88px;
      min-height: 68px;
      padding: 10px;
      grid-template-columns: 1fr;
      gap: 5px;
    }

    .stage-copy small {
      display: none;
    }

    .question-context {
      padding: 12px 0;
    }

    .timeline-section {
      min-height: 0;
      padding: 28px 0;
    }

    .option-grid,
    .training-grid {
      grid-template-columns: 1fr;
    }

    .selection-card,
    .training-card {
      min-height: 108px;
      padding: 17px;
    }

    .review-features-panel {
      grid-template-columns: 1fr;
    }

    .review-features-panel button {
      width: 100%;
    }

    .internal-actions {
      align-items: stretch;
      flex-direction: column-reverse;
    }

    .previous-question-button,
    .next-question-button,
    .finish-message {
      width: 100%;
      box-sizing: border-box;
    }

    .finish-action {
      align-items: stretch;
      flex-direction: column;
    }

    .finish-copy {
      justify-content: center;
      text-align: center;
    }

    .report-button {
      width: 100%;
    }

    .guidance-panel {
      grid-template-columns: 1fr;
    }

    .panel-label {
      font-size: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .internal-progress-track span,
    .selection-card,
    .training-card {
      transition: none;
    }
  }
</style>
