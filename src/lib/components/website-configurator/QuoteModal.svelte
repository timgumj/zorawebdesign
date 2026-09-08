<script>
  import { buildWebsiteConfiguratorQuotePayload } from "$lib/data/website-configurator/build-quote-payload.js";

  let {
    open = true,
    inline = true,
    language = "de",
    answers = {},
    onSubmitted = () => {},
  } = $props();

  /* =========================================================
     CONTACT
  ========================================================= */

  let fullName = $state("");
  let email = $state("");
  let phone = $state("");
  let company = $state("");
  let currentWebsite = $state("");
  let comments = $state("");
  let consent = $state(false);

  /*
   * Email is required and therefore becomes
   * the default contact method.
   */
  const preferredContact = "email";

  /*
   * Honeypot.
   * Real users should never interact with this field.
   */
  let website = $state("");

  /* =========================================================
     SUBMISSION
  ========================================================= */

  let submitting = $state(false);
  let submitted = $state(false);
  let errorMessage = $state("");

  /* =========================================================
     TEXT
  ========================================================= */

  const text = $derived(
    language === "en"
      ? {
          formTitle: "Contact details",

          formDescription: "Only your name and email are required.",

          fullName: "Full name",
          fullNamePlaceholder: "Your full name",

          email: "Email address",
          emailPlaceholder: "name@example.com",

          company: "Business or organisation",
          companyPlaceholder: "Business, organisation or project name",

          phone: "Phone number",
          phonePlaceholder: "Your phone number",

          currentWebsite: "Current website",
          currentWebsitePlaceholder: "https://example.com",

          optional: "Optional",
          required: "Required",

          comments: "Anything else I should know?",

          commentsPlaceholder:
            "Deadline, questions or other useful project information.",

          consent:
            "I agree that Zora Web Design may use these details to review my website configuration and contact me about my project.",

          privacy: "Your information is used only for this project request.",

          submit: "Send my website plan",

          submitting: "Sending website plan…",

          submitNote:
            "Your complete planner answers are included automatically.",

          security: "Your details are not shared with third parties.",

          error: "Your website plan could not be sent. Please try again.",

          packageMissing:
            "A recommended project scope could not be determined. Please review your planner answers.",
        }
      : {
          formTitle: "Kontaktdaten",

          formDescription:
            "Nur Ihr Name und Ihre E-Mail-Adresse sind erforderlich.",

          fullName: "Vollständiger Name",
          fullNamePlaceholder: "Ihr vollständiger Name",

          email: "E-Mail-Adresse",
          emailPlaceholder: "name@beispiel.at",

          company: "Unternehmen oder Organisation",
          companyPlaceholder: "Unternehmen, Organisation oder Projektname",

          phone: "Telefonnummer",
          phonePlaceholder: "Ihre Telefonnummer",

          currentWebsite: "Aktuelle Website",
          currentWebsitePlaceholder: "https://beispiel.at",

          optional: "Optional",
          required: "Erforderlich",

          comments: "Möchten Sie noch etwas ergänzen?",

          commentsPlaceholder:
            "Terminwunsch, Fragen oder weitere wichtige Informationen.",

          consent:
            "Ich stimme zu, dass Zora Web Design diese Angaben zur Prüfung meiner Website-Konfiguration und zur Kontaktaufnahme bezüglich meines Projekts verwenden darf.",

          privacy:
            "Ihre Angaben werden nur für diese Projektanfrage verwendet.",

          submit: "Website-Plan senden",

          submitting: "Website-Plan wird gesendet…",

          submitNote:
            "Ihre vollständigen Planner-Antworten werden automatisch mitgesendet.",

          security: "Ihre Angaben werden nicht an Dritte weitergegeben.",

          error:
            "Ihre Website-Planung konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",

          packageMissing:
            "Es konnte kein Projektumfang ermittelt werden. Bitte prüfen Sie Ihre Planner-Antworten.",
        },
  );

  /* =========================================================
     ENDPOINT
  ========================================================= */

  const endpoint = "/api/send-mail";

  /* =========================================================
     SUBMIT
  ========================================================= */

  async function submitQuote(event) {
    event.preventDefault();

    errorMessage = "";

    if (!answers.selectedPackage) {
      errorMessage = text.packageMissing;

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

      submitted = true;

      onSubmitted({
        fullName,
        email,

        clientEmailSent: Boolean(result.clientEmailSent),

        selectedPackage: answers.selectedPackage,
      });
    } catch (error) {
      console.error("Website configurator submission error:", error);

      errorMessage =
        error instanceof Error && error.message ? error.message : text.error;
    } finally {
      submitting = false;
    }
  }
</script>

