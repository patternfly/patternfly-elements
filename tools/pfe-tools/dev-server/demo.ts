const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const list = matchMedia('(max-width: 640px)');
const LS_KEY = 'pfe-tools-dev-server-maximized';

function toggleNav(force?: boolean) {
  const old = sidebar?.getAttribute('aria-expanded') === 'true';
  const next = force ?? !old;
  sidebar?.setAttribute('aria-expanded', String(next));
  document.body.classList.toggle('menu-open', next);
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

function onClick() {
  const next = sidebar?.getAttribute('aria-expanded') !== 'true';
  if (next) {
    localStorage.removeItem(LS_KEY);
  } else {
    localStorage.setItem(LS_KEY, 'true');
  }
  toggleNav();
}

function onKeydown(event: KeyboardEvent) {
  if (sidebar?.getAttribute('aria-expanded') === 'true') {
    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        event.stopPropagation();
        toggleNav(false);
    }
  }
}

function onMediaChange() {
  toggleNav(!list.matches);
}

sidebar?.addEventListener('keydown', onKeydown);
hamburger?.addEventListener('click', onClick);
document.documentElement.removeAttribute('unresolved');

list.addEventListener('change', onMediaChange);

onMediaChange();

if (!Object.prototype.hasOwnProperty.call(HTMLTemplateElement.prototype, 'shadowRoot')) {
  attachShadowRoots(document);
}

if (localStorage.getItem(LS_KEY)) {
  toggleNav(false);
}
