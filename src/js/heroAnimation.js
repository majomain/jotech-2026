const EASING = 'cubic-bezier(.2,.8,.2,1)';
const TYPEWRITER_CHAR_MS = 58;
const TYPEWRITER_PERIOD_PAUSE_MS = 420;
const TYPEWRITER_START_MS = 1100;
const VOID_ELEMENTS = new Set(['br', 'hr', 'img', 'input', 'meta', 'link']);

/**
 * Clip-reveal stagger for headline lines (hero, case study, etc.).
 */
export function animateClipRevealLines(
  root = document,
  selector,
  { delayBase = 300, stagger = 100, duration = 1000 } = {},
) {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const lines = root.querySelectorAll(selector);

  lines.forEach((el, i) => {
    if (reduceMotion) {
      el.style.transform = 'none';
      return;
    }

    if (!el.animate) return;

    el.animate(
      [{ transform: 'translateY(110%)' }, { transform: 'translateY(0)' }],
      {
        duration,
        delay: delayBase + i * stagger,
        easing: EASING,
        fill: 'both',
      },
    );
  });
}

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

  const caret = document.createElement('span');
  caret.className = 'hero-subtext__caret';
  caret.setAttribute('aria-hidden', 'true');

  const stack = [subtext];
  subtext.appendChild(caret);

  let tokenIndex = 0;
  let textBuffer = '';

  const currentParent = () => stack[stack.length - 1];

  const placeCaret = () => {
    currentParent().appendChild(caret);
  };

  const flushTextBuffer = () => {
    if (!textBuffer) return;
    currentParent().insertBefore(document.createTextNode(textBuffer), caret);
    textBuffer = '';
  };

  const finish = () => {
    caret.remove();
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
        currentParent().insertBefore(node, caret);
        if (!VOID_ELEMENTS.has(token.element)) {
          stack.push(node);
          placeCaret();
        }
        continue;
      }

      if (token.close) {
        stack.pop();
        placeCaret();
      }
    }

    flushTextBuffer();
    finish();
  };

  window.setTimeout(step, TYPEWRITER_START_MS);
}

export function initHeroAnimation(root = document) {
  animateClipRevealLines(root, '.hero h1 .ln em');
  initHeroSubtextTypewriter(root);
}

/**
 * Load-time line reveal for case study page titles.
 */
export function initCaseHeaderAnimation(root = document) {
  animateClipRevealLines(root, '.case-header h1 .ln em', {
    delayBase: 220,
    stagger: 90,
  });
}
