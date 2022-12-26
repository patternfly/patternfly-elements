import '@patternfly/pfe-jump-links';

import { installRouter } from 'pwa-helpers/router.js';

const jumpLinks = document.querySelector('pfe-jump-links');
const verticalSwitch = document.querySelector('pfe-switch');

verticalSwitch.addEventListener('change', onVertical);

function onVertical() {
  jumpLinks.vertical = verticalSwitch.checked;
  jumpLinks.centered = !jumpLinks.vertical;
}

onVertical();

/**
 * scroll to element with id in the URL hash.
 * @this {HTMLElement}
 */
async function route(location = window.location, event) {
  event?.preventDefault();
  event?.stopPropagation();
  if (location.hash) {
    document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
  }
}

installRouter(route);

route();
