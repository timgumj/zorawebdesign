<script>
  import {
    getPageOptionById,
    getPagesContent,
    getRecommendedPageIds,
  } from "$lib/data/website-configurator/pages-data.js";

  import { getWebsiteTypeById } from "$lib/data/website-configurator/configurator-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    selectedPages = $bindable([]),
    pageVolume = $bindable(""),
    customPageNames = $bindable(["", "", ""]),
  } = $props();

  let showAdditionalPages = $state(false);
  let openCategories = $state({});

  const text = $derived(getPagesContent(language));

  const ui = $derived(
    language === "de"
      ? {
          eyebrow: "Empfohlene Seitenstruktur",
          intro:
            "Basierend auf deinem gewählten Website-Typ haben wir bereits eine passende Seitenstruktur vorbereitet. Entferne, was du nicht brauchst, oder ergänze weitere Seiten.",
          includedLead: "Bereits in deinem Projekt enthalten",
          selectedSingular: "Seite ausgewählt",
          selectedPlural: "Seiten ausgewählt",
          showAll: "Weitere Seiten hinzufügen",
          hideAll: "Weitere Seiten schließen",
          additionalTitle: "Brauchst du weitere Seiten?",
          additionalDescription:
            "Öffne eine Kategorie und ergänze nur die Seiten, die für dein Projekt wirklich relevant sind.",
          volumeEyebrow: "Projektumfang",
          customEyebrow: "Individuelle Seiten",
          moreLabel: "weitere",
          consultantTitle: "Meine Empfehlung",
          noType:
            "Wähle die Seiten, die deine wichtigsten Inhalte und Ziele klar abbilden.",
          recommendationFew:
            "Eine kompakte Struktur ist oft ideal für einen klaren und fokussierten Webauftritt.",
          recommendationMedium:
            "Dieser Umfang bietet eine gute Balance zwischen Übersichtlichkeit, Vertrauen und ausreichend Inhalt.",
          recommendationLarge:
            "Bei dieser Seitenanzahl ist eine klare Navigation und Inhaltsstruktur besonders wichtig.",
          selectedOverview: "Deine Auswahl",
        }
      : {
          eyebrow: "Recommended website structure",
          intro:
            "Based on the website type you selected, we have already prepared a suitable page structure. Remove anything you do not need or add more pages below.",
          includedLead: "Already included in your project",
          selectedSingular: "page selected",
          selectedPlural: "pages selected",
          showAll: "Add more pages",
          hideAll: "Close additional pages",
          additionalTitle: "Need additional pages?",
          additionalDescription:
            "Open a category and add only the pages that are genuinely relevant to your project.",
          volumeEyebrow: "Project size",
          customEyebrow: "Custom pages",
          moreLabel: "more",
          consultantTitle: "My recommendation",
          noType:
            "Choose the pages that communicate your most important content and goals clearly.",
          recommendationFew:
            "A compact structure is often ideal for a clear and focused website.",
          recommendationMedium:
            "This scope offers a strong balance between clarity, trust and enough useful content.",
          recommendationLarge:
            "With this number of pages, a clear navigation and content structure becomes especially important.",
          selectedOverview: "Your selection",
        },
  );

  const selectedWebsiteTypeOption = $derived(
    getWebsiteTypeById(selectedWebsiteType, language),
  );

  const recommendedPageIds = $derived(
    getRecommendedPageIds(selectedWebsiteType),
  );

  const recommendedPages = $derived(
    recommendedPageIds
      .map((id) => text.pageOptions.find((page) => page.id === id))
      .filter(Boolean),
  );

  const commonAdditionalPages = $derived(
    text.pageOptions.filter(
      (page) =>
        page.category === "common" && !recommendedPageIds.includes(page.id),
    ),
  );

  const additionalCategories = $derived(
    Object.entries(text.categoryLabels)
      .filter(([id]) => id !== "common")
      .map(([id, label]) => ({
        id,
        label,
        pages: text.pageOptions.filter(
          (page) =>
            page.category === id && !recommendedPageIds.includes(page.id),
        ),
      }))
      .filter((category) => category.pages.length > 0),
  );

  const selectedPageOptions = $derived(
    selectedPages.map((id) => getPageOptionById(id, language)).filter(Boolean),
  );

  const selectedVolumeOption = $derived(
    text.volumeOptions.find((option) => option.id === pageVolume) ?? null,
  );

  const hasCustomPage = $derived(selectedPages.includes("custom-page"));

  const enteredCustomPages = $derived(
    customPageNames.filter((name) => name.trim()),
  );

  const visibleSummaryPages = $derived(selectedPageOptions.slice(0, 3));

  const hiddenSummaryPageCount = $derived(
    Math.max(0, selectedPageOptions.length - visibleSummaryPages.length),
  );

  const selectedCountLabel = $derived(
    selectedPageOptions.length === 1 ? ui.selectedSingular : ui.selectedPlural,
  );

  const recommendationMessage = $derived.by(() => {
    if (!selectedWebsiteTypeOption) {
      return ui.noType;
    }

    const count = selectedPageOptions.length;

    if (count <= 4) {
      return ui.recommendationFew;
    }

    if (count <= 8) {
      return ui.recommendationMedium;
    }

    return ui.recommendationLarge;
  });

  function togglePage(pageId) {
    if (selectedPages.includes(pageId)) {
      selectedPages = selectedPages.filter((id) => id !== pageId);
      return;
    }

    selectedPages = [...selectedPages, pageId];
  }

  function toggleCategory(categoryId) {
    openCategories = {
      ...openCategories,
      [categoryId]: !openCategories[categoryId],
    };
  }

  function updateCustomPageName(index, value) {
    const updatedNames = [...customPageNames];
    updatedNames[index] = value;
    customPageNames = updatedNames;
  }

  function handleSelectableKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();
    callback();
  }
