import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-year-input.css';

/**
 * Year Input
 * @slot - Place element content here
 */
@customElement('pf-year-input')
export class PfYearInput extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-year-input': PfYearInput;
  }
}
