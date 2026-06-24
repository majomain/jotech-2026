const EASING = 'cubic-bezier(.2,.8,.2,1)';
const TYPEWRITER_CHAR_MS = 58;
const TYPEWRITER_PERIOD_PAUSE_MS = 420;
const TYPEWRITER_START_MS = 1100;
const VOID_ELEMENTS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link']);

function tokenizeSubtextHtml(html) {
  const shell = document.createElement('div');
  shell.innerHTML = html.trim();
  const tokens = [];

  function walk(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      for (const char of node.textContent) {
        tokens.push({ char });
      }
      return;
    }

    if (node.nodeType !== Node.ELEMENT_NODE) return;

    const tag = node.tagName.toLowerCase();
    tokens.push({
      element: tag,
      className: node.className,
    });

    if (VOID_ELEMENTS.has(tag)) return;

    node.childNodes.forEach(walk);
    tokens.push({ close: true });
  }

  shell.childNodes.forEach(walk);
  return tokens;
}

function initHeroSubtextTypewriter(root) {
  const subtext = root.querySelector('.hero-subtext');
  if (!subtext) return;

  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    subtext.classList.add('is-typed');
    return;
  }

  const tokens = tokenizeSubtextHtml(subtext.innerHTML);
  subtext.innerHTML = '';
  subtext.classList.add('is-typing');

  const stack = [subtext];
  let tokenIndex = 0;
  let textBuffer = '';

  const flushTextBuffer = () => {
    if (!textBuffer) return;
    stack[stack.length - 1].appendChild(document.createTextNode(textBuffer));
    textBuffer = '';
  };

  const finish = () => {
    subtext.classList.remove('is-typing');
    subtext.classList.add('is-typed');
  };

  const step = () => {
    while (tokenIndex < tokens.length) {
      const token = tokens[tokenIndex];

      if (token.char) {
        tokenIndex += 1;
        textBuffer += token.char;
        flushTextBuffer();
        const delay =
          token.char === '.' ? TYPEWRITER_CHAR_MS + TYPEWRITER_PERIOD_PAUSE_MS : TYPEWRITER_CHAR_MS;
        window.setTimeout(step, delay);
        return;
      }

      tokenIndex += 1;
      flushTextBuffer();

      if (token.element) {
        const node = document.createElement(token.element);
        if (token.className) node.className = token.className;
        stack[stack.length - 1].appendChild(node);
        if (!VOID_ELEMENTS.has(token.element)) {
          stack.push(node);
        }
        continue;
      }

      if (token.close) {
        stack.pop();
      }
    }

    flushTextBuffer();
    finish();
  };

  window.setTimeout(step, TYPEWRITER_START_MS);
}

/**
 * Staggered entrance animation for hero headline lines.
 */
export function initHeroAnimation(root = document) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const lines = root.querySelectorAll('.hero h1 .ln em');

  lines.forEach((el, i) => {
    if (reduceMotion) {
      el.style.transform = 'none';
      return;
    }

    if (!el.animate) return;

    el.animate(
      [{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
      {
        duration: 1000,
        delay: 300 + i * 100,
        easing: EASING,
        fill: 'both',
      }
    );
  });

  initHeroSubtextTypewriter(root);
}
