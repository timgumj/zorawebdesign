<script>
  import {
    getConfiguratorContent,
    getRelevantGoals,
  } from "$lib/data/website-configurator/configurator-data.js";

  let {
    language = "de",
    selectedWebsiteType = $bindable(""),
    selectedGoals = $bindable([]),
  } = $props();

  const content = $derived(getConfiguratorContent(language));

  const stepContent = $derived(content.steps.websiteType);

  const websiteTypes = $derived(stepContent.options || []);

  const ui = $derived(
    language === "en"
      ? {
          title: "What type of website are you planning?",
          description:
            "Choose the option that comes closest. You can refine the exact pages and features in the next steps.",
        }
      : {
          title: "Welche Art von Website planen Sie?",
          description:
            "Wählen Sie die Option, die Ihrem Projekt am nächsten kommt. Seiten und Funktionen legen Sie in den nächsten Schritten genauer fest.",
        },
  );

  function selectWebsiteType(optionId) {
    if (selectedWebsiteType === optionId) {
      return;
    }

    selectedWebsiteType = optionId;

    const validGoalIds = getRelevantGoals(optionId, language).map(
      (goal) => goal.id,
    );

    selectedGoals = selectedGoals.filter((goalId) =>
      validGoalIds.includes(goalId),
    );
  }

  function handleSelectableKeydown(event, optionId) {
    if (event.key !== "Enter" && event.key !== " ") {
      return;
    }

    event.preventDefault();

    selectWebsiteType(optionId);
  }

  /*
   * Website type icons are mapped directly from the
   * stable website type IDs.
   *
   * This avoids German/English label differences.
   */
  function getIconType(option) {
    const id = option?.id ?? "";

    const iconMap = {
      business: "business",
      artist: "portfolio",
      "online-shop": "shop",
      restaurant: "restaurant",
      medical: "medical",
      "law-firm": "legal",
      ngo: "organisation",
      education: "education",
      event: "event",
      "web-app": "app",
    };

    return iconMap[id] ?? "website";
  }
</script>

