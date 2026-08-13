<script>
  let {
    language = "de",
    recommendedPackage = "growth",
    selectedPackage = $bindable(""),
    selectedPageLabels = [],
    pageVolumeLabel = "",
    selectedFeatureLabels = [],
    websiteLanguageLabel = "",
    preparationSupportLabels = [],
    ongoingSupportLabels = [],
    trainingLabel = "",
    finalRequirementLabels = [],
    customIntegration = "",
    finalRequirementNote = "",
  } = $props();

  const text = $derived(
    language === "en"
      ? {
          recommended: "Recommended",
          selected: "Selected",
          select: "Choose this scope",
          selectedOption: "Selected",
          packageLabel: "Project scope",
          suitableFor: "Best suited for",
          yourProject: "Your project",
          details: "Scope details",
          includes: "Included",
          limitations: "Usually not included",
          finalReview:
            "The final scope will be confirmed after your complete planner has been reviewed.",

          emptyPages: "No specific project pages selected",
          emptyFeatures: "No additional functionality selected",
          oneLanguageFallback: "One website language",

          essential: {
            name: "Essential",

            tagline:
              "A focused professional website with a compact structure and straightforward functionality.",

            suitable:
              "Smaller businesses, freelancers and organisations with prepared content and uncomplicated requirements.",

            pageScope: "Up to 5 core project pages",

            included: [
              "Custom responsive design",
              "Core page structure",
              "Contact or enquiry form",
              "Basic SEO setup",
              "Privacy, legal, cookie and 404 pages",
              "Technical testing and launch preparation",
              "Basic website handover guidance",
            ],

            limitations: [
              "Complex booking or payment systems",
              "Member areas and custom databases",
              "Multiple complex integrations",
              "Extensive content production",
            ],
          },

          growth: {
            name: "Growth",

            tagline:
              "A complete business or organisation website with more content, functionality and strategic support.",

            suitable:
              "Established businesses, organisations and professional services requiring more pages, multilingual content or selected integrations.",

            pageScope: "Up to 10–12 project pages",

            included: [
              "Everything required for the Essential foundation",
              "Expanded page architecture",
              "Reusable service, project, team or content sections",
              "Advanced enquiry or registration forms",
              "Multilingual structure",
              "Selected newsletter, analytics, calendar or CRM connections",
              "Content and conversion guidance",
              "Enhanced SEO structure",
              "Training and launch support",
            ],

            limitations: [
              "Large online shops",
              "Complex member dashboards",
              "Large custom databases",
              "Several complex API workflows",
            ],
          },

          advanced: {
            name: "Advanced",

            tagline:
              "A technically demanding or content-heavy website with custom functionality and integrations.",

            suitable:
              "Shops, booking platforms, membership systems, education portals and custom web applications.",

            pageScope:
              "Custom architecture based on the complete project requirements",

            included: [
              "Custom information architecture",
              "Recurring structured content",
              "Payments, bookings or donations",
              "User accounts and protected content",
              "Advanced search and filtering",
              "CRM, API and software integrations",
              "Automated workflows",
              "Advanced multilingual setup",
              "Extended performance and security testing",
              "Technical documentation and training",
            ],

            limitations: [
              "Technical scope requires review before final quotation",
              "Third-party licenses are quoted separately",
              "Complex integrations may require a discovery phase",
            ],
          },
        }
      : {
          recommended: "Empfohlen",
          selected: "Ausgewählt",
          select: "Diesen Umfang wählen",
          selectedOption: "Ausgewählt",
          packageLabel: "Projektumfang",
          suitableFor: "Besonders geeignet für",
          yourProject: "Ihr Projekt",
          details: "Umfang im Detail",
          includes: "Enthalten",
          limitations: "Normalerweise nicht enthalten",
          finalReview:
            "Der endgültige Umfang wird bestätigt, nachdem Ihr vollständiger Website Planner geprüft wurde.",

          emptyPages: "Keine bestimmten Projektseiten ausgewählt",
          emptyFeatures: "Keine zusätzlichen Funktionen ausgewählt",
          oneLanguageFallback: "Eine Website-Sprache",

          essential: {
            name: "Essential",

            tagline:
              "Eine fokussierte professionelle Website mit kompakter Struktur und klaren Standardfunktionen.",

            suitable:
              "Kleinere Unternehmen, Freelancer und Organisationen mit vorbereiteten Inhalten und überschaubaren Anforderungen.",

            pageScope: "Bis zu 5 zentrale Projektseiten",

            included: [
              "Individuelles responsives Design",
              "Zentrale Seitenstruktur",
              "Kontakt- oder Anfrageformular",
              "Grundlegende SEO-Einrichtung",
              "Datenschutz-, Impressums-, Cookie- und 404-Seiten",
              "Technische Tests und Launch-Vorbereitung",
              "Grundlegende Website-Übergabe",
            ],

            limitations: [
              "Komplexe Buchungs- oder Zahlungssysteme",
              "Mitgliederbereiche und individuelle Datenbanken",
              "Mehrere komplexe Integrationen",
              "Umfangreiche Content-Produktion",
            ],
          },

          growth: {
            name: "Growth",

            tagline:
              "Eine vollständige Unternehmens- oder Organisationswebsite mit mehr Inhalt, Funktionen und strategischer Unterstützung.",

            suitable:
              "Etablierte Unternehmen, Organisationen und Dienstleister mit mehr Seiten, mehreren Sprachen oder ausgewählten Integrationen.",

            pageScope: "Bis zu 10–12 Projektseiten",

            included: [
              "Alle wichtigen Grundlagen aus Essential",
              "Erweiterte Seitenarchitektur",
              "Wiederverwendbare Bereiche für Leistungen, Projekte, Team oder Inhalte",
              "Erweiterte Anfrage- oder Anmeldeformulare",
              "Mehrsprachige Struktur",
              "Ausgewählte Newsletter-, Analyse-, Kalender- oder CRM-Verbindungen",
              "Beratung zu Inhaltsstruktur und Conversion",
              "Stärkere SEO-Struktur",
              "Schulung und Launch-Unterstützung",
            ],

            limitations: [
              "Große Onlineshops",
              "Komplexe Mitglieder-Dashboards",
              "Große individuelle Datenbanken",
              "Mehrere komplexe API-Abläufe",
            ],
          },

          advanced: {
            name: "Advanced",

            tagline:
              "Eine technisch anspruchsvolle oder inhaltsreiche Website mit individuellen Funktionen und Integrationen.",

            suitable:
              "Shops, Buchungsplattformen, Mitgliederbereiche, Bildungsportale und individuelle Webanwendungen.",

            pageScope:
              "Individuelle Architektur auf Basis der vollständigen Projektanforderungen",

            included: [
              "Individuelle Informationsarchitektur",
              "Wiederkehrende strukturierte Inhalte",
              "Zahlungen, Buchungen oder Spenden",
              "Benutzerkonten und geschützte Inhalte",
              "Erweiterte Suche und Filter",
              "CRM-, API- und Software-Integrationen",
              "Automatisierte Abläufe",
              "Erweiterte Mehrsprachigkeit",
              "Umfangreiche Performance- und Sicherheitstests",
              "Technische Dokumentation und Schulung",
            ],

            limitations: [
              "Technischer Umfang muss vor dem finalen Angebot geprüft werden",
              "Externe Lizenzen werden separat kalkuliert",
              "Komplexe Integrationen können eine Planungsphase benötigen",
            ],
          },
        },
  );

  const packageOrder = ["essential", "growth", "advanced"];

  const pageCount = $derived(selectedPageLabels.length);

  const packageOptions = $derived(
    packageOrder.map((packageId) => ({
      id: packageId,
      ...text[packageId],
      personalisedRequirements: buildPersonalisedRequirements(packageId),
    })),
  );

  function unique(values) {
    return [...new Set(values.filter(Boolean))];
  }

  function joinPreview(values, limit) {
    const cleanValues = unique(values);

    if (!cleanValues.length) {
      return "";
    }

    const visible = cleanValues.slice(0, limit);

    const hiddenCount = cleanValues.length - visible.length;

    return hiddenCount > 0
      ? `${visible.join(", ")} +${hiddenCount}`
      : visible.join(", ");
  }

  function buildPersonalisedRequirements(packageId) {
    const requirements = [];

    const pageLimits = {
      essential: 5,
      growth: 12,
      advanced: Infinity,
    };

    const featureLimits = {
      essential: 3,
      growth: 7,
      advanced: Infinity,
    };

    const pageLimit = pageLimits[packageId];

    const featureLimit = featureLimits[packageId];

    if (pageCount > 0) {
      const preview =
        packageId === "advanced"
          ? joinPreview(selectedPageLabels, selectedPageLabels.length)
          : joinPreview(selectedPageLabels, pageLimit);

      if (language === "en") {
        requirements.push(
          pageCount > pageLimit
            ? `Up to ${pageLimit} of your ${pageCount} selected pages: ${preview}`
            : `Selected pages: ${preview}`,
        );
      } else {
        requirements.push(
          pageCount > pageLimit
            ? `Bis zu ${pageLimit} Ihrer ${pageCount} gewählten Seiten: ${preview}`
            : `Gewählte Seiten: ${preview}`,
        );
      }
    } else {
      requirements.push(text.emptyPages);
    }

    if (pageVolumeLabel) {
      requirements.push(
        language === "en"
          ? `Detail pages: ${pageVolumeLabel}`
          : `Detailseiten: ${pageVolumeLabel}`,
      );
    }

    requirements.push(
      language === "en"
        ? `Languages: ${websiteLanguageLabel || text.oneLanguageFallback}`
        : `Sprachen: ${websiteLanguageLabel || text.oneLanguageFallback}`,
    );

    if (selectedFeatureLabels.length) {
      requirements.push(
        language === "en"
          ? `Functions: ${joinPreview(selectedFeatureLabels, featureLimit)}`
          : `Funktionen: ${joinPreview(selectedFeatureLabels, featureLimit)}`,
      );
    } else {
      requirements.push(text.emptyFeatures);
    }

    if (preparationSupportLabels.length) {
      requirements.push(
        language === "en"
          ? `Content support: ${joinPreview(
              preparationSupportLabels,
              packageId === "essential" ? 2 : preparationSupportLabels.length,
            )}`
          : `Content-Unterstützung: ${joinPreview(
              preparationSupportLabels,
              packageId === "essential" ? 2 : preparationSupportLabels.length,
            )}`,
      );
    }

    if (trainingLabel) {
      requirements.push(
        language === "en"
          ? `Handover: ${trainingLabel}`
          : `Übergabe: ${trainingLabel}`,
      );
    }

    if (packageId !== "essential" && ongoingSupportLabels.length) {
      requirements.push(
        language === "en"
          ? `Support: ${joinPreview(
              ongoingSupportLabels,
              packageId === "growth" ? 3 : ongoingSupportLabels.length,
            )}`
          : `Betreuung: ${joinPreview(
              ongoingSupportLabels,
              packageId === "growth" ? 3 : ongoingSupportLabels.length,
            )}`,
      );
    }

    if (packageId !== "essential" && customIntegration.trim()) {
      requirements.push(
        language === "en"
          ? `Integration: ${customIntegration.trim()}`
          : `Integration: ${customIntegration.trim()}`,
      );
    }

    if (packageId === "advanced" && finalRequirementLabels.length) {
      requirements.push(
        language === "en"
          ? `Additional requirements: ${joinPreview(
              finalRequirementLabels,
              finalRequirementLabels.length,
            )}`
          : `Weitere Anforderungen: ${joinPreview(
              finalRequirementLabels,
              finalRequirementLabels.length,
            )}`,
      );
    }

    if (packageId === "advanced" && finalRequirementNote.trim()) {
      requirements.push(
        language === "en"
          ? `Custom workflow: ${finalRequirementNote.trim()}`
          : `Individueller Ablauf: ${finalRequirementNote.trim()}`,
      );
    }

    return requirements;
  }

  function selectPackage(packageId) {
    selectedPackage = packageId;
  }
