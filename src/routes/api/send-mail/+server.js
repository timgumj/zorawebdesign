import nodemailer from "nodemailer";
import { json } from "@sveltejs/kit";
import { env } from "$env/dynamic/private";

export async function POST({ request }) {
  try {
    const data = await request.json();

    const {
      formType,
      name,
      company,
      email,
      telephone,
      message,
      website,
    } = data;

    /*
     * For now this endpoint handles ONLY the contact form.
     */
    if (formType !== "contact") {
      return json(
        {
          success: false,
          message: "Unsupported form type.",
        },
        {
          status: 400,
        },
      );
    }

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

    /*
     * Basic validation.
     */
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

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(cleanEmail)) {
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

    /*
     * SMTP connection.
     */
    const transporter = nodemailer.createTransport({
      host: env.SMTP_HOST,
      port: Number(env.SMTP_PORT || 465),
      secure: true,

      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASSWORD,
      },
    });

    /*
     * Send contact email.
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
  } catch (error) {
    console.error("CONTACT MAIL ERROR:", error);

    return json(
      {
        success: false,
        message: "Mail delivery error encountered.",
      },
      {
        status: 500,
      },
    );
  }
}