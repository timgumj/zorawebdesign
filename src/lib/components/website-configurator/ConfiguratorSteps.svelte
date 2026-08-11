<script>
  import {
    CONFIGURATOR_TOTAL_QUESTION_STEPS,
    getConfiguratorContent,
  } from "$lib/data/website-configurator/configurator-data.js";

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
    onBack = () => {},
    onContinue = () => {},
  } = $props();

  let contentStage = $state("content");

  const content = $derived(getConfiguratorContent(language));

  const progressPercentage = $derived(
    Math.min(
      100,
      Math.max(0, (currentStep / CONFIGURATOR_TOTAL_QUESTION_STEPS) * 100),
    ),
  );

  const stepText = $derived(
    language === "en"
      ? {
          1: {
            eyebrow: content.steps.websiteType.eyebrow,
            title: content.steps.websiteType.title,
            description: content.steps.websiteType.description,
            back: content.steps.websiteType.backButton,
            continue: content.steps.websiteType.continueButton,
            disabled: content.steps.websiteType.continueDisabledHint,
          },
          2: {
            eyebrow: content.steps.goals.eyebrow,
            title: content.steps.goals.title,
            description: content.steps.goals.description,
            back: content.steps.goals.backButton,
            continue: content.steps.goals.continueButton,
            disabled: content.steps.goals.continueDisabledHint,
          },
          3: {
            eyebrow: "Project preparation",
            title: "How prepared is your content?",
            description:
              "Tell us what is already available and where you may need support.",
            back: "Back",
            continue: "Continue to pages",
            disabled:
              "Complete the required content questions before continuing.",
          },
          4: {
            eyebrow: "Website structure",
            title: "Which pages does your website need?",
            description:
              "Review the recommended structure and add the pages your project requires.",
            back: "Back",
            continue: "Continue to features",
            disabled:
              "Select at least one page and choose the approximate page volume.",
          },
          5: {
            eyebrow: "Website functionality",
            title: "Which features does your website need?",
            description:
              "Choose the functions, languages and integrations required for the project.",
            back: "Back",
            continue: "Continue to timeline",
            disabled:
              "Select at least one feature and choose the website languages.",
          },
          6: {
            eyebrow: "Timeline and support",
            title: "How should the project move forward?",
            description:
              "Define the timing, collaboration, support and training preferences.",
            back: "Back",
            continue: "View recommendation",
            disabled: "Complete the required timeline and support questions.",
          },
        }
      : {
          1: {
            eyebrow: content.steps.websiteType.eyebrow,
            title: content.steps.websiteType.title,
            description: content.steps.websiteType.description,
            back: content.steps.websiteType.backButton,
            continue: content.steps.websiteType.continueButton,
            disabled: content.steps.websiteType.continueDisabledHint,
          },
          2: {
            eyebrow: content.steps.goals.eyebrow,
            title: content.steps.goals.title,
            description: content.steps.goals.description,
            back: content.steps.goals.backButton,
            continue: content.steps.goals.continueButton,
            disabled: content.steps.goals.continueDisabledHint,
          },
          3: {
            eyebrow: "Projektvorbereitung",
            title: "Wie gut sind Ihre Inhalte vorbereitet?",
            description:
              "Zeigen Sie uns, was bereits vorhanden ist und wobei Sie Unterstützung benötigen.",
            back: "Zurück",
            continue: "Weiter zu den Seiten",
            disabled:
              "Bitte beantworten Sie zuerst alle erforderlichen Inhaltsfragen.",
          },
          4: {
            eyebrow: "Website-Struktur",
            title: "Welche Seiten benötigt Ihre Website?",
            description:
              "Prüfen Sie die empfohlene Struktur und ergänzen Sie die benötigten Seiten.",
            back: "Zurück",
            continue: "Weiter zu den Funktionen",
            disabled:
              "Wählen Sie mindestens eine Seite und den ungefähren Seitenumfang.",
          },
          5: {
            eyebrow: "Website-Funktionen",
            title: "Welche Funktionen benötigt Ihre Website?",
            description:
              "Wählen Sie Funktionen, Sprachen und Integrationen für Ihr Projekt.",
            back: "Zurück",
            continue: "Weiter zum Zeitplan",
            disabled:
              "Wählen Sie mindestens eine Funktion und die Website-Sprachen.",
          },
          6: {
            eyebrow: "Zeitplan und Betreuung",
            title: "Wie soll das Projekt umgesetzt werden?",
            description:
              "Definieren Sie Zeitrahmen, Zusammenarbeit, Betreuung und Schulung.",
            back: "Zurück",
            continue: "Empfehlung ansehen",
            disabled:
              "Bitte beantworten Sie die erforderlichen Fragen zu Zeitplan und Betreuung.",
          },
        },
  );

  const activeStepText = $derived(stepText[currentStep] ?? stepText[1]);

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
   * Steps 5 and 6 contain their own internal navigation buttons.
   * The shared footer is therefore shown only for Steps 1–4.
   */
  const showFooter = $derived(
    currentStep !== 5 &&
      currentStep !== 6 &&
      (currentStep !== 3 || contentStage === "support"),
  );

  /*
   * Configurator.svelte owns the main step number.
   * These handlers only ask the parent to move backward or forward.
   */
  function handleBack() {
    onBack();
  }

  function handleContinue() {
    if (!canContinue) return;

    onContinue();
  }
</script>

<section
  class="configurator-step"
  aria-labelledby={`configurator-step-${currentStep}-heading`}
