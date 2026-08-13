<script>
  import {
    getPagesContent,
    getRecommendedPageIds,
  } from "$lib/data/website-configurator/pages-data.js";

  let {
    language = "de",
    selectedWebsiteType = "",
    selectedPages = $bindable([]),
    pageVolume = $bindable(""),
    customPageNames = $bindable(["", "", ""]),
    onContinue = () => {},
  } = $props();

  let pagesStage = $state("recommended");
  let activeCategory = $state("common");

  const text = $derived(getPagesContent(language));

  const ui = $derived(
    language === "en"
      ? {
          recommendedStage: "Pages",
          additionalStage: "Additional pages",
          volumeStage: "Project size",

          recommendedTitle: "Which pages should your website include?",

          recommendedDescription:
            "We have already selected a suitable starting structure. Keep the pages you need and remove anything unnecessary.",

          additionalTitle: "Would you like to add any other pages?",

          additionalDescription:
            "This step is optional. Add only the pages that are genuinely useful for your project.",

          included: "Included automatically",

          optional: "Optional",

          moreCategories: "More page types",

          back: "Back",

          continue: "Continue",

          continueToSize: "Continue",

          finish: "Continue to features",

          requiredPages: "Keep at least one project page selected.",

          requiredVolume: "Choose the approximate number of detail pages.",

          customPages: "Custom page names",

          noExtraPages: "You do not need to add anything here.",
        }
      : {
          recommendedStage: "Seiten",
          additionalStage: "Weitere Seiten",
          volumeStage: "Umfang",

          recommendedTitle: "Welche Seiten soll Ihre Website enthalten?",

          recommendedDescription:
            "Wir haben bereits eine passende Grundstruktur ausgewählt. Behalten Sie die benötigten Seiten und entfernen Sie Unnötiges.",

          additionalTitle: "Möchten Sie weitere Seiten ergänzen?",

          additionalDescription:
            "Dieser Schritt ist optional. Ergänzen Sie nur Seiten, die für Ihr Projekt wirklich sinnvoll sind.",

          included: "Automatisch enthalten",

          optional: "Optional",

          moreCategories: "Weitere Seitentypen",

          back: "Zurück",

          continue: "Weiter",

          continueToSize: "Weiter",

          finish: "Weiter zu den Funktionen",

          requiredPages: "Lassen Sie mindestens eine Projektseite ausgewählt.",

          requiredVolume: "Wählen Sie den ungefähren Umfang der Detailseiten.",

          customPages: "Eigene Seitennamen",

          noExtraPages: "Sie müssen hier nichts zusätzlich auswählen.",
        },
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

  const activeCategoryPages = $derived.by(() => {
    if (activeCategory === "common") {
      return commonAdditionalPages;
    }

    return (
      additionalCategories.find((category) => category.id === activeCategory)
        ?.pages ?? []
    );
  });

  const activeCategoryLabel = $derived.by(() => {
    if (activeCategory === "common") {
      return text.commonTitle;
    }

    return (
      additionalCategories.find((category) => category.id === activeCategory)
        ?.label ?? text.commonTitle
    );
  });

  const hasCustomPage = $derived(selectedPages.includes("custom-page"));

  const stageNumber = $derived(
    pagesStage === "recommended" ? 1 : pagesStage === "additional" ? 2 : 3,
  );

  function togglePage(pageId) {
    if (selectedPages.includes(pageId)) {
      selectedPages = selectedPages.filter((id) => id !== pageId);

      if (pageId === "custom-page") {
        customPageNames = ["", "", ""];
      }

      return;
    }

    selectedPages = [...selectedPages, pageId];
  }

  function updateCustomPageName(index, value) {
    const updatedNames = [...customPageNames];

    updatedNames[index] = value;

    customPageNames = updatedNames;
  }

  function goForward() {
    if (pagesStage === "recommended") {
      if (selectedPages.length === 0) {
        return;
      }

      pagesStage = "additional";
      return;
    }

    if (pagesStage === "additional") {
      pagesStage = "volume";
      return;
    }

    if (!pageVolume) {
      return;
    }

    onContinue();
  }

  function goBack() {
    if (pagesStage === "volume") {
      pagesStage = "additional";
      return;
    }

    if (pagesStage === "additional") {
      pagesStage = "recommended";
    }
  }

  function handleSelectableKeydown(event, callback) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    callback();
  }

  function getPageIcon(pageId) {
    const iconMap = {
      home: "home",
      about: "about",
      "services-overview": "services",
      contact: "contact",
      team: "team",
      testimonials: "reviews",
      faq: "faq",
      portfolio: "portfolio",
      projects: "projects",
      blog: "blog",
      news: "news",
      events: "events",

      "service-detail": "service-detail",
      "case-studies": "case-study",
      process: "process",
      pricing: "pricing",
      careers: "careers",
      "job-detail": "job",
      partners: "partners",
      sponsors: "sponsors",

      "article-detail": "article",
      gallery: "gallery",
      downloads: "download",
      resources: "resources",
      "newsletter-archive": "newsletter",
      press: "press",
      search: "search",

      "event-detail": "event-detail",
      programme: "programme",
      registration: "registration",
      donations: "donation",
      membership: "membership",

      shop: "shop",
      "product-categories": "categories",
      "product-detail": "product",
      cart: "cart",
      checkout: "checkout",
      "customer-account": "account",
      booking: "booking",
      "appointment-booking": "appointment",
      reservations: "reservation",
      "restaurant-menu": "menu",

      login: "login",
      "members-area": "members",
      "user-dashboard": "dashboard",
      courses: "courses",
      "course-detail": "course-detail",
      "learning-area": "learning",

      rooms: "rooms",
      "property-listings": "property-listings",
      "property-detail": "property",
      locations: "location",

      accessibility: "accessibility",
      terms: "legal",
      returns: "returns",

      "custom-page": "custom",
    };

    return iconMap[pageId] ?? "page";
  }
