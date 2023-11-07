import { LitElement, html, type PropertyValueMap } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { PfDropdownItem, DropdownItemChange } from './pf-dropdown-item.js';
import { PfDropdownGroup } from './pf-dropdown-group.js';
import styles from './pf-dropdown-menu.css';

/**
 * A **dropdown** presents a menu of actions or links in a constrained space that will trigger a process or navigate to a new location.
 *
 * @slot - Must contain one or more `<pf-dropdown-item>` or `<pf-dropdown-group>`
 */
@customElement('pf-dropdown-menu')
export class PfDropdownMenu extends LitElement {
  static readonly styles = [styles];
  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * whether listbox is disabled
   */
  @property({ reflect: true, type: Boolean }) disabled = false;

  @queryAssignedElements({ flatten: true }) private menuAssignedElements!:
    | PfDropdownItem[]
    | PfDropdownGroup[];

  /** event listeners for host element */
  #listeners = {
    'keydown': this.#onMenuitemKeydown.bind(this),
    'focusin': this.#onMenuitemFocusin.bind(this),
    'click': this.#onMenuitemClick.bind(this),
  };

  #itemsInit = false;

  #tabindex = new RovingTabindexController(this);

  #internals = InternalsController.for(this, { role: 'menu' });

  /**
   * current active descendant in menu
   */
  get activeItem() {
    const [active] = this.#menuitems.filter(menuitem => menuitem.getAttribute('id') === this.#internals.ariaActivedescendant);
    return active ?? this.#tabindex.firstItem;
  }

  /**
   * index of current active descendant in menu
   */
  get activeIndex() {
    return this.#menuitems.indexOf(this.activeItem) || 0;
  }

  get #dropdownItems() {
    const dropdownItems: PfDropdownItem[] = [];
    this.menuAssignedElements?.forEach(node => {
      if (node instanceof PfDropdownItem) {
        dropdownItems.push(node);
      } else if (node instanceof PfDropdownGroup) {
        const pfItems = node.dropdownItems;
        dropdownItems.push(...pfItems);
      }
    });
    return dropdownItems;
  }

  get #menuitems() {
    return this.#dropdownItems.map(item => item.menuItem);
  }

  connectedCallback() {
    super.connectedCallback();
    for (const [event, listener] of Object.entries(this.#listeners)) {
      this.addEventListener(event, listener as (event: Event | null) => void);
    }
  }

  protected updated(_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (_changedProperties.has('disabled')) {
      this.#internals.ariaDisabled = `${!!this.disabled}`;
    }
  }

  render() {
    return html`
      <slot @slotchange="${this.#handleSlotChange}" @change="${this.#handleItemChange}"></slot>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const [event, listener] of Object.entries(this.#listeners)) {
      this.removeEventListener(event, listener as (event: Event | null) => void);
    }
  }

  /**
   * handles a change event from a dropdown item
   * @param event {Event}
   */
  #handleItemChange(event: Event) {
    if (event instanceof DropdownItemChange) {
      this.#updateItems();
    }
  }

  /**
   * handles slot change event
   */
  #handleSlotChange() {
    this.#updateItems();
  }

  #nextMatchingItem(key: string) {
    const items = [...this.#menuitems];
    const index = !this.activeItem ? items.indexOf(this.activeItem) : -1;
    const sequence = [...items.slice(index), ...items.slice(0, index)];
    const regex = new RegExp(`^${key}`, 'i');
    const first = sequence.find(item => {
      const option = item;
      return !option.hidden && option.textContent?.match(regex);
    });
    return first;
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   * @param event {FocusEvent}
   * @returns void
   */
  #onMenuitemFocusin(event: FocusEvent) {
    const target = event.target as PfDropdownItem;
    const menuitem = target.menuItem;
    if (menuitem !== this.#tabindex.activeItem) {
      this.#tabindex.updateActiveItem(menuitem);
    }
    this.#updateActiveDescendant();
  }

  /**
   * handles clicking on a listbox option:
   * which selects an item by default
   * or toggles selection if multiselectable
   * @param event {MouseEvent}
   * @returns void
   */
  #onMenuitemClick(event: MouseEvent) {
    const target = event.target as PfDropdownItem;
    const menuitem = target.menuItem;
    if (menuitem !== this.#tabindex.activeItem) {
      this.#tabindex.focusOnItem(menuitem);
      this.#updateActiveDescendant();
    }
  }

  /**
   * handles keydown:
   * filters listbox by keyboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event {KeyboardEvent}
   * @returns void
   */
  #onMenuitemKeydown(event: KeyboardEvent) {
    let focusEvent: HTMLElement | undefined;
    if (event.key?.match(/^[\w]$/)) {
      focusEvent = this.#nextMatchingItem(event.key);
      event.stopPropagation();
      event.preventDefault();
      // only change focus if keydown occurred when option has focus
      // (as opposed to an external text input and if filter has changed
      if (focusEvent) {
        this.#tabindex.focusOnItem(focusEvent);
        this.#updateActiveDescendant();
      }
    }
  }

  /**
   * updates active descendant when focus changes
   */
  #updateActiveDescendant() {
    this.#dropdownItems.forEach(item => {
      item.active = item.menuItem === this.#tabindex.activeItem && this.#menuitems.includes(item.menuItem);
      if (item.active) {
        this.#internals.ariaActivedescendant = item.id;
      } else {
        if (this.#internals.ariaActivedescendant === item.id) {
          this.#internals.ariaActivedescendant = null;
        }
      }
    });
  }

  /**
   * updates menu items list
   */
  #updateItems() {
    if (this.#itemsInit) {
      this.#tabindex.updateItems(this.#menuitems);
    } else {
      this.#tabindex.initItems(this.#menuitems);
    }
    this.#itemsInit = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-menu': PfDropdownMenu;
  }
}
