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
    this.#triggerElement = document.activeElement as HTMLElement;
    this.#focusSelectedItem(0);
    // add event listener for outside click
    if (this.closeOnOutsideClick) {
      document.addEventListener('click', this.#outsideClick);
    }
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
    liElement?.focus();
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

  /**
   * Closes the popover
   */
  @bound async hide() {
    await this.#float.hide();
    this.#triggerElement?.focus();
    document.removeEventListener('click', this.#outsideClick);
  }

  handleSelect(event: Event & { target: HTMLLIElement }) {
    this.hide();
    this.dispatchEvent(new DropdownSelectEvent(event, `${event?.target?.value}`));
  }

  @bound private onKeydown(event: KeyboardEvent) {
    switch (event.key) {
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

  @bound private handleDropdownButton() {
    // console.log('event', event.key, event.target);
    // switch (event.key) {
    //   case 'ArrowDown':
    //     event.preventDefault();
    //     console.log('ArrowDown', event.target, event.key);
    //     const ul1 = this.shadowRoot.querySelector('ul');
    //     console.log('ul onKeydown', ul1);
    //     ul1.setAttribute('tabindex', '0');
    //     ul1.focus();
    //     console.log('li elemnet', ul1?.shadowRoot?.querySelector('pf-dropdown-item'), ul1?.querySelector('slot'), ul1?.querySelector('li'));
    //     break;
    //   case 'Escape':
    //   case 'Esc':
    //     event.preventDefault();
    //     this.hide();
    //     break;
    //   case 'Enter':
    //     // event.preventDefault();
    //     // const ulElement = this.shadowRoot.querySelector('ul');
    //     this.show();
    //     const ul = this.shadowRoot.querySelector('ul');
    //     console.log('ul', ul);
    //     ul.setAttribute('tabindex', '0');
    //     ul.focus();
    //     const firstLi = ul?.querySelector('pf-dropdown-item');
    //     console.log('firstLi', firstLi, ul?.children, ul?.querySelector('pf-dropdown-item'), ul?.querySelector('li'));
    //     // firstLi.setAttribute('tabindex', '0');
    //     // firstLi.focus();
    //     break;
    //   default:
    //     break;
    // }
  }

  render() {
    return html`
      <slot @keydown=${this.handleDropdownButton} name="trigger" id="trigger" @click=${this.toggleMenu}></slot>
      <ul class="dropdown-menu ${this.#float.open ? 'show' : ''}" class="dropdown-menu" role="listbox" tabindex=${this.#float.open ? '0' : '-1'} @keydown=${this.onKeydown} @click="${this.handleSelect}" id="dropdown-menu">
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
