<script>
  import { CONFIGURATOR_TOTAL_QUESTION_STEPS } from "$lib/data/website-configurator/configurator-data.js";

  import StepWebsiteType from "./steps/StepWebsiteType.svelte";
  import StepGoals from "./steps/StepGoals.svelte";
  import StepContent from "./steps/StepContent.svelte";
  import StepPages from "./steps/StepPages.svelte";
  import StepFeatures from "./steps/StepFeatures.svelte";
  import StepTimeline from "./steps/StepTimeline.svelte";

  let {
    language = "de",

    currentStep = 1,

    selectedWebsiteType = $bindable(""),
    selectedGoals = $bindable([]),
    projectStatus = $bindable(""),

    contentReadiness = $bindable(""),
    visualReadiness = $bindable(""),
    brandingReadiness = $bindable(""),
    designDirection = $bindable(""),
    designReferenceLinks = $bindable(["", ""]),
    supportNeeds = $bindable([]),

    selectedPages = $bindable([]),
    pageVolume = $bindable(""),
    customPageNames = $bindable(["", "", ""]),

    selectedFeatures = $bindable([]),
    websiteLanguages = $bindable(""),
    customIntegration = $bindable(""),

    projectStart = $bindable(""),
    launchTimeline = $bindable(""),
    collaborationModel = $bindable(""),
    ongoingSupport = $bindable([]),
    trainingPreference = $bindable(""),
    timelineNote = $bindable(""),

    finalFeatureAdditions = $bindable([]),
    finalRequirementNote = $bindable(""),

    onReviewFeatures = () => {},
    onSubstepChange = () => {},
    onBack = () => {},
    onContinue = () => {},
  } = $props();

  /*
   * Step 3 contains its own internal sequence.
   */
  let contentStage = $state("content");

  const ui = $derived(
    language === "en"
      ? {
          back: "Back",

          continueLabels: {
            1: "Continue",
            2: "Continue",
            3: "Continue to pages",
            4: "Continue to features",
          },

          disabledLabels: {
            1: "Choose one option to continue.",
            2: "Complete both questions to continue.",
            3: "Complete the required questions to continue.",
            4: "Choose your pages and project size to continue.",
          },
        }
      : {
          back: "Zurück",

          continueLabels: {
            1: "Weiter",
            2: "Weiter",
            3: "Weiter zu den Seiten",
            4: "Weiter zu den Funktionen",
          },

          disabledLabels: {
            1: "Wählen Sie eine Option aus.",
            2: "Beantworten Sie beide Fragen.",
            3: "Beantworten Sie die erforderlichen Fragen.",
            4: "Wählen Sie Seiten und Projektumfang aus.",
          },
        },
  );

  const canContinue = $derived(
    currentStep === 1
      ? Boolean(selectedWebsiteType)
      : currentStep === 2
        ? selectedGoals.length > 0 && Boolean(projectStatus)
        : currentStep === 3
          ? Boolean(
              contentStage === "support" &&
                contentReadiness &&
                visualReadiness &&
                brandingReadiness &&
                designDirection,
            )
          : currentStep === 4
            ? selectedPages.length > 0 && Boolean(pageVolume)
            : currentStep === 5
              ? selectedFeatures.length > 0 && Boolean(websiteLanguages)
              : currentStep === 6
                ? Boolean(
                    projectStart &&
                      launchTimeline &&
                      collaborationModel &&
                      ongoingSupport.length > 0 &&
                      trainingPreference,
                  )
                : false,
  );

  /*
   * Steps 5 and 6 contain their own navigation.
   *
   * Step 3 manages its own internal navigation until
   * the final support stage.
   */
  const showFooter = $derived(
    currentStep !== 2 &&
      currentStep !== 4 &&
      currentStep !== 5 &&
      currentStep !== 6 &&
      (currentStep !== 3 || contentStage === "support"),
  );

  const continueLabel = $derived(ui.continueLabels[currentStep] ?? "");

  const disabledLabel = $derived(ui.disabledLabels[currentStep] ?? "");

  function handleBack() {
    onBack();
  }

  function handleContinue() {
    if (!canContinue) {
      return;
    }

    onContinue();
  }
</script>

