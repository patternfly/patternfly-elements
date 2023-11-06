import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';

import { bound } from '@patternfly/pfe-core/decorators/bound.js';
import { ToggleController } from '@patternfly/pfe-core/controllers/toggle-controller.js';

import { PfDropdownItem } from './pf-dropdown-item.js';
import { PfDropdownMenu } from './pf-dropdown-menu.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-dropdown.css';

export class DropdownSelectEvent extends Event {
  constructor(
    public originalEvent: Event | KeyboardEvent,
    public selectedValue: string
  ) {
    super('select', { bubbles: true, cancelable: true });
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
 * @csspart trigger - Dropdown Trigger element
 * @csspart menu - The dropdown menu wrapper
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

  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * Disable the dropdown trigger element
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Flag to indicate if menu is opened.
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  @queryAssignedElements({ slot: 'trigger' }) private _slottedTrigger!: HTMLElement[];

  @query('#default-button') private _defaultTrigger!: HTMLButtonElement;

  @query('pf-dropdown-menu') private _menuElement!: HTMLElement;

  #triggerElement: HTMLElement | null = null;

  #toggle = new ToggleController(this, 'menu');

  render() {
    const { expanded, anchor, alignment } = this.#toggle;
    const { disabled } = this;
    return html`
    <div class="${classMap(this.#toggle ? { expanded, [anchor]: !!anchor, [alignment]: !!alignment } : {})}"
         style="${styleMap(this.#toggle.styles ?? {})}")
      <slot id="trigger"
            part="trigger"
            name="trigger"
            @slotchange="${this.#setTriggerElement}">
        <pf-button id="default-button"
                   variant="control"
                   class="${classMap({ disabled })}">
          Dropdown
          <svg viewBox="0 0 320 512" fill="currentColor" aria-hidden="true" width="1em" height="1em">
            <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
          </svg>
        </pf-button>
      </slot>
      <pf-dropdown-menu id="menu"
                        part="menu"
                        class="${classMap({ show: expanded })}"
                        ?disabled="${this.disabled}"
                        @keydown="${this.onKeydown}"
                        @click="${this.#handleSelect}">
        <slot></slot>
      </pf-dropdown-menu>
    </div>`;
  }

  firstUpdated() {
    this.#toggle?.setPopupElement(this._menuElement);
    this.#setTriggerElement();
  }

  #handleSelect(event: KeyboardEvent | Event & { target: PfDropdownItem }) {
    const menu = this._menuElement as PfDropdownMenu;
    const target = event.target as PfDropdownItem || menu.activeItem;
    this.dispatchEvent(
      new DropdownSelectEvent(event, `${target?.value}`)
    );
    this.hide();
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

  @bound private onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.#handleSelect(event);
        break;
    }
  }

  /**
   * Opens the dropdown
   */
  @bound async show() {
    await this.#toggle?.show(true);
  }

  /**
   * Closes the dropdown
   */
  @bound async hide() {
    await this.#toggle?.hide(true);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown': PfDropdown;
  }
}
