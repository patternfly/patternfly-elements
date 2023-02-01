import 'element-internals-polyfill';
import '@patternfly/elements/pf-switch/pf-switch.js';
import '@patternfly/elements/pf-jump-links/pf-jump-links.js';
import '@patternfly/elements/pf-jump-links/pf-jump-links-list.js';

const main = document.querySelector('main');
const links = document.querySelector('pf-jump-links');
const swtch = document.querySelector('pf-switch');
const media = matchMedia('(max-width: 600px)');

function sumHeights(...elements) {
  return elements.reduce((sum, el) => sum + el?.getBoundingClientRect?.().height ?? 0, 0);
}

async function update() {
  const { matches } = media;
  const { checked } = swtch;
  main.classList.toggle('mobile', matches);
  main.classList.toggle('horizontal', !checked);
  links.vertical = checked;
  links.expandable = matches && checked;
  links.centered = !checked;
  await links.updateComplete;
  links.offset = sumHeights(
    document.getElementById('main-header'),
  ) + 72;
}

media.addEventListener('change', update);
swtch.addEventListener('change', update);
links.addEventListener('toggle', update);

update();

