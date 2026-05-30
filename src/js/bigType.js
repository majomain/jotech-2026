const DASH_SPLIT = /([\u2014\u2013])/;

/** Split em/en-dash compounds so line breaks can occur at the dash. */
function splitAtDashes(token) {
  const parts = token.split(DASH_SPLIT);
  if (parts.length === 1) return [token];

  const result = [];
  for (const part of parts) {
    if (part === '\u2014' || part === '\u2013') {
      if (result.length) result[result.length - 1] += part;
      else result.push(part);
    } else if (part) {
      result.push(part);
    }
  }
  return result;
}

function appendWordSpans(text, frag) {
  text.split(/(\s+)/).forEach((token) => {
    if (token.trim() === '') {
      frag.appendChild(document.createTextNode(token));
      return;
    }
    splitAtDashes(token).forEach((part) => {
      const span = document.createElement('span');
      span.className = 'w';
      span.textContent = part;
      frag.appendChild(span);
    });
  });
}

/**
 * Splits bigtype copy into per-word spans for scroll-driven highlighting.
 */
export function initBigType(root = document) {
  const wordsEl = root.getElementById('words');
  if (!wordsEl) return [];

  const nodes = [...wordsEl.childNodes];
  const frag = document.createDocumentFragment();

  nodes.forEach((node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      appendWordSpans(node.textContent, frag);
    } else {
      node.classList.add('w');
      frag.appendChild(node);
    }
  });

  wordsEl.innerHTML = '';
  wordsEl.appendChild(frag);

  return [...wordsEl.querySelectorAll('.w')];
}
