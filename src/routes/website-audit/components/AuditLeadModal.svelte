<script>
  import { onMount, tick } from "svelte";

  let {
    form,
    submitting = false,
    error = "",
    language = "de",
    onsubmit,
    onclose,
  } = $props();

  const translations = {
    de: {
      closeAria: "Formular schließen",
      eyebrow: "PDF-Bericht herunterladen",
      title: "Ihre Angaben bestätigen",
      description:
        "Ihr Website-Audit ist abgeschlossen. Senden Sie Ihre Angaben ab und der vollständige PDF-Bericht wird anschließend direkt in Ihrem Browser heruntergeladen.",
      close: "Schließen",
      fullName: "Vollständiger Name",
      namePlaceholder: "Max Mustermann",
      email: "E-Mail-Adresse",
      emailPlaceholder: "max@unternehmen.at",
      phone: "Telefonnummer",
      phonePlaceholder: "+43 660 1234567",
      website: "Geprüfte Website",
      consent:
        "Ich stimme zu, dass meine übermittelten Angaben von Zora Web Design verwendet werden dürfen, um mir diesen Website-Audit bereitzustellen und die Ergebnisse mit mir zu besprechen. Mir ist bewusst, dass der Audit automatisiert erstellt wird, ausschließlich Informationszwecken dient und einzelne Ergebnisse manuell überprüft werden müssen.",
      submitting: "Wird gesendet...",
      submit: "PDF herunterladen",
    },

    en: {
      closeAria: "Close form",
      eyebrow: "Download PDF Report",
      title: "Confirm your details",
      description:
        "Your website audit is complete. Submit your details and the full PDF report will then download directly to your browser.",
      close: "Close",
      fullName: "Full name",
      namePlaceholder: "Alex Morgan",
      email: "Email address",
      emailPlaceholder: "alex@company.com",
      phone: "Phone number",
      phonePlaceholder: "+43 660 1234567",
      website: "Audited website",
      consent:
        "I agree that my submitted details may be used by Zora Web Design to provide this website audit and discuss the results with me. I understand that the audit is automated, is provided for informational purposes only and that individual findings may require manual verification.",
      submitting: "Submitting...",
      submit: "Download PDF",
    },
  };

  let nameInput;
  let previousOverflow = "";

  let content = $derived(language === "en" ? translations.en : translations.de);

  function handleBackdropClick() {
    if (!submitting) {
      onclose?.();
    }
  }

  function handleClose() {
    if (!submitting) {
      onclose?.();
    }
  }

  onMount(() => {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeydown = (event) => {
      if (event.key === "Escape" && !submitting) {
        event.preventDefault();
        onclose?.();
      }
    };

    document.addEventListener("keydown", handleKeydown);

    tick().then(() => {
      nameInput?.focus();
    });

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = previousOverflow;
    };
  });
</script>

```svelte
<div class="lead-modal-root">
  <button
    type="button"
    class="lead-modal-backdrop"
    aria-label={content.closeAria}
    onclick={handleBackdropClick}
    disabled={submitting}
  ></button>

  <div
    class="lead-modal"
    role="dialog"
    aria-modal="true"
    aria-labelledby="audit-lead-modal-title"
    aria-describedby="audit-lead-modal-description"
  >
    <div class="lead-modal-header">
      <div>
        <p class="lead-modal-eyebrow">
          {content.eyebrow}
        </p>

        <h2 id="audit-lead-modal-title">
          {content.title}
        </h2>

        <p id="audit-lead-modal-description">
          {content.description}
        </p>
      </div>

      <button
        type="button"
        class="lead-modal-close"
        aria-label={content.closeAria}
        onclick={handleClose}
        disabled={submitting}
      >
        {content.close}
      </button>
    </div>

    <form class="lead-modal-form" {onsubmit}>
      <div class="lead-modal-grid">
        <label>
          <span>{content.fullName}</span>

          <input
            bind:this={nameInput}
            bind:value={form.name}
            type="text"
            autocomplete="name"
            required
            placeholder={content.namePlaceholder}
          />
        </label>

        <label>
          <span>{content.email}</span>

          <input
            bind:value={form.email}
            type="email"
            autocomplete="email"
            required
            placeholder={content.emailPlaceholder}
          />
        </label>

        <label>
          <span>{content.phone}</span>

          <input
            bind:value={form.phone}
            type="tel"
            autocomplete="tel"
            placeholder={content.phonePlaceholder}
          />
        </label>
      </div>

      <label class="lead-modal-full-width">
        <span>{content.website}</span>

        <input bind:value={form.websiteUrl} type="text" readonly />
      </label>

      <label class="lead-consent-row">
        <input
          bind:checked={form.acceptedDisclaimer}
          type="checkbox"
          required
        />

        <span>
          {content.consent}
        </span>
      </label>

      <div class="lead-modal-feedback" aria-live="polite">
        {#if error}
          <p class="lead-modal-error">
            {error}
          </p>
        {/if}
      </div>

      <div class="lead-modal-actions">
        <button
          type="submit"
          disabled={submitting ||
            !form.acceptedDisclaimer ||
            !form.name.trim() ||
            !form.email.trim()}
        >
          {submitting ? content.submitting : content.submit}
        </button>
      </div>
    </form>
  </div>
</div>
```

