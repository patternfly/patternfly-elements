import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-date-picker.css';

/**
 * Date Picker
 * @slot - Place element content here
 */
@customElement('pf-date-picker')
export class PfDatePicker extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-date-picker': PfDatePicker;
  }
}
