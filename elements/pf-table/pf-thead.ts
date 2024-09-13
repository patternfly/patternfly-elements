import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from '@patternfly/pfe-core/decorators/custom-element.js';

import styles from './pf-thead.css';

/**
 * Table head
 * @slot - Place element content here
 */
@customElement('pf-thead')
export class PfThead extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'rowgroup');
  }

  render(): TemplateResult<1> {
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
