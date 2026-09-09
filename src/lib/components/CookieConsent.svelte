<script>
  import { onMount } from "svelte";

  /*
   * IMPORTANT FOR PERFORMANCE
   * -------------------------
   * The notice starts as visible so it is rendered in the initial HTML.
   * Previously it was inserted only after onMount/localStorage ran, which
   * allowed the cookie text to become a very late LCP candidate on mobile.
   *
   * Returning visitors who already saved a choice have it removed as soon
   * as the component hydrates.
   */
  let showCookieNotice = $state(true);
  let showPreferences = $state(false);
  let language = $state("de");

  const CONSENT_KEY = "cookieConsent";
  const CONSENT_EVENT = "zora:consentchange";

  const defaultConsent = {
    essentials: true,
    marketing: false,
    personalization: false,
    analytics: false,
  };

  let consent = $state({ ...defaultConsent });

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

  function normalizeConsent(value) {
    if (!value || typeof value !== "object") {
      return { ...defaultConsent };
    }

    return {
      essentials: true,
      marketing: value.marketing === true,
      personalization: value.personalization === true,
      analytics: value.analytics === true,
    };
  }

  /*
   * Publish the current preference state for the rest of the site.
   *
   * Other components can either:
   * 1. read window.__ZORA_COOKIE_CONSENT__, or
   * 2. listen for "zora:consentchange".
   *
   * This lets analytics/marketing integrations stay completely unloaded
   * when the visitor rejects optional cookies.
   */
  function publishConsent() {
    if (typeof window === "undefined") {
      return;
    }

    const snapshot = {
      essentials: true,
      marketing: consent.marketing === true,
      personalization: consent.personalization === true,
      analytics: consent.analytics === true,
    };

    window.__ZORA_COOKIE_CONSENT__ = snapshot;

    document.documentElement.dataset.consentMarketing = snapshot.marketing
      ? "granted"
      : "denied";

    document.documentElement.dataset.consentPersonalization =
      snapshot.personalization ? "granted" : "denied";

    document.documentElement.dataset.consentAnalytics = snapshot.analytics
      ? "granted"
      : "denied";

    window.dispatchEvent(
      new CustomEvent(CONSENT_EVENT, {
        detail: snapshot,
      }),
    );
  }

  function readSavedConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);

      if (!raw) {
        return null;
      }

      return normalizeConsent(JSON.parse(raw));
    } catch {
      return null;
    }
  }

  function persistConsent() {
    try {
      localStorage.setItem(
        CONSENT_KEY,
        JSON.stringify({
          essentials: true,
          marketing: consent.marketing === true,
          personalization: consent.personalization === true,
          analytics: consent.analytics === true,
        }),
      );
    } catch {
      /*
       * If storage is unavailable, the site still works.
       * The visitor may simply be asked again on the next visit.
       */
    }
  }

  onMount(() => {
    /*
     * Match the banner language to the current page where possible.
     * This happens after hydration and does not affect layout.
     */
    const pageLanguage = document.documentElement.lang?.toLowerCase().trim();

    if (pageLanguage?.startsWith("en")) {
      language = "en";
    } else if (pageLanguage?.startsWith("de")) {
      language = "de";
    }

    const savedConsent = readSavedConsent();

    if (savedConsent) {
      consent = savedConsent;
      showCookieNotice = false;
    } else {
      consent = { ...defaultConsent };
      showCookieNotice = true;
    }

    publishConsent();
  });

  function saveConsent() {
    /*
     * Essentials are always on.
     * Optional categories keep the visitor's current choices.
     */
    consent = normalizeConsent(consent);

    persistConsent();
    publishConsent();

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
    /*
     * Rejecting disables OPTIONAL categories only.
     * Essential website functionality remains available.
     */
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
  <div
    class="cookie-consent"
    class:preferences-open={showPreferences}
    role="dialog"
    aria-modal="false"
    aria-label={t.cookies}
  >
    <div class="language-switch">
      <button
        type="button"
        class:active={language === "de"}
        aria-pressed={language === "de"}
        onclick={() => (language = "de")}
      >
        DE
      </button>

      <button
        type="button"
        class:active={language === "en"}
        aria-pressed={language === "en"}
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

          <input
            type="checkbox"
            bind:checked={consent.marketing}
            aria-label={t.marketing}
          />
        </label>

        <label class="preference-item">
          <div>
            <strong>{t.personalization}</strong>

            <p>{t.personalizationText}</p>
          </div>

          <input
            type="checkbox"
            bind:checked={consent.personalization}
            aria-label={t.personalization}
          />
        </label>

        <label class="preference-item">
          <div>
            <strong>{t.analytics}</strong>

            <p>{t.analyticsText}</p>
          </div>

          <input
            type="checkbox"
            bind:checked={consent.analytics}
            aria-label={t.analytics}
          />
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

    /*
     * The simple first screen does not need its own scroll container.
     * We only enable scrolling when the detailed preferences are open.
     */
    overflow: visible;

    padding: 22px;

    border: 1px solid rgba(255, 255, 255, 0.25);
    border-radius: 0;

    background: #111;

    color: #fff;

    box-shadow: 0 18px 50px rgba(0, 0, 0, 0.45);

    /*
     * Isolate layout/painting work from the rest of the page.
     * This does not change the visual design.
     */
    contain: layout style paint;

    box-sizing: border-box;

    overscroll-behavior: contain;
  }

  .cookie-consent.preferences-open {
    overflow-y: auto;
  }

  .language-switch {
    display: flex;

    justify-content: flex-end;

    gap: 6px;

    margin-bottom: 14px;
  }

  .language-switch button {
    padding: 4px 10px;

    border: 1px solid #fff;
    border-radius: 0;

    background: transparent;

    color: #fff;

    cursor: pointer;

    font-family: inherit;
    font-size: 12px;
    font-weight: 700;
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
    display: flex;

    flex-wrap: wrap;

    gap: 10px;

    margin-top: 18px;
  }

  .cookie-actions button {
    padding: 10px 18px;

    border: 1px solid #fff;
    border-radius: 0;

    background: #fff;

    color: #000;

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
    border-color: transparent;

    background: transparent;

    color: #fff;

    text-decoration: underline;
  }

  .preference-item {
    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    padding: 16px 0;

    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }

  .preference-item strong {
    display: block;

    margin-bottom: 4px;

    font-size: 15px;
  }

  .preference-item span {
    display: block;

    margin-bottom: 6px;

    color: #ccc;

    font-size: 13px;
    font-weight: 700;
  }

  .preference-item input {
    width: 20px;
    height: 20px;

    flex: 0 0 20px;

    accent-color: #fff;
  }

  @media (max-width: 1024px) {
    .cookie-consent {
      right: 20px;
      bottom: 20px;

      width: min(380px, calc(100vw - 40px));

      max-height: calc(100dvh - 40px);
    }
  }

  @media (max-width: 767px) {
    .cookie-consent {
      right: 16px;
      bottom: 16px;
      left: 16px;

      width: auto;

      max-height: calc(100dvh - 32px);

      padding: 18px;
    }

    /*
     * Keep exactly the same design language, but make the first mobile
     * notice slightly cheaper/smaller to paint and less likely to dominate
     * the viewport as the LCP candidate.
     */
    .cookie-content p {
      font-size: 13px;

      line-height: 1.5;
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
