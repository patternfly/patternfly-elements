import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-calendar.css';

/**
 * Calendar
 * @slot - Place element content here
 */
@customElement('pf-calendar')
export class PfCalendar extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-calendar': PfCalendar;
  }
}
