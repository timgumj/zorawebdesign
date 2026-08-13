<script>
  import PackageCards from "./PackageCards.svelte";

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

    onEditAnswers = () => {},
    onRequestQuote = () => {},
  } = $props();

  const text = $derived(
    language === "en"
      ? {
          eyebrow: "Planner complete",

          title: "Your website project plan",

          description:
            "We have combined your answers into a practical project recommendation. Review the summary, choose your preferred scope and send it to Zora Web Design for a personalised quote.",

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

          summaryLabel: "Project summary",

          summaryTitle: "Review your planner",

          summaryText:
            "Open any section below to review the answers you provided.",

          foundation: "Project foundation",

          preparation: "Content and design",

          structure: "Pages and structure",

          features: "Features and technology",

          timeline: "Timeline and support",

          websiteType: "Website type",

          goals: "Main goals",

          status: "Current status",

          content: "Content readiness",

          visual: "Visual material",

          branding: "Brand identity",

          direction: "Design direction",

          references: "Visual references",

          supportNeeds: "Content and design support",

          pages: "Selected pages",

          volume: "Repeating detail pages",

          customPages: "Custom pages",

          selectedFeatures: "Selected features",

          languages: "Website languages",

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

          compareTitle: "Choose the scope that fits your project",

          compareText:
            "Your recommended option is highlighted. You can still choose another scope if it feels more appropriate.",

          selectedScope: "Selected scope",

          noSelection: "Choose one of the scopes above to continue.",

          packageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },

          nextLabel: "Next step",

          nextTitle: "Ready to discuss your project?",

          nextText:
            "Send your completed planner to Zora Web Design. The project will be reviewed personally before a final quote is prepared.",

          personalQuote: "Personal quote only — no automatic pricing.",

          edit: "Review answers",

          quote: "Request personalised quote",

          quoteDisabled: "Choose a project scope first.",

          empty: "Not specified",

          none: "None selected",
        }
      : {
          eyebrow: "Planner abgeschlossen",

          title: "Ihr Website-Projektplan",

          description:
            "Ihre Antworten wurden zu einer konkreten Projektempfehlung zusammengeführt. Prüfen Sie die Zusammenfassung, wählen Sie Ihren bevorzugten Umfang und senden Sie die Planung für ein persönliches Angebot an Zora Web Design.",

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

          summaryLabel: "Projektübersicht",

          summaryTitle: "Ihre Planung prüfen",

          summaryText:
            "Öffnen Sie einen Bereich, um Ihre Angaben noch einmal zu kontrollieren.",

          foundation: "Projektgrundlage",

          preparation: "Inhalte und Design",

          structure: "Seiten und Struktur",

          features: "Funktionen und Technik",

          timeline: "Zeitplan und Betreuung",

          websiteType: "Website-Art",

          goals: "Wichtigste Ziele",

          status: "Aktueller Stand",

          content: "Vorbereitung der Inhalte",

          visual: "Bildmaterial",

          branding: "Branding",

          direction: "Designrichtung",

          references: "Visuelle Referenzen",

          supportNeeds: "Unterstützung bei Inhalt und Design",

          pages: "Ausgewählte Seiten",

          volume: "Wiederkehrende Detailseiten",

          customPages: "Individuelle Seiten",

          selectedFeatures: "Ausgewählte Funktionen",

          languages: "Website-Sprachen",

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

          compareTitle: "Wählen Sie den passenden Umfang",

          compareText:
            "Die empfohlene Option ist hervorgehoben. Sie können trotzdem einen anderen Umfang wählen, wenn dieser besser zu Ihrem Projekt passt.",

          selectedScope: "Gewählter Umfang",

          noSelection:
            "Wählen Sie oben einen Projektumfang aus, um fortzufahren.",

          packageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },

          nextLabel: "Nächster Schritt",

          nextTitle: "Bereit, Ihr Projekt zu besprechen?",

          nextText:
            "Senden Sie Ihren vollständigen Website Planner an Zora Web Design. Das Projekt wird persönlich geprüft, bevor ein finales Angebot erstellt wird.",

          personalQuote:
            "Persönliches Angebot — keine automatische Preisberechnung.",

          edit: "Antworten prüfen",

          quote: "Persönliches Angebot anfordern",

          quoteDisabled: "Wählen Sie zuerst einen Projektumfang.",

          empty: "Nicht angegeben",

          none: "Keine Auswahl",
        },
  );

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

  const selectedPackageName = $derived(
    selectedPackage
      ? (text.packageNames[selectedPackage] ?? selectedPackage)
      : "",
  );

  function requestQuote() {
    if (!selectedPackage) {
      return;
    }

    onRequestQuote();
  }
