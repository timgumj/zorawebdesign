<script>
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";

  import ConfiguratorIntro from "./ConfiguratorIntro.svelte";
  import ConfiguratorSteps from "./ConfiguratorSteps.svelte";
  import ConfiguratorReport from "./ConfiguratorReport.svelte";
  import QuoteModal from "./QuoteModal.svelte";

  import { getRecommendedPageIds } from "$lib/data/website-configurator/pages-data.js";
  import { getRecommendedFeatureIds } from "$lib/data/website-configurator/features-data.js";

  let { language = "de" } = $props();

  /* =========================================================
     MAIN SCREEN
  ========================================================= */

  let activeScreen = $state("intro");
  let currentStep = $state(1);

  /* =========================================================
     STEP 1 — WEBSITE TYPE
  ========================================================= */

  let selectedWebsiteType = $state("");

  /* =========================================================
     STEP 2 — GOALS
  ========================================================= */

  let selectedGoals = $state([]);
  let projectStatus = $state("");

  /* =========================================================
     STEP 3 — CONTENT READINESS
  ========================================================= */

  let contentReadiness = $state("");
  let visualReadiness = $state("");
  let brandingReadiness = $state("");
  let designDirection = $state("");
  let designReferenceLinks = $state(["", ""]);
  let supportNeeds = $state([]);

  /* =========================================================
     STEP 4 — PAGES
  ========================================================= */

  let selectedPages = $state([]);
  let pageVolume = $state("");
  let customPageNames = $state(["", "", ""]);

  let pagesInitialised = $state(false);

  /* =========================================================
     STEP 5 — FEATURES
  ========================================================= */

  let selectedFeatures = $state([]);
  let websiteLanguages = $state("");
  let customIntegration = $state("");

  let featuresInitialised = $state(false);

  /* =========================================================
     STEP 6 — TIMELINE
  ========================================================= */

  let projectStart = $state("");
  let launchTimeline = $state("");
  let collaborationModel = $state("");
  let ongoingSupport = $state([]);
  let trainingPreference = $state("");
  let timelineNote = $state("");

  /* =========================================================
     STEP 6 — FINAL ADDITIONS
  ========================================================= */

  let finalFeatureAdditions = $state([]);
  let finalRequirementNote = $state("");

  /* =========================================================
     REPORT / QUOTE
  ========================================================= */

  let selectedPackage = $state("");
  let recommendedPackage = $state("growth");
  let quoteModalOpen = $state(false);

  /* =========================================================
     PAGE UI
  ========================================================= */

  const pageUi = $derived(
    language === "en"
      ? {
          plannerLabel: "Website Planner",
          step: "Step",
          of: "of",
          report: "Recommendation",
        }
      : {
          plannerLabel: "Website Planner",
          step: "Schritt",
          of: "von",
          report: "Empfehlung",
        },
  );

  /* =========================================================
     QUOTE ANSWERS
  ========================================================= */

  const quoteAnswers = $derived({
    selectedWebsiteType,
    selectedGoals,
    projectStatus,

    contentReadiness,
    visualReadiness,
    brandingReadiness,
    designDirection,
    designReferenceLinks,
    supportNeeds,

    selectedPages,
    pageVolume,
    customPageNames,

    selectedFeatures,
    websiteLanguages,
    customIntegration,

    projectStart,
    launchTimeline,
    collaborationModel,
    ongoingSupport,
    trainingPreference,
    timelineNote,

    finalFeatureAdditions,
    finalRequirementNote,

    selectedPackage,
    recommendedPackage,
  });

  /* =========================================================
     HEADER NAVIGATION
  ========================================================= */

  const navigation = $derived(
    language === "en"
      ? {
          services: "[SERVICES]",
          projects: "[PROJECTS]",
          reviews: "[REVIEWS]",
          contact: "[CONTACT]",

          tagline: "SEO • WEB DESIGN • WORDPRESS",

          servicesLink: "/en-2/#services",
          projectsLink: "/en-2/#projects",
          reviewsLink: "/en-2/#reviews",
          contactLink: "/en-2/#contact",

          languageLabel: "[DE]",
          languageLink: "/website-konfigurator/",

          freebies: {
            label: "[FREEBIES]",

            items: [
              {
                label: "[WEBSITE AUDIT]",
                href: "/en-2/website-audit/",
                title: "Open the free Website Audit tool",
              },
              {
                label: "[WEBSITE PLANNER]",
                href: "/en-2/website-configurator/",
                title: "Open the Website Planner",
              },
            ],
          },
        }
      : {
          services: "[LEISTUNGEN]",
          projects: "[PROJEKTE]",
          reviews: "[REVIEWS]",
          contact: "[KONTAKT]",

          tagline: "SEO • WEBDESIGN • WORDPRESS",

          servicesLink: "/#services",
          projectsLink: "/#projects",
          reviewsLink: "/#reviews",
          contactLink: "/#contact",

          languageLabel: "[EN]",
          languageLink: "/en-2/website-configurator/",

          freebies: {
            label: "[FREEBIES]",

            items: [
              {
                label: "[WEBSITE AUDIT]",
                href: "/website-audit/",
                title: "Kostenlosen Website-Audit öffnen",
              },
              {
                label: "[WEBSITE PLANER]",
                href: "/website-konfigurator/",
                title: "Website Planner öffnen",
              },
            ],
          },
        },
  );

  /* =========================================================
     SCROLL
  ========================================================= */

  function scrollToTop() {
    if (typeof window === "undefined") {
      return;
    }

    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     INTRO
  ========================================================= */

  function startConfigurator() {
    activeScreen = "steps";
    currentStep = 1;

    scrollToTop();
  }

  function returnToIntro() {
    activeScreen = "intro";
    currentStep = 1;

    scrollToTop();
  }

  /* =========================================================
     REPORT EDITING
  ========================================================= */

  function editAnswers() {
    activeScreen = "steps";
    currentStep = 6;

    scrollToTop();
  }

  function reviewFeatures() {
    activeScreen = "steps";
    currentStep = 5;

    scrollToTop();
  }

  /* =========================================================
     QUOTE
  ========================================================= */

  function requestQuote() {
    if (!selectedPackage) {
      return;
    }

    quoteModalOpen = true;
  }

  function closeQuoteModal() {
    quoteModalOpen = false;
  }

  /* =========================================================
     BACK
  ========================================================= */

  function handleBack() {
    if (currentStep > 1) {
      currentStep -= 1;

      scrollToTop();

      return;
    }

    returnToIntro();
  }

  /* =========================================================
     CONTINUE
  ========================================================= */

  function handleContinue() {
    /*
     * STEP 1 → STEP 2
     */
    if (currentStep === 1) {
      currentStep = 2;

      scrollToTop();

      return;
    }

    /*
     * STEP 2 → STEP 3
     */
    if (currentStep === 2) {
      currentStep = 3;

      scrollToTop();

      return;
    }

    /*
     * STEP 3 → STEP 4
     */
    if (currentStep === 3) {
      if (!pagesInitialised) {
        selectedPages = getRecommendedPageIds(selectedWebsiteType);

        pagesInitialised = true;
      }

      currentStep = 4;

      scrollToTop();

      return;
    }

    /*
     * STEP 4 → STEP 5
     */
    if (currentStep === 4) {
      if (!featuresInitialised) {
        selectedFeatures = getRecommendedFeatureIds(selectedWebsiteType);

        featuresInitialised = true;
      }

      currentStep = 5;

      scrollToTop();

      return;
    }

    /*
     * STEP 5 → STEP 6
     */
    if (currentStep === 5) {
      currentStep = 6;

      scrollToTop();

      return;
    }

    /*
     * STEP 6 → REPORT
     */
    if (currentStep === 6) {
      activeScreen = "report";

      scrollToTop();
    }
  }
</script>

<svelte:window
  onkeydown={(event) => {
    if (quoteModalOpen) {
      return;
    }

    if (event.key !== "Escape" || activeScreen !== "steps") {
      return;
    }

    if (currentStep > 1) {
      currentStep -= 1;

      scrollToTop();

      return;
    }

    returnToIntro();
  }}
/>

<div class="configurator-page">
  <Header nav={navigation} />

  <main class="configurator-main">
    <div class="page-container">
      <!-- ===================================================
           COMPACT PLANNER STATUS

           No progress bar.
           No separator.
           No duplicate horizontal lines.
      ==================================================== -->

      {#if activeScreen !== "intro"}
        <div class="planner-status">
          <span class="planner-label">
            {pageUi.plannerLabel}
          </span>

          <span class="planner-step">
            {#if activeScreen === "steps"}
              {pageUi.step}
              {currentStep}
              {pageUi.of}
              6
            {:else}
              {pageUi.report}
            {/if}
          </span>
        </div>
      {/if}

      <!-- ===================================================
           SCREEN
      ==================================================== -->

      <div
        class="screen-shell"
        class:intro-screen={activeScreen === "intro"}
        class:steps-screen={activeScreen === "steps"}
        class:report-screen={activeScreen === "report"}
      >
        {#if activeScreen === "intro"}
          <ConfiguratorIntro {language} onStart={startConfigurator} />
        {:else if activeScreen === "steps"}
          <ConfiguratorSteps
            {language}
            {currentStep}
            bind:selectedWebsiteType
            bind:selectedGoals
            bind:projectStatus
            bind:contentReadiness
            bind:visualReadiness
            bind:brandingReadiness
            bind:designDirection
            bind:designReferenceLinks
            bind:supportNeeds
            bind:selectedPages
            bind:pageVolume
            bind:customPageNames
            bind:selectedFeatures
            bind:websiteLanguages
            bind:customIntegration
            bind:projectStart
            bind:launchTimeline
            bind:collaborationModel
            bind:ongoingSupport
            bind:trainingPreference
            bind:timelineNote
            bind:finalFeatureAdditions
            bind:finalRequirementNote
            onReviewFeatures={reviewFeatures}
            onBack={handleBack}
            onContinue={handleContinue}
          />
        {:else if activeScreen === "report"}
          <ConfiguratorReport
            {language}
            {selectedWebsiteType}
            {selectedGoals}
            {projectStatus}
            {contentReadiness}
            {visualReadiness}
            {brandingReadiness}
            {designDirection}
            {designReferenceLinks}
            {supportNeeds}
            {selectedPages}
            {pageVolume}
            {customPageNames}
            {selectedFeatures}
            {websiteLanguages}
            {customIntegration}
            {projectStart}
            {launchTimeline}
            {collaborationModel}
            {ongoingSupport}
            {trainingPreference}
            {timelineNote}
            {finalFeatureAdditions}
            {finalRequirementNote}
            {recommendedPackage}
            bind:selectedPackage
            onEditAnswers={editAnswers}
            onRequestQuote={requestQuote}
          />
        {/if}
      </div>
    </div>
  </main>

  <Footer {language} />
</div>

{#if quoteModalOpen}
  <QuoteModal
    open={true}
    {language}
    answers={quoteAnswers}
    onClose={closeQuoteModal}
  />
{/if}

<style>
  /* =========================================================
     GLOBAL
  ========================================================= */

  :global(html) {
    scroll-behavior: smooth;

    scrollbar-gutter: stable;

    background: #080808;
  }

  :global(body) {
    margin: 0;

    overflow-x: clip;

    background: #080808;
  }

  :global(body),
  :global(button),
  :global(input),
  :global(textarea),
  :global(select) {
    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     PAGE
  ========================================================= */

  .configurator-page {
    width: 100%;
    min-height: 100vh;

    overflow-x: clip;

    background: #080808;

    color: #f5f5f5;

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     MAIN
  ========================================================= */

  .configurator-main {
    min-height: calc(100vh - 100px);

    padding-top: clamp(72px, 6vw, 88px);

    padding-bottom: clamp(36px, 5vw, 64px);
  }

  /* =========================================================
     CONTAINER
  ========================================================= */

  .page-container {
    width: 100%;

    max-width: 1600px;

    margin: 0 auto;

    padding-inline: clamp(20px, 4vw, 64px);

    box-sizing: border-box;
  }

  /* =========================================================
     COMPACT PLANNER STATUS
  ========================================================= */

  .planner-status {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 16px;

    width: 100%;

    margin: 0 0 clamp(16px, 1.8vw, 22px);

    padding: 0 0 12px;

    border-bottom: 1px solid #292929;
  }

  .planner-label {
    color: #eeeeee;

    font-size: 10px;
    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .planner-step {
    color: #5f80ff;

    font-size: 9px;
    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  /* =========================================================
     SCREEN
  ========================================================= */

  .screen-shell {
    width: 100%;

    min-width: 0;

    margin: 0;
    padding: 0;
  }

  .steps-screen,
  .report-screen {
    animation: screen-in 180ms ease both;
  }

  @keyframes screen-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 950px) {
    .configurator-main {
      padding-top: 72px;

      padding-bottom: 44px;
    }

    .page-container {
      padding-inline: 20px;
    }

    .planner-status {
      margin-bottom: 20px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 700px) {
    .configurator-main {
      padding-top: 66px;

      padding-bottom: 34px;
    }

    .page-container {
      padding-inline: 16px;
    }

    .planner-status {
      margin-bottom: 16px;
    }

    .planner-label {
      font-size: 9px;
    }

    .planner-step {
      font-size: 8px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .page-container {
      padding-inline: 14px;
    }

    .configurator-main {
      padding-top: 62px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    :global(html) {
      scroll-behavior: auto;
    }

    .steps-screen,
    .report-screen {
      animation: none;
    }
  }

  /* =========================================================
     GLOBAL PLANNER TYPOGRAPHY OVERRIDES

     One place to control readable text sizes across:
     - Steps 1–6
     - Report
     - Package cards
  ========================================================= */

  /* MICRO LABELS / EYEBROWS */
  .configurator-page :global(.substep-label),
  .configurator-page :global(.section-label),
  .configurator-page :global(.eyebrow),
  .configurator-page :global(.package-kicker),
  .configurator-page :global(.summary-number),
  .configurator-page :global(.recommended-badge),
  .configurator-page :global(.selected-badge),
  .configurator-page :global(.recommended-label),
  .configurator-page :global(.selected-label),
  .configurator-page :global(.package-section-label) {
    font-size: 10px !important;
  }

  /* NORMAL BODY / DESCRIPTION TEXT */
  .configurator-page :global(.question-header p),
  .configurator-page :global(.option-copy p),
  .configurator-page :global(.package-tagline),
  .configurator-page :global(.tagline),
  .configurator-page :global(.suitable-for p),
  .configurator-page :global(.suitable p),
  .configurator-page :global(.summary-row strong),
  .configurator-page :global(.summary-row a),
  .configurator-page :global(.summary-content),
  .configurator-page :global(.review-note),
  .configurator-page :global(.info-note p),
  .configurator-page :global(.note-heading p),
  .configurator-page :global(.review-copy p),
  .configurator-page :global(.recommendation-reason p),
  .configurator-page :global(.reason-card p),
  .configurator-page :global(.section-header p),
  .configurator-page :global(.section-intro p),
  .configurator-page :global(.included-note p),
  .configurator-page :global(.status-block p),
  .configurator-page :global(.hero-description),
  .configurator-page :global(.next-step-copy p),
  .configurator-page :global(.final-copy p),
  .configurator-page :global(.selected-scope p),
  .configurator-page :global(.personalised-list li),
  .configurator-page :global(.included-section li),
  .configurator-page :global(.limitations li),
  .configurator-page :global(.details-content li),
  .configurator-page :global(.personalised li) {
    font-size: 12px !important;
  }

  /* ALL PLANNER LIST ITEMS */
  .configurator-page :global(li) {
    font-size: 12px !important;
  }

  /* CARD TITLES */
  .configurator-page :global(.option-copy h2),
  .configurator-page :global(.note-heading h2) {
    font-size: 14px !important;
  }

  /* SUMMARY / ACCORDION TITLES */
  .configurator-page :global(.summary-accordion summary strong),
  .configurator-page :global(.scope-details summary) {
    font-size: 11px !important;
  }

  /* TAGS */
  .configurator-page :global(.tag-list span) {
    font-size: 10px !important;
  }

  .screen-shell :global(button),
  .screen-shell :global(.select-button),
  .screen-shell :global(.continue-button),
  .screen-shell :global(.back-button),
  .screen-shell :global(.edit-button),
  .screen-shell :global(.quote-button) {
    font-size: 11px !important;
  }

  /* DISABLED / SECONDARY HELP TEXT */
  .configurator-page :global(.disabled-hint),
  .configurator-page :global(.hint),
  .configurator-page :global(.quote-hint),
  .configurator-page :global(.edit-area small) {
    font-size: 10px !important;
  }
</style>