</script>

<div class="pages-step">
  {#if pagesStage === "recommended"}
    <!-- =====================================================
         1 / 3 — RECOMMENDED STRUCTURE
    ====================================================== -->

    <section class="question-panel" aria-labelledby="recommended-pages-heading">
      <header class="question-header">
        <span class="substep-label">
          {ui.recommendedStage}
          · 1 / 3
        </span>

        <h1 id="recommended-pages-heading">
          {ui.recommendedTitle}
        </h1>

        <p>
          {ui.recommendedDescription}
        </p>
      </header>

      <div class="page-grid" role="group" aria-label={ui.recommendedTitle}>
        {#each recommendedPages as page}
          {@const selected = selectedPages.includes(page.id)}

          {@const iconType = getPageIcon(page.id)}

          <div
            class="page-card"
            class:selected
            role="checkbox"
            aria-checked={selected}
            tabindex="0"
            onclick={() => togglePage(page.id)}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () => togglePage(page.id))}
          >
            <div class="page-icon" aria-hidden="true">
              {#if iconType === "home"}
                <svg viewBox="0 0 48 48">
                  <path d="m6 22 18-15 18 15" />
                  <path d="M11 20v21h26V20" />
                  <path d="M20 41V28h8v13" />
                </svg>
              {:else if iconType === "about"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="17" />
                  <circle
                    cx="24"
                    cy="16"
                    r="2"
                    fill="currentColor"
                    stroke="none"
                  />
                  <path d="M24 22v12" />
                </svg>
              {:else if iconType === "services"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="32" />
                  <path d="M14 16h8M14 24h8M14 32h8" />
                  <path d="M27 16h7M27 24h7M27 32h7" />
                </svg>
              {:else if iconType === "contact"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="11" width="34" height="26" />
                  <path d="m8 14 16 13 16-13" />
                </svg>
              {:else if iconType === "team"}
                <svg viewBox="0 0 48 48">
                  <circle cx="17" cy="16" r="5" />
                  <circle cx="32" cy="18" r="4" />
                  <path d="M6 39c0-8 4-13 11-13s11 5 11 13" />
                  <path d="M28 29c2-2 4-3 6-3 5 0 8 4 8 11" />
                </svg>
              {:else if iconType === "portfolio"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 33 9-9 6 6 5-5 7 8" />
                </svg>
              {:else if iconType === "projects"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="15" height="13" />
                  <rect x="26" y="10" width="15" height="13" />
                  <rect x="7" y="27" width="15" height="13" />
                  <rect x="26" y="27" width="15" height="13" />
                </svg>
              {:else if iconType === "events"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="M15 25h6v6h-6zM27 25h6v6h-6z" />
                </svg>
              {:else if iconType === "shop"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 17h26l-2 22H13l-2-22Z" />
                  <path d="M18 18v-4a6 6 0 0 1 12 0v4" />
                </svg>
              {:else if iconType === "categories"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="7" width="14" height="14" />
                  <rect x="27" y="7" width="14" height="14" />
                  <rect x="7" y="27" width="14" height="14" />
                  <rect x="27" y="27" width="14" height="14" />
                </svg>
              {:else if iconType === "product"}
                <svg viewBox="0 0 48 48">
                  <path d="m24 6 16 9v18l-16 9-16-9V15l16-9Z" />
                  <path d="m8 15 16 9 16-9M24 24v18" />
                </svg>
              {:else if iconType === "cart"}
                <svg viewBox="0 0 48 48">
                  <path d="M7 10h5l4 20h19l5-14H14" />
                  <circle cx="19" cy="38" r="2.5" />
                  <circle cx="34" cy="38" r="2.5" />
                </svg>
              {:else if iconType === "checkout"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="12" width="34" height="24" />
                  <path d="M7 19h34" />
                  <path d="M13 29h8" />
                  <path d="m29 28 3 3 6-7" />
                </svg>
              {:else if iconType === "account"}
                <svg viewBox="0 0 48 48">
                  <circle cx="24" cy="16" r="7" />
                  <path d="M10 40c0-9 5-15 14-15s14 6 14 15" />
                </svg>
              {:else if iconType === "menu"}
                <svg viewBox="0 0 48 48">
                  <rect x="10" y="6" width="28" height="36" />
                  <path d="M16 14h16M16 20h16M16 26h11M16 33h7M29 33h3" />
                </svg>
              {:else if iconType === "reservation" || iconType === "appointment" || iconType === "booking"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="10" width="34" height="30" />
                  <path d="M7 18h34M15 6v8M33 6v8" />
                  <path d="m15 29 5 5 12-12" />
                </svg>
              {:else if iconType === "programme"}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="8" width="32" height="32" />
                  <path d="M8 16h32M15 5v7M33 5v7" />
                  <path d="M15 23h18M15 29h12M15 35h8" />
                </svg>
              {:else if iconType === "registration"}
                <svg viewBox="0 0 48 48">
                  <rect x="9" y="7" width="30" height="34" />
                  <circle cx="18" cy="17" r="4" />
                  <path d="M13 28c1-5 3-7 5-7s4 2 5 7" />
                  <path d="M27 17h7M27 23h7M27 29h7" />
                </svg>
              {:else if iconType === "blog"}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h14M17 26h14M17 32h9" />
                </svg>
              {:else if iconType === "news"}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="7" width="27" height="34" />
                  <path d="M35 14h5v24a3 3 0 0 1-3 3h-2" />
                  <path d="M14 14h15M14 20h15M14 27h7M24 27h5M14 33h15" />
                </svg>
              {:else if iconType === "gallery"}
                <svg viewBox="0 0 48 48">
                  <rect x="7" y="8" width="34" height="30" />
                  <circle cx="17" cy="17" r="3" />
                  <path d="m11 33 9-9 6 6 5-5 7 8" />
                </svg>
              {:else if iconType === "donation"}
                <svg viewBox="0 0 48 48">
                  <path
                    d="M24 39S9 30 9 18.5A8.5 8.5 0 0 1 24 13a8.5 8.5 0 0 1 15 5.5C39 30 24 39 24 39Z"
                  />
                  <path d="M20 18h8M24 14v16" />
                </svg>
              {:else if iconType === "membership"}
                <svg viewBox="0 0 48 48">
                  <circle cx="18" cy="16" r="6" />
                  <path d="M7 39c0-8 4-13 11-13 4 0 7 1.7 9 5" />
                  <circle cx="35" cy="30" r="8" />
                  <path d="M35 26v8M31 30h8" />
                </svg>
              {:else}
                <svg viewBox="0 0 48 48">
                  <path d="M11 6h20l6 6v30H11V6Z" />
                  <path d="M31 6v8h6" />
                  <path d="M17 20h14M17 26h11M17 32h8" />
                </svg>
              {/if}
            </div>

            <div class="page-copy">
              <h2>
                {page.label}
              </h2>

              <p>
                {page.description}
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

      <div class="included-note">
        <span>
          {ui.included}:
        </span>

        {#each text.standardIncludedPages as page, index}
          <strong>
            {page.label}{index < text.standardIncludedPages.length - 1
              ? " · "
              : ""}
          </strong>
        {/each}
      </div>
    </section>
  {:else if pagesStage === "additional"}
    <!-- =====================================================
         2 / 3 — ADDITIONAL PAGES
    ====================================================== -->

    <section class="question-panel" aria-labelledby="additional-pages-heading">
      <header class="question-header">
        <span class="substep-label">
          {ui.additionalStage}
          · 2 / 3 ·
          {ui.optional}
        </span>

        <h1 id="additional-pages-heading">
          {ui.additionalTitle}
        </h1>

        <p>
          {ui.additionalDescription}
        </p>
      </header>

      <div class="category-selector" aria-label={ui.moreCategories}>
        <button
          type="button"
          class:active={activeCategory === "common"}
          onclick={() => {
            activeCategory = "common";
          }}
        >
          {text.commonTitle}
        </button>

        {#each additionalCategories as category}
          <button
            type="button"
            class:active={activeCategory === category.id}
            onclick={() => {
              activeCategory = category.id;
            }}
          >
            {category.label}
          </button>
        {/each}
      </div>

      <div class="active-category-heading">
        <span>
          {activeCategoryLabel}
        </span>

        <span>
          {activeCategoryPages.length}
        </span>
      </div>

      {#if activeCategoryPages.length > 0}
        <div
          class="page-grid compact-grid"
          role="group"
          aria-label={activeCategoryLabel}
        >
          {#each activeCategoryPages as page}
            {@const selected = selectedPages.includes(page.id)}

            {@const iconType = getPageIcon(page.id)}

            <div
              class="page-card compact-card"
              class:selected
              role="checkbox"
              aria-checked={selected}
              tabindex="0"
              onclick={() => togglePage(page.id)}
              onkeydown={(event) =>
                handleSelectableKeydown(event, () => togglePage(page.id))}
            >
              <div class="page-icon compact-icon" aria-hidden="true">
                {#if iconType === "team"}
                  <svg viewBox="0 0 48 48">
                    <circle cx="17" cy="16" r="5" />
                    <circle cx="32" cy="18" r="4" />
                    <path d="M6 39c0-8 4-13 11-13s11 5 11 13" />
                    <path d="M28 29c2-2 4-3 6-3 5 0 8 4 8 11" />
                  </svg>
                {:else if iconType === "reviews"}
                  <svg viewBox="0 0 48 48">
                    <path d="M7 9h34v24H20l-9 7v-7H7V9Z" />
                    <path
                      d="m24 15 2.2 4.4 4.8.7-3.5 3.4.8 4.8-4.3-2.3-4.3 2.3.8-4.8-3.5-3.4 4.8-.7L24 15Z"
                    />
                  </svg>
                {:else if iconType === "faq"}
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
                {:else if iconType === "search"}
                  <svg viewBox="0 0 48 48">
                    <circle cx="20" cy="20" r="11" />
                    <path d="m28 28 12 12" />
                  </svg>
                {:else if iconType === "download"}
                  <svg viewBox="0 0 48 48">
                    <path d="M24 7v23" />
                    <path d="m16 23 8 8 8-8" />
                    <path d="M9 39h30" />
                  </svg>
                {:else if iconType === "location"}
                  <svg viewBox="0 0 48 48">
                    <path
                      d="M24 42S11 29 11 19a13 13 0 0 1 26 0c0 10-13 23-13 23Z"
                    />
                    <circle cx="24" cy="19" r="5" />
                  </svg>
                {:else if iconType === "pricing"}
                  <svg viewBox="0 0 48 48">
                    <path d="M8 12h22l10 10-18 18L8 26V12Z" />
                    <circle cx="16" cy="20" r="2" />
                  </svg>
                {:else if iconType === "careers" || iconType === "job"}
                  <svg viewBox="0 0 48 48">
                    <rect x="7" y="14" width="34" height="25" />
                    <path d="M17 14v-4h14v4" />
                    <path d="M7 24h34M20 24v4h8v-4" />
                  </svg>
                {:else if iconType === "partners" || iconType === "sponsors"}
                  <svg viewBox="0 0 48 48">
                    <path d="m8 24 8-8 9 9" />
                    <path d="m40 24-8-8-9 9" />
                    <path d="m14 30 7 7c2 2 5 2 7 0l7-7" />
                    <path d="m17 19 7 7 7-7" />
                  </svg>
                {:else if iconType === "login"}
                  <svg viewBox="0 0 48 48">
                    <path d="M22 8h18v32H22" />
                    <path d="M7 24h22" />
                    <path d="m22 17 7 7-7 7" />
                  </svg>
                {:else if iconType === "dashboard"}
                  <svg viewBox="0 0 48 48">
                    <rect x="7" y="8" width="34" height="32" />
                    <path d="M7 16h34" />
                    <rect x="12" y="21" width="10" height="13" />
                    <rect x="27" y="21" width="9" height="5" />
                    <rect x="27" y="29" width="9" height="5" />
                  </svg>
                {:else if iconType === "custom"}
                  <svg viewBox="0 0 48 48">
                    <path d="M11 6h20l6 6v30H11V6Z" />
                    <path d="M31 6v8h6" />
                    <path d="M24 21v12M18 27h12" />
                  </svg>
                {:else}
                  <svg viewBox="0 0 48 48">
                    <path d="M11 6h20l6 6v30H11V6Z" />
                    <path d="M31 6v8h6" />
                    <path d="M17 20h14M17 26h11M17 32h8" />
                  </svg>
                {/if}
              </div>

              <div class="page-copy">
                <h2>
                  {page.label}
                </h2>

                <p>
                  {page.description}
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
      {/if}

      <p class="optional-note">
        {ui.noExtraPages}
      </p>
    </section>
  {:else}
    <!-- =====================================================
         3 / 3 — PROJECT SIZE
    ====================================================== -->

    <section class="question-panel" aria-labelledby="volume-heading">
      <header class="question-header">
        <span class="substep-label">
          {ui.volumeStage}
          · 3 / 3
        </span>

        <h1 id="volume-heading">
          {text.volumeTitle}
        </h1>

        <p>
          {text.volumeDescription}
        </p>
      </header>

      <div class="volume-grid" role="radiogroup" aria-label={text.volumeTitle}>
        {#each text.volumeOptions as option, index}
          {@const selected = pageVolume === option.id}

          <div
            class="volume-card"
            class:selected
            role="radio"
            aria-checked={selected}
            tabindex="0"
            onclick={() => {
              pageVolume = option.id;
            }}
            onkeydown={(event) =>
              handleSelectableKeydown(event, () => {
                pageVolume = option.id;
              })}
          >
            <div class="volume-icon" aria-hidden="true">
              {#if option.id === "none"}
                <svg viewBox="0 0 48 48">
                  <rect x="10" y="8" width="28" height="32" />
                  <path d="M14 34 34 14" />
                </svg>
              {:else if option.id === "not-sure"}
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
              {:else}
                <svg viewBox="0 0 48 48">
                  <rect x="8" y="10" width="24" height="28" />
                  <rect x="16" y="6" width="24" height="28" />
                  <path d="M22 14h12M22 20h12M22 26h8" />
                </svg>
              {/if}
            </div>

            <div class="page-copy">
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

      {#if hasCustomPage}
        <div class="custom-pages">
          <div class="custom-heading">
            <h2>
              {ui.customPages}
            </h2>

            <span>
              {ui.optional}
            </span>
          </div>

          <div class="custom-grid">
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
        </div>
      {/if}
    </section>
  {/if}

  <!-- =====================================================
       INTERNAL NAVIGATION
  ====================================================== -->

  <div class="internal-navigation">
    <div>
      {#if pagesStage !== "recommended"}
        <button type="button" class="back-button" onclick={goBack}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <path d="M11.75 4.75 6.5 10l5.25 5.25" />
          </svg>

          <span>
            {ui.back}
          </span>
        </button>
      {/if}
    </div>

    <div class="continue-area">
      {#if pagesStage === "recommended" && selectedPages.length === 0}
        <span class="hint">
          {ui.requiredPages}
        </span>
      {/if}

      {#if pagesStage === "volume" && !pageVolume}
        <span class="hint">
          {ui.requiredVolume}
        </span>
      {/if}

      <button
        type="button"
        class="continue-button"
        disabled={pagesStage === "recommended"
          ? selectedPages.length === 0
          : pagesStage === "volume"
            ? !pageVolume
            : false}
        onclick={goForward}
      >
        <span>
          {pagesStage === "volume" ? ui.finish : ui.continue}
        </span>

        <svg viewBox="0 0 20 20" aria-hidden="true">
          <path d="m8.25 4.75 5.25 5.25-5.25 5.25" />
        </svg>
      </button>
    </div>
  </div>
</div>

<style>
  .pages-step {
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
    max-width: 920px;

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
     PAGE GRID
  ========================================================= */

  .page-grid {
    display: grid;

    grid-template-columns: repeat(4, minmax(0, 1fr));

    gap: 9px;

    width: 100%;
  }

  .volume-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 9px;
  }

  /* =========================================================
     CARDS
  ========================================================= */

  .page-card,
  .volume-card {
    position: relative;

    display: flex;

    min-width: 0;
    min-height: 134px;

    flex-direction: column;

    align-items: flex-start;

    padding: 14px;

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

  .compact-card {
    min-height: 124px;
  }

  .volume-card {
    min-height: 132px;
  }

  .page-card:hover,
  .volume-card:hover {
    border-color: var(--step-border-hover);

    background: var(--step-card-hover);
  }

  .page-card.selected,
  .volume-card.selected {
    border-color: var(--step-accent);

    background: var(--step-accent-soft);
  }

  .page-card:focus-visible,
  .volume-card:focus-visible {
    outline: 2px solid var(--step-accent);

    outline-offset: 2px;
  }

  /* =========================================================
     ICONS
  ========================================================= */

  .page-icon,
  .volume-icon {
    display: grid;

    width: 39px;
    height: 39px;

    place-items: center;

    margin-bottom: 9px;

    color: var(--step-text);
  }

  .page-icon svg,
  .volume-icon svg {
    width: 34px;
    height: 34px;

    fill: none;

    stroke: currentColor;

    stroke-width: 1.45;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .selected .page-icon,
  .selected .volume-icon {
    color: var(--step-accent);
  }

  /* =========================================================
     COPY
  ========================================================= */

  .page-copy {
    width: 100%;

    min-width: 0;

    padding-right: 22px;
  }

  .page-copy h2 {
    margin: 0;

    color: var(--step-text);

    font-size: 12px;
    font-weight: 600;

    line-height: 1.25;
  }

  .page-copy p {
    display: -webkit-box;

    margin: 4px 0 0;

    overflow: hidden;

    color: var(--step-copy);

    font-size: 9px;

    line-height: 1.38;

    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  /* =========================================================
     SELECTED
  ========================================================= */

  .selection-state {
    position: absolute;

    top: 13px;
    right: 13px;

    display: grid;

    width: 18px;
    height: 18px;

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

  .selected .selection-state {
    border-color: var(--step-accent);

    background: var(--step-accent);
  }

  /* =========================================================
     INCLUDED NOTE
  ========================================================= */

  .included-note {
    display: flex;

    flex-wrap: wrap;

    gap: 4px;

    margin-top: 11px;

    color: var(--step-muted);

    font-size: 9px;

    line-height: 1.5;
  }

  .included-note > span {
    color: var(--step-copy);

    font-weight: 600;
  }

  .included-note strong {
    color: var(--step-muted);

    font-weight: 400;
  }

  /* =========================================================
     CATEGORY SELECTOR
  ========================================================= */

  .category-selector {
    display: flex;

    width: 100%;

    gap: 6px;

    margin-bottom: 14px;

    overflow-x: auto;

    scrollbar-width: thin;
  }

  .category-selector button {
    min-height: 38px;

    flex: 0 0 auto;

    padding: 0 11px;

    border: 1px solid var(--step-border);

    border-radius: 0;

    background: transparent;

    color: var(--step-copy);

    font-family: inherit;

    font-size: 9px;
    font-weight: 600;

    cursor: pointer;

    white-space: nowrap;
  }

  .category-selector button:hover {
    border-color: var(--step-border-hover);

    color: var(--step-text);
  }

  .category-selector button.active {
    border-color: var(--step-accent);

    background: var(--step-accent);

    color: #ffffff;
  }

  .active-category-heading {
    display: flex;

    align-items: center;
    justify-content: space-between;

    margin-bottom: 9px;

    color: var(--step-muted);

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  .active-category-heading span:last-child {
    color: var(--step-accent);
  }

  .optional-note {
    margin: 10px 0 0;

    color: var(--step-muted);

    font-size: 9px;
  }

  /* =========================================================
     CUSTOM PAGES
  ========================================================= */

  .custom-pages {
    margin-top: 14px;

    padding: 14px;

    border: 1px solid var(--step-border);

    background: var(--step-card);
  }

  .custom-heading {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 12px;

    margin-bottom: 11px;
  }

  .custom-heading h2 {
    margin: 0;

    color: var(--step-text);

    font-size: 12px;
    font-weight: 600;
  }

  .custom-heading span {
    color: var(--step-accent);

    font-size: 8px;
    font-weight: 700;

    text-transform: uppercase;
  }

  .custom-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 8px;
  }

  .custom-grid label {
    display: grid;

    gap: 5px;
  }

  .custom-grid label > span {
    color: var(--step-muted);

    font-size: 8px;
    font-weight: 700;

    text-transform: uppercase;
  }

  .custom-grid input {
    width: 100%;
    min-height: 40px;

    padding: 0 10px;

    border: 1px solid #3a3a3a;

    border-radius: 0;

    background: #070707;

    color: var(--step-text);

    font-family: inherit;

    font-size: 10px;

    box-sizing: border-box;

    outline: none;
  }

  .custom-grid input:focus {
    border-color: var(--step-accent);
  }

  /* =========================================================
     NAVIGATION
  ========================================================= */

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
    background: var(--step-accent-hover);

    border-color: var(--step-accent-hover);
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

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1050px) {
    .page-grid {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }
  }

  @media (max-width: 760px) {
    .question-header {
      margin-bottom: 17px;
    }

    .question-header h1 {
      font-size: clamp(23px, 6vw, 30px);
    }

    .page-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .volume-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .custom-grid {
      grid-template-columns: 1fr;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 560px) {
    .page-grid,
    .volume-grid {
      grid-template-columns: 1fr;

      gap: 7px;
    }

    .page-card,
    .volume-card,
    .compact-card {
      min-height: 116px;
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
    .page-card,
    .volume-card,
    .continue-button {
      transition: none;
    }
  }
</style>
