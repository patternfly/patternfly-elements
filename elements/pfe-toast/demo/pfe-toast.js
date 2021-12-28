import '@patternfly/pfe-cta';

const { shadowRoot } = document.querySelector('[data-demo="pfe-toast"]');

for (const button of shadowRoot.querySelectorAll('[data-toast]')) {
  button.addEventListener('click', function(event) {
    shadowRoot.getElementById(event.target.dataset.toast).toggle();
  });
}
