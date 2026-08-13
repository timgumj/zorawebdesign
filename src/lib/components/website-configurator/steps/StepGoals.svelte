<script>
  import {
    getConfiguratorContent,
    getRelevantGoals,
  } from "$lib/data/website-configurator/configurator-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    selectedGoals = $bindable([]),
    projectStatus = $bindable(""),
    goalsStage = $bindable("goals"),
    onBack = () => {},
    onContinue = () => {},
  } = $props();

  const content = $derived(getConfiguratorContent(language));

  const goalsContent = $derived(content.steps.goals);

  const relevantGoals = $derived(
    getRelevantGoals(selectedWebsiteType, language),
  );

  const interfaceText = $derived(
    language === "en"
      ? {
          goalsProgress: "Goals",
          statusProgress: "Project status",

          goalsQuestion: "What should your website achieve?",

          goalsDescription:
            "Select all goals that are important for your project.",

          statusQuestion: goalsContent.statusTitle,

          statusDescription: goalsContent.statusDescription,

          continue: "Continue",
          back: "Back",

          goalsHint: "Select at least one goal to continue.",

          statusHint: "Choose the current status of your project.",
        }
      : {
          goalsProgress: "Ziele",
          statusProgress: "Projektstatus",

          goalsQuestion: "Was soll Ihre Website erreichen?",

          goalsDescription:
            "Wählen Sie alle Ziele aus, die für Ihr Projekt wichtig sind.",

          statusQuestion: goalsContent.statusTitle,

          statusDescription: goalsContent.statusDescription,

          continue: "Weiter",
          back: "Zurück",

          goalsHint: "Wählen Sie mindestens ein Ziel aus.",

          statusHint: "Wählen Sie den aktuellen Stand Ihres Projekts.",
        },
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
    if (!canContinueToStatus) {
      return;
    }

    goalsStage = "status";
  }

  function showGoals() {
    goalsStage = "goals";
  }

  function finishStep() {
    if (!projectStatus) {
      return;
    }

    onContinue();
  }

  function handleSelectableKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    callback();
  }
</script>

