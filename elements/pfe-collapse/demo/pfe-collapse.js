import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-collapse';

const root = document.querySelector('[data-demo="pfe-collapse"]')?.shadowRoot ?? document;

const collapse = root.querySelector('pfe-collapse');
const button = root.querySelector('pfe-button button');
const animating = root.getElementById('animating');
const state = root.getElementById('state');
const expanded = root.getElementById('expanded');
const standaloneCollapse = root.getElementById('standalone-panel');

function onAnimationStart(event) {
  animating.textContent = 'true';
  state.textContent = event.detail.state;
}

function onAnimationEnd(event) {
  animating.textContent = 'false';
  expanded.textContent = event.detail.expanded;
  state.textContent = 'default';
}

function onClick() {
  console.log('button clicked', standaloneCollapse.expanded);
  standaloneCollapse.expanded = !standaloneCollapse.expanded;
}

collapse.addEventListener('pfe-collapse:change', console.log);
collapse.addEventListener('pfe-collapse-panel:animation-start', onAnimationStart);
collapse.addEventListener('pfe-collapse-panel:animation-end', onAnimationEnd);
button.addEventListener('click', onClick);
