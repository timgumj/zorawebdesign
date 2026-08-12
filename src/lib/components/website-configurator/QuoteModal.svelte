<script>
  import { browser } from "$app/environment";
  import { tick } from "svelte";

  import { buildWebsiteConfiguratorQuotePayload } from "$lib/data/website-configurator/build-quote-payload.js";

  let {
    open = false,
    language = "de",
    answers = {},
    onClose = () => {},
  } = $props();

  let fullName = $state("");
  let email = $state("");
  let phone = $state("");
  let company = $state("");
  let currentWebsite = $state("");
  let preferredContact = $state("");
  let comments = $state("");
  let consent = $state(false);

  /*
   * Hidden honeypot field.
   * A real user should never fill this.
   */
  let website = $state("");

  let submitting = $state(false);
  let submitted = $state(false);
  let clientEmailSent = $state(false);
  let errorMessage = $state("");

  let nameInput = $state(null);

  const text = $derived(
    language === "en"
      ? {
          eyebrow: "Request a personalised quote",
          title: "Tell us how to contact you",
          description:
            "Your complete website configuration will be sent securely to Zora Web Design for personal review.",

          selectedPackage: "Selected project scope",

          fullName: "Full name",
          fullNamePlaceholder: "Your full name",

          company: "Business or organisation",
          companyPlaceholder: "Business, organisation or project name",

          email: "Email address",
          emailPlaceholder: "name@example.com",

          phone: "Phone number",
          phonePlaceholder: "Optional unless you prefer a call",

          currentWebsite: "Current website",
          currentWebsitePlaceholder: "https://example.com",

          preferredContact: "Preferred contact method",

          contactEmail: "Email",
          contactPhone: "Phone",
          contactEither: "Email or phone",

          comments: "Anything else we should know?",
          commentsPlaceholder:
            "Add any important information, questions or context for your project.",

          consent:
            "I agree that Zora Web Design may use these details to review my configuration and contact me about my website project.",

          privacy: "Your details are used only to respond to this request.",

          submit: "Send configuration",
          submitting: "Sending configuration…",

          close: "Close",
          closeModal: "Close quote form",

          successTitle: "Your configuration has been received",
          successText:
            "Thank you. Zora Web Design will personally review your project details and contact you with the next steps.",

          confirmationSent:
            "A confirmation has also been sent to your email address.",

          confirmationNotSent:
            "Your request was received, but the confirmation email could not be delivered. Zora Web Design still received your configuration.",

          error: "The configuration could not be sent. Please try again.",

          phoneRequired:
            "Please enter a phone number when phone is your preferred contact method.",

          packageMissing:
            "Please select a project scope before requesting a quote.",

          packageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },
        }
      : {
          eyebrow: "Persönliches Angebot anfordern",
          title: "Wie dürfen wir Sie kontaktieren?",
          description:
            "Ihre vollständige Website-Konfiguration wird sicher an Zora Web Design zur persönlichen Prüfung gesendet.",

          selectedPackage: "Ausgewählter Projektumfang",

          fullName: "Vollständiger Name",
          fullNamePlaceholder: "Ihr vollständiger Name",

          company: "Unternehmen oder Organisation",
          companyPlaceholder: "Unternehmen, Organisation oder Projektname",

          email: "E-Mail-Adresse",
          emailPlaceholder: "name@beispiel.at",

          phone: "Telefonnummer",
          phonePlaceholder: "Optional, außer Sie wünschen einen Anruf",

          currentWebsite: "Aktuelle Website",
          currentWebsitePlaceholder: "https://beispiel.at",

          preferredContact: "Bevorzugte Kontaktart",

          contactEmail: "E-Mail",
          contactPhone: "Telefon",
          contactEither: "E-Mail oder Telefon",

          comments: "Möchten Sie noch etwas ergänzen?",
          commentsPlaceholder:
            "Ergänzen Sie wichtige Informationen, Fragen oder Hinweise zu Ihrem Projekt.",

          consent:
            "Ich stimme zu, dass Zora Web Design diese Angaben zur Prüfung meiner Konfiguration und zur Kontaktaufnahme bezüglich meines Website-Projekts verwenden darf.",

          privacy:
            "Ihre Angaben werden ausschließlich zur Bearbeitung dieser Anfrage verwendet.",

          submit: "Konfiguration senden",
          submitting: "Konfiguration wird gesendet…",

          close: "Schließen",
          closeModal: "Angebotsformular schließen",

          successTitle: "Ihre Konfiguration wurde übermittelt",
          successText:
            "Vielen Dank. Zora Web Design prüft Ihre Projektangaben persönlich und meldet sich mit den nächsten Schritten.",

          confirmationSent:
            "Eine Bestätigung wurde zusätzlich an Ihre E-Mail-Adresse gesendet.",

          confirmationNotSent:
            "Ihre Anfrage wurde empfangen, die Bestätigungs-E-Mail konnte jedoch nicht zugestellt werden. Zora Web Design hat Ihre Konfiguration trotzdem erhalten.",

          error:
            "Die Konfiguration konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",

          phoneRequired:
            "Bitte geben Sie eine Telefonnummer an, wenn Sie telefonisch kontaktiert werden möchten.",

          packageMissing: "Bitte wählen Sie zuerst einen Projektumfang aus.",

          packageNames: {
            essential: "Essential",
            growth: "Growth",
            advanced: "Advanced",
          },
        },
  );

  const selectedPackageLabel = $derived(
    text.packageNames[answers.selectedPackage] ??
      answers.selectedPackage ??
      "—",
  );

  const endpoint = "/api/send-mail";

  $effect(() => {
    if (!browser || !open) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });

  $effect(() => {
    if (!open || submitted) return;

    tick().then(() => {
      nameInput?.focus();
    });
  });

  function closeModal() {
    if (submitting) return;

    onClose();
  }

  function handleWindowKeydown(event) {
    if (event.key === "Escape" && open && !submitting) {
      closeModal();
    }
  }

  async function submitQuote(event) {
    event.preventDefault();

    errorMessage = "";

    if (!answers.selectedPackage) {
      errorMessage = text.packageMissing;
      return;
    }

    if (preferredContact === "phone" && !phone.trim()) {
      errorMessage = text.phoneRequired;
      return;
    }

    submitting = true;

    try {
      const payload = buildWebsiteConfiguratorQuotePayload({
        language,

        contact: {
          fullName,
          email,
          phone,
          company,
          currentWebsite,
          preferredContact,
          comments,
          consent,
          website,
        },

        answers,
      });

      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.success) {
        throw new Error(result?.message || text.error);
      }

      clientEmailSent = Boolean(result.clientEmailSent);
      submitted = true;
    } catch (error) {
      console.error("Website configurator submission error:", error);

      errorMessage =
        error instanceof Error && error.message ? error.message : text.error;
    } finally {
      submitting = false;
    }
  }
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if open}
  <div class="modal-layer">
    <button
      type="button"
      class="modal-backdrop"
      aria-label={text.closeModal}
      disabled={submitting}
      onclick={closeModal}
    ></button>

    <div
      class="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
      aria-describedby="quote-modal-description"
      tabindex="-1"
    >
      <button
        type="button"
        class="close-button"
        aria-label={text.closeModal}
        disabled={submitting}
        onclick={closeModal}
      >
        <span aria-hidden="true">×</span>
      </button>

      {#if submitted}
        <div class="success-state" aria-live="polite">
          <span class="success-mark" aria-hidden="true">✓</span>

          <span class="eyebrow">Zora Web Design</span>

          <h2 id="quote-modal-title">
            {text.successTitle}
          </h2>

          <p id="quote-modal-description">
            {text.successText}
          </p>

          <div class="confirmation-note">
            {clientEmailSent ? text.confirmationSent : text.confirmationNotSent}
          </div>

          <button type="button" class="primary-button" onclick={closeModal}>
            {text.close}
          </button>
        </div>
      {:else}
        <header class="modal-header">
          <span class="eyebrow">
            {text.eyebrow}
          </span>

          <h2 id="quote-modal-title">
            {text.title}
          </h2>

          <p id="quote-modal-description">
            {text.description}
          </p>

          <div class="package-summary">
            <span>
              {text.selectedPackage}
            </span>

            <strong>
              {selectedPackageLabel}
            </strong>
          </div>
        </header>

        <form onsubmit={submitQuote}>
          <div class="honeypot" aria-hidden="true">
            <label>
              Website

              <input
                type="text"
                name="website"
                tabindex="-1"
                autocomplete="off"
                bind:value={website}
              />
            </label>
          </div>

          <div class="form-grid">
            <label class="field">
              <span>{text.fullName}</span>

              <input
                bind:this={nameInput}
                type="text"
                name="fullName"
                autocomplete="name"
                maxlength="120"
                placeholder={text.fullNamePlaceholder}
                bind:value={fullName}
                required
              />
            </label>

            <label class="field">
              <span>{text.company}</span>

              <input
                type="text"
                name="company"
                autocomplete="organization"
                maxlength="160"
                placeholder={text.companyPlaceholder}
                bind:value={company}
                required
              />
            </label>

            <label class="field">
              <span>{text.email}</span>

              <input
                type="email"
                name="email"
                autocomplete="email"
                maxlength="180"
                placeholder={text.emailPlaceholder}
                bind:value={email}
                required
              />
            </label>

            <label class="field">
              <span>{text.phone}</span>

              <input
                type="tel"
                name="phone"
                autocomplete="tel"
                maxlength="80"
                placeholder={text.phonePlaceholder}
                bind:value={phone}
              />
            </label>

            <label class="field field-wide">
              <span>{text.currentWebsite}</span>

              <input
                type="url"
                name="currentWebsite"
                autocomplete="url"
                maxlength="300"
                placeholder={text.currentWebsitePlaceholder}
                bind:value={currentWebsite}
              />
            </label>
          </div>

          <fieldset class="contact-method">
            <legend>
              {text.preferredContact}
            </legend>

            <div class="contact-options">
              <label class:selected={preferredContact === "email"}>
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  bind:group={preferredContact}
                  required
                />

                <span>
                  {text.contactEmail}
                </span>
              </label>

              <label class:selected={preferredContact === "phone"}>
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  bind:group={preferredContact}
                />

                <span>
                  {text.contactPhone}
                </span>
              </label>

              <label class:selected={preferredContact === "either"}>
                <input
                  type="radio"
                  name="preferredContact"
                  value="either"
                  bind:group={preferredContact}
                />

                <span>
                  {text.contactEither}
                </span>
              </label>
            </div>
          </fieldset>

          <label class="field comments-field">
            <span>{text.comments}</span>

            <textarea
              name="comments"
              rows="5"
              maxlength="1500"
              placeholder={text.commentsPlaceholder}
              bind:value={comments}
            ></textarea>
          </label>

          <label class="consent-field">
            <input type="checkbox" bind:checked={consent} required />

            <span>{text.consent}</span>
          </label>

          <p class="privacy-note">
            {text.privacy}
          </p>

          {#if errorMessage}
            <p class="error-message" role="alert">
              {errorMessage}
            </p>
          {/if}

          <button
            type="submit"
            class="primary-button submit-button"
            disabled={submitting}
          >
            <span>
              {submitting ? text.submitting : text.submit}
            </span>

            <span aria-hidden="true">
              {submitting ? "…" : "→"}
            </span>
          </button>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  .modal-layer {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: grid;
    place-items: center;
    padding: 20px;
    box-sizing: border-box;
  }

  .modal-backdrop {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: 0;
    background: rgba(0, 0, 0, 0.82);
    backdrop-filter: blur(8px);
    cursor: default;
  }

  .modal-backdrop:disabled {
    opacity: 1;
  }

  .modal-panel {
    position: relative;
    z-index: 1;
    width: min(920px, 100%);
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    border: 1px solid #303030;
    background: #0b0b0b;
    color: #f1f1f1;
    box-shadow: 0 30px 100px rgba(0, 0, 0, 0.55);
    font-family: "DM Sans", Arial, sans-serif;
    outline: none;
  }

  .close-button {
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 2;
    width: 40px;
    height: 40px;
    padding: 0;
    display: grid;
    place-items: center;
    border: 1px solid #393939;
    border-radius: 0;
    background: #0b0b0b;
    color: #c9c9c9;
    font-family: inherit;
    font-size: 24px;
    font-weight: 300;
    cursor: pointer;
  }

  .close-button:hover:not(:disabled) {
    border-color: #d0d0d0;
    color: #ffffff;
  }

  .close-button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .modal-header {
    padding: clamp(30px, 5vw, 56px) clamp(24px, 5vw, 56px) 32px;
    border-bottom: 1px solid #292929;
  }

  .eyebrow {
    display: block;
    margin-bottom: 13px;
    color: #777777;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  h2 {
    max-width: 680px;
    margin: 0;
    color: #f1f1f1;
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 650;
    line-height: 1.06;
    letter-spacing: -0.04em;
  }

  .modal-header > p {
    max-width: 700px;
    margin: 16px 0 0;
    color: #999999;
    font-size: 14px;
    line-height: 1.7;
  }

  .package-summary {
    margin-top: 28px;
    padding: 16px 18px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 18px;
    border: 1px solid #303030;
    background: #090909;
  }

  .package-summary span {
    color: #777777;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .package-summary strong {
    color: #4f76ff;
    font-size: 17px;
    font-weight: 600;
  }

  form {
    padding: 32px clamp(24px, 5vw, 56px) clamp(32px, 5vw, 52px);
  }

  .honeypot {
    position: absolute;
    left: -10000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }

  .form-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 18px;
  }

  .field {
    display: grid;
    gap: 8px;
  }

  .field-wide {
    grid-column: 1 / -1;
  }

  .field > span,
  .contact-method legend {
    color: #8b8b8b;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
  }

  input,
  textarea {
    width: 100%;
    border: 1px solid #353535;
    border-radius: 0;
    background: #080808;
    color: #eeeeee;
    font-family: inherit;
    font-size: 14px;
    box-sizing: border-box;
    outline: none;
  }

  input {
    min-height: 52px;
    padding: 0 14px;
  }

  textarea {
    min-height: 130px;
    padding: 14px;
    resize: vertical;
    line-height: 1.55;
  }

  input:focus,
  textarea:focus {
    border-color: #d0d0d0;
  }

  input::placeholder,
  textarea::placeholder {
    color: #5f5f5f;
  }

  .contact-method {
    margin: 28px 0 0;
    padding: 0;
    border: 0;
  }

  .contact-method legend {
    margin-bottom: 10px;
  }

  .contact-options {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
  }

  .contact-options label {
    min-height: 52px;
    padding: 0 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    border: 1px solid #353535;
    background: #090909;
    color: #a5a5a5;
    font-size: 12px;
    cursor: pointer;
  }

  .contact-options label:hover {
    border-color: #d0d0d0;
  }

  .contact-options label.selected {
    border-color: #d0d0d0;
    color: #4f76ff;
  }

  .contact-options input {
    width: 16px;
    min-height: auto;
    height: 16px;
    padding: 0;
    accent-color: #0043ff;
  }

  .comments-field {
    margin-top: 28px;
  }

  .consent-field {
    margin-top: 24px;
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 11px;
    align-items: start;
    color: #9a9a9a;
    font-size: 11px;
    line-height: 1.6;
    cursor: pointer;
  }

  .consent-field input {
    width: 17px;
    min-height: auto;
    height: 17px;
    margin-top: 1px;
    padding: 0;
    accent-color: #0043ff;
  }

  .privacy-note {
    margin: 12px 0 0 29px;
    color: #666666;
    font-size: 10px;
    line-height: 1.5;
  }

  .error-message {
    margin: 20px 0 0;
    padding: 13px 14px;
    border: 1px solid #744141;
    background: #140d0d;
    color: #e1a3a3;
    font-size: 12px;
    line-height: 1.5;
  }

  .primary-button {
    min-height: 52px;
    padding: 0 20px;
    border: 1px solid #0043ff;
    border-radius: 0;
    background: #0043ff;
    color: #ffffff;
    font-family: inherit;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    cursor: pointer;
  }

  .submit-button {
    width: 100%;
    margin-top: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .primary-button:hover:not(:disabled) {
    border-color: #1b56ff;
    background: #1b56ff;
  }

  .primary-button:disabled {
    border-color: #292929;
    background: #161616;
    color: #5d5d5d;
    cursor: not-allowed;
  }

  .close-button:focus-visible,
  .primary-button:focus-visible,
  input:focus-visible,
  textarea:focus-visible,
  .contact-options label:has(input:focus-visible) {
    outline: 2px solid #0043ff;
    outline-offset: 3px;
  }

  .success-state {
    min-height: 560px;
    padding: clamp(36px, 7vw, 80px);
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
  }

  .success-mark {
    display: grid;
    width: 54px;
    height: 54px;
    margin-bottom: 30px;
    place-items: center;
    border: 1px solid #d0d0d0;
    color: #0043ff;
    font-size: 18px;
    font-weight: 700;
  }

  .success-state p {
    max-width: 650px;
    margin: 18px 0 0;
    color: #999999;
    font-size: 14px;
    line-height: 1.7;
  }

  .confirmation-note {
    max-width: 650px;
    margin: 24px 0 28px;
    padding: 15px;
    border: 1px solid #303030;
    color: #8d8d8d;
    font-size: 11px;
    line-height: 1.6;
  }

  @media (max-width: 700px) {
    .modal-layer {
      padding: 0;
      place-items: stretch;
    }

    .modal-panel {
      width: 100%;
      max-height: 100vh;
      min-height: 100vh;
      border-right: 0;
      border-left: 0;
    }

    .close-button {
      top: 12px;
      right: 12px;
    }

    .modal-header {
      padding-top: 72px;
    }

    .form-grid,
    .contact-options {
      grid-template-columns: 1fr;
    }

    .field-wide {
      grid-column: auto;
    }

    .package-summary {
      align-items: flex-start;
      flex-direction: column;
    }

    .success-state {
      min-height: 100vh;
    }
  }
</style>
