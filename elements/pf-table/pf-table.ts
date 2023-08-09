import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';

import styles from './pf-table.css';
import { PfTh, type ThSortEvent } from './pf-th.js';
import { styleMap } from 'lit/directives/style-map.js';

const rowQuery = [
  ':scope > pf-tbody > pf-tr',
  ':scope > pf-tbody > pf-tbody[expandable]',
  ':scope > pf-tr',
  ':scope > pf-tbody[expandable]',
].join();

/**
 * Table
 * @slot - Place element content here
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true, attribute: 'sort-direction' }) sortDirection!: 'asc' | 'desc';

  get sortableRows() {
    return [...this.querySelectorAll(rowQuery)];
  }

  #hasExpandableRows = false;
  #defaultRows!: Element[];
  #sortDirection!: 'asc' | 'desc';
  #sortColumn!: PfTh | null;

  connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  render() {
    const firstRow = this.querySelector('pf-tr');
    const coeffRows = this.#hasExpandableRows ? '1' : '0';
    const numCols = `${firstRow?.querySelectorAll('pf-th')?.length ?? 0}`;
    return html`
      <slot @slotchange="${this.#onSlotchange}"
            @sort="${this.#onSort}"
            style="${styleMap({
              '--_pf-table--expandable-rows': coeffRows,
              '--_pf-table--number-of-columns': numCols,
            })}"
      ></slot>
    `;
  }

  #onSlotchange() {
    const { sortableRows } = this;
    if (!this.sortDirection || this.#defaultRows.length !== sortableRows.length) {
      this.#defaultRows = sortableRows;
    }
    this.#hasExpandableRows = !!this.querySelector('pf-tbody[expandable]');
    this.requestUpdate();
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
      const { sortableRows: rows } = this;
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
        const sortedRow = rows.at(i);
        if (sortedRow) {
          this.insertBefore(row, sortedRow);
        }
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-table': PfTable;
  }
}
