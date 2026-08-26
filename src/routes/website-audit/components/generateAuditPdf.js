import { PDFDocument, StandardFonts, rgb } from "pdf-lib";


const PDF_TEXT = {
  de: {
    coverTitle: "Website Audit Bericht",
    executiveSummary: "Zusammenfassung",
    overallScore: "Gesamtbewertung",

    performance: "Performance",
    seo: "SEO",
    accessibility: "Accessibility",
    security: "Security",
    aiReadiness: "AI Readiness",

    mobile: "Mobil",
    desktop: "Desktop",

    recommendations: "Empfehlungen",
    roadmap: "Maßnahmenplan",

    technicalInfrastructure: "Technische Infrastruktur",
    sslCertificate: "SSL-Zertifikat",

    generated: "Erstellt",
    website: "Website",
    reportDate: "Berichtsdatum",
  },

  en: {
    coverTitle: "Website Audit Report",
    executiveSummary: "Executive Summary",
    overallScore: "Overall Score",

    performance: "Performance",
    seo: "SEO",
    accessibility: "Accessibility",
    security: "Security",
    aiReadiness: "AI Readiness",

    mobile: "Mobile",
    desktop: "Desktop",

    recommendations: "Recommendations",
    roadmap: "Roadmap",

    technicalInfrastructure: "Technical Infrastructure",
    sslCertificate: "SSL Certificate",

    generated: "Generated",
    website: "Website",
    reportDate: "Report Date",
  },
};



let ACTIVE_PDF_LANGUAGE = "en";

const PDF_TRANSLATIONS_DE = {
  "Website Audit Report": "Website Audit Bericht",
  "Page": "Seite",
  "Executive summary": "Zusammenfassung",
  "Executive Summary": "Zusammenfassung",
  "Overall assessment": "Gesamtbewertung",
  "Overall score": "Gesamtbewertung",
  "Overall Score": "Gesamtbewertung",
  "Overall quality rating": "Gesamtbewertung der Website-Qualität",
  "Grade": "Bewertung",
  "Audited domain": "Geprüfte Domain",
  "WHAT IS WORKING": "WAS BEREITS GUT FUNKTIONIERT",
  "WHAT NEEDS ATTENTION": "WAS OPTIMIERT WERDEN SOLLTE",
  "Strength": "Stärke",
  "Attention": "Optimierungsbedarf",
  "Score overview": "Score-Übersicht",
  "Website quality dashboard": "Dashboard zur Website-Qualität",
  "Speed and Core Web Vitals.": "Geschwindigkeit und Core Web Vitals.",
  "Metadata and search structure.": "Metadaten und Suchstruktur.",
  "Browser hardening and trust.": "Browser-Härtung und Vertrauenssignale.",
  "Semantic usability and support.": "Semantische Nutzbarkeit und Unterstützung.",
  "How clearly users are guided.": "Wie klar Nutzer durch die Website geführt werden.",
  "Machine-readable context.": "Maschinenlesbarer Kontext.",
  "HOW TO READ THE SCORES": "SO LESEN SIE DIE SCORES",
  "Good": "Gut",
  "Needs attention": "Optimierungsbedarf",
  "Poor": "Kritisch",
  "Not available": "Nicht verfügbar",
  "Core Web Vitals": "Core Web Vitals",
  "Mobile and desktop performance": "Performance auf Mobilgeräten und Desktop",
  "Mobile": "Mobil",
  "Desktop": "Desktop",
  "Best Practices": "Best Practices",
  "CORE METRICS": "CORE METRICS",
  "SEO overview": "SEO-Übersicht",
  "Metadata and search signals": "Metadaten und Suchsignale",
  "Title": "Title",
  "Meta description": "Meta Description",
  "Canonical": "Canonical URL",
  "Robots meta": "Robots Meta",
  "Sitemap": "Sitemap",
  "Robots.txt": "robots.txt",
  "Open Graph": "Open Graph",
  "Schema": "Schema",
  "Language": "Sprache",
  "Language attribute": "Sprachattribut",
  "Hreflang": "Hreflang",
  "Found": "Vorhanden",
  "Missing": "Fehlt",
  "Set": "Gesetzt",
  "Not detected": "Nicht erkannt",
  "Detected": "Erkannt",
  "Complete": "Vollständig",
  "Incomplete": "Unvollständig",
  "Content structure": "Content-Struktur",
  "Headings and internal links": "Überschriften und interne Links",
  "HEADING SUMMARY": "ÜBERSCHRIFTEN-ÜBERSICHT",
  "HEADING ISSUES": "PROBLEME MIT ÜBERSCHRIFTEN",
  "LINK SUMMARY": "LINK-ÜBERSICHT",
  "LINK ISSUES": "PROBLEME MIT LINKS",
  "Total headings": "Überschriften gesamt",
  "Total links": "Links gesamt",
  "Internal links": "Interne Links",
  "External links": "Externe Links",
  "Empty links": "Links ohne Text",
  "No H1 was detected.": "Es wurde keine H1-Überschrift erkannt.",
  "Multiple H1 headings were detected.": "Es wurden mehrere H1-Überschriften erkannt.",
  "No major heading issue was detected.": "Es wurde kein wesentliches Problem mit der Überschriftenstruktur erkannt.",
  "No major link text problem was detected.": "Es wurde kein wesentliches Problem mit den Linktexten erkannt.",
  "Accessible links": "Verständliche Linktexte",
  "Review external links opened in a new tab for safe rel attributes.": "Prüfen Sie externe Links, die in einem neuen Tab geöffnet werden, auf sichere rel-Attribute.",
  "Media and code quality": "Medien- und Code-Qualität",
  "Images and HTML validation": "Bilder und HTML-Validierung",
  "IMAGE SUMMARY": "BILD-ÜBERSICHT",
  "W3C VALIDATION": "W3C-VALIDIERUNG",
  "Total images": "Bilder gesamt",
  "Modern formats": "Moderne Formate",
  "Legacy formats": "Veraltete Formate",
  "Missing ALT": "Fehlender ALT Text",
  "Missing dimensions": "Fehlende Abmessungen",
  "W3C score": "W3C Score",
  "Critical errors": "Kritische Fehler",
  "Warnings": "Warnungen",
  "Convert important JPG and PNG images to WebP or AVIF.": "Konvertieren Sie wichtige JPG- und PNG-Bilder in WebP oder AVIF.",
  "Add descriptive ALT text to meaningful images.": "Ergänzen Sie aussagekräftigen ALT Text für relevante Bilder.",
  "Add width and height attributes to reduce layout shift.": "Ergänzen Sie width- und height-Attribute, um Layout Shifts zu reduzieren.",
  "Fix repeated shared template errors first. One component-level correction may remove many validation problems.": "Beheben Sie zuerst wiederkehrende Fehler in gemeinsam verwendeten Templates. Eine Korrektur auf Komponentenebene kann viele Validierungsprobleme gleichzeitig lösen.",
  "The detected image setup does not require an immediate major correction.": "Die erkannte Bildkonfiguration erfordert derzeit keine größere sofortige Korrektur.",
  "Heading structure": "Überschriftenstruktur",
  "Detected heading text": "Erkannte Überschriftentexte",
  "Links and destinations": "Links und Zieladressen",
  "Detected link text and URLs": "Erkannte Linktexte und URLs",
  "Image inventory": "Bildinventar",
  "Detected images and URLs": "Erkannte Bilder und URLs",
  "No heading details were returned for this audit.": "Für diesen Audit wurden keine Details zu Überschriften zurückgegeben.",
  "No link details were returned for this audit.": "Für diesen Audit wurden keine Linkdetails zurückgegeben.",
  "No image details were returned for this audit.": "Für diesen Audit wurden keine Bilddetails zurückgegeben.",
  "No additional details were returned.": "Es wurden keine zusätzlichen Details zurückgegeben.",
  "continued": "Fortsetzung",
  "Technical infrastructure": "Technische Infrastruktur",
  "Technical Infrastructure": "Technische Infrastruktur",
  "HTTP, crawlability and server signals": "HTTP-, Crawling- und Server-Signale",
  "HTTP & SERVER": "HTTP & SERVER",
  "CRAWLABILITY": "CRAWLING & INDEXIERUNG",
  "HTTP status": "HTTP Status",
  "Redirected": "Weitergeleitet",
  "Server": "Server",
  "Powered by": "Powered By",
  "Encoding": "Encoding",
  "Content type": "Content-Type",
  "Final URL": "Finale URL",
  "Indexable": "Indexierbar",
  "Yes": "Ja",
  "No": "Nein",
  "Unknown": "Unbekannt",
  "Security headers": "Security Headers",
  "SECURITY HEADERS": "SECURITY HEADERS",
  "Security header": "Security Header",
  "No security header details were returned for this audit.": "Für diesen Audit wurden keine Details zu Security Headers zurückgegeben.",
  "Security and platform": "Security und Plattform",
  "Browser hardening and technology stack": "Browser-Härtung und Technologie-Stack",
  "MAIN TECHNOLOGY": "HAUPTTECHNOLOGIE",
  "DETECTED TECHNOLOGY": "ERKANNTE TECHNOLOGIEN",
  "SSL CERTIFICATE": "SSL-ZERTIFIKAT",
  "Technology": "Technologie",
  "Status": "Status",
  "Issuer": "Aussteller",
  "Expires": "Gültig bis",
  "Days until expiry": "Tage bis zum Ablauf",
  "Protocol": "Protokoll",
  "Accessibility and machine readability": "Accessibility und maschinelle Lesbarkeit",
  "Semantic quality and AI readiness": "Semantische Qualität und AI Readiness",
  "ACCESSIBILITY SIGNALS": "ACCESSIBILITY-SIGNALE",
  "AI READINESS SIGNALS": "AI-READINESS-SIGNALE",
  "Semantic HTML": "Semantisches HTML",
  "FAQ schema": "FAQ Schema",
  "Schema blocks": "Schema-Blöcke",
  "Word count": "Wortanzahl",
  "Machine-readable structure, context and entities.": "Maschinenlesbare Struktur, Kontext und Entitäten.",
  "Semantic usability and assistive technology support.": "Semantische Nutzbarkeit und Unterstützung assistiver Technologien.",
  "Clear semantic structure, useful schema, descriptive links and accessible media help users, search engines and AI systems interpret website content more accurately.": "Eine klare semantische Struktur, hilfreiches Schema, verständliche Links und zugängliche Medien unterstützen Nutzer, Suchmaschinen und AI-Systeme dabei, Website-Inhalte genauer zu interpretieren.",
  "Why this matters": "Warum das wichtig ist",
  "Prioritized actions": "Priorisierte Maßnahmen",
  "Recommended improvements": "Empfohlene Verbesserungen",
  "Recommended improvements continued": "Empfohlene Verbesserungen - Fortsetzung",
  "Recommendation": "Empfehlung",
  "WHY": "WARUM",
  "ACTION": "MASSNAHME",
  "HIGH": "HOCH",
  "MEDIUM": "MITTEL",
  "LOW": "NIEDRIG",
  "Final roadmap": "Finaler Maßnahmenplan",
  "Practical implementation plan": "Praktischer Umsetzungsplan",
  "Quick wins": "Schnelle Verbesserungen",
  "Medium improvements": "Mittelfristige Verbesserungen",
  "Developer work": "Entwicklungsarbeiten",
  "Strategic improvements": "Strategische Verbesserungen",
  "Recommended action": "Empfohlene Maßnahme",
  "NEED HELP IMPLEMENTING THESE IMPROVEMENTS?": "BENÖTIGEN SIE HILFE BEI DER UMSETZUNG?",
  "Review": "Prüfen",
  "Needs review": "Prüfung erforderlich",
  "None": "Keine",
  "does not require": "benötigt keine",
  "no major": "keine wesentlichen",
  "not detected": "nicht erkannt",
  "missing": "fehlt",
  "review": "prüfen",
  "The audit completed successfully, but some score details were not available.": "Der Audit wurde erfolgreich abgeschlossen, einige Score-Details waren jedoch nicht verfügbar.",
  "The website has a strong technical foundation. The clearest opportunities now come from targeted improvements rather than broad technical rework.": "Die Website verfügt über eine starke technische Grundlage. Das größte Potenzial liegt nun in gezielten Verbesserungen statt in einer umfassenden technischen Überarbeitung.",
  "The website has a workable foundation, but several technical and structural issues may be limiting search visibility, user trust and conversion performance.": "Die Website verfügt über eine brauchbare Grundlage. Mehrere technische und strukturelle Probleme können jedoch die Sichtbarkeit in Suchmaschinen, das Vertrauen der Nutzer und die Conversion beeinträchtigen.",
  "The website currently has several important technical issues that should be addressed before expecting stronger search visibility and lead performance.": "Die Website weist derzeit mehrere wichtige technische Probleme auf. Diese sollten behoben werden, bevor eine bessere Sichtbarkeit in Suchmaschinen und eine stärkere Lead-Performance zu erwarten sind.",
  "The website has a strong overall technical baseline.": "Die Website verfügt insgesamt über eine starke technische Grundlage.",
  "Browser trust and security signals are above average.": "Die Vertrauens- und Security-Signale des Browsers sind überdurchschnittlich.",
  "A single primary H1 supports search clarity.": "Eine einzelne zentrale H1 unterstützt die klare Einordnung durch Suchmaschinen.",
  "Structured data improves machine-readable context.": "Structured Data verbessert den maschinenlesbaren Kontext.",
  "The site has a measurable foundation that can be improved systematically.": "Die Website verfügt über eine messbare Grundlage, die systematisch verbessert werden kann.",
  "Performance gaps may reduce mobile usability and conversion quality.": "Performance-Lücken können die mobile Nutzbarkeit und die Conversion-Qualität beeinträchtigen.",
  "A missing sitemap can reduce crawl efficiency.": "Eine fehlende Sitemap kann die Crawling-Effizienz reduzieren.",
  "HTML validation errors suggest shared template-level issues.": "HTML-Validierungsfehler deuten auf Probleme in gemeinsam verwendeten Templates hin.",
  "Several recommended browser hardening headers are missing.": "Mehrere empfohlene Security Headers zur Browser-Härtung fehlen.",
  "No major critical weakness dominated the audit.": "Der Audit wurde von keiner schwerwiegenden kritischen Schwachstelle dominiert.",
  "No major critical issue dominated the audit.": "Der Audit wurde von keinem schwerwiegenden kritischen Problem dominiert.",
  "No major critical W3C validation problem dominated this audit.": "Bei diesem Audit wurde kein schwerwiegendes kritisches W3C-Validierungsproblem festgestellt.",
  "Improve page speed": "PageSpeed verbessern",
  "Reduce render-blocking assets, compress heavy media and improve caching.": "Reduzieren Sie render-blockierende Ressourcen, komprimieren Sie große Mediendateien und verbessern Sie das Caching.",
  "Fix repeated HTML validation issues": "Wiederkehrende HTML-Validierungsprobleme beheben",
  "Correct the shared component or template output producing repeated errors.": "Korrigieren Sie die gemeinsam verwendete Komponente oder das Template, das wiederkehrende Fehler erzeugt.",
  "Add sitemap.xml": "sitemap.xml hinzufügen",
  "Search engines have less direct guidance for discovering important pages.": "Suchmaschinen erhalten weniger direkte Hinweise zum Auffinden wichtiger Seiten.",
  "Generate a sitemap and submit it through Google Search Console.": "Erstellen Sie eine Sitemap und reichen Sie sie in der Google Search Console ein.",
  "Add a unique page title": "Eindeutigen Page Title hinzufügen",
  "The page title is missing or unavailable.": "Der Page Title fehlt oder ist nicht verfügbar.",
  "Write a concise title that matches the page intent and search topic.": "Formulieren Sie einen präzisen Title, der zur Seitenintention und zum Suchthema passt.",
  "Add a meta description": "Meta Description hinzufügen",
  "The page description is missing.": "Die Meta Description fehlt.",
  "Write a concise description that reflects user intent and value.": "Formulieren Sie eine präzise Beschreibung, die Nutzerintention und Mehrwert widerspiegelt.",
  "Add image ALT text": "ALT Text für Bilder ergänzen",
  "Add short descriptions and keep decorative images empty with alt=\"\".": "Ergänzen Sie kurze Beschreibungen und lassen Sie dekorative Bilder mit alt=\"\" leer.",
  "Convert key images to WebP or AVIF": "Wichtige Bilder in WebP oder AVIF konvertieren",
  "Convert large photographic images first and use responsive sizes.": "Konvertieren Sie zuerst große Fotografien und verwenden Sie responsive Bildgrößen.",
  "Add recommended security headers": "Empfohlene Security Headers ergänzen",
  "Start with HSTS, CSP, X-Content-Type-Options and Referrer-Policy.": "Beginnen Sie mit HSTS, CSP, X-Content-Type-Options und Referrer-Policy.",
  "Strengthen AI-readiness signals": "AI-Readiness-Signale stärken",
  "Improve schema, headings, entity clarity and internal linking.": "Verbessern Sie Schema, Überschriften, Entity-Klarheit und interne Verlinkung.",
  "Continue monitoring technical quality": "Technische Qualität weiterhin überwachen",
  "Repeat the audit after significant content or development changes.": "Wiederholen Sie den Audit nach wesentlichen Content- oder Entwicklungsänderungen.",
  "Ongoing": "Fortlaufend",
  "Longer-term": "Langfristig",
  "Missing href": "Fehlendes href",
  "No readable link text": "Kein verständlicher Linktext",
  "ISSUE": "PROBLEM",
  "IMAGE": "BILD",
  "Decorative image - empty ALT": "Dekoratives Bild - leerer ALT Text",
  "Decorative image — empty ALT": "Dekoratives Bild - leerer ALT Text",
  "Missing ALT text": "Fehlender ALT Text",
  "ALT missing": "ALT fehlt",
  "ALT available": "ALT vorhanden",
  "Dimensions unavailable": "Abmessungen nicht verfügbar",
  "INFO": "INFO",
  "Complete": "Vollständig",
  "Incomplete": "Unvollständig"
};

