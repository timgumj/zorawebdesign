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

  /*
   * Main configurator navigation
   *
   * intro  → introductory screen
   * steps  → questions 1–6
   * report → final recommendation
   */
  let activeScreen = $state("intro");
  let currentStep = $state(1);

  /*
   * Step 1: Website type
   */
  let selectedWebsiteType = $state("");

  /*
   * Step 2: Project goals
   */
  let selectedGoals = $state([]);
  let projectStatus = $state("");

  /*
   * Step 3: Content readiness
   */
  let contentReadiness = $state("");
  let visualReadiness = $state("");
  let brandingReadiness = $state("");
  let designDirection = $state("");
  let designReferenceLinks = $state(["", ""]);
  let supportNeeds = $state([]);

  /*
   * Step 4: Website pages
   */
  let selectedPages = $state([]);
  let pageVolume = $state("");
  let customPageNames = $state(["", "", ""]);

  /*
   * Tracks whether recommended pages have already been added.
   */
  let pagesInitialised = $state(false);

  /*
   * Step 5: Website features
   */
  let selectedFeatures = $state([]);
  let websiteLanguages = $state("");
  let customIntegration = $state("");

  /*
   * Tracks whether recommended features have already been added.
   */
  let featuresInitialised = $state(false);

  /*
   * Step 6: Timeline and support
   */
  let projectStart = $state("");
  let launchTimeline = $state("");
  let collaborationModel = $state("");
  let ongoingSupport = $state([]);
  let trainingPreference = $state("");
  let timelineNote = $state("");

  /*
   * Final additions inside Step 6
   */
  let finalFeatureAdditions = $state([]);
  let finalRequirementNote = $state("");

  /*
   * Report and quote
   */
  let selectedPackage = $state("");
  let recommendedPackage = $state("growth");
  let quoteModalOpen = $state(false);

  /*
   * All collected configurator answers.
   *
   * This object is passed to QuoteModal.svelte so the submitted
   * enquiry can contain the complete project information.
   */
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

  /*
   * Global header navigation
   */
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
                label: "[WEBSITE CONFIGURATOR]",
                href: "/en-2/website-configurator/",
                title: "Open the Website Configurator",
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
                label: "[WEBSITE KONFIGURATOR]",
                href: "/website-konfigurator/",
                title: "Website Konfigurator öffnen",
              },
            ],
          },
        },
  );

  function scrollToTop() {
    if (typeof window === "undefined") {
      return;
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

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

  /*
   * Opens Step 6 when the user chooses to edit answers
   * from the final report.
   */
  function editAnswers() {
    activeScreen = "steps";
    currentStep = 6;

    scrollToTop();
  }

  /*
   * Opens Step 5 when the user wants to review the
   * selected features from Step 6.
   */
  function reviewFeatures() {
    activeScreen = "steps";
    currentStep = 5;

    scrollToTop();
  }

  function requestQuote() {
    if (!selectedPackage) {
      return;
    }

    quoteModalOpen = true;
  }

  function closeQuoteModal() {
    quoteModalOpen = false;
  }

  function handleBack() {
    if (currentStep > 1) {
      currentStep -= 1;
      scrollToTop();

      return;
    }

    returnToIntro();
  }

  /*
   * ConfiguratorSteps.svelte determines whether the current
   * step is complete and only calls this function when the user
   * is allowed to continue.
   */
  function handleContinue() {
    /*
     * Step 1 → Step 2
     */
    if (currentStep === 1) {
      currentStep = 2;
      scrollToTop();

      return;
    }

    /*
     * Step 2 → Step 3
     */
    if (currentStep === 2) {
      currentStep = 3;
      scrollToTop();

      return;
    }

    /*
     * Step 3 → Step 4
     *
     * Add recommended pages only the first time the user
     * reaches the pages step.
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
     * Step 4 → Step 5
     *
     * Add recommended features only the first time the user
     * reaches the features step.
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
     * Step 5 → Step 6
     */
    if (currentStep === 5) {
      currentStep = 6;
      scrollToTop();

      return;
    }

    /*
     * Step 6 → Report
     */
    if (currentStep === 6) {
      activeScreen = "report";
      scrollToTop();
    }
  }
</script>

<svelte:window
  onkeydown={(event) => {
    /*
     * QuoteModal.svelte handles Escape itself while open.
     */
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

  <main>
    <div class="page-container">
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
  :global(html) {
    scroll-behavior: smooth;
    background: #080808;
  }

  :global(body) {
    margin: 0;
    background: #080808;
  }

  :global(body),
  :global(button),
  :global(input),
  :global(textarea),
  :global(select) {
    font-family: "DM Sans", Arial, sans-serif;
  }

  .configurator-page {
    min-height: 100vh;
    overflow-x: hidden;
    background: #080808;
    color: #f5f5f5;
    font-family: "DM Sans", Arial, sans-serif;
  }

  main {
    min-height: calc(100vh - 100px);
    padding-top: clamp(92px, 9vw, 130px);
    padding-bottom: clamp(48px, 7vw, 96px);
  }

  .page-container {
    width: 100%;
    max-width: 1600px;
    margin: 0 auto;
    padding-inline: clamp(20px, 4vw, 64px);
    box-sizing: border-box;
  }

  @media (max-width: 700px) {
    main {
      padding-top: 86px;
      padding-bottom: 48px;
    }

    .page-container {
      padding-inline: 16px;
    }
  }
</style>
