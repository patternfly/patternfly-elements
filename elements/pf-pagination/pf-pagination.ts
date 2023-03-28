import { LitElement, html } from 'lit';
import { property } from 'lit/decorators/property.js';
import { state } from 'lit/decorators/state.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { query } from 'lit/decorators/query.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, observed } from '@patternfly/pfe-core/decorators.js';
import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-pagination.css';

export class PaginationEvent extends ComposedEvent {
  constructor(public eventType: PaginationEventType, public newPage: number, public perPage: number, public startIndex: number, public endIndex: number) {
    super('paginated');
  }
}

type PaginationEventType = 'page' | 'per-page';

enum Action {
  First = 'first',
  Previous = 'previous',
  Next = 'next',
  Last = 'last',
  PerPage = 'per-page'
}

const TITLES = {
  items: '',
  page: '',
  pages: '',
  itemsPerPage: 'Items per page',
  perPageSuffix: 'per page',
  toFirstPage: 'Go to first page',
  toPreviousPage: 'Go to previous page',
  toLastPage: 'Go to last page',
  toNextPage: 'Go to next page',
  optionsToggle: '',
  currentPage: 'Current page',
  paginationTitle: 'Pagination',
  ofWord: 'of'
};

const PER_PAGE_OPTIONS = ['10', '20', '50', '100'];

const SVG = {
  [Action.First]: html`<svg fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M223.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L319.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L393.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34zm-192 34l136 136c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L127.9 256l96.4-96.4c9.4-9.4 9.4-24.6 0-33.9L201.7 103c-9.4-9.4-24.6-9.4-33.9 0l-136 136c-9.5 9.4-9.5 24.6-.1 34z"></path></svg>`,
  [Action.Previous]: html`<svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg>`,
  [Action.Next]: html`<svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg>`,
  [Action.Last]: html`<svg fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;"><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"></path></svg>`
};

/**
 * Pagination
 * @slot - Place element content here
 */
@customElement('pf-pagination')
export class PfPagination extends LitElement {
  static readonly styles = [styles];

  @property() variant = 'bottom';
  @property({ type: Number }) count!: number;

  @observed
  @property({ type: Number, reflect: true, attribute: 'per-page' }) perPage = 10;

  @observed
  @property({ type: Number, reflect: true }) page = 1;

  @query('#menu-toggle') private menuToggle!: HTMLButtonElement;
  @query('#page-select-input') private input!: HTMLInputElement;

