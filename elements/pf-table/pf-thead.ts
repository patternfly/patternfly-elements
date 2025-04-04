import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import { thRoleContext } from './context.js';

import styles from './pf-thead.css';
import { provide } from '@lit/context';

/**
 * Table head
 * @slot - Place element content here
 */
@customElement('pf-thead')
export class PfThead extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @provide({ context: thRoleContext }) private thRowContext = 'colheader';

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
