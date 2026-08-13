<script>
  import { getTimelineSupportContent } from "$lib/data/website-configurator/timeline-support-data.js";

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

  let screen = $state(1);

  const text = $derived(getTimelineSupportContent(language));

  const ui = $derived(
    language === "en"
      ? {
          stages: {
            start: "Start",
            launch: "Launch",
            collaboration: "Collaboration",
            support: "Support",
            training: "Training",
            final: "Final check",
          },

          optional: "Optional",

          startTitle: "When would you like the project to begin?",

          startText:
            "Choose the timeframe that best matches your current planning.",

          launchTitle: "When should the website be launched?",

          launchText:
            "Choose the approximate launch timeframe. This can be refined later.",

          collaborationTitle:
            "How would you like to manage the website after launch?",

          collaborationText:
            "Choose the working arrangement that best suits your team.",

          supportTitle: "What support would you like after launch?",

          supportText:
            "You can select more than one option. Choose only the support you are likely to need.",

          trainingTitle:
            "Would you like an introduction to managing the website?",

          trainingText:
            "Choose the type of training that would be most useful for you or your team.",

          finalTitle:
            "Is there anything else the website should be able to do?",

          finalText:
            "This final step is optional. Add anything that may not have been covered earlier.",

          timelineNoteTitle: "Anything important we should know?",

          timelineNoteText:
            "You can optionally add a deadline, internal approval date or other timing information.",

          finalNoteTitle: "Something else?",

          finalNoteText:
            "Describe another feature, integration or internal workflow if necessary.",

          reviewFeatures: "Review website features",

          reviewFeaturesText:
            "Return to Step 5 if you would like to change the functionality you selected earlier.",

          back: "Back",
          continue: "Continue",
          finish: "View recommendation",

          required: "Choose an option to continue.",
        }
      : {
          stages: {
            start: "Start",
            launch: "Launch",
            collaboration: "Zusammenarbeit",
            support: "Betreuung",
            training: "Schulung",
            final: "Letzter Check",
          },

          optional: "Optional",

          startTitle: "Wann möchten Sie mit dem Projekt beginnen?",

          startText:
            "Wählen Sie den Zeitraum, der am besten zu Ihrer aktuellen Planung passt.",

          launchTitle: "Wann soll die Website veröffentlicht werden?",

          launchText:
            "Wählen Sie einen ungefähren Zeitraum. Der genaue Termin kann später festgelegt werden.",

          collaborationTitle:
            "Wie möchten Sie die Website nach dem Launch betreuen?",

          collaborationText:
            "Wählen Sie die Arbeitsweise, die am besten zu Ihnen oder Ihrem Team passt.",

          supportTitle:
            "Welche Betreuung wünschen Sie nach der Veröffentlichung?",

          supportText:
            "Mehrere Antworten sind möglich. Wählen Sie nur die Unterstützung, die für Sie sinnvoll erscheint.",

          trainingTitle:
            "Möchten Sie eine Einführung in die Website-Verwaltung?",

          trainingText:
            "Wählen Sie die Form der Schulung, die für Sie oder Ihr Team am sinnvollsten wäre.",

          finalTitle: "Soll die Website noch etwas Zusätzliches können?",

          finalText:
            "Dieser letzte Schritt ist optional. Ergänzen Sie Anforderungen, die bisher noch nicht berücksichtigt wurden.",

          timelineNoteTitle: "Gibt es etwas Wichtiges zum Zeitplan?",

          timelineNoteText:
            "Optional können Sie einen Termin, eine interne Freigabe oder andere zeitliche Informationen ergänzen.",

          finalNoteTitle: "Noch etwas anderes?",

          finalNoteText:
            "Beschreiben Sie bei Bedarf eine weitere Funktion, Integration oder einen internen Ablauf.",

          reviewFeatures: "Website-Funktionen erneut prüfen",

          reviewFeaturesText:
            "Gehen Sie zurück zu Schritt 5, wenn Sie die zuvor gewählten Funktionen noch ändern möchten.",

          back: "Zurück",
          continue: "Weiter",
          finish: "Empfehlung ansehen",

          required: "Bitte wählen Sie eine Option.",
        },
  );

  const screenCount = 6;

  const canMoveForward = $derived(
    screen === 1
      ? Boolean(projectStart)
      : screen === 2
        ? Boolean(launchTimeline)
        : screen === 3
          ? Boolean(collaborationModel)
          : screen === 4
            ? ongoingSupport.length > 0
            : screen === 5
              ? Boolean(trainingPreference)
              : true,
  );

  function selectRadio(property, id) {
    if (property === "start") {
      projectStart = id;
      return;
    }

    if (property === "launch") {
      launchTimeline = id;
      return;
    }

    if (property === "collaboration") {
      collaborationModel = id;
      return;
    }

    if (property === "training") {
      trainingPreference = id;
    }
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

  function goForward() {
    if (!canMoveForward) {
      return;
    }

    if (screen < screenCount) {
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

    /*
     * On the first internal screen of Step 6,
     * Back returns to Step 5.
     */
    onReviewFeatures();
  }

  function handleKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    callback();
  }

  function getStartIcon(id) {
    const icons = {
      "start-immediately": "bolt",
      "start-one-month": "calendar-near",
      "start-one-three-months": "calendar",
      "start-three-six-months": "calendar-long",
      "start-later": "future",
      "start-unsure": "question",
    };

    return icons[id];
  }

  function getLaunchIcon(id) {
    const icons = {
      "launch-four-weeks": "rocket",
      "launch-one-two-months": "fast",
      "launch-two-four-months": "calendar",
      "launch-four-six-months": "calendar-long",
      "launch-flexible": "flexible",
      "launch-fixed-date": "deadline",
    };

    return icons[id];
  }

  function getCollaborationIcon(id) {
    const icons = {
      "collaboration-self-managed": "self",
      "collaboration-shared": "shared",
      "collaboration-managed": "managed",
      "collaboration-unsure": "question",
    };

    return icons[id];
  }

  function getSupportIcon(id) {
    const icons = {
      "support-technical-maintenance": "maintenance",
      "support-content-updates": "content",
      "support-performance": "performance",
      "support-seo": "seo",
      "support-analytics": "analytics",
      "support-priority": "priority",
      "support-none": "none",
      "support-unsure": "question",
    };

    return icons[id];
  }

  function getTrainingIcon(id) {
    const icons = {
      "training-personal": "personal",
      "training-video": "video",
      "training-both": "both",
      "training-none": "none",
      "training-unsure": "question",
    };

    return icons[id];
  }

  function getFinalIcon(id) {
    const icons = {
      "final-additional-forms": "form",
      "final-file-uploads": "upload",
      "final-search-filter": "search",
      "final-calendar": "calendar",
      "final-crm": "crm",
      "final-newsletter": "mail",
      "final-payments": "payment",
      "final-login": "login",
      "final-automated-emails": "automation-mail",
      "final-external-system": "integration",
      "final-ai-feature": "ai",
      "final-unsure": "question",
    };

    return icons[id];
  }
</script>

<div class="timeline-step">
  {#if screen === 1}
    <section class="question-panel" aria-labelledby="timeline-start-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.start} · 1 / 6
        </span>

        <h1 id="timeline-start-title">
          {ui.startTitle}
        </h1>

        <p>
          {ui.startText}
        </p>
      </header>

      <div class="option-grid" role="radiogroup" aria-label={ui.startTitle}>
        {#each text.startOptions as option}
          {@const selected = projectStart === option.id}
          {@const iconType = getStartIcon(option.id)}

          <div
            class="selection-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectRadio("start", option.id)}
            onkeydown={(event) =>
              handleKeydown(event, () => selectRadio("start", option.id))}
          >
            <div class="card-icon" aria-hidden="true">
              {#if iconType === "bolt"}
                <svg viewBox="0 0 48 48">
                  <path d="M27 5 12 27h11l-2 16 15-23H25l2-15Z" />
                </svg>
              {:else if iconType === "calendar-near"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="m17 28 4 4 10-10" />
                </svg>
              {:else if iconType === "calendar"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M15 25h5M24 25h5M33 25h2M15 31h5M24 31h5" />
                </svg>
              {:else if iconType === "calendar-long"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M14 25h20M14 31h20" />
                </svg>
              {:else if iconType === "future"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M24 14v11l8 5" />
                  <path d="m35 9 5 1-1 5" />
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
    <section class="question-panel" aria-labelledby="timeline-launch-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.launch} · 2 / 6
        </span>

        <h1 id="timeline-launch-title">
          {ui.launchTitle}
        </h1>

        <p>
          {ui.launchText}
        </p>
      </header>

      <div class="option-grid" role="radiogroup" aria-label={ui.launchTitle}>
        {#each text.launchOptions as option}
          {@const selected = launchTimeline === option.id}
          {@const iconType = getLaunchIcon(option.id)}

          <div
            class="selection-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectRadio("launch", option.id)}
            onkeydown={(event) =>
              handleKeydown(event, () => selectRadio("launch", option.id))}
          >
            <div class="card-icon" aria-hidden="true">
              {#if iconType === "rocket"}
                <svg viewBox="0 0 48 48">
                  <path
                    d="M28 7c6-2 10-1 13 0 1 3 2 7 0 13L27 34l-13-13L28 7Z"
                  />
                  <circle cx="32" cy="16" r="4" />
                  <path d="m14 21-7 2-2 8 11-1M27 34l-2 8-8 2 1-11" />
                  <path d="m13 35-5 5" />
                </svg>
              {:else if iconType === "fast"}
                <svg viewBox="0 0 48 48">
                  <circle cx="26" cy="25" r="15" />
                  <path d="M26 25 36 17" />
                  <path d="M10 11h10M6 18h10M5 26h7" />
                </svg>
              {:else if iconType === "calendar"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M14 25h20M14 31h14" />
                </svg>
              {:else if iconType === "calendar-long"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M14 25h5M22 25h5M30 25h5M14 31h5M22 31h5M30 31h5" />
                </svg>
              {:else if iconType === "flexible"}
                <svg viewBox="0 0 48 48">
                  <path d="M9 15h7c12 0 8 18 20 18h3" />
                  <path d="m34 28 5 5-5 5" />
                  <path d="M9 33h7c5 0 7-3 9-7" />
                  <path d="M28 15c2-1 4-1 8-1h3" />
                  <path d="m34 9 5 5-5 5" />
                </svg>
              {:else}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <circle cx="25" cy="29" r="6" />
                  <path d="M25 25v4l3 2" />
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

      <div class="info-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 10v6" />
          <path d="M12 7h.01" />
        </svg>

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
  {:else if screen === 3}
    <section
      class="question-panel"
      aria-labelledby="timeline-collaboration-title"
    >
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.collaboration} · 3 / 6
        </span>

        <h1 id="timeline-collaboration-title">
          {ui.collaborationTitle}
        </h1>

        <p>
          {ui.collaborationText}
        </p>
      </header>

      <div
        class="option-grid collaboration-grid"
        role="radiogroup"
        aria-label={ui.collaborationTitle}
      >
        {#each text.collaborationOptions as option}
          {@const selected = collaborationModel === option.id}
          {@const iconType = getCollaborationIcon(option.id)}

          <div
            class="selection-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectRadio("collaboration", option.id)}
            onkeydown={(event) =>
              handleKeydown(event, () =>
                selectRadio("collaboration", option.id),
              )}
          >
            <div class="card-icon" aria-hidden="true">
              {#if iconType === "self"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="15" r="6" />
                  <path d="M11 40c0-9 5-15 13-15s13 6 13 15" />
                  <path d="M35 8h6v6" />
                  <path d="m41 8-9 9" />
                </svg>
              {:else if iconType === "shared"}
                <svg viewBox="0 0 48 48">
                  <circle cx="16" cy="16" r="5" />
                  <circle cx="32" cy="16" r="5" />
                  <path d="M6 40c0-9 4-15 10-15s10 6 10 15" />
                  <path d="M22 40c0-9 4-15 10-15s10 6 10 15" />
                  <path d="M20 20h8" />
                </svg>
              {:else if iconType === "managed"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="14" r="6" />
                  <path d="M12 38c0-8 5-14 12-14s12 6 12 14" />
                  <path d="m34 28 4 4 7-9" />
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
  {:else if screen === 4}
    <section class="question-panel" aria-labelledby="timeline-support-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.support} · 4 / 6
        </span>

        <h1 id="timeline-support-title">
          {ui.supportTitle}
        </h1>

        <p>
          {ui.supportText}
        </p>
      </header>

      <div class="option-grid" role="group" aria-label={ui.supportTitle}>
        {#each text.supportOptions as option}
          {@const selected = ongoingSupport.includes(option.id)}
          {@const iconType = getSupportIcon(option.id)}

          <button
            type="button"
            class="selection-card"
            class:selected
            aria-pressed={selected}
            onclick={() => toggleSupport(option.id)}
          >
            <div class="card-icon" aria-hidden="true">
              {#if iconType === "maintenance"}
                <svg viewBox="0 0 48 48">
                  <path
                    d="M29 9a10 10 0 0 0-12 13L7 32l9 9 10-10a10 10 0 0 0 13-12l-7 7-6-6 7-7-4-4Z"
                  />
                </svg>
              {:else if iconType === "content"}
                <svg viewBox="0 0 48 48">
                  <path d="M10 6h21l7 7v29H10V6Z" />
                  <path d="M31 6v8h7" />
                  <path d="M16 21h16M16 27h16M16 33h10" />
                  <path d="m33 34 7-7" />
                </svg>
              {:else if iconType === "performance"}
                <svg viewBox="0 0 48 48">
                  <path d="M8 36a18 18 0 1 1 32 0" />
                  <path d="M24 29 34 18" />
                  <path d="M12 31h4M32 31h4M24 12v4" />
                </svg>
              {:else if iconType === "seo"}
                <svg viewBox="0 0 48 48">
                  <circle cx="19" cy="19" r="11" />
                  <path d="m27 27 12 12" />
                  <path d="M13 23v-7M19 23v-11M25 23v-4" />
                </svg>
              {:else if iconType === "analytics"}
                <svg viewBox="0 0 48 48">
                  <path d="M8 40V8M8 40h33" />
                  <path d="M14 33V23M22 33V14M30 33V19M38 33V10" />
                </svg>
              {:else if iconType === "priority"}
                <svg viewBox="0 0 48 48">
                  <path
                    d="m24 6 5.5 11.2L42 19l-9 8.8 2.1 12.4L24 34.3 12.9 40.2 15 27.8 6 19l12.5-1.8L24 6Z"
                  />
                </svg>
              {:else if iconType === "none"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M12 36 36 12" />
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
          </button>
        {/each}
      </div>
    </section>
  {:else if screen === 5}
    <section class="question-panel" aria-labelledby="timeline-training-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.training} · 5 / 6
        </span>

        <h1 id="timeline-training-title">
          {ui.trainingTitle}
        </h1>

        <p>
          {ui.trainingText}
        </p>
      </header>

      <div
        class="training-grid"
        role="radiogroup"
        aria-label={ui.trainingTitle}
      >
        {#each text.trainingOptions as option}
          {@const selected = trainingPreference === option.id}
          {@const iconType = getTrainingIcon(option.id)}

          <div
            class="selection-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectRadio("training", option.id)}
            onkeydown={(event) =>
              handleKeydown(event, () => selectRadio("training", option.id))}
          >
            <div class="card-icon" aria-hidden="true">
              {#if iconType === "personal"}
                <svg viewBox="0 0 48 48">
                  <circle cx="17" cy="15" r="5" />
                  <path d="M7 38c0-8 4-13 10-13s10 5 10 13" />
                  <rect x="28" y="10" width="13" height="18" />
                  <path d="M31 15h7M31 20h7" />
                </svg>
              {:else if iconType === "video"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="9" width="34" height="30" />
                  <path d="m20 17 12 7-12 7V17Z" />
                </svg>
              {:else if iconType === "both"}
                <svg viewBox="0 0 48 48">
                  <circle cx="15" cy="15" r="5" />
                  <path d="M6 38c0-8 3-13 9-13s9 5 9 13" />
                  <rect x="27" y="10" width="15" height="24" />
                  <path d="m32 17 6 4-6 4v-8Z" />
                </svg>
              {:else if iconType === "none"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M12 36 36 12" />
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

      <div class="note-block">
        <div class="note-heading">
          <div>
            <h2>
              {ui.timelineNoteTitle}
            </h2>

            <p>
              {ui.timelineNoteText}
            </p>
          </div>

          <span>
            {ui.optional}
          </span>
        </div>

        <textarea
          rows="4"
          maxlength="700"
          placeholder={text.additionalNotePlaceholder}
          value={timelineNote}
          oninput={(event) => {
            timelineNote = event.currentTarget.value;
          }}
        ></textarea>
      </div>
    </section>
  {:else}
    <section class="question-panel" aria-labelledby="timeline-final-title">
      <header class="question-header">
        <span class="substep-label">
          {ui.stages.final} · 6 / 6 · {ui.optional}
        </span>

        <h1 id="timeline-final-title">
          {ui.finalTitle}
        </h1>

        <p>
          {ui.finalText}
        </p>
      </header>

      <div class="final-grid" role="group" aria-label={ui.finalTitle}>
        {#each text.finalRequirementOptions as option}
          {@const selected = finalFeatureAdditions.includes(option.id)}

          {@const iconType = getFinalIcon(option.id)}

          <button
            type="button"
            class="selection-card final-card"
            class:selected
            aria-pressed={selected}
            onclick={() => toggleFinalRequirement(option.id)}
          >
            <div class="card-icon" aria-hidden="true">
              {#if iconType === "form"}
                <svg viewBox="0 0 48 48">
                  <rect x="9" y="6" width="30" height="36" />
                  <path d="M15 15h18M15 22h18M15 29h10" />
                  <path d="m29 33 3 3 6-7" />
                </svg>
              {:else if iconType === "upload"}
                <svg viewBox="0 0 48 48">
                  <path d="M8 34v7h32v-7" />
                  <path d="M24 33V8" />
                  <path d="m16 16 8-8 8 8" />
                </svg>
              {:else if iconType === "search"}
                <svg viewBox="0 0 48 48">
                  <circle cx="19" cy="19" r="11" />
                  <path d="m27 27 12 12" />
                  <path d="M13 19h12M19 13v12" />
                </svg>
              {:else if iconType === "calendar"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M15 25h6v6h-6zM27 25h6v6h-6z" />
                </svg>
              {:else if iconType === "crm"}
                <svg viewBox="0 0 48 48">
                  <circle cx="14" cy="16" r="5" />
                  <circle cx="34" cy="16" r="5" />
                  <circle cx="24" cy="34" r="5" />
                  <path d="M18 19 21 30M30 19 27 30M19 16h10" />
                </svg>
              {:else if iconType === "mail"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="11" width="34" height="26" />
                  <path d="m8 14 16 13 16-13" />
                </svg>
              {:else if iconType === "payment"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="12" width="34" height="24" />
                  <path d="M7 19h34M13 29h8" />
                  <path d="m30 27 3 3 6-7" />
                </svg>
              {:else if iconType === "login"}
                <svg viewBox="0 0 48 48">
                  <path d="M22 8h18v32H22" />
                  <path d="M7 24h22" />
                  <path d="m22 17 7 7-7 7" />
                </svg>
              {:else if iconType === "automation-mail"}
                <svg viewBox="0 0 48 48">
                  <rect x="11" y="14" width="26" height="20" />
                  <path d="m12 16 12 10 12-10" />
                  <path d="M36 9h5v5M12 39H7v-5" />
                  <path d="M39 14a16 16 0 0 0-5-7M9 34a16 16 0 0 0 5 7" />
                </svg>
              {:else if iconType === "integration"}
                <svg viewBox="0 0 48 48">
                  <path d="M18 10h-8v8M30 38h8v-8" />
                  <path d="M10 18c1-6 5-10 11-11M38 30c-1 6-5 10-11 11" />
                  <rect x="17" y="17" width="14" height="14" />
                </svg>
              {:else if iconType === "ai"}
                <svg viewBox="0 0 48 48">
                  <rect x="10" y="10" width="28" height="28" />
                  <path d="M16 24h16M24 16v16" />
                  <circle cx="17" cy="17" r="2" />
                  <circle cx="31" cy="31" r="2" />
                  <path d="M5 18h5M5 30h5M38 18h5M38 30h5" />
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
          </button>
        {/each}
      </div>

      <div class="note-block">
        <div class="note-heading">
          <div>
            <h2>
              {ui.finalNoteTitle}
            </h2>

            <p>
              {ui.finalNoteText}
            </p>
          </div>

          <span>
            {ui.optional}
          </span>
        </div>

        <textarea
          rows="4"
          maxlength="700"
          placeholder={text.finalRequirementNotePlaceholder}
          value={finalRequirementNote}
          oninput={(event) => {
            finalRequirementNote = event.currentTarget.value;
          }}
        ></textarea>
      </div>

      <div class="review-features">
        <div class="review-icon">
          <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M7 8h18v16H7V8Z" />
            <path d="M11 13h10M11 18h7" />
            <path d="m5 16-3 3 3 3" />
          </svg>
        </div>

        <div class="review-copy">
          <strong>
            {ui.reviewFeatures}
          </strong>

          <p>
            {ui.reviewFeaturesText}
          </p>
        </div>

        <button type="button" onclick={onReviewFeatures}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {text.reviewFeaturesButton}
          </span>
        </button>
      </div>
    </section>
  {/if}

  <div class="internal-navigation">
    <button type="button" class="back-button" onclick={goBack}>
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path d="M11.75 4.75 6.5 10l5.25 5.25" />
      </svg>

      <span>
        {ui.back}
      </span>
    </button>

    <div class="continue-area">
      {#if !canMoveForward}
        <span class="hint">
          {ui.required}
        </span>
      {/if}

      <button
        type="button"
        class="continue-button"
        disabled={!canMoveForward}
        onclick={goForward}
      >
        <span>
          {screen === screenCount ? ui.finish : ui.continue}
        </span>

        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
  .timeline-step {
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
    max-width: 920px;

    margin: 0 0 6px;

    color: var(--step-text);

    font-size: clamp(26px, 2.5vw, 36px);

    font-weight: 600;

    line-height: 1.08;

    letter-spacing: -0.035em;

    text-wrap: balance;
  }

  .question-header p {
    max-width: 760px;

    margin: 0;

    color: var(--step-copy);

    font-size: 12px;

    line-height: 1.45;
  }

  .option-grid,
  .training-grid,
  .final-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 9px;
  }

  .collaboration-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .selection-card {
    position: relative;

    display: flex;

    width: 100%;

    min-width: 0;
    min-height: 150px;

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

  button.selection-card {
    appearance: none;
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

  .card-icon {
    display: grid;

    width: 45px;
    height: 45px;

    place-items: center;

    margin-bottom: 11px;

    color: var(--step-text);
  }

  .card-icon svg {
    width: 39px;
    height: 39px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.45;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .selection-card.selected .card-icon {
    color: var(--step-accent);
  }

  .option-copy {
    width: 100%;

    min-width: 0;

    padding-right: 25px;
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
    -webkit-line-clamp: 3;
  }

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

  .info-note {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 11px;

    align-items: start;

    margin-top: 12px;

    padding: 12px 14px;

    border: 1px solid var(--step-border);

    background: var(--step-card);
  }

  .info-note > svg {
    width: 21px;
    height: 21px;

    margin-top: 1px;

    fill: none;

    stroke: var(--step-accent);

    stroke-width: 1.5;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .info-note strong {
    display: block;

    margin-bottom: 3px;

    color: var(--step-text);

    font-size: 10px;
    font-weight: 600;
  }

  .info-note p {
    max-width: 720px;

    margin: 0;

    color: var(--step-copy);

    font-size: 9.5px;

    line-height: 1.45;
  }

  .note-block {
    margin-top: 20px;

    padding-top: 18px;

    border-top: 1px solid var(--step-border);
  }

  .note-heading {
    display: flex;

    align-items: flex-start;
    justify-content: space-between;

    gap: 20px;

    margin-bottom: 10px;
  }

  .note-heading h2 {
    margin: 0 0 4px;

    color: var(--step-text);

    font-size: 14px;
    font-weight: 600;

    line-height: 1.3;
  }

  .note-heading p {
    max-width: 680px;

    margin: 0;

    color: var(--step-copy);

    font-size: 10px;

    line-height: 1.45;
  }

  .note-heading > span {
    flex: 0 0 auto;

    color: var(--step-accent);

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .note-block textarea {
    width: 100%;

    min-height: 100px;

    padding: 12px 13px;

    resize: vertical;

    border: 1px solid var(--step-border);

    border-radius: 0;

    background: var(--step-card);

    color: var(--step-text);

    font-family: inherit;

    font-size: 11px;

    line-height: 1.5;

    outline: none;

    box-sizing: border-box;
  }

  .note-block textarea:focus {
    border-color: var(--step-accent);
  }

  .note-block textarea::placeholder {
    color: #595959;
  }

  .review-features {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr)
      auto;

    gap: 13px;

    align-items: center;

    margin-top: 12px;

    padding: 13px;

    border: 1px solid var(--step-border);

    background: var(--step-card);
  }

  .review-icon {
    display: grid;

    width: 34px;
    height: 34px;

    place-items: center;

    color: var(--step-accent);
  }

  .review-icon svg {
    width: 28px;
    height: 28px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.4;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .review-copy strong {
    display: block;

    margin-bottom: 3px;

    color: var(--step-text);

    font-size: 10px;
    font-weight: 600;
  }

  .review-copy p {
    max-width: 620px;

    margin: 0;

    color: var(--step-copy);

    font-size: 9px;

    line-height: 1.4;
  }

  .review-features button {
    display: inline-flex;

    min-height: 38px;

    align-items: center;
    justify-content: center;

    gap: 6px;

    padding: 0 11px;

    border: 1px solid var(--step-border-hover);

    border-radius: 0;

    background: transparent;

    color: #bdbdbd;

    font-family: inherit;

    font-size: 8px;
    font-weight: 650;

    cursor: pointer;
  }

  .review-features button:hover {
    border-color: #777777;

    color: #ffffff;
  }

  .review-features button svg {
    width: 14px;
    height: 14px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

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
  .back-button:focus-visible,
  .review-features button:focus-visible {
    outline: 2px solid var(--step-accent);

    outline-offset: 3px;
  }

  @media (max-width: 1100px) {
    .option-grid,
    .training-grid,
    .final-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 620px) {
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
    .training-grid,
    .final-grid,
    .collaboration-grid {
      grid-template-columns: 1fr;

      gap: 7px;
    }

    .selection-card {
      min-height: 128px;

      padding: 14px;
    }

    .card-icon {
      width: 42px;
      height: 42px;

      margin-bottom: 9px;
    }

    .card-icon svg {
      width: 36px;
      height: 36px;
    }

    .selection-state {
      top: 13px;
      right: 13px;

      width: 18px;
      height: 18px;
    }

    .note-heading {
      flex-direction: column;

      gap: 5px;
    }

    .review-features {
      grid-template-columns:
        auto
        minmax(0, 1fr);
    }

    .review-features button {
      grid-column: 1 / -1;

      width: 100%;
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

  @media (prefers-reduced-motion: reduce) {
    .selection-card,
    .continue-button {
      transition: none;
    }
  }
</style>
