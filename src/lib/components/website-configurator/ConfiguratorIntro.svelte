<script>
  let { language = "de", onStart = () => {} } = $props();

  const text = $derived(
    language === "en"
      ? {
          eyebrow: "Website Project Planning",

          title: "Website planner",

          description:
            "Answer a few focused questions and receive a tailored recommendation for the pages, features and level of support your website may need.",

          time: "About 3–5 minutes",

          button: "Plan my website",

          privacy:
            "No commitment. You decide at the end whether you want to request a personal quote.",

          previewLabel: "Your project",

          previewProgress: "Example",

          previewType: "Website type",

          previewTypeValue: "Business website",

          previewGoals: "Main goals",

          previewGoalOne: "Generate enquiries",

          previewGoalTwo: "Build trust",

          previewScope: "Recommended scope",

          previewScopeValue: "Growth",

          previewNote: "Tailored from your answers",

          outcomeEyebrow: "What you get",

          highlights: [
            {
              number: "01",
              title: "Clarify your project",
              text: "Define what your website needs to achieve and where you are starting from.",
            },
            {
              number: "02",
              title: "Choose what you need",
              text: "Select relevant pages, features, content needs and support.",
            },
            {
              number: "03",
              title: "Get a recommendation",
              text: "Receive a suggested project scope based on your answers.",
            },
          ],
        }
      : {
          eyebrow: "Website-Projektplanung",

          title: "Website Planner",

          description:
            "Beantworten Sie einige gezielte Fragen und erhalten Sie eine individuelle Empfehlung für Seiten, Funktionen und den passenden Betreuungsumfang Ihrer Website.",

          time: "Etwa 3–5 Minuten",

          button: "Website planen",

          privacy:
            "Unverbindlich. Am Ende entscheiden Sie selbst, ob Sie ein persönliches Angebot anfordern möchten.",

          previewLabel: "Ihr Projekt",

          previewProgress: "Beispiel",

          previewType: "Website-Art",

          previewTypeValue: "Unternehmenswebsite",

          previewGoals: "Wichtigste Ziele",

          previewGoalOne: "Mehr Anfragen",

          previewGoalTwo: "Vertrauen aufbauen",

          previewScope: "Empfohlener Umfang",

          previewScopeValue: "Growth",

          previewNote: "Individuell aus Ihren Antworten",

          outcomeEyebrow: "Was Sie erhalten",

          highlights: [
            {
              number: "01",
              title: "Projekt klären",
              text: "Definieren Sie, was Ihre Website erreichen soll und wo Ihr Projekt aktuell steht.",
            },
            {
              number: "02",
              title: "Bedarf festlegen",
              text: "Wählen Sie relevante Seiten, Funktionen, Inhalte und Unterstützung.",
            },
            {
              number: "03",
              title: "Empfehlung erhalten",
              text: "Erhalten Sie einen passenden Projektumfang auf Basis Ihrer Antworten.",
            },
          ],
        },
  );
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

        <div class="preview-progress-track">
          <span></span>
        </div>

        <div class="preview-content">
          <div class="preview-section">
            <span class="preview-kicker"> 01 </span>

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
            <span class="preview-kicker"> 02 </span>

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
            <span class="preview-kicker"> 03 </span>

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
        <span class="highlight-number">
          {item.number}
        </span>

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

    border: 1px solid #292929;

    background: #0b0b0b;

    box-sizing: border-box;

    font-family: "DM Sans", Arial, sans-serif;
  }

  /* =========================================================
     MAIN
  ========================================================= */

  .intro-main {
    display: grid;

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

    color: #4f76ff;

    font-size: 10px;
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

    font-size: 14px;

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

    border: 1px solid #0043ff;

    border-radius: 0;

    background: #0043ff;

    color: #ffffff;

    font-family: "DM Sans", Arial, sans-serif;

    font-size: 11px;
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
    outline: 2px solid #0043ff;

    outline-offset: 4px;
  }

  .time-label {
    color: #9a9a9a;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .privacy-note {
    max-width: 590px;

    margin: 18px 0 0;

    color: #696969;

    font-size: 10px;

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

    background: #0d0d0d;

    box-sizing: border-box;
  }

  /* =========================================================
     PREVIEW WINDOW
  ========================================================= */

  .preview-window {
    width: min(390px, 100%);

    border: 1px solid #353535;

    background: #090909;
  }

  .preview-topbar {
    display: flex;

    min-height: 46px;

    align-items: center;
    justify-content: space-between;

    gap: 12px;

    padding: 0 15px;

    border-bottom: 1px solid #292929;

    color: #777777;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  .preview-progress {
    color: #5f80ff;
  }

  .preview-progress-track {
    width: 100%;
    height: 1px;

    overflow: hidden;

    background: #262626;
  }

  .preview-progress-track span {
    display: block;

    width: 46%;
    height: 100%;

    background: #0043ff;
  }

  .preview-content {
    display: grid;
  }

  /* =========================================================
     PREVIEW SECTIONS
  ========================================================= */

  .preview-section {
    display: grid;

    grid-template-columns:
      24px
      minmax(0, 1fr);

    gap: 14px;

    min-height: 90px;

    padding: 17px;

    border-bottom: 1px solid #292929;

    box-sizing: border-box;
  }

  .preview-section:last-child {
    border-bottom: 0;
  }

  .preview-kicker {
    color: #5f80ff;

    font-size: 9px;
    font-weight: 700;
  }

  .preview-label {
    display: block;

    margin-bottom: 7px;

    color: #747474;

    font-size: 8px;
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

    gap: 6px;
  }

  .preview-tags span {
    padding: 5px 7px;

    border: 1px solid #454545;

    color: #5f80ff;

    font-size: 9px;

    line-height: 1.3;
  }

  /* =========================================================
     RECOMMENDATION PREVIEW
  ========================================================= */

  .recommended-section {
    background: rgba(0, 67, 255, 0.035);
  }

  .scope-value {
    color: #6e8cff !important;
  }

  .recommended-section small {
    display: block;

    margin-top: 6px;

    color: #777777;

    font-size: 9px;

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
    color: #5f80ff;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.1em;

    text-transform: uppercase;
  }

  /* =========================================================
     HIGHLIGHTS
  ========================================================= */

  .intro-highlights {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .intro-highlights article {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 16px;

    align-items: start;

    min-height: 122px;

    padding: 22px;

    border-right: 1px solid #292929;

    box-sizing: border-box;
  }

  .intro-highlights article:last-child {
    border-right: 0;
  }

  .highlight-number {
    color: #5f80ff;

    font-size: 10px;
    font-weight: 700;

    letter-spacing: 0.08em;
  }

  .intro-highlights h2 {
    margin: 0 0 7px;

    color: #eeeeee;

    font-size: 12px;
    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.01em;

    text-transform: uppercase;
  }

  .intro-highlights p {
    margin: 0;

    color: #898989;

    font-size: 10.5px;

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
      font-size: 12px;
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

      padding: 14px;
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
