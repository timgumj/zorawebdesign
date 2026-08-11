<script>
  import { onMount } from "svelte";

  let showCookieNotice = $state(false);
  let showPreferences = $state(false);
  let language = $state("de");

  let consent = $state({
    essentials: true,
    marketing: false,
    personalization: false,
    analytics: false,
  });

  const text = {
    de: {
      cookies: "Cookies",
      intro:
        "Wenn du auf „Akzeptieren“ klickst, stimmst du der Speicherung von Cookies auf deinem Gerät zu, um die Navigation auf der Website zu verbessern, die Nutzung der Website zu analysieren und unsere Marketingaktivitäten zu unterstützen.",
      accept: "Akzeptieren",
      reject: "Ablehnen",
      preferences: "Einstellungen",
      manage: "Cookie-Einstellungen verwalten",
      essentials: "Essentiell",
      always: "Immer aktiv",
      essentialsText: "Notwendig, damit die Website funktioniert. Immer aktiv.",
      marketing: "Marketing",
      marketingText: "Wird für gezielte Werbung verwendet.",
      personalization: "Personalisierung",
      personalizationText:
        "Merkt sich deine Einstellungen und bietet erweiterte Funktionen.",
      analytics: "Analyse",
      analyticsText: "Misst die Nutzung und verbessert dein Erlebnis.",
      rejectAll: "Alle ablehnen",
      acceptAll: "Alle akzeptieren",
      save: "Einstellungen speichern",
    },

    en: {
      cookies: "Cookies",
      intro:
        "When you click “Accept”, you agree to the storage of cookies on your device to improve website navigation, analyze website usage and support our marketing activities.",
      accept: "Accept",
      reject: "Reject",
      preferences: "Preferences",
      manage: "Manage Consent Preferences",
      essentials: "Essentials",
      always: "Always active",
      essentialsText: "Necessary for the site to function. Always on.",
      marketing: "Marketing",
      marketingText: "Used for targeted advertising.",
      personalization: "Personalization",
      personalizationText:
        "Remembers your preferences and provides enhanced features.",
      analytics: "Analytics",
      analyticsText: "Measures usage and improves your experience.",
      rejectAll: "Reject All",
      acceptAll: "Accept All",
      save: "Save preference",
    },
  };

  let t = $derived(text[language]);

  onMount(() => {
    const savedConsent = localStorage.getItem("cookieConsent");

    if (!savedConsent) {
      showCookieNotice = true;
    } else {
      consent = JSON.parse(savedConsent);
    }
  });

  function saveConsent() {
    localStorage.setItem("cookieConsent", JSON.stringify(consent));

    showCookieNotice = false;
    showPreferences = false;
  }

  function acceptAll() {
    consent = {
      essentials: true,
      marketing: true,
      personalization: true,
      analytics: true,
    };

    saveConsent();
  }

  function rejectAll() {
    consent = {
      essentials: true,
      marketing: false,
      personalization: false,
      analytics: false,
    };

    saveConsent();
  }
</script>

{#if showCookieNotice}
  <div class="cookie-consent">
    <div class="language-switch">
      <button
        type="button"
        class:active={language === "de"}
        onclick={() => (language = "de")}
      >
        DE
      </button>

      <button
        type="button"
        class:active={language === "en"}
        onclick={() => (language = "en")}
      >
        EN
      </button>
    </div>

    {#if !showPreferences}
      <div class="cookie-content">
        <h3>{t.cookies}</h3>

        <p>{t.intro}</p>
      </div>

      <div class="cookie-actions">
        <button type="button" onclick={acceptAll}>
          {t.accept}
        </button>

        <button type="button" class="outline" onclick={rejectAll}>
          {t.reject}
        </button>

        <button
          type="button"
          class="link"
          onclick={() => (showPreferences = true)}
        >
          {t.preferences}
        </button>
      </div>
    {:else}
      <div class="cookie-content">
        <h3>{t.manage}</h3>

        <div class="preference-item">
          <div>
            <strong>{t.essentials}</strong>

            <span>{t.always}</span>

            <p>{t.essentialsText}</p>
          </div>
        </div>

        <label class="preference-item">
          <div>
            <strong>{t.marketing}</strong>

            <p>{t.marketingText}</p>
          </div>

          <input type="checkbox" bind:checked={consent.marketing} />
        </label>

        <label class="preference-item">
          <div>
            <strong>{t.personalization}</strong>

            <p>{t.personalizationText}</p>
          </div>

          <input type="checkbox" bind:checked={consent.personalization} />
        </label>

        <label class="preference-item">
          <div>
            <strong>{t.analytics}</strong>

            <p>{t.analyticsText}</p>
          </div>

          <input type="checkbox" bind:checked={consent.analytics} />
        </label>
      </div>

      <div class="cookie-actions">
        <button type="button" class="outline" onclick={rejectAll}>
          {t.rejectAll}
        </button>

        <button type="button" onclick={acceptAll}>
          {t.acceptAll}
        </button>

        <button type="button" onclick={saveConsent}>
          {t.save}
        </button>
      </div>
    {/if}
  </div>
{/if}

<style>
  .cookie-consent {
    position: fixed;
    right: 24px;
    bottom: 24px;
    z-index: 99999999;
    width: min(420px, calc(100vw - 32px));
    max-height: calc(100vh - 48px);
    overflow-y: auto;
    background: #111;
    color: #fff;
    border: 1px solid rgba(255, 255, 255, 0.25);
    padding: 22px;
    border-radius: 0;
    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);
  }

  .language-switch {
    display: flex;
    justify-content: flex-end;
    gap: 6px;
    margin-bottom: 14px;
  }

  .language-switch button {
    background: transparent;
    color: #fff;
    border: 1px solid #fff;
    padding: 4px 10px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 700;
    border-radius: 0;
  }

  .language-switch button.active {
    background: #fff;
    color: #000;
  }

  .cookie-content h3 {
    margin: 0 0 10px;
    font-size: 20px;
  }

  .cookie-content p {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
  }

  .cookie-actions {
    margin-top: 18px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .cookie-actions button {
    border: 1px solid #fff;
    background: #fff;
    color: #000;
    padding: 10px 18px;
    border-radius: 0;
    cursor: pointer;
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    white-space: nowrap;
  }

  .cookie-actions .outline {
    background: transparent;
    color: #fff;
  }

  .cookie-actions .link {
    background: transparent;
    color: #fff;
    border-color: transparent;
    text-decoration: underline;
  }

  .preference-item {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
    padding: 16px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }

  .preference-item strong {
    display: block;
    margin-bottom: 4px;
    font-size: 15px;
  }

  .preference-item span {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 700;
    color: #ccc;
  }

  .preference-item input {
    width: 20px;
    height: 20px;
    accent-color: #fff;
  }

  @media (max-width: 1024px) {
    .cookie-consent {
      right: 20px;
      bottom: 20px;
      width: min(380px, calc(100vw - 40px));
    }
  }

  @media (max-width: 767px) {
    .cookie-consent {
      left: 16px;
      right: 16px;
      bottom: 16px;
      width: auto;
      padding: 18px;
      max-height: calc(100vh - 32px);
    }

    .cookie-actions {
      flex-direction: column;
    }

    .cookie-actions button {
      width: 100%;
    }

    .preference-item {
      align-items: flex-start;
    }
  }
</style>