function localizePdfText(value) {
  const text = String(value ?? "");

  if (ACTIVE_PDF_LANGUAGE !== "de" || !text) {
    return text;
  }

  if (Object.prototype.hasOwnProperty.call(PDF_TRANSLATIONS_DE, text)) {
    return PDF_TRANSLATIONS_DE[text];
  }

  let translated = text;

  const dynamicRules = [
    [/^Page (\d+)$/, "Seite $1"],
    [/^Heading (\d+)$/, "Überschrift $1"],
    [/^Image (\d+)$/, "Bild $1"],
    [/^(.*) continued$/, "$1 - Fortsetzung"],
    [/^(\d+) meaningful image is missing ALT text\.$/, "$1 relevantes Bild hat keinen ALT Text."],
    [/^(\d+) meaningful images are missing ALT text\.$/, "$1 relevante Bilder haben keinen ALT Text."],
    [/^(\d+) link has no readable text\.$/, "$1 Link hat keinen verständlichen Text."],
    [/^(\d+) links have no readable text\.$/, "$1 Links haben keinen verständlichen Text."],
    [/^(\d+) valid block$/, "$1 gültiger Block"],
    [/^(\d+) valid blocks$/, "$1 gültige Blöcke"],
    [/^The PageSpeed score is (.+)\.$/, "Der PageSpeed Score beträgt $1."],
    [/^(\d+) critical validation error was detected\.$/, "$1 kritischer Validierungsfehler wurde erkannt."],
    [/^(\d+) critical validation errors were detected\.$/, "$1 kritische Validierungsfehler wurden erkannt."],
    [/^(\d+) legacy JPG or PNG asset was detected\.$/, "$1 veraltete JPG- oder PNG-Datei wurde erkannt."],
    [/^(\d+) legacy JPG or PNG assets were detected\.$/, "$1 veraltete JPG- oder PNG-Dateien wurden erkannt."],
    [/^(\d+) recommended browser hardening header is missing\.$/, "$1 empfohlener Security Header zur Browser-Härtung fehlt."],
    [/^(\d+) recommended browser hardening headers are missing\.$/, "$1 empfohlene Security Headers zur Browser-Härtung fehlen."],
    [/^AI readiness is currently (.+)\.$/, "Der AI Readiness Score beträgt derzeit $1."],
  ];

  for (const [pattern, replacement] of dynamicRules) {
    if (pattern.test(translated)) {
      return translated.replace(pattern, replacement);
    }
  }

  return translated;
}

function patchPageLocalization(page) {
  if (!page || page.__zoraLocalizationPatched) {
    return page;
  }

  const originalDrawText = page.drawText.bind(page);

  page.drawText = (text, options) =>
    originalDrawText(localizePdfText(text), options);

  Object.defineProperty(page, "__zoraLocalizationPatched", {
    value: true,
    configurable: false,
    enumerable: false,
    writable: false,
  });

  return page;
}

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_Y = 28;
const CONTENT_BOTTOM = 58;

const COLORS = {
  ink: rgb(0.07, 0.07, 0.08),
  body: rgb(0.23, 0.23, 0.25),
  muted: rgb(0.43, 0.43, 0.46),
  line: rgb(0.84, 0.84, 0.82),
  soft: rgb(0.96, 0.96, 0.95),
  white: rgb(1, 1, 1),
  black: rgb(0.055, 0.055, 0.065),

  good: rgb(0.16, 0.48, 0.29),
  goodSoft: rgb(0.9, 0.95, 0.91),

  medium: rgb(0.58, 0.4, 0.16),
  mediumSoft: rgb(0.96, 0.92, 0.83),

  poor: rgb(0.64, 0.19, 0.17),
  poorSoft: rgb(0.96, 0.88, 0.87),

  neutral: rgb(0.42, 0.42, 0.42),
  neutralSoft: rgb(0.93, 0.93, 0.92),
};

function safeText(value, fallback = "Not available") {
  if (value === null || value === undefined) {
    return fallback;
  }

  const clean = localizePdfText(String(value))
    .replace(/→/g, " to ")
    .replace(/←/g, " from ")
    .replace(/↔/g, " - ")
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/…/g, "...")
    .replace(/•/g, "-")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "")
    .replace(/\s+/g, " ")
    .trim();

  return clean || fallback;
}

function normalizeScore(value) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.max(0, Math.min(100, Math.round(value)));
  }

  if (!value || typeof value !== "object") {
    return null;
  }

  const nestedValue = value.score ?? value.value;

  if (
    typeof nestedValue === "number" &&
    Number.isFinite(nestedValue)
  ) {
    return Math.max(
      0,
      Math.min(100, Math.round(nestedValue)),
    );
  }

  return null;
}

function averageScores(values = []) {
  const cleanValues = values.filter(
    (value) =>
      typeof value === "number" &&
      Number.isFinite(value),
  );

  if (!cleanValues.length) return null;

  return Math.round(
    cleanValues.reduce((sum, value) => sum + value, 0) /
      cleanValues.length,
  );
}

function getGrade(score) {
  if (score === null) return "N/A";
  if (score >= 95) return "A+";
  if (score >= 88) return "A";
  if (score >= 75) return "B";
  if (score >= 60) return "C";
  return "D";
}

function getScoreColor(score) {
  if (score === null) return COLORS.neutral;
  if (score >= 80) return COLORS.good;
  if (score >= 60) return COLORS.medium;
  return COLORS.poor;
}

function getScoreBackgroundColor(score) {
  if (score === null) return COLORS.neutralSoft;
  if (score >= 80) return COLORS.goodSoft;
  if (score >= 60) return COLORS.mediumSoft;
  return COLORS.poorSoft;
}

function getScoreStatus(score) {
  if (score === null) return "Not available";
  if (score >= 80) return "Good";
  if (score >= 60) return "Needs attention";
  return "Poor";
}

function getExecutiveAssessment(score) {
  if (score === null) {
    return "The audit completed successfully, but some score details were not available.";
  }

  if (score >= 80) {
    return "The website has a strong technical foundation. The clearest opportunities now come from targeted improvements rather than broad technical rework.";
  }

  if (score >= 60) {
    return "The website has a workable foundation, but several technical and structural issues may be limiting search visibility, user trust and conversion performance.";
  }

  return "The website currently has several important technical issues that should be addressed before expecting stronger search visibility and lead performance.";
}

function getHostName(websiteUrl) {
  try {
    return new URL(websiteUrl)
      .hostname
      .replace(/^www\./, "");
  } catch {
    return safeText(websiteUrl, "website");
  }
}

function createSafeFileName(websiteUrl, language = "en") {
  const host = getHostName(websiteUrl)
    .replace(/[^a-z0-9.-]/gi, "-")
    .replace(/-+/g, "-");

  return `${language === "de" ? "website-analyse" : "website-audit"}-${host}.pdf`;
}

function downloadPdfBytes(pdfBytes, fileName) {
  const blob = new Blob([pdfBytes], {
    type: "application/pdf",
  });

  const downloadUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = downloadUrl;
  link.download = fileName;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  link.remove();

  setTimeout(() => {
    URL.revokeObjectURL(downloadUrl);
  }, 1000);
}

function splitTextIntoLines(
  text,
  font,
  size,
  maxWidth,
) {
  const words = safeText(text, "")
    .split(/\s+/)
    .filter(Boolean);

  if (!words.length) return [];

  const lines = [];
  let currentLine = "";

  for (const word of words) {
    const candidate = currentLine
      ? `${currentLine} ${word}`
      : word;

    const width = font.widthOfTextAtSize(
      candidate,
      size,
    );

    if (width <= maxWidth) {
      currentLine = candidate;
    } else {
      if (currentLine) lines.push(currentLine);

      if (
        font.widthOfTextAtSize(word, size) <=
        maxWidth
      ) {
        currentLine = word;
      } else {
        let fragment = "";

        for (const character of word) {
          const fragmentCandidate = `${fragment}${character}`;

          if (
            font.widthOfTextAtSize(
              fragmentCandidate,
              size,
            ) <= maxWidth
          ) {
            fragment = fragmentCandidate;
          } else {
            if (fragment) lines.push(fragment);
            fragment = character;
          }
        }

        currentLine = fragment;
      }
    }
  }

  if (currentLine) lines.push(currentLine);

  return lines;
}

function drawWrappedText(
  page,
  text,
  {
    x,
    y,
    font,
    size = 10,
    color = COLORS.body,
    maxWidth,
    lineHeight = size * 1.45,
    maxLines = null,
  },
) {
  let lines = splitTextIntoLines(
    text,
    font,
    size,
    maxWidth,
  );

  if (maxLines && lines.length > maxLines) {
    lines = lines.slice(0, maxLines);

    const lastIndex = lines.length - 1;
    let lastLine = lines[lastIndex];

    while (
      font.widthOfTextAtSize(
        `${lastLine}...`,
        size,
      ) > maxWidth &&
      lastLine.length > 1
    ) {
      lastLine = lastLine.slice(0, -1);
    }

    lines[lastIndex] = `${lastLine}...`;
  }

  lines.forEach((line, index) => {
    page.drawText(line, {
      x,
      y: y - index * lineHeight,
      font,
      size,
      color,
    });
  });

  return {
    lines,
    height: Math.max(
      lineHeight,
      lines.length * lineHeight,
    ),
    bottomY:
      y -
      Math.max(
        0,
        lines.length - 1,
      ) *
        lineHeight,
  };
}

function fitTextSize(
  text,
  font,
  preferredSize,
  maxWidth,
  minimumSize = 7,
) {
  let size = preferredSize;

  while (
    size > minimumSize &&
    font.widthOfTextAtSize(text, size) >
      maxWidth
  ) {
    size -= 0.5;
  }

  return size;
}

function drawFooter(
  page,
  pageNumber,
  fonts,
) {
  const { regularFont } = fonts;

  page.drawLine({
    start: {
      x: MARGIN,
      y: 46,
    },
    end: {
      x: PAGE_WIDTH - MARGIN,
      y: 46,
    },
    thickness: 0.6,
    color: COLORS.line,
  });

  page.drawText("Website Audit Report", {
    x: MARGIN,
    y: FOOTER_Y,
    size: 7.5,
    font: regularFont,
    color: COLORS.muted,
  });

  const pageText = `Page ${pageNumber}`;
  const pageTextWidth =
    regularFont.widthOfTextAtSize(pageText, 7.5);

  page.drawText(pageText, {
    x: PAGE_WIDTH / 2 - pageTextWidth / 2,
    y: FOOTER_Y,
    size: 7.5,
    font: regularFont,
    color: COLORS.muted,
  });

  const siteText = "zorawebdesign.com";
  const siteTextWidth =
    regularFont.widthOfTextAtSize(siteText, 7.5);

  page.drawText(siteText, {
    x: PAGE_WIDTH - MARGIN - siteTextWidth,
    y: FOOTER_Y,
    size: 7.5,
    font: regularFont,
    color: COLORS.muted,
  });
}

function drawPageHeader(
  page,
  {
    kicker,
    title,
    pageNumber,
    fonts,
    iconType = "document",
  },
) {
  const { regularFont, boldFont } = fonts;

  drawIcon(
    page,
    iconType,
    MARGIN,
    PAGE_HEIGHT - 68,
    22,
    COLORS.ink,
  );

  page.drawText(kicker.toUpperCase(), {
    x: MARGIN + 34,
    y: PAGE_HEIGHT - 55,
    size: 8.5,
    font: boldFont,
    color: COLORS.muted,
  });

  drawWrappedText(page, title, {
    x: MARGIN + 34,
    y: PAGE_HEIGHT - 80,
    font: boldFont,
    size: 21,
    color: COLORS.ink,
    maxWidth: CONTENT_WIDTH - 34,
    lineHeight: 24,
    maxLines: 2,
  });

  page.drawLine({
    start: {
      x: MARGIN,
      y: PAGE_HEIGHT - 112,
    },
    end: {
      x: PAGE_WIDTH - MARGIN,
      y: PAGE_HEIGHT - 112,
    },
    thickness: 0.8,
    color: COLORS.line,
  });

  drawFooter(page, pageNumber, fonts);

  return PAGE_HEIGHT - 138;
}

