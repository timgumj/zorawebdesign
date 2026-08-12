<script>
  import { onMount, tick } from "svelte";

  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Faq from "$lib/components/Faq.svelte";

  import { isAuditExcludedUrl } from "$lib/data/audit-excluded-hosts.js";

  import { generateAuditPdf } from "./components/generateAuditPdf.js";
  import AuditLeadModal from "./components/AuditLeadModal.svelte";

  import {
    buildAuditSummary,
    normalizeUrl,
    safeText,
  } from "./report-helpers.js";

  const language = "de";

  const content = {
    documentTitle: "Kostenloser Website-Audit | Zora Web Design",
    metaDescription:
      "Kostenloser Website-Audit mit über 50 automatisierten Prüfungen für SEO, Performance, Sicherheit, Barrierefreiheit und Core Web Vitals.",

    nav: {
      tagline: "SEO • WEBDESIGN • WORDPRESS",

      services: "[LEISTUNGEN]",
      servicesLink: "/#services",

      projects: "[PROJEKTE]",
      projectsLink: "/#projects",

      reviews: "[REVIEWS]",
      reviewsLink: "/#reviews",

      contact: "[KONTAKT]",
      contactLink: "/#contact",

      languageLabel: "[EN]",
      languageLink: "/en-2/website-audit/",

      freebies: {
        label: "[FREEBIES]",
        items: [
          {
            label: "[WEBSITE AUDIT]",
            href: "/website-audit/",
            title: "Kostenlosen Website-Audit öffnen",
          },
        ],
      },
    },

    hero: {
      eyebrow: "Kostenloser Website-Audit",
      title: "Website kostenlos prüfen",
      description:
        "Kostenloser Website-Audit mit über 50 automatisierten Prüfungen. Ergebnisse sofort ansehen und einen detaillierten PDF-Bericht mit priorisierten Empfehlungen für SEO, Performance, Sicherheit und Barrierefreiheit herunterladen.",
      websiteLabel: "Website-URL",
      placeholder: "https://beispiel.at",
      checking: "Wird geprüft...",
      runAudit: "Audit starten",
    },

    intro: {
      eyebrow: "Enthalten",
      title: "Das wird geprüft",
      checks: [
        "SEO",
        "Performance",
        "Barrierefreiheit",
        "Sicherheit",
        "Core Web Vitals",
        "KI-Bereitschaft",
      ],
    },

    loading: {
      title: "Audit wird durchgeführt...",
      description:
        "Ihre Website wird analysiert. Dies kann einige Sekunden dauern.",
    },

    report: {
      eyebrow: "Abgeschlossen",
      title: "Ihr Bericht ist bereit",
      description:
        "Laden Sie den vollständigen Website-Audit als PDF herunter.",
      website: "Website",
      generated: "Erstellt",
      download: "PDF herunterladen",
      formNotice:
        "Füllen Sie das kurze Formular aus, um den Bericht herunterzuladen.",
      success:
        "Ihre Angaben wurden gespeichert. Sie können den Bericht erneut herunterladen, ohne das Formular noch einmal auszufüllen.",
    },

    errors: {
      missingUrl: "Bitte geben Sie die URL Ihrer Website ein.",
      excludedUrl:
        "Diese Website kann mit diesem Tool nicht geprüft werden. Bitte überprüfen Sie die URL.",
      auditFailed:
        "Der Website-Audit konnte nicht durchgeführt werden. Bitte versuchen Sie es erneut.",
      auditRequired:
        "Bitte führen Sie zuerst einen Audit durch, bevor Sie den Bericht herunterladen.",
      pdfFailed: "Der PDF-Bericht konnte nicht erstellt werden.",
      fullName: "Bitte geben Sie Ihren vollständigen Namen ein.",
      validEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
      missingWebsite: "Die URL der geprüften Website fehlt.",
      disclaimer: "Bitte akzeptieren Sie den Hinweis, bevor Sie fortfahren.",
      submitFailed: "Die Anfrage für den Bericht konnte nicht gesendet werden.",
      generic: "Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Fragen zum Website-Audit",

      items: [
        {
          question: "IST DER WEBSITE-AUDIT KOSTENLOS?",
          answer:
            "Ja. Sie können den Audit kostenlos durchführen und den vollständigen PDF-Bericht herunterladen.",
        },
        {
          question: "WAS WIRD BEIM AUDIT GEPRÜFT?",
          answer:
            "Der Audit prüft SEO, Performance, Core Web Vitals, Barrierefreiheit, Sicherheit, Bildoptimierung, technische Qualität und KI-Bereitschaft.",
        },
        {
          question: "WIE ERHALTE ICH DEN BERICHT?",
          answer:
            "Klicken Sie nach Abschluss des Audits auf „PDF herunterladen“ und füllen Sie das kurze Formular aus. Der Bericht wird direkt in Ihrem Browser heruntergeladen.",
        },
        {
          question: "FUNKTIONIERT DER AUDIT AUCH MIT WORDPRESS?",
          answer:
            "Ja. Der Audit funktioniert mit WordPress-Websites, individuell entwickelten Websites, Onlineshops und den meisten gängigen Website-Plattformen.",
        },
      ],
    },
  };

  const nav = content.nav;
  const auditFaqItems = content.faq.items;

  const storageKey = "website-audit-last-url";

  const auditMailEndpoint = "/api/send-mail";

  let websiteUrl = $state("");

  let auditStarted = $state(false);
  let loading = $state(false);
  let error = $state("");
  let result = $state(null);

  let showLeadModal = $state(false);
  let submittingLead = $state(false);
  let leadError = $state("");
  let leadSubmitted = $state(false);
  let reportGeneratedAt = $state("");
  let downloadTrigger = $state();

  let leadForm = $state({
    name: "",
    email: "",
    phone: "",
    websiteUrl: "",
    acceptedDisclaimer: false,
  });

  const auditSummary = $derived(
    result
      ? buildAuditSummary(result, reportGeneratedAt || new Date().toISOString())
      : null,
  );

  const generatedLabel = $derived(formatGeneratedDate(reportGeneratedAt));

  onMount(() => {
    document.documentElement.lang = "de";

    websiteUrl = localStorage.getItem(storageKey) || "";

    leadForm.websiteUrl = normalizeUrl(websiteUrl);
  });

  function formatGeneratedDate(value) {
    if (!value) {
      return "—";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
      return "—";
    }

    return new Intl.DateTimeFormat("de-AT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  }

  function saveUrlToBrowser() {
    const trimmedUrl = websiteUrl.trim();

    if (trimmedUrl) {
      localStorage.setItem(storageKey, trimmedUrl);
    }
  }

  async function auditUrl(url) {
    const response = await fetch(
      "https://zora-audit-engine.vercel.app/api/audit",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: normalizeUrl(url),
        }),
      },
    );

    let data;

    try {
      data = await response.json();
    } catch {
      throw new Error(content.errors.auditFailed);
    }

    if (!response.ok) {
      throw new Error(data?.error || content.errors.auditFailed);
    }

    return data;
  }

  function resetLeadState() {
    showLeadModal = false;
    submittingLead = false;
    leadError = "";
    leadSubmitted = false;

    leadForm.acceptedDisclaimer = false;
  }

  function hydrateLeadForm() {
    leadForm.websiteUrl = normalizeUrl(websiteUrl);
    leadForm.acceptedDisclaimer = false;
  }

  async function runAudit() {
    error = "";
    result = null;
    reportGeneratedAt = "";

    resetLeadState();

    const trimmedUrl = websiteUrl.trim();

    if (!trimmedUrl) {
      error = content.errors.missingUrl;
      return;
    }

    if (isAuditExcludedUrl(trimmedUrl)) {
      error = content.errors.excludedUrl;
      return;
    }

    auditStarted = true;
    loading = true;

    saveUrlToBrowser();

    try {
      const mainAudit = await auditUrl(trimmedUrl);

      result = mainAudit;
      reportGeneratedAt = new Date().toISOString();

      hydrateLeadForm();
    } catch (err) {
      error = err instanceof Error ? err.message : content.errors.generic;

      console.error(err);
    } finally {
      loading = false;
    }
  }

  async function downloadPremiumPdf() {
    if (!result) {
      leadError = content.errors.auditRequired;
      return;
    }

    try {
      await generateAuditPdf({
        result,
        websiteUrl: normalizeUrl(websiteUrl),
        clientName: leadForm.name.trim(),
        generatedAt: reportGeneratedAt,
        language,
      });
    } catch (err) {
      console.error(err);

      leadError = err instanceof Error ? err.message : content.errors.pdfFailed;
    }
  }

  async function requestReportDownload() {
    leadError = "";

    if (!result) {
      leadError = content.errors.auditRequired;
      return;
    }

    if (leadSubmitted) {
      await downloadPremiumPdf();
      return;
    }

    hydrateLeadForm();
    showLeadModal = true;
  }

  function closeLeadModal() {
    if (submittingLead) {
      return;
    }

    showLeadModal = false;
    leadError = "";

    tick().then(() => {
      downloadTrigger?.focus();
    });
  }

  async function submitLeadForm(event) {
    event.preventDefault();

    leadError = "";

    const payload = {
      formType: "audit",
      language,
      name: leadForm.name.trim(),
      email: leadForm.email.trim(),
      phone: leadForm.phone.trim(),
      websiteUrl: normalizeUrl(leadForm.websiteUrl),
      acceptedDisclaimer: leadForm.acceptedDisclaimer,
      auditSummary,
    };

    if (!payload.name) {
      leadError = content.errors.fullName;
      return;
    }

    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      leadError = content.errors.validEmail;
      return;
    }

    if (!payload.websiteUrl) {
      leadError = content.errors.missingWebsite;
      return;
    }

    if (!payload.acceptedDisclaimer) {
      leadError = content.errors.disclaimer;
      return;
    }

    submittingLead = true;

    try {
      const response = await fetch(auditMailEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error(content.errors.submitFailed);
      }

      if (!response.ok || !data?.success) {
        throw new Error(data?.message || content.errors.submitFailed);
      }

      leadSubmitted = true;
      showLeadModal = false;

      await tick();
      await downloadPremiumPdf();
    } catch (err) {
      leadError = err instanceof Error ? err.message : content.errors.generic;

      console.error(err);
    } finally {
      submittingLead = false;
    }
  }
