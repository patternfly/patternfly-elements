import type { HTMLIncludeElement } from 'html-include-element';

document.documentElement.toggleAttribute('maximized', localStorage.getItem('pfe-demo-maximized') === 'true');

import 'html-include-element';
import 'api-viewer-element';
import '@vaadin/split-layout';

import { html, render } from 'lit';
import { core, elements } from '@patternfly/pfe-tools/environment.js';
import { URLPattern } from 'urlpattern-polyfill';
import { installRouter } from 'pwa-helpers/router.js';

const pattern = new URLPattern({ pathname: '/demo/:element/' });
const include = document.querySelector<HTMLElement & { src?: string }>('html-include');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
const viewer = document.querySelector<HTMLElement & { src?: string }>('api-viewer');
const github = document.getElementById('github-link') as HTMLAnchorElement;
const form = document.querySelector<HTMLFormElement>('#component-header form');
const context = document.getElementById('context-selector') as HTMLElement;
const contextSelect = context.querySelector('select');
const componentHeader = document.getElementById('component-header');

const contextToColor = new Map(Object.entries({
  dark: 'darkest',
  saturated: 'accent',
  light: 'lightest',
}));

function pretty(tagName: string): string {
  return tagName
    .replace('pfe-', '')
    .toLowerCase()
    .replace(/(?:^|[\s-/])\w/g, x => x.toUpperCase())
    .replace(/-/g, ' ');
}

/**
 * Load demo scripts and scroll to element with id in the URL hash.
 * @this {HTMLElement}
 */
async function onLoad(element: string, base: 'core' | 'elements', location: Location) {
  // not every demo has a script
  // eslint-disable-next-line no-console
  await import(`/${base}/${element}/demo/${element}.js`).catch(console.error.bind(console, element));
  if (location.hash) {
    include.shadowRoot?.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' });
  }
  form.querySelector('fieldset').hidden = include.shadowRoot.querySelectorAll('.contextual').length < 1;
  include.classList.remove('loading');
  componentHeader.classList.remove('loading');
  onContextChange();
  window.removeEventListener('unhandledrejection', handleBadLoad);
}

/* eslint-disable no-console */
/**
 * quick hack to avoid page load errors if subresources are missing from demo files
 * @see https://github.com/justinfagnani/html-include-element/pull/21
 */
async function handleBadLoad() {
  await loadPartial.call(document.querySelector('html-include'));
}

const isLinkAlreadyLoaded = (link: HTMLLinkElement) => {
  try {
    return !!(link.sheet && link.sheet.cssRules);
  } catch (error) {
    if (error.name === 'InvalidAccessError' || error.name === 'SecurityError') {
      return false;
    } else {
      throw error;
    }
  }
};

const linkLoaded = async function linkLoaded(link: HTMLLinkElement) {
  return new Promise((resolve, reject) => {
    if (!('onload' in HTMLLinkElement.prototype)) {
      resolve(null);
    } else if (isLinkAlreadyLoaded(link)) {
      resolve(link.sheet);
    } else {
      link.addEventListener('load', () => resolve(link.sheet), { once: true });
      link.addEventListener('error', () => reject({ link }), { once: true });
    }
  });
};

async function loadPartial(this: HTMLIncludeElement) {
  let text = '';
  try {
    const mode = this.mode || 'cors';
    const response = await fetch(this.getAttribute('src'), { mode });
    if (!response.ok) {
      throw new Error(`html-include fetch failed: ${response.statusText}`);
    }
    text = await response.text();
  } catch (e) {
    console.error(e);
  }
  // Don't destroy the light DOM if we're using shadow DOM, so that slotted content is respected
  if (this.noShadow) {
    this.innerHTML = text;
  }

  this.shadowRoot.innerHTML = `
    <style>
      :host {
        display: block;
      }
    </style>
    ${this.noShadow ? '<slot></slot>' : text}
  `;

  // If we're not using shadow DOM, then the consuming root
  // is responsible to load its own resources
  if (!this.noShadow) {
    const results = await Promise.allSettled([...this.shadowRoot.querySelectorAll('link')].map(linkLoaded));
    for (const result of results) {
      if (result.status === 'rejected') {
        const { link } = result.reason;
        const message = `Could not load ${link.href}`;
        console.error(message);
      }
    }
  }

  this.dispatchEvent(new Event('load'));
}
/* eslint-enable no-console */

/** Load up the requested element's demo in a separate shadow root */
async function go(location = window.location) {
  const { element } = pattern.exec(location.href)?.pathname?.groups ?? {};

  if (element) {
    const base = element.match(/^pfe-(core|sass|styles)$/) ? 'core' : 'elements';
    include.classList.add('loading');
    componentHeader.classList.add('loading');
    include.addEventListener('load', onLoad.bind(include, element, base, location), { once: true });
    include.setAttribute('data-demo', element);

    window.addEventListener('unhandledrejection', handleBadLoad, { once: true });

    include.setAttribute('src', `/${base}/${element}/demo/${element}.html`);

    viewer.src = `/${base}/${element}/custom-elements.json`;
    viewer.hidden = false;
    document.title = `${pretty(element)} | PatternFly Elements`;
    document.querySelector('h1').textContent = `<${element}>`;
    github.href = `https://github.com/patternfly/patternfly-elements/tree/main/${base}/${element}`;
    toggleNav(false);
  } else {
    viewer.src = '';
    viewer.hidden = true;
    document.querySelector('h1').textContent = 'Select a demo from the Menu';
  }
}

/** Change the context of the accordions */
function onContextChange() {
  for (const element of include.shadowRoot.querySelectorAll('.contextual')) {
    element.setAttribute('color-palette', contextToColor.get(contextSelect.value) ?? 'lightest');
  }
}

function toggleNav(force?: boolean | Event) {
  if (window.matchMedia('(max-width: 640px)').matches) {
    const old = typeof force === 'boolean' ? !force : hamburger.getAttribute('aria-expanded') === 'true';
    const next = !old;
    hamburger.setAttribute('aria-expanded', String(next));
    nav.classList.toggle('expanded');
    if (next) {
      const link: HTMLAnchorElement = nav.querySelector('a:active') ?? nav.querySelector('a');
      link.focus();
    }
  }
}

const li = (element: string) => html`
  <li class="site-navigation__item">
    <a class="site-navigation__link" href="/demo/${element}/">${pretty(element)}</a>
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
form.querySelector('button').addEventListener('click', () => {
  for (const svg of form.querySelectorAll('svg')) {
    svg.toggleAttribute('hidden');
  }
  document.documentElement.toggleAttribute('maximized');
  localStorage.setItem('pfe-demo-maximized', document.documentElement.hasAttribute('maximized').toString());
});

context.addEventListener('select', onContextChange);
hamburger.addEventListener('click', toggleNav);
document.addEventListener('click', event => {
  if (hamburger.getAttribute('aria-expanded') === 'true') {
    const path = event.composedPath();

    if (!path.includes(nav) && !path.includes(hamburger)) {
      event.preventDefault();
      event.stopPropagation();
      toggleNav(false);
    }
  }
});

nav.addEventListener('keydown', event => {
  if (hamburger.getAttribute('aria-expanded') === 'true') {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        toggleNav(false);
    }
  }
});
