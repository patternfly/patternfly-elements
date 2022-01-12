import { LitElement, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';

import { PfeDropdownItem } from './pfe-dropdown-item.js';

import style from './pfe-dropdown.scss';

export interface SeparatorOption {
  type: 'separator';
}

export interface LinkOption {
  type: 'link';
  href: string;
  text?: string;
  disabled?: boolean;
}

export interface ActionOption {
  type: 'action';
  text?: string;
  disabled?: boolean;
}

export type PfeDropdownOption = (
  | ActionOption
  | LinkOption
  | SeparatorOption
);

export class DropdownChangeEvent extends ComposedEvent {
  constructor(
    /** @summary The selected value */
    public action: string
  ) {
    super('change');
  }
}

/**
 * Dropdown provides a dropdown menu of links and/or actions.
 *
 * @summary Provides a dropdown menu of links and/or actions
 *
 * @slot - The default slot should contain at least one link or action `pfe-dropdown-item`.
 * @fires {DropdownChangeEvent} change When an item is selected, this event is fired. It includes the inner text of the item that was selected.
 * @fires pfe-dropdown:change {@deprecated Use `change`}
 */
@customElement('pfe-dropdown') @pfelement()
export class PfeDropdown extends LitElement {
  static readonly styles = [style];

  /** Use 'delegatesFocus' to forward focus to the first pfe-dropdown-item when this container is clicked or focused. */
  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * This is an optional attribute string that you can provide to describe your dropdown, which appears in the dropdown toggle.
   */
  @property({ reflect: true }) label = 'Dropdown';

  /**
   * This is an optional attribute that you can provide to disable your dropdown.
   * Visually the dropdown will look disabled and mouse or keyboard events will have no impact on it.
   */
  @observed
  @property({ type: Boolean, reflect: true }) disabled = false;

  @observed
  @property({ type: Boolean, reflect: true }) expanded = false;

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('keydown', this._itemKeydownHandler);
    document.addEventListener('click', this._outsideClickHandler);
  }

  /** Add dropdown items dynamically */
  @observed options?: PfeDropdownOption[];

  /**
   * @deprecated Use `options`
   */
  get pfeDropdownOptions() {
    return this.options;
  }

  set pfeDropdownOptions(options: PfeDropdownOption[]|undefined) {
    this.options = options;
  }

  render() {
    return html`
      <div class="pfe-dropdown__container">
        <!-- toggle -->
        <button id="pfe-dropdown-toggle"
            class="pfe-dropdown__toggle"
            type="button"
            aria-haspopup="true"
            aria-controls="pfe-dropdown-menu"
            aria-expanded="${String(!!this.expanded) as 'true'|'false'}"
            @click="${this.toggle}"
            @keydown="${this._toggleKeydownHandler}">
          <span class="pfe-dropdown__toggle-text">${this.label}</span>
          <svg class="pfe-dropdown__toggle-icon" viewBox="0 0 320 512" aria-hidden="true" role="img">
            <path
              d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z">
            </path>
          </svg>
        </button>
        <!-- dropdown menu -->
        <ul id="pfe-dropdown-menu"
            class="pfe-dropdown__menu ${classMap({ open: this.expanded })}"
            role="menu"
            aria-labelledby="pfe-dropdown-toggle">
          <slot></slot>
        </ul>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._allItems().forEach(item => {
      item.removeEventListener('click', this._itemClickHandler);
    });
  }

  @initializer({ observe: false }) protected _init() {
    if (!this.disabled) {
      this._allItems().forEach(item => {
        item.addEventListener('click', this._itemClickHandler);
      });
    }
  }

  protected _optionsChanged(_: unknown, options: PfeDropdownOption[]) {
    this._modifyDOM(options);
  }

  protected _disabledChanged() {
    this.setAttribute('aria-disabled', String(this.disabled));

    if (this.disabled) {
      this.setAttribute('tabindex', '-1');
    } else {
      this.removeAttribute('tabindex');
    }
  }

  /** Event handler for click event on Dropdown Item */
  @bound private _itemClickHandler(event: MouseEvent) {
    const itemType =
      (event.target as HTMLElement)
        .parentElement
        ?.getAttribute('item-type') as 'action' ?? undefined;

    if ((event.target as HTMLElement).parentElement instanceof PfeDropdownItem) {
      this._selectItem(event.target, itemType);
    }

    return this;
  }

  /** Event handler for keydown events on Dropdown Menu */
  @bound private _itemKeydownHandler(event: KeyboardEvent) {
    let newItem;
    const itemType =
        !(event.target instanceof HTMLElement) ? undefined
      : event.target.getAttribute('item-type');

    // active dropdown item index
    const currentIndex = this._allItems().findIndex(item =>
      item === document.activeElement ||
      item.matches(':focus')
    );

    switch (event.key) {
      case 'Enter': {
        const [item] = (event.target as HTMLElement)?.children ?? [];
        if (item instanceof PfeDropdownItem) {
          this._selectItem(item, (itemType ?? undefined) as PfeDropdownOption['type']);
        }
      } break;
      case 'Esc':
      case 'Tab':
        this.close();
        break;
      case 'ArrowRight':
      case 'ArrowDown':
        event.preventDefault();
        // get the following item
        newItem = this._itemContainer(this._nextItem(currentIndex, 1));
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault();
        // get the previous item
        newItem = this._itemContainer(this._nextItem(currentIndex, -1));
        break;
      case 'Home':
        newItem = this._firstItem();
        break;
      case 'End':
        newItem = this._lastItem();
        break;
      default:
        break;
    }

    if (newItem) {
      newItem.setAttribute('tabindex', '-1');
      newItem.focus();
    }
    return this;
  }

  /** Close the dropdown if clicks occur outside its tree */
  @bound private _outsideClickHandler(event: MouseEvent) {
    if (!event.composedPath().includes(this)) {
      this.close();
    }
  }

  /** Event handler for keydown event on Dropdown */
  @bound private _toggleKeydownHandler(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case 'ArrowDown':
        if (this._allDisabled()) {
          // toggle the dropdown if all items disabled
          this.toggle();
        } else if (!this.expanded) {
          // otherwise, get the next enabled item
          this.open();
          const item = this._itemContainer(this._nextItem(-1, 1));
          item?.setAttribute('tabindex', '-1');
          item?.focus();
        }
        break;
      case 'Tab':
        this.close();
        break;
      default:
        break;
    }
    return this;
  }

  /** modify DOM if custom options are passed in an array */
  private async _modifyDOM(options: PfeDropdownOption[], clean?: Boolean = true) {
    // remove all dropdown items and separators
    if (clean) {
      this.innerHTML = '';
    }
    for (const el of options) {
      this.appendChild(this._createItem(el));
    }
  }

  private _createItem(option: PfeDropdownOption): HTMLElement {
    const element = document.createElement('pfe-dropdown-item');
    element.itemType = option.type;
    switch (option.type) {
      case 'link': {
        const anchor = document.createElement('a');
        anchor.setAttribute('href', option.href ? option.href : '#');
        anchor.innerText = option.text ?? '';
        element.appendChild(anchor);
        if (option.disabled) {
          element.disabled = true;
        }
      } break;
      case 'action': {
        const button = document.createElement('button');
        button.innerText = option.text ?? '';
        element.appendChild(button);
        if (option.disabled) {
          element.disabled = true;
        }
      } break;
    }

    return element;
  }

  private _allItems(): PfeDropdownItem[] {
    const selector = `${'pfe-dropdown'}-item:not([item-type='separator'])`;
    return [...this.querySelectorAll<PfeDropdownItem>(selector)];
  }

  private _allDisabled(): boolean {
    return this._allItems().every(item => item.disabled);
  }

  private _nextItem(currentPosition: number, direction: number): PfeDropdownItem {
    const items = this._allItems();
    let index = (currentPosition + direction) % items.length;
    index = index < 0 ? index + items.length : index;
    let item = items[index];
    while (item?.hasAttribute('disabled')) {
      index += direction;
      item = items[index % items.length];
    }
    return item;
  }

  private _firstItem() {
    const items = this._allItems();
    return items[0];
  }

  private _lastItem() {
    const items = this._allItems();
    return items[items.length - 1];
  }

  private _selectItem(item: PfeDropdownItem, type?: PfeDropdownOption['type']) {
    if (type === 'action') {
      const action = item.innerText;
      this.dispatchEvent(new DropdownChangeEvent(action));
      this.dispatchEvent(pfeEvent('pfe-dropdown:change', { action }));
      this.close();
    } else {
      item.click();
    }
  }

  private _itemContainer(item: PfeDropdownItem): HTMLElement|null {
    // used to apply the focus state to the item's container
    return item.shadowRoot?.querySelector(`.pfe-dropdown-item__container`) ?? null;
  }

  /**
   * Add dropdown items dynamically
   * ```js
   * customElements.whenDefined("pfe-dropdown").then(function() {
   *   dropdown.addDropdownOptions(
   *     [
   *       {
   *         href: "https://patternflyelements.org",
   *         text: "Link 4",
   *         type: "link",
   *         disabled: false
   *       }
   *     ]
   *   );
   * });
   * ```
   * */
  @bound addDropdownOptions(options: PfeDropdownOption[]) {
    this._modifyDOM(options, false);
  }

  /**
   * Manually opens the dropdown menu.
   *
   * ```js
   * document.querySelector("pfe-dropdown").open();
   * ```
   */
  @bound open() {
    this.expanded = true;
  }

  /**
   * Manually closes the dropdown menu.
   *
   * ```js
   * document.querySelector("pfe-dropdown").close();
   * ```
   */
  @bound close() {
    this.expanded = false;
  }

  /**
   * Manually toggles the dropdown menu.
   *
   * ```js
   * document.querySelector("pfe-dropdown").toggle();
   * ```
   */
  @bound toggle() {
    this.expanded = !this.expanded;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-dropdown': PfeDropdown;
  }
}
