<script>
  const recaptchaSiteKey = "6LfHvOArAAAAAPpdzFVhAjxiVpSGx9MNyW-piAxz";

  /*
   * The static website and send-mail.php are both hosted on
   * https://www.zorawebdesign.com, so use the same-domain endpoint.
   */
  const mailEndpoint = "/api/send-mail";
  let {
    title = "KONTAKT",
    subtitle = "ICH FREUE MICH AUF DEINE NACHRICHT.",

    /*
     * Card 01: direct written inquiry.
     */
    formEyebrow = "NACHRICHT SENDEN",

    /*
     * Card 02: direct contact details.
     */
    contactEyebrow = "PERSÖNLICHER KONTAKT",

    phone = "+43 677 648 598 39",
    phoneLink = "tel:+4367764859839",

    email = "info@zorawebdesign.com",
    emailLink = "mailto:info@zorawebdesign.com",

    address = "HACKENGASSE 22, 1150 WIEN",

    namePlaceholder = "NAME*",
    companyPlaceholder = "UNTERNEHMEN*",
    emailPlaceholder = "E-MAIL*",
    telephonePlaceholder = "TELEFON OPTIONAL",
    messagePlaceholder = "PROJEKTBESCHREIBUNG*",

    submitText = "SENDEN",
    sendingText = "WIRD GESENDET...",

    telTitle = "TEL",
    emailTitle = "E-MAIL",
    addressTitle = "ADRESSE",

    whatsappLink = "https://wa.me/4367764859839",
    whatsappIcon = "/images/whatsapp.png",
    whatsappLabel = "WhatsApp",

    telegramLink = "https://t.me/+4367764859839",
    telegramIcon = "/images/telegram.png",
    telegramLabel = "Telegram",

    bookCallText = "GESPRÄCH BUCHEN",
    bookCallLink = "https://calendly.com/timgum-julius/get-to-know-meeting?month=2026-04",

    successTitle = "Nachricht erhalten",
    successText = "Vielen Dank für deine Kontaktaufnahme. Ich habe deine Nachricht erhalten und werde mich so schnell wie möglich bei dir melden.",

    errorTitle = "Nachricht nicht gesendet",
    errorText = "Etwas ist schiefgelaufen. Bitte versuche es erneut oder sende mir direkt eine E-Mail an",
  } = $props();

  let headerVisible = $state(false);
  let sending = $state(false);
  let formStatus = $state("");
  let serverErrorMessage = $state("");

  function loadRecaptchaScript() {
    return new Promise((resolve, reject) => {
      if (typeof window === "undefined") {
        reject(new Error("reCAPTCHA is only available in the browser."));
        return;
      }

      if (window.grecaptcha) {
        resolve();
        return;
      }

      const existingScript = document.querySelector(
        'script[src*="www.google.com/recaptcha/api.js"]',
      );

      if (existingScript) {
        existingScript.addEventListener("load", resolve, {
          once: true,
        });

        existingScript.addEventListener("error", reject, {
          once: true,
        });

        return;
      }

      const script = document.createElement("script");

      script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
      script.async = true;
      script.defer = true;

      script.onload = resolve;

      script.onerror = () => {
        reject(new Error("reCAPTCHA could not be loaded."));
      };

      document.head.appendChild(script);
    });
  }

  async function getRecaptchaToken() {
    await loadRecaptchaScript();

    if (!window.grecaptcha) {
      throw new Error("reCAPTCHA is unavailable.");
    }

    return new Promise((resolve, reject) => {
      window.grecaptcha.ready(() => {
        window.grecaptcha
          .execute(recaptchaSiteKey, {
            action: "contact_form",
          })
          .then(resolve)
          .catch(reject);
      });
    });
  }

  async function sendEmail(event) {
    event.preventDefault();

    if (sending) {
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const formEntries = Object.fromEntries(formData.entries());

    formStatus = "";
    serverErrorMessage = "";
    sending = true;

    try {
      const recaptchaToken = await getRecaptchaToken();

      const requestData = {
        ...formEntries,
        formType: "contact",
        recaptchaToken,
      };

      const response = await fetch(mailEndpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(requestData),
      });

      const textResponse = await response.text();

      console.log("CONTACT RESPONSE STATUS:", response.status);
      console.log("CONTACT RAW RESPONSE:", textResponse);

      let result;

      try {
        result = JSON.parse(textResponse);
      } catch {
        throw new Error(
          textResponse
            ? `Invalid server response: ${textResponse}`
            : "The email server returned an empty response.",
        );
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.debug ||
            result.message ||
            `Request failed with status ${response.status}`,
        );
      }

      formStatus = "success";

      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      serverErrorMessage =
        error instanceof Error ? error.message : "Unknown contact form error.";

      formStatus = "error";
    } finally {
      sending = false;
    }
  }

  function observeHeader(node) {
    if (typeof IntersectionObserver === "undefined") {
      headerVisible = true;

      return {
        destroy() {},
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          headerVisible = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.25,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    observer.observe(node);

    return {
      destroy() {
        observer.disconnect();
      },
    };
  }
</script>

<section class="contact" id="contact">
  <div class="container contact-container">
    <!-- =====================================================
         BLUE SECTION HEADER
    ====================================================== -->
    <div class="contact-header" class:visible={headerVisible} use:observeHeader>
      <div class="contact-header-inner">
        <div class="contact-header-main">
          <h2>{title}</h2>
        </div>

        {#if subtitle}
          <p class="contact-subtitle">{subtitle}</p>
        {/if}
      </div>
    </div>

    <!-- =====================================================
         FORM STATUS
    ====================================================== -->
    {#if formStatus === "success"}
      <div class="contact-success-box" role="status">
        <h3>{successTitle}</h3>
        <p>{successText}</p>
      </div>
    {/if}

    {#if formStatus === "error"}
      <div class="contact-error-box" role="alert">
        <h3>{errorTitle}</h3>

        <p>
          {errorText}
          <a href={emailLink}>{email}</a>.
        </p>

        {#if serverErrorMessage}
          <p class="contact-technical-error">
            {serverErrorMessage}
          </p>
        {/if}
      </div>
    {/if}

    <!-- =====================================================
         CONTACT GRID
    ====================================================== -->
    <div class="contact-grid">
      <!-- ===================================================
           MESSAGE FORM
      ==================================================== -->
      <form class="contact-form" onsubmit={sendEmail}>
        <div class="card-header">
          <h3 class="card-eyebrow">
            {formEyebrow}
          </h3>

          <span class="card-status" aria-hidden="true"> FORM </span>
        </div>

        <input
          type="text"
          name="website"
          class="spam-field"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
          style="display: none;"
        />

        <div class="contact-form-fields">
          <div class="contact-row">
            <input
              type="text"
              name="name"
              placeholder={namePlaceholder}
              autocomplete="name"
              required
            />

            <input
              type="text"
              name="company"
              placeholder={companyPlaceholder}
              autocomplete="organization"
              required
            />
          </div>

          <div class="contact-row">
            <input
              type="email"
              name="email"
              placeholder={emailPlaceholder}
              autocomplete="email"
              required
            />

            <input
              type="tel"
              name="telephone"
              placeholder={telephonePlaceholder}
              autocomplete="tel"
            />
          </div>

          <textarea name="message" placeholder={messagePlaceholder} required
          ></textarea>
        </div>

        <div class="form-footer">
          {#if sending}
            <div class="sending-progress" aria-hidden="true">
              <span></span>
            </div>
          {/if}

          <button type="submit" disabled={sending}>
            <span>
              {sending ? sendingText : submitText}
            </span>

            <svg
              class="cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
              />
              <path
                d="M9 7H17V15"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
                stroke-linejoin="miter"
              />
            </svg>
          </button>
        </div>
      </form>

      <!-- ===================================================
           PERSONAL CONTACT
      ==================================================== -->
      <div class="contact-info">
        <div class="card-header">
          <h3 class="card-eyebrow">
            {contactEyebrow}
          </h3>

          <span class="card-status" aria-hidden="true"> DIRECT </span>
        </div>

        <div class="contact-details">
          <div class="contact-block">
            <div class="contact-detail-content">
              <h3>{telTitle}</h3>

              <a
                href={phoneLink}
                title={`Zora Web Design telefonisch kontaktieren: ${phone}`}
              >
                {phone}
              </a>
            </div>
          </div>

          <div class="contact-block">
            <div class="contact-detail-content">
              <h3>{emailTitle}</h3>

              <a
                href={emailLink}
                title={`E-Mail an Zora Web Design senden: ${email}`}
              >
                {email}
              </a>
            </div>
          </div>

          <div class="contact-block">
            <div class="contact-detail-content">
              <h3>{addressTitle}</h3>

              <p class="contact-address">
                {address}
              </p>
            </div>
          </div>
        </div>

        <div class="contact-info-footer">
          <div class="contact-social-area">
            <span class="social-label"> DIREKT SCHREIBEN </span>

            <div class="contact-socials">
              {#if whatsappLink}
                <a
                  href={whatsappLink}
                  aria-label={whatsappLabel}
                  title="Chat auf WhatsApp starten"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={whatsappIcon}
                    alt={whatsappLabel}
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              {/if}

              {#if telegramLink}
                <a
                  href={telegramLink}
                  aria-label={telegramLabel}
                  title="Kanal oder Chat auf Telegram öffnen"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={telegramIcon}
                    alt={telegramLabel}
                    width="28"
                    height="28"
                    loading="lazy"
                    decoding="async"
                  />
                </a>
              {/if}
            </div>
          </div>

          <a
            href={bookCallLink}
            class="contact-book-link"
            target="_blank"
            rel="noopener noreferrer"
            title="Kostenloses Erstgespräch über Calendly vereinbaren"
          >
            <span>{bookCallText}</span>

            <svg
              class="cta-arrow"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
              />
              <path
                d="M9 7H17V15"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="square"
                stroke-linejoin="miter"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  /* =========================================================
     SECTION
  ========================================================= */
  .contact {
    padding: 130px 0 1px;

    background: #000000;

    color: #ffffff;

    font-family: "Space Grotesk", Arial, sans-serif;

    transition:
      background 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .contact {
    background: #ffffff;
    color: #111111;
  }

  .contact-container {
    width: min(1560px, 94%);

    margin: 0 auto;

    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  /* =========================================================
     BLUE HEADER
  ========================================================= */
  .contact-header {
    width: 100%;

    margin-bottom: 80px;

    box-sizing: border-box;

    background: #0043ff;

    color: #ffffff;

    opacity: 0;
    transform: translateY(18px);

    transition:
      opacity 0.7s ease,
      transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .contact-header.visible {
    opacity: 1;
    transform: translateY(0);
  }

  .contact-header-inner {
    width: 100%;
    min-height: 140px;

    box-sizing: border-box;

    display: grid;

    grid-template-columns:
      minmax(0, 1.15fr)
      minmax(320px, 0.85fr);

    align-items: center;

    gap: 80px;

    padding: 58px 64px;
  }

  .contact-header-main {
    min-width: 0;
  }

  .contact-header h2 {
    max-width: 720px;

    margin: 0;

    color: #ffffff;

    font-family: inherit;

    font-size: clamp(26px, 2.5vw, 40px);

    line-height: 1.12;

    letter-spacing: -0.035em;

    font-weight: 500;

    text-transform: none;
  }

  .contact-subtitle {
    max-width: 520px;

    margin: 0;
    padding: 0;

    color: rgba(255, 255, 255, 0.82);

    font-family: inherit;

    font-size: 16px;
    font-weight: 400;
    line-height: 1.65;

    letter-spacing: 0;

    text-transform: none;
  }

  :global(body.light) .contact-header {
    background: #0043ff;
    color: #ffffff;
  }

  :global(body.light) .contact-header h2 {
    color: #ffffff;
  }

  :global(body.light) .contact-subtitle {
    color: rgba(255, 255, 255, 0.82);
  }

  /* =========================================================
     STATUS MESSAGES
  ========================================================= */
  .contact-success-box,
  .contact-error-box {
    width: 100%;

    margin: -30px 0 46px;

    padding: 24px 26px;

    box-sizing: border-box;

    font-family: inherit;
  }

  .contact-success-box {
    border: 1px solid rgba(0, 67, 255, 0.65);

    background: rgba(0, 67, 255, 0.12);
  }

  .contact-error-box {
    border: 1px solid rgba(255, 107, 107, 0.65);

    background: rgba(255, 107, 107, 0.12);
  }

  .contact-success-box h3,
  .contact-error-box h3 {
    margin: 0 0 8px;

    color: #ffffff;

    font-family: inherit;

    font-size: 16px;
    font-weight: 600;
    line-height: 1.3;

    letter-spacing: 0.04em;

    text-transform: uppercase;
  }

  .contact-success-box p,
  .contact-error-box p {
    max-width: 680px;

    margin: 0;

    color: #b5b5b5;

    font-family: inherit;

    font-size: 14px;
    font-weight: 400;
    line-height: 1.65;
  }

  .contact-error-box a {
    color: inherit;
  }

  .contact-technical-error {
    margin-top: 10px !important;

    font-size: 12px !important;

    opacity: 0.7;
  }

  :global(body.light) .contact-success-box h3,
  :global(body.light) .contact-error-box h3 {
    color: #111111;
  }

  :global(body.light) .contact-success-box p,
  :global(body.light) .contact-error-box p {
    color: rgba(0, 0, 0, 0.68);
  }

  /* =========================================================
     TWO COLUMN GRID
  ========================================================= */
  .contact-grid {
    width: 100%;

    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 50px;

    align-items: stretch;
  }

  /* =========================================================
     FORM COLUMN
     ONLY THIS COLUMN HAS AN OUTER BORDER
  ========================================================= */
  .contact-form {
    position: relative;

    width: 100%;
    min-width: 0;
    height: 100%;

    padding: 32px;

    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    border: 1px solid rgba(255, 255, 255, 0.16);

    background: #050505;

    color: #ffffff;

    font-family: inherit;

    border-radius: 0;

    transition:
      background 0.3s ease,
      border-color 0.3s ease,
      color 0.3s ease;
  }

  :global(body.light) .contact-form {
    background: #ffffff;

    border-color: rgba(0, 0, 0, 0.15);

    color: #111111;
  }

  /* =========================================================
     PERSONAL CONTACT COLUMN
     NO OUTER BORDER
  ========================================================= */
  .contact-info {
    position: relative;

    width: 100%;
    min-width: 0;
    height: 100%;

    padding: 32px 0;

    box-sizing: border-box;

    display: flex;
    flex-direction: column;

    border: 0;

    background: transparent;

    color: #ffffff;

    font-family: inherit;
  }

  :global(body.light) .contact-info {
    color: #111111;
  }

  /* =========================================================
     CARD HEADERS
  ========================================================= */
  .card-header {
    min-height: 30px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    padding-bottom: 24px;

    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  :global(body.light) .card-header {
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }

  .card-eyebrow {
    margin: 0;

    color: #ffffff;

    font-family: inherit;

    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;

    letter-spacing: 0.075em;

    text-transform: uppercase;
  }

  :global(body.light) .card-eyebrow {
    color: #111111;
  }

  .card-status {
    flex-shrink: 0;

    color: #666666;

    font-family: inherit;

    font-size: 9px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.12em;

    text-transform: uppercase;
  }

  :global(body.light) .card-status {
    color: rgba(0, 0, 0, 0.42);
  }

  /* =========================================================
     FORM FIELDS
  ========================================================= */
  .spam-field {
    position: absolute;

    left: -9999px;

    opacity: 0;

    pointer-events: none;
  }

  .contact-form-fields {
    padding-top: 30px;
  }

  .contact-row {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 14px;

    margin-bottom: 14px;
  }

  .contact-form input,
  .contact-form textarea {
    width: 100%;

    box-sizing: border-box;

    border: 1px solid rgba(255, 255, 255, 0.15);

    border-radius: 0;

    outline: none;

    background: transparent;

    color: #ffffff;

    font-family: inherit;

    font-size: 13px;
    font-weight: 400;
    line-height: 1.4;

    letter-spacing: 0.025em;

    padding: 17px 16px;

    transition:
      color 0.3s ease,
      background 0.3s ease,
      border-color 0.25s ease;
  }

  .contact-form input:hover,
  .contact-form textarea:hover {
    border-color: rgba(255, 255, 255, 0.26);
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: #0043ff;
  }

  .contact-form input::placeholder,
  .contact-form textarea::placeholder {
    color: #8c8c8c;

    opacity: 1;

    font-family: inherit;

    font-size: inherit;
    font-weight: 500;

    letter-spacing: 0.055em;
  }

  :global(body.light) .contact-form input,
  :global(body.light) .contact-form textarea {
    border-color: rgba(0, 0, 0, 0.15);

    color: #111111;
  }

  :global(body.light) .contact-form input:hover,
  :global(body.light) .contact-form textarea:hover {
    border-color: rgba(0, 0, 0, 0.25);
  }

  :global(body.light) .contact-form input:focus,
  :global(body.light) .contact-form textarea:focus {
    border-color: #0043ff;
  }

  :global(body.light) .contact-form input::placeholder,
  :global(body.light) .contact-form textarea::placeholder {
    color: rgba(0, 0, 0, 0.52);
  }

  .contact-form textarea {
    min-height: 220px;

    margin-bottom: 0;

    resize: vertical;
  }

  .form-footer {
    margin-top: auto;

    padding-top: 28px;
  }

  /* =========================================================
     SENDING PROGRESS
  ========================================================= */
  .sending-progress {
    width: 100%;

    height: 2px;

    margin: 0 0 16px;

    background: rgba(255, 255, 255, 0.13);

    overflow: hidden;
  }

  :global(body.light) .sending-progress {
    background: rgba(0, 0, 0, 0.12);
  }

  .sending-progress span {
    display: block;

    width: 40%;

    height: 100%;

    background: #0043ff;

    animation: sendingBar 1s ease-in-out infinite;
  }

  @keyframes sendingBar {
    0% {
      transform: translateX(-100%);
    }

    100% {
      transform: translateX(260%);
    }
  }

  /* =========================================================
     SEND BUTTON
  ========================================================= */
  .contact-form button {
    width: 100%;

    min-height: 52px;

    margin: 0;

    padding: 0 16px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    border: 1px solid #0043ff;

    border-radius: 0;

    background: #0043ff;

    color: #ffffff;

    font-family: inherit;

    font-size: 11px;
    font-weight: 700;
    line-height: 1;

    letter-spacing: 0.09em;

    text-transform: uppercase;

    cursor: pointer;

    transition:
      background 0.25s ease,
      color 0.25s ease;
  }

  .contact-form button:hover {
    background: transparent;

    color: #ffffff;
  }

  :global(body.light) .contact-form button:hover {
    color: #0043ff;
  }

  .contact-form button:disabled {
    opacity: 0.6;

    cursor: not-allowed;
  }

  /* =========================================================
     SHARED SVG CTA ARROW
  ========================================================= */
  .cta-arrow {
    width: 20px;
    height: 20px;

    flex-shrink: 0;

    display: block;

    color: currentColor;

    transition:
      transform 0.25s ease,
      color 0.25s ease;
  }

  .contact-form button:hover .cta-arrow {
    transform: translate(2px, -2px);

    color: #0043ff;
  }

  /* =========================================================
     PERSONAL CONTACT DETAILS
  ========================================================= */
  .contact-details {
    padding-top: 30px;
  }

  .contact-block {
    width: 100%;

    margin: 0;

    padding: 20px 0;

    border-bottom: 1px solid rgba(255, 255, 255, 0.14);
  }

  .contact-block:first-child {
    padding-top: 0;
  }

  :global(body.light) .contact-block {
    border-bottom-color: rgba(0, 0, 0, 0.12);
  }

  .contact-detail-content {
    min-width: 0;
  }

  .contact-block h3 {
    margin: 0 0 7px;

    color: #777777;

    font-family: inherit;

    font-size: 10px;
    font-weight: 600;
    line-height: 1.3;

    letter-spacing: 0.09em;

    text-transform: uppercase;
  }

  .contact-block p,
  .contact-block a {
    margin: 0;

    color: #ffffff;

    font-family: inherit;

    font-size: 15px;
    font-weight: 400;
    line-height: 1.6;

    letter-spacing: 0;

    overflow-wrap: anywhere;
  }

  .contact-block a {
    text-decoration: none;

    border-bottom: 1px solid rgba(255, 255, 255, 0.34);

    padding-bottom: 2px;

    transition: border-color 0.25s ease;
  }

  .contact-block a:hover {
    border-bottom-color: #0043ff;
  }

  :global(body.light) .contact-block h3 {
    color: rgba(0, 0, 0, 0.46);
  }

  :global(body.light) .contact-block p,
  :global(body.light) .contact-block a {
    color: #111111;
  }

  :global(body.light) .contact-block a {
    border-bottom-color: rgba(0, 0, 0, 0.28);
  }

  :global(body.light) .contact-block a:hover {
    border-bottom-color: #0043ff;
  }

  /* =========================================================
     CONTACT INFO FOOTER
  ========================================================= */
  .contact-info-footer {
    margin-top: auto;

    padding-top: 30px;
  }

  /* =========================================================
     SOCIAL AREA
     LABEL ABOVE / ICONS UNDERNEATH
  ========================================================= */
  .contact-social-area {
    margin-bottom: 24px;

    display: flex;

    flex-direction: column;

    align-items: flex-start;

    gap: 13px;
  }

  .social-label {
    color: #707070;

    font-family: inherit;

    font-size: 9px;
    font-weight: 600;
    line-height: 1;

    letter-spacing: 0.11em;

    text-transform: uppercase;
  }

  :global(body.light) .social-label {
    color: rgba(0, 0, 0, 0.46);
  }

  .contact-socials {
    display: flex;

    align-items: center;

    justify-content: flex-start;

    gap: 12px;

    margin: 0;
  }

  .contact-socials a {
    width: 34px;
    height: 34px;

    display: flex;

    align-items: center;

    justify-content: center;

    border: 1px solid rgba(255, 255, 255, 0.15);

    text-decoration: none;

    transition:
      border-color 0.25s ease,
      transform 0.25s ease;
  }

  .contact-socials a:hover {
    border-color: #0043ff;

    transform: translateY(-2px);
  }

  .contact-socials img {
    display: block;

    width: 19px;
    height: 19px;

    object-fit: contain;

    transition: filter 0.3s ease;
  }

  :global(body.light) .contact-socials a {
    border-color: rgba(0, 0, 0, 0.15);
  }

  :global(body.light) .contact-socials img {
    filter: invert(1) brightness(0.12);
  }

  /* =========================================================
     BOOK CALL BUTTON
  ========================================================= */
  .contact-book-link {
    width: 100%;

    min-height: 52px;

    box-sizing: border-box;

    padding: 0 16px;

    display: flex;

    align-items: center;

    justify-content: space-between;

    gap: 20px;

    border: 1px solid #0043ff;

    background: transparent;

    color: #0043ff;

    font-family: inherit;

    font-size: 11px;
    font-weight: 700;
    line-height: 1;

    letter-spacing: 0.09em;

    text-decoration: none;

    text-transform: uppercase;

    transition:
      background 0.25s ease,
      color 0.25s ease;
  }

  .contact-book-link:hover {
    background: #0043ff;

    color: #ffffff;
  }

  .contact-book-link .cta-arrow {
    color: #0043ff;
  }

  .contact-book-link:hover .cta-arrow {
    color: #ffffff;

    transform: translate(2px, -2px);
  }

  :global(body.light) .contact-book-link {
    color: #0043ff;
  }

  :global(body.light) .contact-book-link:hover {
    color: #ffffff;
  }

  /* =========================================================
     MID DESKTOP
  ========================================================= */
  @media (min-width: 1025px) and (max-width: 1280px) {
    .contact-grid {
      gap: 42px;
    }

    .contact-row {
      grid-template-columns: 1fr;
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */
  @media (min-width: 768px) and (max-width: 1024px) {
    .contact {
      padding: 110px 0 1px;
    }

    .contact-container {
      width: min(1440px, 90%);
    }

    .contact-header {
      margin-bottom: 56px;
    }

    .contact-header-inner {
      min-height: 140px;

      grid-template-columns:
        minmax(0, 1fr)
        minmax(260px, 0.9fr);

      gap: 38px;

      padding: 42px 44px;
    }

    .contact-header h2 {
      font-size: 26px;
      line-height: 1.15;
    }

    .contact-subtitle {
      font-size: 13px;
      line-height: 1.55;
    }

    .contact-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));

      gap: 32px;

      align-items: stretch;
    }

    .contact-form {
      padding: 24px;
    }

    .contact-info {
      padding: 24px 0;
    }

    .card-eyebrow {
      font-size: 12px;
    }

    .contact-row {
      grid-template-columns: 1fr;
    }

    .contact-form input,
    .contact-form textarea {
      padding: 15px 14px;

      font-size: 12px;
    }

    .contact-form textarea {
      min-height: 190px;
    }

    .contact-block p,
    .contact-block a {
      font-size: 13px;
    }

    .contact-book-link,
    .contact-form button {
      font-size: 10px;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */
  @media (max-width: 767px) {
    .contact {
      padding: 110px 20px 10px;
    }

    .contact-container {
      width: 100%;
    }

    .contact-header {
      margin-bottom: 50px;
    }

    .contact-header-inner {
      min-height: 0;

      display: flex;

      flex-direction: column;

      align-items: flex-start;

      gap: 24px;

      padding: 38px 30px;
    }

    .contact-header-main {
      width: 100%;
    }

    .contact-header h2 {
      max-width: 100%;

      font-size: clamp(24px, 7vw, 30px);

      line-height: 1.15;
    }

    .contact-subtitle {
      max-width: 100%;

      font-size: 14px;
      line-height: 1.6;
    }

    .contact-success-box,
    .contact-error-box {
      margin: -20px 0 36px;

      padding: 20px;
    }

    .contact-grid {
      grid-template-columns: 1fr;

      gap: 48px;
    }

    .contact-form {
      height: auto;

      padding: 24px;
    }

    .contact-info {
      height: auto;

      padding: 0;
    }

    .card-eyebrow {
      font-size: 13px;
    }

    .contact-row {
      grid-template-columns: 1fr;

      gap: 12px;

      margin-bottom: 12px;
    }

    .contact-form-fields {
      padding-top: 26px;
    }

    .contact-form input,
    .contact-form textarea {
      padding: 16px 14px;

      font-size: 13px;
    }

    .contact-form textarea {
      min-height: 190px;
    }

    .contact-details {
      padding-top: 26px;
    }

    .contact-block p,
    .contact-block a {
      font-size: 14px;
    }

    .contact-social-area {
      margin-bottom: 22px;

      gap: 12px;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */
  @media (max-width: 480px) {
    .contact-header-inner {
      padding: 34px 24px;
    }

    .contact-form {
      padding: 22px;
    }

    .card-header {
      gap: 14px;

      padding-bottom: 20px;
    }

    .card-eyebrow {
      font-size: 12px;
    }
  }

  /* =========================================================
     VERY SMALL MOBILE
  ========================================================= */
  @media (max-width: 420px) {
    .contact {
      padding: 100px 20px 10px;
    }

    .contact-header {
      margin-bottom: 46px;
    }

    .contact-header-inner {
      gap: 20px;

      padding: 30px 22px;
    }

    .contact-header h2 {
      font-size: 23px;
    }

    .contact-subtitle {
      font-size: 14px;
    }

    .contact-grid {
      gap: 42px;
    }

    .contact-form {
      padding: 20px;
    }

    .card-eyebrow {
      font-size: 11px;
    }

    .card-status {
      font-size: 8px;
    }

    .contact-form input,
    .contact-form textarea {
      padding: 15px 13px;

      font-size: 12px;
    }

    .contact-block {
      padding: 17px 0;
    }

    .contact-block p,
    .contact-block a {
      font-size: 13px;
    }

    .contact-social-area {
      gap: 11px;
    }

    .contact-socials {
      gap: 10px;
    }

    .contact-socials a {
      width: 32px;
      height: 32px;
    }

    .contact-book-link,
    .contact-form button {
      min-height: 48px;

      padding: 0 14px;

      font-size: 10px;
    }

    .cta-arrow {
      width: 18px;
      height: 18px;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */
  @media (prefers-reduced-motion: reduce) {
    .contact-header {
      opacity: 1;

      transform: none;

      transition: none;
    }

    .sending-progress span,
    .cta-arrow,
    .contact-socials a {
      animation-duration: 0.01ms;

      animation-iteration-count: 1;

      transition-duration: 0.01ms;
    }
  }
</style>
