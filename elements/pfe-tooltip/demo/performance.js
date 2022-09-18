window.process = { env: {} };

const $ = x => document.querySelector(x);
const $$ = x => document.querySelectorAll(x);

import { html, render } from 'lit';
import '@patternfly/pfe-tooltip';

async function measure(start) {
  render(Array.from({ length: 3000 }, (_, i) => html`
<pfe-tooltip>
  <button>${i + 1}</button>
  <span slot="content">Content for ${i + 1}</span>
</pfe-tooltip>
`), $('output'));

  const tooltips = $$('pfe-tooltip');
  await Promise.all(Array.from(tooltips, x => x.updateComplete));
  tooltips[0].show();
  await tooltips[0].updateComplete;
  return performance.now() - start;
}

const elapsed = await measure(performance.now());
$('h2').textContent = `Render took ${(elapsed) / 1000} seconds`;
