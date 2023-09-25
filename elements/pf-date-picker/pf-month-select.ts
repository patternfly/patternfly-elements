import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-month-select.css';

/**
 * Month Select
 * @slot - Place element content here
 */
@customElement('pf-month-select')
export class PfMonthSelect extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-month-select': PfMonthSelect;
  }
}
