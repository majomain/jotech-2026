import { statement as statementData } from '../data/statement.js';

export function renderStatement() {
  const lines = statementData.lines
    .map((line) => `<span class="ln"><b>${line}</b></span>`)
    .join('\n    ');

  return [
    '<div class="statement" id="statement">',
    '  <h2>',
    `    ${lines}`,
    '  </h2>',
    '</div>',
  ].join('\n');
}