function addStandardPage(
  pdfDocument,
  {
    kicker,
    title,
    pageNumber,
    fonts,
    iconType,
    background = COLORS.white,
  },
) {
  const page = patchPageLocalization(
    pdfDocument.addPage([PAGE_WIDTH, PAGE_HEIGHT]),
  );

  page.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: background,
  });

  const startY = drawPageHeader(page, {
    kicker,
    title,
    pageNumber,
    fonts,
    iconType,
  });

  return {
    page,
    y: startY,
  };
}

function drawIcon(
  page,
  type,
  x,
  y,
  size,
  color = COLORS.ink,
) {
  const lineWidth = 1.7;

  if (type === "performance") {
    page.drawLine({
      start: { x: x + size * 0.55, y: y + size },
      end: { x: x + size * 0.25, y: y + size * 0.48 },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: { x: x + size * 0.25, y: y + size * 0.48 },
      end: { x: x + size * 0.55, y: y + size * 0.48 },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: { x: x + size * 0.55, y: y + size * 0.48 },
      end: { x: x + size * 0.38, y },
      thickness: lineWidth,
      color,
    });

   page.drawLine({
  start: {
    x: x + size * 0.38,
    y: y,
  },
  end: {
    x: x + size * 0.78,
    y: y + size * 0.58,
  },
  thickness: lineWidth,
  color,
});

page.drawLine({
  start: {
    x: x + size * 0.78,
    y: y + size * 0.58,
  },
  end: {
    x: x + size * 0.51,
    y: y + size * 0.58,
  },
  thickness: lineWidth,
  color,
});

return;
  }

  if (type === "search") {
    page.drawCircle({
      x: x + size * 0.4,
      y: y + size * 0.62,
      size: size * 0.28,
      borderWidth: lineWidth,
      borderColor: color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.6,
        y: y + size * 0.4,
      },
      end: {
        x: x + size * 0.9,
        y: y + size * 0.1,
      },
      thickness: lineWidth,
      color,
    });

    return;
  }

  if (type === "security") {
    page.drawRectangle({
      x: x + size * 0.2,
      y: y + size * 0.18,
      width: size * 0.6,
      height: size * 0.58,
      borderWidth: lineWidth,
      borderColor: color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.33,
        y: y + size * 0.77,
      },
      end: {
        x: x + size * 0.33,
        y: y + size * 0.9,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.67,
        y: y + size * 0.77,
      },
      end: {
        x: x + size * 0.67,
        y: y + size * 0.9,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.33,
        y: y + size * 0.9,
      },
      end: {
        x: x + size * 0.67,
        y: y + size * 0.9,
      },
      thickness: lineWidth,
      color,
    });

    return;
  }

  if (type === "accessibility") {
    page.drawCircle({
      x: x + size * 0.5,
      y: y + size * 0.82,
      size: size * 0.11,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.5,
        y: y + size * 0.68,
      },
      end: {
        x: x + size * 0.5,
        y: y + size * 0.3,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.2,
        y: y + size * 0.58,
      },
      end: {
        x: x + size * 0.8,
        y: y + size * 0.58,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.5,
        y: y + size * 0.3,
      },
      end: {
        x: x + size * 0.25,
        y,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.5,
        y: y + size * 0.3,
      },
      end: {
        x: x + size * 0.75,
        y,
      },
      thickness: lineWidth,
      color,
    });

    return;
  }

  if (type === "image") {
    page.drawRectangle({
      x: x + size * 0.1,
      y: y + size * 0.12,
      width: size * 0.8,
      height: size * 0.72,
      borderWidth: lineWidth,
      borderColor: color,
    });

    page.drawCircle({
      x: x + size * 0.68,
      y: y + size * 0.65,
      size: size * 0.08,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.18,
        y: y + size * 0.24,
      },
      end: {
        x: x + size * 0.42,
        y: y + size * 0.53,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.42,
        y: y + size * 0.53,
      },
      end: {
        x: x + size * 0.58,
        y: y + size * 0.36,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.58,
        y: y + size * 0.36,
      },
      end: {
        x: x + size * 0.82,
        y: y + size * 0.58,
      },
      thickness: lineWidth,
      color,
    });

    return;
  }

  if (type === "ai") {
    page.drawRectangle({
      x: x + size * 0.18,
      y: y + size * 0.18,
      width: size * 0.64,
      height: size * 0.64,
      borderWidth: lineWidth,
      borderColor: color,
    });

    for (const offset of [0.3, 0.5, 0.7]) {
      page.drawLine({
        start: {
          x: x,
          y: y + size * offset,
        },
        end: {
          x: x + size * 0.18,
          y: y + size * offset,
        },
        thickness: lineWidth,
        color,
      });

      page.drawLine({
        start: {
          x: x + size * 0.82,
          y: y + size * offset,
        },
        end: {
          x: x + size,
          y: y + size * offset,
        },
        thickness: lineWidth,
        color,
      });
    }

    page.drawCircle({
      x: x + size * 0.5,
      y: y + size * 0.5,
      size: size * 0.12,
      borderWidth: lineWidth,
      borderColor: color,
    });

    return;
  }

  if (type === "roadmap") {
    page.drawCircle({
      x: x + size * 0.25,
      y: y + size * 0.75,
      size: size * 0.08,
      color,
    });

    page.drawCircle({
      x: x + size * 0.5,
      y: y + size * 0.5,
      size: size * 0.08,
      color,
    });

    page.drawCircle({
      x: x + size * 0.75,
      y: y + size * 0.25,
      size: size * 0.08,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.31,
        y: y + size * 0.69,
      },
      end: {
        x: x + size * 0.44,
        y: y + size * 0.56,
      },
      thickness: lineWidth,
      color,
    });

    page.drawLine({
      start: {
        x: x + size * 0.56,
        y: y + size * 0.44,
      },
      end: {
        x: x + size * 0.69,
        y: y + size * 0.31,
      },
      thickness: lineWidth,
      color,
    });

    return;
  }

  page.drawRectangle({
    x: x + size * 0.18,
    y: y + size * 0.1,
    width: size * 0.64,
    height: size * 0.8,
    borderWidth: lineWidth,
    borderColor: color,
  });

  page.drawLine({
    start: {
      x: x + size * 0.3,
      y: y + size * 0.68,
    },
    end: {
      x: x + size * 0.7,
      y: y + size * 0.68,
    },
    thickness: lineWidth,
    color,
  });

  page.drawLine({
    start: {
      x: x + size * 0.3,
      y: y + size * 0.5,
    },
    end: {
      x: x + size * 0.7,
      y: y + size * 0.5,
    },
    thickness: lineWidth,
    color,
  });

  page.drawLine({
    start: {
      x: x + size * 0.3,
      y: y + size * 0.32,
    },
    end: {
      x: x + size * 0.58,
      y: y + size * 0.32,
    },
    thickness: lineWidth,
    color,
  });
}

function drawScoreCard(
  page,
  {
    x,
    y,
    width,
    height = 120,
    label,
    score,
    description,
    iconType,
    fonts,
  },
) {
  const { regularFont, boldFont } = fonts;
  const scoreColor = getScoreColor(score);
  const backgroundColor =
    getScoreBackgroundColor(score);

  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: backgroundColor,
    borderWidth: 1,
    borderColor: scoreColor,
  });

  drawIcon(
    page,
    iconType,
    x + 14,
    y + height - 34,
    18,
    scoreColor,
  );

  page.drawText(label.toUpperCase(), {
    x: x + 42,
    y: y + height - 24,
    size: 8,
    font: boldFont,
    color: COLORS.muted,
  });

  const scoreText =
    score === null ? "N/A" : String(score);

  page.drawText(scoreText, {
    x: x + 14,
    y: y + height - 72,
    size: score === null ? 24 : 30,
    font: boldFont,
    color: scoreColor,
  });

  if (score !== null) {
    page.drawText("/100", {
      x: x + 62,
      y: y + height - 66,
      size: 8,
      font: regularFont,
      color: COLORS.muted,
    });
  }

  page.drawText(getScoreStatus(score), {
    x: x + 14,
    y: y + 30,
    size: 8.5,
    font: boldFont,
    color: scoreColor,
  });

  drawWrappedText(page, description, {
    x: x + 14,
    y: y + 16,
    font: regularFont,
    size: 7.5,
    color: COLORS.muted,
    maxWidth: width - 28,
    lineHeight: 10,
    maxLines: 2,
  });
}

function drawProgressBar(
  page,
  {
    x,
    y,
    width,
    score,
    height = 7,
  },
) {
  const normalized =
    score === null ? 0 : score;

  page.drawRectangle({
    x,
    y,
    width,
    height,
    color: COLORS.line,
  });

  if (normalized > 0) {
    page.drawRectangle({
      x,
      y,
      width: width * (normalized / 100),
      height,
      color: getScoreColor(score),
    });
  }
}

function drawMetricRow(
  page,
  {
    x,
    y,
    width,
    label,
    value,
    status,
    fonts,
  },
) {
  const { regularFont, boldFont } = fonts;

  page.drawLine({
    start: { x, y: y - 8 },
    end: { x: x + width, y: y - 8 },
    thickness: 0.5,
    color: COLORS.line,
  });

  page.drawText(label, {
    x,
    y,
    size: 9,
    font: boldFont,
    color: COLORS.ink,
  });

  const valueText = safeText(value);
  const valueWidth =
    regularFont.widthOfTextAtSize(
      valueText,
      9,
    );

  page.drawText(valueText, {
    x: x + width * 0.52 - valueWidth / 2,
    y,
    size: 9,
    font: regularFont,
    color: COLORS.body,
  });

  const statusText = safeText(status);
  const statusWidth =
    boldFont.widthOfTextAtSize(
      statusText,
      8.5,
    );

  page.drawText(statusText, {
    x: x + width - statusWidth,
    y,
    size: 8.5,
    font: boldFont,
    color:
      /^(good|gut)$/i.test(statusText)
        ? COLORS.good
        : /(attention|optimierungsbedarf|hinweis)/i.test(statusText)
          ? COLORS.medium
          : COLORS.poor,
  });
}

function drawSectionTitle(
  page,
  {
    title,
    subtitle,
    x,
    y,
    width,
    fonts,
  },
) {
  const { regularFont, boldFont } = fonts;

  page.drawText(title.toUpperCase(), {
    x,
    y,
    size: 10,
    font: boldFont,
    color: COLORS.ink,
  });

  const subtitleResult = drawWrappedText(
    page,
    subtitle,
    {
      x,
      y: y - 18,
      font: regularFont,
      size: 9,
      color: COLORS.muted,
      maxWidth: width,
      lineHeight: 13,
      maxLines: 3,
    },
  );

  return subtitleResult.bottomY - 20;
}

function drawInfoBox(
  page,
  {
    x,
    y,
    width,
    title,
    body,
    tone = "neutral",
    fonts,
    iconType = "document",
  },
) {
  const { regularFont, boldFont } = fonts;

  const toneColor =
    tone === "good"
      ? COLORS.good
      : tone === "medium"
        ? COLORS.medium
        : tone === "poor"
          ? COLORS.poor
          : COLORS.neutral;

  const toneBackground =
    tone === "good"
      ? COLORS.goodSoft
      : tone === "medium"
        ? COLORS.mediumSoft
        : tone === "poor"
          ? COLORS.poorSoft
          : COLORS.neutralSoft;

  const bodyLines = splitTextIntoLines(
    body,
    regularFont,
    9,
    width - 54,
  );

  const height = Math.max(
    72,
    48 + bodyLines.length * 13,
  );

  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: toneBackground,
    borderWidth: 1,
    borderColor: toneColor,
  });

  drawIcon(
    page,
    iconType,
    x + 14,
    y - 34,
    18,
    toneColor,
  );

  page.drawText(title, {
    x: x + 43,
    y: y - 22,
    size: 9.5,
    font: boldFont,
    color: toneColor,
  });

  drawWrappedText(page, body, {
    x: x + 43,
    y: y - 42,
    font: regularFont,
    size: 9,
    color: COLORS.body,
    maxWidth: width - 57,
    lineHeight: 13,
  });

  return {
    height,
    bottomY: y - height,
  };
}

function getW3cValidation(result) {
  return (
    result?.w3cValidation ||
    result?.sections?.accessibilityTruthCheck ||
    result?.sections?.tools?.w3cValidation ||
    result?.checks?.w3cValidation ||
    null
  );
}

function getSeoScore(result) {
  const w3c = getW3cValidation(result);

  return averageScores([
    normalizeScore(result?.summary?.title),
    normalizeScore(
      result?.summary?.description,
    ),
    normalizeScore(result?.checks?.headings),
    normalizeScore(
      result?.sections?.seoAdvanced?.score ||
        result?.checks?.seoAdvanced?.score,
    ),
    normalizeScore(w3c?.score),
  ]);
}

function getAccessibilityScore(result) {
  return (
    normalizeScore(
      result?.pageSpeed?.desktop?.scores
        ?.accessibility?.value,
    ) ||
    normalizeScore(
      result?.sections?.semanticAccessibility
        ?.score,
    ) ||
    normalizeScore(
      result?.checks?.accessibility,
    )
  );
}

function getConversionScore(result) {
  return averageScores([
    normalizeScore(result?.checks?.links),
    normalizeScore(result?.checks?.social),
    normalizeScore(
      result?.summary?.description,
    ),
    normalizeScore(
      result?.sections?.content?.score,
    ),
  ]);
}

function getImageFormatSummary(result) {
  const images = result?.checks?.images || {};

  const backendFormats =
    images?.formats ||
    result?.sections?.images?.formats ||
    result?.sections?.coreVitals
      ?.imageFormats ||
    null;

  if (backendFormats) {
    return {
      total:
        backendFormats.total ||
        images.total ||
        0,
      modern:
        backendFormats.modern || 0,
      legacy:
        backendFormats.legacy || 0,
      counts:
        backendFormats.counts || {},
    };
  }

  const sources = [
    ...(images?.all || []),
    ...(images?.missingAlt || []),
    ...(images?.missingDimensions || []),
  ];

  const counts = {
    webp: 0,
    avif: 0,
    jpg: 0,
    jpeg: 0,
    png: 0,
    svg: 0,
    unknown: 0,
  };

  for (const image of sources) {
    const src =
      typeof image === "string"
        ? image
        : image?.src || "";

    const clean = src
      .split("?")[0]
      .toLowerCase();

    const match = clean.match(
      /\.([a-z0-9]+)$/,
    );

    const ext = match?.[1] || "unknown";
    counts[ext] =
      (counts[ext] || 0) + 1;
  }

  const total = Object.values(counts).reduce(
    (sum, value) => sum + value,
    0,
  );

  const modern =
    (counts.webp || 0) +
    (counts.avif || 0);

  const legacy =
    (counts.jpg || 0) +
    (counts.jpeg || 0) +
    (counts.png || 0);

  return {
    total,
    modern,
    legacy,
    counts,
  };
}

