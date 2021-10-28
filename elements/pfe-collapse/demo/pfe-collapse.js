import '@patternfly/pfe-band';
import '@patternfly/pfe-button';
import '@patternfly/pfe-collapse';

// eslint-disable-next-line no-console
const log = console.log.bind(console);
const root = document.querySelector('[data-demo="pfe-collapse"]')?.shadowRoot ?? document;

const collapse = root.querySelector('pfe-collapse');
const button = root.querySelector('pfe-button button');
const animating = root.getElementById('animating');
const state = root.getElementById('state');
const expanded = root.getElementById('expanded');
const standaloneCollapse = root.getElementById('standalone-panel');

function onAnimationStart(event) {
  animating.textContent = 'true';
  state.textContent = event.state;
}

function onAnimationEnd(event) {
  animating.textContent = 'false';
  expanded.textContent = event.expanded;
  state.textContent = 'default';
}

function onClick() {
  log('button clicked', standaloneCollapse.expanded);
  standaloneCollapse.expanded = !standaloneCollapse.expanded;
}

collapse.addEventListener('change', log);
collapse.addEventListener('animation-start', onAnimationStart);
collapse.addEventListener('animation-end', onAnimationEnd);
button.addEventListener('click', onClick);
