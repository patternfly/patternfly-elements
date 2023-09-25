import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-previous-button.css';

/**
 * Previous Button
 * @slot - Place element content here
 */
@customElement('pf-previous-button')
export class PfPreviousButton extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-previous-button': PfPreviousButton;
  }
}