function parseMetricNumber(rawValue) {
  if (typeof rawValue === "number") {
    return rawValue;
  }

  const match = String(rawValue || "").match(
    /-?\d+(\.\d+)?/,
  );

  return match ? Number(match[0]) : null;
}

function getMetricStatus(metric, rawValue) {
  const value = parseMetricNumber(rawValue);

  if (
    value === null ||
    Number.isNaN(value)
  ) {
    return "Not available";
  }

  if (metric === "FCP") {
    if (value <= 1.8) return "Good";
    if (value <= 3) return "Needs attention";
    return "Poor";
  }

  if (metric === "LCP") {
    if (value <= 2.5) return "Good";
    if (value <= 4) return "Needs attention";
    return "Poor";
  }

  if (metric === "CLS") {
    if (value <= 0.1) return "Good";
    if (value <= 0.25) return "Needs attention";
    return "Poor";
  }

  if (metric === "TBT") {
    if (value <= 200) return "Good";
    if (value <= 600) return "Needs attention";
    return "Poor";
  }

  if (metric === "Speed Index") {
    if (value <= 3.4) return "Good";
    if (value <= 5.8)
      return "Needs attention";
    return "Poor";
  }

  return "Not available";
}

function getStrengths(result) {
  const items = [];

  const overallScore = normalizeScore(
    result?.overallScore,
  );

  const securityScore = normalizeScore(
    result?.checks?.security?.score ||
      result?.checks?.security,
  );

  const headingCounts =
    result?.checks?.headings?.counts || {};

  const structuredBlocks =
    result?.sections?.structuredData
      ?.validBlocks || 0;

  if ((overallScore ?? 0) >= 80) {
    items.push(
      "The website has a strong overall technical baseline.",
    );
  }

  if ((securityScore ?? 0) >= 75) {
    items.push(
      "Browser trust and security signals are above average.",
    );
  }

  if ((headingCounts.h1 || 0) === 1) {
    items.push(
      "A single primary H1 supports search clarity.",
    );
  }

  if (structuredBlocks > 0) {
    items.push(
      "Structured data improves machine-readable context.",
    );
  }

  if (!items.length) {
    items.push(
      "The site has a measurable foundation that can be improved systematically.",
    );
  }

  return items.slice(0, 3);
}

function getWeaknesses(result) {
  const items = [];

  const googleScore = normalizeScore(
    result?.googleScore,
  );

  const imageIssues =
    result?.checks?.images
      ?.missingAltCount || 0;

  const sitemapMissing =
    !result?.summary?.files?.sitemapXml
      ?.found;

  const w3c = getW3cValidation(result);

  const securityHeaders = Array.isArray(
    result?.checks?.security?.headers,
  )
    ? result.checks.security.headers.filter(
        (header) => !header?.found,
      ).length
    : 0;

  if ((googleScore ?? 100) < 75) {
    items.push(
      "Performance gaps may reduce mobile usability and conversion quality.",
    );
  }

  if (imageIssues > 0) {
    items.push(
      `${imageIssues} meaningful image${imageIssues === 1 ? "" : "s"} are missing ALT text.`,
    );
  }

  if (sitemapMissing) {
    items.push(
      "A missing sitemap can reduce crawl efficiency.",
    );
  }

  if ((w3c?.criticalErrors || 0) > 0) {
    items.push(
      "HTML validation errors suggest shared template-level issues.",
    );
  }

  if (securityHeaders >= 2) {
    items.push(
      "Several recommended browser hardening headers are missing.",
    );
  }

  if (!items.length) {
    items.push(
      "No major critical weakness dominated the audit.",
    );
  }

  return items.slice(0, 3);
}

function buildRecommendations(result) {
  const items = [];

  const googleScore = normalizeScore(
    result?.googleScore,
  );

  const w3c = getW3cValidation(result);
  const imageFormats =
    getImageFormatSummary(result);

  const securityHeaders = Array.isArray(
    result?.checks?.security?.headers,
  )
    ? result.checks.security.headers.filter(
        (header) => !header?.found,
      )
    : [];

  const aiScore = normalizeScore(
    result?.sections?.aiReadiness?.score ||
      result?.checks?.aiReadiness?.score,
  );

  if ((googleScore ?? 100) < 80) {
    items.push({
      title: "Improve page speed",
      why: `The PageSpeed score is ${googleScore ?? "not available"}.`,
      action:
        "Reduce render-blocking assets, compress heavy media and improve caching.",
      effort: "2-4 hours",
      priority: "high",
    });
  }

  if ((w3c?.criticalErrors || 0) > 0) {
    items.push({
      title:
        "Fix repeated HTML validation issues",
      why: `${w3c.criticalErrors} critical validation error${w3c.criticalErrors === 1 ? "" : "s"} were detected.`,
      action:
        "Correct the shared component or template output producing repeated errors.",
      effort: "1-2 days",
      priority: "high",
    });
  }

  if (
    !result?.summary?.files?.sitemapXml
      ?.found
  ) {
    items.push({
      title: "Add sitemap.xml",
      why:
        "Search engines have less direct guidance for discovering important pages.",
      action:
        "Generate a sitemap and submit it through Google Search Console.",
      effort: "30-90 minutes",
      priority: "medium",
    });
  }

  if (!result?.summary?.title?.value) {
    items.push({
      title: "Add a unique page title",
      why:
        "The page title is missing or unavailable.",
      action:
        "Write a concise title that matches the page intent and search topic.",
      effort: "30-60 minutes",
      priority: "high",
    });
  }

  if (
    !result?.summary?.description?.value
  ) {
    items.push({
      title: "Add a meta description",
      why:
        "The page description is missing.",
      action:
        "Write a concise description that reflects user intent and value.",
      effort: "30-60 minutes",
      priority: "medium",
    });
  }

  if (
    (result?.checks?.images
      ?.missingAltCount || 0) > 0
  ) {
    const count =
      result.checks.images.missingAltCount;

    items.push({
      title: "Add image ALT text",
      why: `${count} meaningful image${count === 1 ? "" : "s"} are missing ALT text.`,
      action:
        "Add short descriptions and keep decorative images empty with alt=\"\".",
      effort: "30-90 minutes",
      priority: "medium",
    });
  }

  if (imageFormats.legacy > 0) {
    items.push({
      title:
        "Convert key images to WebP or AVIF",
      why: `${imageFormats.legacy} legacy JPG or PNG asset${imageFormats.legacy === 1 ? "" : "s"} were detected.`,
      action:
        "Convert large photographic images first and use responsive sizes.",
      effort: "2-4 hours",
      priority: "medium",
    });
  }

  if (securityHeaders.length > 0) {
    items.push({
      title:
        "Add recommended security headers",
      why: `${securityHeaders.length} recommended browser hardening header${securityHeaders.length === 1 ? "" : "s"} are missing.`,
      action:
        "Start with HSTS, CSP, X-Content-Type-Options and Referrer-Policy.",
      effort: "2-4 hours",
      priority: "high",
    });
  }

  if ((aiScore ?? 100) < 70) {
    items.push({
      title:
        "Strengthen AI-readiness signals",
      why: `AI readiness is currently ${aiScore ?? "not available"}.`,
      action:
        "Improve schema, headings, entity clarity and internal linking.",
      effort: "Longer-term",
      priority: "low",
    });
  }

  if (!items.length) {
    items.push({
      title:
        "Continue monitoring technical quality",
      why:
        "No major critical issue dominated the audit.",
      action:
        "Repeat the audit after significant content or development changes.",
      effort: "Ongoing",
      priority: "low",
    });
  }

  return items.slice(0, 10);
}

function getPriorityTone(priority) {
  if (priority === "high") {
    return {
      color: COLORS.poor,
      background: COLORS.poorSoft,
      label: "HIGH",
    };
  }

  if (priority === "medium") {
    return {
      color: COLORS.medium,
      background: COLORS.mediumSoft,
      label: "MEDIUM",
    };
  }

  return {
    color: COLORS.good,
    background: COLORS.goodSoft,
    label: "LOW",
  };
}

function drawRecommendationCard(
  page,
  {
    x,
    y,
    width,
    item,
    fonts,
  },
) {
  const { regularFont, boldFont } = fonts;
  const tone = getPriorityTone(
    item.priority,
  );

  const whyLines = splitTextIntoLines(
    item.why,
    regularFont,
    8.5,
    width - 30,
  );

  const actionLines = splitTextIntoLines(
    item.action,
    regularFont,
    8.5,
    width - 30,
  );

  const height =
  95 +
  (whyLines.length + actionLines.length) * 13;

  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: tone.background,
    borderWidth: 1,
    borderColor: tone.color,
  });

  page.drawRectangle({
    x: x + 14,
    y: y - 25,
    width: 48,
    height: 16,
    color: tone.color,
  });

  page.drawText(tone.label, {
    x: x + 20,
    y: y - 20,
    size: 7,
    font: boldFont,
    color: COLORS.white,
  });

  page.drawText(item.title, {
    x: x + 74,
    y: y - 21,
    size: 10,
    font: boldFont,
    color: COLORS.ink,
  });

  page.drawText("WHY", {
  x: x + 14,
  y: y - 48,
  size: 7,
  font: boldFont,
  color: tone.color,
});

drawWrappedText(page, item.why, {
  x: x + 14,
  y: y - 66,          // was 62
  size: 8.5,
  font: regularFont,
  color: COLORS.body,
  maxWidth: width - 28,
  lineHeight: 13,     // was 11
});

const actionStartY =
  y -
  66 -
  whyLines.length * 13 -
  20;                 // was 10

page.drawText("ACTION", {
  x: x + 14,
  y: actionStartY,
  size: 7,
  font: boldFont,
  color: tone.color,
});

drawWrappedText(page, item.action, {
  x: x + 14,
  y: actionStartY - 18,   // was 14
  size: 8.5,
  font: regularFont,
  color: COLORS.body,
  maxWidth: width - 28,
  lineHeight: 13,         // was 11
});

  return {
    height,
    bottomY: y - height,
  };
}


function getHeadingDetailItems(result) {
  const headings = Array.isArray(
    result?.checks?.headings?.headings,
  )
    ? result.checks.headings.headings
    : [];

  return headings.map((heading, index) => ({
    badge: `H${heading?.level || "?"}`,
    title: safeText(
      heading?.text,
      "(empty heading text)",
    ),
    meta: `Heading ${index + 1}`,
    tone:
      Number(heading?.level) === 1
        ? "good"
        : "neutral",
  }));
}

function getLinkDetailItems(result) {
  const links = Array.isArray(
    result?.checks?.links?.items,
  )
    ? result.checks.links.items
    : [];

  return links.map((link, index) => {
    const href = safeText(
      link?.href,
      "Missing href",
    );

    const text = safeText(
      link?.text,
      "No readable link text",
    );

    const hasProblem =
      Boolean(link?.isEmpty) ||
      text === "No readable link text";

    return {
      badge: hasProblem ? "ISSUE" : "LINK",
      title: text,
      meta: href,
      tone: hasProblem ? "poor" : "neutral",
      index: index + 1,
    };
  });
}

function getImageDetailItems(result) {
  const images = result?.checks?.images || {};

  const sources = [
    ...(Array.isArray(images?.all)
      ? images.all
      : []),
    ...(Array.isArray(images?.missingAlt)
      ? images.missingAlt
      : []),
    ...(Array.isArray(images?.missingDimensions)
      ? images.missingDimensions
      : []),
  ];

  const uniqueImages = new Map();

  for (const image of sources) {
    const src =
      typeof image === "string"
        ? image
        : image?.src || image?.url || "";

    if (!src) continue;

    const existing =
      uniqueImages.get(src) || {};

    uniqueImages.set(src, {
      ...existing,
      ...(typeof image === "object" ? image : {}),
      src,
    });
  }

  return [...uniqueImages.values()].map(
    (image, index) => {
      const alt =
        image?.alt === ""
          ? "Decorative image — empty ALT"
          : safeText(
              image?.alt,
              "Missing ALT text",
            );

      const hasMissingAlt =
        image?.alt === undefined ||
        image?.alt === null;

      const hasDimensions =
        Boolean(image?.width) &&
        Boolean(image?.height);

      const statusParts = [
        hasMissingAlt
          ? "ALT missing"
          : "ALT available",
        hasDimensions
          ? `${image.width} × ${image.height}`
          : "Dimensions unavailable",
      ];

      return {
        badge: hasMissingAlt
          ? "ISSUE"
          : "IMAGE",
        title: alt,
        meta: safeText(
          image?.src,
          `Image ${index + 1}`,
        ),
        secondary: statusParts.join(" • "),
        tone: hasMissingAlt
          ? "poor"
          : "neutral",
      };
    },
  );
}

function drawDetailItem(
  page,
  {
    x,
    y,
    width,
    item,
    fonts,
    compact = false,
  },
) {
  const { regularFont, boldFont } = fonts;

  const toneColor =
    item.tone === "poor"
      ? COLORS.poor
      : item.tone === "good"
        ? COLORS.good
        : COLORS.neutral;

  const toneBackground =
    item.tone === "poor"
      ? COLORS.poorSoft
      : item.tone === "good"
        ? COLORS.goodSoft
        : COLORS.soft;

  const horizontalPadding = compact ? 12 : 14;
  const topPadding = compact ? 12 : 14;
  const bottomPadding = compact ? 14 : 16;

  const badgeHeight = 16;
  const badgeBottomGap = compact ? 12 : 14;

  const titleSize = compact ? 8 : 9;
  const titleLineHeight = compact ? 10 : 12;

  const metaSize = compact ? 6.8 : 7.5;
  const metaLineHeight = compact ? 9 : 10;

  const textWidth =
    width - horizontalPadding * 2;

  const titleText = safeText(
    item.title,
    "Not available",
  );

  const metaText = safeText(
    item.meta,
    "Not available",
  );

  const secondaryText = item.secondary
    ? safeText(item.secondary, "")
    : "";

  const titleLines = splitTextIntoLines(
    titleText,
    boldFont,
    titleSize,
    textWidth,
  );

  const metaLines = splitTextIntoLines(
    metaText,
    regularFont,
    metaSize,
    textWidth,
  );

  const secondaryLines = secondaryText
    ? splitTextIntoLines(
        secondaryText,
        regularFont,
        metaSize,
        textWidth,
      )
    : [];

  const titleHeight =
    Math.max(1, titleLines.length) *
    titleLineHeight;

  const metaHeight =
    Math.max(1, metaLines.length) *
    metaLineHeight;

  const secondaryHeight =
    secondaryLines.length *
    metaLineHeight;

  const titleMetaGap = compact ? 8 : 10;

  const secondaryGap = secondaryLines.length
    ? compact
      ? 8
      : 10
    : 0;

  const height =
    topPadding +
    badgeHeight +
    badgeBottomGap +
    titleHeight +
    titleMetaGap +
    metaHeight +
    secondaryGap +
    secondaryHeight +
    bottomPadding;

  page.drawRectangle({
    x,
    y: y - height,
    width,
    height,
    color: toneBackground,
    borderWidth: 1,
    borderColor: toneColor,
  });

  const badgeText = safeText(
    item.badge,
    "INFO",
  );

  const badgeWidth = Math.max(
    38,
    boldFont.widthOfTextAtSize(
      badgeText,
      7,
    ) + 16,
  );

  const badgeY =
    y - topPadding - badgeHeight;

  page.drawRectangle({
    x: x + horizontalPadding,
    y: badgeY,
    width: badgeWidth,
    height: badgeHeight,
    color: toneColor,
  });

  page.drawText(badgeText, {
    x: x + horizontalPadding + 8,
    y: badgeY + 5,
    size: 7,
    font: boldFont,
    color: COLORS.white,
  });

  const titleY =
    badgeY - badgeBottomGap;

  drawWrappedText(page, titleText, {
    x: x + horizontalPadding,
    y: titleY,
    font: boldFont,
    size: titleSize,
    color: COLORS.ink,
    maxWidth: textWidth,
    lineHeight: titleLineHeight,
  });

  const metaY =
    titleY -
    titleHeight -
    titleMetaGap;

  drawWrappedText(page, metaText, {
    x: x + horizontalPadding,
    y: metaY,
    font: regularFont,
    size: metaSize,
    color: COLORS.muted,
    maxWidth: textWidth,
    lineHeight: metaLineHeight,
  });

  if (secondaryLines.length) {
    const secondaryY =
      metaY -
      metaHeight -
      secondaryGap;

    drawWrappedText(
      page,
      secondaryText,
      {
        x: x + horizontalPadding,
        y: secondaryY,
        font: regularFont,
        size: metaSize,
        color: toneColor,
        maxWidth: textWidth,
        lineHeight: metaLineHeight,
      },
    );
  }

  return {
    height,
    bottomY: y - height,
  };
}

