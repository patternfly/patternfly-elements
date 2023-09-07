import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import styles from './pf-dropdown-menu.css';
import { ComposedEvent } from '@patternfly/pfe-core';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { PfDropdownItem } from './pf-dropdown-item.js';
import { PfDropdownItemsGroup } from './pf-dropdown-items-group.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

export class DropdownSelectEvent extends ComposedEvent {
  constructor(
    public event: Event | KeyboardEvent,
    public selectedValue: string
  ) {
    super('select');
  }
}

/**
 * A **dropdown** presents a menu of actions or links in a constrained space that will trigger a process or navigate to a new location.
 *
 * @slot trigger
 *       This slot renders the trigger element that will be used to open and close the dropdown menu.
 *
 * @slot - Must contain one or more `<pf-dropdown-item>` or `pf-dropdown-items-group`
 *
 * @csspart dropdown-trigger - Dropdown Trigger element
 * @csspart dropdown-menu - The dropdown menu wrapper
 *
 * @cssprop {<length>} --pf-c-dropdown__menu--PaddingTop
 *          Dropdown top padding
 *          {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-tooltip__content--PaddingRight
 *          Dropdown right padding
 *          {@default `0.5rem`}
 * @cssprop {<length>} --pf-c-dropdown__menu--ZIndex
 *          Dropdown z-index
 *          {@default `200`}
 * @cssprop --pf-c-dropdown__menu--BoxShadow
 *          Dropdown box shadow
 *          {@default `0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssprop {<length>} --pf-c-dropdown__menu--Top
 *          Dropdown top
 *          {@default `100% + 0.25rem`}
 *
 * @fires { DropdownSelectEvent } select - when a user select dropdown value
 */
@customElement('pf-dropdown-menu')
export class PfDropdownMenu extends LitElement {
  static readonly styles = [styles];

  /**
   * Disable the dropdown trigger element
   */
  @property({ type: Boolean, reflect: true }) disabled = false;
  #menuitems: PfDropdownItem[] = [];
  #tabindex: RovingTabindexController;
  #internals: InternalsController;

  @queryAssignedElements({ flatten: true }) private menuAssignedElements!:
    | PfDropdownItem[]
    | PfDropdownItemsGroup[];

  /** event listeners for host element */
  #listeners = {
    'keydown': this.#onMenuitemKeydown.bind(this),
    'dropdownitemfocus': this.#onMenuitemFocus.bind(this),
    'click': this.#onMenuitemClick.bind(this),
  };

  constructor() {
    super();
    this.#tabindex = new RovingTabindexController<HTMLElement>(this);
    this.#internals = new InternalsController(this, {
      role: 'menu'
    });
  }

  connectedCallback() {
    super.connectedCallback();
    for (const [event, listener] of Object.entries(this.#listeners)) {
      this.addEventListener(event, listener as (event: Event | null) => void);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    for (const [event, listener] of Object.entries(this.#listeners)) {
      this.removeEventListener(event, listener as (event: Event | null) => void);
    }
  }

  render() {
    return html`
      <slot @slotchange=${this.#handleSlotChange}></slot>
    `;
  }

  /**
   * current active descendant in menu
   */
  get activeItem() {
    const [active] = this.#menuitems.filter(menuitem => menuitem.getAttribute('id') === this.#internals.ariaActivedescendant);
    return active || this.#tabindex.firstItem;
  }

  /**
   * index of current active descendant in menu
   */
  get activeIndex() {
    return this.#menuitems.indexOf(this.activeItem) || 0;
  }

  /**
   * sets focus on last active item
   */
  focus() {
    this.#tabindex.focusOnItem(this.#tabindex.activeItem);
  }

  #handleSlotChange() {
    let pfDropdownItems: PfDropdownItem[] = [];
    this.menuAssignedElements?.forEach(node => {
      if (node?.localName === 'pf-dropdown-item') {
        pfDropdownItems.push(node as PfDropdownItem);
      } else if (node?.localName === 'pf-dropdown-items-group') {
        const pfItems = [...node.children] as PfDropdownItem[];
        pfDropdownItems.push(...pfItems);
      }
    });
    pfDropdownItems = pfDropdownItems?.filter(
      n => n?.disabled === false
    );
    this.#menuitems = pfDropdownItems;
    this.#tabindex.initItems(this.#menuitems);
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   * @param event {FocusEvent}
   * @returns void
   */
  #onMenuitemFocus(event: FocusEvent) {
    const target = event.target as PfDropdownItem;
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.updateActiveItem(target);
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
    if (target !== this.#tabindex.activeItem) {
      this.#tabindex.focusOnItem(target);
      this.#updateActiveDescendant();
    }
  }

  /**
   * handles keydown:
   * filters listbox by keboard event when slotted option has focus,
   * or by external element such as a text field
   * @param event {KeyboardEvent}
   * @returns void
   */
  #onMenuitemKeydown(event: KeyboardEvent) {
    let focusEvent: PfDropdownItem | undefined;
    if (event.key?.match(/^[\w]$/)) {
      focusEvent = this.#nextMatchingItem(event.key);
      event.stopPropagation();
      event.preventDefault();
      // only change focus if keydown occurred when option has focus
      // (as opposed to an external text input and if filter has changed
      if (focusEvent) {
        this.#tabindex.focusOnItem(focusEvent);
      }
    }
  }

  #nextMatchingItem(key: string) {
    const items = [...this.#menuitems];
    const index = !this.activeItem ? items.indexOf(this.activeItem) : -1;
    const sequence = [...items.slice(index), ...items.slice(0, index)];
    const regex = new RegExp(`^${key}`, 'i');
    const first = sequence.find(item => {
      const option = item as PfDropdownItem;
      return !option.hasAttribute('disabled') && !option.hidden && option.textContent?.match(regex);
    });
    return first || undefined;
  }

  /**
   * updates active descendant when focus changes
   */
  #updateActiveDescendant() {
    this.#menuitems.forEach(item => {
      if (item === this.#tabindex.activeItem && this.#menuitems.includes(item)) {
        this.#internals.ariaActivedescendant = item.id;
        item.setAttribute('active-descendant', 'active-descendant');
      } else {
        if (this.#internals.ariaActivedescendant === item.id) {
          this.#internals.ariaActivedescendant = null;
        }
        item.removeAttribute('active-descendant');
      }
    });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-menu': PfDropdownMenu;
  }
}
