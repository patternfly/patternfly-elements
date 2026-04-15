import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import { thRoleContext } from './context.js';

import styles from './pf-v5-thead.css';
import { provide } from '@lit/context';

/**
 * Table head
 * @slot - Place element content here
 */
@customElement('pf-v5-thead')
export class PfV5Thead extends LitElement {
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
    for (const th of this.querySelectorAll(':scope > pf-v5-th')) {
      th.setAttribute('role', 'columnheader');
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-thead': PfV5Thead;
  }
}