</script>

<div class="package-grid" role="radiogroup" aria-label={text.packageLabel}>
  {#each packageOptions as packageOption}
    {@const isRecommended = packageOption.id === recommendedPackage}

    {@const isSelected = packageOption.id === selectedPackage}

    <article
      class="package-card"
      class:recommended={isRecommended}
      class:selected={isSelected}
    >
      <div class="package-top">
        <div>
          <span class="package-kicker">
            {text.packageLabel}
          </span>

          <h3>
            {packageOption.name}
          </h3>
        </div>

        <div class="badges">
          {#if isRecommended}
            <span class="recommended-badge">
              {text.recommended}
            </span>
          {/if}

          {#if isSelected}
            <span class="selected-badge">
              {text.selected}
            </span>
          {/if}
        </div>
      </div>

      <p class="tagline">
        {packageOption.tagline}
      </p>

      <div class="scope">
        <span>
          {packageOption.pageScope}
        </span>
      </div>

      <div class="suitable">
        <span class="section-label">
          {text.suitableFor}
        </span>

        <p>
          {packageOption.suitable}
        </p>
      </div>

      <div class="personalised">
        <span class="section-label">
          {text.yourProject}
        </span>

        <ul>
          {#each packageOption.personalisedRequirements as requirement}
            <li>
              <svg viewBox="0 0 20 20" aria-hidden="true">
                <path d="m5 10.25 3.15 3.1L15 6.75" />
              </svg>

              <span>
                {requirement}
              </span>
            </li>
          {/each}
        </ul>
      </div>

      <details class="scope-details">
        <summary>
          <span>
            {text.details}
          </span>

          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m5 7.5 5 5 5-5" />
          </svg>
        </summary>

        <div class="details-content">
          <div>
            <span class="section-label">
              {text.includes}
            </span>

            <ul>
              {#each packageOption.included as item}
                <li>
                  <svg viewBox="0 0 20 20" aria-hidden="true">
                    <path d="m5 10.25 3.15 3.1L15 6.75" />
                  </svg>

                  <span>
                    {item}
                  </span>
                </li>
              {/each}
            </ul>
          </div>

          <div class="limitations">
            <span class="section-label">
              {text.limitations}
            </span>

            <ul>
              {#each packageOption.limitations as item}
                <li>
                  <span class="dash"> — </span>

                  <span>
                    {item}
                  </span>
                </li>
              {/each}
            </ul>
          </div>

          <p class="review-note">
            {text.finalReview}
          </p>
        </div>
      </details>

      <button
        type="button"
        class="select-button"
        class:selected={isSelected}
        role="radio"
        aria-checked={isSelected}
        onclick={() => selectPackage(packageOption.id)}
      >
        <span>
          {isSelected ? text.selectedOption : text.select}
        </span>

        {#if isSelected}
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m5 10.25 3.15 3.1L15 6.75" />
          </svg>
        {:else}
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="m8 5 5 5-5 5" />
          </svg>
        {/if}
      </button>
    </article>
  {/each}
</div>

<style>
  .package-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 10px;

    font-family: "DM Sans", Arial, sans-serif;
  }

  .package-card {
    position: relative;

    display: flex;

    min-width: 0;

    flex-direction: column;

    padding: 22px;

    border: 1px solid #2d2d2d;

    border-radius: 0;

    background: #0b0b0b;

    box-sizing: border-box;
  }

  .package-card.recommended {
    border-color: #0043ff;
  }

  .package-card.recommended::before {
    content: "";

    position: absolute;

    top: -1px;
    right: -1px;
    left: -1px;

    height: 2px;

    background: #0043ff;
  }

  .package-card.selected {
    background: rgba(0, 67, 255, 0.06);

    box-shadow: inset 0 0 0 1px #0043ff;
  }

  .package-top {
    display: flex;

    align-items: flex-start;
    justify-content: space-between;

    gap: 18px;
  }

  .package-kicker,
  .section-label {
    display: block;

    color: #6e6e6e;

    font-size: 8px;
    font-weight: 700;

    line-height: 1.2;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .package-top h3 {
    margin: 7px 0 0;

    color: #f0f0f0;

    font-size: clamp(27px, 2.6vw, 38px);

    font-weight: 600;

    line-height: 1;

    letter-spacing: -0.04em;
  }

  .recommended .package-top h3,
  .selected .package-top h3 {
    color: #6f8dff;
  }

  .badges {
    display: flex;

    justify-content: flex-end;

    flex-wrap: wrap;

    gap: 5px;
  }

  .recommended-badge,
  .selected-badge {
    display: inline-flex;

    min-height: 21px;

    align-items: center;

    padding: 0 6px;

    border: 1px solid #444444;

    font-size: 7.5px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .recommended-badge {
    border-color: #0043ff;

    color: #6f8dff;
  }

  .selected-badge {
    color: #eeeeee;
  }

  .tagline {
    margin: 16px 0 0;

    color: #969696;

    font-size: 10.5px;

    line-height: 1.5;
  }

  .scope {
    margin-top: 17px;

    padding: 11px 12px;

    border: 1px solid #303030;

    background: #090909;
  }

  .scope span {
    color: #6f8dff;

    font-size: 11px;
    font-weight: 600;

    line-height: 1.4;
  }

  .suitable,
  .personalised,
  .scope-details {
    margin-top: 18px;

    padding-top: 16px;

    border-top: 1px solid #292929;
  }

  .suitable p {
    margin: 7px 0 0;

    color: #8c8c8c;

    font-size: 9.5px;

    line-height: 1.5;
  }

  .personalised .section-label {
    color: #6f8dff;
  }

  ul {
    display: grid;

    gap: 7px;

    margin: 10px 0 0;

    padding: 0;

    list-style: none;
  }

  li {
    display: grid;

    grid-template-columns:
      14px
      minmax(0, 1fr);

    gap: 7px;

    color: #b3b3b3;

    font-size: 9px;

    line-height: 1.45;
  }

  li svg {
    width: 13px;
    height: 13px;

    margin-top: 1px;

    fill: none;

    stroke: #5f80ff;

    stroke-width: 1.8;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .scope-details {
    margin-bottom: 18px;
  }

  .scope-details summary {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 12px;

    color: #a8a8a8;

    font-size: 9px;
    font-weight: 700;

    cursor: pointer;

    list-style: none;

    text-transform: uppercase;

    letter-spacing: 0.06em;
  }

  .scope-details summary::-webkit-details-marker {
    display: none;
  }

  .scope-details summary svg {
    width: 15px;
    height: 15px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.5;

    transition: transform 150ms ease;
  }

  .scope-details[open] summary svg {
    transform: rotate(180deg);
  }

  .details-content {
    display: grid;

    gap: 18px;

    margin-top: 15px;

    padding-top: 15px;

    border-top: 1px solid #292929;
  }

  .details-content .section-label {
    margin-bottom: 9px;
  }

  .limitations li {
    color: #757575;
  }

  .dash {
    color: #555555;
  }

  .review-note {
    margin: 0;

    color: #606060;

    font-size: 8.5px;

    line-height: 1.45;
  }

  .select-button {
    display: inline-flex;

    width: 100%;
    min-height: 44px;

    align-items: center;
    justify-content: space-between;

    gap: 12px;

    margin-top: auto;

    padding: 0 13px;

    border: 1px solid #444444;

    border-radius: 0;

    background: transparent;

    color: #d1d1d1;

    font-family: inherit;

    font-size: 9px;
    font-weight: 700;

    cursor: pointer;

    text-transform: uppercase;

    letter-spacing: 0.06em;
  }

  .select-button:hover {
    border-color: #707070;
  }

  .select-button.selected {
    border-color: #0043ff;

    background: #0043ff;

    color: #ffffff;
  }

  .select-button svg {
    width: 15px;
    height: 15px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.7;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .select-button:focus-visible,
  .scope-details summary:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  @media (max-width: 1180px) {
    .package-grid {
      grid-template-columns: 1fr;
    }

    .tagline,
    .suitable p {
      max-width: 760px;
    }
  }

  @media (max-width: 600px) {
    .package-card {
      padding: 18px;
    }

    .package-top h3 {
      font-size: 29px;
    }

    .package-top {
      gap: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .scope-details summary svg {
      transition: none;
    }
  }
</style>
