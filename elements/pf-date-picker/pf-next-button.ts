import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-next-button.css';

/**
 * Next Button
 * @slot - Place element content here
 */
@customElement('pf-next-button')
export class PfNextButton extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-next-button': PfNextButton;
  }
}
