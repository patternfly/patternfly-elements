import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import styles from './pf-progress.css';

const ICONS = new Map(Object.entries({
  success: { icon: 'circle-check' },
  danger: { icon: 'circle-xmark' },
  warning: { icon: 'triangle-exclamation' }
}));

/**
 * Progress
 * @slot - Place element content here
 */
@customElement('pf-progress')
export class PfProgress extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true, type: Number })
    value = 0;

  @property({ reflect: true })
    title = '';

  @property({ reflect: true })
    label = '';

  @property({ reflect: true })
    size: 'sm' | 'lg' | '' = '';

  @property({ reflect: true, attribute: 'measure-location' })
    measureLocation: '' | 'outside' | 'inside' | 'none' = '';

  @property({ reflect: true })
    variant: '' | 'success' | 'danger' | 'warning' = '';

  @query('#bar')
    bar!: HTMLElement;

  #showInsideStatus() {
    return this.measureLocation === 'inside';
  }

  async #updateAccessibility() {
    !!await this.updateComplete;

    const { bar, value } = this;
    bar.setAttribute('aria-valuenow', `${value}`);
    if (this.title.length > 0 && this.bar !== null) {
      this.bar.setAttribute('aria-labelledby', 'title');
    } else if (this.bar !== null) {
      this.bar.setAttribute('aria-label', this.label);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.#updateAccessibility();
  }

  render() {
    const { size, measureLocation, variant, value, title } = this;
    const icon = variant && ICONS.get(variant)?.icon;
    const singleLine = title.length === 0 ? 'singleline' : '';

    return html`
      <div class="container ${classMap({ [size]: !!size, [measureLocation]: !!measureLocation, [variant]: !!variant, [singleLine]: !!singleLine })}">
        <div id="title" class="title">${title}</div>
        <div class="status">
          ${html`${!this.#showInsideStatus() ? `${value}%` : ''}`}
          <pf-icon set="fas"
                   size="md"
                   ?hidden="${!icon}"
                   icon="${ifDefined(icon)}"></pf-icon>
        </div>
        <div id="bar" role="progressbar">
          <div class="indicator" style="${styleMap({ 'width': `${value}%` })}">
            <div class="measure">
              ${html`${this.#showInsideStatus() ? `${value}%` : ''}`}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-progress': PfProgress;
  }
}