<section class="configurator-step">
  <div class="step-shell">
    <!-- =====================================================
         ACTUAL QUESTION

         No secondary progress.
         No secondary header.
         No 01 / 06.
         No duplicate explanatory heading.
    ====================================================== -->

    <main class="step-content">
      {#if currentStep === 1}
        <StepWebsiteType
          {language}
          bind:selectedWebsiteType
          bind:selectedGoals
        />
      {:else if currentStep === 2}
        <StepGoals
          {language}
          {selectedWebsiteType}
          bind:selectedGoals
          bind:projectStatus
          {onSubstepChange}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      {:else if currentStep === 3}
        <StepContent
          {language}
          {selectedWebsiteType}
          bind:contentReadiness
          bind:visualReadiness
          bind:brandingReadiness
          bind:designDirection
          bind:designReferenceLinks
          bind:supportNeeds
          bind:contentStage
          {onSubstepChange}
        />
      {:else if currentStep === 4}
        <StepPages
          {language}
          {selectedWebsiteType}
          bind:selectedPages
          bind:pageVolume
          bind:customPageNames
          {onSubstepChange}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      {:else if currentStep === 5}
        <StepFeatures
          <StepFeatures
          {language}
          {selectedWebsiteType}
          bind:selectedFeatures
          bind:websiteLanguages
          bind:customIntegration
          {onSubstepChange}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      {:else if currentStep === 6}
        <StepTimeline
          {language}
          bind:projectStart
          bind:launchTimeline
          bind:collaborationModel
          bind:ongoingSupport
          bind:trainingPreference
          bind:timelineNote
          bind:finalFeatureAdditions
          bind:finalRequirementNote
          {onReviewFeatures}
          {onSubstepChange}
          onContinue={handleContinue}
        />
      {/if}
    </main>

    <!-- =====================================================
         SIMPLE SHARED NAVIGATION
    ====================================================== -->

    {#if showFooter}
      <footer class="step-footer">
        <button type="button" class="back-button" onclick={handleBack}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {ui.back}
          </span>
        </button>

        <div class="continue-area">
          {#if !canContinue && disabledLabel}
            <span class="disabled-hint">
              {disabledLabel}
            </span>
          {/if}

          <button
            type="button"
            class="continue-button"
            disabled={!canContinue}
            onclick={handleContinue}
          >
            <span>
              {continueLabel}
            </span>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
            </svg>
          </button>
        </div>
      </footer>
    {/if}
  </div>
</section>

<style>
  /* =========================================================
     THEME
     LIGHT MODE DEFAULT
  ========================================================= */

  .configurator-step {
    --planner-text: #111111;
    --planner-text-soft: #666666;
    --planner-text-muted: #929292;

    --planner-border: #deded9;

    --planner-accent: #0043ff;
    --planner-accent-hover: #173fff;

    --planner-disabled-bg: #eeeeeb;
    --planner-disabled-text: #9d9d98;

    width: 100%;
    min-height: 0;

    margin: 0;
    padding: 0;

    color: var(--planner-text);

    background: transparent;

    font-family: "DM Sans", Arial, sans-serif;

    box-sizing: border-box;
  }

  :global(html[data-theme="dark"]) .configurator-step {
    --planner-text: #f4f4f4;
    --planner-text-soft: #9b9b9b;
    --planner-text-muted: #686868;

    --planner-border: #292929;

    --planner-accent: #0043ff;
    --planner-accent-hover: #1b56ff;

    --planner-disabled-bg: #151515;
    --planner-disabled-text: #555555;
  }

  /* =========================================================
     FULL WIDTH

     Uses the complete width of the parent page container.
  ========================================================= */

  .step-shell {
    width: 100%;
    max-width: none;

    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  /* =========================================================
     CONTENT

     Deliberately no top margin.
     The question starts immediately below the global header.
  ========================================================= */

  .step-content {
    width: 100%;
    min-width: 0;

    margin: 0;
    padding: 0;

    box-sizing: border-box;
  }

  /* =========================================================
     FOOTER

     Keep this compact to save vertical space.
  ========================================================= */

  .step-footer {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;

    margin-top: clamp(22px, 3vw, 32px);

    padding-top: 16px;

    border-top: 1px solid var(--planner-border);
  }

  .continue-area {
    display: flex;

    align-items: center;
    justify-content: flex-end;

    gap: 14px;
  }

  /* =========================================================
     BUTTONS
  ========================================================= */

  .back-button,
  .continue-button {
    display: inline-flex;

    min-height: 44px;

    align-items: center;
    justify-content: center;

    gap: 8px;

    padding: 0 16px;

    border-radius: 0;

    font-family: inherit;

    font-size: 10px;
    font-weight: 650;

    line-height: 1;

    cursor: pointer;

    box-sizing: border-box;

    transition:
      border-color 160ms ease,
      background 160ms ease,
      color 160ms ease,
      opacity 160ms ease;
  }

  .back-button svg,
  .continue-button svg {
    width: 16px;
    height: 16px;

    flex: 0 0 auto;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* =========================================================
     BACK
  ========================================================= */

  .back-button {
    padding-left: 2px;

    border: 0;

    background: transparent;

    color: var(--planner-text-soft);
  }

  .back-button:hover {
    color: var(--planner-text);
  }

  /* =========================================================
     CONTINUE
  ========================================================= */

  .continue-button {
    min-width: 150px;

    border: 1px solid var(--planner-accent);

    background: var(--planner-accent);

    color: #ffffff;
  }

  .continue-button:hover:not(:disabled) {
    border-color: var(--planner-accent-hover);

    background: var(--planner-accent-hover);
  }

  .continue-button:disabled {
    border-color: var(--planner-border);

    background: var(--planner-disabled-bg);

    color: var(--planner-disabled-text);

    cursor: default;
  }

  /* =========================================================
     DISABLED HINT
  ========================================================= */

  .disabled-hint {
    max-width: 220px;

    color: var(--planner-text-muted);

    font-size: 9px;

    line-height: 1.35;

    text-align: right;
  }

  /* =========================================================
     FOCUS
  ========================================================= */

  .back-button:focus-visible,
  .continue-button:focus-visible {
    outline: 2px solid var(--planner-accent);

    outline-offset: 3px;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 950px) {
    .step-footer {
      margin-top: 24px;

      padding-top: 15px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 700px) {
    .step-footer {
      align-items: stretch;

      flex-direction: column-reverse;

      gap: 8px;

      margin-top: 22px;

      padding-top: 14px;
    }

    .continue-area {
      width: 100%;

      align-items: stretch;

      flex-direction: column;

      gap: 7px;
    }

    .disabled-hint {
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

      padding: 0 2px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .back-button,
    .continue-button {
      transition: none;
    }
  }
</style>
