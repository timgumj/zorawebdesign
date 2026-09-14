<script>
  let { language = "de", onStart = () => {} } = $props();

  const text = $derived(language === "en" ? {
  "eyebrow": "Plan your website",
  "title": "Website planner",
  "description": "Planning a new website or updating an existing one? Answer a few simple questions about what you need. At the end, you get a summary of your project and a recommendation.",
  "time": "About 3–5 minutes",
  "button": "Start planning",
  "privacy": "No technical knowledge needed. You can request a personal quote at the end, if you like.",
  "previewLabel": "Your project summary",
  "previewProgress": "Example",
  "previewType": "Website type",
  "previewTypeValue": "Business website",
  "previewGoals": "What it should do",
  "previewGoalOne": "Bring in enquiries",
  "previewGoalTwo": "Show your services",
  "previewScope": "Your recommendation",
  "previewScopeValue": "Pages, features and support",
  "previewNote": "Your result will depend on your answers.",
  "outcomeEyebrow": "How the planner works",
  "highlights": [
    {
      "icon": "/images/chat-notification-1.webp",
      "title": "Tell me your plans",
      "text": "Choose whether you need a new website or want to improve one you already have."
    },
    {
      "icon": "/images/customize-computer.webp",
      "title": "Choose what you need",
      "text": "Select your pages and features, and tell me if you need help with text or images."
    },
    {
      "icon": "/images/display-code-2.webp",
      "title": "See your project summary",
      "text": "Review the recommendation. If you want to work with me, you can then request a personal quote."
    }
  ]
} : {
  "eyebrow": "Plane deine Website",
  "title": "Website-Planer",
  "description": "Du brauchst eine neue Website oder willst deine bestehende verbessern? Beantworte ein paar einfache Fragen zu deinen Wünschen. Am Ende bekommst du eine Übersicht deines Projekts und eine Empfehlung.",
  "time": "Etwa 3–5 Minuten",
  "button": "Planung starten",
  "privacy": "Du brauchst kein technisches Vorwissen. Wenn du möchtest, kannst du am Ende ein persönliches Angebot anfragen.",
  "previewLabel": "Deine Projektübersicht",
  "previewProgress": "Beispiel",
  "previewType": "Art der Website",
  "previewTypeValue": "Website für dein Unternehmen",
  "previewGoals": "Was sie leisten soll",
  "previewGoalOne": "Anfragen gewinnen",
  "previewGoalTwo": "Leistungen zeigen",
  "previewScope": "Deine Empfehlung",
  "previewScopeValue": "Seiten, Funktionen und Betreuung",
  "previewNote": "Dein Ergebnis richtet sich nach deinen Antworten.",
  "outcomeEyebrow": "So funktioniert der Planer",
  "highlights": [
    {
      "icon": "/images/chat-notification-1.webp",
      "title": "Erzähl von deinem Vorhaben",
      "text": "Wähle, ob du eine neue Website brauchst oder eine bestehende verbessern willst."
    },
    {
      "icon": "/images/customize-computer.webp",
      "title": "Wähle, was du brauchst",
      "text": "Welche Seiten und Funktionen brauchst du? Und brauchst du Hilfe mit Texten oder Bildern?"
    },
    {
      "icon": "/images/display-code-2.webp",
      "title": "Schau dir dein Ergebnis an",
      "text": "Du bekommst eine Empfehlung für dein Projekt. Wenn du mit mir arbeiten möchtest, kannst du danach ein Angebot anfragen."
    }
  ]
});
</script>

