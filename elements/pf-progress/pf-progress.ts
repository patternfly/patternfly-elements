import { LitElement, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';

import styles from './pf-progress.css';

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

  showStatus(status: Array<string>) {
    return status.includes(this.measureLocation);
  }

  async #updateAccessibility() {
    !!await this.updateComplete;

    const { bar, value } = this;
    bar.setAttribute('aria-valuenow', `${value}`);
    if (this.title.length > 0 && this.bar !== null) {
      this.bar.setAttribute('aria-labelledby', 'description');
    } else if (this.bar !== null) {
      this.bar.setAttribute('aria-label', this.label);
    }
  }

  connectedCallback() {
    super.connectedCallback();
    this.#updateAccessibility();
  }

  render() {
    const { size, measureLocation, variant } = this;
    const singleLine = this.title.length === 0 ? 'singleline' : '';
    return html`
      <div class="container ${classMap({ [size]: !!size, [measureLocation]: !!measureLocation, [variant]: !!variant, [singleLine]: !!singleLine })}">
        <div id="description" class="description">${this.title}</div>
        <div class="status">
          ${this.showStatus(['outside', '']) ? html`${this.value}%` : html``}
          ${this.variant ?
              html`<pf-icon set="fas" icon="${this.variant === 'success' ? 'circle-check'
                      : this.variant === 'warning' ? 'triangle-exclamation'
                      : this.variant === 'danger' ? 'circle-xmark'
                    : ''
              }" size="md"></pf-icon>`
          : html``
}
        </div>
        <div id="bar" class="bar" role="progressbar">
          <div class="indicator" style="width: ${this.value}%">
            <div class="measure">${this.showStatus(['inside']) ? html`${this.value}%` : html``}</div>
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
