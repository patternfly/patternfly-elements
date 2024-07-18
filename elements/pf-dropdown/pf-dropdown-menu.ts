import { LitElement, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { consume } from '@lit/context';
import { state } from 'lit/decorators/state.js';
import { context, type PfDropdownContext } from './context.js';

import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import { PfDropdownItem, DropdownItemChange } from './pf-dropdown-item.js';
import { PfDropdownGroup } from './pf-dropdown-group.js';

import styles from './pf-dropdown-menu.css';
import { classMap } from 'lit/directives/class-map.js';

function isDisabledItemClick(event: MouseEvent) {
  const item: PfDropdownItem | undefined =
    event.composedPath().find((x): x is PfDropdownItem => x instanceof PfDropdownItem);
  return !!item?.disabled;
}

/**
 * A **dropdown** presents a menu of actions or links in a constrained space that will trigger a
 * process or navigate to a new location.
 * @slot - Must contain one or more `<pf-dropdown-item>` or `<pf-dropdown-group>`
 */
@customElement('pf-dropdown-menu')
export class PfDropdownMenu extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  @consume({ context, subscribe: true })
  @state()
  private ctx?: PfDropdownContext;

  #internals = InternalsController.of(this, { role: 'menu' });

  #tabindex = RovingTabindexController.of(this, {
    getItems: () => this.items.map(x => x.menuItem),
  });

  /**
   * current active descendant in menu
   */
  get activeItem(): HTMLElement | undefined {
    return this.#tabindex.activeItem ?? this.#tabindex.firstItem;
  }

  /**
   * index of current active descendant in menu
   */
  get activeIndex(): number {
    if (!this.#tabindex.activeItem) {
      return -1;
    } else {
      return this.#tabindex.items.indexOf(this.#tabindex.activeItem);
    }
  }

  get items(): PfDropdownItem[] {
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
   * @param event the focus event
   */
  #onMenuitemFocusin(event: FocusEvent) {
    if (this.ctx?.disabled) {
      event.preventDefault();
      event.stopPropagation();
    } else if (event.target instanceof PfDropdownItem
        && event.target.menuItem !== this.#tabindex.activeItem) {
      this.#tabindex.setATFocus(event.target.menuItem);
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
    } else if (event.target instanceof PfDropdownItem
        && event.target.menuItem !== this.#tabindex.activeItem) {
      this.#tabindex.setATFocus(event.target.menuItem);
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
