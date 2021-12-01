import { html, render } from 'lit';
import { core, elements } from '@patternfly/pfe-tools/environment.js';
import { URLPattern } from 'urlpattern-polyfill';
import { installRouter } from 'pwa-helpers/router.js';

const pattern = new URLPattern({ pathname: '/demo/:element/' });
const include = document.querySelector<HTMLElement & { src?: string }>('html-include');
const viewer = document.querySelector<HTMLElement & { src?: string }>('api-viewer');
const github = document.getElementById('github-link') as HTMLAnchorElement;
const form = document.querySelector<HTMLFormElement>('pfe-band[role="header"] form');
const context = document.getElementById('context-selector') as HTMLElement;
const contextSelect = context.querySelector('select');

const contextToColor = new Map(Object.entries({
  dark: 'darkest',
  saturated: 'accent',
  light: 'lightest',
}));

/**
 * Load demo scripts and scroll to element with id in the URL hash.
 * @this {HTMLElement}
 */
async function onLoad(element: string, base: 'core'|'elements', location: Location) {
  // not every demo has a script
  // eslint-disable-next-line no-console
  await import(`/${base}/${element}/demo/${element}.js`).catch(console.error.bind(console, element));
  if (location.hash) {
    include.shadowRoot?.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
  }
  form.hidden = include.shadowRoot.querySelectorAll('.contextual').length < 1;
  onContextChange();
}

/** Load up the requested element's demo in a separate shadow root */
async function go(location = window.location) {
  const { element } = pattern.exec(location.href)?.pathname?.groups ?? {};

  if (element) {
    const base = element.match(/^pfe-(core|sass|styles)$/) ? 'core' : 'elements';
    include.addEventListener('load', onLoad.bind(include, element, base, location), { once: true });
    include.setAttribute('data-demo', element);
    include.src = `/${base}/${element}/demo/${element}.html`;
    viewer.src = `/${base}/${element}/custom-elements.json`;
    viewer.hidden = false;
    document.title = `${element} | PatternFly Elements`;
    document.querySelector('h1').textContent = `<${element}>`;
    github.href = `https://github.com/patternfly/patternfly-elements/tree/master/${base}/${element}`;
  } else {
    viewer.src = '';
    viewer.hidden = true;
    document.querySelector('h1').textContent = 'Select a demo from the Menu';
  }
}

/** Change the context of the accordions */
function onContextChange() {
  for (const element of include.shadowRoot.querySelectorAll('.contextual')) {
    element.setAttribute('color', contextToColor.get(contextSelect.value) ?? 'lightest');
  }
}

const li = (element: string) => html`
  <li class="site-navigation__item">
    <a class="site-navigation__link" href="/demo/${element}/">${element}</a>
  </li>
`;

render([
  ...core.map(li),
  html`<li class="separator"></li>`,
  ...elements.map(li),
], document.getElementById('elements-container'));

installRouter(go);

go();

form.addEventListener('submit', e => e.preventDefault());

context.addEventListener('pfe-select:change', onContextChange);
