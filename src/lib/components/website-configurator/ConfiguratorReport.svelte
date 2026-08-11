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
          eyebrow: "Your personalised project recommendation",
          title: "Your website project overview",
          description:
            "Based on your answers, we have prepared a practical project summary and three concrete implementation scopes.",

          completedLabel: "Configuration complete",
          noPricesLabel: "No prices are shown",
          noPricesText:
            "The final quote will be prepared personally after the full scope has been reviewed.",

          recommendationTitle: "Recommended project scope",
          recommendationReasonTitle: "Why this scope fits",
          complexityLabel: "Estimated project complexity",

          complexityValues: {
            essential: "Focused",
            growth: "Moderate",
            advanced: "Advanced",
          },

          recommendationReasons: {
            essential:
              "Your selected structure is compact and the required functionality appears straightforward.",
            growth:
              "Your project combines several pages, additional functionality, content support or multilingual requirements.",
            advanced:
              "Your project includes advanced functionality, large content structures, payments, bookings, user accounts or external integrations.",
          },

          summaryTitle: "Your project summary",
          summaryDescription:
            "This overview reflects the information you selected during the configurator.",

          projectFoundationTitle: "Project foundation",
          websiteTypeLabel: "Website type",
          goalsLabel: "Main goals",
          statusLabel: "Current status",

          preparationTitle: "Content and design",
          contentLabel: "Content readiness",
          visualLabel: "Visual material",
          brandingLabel: "Brand identity",
          directionLabel: "Design direction",
          referencesLabel: "Visual references",
          supportNeedsLabel: "Content and design support",

          structureTitle: "Pages and structure",
          pagesLabel: "Selected pages",
          volumeLabel: "Repeating detail pages",
          customPagesLabel: "Custom pages",

          featuresTitle: "Features and technology",
          featuresLabel: "Selected features",
          languagesLabel: "Website languages",
          integrationLabel: "Special integration",
          finalRequirementsLabel: "Additional requirements",
          finalRequirementNoteLabel: "Additional functionality note",

          timelineTitle: "Timeline and ongoing support",
          startLabel: "Preferred project start",
          launchLabel: "Preferred launch",
          collaborationLabel: "Website management",
          ongoingSupportLabel: "Ongoing support",
          trainingLabel: "Training",
          notesLabel: "Additional notes",

          packagesEyebrow: "Compare concrete project scopes",
          packagesTitle: "Choose the scope that best matches your project",
          packagesDescription:
            "Each option below shows practical deliverables and how your selected pages, features and support requirements fit into the scope.",

          selectedPackageTitle: "Selected project scope",
          selectedPackageEmpty:
            "Select one of the three options above to continue.",

          selectedPackageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },

          nextStepTitle: "Ready for the next step?",
          nextStepDescription:
            "Choose a project scope and send the configuration to Zora Web Design. The full details will be reviewed before a personalised quote is prepared.",

          editButton: "Review answers",
          quoteButton: "Request personalised quote",
          quoteDisabled: "Select a project scope before requesting a quote.",

          emptyValue: "Not specified",
          noneSelected: "None selected",
          standardIncluded:
            "Essential technical, privacy, legal, cookie and 404 pages are included automatically.",
        }
      : {
          eyebrow: "Ihre persönliche Projektempfehlung",
          title: "Ihre Website-Projektübersicht",
          description:
            "Auf Grundlage Ihrer Antworten haben wir eine praktische Projektzusammenfassung und drei konkrete Umsetzungsumfänge erstellt.",

          completedLabel: "Konfiguration abgeschlossen",
          noPricesLabel: "Keine Preise werden angezeigt",
          noPricesText:
            "Das endgültige Angebot wird persönlich erstellt, nachdem der vollständige Umfang geprüft wurde.",

          recommendationTitle: "Empfohlener Projektumfang",
          recommendationReasonTitle: "Warum dieser Umfang passt",
          complexityLabel: "Geschätzte Projektkomplexität",

          complexityValues: {
            essential: "Fokussiert",
            growth: "Mittel",
            advanced: "Erweitert",
          },

          recommendationReasons: {
            essential:
              "Ihre ausgewählte Struktur ist kompakt und die benötigten Funktionen sind weitgehend überschaubar.",
            growth:
              "Ihr Projekt verbindet mehrere Seiten, zusätzliche Funktionen, Inhaltsunterstützung oder Mehrsprachigkeit.",
            advanced:
              "Ihr Projekt umfasst erweiterte Funktionen, große Inhaltsstrukturen, Zahlungen, Buchungen, Benutzerkonten oder externe Integrationen.",
          },

          summaryTitle: "Ihre Projektzusammenfassung",
          summaryDescription:
            "Diese Übersicht zeigt die Angaben, die Sie im Konfigurator ausgewählt haben.",

          projectFoundationTitle: "Projektgrundlage",
          websiteTypeLabel: "Website-Art",
          goalsLabel: "Wichtigste Ziele",
          statusLabel: "Aktueller Stand",

          preparationTitle: "Inhalte und Design",
          contentLabel: "Vorbereitung der Inhalte",
          visualLabel: "Bildmaterial",
          brandingLabel: "Branding",
          directionLabel: "Designrichtung",
          referencesLabel: "Visuelle Referenzen",
          supportNeedsLabel: "Unterstützung bei Inhalt und Design",

          structureTitle: "Seiten und Struktur",
          pagesLabel: "Ausgewählte Seiten",
          volumeLabel: "Wiederkehrende Detailseiten",
          customPagesLabel: "Individuelle Seiten",

          featuresTitle: "Funktionen und Technik",
          featuresLabel: "Ausgewählte Funktionen",
          languagesLabel: "Website-Sprachen",
          integrationLabel: "Besondere Integration",
          finalRequirementsLabel: "Weitere Anforderungen",
          finalRequirementNoteLabel: "Zusätzliche Funktionsbeschreibung",

          timelineTitle: "Zeitplan und laufende Betreuung",
          startLabel: "Gewünschter Projektstart",
          launchLabel: "Gewünschte Veröffentlichung",
          collaborationLabel: "Verwaltung der Website",
          ongoingSupportLabel: "Laufende Betreuung",
          trainingLabel: "Einführung",
          notesLabel: "Weitere Hinweise",

          packagesEyebrow: "Konkrete Projektumfänge vergleichen",
          packagesTitle:
            "Wählen Sie den Umfang, der am besten zu Ihrem Projekt passt",
          packagesDescription:
            "Jede Option zeigt konkrete Leistungen und wie Ihre ausgewählten Seiten, Funktionen und Unterstützungsanforderungen in den Umfang passen.",

          selectedPackageTitle: "Ausgewählter Projektumfang",
          selectedPackageEmpty:
            "Wählen Sie oben eine der drei Optionen aus, um fortzufahren.",

          selectedPackageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },

          nextStepTitle: "Bereit für den nächsten Schritt?",
          nextStepDescription:
            "Wählen Sie einen Projektumfang und senden Sie Ihre Konfiguration an Zora Web Design. Die vollständigen Angaben werden vor der Erstellung eines persönlichen Angebots geprüft.",

          editButton: "Antworten prüfen",
          quoteButton: "Persönliches Angebot anfordern",
          quoteDisabled: "Wählen Sie zuerst einen Projektumfang aus.",

          emptyValue: "Nicht angegeben",
          noneSelected: "Keine Auswahl",
          standardIncluded:
            "Grundlegende technische, Datenschutz-, Impressums-, Cookie- und 404-Seiten sind automatisch enthalten.",
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
    text.selectedPackageNames[activeRecommendedPackage] ??
      text.selectedPackageNames.growth,
  );

  const selectedPackageName = $derived(
    selectedPackage
      ? (text.selectedPackageNames[selectedPackage] ?? selectedPackage)
      : "",
  );

  function requestQuote() {
    if (!selectedPackage) return;

    onRequestQuote();
  }
