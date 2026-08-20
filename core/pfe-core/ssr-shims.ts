import { installWindowOnGlobal } from '@lit-labs/ssr/lib/dom-shim.js';
import { LitElementRenderer } from '@lit-labs/ssr/lib/lit-element-renderer.js';

class ObserverShim {
  observe(): void {
    void 0;
  }

  disconnect(): void {
    void 0;
  }
}

class MiniHTMLElement {
  innerHTML = '';
  constructor(public tagName: string) { }
}

class MiniHTMLTemplateElement extends MiniHTMLElement {
  content = { cloneNode: (): string => this.innerHTML };
}

function getComputedStyle() {
  return {
    getPropertyPriority() {
      return '';
    },
    getPropertyValue() {
      return '';
    },
  };
};

type RenderOption = (typeof LitElementRenderer.renderOptions)[number];

/** Callback this module last registered on `LitElementRenderer.renderOptions`. */
let registered: RenderOption | undefined;

/**
 * Opt elements into `connectedCallback` during SSR.
 * Importing this module registers a default that matches all elements, so a
 * bare `import '@patternfly/pfe-core/ssr-shims.js'` keeps the previous behavior.
 * A later call with a predicate replaces that default.
 * Lit evaluates `renderOptions` first-match, so a second push would never
 * restrict the set.
 * @param predicate return true for elements that should receive `connectedCallback`
 */
export function ssrCallConnectedCallback(
  predicate?: (element: { localName: string }) => boolean,
): void {
  const filter = predicate ?? (() => true);
  const option: RenderOption = element =>
    filter(element) ? { connectedCallback: true } : undefined;

  if (registered) {
    const i = LitElementRenderer.renderOptions.indexOf(registered);
    if (i !== -1) {
      LitElementRenderer.renderOptions[i] = option;
      registered = option;
      return;
    }
  }

  registered = option;
  LitElementRenderer.renderOptions.push(option);
}

ssrCallConnectedCallback();

installWindowOnGlobal({
  ErrorEvent: Event,
  IntersectionObserver: ObserverShim,
  MutationObserver: ObserverShim,
  ResizeObserver: ObserverShim,
  getComputedStyle,
});

// @ts-expect-error: this runs in node
globalThis.navigator.userAgent ??= '@lit-labs/ssr';

globalThis.document.createElement = function createElement(tagName: string): HTMLElement {
  switch (tagName) {
    case 'template':
      return new MiniHTMLTemplateElement(tagName) as unknown as HTMLElement;
    default:
      return new MiniHTMLElement(tagName) as HTMLElement;
  }
};
