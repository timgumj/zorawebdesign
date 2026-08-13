<script>
  import { onMount, tick } from "svelte";
  import Header from "$lib/components/Header.svelte";
  import Footer from "$lib/components/Footer.svelte";
  import Faq from "$lib/components/Faq.svelte";
  import { isAuditExcludedUrl } from "$lib/data/audit-excluded-hosts.js";
  import { generateAuditPdf } from "../../website-audit/components/generateAuditPdf.js";
  import AuditLeadModal from "../../website-audit/components/AuditLeadModal.svelte";
  import {
    buildAuditSummary,
    normalizeUrl,
    safeText,
  } from "../../website-audit/report-helpers.js";

  const language = "en";

  const content = {
    documentTitle: "Free Website Audit | Zora Web Design",

    metaDescription:
      "Free website audit with 50+ automated checks. Get instant results and a detailed PDF report with prioritized fixes for SEO, performance, security and accessibility.",

    nav: {
      tagline: "SEO • WEB DESIGN • WORDPRESS",

      services: "[SERVICES]",
      servicesLink: "/en-2/#services",

      projects: "[PROJECTS]",
      projectsLink: "/en-2/#projects",

      reviews: "[REVIEWS]",
      reviewsLink: "/en-2/#reviews",

      contact: "[CONTACT]",
      contactLink: "/en-2/#contact",

      languageLabel: "[DE]",
      languageLink: "/website-audit/",

      freebies: {
        label: "[FREEBIES]",

        items: [
          {
            label: "[WEBSITE AUDIT]",
            href: "/en-2/website-audit/",
            title: "Open the free Website Audit",
          },
          {
            label: "[WEBSITE PLANNER]",
            href: "/en-2/website-configurator/",
            title: "Open the Website Planner",
          },
        ],
      },
    },

    hero: {
      eyebrow: "Free Website Audit",
      title: "Audit Your Website",

      description:
        "Check your website for SEO, performance, accessibility, security and technical issues. Download your complete PDF report in minutes.",

      websiteLabel: "Website URL",
      placeholder: "https://example.com",

      checking: "Checking...",
      runAudit: "Run Audit",
    },

    intro: {
      eyebrow: "Included",
      title: "What the audit checks",

      checks: [
        "SEO",
        "Performance",
        "Accessibility",
        "Security",
        "Core Web Vitals",
        "AI Readiness",
      ],
    },

    loading: {
      title: "Running audit...",

      description: "Analyzing your website. This may take a few seconds.",
    },

    report: {
      eyebrow: "Complete",
      title: "Your report is ready",

      description: "Download your complete website audit as a PDF.",

      website: "Website",
      generated: "Generated",

      download: "Download PDF",

      formNotice: "Complete the short form to download your report.",

      success:
        "Your details are saved. You can download the report again without completing the form.",
    },

    errors: {
      missingUrl: "Please enter your website URL.",

      excludedUrl:
        "This website cannot be audited with this tool. Please check the URL.",

      auditFailed: "The website could not be audited. Please try again.",

      auditRequired: "Run an audit before downloading the report.",

      pdfFailed: "The PDF report could not be generated.",

      fullName: "Please enter your full name.",

      validEmail: "Please enter a valid email address.",

      missingWebsite: "The audited website URL is missing.",

      disclaimer: "Please accept the disclaimer before continuing.",

      submitFailed: "Could not submit your report request.",

      generic: "Something went wrong. Please try again.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Website Audit Questions",

      items: [
        {
          question: "IS THE WEBSITE AUDIT FREE?",

          answer:
            "Yes. You can run the audit and download the complete PDF report for free.",
        },

        {
          question: "WHAT DOES THE AUDIT CHECK?",

          answer:
            "The audit checks SEO, performance, Core Web Vitals, accessibility, security, image optimization, technical quality and AI readiness.",
        },

        {
          question: "HOW DO I RECEIVE THE REPORT?",

          answer:
            "After the audit finishes, click Download PDF and complete the short form. The report will download directly to your browser.",
        },

        {
          question: "DOES IT WORK WITH WORDPRESS AND OTHER WEBSITES?",

          answer:
            "Yes. The audit can analyze WordPress websites, custom-built websites, online shops and websites created with most common platforms.",
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
    document.documentElement.lang = "en";

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

    return new Intl.DateTimeFormat("en-GB", {
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
  <title>
    {content.documentTitle}
  </title>

  <meta name="description" content={content.metaDescription} />

  <link rel="canonical" href="https://zorawebdesign.com/en-2/website-audit/" />

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

  <meta
    property="og:url"
    content="https://zorawebdesign.com/en-2/website-audit/"
  />

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

        <h1>
          {content.hero.title}
        </h1>

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
              <span class="check-icon" aria-hidden="true"> ✓ </span>

              <span>
                {check}
              </span>
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
        language="en"
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
    --audit-bg: #111111;
    --audit-card: #0d0d0d;
    --audit-line: rgba(255, 255, 255, 0.12);
    --audit-line-strong: rgba(255, 255, 255, 0.18);
    --audit-muted: #9a9a9a;
    --audit-blue: #0043ff;
  }

  :global(html) {
    scrollbar-gutter: stable;
    overflow-x: clip;
  }

  :global(body) {
    margin: 0;
    background: var(--audit-bg);
    color: #ffffff;
    overflow-x: clip;
  }

  :global(*) {
    box-sizing: border-box;
  }

  /* =========================================================
     PAGE
  ========================================================= */

  .audit-page {
    width: 100%;
    padding: 48px 0;
    background: var(--audit-bg);
    color: #ffffff;
    overflow-x: clip;
  }

  .audit-shell {
    width: min(1320px, calc(100% - 56px));

    margin: 0 auto;

    display: flex;
    flex-direction: column;

    gap: 14px;
  }

  h1,
  h2,
  p {
    margin-top: 0;
  }

  /* =========================================================
     HERO
  ========================================================= */

  .hero {
    position: relative;

    width: 100%;
    min-width: 0;

    display: grid;

    grid-template-columns:
      minmax(0, 1fr)
      minmax(390px, 0.82fr);

    align-items: center;

    gap: clamp(34px, 4vw, 64px);

    padding: 30px 32px;

    border: 1px solid var(--audit-line);

    background: #0d0d0d;
  }

  .hero::before {
    content: "";

    position: absolute;

    top: -1px;
    left: -1px;

    width: 76px;
    height: 2px;

    background: var(--audit-blue);
  }

  .hero-copy {
    min-width: 0;
  }

  .hero-copy > .eyebrow {
    margin-bottom: 10px;
  }

  .hero-copy h1 {
    max-width: 600px;

    margin: 0 0 12px;

    color: #ffffff;

    font-size: clamp(30px, 3vw, 43px);

    font-weight: 500;
    line-height: 1.08;

    letter-spacing: -0.04em;

    text-transform: none;
  }

  .hero-copy p {
    max-width: 600px;

    margin: 0;

    color: var(--audit-muted);

    font-size: 14px;
    font-weight: 400;
    line-height: 1.6;
  }

  /* =========================================================
     AUDIT ACTION AREA
  ========================================================= */

  .hero-panel {
    width: 100%;
    min-width: 0;
    max-width: 520px;

    justify-self: end;
  }

  .audit-form {
    position: relative;

    width: 100%;
    min-width: 0;

    display: grid;

    gap: 11px;

    padding: 18px;

    border: 1px solid var(--audit-line-strong);

    background: #111111;
  }

  .audit-form::before {
    content: "01";

    position: absolute;

    top: 17px;
    right: 18px;

    color: rgba(255, 255, 255, 0.2);

    font-size: 9px;
    font-weight: 700;
    line-height: 1;

    letter-spacing: 0.08em;
  }

  label {
    min-width: 0;

    display: grid;

    gap: 8px;
  }

  /* =========================================================
     SMALL LABELS
  ========================================================= */

  .eyebrow,
  label span,
  .audit-meta-list span {
    display: block;

    color: var(--audit-blue);

    font-size: 9px;
    font-weight: 700;
    line-height: 1.2;

    letter-spacing: 0.15em;

    text-transform: uppercase;
  }

  /* =========================================================
     INPUT
  ========================================================= */

  input {
    width: 100%;
    min-width: 0;
    min-height: 50px;

    padding: 13px 14px;

    border: 1px solid rgba(255, 255, 255, 0.16);

    border-radius: 0;

    outline: none;

    background: #090909;
    color: #ffffff;

    font-family: inherit;

    font-size: 14px;
    line-height: 1.3;

    transition:
      border-color 0.2s ease,
      background 0.2s ease;
  }

  input:hover {
    border-color: rgba(255, 255, 255, 0.3);
  }

  input:focus {
    border-color: var(--audit-blue);

    background: #0c0c0c;
  }

  input:focus-visible {
    outline: 2px solid var(--audit-blue);

    outline-offset: 2px;
  }

  input::placeholder {
    color: #666666;
  }

  /* =========================================================
     BUTTONS
  ========================================================= */

  button {
    display: inline-flex;

    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 50px;

    padding: 0 20px;

    border: 1px solid var(--audit-blue);

    border-radius: 0;

    background: var(--audit-blue);

    color: #ffffff;

    font-family: inherit;

    font-size: 10px;
    font-weight: 700;
    line-height: 1;

    letter-spacing: 0.09em;

    text-transform: uppercase;

    cursor: pointer;

    transition:
      background 0.2s ease,
      color 0.2s ease,
      opacity 0.2s ease;
  }

  button:hover:not(:disabled) {
    background: transparent;
    color: #ffffff;
  }

  button:focus-visible {
    outline: 2px solid var(--audit-blue);

    outline-offset: 3px;
  }

  button:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  /* =========================================================
     GENERAL TITLES
  ========================================================= */

  h2 {
    margin: 0;

    color: #ffffff;

    font-size: clamp(19px, 1.8vw, 25px);

    font-weight: 500;
    line-height: 1.15;

    letter-spacing: -0.025em;

    text-transform: none;
  }

  p {
    color: var(--audit-muted);

    font-size: 14px;
    line-height: 1.65;
  }

  /* =========================================================
     ERRORS / SUCCESS
  ========================================================= */

  .error {
    margin: 9px 0 0;

    color: #ffffff;

    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
  }

  .success {
    margin: 0;

    color: #ffffff;

    font-size: 12px;
    font-weight: 500;
    line-height: 1.5;
  }

  /* =========================================================
     WHAT IS CHECKED
  ========================================================= */

  .audit-includes {
    width: 100%;
    min-width: 0;

    display: grid;

    grid-template-columns:
      180px
      minmax(0, 1fr);

    gap: 24px;

    align-items: center;

    padding: 18px 22px;

    border: 1px solid var(--audit-line);

    background: #0d0d0d;
  }

  .includes-heading {
    min-width: 0;

    display: grid;

    gap: 5px;
  }

  .audit-checks {
    min-width: 0;

    display: grid;

    grid-template-columns: repeat(6, minmax(0, 1fr));

    gap: 6px;

    margin: 0;
    padding: 0;

    list-style: none;
  }

  .audit-checks li {
    min-width: 0;
    min-height: 38px;

    display: flex;

    align-items: center;

    gap: 7px;

    padding: 8px 9px;

    border: 1px solid rgba(255, 255, 255, 0.09);

    background: #111111;
    color: #ffffff;

    font-size: 9px;
    font-weight: 600;
    line-height: 1.3;

    letter-spacing: 0.04em;

    text-transform: uppercase;
  }

  .check-icon {
    flex: 0 0 auto;

    color: var(--audit-blue);

    font-size: 10px;
    line-height: 1;
  }

  /* =========================================================
     LOADING
  ========================================================= */

  .loading-card {
    width: 100%;
    min-width: 0;

    display: flex;

    align-items: center;

    gap: 14px;

    padding: 17px 20px;

    border: 1px solid var(--audit-line);

    background: #0d0d0d;
  }

  .loading-card strong {
    display: block;

    margin-bottom: 2px;

    color: #ffffff;

    font-size: 11px;
    font-weight: 600;
    line-height: 1.3;

    letter-spacing: 0.06em;

    text-transform: uppercase;
  }

  .loading-card p {
    margin: 0;

    font-size: 12px;
  }

  .loader {
    width: 25px;
    height: 25px;

    flex: 0 0 auto;

    border: 1px solid rgba(255, 255, 255, 0.18);

    border-top-color: var(--audit-blue);

    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* =========================================================
     RESULT
  ========================================================= */

  .results {
    width: 100%;
    min-width: 0;

    display: grid;

    gap: 14px;
  }

  .section-card {
    width: 100%;
    min-width: 0;

    padding: 24px 26px;

    border: 1px solid var(--audit-line);

    background: #0d0d0d;
  }

  .report-top {
    display: grid;

    grid-template-columns:
      minmax(0, 1.3fr)
      minmax(260px, 0.7fr);

    gap: 30px;

    align-items: center;
  }

  .report-top .eyebrow {
    margin-bottom: 7px;
  }

  .report-top h2 {
    margin-bottom: 8px;
  }

  .report-top > div > p {
    margin-bottom: 0;
  }

  /* =========================================================
     REPORT META
  ========================================================= */

  .audit-meta-list {
    display: grid;

    grid-template-columns: repeat(2, minmax(0, 1fr));

    gap: 7px;

    margin-top: 14px;
  }

  .audit-meta-list div {
    min-width: 0;

    padding: 10px 11px;

    border: 1px solid var(--audit-line);

    background: #111111;
  }

  .audit-meta-list strong {
    display: block;

    margin-top: 4px;

    color: #ffffff;

    font-size: 12px;
    font-weight: 500;
    line-height: 1.4;

    overflow-wrap: anywhere;
  }

  /* =========================================================
     REPORT ACTIONS
  ========================================================= */

  .preview-actions {
    min-width: 0;

    display: grid;

    gap: 8px;

    justify-items: stretch;
  }

  .preview-actions p,
  .report-error {
    margin: 0;

    font-size: 11px;
    line-height: 1.5;
  }

  /* =========================================================
     FAQ STABILITY ON AUDIT PAGE
  ========================================================= */

  .audit-shell :global(.faq) {
    width: 100% !important;
    max-width: 100% !important;

    margin-left: 0 !important;
    margin-right: 0 !important;

    padding-top: 48px;
    padding-bottom: 0;

    overflow-x: clip;
  }

  .audit-shell :global(.faq.full-width) {
    width: 100% !important;
    max-width: 100% !important;

    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  .audit-shell :global(.faq-container) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  .audit-shell :global(.faq-header),
  .audit-shell :global(.faq-header.visible) {
    width: 100%;
    max-width: 100%;

    margin-bottom: 46px;

    opacity: 1 !important;

    transform: none !important;

    transition: none !important;
  }

  .audit-shell :global(.faq-header-inner) {
    width: 100%;
    max-width: 100%;
    min-width: 0;

    min-height: 190px;

    padding-top: 38px;
    padding-bottom: 38px;
  }

  .audit-shell :global(.faq-content-grid) {
    width: 100%;
    max-width: 100%;
    min-width: 0;
  }

  /* =========================================================
     MEDIUM DESKTOP
  ========================================================= */

  @media (max-width: 1200px) {
    .audit-checks {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .hero {
      grid-template-columns:
        minmax(0, 1fr)
        minmax(350px, 0.85fr);
    }
  }

  /* =========================================================
     TABLET
  ========================================================= */

  @media (max-width: 1024px) {
    .audit-page {
      padding: 38px 0;
    }

    .audit-shell {
      width: calc(100% - 40px);

      gap: 12px;
    }

    .hero {
      grid-template-columns: 1fr;

      gap: 22px;

      padding: 26px 28px;
    }

    .hero-copy {
      max-width: 720px;
    }

    .hero-panel {
      width: 100%;
      max-width: none;

      justify-self: stretch;
    }

    .audit-form {
      grid-template-columns:
        minmax(0, 1fr)
        180px;

      align-items: end;
    }

    .audit-form button {
      width: 100%;
    }

    .audit-includes {
      grid-template-columns: 1fr;

      gap: 13px;
    }

    .audit-checks {
      grid-template-columns: repeat(3, minmax(0, 1fr));
    }

    .report-top {
      grid-template-columns: 1fr;

      gap: 20px;
    }

    .preview-actions {
      max-width: 420px;
    }

    .audit-shell :global(.faq) {
      padding-top: 38px;
      padding-bottom: 0;
    }

    .audit-shell :global(.faq-header),
    .audit-shell :global(.faq-header.visible) {
      opacity: 1 !important;

      transform: none !important;

      transition: none !important;
    }
  }

  /* =========================================================
     MOBILE
  ========================================================= */

  @media (max-width: 767px) {
    .audit-page {
      padding: 28px 0;
    }

    .audit-shell {
      width: calc(100% - 28px);

      gap: 10px;
    }

    .hero {
      gap: 20px;

      padding: 22px 18px;
    }

    .hero-copy > .eyebrow {
      margin-bottom: 8px;
    }

    .hero-copy h1 {
      margin-bottom: 10px;

      font-size: 27px;
      line-height: 1.1;
    }

    .hero-copy p {
      font-size: 13px;
      line-height: 1.55;
    }

    .audit-form {
      grid-template-columns: 1fr;

      gap: 9px;

      padding: 15px;
    }

    h2 {
      font-size: 20px;
    }

    .audit-includes {
      padding: 17px 18px;
    }

    .audit-checks {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    .section-card {
      padding: 20px 18px;
    }

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

    .audit-shell :global(.faq) {
      padding-top: 28px;
      padding-bottom: 0;
    }

    .audit-shell :global(.faq-header),
    .audit-shell :global(.faq-header.visible) {
      margin-bottom: 34px;

      opacity: 1 !important;

      transform: none !important;

      transition: none !important;
    }

    .audit-shell :global(.faq-header-inner) {
      min-height: 0;
    }
  }

  /* =========================================================
     SMALL MOBILE
  ========================================================= */

  @media (max-width: 480px) {
    .audit-page {
      padding: 24px 0;
    }

    .audit-shell {
      width: calc(100% - 24px);
    }

    .hero {
      padding: 20px 16px;
    }

    .hero-copy h1 {
      font-size: 25px;
    }

    .audit-form {
      padding: 14px;
    }

    .audit-includes {
      padding: 16px;
    }

    .audit-checks {
      grid-template-columns: 1fr;
    }

    .audit-shell :global(.faq) {
      padding-top: 24px;
      padding-bottom: 0;
    }
  }

  /* =========================================================
     REDUCED MOTION
  ========================================================= */

  @media (prefers-reduced-motion: reduce) {
    .loader {
      animation-duration: 1.5s;
    }

    button {
      transition-duration: 0.01ms;
    }
  }
</style>
