import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-caption.css';

/**
 * Caption
 * @slot - Place element content here
 */
@customElement('pf-caption')
export class PfCaption extends LitElement {
  static readonly styles = [styles];

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-caption': PfCaption;
  }
}
