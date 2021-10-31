const { shadowRoot } = document.querySelector('[data-demo="pfe-jump-links"]');

import { installRouter } from 'pwa-helpers/router.js';

/**
 * scroll to element with id in the URL hash.
 * @this {HTMLElement}
 */
async function route(location = window.location) {
  if (location.hash) {
    shadowRoot?.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}

installRouter(route);

route();
