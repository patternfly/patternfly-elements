import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';
import { state } from 'lit/decorators/state.js';

import { provide } from '@lit/context';
import { thRoleContext } from './context.js';

import { PfV5Th, RequestSortEvent } from './pf-v5-th.js';
import { PfV5Td } from './pf-v5-td.js';
import { PfV5Tr, RequestExpandEvent } from './pf-v5-tr.js';

export * from './pf-v5-caption.js';
export * from './pf-v5-thead.js';
export * from './pf-v5-tbody.js';
export * from './pf-v5-tr.js';
export * from './pf-v5-th.js';
export * from './pf-v5-td.js';

import styles from './pf-v5-table.css';

const rowQuery = [
  ':scope > pf-v5-tbody:not([expandable]) > pf-v5-tr',
  ':scope > pf-v5-tbody > pf-v5-tr[expandable]',
  ':scope > pf-v5-tr',
  ':scope > pf-v5-tr[expandable]',
].join();

/**
 * A **table** is used to display large data sets that can be easily laid out in a simple grid with column headers.
 * @alias Table
 */
@customElement('pf-v5-table')
export class PfV5Table extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  get rows(): NodeListOf<PfV5Tr> {
    return this.querySelectorAll?.<PfV5Tr>(rowQuery);
  }

  @state() private columns = 0;

  @provide({ context: thRoleContext }) private thRowContext = 'rowheader';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'table');
    this.#onSlotchange();
  }

  render(): TemplateResult<1> {
    const hasExpandableRow = !!this.querySelector?.('pf-v5-tr[expandable]');
    const coeffRows = hasExpandableRow ? '1' : '0';
    return html`
      <!-- The default slot can hold an optional \`pf-v5-caption\` element and a combination of \`pf-v5-tr\`, \`pf-v5-thead\`, or \`pf-v5-tbody\` elements. -->
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
      if (event.target instanceof PfV5Tr) {
        event.target.expanded = !!event.target.expandable && !event.target.expanded;
      } else if (event.target instanceof PfV5Td && event.row) {
        event.row.expanded = event.compoundExpanded;
        for (const cell of event.row.querySelectorAll('pf-v5-td')) {
          cell.expanded = event.compoundExpanded === cell.compoundExpand;
        }
      }
    }
  }

  #onSlotchange() {
    this.columns = this.querySelector?.('pf-v5-tr')?.querySelectorAll('pf-v5-th')?.length ?? 0;
    this.requestUpdate();
  }

  #onRequestSort(event: Event) {
    if (event instanceof RequestSortEvent) {
      for (const col of this.querySelectorAll<PfV5Th>('pf-v5-th[sortable]')) {
        col.selected = col === event.target;
        if (col !== event.target) {
          col.removeAttribute('sort-direction');
        }
      }
      if (!event.defaultPrevented && event.target instanceof PfV5Th) {
        event.target.sortDirection = event.direction;
        this.#performSort(event.target, event.direction);
      }
    }
  }

  #performSort(header: PfV5Th, direction: 'asc' | 'desc') {
    const children = header.parentElement?.children;
    if (children) {
      const columnIndexToSort = [...children].indexOf(header);
      Array
          .from(this.rows, node => PfV5Table.getNodeContentForSort(columnIndexToSort, node))
          .sort((a, b) => PfV5Table.sortByContent(direction, a, b))
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
      :scope > :is(pf-v5-th, pf-v5-td):nth-child(${columnIndexToSort + 1}),
      :scope > pf-v5-tr > :is(pf-v5-th, pf-v5-td):nth-child(${columnIndexToSort + 1})
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
    'pf-v5-table': PfV5Table;
  }
}