function addDetailPages(
  pdfDocument,
  {
    items,
    kicker,
    title,
    pageNumber,
    fonts,
    iconType,
    emptyMessage,
  },
) {
  let currentPageNumber = pageNumber;

  let pageData = addStandardPage(
    pdfDocument,
    {
      kicker,
      title,
      pageNumber: currentPageNumber,
      fonts,
      iconType,
    },
  );

  let page = pageData.page;
  let currentY = pageData.y;

  const columnGap = 12;
  const columnWidth =
    (CONTENT_WIDTH - columnGap) / 2;

  let column = 0;
  let leftY = currentY;
  let rightY = currentY;

  const displayedItems = items.length
    ? items
    : [
        {
          badge: "INFO",
          title: emptyMessage,
          meta: "No additional details were returned.",
          tone: "neutral",
        },
      ];

  for (const item of displayedItems) {
    const titleLines = splitTextIntoLines(
      item.title,
      fonts.boldFont,
      8,
      columnWidth - 24,
    ).length;

    const metaLines = splitTextIntoLines(
      item.meta,
      fonts.regularFont,
      6.8,
      columnWidth - 24,
    ).length;

    const secondaryLines = item.secondary
      ? splitTextIntoLines(
          item.secondary,
          fonts.regularFont,
          6.8,
          columnWidth - 24,
        ).length
      : 0;

    const estimatedHeight =
      42 +
      titleLines * 10 +
      metaLines * 8 +
      secondaryLines * 8;

    let targetY = column === 0 ? leftY : rightY;

    if (
      targetY - estimatedHeight <
      CONTENT_BOTTOM
    ) {
      if (column === 0) {
        column = 1;
        targetY = rightY;
      } else {
        currentPageNumber += 1;

        pageData = addStandardPage(
          pdfDocument,
          {
            kicker,
            title: `${title} continued`,
            pageNumber: currentPageNumber,
            fonts,
            iconType,
          },
        );

        page = pageData.page;
        leftY = pageData.y;
        rightY = pageData.y;
        column = 0;
        targetY = leftY;
      }
    }

    const x =
      column === 0
        ? MARGIN
        : MARGIN + columnWidth + columnGap;

    const row = drawDetailItem(page, {
      x,
      y: targetY,
      width: columnWidth,
      item,
      fonts,
      compact: true,
    });

    if (column === 0) {
      leftY = row.bottomY - 8;

      if (
        leftY - estimatedHeight <
        CONTENT_BOTTOM
      ) {
        column = 1;
      }
    } else {
      rightY = row.bottomY - 8;
    }
  }

  return currentPageNumber;
}