</script>

<section class="report" aria-labelledby="configurator-report-title">
  <!-- =====================================================
       COMPLETE
  ====================================================== -->

  <header class="report-header">
    <div class="completion-mark">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <circle cx="16" cy="16" r="13" />

        <path d="m10 16 4 4 8-9" />
      </svg>
    </div>

    <div class="header-copy">
      <span class="eyebrow">
        {text.eyebrow}
      </span>

      <h1 id="configurator-report-title">
        {text.title}
      </h1>

      <p>
        {text.description}
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
        {language === "en" ? "Recommended" : "Empfohlen"}
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
       SUMMARY
  ====================================================== -->

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

  <!-- =====================================================
       PACKAGES
  ====================================================== -->

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

  <!-- =====================================================
       FINAL CTA
  ====================================================== -->

  <section class="final-action">
    <div class="final-copy">
      <span class="section-label">
        {text.nextLabel}
      </span>

      <h2>
        {text.nextTitle}
      </h2>

      <p>
        {text.nextText}
      </p>

      <div class="personal-quote-note">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3 4 7v6c0 5 3 8 8 9 5-1 8-4 8-9V7l-8-4Z" />
          <path d="M9 12h6M12 9v6" />
        </svg>

        <span>
          {text.personalQuote}
        </span>
      </div>
    </div>

    <div class="selected-scope">
      <span>
        {text.selectedScope}
      </span>

      {#if selectedPackageName}
        <strong>
          {selectedPackageName}
        </strong>
      {:else}
        <p>
          {text.noSelection}
        </p>
      {/if}
    </div>

    <div class="actions">
      <button type="button" class="edit-button" onclick={onEditAnswers}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="M11.75 4.75 6.5 10l5.25 5.25" />
        </svg>

        <span>
          {text.edit}
        </span>
      </button>

      <div class="quote-area">
        {#if !selectedPackage}
          <span class="quote-hint">
            {text.quoteDisabled}
          </span>
        {/if}

        <button
          type="button"
          class="quote-button"
          disabled={!selectedPackage}
          onclick={requestQuote}
        >
          <span>
            {text.quote}
          </span>

          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
          </svg>
        </button>
      </div>
    </div>
  </section>
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
     HEADER
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

  .completion-mark svg {
    width: 28px;
    height: 28px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .eyebrow,
  .section-label {
    display: block;

    color: #5f80ff;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.08em;

    text-transform: uppercase;
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
    max-width: 780px;

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

    color: #6f8dff;

    font-size: clamp(34px, 4vw, 52px);

    font-weight: 600;

    line-height: 1;

    letter-spacing: -0.045em;
  }

  .recommended-badge {
    display: inline-flex;

    min-height: 22px;

    align-items: center;

    padding: 0 7px;

    border: 1px solid #0043ff;

    color: #6f8dff;

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
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

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .recommendation-stat strong {
    color: #6f8dff;

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
     SECTIONS
  ========================================================= */

  .summary-section,
  .packages-section,
  .final-action {
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
     SUMMARY ACCORDION
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
    color: #5f80ff;

    font-size: 9px;
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

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .summary-row > strong {
    display: block;

    color: #6f8dff;

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

    color: #6f8dff;

    font-size: 8.5px;

    line-height: 1.3;
  }

  .link-list {
    display: grid;

    gap: 5px;
  }

  .link-list a {
    color: #6f8dff;

    font-size: 9px;

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

    font-size: 9px;

    line-height: 1.45;
  }

  .included-note svg {
    width: 14px;
    height: 14px;

    fill: none;

    stroke: #5f80ff;

    stroke-width: 1.8;
  }

  /* =========================================================
     FINAL ACTION
  ========================================================= */

  .final-action {
    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(180px, 0.38fr);

    gap: 28px;

    padding: 24px;

    border: 1px solid #303030;

    border-top: 2px solid #0043ff;

    background: #0b0b0b;
  }

  .final-copy h2 {
    margin: 7px 0 7px;

    color: #eeeeee;

    font-size: clamp(23px, 2.5vw, 31px);

    font-weight: 600;

    line-height: 1.1;

    letter-spacing: -0.03em;
  }

  .final-copy > p {
    max-width: 680px;

    margin: 0;

    color: #898989;

    font-size: 10.5px;

    line-height: 1.5;
  }

  .personal-quote-note {
    display: flex;

    align-items: center;

    gap: 8px;

    margin-top: 14px;

    color: #777777;

    font-size: 9px;
  }

  .personal-quote-note svg {
    width: 18px;
    height: 18px;

    fill: none;

    stroke: #5f80ff;

    stroke-width: 1.4;
  }

  .selected-scope {
    padding-left: 22px;

    border-left: 1px solid #303030;
  }

  .selected-scope > span {
    display: block;

    margin-bottom: 8px;

    color: #666666;

    font-size: 8px;
    font-weight: 700;

    text-transform: uppercase;

    letter-spacing: 0.07em;
  }

  .selected-scope strong {
    display: block;

    color: #6f8dff;

    font-size: clamp(24px, 2.5vw, 32px);

    font-weight: 600;

    line-height: 1;
  }

  .selected-scope p {
    margin: 0;

    color: #707070;

    font-size: 9.5px;

    line-height: 1.45;
  }

  .actions {
    grid-column: 1 / -1;

    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;

    padding-top: 18px;

    border-top: 1px solid #303030;
  }

  .edit-button,
  .quote-button {
    display: inline-flex;

    min-height: 44px;

    align-items: center;
    justify-content: center;

    gap: 8px;

    border-radius: 0;

    font-family: inherit;

    font-size: 9px;
    font-weight: 700;

    cursor: pointer;
  }

  .edit-button svg,
  .quote-button svg {
    width: 15px;
    height: 15px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.6;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .edit-button {
    padding: 0 4px;

    border: 0;

    background: transparent;

    color: #999999;
  }

  .edit-button:hover {
    color: #ffffff;
  }

  .quote-area {
    display: flex;

    align-items: center;

    gap: 12px;
  }

  .quote-hint {
    max-width: 200px;

    color: #626262;

    font-size: 8.5px;

    line-height: 1.4;

    text-align: right;
  }

  .quote-button {
    min-width: 210px;

    padding: 0 15px;

    border: 1px solid #0043ff;

    background: #0043ff;

    color: #ffffff;
  }

  .quote-button:hover:not(:disabled) {
    background: #1b56ff;

    border-color: #1b56ff;
  }

  .quote-button:disabled {
    border-color: #292929;

    background: #151515;

    color: #555555;

    cursor: default;
  }

  .summary-accordion summary:focus-visible,
  .edit-button:focus-visible,
  .quote-button:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
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
  }

  @media (max-width: 700px) {
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

    .summary-content {
      grid-template-columns: 1fr;
    }

    .final-action {
      grid-template-columns: 1fr;

      padding: 18px;
    }

    .selected-scope {
      padding: 18px 0 0;

      border-top: 1px solid #303030;

      border-left: 0;
    }

    .actions {
      align-items: stretch;

      flex-direction: column-reverse;
    }

    .quote-area {
      width: 100%;

      align-items: stretch;

      flex-direction: column;
    }

    .quote-hint {
      max-width: none;

      text-align: left;
    }

    .quote-button {
      width: 100%;
    }

    .edit-button {
      align-self: flex-start;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .summary-accordion summary > svg {
      transition: none;
    }
  }
</style>
