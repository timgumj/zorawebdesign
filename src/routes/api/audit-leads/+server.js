import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..', '..', '..', '..');
const leadsDir = path.join(projectRoot, 'static', 'audit-leads');
const leadsFilePath = path.join(leadsDir, 'leads.json');

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PRIMARY_RECIPIENT = 'info@zorawebdesign.com';
const SECONDARY_RECIPIENT = 'timjay08@gmail.com';
const AUDIT_SUMMARY_FIELDS = [
  'overallScore',
  'googleScore',
  'localScore',
  'seoScore',
  'securityScore',
  'accessibilityScore',
  'conversionScore',
  'aiReadinessScore',
  'grade',
  'generatedAt'
];

function normalizeUrl(inputUrl = '') {
  const trimmed = String(inputUrl || '').trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function sanitizeText(value = '') {
  return String(value ?? '')
    .replace(/\s+/g, ' ')
    .replace(/[^\p{L}\p{N}\p{P}\p{S}\s]/gu, '')
    .trim();
}

function safeText(value, fallback = 'Not provided') {
  const clean = sanitizeText(value);
  return clean || fallback;
}

function normalizeScore(value) {
  if (value === null || value === undefined || value === '') return null;
  const number = Number(value);
  if (!Number.isFinite(number)) return null;
  return Math.max(0, Math.min(100, Math.round(number)));
}

function normalizeGrade(value) {
  const grade = sanitizeText(value).toUpperCase();
  return grade || null;
}

function normalizeTimestamp(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date.toISOString();
}

function normalizeAuditSummary(summary = {}) {
  const source = summary && typeof summary === 'object' ? summary : {};
  const normalized = {};

  for (const field of AUDIT_SUMMARY_FIELDS) {
    if (!(field in source)) continue;

    if (field === 'grade') {
      const grade = normalizeGrade(source[field]);
      if (grade) normalized[field] = grade;
      continue;
    }

    if (field === 'generatedAt') {
      normalized[field] = normalizeTimestamp(source[field]) || new Date().toISOString();
      continue;
    }

    const score = normalizeScore(source[field]);
    if (score !== null) normalized[field] = score;
  }

  return normalized;
}

function loadLeads() {
  try {
    if (!fs.existsSync(leadsFilePath)) return [];
    const raw = fs.readFileSync(leadsFilePath, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveLeads(leads) {
  fs.mkdirSync(leadsDir, { recursive: true });
  fs.writeFileSync(leadsFilePath, JSON.stringify(leads, null, 2));
}

function getTransporter() {
  const smtpHost = env.SMTP_HOST || 'w01e99cb.kasserver.com';
  const smtpPort = Number(env.SMTP_PORT || 465);
  const smtpUser = env.SMTP_USER || PRIMARY_RECIPIENT;
  const smtpPass = env.SMTP_PASS || '';

  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass }
  });
}

function getAuditHostLabel(websiteUrl) {
  try {
    return new URL(websiteUrl).hostname || websiteUrl;
  } catch {
    return websiteUrl;
  }
}

function getNotificationRecipients() {
  const primaryCandidate = sanitizeText(env.LEAD_NOTIFY_EMAIL || PRIMARY_RECIPIENT);
  const primary = EMAIL_PATTERN.test(primaryCandidate) ? primaryCandidate : PRIMARY_RECIPIENT;
  const ccCandidates = [SECONDARY_RECIPIENT, env.LEAD_NOTIFY_EMAIL_2].filter(Boolean);
  const cc = [...new Set(ccCandidates.map((item) => sanitizeText(item)).filter(Boolean))]
    .filter((item) => EMAIL_PATTERN.test(item))
    .filter((item) => item.toLowerCase() !== primary.toLowerCase());

  return { primary, cc };
}

function formatAuditSummaryLines(auditSummary = {}) {
  const rows = [
    ['Overall score', auditSummary.overallScore],
    ['Google/PageSpeed score', auditSummary.googleScore],
    ['Local/technical score', auditSummary.localScore],
    ['SEO score', auditSummary.seoScore],
    ['Security score', auditSummary.securityScore],
    ['Accessibility score', auditSummary.accessibilityScore],
    ['Conversion score', auditSummary.conversionScore],
    ['AI readiness score', auditSummary.aiReadinessScore],
    ['Grade', auditSummary.grade]
  ];

  return rows
    .filter(([, value]) => value !== null && value !== undefined && value !== '')
    .map(([label, value]) => `${label}: ${value}`);
}

async function sendLeadNotification({ name, email, phone, websiteUrl, competitorUrl, submittedAt, acceptedDisclaimer, auditSummary }) {
  const { primary, cc } = getNotificationRecipients();
  const transporter = getTransporter();
  const fromAddress = env.SMTP_USER || PRIMARY_RECIPIENT;
  const subject = `New Website Audit Lead — ${getAuditHostLabel(websiteUrl)}`;
  const scoreLines = formatAuditSummaryLines(auditSummary);
  const text = [
    'New website audit lead',
    '',
    `Name: ${safeText(name)}`,
    `Email: ${safeText(email)}`,
    `Phone: ${safeText(phone)}`,
    `Website URL: ${safeText(websiteUrl)}`,
    `Competitor URL: ${safeText(competitorUrl)}`,
    `Submission date: ${safeText(submittedAt)}`,
    `Disclaimer accepted: ${acceptedDisclaimer ? 'Yes' : 'No'}`,
    ...(scoreLines.length ? ['', ...scoreLines] : [])
  ].join('\n');

  await transporter.sendMail({
    from: fromAddress,
    to: primary,
    cc,
    replyTo: email,
    subject,
    text
  });
}

export async function POST({ request }) {
  try {
    const payload = await request.json();
    const name = sanitizeText(payload?.name || '');
    const email = sanitizeText(payload?.email || '');
    const phone = sanitizeText(payload?.phone || '');
    const websiteUrl = normalizeUrl(payload?.websiteUrl || '');
    const competitorUrl = normalizeUrl(payload?.competitorUrl || '');
    const acceptedDisclaimer = payload?.acceptedDisclaimer === true;
    const auditSummary = normalizeAuditSummary(payload?.auditSummary);

    if (!name || !email || !websiteUrl) {
      return json(
        { success: false, message: 'Name, email and website URL are required.' },
        { status: 400 }
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!acceptedDisclaimer) {
      return json(
        {
          success: false,
          message: 'Please accept the disclaimer before downloading the report.'
        },
        { status: 400 }
      );
    }

    const submittedAt = new Date().toISOString();
    const userAgent = sanitizeText(request.headers.get('user-agent') || '');

    const leadRecord = {
      id: randomUUID(),
      name,
      email,
      phone,
      websiteUrl,
      competitorUrl,
      acceptedDisclaimer,
      submittedAt,
      auditSummary,
      ...(userAgent ? { userAgent } : {})
    };

    const leads = loadLeads();
    leads.push(leadRecord);
    saveLeads(leads);

   try {
  await sendLeadNotification({
    name,
    email,
    phone,
    websiteUrl,
    competitorUrl,
    submittedAt,
    acceptedDisclaimer,
    auditSummary
  });
} catch (error) {
  console.error('Audit lead email failed:', error);

  return json(
    {
      success: false,
      message:
        'Your details could not be emailed. Please try again or check the mail configuration.'
    },
    { status: 502 }
  );
}

return json({
  success: true,
  emailSent: true,
  message: 'Lead submitted and email sent successfully.'
});
} catch (error) {
  console.error('Audit lead processing failed:', error);

  return json(
    {
      success: false,
      message: 'Could not process your request.'
    },
    { status: 500 }
  );
}
}