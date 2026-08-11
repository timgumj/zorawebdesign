<script>
  import {
    getConfiguratorContent,
    getRelevantGoals,
    getWebsiteTypeById,
  } from "$lib/data/website-configurator/configurator-data.js";

  let {
    language = "de",
    selectedWebsiteType = $bindable(""),
    selectedGoals = $bindable([]),
  } = $props();

  const content = $derived(getConfiguratorContent(language));
  const stepContent = $derived(content.steps.websiteType);

  /*
   * Display every website type immediately.
   * There is no longer a separate "Show other website types" section.
   */
  const websiteTypes = $derived(stepContent.options || []);

  const selectedWebsiteTypeOption = $derived(
    getWebsiteTypeById(selectedWebsiteType, language),
  );

  function selectWebsiteType(optionId) {
    if (selectedWebsiteType === optionId) return;

    selectedWebsiteType = optionId;

    /*
     * Every website type can have its own relevant goals.
     * When the website type changes, remove goals that are
     * not relevant to the newly selected website type.
     */
    const validGoalIds = getRelevantGoals(optionId, language).map(
      (goal) => goal.id,
    );

    selectedGoals = selectedGoals.filter((goalId) =>
      validGoalIds.includes(goalId),
    );
  }

  function handleSelectableKeydown(event, optionId) {
    if (event.key !== "Enter" && event.key !== " ") return;

    event.preventDefault();
    selectWebsiteType(optionId);
  }
</script>

<div class="step-layout">
  <div class="selection-area">
    <section class="option-group">
      <div class="option-grid" role="radiogroup" aria-label={stepContent.title}>
        {#each websiteTypes as option}
          <div
            class:selected={selectedWebsiteType === option.id}
            class="selection-card"
            role="radio"
            aria-checked={selectedWebsiteType === option.id}
            tabindex="0"
            onclick={() => selectWebsiteType(option.id)}
            onkeydown={(event) => handleSelectableKeydown(event, option.id)}
          >
            <div class="selection-indicator" aria-hidden="true">
              <span></span>
            </div>

            <div class="option-copy">
              <h3>{option.label}</h3>

              {#if option.description}
                <p>{option.description}</p>
              {/if}
            </div>
          </div>
        {/each}
      </div>
    </section>
  </div>

  <aside class="guidance-panel">
    <div class="selection-summary">
      <span class="panel-label">
        {stepContent.selectionLabel}
      </span>

      {#if selectedWebsiteTypeOption}
        <strong>{selectedWebsiteTypeOption.label}</strong>
        <p>{selectedWebsiteTypeOption.description}</p>
      {:else}
        <strong class="empty-selection">
          {stepContent.selectionEmpty}
        </strong>
      {/if}
    </div>

    <div class="recommendation">
      <span class="recommendation-mark" aria-hidden="true"> Z </span>

      <div>
        <span class="panel-label">
          {stepContent.recommendationLabel}
        </span>

        <p>{stepContent.recommendationText}</p>
      </div>
    </div>
  </aside>
</div>

<style>
  .step-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(240px, 300px);
    gap: clamp(28px, 4vw, 58px);
    padding: clamp(26px, 3.5vw, 44px) 0;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .selection-area {
    min-width: 0;
  }

  .option-group {
    width: 100%;
  }

  .option-grid {
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
    min-height: 84px;
    padding: 14px;
    border: 1px solid #292929;
    background: #0c0c0c;
    cursor: pointer;
    outline: none;
    box-sizing: border-box;
    transition:
      border-color 180ms ease,
      background 180ms ease,
      transform 180ms ease;
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

  .selection-indicator {
    display: grid;
    width: 16px;
    height: 16px;
    flex: 0 0 auto;
    place-items: center;
    margin-top: 2px;
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

  .option-copy {
    min-width: 0;
  }

  .option-copy h3 {
    margin: 0;
    color: #eeeeee;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.25;
    overflow-wrap: anywhere;
  }

  .option-copy p {
    display: -webkit-box;
    margin: 5px 0 0;
    overflow: hidden;
    color: #929292;
    font-size: 11px;
    line-height: 1.35;
    overflow-wrap: anywhere;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .selection-card.selected .option-copy h3 {
    color: #4f76ff;
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

  .selection-summary > strong {
    display: block;
    margin-bottom: 7px;
    color: #4f76ff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .selection-summary > p,
  .recommendation p {
    margin: 0;
    color: #8a8a8a;
    font-size: 11px;
    line-height: 1.55;
    overflow-wrap: anywhere;
  }

  .empty-selection {
    margin-bottom: 0 !important;
    color: #707070 !important;
    font-size: 11px !important;
    font-weight: 400 !important;
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
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #d0d0d0;
    background: #0c0c0c;
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
  }

  @media (max-width: 1050px) {
    .step-layout {
      grid-template-columns: 1fr;
      gap: 26px;
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

  @media (max-width: 760px) {
    .step-layout {
      gap: 22px;
      padding: 24px 0;
    }

    .option-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .selection-card {
      grid-template-columns: 1fr;
      gap: 9px;
      min-height: 88px;
      padding: 13px;
    }

    .selection-indicator {
      width: 15px;
      height: 15px;
      margin-top: 0;
    }

    .selection-indicator span {
      width: 5px;
      height: 5px;
    }

    .option-copy h3 {
      font-size: 13px;
    }

    .option-copy p {
      margin-top: 4px;
      font-size: 10px;
      line-height: 1.3;
    }

    .guidance-panel {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 420px) {
    .option-grid {
      gap: 7px;
    }

    .selection-card {
      min-height: 82px;
      padding: 11px;
    }

    .option-copy h3 {
      font-size: 12px;
    }

    .option-copy p {
      font-size: 9px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .selection-card,
    .selection-indicator span {
      transition: none;
    }
  }
</style>
