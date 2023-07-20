import { LitElement, html } from 'lit';
import type { PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { PfListboxOption } from './pf-listbox-option.js';
import './pf-listbox-group.js';

import styles from './pf-listbox.css';

/**
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
 */
@customElement('pf-listbox')
export class PfListbox extends LitElement {
  static readonly styles = [styles];

  static isOption(element: PfListboxOption): element is PfListboxOption {
    return element instanceof PfListboxOption;
  }

  @property() filter = '';
  @property({ reflect: true, attribute: 'disable-filter' }) disableFilter = '';

  @queryAssignedElements() private options!: PfListboxOption[];

  #internals = new InternalsController(this, {
    role: 'listbox'
  });

  #tabindex = new RovingTabindexController<PfListboxOption>(this);

  #_allOptions: PfListboxOption[] = [];

  #hasFocus = false;

  get isHorizontal(): boolean {
    return this?.getAttribute('aria-orientation') === 'horizontal';
  }

  get isMultiselectable(): boolean {
    return this?.getAttribute('aria-multiselectable') === 'true';
  }

  get activeItem() {
    const [active] = this.#allOptions.filter(option => option.getAttribute('id') === this.#internals.ariaActivedescendant);
    return active || this.#tabindex.firstItem;
  }

  get #allOptions() {
    return this.#_allOptions;
  }

  set #allOptions(options: PfListboxOption[]) {
    this.#_allOptions = options.filter(option => (this.constructor as typeof PfListbox).isOption(option) && (this.disableFilter || option.getUpdateByFilter(this.filter)));
  }

  set value(items: string | null) {
    const oldValue = this.value;
    const selectedItems = items?.toLowerCase().split(',');
    const [firstItem] = selectedItems || [null];
    this.options.forEach(option => {
      const textContent = (option.textContent || '').toLowerCase();
      const selected = this.isMultiselectable ? selectedItems?.includes(textContent) : firstItem === textContent;
      if (selected) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option.removeAttribute('aria-selected');
      }
    });
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  get value() {
    const selectedItems = this.options.filter(option=>option.hasAttribute('aria-selected')).map(option => option.textContent);
    return selectedItems.join(',');
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('filter')) {
      this.#onFilterChange();
    }
  }

  render() {
    return html`
      <slot 
        class="${this.isHorizontal ? 'horizontal' : 'vertical'}"
        @slotchange="${this.#onSlotchange}" 
        @optionfocus="${this.#onOptionFocus}"
        @optionblur="${this.#onOptionBlur}"
        @click="${this.#onOptionClick}"
        @keydown="${this.#onOptionKeydown}">
      </slot>
    `;
  }

  /**
   * filters listbox by keboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event
   * @returns { void }
   */
  filterByKeyboardEvent(event: KeyboardEvent) {
    const target = event.target as PfListboxOption;
    let stopEvent = false;
    if (event.ctrlKey ||
        event.altKey ||
        event.metaKey) {
      return;
    }

    switch (event.key) {
      case 'Backspace':
      case 'Delete':
        this.filter = this.filter.slice(0, this.filter.length - 2);
        stopEvent = true;
        break;
      case event.key?.match(/^[\w]$/)?.input:
        this.filter += event.key?.toLowerCase();
        stopEvent = true;
        break;
      case 'Enter':
      case ' ':
        if (target) {
          this.#updateMultiselect(target);
        }
        stopEvent = true;
        break;
      default:
        break;
    }
    if (stopEvent) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  focus() {
    this.#tabindex.focusOnItem(this.activeItem);
  }

  #updateActiveDescendant() {
    let found = false;
    this.#allOptions.forEach(option => {
      if (option === this.#tabindex.activeItem) {
        this.#internals.ariaActivedescendant = option.id;
        option.setAttribute('active-descendant', 'active-descendant');
        found = true;
      } else {
        option.removeAttribute('active-descendant');
      }
    });
    if (!found) {
      this.#internals.ariaActivedescendant = null;
    }
    this.#updateSingleselect();
  }

  #updateSingleselect() {
    if (!this.isMultiselectable) {
      this.options.forEach(option => {
        if (option.id === this.#internals.ariaActivedescendant) {
          option.setAttribute('aria-selected', 'true');
        } else {
          option.removeAttribute('aria-selected');
        }
      });
      this.#fireChange();
    }
  }

  #updateMultiselect(option: PfListboxOption) {
    if (this.isMultiselectable) {
      if (!option.hasAttribute('aria-selected')) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option.removeAttribute('aria-selected');
      }
      this.#fireChange();
    }
  }

  /**
   * handles user user selection change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   * @fires change
   */
  #fireChange() {
    this.dispatchEvent(new Event('change', { bubbles: true }));
  }

  /**
   * handles element value change similar to HTMLSelectElement events
   * (@see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLSelectElement#events|MDN: HTMLSelectElement Events})
   * @fires change
   */
  #fireInput() {
    this.dispatchEvent(new Event('input', { bubbles: true }));
  }

  #onFilterChange() {
    const oldValue = this.value;
    this.#allOptions = this.options;
    const all = this.#allOptions;
    this.#tabindex.updateItems(all);
    this.#updateActiveDescendant();
    if (oldValue !== this.value) {
      this.#fireInput();
    }
  }

  #onOptionBlur() {
    this.#hasFocus = false;
  }

  #onOptionFocus(event: FocusEvent) {
    this.#hasFocus = true;
    const target = event.target as PfListboxOption;
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.updateActiveItem(target);
    }
    this.#updateActiveDescendant();
  }

  #onOptionClick(event: MouseEvent) {
    const target = event.target as PfListboxOption;
    const sel = (option: PfListboxOption, selected = false) => {
      if (selected) {
        option.setAttribute('aria-selected', 'true');
      } else {
        option.removeAttribute('aria-selected');
      }
    };
    if (this.isMultiselectable) {
      if (!event.shiftKey) {
        // toggle target
        this.#updateMultiselect(target);
      } else {
        // select all options between active descendant and target
        const [start, end] = [this.options.indexOf(this.activeItem), this.options.indexOf(target)].sort();
        const options = [...this.options].slice(start, end + 1);
        options.forEach(option=>sel(option, true));
      }
    } else {
      // select target and deselect all other options
      this.options.forEach(option => sel(option, option === target));
    }
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.focusOnItem(target);
      this.#updateActiveDescendant();
      this.#fireChange();
    }
  }

  #onOptionKeydown(event: KeyboardEvent) {
    const { filter } = this;
    this.filterByKeyboardEvent(event);
    // only change focus if keydown occurred when option has focus
    // (as opposed to an external text input and if filter has changed
    if (filter !== this.filter) {
      this.#tabindex.focusOnItem(this.activeItem);
    }
  }

  #onSlotchange() {
    this.#allOptions = this.options;
    const all = this.#allOptions;
    const setSize = this.options.length;
    this.options.forEach((option, i) => {
      option.setAttribute('aria-setsize', `${setSize}`);
      option.setAttribute('aria-posinset', `${i + 1}`);
    });
    this.#tabindex.initItems(all, this);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-listbox': PfListbox;
  }
}