</script>

<section class="report" aria-labelledby="configurator-report-title">
  <header class="report-hero">
    <div class="hero-copy">
      <span class="eyebrow">{text.eyebrow}</span>

      <h1 id="configurator-report-title">
        {text.title}
      </h1>

      <p class="hero-description">
        {text.description}
      </p>
    </div>

    <div class="hero-status">
      <div class="status-row">
        <span class="status-mark" aria-hidden="true">✓</span>
        <span>{text.completedLabel}</span>
      </div>

      <div class="status-row">
        <span class="status-mark" aria-hidden="true">—</span>
        <span>{text.noPricesLabel}</span>
      </div>

      <p>{text.noPricesText}</p>
    </div>
  </header>

  <section
    class="recommendation-overview"
    aria-labelledby="recommendation-title"
  >
    <div class="recommendation-heading">
      <span class="recommendation-number">01</span>

      <div>
        <span class="section-label">
          {text.recommendationTitle}
        </span>

        <h2 id="recommendation-title">
          {recommendedPackageName}
        </h2>
      </div>
    </div>

    <div class="recommendation-details">
      <article>
        <span>{text.complexityLabel}</span>

        <strong>
          {text.complexityValues[activeRecommendedPackage]}
        </strong>
      </article>

      <article>
        <span>{text.recommendationReasonTitle}</span>

        <p>
          {text.recommendationReasons[activeRecommendedPackage]}
        </p>
      </article>
    </div>
  </section>

  <section class="project-summary" aria-labelledby="project-summary-title">
    <div class="section-intro">
      <span class="section-number">02</span>

      <div>
        <span class="section-label">
          {text.summaryTitle}
        </span>

        <h2 id="project-summary-title">
          {websiteTypeOption?.label ?? text.emptyValue}
        </h2>

        <p>{text.summaryDescription}</p>
      </div>
    </div>

    <div class="summary-grid">
      <article class="summary-card">
        <div class="summary-card-heading">
          <span>01</span>
          <h3>{text.projectFoundationTitle}</h3>
        </div>

        <div class="summary-row">
          <span>{text.websiteTypeLabel}</span>

          <strong>
            {websiteTypeOption?.label ?? text.emptyValue}
          </strong>
        </div>

        <div class="summary-row">
          <span>{text.goalsLabel}</span>

          {#if selectedGoalOptions.length > 0}
            <div class="tag-list">
              {#each selectedGoalOptions as option}
                <span>{option.label}</span>
              {/each}
            </div>
          {:else}
            <strong class="empty-value">
              {text.noneSelected}
            </strong>
          {/if}
        </div>

        <div class="summary-row">
          <span>{text.statusLabel}</span>

          <strong>
            {projectStatusOption?.label ?? text.emptyValue}
          </strong>
        </div>
      </article>

      <article class="summary-card">
        <div class="summary-card-heading">
          <span>02</span>
          <h3>{text.preparationTitle}</h3>
        </div>

        {@render summaryValue(
          text.contentLabel,
          contentOption?.label,
          text.emptyValue,
        )}

        {@render summaryValue(
          text.visualLabel,
          visualOption?.label,
          text.emptyValue,
        )}

        {@render summaryValue(
          text.brandingLabel,
          brandingOption?.label,
          text.emptyValue,
        )}

        {@render summaryValue(
          text.directionLabel,
          directionOption?.label,
          text.emptyValue,
        )}

        <div class="summary-row">
          <span>{text.referencesLabel}</span>

          {#if validReferenceLinks.length > 0}
            <div class="link-list">
              {#each validReferenceLinks as link}
                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              {/each}
            </div>
          {:else}
            <strong class="empty-value">
              {text.noneSelected}
            </strong>
          {/if}
        </div>

        {@render tagSummary(
          text.supportNeedsLabel,
          preparationSupportLabels,
          text.noneSelected,
        )}
      </article>

      <article class="summary-card">
        <div class="summary-card-heading">
          <span>03</span>
          <h3>{text.structureTitle}</h3>
        </div>

        <div class="included-note">
          <span aria-hidden="true">✓</span>
          <p>{text.standardIncluded}</p>
        </div>

        {@render tagSummary(
          text.pagesLabel,
          selectedPageLabels,
          text.noneSelected,
        )}

        {@render summaryValue(
          text.volumeLabel,
          pageVolumeOption?.label,
          text.emptyValue,
        )}

        {@render tagSummary(
          text.customPagesLabel,
          enteredCustomPages,
          text.noneSelected,
        )}
      </article>

      <article class="summary-card">
        <div class="summary-card-heading">
          <span>04</span>
          <h3>{text.featuresTitle}</h3>
        </div>

        {@render tagSummary(
          text.featuresLabel,
          selectedFeatureLabels,
          text.noneSelected,
        )}

        {@render summaryValue(
          text.languagesLabel,
          languageOption?.label,
          text.emptyValue,
        )}

        {@render summaryValue(
          text.integrationLabel,
          customIntegration.trim(),
          text.emptyValue,
        )}

        {@render tagSummary(
          text.finalRequirementsLabel,
          finalRequirementLabels,
          text.noneSelected,
        )}

        {@render summaryValue(
          text.finalRequirementNoteLabel,
          finalRequirementNote.trim(),
          text.emptyValue,
        )}
      </article>

      <article class="summary-card summary-card-wide">
        <div class="summary-card-heading">
          <span>05</span>
          <h3>{text.timelineTitle}</h3>
        </div>

        <div class="timeline-summary-grid">
          {@render summaryValue(
            text.startLabel,
            projectStartOption?.label,
            text.emptyValue,
          )}

          {@render summaryValue(
            text.launchLabel,
            launchOption?.label,
            text.emptyValue,
          )}

          {@render summaryValue(
            text.collaborationLabel,
            collaborationOption?.label,
            text.emptyValue,
          )}

          {@render summaryValue(
            text.trainingLabel,
            trainingOption?.label,
            text.emptyValue,
          )}
        </div>

        {@render tagSummary(
          text.ongoingSupportLabel,
          ongoingSupportLabels,
          text.noneSelected,
        )}

        {@render summaryValue(
          text.notesLabel,
          timelineNote.trim(),
          text.emptyValue,
        )}
      </article>
    </div>
  </section>

  <section
    class="package-comparison"
    aria-labelledby="package-comparison-title"
  >
    <div class="section-intro">
      <span class="section-number">03</span>

      <div>
        <span class="section-label">
          {text.packagesEyebrow}
        </span>

        <h2 id="package-comparison-title">
          {text.packagesTitle}
        </h2>

        <p>{text.packagesDescription}</p>
      </div>
    </div>

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

  <section class="report-actions">
    <div class="selected-package-summary">
      <span>{text.selectedPackageTitle}</span>

      {#if selectedPackageName}
        <strong>{selectedPackageName}</strong>
      {:else}
        <p>{text.selectedPackageEmpty}</p>
      {/if}
    </div>

    <div class="next-step-copy">
      <span class="section-label">
        {text.nextStepTitle}
      </span>

      <p>{text.nextStepDescription}</p>
    </div>

    <div class="action-buttons">
      <button type="button" class="edit-button" onclick={onEditAnswers}>
        <span aria-hidden="true">←</span>
        {text.editButton}
      </button>

      <div class="quote-action">
        {#if !selectedPackage}
          <span>{text.quoteDisabled}</span>
        {/if}

        <button
          type="button"
          class="quote-button"
          disabled={!selectedPackage}
          onclick={requestQuote}
        >
          {text.quoteButton}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>
</section>

{#snippet summaryValue(label, value, emptyValue)}
  <div class="summary-row">
    <span>{label}</span>

    <strong class:empty-value={!value}>
      {value || emptyValue}
    </strong>
  </div>
{/snippet}

{#snippet tagSummary(label, values, emptyLabel)}
  <div class="summary-row">
    <span>{label}</span>

    {#if values.length > 0}
      <div class="tag-list">
        {#each values as value}
          <span>{value}</span>
        {/each}
      </div>
    {:else}
      <strong class="empty-value">
        {emptyLabel}
      </strong>
    {/if}
  </div>
{/snippet}

<style>
  .report {
    width: 100%;
    color: #f1f1f1;
    background: #080808;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .report-hero {
    min-height: 420px;
    display: grid;
    grid-template-columns:
      minmax(0, 1.25fr)
      minmax(280px, 0.75fr);
    border: 1px solid #292929;
    background: #0b0b0b;
  }

  .hero-copy {
    padding: clamp(30px, 5vw, 64px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow,
  .section-label {
    display: block;
    color: #777777;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 900px;
    margin: 15px 0 20px;
    color: #f3f3f3;
    font-size: clamp(28px, 3vw, 42px);
    font-weight: 650;
    line-height: 1.08;
    letter-spacing: -0.03em;
  }

  .hero-description {
    max-width: 760px;
    margin: 0;
    color: #a5a5a5;
    font-size: 15px;
    line-height: 1.7;
  }

  .hero-status {
    padding: clamp(28px, 4vw, 46px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    border-left: 1px solid #292929;
    background: #0d0d0d;
  }

  .status-row {
    min-height: 54px;
    display: grid;
    grid-template-columns: 28px minmax(0, 1fr);
    gap: 12px;
    align-items: center;
    border-bottom: 1px solid #292929;
    color: #c5c5c5;
    font-size: 12px;
    font-weight: 600;
  }

  .status-mark {
    color: #0043ff;
  }

  .hero-status > p {
    margin: 22px 0 0;
    color: #7f7f7f;
    font-size: 12px;
    line-height: 1.65;
  }

  .recommendation-overview {
    margin-top: clamp(30px, 5vw, 56px);
    padding: clamp(28px, 4vw, 48px);
    display: grid;
    grid-template-columns:
      minmax(250px, 0.75fr)
      minmax(0, 1.25fr);
    gap: clamp(30px, 5vw, 70px);
    border: 1px solid #292929;
    border-top: 3px solid #0043ff;
    background: #0c0c0c;
  }

  .recommendation-heading {
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 16px;
  }

  .recommendation-number,
  .section-number {
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
  }

  .recommendation-heading h2 {
    margin: 9px 0 0;
    color: #4f76ff;
    font-size: clamp(34px, 4vw, 58px);
    font-weight: 650;
    line-height: 1;
    letter-spacing: -0.05em;
  }

  .recommendation-details {
    display: grid;
    grid-template-columns:
      minmax(150px, 0.5fr)
      minmax(0, 1fr);
    gap: 20px;
  }

  .recommendation-details article {
    padding: 20px;
    border: 1px solid #303030;
    background: #090909;
  }

  .recommendation-details article > span {
    display: block;
    margin-bottom: 12px;
    color: #727272;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .recommendation-details strong {
    color: #4f76ff;
    font-size: 20px;
  }

  .recommendation-details p {
    margin: 0;
    color: #9d9d9d;
    font-size: 13px;
    line-height: 1.65;
  }

  .project-summary,
  .package-comparison {
    margin-top: clamp(56px, 8vw, 110px);
  }

  .section-intro {
    max-width: 1050px;
    margin-bottom: 28px;
    display: grid;
    grid-template-columns: 30px minmax(0, 1fr);
    gap: 16px;
  }

  .section-intro h2 {
    margin: 10px 0 12px;
    color: #eeeeee;
    font-size: clamp(22px, 2.6vw, 34px);
    font-weight: 650;
    line-height: 1.1;
    letter-spacing: -0.035em;
  }

  .section-intro p {
    max-width: 800px;
    margin: 0;
    color: #939393;
    font-size: 14px;
    line-height: 1.65;
  }

  .summary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    border-top: 1px solid #303030;
    border-left: 1px solid #303030;
  }

  .summary-card {
    min-width: 0;
    padding: clamp(22px, 3vw, 34px);
    border-right: 1px solid #303030;
    border-bottom: 1px solid #303030;
    background: #0b0b0b;
  }

  .summary-card-wide {
    grid-column: 1 / -1;
  }

  .summary-card-heading {
    margin-bottom: 20px;
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    gap: 12px;
  }

  .summary-card-heading > span {
    color: #0043ff;
    font-size: 9px;
    font-weight: 700;
  }

  .summary-card-heading h3 {
    margin: 0;
    color: #eeeeee;
    font-size: 18px;
    font-weight: 600;
  }

  .summary-row {
    padding: 15px 0;
    border-top: 1px solid #292929;
  }

  .summary-row > span {
    display: block;
    margin-bottom: 8px;
    color: #707070;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .summary-row strong {
    display: block;
    color: #4f76ff;
    font-size: 12px;
    font-weight: 500;
    line-height: 1.55;
    overflow-wrap: anywhere;
    white-space: pre-wrap;
  }

  .empty-value {
    color: #707070 !important;
    font-weight: 400 !important;
  }

  .tag-list {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .tag-list span {
    padding: 6px 8px;
    border: 1px solid #d0d0d0;
    background: #0c0c0c;
    color: #4f76ff;
    font-size: 10px;
  }

  .link-list {
    display: grid;
    gap: 7px;
  }

  .link-list a {
    color: #4f76ff;
    font-size: 11px;
    overflow-wrap: anywhere;
  }

  .included-note {
    margin-bottom: 8px;
    padding: 14px;
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 10px;
    border: 1px solid #303030;
    background: #090909;
  }

  .included-note > span {
    color: #0043ff;
  }

  .included-note p {
    margin: 0;
    color: #8f8f8f;
    font-size: 11px;
    line-height: 1.55;
  }

  .timeline-summary-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 28px;
  }

  .report-actions {
    margin-top: clamp(40px, 7vw, 86px);
    padding: clamp(26px, 4vw, 48px);
    display: grid;
    grid-template-columns:
      minmax(190px, 0.65fr)
      minmax(0, 1fr);
    gap: 28px 50px;
    border: 1px solid #292929;
    background: #0c0c0c;
  }

  .selected-package-summary {
    padding-right: 30px;
    border-right: 1px solid #303030;
  }

  .selected-package-summary > span {
    display: block;
    margin-bottom: 10px;
    color: #727272;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .selected-package-summary strong {
    color: #4f76ff;
    font-size: 30px;
  }

  .selected-package-summary p,
  .next-step-copy p {
    margin: 0;
    color: #858585;
    font-size: 12px;
    line-height: 1.6;
  }

  .next-step-copy p {
    max-width: 680px;
    margin-top: 10px;
  }

  .action-buttons {
    grid-column: 1 / -1;
    padding-top: 24px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 20px;
    border-top: 1px solid #303030;
  }

  .edit-button,
  .quote-button {
    min-height: 52px;
    padding: 0 20px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 11px;
    border-radius: 0;
    font-family: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .edit-button {
    border: 1px solid #3b3b3b;
    background: transparent;
    color: #bdbdbd;
  }

  .quote-action {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
  }

  .quote-action > span {
    max-width: 250px;
    color: #666666;
    font-size: 10px;
    text-align: right;
  }

  .quote-button {
    min-width: 230px;
    border: 1px solid #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  .quote-button:disabled {
    border-color: #292929;
    background: #151515;
    color: #555555;
    cursor: not-allowed;
  }

  @media (max-width: 1050px) {
    .report-hero,
    .recommendation-overview {
      grid-template-columns: 1fr;
    }

    .hero-status {
      border-top: 1px solid #292929;
      border-left: 0;
    }

    .summary-grid {
      grid-template-columns: 1fr;
    }

    .summary-card-wide {
      grid-column: auto;
    }
  }

  @media (max-width: 760px) {
    h1 {
      font-size: clamp(36px, 11vw, 52px);
    }

    .recommendation-details,
    .timeline-summary-grid,
    .report-actions {
      grid-template-columns: 1fr;
    }

    .selected-package-summary {
      padding-right: 0;
      padding-bottom: 22px;
      border-right: 0;
      border-bottom: 1px solid #303030;
    }

    .action-buttons {
      align-items: stretch;
      flex-direction: column-reverse;
    }

    .quote-action {
      align-items: stretch;
      flex-direction: column;
    }

    .quote-action > span {
      max-width: none;
      text-align: left;
    }

    .edit-button,
    .quote-button {
      width: 100%;
    }
  }
</style>
