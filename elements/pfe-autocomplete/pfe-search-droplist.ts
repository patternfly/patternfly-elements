import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { repeat } from 'lit/directives/repeat.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';

import style from './pfe-search-droplist.scss';

function isLi(target?: EventTarget|null): target is HTMLLIElement {
  return (target as HTMLElement)?.tagName === 'LI';
}

export class DroplistSelectEvent extends ComposedEvent {
  constructor(
    /** The selected value */
    public value: string
  ) {
    super('select');
  }
}

/**
 * Search Droplist
 * @csspart {HTMLULElement} listbox - The listbox element
 * @csspart {HTMLLIElement} option - Each search item.
 *                                   These also have an `item-index-${i}` part, e.g. item-index-0, item-index-1, etc.
 * @fires {DroplistSelectEvent} select - When an option is selected.
 * @fires {CustomEvent<{ optionValue: string }>} pfe-autocomplete:option-selected {@deprecated Use `select`}
 */
@customElement('pfe-search-droplist') @pfelement()
export class PfeSearchDroplist extends LitElement {
  static readonly styles = [style];

  /** Set when the combo box dropdown is open */
  @property({ type: Boolean, reflect: true }) open = false;

  /** Rerenders the dropdown */
  @observed('_renderOptions')
  @property({ type: Boolean, reflect: true }) reflow = false;

  @property({ attribute: 'aria-announce-template', reflect: true }) ariaAnnounceTemplate = '';

  /** Sets selected option */
  @observed
  @property({ type: Number, reflect: true, attribute: 'active-index' })
    activeIndex: number|null = null;

  @observed('_renderOptions')
  @property({ attribute: false }) data: string[] = [];

  @state() private ariaAnnounceText = '';

  @query('.active') activeElement?: HTMLLIElement|null;

  @query('.droplist') droplist?: HTMLElement|null;

  render() {
    const data = this.data ?? [];
    return html`
      <div class="suggestions-aria-help sr-only"
          role="status"
          aria-hidden="false"
          aria-live="polite"
      >${this.ariaAnnounceText}</div>
      <div class="droplist">
        <ul id="droplist-items"
            part="listbox"
            role="listbox"
            @click="${this._optionSelected}"
            @keyup="${this._onKeyup}"
            tabindex="-1">
        ${repeat<string>(data, x => x, (item, index) => html`
          <li id="option-${index}"
            part="option item-index-${index}"
            class="${classMap({ active: index === this.activeIndex })}"
            aria-selected="${String(index === this.activeIndex)}"
            role="option"
            tabindex="-1"
            value="${item}"
          >${item}</li>
        `)}
        </ul>
      </div>
    `;
  }

  @bound private _onKeyup(e: KeyboardEvent & { target: HTMLElement }) {
    switch (e.key) {
      case 'Enter':
      case ' ':
        if (isLi(e.target)) {
          this._select(e.target);
        }
    }
  }

  @bound private _optionSelected(e: Event & { target: HTMLElement }) {
    if (isLi(e.target)) {
      this._select(e.target);
    }
  }

  private _select(li: HTMLLIElement) {
    const optionValue = li.innerText;
    this.dispatchEvent(pfeEvent('pfe-autocomplete:option-selected', { optionValue }));
    this.dispatchEvent(new DroplistSelectEvent(optionValue));
  }

  @bound protected _renderOptions() {
    this.ariaAnnounceText =
        !this.ariaAnnounceTemplate ? ''
      : this.ariaAnnounceTemplate.replace('${numOptions}', this.data.length.toString());
  }

  /**
   * Handle state changes when active droplist item has been changed
   */
  protected _activeIndexChanged() {
    // Make a quick exit if necessary
    if (
      !this.data ||
      this.data.length === 0 ||
      this.activeIndex === null
    ) {
      return;
    }

    // scroll to selected element when selected item with keyboard is out of view
    const { activeElement, droplist } = this;

    if (!activeElement || !droplist) {
      return;
    }
    let activeElementHeight = activeElement.offsetHeight;
    const marginBottom = window.getComputedStyle(activeElement).getPropertyValue('margin-bottom');
    activeElementHeight += parseInt(marginBottom, 10);
    droplist.scrollTop = activeElement.offsetTop - droplist.offsetHeight + activeElementHeight;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-search-droplist': PfeSearchDroplist;
  }
}
