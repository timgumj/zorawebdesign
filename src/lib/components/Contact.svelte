<script>
  const recaptchaSiteKey = "6LfHvOArAAAAAPpdzFVhAjxiVpSGx9MNyW-piAxz";

  /*
   * The static website and send-mail.php are both hosted on
   * https://zorawebdesign.com, so use the same-domain endpoint.
   */
  const mailEndpoint = import.meta.env.DEV
    ? "http://localhost:8080/send-mail.php"
    : "/send-mail.php";

  let {
    title = "KONTAKT",
    subtitle = "ICH FREUE MICH AUF DEINE NACHRICHT.",

    /*
     * Card 01: guided project planner.
     * The English and German pages can pass their own translations.
     */
    configuratorEyebrow = "PROJEKTPLANER",
    configuratorBadge = "EMPFOHLEN",
    configuratorText = "Du planst eine neue Website, möchtest deine bestehende Website erneuern oder sie um weitere Inhalte und Funktionen erweitern? Nutze den kostenlosen Projektplaner. Er zeigt dir verständlich, was du für dein Projekt brauchst.",
    configuratorBenefits = [
      "DEINE AUSGANGSLAGE UND ZIELE KLÄREN",
      "SEITEN UND FUNKTIONEN AUSWÄHLEN",
      "PASSENDE EMPFEHLUNG UND ANGEBOT ERHALTEN",
    ],
    configuratorMeta = "KOSTENLOS · CA. 5 MINUTEN",
    configuratorButtonText = "PROJEKTPLANER STARTEN",
    configuratorLink = "/website-konfigurator/",

    /*
     * Card 02: direct written inquiry.
     */
    formEyebrow = "NACHRICHT SENDEN",

    /*
     * Card 03: direct contact details.
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

  let lineVisible = $state(false);
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

  function observeLine(node) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          lineVisible = true;
          observer.disconnect();
        }
      },
      {
        threshold: 0.35,
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
    <div class="contact-header" use:observeLine>
      <div class="contact-header-row">
        <div class="contact-title-area">
          <div class="contact-title-row">
            <span
              class="section-pulse"
              class:visible={lineVisible}
              aria-hidden="true"
            ></span>

            <h2>{title}</h2>
          </div>

          <div class="contact-line" class:visible={lineVisible}></div>
        </div>

        {#if subtitle}
          <p>{subtitle}</p>
        {/if}
      </div>
    </div>

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

    <div class="contact-grid">
      <!-- Card 01 -->
      <article class="configurator-card">
        <div class="card-header">
          <h3 class="card-eyebrow">
            {configuratorEyebrow}
          </h3>

          <div class="card-header-meta">
            {#if configuratorBadge}
              <span class="recommended-badge">
                {configuratorBadge}
              </span>
            {/if}

            <span class="card-number" aria-hidden="true"> 01 </span>
          </div>
        </div>

        <div class="configurator-card-content">
          <p>{configuratorText}</p>

          {#if configuratorBenefits?.length}
            <ul class="configurator-benefits">
              {#each configuratorBenefits as benefit}
                <li>{benefit}</li>
              {/each}
            </ul>
          {/if}
        </div>

        <div class="configurator-card-footer">
          {#if configuratorMeta}
            <span class="configurator-meta">
              {configuratorMeta}
            </span>
          {/if}

          <a
            href={configuratorLink}
            class="configurator-link"
            title={configuratorButtonText}
          >
            <span>{configuratorButtonText}</span>

            <span class="configurator-arrow" aria-hidden="true"> → </span>
          </a>
        </div>
      </article>

      <!-- Card 02 -->
      <form class="contact-form" onsubmit={sendEmail}>
        <div class="card-header">
          <h3 class="card-eyebrow">
            {formEyebrow}
          </h3>

          <span class="card-number" aria-hidden="true"> 02 </span>
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

        <div class="contact-row form-fields-start">
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

        {#if sending}
          <div class="sending-progress" aria-hidden="true">
            <span></span>
          </div>
        {/if}

        <button type="submit" disabled={sending}>
          {sending ? sendingText : submitText}
        </button>
      </form>

      <!-- Card 03 -->
      <div class="contact-info">
        <div class="card-header">
          <h3 class="card-eyebrow">
            {contactEyebrow}
          </h3>

          <span class="card-number" aria-hidden="true"> 03 </span>
        </div>

        <div class="contact-block contact-block-first">
          <h3>{telTitle}</h3>

          <a
            href={phoneLink}
            title={`Zora Web Design telefonisch kontaktieren: ${phone}`}
          >
            {phone}
          </a>
        </div>

        <div class="contact-block">
          <h3>{emailTitle}</h3>

          <a
            href={emailLink}
            title={`E-Mail an Zora Web Design senden: ${email}`}
          >
            {email}
          </a>
        </div>

        <div class="contact-block">
          <h3>{addressTitle}</h3>

          <p class="contact-address">
            {address}
          </p>
        </div>

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

        <a
          href={bookCallLink}
          class="contact-book-link"
          target="_blank"
          rel="noopener noreferrer"
          title="Kostenloses Erstgespräch über Calendly vereinbaren"
        >
          {bookCallText}
        </a>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    padding: 150px 0 0;
    background: #000000;
    color: #ffffff;
    font-family: "DM Sans", Arial, sans-serif;
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

  .contact-header {
    width: 100%;
    margin-bottom: 70px;
  }

  .contact-header-row {
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
    gap: 24px;
  }

  .contact-title-area {
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: visible;
  }

  .contact-title-row {
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    gap: 20px;
  }

  .section-pulse {
    position: relative;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: #0043ff;
    flex-shrink: 0;
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }

  .section-pulse.visible {
    opacity: 1;
    transform: scale(1);
  }

  .section-pulse.visible::before,
  .section-pulse.visible::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: rgba(0, 67, 255, 0.42);
    animation: sectionPulse 1.8s ease-out infinite;
  }

  .section-pulse.visible::after {
    animation-delay: 0.9s;
  }

  @keyframes sectionPulse {
    0% {
      transform: scale(1);
      opacity: 0.7;
    }

    100% {
      transform: scale(3.2);
      opacity: 0;
    }
  }

  .contact-header h2 {
    margin: 0;
    color: #ffffff;
    font-size: clamp(18px, 2vw, 28px);
    line-height: 1.1;
    letter-spacing: 0.08em;
    font-weight: 700;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  :global(body.light) .contact-header h2 {
    color: #111111;
  }

  .contact-line {
    width: 100%;
    height: 2px;
    background: #ffffff;
    transform-origin: left center;
    transform: scaleX(0.01);
    transition:
      transform 1s ease-out,
      background 0.3s ease;
  }

  .contact-line.visible {
    transform: scaleX(1);
  }

  :global(body.light) .contact-line {
    background: #111111;
  }

  .contact-header p {
    margin: 0;
    max-width: 520px;
    color: #bfbfbf;
    font-size: 16px;
    line-height: 1.4;
    letter-spacing: 0.04em;
    text-align: left;
    text-transform: none;
    display: flex;
    align-items: center;
    border-left: 2px solid #0043ff;
    padding-left: 20px;
    transform: translateY(-2px);
    transition:
      color 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .contact-header p {
    color: rgba(0, 0, 0, 0.68);
  }

  .contact-success-box,
  .contact-error-box {
    width: 100%;
    margin: -30px 0 46px;
    padding: 24px 26px;
    box-sizing: border-box;
    transition:
      background 0.3s ease,
      border-color 0.3s ease;
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
    font-size: 18px;
    line-height: 1.2;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: color 0.3s ease;
  }

  :global(body.light) .contact-success-box h3,
  :global(body.light) .contact-error-box h3 {
    color: #111111;
  }

  .contact-success-box p,
  .contact-error-box p {
    margin: 0;
    max-width: 620px;
    color: #d9d9d9;
    font-size: 15px;
    line-height: 1.55;
    transition: color 0.3s ease;
  }

  :global(body.light) .contact-success-box p,
  :global(body.light) .contact-error-box p {
    color: rgba(0, 0, 0, 0.72);
  }

  .contact-grid {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(18px, 3.5vw, 30px);
    align-items: stretch;
  }

  .configurator-card,
  .contact-form,
  .contact-info {
    min-width: 0;
    height: 100%;
    padding: 28px;
    border: 1px solid #2a2a2a;
    background: #050505;
    box-sizing: border-box;
  }

  .contact-form,
  .contact-info {
    display: flex;
    flex-direction: column;
  }

  :global(body.light) .configurator-card,
  :global(body.light) .contact-form,
  :global(body.light) .contact-info {
    border-color: rgba(0, 0, 0, 0.16);
    background: #ffffff;
  }

  .configurator-card {
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  .configurator-card::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 2px;
    background: #0043ff;
  }

  .card-header {
    min-height: 28px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 18px;
  }

  .card-eyebrow {
    margin: 0;
    color: #0043ff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.35;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  :global(body.light) .card-eyebrow {
    color: #0043ff;
  }

  .card-header-meta {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    flex-wrap: wrap;
  }

  .recommended-badge {
    display: inline-flex;
    align-items: center;
    min-height: 28px;
    padding: 0 10px;
    border: 1px solid rgba(0, 67, 255, 0.7);
    color: #0043ff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }

  .card-number {
    color: #0043ff;
    font-size: 14px;
    font-weight: 600;
    line-height: 1;
    letter-spacing: 0.08em;
  }

  .configurator-card-content > p {
    margin: 30px 0 0;
    color: #a7a7a7;
    font-size: 14px;
    line-height: 1.7;
    transition: color 0.3s ease;
  }

  :global(body.light) .configurator-card-content > p {
    color: rgba(0, 0, 0, 0.66);
  }

  .configurator-benefits {
    margin: 30px 0 0;
    padding: 0;
    list-style: none;
    border-top: 1px solid #292929;
  }

  :global(body.light) .configurator-benefits {
    border-top-color: rgba(0, 0, 0, 0.12);
  }

  .configurator-benefits li {
    position: relative;
    margin: 0;
    padding: 14px 0 14px 18px;
    border-bottom: 1px solid #292929;
    color: #d1d1d1;
    font-size: 14px;
    font-weight: 500;
    line-height: 1.45;
    letter-spacing: 0.065em;
    text-transform: uppercase;
    transition:
      color 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .configurator-benefits li {
    border-bottom-color: rgba(0, 0, 0, 0.12);
    color: rgba(0, 0, 0, 0.76);
  }

  .configurator-benefits li::before {
    content: "";
    position: absolute;
    top: 20px;
    left: 0;
    width: 6px;
    height: 6px;
    background: #0043ff;
  }

  .configurator-card-footer {
    margin-top: auto;
    padding-top: 34px;
  }

  .configurator-meta {
    display: block;
    margin-bottom: 14px;
    color: #707070;
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    letter-spacing: 0.09em;
    text-transform: uppercase;
  }

  :global(body.light) .configurator-meta {
    color: rgba(0, 0, 0, 0.48);
  }

  .configurator-link {
    min-height: 52px;
    padding: 0 17px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    border: 1px solid #0043ff;

    color: #ffffff;
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.08em;
    text-decoration: none;
    text-transform: uppercase;
    transition:
      background 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
  }

  .configurator-link:hover {
    background: transparent;
    color: #ffffff;
  }

  :global(body.light) .configurator-link:hover {
    color: #0043ff;
  }

  .configurator-arrow {
    font-size: 18px;
    font-weight: 400;
    color: #0043ff;
    transition: transform 0.25s ease;
  }

  .configurator-link:hover .configurator-arrow {
    transform: translateX(5px);
  }

  .contact-form {
    width: 100%;
  }

  .spam-field {
    position: absolute;
    left: -9999px;
    opacity: 0;
    pointer-events: none;
  }

  .form-fields-start {
    margin-top: 30px;
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
    background: transparent;
    border: 1px solid #2a2a2a;
    color: #ffffff;
    font-size: 14px;
    padding: 18px 16px;
    font-family: inherit;
    outline: none;
    box-sizing: border-box;
    transition:
      color 0.3s ease,
      background 0.3s ease,
      border-color 0.3s ease;
  }

  :global(body.light) .contact-form input,
  :global(body.light) .contact-form textarea {
    background: #ffffff;
    border-color: rgba(0, 0, 0, 0.16);
    color: #111111;
  }

  .contact-form input:focus,
  .contact-form textarea:focus {
    border-color: #0043ff;
  }

  .contact-form input::placeholder,
  .contact-form textarea::placeholder {
    color: #ffffff;
    opacity: 1;
    transition: color 0.3s ease;
  }

  :global(body.light) .contact-form input::placeholder,
  :global(body.light) .contact-form textarea::placeholder {
    color: rgba(0, 0, 0, 0.58);
  }

  .contact-form textarea {
    min-height: 220px;
    resize: vertical;
    margin-bottom: 28px;
  }

  .sending-progress {
    width: 100%;
    height: 2px;
    background: #2a2a2a;
    overflow: hidden;
    margin: 0 0 18px;
    transition: background 0.3s ease;
  }

  :global(body.light) .sending-progress {
    background: rgba(0, 0, 0, 0.14);
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

  .contact-form button {
    margin-top: auto;
    align-self: flex-start;
    background: #0043ff;
    color: #ffffff;
    border: 1px solid #0043ff;
    padding: 14px 18px;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 0.12em;
    cursor: pointer;
    font-family: inherit;
    transition:
      background 0.25s ease,
      border-color 0.25s ease,
      color 0.25s ease,
      transform 0.25s ease;
  }

  .contact-form button:hover {
    background: transparent;
    border-color: #0043ff;
    transform: translateY(-2px);
  }

  :global(body.light) .contact-form button:hover {
    color: #0043ff;
  }

  .contact-form button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  .contact-info {
    padding-top: 28px;
  }

  .contact-block-first {
    margin-top: 30px;
  }

  .contact-block {
    margin-bottom: 28px;
  }

  .contact-block h3 {
    margin: 0 0 10px;
    font-size: 14px;
    font-weight: 500;
    color: #bfbfbf;
    letter-spacing: 0.03em;
    transition: color 0.3s ease;
  }

  :global(body.light) .contact-block h3 {
    color: rgba(0, 0, 0, 0.58);
  }

  .contact-block p,
  .contact-block a {
    margin: 0;
    color: #ffffff;
    font-size: 16px;
    line-height: 1.6;
    text-decoration: underline;
    overflow-wrap: anywhere;
    transition: color 0.3s ease;
  }

  :global(body.light) .contact-block p,
  :global(body.light) .contact-block a {
    color: #111111;
  }

  .contact-block p {
    text-decoration: none;
  }

  .contact-address {
    font-weight: 400;
  }

  .contact-socials {
    display: flex;
    gap: 22px;
    margin: 18px 0 28px;
  }

  .contact-socials a {
    color: #bfbfbf;
    text-decoration: none;
    font-size: 28px;
    line-height: 1;
  }

  .contact-socials img {
    transition: filter 0.3s ease;
  }

  :global(body.light) .contact-socials img {
    filter: invert(1) brightness(0.12);
  }

  .contact-book-link {
    margin-top: auto;
    align-self: flex-start;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #ffffff;
    text-decoration: none;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.04em;
    border-bottom: 2px solid #0043ff;
    padding-bottom: 6px;
  }

  .contact-book-link::after {
    content: "↗";
    color: #0043ff;
    font-size: 16px;
    line-height: 1;
  }

  :global(body.light) .contact-book-link {
    color: #111111;
    border-bottom-color: #0043ff;
  }

  :global(body.light) .contact-book-link::after {
    color: #0043ff;
  }

  @media (min-width: 1025px) and (max-width: 1280px) {
    .contact-grid {
      gap: 28px;
    }

    .contact-row {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 1024px) {
    .contact-header {
      margin-bottom: 50px;
    }

    .contact-container {
      width: min(1440px, 90%);
    }

    .contact-header-row {
      gap: 20px;
      align-items: end;
    }

    .contact-title-area {
      gap: 5px;
    }

    .contact-title-row {
      gap: 18px;
    }

    .contact-header p {
      transform: translateY(10px);
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .configurator-card,
    .contact-form,
    .contact-info {
      height: auto;
    }

    .contact-row {
      grid-template-columns: 1fr;
    }

    .card-eyebrow {
      font-size: 13px;
    }

    .recommended-badge,
    .card-number,
    .configurator-benefits li,
    .configurator-meta,
    .configurator-link {
      font-size: 13px;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    .contact-header {
      margin-bottom: 50px;
    }

    .contact-header-row {
      width: 100%;
      display: grid;
      grid-template-columns:
        minmax(0, 0.8fr)
        minmax(330px, 1.2fr);
      align-items: end;
      gap: 28px;
    }

    .contact-title-area {
      min-width: 0;
      gap: 20px;
    }

    .contact-title-row {
      min-width: 0;
      gap: 14px;
    }

    .contact-header h2 {
      font-size: 15px;
      line-height: 1.1;
      white-space: nowrap;
    }

    .contact-line {
      width: 100%;
    }

    .contact-header p {
      max-width: 520px;
      font-size: 13px;
      line-height: 1.45;
      padding-left: 16px;
      transform: translateY(-2px);
    }

    .section-pulse {
      width: 28px;
      height: 28px;
    }

    .contact-grid {
      grid-template-columns: 1fr;
      gap: 40px;
    }

    .contact-row {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 767px) {
    .contact {
      padding: 110px 20px 0;
    }

    .contact-header-row {
      grid-template-columns: 1fr;
      align-items: stretch;
      gap: 20px;
    }

    .contact-title-area {
      gap: 14px;
    }

    .contact-title-row {
      gap: 12px;
    }

    .contact-header p {
      max-width: 100%;
      font-size: 14px;
      line-height: 1.6;
      padding: 16px 0 16px 18px;
      transform: none;
    }

    .section-pulse {
      width: 22px;
      height: 22px;
    }

    .contact-success-box,
    .contact-error-box {
      margin: -24px 0 36px;
      padding: 20px;
    }

    .contact-success-box h3,
    .contact-error-box h3 {
      font-size: 16px;
    }

    .contact-success-box p,
    .contact-error-box p {
      font-size: 14px;
    }

    .configurator-card,
    .contact-form,
    .contact-info {
      padding: 24px;
    }
  }

  @media (max-width: 600px) {
    .section-pulse {
      width: 22px;
      height: 22px;
    }

    .contact-header h2 {
      font-size: clamp(18px, 7vw, 24px);
    }

    .contact-form input,
    .contact-form textarea {
      font-size: 14px;
      padding: 16px 14px;
    }

    .contact-form button {
      font-size: 14px;
      padding: 12px 16px;
    }

    .contact-block h3 {
      font-size: 14px;
    }

    .contact-block p,
    .contact-block a {
      font-size: 15px;
    }

    .contact-socials a {
      font-size: 24px;
    }

    .contact-book-link {
      font-size: 15px;
    }
  }

  @media (max-width: 420px) {
    .contact-title-row {
      gap: 10px;
    }

    .section-pulse {
      width: 18px;
      height: 18px;
    }

    .contact-header h2 {
      font-size: 18px;
    }

    .contact-header p {
      padding: 18px 0 18px 16px;
    }

    .configurator-card,
    .contact-form,
    .contact-info {
      padding: 21px;
    }

    .configurator-link {
      padding: 0 14px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .section-pulse,
    .section-pulse::before,
    .section-pulse::after,
    .configurator-arrow,
    .sending-progress span {
      animation-duration: 0.01ms;
      animation-iteration-count: 1;
      transition-duration: 0.01ms;
    }
  }
</style>
