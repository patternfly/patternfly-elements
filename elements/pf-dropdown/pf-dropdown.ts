import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ComposedEvent } from '@patternfly/pfe-core';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { ToggleController } from '@patternfly/pfe-core/controllers/toggle-controller.js';
import { PfDropdownItem } from './pf-dropdown-item.js';
import { PfDropdownMenu } from './pf-dropdown-menu.js';
import styles from './pf-dropdown.css';

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
 * @slot - Must contain one or more `<pf-dropdown-item>` or `<pf-dropdown-group>`
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

  /**
   * Disable the dropdown trigger element
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Flag to indicate if menu is opened.
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  #triggerElement: HTMLElement | null = null;

  @queryAssignedElements({ slot: 'trigger' }) private _slottedTrigger!: HTMLElement[];

  @query('#default-button') private _defaultTrigger!: HTMLButtonElement;

  @query('pf-dropdown-menu') private _menuElement!: HTMLElement;

  #toggle?: ToggleController;

  connectedCallback() {
    super.connectedCallback();
    this.#toggle = new ToggleController(this, 'menu');
    this.#setTriggerElement();
  }

  firstUpdated() {
    this.#setTriggerElement();
    this.#toggle?.setPopupElement(this._menuElement);
  }

  render() {
    let classes = {};
    if (this.#toggle) {
      const { expanded, anchor, alignment } = this.#toggle;
      classes = { expanded, [anchor]: !!anchor, [alignment]: !!alignment };
    }
    return html`
    <div 
      style="${this.#toggle?.styles ? styleMap(this.#toggle.styles) : ''}"
      class="${this.#toggle ? classMap(classes) : ''}">
      <slot
        part="dropdown-trigger"
        ?disabled="${this.disabled}"
        name="trigger"
        id="trigger"
        @keydown=${this.handleDropdownButton}
        @slotchange=${this.#setTriggerElement}
      >
        <pf-button id="default-button" ?disabled="${this.disabled}" variant="control">
          Dropdown 
          <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" width="1em" height="1em">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
          </svg>
        </pf-button>
      </slot>
      <pf-dropdown-menu
        part="dropdown-menu"
        class="${this.#toggle?.expanded && !this.disabled ? 'show' : ''}"
        @keydown=${this.onKeydown}
        @click="${this.#handleSelect}"
        id="dropdown-menu"
      >
        <slot></slot>
      </pf-dropdown-menu>
    </div>`;
  }

  /**
   * sets focus on trigger element
   */
  focus() {
    this._menuElement?.focus();
  }

  #setTriggerElement() {
    const [slottedTrigger] = this._slottedTrigger;
    const trigger = slottedTrigger || this._defaultTrigger;
    if (this.#triggerElement !== trigger) {
      this.#toggle?.removeTriggerElement(this.#triggerElement);
      this.#triggerElement = trigger;
      this.#toggle?.addTriggerElement(this.#triggerElement);
    }
  }

  /**
   * Opens the dropdown
   */
  @bound async open() {
    await this.#toggle?.open(true);
  }

  /**
   * Closes the dropdown
   */
  @bound async close() {
    await this.#toggle?.close(true);
  }

  #handleSelect(event: KeyboardEvent | Event & { target: PfDropdownItem }) {
    const menu = this._menuElement as PfDropdownMenu;
    const target = event.target as PfDropdownItem || menu.activeItem;
    this.close();
    this.dispatchEvent(
      new DropdownSelectEvent(event, `${target?.value}`)
    );
  }

  @bound private onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Space') {
      event.preventDefault();
      this.#handleSelect(event);
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
