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

export function ssrCallConnectedCallback(
  predicate: (element: { localName: string }) => boolean = () => true,
): void {
  LitElementRenderer.renderOptions.push(
    element => predicate(element) ? { connectedCallback: true } : undefined,
  );
}

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
