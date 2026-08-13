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
   * Honeypot.
   * Real users should never interact with this field.
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
          eyebrow: "Final step",

          title: "Where should we send your project quote?",

          description:
            "Your website plan is complete. Add your contact details and Zora Web Design will personally review the full configuration before getting back to you.",

          selectedPackage: "Selected project scope",

          contactSection: "Your contact details",

          contactSectionDescription:
            "We only need a few details to respond to your project request.",

          fullName: "Full name",
          fullNamePlaceholder: "Your full name",

          company: "Business or organisation",
          companyPlaceholder: "Business, organisation or project name",

          email: "Email address",
          emailPlaceholder: "name@example.com",

          phone: "Phone number",
          phonePlaceholder: "Your phone number",

          currentWebsite: "Current website",
          currentWebsitePlaceholder: "https://example.com",

          optional: "Optional",

          preferredContact: "How would you prefer to be contacted?",

          contactEmail: "Email",
          contactPhone: "Phone",
          contactEither: "Either is fine",

          comments: "Anything else we should know?",

          commentsHelp:
            "Optional – add any final question, deadline or important project context.",

          commentsPlaceholder:
            "Add any important information or questions about your project.",

          consent:
            "I agree that Zora Web Design may use these details to review my configuration and contact me about my website project.",

          privacy:
            "Your information is used only to review and respond to this project request.",

          submit: "Send my website plan",
          submitting: "Sending your website plan…",

          submitNote:
            "Your complete planner answers will be included automatically.",

          close: "Close",
          closeModal: "Close quote form",

          successEyebrow: "Request received",

          successTitle: "Your website plan has been sent",

          successText:
            "Thank you. Zora Web Design will personally review your project details and contact you about the next steps.",

          confirmationSent:
            "A confirmation has also been sent to your email address.",

          confirmationNotSent:
            "Your request was received successfully, but the confirmation email could not be delivered. Zora Web Design still received your complete configuration.",

          successPackage: "Project scope",

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
          eyebrow: "Letzter Schritt",

          title: "Wie dürfen wir Ihnen Ihr Projektangebot senden?",

          description:
            "Ihr Website-Plan ist vollständig. Ergänzen Sie Ihre Kontaktdaten und Zora Web Design prüft Ihre gesamte Konfiguration persönlich, bevor wir uns bei Ihnen melden.",

          selectedPackage: "Ausgewählter Projektumfang",

          contactSection: "Ihre Kontaktdaten",

          contactSectionDescription:
            "Wir benötigen nur wenige Angaben, um auf Ihre Projektanfrage antworten zu können.",

          fullName: "Vollständiger Name",
          fullNamePlaceholder: "Ihr vollständiger Name",

          company: "Unternehmen oder Organisation",
          companyPlaceholder: "Unternehmen, Organisation oder Projektname",

          email: "E-Mail-Adresse",
          emailPlaceholder: "name@beispiel.at",

          phone: "Telefonnummer",
          phonePlaceholder: "Ihre Telefonnummer",

          currentWebsite: "Aktuelle Website",
          currentWebsitePlaceholder: "https://beispiel.at",

          optional: "Optional",

          preferredContact: "Wie möchten Sie am liebsten kontaktiert werden?",

          contactEmail: "E-Mail",
          contactPhone: "Telefon",
          contactEither: "Beides ist in Ordnung",

          comments: "Möchten Sie noch etwas ergänzen?",

          commentsHelp:
            "Optional – ergänzen Sie eine letzte Frage, einen Terminwunsch oder wichtige Hinweise zum Projekt.",

          commentsPlaceholder:
            "Ergänzen Sie wichtige Informationen oder Fragen zu Ihrem Projekt.",

          consent:
            "Ich stimme zu, dass Zora Web Design diese Angaben zur Prüfung meiner Konfiguration und zur Kontaktaufnahme bezüglich meines Website-Projekts verwenden darf.",

          privacy:
            "Ihre Angaben werden ausschließlich zur Prüfung und Beantwortung dieser Projektanfrage verwendet.",

          submit: "Website-Plan senden",
          submitting: "Website-Plan wird gesendet…",

          submitNote:
            "Ihre vollständigen Antworten aus dem Website Planner werden automatisch mitgesendet.",

          close: "Schließen",
          closeModal: "Angebotsformular schließen",

          successEyebrow: "Anfrage erhalten",

          successTitle: "Ihr Website-Plan wurde gesendet",

          successText:
            "Vielen Dank. Zora Web Design prüft Ihre Projektangaben persönlich und meldet sich mit den nächsten Schritten.",

          confirmationSent:
            "Eine Bestätigung wurde zusätzlich an Ihre E-Mail-Adresse gesendet.",

          confirmationNotSent:
            "Ihre Anfrage wurde erfolgreich empfangen, die Bestätigungs-E-Mail konnte jedoch nicht zugestellt werden. Zora Web Design hat Ihre vollständige Konfiguration trotzdem erhalten.",

          successPackage: "Projektumfang",

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

  /*
   * Prevent the page behind the modal from scrolling.
   */
  $effect(() => {
    if (!browser || !open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  });

  /*
   * Focus the first form field when the modal opens.
   */
  $effect(() => {
    if (!open || submitted) {
      return;
    }

    tick().then(() => {
      nameInput?.focus();
    });
  });

  function closeModal() {
    if (submitting) {
      return;
    }

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
    <!-- =====================================================
         BACKDROP
    ====================================================== -->

    <button
      type="button"
      class="modal-backdrop"
      aria-label={text.closeModal}
      disabled={submitting}
      onclick={closeModal}
    ></button>

    <!-- =====================================================
         MODAL
    ====================================================== -->

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
        <span aria-hidden="true"> × </span>
      </button>

      <!-- ===================================================
           SUCCESS
      ==================================================== -->

      {#if submitted}
        <div class="success-state" aria-live="polite">
          <span class="success-mark" aria-hidden="true"> ✓ </span>

          <span class="eyebrow">
            {text.successEyebrow}
          </span>

          <h2 id="quote-modal-title">
            {text.successTitle}
          </h2>

          <p id="quote-modal-description">
            {text.successText}
          </p>

          <div class="success-package">
            <span>
              {text.successPackage}
            </span>

            <strong>
              {selectedPackageLabel}
            </strong>
          </div>

          <div class="confirmation-note" class:warning={!clientEmailSent}>
            <span class="confirmation-mark" aria-hidden="true">
              {clientEmailSent ? "✓" : "i"}
            </span>

            <span>
              {clientEmailSent
                ? text.confirmationSent
                : text.confirmationNotSent}
            </span>
          </div>

          <button
            type="button"
            class="primary-button success-close-button"
            onclick={closeModal}
          >
            <span>
              {text.close}
            </span>

            <span aria-hidden="true"> → </span>
          </button>
        </div>

        <!-- ===================================================
           FORM
      ==================================================== -->
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
          <!-- =================================================
               HONEYPOT
          ================================================== -->

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

          <!-- =================================================
               CONTACT DETAILS
          ================================================== -->

          <section class="form-section">
            <div class="form-section-heading">
              <span class="form-section-number"> 01 </span>

              <div>
                <h3>
                  {text.contactSection}
                </h3>

                <p>
                  {text.contactSectionDescription}
                </p>
              </div>
            </div>

            <div class="form-grid">
              <label class="field">
                <span class="field-label">
                  {text.fullName}
                </span>

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
                <span class="field-label">
                  {text.company}
                </span>

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
                <span class="field-label">
                  {text.email}
                </span>

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
                <span class="field-label-row">
                  <span>
                    {text.phone}
                  </span>

                  {#if preferredContact !== "phone"}
                    <small>
                      {text.optional}
                    </small>
                  {/if}
                </span>

                <input
                  type="tel"
                  name="phone"
                  autocomplete="tel"
                  maxlength="80"
                  placeholder={text.phonePlaceholder}
                  bind:value={phone}
                  required={preferredContact === "phone"}
                />
              </label>

              <label class="field field-wide">
                <span class="field-label-row">
                  <span>
                    {text.currentWebsite}
                  </span>

                  <small>
                    {text.optional}
                  </small>
                </span>

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
          </section>

          <!-- =================================================
               CONTACT METHOD
          ================================================== -->

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

                <span class="contact-radio">
                  <span></span>
                </span>

                <strong>
                  {text.contactEmail}
                </strong>
              </label>

              <label class:selected={preferredContact === "phone"}>
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  bind:group={preferredContact}
                />

                <span class="contact-radio">
                  <span></span>
                </span>

                <strong>
                  {text.contactPhone}
                </strong>
              </label>

              <label class:selected={preferredContact === "either"}>
                <input
                  type="radio"
                  name="preferredContact"
                  value="either"
                  bind:group={preferredContact}
                />

                <span class="contact-radio">
                  <span></span>
                </span>

                <strong>
                  {text.contactEither}
                </strong>
              </label>
            </div>
          </fieldset>

          <!-- =================================================
               COMMENTS
          ================================================== -->

          <section class="comments-section">
            <div class="comments-heading">
              <div>
                <h3>
                  {text.comments}
                </h3>

                <span class="optional-label">
                  {text.optional}
                </span>
              </div>

              <p>
                {text.commentsHelp}
              </p>
            </div>

            <textarea
              name="comments"
              rows="5"
              maxlength="1500"
              placeholder={text.commentsPlaceholder}
              bind:value={comments}
            ></textarea>
          </section>

          <!-- =================================================
               CONSENT
          ================================================== -->

          <div class="consent-section">
            <label class="consent-field">
              <input type="checkbox" bind:checked={consent} required />

              <span class="consent-checkbox" aria-hidden="true">
                {#if consent}
                  ✓
                {/if}
              </span>

              <span class="consent-copy">
                {text.consent}
              </span>
            </label>

            <p class="privacy-note">
              {text.privacy}
            </p>
          </div>

          <!-- =================================================
               ERROR
          ================================================== -->

          {#if errorMessage}
            <p class="error-message" role="alert">
              <span aria-hidden="true"> ! </span>

              <span>
                {errorMessage}
              </span>
            </p>
          {/if}

          <!-- =================================================
               SUBMIT
          ================================================== -->

          <div class="submit-area">
            <span class="submit-note">
              {text.submitNote}
            </span>

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
          </div>
        </form>
      {/if}
    </div>
  </div>
{/if}

<style>
  /* =========================================================
     MODAL LAYER
  ========================================================= */

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

    margin: 0;
    padding: 0;

    border: 0;
    border-radius: 0;

    background: rgba(0, 0, 0, 0.84);

    backdrop-filter: blur(6px);

    cursor: default;
  }

  .modal-backdrop:disabled {
    opacity: 1;
  }

  /* =========================================================
     PANEL
  ========================================================= */

  .modal-panel {
    position: relative;

    z-index: 1;

    width: min(900px, 100%);

    max-height: calc(100vh - 40px);

    overflow-y: auto;

    border: 1px solid #303030;

    background: #0b0b0b;

    color: #f1f1f1;

    box-shadow: 0 30px 100px rgba(0, 0, 0, 0.55);

    font-family: "DM Sans", Arial, sans-serif;

    outline: none;

    box-sizing: border-box;
  }

  /* =========================================================
     CLOSE
  ========================================================= */

  .close-button {
    position: absolute;

    top: 16px;
    right: 16px;

    z-index: 2;

    display: grid;

    width: 38px;
    height: 38px;

    place-items: center;

    margin: 0;
    padding: 0;

    border: 1px solid #393939;

    border-radius: 0;

    background: #0b0b0b;

    color: #bcbcbc;

    font-family: inherit;

    font-size: 21px;
    font-weight: 300;

    cursor: pointer;
  }

  .close-button:hover:not(:disabled) {
    border-color: #6d6d6d;

    color: #ffffff;
  }

  .close-button:disabled {
    opacity: 0.45;

    cursor: default;
  }

  /* =========================================================
     HEADER
  ========================================================= */

  .modal-header {
    padding: clamp(32px, 5vw, 54px);

    padding-right: clamp(72px, 8vw, 100px);

    border-bottom: 1px solid #292929;
  }

  .eyebrow {
    display: block;

    margin-bottom: 12px;

    color: #5f80ff;

    font-size: 10px;
    font-weight: 700;

    line-height: 1;

    letter-spacing: 0.1em;

    text-transform: uppercase;
  }

  h2 {
    max-width: 680px;

    margin: 0;

    color: #f1f1f1;

    font-size: clamp(29px, 4vw, 42px);

    font-weight: 600;

    line-height: 1.06;

    letter-spacing: -0.035em;

    text-wrap: balance;
  }

  .modal-header > p {
    max-width: 690px;

    margin: 14px 0 0;

    color: #929292;

    font-size: 13px;

    line-height: 1.65;
  }

  /* =========================================================
     PACKAGE
  ========================================================= */

  .package-summary {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 18px;

    margin-top: 24px;

    padding: 14px 16px;

    border: 1px solid #303030;

    border-left: 2px solid #0043ff;

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
    color: #6e8cff;

    font-size: 15px;
    font-weight: 600;
  }

  /* =========================================================
     FORM
  ========================================================= */

  form {
    padding: 30px clamp(24px, 5vw, 54px) clamp(32px, 5vw, 50px);
  }

  .honeypot {
    position: absolute;

    left: -10000px;

    width: 1px;
    height: 1px;

    overflow: hidden;
  }

  /* =========================================================
     SECTION HEADING
  ========================================================= */

  .form-section-heading {
    display: grid;

    grid-template-columns:
      24px
      minmax(0, 1fr);

    gap: 12px;

    margin-bottom: 20px;
  }

  .form-section-number {
    padding-top: 3px;

    color: #5f80ff;

    font-size: 9px;
    font-weight: 700;
  }

  .form-section-heading h3,
  .comments-heading h3 {
    margin: 0;

    color: #eeeeee;

    font-size: 16px;
    font-weight: 600;

    line-height: 1.3;
  }

  .form-section-heading p {
    max-width: 600px;

    margin: 5px 0 0;

    color: #777777;

    font-size: 10.5px;

    line-height: 1.5;
  }

  /* =========================================================
     GRID
  ========================================================= */

  .form-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 17px 12px;
  }

  .field {
    display: grid;

    gap: 7px;
  }

  .field-wide {
    grid-column: 1 / -1;
  }

  .field-label,
  .field-label-row,
  .contact-method legend {
    color: #858585;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .field-label-row {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 10px;
  }

  .field-label-row small {
    color: #5f5f5f;

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  /* =========================================================
     INPUTS
  ========================================================= */

  input,
  textarea {
    width: 100%;

    border: 1px solid #353535;

    border-radius: 0;

    background: #080808;

    color: #eeeeee;

    font-family: inherit;

    box-sizing: border-box;

    outline: none;

    transition: border-color 160ms ease;
  }

  input {
    min-height: 49px;

    padding: 0 13px;

    font-size: 12px;
  }

  textarea {
    min-height: 120px;

    padding: 13px;

    resize: vertical;

    font-size: 12px;

    line-height: 1.55;
  }

  input:focus,
  textarea:focus {
    border-color: #777777;
  }

  input::placeholder,
  textarea::placeholder {
    color: #555555;
  }

  /* =========================================================
     CONTACT METHOD
  ========================================================= */

  .contact-method {
    margin: 28px 0 0;

    padding: 26px 0 0;

    border: 0;

    border-top: 1px solid #292929;
  }

  .contact-method legend {
    margin-bottom: 12px;
  }

  .contact-options {
    display: grid;

    grid-template-columns: repeat(3, minmax(0, 1fr));

    gap: 8px;
  }

  .contact-options label {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    align-items: center;

    gap: 10px;

    min-height: 52px;

    padding: 0 13px;

    border: 1px solid #353535;

    background: #090909;

    color: #a5a5a5;

    cursor: pointer;

    box-sizing: border-box;

    transition:
      border-color 160ms ease,
      background 160ms ease;
  }

  .contact-options label:hover {
    border-color: #5d5d5d;
  }

  .contact-options label.selected {
    border-color: #0043ff;

    background: rgba(0, 67, 255, 0.05);

    color: #6e8cff;
  }

  .contact-options input {
    position: absolute;

    width: 1px;
    height: 1px;

    opacity: 0;

    pointer-events: none;
  }

  .contact-radio {
    display: grid;

    width: 17px;
    height: 17px;

    place-items: center;

    border: 1px solid #606060;

    border-radius: 50%;

    box-sizing: border-box;
  }

  .contact-radio span {
    width: 7px;
    height: 7px;

    border-radius: 50%;

    background: transparent;
  }

  .contact-options label.selected .contact-radio {
    border-color: #0043ff;
  }

  .contact-options label.selected .contact-radio span {
    background: #0043ff;
  }

  .contact-options strong {
    font-size: 10px;
    font-weight: 600;

    line-height: 1.3;
  }

  /* =========================================================
     COMMENTS
  ========================================================= */

  .comments-section {
    margin-top: 28px;

    padding-top: 26px;

    border-top: 1px solid #292929;
  }

  .comments-heading {
    margin-bottom: 13px;
  }

  .comments-heading > div {
    display: flex;

    align-items: center;

    flex-wrap: wrap;

    gap: 9px;
  }

  .comments-heading p {
    max-width: 620px;

    margin: 6px 0 0;

    color: #707070;

    font-size: 10px;

    line-height: 1.5;
  }

  .optional-label {
    color: #5f80ff;

    font-size: 8px;
    font-weight: 700;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  /* =========================================================
     CONSENT
  ========================================================= */

  .consent-section {
    margin-top: 24px;

    padding-top: 22px;

    border-top: 1px solid #292929;
  }

  .consent-field {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 11px;

    align-items: start;

    color: #929292;

    font-size: 10.5px;

    line-height: 1.55;

    cursor: pointer;
  }

  .consent-field input {
    position: absolute;

    width: 1px;
    height: 1px;

    opacity: 0;

    pointer-events: none;
  }

  .consent-checkbox {
    display: grid;

    width: 18px;
    height: 18px;

    place-items: center;

    margin-top: 1px;

    border: 1px solid #606060;

    color: #ffffff;

    font-size: 9px;
    font-weight: 700;

    box-sizing: border-box;
  }

  .consent-field input:checked + .consent-checkbox {
    border-color: #0043ff;

    background: #0043ff;
  }

  .privacy-note {
    margin: 9px 0 0 29px;

    color: #5f5f5f;

    font-size: 9px;

    line-height: 1.5;
  }

  /* =========================================================
     ERROR
  ========================================================= */

  .error-message {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 10px;

    margin: 20px 0 0;

    padding: 12px 13px;

    border: 1px solid #744141;

    background: #140d0d;

    color: #d99a9a;

    font-size: 11px;

    line-height: 1.5;
  }

  .error-message > span:first-child {
    font-weight: 700;
  }

  /* =========================================================
     SUBMIT
  ========================================================= */

  .submit-area {
    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(220px, auto);

    gap: 18px;

    align-items: center;

    margin-top: 24px;

    padding-top: 22px;

    border-top: 1px solid #292929;
  }

  .submit-note {
    max-width: 420px;

    color: #666666;

    font-size: 9px;

    line-height: 1.5;
  }

  .primary-button {
    display: inline-flex;

    min-height: 50px;

    align-items: center;
    justify-content: center;

    gap: 12px;

    padding: 0 18px;

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

    box-sizing: border-box;
  }

  .submit-button {
    min-width: 230px;

    justify-content: space-between;
  }

  .primary-button:hover:not(:disabled) {
    opacity: 0.9;
  }

  .primary-button:disabled {
    border-color: #292929;

    background: #161616;

    color: #5d5d5d;

    cursor: default;
  }

  /* =========================================================
     FOCUS
  ========================================================= */

  .close-button:focus-visible,
  .primary-button:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  input:focus-visible,
  textarea:focus-visible {
    border-color: #0043ff;
  }

  .contact-options label:has(input:focus-visible),
  .consent-field:has(input:focus-visible) .consent-checkbox {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  /* =========================================================
     SUCCESS
  ========================================================= */

  .success-state {
    display: flex;

    min-height: 540px;

    flex-direction: column;

    align-items: flex-start;
    justify-content: center;

    padding: clamp(38px, 7vw, 76px);

    box-sizing: border-box;
  }

  .success-mark {
    display: grid;

    width: 48px;
    height: 48px;

    place-items: center;

    margin-bottom: 26px;

    border: 1px solid #0043ff;

    background: #0043ff;

    color: #ffffff;

    font-size: 15px;
    font-weight: 700;
  }

  .success-state h2 {
    max-width: 660px;
  }

  .success-state > p {
    max-width: 640px;

    margin: 16px 0 0;

    color: #929292;

    font-size: 13px;

    line-height: 1.65;
  }

  .success-package {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 20px;

    width: min(520px, 100%);

    margin-top: 24px;

    padding: 13px 15px;

    border: 1px solid #303030;

    border-left: 2px solid #0043ff;

    box-sizing: border-box;
  }

  .success-package span {
    color: #707070;

    font-size: 9px;
    font-weight: 700;

    letter-spacing: 0.08em;

    text-transform: uppercase;
  }

  .success-package strong {
    color: #6e8cff;

    font-size: 13px;
    font-weight: 600;
  }

  .confirmation-note {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 10px;

    max-width: 620px;

    margin: 16px 0 26px;

    padding: 13px;

    border: 1px solid #303030;

    color: #8d8d8d;

    font-size: 10px;

    line-height: 1.55;
  }

  .confirmation-mark {
    color: #5f80ff;

    font-weight: 700;
  }

  .confirmation-note.warning .confirmation-mark {
    color: #b0b0b0;
  }

  .success-close-button {
    min-width: 150px;

    justify-content: space-between;
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 700px) {
    .modal-layer {
      padding: 0;

      place-items: stretch;
    }

    .modal-panel {
      width: 100%;

      max-height: 100dvh;
      min-height: 100dvh;

      border-top: 0;
      border-right: 0;
      border-bottom: 0;
      border-left: 0;
    }

    .close-button {
      top: 12px;
      right: 12px;
    }

    .modal-header {
      padding: 68px 20px 24px;
    }

    h2 {
      font-size: clamp(26px, 8vw, 34px);
    }

    .modal-header > p {
      font-size: 12px;
    }

    .package-summary {
      align-items: flex-start;

      flex-direction: column;

      gap: 6px;
    }

    form {
      padding: 24px 20px 36px;
    }

    .form-grid,
    .contact-options {
      grid-template-columns: 1fr;
    }

    .field-wide {
      grid-column: auto;
    }

    .contact-options label {
      min-height: 50px;
    }

    .submit-area {
      grid-template-columns: 1fr;

      gap: 12px;
    }

    .submit-note {
      max-width: none;
    }

    .submit-button {
      width: 100%;
    }

    .success-state {
      min-height: 100dvh;

      padding: 72px 22px 32px;
    }

    .success-close-button {
      width: 100%;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    .modal-header {
      padding-inline: 18px;
    }

    form {
      padding-inline: 18px;
    }

    .success-state {
      padding-inline: 18px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    input,
    textarea,
    .contact-options label {
      transition: none;
    }
  }
</style>
