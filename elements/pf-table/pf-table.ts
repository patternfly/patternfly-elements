import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';
export * from './pf-expandable-rowset.js';
export * from './pf-expandable-row.js';
export * from './pf-expand-toggle.js';

import styles from './pf-table.css';

/**
 * Table
 * @slot - Place element content here
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'table';

  render() {
    return html`<slot @slotchange=${this.#onSlotchange}></slot>`;
  }

  #onSlotchange() {
    const firstRow = this.querySelector('pf-tr');
    this.style.setProperty('--pf-table--number-of-columns', `${firstRow?.querySelectorAll('pf-th')?.length || 0}`);
    this.requestUpdate();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-table': PfTable;
  }
}