export async function generateAuditPdf({
  result,
  websiteUrl,
  clientName,
  generatedAt,
  language = "de",
}) {
  ACTIVE_PDF_LANGUAGE = language === "de" ? "de" : "en";
  const t = PDF_TEXT[ACTIVE_PDF_LANGUAGE] || PDF_TEXT.de;

  if (!result) {
    throw new Error(
      language === "de"
        ? "Das PDF kann nicht erstellt werden, weil kein Audit-Ergebnis verfügbar ist."
        : "The PDF cannot be generated because no audit result is available.",
    );
  }

  const pdfDocument =
    await PDFDocument.create();

  const regularFont =
    await pdfDocument.embedFont(
      StandardFonts.Helvetica,
    );

  const boldFont =
    await pdfDocument.embedFont(
      StandardFonts.HelveticaBold,
    );

  const fonts = {
    regularFont,
    boldFont,
  };

  const overallScore = normalizeScore(
    result?.overallScore,
  );

  const googleScore = normalizeScore(
    result?.googleScore,
  );

  const localScore = normalizeScore(
    result?.localScore,
  );

  const seoScore = getSeoScore(result);

  const securityScore = normalizeScore(
    result?.checks?.security?.score ||
      result?.checks?.security,
  );

  const accessibilityScore =
    getAccessibilityScore(result);

  const conversionScore =
    getConversionScore(result);

  const aiReadinessScore = normalizeScore(
    result?.sections?.aiReadiness?.score ||
      result?.checks?.aiReadiness?.score,
  );

  const grade = getGrade(overallScore);
  const scoreColor =
    getScoreColor(overallScore);

  const summary = result?.summary || {};
  const w3c = getW3cValidation(result);
  const images = result?.checks?.images || {};
  const imageFormats =
    getImageFormatSummary(result);
  const headings =
    result?.checks?.headings || {};
  const links = result?.checks?.links || {};
  const structured =
    result?.sections?.structuredData ||
    result?.checks?.structuredData ||
    {};
  const social =
    result?.sections?.socialPreview ||
    result?.checks?.socialPreview ||
    {};
    const infrastructure =
  result?.sections?.infrastructure || {};
  const semantic =
    result?.sections
      ?.semanticAccessibility ||
    result?.checks
      ?.semanticAccessibility ||
    {};
  const technologies =
    result?.sections?.technology
      ?.technologies || [];
  const mainTechnology =
    result?.sections?.technology
      ?.mainTechnology ||
    technologies[0] ||
    null;

  const strengths = getStrengths(result);
  const weaknesses =
    getWeaknesses(result);
  const recommendations =
    buildRecommendations(result);

    const headingDetailItems =
  getHeadingDetailItems(result);

const linkDetailItems =
  getLinkDetailItems(result);

const imageDetailItems =
  getImageDetailItems(result);

  const generatedDateLocale =
  language === "de" ? "de-AT" : "en-GB";

const generatedDate = generatedAt
  ? new Date(generatedAt).toLocaleString(
      generatedDateLocale,
    )
  : new Date().toLocaleString(
      generatedDateLocale,
    );

  let pageNumber = 1;

  /*
   * PAGE 1 — COVER
   */

  const cover = patchPageLocalization(
    pdfDocument.addPage([
      PAGE_WIDTH,
      PAGE_HEIGHT,
    ]),
  );

  cover.drawRectangle({
    x: 0,
    y: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT,
    color: COLORS.soft,
  });

  cover.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - 230,
    width: PAGE_WIDTH,
    height: 230,
    color: COLORS.black,
  });

  cover.drawText("ZORA WEB DESIGN", {
    x: MARGIN,
    y: PAGE_HEIGHT - 54,
    size: 10,
    font: boldFont,
    color: rgb(0.74, 0.74, 0.76),
  });

 cover.drawText(
  language === "de"
    ? "WEBSITE PERFORMANCE"
    : "WEBSITE PERFORMANCE",
    {
      x: MARGIN,
      y: PAGE_HEIGHT - 105,
      size: 26,
      font: boldFont,
      color: COLORS.white,
    },
  );

  cover.drawText("& SEO AUDIT", {
    x: MARGIN,
    y: PAGE_HEIGHT - 139,
    size: 26,
    font: boldFont,
    color: COLORS.white,
  });

  cover.drawText(
    language === "de"
  ? "Technischer Bericht zur Website-Qualität"
  : "Technical website quality report",
    {
      x: MARGIN,
      y: PAGE_HEIGHT - 171,
      size: 10,
      font: regularFont,
      color: rgb(0.68, 0.68, 0.7),
    },
  );

  const coverScoreX =
    PAGE_WIDTH - MARGIN - 120;
  const coverScoreY =
    PAGE_HEIGHT - 180;

  cover.drawRectangle({
    x: coverScoreX,
    y: coverScoreY,
    width: 120,
    height: 120,
    color: rgb(0.09, 0.09, 0.1),
    borderWidth: 1.5,
    borderColor: scoreColor,
  });

  const coverScoreText =
    overallScore === null
      ? "N/A"
      : String(overallScore);

  cover.drawText(coverScoreText, {
    x: coverScoreX + 18,
    y: coverScoreY + 61,
    size:
      overallScore === null ? 26 : 39,
    font: boldFont,
    color: scoreColor,
  });

  if (overallScore !== null) {
    cover.drawText("/100", {
      x: coverScoreX + 77,
      y: coverScoreY + 66,
      size: 9,
      font: regularFont,
      color: rgb(0.72, 0.72, 0.74),
    });
  }

  cover.drawText(
  `${language === "de" ? "BEWERTUNG" : "GRADE"} ${grade}`,
  {
    x: coverScoreX + 18,
    y: coverScoreY + 27,
    size: 9,
    font: boldFont,
    color: scoreColor,
  });

  let coverY = PAGE_HEIGHT - 280;

  cover.drawText(
  language === "de"
    ? "BERICHTSDETAILS"
    : "REPORT DETAILS",
  {
    x: MARGIN,
    y: coverY,
    size: 9,
    font: boldFont,
    color: COLORS.muted,
  });

  coverY -= 34;

  const details = [
  [t.website, safeText(websiteUrl)],
  [
    language === "de" ? "Kunde" : "Client",
    safeText(
      clientName,
      language === "de"
        ? "Nicht angegeben"
        : "Not provided",
    ),
  ],
  [t.generated, generatedDate],
  [
    language === "de"
      ? "Erstellt von"
      : "Prepared by",
    "Zora Web Design",
  ],
  [
    language === "de"
      ? "Kontakt"
      : "Contact",
    "info@zorawebdesign.com",
  ],
];

  for (const [label, value] of details) {
    cover.drawText(label.toUpperCase(), {
      x: MARGIN,
      y: coverY,
      size: 7.5,
      font: boldFont,
      color: COLORS.muted,
    });

    const detailSize = fitTextSize(
      value,
      regularFont,
      10.5,
      PAGE_WIDTH -
        MARGIN * 2 -
        108,
      7,
    );

    cover.drawText(value, {
      x: MARGIN + 108,
      y: coverY - 1,
      size: detailSize,
      font: regularFont,
      color: COLORS.ink,
    });

    coverY -= 34;

    cover.drawLine({
      start: {
        x: MARGIN,
        y: coverY + 16,
      },
      end: {
        x: PAGE_WIDTH - MARGIN,
        y: coverY + 16,
      },
      thickness: 0.5,
      color: COLORS.line,
    });
  }

  coverY -= 24;

  cover.drawText(
  language === "de"
    ? "ZWECK DES BERICHTS"
    : "REPORT PURPOSE",
  {
    x: MARGIN,
    y: coverY,
    size: 9,
    font: boldFont,
    color: COLORS.muted,
  });

  drawWrappedText(
    cover,
    language === "de"
  ? "Dieser Bericht fasst die technische Qualität der Website, ihre Sichtbarkeit in Suchmaschinen, Accessibility, Browser Security und die wichtigsten Optimierungsprioritäten zusammen."
  : "This report summarizes the website's technical quality, search visibility, accessibility, browser security and improvement priorities.",
    {
      x: MARGIN,
      y: coverY - 28,
      size: 11,
      font: regularFont,
      color: COLORS.body,
      maxWidth: CONTENT_WIDTH,
      lineHeight: 16,
    },
  );

  drawFooter(
    cover,
    pageNumber,
    fonts,
  );

  /*
   * PAGE 2 — EXECUTIVE SUMMARY
   */

  pageNumber += 1;

  let {
    page: summaryPage,
    y: summaryY,
  } = addStandardPage(pdfDocument, {
    kicker: "Executive summary",
    title: "Overall assessment",
    pageNumber,
    fonts,
    iconType: "document",
  });

  drawWrappedText(
    summaryPage,
    getExecutiveAssessment(overallScore),
    {
      x: MARGIN,
      y: summaryY,
      font: regularFont,
      size: 11,
      color: COLORS.body,
      maxWidth: CONTENT_WIDTH,
      lineHeight: 16,
      maxLines: 4,
    },
  );

  summaryY -= 86;

  const summaryCardGap = 12;
  const summaryCardWidth =
    (CONTENT_WIDTH -
      summaryCardGap * 2) /
    3;

  const summaryCards = [
    {
      label: "Overall score",
      value:
        overallScore === null
          ? "N/A"
          : `${overallScore}/100`,
      note: getScoreStatus(overallScore),
      score: overallScore,
    },
    {
      label: "Grade",
      value: grade,
      note: "Overall quality rating",
      score: overallScore,
    },
    {
      label: "Website",
      value: getHostName(websiteUrl),
      note: "Audited domain",
      score: null,
      isDomain: true,
    },
  ];

  summaryCards.forEach(
    (card, index) => {
      const x =
        MARGIN +
        index *
          (summaryCardWidth +
            summaryCardGap);

      const cardColor =
        card.isDomain
          ? COLORS.neutral
          : getScoreColor(card.score);

      const cardBackground =
        card.isDomain
          ? COLORS.soft
          : getScoreBackgroundColor(
              card.score,
            );

      summaryPage.drawRectangle({
        x,
        y: summaryY - 112,
        width: summaryCardWidth,
        height: 112,
        color: cardBackground,
        borderWidth: 1,
        borderColor: cardColor,
      });

      summaryPage.drawText(
        card.label.toUpperCase(),
        {
          x: x + 14,
          y: summaryY - 25,
          size: 7.5,
          font: boldFont,
          color: COLORS.muted,
        },
      );

      const valueSize =
        card.isDomain
          ? fitTextSize(
              card.value,
              boldFont,
              10,
              summaryCardWidth - 28,
              6.5,
            )
          : 18;

      summaryPage.drawText(
        card.value,
        {
          x: x + 14,
          y: summaryY - 61,
          size: valueSize,
          font: boldFont,
          color: cardColor,
        },
      );

      summaryPage.drawText(card.note, {
        x: x + 14,
        y: summaryY - 88,
        size: 7.8,
        font:
          card.isDomain
            ? regularFont
            : boldFont,
        color: cardColor,
      });
    },
  );

  summaryY -= 148;

  const columnGap = 18;
  const columnWidth =
    (CONTENT_WIDTH - columnGap) / 2;

  summaryPage.drawText(
    "WHAT IS WORKING",
    {
      x: MARGIN,
      y: summaryY,
      size: 9,
      font: boldFont,
      color: COLORS.good,
    },
  );

  summaryPage.drawText(
    "WHAT NEEDS ATTENTION",
    {
      x:
        MARGIN +
        columnWidth +
        columnGap,
      y: summaryY,
      size: 9,
      font: boldFont,
      color: COLORS.poor,
    },
  );

  let strengthY = summaryY - 26;
  let weaknessY = summaryY - 26;

  for (const item of strengths) {
    const box = drawInfoBox(
      summaryPage,
      {
        x: MARGIN,
        y: strengthY,
        width: columnWidth,
        title: "Strength",
        body: item,
        tone: "good",
        fonts,
        iconType: "document",
      },
    );

    strengthY =
      box.bottomY - 12;
  }

  for (const item of weaknesses) {
    const box = drawInfoBox(
      summaryPage,
      {
        x:
          MARGIN +
          columnWidth +
          columnGap,
        y: weaknessY,
        width: columnWidth,
        title: "Attention",
        body: item,
        tone: "poor",
        fonts,
        iconType: "document",
      },
    );

    weaknessY =
      box.bottomY - 12;
  }

  /*
   * PAGE 3 — SCORE DASHBOARD
   */

  pageNumber += 1;

  let {
    page: dashboardPage,
    y: dashboardY,
  } = addStandardPage(pdfDocument, {
    kicker: "Score overview",
    title: "Website quality dashboard",
    pageNumber,
    fonts,
    iconType: "roadmap",
  });

  const dashboardCards = [
    {
      label: "Performance",
      score: googleScore,
      description:
        "Speed and Core Web Vitals.",
      iconType: "performance",
    },
    {
      label: "SEO",
      score: seoScore,
      description:
        "Metadata and search structure.",
      iconType: "search",
    },
    {
      label: "Security",
      score: securityScore,
      description:
        "Browser hardening and trust.",
      iconType: "security",
    },
    {
      label: "Accessibility",
      score: accessibilityScore,
      description:
        "Semantic usability and support.",
      iconType: "accessibility",
    },
    {
      label: "Conversion",
      score: conversionScore,
      description:
        "How clearly users are guided.",
      iconType: "roadmap",
    },
    {
      label: "AI readiness",
      score: aiReadinessScore,
      description:
        "Machine-readable context.",
      iconType: "ai",
    },
  ];

  const dashboardGap = 14;
  const dashboardCardWidth =
    (CONTENT_WIDTH -
      dashboardGap * 2) /
    3;

  dashboardCards.forEach(
    (item, index) => {
      const row = Math.floor(index / 3);
      const column = index % 3;

      drawScoreCard(
        dashboardPage,
        {
          x:
            MARGIN +
            column *
              (dashboardCardWidth +
                dashboardGap),
          y:
            dashboardY -
            row * 150 -
            120,
          width: dashboardCardWidth,
          height: 120,
          label: item.label,
          score: item.score,
          description:
            item.description,
          iconType: item.iconType,
          fonts,
        },
      );
    },
  );

  dashboardY -= 330;

  dashboardPage.drawText(
    "HOW TO READ THE SCORES",
    {
      x: MARGIN,
      y: dashboardY,
      size: 9,
      font: boldFont,
      color: COLORS.muted,
    },
  );

  const legendItems = [
    {
      label: "Good",
      text: "80-100",
      color: COLORS.good,
      background: COLORS.goodSoft,
    },
    {
      label: "Needs attention",
      text: "60-79",
      color: COLORS.medium,
      background: COLORS.mediumSoft,
    },
    {
      label: "Poor",
      text: "0-59",
      color: COLORS.poor,
      background: COLORS.poorSoft,
    },
  ];

  legendItems.forEach(
    (item, index) => {
      const x =
        MARGIN +
        index *
          (dashboardCardWidth +
            dashboardGap);

      dashboardPage.drawRectangle({
        x,
        y: dashboardY - 70,
        width: dashboardCardWidth,
        height: 58,
        color: item.background,
        borderWidth: 1,
        borderColor: item.color,
      });

      dashboardPage.drawText(
        item.label,
        {
          x: x + 12,
          y: dashboardY - 35,
          size: 9,
          font: boldFont,
          color: item.color,
        },
      );

      dashboardPage.drawText(
        item.text,
        {
          x: x + 12,
          y: dashboardY - 53,
          size: 8,
          font: regularFont,
          color: COLORS.muted,
        },
      );
    },
  );

  /*
   * PAGE 4 — PERFORMANCE
   */

  pageNumber += 1;

  let {
    page: performancePage,
    y: performanceY,
  } = addStandardPage(pdfDocument, {
    kicker: "Core Web Vitals",
    title:
      "Mobile and desktop performance",
    pageNumber,
    fonts,
    iconType: "performance",
  });

  const deviceGap = 18;
  const deviceWidth =
    (CONTENT_WIDTH - deviceGap) / 2;

  const devices = [
    {
      name: "Mobile",
      data:
        result?.pageSpeed?.mobile,
    },
    {
      name: "Desktop",
      data:
        result?.pageSpeed?.desktop,
    },
  ];

  devices.forEach(
    (device, deviceIndex) => {
      const x =
        MARGIN +
        deviceIndex *
          (deviceWidth +
            deviceGap);

      const data = device.data;
      const performance =
        normalizeScore(
          data?.scores?.performance
            ?.value,
        );

      performancePage.drawRectangle({
        x,
        y: performanceY - 540,
        width: deviceWidth,
        height: 540,
        color: COLORS.soft,
        borderWidth: 1,
        borderColor: COLORS.line,
      });

      performancePage.drawText(
        device.name.toUpperCase(),
        {
          x: x + 16,
          y: performanceY - 28,
          size: 10,
          font: boldFont,
          color: COLORS.ink,
        },
      );

      performancePage.drawText(
        performance === null
          ? "N/A"
          : String(performance),
        {
          x: x + 16,
          y: performanceY - 74,
          size:
            performance === null
              ? 22
              : 30,
          font: boldFont,
          color:
            getScoreColor(performance),
        },
      );

      drawProgressBar(
        performancePage,
        {
          x: x + 16,
          y: performanceY - 96,
          width: deviceWidth - 32,
          score: performance,
        },
      );

      let deviceY =
        performanceY - 130;

      const categoryScores = [
        [
          "Performance",
          data?.scores?.performance
            ?.value,
        ],
        [
          "Accessibility",
          data?.scores?.accessibility
            ?.value,
        ],
        [
          "Best Practices",
          data?.scores?.bestPractices
            ?.value,
        ],
        [
          "SEO",
          data?.scores?.seo?.value,
        ],
      ];

      for (const [
        label,
        value,
      ] of categoryScores) {
        const score =
          normalizeScore(value);

        drawMetricRow(
          performancePage,
          {
            x: x + 16,
            y: deviceY,
            width:
              deviceWidth - 32,
            label,
            value:
              score === null
                ? "N/A"
                : score,
            status:
              getScoreStatus(score),
            fonts,
          },
        );

        deviceY -= 32;
      }

      deviceY -= 12;

      performancePage.drawText(
        "CORE METRICS",
        {
          x: x + 16,
          y: deviceY,
          size: 8,
          font: boldFont,
          color: COLORS.muted,
        },
      );

      deviceY -= 30;

      const metrics = [
        [
          "FCP",
          data?.metrics
            ?.firstContentfulPaint
            ?.formattedValue ||
            data?.metrics
              ?.firstContentfulPaint
              ?.displayValue,
        ],
        [
          "LCP",
          data?.metrics
            ?.largestContentfulPaint
            ?.formattedValue ||
            data?.metrics
              ?.largestContentfulPaint
              ?.displayValue,
        ],
        [
          "CLS",
          data?.metrics
            ?.cumulativeLayoutShift
            ?.formattedValue ||
            data?.metrics
              ?.cumulativeLayoutShift
              ?.displayValue,
        ],
        [
          "TBT",
          data?.metrics
            ?.totalBlockingTime
            ?.formattedValue ||
            data?.metrics
              ?.totalBlockingTime
              ?.displayValue,
        ],
        [
          "Speed Index",
          data?.metrics
            ?.speedIndex
            ?.formattedValue ||
            data?.metrics
              ?.speedIndex
              ?.displayValue,
        ],
      ];

      for (const [
        label,
        value,
      ] of metrics) {
        drawMetricRow(
          performancePage,
          {
            x: x + 16,
            y: deviceY,
            width:
              deviceWidth - 32,
            label,
            value,
            status:
              getMetricStatus(
                label,
                value,
              ),
            fonts,
          },
        );

        deviceY -= 32;
      }
    },
  );

  /*
   * PAGE 5 — SEO
   */

  pageNumber += 1;

  let {
    page: seoPage,
    y: seoY,
  } = addStandardPage(pdfDocument, {
    kicker: "SEO overview",
    title:
      "Metadata and search signals",
    pageNumber,
    fonts,
    iconType: "search",
  });

  const seoAdvanced =
    result?.sections?.seoAdvanced ||
    result?.checks?.seoAdvanced ||
    {};

  const seoItems = [
    {
      label: "Title",
      current:
        summary?.title?.value,
      ok: Boolean(
        summary?.title?.ok,
      ),
      action:
        "Add one concise title that matches the page intent.",
    },
    {
      label: "Meta description",
      current:
        summary?.description?.value,
      ok: Boolean(
        summary?.description?.ok,
      ),
      action:
        "Write a clear description with user intent and value.",
    },
    {
      label: "Canonical",
      current:
        summary?.canonical?.value ||
        seoAdvanced?.canonical?.value,
      ok: Boolean(
        summary?.canonical
          ?.canonical ||
          seoAdvanced?.canonical
            ?.exists,
      ),
      action:
        "Publish one absolute canonical URL.",
    },
    {
      label: "Robots meta",
      current:
        summary?.robotsTag?.value ||
        seoAdvanced?.robotsMeta
          ?.value,
      ok: Boolean(
        summary?.robotsTag?.value ||
          seoAdvanced?.robotsMeta
            ?.value,
      ),
      action:
        "Add an explicit robots directive where needed.",
    },
    {
      label: "Sitemap",
      current:
        summary?.files?.sitemapXml
          ?.found
          ? "Found"
          : "Missing",
      ok: Boolean(
        summary?.files?.sitemapXml
          ?.found,
      ),
      action:
        "Generate sitemap.xml and submit it in Search Console.",
    },
    {
      label: "Robots.txt",
      current:
        summary?.files?.robotsTxt
          ?.found
          ? "Found"
          : "Missing",
      ok: Boolean(
        summary?.files?.robotsTxt
          ?.found,
      ),
      action:
        "Publish robots.txt and include the sitemap location.",
    },
    {
      label: "Open Graph",
      current:
        social?.openGraphComplete
          ? "Complete"
          : "Incomplete",
      ok: Boolean(
        social?.openGraphComplete,
      ),
      action:
        "Add title, description, image and URL tags.",
    },
    {
      label: "Schema",
      current:
        structured?.validBlocks
          ? `${structured.validBlocks} valid block${structured.validBlocks === 1 ? "" : "s"}`
          : "Not detected",
      ok: Boolean(
        structured?.validBlocks,
      ),
      action:
        "Add valid Organization, WebSite or LocalBusiness schema.",
    },
    {
      label: "Language",
      current:
        summary?.lang?.value,
      ok: Boolean(
        summary?.lang?.value,
      ),
      action:
        "Set the HTML lang attribute.",
    },
    {
      label: "Hreflang",
      current:
        seoAdvanced?.hreflang
          ?.exists
          ? "Detected"
          : "Not detected",
      ok: Boolean(
        seoAdvanced?.hreflang
          ?.exists,
      ),
      action:
        "Add reciprocal hreflang tags for multilingual pages.",
    },
  ];

  const seoColumnGap = 14;
  const seoColumnWidth =
    (CONTENT_WIDTH -
      seoColumnGap) /
    2;

  seoItems.forEach(
    (item, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);

      const x =
        MARGIN +
        column *
          (seoColumnWidth +
            seoColumnGap);

      const y =
        seoY -
        row * 112;

      const toneColor = item.ok
        ? COLORS.good
        : COLORS.poor;

      const toneBackground =
        item.ok
          ? COLORS.goodSoft
          : COLORS.poorSoft;

      seoPage.drawRectangle({
        x,
        y: y - 96,
        width: seoColumnWidth,
        height: 96,
        color: toneBackground,
        borderWidth: 1,
        borderColor: toneColor,
      });

      seoPage.drawText(
        item.label.toUpperCase(),
        {
          x: x + 12,
          y: y - 21,
          size: 8,
          font: boldFont,
          color: toneColor,
        },
      );

      drawWrappedText(
        seoPage,
        safeText(item.current),
        {
          x: x + 12,
          y: y - 43,
          size: 8.5,
          font: regularFont,
          color: COLORS.ink,
          maxWidth:
            seoColumnWidth - 24,
          lineHeight: 11,
          maxLines: 2,
        },
      );

      if (!item.ok) {
        drawWrappedText(
          seoPage,
          item.action,
          {
            x: x + 12,
            y: y - 70,
            size: 7.4,
            font: regularFont,
            color: COLORS.body,
            maxWidth:
              seoColumnWidth - 24,
            lineHeight: 9.5,
            maxLines: 2,
          },
        );
      }
    },
  );

  /*
   * PAGE 6 — HEADINGS AND LINKS
   */

  pageNumber += 1;

  let {
    page: structurePage,
    y: structureY,
  } = addStandardPage(pdfDocument, {
    kicker: "Content structure",
    title:
      "Headings and internal links",
    pageNumber,
    fonts,
    iconType: "document",
  });

  const structureGap = 18;
  const structureWidth =
    (CONTENT_WIDTH -
      structureGap) /
    2;

  const headingCounts =
    headings?.counts || {};

  structurePage.drawText(
    "HEADING SUMMARY",
    {
      x: MARGIN,
      y: structureY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  structurePage.drawText(
    "LINK SUMMARY",
    {
      x:
        MARGIN +
        structureWidth +
        structureGap,
      y: structureY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  const headingStats = [
    [
      "Total headings",
      headings?.total || 0,
    ],
    [
      "H1",
      headingCounts.h1 || 0,
    ],
    [
      "H2",
      headingCounts.h2 || 0,
    ],
    [
      "H3",
      headingCounts.h3 || 0,
    ],
  ];

  const linkItems = Array.isArray(
    links?.items,
  )
    ? links.items
    : [];

  const emptyLinks =
    links?.emptyCount ||
    links?.emptyLinksCount ||
    linkItems.filter(
      (item) => item?.isEmpty,
    ).length;

  const linkStats = [
    [
      "Total links",
      links?.total ||
        linkItems.length,
    ],
    [
      "Internal links",
      links?.internalCount || 0,
    ],
    [
      "External links",
      links?.externalCount || 0,
    ],
    [
      "Empty links",
      emptyLinks,
    ],
  ];

  let headingStatY =
    structureY - 30;
  let linkStatY =
    structureY - 30;

  for (const [label, value] of headingStats) {
    drawMetricRow(
      structurePage,
      {
        x: MARGIN,
        y: headingStatY,
        width: structureWidth,
        label,
        value,
        status:
          label === "H1"
            ? value === 1
              ? "Good"
              : "Needs attention"
            : "Good",
        fonts,
      },
    );

    headingStatY -= 34;
  }

  for (const [label, value] of linkStats) {
    drawMetricRow(
      structurePage,
      {
        x:
          MARGIN +
          structureWidth +
          structureGap,
        y: linkStatY,
        width: structureWidth,
        label,
        value,
        status:
          label === "Empty links"
            ? value === 0
              ? "Good"
              : "Needs attention"
            : "Good",
        fonts,
      },
    );

    linkStatY -= 34;
  }

  structureY -= 190;

  const headingIssues = new Set(
    Array.isArray(headings?.issues)
      ? headings.issues.map((item) =>
          safeText(item),
        )
      : [],
  );

  if ((headingCounts.h1 || 0) === 0) {
    headingIssues.add(
      "No H1 was detected.",
    );
  }

  if ((headingCounts.h1 || 0) > 1) {
    headingIssues.add(
      "Multiple H1 headings were detected.",
    );
  }

  const headingIssueList = [
    ...headingIssues,
  ].slice(0, 5);

  const linkIssueList = [];

  if (emptyLinks > 0) {
    linkIssueList.push(
      `${emptyLinks} link${emptyLinks === 1 ? "" : "s"} have no readable text.`,
    );
  }

  if (
    (links?.externalCount || 0) > 0
  ) {
    linkIssueList.push(
      "Review external links opened in a new tab for safe rel attributes.",
    );
  }

  if (!linkIssueList.length) {
    linkIssueList.push(
      "No major link text problem was detected.",
    );
  }

  structurePage.drawText(
    "HEADING ISSUES",
    {
      x: MARGIN,
      y: structureY,
      size: 9,
      font: boldFont,
      color: COLORS.muted,
    },
  );

  structurePage.drawText(
    "LINK ISSUES",
    {
      x:
        MARGIN +
        structureWidth +
        structureGap,
      y: structureY,
      size: 9,
      font: boldFont,
      color: COLORS.muted,
    },
  );

  let headingIssueY =
    structureY - 28;
  let linkIssueY =
    structureY - 28;

  const finalHeadingIssues =
    headingIssueList.length
      ? headingIssueList
      : [
          "No major heading issue was detected.",
        ];

  for (const item of finalHeadingIssues) {
    const tone =
      item.toLowerCase().includes("no major")
        ? "good"
        : "medium";

    const box = drawInfoBox(
      structurePage,
      {
        x: MARGIN,
        y: headingIssueY,
        width: structureWidth,
        title:
          tone === "good"
            ? "Good"
            : "Review",
        body: item,
        tone,
        fonts,
        iconType: "document",
      },
    );

    headingIssueY =
      box.bottomY - 10;
  }

  for (const item of linkIssueList) {
    const tone =
      item
        .toLowerCase()
        .includes("no major")
        ? "good"
        : "medium";

    const box = drawInfoBox(
      structurePage,
      {
        x:
          MARGIN +
          structureWidth +
          structureGap,
        y: linkIssueY,
        width: structureWidth,
        title:
          tone === "good"
            ? "Good"
            : "Review",
        body: item,
        tone,
        fonts,
        iconType: "document",
      },
    );

    linkIssueY =
      box.bottomY - 10;
  }

  /*
   * PAGE 7 — IMAGES AND W3C
   */

  pageNumber += 1;

  let {
    page: qualityPage,
    y: qualityY,
  } = addStandardPage(pdfDocument, {
    kicker: "Media and code quality",
    title:
      "Images and HTML validation",
    pageNumber,
    fonts,
    iconType: "image",
  });

  qualityPage.drawText(
    "IMAGE SUMMARY",
    {
      x: MARGIN,
      y: qualityY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  qualityPage.drawText(
    "W3C VALIDATION",
    {
      x:
        MARGIN +
        structureWidth +
        structureGap,
      y: qualityY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  const imageStats = [
    [
      "Total images",
      images?.total ??
        imageFormats.total ??
        0,
    ],
    [
      "Modern formats",
      imageFormats.modern || 0,
    ],
    [
      "Legacy formats",
      imageFormats.legacy || 0,
    ],
    [
      "Missing ALT",
      images?.missingAltCount || 0,
    ],
    [
      "Missing dimensions",
      images?.missingDimensionsCount ||
        0,
    ],
  ];

  const w3cStats = [
    [
      "W3C score",
      normalizeScore(w3c?.score) ??
        "N/A",
    ],
    [
      "Critical errors",
      w3c?.criticalErrors ??
        w3c?.errors?.length ??
        0,
    ],
    [
      "Warnings",
      w3c?.warningsCount ??
        w3c?.warnings?.length ??
        0,
    ],
  ];

  let imageStatY = qualityY - 30;
  let w3cStatY = qualityY - 30;

  for (const [label, value] of imageStats) {
    drawMetricRow(
      qualityPage,
      {
        x: MARGIN,
        y: imageStatY,
        width: structureWidth,
        label,
        value,
        status:
          (label === "Missing ALT" ||
            label ===
              "Missing dimensions" ||
            label ===
              "Legacy formats") &&
          Number(value) > 0
            ? "Needs attention"
            : "Good",
        fonts,
      },
    );

    imageStatY -= 34;
  }

  for (const [label, value] of w3cStats) {
    drawMetricRow(
      qualityPage,
      {
        x:
          MARGIN +
          structureWidth +
          structureGap,
        y: w3cStatY,
        width: structureWidth,
        label,
        value,
        status:
          label === "Critical errors" &&
          Number(value) > 0
            ? "Needs attention"
            : "Good",
        fonts,
      },
    );

    w3cStatY -= 34;
  }

  qualityY -= 230;

  const imageAdvice = [];

  if (imageFormats.legacy > 0) {
    imageAdvice.push(
      "Convert important JPG and PNG images to WebP or AVIF.",
    );
  }

  if (
    (images?.missingAltCount || 0) > 0
  ) {
    imageAdvice.push(
      "Add descriptive ALT text to meaningful images.",
    );
  }

  if (
    (images?.missingDimensionsCount ||
      0) > 0
  ) {
    imageAdvice.push(
      "Add width and height attributes to reduce layout shift.",
    );
  }

  if (!imageAdvice.length) {
    imageAdvice.push(
      "The detected image setup does not require an immediate major correction.",
    );
  }

  let imageAdviceY = qualityY;
  let w3cAdviceY = qualityY;

  for (const item of imageAdvice) {
    const box = drawInfoBox(
      qualityPage,
      {
        x: MARGIN,
        y: imageAdviceY,
        width: structureWidth,
        title: "Recommendation",
        body: item,
        tone:
          imageAdvice.length === 1 &&
          item.includes(
            "does not require",
          )
            ? "good"
            : "medium",
        fonts,
        iconType: "image",
      },
    );

    imageAdviceY =
      box.bottomY - 10;
  }

  const w3cAdvice =
    (w3c?.criticalErrors || 0) > 0
      ? "Fix repeated shared template errors first. One component-level correction may remove many validation problems."
      : "No major critical W3C validation problem dominated this audit.";

  drawInfoBox(qualityPage, {
    x:
      MARGIN +
      structureWidth +
      structureGap,
    y: w3cAdviceY,
    width: structureWidth,
    title:
      (w3c?.criticalErrors || 0) > 0
        ? "Recommended action"
        : "Good",
    body: w3cAdvice,
    tone:
      (w3c?.criticalErrors || 0) > 0
        ? "medium"
        : "good",
    fonts,
    iconType: "document",
  });

  /*
 * HEADING DETAILS
 */

pageNumber += 1;

pageNumber = addDetailPages(
  pdfDocument,
  {
    items: headingDetailItems,
    kicker: "Heading structure",
    title: "Detected heading text",
    pageNumber,
    fonts,
    iconType: "document",
    emptyMessage:
      "No heading details were returned for this audit.",
  },
);

/*
 * LINK DETAILS
 */

pageNumber += 1;

pageNumber = addDetailPages(
  pdfDocument,
  {
    items: linkDetailItems,
    kicker: "Links and destinations",
    title: "Detected link text and URLs",
    pageNumber,
    fonts,
    iconType: "search",
    emptyMessage:
      "No link details were returned for this audit.",
  },
);

/*
 * IMAGE DETAILS
 */

pageNumber += 1;

pageNumber = addDetailPages(
  pdfDocument,
  {
    items: imageDetailItems,
    kicker: "Image inventory",
    title: "Detected images and URLs",
    pageNumber,
    fonts,
    iconType: "image",
    emptyMessage:
      "No image details were returned for this audit.",
  },
);



/*
 * TECHNICAL INFRASTRUCTURE
 */

pageNumber += 1;

let {
  page: infrastructurePage,
  y: infrastructureY,
} = addStandardPage(pdfDocument, {
  kicker: "Technical infrastructure",
  title: "HTTP, crawlability and server signals",
  pageNumber,
  fonts,
  iconType: "security",
});

const infrastructureGap = 18;
const infrastructureColumnWidth =
  (CONTENT_WIDTH - infrastructureGap) / 2;

infrastructurePage.drawText("HTTP & SERVER", {
  x: MARGIN,
  y: infrastructureY,
  size: 9,
  font: boldFont,
  color: COLORS.ink,
});

infrastructurePage.drawText("CRAWLABILITY", {
  x:
    MARGIN +
    infrastructureColumnWidth +
    infrastructureGap,
  y: infrastructureY,
  size: 9,
  font: boldFont,
  color: COLORS.ink,
});

let serverY = infrastructureY - 32;
let crawlY = infrastructureY - 32;

const serverRows = [
  [
    "HTTP status",
    `${infrastructure?.statusCode ?? "N/A"} ${safeText(
      infrastructure?.statusText,
      "",
    )}`.trim(),
    Number(infrastructure?.statusCode) === 200
      ? "Good"
      : "Needs attention",
  ],
  [
    "Redirected",
    infrastructure?.redirected ? "Yes" : "No",
    infrastructure?.redirected
      ? "Needs attention"
      : "Good",
  ],
  [
    "Server",
    safeText(infrastructure?.server, "Not detected"),
    infrastructure?.server &&
    infrastructure.server !== "Not detected"
      ? "Good"
      : "Needs attention",
  ],
  [
    "Powered by",
    safeText(infrastructure?.poweredBy, "Not detected"),
    "Good",
  ],
  [
    "Encoding",
    safeText(infrastructure?.contentEncoding, "None"),
    infrastructure?.contentEncoding &&
    infrastructure.contentEncoding !== "None"
      ? "Good"
      : "Needs attention",
  ],
  [
    "Content type",
    safeText(infrastructure?.contentType, "Not detected"),
    "Good",
  ],
];

for (const [label, value, status] of serverRows) {
  drawMetricRow(infrastructurePage, {
    x: MARGIN,
    y: serverY,
    width: infrastructureColumnWidth,
    label,
    value,
    status,
    fonts,
  });

  serverY -= 38;
}

const crawlRows = [
  [
    "robots.txt",
    infrastructure?.robotsTxt?.found ? "Found" : "Missing",
    infrastructure?.robotsTxt?.found
      ? "Good"
      : "Needs attention",
  ],
  [
    "Sitemap",
    infrastructure?.sitemapXml?.found ? "Found" : "Missing",
    infrastructure?.sitemapXml?.found
      ? "Good"
      : "Needs attention",
  ],
  [
    "Canonical",
    infrastructure?.canonical?.canonical
      ? "Set"
      : infrastructure?.canonical?.missing === false
        ? "Set"
        : "Missing",
    infrastructure?.canonical?.canonical ||
    infrastructure?.canonical?.missing === false
      ? "Good"
      : "Needs attention",
  ],
  [
    "Indexable",
    infrastructure?.canonical?.missing === false
      ? "Yes"
      : "Unknown",
    infrastructure?.canonical?.missing === false
      ? "Good"
      : "Needs attention",
  ],
  [
    "Final URL",
    safeText(infrastructure?.finalUrl, websiteUrl),
    "Good",
  ],
];

for (const [label, value, status] of crawlRows) {
  drawMetricRow(infrastructurePage, {
    x:
      MARGIN +
      infrastructureColumnWidth +
      infrastructureGap,
    y: crawlY,
    width: infrastructureColumnWidth,
    label,
    value,
    status,
    fonts,
  });

  crawlY -= 38;
}

infrastructureY -= 290;


infrastructurePage.drawText("SSL CERTIFICATE", {
  x: MARGIN,
  y: infrastructureY,
  size: 9,
  font: boldFont,
  color: COLORS.ink,
});

infrastructureY -= 32;

const sslCertificate =
  infrastructure?.sslCertificate || {};

const sslExpiryDate = sslCertificate?.expires
  ? new Date(sslCertificate.expires).toLocaleDateString("en-GB", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
  : "Not available";

const sslDaysRemaining =
  sslCertificate?.daysUntilExpiry === null ||
  sslCertificate?.daysUntilExpiry === undefined
    ? "Not available"
    : String(sslCertificate.daysUntilExpiry);

const sslRows = [
  [
    "Status",
    safeText(sslCertificate?.status, "Not available"),
    sslCertificate?.valid ? "Good" : "Needs attention",
  ],
  [
    "Issuer",
    safeText(sslCertificate?.issuer, "Not detected"),
    sslCertificate?.issuer &&
    sslCertificate.issuer !== "Not detected"
      ? "Good"
      : "Needs attention",
  ],
  [
    "Expires",
    sslExpiryDate,
    sslCertificate?.valid ? "Good" : "Needs attention",
  ],
  [
    "Days until expiry",
    sslDaysRemaining,
    Number(sslCertificate?.daysUntilExpiry) > 30
      ? "Good"
      : Number(sslCertificate?.daysUntilExpiry) >= 0
        ? "Needs attention"
        : "Poor",
  ],
  [
    "Protocol",
    safeText(sslCertificate?.protocol, "Not available"),
    String(sslCertificate?.protocol || "").includes("TLSv1.3")
      ? "Good"
      : "Needs attention",
  ],
];

for (const [label, value, status] of sslRows) {
  drawMetricRow(infrastructurePage, {
    x: MARGIN,
    y: infrastructureY,
    width: CONTENT_WIDTH,
    label,
    value,
    status,
    fonts,
  });

  infrastructureY -= 36;
}

infrastructureY -= 18;

infrastructurePage.drawText("SECURITY HEADERS", {
  x: MARGIN,
  y: infrastructureY,
  size: 9,
  font: boldFont,
  color: COLORS.ink,
});

infrastructureY -= 32;

const infrastructureHeaders = Array.isArray(
  infrastructure?.securityHeaders,
)
  ? infrastructure.securityHeaders
  : [];

for (const header of infrastructureHeaders.slice(0, 6)) {
  drawMetricRow(infrastructurePage, {
    x: MARGIN,
    y: infrastructureY,
    width: CONTENT_WIDTH,
    label: safeText(header?.name, "Security header"),
    value: header?.found ? "Found" : "Missing",
    status: header?.found ? "Good" : "Needs attention",
    fonts,
  });

  infrastructureY -= 36;
}

if (!infrastructureHeaders.length) {
  drawInfoBox(infrastructurePage, {
    x: MARGIN,
    y: infrastructureY,
    width: CONTENT_WIDTH,
    title: "Security headers",
    body:
      "No security header details were returned for this audit.",
    tone: "neutral",
    fonts,
    iconType: "security",
  });
}
  /*
   * PAGE 8 — SECURITY AND TECHNOLOGY
   */

  pageNumber += 1;

  let {
    page: securityPage,
    y: securityY,
  } = addStandardPage(pdfDocument, {
    kicker: "Security and platform",
    title:
      "Browser hardening and technology stack",
    pageNumber,
    fonts,
    iconType: "security",
  });

  const securityHeaders = [
    [
      "Strict-Transport-Security",
      "strict-transport-security",
    ],
    [
      "Content-Security-Policy",
      "content-security-policy",
    ],
    [
      "X-Frame-Options",
      "x-frame-options",
    ],
    [
      "X-Content-Type-Options",
      "x-content-type-options",
    ],
    [
      "Referrer-Policy",
      "referrer-policy",
    ],
    [
      "Permissions-Policy",
      "permissions-policy",
    ],
  ];

  securityPage.drawText(
    "SECURITY HEADERS",
    {
      x: MARGIN,
      y: securityY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  securityPage.drawText(
    "DETECTED TECHNOLOGY",
    {
      x:
        MARGIN +
        structureWidth +
        structureGap,
      y: securityY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  let securityHeaderY =
    securityY - 32;

  for (const [label, key] of securityHeaders) {
    const headerState =
      Array.isArray(
        result?.checks?.security
          ?.headers,
      )
        ? result.checks.security.headers.find(
            (header) =>
              String(
                header?.name || "",
              ).toLowerCase() === key,
          )
        : null;

    const found =
      headerState?.found === true ||
      result?.checks?.security
        ?.items?.[key] === true;

    drawMetricRow(
      securityPage,
      {
        x: MARGIN,
        y: securityHeaderY,
        width: structureWidth,
        label,
        value: found
          ? "Found"
          : "Missing",
        status: found
          ? "Good"
          : "Needs attention",
        fonts,
      },
    );

    securityHeaderY -= 36;
  }

  const technologyX =
    MARGIN +
    structureWidth +
    structureGap;

  securityPage.drawRectangle({
    x: technologyX,
    y: securityY - 95,
    width: structureWidth,
    height: 95,
    color: COLORS.soft,
    borderWidth: 1,
    borderColor: COLORS.line,
  });

  securityPage.drawText(
    "MAIN TECHNOLOGY",
    {
      x: technologyX + 14,
      y: securityY - 24,
      size: 7.5,
      font: boldFont,
      color: COLORS.muted,
    },
  );

  const mainTechnologyName =
    safeText(
      mainTechnology?.name,
      "Not detected",
    );

  const technologySize =
    fitTextSize(
      mainTechnologyName,
      boldFont,
      18,
      structureWidth - 28,
      9,
    );

  securityPage.drawText(
    mainTechnologyName,
    {
      x: technologyX + 14,
      y: securityY - 58,
      size: technologySize,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  let technologyY =
    securityY - 128;

  for (const item of technologies.slice(
    0,
    8,
  )) {
    const confidence = Number(
      item?.confidence ||
        item?.score ||
        0,
    );

    drawMetricRow(
      securityPage,
      {
        x: technologyX,
        y: technologyY,
        width: structureWidth,
        label: safeText(
          item?.name,
          "Technology",
        ),
        value: safeText(
          item?.category,
          "Technology",
        ),
        status:
          confidence >= 85
            ? "Good"
            : confidence >= 60
              ? "Needs attention"
              : "Poor",
        fonts,
      },
    );

    technologyY -= 36;
  }

  /*
   * PAGE 9 — ACCESSIBILITY AND AI
   */

  pageNumber += 1;

  let {
    page: aiPage,
    y: aiY,
  } = addStandardPage(pdfDocument, {
    kicker:
      "Accessibility and machine readability",
    title:
      "Semantic quality and AI readiness",
    pageNumber,
    fonts,
    iconType: "ai",
  });

  const accessibilityCardX = MARGIN;
  const aiCardX =
    MARGIN +
    structureWidth +
    structureGap;

  drawScoreCard(aiPage, {
    x: accessibilityCardX,
    y: aiY - 130,
    width: structureWidth,
    height: 130,
    label: "Accessibility",
    score: accessibilityScore,
    description:
      "Semantic usability and assistive technology support.",
    iconType: "accessibility",
    fonts,
  });

  drawScoreCard(aiPage, {
    x: aiCardX,
    y: aiY - 130,
    width: structureWidth,
    height: 130,
    label: "AI readiness",
    score: aiReadinessScore,
    description:
      "Machine-readable structure, context and entities.",
    iconType: "ai",
    fonts,
  });

  aiY -= 175;

  aiPage.drawText(
    "ACCESSIBILITY SIGNALS",
    {
      x: MARGIN,
      y: aiY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  aiPage.drawText(
    "AI READINESS SIGNALS",
    {
      x: aiCardX,
      y: aiY,
      size: 9,
      font: boldFont,
      color: COLORS.ink,
    },
  );

  const accessibilitySignals = [
    [
      "Semantic HTML",
      semantic?.score ?? "N/A",
    ],
    [
      "Language attribute",
      summary?.lang?.value ||
        "Missing",
    ],
    [
      "Missing ALT",
      images?.missingAltCount || 0,
    ],
    [
      "Accessible links",
      emptyLinks === 0
        ? "Good"
        : "Needs review",
    ],
  ];

  const aiSignals = [
    [
      "Schema blocks",
      structured?.validBlocks || 0,
    ],
    [
      "Word count",
      result?.sections?.content
        ?.wordCount || 0,
    ],
    [
      "Internal links",
      links?.internalCount || 0,
    ],
    [
      "FAQ schema",
      (
        structured
          ?.schemaTypesDetected || []
      ).some((type) =>
        String(type)
          .toLowerCase()
          .includes("faq"),
      )
        ? "Detected"
        : "Not detected",
    ],
  ];

  let accessibilitySignalY =
    aiY - 34;

  let aiSignalY = aiY - 34;

  for (const [
    label,
    value,
  ] of accessibilitySignals) {
    drawMetricRow(aiPage, {
      x: MARGIN,
      y: accessibilitySignalY,
      width: structureWidth,
      label,
      value,
      status:
        String(value)
          .toLowerCase()
          .includes("missing") ||
        String(value)
          .toLowerCase()
          .includes("review") ||
        Number(value) > 0 &&
          label === "Missing ALT"
          ? "Needs attention"
          : "Good",
      fonts,
    });

    accessibilitySignalY -= 38;
  }

  for (const [label, value] of aiSignals) {
    drawMetricRow(aiPage, {
      x: aiCardX,
      y: aiSignalY,
      width: structureWidth,
      label,
      value,
      status:
        String(value)
          .toLowerCase()
          .includes("not detected")
          ? "Needs attention"
          : "Good",
      fonts,
    });

    aiSignalY -= 38;
  }

  aiY -= 230;

  drawInfoBox(aiPage, {
    x: MARGIN,
    y: aiY,
    width: CONTENT_WIDTH,
    title: "Why this matters",
    body:
      "Clear semantic structure, useful schema, descriptive links and accessible media help users, search engines and AI systems interpret website content more accurately.",
    tone: "neutral",
    fonts,
    iconType: "ai",
  });

  /*
   * PAGE 10+ — RECOMMENDATIONS
   */

  pageNumber += 1;

  let {
    page: recommendationPage,
    y: recommendationY,
  } = addStandardPage(pdfDocument, {
    kicker: "Prioritized actions",
    title:
      "Recommended improvements",
    pageNumber,
    fonts,
    iconType: "roadmap",
  });

  for (const item of recommendations) {
    const estimatedHeight =
      112 +
      splitTextIntoLines(
        item.why,
        regularFont,
        8.5,
        CONTENT_WIDTH - 30,
      ).length *
        11 +
      splitTextIntoLines(
        item.action,
        regularFont,
        8.5,
        CONTENT_WIDTH - 30,
      ).length *
        11;

    if (
      recommendationY -
        estimatedHeight <
      CONTENT_BOTTOM
    ) {
      pageNumber += 1;

      const next =
        addStandardPage(
          pdfDocument,
          {
            kicker:
              "Prioritized actions",
            title:
              "Recommended improvements continued",
            pageNumber,
            fonts,
            iconType: "roadmap",
          },
        );

      recommendationPage =
        next.page;
      recommendationY = next.y;
    }

    const card =
      drawRecommendationCard(
        recommendationPage,
        {
          x: MARGIN,
          y: recommendationY,
          width: CONTENT_WIDTH,
          item,
          fonts,
        },
      );

    recommendationY =
      card.bottomY - 14;
  }

  /*
   * FINAL PAGE — ROADMAP AND CONTACT
   */

  pageNumber += 1;

  let {
    page: roadmapPage,
    y: roadmapY,
  } = addStandardPage(pdfDocument, {
    kicker: "Final roadmap",
    title:
      "Practical implementation plan",
    pageNumber,
    fonts,
    iconType: "roadmap",
  });

  const quickWins =
    recommendations
      .filter((item) =>
        /30-60|30-90/.test(
          item.effort,
        ),
      )
      .slice(0, 3);

  const mediumWork =
    recommendations
      .filter((item) =>
        /2-4 hours/.test(
          item.effort,
        ),
      )
      .slice(0, 3);

  const developerWork =
    recommendations
      .filter((item) =>
        /1-2 days/.test(
          item.effort,
        ),
      )
      .slice(0, 3);

  const strategicWork =
    recommendations
      .filter((item) =>
        /Longer-term|Ongoing/.test(
          item.effort,
        ),
      )
      .slice(0, 3);

  const roadmapGroups = [
    {
      title: "Quick wins",
      timeframe: "30-90 minutes",
      items: quickWins,
      tone: "good",
    },
    {
      title:
        "Medium improvements",
      timeframe: "2-4 hours",
      items: mediumWork,
      tone: "medium",
    },
    {
      title: "Developer work",
      timeframe: "1-2 days",
      items: developerWork,
      tone: "poor",
    },
    {
      title:
        "Strategic improvements",
      timeframe: "Longer-term",
      items: strategicWork,
      tone: "neutral",
    },
  ].filter(
    (group) => group.items.length,
  );

  const roadmapGap = 14;
  const roadmapWidth =
    (CONTENT_WIDTH -
      roadmapGap) /
    2;

  roadmapGroups.forEach(
    (group, index) => {
      const column = index % 2;
      const row = Math.floor(index / 2);

      const x =
        MARGIN +
        column *
          (roadmapWidth +
            roadmapGap);

      const y =
        roadmapY -
        row * 190;

      const toneColor =
        group.tone === "good"
          ? COLORS.good
          : group.tone === "medium"
            ? COLORS.medium
            : group.tone === "poor"
              ? COLORS.poor
              : COLORS.neutral;

      const toneBackground =
        group.tone === "good"
          ? COLORS.goodSoft
          : group.tone === "medium"
            ? COLORS.mediumSoft
            : group.tone === "poor"
              ? COLORS.poorSoft
              : COLORS.neutralSoft;

      roadmapPage.drawRectangle({
        x,
        y: y - 165,
        width: roadmapWidth,
        height: 165,
        color: toneBackground,
        borderWidth: 1,
        borderColor: toneColor,
      });

      roadmapPage.drawText(
        group.title.toUpperCase(),
        {
          x: x + 14,
          y: y - 25,
          size: 8.5,
          font: boldFont,
          color: toneColor,
        },
      );

      roadmapPage.drawText(
        group.timeframe,
        {
          x: x + 14,
          y: y - 46,
          size: 8,
          font: regularFont,
          color: COLORS.muted,
        },
      );

      let itemY = y - 75;

      group.items.forEach(
        (item, itemIndex) => {
          roadmapPage.drawCircle({
            x: x + 18,
            y: itemY + 3,
            size: 3,
            color: toneColor,
          });

          drawWrappedText(
            roadmapPage,
            item.title,
            {
              x: x + 30,
              y: itemY + 7,
              size: 8.5,
              font: regularFont,
              color: COLORS.ink,
              maxWidth:
                roadmapWidth - 44,
              lineHeight: 11,
              maxLines: 2,
            },
          );

          itemY -= 34;

          if (itemIndex >= 2) {
            return;
          }
        },
      );
    },
  );

  roadmapY -=
    Math.ceil(
      roadmapGroups.length / 2,
    ) *
      190 +
    22;

  const ctaHeight = 145;

  roadmapPage.drawRectangle({
    x: MARGIN,
    y: Math.max(
      CONTENT_BOTTOM,
      roadmapY - ctaHeight,
    ),
    width: CONTENT_WIDTH,
    height: ctaHeight,
    color: COLORS.black,
  });

  const ctaY =
    Math.max(
      CONTENT_BOTTOM,
      roadmapY - ctaHeight,
    ) + ctaHeight;

  roadmapPage.drawText(
    "NEED HELP IMPLEMENTING THESE IMPROVEMENTS?",
    {
      x: MARGIN + 22,
      y: ctaY - 34,
      size: 9,
      font: boldFont,
      color: rgb(0.72, 0.72, 0.74),
    },
  );

  roadmapPage.drawText(
    "Zora Web Design",
    {
      x: MARGIN + 22,
      y: ctaY - 68,
      size: 20,
      font: boldFont,
      color: COLORS.white,
    },
  );

  roadmapPage.drawText(
    "info@zorawebdesign.com",
    {
      x: MARGIN + 22,
      y: ctaY - 96,
      size: 10,
      font: regularFont,
      color: COLORS.white,
    },
  );

  roadmapPage.drawText(
    "https://www.zorawebdesign.com",
    {
      x: MARGIN + 22,
      y: ctaY - 118,
      size: 9,
      font: regularFont,
      color: rgb(0.75, 0.75, 0.77),
    },
  );

  const pdfBytes =
    await pdfDocument.save();

  downloadPdfBytes(
    pdfBytes,
    createSafeFileName(websiteUrl, language),
  );
}