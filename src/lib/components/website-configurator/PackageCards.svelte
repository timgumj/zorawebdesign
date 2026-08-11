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
          select: "Select option",
          selectedOption: "Selected option",
          packageLabel: "Project scope",
          suitableFor: "Suitable for",
          includes: "What this scope includes",
          yourRequirements: "Your requirements covered",
          limitations: "Normally not included",
          finalReview:
            "The final scope will be confirmed after Zora Web Design reviews your complete configuration.",

          emptyPages: "No specific project pages selected",
          emptyFeatures: "No additional functionality selected",
          oneLanguageFallback: "One website language",
          noSupport: "Client-provided content and standard project handover",

          essential: {
            name: "Essential",
            tagline:
              "A focused professional website with a compact page structure and straightforward functionality.",
            suitable:
              "Best for smaller businesses, freelancers and organisations with prepared content and uncomplicated requirements.",
            pageScope: "Up to 5 core project pages",
            included: [
              "Custom responsive design for mobile, tablet and desktop",
              "Home, About, Services and Contact structure as required",
              "Contact form or standard enquiry form",
              "Basic SEO titles, descriptions and page structure",
              "Privacy, legal, cookie and 404 pages",
              "Client-provided content inserted into the website",
              "Technical testing and launch preparation",
              "Basic website handover guidance",
            ],
            limitations: [
              "Complex booking, payment or membership functionality",
              "Custom databases or advanced filtering",
              "Several external software integrations",
              "Extensive copywriting, branding or content production",
            ],
          },

          growth: {
            name: "Growth",
            tagline:
              "A complete business or organisation website with a stronger content structure, additional functionality and strategic support.",
            suitable:
              "Best for established businesses, organisations and professional services that need more pages, multilingual content or selected integrations.",
            pageScope: "Up to 10–12 project pages",
            included: [
              "Everything required for the Essential foundation",
              "Expanded and individually planned page architecture",
              "Reusable sections for services, projects, team, events or articles",
              "Advanced enquiry or registration forms",
              "One or two language versions",
              "Selected newsletter, calendar, analytics or CRM connections",
              "Content structure and conversion guidance",
              "Support refining available text and visual material",
              "Enhanced SEO structure across important pages",
              "Personal training session or individual video guide",
              "Launch support and post-launch quality review",
            ],
            limitations: [
              "Large online shops or complex marketplaces",
              "Custom member dashboards and advanced user permissions",
              "Large custom databases or application-style functionality",
              "Several complex API connections and automated workflows",
            ],
          },

          advanced: {
            name: "Advanced",
            tagline:
              "A technically demanding or content-heavy website with custom functionality, integrations and complex workflows.",
            suitable:
              "Best for shops, booking platforms, membership systems, education portals, property websites and custom web applications.",
            pageScope:
              "Full custom architecture based on the selected project structure",
            included: [
              "Custom information architecture for a large website",
              "Recurring detail pages for products, properties, courses, events or members",
              "Online shop, payments, donations or booking functionality",
              "User registration, login and protected content",
              "Advanced search, filtering and structured databases",
              "CRM, API and external software connections",
              "Automated confirmations, notifications and workflows",
              "Advanced multilingual architecture",
              "Extended performance, security and quality testing",
              "Technical documentation and detailed training",
              "Phased launch planning and ongoing technical support options",
            ],
            limitations: [
              "The precise technical scope must be reviewed before a final quote",
              "Third-party software fees and licenses are quoted separately",
              "Complex integrations may require a discovery or planning phase",
            ],
          },
        }
      : {
          recommended: "Empfohlen",
          selected: "Ausgewählt",
          select: "Option auswählen",
          selectedOption: "Ausgewählte Option",
          packageLabel: "Projektumfang",
          suitableFor: "Geeignet für",
          includes: "Was dieser Umfang enthält",
          yourRequirements: "Ihre berücksichtigten Anforderungen",
          limitations: "Normalerweise nicht enthalten",
          finalReview:
            "Der endgültige Umfang wird bestätigt, nachdem Zora Web Design Ihre vollständige Konfiguration geprüft hat.",

          emptyPages: "Keine bestimmten Projektseiten ausgewählt",
          emptyFeatures: "Keine zusätzlichen Funktionen ausgewählt",
          oneLanguageFallback: "Eine Website-Sprache",
          noSupport:
            "Vom Kunden bereitgestellte Inhalte und grundlegende Übergabe",

          essential: {
            name: "Essential",
            tagline:
              "Eine fokussierte professionelle Website mit kompakter Seitenstruktur und klaren Standardfunktionen.",
            suitable:
              "Geeignet für kleinere Unternehmen, Freelancer und Organisationen mit vorbereiteten Inhalten und überschaubaren Anforderungen.",
            pageScope: "Bis zu 5 zentrale Projektseiten",
            included: [
              "Individuelles responsives Design für Smartphone, Tablet und Desktop",
              "Startseite, Über uns, Leistungen und Kontakt nach Bedarf",
              "Kontaktformular oder standardisiertes Anfrageformular",
              "Grundlegende SEO-Titel, Beschreibungen und Seitenstruktur",
              "Datenschutz-, Impressums-, Cookie- und 404-Seiten",
              "Einpflege der vom Kunden bereitgestellten Inhalte",
              "Technische Tests und Vorbereitung der Veröffentlichung",
              "Grundlegende Einführung in die Website-Verwaltung",
            ],
            limitations: [
              "Komplexe Buchungs-, Zahlungs- oder Mitgliederfunktionen",
              "Individuelle Datenbanken oder erweiterte Filter",
              "Mehrere externe Software-Integrationen",
              "Umfangreiche Texterstellung, Branding- oder Content-Produktion",
            ],
          },

          growth: {
            name: "Growth",
            tagline:
              "Eine vollständige Unternehmens- oder Organisationswebsite mit stärkerer Inhaltsstruktur, zusätzlichen Funktionen und strategischer Unterstützung.",
            suitable:
              "Geeignet für etablierte Unternehmen, Organisationen und Dienstleister mit mehr Seiten, mehreren Sprachen oder ausgewählten Integrationen.",
            pageScope: "Bis zu 10–12 Projektseiten",
            included: [
              "Alle wichtigen Grundlagen aus Essential",
              "Erweiterte und individuell geplante Seitenarchitektur",
              "Wiederverwendbare Bereiche für Leistungen, Projekte, Team, Events oder Beiträge",
              "Erweiterte Anfrage-, Bewerbungs- oder Anmeldeformulare",
              "Eine oder zwei vollständige Sprachversionen",
              "Ausgewählte Newsletter-, Kalender-, Analyse- oder CRM-Verbindungen",
              "Beratung zu Inhaltsstruktur und Conversion",
              "Unterstützung bei der Optimierung vorhandener Texte und Bilder",
              "Stärkere SEO-Struktur für wichtige Seiten",
              "Persönliche Einführung oder individuelle Videoanleitung",
              "Unterstützung bei der Veröffentlichung und Qualitätskontrolle",
            ],
            limitations: [
              "Große Onlineshops oder komplexe Marktplätze",
              "Individuelle Mitglieder-Dashboards und komplexe Benutzerrechte",
              "Große individuelle Datenbanken oder App-Funktionalität",
              "Mehrere komplexe API-Verbindungen und Automatisierungen",
            ],
          },

          advanced: {
            name: "Advanced",
            tagline:
              "Eine technisch anspruchsvolle oder inhaltsreiche Website mit individuellen Funktionen, Integrationen und komplexen Abläufen.",
            suitable:
              "Geeignet für Shops, Buchungsplattformen, Mitgliederbereiche, Bildungsportale, Immobilienseiten und individuelle Webanwendungen.",
            pageScope:
              "Vollständig individuelle Architektur auf Basis der gewählten Projektstruktur",
            included: [
              "Individuelle Informationsarchitektur für umfangreiche Websites",
              "Wiederkehrende Detailseiten für Produkte, Immobilien, Kurse, Events oder Mitglieder",
              "Onlineshop, Zahlungen, Spenden oder Buchungsfunktionen",
              "Benutzerregistrierung, Login und geschützte Inhalte",
              "Erweiterte Suche, Filter und strukturierte Datenbanken",
              "CRM-, API- und externe Software-Verbindungen",
              "Automatisierte Bestätigungen, Benachrichtigungen und Abläufe",
              "Erweiterte mehrsprachige Website-Architektur",
              "Umfangreiche Performance-, Sicherheits- und Qualitätstests",
              "Technische Dokumentation und ausführliche Einführung",
              "Phasenplanung und Optionen für laufende technische Betreuung",
            ],
            limitations: [
              "Der genaue technische Umfang muss vor dem endgültigen Angebot geprüft werden",
              "Gebühren und Lizenzen externer Anbieter werden separat kalkuliert",
              "Komplexe Integrationen können eine eigene Planungsphase benötigen",
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

    if (cleanValues.length === 0) {
      return "";
    }

    const visible = cleanValues.slice(0, limit);
    const hiddenCount = cleanValues.length - visible.length;

    if (hiddenCount <= 0) {
      return visible.join(", ");
    }

    return `${visible.join(", ")} +${hiddenCount}`;
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
      const pagePreview =
        packageId === "advanced"
          ? joinPreview(selectedPageLabels, selectedPageLabels.length)
          : joinPreview(selectedPageLabels, pageLimit);

      if (language === "en") {
        requirements.push(
          pageCount > pageLimit
            ? `Covers up to ${pageLimit} of your ${pageCount} selected project pages: ${pagePreview}`
            : `Covers your selected project pages: ${pagePreview}`,
        );
      } else {
        requirements.push(
          pageCount > pageLimit
            ? `Umfasst bis zu ${pageLimit} Ihrer ${pageCount} ausgewählten Projektseiten: ${pagePreview}`
            : `Umfasst Ihre ausgewählten Projektseiten: ${pagePreview}`,
        );
      }
    } else {
      requirements.push(text.emptyPages);
    }

    if (pageVolumeLabel) {
      requirements.push(
        language === "en"
          ? `Repeating detail pages: ${pageVolumeLabel}`
          : `Wiederkehrende Detailseiten: ${pageVolumeLabel}`,
      );
    }

    if (websiteLanguageLabel) {
      requirements.push(
        language === "en"
          ? `Website languages: ${websiteLanguageLabel}`
          : `Website-Sprachen: ${websiteLanguageLabel}`,
      );
    } else {
      requirements.push(text.oneLanguageFallback);
    }

    if (selectedFeatureLabels.length > 0) {
      const featurePreview = joinPreview(selectedFeatureLabels, featureLimit);

      requirements.push(
        language === "en"
          ? `Requested functionality: ${featurePreview}`
          : `Gewünschte Funktionen: ${featurePreview}`,
      );
    } else {
      requirements.push(text.emptyFeatures);
    }

    if (preparationSupportLabels.length > 0) {
      requirements.push(
        language === "en"
          ? `Content and design support: ${joinPreview(
              preparationSupportLabels,
              packageId === "essential" ? 2 : preparationSupportLabels.length,
            )}`
          : `Unterstützung bei Inhalt und Design: ${joinPreview(
              preparationSupportLabels,
              packageId === "essential" ? 2 : preparationSupportLabels.length,
            )}`,
      );
    }

    if (trainingLabel) {
      requirements.push(
        language === "en"
          ? `Website handover: ${trainingLabel}`
          : `Website-Übergabe: ${trainingLabel}`,
      );
    }

    if (packageId !== "essential" && ongoingSupportLabels.length > 0) {
      requirements.push(
        language === "en"
          ? `Ongoing support requested: ${joinPreview(
              ongoingSupportLabels,
              packageId === "growth" ? 3 : ongoingSupportLabels.length,
            )}`
          : `Gewünschte laufende Betreuung: ${joinPreview(
              ongoingSupportLabels,
              packageId === "growth" ? 3 : ongoingSupportLabels.length,
            )}`,
      );
    }

    if (packageId !== "essential" && customIntegration.trim()) {
      requirements.push(
        language === "en"
          ? `Special integration: ${customIntegration.trim()}`
          : `Besondere Integration: ${customIntegration.trim()}`,
      );
    }

    if (packageId === "advanced" && finalRequirementLabels.length > 0) {
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
  {#each packageOptions as packageOption, index}
    {@const isRecommended = packageOption.id === recommendedPackage}

    {@const isSelected = packageOption.id === selectedPackage}

    <button
      type="button"
      class:recommended={isRecommended}
      class:selected={isSelected}
      class="package-card"
      role="radio"
      aria-checked={isSelected}
      onclick={() => selectPackage(packageOption.id)}
    >
      <div class="package-top">
        <span class="package-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div class="package-labels">
          {#if isRecommended}
            <span class="recommended-label">
              {text.recommended}
            </span>
          {/if}

          {#if isSelected}
            <span class="selected-label">
              {text.selected}
            </span>
          {/if}
        </div>
      </div>

      <div class="package-heading">
        <span>{text.packageLabel}</span>
        <h3>{packageOption.name}</h3>
      </div>

      <p class="package-tagline">
        {packageOption.tagline}
      </p>

      <div class="suitable-for">
        <span>{text.suitableFor}</span>
        <p>{packageOption.suitable}</p>
      </div>

      <div class="scope-highlight">
        <span>{text.includes}</span>
        <strong>{packageOption.pageScope}</strong>
      </div>

      <div class="package-section">
        <span class="package-section-label">
          {text.yourRequirements}
        </span>

        <ul class="personalised-list">
          {#each packageOption.personalisedRequirements as requirement}
            <li>
              <span aria-hidden="true">✓</span>
              <span>{requirement}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="package-section">
        <span class="package-section-label">
          {text.includes}
        </span>

        <ul>
          {#each packageOption.included as feature}
            <li>
              <span aria-hidden="true">✓</span>
              <span>{feature}</span>
            </li>
          {/each}
        </ul>
      </div>

      <div class="limitations">
        <span>{text.limitations}</span>

        <ul>
          {#each packageOption.limitations as limitation}
            <li>
              <span aria-hidden="true">—</span>
              <span>{limitation}</span>
            </li>
          {/each}
        </ul>
      </div>

      <p class="review-note">
        {text.finalReview}
      </p>

      <span class:selected={isSelected} class="select-button">
        <span>
          {isSelected ? text.selectedOption : text.select}
        </span>

        <span aria-hidden="true">
          {isSelected ? "✓" : "→"}
        </span>
      </span>
    </button>
  {/each}
</div>

<style>
  .package-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid #303030;
    border-left: 1px solid #303030;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .package-card {
    position: relative;
    width: 100%;
    min-width: 0;
    min-height: 100%;
    padding: clamp(22px, 2.5vw, 34px);
    display: flex;
    flex-direction: column;
    border: 0;
    border-right: 1px solid #303030;
    border-bottom: 1px solid #303030;
    border-radius: 0;
    appearance: none;
    background: #0b0b0b;
    color: inherit;
    font-family: inherit;
    text-align: left;
    cursor: pointer;
    box-sizing: border-box;
    transition:
      background 180ms ease,
      box-shadow 180ms ease;
  }

  .package-card:hover {
    background: #0f0f0f;
  }

  .package-card:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: -2px;
  }

  .package-card.recommended::before {
    content: "";
    position: absolute;
    top: -1px;
    right: -1px;
    left: -1px;
    height: 3px;
    background: #0043ff;
  }

  .package-card.selected {
    background: #101010;
    box-shadow: inset 0 0 0 1px #d0d0d0;
  }

  .package-card.selected.recommended {
    box-shadow: inset 0 0 0 1px #0043ff;
  }

  .package-top {
    min-height: 30px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
  }

  .package-number {
    color: #686868;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .recommended .package-number {
    color: #0043ff;
  }

  .package-labels {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    flex-wrap: wrap;
  }

  .recommended-label,
  .selected-label {
    padding: 5px 7px;
    border: 1px solid #d0d0d0;
    background: #0b0b0b;
    font-size: 8px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  .recommended-label {
    color: #4f76ff;
  }

  .selected-label {
    color: #eeeeee;
  }

  .package-heading {
    margin-top: 22px;
  }

  .package-heading > span,
  .suitable-for > span,
  .scope-highlight > span,
  .package-section-label,
  .limitations > span {
    display: block;
    margin-bottom: 8px;
    color: #777777;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .package-heading h3 {
    margin: 0;
    color: #f1f1f1;
    font-size: clamp(26px, 2.6vw, 40px);
    font-weight: 650;
    line-height: 1;
    letter-spacing: -0.045em;
  }

  .recommended .package-heading h3 {
    color: #4f76ff;
  }

  .package-tagline {
    margin: 22px 0 0;
    color: #a3a3a3;
    font-size: 14px;
    line-height: 1.65;
  }

  .suitable-for,
  .scope-highlight,
  .package-section,
  .limitations {
    margin-top: 24px;
    padding-top: 20px;
    border-top: 1px solid #292929;
  }

  .suitable-for p {
    margin: 0;
    color: #999999;
    font-size: 12px;
    line-height: 1.6;
  }

  .scope-highlight strong {
    display: block;
    color: #4f76ff;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.45;
  }

  ul {
    margin: 0;
    padding: 0;
    display: grid;
    gap: 12px;
    list-style: none;
  }

  li {
    display: grid;
    grid-template-columns: 16px minmax(0, 1fr);
    gap: 9px;
    color: #b3b3b3;
    font-size: 12px;
    line-height: 1.5;
  }

  li > span:first-child {
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
  }

  .personalised-list li {
    color: #d0d0d0;
  }

  .limitations li {
    color: #888888;
  }

  .limitations li > span:first-child {
    color: #666666;
  }

  .review-note {
    margin: 24px 0;
    color: #717171;
    font-size: 10px;
    line-height: 1.55;
  }

  .select-button {
    width: 100%;
    min-height: 50px;
    margin-top: auto;
    padding: 0 16px;
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    border: 1px solid #d0d0d0;
    background: #0b0b0b;
    color: #dddddd;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    box-sizing: border-box;
  }

  .package-card:hover .select-button {
    background: #131313;
  }

  .select-button.selected {
    border-color: #0043ff;
    background: #0043ff;
    color: #ffffff;
  }

  @media (max-width: 1180px) {
    .package-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 700px) {
    .package-card {
      padding: 22px;
    }

    .package-heading h3 {
      font-size: 30px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .package-card {
      transition: none;
    }
  }
</style>