<div class="step-goals">
  {#if goalsStage === "goals"}
    <section class="question-panel" aria-labelledby="goals-question-heading">
      <!-- ===================================================
           QUESTION
      ==================================================== -->

      <header class="question-header">
        <span class="substep-label">
          {interfaceText.goalsProgress}
          · 1 / 2
        </span>

        <h1 id="goals-question-heading">
          {interfaceText.goalsQuestion}
        </h1>

        <p>
          {interfaceText.goalsDescription}
        </p>
      </header>

      <!-- ===================================================
           GOALS
      ==================================================== -->

      <div
        class="option-grid"
        role="group"
        aria-label={interfaceText.goalsQuestion}
      >
        {#each relevantGoals as goal}
          {@const selected = selectedGoals.includes(goal.id)}

          <div
            class="selection-card"
            class:selected
            role="checkbox"
            aria-checked={selected}
            tabindex="0"
            onclick={() => toggleGoal(goal.id)}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () => toggleGoal(goal.id))}
          >
            <!-- =============================================
                 EXACT SVG BY GOAL ID
            ============================================== -->

            <div class="option-icon" aria-hidden="true">
              {#if goal.id === "generate-enquiries"}
                <!-- Message / enquiry -->
                <svg viewBox="0 0 48 48">
                  <path d="M7 9h34v24H20l-9 7v-7H7V9Z" />
                  <path d="M14 17h20" />
                  <path d="M14 23h14" />
                </svg>
              {:else if goal.id === "present-services"}
                <!-- Services / structured offer -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="32" />
                  <path d="M14 16h8M14 24h8M14 32h8" />
                  <path d="M27 16h7M27 24h7M27 32h7" />
                </svg>
              {:else if goal.id === "build-trust"}
                <!-- Shield -->
                <svg viewBox="0 0 48 48">
                  <path
                    d="M24 6 38 11v11c0 9-5 15-14 20-9-5-14-11-14-20V11L24 6Z"
                  />
                  <path d="m17 24 5 5 10-11" />
                </svg>
              {:else if goal.id === "improve-visibility"}
                <!-- Eye / visibility -->
                <svg viewBox="0 0 48 48">
                  <path
                    d="M5 24s7-11 19-11 19 11 19 11-7 11-19 11S5 24 5 24Z"
                  />
                  <circle cx="24" cy="24" r="6" />
                  <circle
                    cx="24"
                    cy="24"
                    r="2"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              {:else if goal.id === "showcase-work"}
                <!-- Portfolio / gallery -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="31" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 34 9-10 6 6 5-5 7 9" />
                </svg>
              {:else if goal.id === "build-reputation"}
                <!-- Award / reputation -->
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="19" r="11" />
                  <path d="m18 29-3 12 9-5 9 5-3-12" />
                  <path
                    d="m24 12 2.1 4.3 4.9.7-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8L17 17l4.9-.7L24 12Z"
                  />
                </svg>
              {:else if goal.id === "recruitment"}
                <!-- Employee / person plus -->
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="16" r="6" />
                  <path d="M7 39c0-8 4-13 11-13s11 5 11 13" />
                  <path d="M36 18v12" />
                  <path d="M30 24h12" />
                </svg>
              {:else if goal.id === "book-appointments"}
                <!-- Appointment -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34" />
                  <path d="M15 6v8M33 6v8" />
                  <path d="m15 29 5 5 12-12" />
                </svg>
              {:else if goal.id === "sell-products"}
                <!-- Shopping bag -->
                <svg viewBox="0 0 48 48">
                  <path d="M11 17h26l-2 22H13l-2-22Z" />
                  <path d="M18 18v-4a6 6 0 0 1 12 0v4" />
                </svg>
              {:else if goal.id === "increase-sales"}
                <!-- SALES GROWTH -->
                <svg viewBox="0 0 48 48">
                  <path d="M8 38h32" />
                  <path d="M10 33 19 24l7 6 12-15" />
                  <path d="M30 15h8v8" />

                  <circle cx="14" cy="14" r="6" />

                  <path d="M14 10v8" />
                  <path
                    d="M11.5 12h4.3c1.2 0 2.2.8 2.2 1.9s-1 1.9-2.2 1.9h-3.6"
                  />
                </svg>
              {:else if goal.id === "automate-processes"}
                <!-- Automation gears -->
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="24" r="7" />
                  <circle cx="33" cy="16" r="5" />
                  <circle cx="33" cy="34" r="5" />

                  <path d="M25 22 29 18" />
                  <path d="M25 27 29 31" />

                  <path d="M18 13v4M18 31v4M7 24h4M25 24h4" />
                </svg>
              {:else if goal.id === "customer-support"}
                <!-- Headset -->
                <svg viewBox="0 0 48 48">
                  <path d="M10 25v-4a14 14 0 0 1 28 0v4" />
                  <path d="M10 24h6v11h-3a3 3 0 0 1-3-3v-8Z" />
                  <path d="M38 24h-6v11h3a3 3 0 0 0 3-3v-8Z" />
                  <path d="M32 35c0 4-3 6-8 6" />
                </svg>
              {:else if goal.id === "explain-mission"}
                <!-- Compass / mission -->
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="m29 18-4 9-9 4 4-9 9-4Z" />
                  <circle
                    cx="24"
                    cy="24"
                    r="2"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              {:else if goal.id === "build-community"}
                <!-- Community -->
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="15" r="5" />
                  <circle cx="12" cy="21" r="4" />
                  <circle cx="36" cy="21" r="4" />

                  <path d="M15 39c0-7 3.5-11 9-11s9 4 9 11" />
                  <path d="M4 38c0-6 3-10 8-10 2 0 4 .7 5.5 2" />
                  <path d="M44 38c0-6-3-10-8-10-2 0-4 .7-5.5 2" />
                </svg>
              {:else if goal.id === "collect-donations"}
                <!-- Donation heart -->
                <svg viewBox="0 0 48 48">
                  <path
                    d="M24 38S9 30 9 18.5A8.5 8.5 0 0 1 24 13a8.5 8.5 0 0 1 15 5.5C39 30 24 38 24 38Z"
                  />
                  <path d="M20 18h8" />
                  <path d="M24 14v16" />
                </svg>
              {:else if goal.id === "promote-events"}
                <!-- Event calendar -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34" />
                  <path d="M15 6v8M33 6v8" />
                  <path
                    d="m24 23 2 4 5 .8-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8-3.5-3.4 5-.8 2-4Z"
                  />
                </svg>
              {:else if goal.id === "share-updates"}
                <!-- News -->
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="7" width="27" height="34" />
                  <path d="M35 14h5v24a3 3 0 0 1-3 3h-2" />
                  <path d="M14 14h15" />
                  <path d="M14 20h15" />
                  <path d="M14 27h7M24 27h5" />
                  <path d="M14 33h15" />
                </svg>
              {:else if goal.id === "recruit-members"}
                <!-- Membership -->
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="16" r="6" />
                  <path d="M7 39c0-8 4-13 11-13 4 0 7 1.7 9 5" />
                  <circle cx="35" cy="30" r="8" />
                  <path d="M35 26v8M31 30h8" />
                </svg>
              {:else if goal.id === "collect-subscribers"}
                <!-- Newsletter -->
                <svg viewBox="0 0 48 48">
                  <rect x="6" y="12" width="29" height="23" />
                  <path d="m7 15 13.5 11L34 15" />
                  <circle cx="37" cy="34" r="7" />
                  <path d="M37 30v8M33 34h8" />
                </svg>
              {:else if goal.id === "show-menu"}
                <!-- Menu -->
                <svg viewBox="0 0 48 48">
                  <rect x="10" y="6" width="28" height="36" />
                  <path d="M16 14h16" />
                  <path d="M16 20h16" />
                  <path d="M16 26h11" />
                  <path d="M16 33h7M29 33h3" />
                </svg>
              {:else if goal.id === "accept-reservations"}
                <!-- Reservation -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34" />
                  <path d="M15 6v8M33 6v8" />
                  <circle cx="24" cy="28" r="6" />
                  <path d="M24 25v4l3 2" />
                </svg>
              {:else if goal.id === "online-ordering"}
                <!-- Food order -->
                <svg viewBox="0 0 48 48">
                  <path d="M10 16h25l-2 22H12l-2-22Z" />
                  <path d="M16 16c0-5 3-8 8-8s8 3 8 8" />
                  <path d="M36 12h6" />
                  <path d="M39 9v6" />
                </svg>
              {:else if goal.id === "show-location"}
                <!-- Location -->
                <svg viewBox="0 0 48 48">
                  <path
                    d="M24 42S11 29 11 19a13 13 0 0 1 26 0c0 10-13 23-13 23Z"
                  />
                  <circle cx="24" cy="19" r="5" />
                </svg>
              {:else if goal.id === "share-information"}
                <!-- Information -->
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <path d="M24 21v12" />
                  <circle
                    cx="24"
                    cy="15"
                    r="1.7"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              {:else if goal.id === "present-practice-areas"}
                <!-- Legal document -->
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h19l7 7v29H11V6Z" />
                  <path d="M30 6v8h7" />
                  <path d="M17 20h14M17 26h14M17 32h9" />
                  <path d="M24 15v3" />
                </svg>
              {:else if goal.id === "request-consultation"}
                <!-- Consultation -->
                <svg viewBox="0 0 48 48">
                  <circle cx="16" cy="15" r="5" />
                  <path d="M7 34c0-7 3.5-11 9-11s9 4 9 11" />

                  <path d="M27 14h14v14H32l-5 5V14Z" />
                  <path d="M32 19h5M32 23h4" />
                </svg>
              {:else if goal.id === "present-courses"}
                <!-- Book -->
                <svg viewBox="0 0 48 48">
                  <path d="M24 12c-5-4-10-5-16-4v29c6-1 11 0 16 4V12Z" />
                  <path d="M24 12c5-4 10-5 16-4v29c-6-1-11 0-16 4V12Z" />
                  <path d="M13 16h6M29 16h6" />
                </svg>
              {:else if goal.id === "collect-registrations"}
                <!-- Registration form -->
                <svg viewBox="0 0 48 48">
                  <rect x="9" y="7" width="30" height="34" />
                  <circle cx="18" cy="17" r="4" />
                  <path d="M13 28c1-5 3-7 5-7s4 2 5 7" />
                  <path d="M27 17h7M27 23h7M27 29h7" />
                </svg>
              {:else if goal.id === "sell-courses"}
                <!-- Course + payment -->
                <svg viewBox="0 0 48 48">
                  <path d="m6 16 18-9 18 9-18 9-18-9Z" />
                  <path d="M14 21v9c5 5 15 5 20 0v-9" />
                  <circle cx="36" cy="35" r="7" />
                  <path d="M36 31v8" />
                  <path d="M33.5 33h4c1 0 1.8.6 1.8 1.5S38.5 36 37.5 36h-3" />
                </svg>
              {:else if goal.id === "sell-tickets"}
                <!-- Ticket -->
                <svg viewBox="0 0 48 48">
                  <path
                    d="M7 15h34v8a5 5 0 0 0 0 10v8H7v-8a5 5 0 0 0 0-10v-8Z"
                  />
                  <path d="M25 17v5M25 27v5M25 37v2" />
                </svg>
              {:else if goal.id === "share-programme"}
                <!-- Schedule -->
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <path d="M8 16h32" />
                  <path d="M15 5v7M33 5v7" />
                  <path d="M15 23h18M15 29h12M15 35h8" />
                </svg>
              {:else if goal.id === "provide-online-service"}
                <!-- Cloud service -->
                <svg viewBox="0 0 48 48">
                  <path
                    d="M15 35h22a7 7 0 0 0 0-14 12 12 0 0 0-23-2 8 8 0 0 0 1 16Z"
                  />
                  <path d="M19 28h10" />
                  <path d="m26 24 4 4-4 4" />
                </svg>
              {:else if goal.id === "manage-users"}
                <!-- Users / account -->
                <svg viewBox="0 0 48 48">
                  <circle cx="19" cy="15" r="6" />
                  <path d="M7 38c0-8 4-13 12-13s12 5 12 13" />
                  <circle cx="36" cy="17" r="4" />
                  <path d="M31 27c2-2 4-3 6-3 4 0 7 3 8 8" />
                </svg>
              {:else if goal.id === "collect-data"}
                <!-- Database / input -->
                <svg viewBox="0 0 48 48">
                  <ellipse cx="24" cy="11" rx="14" ry="6" />
                  <path d="M10 11v10c0 3 6 6 14 6s14-3 14-6V11" />
                  <path d="M10 21v10c0 3 6 6 14 6s14-3 14-6V21" />
                  <path d="M32 34h10M37 29v10" />
                </svg>
              {:else if goal.id === "sell-subscriptions"}
                <!-- Repeat payment -->
                <svg viewBox="0 0 48 48">
                  <path d="M11 17a15 15 0 0 1 25-4" />
                  <path d="m36 7 .5 7-7-.5" />

                  <path d="M37 31a15 15 0 0 1-25 4" />
                  <path d="m12 41-.5-7 7 .5" />

                  <circle cx="24" cy="24" r="6" />
                  <path d="M24 20v8" />
                </svg>
              {:else if goal.id === "improve-existing-system"}
                <!-- System upgrade -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <path d="M7 16h34" />
                  <path d="M15 27a9 9 0 0 1 15-6" />
                  <path d="m30 17 .5 6-6-.5" />
                  <path d="M33 27a9 9 0 0 1-15 6" />
                  <path d="m18 37-.5-6 6 .5" />
                </svg>
              {:else if goal.id === "basic-seo"}
                <!-- Search -->
                <svg viewBox="0 0 48 48">
                  <circle cx="20" cy="20" r="11" />
                  <path d="m28 28 12 12" />
                  <path d="M14 20h12M20 14v12" />
                </svg>
              {:else if goal.id === "advanced-seo"}
                <!-- Search analytics -->
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="18" r="10" />
                  <path d="m25 25 8 8" />

                  <path d="M29 38h12" />
                  <path d="M31 34v4M35 29v9M39 24v14" />
                </svg>
              {:else}
                <!-- Only used if a completely new goal ID is added -->
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <circle cx="24" cy="24" r="9" />
                  <circle cx="24" cy="24" r="3" />
                </svg>
              {/if}
            </div>

            <!-- =============================================
                 COPY
            ============================================== -->

            <div class="option-copy">
              <h2>
                {goal.label}
              </h2>

              {#if goal.description}
                <p>
                  {goal.description}
                </p>
              {/if}
            </div>

            <!-- =============================================
                 SELECTED
            ============================================== -->

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

      <!-- ===================================================
           CONTINUE
      ==================================================== -->

      <div class="internal-navigation goals-navigation">
        <button type="button" class="back-button" onclick={onBack}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {interfaceText.back}
          </span>
        </button>

        <div class="continue-area">
          {#if !canContinueToStatus}
            <span class="hint">
              {interfaceText.goalsHint}
            </span>
          {/if}

          <button
            type="button"
            class="continue-button"
            disabled={!canContinueToStatus}
            onclick={showProjectStatus}
          >
            <span>
              {interfaceText.continue}
            </span>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  {:else}
    <!-- =====================================================
         PROJECT STATUS
    ====================================================== -->

    <section class="question-panel" aria-labelledby="status-question-heading">
      <header class="question-header">
        <span class="substep-label">
          {interfaceText.statusProgress}
          · 2 / 2
        </span>

        <h1 id="status-question-heading">
          {interfaceText.statusQuestion}
        </h1>

        <p>
          {interfaceText.statusDescription}
        </p>
      </header>

      <div
        class="status-grid"
        role="radiogroup"
        aria-label={interfaceText.statusQuestion}
      >
        {#each goalsContent.projectStatuses as status}
          {@const selected = projectStatus === status.id}

          <div
            class="selection-card status-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => selectProjectStatus(status.id)}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () =>
                selectProjectStatus(status.id),
              )}
          >
            <div class="option-icon" aria-hidden="true">
              {#if status.id === "new-website"}
                <!-- New website -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="9" width="34" height="29" />
                  <path d="M7 17h34" />

                  <path d="M24 22v11" />
                  <path d="M18.5 27.5h11" />
                </svg>
              {:else if status.id === "redesign"}
                <!-- Redesign -->
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="9" width="30" height="27" />
                  <path d="M8 17h30" />

                  <path d="M39 28a10 10 0 0 1-16 8" />
                  <path d="m23 40-.5-6 6 .5" />

                  <path d="M22 25a10 10 0 0 1 16-8" />
                  <path d="m38 13 .5 6-6-.5" />
                </svg>
              {:else if status.id === "extension"}
                <!-- Extend -->
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="9" width="25" height="29" />
                  <path d="M7 17h25" />

                  <rect x="27" y="24" width="14" height="14" />

                  <path d="M34 27v8" />
                  <path d="M30 31h8" />
                </svg>
              {:else}
                <!-- Unsure / question -->
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
                {status.label}
              </h2>

              {#if status.description}
                <p>
                  {status.description}
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

      <!-- ===================================================
           NAVIGATION
      ==================================================== -->

      <div class="internal-navigation">
        <button type="button" class="back-button" onclick={showGoals}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {interfaceText.back}
          </span>
        </button>

        <div class="continue-area">
          {#if !projectStatus}
            <span class="hint">
              {interfaceText.statusHint}
            </span>
          {/if}

          <button
            type="button"
            class="continue-button"
            disabled={!projectStatus}
            onclick={finishStep}
          >
            <span>
              {interfaceText.continue}
            </span>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  {/if}
</div>

<style>
  /* =========================================================
     COMPONENT
  ========================================================= */

  .step-goals {
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

  .option-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 10px;

    width: 100%;
  }

  .status-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 10px;

    width: 100%;
  }

  /* =========================================================
     CARDS
  ========================================================= */

  .selection-card {
    position: relative;

    display: flex;

    min-width: 0;
    min-height: 146px;

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

  .status-card {
    min-height: 150px;
  }

  /* =========================================================
     SVG ICONS
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

  .selection-card.selected .option-icon {
    color: var(--step-accent);
  }

  /* =========================================================
     COPY
  ========================================================= */

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

    font-size: 10px;

    line-height: 1.4;

    overflow-wrap: anywhere;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* =========================================================
     SELECTION
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

  .selection-card.selected .selection-state {
    border-color: var(--step-accent);

    background: var(--step-accent);
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

  .internal-navigation {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;

    margin-top: 22px;
  }

  .navigation-spacer {
    flex: 1;
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

  /* =========================================================
     BUTTONS
  ========================================================= */

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

  /* =========================================================
     MID DESKTOP
  ========================================================= */

  @media (max-width: 1120px) {
    .option-grid {
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

    .option-grid,
    .status-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      gap: 8px;
    }

    .selection-card,
    .status-card {
      min-height: 136px;

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
    .status-grid {
      grid-template-columns: 1fr;

      gap: 7px;
    }

    .selection-card,
    .status-card {
      min-height: 126px;
    }

    .internal-navigation {
      align-items: stretch;

      flex-direction: column-reverse;

      gap: 8px;

      margin-top: 16px;
    }

    .navigation-spacer {
      display: none;
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
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 390px) {
    .selection-card,
    .status-card {
      min-height: 120px;

      padding: 14px;
    }

    .option-icon {
      width: 39px;
      height: 39px;
    }

    .option-icon svg {
      width: 34px;
      height: 34px;
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
