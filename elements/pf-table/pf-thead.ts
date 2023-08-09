import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-thead.css';

/**
 * Table head
 * @slot - Place element content here
 */
@customElement('pf-thead')
export class PfThead extends LitElement {
  static readonly styles = [styles];

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  render() {
    return html`
      <slot @slotchange=${this.#onSlotchange}></slot>
    `;
  }

  #onSlotchange() {
    for (const th of this.querySelectorAll(':scope > pf-th')) {
      th.setAttribute('role', 'columnheader');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-thead': PfThead;
  }
}
