import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { observed } from '@patternfly/pfe-core/decorators/observed.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-icon.scss';

const ric = window.requestIdleCallback ?? window.requestAnimationFrame;

/**
 * PatternFly Icon
 */
@customElement('pfe-icon')
export class PfeIcon extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  static getIconUrl = (set: string, icon: string) =>
    new URL(`./icons/${set}/${icon}.js`, import.meta.url);

  static onIntersect: IntersectionObserverCallback = records =>
    records.forEach(({ isIntersecting, target }) => ric(() =>
      isIntersecting && target instanceof PfeIcon && target.load()));

  static io = new IntersectionObserver(PfeIcon.onIntersect);

  /** Icon set */
  @property() set = 'fas';

  /** Icon name */
  @observed
  @property({ reflect: true }) icon = '';

  /** Size of the icon */
  @property({ reflect: true }) size: 'sm'|'md'|'lg'|'xl' = 'sm';

  @property({ reflect: true }) label?: string;

  /** Icon SVG lit template */
  @state() private svg?: TemplateResult;

  /**
   * Controls how eager the element will be to load the icon data
   * - `eager`: eagerly load the icon, blocking the main thread
   * - `idle`: wait for the browser to attain an idle state before loading
   * - `lazy` (default): wait for the element to enter the viewport before loading
   */
  @property() loading?: 'idle'|'lazy'|'eager' = 'lazy';

  #logger = new Logger(this);

  render() {
    const ariaHidden = String(!this.label) as 'true'|'false';
    return html`
      <div id="container"
          aria-label=${ifDefined(this.label)}
          aria-hidden=${ariaHidden}>${this.svg ?? html`
        <slot></slot>`}
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
    if (this.set && this.icon) {
      const { pathname } = PfeIcon.getIconUrl(this.set, this.icon);
      try {
        this.svg = await import(pathname).then(m => m.default);
      } catch (error) {
        this.#logger.error(error.message === 'error loading dynamically imported module' ? `Could not load ${pathname}` : error);
      }
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-icon': PfeIcon;
  }
}