<style>
  .lead-modal-root {
    position: fixed;
    inset: 0;
    z-index: 5000;
    display: grid;
    place-items: center;
    padding: 20px;
  }

  .lead-modal-backdrop {
    position: absolute;
    inset: 0;
    padding: 0;
    border: 0;
    background: rgba(0, 0, 0, 0.72);
    cursor: pointer;
  }

  .lead-modal {
    position: relative;
    z-index: 1;
    width: min(760px, 100%);
    max-height: min(90vh, 860px);
    overflow: auto;
    padding: 28px;
    border: 1px solid #2b2b2b;
    background: #111111;
    color: #f5f5f5;
  }

  .lead-modal-header {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 20px;
    align-items: start;
    margin-bottom: 22px;
  }

  .lead-modal-eyebrow {
    margin: 0 0 10px;
    color: #9a9a9a;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .lead-modal h2 {
    margin: 0 0 10px;
    font-size: clamp(24px, 3vw, 34px);
    line-height: 0.98;
    font-weight: 950;
    letter-spacing: -0.05em;
    text-transform: uppercase;
  }

  .lead-modal p {
    margin: 0;
    color: #b8b8b8;
    font-size: 14px;
    line-height: 1.65;
  }

  .lead-modal-close,
  .lead-modal-actions button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 18px;
    border: 1px solid #f5f5f5;
    background: #f5f5f5;
    color: #050505;
    font-size: 10px;
    font-weight: 950;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      background 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
  }

  .lead-modal-close:hover,
  .lead-modal-actions button:hover {
    background: #111111;
    color: #f5f5f5;
  }

  .lead-modal-close:focus-visible,
  .lead-modal-actions button:focus-visible,
  input:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 3px;
  }

  .lead-modal-close:disabled,
  .lead-modal-actions button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .lead-modal-form {
    display: grid;
    gap: 16px;
  }

  .lead-modal-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }

  label {
    display: grid;
    gap: 8px;
  }

  label span {
    color: #9a9a9a;
    font-size: 10px;
    font-weight: 900;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  input {
    width: 100%;
    padding: 15px 16px;
    border: 1px solid #333333;
    background: #0a0a0a;
    color: #f5f5f5;
    font-family: inherit;
    font-size: 14px;
  }

  input::placeholder {
    color: #666666;
  }

  input[readonly] {
    color: #cfcfcf;
    cursor: default;
  }

  .lead-modal-full-width {
    grid-column: 1 / -1;
  }

  .lead-consent-row {
    display: grid;
    grid-template-columns: 18px minmax(0, 1fr);
    gap: 10px;
    align-items: start;
    padding: 14px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    background: rgba(255, 255, 255, 0.03);
  }

  .lead-consent-row input {
    width: 16px;
    height: 16px;
    margin-top: 2px;
    padding: 0;
    accent-color: #f5f5f5;
  }

  .lead-consent-row span {
    color: #d4d4d4;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0;
    line-height: 1.6;
    text-transform: none;
  }

  .lead-modal-feedback {
    min-height: 22px;
  }

  .lead-modal-error {
    color: #ffffff;
    font-size: 13px;
    font-weight: 900;
  }

  .lead-modal-actions {
    display: flex;
    justify-content: flex-start;
  }

  @media (max-width: 720px) {
    .lead-modal-root {
      padding: 12px;
    }

    .lead-modal {
      max-height: calc(100vh - 24px);
      padding: 20px;
    }

    .lead-modal-header,
    .lead-modal-grid {
      grid-template-columns: 1fr;
    }

    .lead-modal-close {
      justify-self: start;
    }

    .lead-modal-actions button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .lead-modal-close,
    .lead-modal-actions button {
      transition-duration: 0.01ms;
    }
  }
</style>