  @state() _expanded = false;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._outsideClick);
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keydown', this.#onKeydown);
  }

  render() {
    return html`
      <div id="container"
           class="${classMap({ [this.variant]: !!this.variant })}"
           part="container">
        <div id="options-menu"
             class="${classMap({ expanded: this._expanded })}">
          <pf-button id="menu-toggle"
                     aria-expanded=${this._expanded}
                     aria-haspopup="listbox"
                     icon="caret-${this._expanded ? 'up' : 'down'}" 
                     icon-position="right"
                     part="menu-toggle"
                     plain
                     type="button"
                     @click=${this.#toggleExpanded}>
              <span><b>${this.#firstOfPage()}-${this.#lastOfPage()}</b> ${TITLES.ofWord} <b>${this.count}</b></span>
          </pf-button>
          <ul id="menu-list"
              part="menu-list">
            ${PER_PAGE_OPTIONS.map(option => html`<li role="none">
              <pf-button variant="tertiary"
                         block
                         class="${classMap({ ['menu-item']: true, selected: this.#selected(option) })}"
                         data-action=${Action.PerPage}
                         data-value=${option}
                         icon=${ifDefined(this.#selected(option) ? 'check' : undefined)} 
                         icon-position=${ifDefined(this.#selected(option) ? 'right' : undefined)}
                         part="menu-item"
                         role="menuitem">
                <span>${option} ${TITLES.perPageSuffix}</span>
              </pf-button>
            </li>`)}
          </ul>
        </div>
        <nav id="nav"
             aria-label="Pagination"
             part="nav">
          <div class="nav-control">
            <pf-button id="first-page-button"
                       aria-label=${TITLES.toFirstPage}
                       data-action=${Action.First}
                       plain
                       .disabled=${this.page === 0 || this.page === 1}>
              ${SVG[Action.First]}
            </pf-button>
          </div>
          <div class="nav-control">
            <pf-button id="previous-page-button"
                       aria-label=${TITLES.toPreviousPage}
                       data-action=${Action.Previous}
                       plain
                       .disabled=${this.page === 0 || this.page === 1}>
              ${SVG[Action.Previous]}
            </pf-button>
          </div>
          <div id="page-select">
            <input id="page-select-input"
                   aria-label=${TITLES.currentPage}
                   inputmode="numeric"
                   max=${this.#lastPage()}
                   min="1"
                   required
                   type="number"
                   .value=${this.page.toString()}
                   @change=${this.#onChange}/> 
            <span aria-hidden="true" ?hidden=${!this.count}>${TITLES.ofWord} ${this.#lastPage()}</span>
          </div>
          <div class="nav-control">
            <pf-button id="next-page-button"
                       aria-label=${TITLES.toNextPage}
                       data-action=${Action.Next} 
                       plain
                       .disabled=${this.page === this.#lastPage()}>
              ${SVG[Action.Next]}
            </pf-button>
          </div>
          <div class="nav-control">
            <pf-button id="last-page-button"
                       aria-label=${TITLES.toLastPage}
                       data-action=${Action.Last}
                       plain
                       .disabled=${this.page === this.#lastPage()}>
              ${SVG[Action.Last]}
            </pf-button>
          </div>
        </nav>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._outsideClick);
    this.removeEventListener('click', this.#onClick);
    this.removeEventListener('keydown', this.#onKeydown);
  }

  protected _pageChanged() {
    this.#paginate('page');
  }

  protected _perPageChanged() {
    this.#paginate('per-page');
  }

  @bound private _outsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this.menuToggle) && this._expanded) {
      this._expanded = false;
    }
  }

  #firstOfPage() {
    return (this.page - 1) * this.perPage + 1;
  }

  #lastOfPage() {
    return this.page * this.perPage;
  }

  #previousPage() {
    return this.page - 1 >= 1 ? this.page - 1 : 1;
  }

  #nextPage() {
    const lastPage = this.#lastPage();
    return this.page + 1 <= lastPage ? this.page + 1 : lastPage;
  }

  #lastPage() {
    return this.count || this.count === 0 ? this.#totalPages() || 0 : this.page + 1;
  }

  #totalPages() {
    return Math.ceil(this.count / this.perPage);
  }

  #toggleExpanded() {
    this._expanded = !this._expanded;
  }

  #selected(option: string) {
    return this.perPage?.toString() === option;
  }

  #parsePageInput(value: string) {
    const page = parseInt(value, 10);
    if (!isNaN(page)) {
      const lastPage = this.#lastPage();
      return page > lastPage ? lastPage : page < 1 ? 1 : page;
    }
    return this.page;
  }

  #onClick(event: Event) {
    const path = event.composedPath();
    // @todo
    // @ts-ignore
    const { dataset } = path.find(target => target.dataset?.action) || {};
    const { action, value } = dataset;

    switch (action) {
      case Action.First:
        this.page = 1;
        return;
      case Action.Previous:
        this.page = this.#previousPage();
        return;
      case Action.Next:
        this.page = this.#nextPage();
        return;
      case Action.Last:
        this.page = this.#lastPage();
        return;
      case Action.PerPage:
        if (value) {
          this.perPage = parseInt(value, 10);
          this.#toggleExpanded();
        }
        return;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (event.composedPath().includes(this.input)) {
          this.page = parseInt(this.input.value, 10);
        } else {
          // @todo
          this.#onClick(event);
        }
    }
  }

  #onChange(event: Event) {
    const input = event.target as HTMLInputElement;
    input.value = this.#parsePageInput(input.value).toString();
  }

  #paginate(type: PaginationEventType) {
    const startIndex = (this.page - 1) * this.perPage;
    const endIndex = this.page * this.perPage;
    this.dispatchEvent(new PaginationEvent(type, this.page, this.perPage, startIndex, endIndex));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-pagination': PfPagination;
  }
}
