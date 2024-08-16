import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-td.css';
import { RequestExpandEvent } from './pf-tr.js';

/**
 * Table data cell
 * @slot - Place element content here
 */
@customElement('pf-td')
export class PfTd extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ attribute: 'compound-expand' }) compoundExpand?: string;

  @property({ type: Boolean, reflect: true }) expanded = false;

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'cell');
  }

  render(): TemplateResult<1> {
    return this.compoundExpand ? html`
      <button @click="${this.#onClick}">
        <slot></slot>
      </button>
    ` : html`
      <slot></slot>
    `;
  }

  #onClick() {
    const row = this.closest('pf-tr');
    const cell = this.compoundExpand;
    const event =
        !row ? new RequestExpandEvent()
      : new RequestExpandEvent(row.expanded === cell || cell || false, row);
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-td': PfTd;
  }
}
