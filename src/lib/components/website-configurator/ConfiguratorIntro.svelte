<script>
  let { language = "de", onStart = () => {} } = $props();

  const text = $derived(
    language === "en"
      ? {
          eyebrow: "Website Project Planning",
          title: "Website planner",
          description:
            "Answer a few focused questions and receive a tailored recommendation for the pages, features and level of support your website may need.",
          time: "Takes about 3–5 minutes",
          button: "Plan My Website →",
          privacy:
            "You decide at the end whether you want to request a personal quote.",
          previewLabel: "Project preview",
          previewType: "Website type",
          previewTypeValue: "Example: Business website",
          previewGoals: "Main goals",
          previewGoalOne: "Generate enquiries",
          previewGoalTwo: "Build trust",
          previewScope: "Recommended scope",
          previewScopeValue: "Growth",
          previewNote: "Personalised from your answers",
          highlights: [
            {
              number: "01",
              title: "Define your goals",
              text: "Tell us what your website should achieve.",
            },
            {
              number: "02",
              title: "Choose your requirements",
              text: "Select relevant pages, features and support.",
            },
            {
              number: "03",
              title: "Compare your options",
              text: "Review three project scopes and request a quote.",
            },
          ],
        }
      : {
          eyebrow: "Website-Projektplanung",
          title: "Website Planner",
          description:
            "Beantworten Sie einige gezielte Fragen und erhalten Sie eine individuelle Empfehlung für Seiten, Funktionen und den passenden Betreuungsumfang Ihrer Website.",
          time: "Dauert etwa 3–5 Minuten",
          button: "Website planen →",
          privacy:
            "Am Ende entscheiden Sie, ob Sie ein persönliches Angebot anfordern möchten.",
          previewLabel: "Projektvorschau",
          previewType: "Website-Art",
          previewTypeValue: "Beispiel: Unternehmenswebsite",
          previewGoals: "Wichtigste Ziele",
          previewGoalOne: "Mehr Anfragen",
          previewGoalTwo: "Vertrauen aufbauen",
          previewScope: "Empfohlener Umfang",
          previewScopeValue: "Growth",
          previewNote: "Persönlich aus Ihren Antworten",
          highlights: [
            {
              number: "01",
              title: "Ziele definieren",
              text: "Teilen Sie uns mit, was Ihre Website erreichen soll.",
            },
            {
              number: "02",
              title: "Anforderungen wählen",
              text: "Wählen Sie passende Seiten, Funktionen und Unterstützung.",
            },
            {
              number: "03",
              title: "Optionen vergleichen",
              text: "Vergleichen Sie drei Projektumfänge und fordern Sie ein Angebot an.",
            },
          ],
        },
  );
</script>

