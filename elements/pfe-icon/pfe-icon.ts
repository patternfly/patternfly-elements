import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-icon.scss';

export type URLGetter = (set: string, icon: string) => URL;

const ric = window.requestIdleCallback ?? window.requestAnimationFrame;

/**
 * PatternFly Icon component lazy-loads icons and allows custom icon sets
 *
 * @slot - Slotted content is used as a fallback in case the icon doesn't load
 * @csspart fallback - Container for the fallback (i.e. slotted) content
 */
@customElement('pfe-icon')
export class PfeIcon extends LitElement {
  public static readonly version = '{{version}}';

  public static readonly styles = [style];

  public static defaultIconSet = 'fas';

  public static addIconSet(set: string, getter: typeof PfeIcon['getIconUrl']) {
    this.getters.set(set, getter);
  }

  public static getIconUrl: URLGetter = (set: string, icon: string) =>
    new URL(`./icons/${set}/${icon}.js`, import.meta.url);

  private static onIntersect: IntersectionObserverCallback = records =>
    records.forEach(({ isIntersecting, target }) => ric(() =>
      isIntersecting && target instanceof PfeIcon && target.load()));

  private static io = new IntersectionObserver(PfeIcon.onIntersect);

  private static getters = new Map<string, URLGetter>();

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

  #logger = new Logger(this);

  render() {
    const ariaHidden = String(!this.label) as 'true'|'false';
    const { content, label } = this;
    return html`
      <div id="container"
          aria-label=${ifDefined(label)}
          aria-hidden=${ariaHidden}>
        ${content}
        <span part="fallback" ?hidden=${!!content}>
          <slot></slot>
        </span>
      </div>
    `;
  }

  protected async _iconChanged() {
    switch (this.loading) {
      case 'idle': return void ric(() => this.load());
      case 'lazy': return void PfeIcon.io.observe(this);
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
        this.content = await import(pathname).then(m => m.default);
      } catch (error: unknown) {
        this.#logger.error(`Could not load ${pathname}`, (error as Error).message);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-icon': PfeIcon;
  }
}
