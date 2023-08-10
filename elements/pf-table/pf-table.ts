import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';
import { state } from 'lit/decorators/state.js';

import { RequestExpandEvent, PfTr } from './pf-tr.js';
import { PfTh, type ThSortEvent } from './pf-th.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';

import styles from './pf-table.css';
import { PfTd } from './pf-td.js';

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

  @state() private columns = 0;

  override connectedCallback() {
    super.connectedCallback();
    this.setAttribute('role', 'table');
    this.#onSlotchange();
  }

  render() {
    const hasExpandableRow = !!this.querySelector('pf-tr[expandable]');
    const coeffRows = hasExpandableRow ? '1' : '0';
    return html`
      <slot @slotchange="${this.#onSlotchange}"
            @sort="${this.#onSort}"
            @request-expand="${this.#onRequestExpand}"
            style="${styleMap({
              '--_pf-table--expandable-rows': coeffRows,
              '--_pf-table--number-of-columns': this.columns,
            })}"
      ></slot>
    `;
  }

  #onRequestExpand(event: Event) {
    if (event instanceof RequestExpandEvent &&
        !event.defaultPrevented) {
      event.stopPropagation();
      if (event.target instanceof PfTr) {
        event.target.expanded = !!event.target.expandable && !event.target.expanded;
      } else if (event.target instanceof PfTd && event.row) {
        event.row.expanded = event.compoundExpanded;
        for (const cell of event.row.querySelectorAll('pf-td')) {
          cell.expanded = event.compoundExpanded === cell.compoundExpand;
        }
      }
    }
  }

  #onSlotchange() {
    this.columns = this.querySelector('pf-tr')?.querySelectorAll('pf-th')?.length ?? 0;
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
