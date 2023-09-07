import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import styles from './pf-dropdown.css';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import { query } from 'lit/decorators/query.js';
import './pf-dropdown-menu.js';

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
 * @slot - Must contain one or more `<pf-dropdown-item>` or `pf-dropdown-group`
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

  #triggerElement: HTMLElement | null = null;

  @query('slot[name="trigger"]') private triggerSlot!: HTMLSlotElement;
  @query('pf-dropdown-menu') private menuElement!: HTMLElement;

  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | undefined | null =>
      this.shadowRoot?.querySelector('pf-dropdown-menu'),
  });

  connectedCallback() {
    super.connectedCallback();
    this.#triggerElement?.setAttribute('aria-haspopup', 'menu');
    this.#triggerElement?.setAttribute('aria-controls', 'dropdown-menu');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    PfDropdown.instances.delete(this);
  }

  render() {
    return html`
      <slot
        part="dropdown-trigger"
        ?disabled="${this.disabled}"
        name="trigger"
        id="trigger"
        @keydown=${this.handleDropdownButton}
        @click=${this.toggleMenu}
      >
        <pf-button ?disabled="${this.disabled}" variant="control">
          Dropdown 
          <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" width="1em" height="1em">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
          </svg>
        </pf-button>
      </slot>
      <pf-dropdown-menu
        part="dropdown-menu"
        class="${this.#float.open && !this.disabled ? 'show' : ''}"
        @keydown=${this.onKeydown}
        @click="${this.handleSelect}"
        id="dropdown-menu"
      >
        <slot></slot>
      </dpf-dropdown-menuiv>
    `;
  }

  /**
   * sets focus on trigger element
   */
  focus() {
    this.menuElement?.focus();
  }

  #outsideClick(event: MouseEvent) {
    const path = event?.composedPath();
    if (!path?.includes(this)) {
      this.hide();
    }
  }

  /**
   * Toggle the dropdown
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
   * Opens the dropdown
   */
  @bound async show() {
    await this.updateComplete;
    await this.#float.show();
    this.#setTriggerElement();
    this.#triggerElement?.setAttribute('aria-expanded', 'true');
    this.menuElement?.focus();
    PfDropdown.instances.add(this);
  }

  /**
   * Closes the dropdown
   */
  @bound async hide() {
    await this.#float.hide();
    this.#triggerElement?.focus();
    PfDropdown.instances.delete(this);
    // accessibility update
    this.#triggerElement?.setAttribute('aria-expanded', 'false');
  }

  handleSelect(event: Event & { target: HTMLLIElement }) {
    this.hide();
    this.dispatchEvent(
      new DropdownSelectEvent(event, `${event?.target?.value}`)
    );
  }

  @bound private onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
      case 'Esc':
      case 'Tab':
        event.preventDefault();
        this.hide();
        break;
      case 'Enter':
        event.preventDefault();
        this.dispatchEvent(
          new DropdownSelectEvent(
            event,
            `${(event?.target as HTMLLIElement)?.value}`
          )
        );
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
