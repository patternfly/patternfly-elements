import '/docs/zero-md.js';

import '@patternfly/elements/pf-label/pf-label.js';

const container = document.querySelector('[data-demo]');

container.addEventListener('close', function(event) {
  event.target.remove();
});

