import '@patternfly/pfe-jump-links';

const root = document.querySelector('[data-demo="pfe-jump-links"]')?.shadowRoot ?? document;

import { installRouter } from 'pwa-helpers/router.js';

/**
 * scroll to element with id in the URL hash.
 * @this {HTMLElement}
 */
async function route(location = window.location, event) {
  event?.preventDefault();
  event?.stopPropagation();
  if (location.hash) {
    root?.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}

installRouter(route);

route();
