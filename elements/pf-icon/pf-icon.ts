import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pf-icon.css';

type Renderable = unknown;

export type IconResolverFunction = (set: string, icon: string) =>
  Renderable | Promise<Renderable>;

/**
 * requestIdleCallback when available, requestAnimationFrame when not
 * @param f callback
 */
const ric: typeof globalThis.requestIdleCallback =
     globalThis.requestIdleCallback
  ?? globalThis.requestAnimationFrame
  ?? (async (f: () => void) => Promise.resolve().then(f));

/** Fired when an icon fails to load */
export class IconResolveError extends ErrorEvent {
  constructor(
    set: string,
    icon: string,
    /** The original error when importing the icon module */
    public originalError: Error
  ) {
    super('error', { message: `Could not load icon "${icon}" from set "${set}".` });
  }
}

/**
 * An **icon** component is a container that allows for icons of varying dimensions to
 * seamlessly replace each other without shifting surrounding content.
 * @alias Icon
 * @fires load - Fired when an icon is loaded and rendered
 * @fires error - Fired when an icon fails to load
 * @csspart fallback - Container for the fallback (i.e. slotted) content
 * @cssprop {<length>} --pf-icon--size - size of the icon
 */
@customElement('pf-icon')
export class PfIcon extends LitElement {
  public static readonly styles: CSSStyleSheet[] = [style];

  private static onIntersect: IntersectionObserverCallback = records =>
    records.forEach(({ isIntersecting, target }) => {
      const icon = target as PfIcon;
      icon.#intersecting = isIntersecting;
      ric(() => {
        if (icon.#intersecting) {
          icon.#load();
        }
      });
    });

  private static defaultResolve: IconResolverFunction = (set: string, icon: string): Renderable =>
    import(`@patternfly/icons/${set}/${icon}.js`)
        .then(mod => mod.default.cloneNode(true));

  private static io = new IntersectionObserver(PfIcon.onIntersect);

  private static resolvers = new Map<string, IconResolverFunction>();

  private static instances = new Set<PfIcon>();

  /**
   * Register a new icon set
   * @param setName - The name of the icon set
   * @param resolver - A function that returns the URL of an icon
   * @example returning a URL object
   *          ```js
   *          PfIcon.addIconSet('rh', (set, icon) =>
   *            new URL(`./icons/${set}/${icon}.js`, import.meta.url));
   *          ```
   * @example returning a string
   *          ```js
   *          PfIcon.addIconSet('rh', (set, icon) =>
   *            `/assets/icons/${set}/${icon}.js`);
   *          ```
   */
  public static addIconSet(setName: string, resolver: IconResolverFunction): void {
    if (typeof setName !== 'string') {
      Logger.warn(`[${this.name}]: the first argument to addIconSet must be a string.`);
    } else if (typeof resolver !== 'function') {
      Logger.warn(`[${this.name}]: the second argument to addIconSet must be a function.`);
    } else {
      this.resolvers.set(setName, resolver);
      for (const instance of this.instances) {
        instance.#load();
      }
    }
  }

  /** Removes all added icon sets and resets resolve function */
  public static reset(): void {
    this.resolvers.clear();
    this.resolve = this.defaultResolve;
  }

  /**
   * Gets a renderable icon. Override this to customize how icons are resolved.
   * @param set - The name of the icon set
   * @param icon - The name of the icon
   * @returns The icon content, a node or anything else which lit-html can render
   * @example resolving an icon node from an icon module
   *          ```js
   *          PfIcon.resolve = (set, icon) =>
   *            import(`/assets/icons/${set}/${icon}.js`)
   *              .then(mod => mod.default.cloneNode(true));
   *          ```
   * @example resolving a named export from an icon collection module
   *          ```js
   *          PfIcon.resolve = (set, icon) =>
   *            import(`/assets/icons.js`)
   *              .then(module => module[icon]?.cloneNode(true));
   *          ```
   * @example resolving a new node from an svg file
   *          ```js
   *          const iconCacne = new Map();
   *          function getCachedIconOrNewNode(set, icon, svg) {
   *            const key = `${set}_${icon}`;
   *            if (!iconCache.has(key)) {
   *              const template = document.createElement('template');
   *                    template.innerHTML = svg;
   *              iconCache.set(key, template);
   *            }
   *            return iconCache.get(key);
   *          }
   *          PfIcon.resolve = (set, icon) =>
   *            fetch(`/assets/icons/${set}/${icon}.svg`)
   *              .then(response => response.text())
   *              .then(svg => getCachedIconOrNewNode(set, icon, svg))
   *              .then(node => node.content.cloneNode(true));
   *          ```
   */
  public static resolve: IconResolverFunction = PfIcon.defaultResolve;

  /** Icon set */
  @property() set = 'fas';

  /** Icon name */
  @property({ reflect: true }) icon = '';

  /** Size of the icon */
  @property({ reflect: true }) size: 'sm' | 'md' | 'lg' | 'xl' = 'sm';

  /**
   * Controls how eager the element will be to load the icon data
   * - `eager`: eagerly load the icon, blocking the main thread
   * - `idle`: wait for the browser to attain an idle state before loading
   * - `lazy` (default): wait for the element to enter the viewport before loading
   */
  @property() loading?: 'idle' | 'lazy' | 'eager' = 'lazy';

  /** Icon content. Any value that lit can render */
  @state() private content?: unknown;

  #intersecting = false;

  #logger = new Logger(this);

  #lazyLoad() {
    PfIcon.io.observe(this);
    if (this.#intersecting) {
      this.load();
    }
  }

  #load() {
    switch (this.loading) {
      case 'idle': return void ric(() => this.load());
      case 'lazy': return void this.#lazyLoad();
      case 'eager': return void this.load();
    }
  }

  async #contentChanged() {
    await this.updateComplete;
    this.dispatchEvent?.(new Event('load', { bubbles: true }));
  }

  connectedCallback(): void {
    super.connectedCallback();
    PfIcon.instances.add(this);
  }

  willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('icon')) {
      this.#load();
    }
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    PfIcon.io.unobserve(this);
    PfIcon.instances.delete(this);
  }

  render(): TemplateResult<1> {
    const content = this.content ?? '';
    return html`
      <div id="container" aria-hidden="true">${content}<span part="fallback"
          ?hidden=${!!content}><!-- Slotted content is used as a fallback in case the icon doesn't load --><slot></slot>
        </span>
      </div>
    `;
  }

  protected async load(): Promise<void> {
    const { set, icon } = this;
    const resolver = PfIcon.resolvers.get(set) ?? PfIcon.resolve;
    if (set && icon && typeof resolver === 'function') {
      try {
        this.content = await resolver(set, icon);
        this.#contentChanged();
      } catch (error: unknown) {
        this.#logger.error((error as IconResolveError).message);
        this.dispatchEvent?.(new IconResolveError(set, icon, error as Error));
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-icon': PfIcon;
  }
}
