import '@patternfly/elements/pfe-switch/pfe-switch.js';
import '@patternfly/elements/pfe-jump-links/pfe-jump-links.js';
import '@patternfly/elements/pfe-jump-links/pfe-jump-links-list.js';

const main = document.querySelector('main');
const links = document.querySelector('pfe-jump-links');
const swtch = document.querySelector('pfe-switch');
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

