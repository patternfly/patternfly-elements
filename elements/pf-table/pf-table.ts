import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';
import { state } from 'lit/decorators/state.js';

import { provide } from '@lit/context';
import { thRoleContext } from './context.js';

import { PfTh, RequestSortEvent } from './pf-th.js';
import { PfTd } from './pf-td.js';
import { PfTr, RequestExpandEvent } from './pf-tr.js';

export * from './pf-caption.js';
export * from './pf-thead.js';
export * from './pf-tbody.js';
export * from './pf-tr.js';
export * from './pf-th.js';
export * from './pf-td.js';

import styles from './pf-table.css';

const rowQuery = [
  ':scope > pf-tbody:not([expandable]) > pf-tr',
  ':scope > pf-tbody > pf-tr[expandable]',
  ':scope > pf-tr',
  ':scope > pf-tr[expandable]',
].join();

/**
 * A **table** is used to display large data sets that can be easily laid out in a simple grid with column headers.
 * @alias Table
 */
@customElement('pf-table')
export class PfTable extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  get rows(): NodeListOf<PfTr> {
    return this.querySelectorAll?.<PfTr>(rowQuery);
  }

  @state() private columns = 0;

  @provide({ context: thRoleContext }) private thRowContext = 'rowheader';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'table');
    this.#onSlotchange();
  }

  render(): TemplateResult<1> {
    const hasExpandableRow = !!this.querySelector?.('pf-tr[expandable]');
    const coeffRows = hasExpandableRow ? '1' : '0';
    return html`
      <!-- The default slot can hold an optional \`pf-caption\` element and a combination of \`pf-tr\`, \`pf-thead\`, or \`pf-tbody\` elements. -->
      <slot @slotchange="${this.#onSlotchange}"
            @request-expand="${this.#onRequestExpand}"
            @request-sort="${this.#onRequestSort}"
            style="${styleMap({
              '--_pf-table--expandable-rows': coeffRows,
              '--_pf-table--number-of-columns': this.columns,
            })}"
      ></slot>
    `;
  }

  #onRequestExpand(event: Event) {
    if (event instanceof RequestExpandEvent
        && !event.defaultPrevented) {
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
    this.columns = this.querySelector?.('pf-tr')?.querySelectorAll('pf-th')?.length ?? 0;
    this.requestUpdate();
  }

  #onRequestSort(event: Event) {
    if (event instanceof RequestSortEvent) {
      for (const col of this.querySelectorAll<PfTh>('pf-th[sortable]')) {
        col.selected = col === event.target;
        if (col !== event.target) {
          col.removeAttribute('sort-direction');
        }
      }
      if (!event.defaultPrevented && event.target instanceof PfTh) {
        event.target.sortDirection = event.direction;
        this.#performSort(event.target, event.direction);
      }
    }
  }

  #performSort(header: PfTh, direction: 'asc' | 'desc') {
    const children = header.parentElement?.children;
    if (children) {
      const columnIndexToSort = [...children].indexOf(header);
      Array
          .from(this.rows, node => PfTable.getNodeContentForSort(columnIndexToSort, node))
          .sort((a, b) => PfTable.sortByContent(direction, a, b))
          .forEach(({ node }, index) => {
            const target = this.rows[index];
            if (this.rows[index] !== node) {
              const position: InsertPosition =
                direction === 'desc' ? 'afterend' : 'beforebegin';
              target.insertAdjacentElement(position, node);
            }
          });
    }
  }

  private static getNodeContentForSort(
    columnIndexToSort: number,
    node: Element,
  ) {
    const content = node.querySelector(`
      :scope > :is(pf-th, pf-td):nth-child(${columnIndexToSort + 1}),
      :scope > pf-tr > :is(pf-th, pf-td):nth-child(${columnIndexToSort + 1})
    `.trim())?.textContent?.trim()?.toLowerCase() ?? '';
    return { node, content };
  }

  private static sortByContent(
    direction: 'asc' | 'desc',
    a: { content: string },
    b: { content: string },
  ) {
    if (direction === 'asc') {
      return (a.content < b.content ? -1 : a.content > b.content ? 1 : 0);
    } else {
      return (b.content < a.content ? -1 : b.content > a.content ? 1 : 0);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-table': PfTable;
  }
}
