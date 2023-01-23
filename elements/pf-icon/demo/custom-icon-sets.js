import { PfIcon } from '@patternfly/elements/pf-icon/pf-icon.js';

import { render, html } from 'lit';

PfIcon.addIconSet('rh', (set, icon) =>
  new URL(`./icons/${set}/${icon}.js`, import.meta.url));

const icons = [
  'lifecycle',
  'boba-tea',
];

const items = html`
  <ul>${icons.map(icon => html`
    <li title="${icon}">
      <pf-icon set="rh" icon="${icon}" size="lg" loading="lazy"></pf-icon>
    </li>`)}
  </ul>
`;

render(items, document.getElementById('custom-icon-demo-output'));
render(items, document.getElementById('styled-icon-demo-output'));
