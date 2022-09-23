import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-icon.scss';

export type URLGetter = (set: string, icon: string) => URL;

/** requestIdleCallback when available, requestAnimationFrame when not */
const ric = window.requestIdleCallback ?? window.requestAnimationFrame;

/** Fired when an icon fails to load */
class IconLoadError extends ErrorEvent {
  constructor(
    pathname: string,
    /** The original error when importing the icon module */
    public originalError: Error
  ) {
    super('error', { message: `Could not load icon at ${pathname}`, bubbles: true });
    this.preventDefault();
  }
}

/**
 * PatternFly Icon component lazy-loads icons and allows custom icon sets
 *
 * @slot - Slotted content is used as a fallback in case the icon doesn't load
 * @fires load - Fired when an icon is loaded and rendered
 * @fires error - Fired when an icon fails to load
 * @csspart fallback - Container for the fallback (i.e. slotted) content
 */
@customElement('pfe-icon')
export class PfeIcon extends LitElement {
  public static readonly version = '{{version}}';

  public static readonly styles = [style];

  public static defaultIconSet = 'fas';

  public static addIconSet(setName: string, getter: typeof PfeIcon['getIconUrl']) {
    if (typeof getter !== 'function') {
      Logger.warn('[PfeIcon.addIconSet(setName, getter)]: getter must be a function');
    } else {
      this.getters.set(setName, getter);
      for (const instance of this.instances) {
        instance.load();
      }
    }
  }

  public static getIconUrl: URLGetter = (set: string, icon: string) =>
    new URL(`./icons/${set}/${icon}.js`, import.meta.url);

  private static onIntersect: IntersectionObserverCallback = records =>
    records.forEach(({ isIntersecting, target }) => {
      const icon = target as PfeIcon;
      icon.#intersecting = isIntersecting;
      ric(() => {
        if (icon.#intersecting) {
          icon.load();
        }
      });
    });

  private static io = new IntersectionObserver(PfeIcon.onIntersect);

  private static getters = new Map<string, URLGetter>();

  private static instances = new Set();

  /** Icon set */
  @property() set = PfeIcon.defaultIconSet;

  /** Icon name */
  @observed
  @property({ reflect: true }) icon = '';

  /** Size of the icon */
  @property({ reflect: true }) size: 'sm'|'md'|'lg'|'xl' = 'sm';

  /** Accessible label for the icon */
  @property({ reflect: true }) label?: string;

  /**
   * Controls how eager the element will be to load the icon data
   * - `eager`: eagerly load the icon, blocking the main thread
   * - `idle`: wait for the browser to attain an idle state before loading
   * - `lazy` (default): wait for the element to enter the viewport before loading
   */
  @property() loading?: 'idle'|'lazy'|'eager' = 'lazy';

  /** Icon content. Any value that lit can render */
  @state() private content?: unknown;

  #intersecting = false;

  #logger = new Logger(this);

  #lazyLoad() {
    PfeIcon.io.observe(this);
    if (this.#intersecting) {
      this.load();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    PfeIcon.instances.add(this);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    PfeIcon.instances.delete(this);
  }

  render() {
    const ariaHidden = String(!this.label) as 'true'|'false';
    return html`
      <div id="container"
          aria-label=${ifDefined(this.label)}
          aria-hidden=${ariaHidden}>
        ${this.content ?? ''}
        <span part="fallback" ?hidden=${!!this.content}>
          <slot></slot>
        </span>
      </div>
    `;
  }

  protected async _iconChanged() {
    switch (this.loading) {
      case 'idle': return void ric(() => this.load());
      case 'lazy': return void this.#lazyLoad();
      case 'eager': return void this.load();
    }
  }

  protected async load() {
    const { set, icon, } = this;
    const getter = PfeIcon.getters.get(set) ?? PfeIcon.getIconUrl;
    let pathname = 'UNKNOWN ICON';
    if (set && icon) {
      try {
        ({ pathname } = getter(set, icon));
        const mod = await import(pathname);
        this.content = mod.default instanceof Node ? mod.default.cloneNode(true) : mod.default;
        await this.updateComplete;
        this.dispatchEvent(new Event('load', { bubbles: true }));
      } catch (error: unknown) {
        const event = new IconLoadError(pathname, error as Error);
        this.#logger.error(event.message);
        this.dispatchEvent(event);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-icon': PfeIcon;
  }
}
