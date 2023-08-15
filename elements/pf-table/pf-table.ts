import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { styleMap } from 'lit/directives/style-map.js';
import { state } from 'lit/decorators/state.js';

import { PfTh, RequestSortEvent } from './pf-th.js';
import { PfTr, RequestExpandEvent } from './pf-tr.js';

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
 * A **table** is used to display large data sets that can be easily laid out in a simple grid with column headers.
 *
 * @slot
 *       The default slot can hold an optional `pf-caption` element and a combination of `pf-tr`, `pf-thead`, or `pf-tbody` elements.
 *
 * @cssprop {<color>} --pf-c-table--BackgroundColor
 *          Table background color
 *          {@default `#fff`}
 * @cssprop {<color>} --pf-c-table--BorderColor
 *          Table border color
 *          {@default `#d2d2d2`}
 * @cssprop {<dimension>} --pf-c-table--border-width--base
 *          Table border color
 *          {@default `1px`}
 * @cssprop {<dimension>} --pf-c-table-caption--FontSize
 *          Table caption font size
 *          {@default `0.875rem`}
 * @cssprop {<color>} --pf-c-table-caption--Color
 *          Table caption color
 *          {@default `#6a6e73`}
 * @cssprop {<dimension>} --pf-c-table-caption--PaddingTop
 *          Table caption top padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table-caption--PaddingRight
 *          Table caption right padding
 *          {@default `1.5rem`}
 * @cssprop {<dimension>} --pf-c-table-caption--PaddingBottom
 *          Table caption bottom padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table-caption--PaddingLeft
 *          Table caption left padding
 *          {@default `1.5rem`}
 * @cssprop {<length>} --pf-c-table-caption--xl--PaddingRight
 *          Table XL caption right padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table-caption--xl--PaddingLeft
 *          Table XL caption left padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--thead--cell--FontSize
 *          Table head cell font size
 *          {@default `0.875rem`}
 * @cssprop {<number>} --pf-c-table--thead--cell--FontWeight
 *          Table head cell font weight
 *          {@default `700`}
 * @cssprop {<dimension>} --pf-c-table--tbody--cell--PaddingTop
 *          Table body cell padding top
 *          {@default `1.5rem`}
 * @cssprop {<dimension>} --pf-c-table--tbody--cell--PaddingBottom
 *          Table body cell padding bottom
 *          {@default `1.5rem`}
 * @cssprop {<>} --pf-c-table--tr--BoxShadow--top--base
 *          Table row box shadow top base
 *          {@default `0 -0.1875rem 0.25rem -0.125rem rgba(3,3,3,.08)`}
 * @cssprop {<dimension>} --pf-c-table--cell--Padding--base
 *          Table cell padding base
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--FontSize
 *          Table cell font size
 *          {@default `1rem`}
 * @cssprop {<number>} --pf-c-table--cell--FontWeight
 *          Table cell font weight
 *          {@default `400`}
 * @cssprop {<color>} --pf-c-table--cell--Color
 *          Table cell color
 *          {@default `#151515`}
 * @cssprop {<dimension>} --pf-c-table--cell--PaddingTop
 *          Table cell top padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--PaddingRight
 *          Table cell right padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--PaddingBottom
 *          Table cell bottom padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--PaddingLeft
 *          Table cell left padding
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--first-last-child--PaddingLeft
 *
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--first-last-child--PaddingRight
 *
 *          {@default `1rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--first-last-child--xl--PaddingLeft
 *
 *          {@default `1.5rem`}
 * @cssprop {<dimension>} --pf-c-table--cell--first-last-child--xl--PaddingRight
 *
 *          {@default `1.5rem`}
 * @cssprop {<dimension>} --pf-c-table--tr--m-first-cell-offset-reset--cell--PaddingLeft
 *
 *          {@default `1rem`}
 * @cssprop {<number>} --pf-c-table--cell--MinWidth
 *          Table cell min width
 *          {@default `0`}
 * @cssprop {<>} --pf-c-table--cell--MaxWidth
 *          Table cell max width
 *          {@default `none`}
 * @cssprop {<>} --pf-c-table--cell--Width
 *          Table cell width
 *          {@default `auto}
 * @cssprop {<>} --pf-c-table--cell--Overflow
 *          Table cell overflow
 *          {@default `visible`}
 * @cssprop {<>} --pf-c-table--cell--TextOverflow
 *          Table cell text overflow
 *          {@default `clip`}
 * @cssprop {<dimension>} --pf-c-table--cell--WhiteSpace
 *          Table cell white space
 *          {@default `normal`}
 * @cssprop {<dimension>} --pf-c-table--cell--WordBreak
 *          Table cell word break
 *          {@default `normal`}
 * @cssprop {<dimension>} --pf-c-table--cell--m-border-right--before--BorderRightWidth
 *
 *          {@default `1px`}
 * @cssprop {<color>} --pf-c-table--cell--m-border-right--before--BorderRightColor
 *
 *          {@default `#d2d2d2`}
 * @cssprop {<dimension>} --pf-c-table--cell--m-border-left--before--BorderLeftWidth
 *
 *          {@default `1px`}
 * @cssprop {<color>} --pf-c-table--cell--m-border-left--before--BorderLeftColor
 *
 *          {@default `#d2d2d2`}
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
