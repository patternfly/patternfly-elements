import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { provide } from '@lit/context';
import { context, type PfDropdownContext } from './context.js';

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
   * Whether the menu is disabled
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  @provide({ context })
  private ctx: PfDropdownContext = { disabled: this.disabled };

  #internals = InternalsController.of(this, { role: 'menu' });

  #tabindex = new RovingTabindexController(this, {
    getItems: () => this.items.map(x => x.menuItem),
  });

  /**
   * current active descendant in menu
   */
  get activeItem() {
    return this.#tabindex.activeItem ?? this.#tabindex.firstItem;
  }

  /**
   * index of current active descendant in menu
   */
  get activeIndex() {
    if (!this.#tabindex.activeItem) {
      return -1;
    } else {
      return this.#tabindex.items.indexOf(this.#tabindex.activeItem);
    }
  }

  get items(): PfDropdownItem[] {
    return this.#getSlottedItems(this.shadowRoot?.querySelector('slot'));
  }

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('focusin', this.#onMenuitemFocusin);
    this.addEventListener('click', this.#onMenuitemClick);
  }

  willUpdate(changed: PropertyValues<this>): void {
    if (changed.has('disabled')) {
      this.ctx = { disabled: !!this.disabled };
    }
  }

  protected updated(changed: PropertyValues<this>): void {
    if (changed.has('disabled')) {
      this.#internals.ariaDisabled = String(!!this.disabled);
    }
  }

  render() {
    return html`
      <slot @slotchange="${this.#onSlotChange}"
            @change="${this.#onItemChange}"></slot>
    `;
  }

  /**
   * handles a change event from a dropdown item
   * @param event {Event}
   */
  #onItemChange(event: Event) {
    if (event instanceof DropdownItemChange) {
      this.#tabindex.updateItems();
    }
  }

  /**
   * handles slot change event
   */
  #onSlotChange() {
    this.#tabindex.updateItems();
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   */
  #onMenuitemFocusin(event: FocusEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.target instanceof PfDropdownItem &&
        event.target.menuItem !== this.#tabindex.activeItem) {
      this.#tabindex.setActiveItem(event.target.menuItem);
    }
  }

  /**
   * handles clicking on a menuitem:
   * which selects an item by default
   * or toggles selection if multiselectable
   */
  #onMenuitemClick(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.target instanceof PfDropdownItem &&
        event.target.menuItem !== this.#tabindex.activeItem) {
      this.#tabindex.setActiveItem(event.target.menuItem);
    }
  }

  #getSlottedItems(slot?: HTMLSlotElement | null): PfDropdownItem[] {
    return slot
      ?.assignedElements()
      .flatMap(element => {
        if (element instanceof HTMLSlotElement) {
          return this.#getSlottedItems(element);
        } else if (element instanceof PfDropdownItem) {
          return [element];
        } else if (element instanceof PfDropdownGroup) {
          return Array.from(element.querySelectorAll('pf-dropdown-item'));
        } else {
          return [];
        }
      }) ?? [];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown-menu': PfDropdownMenu;
  }
}
