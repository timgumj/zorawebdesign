export function normalizeUrl(inputUrl = '') {
  const trimmed = String(inputUrl || '').trim();
  if (!trimmed) return '';
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

export function safeText(value, fallback = 'Not available') {
  if (value === null || value === undefined) return fallback;
  const text = String(value).replace(/\s+/g, ' ').trim();
  return text || fallback;
}

export function getScoreValue(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return Math.round(value);
  if (!value || typeof value !== 'object') return null;

  const candidate = value.score ?? value.value ?? null;
  return typeof candidate === 'number' && Number.isFinite(candidate)
    ? Math.round(candidate)
    : null;
}

export function clampScore(value) {
  if (typeof value !== 'number' || !Number.isFinite(value)) return null;
  return Math.max(0, Math.min(100, Math.round(value)));
}

export function averageScores(values = []) {
  const numbers = values.filter((value) => typeof value === 'number' && Number.isFinite(value));
  if (!numbers.length) return null;
  return clampScore(numbers.reduce((sum, value) => sum + value, 0) / numbers.length);
}

export function getW3cValidation(audit = {}) {
  return (
    audit?.w3cValidation ||
    audit?.sections?.accessibilityTruthCheck ||
    audit?.sections?.tools?.w3cValidation ||
    audit?.checks?.w3cValidation ||
    null
  );
}

export function getSeoScore(audit = {}) {
  return averageScores([
    getScoreValue(audit?.summary?.title),
    getScoreValue(audit?.summary?.description),
    getScoreValue(audit?.checks?.headings),
    getScoreValue(audit?.sections?.seoAdvanced?.score || audit?.checks?.seoAdvanced?.score),
    getScoreValue(getW3cValidation(audit)?.score)
  ]);
}

export function getAccessibilityScore(audit = {}) {
  return getScoreValue(
    audit?.pageSpeed?.desktop?.scores?.accessibility?.value ??
      audit?.sections?.semanticAccessibility?.score ??
      audit?.checks?.accessibility
  );
}

export function getConversionScore(audit = {}) {
  return averageScores([
    getScoreValue(audit?.checks?.links),
    getScoreValue(audit?.checks?.social),
    getScoreValue(audit?.summary?.description),
    getScoreValue(audit?.sections?.content?.score)
  ]);
}

export function getAiReadinessScore(audit = {}) {
  return getScoreValue(audit?.sections?.aiReadiness?.score || audit?.checks?.aiReadiness?.score);
}

export function getGrade(score) {
  const value = getScoreValue(score) ?? clampScore(score);
  if (value === null) return null;
  if (value >= 95) return 'A+';
  if (value >= 88) return 'A';
  if (value >= 75) return 'B';
  if (value >= 60) return 'C';
  return 'D';
}

export function getStatusTone(score) {
  const value = getScoreValue(score) ?? clampScore(score);
  if (value === null) return { label: 'Not available', tone: 'neutral' };
  if (value >= 80) return { label: 'Good', tone: 'good' };
  if (value >= 60) return { label: 'Recommended', tone: 'optional' };
  return { label: 'Attention', tone: 'attention' };
}

export function formatGeneratedDate(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return 'Not available';
  return date.toLocaleString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
}

export function getImageFormatSummary(audit = {}) {
  const images = audit?.checks?.images;
  const backendFormats =
    images?.formats ||
    audit?.sections?.images?.formats ||
    audit?.sections?.coreVitals?.imageFormats ||
    null;

  if (backendFormats) {
    const counts = backendFormats.counts || {};
    return {
      total: backendFormats.total ?? 0,
      modern: backendFormats.modern ?? 0,
      legacy: backendFormats.legacy ?? 0,
      counts,
      needsWebp: Boolean(backendFormats.needsWebp ?? backendFormats.legacy > 0),
      missingAltCount: images?.missingAltCount ?? 0,
      missingDimensionsCount: images?.missingDimensionsCount ?? 0,
      lazyLoadedCount: images?.lazyLoadedCount ?? 0
    };
  }

  const sources = [
    ...(images?.all || []),
    ...(images?.missingAlt || []),
    ...(images?.missingDimensions || [])
  ];

  const counts = { webp: 0, avif: 0, jpg: 0, jpeg: 0, png: 0, gif: 0, svg: 0, unknown: 0 };
  sources.forEach((image) => {
    const src = typeof image === 'string' ? image : image?.src || '';
    const clean = src.split('?')[0].toLowerCase();
    const ext = clean.match(/\.([a-z0-9]+)$/)?.[1] || 'unknown';
    counts[ext] = (counts[ext] || 0) + 1;
  });

  const total = Object.values(counts).reduce((sum, value) => sum + value, 0);
  const modern = (counts.webp || 0) + (counts.avif || 0);
  const legacy = (counts.jpg || 0) + (counts.jpeg || 0) + (counts.png || 0);

  return {
    total,
    modern,
    legacy,
    counts,
    needsWebp: total > 0 && legacy > 0,
    missingAltCount: images?.missingAltCount ?? 0,
    missingDimensionsCount: images?.missingDimensionsCount ?? 0,
    lazyLoadedCount: images?.lazyLoadedCount ?? 0
  };
}

function headingTransitionIssues(headings = []) {
  const issues = [];

  for (let index = 1; index < headings.length; index += 1) {
    const previous = Number(headings[index - 1]?.level || 0);
    const current = Number(headings[index]?.level || 0);
    if (current > previous + 1) {
      issues.push(`Heading structure jumps from H${previous} to H${current}.`);
    }
  }

  return issues;
}

function headingRecommendation(issues = []) {
  const message = issues.join(' ').toLowerCase();
  if (message.includes('no h1')) {
    return 'Add one clear H1 that describes the main purpose of the page.';
  }
  if (message.includes('multiple h1')) {
    return 'Keep one primary H1. Change additional H1 headings to H2 or H3 according to the content structure.';
  }
  if (message.includes('jumps from')) {
    return 'Use heading levels in order. Major sections should use H2 and subsections should use H3.';
  }
  if (message.includes('empty heading')) {
    return 'Add meaningful visible text to empty headings.';
  }
  return 'The heading structure is clear and does not require immediate changes.';
}

export function getHeadingReport(audit = {}) {
  const headingData = audit?.checks?.headings || {};
  const headings = Array.isArray(headingData.headings) ? headingData.headings : [];
  const counts = headingData.counts || {};
  const issues = [];

  if ((counts.h1 || 0) === 0) issues.push('No H1 was detected.');
  if ((counts.h1 || 0) > 1) issues.push('Multiple H1 headings were detected.');

  const emptyHeadings = headings.filter((heading) => !String(heading?.text || '').trim());
  if (emptyHeadings.length) issues.push('One heading has no readable text.');

  issues.push(...(Array.isArray(headingData.issues) ? headingData.issues : []));
  issues.push(...headingTransitionIssues(headings));

  const important = headings.filter((heading) => [1, 2].includes(Number(heading?.level || 0)));
  const remaining = headings.filter((heading) => !important.includes(heading));
  const displayHeadings = [...important, ...remaining].slice(0, 30).map((heading) => ({
    tag: `H${heading?.level || '?'}`,
    text: safeText(heading?.text, '(empty heading text)')
  }));

  return {
    total: headingData.total ?? headings.length,
    counts: {
      h1: counts.h1 ?? 0,
      h2: counts.h2 ?? 0,
      h3: counts.h3 ?? 0,
      h4: counts.h4 ?? 0,
      h5: counts.h5 ?? 0,
      h6: counts.h6 ?? 0
    },
    issues: [...new Set(issues)].filter(Boolean),
    recommendation: headingRecommendation(issues),
    displayHeadings,
    hiddenCount: Math.max(0, headings.length - displayHeadings.length)
  };
}

function linkTypeLabel(link = {}) {
  if (link?.isMailOrPhone) return 'Contact';
  if (link?.isAnchor) return 'Anchor';
  if (link?.isExternal) return 'External';
  return 'Internal';
}

function isGenericAnchorText(text = '') {
  return /^(click here|learn more|read more|more|here)$/i.test(String(text || '').trim());
}

function buildLinkRecommendation(issues = []) {
  const combined = issues.join(' ').toLowerCase();
  if (combined.includes('no readable text')) {
    return 'Add descriptive link text or an accessible aria-label so users and screen readers understand the destination.';
  }
  if (combined.includes('generic')) {
    return 'Replace generic text such as click here with wording that describes the destination.';
  }
  if (combined.includes('anchor')) {
    return 'Ensure every internal anchor points to an existing element ID.';
  }
  if (combined.includes('rel attributes') || combined.includes('external')) {
    return "When opening external links in a new tab, use rel='noopener noreferrer'.";
  }
  return 'The detected links use readable text and do not require immediate changes.';
}

export function getLinkReport(audit = {}) {
  const linkData = audit?.checks?.links || {};
  const items = Array.isArray(linkData.items) ? linkData.items : [];
  const contactLinks = items.filter((item) => item?.isMailOrPhone).length;
  const anchorLinks = items.filter((item) => item?.isAnchor).length;
  const problematic = items.filter(
    (item) =>
      item?.isEmpty ||
      item?.brokenAnchor ||
      isGenericAnchorText(item?.text) ||
      item?.href === '#' ||
      item?.href === ''
  );
  const representative = [...problematic, ...items]
    .filter((item, index, all) => all.findIndex((candidate) => candidate?.href === item?.href && candidate?.text === item?.text) === index)
    .slice(0, 20)
    .map((item) => ({
      href: safeText(item?.href, 'Missing href'),
      text: safeText(item?.text, 'No readable text'),
      type: linkTypeLabel(item)
    }));

  const issues = [];
  if ((linkData.emptyCount ?? linkData.emptyLinksCount ?? 0) > 0) {
    issues.push(`${linkData.emptyCount ?? linkData.emptyLinksCount} links have no readable text.`);
  }
  if (items.some((item) => item?.brokenAnchor)) {
    issues.push('One anchor points to a missing section.');
  }
  if (items.some((item) => isGenericAnchorText(item?.text))) {
    issues.push('Some links use generic wording.');
  }
  if (items.some((item) => item?.isExternal)) {
    issues.push('External links may need safer rel attributes.');
  }

  return {
    summary: {
      total: linkData.total ?? items.length,
      internal: linkData.internalCount ?? 0,
      external: linkData.externalCount ?? 0,
      empty: linkData.emptyCount ?? linkData.emptyLinksCount ?? 0,
      anchor: anchorLinks,
      contact: contactLinks
    },
    representative,
    issues,
    recommendation: buildLinkRecommendation(issues)
  };
}

function simplifyW3cTitle(message = '') {
  const value = safeText(message, 'Validation issue').replace(/line\s+\d+/gi, '').replace(/column\s+\d+/gi, '').trim();
  if (/attribute/i.test(value)) return 'Invalid or duplicate attribute usage';
  if (/css/i.test(value)) return 'CSS parse errors';
  if (/style element/i.test(value)) return 'Invalid style element placement';
  if (/button/i.test(value)) return 'Invalid button structure';
  if (/image|img/i.test(value)) return 'Unsupported image attributes';
  if (/slash/i.test(value)) return 'Invalid trailing slash usage';
  if (/aria|role/i.test(value)) return 'ARIA or role mismatch';
  if (/id/i.test(value)) return 'Duplicate or invalid ID usage';
  if (/tag|element/i.test(value)) return 'Invalid element structure';
  return value;
}

function w3cFixHint(message = '') {
  const value = String(message || '').toLowerCase();
  if (/attribute/.test(value)) return 'Review invalid or duplicate attributes in shared templates.';
  if (/css/.test(value)) return 'Check the related stylesheet or inline CSS output for syntax errors.';
  if (/style element/.test(value)) return 'Move style markup into valid head output or compiled CSS assets.';
  if (/aria|role/.test(value)) return 'Match ARIA roles and attributes to valid HTML semantics.';
  if (/id/.test(value)) return 'Use unique IDs and avoid repeated generated IDs.';
  return 'Fix the shared template or component output that repeats this issue.';
}

export function getW3cGroupedIssues(audit = {}) {
  const w3c = getW3cValidation(audit);
  const issues = [
    ...(Array.isArray(w3c?.errors) ? w3c.errors : []),
    ...(Array.isArray(w3c?.warnings) ? w3c.warnings : [])
  ];
  const grouped = new Map();

  issues.forEach((issue) => {
    const raw = issue?.message || issue?.extract || issue?.title || 'Validation issue';
    const title = simplifyW3cTitle(raw);
    if (!grouped.has(title)) {
      grouped.set(title, {
        title,
        count: 0,
        fix: w3cFixHint(raw)
      });
    }
    grouped.get(title).count += 1;
  });

  return {
    score: getScoreValue(w3c?.score),
    criticalErrors: w3c?.criticalErrors ?? w3c?.errors?.length ?? null,
    warnings: w3c?.warningsCount ?? w3c?.importantWarnings ?? w3c?.warnings?.length ?? null,
    groups: [...grouped.values()].sort((a, b) => b.count - a.count).slice(0, 8)
  };
}

export function getSecurityHeaders(audit = {}) {
  const security = audit?.checks?.security || {};
  const rawHeaders = security.headers || security.items || {};
  const lookup = new Map();

  if (Array.isArray(rawHeaders)) {
    rawHeaders.forEach((item) => {
      lookup.set(String(item?.name || '').toLowerCase(), Boolean(item?.found));
    });
  } else {
    Object.entries(rawHeaders || {}).forEach(([key, value]) => {
      lookup.set(String(key || '').toLowerCase(), Boolean(value));
    });
  }

  return [
    {
      name: 'Strict-Transport-Security',
      key: 'strict-transport-security',
      importance: 'High',
      explanation: 'Recommended browser hardening header for HTTPS-only delivery.',
      recommendation: 'Enable HSTS with a safe max-age once HTTPS delivery is stable.'
    },
    {
      name: 'Content-Security-Policy',
      key: 'content-security-policy',
      importance: 'High',
      explanation: 'Recommended browser hardening header for controlling script and asset sources.',
      recommendation: 'Start with report-only mode, then tighten allowed sources gradually.'
    },
    {
      name: 'X-Frame-Options',
      key: 'x-frame-options',
      importance: 'Medium',
      explanation: 'Recommended browser hardening header for reducing iframe abuse.',
      recommendation: 'Set to DENY or SAMEORIGIN unless embeds are required.'
    },
    {
      name: 'X-Content-Type-Options',
      key: 'x-content-type-options',
      importance: 'Medium',
      explanation: 'Recommended browser hardening header for safer content-type handling.',
      recommendation: 'Set the header to nosniff on static and dynamic responses.'
    },
    {
      name: 'Referrer-Policy',
      key: 'referrer-policy',
      importance: 'Medium',
      explanation: 'Recommended browser hardening header for balancing privacy and analytics.',
      recommendation: 'Use strict-origin-when-cross-origin in most cases.'
    },
    {
      name: 'Permissions-Policy',
      key: 'permissions-policy',
      importance: 'Optional',
      explanation: 'Recommended browser hardening header for restricting unused browser features.',
      recommendation: 'Disable permissions that the site does not need.'
    }
  ].map((item) => ({
    ...item,
    found: lookup.get(item.key) === true
  }));
}

export function getTechnologyItems(audit = {}) {
  const items = audit?.sections?.technology?.technologies || [];
  return items
    .filter((item) => {
      const confidence = Number(item?.confidence || item?.score || 0);
      return confidence >= 55 || item?.verified === true;
    })
    .sort((first, second) => Number(second?.confidence || second?.score || 0) - Number(first?.confidence || first?.score || 0));
}

export function getMainTechnology(audit = {}) {
  return audit?.sections?.technology?.mainTechnology || getTechnologyItems(audit)[0] || null;
}

function normalizeEffort(item) {
  const text = `${item.title || ''} ${item.why || ''} ${item.action || ''}`.toLowerCase();
  if (/csp|template|w3c|core web vitals|lcp|cls|tbt|performance|developer/.test(text)) return '1-2 days';
  if (/schema|security|heading|links|images|canonical|robots|sitemap/.test(text)) return '2-4 hours';
  return '30-90 minutes';
}

function inferRecommendationAction(text = '') {
  const value = String(text || '').toLowerCase();
  if (/alt/.test(value)) return 'Add short alt descriptions to meaningful images and keep decorative images empty.';
  if (/sitemap/.test(value)) return 'Publish sitemap.xml and reference it in robots.txt and Search Console.';
  if (/canonical/.test(value)) return 'Add one absolute canonical URL to the page head.';
  if (/title/.test(value)) return 'Write one clear title that matches page intent and search wording.';
  if (/description/.test(value)) return 'Add a concise meta description with the page value proposition.';
  if (/schema|json-ld/.test(value)) return 'Add or fix the relevant JSON-LD markup on the shared page template.';
  if (/security|csp|hsts|header/.test(value)) return 'Add the missing browser hardening headers in the hosting or server configuration.';
  if (/speed|lcp|cls|tbt|fcp|core web vitals|performance/.test(value)) return 'Reduce render-blocking assets and optimize heavy media and scripts.';
  if (/heading/.test(value)) return 'Use one primary H1 and keep section headings in logical order.';
  if (/link|anchor/.test(value)) return 'Replace empty or generic link text with wording that explains the destination.';
  if (/image|webp|avif/.test(value)) return 'Convert large JPG and PNG images to WebP or AVIF and add responsive sizing.';
  return 'Implement the fix in the shared template or page section where the issue appears.';
}

function inferRecommendationPriority(text = '') {
  const value = String(text || '').toLowerCase();
  if (/critical|security|missing|broken|blocked|no h1|noindex|csp|hsts|validation error/.test(value)) return 'Attention now';
  if (/slow|speed|title|meta|canonical|schema|accessibility|alt|heading|links|w3c|seo/.test(value)) return 'Important next';
  return 'Optional improvements';
}

export function getRecommendations(audit = {}) {
  const direct = Array.isArray(audit?.recommendations) ? audit.recommendations : [];
  const imageSummary = getImageFormatSummary(audit);
  const w3c = getW3cValidation(audit);
  const structured = audit?.sections?.structuredData || {};
  const semantic = audit?.sections?.semanticAccessibility || {};
  const aiReadiness = audit?.sections?.aiReadiness || {};
  const suggestions = [];

  direct.forEach((item) => {
    const title = safeText(item?.title || item?.text || item, 'Recommendation');
    const why = safeText(item?.text || item?.title || item, 'Review this item and improve it where needed.');
    suggestions.push({ title, why });
  });

  if ((getScoreValue(audit?.googleScore) ?? 100) < 80) {
    suggestions.push({ title: 'Improve loading speed', why: 'Performance signals are below the level expected for a strong business website.' });
  }
  if (imageSummary.needsWebp) {
    suggestions.push({ title: 'Convert legacy images to WebP or AVIF', why: 'Important images still use legacy formats that increase page weight.' });
  }
  if ((audit?.checks?.images?.missingAltCount ?? 0) > 0) {
    suggestions.push({ title: 'Add image alt text', why: `${audit.checks.images.missingAltCount} meaningful images have no alt text.` });
  }
  if ((w3c?.criticalErrors ?? 0) > 0) {
    suggestions.push({ title: 'Fix recurring validation issues', why: 'Repeated validation errors suggest a shared template or component issue.' });
  }
  if (!audit?.summary?.files?.sitemapXml?.found) {
    suggestions.push({ title: 'Add sitemap.xml', why: 'Search engines may miss important pages without a sitemap.' });
  }
  if (structured?.validBlocks === 0 || (structured?.errors || []).length) {
    suggestions.push({ title: 'Improve structured data', why: 'Schema markup is missing or invalid, which weakens rich result readiness.' });
  }
  if ((semantic?.score ?? 100) < 80) {
    suggestions.push({ title: 'Improve semantic accessibility', why: 'Landmarks, labels or button text need refinement.' });
  }
  if ((aiReadiness?.score ?? 100) < 70) {
    suggestions.push({ title: 'Strengthen AI readiness', why: 'Clearer structure and schema can help search and AI systems understand the content.' });
  }

  const unique = suggestions.filter(
    (item, index, all) => all.findIndex((candidate) => candidate.title.toLowerCase() === item.title.toLowerCase()) === index
  );

  return unique.slice(0, 12).map((item) => {
    const priority = inferRecommendationPriority(`${item.title} ${item.why}`);
    return {
      title: item.title,
      why: item.why,
      action: inferRecommendationAction(`${item.title} ${item.why}`),
      effort: normalizeEffort(item),
      priority
    };
  });
}

export function groupRecommendations(recommendations = []) {
  return {
    attentionNow: recommendations.filter((item) => item.priority === 'Attention now'),
    importantNext: recommendations.filter((item) => item.priority === 'Important next'),
    optionalImprovements: recommendations.filter((item) => item.priority === 'Optional improvements')
  };
}

export function getStrengths(audit = {}) {
  const strengths = [];
  if ((getScoreValue(audit?.googleScore) ?? 0) >= 80) {
    strengths.push('Performance baseline is already in a healthy range.');
  }
  if ((audit?.checks?.headings?.counts?.h1 ?? 0) === 1) {
    strengths.push('The page uses a clear primary H1 heading.');
  }
  if ((audit?.sections?.structuredData?.validBlocks ?? 0) > 0) {
    strengths.push('Structured data is present, which improves machine readability.');
  }
  if ((getScoreValue(audit?.checks?.security?.score) ?? 0) >= 75) {
    strengths.push('Security hardening is above average for a marketing site.');
  }
  if ((getScoreValue(getW3cValidation(audit)?.score) ?? 0) >= 80) {
    strengths.push('HTML validation quality is in a stable range.');
  }
  return strengths.length ? strengths.slice(0, 4) : ['The site has a workable technical foundation that can be improved quickly.'];
}

export function getWeaknesses(audit = {}) {
  const weaknesses = [];
  if ((getScoreValue(audit?.googleScore) ?? 100) < 75) {
    weaknesses.push('Performance gaps are likely affecting user experience, especially on mobile.');
  }
  if ((audit?.checks?.images?.missingAltCount ?? 0) > 0) {
    weaknesses.push('Missing image alt text weakens accessibility and image SEO coverage.');
  }
  if (!audit?.summary?.files?.sitemapXml?.found) {
    weaknesses.push('Missing sitemap.xml limits efficient crawling and page discovery.');
  }
  if ((getW3cValidation(audit)?.criticalErrors ?? 0) > 0) {
    weaknesses.push('Recurring validation errors suggest shared template issues.');
  }
  if (getSecurityHeaders(audit).filter((item) => !item.found).length >= 2) {
    weaknesses.push('Several recommended browser hardening headers are still missing.');
  }
  return weaknesses.slice(0, 4);
}

export function getTopPriorities(audit = {}) {
  const items = getRecommendations(audit).slice(0, 3);
  if (items.length) return items.map((item) => item.title);
  return ['Review the audit output and address the highest-impact technical issues first.'];
}

export function getScoreOverviewItems(audit = {}) {
  return [
    {
      title: 'Performance',
      score: getScoreValue(audit?.googleScore),
      description: 'Site speed and Core Web Vitals.',
      ...getStatusTone(getScoreValue(audit?.googleScore))
    },
    {
      title: 'SEO',
      score: getSeoScore(audit),
      description: 'Metadata, crawl clarity and structure.',
      ...getStatusTone(getSeoScore(audit))
    },
    {
      title: 'Security',
      score: getScoreValue(audit?.checks?.security?.score),
      description: 'Recommended browser hardening coverage.',
      ...getStatusTone(getScoreValue(audit?.checks?.security?.score))
    },
    {
      title: 'Accessibility',
      score: getAccessibilityScore(audit),
      description: 'Semantic usability and assistive support.',
      ...getStatusTone(getAccessibilityScore(audit))
    },
    {
      title: 'Conversion',
      score: getConversionScore(audit),
      description: 'How clearly pages guide users to action.',
      ...getStatusTone(getConversionScore(audit))
    },
    {
      title: 'AI Readiness',
      score: getAiReadinessScore(audit),
      description: 'Structure and schema for search and AI systems.',
      ...getStatusTone(getAiReadinessScore(audit))
    }
  ];
}

function parseNumberFromMetric(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  const match = String(value || '').match(/-?\d+(\.\d+)?/);
  return match ? Number(match[0]) : null;
}

export function getMetricStatus(metricName, rawValue) {
  const value = parseNumberFromMetric(rawValue);
  if (value === null) return { label: 'Not available', tone: 'neutral' };

  if (metricName === 'FCP') {
    if (value <= 1.8) return { label: 'Good', tone: 'good' };
    if (value <= 3) return { label: 'Recommended', tone: 'optional' };
    return { label: 'Attention', tone: 'attention' };
  }
  if (metricName === 'LCP') {
    if (value <= 2.5) return { label: 'Good', tone: 'good' };
    if (value <= 4) return { label: 'Recommended', tone: 'optional' };
    return { label: 'Attention', tone: 'attention' };
  }
  if (metricName === 'CLS') {
    if (value <= 0.1) return { label: 'Good', tone: 'good' };
    if (value <= 0.25) return { label: 'Recommended', tone: 'optional' };
    return { label: 'Attention', tone: 'attention' };
  }
  if (metricName === 'TBT') {
    if (value <= 200) return { label: 'Good', tone: 'good' };
    if (value <= 600) return { label: 'Recommended', tone: 'optional' };
    return { label: 'Attention', tone: 'attention' };
  }
  if (metricName === 'Speed Index') {
    if (value <= 3.4) return { label: 'Good', tone: 'good' };
    if (value <= 5.8) return { label: 'Recommended', tone: 'optional' };
    return { label: 'Attention', tone: 'attention' };
  }

  return { label: 'Not available', tone: 'neutral' };
}

export function getDeviceReport(deviceName, deviceData) {
  if (!deviceData) {
    return {
      available: false,
      name: deviceName,
      scores: [],
      metrics: [],
      recommendation: `${deviceName} PageSpeed data was not available for this audit.`
    };
  }

  const scoreEntries = [
    ['Performance', deviceData?.scores?.performance?.value],
    ['Accessibility', deviceData?.scores?.accessibility?.value],
    ['Best Practices', deviceData?.scores?.bestPractices?.value],
    ['SEO', deviceData?.scores?.seo?.value]
  ].map(([label, score]) => ({
    label,
    score: getScoreValue(score),
    ...getStatusTone(getScoreValue(score))
  }));

  const metrics = [
    ['FCP', deviceData?.metrics?.firstContentfulPaint?.formattedValue || deviceData?.metrics?.firstContentfulPaint?.displayValue],
    ['LCP', deviceData?.metrics?.largestContentfulPaint?.formattedValue || deviceData?.metrics?.largestContentfulPaint?.displayValue],
    ['CLS', deviceData?.metrics?.cumulativeLayoutShift?.formattedValue || deviceData?.metrics?.cumulativeLayoutShift?.displayValue],
    ['TBT', deviceData?.metrics?.totalBlockingTime?.formattedValue || deviceData?.metrics?.totalBlockingTime?.displayValue],
    ['Speed Index', deviceData?.metrics?.speedIndex?.formattedValue || deviceData?.metrics?.speedIndex?.displayValue]
  ].map(([label, value]) => ({
    label,
    value: value || 'Not available',
    ...getMetricStatus(label, value)
  }));

  const weakMetrics = metrics.filter((metric) => metric.tone === 'attention').map((metric) => metric.label);
  const recommendation = weakMetrics.length
    ? `${deviceName} priorities: ${weakMetrics.join(', ')} need the most attention.`
    : `${deviceName} metrics are generally in a healthy range.`;

  return {
    available: true,
    name: deviceName,
    scores: scoreEntries,
    metrics,
    recommendation
  };
}

export function getCompetitorComparisonRows(audit = {}, competitor = {}) {
  if (!competitor || !competitor?.overallScore) return [];

  const rows = [
    ['Overall', getScoreValue(audit?.overallScore), getScoreValue(competitor?.overallScore)],
    ['Performance', getScoreValue(audit?.googleScore), getScoreValue(competitor?.googleScore)],
    ['SEO', getSeoScore(audit), getSeoScore(competitor)],
    ['Accessibility', getAccessibilityScore(audit), getAccessibilityScore(competitor)],
    ['Security', getScoreValue(audit?.checks?.security?.score), getScoreValue(competitor?.checks?.security?.score)],
    ['AI readiness', getAiReadinessScore(audit), getAiReadinessScore(competitor)]
  ];

  return rows.map(([label, you, them]) => ({
    label,
    you,
    competitor: them,
    gap: typeof you === 'number' && typeof them === 'number' ? you - them : null
  }));
}

export function buildAuditSummary(audit = {}, generatedAt = new Date().toISOString()) {
  return {
    overallScore: getScoreValue(audit?.overallScore),
    googleScore: getScoreValue(audit?.googleScore),
    localScore: getScoreValue(audit?.localScore),
    seoScore: getSeoScore(audit),
    securityScore: getScoreValue(audit?.checks?.security?.score),
    accessibilityScore: getAccessibilityScore(audit),
    conversionScore: getConversionScore(audit),
    aiReadinessScore: getAiReadinessScore(audit),
    grade: getGrade(audit?.overallScore),
    generatedAt
  };
}

export function getRoadmap(recommendations = []) {
  const quickWins = recommendations.filter((item) => item.effort === '30-90 minutes').slice(0, 4);
  const medium = recommendations.filter((item) => item.effort === '2-4 hours').slice(0, 4);
  const developer = recommendations.filter((item) => item.effort === '1-2 days').slice(0, 4);
  const strategic = recommendations.filter((item) => item.priority === 'Optional improvements').slice(0, 4);

  return [
    { title: 'Quick wins', effort: '30-90 minutes', items: quickWins },
    { title: 'Medium improvements', effort: '2-4 hours', items: medium },
    { title: 'Developer work', effort: '1-2 days', items: developer },
    { title: 'Strategic improvements', effort: 'Longer-term', items: strategic }
  ].filter((group) => group.items.length > 0);
}