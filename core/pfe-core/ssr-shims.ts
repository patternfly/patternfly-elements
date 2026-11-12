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

type ElementPredicate = (element: { localName: string }) => boolean;

/** Options for {@link ssrCallConnectedCallback}. */
export interface SsrCallConnectedCallbackOptions {
  /**
   * Return true for elements that should receive `connectedCallback` during SSR.
   * @default () => true
   */
  include?: ElementPredicate;

  /**
   * Return true for elements that should not receive `connectedCallback` during SSR.
   * Takes precedence over {@link include}.
   * @default () => false
   */
  exclude?: ElementPredicate;
}

/** Callback this module last registered on `LitElementRenderer.renderOptions`. */
let registered: RenderOption | undefined;

/**
 * Opt elements into `connectedCallback` during SSR.
 * Importing this module registers a default that matches all elements, so a
 * bare `import '@patternfly/pfe-core/ssr-shims.js'` keeps the previous behavior.
 * A later call replaces that default.
 * Lit evaluates `renderOptions` first-match, so a second push would never
 * restrict the set.
 *
 * Elements matched by `exclude` never receive `connectedCallback` from this
 * module, even when `include` also matches them.
 *
 * @example Restrict the opt-in to PatternFly and Red Hat elements
 * ```ts
 * ssrCallConnectedCallback({
 *   include: el => el.localName.startsWith('pf-') || el.localName.startsWith('rh-'),
 *   exclude: el => el.localName === 'pf-icon',
 * });
 * ```
 * @example Opt out entirely
 * ```ts
 * ssrCallConnectedCallback({ exclude: () => true });
 * ```
 * @param options which elements receive `connectedCallback`
 */
export function ssrCallConnectedCallback(
  options: SsrCallConnectedCallbackOptions = {},
): void {
  const include = options.include ?? (() => true);
  const exclude = options.exclude ?? (() => false);
  const option: RenderOption = element =>
    include(element) && !exclude(element) ? { connectedCallback: true } : undefined;

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
