const { shadowRoot: root } = document.querySelector('[data-demo="pfe-modal"]');
const trigger = root.querySelector('#custom-trigger');
const modal = root.querySelector('#custom-modal');

trigger.addEventListener('click', event => modal.open(event));