>
  <div class="step-shell">
    <header class="step-header">
      <div class="progress-header">
        <span class="step-number">
          {language === "en"
            ? `Step ${currentStep} of ${CONFIGURATOR_TOTAL_QUESTION_STEPS}`
            : `Schritt ${currentStep} von ${CONFIGURATOR_TOTAL_QUESTION_STEPS}`}
        </span>

        <span class="progress-value">
          {Math.round(progressPercentage)}%
        </span>
      </div>

      <div
        class="progress-track"
        role="progressbar"
        aria-label={language === "en"
          ? `Step ${currentStep} progress`
          : `Fortschritt Schritt ${currentStep}`}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-valuenow={Math.round(progressPercentage)}
      >
        <span class="progress-fill" style={`width: ${progressPercentage}%`}
        ></span>
      </div>

      <div class="heading-block">
        <p class="eyebrow">{activeStepText.eyebrow}</p>

        <h1 id={`configurator-step-${currentStep}-heading`}>
          {activeStepText.title}
        </h1>

        <p class="description">
          {activeStepText.description}
        </p>
      </div>
    </header>

    <div class="step-content">
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
        />
      {:else if currentStep === 4}
        <StepPages
          {language}
          {selectedWebsiteType}
          bind:selectedPages
          bind:pageVolume
          bind:customPageNames
        />
      {:else if currentStep === 5}
        <StepFeatures
          {language}
          {selectedWebsiteType}
          bind:selectedFeatures
          bind:websiteLanguages
          bind:customIntegration
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
          onContinue={handleContinue}
        />
      {/if}
    </div>

    {#if showFooter}
      <footer class="step-footer">
        <button type="button" class="back-button" onclick={handleBack}>
          <span aria-hidden="true">←</span>
          {activeStepText.back}
        </button>

        <div class="continue-area">
          {#if !canContinue}
            <span class="disabled-hint">
              {activeStepText.disabled}
            </span>
          {/if}

          <button
            type="button"
            class="continue-button"
            disabled={!canContinue}
            onclick={handleContinue}
          >
            {activeStepText.continue}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </footer>
    {/if}
  </div>
</section>

<style>
  .configurator-step {
    width: 100%;
    min-height: calc(100vh - 180px);
    color: #f3f3f3;
    background: #080808;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .step-shell {
    width: 100%;
    margin: 0 auto;
  }

  .step-header {
    padding: 0 0 clamp(24px, 3vw, 38px);
    border-bottom: 1px solid #292929;
  }

  .progress-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 12px;
  }

  .step-number,
  .progress-value,
  .eyebrow {
    font-size: 10px;
    font-weight: 700;
    line-height: 1.3;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .step-number {
    color: #a0a0a0;
  }

  .progress-value {
    color: #0043ff;
  }

  .progress-track {
    position: relative;
    width: 100%;
    height: 2px;
    overflow: hidden;
    background: #272727;
  }

  .progress-fill {
    position: absolute;
    inset: 0 auto 0 0;
    height: 100%;
    background: #0043ff;
    transition: width 240ms ease;
  }

  .heading-block {
    width: 100%;
    padding-top: clamp(24px, 3vw, 38px);
  }

  .eyebrow {
    margin: 0 0 12px;
    color: #929292;
  }

  h1,
  p {
    font-family: "DM Sans", Arial, sans-serif;
  }

  h1 {
    width: 100%;
    margin: 0 0 12px;
    color: #f3f3f3;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 650;
    line-height: 1.05;
    letter-spacing: -0.04em;
  }

  .description {
    width: 100%;
    max-width: 900px;
    margin: 0;
    color: #a8a8a8;
    font-size: 14px;
    line-height: 1.65;
  }

  .step-content {
    width: 100%;
    padding: clamp(32px, 4vw, 56px) 0;
  }

  .step-footer {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 32px;
    padding-top: 24px;
    border-top: 1px solid #292929;
  }

  .back-button,
  .continue-button {
    display: inline-flex;
    min-height: 50px;
    align-items: center;
    justify-content: center;
    gap: 10px;
    padding: 0 22px;
    border-radius: 0;
    font-family: "DM Sans", Arial, sans-serif;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .back-button {
    border: 1px solid #3b3b3b;
    background: transparent;
    color: #c4c4c4;
  }

  .back-button:hover {
    border-color: #777777;
  }

  .continue-area {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 18px;
  }

  .disabled-hint {
    max-width: 280px;
    color: #666666;
    font-size: 10px;
    line-height: 1.45;
    text-align: right;
  }

  .continue-button {
    min-width: 145px;
    border: 1px solid #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .continue-button:hover:not(:disabled) {
    border-color: #1b56ff;
    background: #1b56ff;
  }

  .continue-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  .back-button:focus-visible,
  .continue-button:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    .step-header {
      padding-bottom: 26px;
    }

    h1 {
      font-size: clamp(25px, 8vw, 34px);
      line-height: 1.08;
    }

    .description {
      font-size: 13px;
    }

    .step-content {
      padding: 30px 0;
    }

    .step-footer {
      align-items: stretch;
      flex-direction: column-reverse;
      gap: 12px;
    }

    .continue-area {
      width: 100%;
      align-items: stretch;
      flex-direction: column;
      gap: 10px;
    }

    .disabled-hint {
      max-width: none;
      text-align: left;
    }

    .back-button,
    .continue-button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .progress-fill {
      transition: none;
    }
  }
</style>