<section class="intro-card">
  <div class="intro-main">
    <div class="intro-copy">
      <span class="eyebrow">{text.eyebrow}</span>

      <h1>{text.title}</h1>

      <p class="intro-description">
        {text.description}
      </p>

      <div class="intro-actions">
        <button type="button" onclick={onStart}>
          {text.button}
        </button>

        <span class="time-label">{text.time}</span>
      </div>

      <p class="privacy-note">{text.privacy}</p>
    </div>

    <div class="intro-visual" aria-hidden="true">
      <div class="preview-window">
        <div class="preview-topbar">
          <span>{text.previewLabel}</span>
          <span class="preview-progress">01 / 06</span>
        </div>

        <div class="preview-progress-track">
          <span></span>
        </div>

        <div class="preview-section">
          <span class="preview-kicker">01</span>

          <div>
            <span class="preview-label">{text.previewType}</span>
            <strong>{text.previewTypeValue}</strong>
          </div>
        </div>

        <div class="preview-section">
          <span class="preview-kicker">02</span>

          <div>
            <span class="preview-label">{text.previewGoals}</span>

            <div class="preview-tags">
              <span>{text.previewGoalOne}</span>
              <span>{text.previewGoalTwo}</span>
            </div>
          </div>
        </div>

        <div class="preview-section recommended-section">
          <span class="preview-kicker">03</span>

          <div>
            <span class="preview-label">{text.previewScope}</span>
            <strong class="scope-value">{text.previewScopeValue}</strong>
            <small>{text.previewNote}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="intro-highlights">
    {#each text.highlights as item}
      <article>
        <span class="highlight-number">{item.number}</span>

        <div>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </div>
      </article>
    {/each}
  </div>
</section>

<style>
  .intro-card {
    width: 100%;
    overflow: hidden;
    border: 1px solid #292929;
    background: #0b0b0b;
    box-sizing: border-box;
    font-family: "DM Sans", Arial, sans-serif;
  }

  .intro-main {
    min-height: 480px;
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) minmax(320px, 0.85fr);
  }

  .intro-copy {
    padding: clamp(30px, 4vw, 56px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .eyebrow {
    display: block;
    margin-bottom: 16px;
    color: #929292;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h1 {
    max-width: 760px;
    margin: 0 0 22px;
    color: #f3f3f3;
    font-family: "DM Sans", Arial, sans-serif;
    font-size: clamp(34px, 4vw, 52px);
    font-weight: 700;
    line-height: 0.98;
    letter-spacing: -0.05em;
    text-transform: uppercase;
  }

  .intro-description {
    max-width: 650px;
    margin: 0;
    color: #b4b4b4;
    font-size: 15px;
    line-height: 1.7;
  }

  .intro-actions {
    margin-top: 30px;
    display: flex;
    align-items: center;
    gap: 18px;
    flex-wrap: wrap;
  }

  button {
    min-height: 48px;
    padding: 0 22px;
    border: 1px solid #0043ff;
    border-radius: 0;
    background: #0043ff;
    color: #ffffff;
    font-family: "DM Sans", Arial, sans-serif;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background 0.2s ease,
      border-color 0.2s ease;
  }

  button:hover {
    border-color: #1b56ff;
    background: #1b56ff;
  }

  button:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 4px;
  }

  .time-label {
    color: #e0e0e0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .privacy-note {
    max-width: 570px;
    margin: 22px 0 0;
    color: #777777;
    font-size: 14px;
    line-height: 1.6;
  }

  .intro-visual {
    min-height: 100%;
    padding: clamp(28px, 4vw, 46px);
    border-left: 1px solid #292929;
    display: grid;
    place-items: center;
    overflow: hidden;
    background: #0d0d0d;
    box-sizing: border-box;
  }

  .preview-window {
    width: min(390px, 100%);
    border: 1px solid #353535;
    background: #090909;
  }

  .preview-topbar {
    min-height: 48px;
    padding: 0 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #292929;
    color: #8f8f8f;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .preview-progress {
    color: #0043ff;
  }

  .preview-progress-track {
    height: 2px;
    background: #262626;
  }

  .preview-progress-track span {
    display: block;
    width: 34%;
    height: 100%;
    background: #0043ff;
  }

  .preview-section {
    min-height: 94px;
    padding: 18px;
    display: grid;
    grid-template-columns: 24px minmax(0, 1fr);
    gap: 14px;
    border-bottom: 1px solid #292929;
  }

  .preview-section:last-child {
    border-bottom: 0;
  }

  .preview-kicker {
    color: #777777;
    font-size: 9px;
    font-weight: 700;
  }

  .preview-label {
    display: block;
    margin-bottom: 8px;
    color: #747474;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .preview-section strong {
    display: block;
    color: #ececec;
    font-size: 15px;
    font-weight: 600;
  }

  .preview-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }

  .preview-tags span {
    padding: 5px 7px;
    border: 1px solid #d0d0d0;
    background: #0b0b0b;
    color: #4f76ff;
    font-size: 14px;
  }

  .recommended-section {
    background: #0b0b0b;
  }

  .scope-value {
    color: #4f76ff !important;
  }

  .recommended-section small {
    display: block;
    margin-top: 6px;
    color: #7e7e7e;
    font-size: 10px;
  }

  .intro-highlights {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    border-top: 1px solid #292929;
  }

  .intro-highlights article {
    min-height: 130px;
    padding: 24px;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 18px;
    align-items: start;
    border-right: 1px solid #292929;
    box-sizing: border-box;
  }

  .intro-highlights article:last-child {
    border-right: 0;
  }

  .highlight-number {
    color: #0043ff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
  }

  .intro-highlights h2 {
    margin: 0 0 8px;
    color: #f1f1f1;
    font-size: 14px;
    font-weight: 700;
    line-height: 1.25;
    letter-spacing: -0.015em;
    text-transform: uppercase;
  }

  .intro-highlights p {
    margin: 0;
    color: #8f8f8f;
    font-size: 14px;
    line-height: 1.6;
  }

  @media (max-width: 900px) {
    .intro-main {
      min-height: auto;
      grid-template-columns: 1fr;
    }

    .intro-visual {
      min-height: 360px;
      border-top: 1px solid #292929;
      border-left: 0;
    }
  }

  @media (max-width: 700px) {
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

  @media (max-width: 520px) {
    .intro-copy {
      padding: 24px;
    }

    h1 {
      font-size: clamp(32px, 11vw, 44px);
    }

    .intro-actions {
      align-items: stretch;
      flex-direction: column;
    }

    button {
      width: 100%;
    }

    .intro-visual {
      min-height: auto;
      padding: 24px;
    }
  }
</style>
