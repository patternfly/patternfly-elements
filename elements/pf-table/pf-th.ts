import { ComposedEvent } from '@patternfly/pfe-core/core.js';
import { LitElement, html, svg } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import styles from './pf-th.css';

export class ThSortEvent extends ComposedEvent {
  constructor(public key: string, public direction: 'asc' | 'desc') {
    super('sort');
  }
}

const paths = new Map(Object.entries({
  asc: 'M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z',
  desc: 'M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z',
  sort: 'M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z',
}));

/**
 * Table header cell
 * @slot - Place element content here
 */
@customElement('pf-th')
export class PfTh extends LitElement {
  static readonly styles = [styles];

  @property({ type: Boolean }) sortable?: boolean = false;

  @property({ type: Boolean }) selected?: boolean = false;

  @property({ reflect: true, attribute: 'sort-direction' }) sortDirection!: 'asc' | 'desc';

  @property() key!: string;

  override connectedCallback() {
    super.connectedCallback();
    const closestThead = this.closest('pf-thead');
    const closestTable = this.closest('pf-table');
    const isChildOfThead = !!closestThead && !!closestTable?.contains(closestThead);
    const role = isChildOfThead ? 'colheader' : 'rowheader';
    this.setAttribute('role', role);
    if (this.sortable) {
      this.addEventListener('click', this.#onClick);
    }
  }

  render() {
    return this.role === 'columnheader' && this.sortable ?
      html`
        <div class="sortable">
          <slot></slot>
          <span class="visually-hidden">${!this.sortDirection ? '' : `(sorted ${this.sortDirection === 'asc' ? 'ascending' : 'descending'})`}</span>
          <span id="sort-indicator">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;">${svg`
              <path d="${paths.get(this.sortDirection ?? 'sort')}"></path>`}
            </svg>
          </span>
        </div>
        <pf-button id="sort-button" part="sort-button" plain class="${classMap({ selected: !!this.selected })}">
          <span class="offscreen">Sort</span>
        </pf-button>`
      : html`
        <slot></slot>
      `;
  }

  diconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListener('click', this.#onClick);
  }

  #onClick() {
    this.sort();
  }

  toggleDirection() {
    this.sortDirection = !this.sortDirection ? 'asc' : this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

  sort() {
    this.toggleDirection();
    this.dispatchEvent(new ThSortEvent(this.key, this.sortDirection));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-th': PfTh;
  }
}