</script>

<div class="step-layout">
  <div class="selection-area">
    <section class="intro-section">
      <span class="eyebrow">{ui.eyebrow}</span>

      <div class="intro-copy">
        <h2>{text.recommendedTitle}</h2>
        <p>{ui.intro}</p>
      </div>

      {#if selectedWebsiteTypeOption}
        <div class="website-type-context">
          <span>{text.websiteTypeLabel}</span>
          <strong>{selectedWebsiteTypeOption.label}</strong>
        </div>
      {/if}
    </section>

    <section class="pages-section recommended-section">
      <div class="section-heading">
        <div>
          <h2>{text.recommendedTitle}</h2>
          <p>{text.recommendedDescription}</p>
        </div>

        <div class="selection-count" aria-live="polite">
          <strong>{selectedPageOptions.length}</strong>
          <span>{selectedCountLabel}</span>
        </div>
      </div>

      <div
        class="page-grid recommended-grid"
        role="group"
        aria-label={text.recommendedTitle}
      >
        {#each recommendedPages as page}
          <div
            class="page-card recommended-card"
            class:selected={selectedPages.includes(page.id)}
            role="checkbox"
            aria-checked={selectedPages.includes(page.id)}
            tabindex="0"
            onclick={() => togglePage(page.id)}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () => togglePage(page.id))}
          >
            <div class="card-topline">
              <span class="selection-indicator" aria-hidden="true">
                <span></span>
              </span>

              <span class="recommended-label">
                {text.recommendedLabel}
              </span>
            </div>

            <div class="card-copy">
              <h3>{page.label}</h3>
              <p>{page.description}</p>
            </div>
          </div>
        {/each}
      </div>

      <div class="included-note">
        <span class="included-note-icon" aria-hidden="true">✓</span>

        <div>
          <strong>{ui.includedLead}</strong>

          <div class="included-items">
            {#each text.standardIncludedPages as page}
              <span>{page.label}</span>
            {/each}
          </div>
        </div>
      </div>
    </section>

    <section class="pages-section additional-section">
      <div class="section-heading additional-heading">
        <div>
          <h2>{ui.additionalTitle}</h2>
          <p>{ui.additionalDescription}</p>
        </div>
      </div>

      {#if commonAdditionalPages.length > 0}
        <div
          class="page-grid common-grid"
          role="group"
          aria-label={text.commonTitle}
        >
          {#each commonAdditionalPages as page}
            <div
              class="page-card"
              class:selected={selectedPages.includes(page.id)}
              role="checkbox"
              aria-checked={selectedPages.includes(page.id)}
              tabindex="0"
              onclick={() => togglePage(page.id)}
              onkeydown={(event) =>
                handleSelectableKeydown(event, () => togglePage(page.id))}
            >
              <div class="card-topline">
                <span class="selection-indicator" aria-hidden="true">
                  <span></span>
                </span>
              </div>

              <div class="card-copy">
                <h3>{page.label}</h3>
                <p>{page.description}</p>
              </div>
            </div>
          {/each}
        </div>
      {/if}

      <button
        type="button"
        class="more-pages-toggle"
        aria-expanded={showAdditionalPages}
        onclick={() => {
          showAdditionalPages = !showAdditionalPages;
        }}
      >
        <span>
          {showAdditionalPages ? ui.hideAll : ui.showAll}
        </span>

        <span
          class="toggle-icon"
          class:open={showAdditionalPages}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {#if showAdditionalPages}
        <div class="additional-categories">
          {#each additionalCategories as category}
            <section class="category-group">
              <button
                type="button"
                class="category-toggle"
                aria-expanded={Boolean(openCategories[category.id])}
                onclick={() => toggleCategory(category.id)}
              >
                <span class="category-name">{category.label}</span>

                <span class="category-meta">
                  <span>{category.pages.length}</span>

                  <span
                    class="category-icon"
                    class:open={openCategories[category.id]}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </span>
              </button>

              {#if openCategories[category.id]}
                <div class="page-grid category-pages">
                  {#each category.pages as page}
                    <div
                      class="page-card"
                      class:selected={selectedPages.includes(page.id)}
                      role="checkbox"
                      aria-checked={selectedPages.includes(page.id)}
                      tabindex="0"
                      onclick={() => togglePage(page.id)}
                      onkeydown={(event) =>
                        handleSelectableKeydown(event, () =>
                          togglePage(page.id),
                        )}
                    >
                      <div class="card-topline">
                        <span class="selection-indicator" aria-hidden="true">
                          <span></span>
                        </span>
                      </div>

                      <div class="card-copy">
                        <h3>{page.label}</h3>
                        <p>{page.description}</p>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </section>
          {/each}
        </div>
      {/if}
    </section>

    <section class="pages-section volume-section">
      <div class="section-heading">
        <div>
          <span class="eyebrow">{ui.volumeEyebrow}</span>
          <h2>{text.volumeTitle}</h2>
          <p>{text.volumeDescription}</p>
        </div>
      </div>

      <div class="volume-grid" role="radiogroup" aria-label={text.volumeTitle}>
        {#each text.volumeOptions as option}
          <div
            class="volume-card"
            class:selected={pageVolume === option.id}
            role="radio"
            aria-checked={pageVolume === option.id}
            tabindex="0"
            onclick={() => {
              pageVolume = option.id;
            }}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () => {
                pageVolume = option.id;
              })}
          >
            <div class="card-topline">
              <span
                class="selection-indicator radio-indicator"
                aria-hidden="true"
              >
                <span></span>
              </span>
            </div>

            <div class="card-copy">
              <h3>{option.label}</h3>
              <p>{option.description}</p>
            </div>
          </div>
        {/each}
      </div>
    </section>

    {#if hasCustomPage}
      <section class="pages-section custom-section">
        <div class="section-heading">
          <div>
            <span class="eyebrow">{ui.customEyebrow}</span>
            <h2>{text.customTitle}</h2>
            <p>{text.customDescription}</p>
          </div>
        </div>

        <div class="custom-page-fields">
          {#each [0, 1, 2] as index}
            <label>
              <span>
                {text.customTitle}
                {index + 1}
              </span>

              <input
                type="text"
                maxlength="80"
                placeholder={text.customPlaceholder}
                value={customPageNames[index] ?? ""}
                oninput={(event) =>
                  updateCustomPageName(index, event.currentTarget.value)}
              />
            </label>
          {/each}
        </div>
      </section>
    {/if}
  </div>

  <aside class="guidance-panel">
    <div class="selection-summary">
      <span class="panel-label">{ui.selectedOverview}</span>

      <div class="summary-main">
        <strong>{selectedPageOptions.length}</strong>
        <span>{selectedCountLabel}</span>
      </div>

      {#if selectedPageOptions.length > 0}
        <div class="selected-pages-list">
          {#each visibleSummaryPages as page}
            <span>{page.label}</span>
          {/each}

          {#if hiddenSummaryPageCount > 0}
            <span class="more-pages-count">
              +{hiddenSummaryPageCount}
              {ui.moreLabel}
            </span>
          {/if}
        </div>
      {:else}
        <p class="empty-selection">{text.noPages}</p>
      {/if}

      <div class="summary-details">
        <div class="summary-item">
          <span>{text.websiteTypeLabel}</span>
          <strong>{selectedWebsiteTypeOption?.label ?? "—"}</strong>
        </div>

        <div class="summary-item">
          <span>{text.volumeLabel}</span>
          <strong class:empty-selection={!selectedVolumeOption}>
            {selectedVolumeOption?.label ?? "—"}
          </strong>
        </div>

        {#if enteredCustomPages.length > 0}
          <div class="summary-item">
            <span>{text.customPagesLabel}</span>

            <div class="custom-summary">
              {#each enteredCustomPages as pageName}
                <span>{pageName}</span>
              {/each}
            </div>
          </div>
        {/if}
      </div>
    </div>

    <div class="recommendation">
      <span class="recommendation-mark" aria-hidden="true">Z</span>

      <div>
        <span class="panel-label">{ui.consultantTitle}</span>

        <p>{recommendationMessage}</p>

        {#if selectedWebsiteTypeOption}
          <strong class="recommendation-type">
            {selectedWebsiteTypeOption.label}
          </strong>
        {/if}
      </div>
    </div>
  </aside>
</div>

<style>
  .step-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(250px, 310px);
    gap: clamp(36px, 5vw, 72px);
    padding: clamp(28px, 4vw, 52px) 0;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .selection-area {
    min-width: 0;
  }

  .intro-section {
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    gap: 24px;
    align-items: end;
    padding-bottom: clamp(28px, 4vw, 42px);
    border-bottom: 1px solid #292929;
  }

  .intro-section > .eyebrow {
    grid-column: 1 / -1;
    margin-bottom: -10px;
  }

  .eyebrow {
    display: block;
    margin-bottom: 10px;
    color: #4f76ff;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.11em;
    line-height: 1.3;
    text-transform: uppercase;
  }

  .intro-copy h2,
  .section-heading h2 {
    margin: 0;
    color: #eeeeee;
    font-size: clamp(23px, 2.4vw, 34px);
    font-weight: 600;
    letter-spacing: -0.035em;
    line-height: 1.08;
  }

  .intro-copy p,
  .section-heading p {
    max-width: 760px;
    margin: 12px 0 0;
    color: #929292;
    font-size: 14px;
    line-height: 1.65;
  }

  .website-type-context {
    min-width: 170px;
    padding: 15px 17px;
    border-left: 2px solid #0043ff;
    background: #0b0b0b;
  }

  .website-type-context span {
    display: block;
    margin-bottom: 5px;
    color: #6f6f6f;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .website-type-context strong {
    display: block;
    color: #eeeeee;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.35;
  }

  .pages-section {
    margin-top: clamp(42px, 6vw, 68px);
  }

  .section-heading {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 24px;
    margin-bottom: 22px;
  }

  .section-heading > div:first-child {
    min-width: 0;
  }

  .selection-count {
    display: flex;
    flex: 0 0 auto;
    align-items: baseline;
    gap: 8px;
    padding-bottom: 3px;
  }

  .selection-count strong {
    color: #4f76ff;
    font-size: 24px;
    font-weight: 600;
    line-height: 1;
  }

  .selection-count span {
    color: #777777;
    font-size: 10px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .page-grid,
  .volume-grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .page-card,
  .volume-card {
    display: flex;
    min-width: 0;
    min-height: 154px;
    flex-direction: column;
    justify-content: space-between;
    padding: 18px;
    border: 1px solid #292929;
    background: #0c0c0c;
    box-sizing: border-box;
    cursor: pointer;
    outline: none;
    transition:
      border-color 180ms ease,
      background-color 180ms ease,
      transform 180ms ease;
  }

  .page-card:hover,
  .volume-card:hover,
  .page-card:focus-visible,
  .volume-card:focus-visible {
    border-color: #777777;
  }

  .page-card:focus-visible,
  .volume-card:focus-visible {
    transform: translateY(-2px);
  }

  .page-card.selected,
  .volume-card.selected {
    border-color: #d0d0d0;
    background: #0e0e0e;
  }

  .card-topline {
    display: flex;
    min-height: 22px;
    align-items: flex-start;
    justify-content: space-between;
    gap: 10px;
    margin-bottom: 24px;
  }

  .selection-indicator {
    display: grid;
    width: 18px;
    height: 18px;
    flex: 0 0 auto;
    place-items: center;
    border: 1px solid #5d5d5d;
    box-sizing: border-box;
  }

  .selection-indicator span {
    width: 8px;
    height: 8px;
    background: transparent;
  }

  .selected .selection-indicator {
    border-color: #d0d0d0;
  }

  .selected .selection-indicator span {
    background: #0043ff;
  }

  .radio-indicator,
  .radio-indicator span {
    border-radius: 50%;
  }

  .recommended-label {
    padding: 4px 6px;
    border: 1px solid #454545;
    color: #777777;
    font-size: 8px;
    font-weight: 700;
    letter-spacing: 0.07em;
    line-height: 1;
    text-transform: uppercase;
  }

  .selected .recommended-label {
    border-color: #4f76ff;
    color: #4f76ff;
  }

  .card-copy h3 {
    margin: 0 0 8px;
    color: #eeeeee;
    font-size: 15px;
    font-weight: 600;
    line-height: 1.25;
  }

  .selected .card-copy h3 {
    color: #4f76ff;
  }

  .card-copy p {
    margin: 0;
    color: #969696;
    font-size: 12px;
    line-height: 1.55;
  }

  .included-note {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
    margin-top: 12px;
    padding: 17px 18px;
    border: 1px solid #292929;
    background: #090909;
  }

  .included-note-icon {
    display: grid;
    width: 24px;
    height: 24px;
    place-items: center;
    border: 1px solid #4f76ff;
    color: #4f76ff;
    font-size: 11px;
    font-weight: 700;
  }

  .included-note strong {
    display: block;
    margin: 3px 0 10px;
    color: #d8d8d8;
    font-size: 12px;
    font-weight: 500;
  }

  .included-items {
    display: flex;
    flex-wrap: wrap;
    gap: 6px 14px;
  }

  .included-items span {
    position: relative;
    padding-left: 10px;
    color: #777777;
    font-size: 10px;
    line-height: 1.4;
  }

  .included-items span::before {
    position: absolute;
    top: 50%;
    left: 0;
    width: 3px;
    height: 3px;
    background: #4f76ff;
    content: "";
    transform: translateY(-50%);
  }

  .additional-section,
  .volume-section,
  .custom-section {
    padding-top: clamp(34px, 5vw, 52px);
    border-top: 1px solid #292929;
  }

  .more-pages-toggle,
  .category-toggle {
    width: 100%;
    border-radius: 0;
    font-family: inherit;
    cursor: pointer;
  }

  .more-pages-toggle {
    display: flex;
    min-height: 56px;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 0 18px;
    border: 1px solid #292929;
    background: #090909;
    color: #d0d0d0;
    font-size: 12px;
    font-weight: 500;
  }

  .more-pages-toggle:hover,
  .more-pages-toggle:focus-visible {
    border-color: #777777;
    outline: none;
  }

  .toggle-icon,
  .category-icon {
    display: inline-block;
    color: #4f76ff;
    font-size: 20px;
    font-weight: 300;
    line-height: 1;
    transition: transform 180ms ease;
  }

  .toggle-icon.open,
  .category-icon.open {
    transform: rotate(45deg);
  }

  .additional-categories {
    margin-top: 18px;
    border-top: 1px solid #292929;
  }

  .category-group {
    border-bottom: 1px solid #292929;
  }

  .category-toggle {
    display: flex;
    min-height: 62px;
    align-items: center;
    justify-content: space-between;
    padding: 0;
    border: 0;
    background: transparent;
    color: #d0d0d0;
    text-align: left;
  }

  .category-toggle:hover .category-name,
  .category-toggle:focus-visible .category-name {
    color: #4f76ff;
  }

  .category-toggle:focus-visible {
    outline: none;
  }

  .category-name {
    font-size: 13px;
    font-weight: 500;
    transition: color 180ms ease;
  }

  .category-meta {
    display: flex;
    align-items: center;
    gap: 14px;
    color: #6f6f6f;
    font-size: 10px;
  }

  .category-pages {
    padding-bottom: 18px;
  }

  .volume-card {
    min-height: 145px;
  }

  .custom-page-fields {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .custom-page-fields label {
    display: grid;
    gap: 8px;
  }

  .custom-page-fields label > span {
    color: #777777;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .custom-page-fields input {
    width: 100%;
    min-height: 52px;
    padding: 0 14px;
    border: 1px solid #3a3a3a;
    border-radius: 0;
    background: #080808;
    color: #eeeeee;
    font-family: inherit;
    font-size: 13px;
    box-sizing: border-box;
    outline: none;
  }

  .custom-page-fields input::placeholder {
    color: #5f5f5f;
  }

  .custom-page-fields input:focus {
    border-color: #d0d0d0;
  }

  .guidance-panel {
    position: sticky;
    top: 110px;
    align-self: start;
    border-top: 1px solid #303030;
  }

  .selection-summary,
  .recommendation {
    padding: 22px 0;
    border-bottom: 1px solid #292929;
  }

  .panel-label {
    display: block;
    margin-bottom: 13px;
    color: #777777;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    line-height: 1.3;
    text-transform: uppercase;
  }

  .summary-main {
    display: flex;
    align-items: baseline;
    gap: 8px;
    margin-bottom: 16px;
  }

  .summary-main strong {
    color: #4f76ff;
    font-size: 34px;
    font-weight: 600;
    letter-spacing: -0.04em;
    line-height: 1;
  }

  .summary-main span {
    color: #898989;
    font-size: 10px;
    line-height: 1.4;
  }

  .selected-pages-list,
  .custom-summary {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .selected-pages-list > span,
  .custom-summary > span {
    padding: 6px 8px;
    border: 1px solid #3d3d3d;
    background: #0c0c0c;
    color: #bcbcbc;
    font-size: 10px;
    line-height: 1.3;
  }

  .selected-pages-list .more-pages-count {
    border-color: #4f76ff;
    color: #4f76ff;
  }

  .summary-details {
    margin-top: 20px;
  }

  .summary-item {
    padding: 13px 0;
    border-top: 1px solid #242424;
  }

  .summary-item > span {
    display: block;
    margin-bottom: 6px;
    color: #6f6f6f;
    font-size: 8px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .summary-item > strong {
    display: block;
    color: #d0d0d0;
    font-size: 11px;
    font-weight: 500;
    line-height: 1.45;
  }

  .empty-selection {
    margin: 0;
    color: #6f6f6f !important;
    font-size: 11px;
    font-weight: 400 !important;
    line-height: 1.5;
  }

  .recommendation {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 14px;
  }

  .recommendation-mark {
    display: grid;
    width: 30px;
    height: 30px;
    place-items: center;
    border: 1px solid #d0d0d0;
    color: #0043ff;
    font-size: 10px;
    font-weight: 700;
  }

  .recommendation p {
    margin: 0;
    color: #939393;
    font-size: 12px;
    line-height: 1.65;
  }

  .recommendation-type {
    display: block;
    margin-top: 12px;
    color: #4f76ff;
    font-size: 10px;
    font-weight: 500;
    line-height: 1.4;
  }

  @media (max-width: 1120px) {
    .page-grid,
    .volume-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .custom-page-fields {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 980px) {
    .step-layout {
      grid-template-columns: 1fr;
    }

    .guidance-panel {
      position: static;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 12px;
      border-top: 0;
    }

    .selection-summary,
    .recommendation {
      padding: 20px;
      border: 1px solid #292929;
    }
  }

  @media (max-width: 700px) {
    .step-layout {
      gap: 32px;
      padding: 28px 0;
    }

    .intro-section {
      grid-template-columns: 1fr;
      gap: 18px;
    }

    .intro-section > .eyebrow {
      margin-bottom: -5px;
    }

    .website-type-context {
      min-width: 0;
    }

    .section-heading {
      display: block;
    }

    .selection-count {
      margin-top: 16px;
    }

    .page-grid,
    .volume-grid {
      grid-template-columns: 1fr;
    }

    .page-card,
    .volume-card {
      min-height: 132px;
      padding: 17px;
    }

    .included-note {
      padding: 16px;
    }

    .guidance-panel {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 420px) {
    .intro-copy h2,
    .section-heading h2 {
      font-size: 23px;
    }

    .included-items {
      display: grid;
      gap: 7px;
    }

    .more-pages-toggle {
      padding: 0 15px;
    }
  }
</style>
