import 'api-viewer-element';
import '@vaadin/split-layout';

const include = document.querySelector<HTMLElement & { src?: string }>('html-include');
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('main-nav');
const form = document.querySelector<HTMLFormElement>('#component-header form');
const context = document.getElementById('context-selector') as HTMLElement;
const contextSelect = context.querySelector('select');

const contextToColor = new Map(Object.entries({
  dark: 'darkest',
  saturated: 'accent',
  light: 'lightest',
}));

/** Change the context of the accordions */
function onContextChange() {
  for (const element of include?.shadowRoot?.querySelectorAll('.contextual') ?? []) {
    element.setAttribute('color-palette', contextToColor.get(contextSelect?.value ?? '') ?? 'lightest');
  }
}

function toggleNav(force?: boolean | Event) {
  if (window.matchMedia('(max-width: 640px)').matches) {
    const old = typeof force === 'boolean' ? !force : hamburger?.getAttribute('aria-expanded') === 'true';
    const next = !old;
    hamburger?.setAttribute('aria-expanded', String(next));
    nav?.classList.toggle('expanded');
    if (next) {
      const link: HTMLAnchorElement|null = nav?.querySelector('a:active') ?? nav?.querySelector('a') ?? null;
      link?.focus();
    }
  }
}

function onMaximize(force?: boolean) {
  for (const svg of form?.querySelectorAll('svg') ?? []) {
    svg.toggleAttribute('hidden');
  }
  document.documentElement.toggleAttribute('maximized', force);
  localStorage.setItem('pfe-demo-maximized', document.documentElement.hasAttribute('maximized').toString());
}

function attachShadowRoots(root: Document | ShadowRoot) {
  root.querySelectorAll('template[shadowroot]').forEach(template => {
    if (template instanceof HTMLTemplateElement) {
      const mode = template.getAttribute('shadowroot') as 'open';
      const shadowRoot: ShadowRoot = (template.parentNode as HTMLElement).attachShadow({ mode });
      shadowRoot.appendChild(template.content);
      template.remove();
      attachShadowRoots(shadowRoot);
    }
  });
}

form?.addEventListener('submit', e => e.preventDefault());
form?.querySelector('button')?.addEventListener('click', () => onMaximize());

context.addEventListener('select', onContextChange);
hamburger?.addEventListener('click', toggleNav);

document.addEventListener('click', event => {
  if (hamburger?.getAttribute('aria-expanded') === 'true') {
    const path = event.composedPath();
    if (!path.includes(nav!) && !path.includes(hamburger)) {
      event.preventDefault();
      event.stopPropagation();
      toggleNav(false);
    }
  }
});

nav?.addEventListener('keydown', event => {
  if (hamburger?.getAttribute('aria-expanded') === 'true') {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        toggleNav(false);
    }
  }
});

attachShadowRoots(document);
document.documentElement.toggleAttribute('maximized', localStorage.getItem('pfe-demo-maximized') === 'true');
document.documentElement.removeAttribute('unresolved');
