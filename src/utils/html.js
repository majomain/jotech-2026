/**
 * Escapes HTML special characters for safe text interpolation.
 */
export function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Builds anchor attributes for internal vs external links.
 */
export function linkAttrs({ href, external }) {
  if (external) {
    return `href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer"`;
  }
  return `href="${escapeHtml(href)}"`;
}
