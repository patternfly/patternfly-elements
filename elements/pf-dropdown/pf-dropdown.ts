import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import styles from './pf-dropdown.css';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { PfDropdownItem } from './pf-dropdown-item.js';
import { PfDropdownItemsGroup } from './pf-dropdown-items-group.js';

export class DropdownSelectEvent extends ComposedEvent {
  constructor(
    public event: Event | KeyboardEvent,
    public selectedValue: string,
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
@customElement('pf-dropdown')
export class PfDropdown extends LitElement {
  static readonly styles = [styles];
  private static instances = new Set<PfDropdown>();

  static {
    document.addEventListener('click', function(event) {
      for (const instance of PfDropdown.instances) {
        if (!instance.noOutsideClick) {
          instance.#outsideClick(event);
        }
      }
    });
  }

  /**
   * Don't hide the dropdown when clicking ouside of it.
   */
  @property({ type: Boolean, reflect: true, attribute: 'no-outside-click' }) noOutsideClick = false;

  /**
   * Disable the dropdown trigger element
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  #activeIndex = 0;
  #liElements: PfDropdownItem[] = [];
  #triggerElement: HTMLElement | null = null;

  @query('slot[name="trigger"]') private triggerSlot!: HTMLSlotElement;
  @queryAssignedElements({ flatten: true }) private ulAssignedElements!: PfDropdownItem[] | PfDropdownItemsGroup[];
  // @queryAll('pf-dropdown-item') listItems!: NodeListOf<any>;

  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | undefined | null => this.shadowRoot?.querySelector('#dropdown-menu'),
  });

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    PfDropdown.instances.delete(this);
  }

  render() {
    return html`
      <slot part="dropdown-trigger" ?disabled="${this.disabled}" name="trigger" id="trigger" @keydown=${this.handleDropdownButton} @click=${this.toggleMenu}>
        <pf-button ?disabled="${this.disabled}">Dropdown</pf-button>
      </slot>
      <ul part="dropdown-menu" class="dropdown-menu ${this.#float.open && !this.disabled ? 'show' : ''}" role="listbox" tabindex=${this.#float.open ? '0' : '-1'} @keydown=${this.onKeydown} @click="${this.handleSelect}" id="dropdown-menu">
        <slot @slotchange=${this.#handleSlotChange}></slot>
      </ul>
    `;
  }

  #outsideClick(event: MouseEvent) {
    const path = event?.composedPath();
    if (!path?.includes(this)) {
      this.hide();
    }
  }

  /**
   * Toggle the popover
   */
  @bound async toggleMenu() {
    this.#float.open ? this.hide() : this.show();
  }

  #setTriggerElement() {
    const hasAssignedNodes = this.triggerSlot?.assignedNodes()?.length > 0;
    if (!hasAssignedNodes) {
      const defaultButton = this.triggerSlot?.children[0] as HTMLElement;
      this.#triggerElement = defaultButton;
    } else {
      this.#triggerElement = document.activeElement as HTMLElement;
    }
  }

  /**
   * Opens the popover
   */
  @bound async show() {
    await this.updateComplete;
    await this.#float.show();
    this.#setTriggerElement();
    this.#triggerElement?.setAttribute('aria-expanded', 'true');
    this.#triggerElement?.setAttribute('aria-haspopup', 'listbox');
    this.#focusSelectedItem(0);
    PfDropdown.instances.add(this);
  }

  /**
   * Closes the popover
   */
  @bound async hide() {
    await this.#float.hide();
    this.#triggerElement?.focus();
    PfDropdown.instances.delete(this);
    // accessibility update
    this.#triggerElement?.setAttribute('aria-expanded', 'false');
    this.#liElements?.forEach(li => {
      if (li?.localName === 'pf-dropdown-item') {
        const liElement = li?.shadowRoot?.querySelector('li');
        liElement?.setAttribute('tabindex', '-1');
      }
    });
  }

  #focusSelectedItem(index: number) {
    if (index > 0 && index < this.#liElements.length) {
      this.#activeIndex = index;
    } else if (index < 0) {
      this.#activeIndex = this.#liElements.length - 1;
    } else {
      this.#activeIndex = 0;
    }

    const liElement = this.#liElements[this.#activeIndex]?.shadowRoot?.querySelector('li');
    if (liElement) {
      const currentElement = document.activeElement;
      if (currentElement?.localName === 'pf-dropdown-item') {
        const previousLiElement = currentElement?.shadowRoot?.querySelector('li');
        previousLiElement?.setAttribute('tabindex', '-1');
      }
      liElement?.setAttribute('tabindex', '0');
      liElement?.focus();
    }
  }

  #handleSlotChange() {
    let pfDropdownItems: PfDropdownItem[] = [];
    this.ulAssignedElements?.forEach(node => {
      if (node?.localName === 'pf-dropdown-item') {
        pfDropdownItems.push(node as PfDropdownItem);
      } else if (node?.localName === 'pf-dropdown-items-group') {
        const pfItems = [...node.children] as PfDropdownItem[];
        pfDropdownItems.push(...pfItems);
      }
    });
    pfDropdownItems = pfDropdownItems?.filter(n => (n?.divider === false && n?.disabled === false));
    this.#liElements = pfDropdownItems;

    if (this.disabled) {
      const triggeredNode = this.triggerSlot?.assignedNodes()?.[0] as HTMLButtonElement;
      if (triggeredNode) {
        triggeredNode.disabled = this.disabled;
      }
    }
  }

  handleSelect(event: Event & { target: HTMLLIElement }) {
    this.hide();
    this.dispatchEvent(new DropdownSelectEvent(event, `${event?.target?.value}`));
  }

  @bound private onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Home':
        event.preventDefault();
        this.#focusSelectedItem(0);
        break;
      case 'End':
        event.preventDefault();
        this.#focusSelectedItem(this.#liElements.length - 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.#focusSelectedItem(this.#activeIndex - 1);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.#focusSelectedItem(this.#activeIndex + 1);
        break;
      case 'Escape':
      case 'Esc':
      case 'Tab':
        event.preventDefault();
        this.hide();
        break;
      case 'Enter':
        event.preventDefault();
        this.dispatchEvent(new DropdownSelectEvent(event, `${(event?.target as HTMLLIElement)?.value}`));
        this.hide();
        break;
      default:
        break;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  @bound private handleDropdownButton() {}
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown': PfDropdown;
  }
}