<section class="website-type-step" aria-labelledby="website-type-title">
  <!-- =====================================================
       QUESTION
  ====================================================== -->

  <header class="question-header">
    <h1 id="website-type-title">
      {ui.title}
    </h1>

    <p>
      {ui.description}
    </p>
  </header>

  <!-- =====================================================
       OPTIONS
  ====================================================== -->

  <div class="option-grid" role="radiogroup" aria-label={ui.title}>
    {#each websiteTypes as option}
      {@const selected = selectedWebsiteType === option.id}

      {@const iconType = getIconType(option)}

      <div
        class="selection-card"
        class:selected
        role="radio"
        aria-checked={selected}
        tabindex="0"
        onclick={() => selectWebsiteType(option.id)}
        onkeydown={(event) => handleSelectableKeydown(event, option.id)}
      >
        <!-- ===============================================
             ICON
        ================================================ -->

        <div class="option-icon" aria-hidden="true">
          {#if iconType === "business"}
            <svg viewBox="0 0 48 48">
              <rect x="7" y="9" width="34" height="28" />

              <path d="M7 16h34" />

              <circle
                cx="12"
                cy="12.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />

              <circle
                cx="16"
                cy="12.5"
                r="1"
                fill="currentColor"
                stroke="none"
              />

              <path d="M13 22h22" />
              <path d="M13 27h15" />
              <path d="M13 32h10" />
            </svg>
          {:else if iconType === "portfolio"}
            <svg viewBox="0 0 48 48">
              <rect x="7" y="8" width="34" height="30" />

              <circle cx="17" cy="17" r="3" />

              <path d="m11 33 9-9 6 6 5-5 7 8" />
            </svg>
          {:else if iconType === "shop"}
            <svg viewBox="0 0 48 48">
              <path d="M12 18h24l-2 21H14l-2-21Z" />
              <path d="M18 19v-4a6 6 0 0 1 12 0v4" />
              <path d="M17 25h14" />
            </svg>
          {:else if iconType === "restaurant"}
            <svg viewBox="0 0 48 48">
              <path d="M13 8v14" />
              <path d="M9 8v8a4 4 0 0 0 8 0V8" />
              <path d="M13 22v18" />

              <path d="M30 8v32" />
              <path d="M30 8c6 4 7 12 0 17" />
            </svg>
          {:else if iconType === "medical"}
            <svg viewBox="0 0 48 48">
              <path
                d="M24 39S10 30 10 18.5A8.5 8.5 0 0 1 24 12a8.5 8.5 0 0 1 14 6.5C38 30 24 39 24 39Z"
              />

              <path d="M16 24h5l2-5 4 10 2-5h4" />
            </svg>
          {:else if iconType === "legal"}
            <svg viewBox="0 0 48 48">
              <path d="M28 10 38 20" />
              <path d="M22 16 32 26" />

              <rect
                x="19"
                y="9"
                width="12"
                height="8"
                transform="rotate(45 25 13)"
              />

              <rect
                x="29"
                y="19"
                width="12"
                height="8"
                transform="rotate(45 35 23)"
              />

              <path d="M18 22 35 39" />
              <path d="M31 42h11" />
              <path d="M27 38h15v4H27z" />
            </svg>
          {:else if iconType === "organisation"}
            <svg viewBox="0 0 48 48">
              <circle cx="24" cy="15" r="5" />

              <circle cx="12" cy="21" r="4" />

              <circle cx="36" cy="21" r="4" />

              <path d="M15 39c0-7 3.5-11 9-11s9 4 9 11" />

              <path d="M4 38c0-6 3-10 8-10 2 0 4 .7 5.5 2" />

              <path d="M44 38c0-6-3-10-8-10-2 0-4 .7-5.5 2" />
            </svg>
          {:else if iconType === "education"}
            <svg viewBox="0 0 48 48">
              <path d="m6 18 18-9 18 9-18 9L6 18Z" />

              <path d="M14 23v9c5 5 15 5 20 0v-9" />

              <path d="M42 18v13" />
            </svg>
          {:else if iconType === "event"}
            <svg viewBox="0 0 48 48">
              <rect x="7" y="10" width="34" height="30" />

              <path d="M7 18h34" />
              <path d="M15 6v8" />
              <path d="M33 6v8" />

              <path d="M15 25h6v6h-6z" />
              <path d="M27 25h6v6h-6z" />
            </svg>
          {:else if iconType === "app"}
            <svg viewBox="0 0 48 48">
              <rect x="6" y="8" width="36" height="32" />

              <path d="M6 16h36" />

              <rect x="11" y="21" width="10" height="13" />

              <rect x="26" y="21" width="11" height="5" />

              <rect x="26" y="29" width="11" height="5" />
            </svg>
          {:else}
            <svg viewBox="0 0 48 48">
              <rect x="7" y="9" width="34" height="30" />

              <path d="M7 17h34" />
              <path d="M13 23h22" />
              <path d="M13 29h16" />
            </svg>
          {/if}
        </div>

        <!-- ===============================================
             COPY
        ================================================ -->

        <div class="option-copy">
          <h2>
            {option.label}
          </h2>

          {#if option.description}
            <p>
              {option.description}
            </p>
          {/if}
        </div>

        <!-- ===============================================
             SELECTION STATE
        ================================================ -->

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
</section>

<style>
  /* =========================================================
     STEP
  ========================================================= */

  .website-type-step {
    --step-bg: #080808;
    --step-card: #0c0c0c;
    --step-card-hover: #101010;

    --step-text: #f3f3f3;
    --step-copy: #888888;

    --step-border: #2c2c2c;
    --step-border-hover: #505050;

    --step-accent: #0043ff;
    --step-accent-soft: rgba(0, 67, 255, 0.08);

    width: 100%;

    margin: 0;
    padding: 0;

    color: var(--step-text);

    background: var(--step-bg);

    font-family: "DM Sans", Arial, sans-serif;

    box-sizing: border-box;
  }

  /* =========================================================
     QUESTION
  ========================================================= */

  .question-header {
    width: 100%;

    margin: 0 0 20px;
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
     GRID
  ========================================================= */

  .option-grid {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 10px;

    width: 100%;
  }

  /* =========================================================
     CARD
  ========================================================= */

  .selection-card {
    position: relative;

    display: flex;

    min-width: 0;
    min-height: 150px;

    flex-direction: column;

    align-items: flex-start;

    padding: 17px 18px 16px;

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

  /* =========================================================
     ICON
  ========================================================= */

  .option-icon {
    display: grid;

    width: 48px;
    height: 48px;

    place-items: center;

    margin-bottom: 14px;

    color: var(--step-text);
  }

  .option-icon svg {
    width: 42px;
    height: 42px;

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

    padding-right: 28px;
  }

  .option-copy h2 {
    margin: 0;

    color: var(--step-text);

    font-size: 14px;
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

  .selection-card.selected .option-copy h2 {
    color: #ffffff;
  }

  /* =========================================================
     SELECTION STATE
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
     LARGE TABLET
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

    .option-grid {
      gap: 8px;
    }

    .selection-card {
      min-height: 138px;

      padding: 15px 15px 14px;
    }

    .option-icon {
      width: 44px;
      height: 44px;

      margin-bottom: 11px;
    }

    .option-icon svg {
      width: 38px;
      height: 38px;
    }

    .selection-state {
      top: 14px;
      right: 14px;

      width: 18px;
      height: 18px;
    }

    .option-copy h2 {
      font-size: 13px;
    }

    .option-copy p {
      font-size: 9.5px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 560px) {
    .question-header {
      margin-bottom: 15px;
    }

    .option-grid {
      grid-template-columns: 1fr;

      gap: 7px;
    }

    .selection-card {
      min-height: 128px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 390px) {
    .selection-card {
      min-height: 122px;

      padding: 14px;
    }

    .option-icon {
      width: 40px;
      height: 40px;
    }

    .option-icon svg {
      width: 35px;
      height: 35px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .selection-card {
      transition: none;
    }
  }
</style>
