import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pf-icon.css';

export type URLGetter = (set: string, icon: string) => URL | string;

/** requestIdleCallback when available, requestAnimationFrame when not */
const ric = window.requestIdleCallback ?? window.requestAnimationFrame;

/** Fired when an icon fails to load */
class IconLoadError extends ErrorEvent {
  constructor(
    pathname: string,
    /** The original error when importing the icon module */
    public originalError: Error
  ) {
    super('error', { message: `Could not load icon at ${pathname}` });
  }
}

/**
 * An **icon** component is a container that allows for icons of varying dimensions to
 * seamlessly replace each other without shifting surrounding content.
 *
 * @slot - Slotted content is used as a fallback in case the icon doesn't load
 * @fires load - Fired when an icon is loaded and rendered
 * @fires error - Fired when an icon fails to load
 * @csspart fallback - Container for the fallback (i.e. slotted) content
 */
@customElement('pf-icon')
export class PfIcon extends LitElement {
  public static readonly styles = [style];

  public static defaultIconSet = 'fas';

  public static addIconSet(setName: string, getter: URLGetter) {
    if (typeof getter !== 'function') {
      Logger.warn(`[${this.name}.addIconSet(setName, getter)]: getter must be a function`);
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
      const icon = target as PfIcon;
      icon.#intersecting = isIntersecting;
      ric(() => {
        if (icon.#intersecting) {
          icon.load();
        }
      });
    });

  private static io = new IntersectionObserver(PfIcon.onIntersect);

  private static getters = new Map<string, URLGetter>();

  private static instances = new Set<PfIcon>();

  /** Icon set */
  @property() set = this.#class.defaultIconSet;

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

  get #class(): typeof PfIcon {
    return this.constructor as typeof PfIcon;
  }

  #lazyLoad() {
    this.#class.io.observe(this);
    if (this.#intersecting) {
      this.load();
    }
  }

  #iconChanged() {
    switch (this.loading) {
      case 'idle': return void ric(() => this.load());
      case 'lazy': return void this.#lazyLoad();
      case 'eager': return void this.load();
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.#class.instances.add(this);
  }

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('icon')) {
      this.#iconChanged();
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.#class.instances.delete(this);
  }

  render() {
    const content = this.content ?? ''; /* eslint-disable indent */
    return html`
      <div id="container" aria-hidden="true">${content
       }<span part="fallback" ?hidden=${!!content}>
          <slot></slot>
        </span>
      </div>
    `;/* eslint-enable indent */
  }

  protected async load() {
    const { set, icon, } = this;
    const getter = this.#class.getters.get(set) ?? this.#class.getIconUrl;
    let spec = 'UNKNOWN ICON';
    if (set && icon) {
      try {
        const gotten = getter(set, icon);
        if (gotten instanceof URL) {
          spec = gotten.pathname;
        } else {
          spec = gotten;
        }
        const mod = await import(spec);
        this.content = mod.default instanceof Node ? mod.default.cloneNode(true) : mod.default;
        await this.updateComplete;
        this.dispatchEvent(new Event('load', { bubbles: true }));
      } catch (error: unknown) {
        const event = new IconLoadError(spec, error as Error);
        this.#logger.error((error as IconLoadError).message);
        this.dispatchEvent(event);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-icon': PfIcon;
  }
}
