import { projects as defaultProjects } from './projects.js';
import { projects as translatedProjects } from './projects-en.js';

function normalizeHostFromUrl(value = '') {
  const input = String(value || '').trim();
  if (!input) return '';

  try {
    const url = new URL(/^https?:\/\//i.test(input) ? input : `https://${input}`);
    return url.hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return '';
  }
}

const projectHosts = [
  ...defaultProjects.map((project) => project?.link),
  ...translatedProjects.map((project) => project?.link)
]
  .map((link) => normalizeHostFromUrl(link))
  .filter(Boolean);

export const auditExcludedHosts = [...new Set(projectHosts)];

export function isAuditExcludedUrl(value = '') {
  const host = normalizeHostFromUrl(value);
  return host ? auditExcludedHosts.includes(host) : false;
}