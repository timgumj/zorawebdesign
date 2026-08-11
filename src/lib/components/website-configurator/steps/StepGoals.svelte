<script>
  import {
    getConfiguratorContent,
    getGoalById,
    getProjectStatusById,
    getRecommendedGoalIds,
    getRelevantGoals,
    getWebsiteTypeById,
  } from "$lib/data/website-configurator/configurator-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    selectedGoals = $bindable([]),
    projectStatus = $bindable(""),
    goalsStage = $bindable("goals"),
    onContinue = () => {},
  } = $props();

  const content = $derived(getConfiguratorContent(language));
  const goalsContent = $derived(content.steps.goals);

  const relevantGoals = $derived(
    getRelevantGoals(selectedWebsiteType, language),
  );

  const recommendedGoalIds = $derived(
    getRecommendedGoalIds(selectedWebsiteType),
  );

  const selectedWebsiteTypeOption = $derived(
    getWebsiteTypeById(selectedWebsiteType, language),
  );

  const selectedGoalOptions = $derived(
    selectedGoals
      .map((goalId) => getGoalById(goalId, language))
      .filter(Boolean),
  );

  const selectedProjectStatus = $derived(
    getProjectStatusById(projectStatus, language),
  );

  const interfaceText = $derived(
    language === "de"
      ? {
          goalsStep: "Teil 1 von 2",
          statusStep: "Teil 2 von 2",
          continueToStatus: "Weiter zum Projektstatus",
          backToGoals: "Zurück zu den Zielen",
          selectGoalHint: "Wähle mindestens ein Ziel, um fortzufahren.",
          selectedCount: "Ausgewählt",
          recommendedGoals: "Für dein Projekt empfohlen",
          allGoals: "Weitere relevante Ziele",
        }
      : {
          goalsStep: "Part 1 of 2",
          statusStep: "Part 2 of 2",
          continueToStatus: "Continue to project status",
          backToGoals: "Back to goals",
          selectGoalHint: "Select at least one goal to continue.",
          selectedCount: "Selected",
          recommendedGoals: "Recommended for your project",
          allGoals: "More relevant goals",
        },
  );

  const recommendedGoals = $derived(
    relevantGoals.filter((goal) => recommendedGoalIds.includes(goal.id)),
  );

  const additionalGoals = $derived(
    relevantGoals.filter((goal) => !recommendedGoalIds.includes(goal.id)),
  );

  const canContinueToStatus = $derived(selectedGoals.length > 0);

  function toggleGoal(goalId) {
    if (selectedGoals.includes(goalId)) {
      selectedGoals = selectedGoals.filter(
        (selectedGoalId) => selectedGoalId !== goalId,
      );

      return;
    }

    selectedGoals = [...selectedGoals, goalId];
  }

  function selectProjectStatus(statusId) {
    projectStatus = statusId;
  }

  function showProjectStatus() {
    if (!canContinueToStatus) return;

    goalsStage = "status";

    requestAnimationFrame(() => {
      document.querySelector(".step-goals")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function finishStep() {
    if (!projectStatus) return;

    onContinue();
  }

  function showGoals() {
    goalsStage = "goals";

    requestAnimationFrame(() => {
      document.querySelector(".step-goals")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  }

  function handleSelectableKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    callback();
  }
</script>

<div class="step-goals">
  <div class="substep-navigation" aria-label="Question progress">
    <button
      type="button"
      class:active={goalsStage === "goals"}
      class:completed={selectedGoals.length > 0}
      class="substep-button"
      onclick={showGoals}
    >
      <span class="substep-number">01</span>

      <span>
        {goalsContent.goalsGroupLabel}
      </span>
    </button>

    <span class="substep-line" aria-hidden="true"></span>

    <button
      type="button"
      class:active={goalsStage === "status"}
      class:completed={Boolean(projectStatus)}
      class="substep-button"
      disabled={!canContinueToStatus}
      onclick={showProjectStatus}
    >
      <span class="substep-number">02</span>

      <span>
        {goalsContent.statusTitle}
      </span>
    </button>
  </div>

  <div class="step-layout">
    <main class="selection-area">
      {#if goalsStage === "goals"}
        <section class="question-panel" aria-labelledby="goal-options-heading">
          <header class="question-header">
            <div>
              <span class="question-stage">
                {interfaceText.goalsStep}
              </span>

              <h2 id="goal-options-heading">
                {goalsContent.goalsGroupLabel}
              </h2>

              <p>
                {goalsContent.multipleChoiceLabel}
              </p>
            </div>

            <div class="selection-count">
              <strong>{selectedGoals.length}</strong>
              <span>{interfaceText.selectedCount}</span>
            </div>
          </header>

          {#if recommendedGoals.length > 0}
            <div class="goal-section">
              <div class="section-label-row">
                <span class="section-label">
                  {interfaceText.recommendedGoals}
                </span>

                <span class="recommended-dot" aria-hidden="true"></span>
              </div>

              <div
                class="option-grid"
                role="group"
                aria-label={interfaceText.recommendedGoals}
              >
                {#each recommendedGoals as goal}
                  <div
                    class:selected={selectedGoals.includes(goal.id)}
                    class="selection-card goal-card recommended-card"
                    role="checkbox"
                    aria-checked={selectedGoals.includes(goal.id)}
                    tabindex="0"
                    onclick={() => toggleGoal(goal.id)}
                    onkeydown={(event) =>
                      handleSelectableKeydown(event, () => toggleGoal(goal.id))}
                  >
                    <div
                      class="selection-indicator checkbox-indicator"
                      aria-hidden="true"
                    >
                      <span></span>
                    </div>

                    <div class="option-copy">
                      <div class="option-title-row">
                        <h3>{goal.label}</h3>

                        <span class="recommended-badge">
                          {goalsContent.recommendedLabel}
                        </span>
                      </div>

                      {#if goal.description}
                        <p>{goal.description}</p>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          {#if additionalGoals.length > 0}
            <div class="goal-section additional-goals">
              <span class="section-label">
                {interfaceText.allGoals}
              </span>

              <div
                class="option-grid"
                role="group"
                aria-label={interfaceText.allGoals}
              >
                {#each additionalGoals as goal}
                  <div
                    class:selected={selectedGoals.includes(goal.id)}
                    class="selection-card goal-card"
                    role="checkbox"
                    aria-checked={selectedGoals.includes(goal.id)}
                    tabindex="0"
                    onclick={() => toggleGoal(goal.id)}
                    onkeydown={(event) =>
                      handleSelectableKeydown(event, () => toggleGoal(goal.id))}
                  >
                    <div
                      class="selection-indicator checkbox-indicator"
                      aria-hidden="true"
                    >
                      <span></span>
                    </div>

                    <div class="option-copy">
                      <h3>{goal.label}</h3>

                      {#if goal.description}
                        <p>{goal.description}</p>
                      {/if}
                    </div>
                  </div>
                {/each}
              </div>
            </div>
          {/if}

          <div class="internal-navigation">
            {#if !canContinueToStatus}
              <span class="internal-hint">
                {interfaceText.selectGoalHint}
              </span>
            {/if}

            <button
              type="button"
              class="internal-continue-button"
              disabled={!canContinueToStatus}
              onclick={showProjectStatus}
            >
              {interfaceText.continueToStatus}

              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      {:else}
        <section
          class="question-panel"
          aria-labelledby="project-status-heading"
        >
          <header class="question-header status-question-header">
            <div>
              <span class="question-stage">
                {interfaceText.statusStep}
              </span>

              <h2 id="project-status-heading">
                {goalsContent.statusTitle}
              </h2>

              <p>
                {goalsContent.statusDescription}
              </p>
            </div>
          </header>

          <div
            class="status-grid"
            role="radiogroup"
            aria-label={goalsContent.statusTitle}
          >
            {#each goalsContent.projectStatuses as status}
              <div
                class:selected={projectStatus === status.id}
                class="selection-card status-card"
                role="radio"
                aria-checked={projectStatus === status.id}
                tabindex="0"
                onclick={() => selectProjectStatus(status.id)}
                onkeydown={(event) =>
                  handleSelectableKeydown(event, () =>
                    selectProjectStatus(status.id),
                  )}
              >
                <div class="selection-indicator" aria-hidden="true">
                  <span></span>
                </div>

                <div class="option-copy">
                  <h3>{status.label}</h3>

                  {#if status.description}
                    <p>{status.description}</p>
                  {/if}
                </div>
              </div>
            {/each}
          </div>

          <div class="status-navigation">
            <button
              type="button"
              class="internal-back-button"
              onclick={showGoals}
            >
              <span aria-hidden="true">←</span>

              {interfaceText.backToGoals}
            </button>

            <div class="status-continue-area">
              {#if !projectStatus}
                <span class="internal-hint">
                  {interfaceText.selectStatusHint}
                </span>
              {/if}

              <button
                type="button"
                class="internal-continue-button"
                disabled={!projectStatus}
                onclick={finishStep}
              >
                {interfaceText.continue}
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </section>
      {/if}
    </main>

    <aside class="guidance-panel">
      <div class="selection-summary">
        <span class="panel-label">
          {goalsContent.summaryLabel}
        </span>

        <div class="summary-item">
          <span>
            {goalsContent.websiteTypeLabel}
          </span>

          <strong>
            {selectedWebsiteTypeOption?.label ?? "—"}
          </strong>
        </div>

        <div class="summary-item">
          <span>
            {goalsContent.selectedGoalsLabel}
          </span>

          {#if selectedGoalOptions.length > 0}
            <div class="selected-goal-list">
              {#each selectedGoalOptions as goal}
                <button
                  type="button"
                  onclick={() => toggleGoal(goal.id)}
                  aria-label={`Remove ${goal.label}`}
                >
                  <span>{goal.label}</span>
                  <span aria-hidden="true">×</span>
                </button>
              {/each}
            </div>
          {:else}
            <strong class="empty-selection">
              {goalsContent.selectedGoalsEmpty}
            </strong>
          {/if}
        </div>

        <div class="summary-item">
          <span>
            {goalsContent.projectStatusLabel}
          </span>

          <strong class:empty-selection={!selectedProjectStatus}>
            {selectedProjectStatus?.label ?? "—"}
          </strong>
        </div>
      </div>

      <div class="recommendation">
        <span class="recommendation-mark" aria-hidden="true"> Z </span>

        <div>
          <span class="panel-label">
            {goalsContent.recommendationLabel}
          </span>

          <p>
            {goalsContent.recommendationText}
          </p>
        </div>
      </div>
    </aside>
  </div>
</div>

<style>
  .step-goals {
    width: 100%;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .substep-navigation {
    display: grid;
    grid-template-columns: auto minmax(30px, 1fr) auto;
    align-items: center;
    gap: 14px;
    padding: 22px 0;
    border-bottom: 1px solid #292929;
  }

  .substep-button {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    padding: 0;
    border: 0;
    background: transparent;
    color: #666666;
    font-family: "DM Sans", Arial, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-align: left;
    text-transform: uppercase;
    cursor: pointer;
  }

  .substep-button:disabled {
    color: #464646;
    cursor: not-allowed;
  }

  .substep-button.active {
    color: #eeeeee;
  }

  .substep-button.completed:not(.active) {
    color: #8c8c8c;
  }

  .substep-number {
    display: grid;
    width: 25px;
    height: 25px;
    place-items: center;
    border: 1px solid #353535;
    color: inherit;
    font-size: 8px;
  }

  .substep-button.active .substep-number {
    border-color: #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .substep-button.completed:not(.active) .substep-number {
    border-color: #777777;
  }

  .substep-line {
    width: 100%;
    height: 1px;
    background: #292929;
  }

  .step-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 300px);
    gap: clamp(28px, 4vw, 58px);
    padding: clamp(28px, 4vw, 48px) 0;
  }

  .selection-area {
    min-width: 0;
  }

  .question-panel {
    width: 100%;
  }

  .question-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 24px;
  }

  .question-stage {
    display: block;
    margin-bottom: 10px;
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .question-header h2 {
    margin: 0 0 8px;
    color: #eeeeee;
    font-size: clamp(20px, 2.2vw, 29px);
    font-weight: 600;
    line-height: 1.15;
    letter-spacing: -0.025em;
  }

  .question-header p {
    max-width: 680px;
    margin: 0;
    color: #8d8d8d;
    font-size: 12px;
    line-height: 1.6;
  }

  .selection-count {
    display: flex;
    min-width: 74px;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 11px;
    border: 1px solid #303030;
    box-sizing: border-box;
  }

  .selection-count strong {
    color: #4f76ff;
    font-size: 19px;
    font-weight: 600;
    line-height: 1;
  }

  .selection-count span {
    margin-top: 5px;
    color: #777777;
    font-size: 7px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .goal-section + .goal-section {
    margin-top: 28px;
    padding-top: 24px;
    border-top: 1px solid #242424;
  }

  .section-label-row {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .section-label {
    display: block;
    margin-bottom: 11px;
    color: #777777;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .recommended-dot {
    width: 5px;
    height: 5px;
    margin-bottom: 11px;
    background: #0043ff;
  }

  .option-grid,
  .status-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 9px;
  }

  .selection-card {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
    gap: 11px;
    min-width: 0;
    min-height: 94px;
    padding: 14px;
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
    background: #0c0c0c;
  }

  .recommended-card {
    border-color: #343434;
  }

  .selection-indicator {
    position: relative;
    display: grid;
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    place-items: center;
    margin-top: 1px;
    border: 1px solid #626262;
    box-sizing: border-box;
  }

  .selection-indicator span {
    width: 6px;
    height: 6px;
    background: transparent;
    transition: background 180ms ease;
  }

  .selection-card.selected .selection-indicator {
    border-color: #d0d0d0;
  }

  .selection-card.selected .selection-indicator span {
    background: #0043ff;
  }

  .selection-card.selected .checkbox-indicator::after {
    content: "";
    position: absolute;
    z-index: 2;
    width: 6px;
    height: 3px;
    border-bottom: 1px solid #080808;
    border-left: 1px solid #080808;
    transform: rotate(-45deg);
  }

  .option-copy {
    min-width: 0;
  }

  .option-copy h3 {
    margin: 0;
    color: #eeeeee;
    font-size: 13px;
    font-weight: 600;
    line-height: 1.3;
    overflow-wrap: anywhere;
  }

  .option-copy p {
    display: -webkit-box;
    margin: 5px 0 0;
    overflow: hidden;
    color: #929292;
    font-size: 10px;
    line-height: 1.4;
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }

  .selection-card.selected .option-copy h3 {
    color: #4f76ff;
  }

  .option-title-row {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 6px;
  }

  .recommended-badge {
    display: inline-flex;
    width: fit-content;
    padding: 3px 5px;
    border: 1px solid #555555;
    color: #4f76ff;
    font-size: 7px;
    font-weight: 700;
    letter-spacing: 0.07em;
    line-height: 1;
    text-transform: uppercase;
  }

  .status-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .status-card {
    min-height: 100px;
  }

  .internal-navigation {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 18px;
    margin-top: 26px;
    padding-top: 22px;
    border-top: 1px solid #292929;
  }

  .internal-hint {
    color: #666666;
    font-size: 10px;
    line-height: 1.4;
    text-align: right;
  }

  .internal-continue-button,
  .internal-back-button {
    display: inline-flex;
    min-height: 46px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 18px;
    border-radius: 0;
    font-family: "DM Sans", Arial, sans-serif;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .internal-continue-button {
    border: 1px solid #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .internal-continue-button:hover:not(:disabled) {
    border-color: #1b56ff;
    background: #1b56ff;
  }

  .internal-continue-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  .status-navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #292929;
  }

  .status-continue-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 18px;
  }

  .internal-back-button {
    border: 1px solid #3b3b3b;
    background: transparent;
    color: #c4c4c4;
  }

  .internal-back-button:hover {
    border-color: #777777;
  }

  .guidance-panel {
    position: sticky;
    top: 110px;
    align-self: start;
    border-top: 1px solid #303030;
  }

  .selection-summary,
  .recommendation {
    padding: 20px 0;
    border-bottom: 1px solid #292929;
  }

  .panel-label {
    display: block;
    margin-bottom: 10px;
    color: #777777;
    font-size: 10px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .summary-item {
    padding: 13px 0;
    border-top: 1px solid #242424;
  }

  .summary-item:first-of-type {
    border-top: 0;
  }

  .summary-item > span {
    display: block;
    margin-bottom: 7px;
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
    line-height: 1.45;
  }

  .empty-selection {
    color: #707070 !important;
    font-weight: 400 !important;
  }

  .selected-goal-list {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .selected-goal-list button {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 7px;
    border: 1px solid #505050;
    background: #0c0c0c;
    color: #4f76ff;
    font-family: "DM Sans", Arial, sans-serif;
    font-size: 9px;
    line-height: 1.25;
    cursor: pointer;
  }

  .selected-goal-list button:hover {
    border-color: #888888;
  }

  .selected-goal-list button span:last-child {
    color: #8a8a8a;
    font-size: 12px;
  }

  .recommendation {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 12px;
  }

  .recommendation p {
    margin: 0;
    color: #8a8a8a;
    font-size: 11px;
    line-height: 1.55;
  }

  .recommendation-mark {
    display: grid;
    width: 28px;
    height: 28px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #d0d0d0;
    background: #0c0c0c;
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
  }

  @media (max-width: 1100px) {
    .option-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 950px) {
    .step-layout {
      grid-template-columns: 1fr;
      gap: 28px;
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
      min-width: 0;
      padding: 16px;
      border: 1px solid #292929;
    }
  }

  @media (max-width: 700px) {
    .substep-navigation {
      gap: 9px;
      padding: 18px 0;
    }

    .substep-button {
      gap: 6px;
      font-size: 8px;
    }

    .substep-number {
      width: 22px;
      height: 22px;
      font-size: 7px;
    }

    .step-layout {
      gap: 24px;
      padding: 26px 0;
    }

    .question-header {
      gap: 14px;
    }

    .question-header h2 {
      font-size: 21px;
    }

    .question-header p {
      font-size: 11px;
    }

    .selection-count {
      min-width: 62px;
      padding: 9px;
    }

    .option-grid,
    .status-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 7px;
    }

    .selection-card {
      grid-template-columns: 1fr;
      gap: 8px;
      min-height: 102px;
      padding: 12px;
    }

    .option-copy h3 {
      font-size: 12px;
    }

    .option-copy p {
      font-size: 9px;
      line-height: 1.35;
    }

    .recommended-badge {
      font-size: 6px;
    }

    .internal-navigation,
    .status-navigation {
      align-items: stretch;
      flex-direction: column;
    }

    .status-continue-area {
      width: 100%;
      align-items: stretch;
      flex-direction: column;
      gap: 10px;
    }

    .internal-hint {
      text-align: left;
    }

    .internal-continue-button,
    .internal-back-button {
      width: 100%;
    }

    .guidance-panel {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 420px) {
    .substep-button > span:last-child {
      max-width: 90px;
    }

    .selection-card {
      min-height: 96px;
      padding: 10px;
    }

    .option-copy h3 {
      font-size: 11px;
    }

    .option-copy p {
      font-size: 8px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .selection-card,
    .selection-indicator span {
      transition: none;
    }
  }
</style>