<section class="intro-card">
  <!-- =====================================================
       MAIN INTRO
  ====================================================== -->

  <div class="intro-main">
    <div class="intro-copy">
      <span class="eyebrow">
        {text.eyebrow}
      </span>

      <h1>
        {text.title}
      </h1>

      <p class="intro-description">
        {text.description}
      </p>

      <div class="intro-actions">
        <button type="button" onclick={onStart}>
          <span>
            {text.button}
          </span>

          <span aria-hidden="true"> → </span>
        </button>

        <span class="time-label">
          {text.time}
        </span>
      </div>

      <p class="privacy-note">
        {text.privacy}
      </p>
    </div>

    <!-- =====================================================
         PREVIEW
    ====================================================== -->

    <div class="intro-visual" aria-hidden="true">
      <div class="preview-window">
        <div class="preview-topbar">
          <span>
            {text.previewLabel}
          </span>

          <span class="preview-progress">
            {text.previewProgress}
          </span>
        </div>

        <div class="preview-content">
          <div class="preview-section">
            <div>
              <span class="preview-label">
                {text.previewType}
              </span>

              <strong>
                {text.previewTypeValue}
              </strong>
            </div>
          </div>

          <div class="preview-section">
            <div>
              <span class="preview-label">
                {text.previewGoals}
              </span>

              <div class="preview-tags">
                <span>
                  {text.previewGoalOne}
                </span>

                <span>
                  {text.previewGoalTwo}
                </span>
              </div>
            </div>
          </div>

          <div class="preview-section recommended-section">
            <div>
              <span class="preview-label">
                {text.previewScope}
              </span>

              <strong class="scope-value">
                {text.previewScopeValue}
              </strong>

              <small>
                {text.previewNote}
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- =====================================================
       HIGHLIGHTS
  ====================================================== -->

  <div class="intro-outcome-heading">
    <span>
      {text.outcomeEyebrow}
    </span>
  </div>

  <div class="intro-highlights">
    {#each text.highlights as item}
      <article>
        <img class="highlight-icon" src={item.icon} alt="" width="40" height="40" loading="lazy" decoding="async" />

        <div>
          <h2>
            {item.title}
          </h2>

          <p>
            {item.text}
          </p>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  /* =========================================================
     CARD
  ========================================================= */

  .intro-card {
    width: 100%;

    overflow: hidden;

    border: 0;

    background: #0b0b0b;

    box-sizing: border-box;

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     MAIN
  ========================================================= */

  .intro-main {
    display: grid;
    border-top: 1px solid #292929;

    grid-template-columns:
      minmax(0, 1.15fr)
      minmax(320px, 0.85fr);

    min-height: 470px;
  }

  /* =========================================================
     COPY
  ========================================================= */

  .intro-copy {
    display: flex;

    flex-direction: column;

    justify-content: center;

    padding: clamp(32px, 4vw, 58px);
  }

  .eyebrow {
    display: block;

    margin-bottom: 14px;

    color: #ececec;

    font-size: 12px;
    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.11em;

    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;

    margin: 0 0 20px;

    color: #f3f3f3;

    font-family: "DM Sans", Arial, sans-serif;

    font-size: clamp(36px, 4.3vw, 56px);

    font-weight: 600;

    line-height: 0.98;

    letter-spacing: -0.045em;

    text-transform: uppercase;

    text-wrap: balance;
  }

  .intro-description {
    max-width: 660px;

    margin: 0;

    color: #a4a4a4;

    font-size: 16px;

    line-height: 1.7;
  }

  /* =========================================================
     CTA
  ========================================================= */

  .intro-actions {
    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 18px;

    margin-top: 30px;
  }

  button {
    display: inline-flex;

    min-height: 48px;

    align-items: center;
    justify-content: center;

    gap: 10px;

    padding: 0 22px;

    border: 1px solid var(--accent-blue, #0043ff);

    border-radius: 0;

    background: var(--accent-blue, #0043ff);

    color: #ffffff;

    font-family: "DM Sans", Arial, sans-serif;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.08em;

    text-transform: uppercase;

    cursor: pointer;

    transition:
      opacity 160ms ease,
      background 160ms ease,
      border-color 160ms ease;
  }

  button:hover {
    opacity: 0.9;
  }

  button:focus-visible {
    outline: 2px solid var(--accent-blue, #0043ff);

    outline-offset: 4px;
  }

  .time-label {
    color: #9a9a9a;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .privacy-note {
    max-width: 590px;

    margin: 18px 0 0;

    color: #a4a4a4;

    font-size: 12px;

    line-height: 1.55;
  }

  /* =========================================================
     VISUAL
  ========================================================= */

  .intro-visual {
    display: grid;

    min-height: 100%;

    place-items: center;

    padding: clamp(28px, 4vw, 46px);

    overflow: hidden;

    border-left: 1px solid #292929;

    background: transparent;

    box-sizing: border-box;
  }

  /* =========================================================
     PREVIEW WINDOW
  ========================================================= */

  .preview-window {
    width: min(390px, 100%);
    min-width: 0;
    overflow-wrap: anywhere;

    border: 0;

    background: transparent;
  }

  .preview-topbar {
    display: flex;

    min-height: 46px;

    align-items: center;
    justify-content: space-between;

    gap: 12px;

    padding: 0;

    border-bottom: 1px solid #292929;

    color: #a4a4a4;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  .preview-progress {
    color: #ececec;
  }



  .preview-content {
    display: grid;
  }

  /* =========================================================
     PREVIEW SECTIONS
  ========================================================= */

  .preview-section {
    display: grid;

    grid-template-columns: minmax(0, 1fr);

    gap: 14px;

    min-height: 90px;

    padding: 17px 0;

    border-bottom: 1px solid #292929;

    box-sizing: border-box;
  }

  .preview-section:last-child {
    border-bottom: 0;
  }


  .preview-label {
    display: block;

    margin-bottom: 7px;

    color: #a4a4a4;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .preview-section strong {
    display: block;

    color: #ececec;

    font-size: 13px;
    font-weight: 600;

    line-height: 1.35;
  }

  /* =========================================================
     PREVIEW TAGS
  ========================================================= */

  .preview-tags {
    display: flex;

    flex-wrap: wrap;

    gap: 8px 16px;
  }

  .preview-tags span {
    padding: 0;

    border: 0;

    color: #ececec;

    font-size: 12px;

    line-height: 1.3;
  }

  /* =========================================================
     RECOMMENDATION PREVIEW
  ========================================================= */

  .recommended-section {
    background: transparent;
  }

  .scope-value {
    color: #ececec;
  }

  .recommended-section small {
    display: block;

    margin-top: 6px;

    color: #a4a4a4;

    font-size: 12px;

    line-height: 1.4;
  }

  /* =========================================================
     OUTCOME HEADING
  ========================================================= */

  .intro-outcome-heading {
    padding: 16px 24px;

    border-top: 1px solid #292929;

    border-bottom: 1px solid #292929;
  }

  .intro-outcome-heading span {
    color: #ececec;

    font-size: 12px;
    font-weight: 700;

    letter-spacing: 0.1em;

    text-transform: uppercase;
  }

  /* =========================================================
     HIGHLIGHTS
  ========================================================= */

  .intro-highlights {
    display: grid;
    border-bottom: 1px solid #292929;

    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .intro-highlights article {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 16px;

    align-items: center;

    min-height: 122px;

    padding: 22px;

    border-right: 1px solid #292929;

    box-sizing: border-box;
  }

  .intro-highlights article:last-child {
    border-right: 0;
  }


  .highlight-icon {
    display: block;
    width: 40px;
    height: 40px;
    object-fit: contain;
  }

  .intro-highlights h2 {
    margin: 0 0 7px;

    color: #eeeeee;

    font-size: 14px;
    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.01em;

    text-transform: uppercase;
  }

  .intro-highlights p {
    margin: 0;

    color: #a4a4a4;

    font-size: 14px;

    line-height: 1.55;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 900px) {
    .intro-main {
      min-height: 0;

      grid-template-columns: 1fr;
    }

    .intro-visual {
      min-height: 330px;

      border-top: 1px solid #292929;

      border-left: 0;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 700px) {
    .intro-copy {
      padding: 28px 22px;
    }

    h1 {
      font-size: clamp(32px, 10vw, 44px);
    }

    .intro-description {
      font-size: 14px;
    }

    .intro-actions {
      align-items: stretch;

      flex-direction: column;

      margin-top: 25px;
    }

    button {
      width: 100%;

      min-height: 48px;
    }

    .time-label {
      text-align: center;
    }

    .privacy-note {
      margin-top: 16px;

      text-align: center;
    }

    .intro-visual {
      min-height: auto;

      padding: 22px;
    }

    .intro-highlights {
      grid-template-columns: 1fr;
    }

    .intro-highlights article {
      min-height: auto;

      border-right: 0;

      border-bottom: 1px solid #292929;
    }

    .intro-highlights article:last-child {
      border-bottom: 0;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .intro-copy {
      padding: 24px 18px;
    }

    .intro-visual {
      padding: 18px;
    }

    .preview-section {
      min-height: 84px;

      padding: 14px 0;
    }

    .intro-highlights article {
      padding: 18px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    button {
      transition: none;
    }
  }
</style>
