import nodemailer from "nodemailer";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

function createTransporter() {
  return nodemailer.createTransport({
    host: env.SMTP_HOST,
    port: Number(env.SMTP_PORT || 465),
    secure: true,

    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanString(value) {
  return String(value ?? "").trim();
}

function cleanArray(values) {
  return Array.isArray(values)
    ? values
        .map((value) => cleanString(value))
        .filter(Boolean)
    : [];
}

function formatArray(values) {
  const cleaned = cleanArray(values);

  return cleaned.length ? cleaned.join(", ") : "Not specified";
}

/* =========================================================
   CONTACT FORM
========================================================= */

async function handleContactForm(data) {
  const {
    name,
    company,
    email,
    telephone,
    message,
    website,
  } = data;

  /*
   * Honeypot spam protection.
   */
  if (website) {
    return json({
      success: true,
      message: "Message received.",
    });
  }

  const cleanName = cleanString(name);

  const cleanCompany =
    cleanString(company) || "Not specified";

  const cleanEmail = cleanString(email);

  const cleanTelephone =
    cleanString(telephone) || "Not specified";

  const cleanMessage = cleanString(message);

  if (!cleanName || !cleanEmail || !cleanMessage) {
    return json(
      {
        success: false,
        message: "Name, email and message are required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidEmail(cleanEmail)) {
    return json(
      {
        success: false,
        message: "Please provide a valid email address.",
      },
      {
        status: 400,
      },
    );
  }

  const transporter = createTransporter();

  await transporter.sendMail({
    from: {
      name: "Zora Web Design",
      address: env.SMTP_USER,
    },

    to: env.CONTACT_EMAIL || env.SMTP_USER,

    cc: env.CONTACT_CC || undefined,

    replyTo: {
      name: cleanName,
      address: cleanEmail,
    },

    subject: `Neue Kontaktanfrage – ${cleanName}`,

    text:
      `Neue Kontaktanfrage über zorawebdesign.com\n\n` +
      `Name: ${cleanName}\n` +
      `Unternehmen: ${cleanCompany}\n` +
      `E-Mail: ${cleanEmail}\n` +
      `Telefon: ${cleanTelephone}\n\n` +
      `Nachricht:\n${cleanMessage}\n`,
  });

  return json({
    success: true,
    message: "Message sent successfully.",
  });
}

/* =========================================================
   WEBSITE AUDIT
========================================================= */

async function handleAuditForm(data) {
  const cleanName = cleanString(data.name);

  const cleanEmail = cleanString(data.email);

  const cleanPhone =
    cleanString(data.phone) || "Not provided";

  const cleanWebsiteUrl =
    cleanString(data.websiteUrl);

  const acceptedDisclaimer =
    data.acceptedDisclaimer === true;

  const auditSummary =
    data.auditSummary &&
    typeof data.auditSummary === "object" &&
    !Array.isArray(data.auditSummary)
      ? data.auditSummary
      : {};

  if (
    !cleanName ||
    !cleanEmail ||
    !cleanWebsiteUrl
  ) {
    return json(
      {
        success: false,
        message:
          "Name, email and website URL are required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidEmail(cleanEmail)) {
    return json(
      {
        success: false,
        message:
          "Please provide a valid email address.",
      },
      {
        status: 400,
      },
    );
  }

  if (!acceptedDisclaimer) {
    return json(
      {
        success: false,
        message:
          "Please accept the disclaimer before downloading the report.",
      },
      {
        status: 400,
      },
    );
  }

  const submittedAt = new Date().toISOString();

  const scoreLabels = {
    overallScore: "Overall score",
    googleScore: "Google/PageSpeed score",
    localScore: "Local/technical score",
    seoScore: "SEO score",
    securityScore: "Security score",
    accessibilityScore: "Accessibility score",
    conversionScore: "Conversion score",
    aiReadinessScore: "AI readiness score",
    grade: "Grade",
  };

  const scoreLines = [];

  for (const [field, label] of Object.entries(scoreLabels)) {
    const value = auditSummary[field];

    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      scoreLines.push(
        `${label}: ${String(value).trim()}`,
      );
    }
  }

  let host = cleanWebsiteUrl;

  try {
    host = new URL(cleanWebsiteUrl).hostname;
  } catch {
    try {
      host = new URL(
        `https://${cleanWebsiteUrl}`,
      ).hostname;
    } catch {
      host = cleanWebsiteUrl;
    }
  }

  const transporter = createTransporter();

  let body =
    `New website audit lead\n\n` +
    `Name: ${cleanName}\n` +
    `Email: ${cleanEmail}\n` +
    `Phone: ${cleanPhone}\n` +
    `Website URL: ${cleanWebsiteUrl}\n` +
    `Submission date: ${submittedAt}\n` +
    `Disclaimer accepted: Yes\n`;

  if (scoreLines.length > 0) {
    body +=
      `\nAudit summary\n` +
      `${scoreLines.join("\n")}\n`;
  }

  await transporter.sendMail({
    from: {
      name: "Zora Web Design",
      address: env.SMTP_USER,
    },

    to: env.CONTACT_EMAIL || env.SMTP_USER,

    cc: env.CONTACT_CC || undefined,

    replyTo: {
      name: cleanName,
      address: cleanEmail,
    },

    subject: `New Website Audit Lead – ${host}`,

    text: body,
  });

  return json({
    success: true,
    emailSent: true,
    message:
      "Lead submitted and email sent successfully.",
  });
}

/* =========================================================
   WEBSITE CONFIGURATOR
========================================================= */

async function handleWebsiteConfigurator(data) {
  /*
   * Honeypot spam protection.
   */
  if (cleanString(data.website)) {
    return json({
      success: true,
      clientEmailSent: false,
      message: "Configuration received.",
    });
  }

  const cleanName = cleanString(data.name);
  const cleanEmail = cleanString(data.email);

  const cleanPhone =
    cleanString(data.phone) || "Not specified";

  const cleanCompany =
    cleanString(data.company) || "Not specified";

  const cleanCurrentWebsite =
    cleanString(data.currentWebsite) || "Not specified";

  const cleanPreferredContact =
    cleanString(data.preferredContact) || "Not specified";

  const cleanComments =
    cleanString(data.comments) || "None";

  const language =
    cleanString(data.language) || "de";

  const sourceUrl =
    cleanString(data.sourceUrl) || "Not specified";

  const selectedPackage =
    cleanString(data.selectedPackageLabel) ||
    cleanString(data.selectedPackage) ||
    "Not specified";

  const recommendedPackage =
    cleanString(data.recommendedPackageLabel) ||
    cleanString(data.recommendedPackage) ||
    "Not specified";

  const consent = data.consent === true;

  const configuration =
    data.configuration &&
    typeof data.configuration === "object" &&
    !Array.isArray(data.configuration)
      ? data.configuration
      : {};

  if (!cleanName || !cleanEmail) {
    return json(
      {
        success: false,
        message: "Name and email are required.",
      },
      {
        status: 400,
      },
    );
  }

  if (!isValidEmail(cleanEmail)) {
    return json(
      {
        success: false,
        message: "Please provide a valid email address.",
      },
      {
        status: 400,
      },
    );
  }

  if (!consent) {
    return json(
      {
        success: false,
        message:
          "Consent is required before submitting the configuration.",
      },
      {
        status: 400,
      },
    );
  }

  const project =
    configuration.project || {};

  const contentAndDesign =
    configuration.contentAndDesign || {};

  const pagesAndStructure =
    configuration.pagesAndStructure || {};

  const featuresAndTechnology =
    configuration.featuresAndTechnology || {};

  const timelineAndSupport =
    configuration.timelineAndSupport || {};

  const submittedAt =
    cleanString(data.submittedAt) ||
    new Date().toISOString();

  const ownerEmailText =
    `New Website Configurator Request\n\n` +

    `CONTACT\n` +
    `Name: ${cleanName}\n` +
    `Company: ${cleanCompany}\n` +
    `Email: ${cleanEmail}\n` +
    `Phone: ${cleanPhone}\n` +
    `Preferred contact: ${cleanPreferredContact}\n` +
    `Current website: ${cleanCurrentWebsite}\n` +
    `Language: ${language}\n` +
    `Submitted: ${submittedAt}\n` +
    `Source URL: ${sourceUrl}\n\n` +

    `PROJECT SCOPE\n` +
    `Selected package: ${selectedPackage}\n` +
    `Recommended package: ${recommendedPackage}\n\n` +

    `PROJECT\n` +
    `Website type: ${cleanString(project.websiteType) || "Not specified"}\n` +
    `Goals: ${formatArray(project.goals)}\n` +
    `Project status: ${cleanString(project.projectStatus) || "Not specified"}\n\n` +

    `CONTENT & DESIGN\n` +
    `Content readiness: ${cleanString(contentAndDesign.contentReadiness) || "Not specified"}\n` +
    `Visual readiness: ${cleanString(contentAndDesign.visualReadiness) || "Not specified"}\n` +
    `Branding readiness: ${cleanString(contentAndDesign.brandingReadiness) || "Not specified"}\n` +
    `Design direction: ${cleanString(contentAndDesign.designDirection) || "Not specified"}\n` +
    `Design references: ${formatArray(contentAndDesign.designReferences)}\n` +
    `Content support: ${formatArray(contentAndDesign.supportNeeds)}\n\n` +

    `PAGES & STRUCTURE\n` +
    `Selected pages: ${formatArray(pagesAndStructure.selectedPages)}\n` +
    `Custom pages: ${formatArray(pagesAndStructure.customPages)}\n` +
    `Page volume: ${cleanString(pagesAndStructure.pageVolume) || "Not specified"}\n\n` +

    `FEATURES & TECHNOLOGY\n` +
    `Selected features: ${formatArray(featuresAndTechnology.selectedFeatures)}\n` +
    `Website languages: ${cleanString(featuresAndTechnology.websiteLanguages) || "Not specified"}\n` +
    `Custom integration: ${cleanString(featuresAndTechnology.customIntegration) || "Not specified"}\n` +
    `Final requirements: ${formatArray(featuresAndTechnology.finalRequirements)}\n` +
    `Final requirement note: ${cleanString(featuresAndTechnology.finalRequirementNote) || "None"}\n\n` +

    `TIMELINE & SUPPORT\n` +
    `Project start: ${cleanString(timelineAndSupport.projectStart) || "Not specified"}\n` +
    `Launch timeline: ${cleanString(timelineAndSupport.launchTimeline) || "Not specified"}\n` +
    `Collaboration model: ${cleanString(timelineAndSupport.collaborationModel) || "Not specified"}\n` +
    `Ongoing support: ${formatArray(timelineAndSupport.ongoingSupport)}\n` +
    `Training preference: ${cleanString(timelineAndSupport.trainingPreference) || "Not specified"}\n` +
    `Timeline note: ${cleanString(timelineAndSupport.timelineNote) || "None"}\n\n` +

    `COMMENTS\n` +
    `${cleanComments}\n`;

  const transporter = createTransporter();

  /*
   * Email to Zora Web Design.
   */
  await transporter.sendMail({
    from: {
      name: "Zora Web Design",
      address: env.SMTP_USER,
    },

    to: env.CONTACT_EMAIL || env.SMTP_USER,

    cc: env.CONTACT_CC || undefined,

    replyTo: {
      name: cleanName,
      address: cleanEmail,
    },

    subject:
      `Website Configurator – ${cleanName} – ${selectedPackage}`,

    text: ownerEmailText,
  });

  /*
   * Confirmation email to the client.
   *
   * If this second email fails, the owner's request has
   * already been received, so we do not treat the entire
   * submission as failed.
   */
  let clientEmailSent = false;

  try {
    const isEnglish = language === "en";

    await transporter.sendMail({
      from: {
        name: "Zora Web Design",
        address: env.SMTP_USER,
      },

      to: cleanEmail,

      replyTo: env.CONTACT_EMAIL || env.SMTP_USER,

      subject: isEnglish
        ? "We received your website configuration"
        : "Wir haben Ihre Website-Konfiguration erhalten",

      text: isEnglish
        ? (
            `Hello ${cleanName},\n\n` +
            `thank you for submitting your website configuration.\n\n` +
            `I have received your project details and will review them personally.\n\n` +
            `Selected project scope: ${selectedPackage}\n` +
            `Recommended project scope: ${recommendedPackage}\n\n` +
            `I will get back to you with the next steps.\n\n` +
            `Best regards,\n` +
            `Julius\n` +
            `Zora Web Design`
          )
        : (
            `Hallo ${cleanName},\n\n` +
            `vielen Dank für Ihre Website-Konfiguration.\n\n` +
            `Ich habe Ihre Projektangaben erhalten und werde sie persönlich prüfen.\n\n` +
            `Ausgewählter Projektumfang: ${selectedPackage}\n` +
            `Empfohlener Projektumfang: ${recommendedPackage}\n\n` +
            `Ich melde mich anschließend mit den nächsten Schritten bei Ihnen.\n\n` +
            `Beste Grüße\n` +
            `Julius\n` +
            `Zora Web Design`
          ),
    });

    clientEmailSent = true;
  } catch (error) {
    console.error(
      "CONFIGURATOR CLIENT CONFIRMATION ERROR:",
      error,
    );
  }

  return json({
    success: true,
    clientEmailSent,
    message: "Configuration submitted successfully.",
  });
}

/* =========================================================
   MAIN ENDPOINT
========================================================= */

export async function POST({ request }) {
  try {
    const data = await request.json();

    const formType =
      String(data.formType ?? "contact").trim();

    if (formType === "contact") {
      return await handleContactForm(data);
    }

    if (formType === "audit") {
      return await handleAuditForm(data);
    }

    if (formType === "website-configurator") {
      return await handleWebsiteConfigurator(data);
    }

    return json(
      {
        success: false,
        message: "Unsupported form type.",
      },
      {
        status: 400,
      },
    );
  } catch (error) {
    console.error("MAIL ENDPOINT ERROR:", error);

    return json(
      {
        success: false,
        message:
          "Mail delivery error encountered.",
      },
      {
        status: 500,
      },
    );
  }
}