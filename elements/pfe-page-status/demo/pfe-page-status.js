const { shadowRoot } = document.querySelector('[data-demo="pfe-page-status"]');

shadowRoot.querySelector('pfe-select').addEventListener('change', function(event) {
  shadowRoot.querySelector('pfe-page-status').status = event.target.value;
});
