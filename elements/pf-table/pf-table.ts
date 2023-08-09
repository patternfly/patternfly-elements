import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';

import styles from './pf-table.css';
import type { PfTr } from './pf-tr.js';
import { PfTh, type ThSortEvent } from './pf-th.js';
import { styleMap } from 'lit/directives/style-map.js';

const rowQuery = [
  ':scope > pf-tbody:not([expandable]) > pf-tr',
  ':scope > pf-tbody > pf-tr[expandable]',
  ':scope > pf-tr',
  ':scope > pf-tr[expandable]',
].join();

/**
 * Table
 * @slot - Place element content here
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles = [styles];

  get rows() {
    return this.querySelectorAll<PfTr>(rowQuery);
  }

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
  }

  render() {
    const firstRow = this.querySelector('pf-tr');
    const hasExpandableRow = !!this.querySelector('pf-tr[expandable]');
    const coeffRows = hasExpandableRow ? '1' : '0';
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
    this.requestUpdate();
  }

  #onSort(event: ThSortEvent) {
    for (const col of this.querySelectorAll<PfTh>('pf-th[sortable]')) {
      col.selected = col === event.target;
      if (col !== event.target) {
        col.removeAttribute('sort-direction');
      }
    }
    if (!event.defaultPrevented &&
        event.target instanceof PfTh) {
      this.#performSort(event.direction, event.target);
    }
  }

  #performSort(direction: 'asc' | 'desc', column: PfTh) {
    const children = column.parentElement?.children;
    if (children) {
      const columnIndexToSort = [...children].indexOf(column);
      Array.from(this.rows, node => {
        const content = node.querySelector(`
          :scope > :is(pf-th, pf-td):nth-child(${columnIndexToSort + 1}),
          :scope > pf-tr > :is(pf-th, pf-td):nth-child(${columnIndexToSort + 1})
        `.trim())?.textContent?.trim()?.toLowerCase() ?? '';
        return { node, content };
      }).sort((a, b) => {
        if (direction === 'asc') {
          return (a.content < b.content ? -1 : a.content > b.content ? 1 : 0);
        } else {
          return (b.content < a.content ? -1 : b.content > a.content ? 1 : 0);
        }
      }).forEach(({ node }, index) => {
        const target = this.rows[index];
        if (this.rows[index] !== node) {
          const position: InsertPosition =
              direction === 'desc' ? 'afterend' : 'beforebegin';
          target.insertAdjacentElement(position, node);
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
