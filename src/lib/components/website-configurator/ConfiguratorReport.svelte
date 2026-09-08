<script>
  import PackageCards from "./PackageCards.svelte";
  import QuoteModal from "./QuoteModal.svelte";

  import {
    getGoalById,
    getProjectStatusById,
    getWebsiteTypeById,
  } from "$lib/data/website-configurator/configurator-data.js";

  import {
    getContentReadinessOption,
    normaliseReferenceUrl,
  } from "$lib/data/website-configurator/content-readiness-data.js";

  import {
    getPageOptionById,
    getPagesContent,
  } from "$lib/data/website-configurator/pages-data.js";

  import {
    getFeatureOptionById,
    getFeaturesContent,
  } from "$lib/data/website-configurator/features-data.js";

  import {
    getTimelineOption,
    getTimelineSupportContent,
  } from "$lib/data/website-configurator/timeline-support-data.js";

  let {
    language = "de",

    selectedWebsiteType = "",
    selectedGoals = [],
    projectStatus = "",

    contentReadiness = "",
    visualReadiness = "",
    brandingReadiness = "",
    designDirection = "",
    designReferenceLinks = ["", ""],
    supportNeeds = [],

    selectedPages = [],
    pageVolume = "",
    customPageNames = ["", "", ""],

    selectedFeatures = [],
    websiteLanguages = "",
    customIntegration = "",

    projectStart = "",
    launchTimeline = "",
    collaborationModel = "",
    ongoingSupport = [],
    trainingPreference = "",
    timelineNote = "",

    finalFeatureAdditions = [],
    finalRequirementNote = "",

    recommendedPackage = "growth",
    selectedPackage = $bindable(""),

    plannerSubmitted = false,

    onEditAnswers = () => {},
    onSubmitted = () => {},
  } = $props();

  /* =========================================================
     TEXT
  ========================================================= */

  const text = $derived(
    language === "en"
      ? {
          readyEyebrow: "Final step",

          readyTitle: "Your website plan is ready",

          readyDescription:
            "Add your contact details to send your complete project configuration for personal review.",

          completeEyebrow: "Planner complete",

          completeTitle: "Your website project plan",

          completeDescription:
            "Your complete website configuration has been sent successfully. Below you can review the full project plan based on your answers.",

          recommendation: "Recommended scope",

          recommendationReason: "Why this fits",

          complexity: "Project complexity",

          complexityValues: {
            essential: "Focused",
            growth: "Moderate",
            advanced: "Advanced",
          },

          recommendationReasons: {
            essential:
              "Your project has a compact structure and mostly straightforward functionality.",

            growth:
              "Your project combines several pages, additional functionality, content requirements, multilingual needs or ongoing support.",

            advanced:
              "Your project includes advanced functionality, larger content structures, payments, bookings, user accounts or external integrations.",
          },

          recommendedBadge: "Recommended",

          edit: "Review answers",

          dashboardLabel: "Your plan",
          dashboardTitle: "Quick overview",

          websiteType: "Website type",
          goals: "Goals",
          pages: "Pages",
          selectedFeatures: "Features",
          languages: "Languages",

          selected: "selected",

          successLabel: "Plan sent",

          successTitle: "Your configuration has been received",

          successText:
            "Thank you. I will personally review your requirements and contact you about the next steps and the appropriate project scope.",

          summaryLabel: "Project summary",

          summaryTitle: "Your complete planner",

          summaryText:
            "Open any section below to review the information included in your project request.",

          foundation: "Project foundation",

          preparation: "Content and design",

          structure: "Pages and structure",

          features: "Features and technology",

          timeline: "Timeline and support",

          status: "Current status",

          content: "Content readiness",

          visual: "Visual material",

          branding: "Brand identity",

          direction: "Design direction",

          references: "Visual references",

          supportNeeds: "Content and design support",

          volume: "Repeating detail pages",

          customPages: "Custom pages",

          integration: "Special integration",

          finalRequirements: "Additional requirements",

          finalRequirementNote: "Additional functionality note",

          start: "Preferred project start",

          launch: "Preferred launch",

          collaboration: "Website management",

          ongoingSupport: "Ongoing support",

          training: "Training",

          notes: "Additional notes",

          includedPages:
            "Technical, privacy, legal, cookie and 404 pages are included automatically.",

          compareLabel: "Project scopes",

          compareTitle: "Explore the available project scopes",

          compareText:
            "Your recommended scope is highlighted. The final scope can still be adjusted after your project requirements have been reviewed personally.",

          packageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },

          empty: "Not specified",

          none: "None selected",
        }
      : {
          readyEyebrow: "Letzter Schritt",

          readyTitle: "Ihre Website-Planung ist bereit",

          readyDescription:
            "Ergänzen Sie Ihre Kontaktdaten, um Ihre vollständige Projektkonfiguration zur persönlichen Prüfung zu senden.",

          completeEyebrow: "Planner abgeschlossen",

          completeTitle: "Ihr Website-Projektplan",

          completeDescription:
            "Ihre vollständige Website-Konfiguration wurde erfolgreich gesendet. Unten können Sie Ihren gesamten Projektplan auf Basis Ihrer Angaben noch einmal prüfen.",

          recommendation: "Empfohlener Umfang",

          recommendationReason: "Warum dieser Umfang passt",

          complexity: "Projektkomplexität",

          complexityValues: {
            essential: "Fokussiert",
            growth: "Mittel",
            advanced: "Erweitert",
          },

          recommendationReasons: {
            essential:
              "Ihr Projekt hat eine kompakte Struktur und überwiegend überschaubare Funktionen.",

            growth:
              "Ihr Projekt kombiniert mehrere Seiten, zusätzliche Funktionen, Inhaltsanforderungen, Mehrsprachigkeit oder laufende Betreuung.",

            advanced:
              "Ihr Projekt umfasst erweiterte Funktionen, größere Inhaltsstrukturen, Zahlungen, Buchungen, Benutzerkonten oder externe Integrationen.",
          },

          recommendedBadge: "Empfohlen",

          edit: "Antworten prüfen",

          dashboardLabel: "Ihre Planung",
          dashboardTitle: "Kurzübersicht",

          websiteType: "Website-Art",
          goals: "Ziele",
          pages: "Seiten",
          selectedFeatures: "Funktionen",
          languages: "Sprachen",

          selected: "ausgewählt",

          successLabel: "Plan gesendet",

          successTitle: "Ihre Konfiguration wurde übermittelt",

          successText:
            "Vielen Dank. Ich prüfe Ihre Anforderungen persönlich und melde mich mit den nächsten Schritten und dem passenden Projektumfang bei Ihnen.",

          summaryLabel: "Projektübersicht",

          summaryTitle: "Ihre vollständige Planung",

          summaryText:
            "Öffnen Sie einen Bereich, um die Angaben zu prüfen, die mit Ihrer Projektanfrage übermittelt wurden.",

          foundation: "Projektgrundlage",

          preparation: "Inhalte und Design",

          structure: "Seiten und Struktur",

          features: "Funktionen und Technik",

          timeline: "Zeitplan und Betreuung",

          status: "Aktueller Stand",

          content: "Vorbereitung der Inhalte",

          visual: "Bildmaterial",

          branding: "Branding",

          direction: "Designrichtung",

          references: "Visuelle Referenzen",

          supportNeeds: "Unterstützung bei Inhalt und Design",

          volume: "Wiederkehrende Detailseiten",

          customPages: "Individuelle Seiten",

          integration: "Besondere Integration",

          finalRequirements: "Weitere Anforderungen",

          finalRequirementNote: "Zusätzliche Funktionsbeschreibung",

          start: "Gewünschter Projektstart",

          launch: "Gewünschte Veröffentlichung",

          collaboration: "Verwaltung der Website",

          ongoingSupport: "Laufende Betreuung",

          training: "Einführung",

          notes: "Weitere Hinweise",

          includedPages:
            "Technische, Datenschutz-, Impressums-, Cookie- und 404-Seiten sind automatisch enthalten.",

          compareLabel: "Projektumfänge",

          compareTitle: "Verfügbare Projektumfänge ansehen",

          compareText:
            "Der empfohlene Umfang ist hervorgehoben. Der endgültige Umfang kann nach der persönlichen Prüfung Ihrer Anforderungen noch angepasst werden.",

          packageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },

          empty: "Nicht angegeben",

          none: "Keine Auswahl",
        },
  );

  /* =========================================================
     DATA
  ========================================================= */

  const pagesText = $derived(getPagesContent(language));

  const featuresText = $derived(getFeaturesContent(language));

  const timelineText = $derived(getTimelineSupportContent(language));

  const websiteTypeOption = $derived(
    getWebsiteTypeById(selectedWebsiteType, language),
  );

  const selectedGoalOptions = $derived(
    selectedGoals.map((id) => getGoalById(id, language)).filter(Boolean),
  );

  const projectStatusOption = $derived(
    getProjectStatusById(projectStatus, language),
  );

  const contentOption = $derived(
    getContentReadinessOption("contentOptions", contentReadiness, language),
  );

  const visualOption = $derived(
    getContentReadinessOption("visualOptions", visualReadiness, language),
  );

  const brandingOption = $derived(
    getContentReadinessOption("brandingOptions", brandingReadiness, language),
  );

  const directionOption = $derived(
    getContentReadinessOption("directionOptions", designDirection, language),
  );

  const selectedPreparationSupport = $derived(
    supportNeeds
      .map((id) => getContentReadinessOption("supportOptions", id, language))
      .filter(Boolean),
  );

  const validReferenceLinks = $derived(
    designReferenceLinks
      .map((link) => link.trim())
      .filter(Boolean)
      .map((link) => normaliseReferenceUrl(link)),
  );

  const selectedPageOptions = $derived(
    selectedPages.map((id) => getPageOptionById(id, language)).filter(Boolean),
  );

  const pageVolumeOption = $derived(
    pagesText.volumeOptions.find((option) => option.id === pageVolume) ?? null,
  );

  const enteredCustomPages = $derived(
    customPageNames.map((name) => name.trim()).filter(Boolean),
  );

  const selectedFeatureOptions = $derived(
    selectedFeatures
      .map((id) => getFeatureOptionById(id, language))
      .filter(Boolean),
  );

  const languageOption = $derived(
    featuresText.languageOptions.find(
      (option) => option.id === websiteLanguages,
    ) ?? null,
  );

  const projectStartOption = $derived(
    getTimelineOption("startOptions", projectStart, language),
  );

  const launchOption = $derived(
    getTimelineOption("launchOptions", launchTimeline, language),
  );

  const collaborationOption = $derived(
    getTimelineOption("collaborationOptions", collaborationModel, language),
  );

  const selectedOngoingSupport = $derived(
    ongoingSupport
      .map((id) => getTimelineOption("supportOptions", id, language))
      .filter(Boolean),
  );

  const trainingOption = $derived(
    getTimelineOption("trainingOptions", trainingPreference, language),
  );

  const selectedFinalRequirements = $derived(
    finalFeatureAdditions
      .map((id) =>
        timelineText.finalRequirementOptions.find((option) => option.id === id),
      )
      .filter(Boolean),
  );

  const selectedPageLabels = $derived([
    ...selectedPageOptions.map((option) => option.label),
    ...enteredCustomPages,
  ]);

  const selectedFeatureLabels = $derived(
    selectedFeatureOptions.map((option) => option.label),
  );

  const preparationSupportLabels = $derived(
    selectedPreparationSupport.map((option) => option.label),
  );

  const ongoingSupportLabels = $derived(
    selectedOngoingSupport.map((option) => option.label),
  );

  const finalRequirementLabels = $derived(
    selectedFinalRequirements.map((option) => option.label),
  );

  /* =========================================================
     PACKAGE CALCULATION
  ========================================================= */

  const advancedWebsiteTypes = ["online-shop", "membership", "web-app"];

  const advancedFeatureIds = [
    "online-payments",
    "product-management",
    "customer-account",
    "subscription-payments",
    "donation-payment",
    "user-registration",
    "member-login",
    "protected-content",
    "user-dashboard",
    "user-roles",
    "booking-system",
    "ticketing",
    "custom-database",
    "external-api",
    "automation",
    "secure-forms",
    "advanced-filtering",
    "interactive-calculator",
    "ai-function",
    "custom-feature",
  ];

  const advancedFinalRequirementIds = [
    "final-payments",
    "final-login",
    "final-external-system",
    "final-ai-feature",
    "final-file-uploads",
  ];

  const calculatedPackage = $derived.by(() => {
    const totalPages = selectedPageLabels.length;

    const hasAdvancedWebsiteType =
      advancedWebsiteTypes.includes(selectedWebsiteType);

    const hasAdvancedFeature = selectedFeatures.some((id) =>
      advancedFeatureIds.includes(id),
    );

    const hasAdvancedFinalRequirement = finalFeatureAdditions.some((id) =>
      advancedFinalRequirementIds.includes(id),
    );

    if (
      hasAdvancedWebsiteType ||
      hasAdvancedFeature ||
      hasAdvancedFinalRequirement ||
      totalPages > 12 ||
      selectedFeatures.length > 8 ||
      Boolean(customIntegration.trim())
    ) {
      return "advanced";
    }

    const needsContentSupport = supportNeeds.length > 0;

    const isMultilingual =
      websiteLanguages && websiteLanguages !== "one-language";

    if (
      totalPages > 5 ||
      selectedFeatures.length > 3 ||
      enteredCustomPages.length > 0 ||
      needsContentSupport ||
      isMultilingual ||
      ongoingSupport.length > 0
    ) {
      return "growth";
    }

    return "essential";
  });

  const activeRecommendedPackage = $derived(
    calculatedPackage || recommendedPackage || "growth",
  );

  const recommendedPackageName = $derived(
    text.packageNames[activeRecommendedPackage] ?? text.packageNames.growth,
  );

  /*
   * Automatically use the recommendation as
   * the initially selected scope.
   */
  $effect(() => {
    if (!selectedPackage && activeRecommendedPackage) {
      selectedPackage = activeRecommendedPackage;
    }
  });

  /* =========================================================
     FORM PAYLOAD
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

    recommendedPackage: activeRecommendedPackage,
  });
</script>

<section
  class="report"
  class:planner-complete={plannerSubmitted}
  aria-labelledby="configurator-report-title"
>
  {#if !plannerSubmitted}
    <!-- =====================================================
         FINAL STEP — COMPACT HEADER
    ====================================================== -->

    <header class="final-header">
      <div class="final-header-copy">
        <span class="eyebrow">
          {text.readyEyebrow}
        </span>

        <h1 id="configurator-report-title">
          {text.readyTitle}
        </h1>

        <p>
          {text.readyDescription}
        </p>
      </div>

      <div class="final-scope">
        <span class="final-scope-label">
          {text.recommendation}
        </span>

        <div class="final-scope-value">
          <strong>
            {recommendedPackageName}
          </strong>

          <span class="recommended-badge">
            {text.recommendedBadge}
          </span>
        </div>

        <button type="button" class="edit-button" onclick={onEditAnswers}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {text.edit}
          </span>
        </button>
      </div>
    </header>

    <!-- =====================================================
         FORM + MINI DASHBOARD
    ====================================================== -->

    <div class="final-layout">
      <!-- MAIN FORM -->

      <div class="final-form-column">
        <QuoteModal
          open={true}
          inline={true}
          {language}
          answers={quoteAnswers}
          {onSubmitted}
        />
      </div>

      <!-- MINI DASHBOARD -->

      <aside class="plan-dashboard" aria-label={text.dashboardTitle}>
        <header class="dashboard-header">
          <span class="section-label">
            {text.dashboardLabel}
          </span>

          <h2>
            {text.dashboardTitle}
          </h2>
        </header>

        <div class="dashboard-items">
          <!-- WEBSITE TYPE -->

          <div class="dashboard-item dashboard-item-wide">
            <span>
              {text.websiteType}
            </span>

            <strong>
              {websiteTypeOption?.label || text.empty}
            </strong>
          </div>

          <!-- GOALS -->

          <div class="dashboard-item">
            <span>
              {text.goals}
            </span>

            <strong class="dashboard-number">
              {selectedGoalOptions.length}
            </strong>

            <small>
              {text.selected}
            </small>
          </div>

          <!-- PAGES -->

          <div class="dashboard-item">
            <span>
              {text.pages}
            </span>

            <strong class="dashboard-number">
              {selectedPageLabels.length}
            </strong>

            <small>
              {text.selected}
            </small>
          </div>

          <!-- FEATURES -->

          <div class="dashboard-item">
            <span>
              {text.selectedFeatures}
            </span>

            <strong class="dashboard-number">
              {selectedFeatureLabels.length}
            </strong>

            <small>
              {text.selected}
            </small>
          </div>

          <!-- LANGUAGE -->

          <div class="dashboard-item">
            <span>
              {text.languages}
            </span>

            <strong>
              {languageOption?.label || text.empty}
            </strong>
          </div>
        </div>
      </aside>
    </div>
  {:else}
    <!-- =====================================================
         COMPLETE HEADER
    ====================================================== -->

    <header class="report-header">
      <div class="completion-mark" class:is-complete={plannerSubmitted}>
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="13" />

          <path d="m10 16 4 4 8-9" />
        </svg>
      </div>

      <div class="header-copy">
        <span class="eyebrow">
          {text.completeEyebrow}
        </span>

        <h1 id="configurator-report-title">
          {text.completeTitle}
        </h1>

        <p>
          {text.completeDescription}
        </p>
      </div>
    </header>

    <!-- =====================================================
         RECOMMENDATION
    ====================================================== -->

    <section class="recommendation" aria-labelledby="recommendation-title">
      <div class="recommendation-main">
        <span class="section-label">
          {text.recommendation}
        </span>

        <h2 id="recommendation-title">
          {recommendedPackageName}
        </h2>

        <div class="recommended-badge">
          {text.recommendedBadge}
        </div>
      </div>

      <div class="recommendation-info">
        <div class="recommendation-stat">
          <span>
            {text.complexity}
          </span>

          <strong>
            {text.complexityValues[activeRecommendedPackage]}
          </strong>
        </div>

        <div class="recommendation-reason">
          <span>
            {text.recommendationReason}
          </span>

          <p>
            {text.recommendationReasons[activeRecommendedPackage]}
          </p>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SUCCESS
    ====================================================== -->

    <section class="success-banner" aria-labelledby="success-title">
      <div class="success-icon">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="m6 12.5 4 4L18 8" />
        </svg>
      </div>

      <div>
        <span class="section-label">
          {text.successLabel}
        </span>

        <h2 id="success-title">
          {text.successTitle}
        </h2>

        <p>
          {text.successText}
        </p>
      </div>
    </section>

    <!-- ===================================================
         SUMMARY
    ==================================================== -->

    <section class="summary-section">
      <header class="section-header">
        <span class="section-label">
          {text.summaryLabel}
        </span>

        <h2>
          {text.summaryTitle}
        </h2>

        <p>
          {text.summaryText}
        </p>
      </header>

      <div class="summary-accordion">
        <!-- FOUNDATION -->

        <details open>
          <summary>
            <div>
              <span class="summary-number"> 01 </span>

              <strong>
                {text.foundation}
              </strong>
            </div>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div class="summary-content">
            {@render valueRow(text.websiteType, websiteTypeOption?.label)}

            {@render tagsRow(
              text.goals,
              selectedGoalOptions.map((option) => option.label),
            )}

            {@render valueRow(text.status, projectStatusOption?.label)}
          </div>
        </details>

        <!-- CONTENT / DESIGN -->

        <details>
          <summary>
            <div>
              <span class="summary-number"> 02 </span>

              <strong>
                {text.preparation}
              </strong>
            </div>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div class="summary-content">
            {@render valueRow(text.content, contentOption?.label)}

            {@render valueRow(text.visual, visualOption?.label)}

            {@render valueRow(text.branding, brandingOption?.label)}

            {@render valueRow(text.direction, directionOption?.label)}

            {#if validReferenceLinks.length}
              <div class="summary-row">
                <span>
                  {text.references}
                </span>

                <div class="link-list">
                  {#each validReferenceLinks as link}
                    <a href={link} target="_blank" rel="noreferrer">
                      {link}
                    </a>
                  {/each}
                </div>
              </div>
            {/if}

            {#if preparationSupportLabels.length}
              {@render tagsRow(text.supportNeeds, preparationSupportLabels)}
            {/if}
          </div>
        </details>

        <!-- PAGES -->

        <details>
          <summary>
            <div>
              <span class="summary-number"> 03 </span>

              <strong>
                {text.structure}
              </strong>
            </div>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div class="summary-content">
            <div class="included-note">
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m5 10.25 3.15 3.1L15 6.75" />
              </svg>

              <span>
                {text.includedPages}
              </span>
            </div>

            {@render tagsRow(text.pages, selectedPageLabels)}

            {#if pageVolumeOption}
              {@render valueRow(text.volume, pageVolumeOption.label)}
            {/if}

            {#if enteredCustomPages.length}
              {@render tagsRow(text.customPages, enteredCustomPages)}
            {/if}
          </div>
        </details>

        <!-- FEATURES -->

        <details>
          <summary>
            <div>
              <span class="summary-number"> 04 </span>

              <strong>
                {text.features}
              </strong>
            </div>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div class="summary-content">
            {@render tagsRow(text.selectedFeatures, selectedFeatureLabels)}

            {@render valueRow(text.languages, languageOption?.label)}

            {#if customIntegration.trim()}
              {@render valueRow(text.integration, customIntegration.trim())}
            {/if}

            {#if finalRequirementLabels.length}
              {@render tagsRow(text.finalRequirements, finalRequirementLabels)}
            {/if}

            {#if finalRequirementNote.trim()}
              {@render valueRow(
                text.finalRequirementNote,
                finalRequirementNote.trim(),
              )}
            {/if}
          </div>
        </details>

        <!-- TIMELINE -->

        <details>
          <summary>
            <div>
              <span class="summary-number"> 05 </span>

              <strong>
                {text.timeline}
              </strong>
            </div>

            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="m5 7.5 5 5 5-5" />
            </svg>
          </summary>

          <div class="summary-content">
            {@render valueRow(text.start, projectStartOption?.label)}

            {@render valueRow(text.launch, launchOption?.label)}

            {@render valueRow(text.collaboration, collaborationOption?.label)}

            {@render valueRow(text.training, trainingOption?.label)}

            {#if ongoingSupportLabels.length}
              {@render tagsRow(text.ongoingSupport, ongoingSupportLabels)}
            {/if}

            {#if timelineNote.trim()}
              {@render valueRow(text.notes, timelineNote.trim())}
            {/if}
          </div>
        </details>
      </div>
    </section>

    <!-- ===================================================
         PACKAGE COMPARISON
    ==================================================== -->

    <section class="packages-section">
      <header class="section-header">
        <span class="section-label">
          {text.compareLabel}
        </span>

        <h2>
          {text.compareTitle}
        </h2>

        <p>
          {text.compareText}
        </p>
      </header>

      <PackageCards
        {language}
        recommendedPackage={activeRecommendedPackage}
        {selectedPageLabels}
        pageVolumeLabel={pageVolumeOption?.label ?? ""}
        {selectedFeatureLabels}
        websiteLanguageLabel={languageOption?.label ?? ""}
        {preparationSupportLabels}
        {ongoingSupportLabels}
        trainingLabel={trainingOption?.label ?? ""}
        {finalRequirementLabels}
        {customIntegration}
        {finalRequirementNote}
        bind:selectedPackage
      />
    </section>
  {/if}
</section>

{#snippet valueRow(label, value)}
  <div class="summary-row">
    <span>
      {label}
    </span>

    <strong class:empty={!value}>
      {value || text.empty}
    </strong>
  </div>
{/snippet}

{#snippet tagsRow(label, values)}
  <div class="summary-row">
    <span>
      {label}
    </span>

    {#if values.length}
      <div class="tag-list">
        {#each values as value}
          <span>
            {value}
          </span>
        {/each}
      </div>
    {:else}
      <strong class="empty">
        {text.none}
      </strong>
    {/if}
  </div>
{/snippet}

<style>
  .report {
    width: 100%;

    background: #080808;

    color: #f1f1f1;

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     SHARED LABELS
  ========================================================= */

  .eyebrow,
  .section-label {
    display: block;

    color: #0043ff;

    font-size: 12px;
    font-weight: 700;

    line-height: 1.3;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  /* =========================================================
     FINAL HEADER
  ========================================================= */

  .final-header {
    display: grid;

    grid-template-columns:
      minmax(0, 4fr)
      minmax(220px, 1fr);

    gap: clamp(28px, 4vw, 64px);

    align-items: end;

    padding: 24px 0;

    border-bottom: 1px solid #292929;
  }

  .final-header-copy {
    max-width: 720px;
  }

  .final-header-copy h1 {
    margin: 7px 0 8px;

    color: #f3f3f3;

    font-size: clamp(30px, 3.1vw, 42px);

    font-weight: 600;

    line-height: 1.04;

    letter-spacing: -0.04em;
  }

  .final-header-copy p {
    max-width: 640px;

    margin: 0;

    color: #969696;

    font-size: 12px;

    line-height: 1.55;
  }

  /* =========================================================
     FINAL RECOMMENDED SCOPE
  ========================================================= */

  .final-scope {
    min-width: 0;

    padding-left: 20px;

    border-left: 1px solid #303030;
  }

  .final-scope-label {
    display: block;

    margin-bottom: 8px;

    color: #777777;

    font-size: 12px;
    font-weight: 700;

    line-height: 1.4;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  .final-scope-value {
    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 9px;
  }

  .final-scope-value strong {
    color: #0043ff;

    font-size: clamp(23px, 2vw, 30px);

    font-weight: 600;

    line-height: 1;
  }

  .recommended-badge {
    display: inline-flex;

    min-height: 24px;

    align-items: center;

    padding: 0 7px;

    border: 1px solid #0043ff;

    color: #0043ff;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  .edit-button {
    display: inline-flex;

    min-height: 34px;

    align-items: center;

    justify-content: center;

    gap: 7px;

    margin-top: 12px;

    padding: 0;

    border: 0;

    background: transparent;

    color: #999999;

    font-family: inherit;

    font-size: 12px;
    font-weight: 700;

    cursor: pointer;
  }

  .edit-button:hover {
    color: #ffffff;
  }

  .edit-button svg {
    width: 15px;
    height: 15px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .edit-button:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  /* =========================================================
     FINAL LAYOUT
     80% FORM / 20% DASHBOARD
  ========================================================= */

  .final-layout {
    display: grid;

    grid-template-columns:
      minmax(0, 4fr)
      minmax(220px, 1fr);

    gap: clamp(20px, 2.5vw, 34px);

    align-items: start;

    margin-top: 22px;
  }

  .final-form-column {
    min-width: 0;
  }

  /*
   * The form component has its own outer margin.
   * Remove that here so it begins flush with the dashboard.
   */
  .final-form-column :global(.quote-form) {
    margin-top: 0;
  }

  /* =========================================================
     MINI DASHBOARD
  ========================================================= */

  .plan-dashboard {
    min-width: 0;

    padding: 20px;

    border: 1px solid #303030;

    border-top: 2px solid #0043ff;

    background: #0b0b0b;
  }

  .dashboard-header {
    padding-bottom: 16px;

    border-bottom: 1px solid #292929;
  }

  .dashboard-header h2 {
    margin: 6px 0 0;

    color: #eeeeee;

    font-size: 18px;

    font-weight: 600;

    line-height: 1.2;

    letter-spacing: -0.02em;
  }

  .dashboard-items {
    display: grid;
  }

  .dashboard-item {
    min-width: 0;

    padding: 15px 0;

    border-bottom: 1px solid #292929;
  }

  .dashboard-item:last-child {
    padding-bottom: 0;

    border-bottom: 0;
  }

  .dashboard-item > span {
    display: block;

    margin-bottom: 6px;

    color: #777777;

    font-size: 12px;
    font-weight: 700;

    line-height: 1.35;

    letter-spacing: 0.05em;

    text-transform: uppercase;
  }

  .dashboard-item strong {
    display: block;

    color: #dcdcdc;

    font-size: 14px;

    font-weight: 600;

    line-height: 1.4;

    overflow-wrap: anywhere;
  }

  .dashboard-item strong.dashboard-number {
    color: #0043ff;

    font-size: 28px;

    line-height: 1;
  }

  .dashboard-item small {
    display: block;

    margin-top: 5px;

    color: #707070;

    font-size: 12px;

    line-height: 1.3;
  }

  /* =========================================================
     COMPLETE HEADER
  ========================================================= */

  .report-header {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 18px;

    align-items: flex-start;

    padding: 28px 0 30px;

    border-bottom: 1px solid #292929;
  }

  .completion-mark {
    display: grid;

    width: 48px;
    height: 48px;

    place-items: center;

    border: 1px solid #0043ff;

    background: rgba(0, 67, 255, 0.08);

    color: #5f80ff;
  }

  .completion-mark > span {
    font-size: 11px;

    font-weight: 700;

    letter-spacing: 0.05em;
  }

  .completion-mark svg {
    width: 28px;
    height: 28px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .completion-mark.is-complete {
    color: #ffffff;

    background: #0043ff;
  }

  .header-copy h1 {
    max-width: 900px;

    margin: 8px 0 8px;

    color: #f3f3f3;

    font-size: clamp(30px, 3.3vw, 44px);

    font-weight: 600;

    line-height: 1.04;

    letter-spacing: -0.04em;
  }

  .header-copy p {
    max-width: 790px;

    margin: 0;

    color: #8e8e8e;

    font-size: 12px;

    line-height: 1.55;
  }

  /* =========================================================
     RECOMMENDATION
  ========================================================= */

  .recommendation {
    display: grid;

    grid-template-columns:
      minmax(220px, 0.65fr)
      minmax(0, 1.35fr);

    gap: 28px;

    margin-top: 28px;

    padding: 24px;

    border: 1px solid #303030;

    border-top: 2px solid #0043ff;

    background: #0b0b0b;
  }

  .recommendation-main h2 {
    margin: 8px 0 10px;

    color: #0043ff;

    font-size: clamp(34px, 4vw, 52px);

    font-weight: 600;

    line-height: 1;

    letter-spacing: -0.045em;
  }

  .recommendation-info {
    display: grid;

    grid-template-columns:
      minmax(120px, 0.35fr)
      minmax(0, 1fr);

    gap: 10px;
  }

  .recommendation-stat,
  .recommendation-reason {
    padding: 16px;

    border: 1px solid #292929;

    background: #090909;
  }

  .recommendation-stat > span,
  .recommendation-reason > span {
    display: block;

    margin-bottom: 8px;

    color: #666666;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .recommendation-stat strong {
    color: #0043ff;

    font-size: 15px;

    font-weight: 600;
  }

  .recommendation-reason p {
    margin: 0;

    color: #929292;

    font-size: 10px;

    line-height: 1.5;
  }

  /* =========================================================
     SUCCESS
  ========================================================= */

  .success-banner {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 16px;

    align-items: flex-start;

    margin-top: 28px;

    padding: 20px;

    border: 1px solid #303030;

    background: #0b0b0b;
  }

  .success-icon {
    display: grid;

    width: 38px;
    height: 38px;

    place-items: center;

    background: #0043ff;

    color: #ffffff;
  }

  .success-icon svg {
    width: 22px;
    height: 22px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.8;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .success-banner h2 {
    margin: 6px 0 5px;

    color: #eeeeee;

    font-size: clamp(20px, 2vw, 27px);

    font-weight: 600;

    line-height: 1.1;

    letter-spacing: -0.03em;
  }

  .success-banner p {
    max-width: 720px;

    margin: 0;

    color: #898989;

    font-size: 10.5px;

    line-height: 1.55;
  }

  /* =========================================================
     SECTIONS
  ========================================================= */

  .summary-section,
  .packages-section {
    margin-top: clamp(46px, 6vw, 72px);
  }

  .section-header {
    max-width: 850px;

    margin-bottom: 20px;
  }

  .section-header h2 {
    margin: 7px 0 6px;

    color: #eeeeee;

    font-size: clamp(24px, 2.5vw, 32px);

    font-weight: 600;

    line-height: 1.1;

    letter-spacing: -0.03em;
  }

  .section-header p {
    max-width: 700px;

    margin: 0;

    color: #858585;

    font-size: 11px;

    line-height: 1.5;
  }

  /* =========================================================
     SUMMARY
  ========================================================= */

  .summary-accordion {
    border-top: 1px solid #303030;
  }

  .summary-accordion details {
    border-bottom: 1px solid #303030;
  }

  .summary-accordion summary {
    display: flex;

    min-height: 58px;

    align-items: center;
    justify-content: space-between;

    gap: 20px;

    padding: 0 4px;

    color: #dcdcdc;

    cursor: pointer;

    list-style: none;
  }

  .summary-accordion summary::-webkit-details-marker {
    display: none;
  }

  .summary-accordion summary > div {
    display: flex;

    align-items: center;

    gap: 14px;
  }

  .summary-number {
    color: #0043ff;

    font-size: 12px;

    font-weight: 700;
  }

  .summary-accordion summary strong {
    font-size: 12px;

    font-weight: 600;
  }

  .summary-accordion summary > svg {
    width: 16px;
    height: 16px;

    fill: none;

    stroke: #737373;

    stroke-width: 1.5;

    transition: transform 150ms ease;
  }

  .summary-accordion details[open] summary > svg {
    transform: rotate(180deg);
  }

  .summary-content {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 0 26px;

    padding: 0 4px 18px;
  }

  .summary-row {
    min-width: 0;

    padding: 11px 0;

    border-top: 1px solid #242424;
  }

  .summary-row > span {
    display: block;

    margin-bottom: 6px;

    color: #666666;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .summary-row > strong {
    display: block;

    color: #0043ff;

    font-size: 10px;
    font-weight: 500;

    line-height: 1.45;

    overflow-wrap: anywhere;

    white-space: pre-wrap;
  }

  .summary-row > strong.empty {
    color: #666666;
  }

  .tag-list {
    display: flex;

    flex-wrap: wrap;

    gap: 5px;
  }

  .tag-list > span {
    padding: 4px 6px;

    border: 1px solid #414141;

    color: #0043ff;

    font-size: 12px;

    line-height: 1.3;
  }

  .link-list {
    display: grid;

    gap: 5px;
  }

  .link-list a {
    color: #0043ff;

    font-size: 12px;

    overflow-wrap: anywhere;

    text-decoration: underline;

    text-underline-offset: 3px;
  }

  .included-note {
    grid-column: 1 / -1;

    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 8px;

    align-items: start;

    margin: 0 0 4px;

    padding: 10px 11px;

    border: 1px solid #292929;

    background: #090909;

    color: #858585;

    font-size: 12px;

    line-height: 1.45;
  }

  .included-note svg {
    width: 14px;
    height: 14px;

    fill: none;

    stroke: #0043ff;

    stroke-width: 1.8;
  }

  /* =========================================================
     ACCESSIBILITY
  ========================================================= */

  .summary-accordion summary:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1000px) {
    .final-header {
      grid-template-columns:
        minmax(0, 3fr)
        minmax(200px, 1fr);

      gap: 24px;
    }

    .final-layout {
      grid-template-columns:
        minmax(0, 3fr)
        minmax(200px, 1fr);

      gap: 20px;
    }

    .plan-dashboard {
      padding: 17px;
    }
  }

  @media (max-width: 900px) {
    .recommendation {
      grid-template-columns: 1fr;
    }

    .recommendation-info {
      grid-template-columns:
        minmax(150px, 0.35fr)
        minmax(0, 1fr);
    }

    .dashboard-item strong.dashboard-number {
      font-size: 25px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 700px) {
    .final-header {
      grid-template-columns: 1fr;

      gap: 18px;

      align-items: start;

      padding: 20px 0;
    }

    .final-header-copy h1 {
      font-size: clamp(28px, 8vw, 38px);
    }

    .final-scope {
      padding: 15px 0 0;

      border-top: 1px solid #303030;

      border-left: 0;
    }

    .final-layout {
      grid-template-columns: 1fr;

      gap: 20px;

      margin-top: 18px;
    }

    .plan-dashboard {
      padding: 18px;
    }

    .dashboard-items {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      gap: 0 16px;
    }

    .dashboard-item-wide {
      grid-column: 1 / -1;
    }

    .dashboard-item:last-child {
      border-bottom: 1px solid #292929;
    }

    .report-header {
      grid-template-columns: 1fr;

      gap: 12px;
    }

    .completion-mark {
      width: 42px;
      height: 42px;
    }

    .header-copy h1 {
      font-size: clamp(28px, 8vw, 38px);
    }

    .recommendation {
      padding: 18px;
    }

    .recommendation-info {
      grid-template-columns: 1fr;
    }

    .success-banner {
      grid-template-columns: 1fr;

      padding: 18px;
    }

    .success-icon {
      width: 34px;
      height: 34px;
    }

    .summary-content {
      grid-template-columns: 1fr;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .dashboard-items {
      grid-template-columns: 1fr;
    }

    .dashboard-item-wide {
      grid-column: auto;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .summary-accordion summary > svg {
      transition: none;
    }
  }
</style>