</script>

<svelte:head>
  <title>{content.documentTitle}</title>

  <meta name="description" content={content.metaDescription} />

  <link rel="canonical" href="https://zorawebdesign.com/website-audit/" />

  <link
    rel="alternate"
    hreflang="de"
    href="https://zorawebdesign.com/website-audit/"
  />

  <link
    rel="alternate"
    hreflang="en"
    href="https://zorawebdesign.com/en-2/website-audit/"
  />

  <link
    rel="alternate"
    hreflang="x-default"
    href="https://zorawebdesign.com/website-audit/"
  />

  <meta property="og:title" content={content.documentTitle} />

  <meta property="og:description" content={content.metaDescription} />

  <meta property="og:type" content="website" />

  <meta property="og:url" content="https://zorawebdesign.com/website-audit/" />

  <meta name="twitter:card" content="summary" />
</svelte:head>

<Header {nav} />

<section class="audit-page no-print">
  <div class="audit-shell">
    <header class="hero" id="audit-tool">
      <div class="hero-copy">
        <span class="eyebrow">
          {content.hero.eyebrow}
        </span>

        <h1>{content.hero.title}</h1>

        <p>
          {content.hero.description}
        </p>
      </div>

      <div class="hero-panel">
        <div class="audit-form">
          <label>
            <span>
              {content.hero.websiteLabel}
            </span>

            <input
              type="text"
              inputmode="url"
              autocomplete="url"
              spellcheck="false"
              bind:value={websiteUrl}
              onblur={saveUrlToBrowser}
              placeholder={content.hero.placeholder}
              aria-label={content.hero.websiteLabel}
              onkeydown={(event) => {
                if (event.key === "Enter" && !loading) {
                  event.preventDefault();
                  runAudit();
                }
              }}
            />
          </label>

          <button type="button" onclick={runAudit} disabled={loading}>
            {loading ? content.hero.checking : content.hero.runAudit}
          </button>
        </div>

        {#if error}
          <p class="error" role="alert">
            {error}
          </p>
        {/if}
      </div>
    </header>

    {#if !auditStarted}
      <section class="audit-includes" aria-labelledby="audit-includes-title">
        <div class="includes-heading">
          <span class="eyebrow">
            {content.intro.eyebrow}
          </span>

          <h2 id="audit-includes-title">
            {content.intro.title}
          </h2>
        </div>

        <ul class="audit-checks">
          {#each content.intro.checks as check}
            <li>
              <span class="check-icon" aria-hidden="true">✓</span>
              <span>{check}</span>
            </li>
          {/each}
        </ul>
      </section>
    {/if}

    {#if loading}
      <div class="loading-card" aria-live="polite" aria-busy="true">
        <div class="loader" aria-hidden="true"></div>

        <div>
          <strong>
            {content.loading.title}
          </strong>

          <p>
            {content.loading.description}
          </p>
        </div>
      </div>
    {/if}

    {#if result}
      <div class="results results-minimal">
        <section class="report-top section-card report-ready-card">
          <div>
            <span class="eyebrow">
              {content.report.eyebrow}
            </span>

            <h2>
              {content.report.title}
            </h2>

            <p>
              {content.report.description}
            </p>

            <div class="audit-meta-list">
              <div>
                <span>
                  {content.report.website}
                </span>

                <strong>
                  {safeText(normalizeUrl(websiteUrl))}
                </strong>
              </div>

              <div>
                <span>
                  {content.report.generated}
                </span>

                <strong>
                  {generatedLabel}
                </strong>
              </div>
            </div>
          </div>

          <div class="preview-actions preview-actions-compact">
            <button
              bind:this={downloadTrigger}
              type="button"
              class="print-button"
              onclick={requestReportDownload}
            >
              {content.report.download}
            </button>

            <p>
              {content.report.formNotice}
            </p>

            {#if leadSubmitted}
              <p class="success" role="status">
                {content.report.success}
              </p>
            {/if}

            {#if leadError && !showLeadModal}
              <p class="error report-error" role="alert">
                {leadError}
              </p>
            {/if}
          </div>
        </section>
      </div>
    {/if}

    {#if !auditStarted}
      <Faq
        eyebrow={content.faq.eyebrow}
        title={content.faq.title}
        items={auditFaqItems}
        fullWidth={false}
      />
    {/if}
  </div>
</section>

{#if showLeadModal}
  <AuditLeadModal
    form={leadForm}
    submitting={submittingLead}
    error={leadError}
    {language}
    onsubmit={submitLeadForm}
    onclose={closeLeadModal}
  />
{/if}

<Footer />

<style>
  :global(:root) {
    --audit-bg: #0a0a0a;
    --audit-card: #111111;
    --audit-line: #2b2b2b;
    --audit-muted: #b8b8b8;
  }

  :global(body) {
    margin: 0;
    background: var(--audit-bg);
    color: #f5f5f5;
    font-family: "DM Sans", Arial, sans-serif;
  }

  :global(*) {
    box-sizing: border-box;
  }

  .audit-page {
    min-height: 100vh;
    padding: 76px 20px 100px;
    background: var(--audit-bg);
    color: #f5f5f5;
  }

  .audit-shell {
    width: min(1220px, 100%);
    margin: 0 auto;
    display: grid;
    gap: 24px;
  }

  h1,
  h2,
  p {
    margin-top: 0;
  }

  h1 {
    max-width: 760px;
    margin-bottom: 18px;
    font-size: clamp(36px, 6vw, 72px);
    line-height: 0.92;
    font-weight: 950;
    letter-spacing: -0.055em;
    text-transform: uppercase;
  }

  h2 {
    margin-bottom: 0;
    font-size: clamp(22px, 3vw, 32px);
    line-height: 1;
    font-weight: 950;
    letter-spacing: -0.045em;
    text-transform: uppercase;
  }

  p {
    color: var(--audit-muted);
    font-size: 14px;
    line-height: 1.65;
  }

  .eyebrow,
  label span,
  .audit-meta-list span {
    display: block;
    color: #9a9a9a;
    font-size: 10px;
    font-weight: 950;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  .hero {
    display: grid;
    grid-template-columns: minmax(0, 1fr) minmax(340px, 0.8fr);
    gap: 64px;
    align-items: center;
    min-height: 460px;
    padding: 48px;
    border: 1px solid var(--audit-line);
    background: linear-gradient(180deg, #0f1013 0%, #0a0a0a 100%);
  }

  .hero-copy > .eyebrow {
    margin-bottom: 18px;
  }

  .hero-copy p {
    max-width: 620px;
    margin-bottom: 0;
    font-size: 16px;
    line-height: 1.65;
  }

  .hero-panel {
    width: 100%;
  }

  .audit-form {
    display: grid;
    gap: 14px;
    padding: 24px;
    background: var(--audit-card);
    border: 1px solid var(--audit-line);
  }

  label {
    display: grid;
    gap: 8px;
  }

  input {
    width: 100%;
    min-height: 52px;
    padding: 14px 16px;
    border: 1px solid #333333;
    outline: 0;
    background: #0a0a0a;
    color: #f5f5f5;
    font-family: inherit;
    font-size: 14px;
  }

  input:focus {
    border-color: #686868;
  }

  input:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 2px;
  }

  input::placeholder {
    color: #666666;
  }

  button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 48px;
    padding: 0 20px;
    border: 1px solid #f5f5f5;
    background: #f5f5f5;
    color: #050505;
    font-family: inherit;
    font-size: 10px;
    font-weight: 950;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    transition:
      opacity 0.2s ease,
      background 0.2s ease,
      color 0.2s ease;
  }

  button:hover:not(:disabled) {
    background: #0a0a0a;
    color: #f5f5f5;
  }

  button:focus-visible {
    outline: 2px solid #0043ff;
    outline-offset: 3px;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  .error {
    margin: 14px 0 0;
    color: #ffffff;
    font-size: 13px;
    font-weight: 900;
  }

  .success {
    margin: 0;
    color: #c5ffd2;
    font-size: 13px;
    font-weight: 900;
  }

  .audit-includes {
    display: grid;
    grid-template-columns: minmax(220px, 0.6fr) minmax(0, 1.4fr);
    gap: 40px;
    align-items: center;
    padding: 28px 34px;
    border: 1px solid var(--audit-line);
    background: var(--audit-card);
  }

  .includes-heading {
    display: grid;
    gap: 10px;
  }

  .audit-checks {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 10px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .audit-checks li {
    display: flex;
    align-items: center;
    gap: 9px;
    min-height: 46px;
    padding: 12px 14px;
    border: 1px solid #2e2e2e;
    background: #0c0c0c;
    color: #f5f5f5;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }

  .check-icon {
    color: #c5ffd2;
    font-size: 13px;
    line-height: 1;
  }

  .loading-card {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px;
    background: var(--audit-card);
    border: 1px solid var(--audit-line);
  }

  .loading-card strong {
    display: block;
    margin-bottom: 4px;
    font-size: 13px;
    text-transform: uppercase;
  }

  .loading-card p {
    margin: 0;
    font-size: 13px;
  }

  .loader {
    width: 30px;
    height: 30px;
    flex: 0 0 auto;
    border: 2px solid #333333;
    border-top-color: #ffffff;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  .section-card {
    padding: 34px;
    background: var(--audit-card);
    border: 1px solid var(--audit-line);
  }

  .results {
    display: grid;
    gap: 24px;
  }

  .report-top {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 32px;
    align-items: center;
  }

  .report-top .eyebrow {
    margin-bottom: 12px;
  }

  .report-top h2 {
    margin-bottom: 12px;
  }

  .report-top > div > p {
    margin-bottom: 0;
  }

  .audit-meta-list {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 10px;
    margin-top: 20px;
  }

  .audit-meta-list div {
    padding: 12px 14px;
    background: #0a0a0a;
    border: 1px solid var(--audit-line);
  }

  .audit-meta-list strong {
    display: block;
    margin-top: 6px;
    color: #f5f5f5;
    font-size: 14px;
    line-height: 1.4;
    word-break: break-word;
  }

  .preview-actions {
    display: grid;
    gap: 10px;
    justify-items: start;
  }

  .preview-actions p,
  .report-error {
    margin: 0;
    font-size: 12px;
  }

  @media (max-width: 980px) {
    .hero,
    .report-top,
    .audit-includes {
      grid-template-columns: 1fr;
    }

    .hero {
      min-height: auto;
      gap: 34px;
    }

    .audit-includes {
      gap: 22px;
    }

    .audit-checks {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }
  }

  @media (max-width: 640px) {
    .audit-page {
      padding: 34px 12px 78px;
    }

    .audit-shell {
      gap: 16px;
    }

    .hero,
    .section-card,
    .audit-includes {
      padding: 20px;
    }

    .hero {
      gap: 28px;
    }

    .hero-copy p {
      font-size: 14px;
    }

    .audit-form {
      padding: 18px;
    }

    .audit-checks,
    .audit-meta-list {
      grid-template-columns: 1fr;
    }

    .loading-card {
      align-items: flex-start;
    }

    .preview-actions,
    .preview-actions button {
      width: 100%;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loader {
      animation-duration: 1.5s;
    }

    button {
      transition-duration: 0.01ms;
    }
  }
</style>
