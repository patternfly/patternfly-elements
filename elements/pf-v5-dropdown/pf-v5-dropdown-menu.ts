import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { consume } from '@lit/context';
import { state } from 'lit/decorators/state.js';
import { context, type PfV5DropdownContext } from './context.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import { PfV5DropdownItem, DropdownItemChange } from './pf-v5-dropdown-item.js';
import { PfV5DropdownGroup } from './pf-v5-dropdown-group.js';

import styles from './pf-v5-dropdown-menu.css';
import { classMap } from 'lit/directives/class-map.js';

function isDisabledItemClick(event: MouseEvent) {
  const item: PfV5DropdownItem | undefined =
    event.composedPath().find((x): x is PfV5DropdownItem => x instanceof PfV5DropdownItem);
  return !!item?.disabled;
}

/**
 * A **dropdown** presents a menu of actions or links in a constrained space that will trigger a
 * process or navigate to a new location.
 * @slot - Must contain one or more `<pf-v5-dropdown-item>` or `<pf-v5-dropdown-group>`
 */
@customElement('pf-v5-dropdown-menu')
export class PfV5DropdownMenu extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @consume({ context, subscribe: true })
  @state()
  private ctx?: PfV5DropdownContext;

  #internals = InternalsController.of(this, { role: 'menu' });

  get #items() {
    return this.items.map(x => x.menuItem);
  }

  #tabindex = RovingTabindexController.of(this, {
    getItems: () => this.#items,
  });

  /**
   * current active descendant in menu
   */
  get activeItem(): HTMLElement | null {
    return this.#tabindex.items.at(this.#tabindex.atFocusedItemIndex)
        ?? this.#tabindex.atFocusableItems.at(0)
        ?? null;
  }

  /**
   * index of current active descendant in menu
   */
  get activeIndex(): number {
    return this.#tabindex.atFocusedItemIndex;
  }

  get items(): PfV5DropdownItem[] {
    return this.#getSlottedItems(this.shadowRoot?.querySelector('slot'));
  }

  connectedCallback(): void {
    super.connectedCallback();
    this.addEventListener('focusin', this.#onMenuitemFocusin);
    this.addEventListener('click', this.#onMenuitemClick);
  }

  protected override willUpdate(): void {
    this.#internals.ariaDisabled = String(!!this.ctx?.disabled);
  }

  render(): TemplateResult<1> {
    const { disabled = false } = this.ctx ?? {};
    return html`
      <slot class="${classMap({ disabled })}"
            @slotchange="${this.#onSlotChange}"
            @change="${this.#onItemChange}"></slot>
    `;
  }

  /**
   * handles a change event from a dropdown item
   * @param event {Event}
   */
  #onItemChange(event: Event) {
    if (event instanceof DropdownItemChange) {
      this.#onSlotChange();
    }
  }

  /**
   * handles slot change event
   */
  #onSlotChange() {
    this.#tabindex.items = this.#items;
  }

  /**
   * handles focusing on an option:
   * updates roving tabindex and active descendant
   * @param event the focus event
   */
  #onMenuitemFocusin(event: FocusEvent) {
    if (this.ctx?.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.target instanceof PfV5DropdownItem) {
      this.#focusItem(event.target.menuItem);
    }
  }

  /**
   * handles clicking on a menuitem:
   * which selects an item by default
   * or toggles selection if multiselectable
   * @param event the click event
   */
  #onMenuitemClick(event: MouseEvent) {
    if (this.ctx?.disabled || isDisabledItemClick(event)) {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.target instanceof PfV5DropdownItem) {
      this.#focusItem(event.target.menuItem);
    }
  }

  #focusItem(item: HTMLElement) {
    const itemIndex = this.#tabindex.items.indexOf(item);
    if (itemIndex !== this.#tabindex.atFocusedItemIndex) {
      this.#tabindex.atFocusedItemIndex = itemIndex;
    }
  }

  #getSlottedItems(slot?: HTMLSlotElement | null): PfV5DropdownItem[] {
    return slot
        ?.assignedElements()
        .flatMap(element => {
          if (element instanceof HTMLSlotElement) {
            return this.#getSlottedItems(element);
          } else if (element instanceof PfV5DropdownItem) {
            return [element];
          } else if (element instanceof PfV5DropdownGroup) {
            return Array.from(element.querySelectorAll('pf-v5-dropdown-item'));
          } else {
            return [];
          }
        }) ?? [];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-dropdown-menu': PfV5DropdownMenu;
  }
}
