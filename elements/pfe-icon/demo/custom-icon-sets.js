import { PfeIcon } from '@patternfly/pfe-icon';
import { render, html } from 'lit';

PfeIcon.addIconSet('rh', (set, icon) =>
  new URL(`./icons/${set}/${icon}.js`, import.meta.url));

const icons = [
  'redhat',
  'patternfly',
];

const items = html`
  <ul>${icons.map(icon => html`
    <li title="${icon}">
      <pfe-icon set="rh" icon="${icon}" size="lg" loading="lazy"></pfe-icon>
    </li>`)}
  </ul>
`;
render(items, document.getElementById('custom-icon-demo-output'));
render(items, document.getElementById('styled-icon-demo-output'));
