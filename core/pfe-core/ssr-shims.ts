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
 * Set the legacy global flag Lit reads to opt every element in.
 * Assigning through this helper keeps the property typed without augmenting
 * the global type for consumers.
 * @param value whether every element opts in
 */
function setLegacyConnectedCallbackFlag(value: boolean): void {
  (globalThis as typeof globalThis & { litSsrCallConnectedCallback?: boolean })
      .litSsrCallConnectedCallback = value;
}

/**
 * Opt elements into `connectedCallback` during SSR.
 *
 * Called with no options, this keeps the previous behavior: every element
 * receives `connectedCallback`. It does so through the same
 * `globalThis.litSsrCallConnectedCallback` flag earlier versions set, and adds
 * nothing to `LitElementRenderer.renderOptions`, so existing `renderOptions`
 * configuration (such as `disableSsr`) keeps its order and precedence.
 *
 * Called with options, it filters which elements receive `connectedCallback`.
 * The legacy global is cleared because Lit ORs it with `renderOptions`, so it
 * would otherwise override the filter. A later call replaces this module's
 * option in place, since Lit evaluates `renderOptions` first-match and a second
 * push would never restrict the set.
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
 * @param options which elements receive `connectedCallback`. Omit to opt every
 *   element in, as previous versions did.
 */
export function ssrCallConnectedCallback(
  options?: SsrCallConnectedCallbackOptions,
): void {
  if (options === undefined) {
    // Preserve the pre-filter behavior exactly: the legacy global opts every
    // element in and renderOptions is left untouched.
    setLegacyConnectedCallbackFlag(true);
    if (registered) {
      const index = LitElementRenderer.renderOptions.indexOf(registered);
      if (index !== -1) {
        LitElementRenderer.renderOptions.splice(index, 1);
      }
      registered = undefined;
    }
    return;
  }

  const include = options.include ?? (() => true);
  const exclude = options.exclude ?? (() => false);
  const option: RenderOption = element =>
    include(element) && !exclude(element) ? { connectedCallback: true } : undefined;

  // Lit checks the legacy global before renderOptions; clear it so the filter
  // can actually narrow the set.
  setLegacyConnectedCallbackFlag(false);

  if (registered) {
    const index = LitElementRenderer.renderOptions.indexOf(registered);
    if (index !== -1) {
      LitElementRenderer.renderOptions[index] = option;
      registered = option;
      return;
    }
  }

  registered = option;
  LitElementRenderer.renderOptions.push(option);
}

// Preserve the behavior of importing this module: opt every element in.
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
