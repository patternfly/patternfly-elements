import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-tbody.css';

/**
 * Table body
 * @slot - Place element content here
 */
@customElement('pf-tbody')
export class PfTbody extends LitElement {
  static readonly styles = [styles];

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  render() {
    return html`
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-tbody': PfTbody;
  }
}