{#if open && !submitted}
  <div class="quote-form" class:inline-form={inline}>
    <form onsubmit={submitQuote}>
      <!-- ===================================================
           HONEYPOT
      ==================================================== -->

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

      <!-- ===================================================
           SMALL FORM INTRO
      ==================================================== -->

      <header class="form-intro">
        <div>
          <span class="form-kicker">
            {text.formTitle}
          </span>

          <p>
            {text.formDescription}
          </p>
        </div>

        <span class="required-note">
          <span aria-hidden="true">*</span>

          {language === "en" ? "Required fields" : "Pflichtfelder"}
        </span>
      </header>

      <!-- ===================================================
           MAIN FIELDS
      ==================================================== -->

      <div class="form-grid">
        <!-- NAME -->

        <label class="field">
          <span class="field-label-row">
            <span>
              {text.fullName}
            </span>

            <small class="required-label">
              {text.required}
            </small>
          </span>

          <input
            type="text"
            name="fullName"
            autocomplete="name"
            maxlength="120"
            placeholder={text.fullNamePlaceholder}
            bind:value={fullName}
            required
          />
        </label>

        <!-- EMAIL -->

        <label class="field">
          <span class="field-label-row">
            <span>
              {text.email}
            </span>

            <small class="required-label">
              {text.required}
            </small>
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

        <!-- COMPANY -->

        <label class="field">
          <span class="field-label-row">
            <span>
              {text.company}
            </span>

            <small>
              {text.optional}
            </small>
          </span>

          <input
            type="text"
            name="company"
            autocomplete="organization"
            maxlength="160"
            placeholder={text.companyPlaceholder}
            bind:value={company}
          />
        </label>

        <!-- PHONE -->

        <label class="field">
          <span class="field-label-row">
            <span>
              {text.phone}
            </span>

            <small>
              {text.optional}
            </small>
          </span>

          <input
            type="tel"
            name="phone"
            autocomplete="tel"
            maxlength="80"
            placeholder={text.phonePlaceholder}
            bind:value={phone}
          />
        </label>

        <!-- CURRENT WEBSITE -->

        <label class="field">
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

        <!-- COMMENTS -->

        <label class="field">
          <span class="field-label-row">
            <span>
              {text.comments}
            </span>

            <small>
              {text.optional}
            </small>
          </span>

          <textarea
            name="comments"
            rows="2"
            maxlength="1500"
            placeholder={text.commentsPlaceholder}
            bind:value={comments}
          ></textarea>
        </label>
      </div>

      <!-- ===================================================
           CONSENT
      ==================================================== -->

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

        <p class="form-privacy-note">
          {text.privacy}
        </p>
      </div>

      <!-- ===================================================
           ERROR
      ==================================================== -->

      {#if errorMessage}
        <p class="error-message" role="alert">
          <span aria-hidden="true"> ! </span>

          <span>
            {errorMessage}
          </span>
        </p>
      {/if}

      <!-- ===================================================
           SUBMIT
      ==================================================== -->

      <div class="submit-area">
        <div class="submit-copy">
          <span class="submit-note">
            {text.submitNote}
          </span>

          <span class="submit-security">
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <rect x="5" y="8" width="10" height="8" />

              <path d="M7.5 8V6.5a2.5 2.5 0 0 1 5 0V8" />
            </svg>

            {text.security}
          </span>
        </div>

        <button type="submit" class="submit-button" disabled={submitting}>
          <span>
            {submitting ? text.submitting : text.submit}
          </span>

          <span aria-hidden="true">
            {submitting ? "…" : "→"}
          </span>
        </button>
      </div>
    </form>
  </div>
{/if}

<style>
  /* =========================================================
     FORM WRAPPER
  ========================================================= */

  .quote-form {
    width: 100%;

    margin: 0;

    border: 1px solid #303030;

    background: #090909;

    color: #f1f1f1;

    font-family: "DM Sans", Arial, sans-serif;

    box-sizing: border-box;
  }

  .inline-form {
    position: relative;
  }

  /* =========================================================
     FORM
  ========================================================= */

  form {
    padding: 20px;
  }

  .honeypot {
    position: absolute;

    left: -10000px;

    width: 1px;
    height: 1px;

    overflow: hidden;
  }

  /* =========================================================
     SMALL INTRO
  ========================================================= */

  .form-intro {
    display: flex;

    align-items: flex-end;
    justify-content: space-between;

    gap: 20px;

    margin-bottom: 18px;

    padding-bottom: 15px;

    border-bottom: 1px solid #292929;
  }

  .form-kicker {
    display: block;

    color: #0043ff;

    font-size: 12px;
    font-weight: 700;

    line-height: 1.3;

    letter-spacing: 0.07em;

    text-transform: uppercase;
  }

  .form-intro p {
    margin: 5px 0 0;

    color: #8d8d8d;

    font-size: 12px;

    line-height: 1.5;
  }

  .required-note {
    flex: 0 0 auto;

    color: #777777;

    font-size: 12px;
    font-weight: 600;

    line-height: 1.4;
  }

  .required-note > span {
    color: #0043ff;
  }

  /* =========================================================
     FIELD GRID
  ========================================================= */

  .form-grid {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 15px 12px;
  }

  .field {
    display: grid;

    min-width: 0;

    gap: 7px;

    align-content: start;
  }

  /* =========================================================
     LABELS
  ========================================================= */

  .field-label-row {
    display: flex;

    align-items: center;
    justify-content: space-between;

    gap: 10px;

    color: #929292;

    font-size: 12px;
    font-weight: 700;

    line-height: 1.35;

    letter-spacing: 0.04em;

    text-transform: uppercase;
  }

  .field-label-row small {
    color: #646464;

    font-size: 12px;
    font-weight: 600;

    line-height: 1.3;

    letter-spacing: 0.03em;

    text-transform: none;
  }

  .field-label-row small.required-label {
    color: #0043ff;
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

    font-size: 12px;

    box-sizing: border-box;

    outline: none;

    transition: border-color 160ms ease;
  }

  input {
    min-height: 44px;

    padding: 0 12px;
  }

  textarea {
    min-height: 76px;

    padding: 11px 12px;

    resize: vertical;

    line-height: 1.5;
  }

  input:focus,
  textarea:focus {
    border-color: #0043ff;
  }

  input::placeholder,
  textarea::placeholder {
    color: #555555;
  }

  /* =========================================================
     CONSENT
  ========================================================= */

  .consent-section {
    margin-top: 18px;

    padding-top: 17px;

    border-top: 1px solid #292929;
  }

  .consent-field {
    display: grid;

    grid-template-columns:
      auto
      minmax(0, 1fr);

    gap: 10px;

    align-items: start;

    color: #919191;

    font-size: 12px;

    line-height: 1.5;

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

    width: 19px;
    height: 19px;

    place-items: center;

    margin-top: 1px;

    border: 1px solid #606060;

    color: #ffffff;

    font-size: 12px;
    font-weight: 700;

    box-sizing: border-box;
  }

  .consent-field input:checked + .consent-checkbox {
    border-color: #0043ff;

    background: #0043ff;
  }

  .form-privacy-note {
    margin: 7px 0 0 29px;

    color: #696969;

    font-size: 14px;

    line-height: 1.45;
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

    margin: 17px 0 0;

    padding: 11px 12px;

    border: 1px solid #744141;

    background: #140d0d;

    color: #d99a9a;

    font-size: 12px;

    line-height: 1.5;
  }

  .error-message > span:first-child {
    font-weight: 700;
  }

  /* =========================================================
     SUBMIT AREA
  ========================================================= */

  .submit-area {
    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(210px, auto);

    gap: 20px;

    align-items: center;

    margin-top: 18px;

    padding-top: 17px;

    border-top: 1px solid #292929;
  }

  .submit-copy {
    display: grid;

    gap: 5px;
  }

  .submit-note {
    max-width: 480px;

    color: #777777;

    font-size: 12px;

    line-height: 1.45;
  }

  .submit-security {
    display: flex;

    align-items: center;

    gap: 6px;

    color: #626262;

    font-size: 14px;

    line-height: 1.4;
  }

  .submit-security svg {
    width: 14px;
    height: 14px;

    flex: 0 0 auto;

    fill: none;

    stroke: #0043ff;

    stroke-width: 1.3;

    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* =========================================================
     SUBMIT BUTTON
  ========================================================= */

  .submit-button {
    display: inline-flex;

    min-width: 215px;
    min-height: 46px;

    align-items: center;
    justify-content: space-between;

    gap: 16px;

    padding: 0 15px;

    border: 1px solid #0043ff;

    border-radius: 0;

    background: #0043ff;

    color: #ffffff;

    font-family: inherit;

    font-size: 12px;
    font-weight: 700;

    line-height: 1.2;

    letter-spacing: 0.05em;

    text-transform: uppercase;

    cursor: pointer;

    box-sizing: border-box;

    transition: opacity 160ms ease;
  }

  .submit-button:hover:not(:disabled) {
    opacity: 0.86;
  }

  .submit-button:disabled {
    border-color: #292929;

    background: #161616;

    color: #5d5d5d;

    cursor: default;
  }

  /* =========================================================
     FOCUS
  ========================================================= */

  .submit-button:focus-visible {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  input:focus-visible,
  textarea:focus-visible {
    border-color: #0043ff;
  }

  .consent-field:has(input:focus-visible) .consent-checkbox {
    outline: 2px solid #0043ff;

    outline-offset: 3px;
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1000px) {
    form {
      padding: 18px;
    }

    .form-grid {
      gap: 14px 10px;
    }

    input {
      min-height: 43px;
    }

    .submit-area {
      grid-template-columns:
        minmax(0, 1fr)
        minmax(190px, auto);
    }

    .submit-button {
      min-width: 195px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 700px) {
    form {
      padding: 17px;
    }

    .form-intro {
      align-items: flex-start;

      flex-direction: column;

      gap: 7px;

      margin-bottom: 17px;
    }

    .form-grid {
      grid-template-columns: 1fr;

      gap: 15px;
    }

    input {
      min-height: 48px;

      /*
       * 16px prevents mobile browsers such as
       * Safari from zooming into the field.
       */
      font-size: 16px;
    }

    textarea {
      min-height: 92px;

      font-size: 16px;
    }

    .submit-area {
      grid-template-columns: 1fr;

      gap: 13px;
    }

    .submit-button {
      width: 100%;
      min-height: 50px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 430px) {
    form {
      padding-inline: 15px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    input,
    textarea,
    .submit-button {
      transition: none;
    }
  }
</style>
