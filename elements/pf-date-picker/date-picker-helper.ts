import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './date-picker-helper.css';

/**
 * Picker Helper
 * @slot - Place element content here
 */
@customElement('date-picker-helper')
export class DatePickerHelper extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'date-picker-helper': DatePickerHelper;
  }
}
