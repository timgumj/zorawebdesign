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

  const cleanName = String(name ?? "").trim();

  const cleanCompany =
    String(company ?? "").trim() || "Not specified";

  const cleanEmail = String(email ?? "").trim();

  const cleanTelephone =
    String(telephone ?? "").trim() || "Not specified";

  const cleanMessage = String(message ?? "").trim();

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
  const cleanName = String(data.name ?? "").trim();

  const cleanEmail = String(data.email ?? "").trim();

  const cleanPhone =
    String(data.phone ?? "").trim() || "Not provided";

  const cleanWebsiteUrl =
    String(data.websiteUrl ?? "").trim();

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