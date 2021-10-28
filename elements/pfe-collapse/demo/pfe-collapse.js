const { shadowRoot } = document.querySelector('[data-demo="pfe-collapse"]');

const collapse = shadowRoot.querySelector('pfe-collapse');
const button = shadowRoot.querySelector('pfe-button button');
const animating = shadowRoot.getElementById('animating');
const state = shadowRoot.getElementById('state');
const expanded = shadowRoot.getElementById('expanded');
const standaloneCollapse = shadowRoot.getElementById('standalone-panel');

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
