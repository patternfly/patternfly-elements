import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';

import '@patternfly/pfe-icon';

import styles from './pfe-label.scss';

/**
 * Label
 * @slot - Place element content here
 */
@customElement('pfe-label') @pfelement()
export class PfeLabel extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  /**
   * Sets a value for color for the label
   * Options include grey, blue, green, orange, red, purple, cyan
   * @default grey
   */
  @property({ reflect: true }) color?: 'grey' | 'blue' | 'green' | 'orange' | 'red' | 'purple' | 'cyan' = 'grey';

  /**
  * Sets the value for a icon
  */
  @property({ reflect: true }) icon?: string | null = null;

  /**
  * Sets a value for displaying outline version
  * @default undefined
  */
  @property({ reflect: true }) outline?: string | null;

  render() {
    return html`
      <span class="pfe-label">
        ${this._renderIcon()}
        <span class="pfe-label__content">
          <slot></slot>
        </span>
      </span>
    `;
  }

  private _renderIcon(): TemplateResult {
    if (this.icon) {
      return html`<pfe-icon icon="${this.icon}" size="sm"></pfe-icon>`;
    } else {
      return html``;
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-label': PfeLabel;
  }
}
