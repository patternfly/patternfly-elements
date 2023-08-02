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
import { PfTh, type ThSortEvent } from './pf-th.js';

/**
 * Table
 * @slot - Place element content here
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) role = 'table';
  @property({ reflect: true, attribute: 'sort-direction' }) sortDirection!: 'asc' | 'desc';

  #hasExpandableRows = false;
  #defaultRows!: Element[];
  #sortDirection!: 'asc' | 'desc';
  #sortColumn!: PfTh | null;
  #sortIndex = -1;

  render() {
    return html`<slot @slotchange=${this.#onSlotchange} @sort=${this.#onSort}></slot>`;
  }

  #onSlotchange() {
    const sortableRows = [...this.sortableRows];
    if (!this.sortDirection || this.#defaultRows.length !== sortableRows.length) {
      this.#defaultRows = sortableRows;
    }
    const firstRow = this.querySelector('pf-tr');
    this.#hasExpandableRows = !!this.querySelector('pf-expandable-rowset');
    this.style.setProperty('--pf-table--expanable-rows', this.#hasExpandableRows ? '1' : '0');
    this.style.setProperty('--pf-table--number-of-columns', `${firstRow?.querySelectorAll('pf-th')?.length || 0}`);
    this.requestUpdate();
  }

  get sortableRows() {
    const rowQuery = [
      ':scope > pf-tbody > pf-tr',
      ':scope > pf-tbody > pf-expandable-rowset',
      ':scope > pf-tr',
      ':scope > pf-expandable-rowset',
    ].join();
    return [...this.querySelectorAll(rowQuery)];
  }

  #onSort(event: ThSortEvent) {
    if (this.#sortColumn !== event.target) {
      if (this.#sortColumn) {
        this.#sortColumn.removeAttribute('sort-direction');
      }
      this.#sortColumn = event.target as PfTh;
    }
    this.#sortDirection = event.direction;
    if (this.#sortColumn?.parentElement?.children) {
      const index = [...this.#sortColumn.parentElement.children].indexOf(this.#sortColumn);
      const rows = [...this.sortableRows];
      const sorted = rows.sort((a, b) => {
        const pfTh = `:is(pf-th, pf-td):nth-child(${index + 1})`;
        const thQuery = [
          `:scope > ${pfTh}`,
          `:scope > pf-tr > ${pfTh}`
        ].join();
        const content = (cell: Element) => {
          return cell.querySelector(thQuery)?.textContent?.trim()?.toLowerCase() || '';
        };
        const aTh = content(a);
        const bTh = content(b);
        return this.#sortDirection === 'asc' ? (aTh < bTh ? -1 : 0) : (bTh < aTh ? -1 : 0);
      });
      sorted.forEach((row, i) => {
        this.insertBefore(row, [...this.sortableRows][i]);
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-table': PfTable;
  }
}
