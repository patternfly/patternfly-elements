const { shadowRoot } = document.querySelector('[data-demo="pfe-primary-detail"]');

for (const el of shadowRoot.querySelectorAll('pfe-primary-detail')) {
  el.addEventListener('pfe-primary-detail:hidden-tab', console.log);
  el.addEventListener('pfe-primary-detail:shown-tab', console.log);
}
