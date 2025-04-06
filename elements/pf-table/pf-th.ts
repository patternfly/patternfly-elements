import { LitElement, html, svg, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';

import { consume } from '@lit/context';

import { thRoleContext } from './context.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-th.css';

const DIRECTIONS = { asc: 'desc', desc: 'asc' } as const;

export class RequestSortEvent extends Event {
  constructor(
    public key: string,
    public direction: 'asc' | 'desc',
  ) {
    super('request-sort', {
      bubbles: true,
      cancelable: true,
    });
  }
}

const paths = new Map(Object.entries({
  asc: `M88 166.059V468c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12V166.059h46.059c21.382 0 32.09-25.851 16.971-40.971l-86.059-86.059c-9.373-9.373-24.569-9.373-33.941 0l-86.059 86.059c-15.119 15.119-4.411 40.971 16.971 40.971H88z`,
  desc: `M168 345.941V44c0-6.627-5.373-12-12-12h-56c-6.627 0-12 5.373-12 12v301.941H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.569 9.373 33.941 0l86.059-86.059c15.119-15.119 4.411-40.971-16.971-40.971H168z`,
  sort: `M214.059 377.941H168V134.059h46.059c21.382 0 32.09-25.851 16.971-40.971L144.971 7.029c-9.373-9.373-24.568-9.373-33.941 0L24.971 93.088c-15.119 15.119-4.411 40.971 16.971 40.971H88v243.882H41.941c-21.382 0-32.09 25.851-16.971 40.971l86.059 86.059c9.373 9.373 24.568 9.373 33.941 0l86.059-86.059c15.12-15.119 4.412-40.971-16.97-40.971z`,
}));

/**
 * Table header cell
 * @slot - Place element content here
 */
@customElement('pf-th')
export class PfTh extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  @property({ type: Boolean, reflect: true }) sortable?: boolean = false;

  @property({ type: Boolean, reflect: true }) selected?: boolean = false;

  @property({
    reflect: true,
    attribute: 'sort-direction',
  }) sortDirection?: 'asc' | 'desc';

  @property() key!: string;

  @consume({ context: thRoleContext })
  private contextualRole: 'colheader' | 'rowheader' = 'rowheader';

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', this.contextualRole);
  }

  render(): TemplateResult<1> {
    const selected = !!this.selected;
    return this.sortable ?
      html`
        <button id="sort-button"
                class="sortable ${classMap({ selected })}"
                part="sort-button"
                @click="${this.#onClick}">
          <slot></slot>
          <span class="visually-hidden">${!this.sortDirection ? '' : `(sorted ${this.sortDirection === 'asc' ? 'ascending' : 'descending'})`}</span>
          <span id="sort-indicator">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;">${svg`
              <path d="${paths.get(this.sortDirection ?? 'sort')}"></path>`}
            </svg>
          </span>
        </button>
      ` : html`
        <slot></slot>
      `;
  }

  #onClick() {
    if (this.sortable) {
      this.sort();
    }
  }

  sort(): void {
    const next = DIRECTIONS[this.sortDirection ?? 'asc'];
    this.dispatchEvent(new RequestSortEvent(this.key, next));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-th': PfTh;
  }
}
