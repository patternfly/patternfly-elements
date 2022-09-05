import '@patternfly/pfe-icon';
import '@patternfly/pfe-tooltip';
import '@patternfly/pfe-button';
import { iconSets } from '@patternfly/pfe-tools/environment';
import { render, html } from 'lit';
import { repeat } from 'lit/directives/repeat.js';

const names = new Map([
  ['fab', 'Font Awesome Brand'],
  ['far', 'Font Awesome'],
  ['fas', 'Font Awesome Solid'],
  ['patternfly', 'PatternFly'],
  ['custom', 'Custom'],
]);

async function copy(event) {
  const { html, icon } = event.target.closest('pfe-button').dataset;
  const tooltip = event.target.closest('li').querySelector('[slot=content]');
  await navigator.clipboard.writeText(html);
  tooltip.textContent = 'Copied!';
  setTimeout(() => tooltip.textContent = icon, 5000);
}

render(repeat(iconSets, ([setName, icons]) => html`
  <h3 id=${setName}>${names.get(setName)}</h3>
  <ul>${icons.map(icon => html`
    <li title="${icon}">
      <pfe-button plain @click=${copy} data-icon="${icon}" data-html='<pfe-icon set="${setName}" icon="${icon}" size="lg" loading="idle"></pfe-icon>'>
        <button>
          <pfe-icon set=${setName} icon=${icon} size="xl" loading="lazy"></pfe-icon>
        </button>
      </pfe-button>
    </li>`)}
  </ul>
`), document.getElementById('pfe-icon-demo-output'));

// pfe-tooltip performance blocks render for over a minute
// render(repeat(iconSets, ([setName, icons]) => html`
//   <h3 id=${setName}>${names.get(setName)}</h3>
//   <ul>${icons.map(icon => html`
//     <li>
//       <pfe-tooltip>
//         <pfe-button plain @click=${copy} data-icon="${icon}" data-html='<pfe-icon set="${setName}" icon="${icon}" size="lg" loading="idle"></pfe-icon>'>
//           <button>
//             <pfe-icon set=${setName} icon=${icon} size="xl" loading="lazy"></pfe-icon>
//           </button>
//         </pfe-button>
//         <span slot="content">${icon}</span>
//       </pfe-tooltip>
//     </li>`)}
//   </ul>
// `), document.getElementById('pfe-icon-demo-output'));
