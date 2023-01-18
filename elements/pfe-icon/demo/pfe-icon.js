import '@patternfly/pfe-icon';
import '@patternfly/pfe-tooltip';
// TS6202: Project references may not form a circular graph.
// import '@patternfly/pfe-button';
import('@patternfly' + '/' + 'pfe-button');
import { iconSets } from '@patternfly/pfe-tools/environment.js';
import { render, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

import Fuse from 'fuse.js';

const names = new Map([
  ['fab', 'Font Awesome Brand'],
  ['far', 'Font Awesome'],
  ['fas', 'Font Awesome Solid'],
  ['patternfly', 'PatternFly'],
  ['custom', 'Custom'],
]);

async function copy(event) {
  const { html } = event.target.closest('[data-icon]').dataset;
  await navigator.clipboard.writeText(html);
}

function renderIcons(results) {
  render(repeat(iconSets, ([setName, icons]) => html`
    <h3 id=${setName}>${names.get(setName)}</h3>
    <ul>${repeat(icons, icon => `${setName}-${icon}`, icon => html`
      <li ?hidden=${(typeof results === 'string' ? icon !== results : (results && !results[setName]?.[icon]))}>
        <button title="${icon}"
            data-icon="${icon}"
            data-html='<pfe-icon set="${setName}" icon="${icon}" size="lg" loading="idle"></pfe-icon>'
            @click=${copy}>
          <pfe-icon icon="${icon}" set="${setName}" size="xl">${icon}</pfe-icon>
        </button>
      </li>`)}
    </ul>
  `), document.getElementById('pfe-icon-demo-output'));
}

const fuse = new Fuse(Array.from(iconSets, ([set, icons]) => icons.map(icon => ({ icon, set }))).flat(), {
  includeScore: true,
  threshold: 0.1,
  keys: ['icon'],
});

const search = document.getElementById('icon-search');

const list = document.getElementById('icons-list');

search.autocompleteRequest = function({ query }, cb) {
  const results = fuse.search(query);
  cb(results.map(x => x.item.icon));
  renderIcons(results.reduce((acc, { item: { set, icon } }) => ({
    ...acc,
    [set]: {
      ...acc[set],
      [icon]: true
    }
  }), {}));
};

search.addEventListener('change', () => renderIcons());
search.addEventListener('select', e => renderIcons(e.target.value));

renderIcons(search.querySelector('input').value || undefined);

render(repeat(iconSets, ([setName, icons]) => repeat(icons, icon => `${setName}-${icon}`, icon => html`
  <option value="${icon}">${setName} - ${icon}</option>
`)), list);
