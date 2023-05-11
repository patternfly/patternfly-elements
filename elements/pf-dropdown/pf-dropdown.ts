import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import styles from './pf-dropdown.css';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ComposedEvent } from '@patternfly/pfe-core';

interface MyCustomElement extends HTMLElement {
  __divider?: boolean;
}

export class DropdownSelectEvent extends ComposedEvent {
  constructor(
    public event: Event | KeyboardEvent,
    public selectedValue: string,
  ) {
    super('select');
  }
}

/**
 * pf Dropdown
 * @slot - Place element content here
 */
@customElement('pf-dropdown')
export class PfDropdown extends LitElement {
  static readonly styles = [styles];

  /**
   *
  */
  @property({ reflect: true }) value?: string;

  /**
   * Don't hide the popover when clicking ouside of it.
   */
  @property({ type: Boolean, reflect: true, attribute: 'close-on-outside-click' }) closeOnOutsideClick = false;

  #activeIndex = 0;
  #liElements: Element[] = [];
  #triggerElement: HTMLElement | null = null;
  #outsideClick = this.handleOutsideClick.bind(this);

  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | undefined | null => this.shadowRoot?.querySelector('#dropdown-menu'),
  });

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this.#outsideClick);
  }

  handleOutsideClick(event: MouseEvent) {
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

  /**
   * Opens the popover
   */
  @bound async show() {
    await this.updateComplete;
    await this.#float.show();
    // default trigger button
    if (document.activeElement?.localName === 'pf-dropdown') {
      const defaultButton = this.shadowRoot?.querySelector('slot[name="trigger"]')?.children[0] as HTMLElement;
      this.#triggerElement = defaultButton;
    } else {
      this.#triggerElement = document.activeElement as HTMLElement;
    }
    this.#triggerElement?.setAttribute('aria-expanded', 'true');
    this.#triggerElement?.setAttribute('aria-haspopup', 'listbox');
    this.#focusSelectedItem(0);
    // add event listener for outside click
    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this.#outsideClick);
    }
  }

  /**
   * Closes the popover
   */
  @bound async hide() {
    await this.#float.hide();
    this.#triggerElement?.focus();
    document.removeEventListener('click', this.#outsideClick);
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
      liElement?.focus();
      liElement?.setAttribute('tabindex', '0');
    }
  }

  #handleSlotChange() {
    const ulElement = this.shadowRoot?.querySelector('.dropdown-menu');
    const slotElement = ulElement?.querySelector('slot');
    const assignedNodes = slotElement?.assignedElements();
    let pfDropdownItems: Element[] = [];
    assignedNodes?.forEach(node => {
      if (node?.nodeName === 'PF-DROPDOWN-ITEM') {
        pfDropdownItems.push(node);
      } else if (node?.nodeName === 'PF-DROPDOWN-ITEMS-GROUP') {
        pfDropdownItems.push(...node.children);
      }
    });
    pfDropdownItems = pfDropdownItems?.filter(n => (n as MyCustomElement)?.__divider === false);
    this.#liElements = pfDropdownItems;
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

  render() {
    return html`
      <slot @keydown=${this.handleDropdownButton} name="trigger" id="trigger" @click=${this.toggleMenu}>
        <pf-button>Dropdown</pf-button>
      </slot>
      <ul class="dropdown-menu ${this.#float.open ? 'show' : ''}" role="listbox" tabindex=${this.#float.open ? '0' : '-1'} @keydown=${this.onKeydown} @click="${this.handleSelect}" id="dropdown-menu">
        <slot @slotchange=${this.#handleSlotChange}></slot>
      </ul>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown': PfDropdown;
  }
}
