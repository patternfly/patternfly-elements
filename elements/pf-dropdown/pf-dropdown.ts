import { LitElement, html, type PropertyValues } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';

import { PfDropdownItem } from './pf-dropdown-item.js';
import { PfDropdownMenu } from './pf-dropdown-menu.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-dropdown.css';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

function canBeDisabled(el: HTMLElement): el is HTMLElement & { disabled: boolean } {
  return 'disabled' in el;
}

export class PfDropdownSelectEvent extends Event {
  constructor(
    public originalEvent: Event | KeyboardEvent,
    public value: string
  ) {
    super('select', { bubbles: true, cancelable: true });
  }
}

/**
 * A **dropdown** presents a menu of actions or links in a constrained space that
 * will trigger a process or navigate to a new location.
 *
 * @slot - Must contain one or more `<pf-dropdown-item>` or `<pf-dropdown-group>`
 * @slot trigger - Custom trigger button
 *
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
 * @fires {PfDropdownSelectEvent} select - when a user select dropdown value
 * @fires open - when the dropdown toggles open
 * @fires close - when the dropdown toggles closed
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
   * Whether the dropdown is expanded
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  @query('pf-dropdown-menu')
  private _menuElement!: PfDropdownMenu;

  @queryAssignedElements({ slot: 'trigger' })
  private _triggerElements!: HTMLElement[];

  #float = new FloatingDOMController(this, {
    content: () => this._menuElement,
  });

  render() {
    const { expanded } = this;
    const { anchor, alignment, styles = {} } = this.#float;
    const { disabled } = this;
    return html`
    <div class="${classMap({ expanded, [anchor ?? '']: !!anchor, [alignment ?? '']: !!alignment })}"
         style="${styleMap(styles)}">
      <div id="trigger"
           aria-controls="menu"
           aria-haspopup="menu"
           aria-expanded="${String(expanded) as 'true' | 'false'}"
           @keydown="${this.#onButtonKeydown}"
           @click="${() => this.toggle()}">
        <slot name=trigger>
          <pf-button variant="control"
                     icon="caret-down"
                     icon-set="fas">Dropdown</pf-button>
        </slot>
      </div>
      <pf-dropdown-menu id="menu"
                        part="menu"
                        class="${classMap({ show: expanded })}"
                        ?disabled="${disabled}"
                        @focusout="${this.#onMenuFocusout}"
                        @keydown="${this.#onMenuKeydown}"
                        @click="${this.#onSelect}">
        <slot></slot>
      </pf-dropdown-menu>
    </div>`;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('expanded')) {
      this.#expandedChanged();
    }
    if (changed.has('disabled')) {
      this.#disabledChanged();
    }
  }

  async #expandedChanged() {
    const will = this.expanded ? 'close' : 'open';
    this.dispatchEvent(new Event(will));
    if (this.expanded) {
      await this.#float.show();
      this._menuElement.activeItem?.focus();
    } else {
      await this.#float.hide();
    }
  }

  #disabledChanged() {
    for (const trigger of this._triggerElements) {
      if (canBeDisabled(trigger)) {
        trigger.disabled = this.disabled;
      }
    }
  }

  #onSelect(event: KeyboardEvent | Event & { target: PfDropdownItem }) {
    const menu = this._menuElement;
    const target = event.target as PfDropdownItem || menu.activeItem;
    this.dispatchEvent(new PfDropdownSelectEvent(event, `${target?.value}`));
    this.hide();
  }

  #onButtonKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown': {
        if (!this.disabled) {
          this.show();
        }
      }
    }
  }

  #onMenuFocusout(event: FocusEvent) {
    if (this.expanded) {
      const root = this.getRootNode();
      if (root instanceof ShadowRoot ||
          root instanceof Document &&
          event.relatedTarget instanceof PfDropdownItem &&
          !this._menuElement.items.includes(event.relatedTarget)
      ) {
        this.hide();
      }
    }
  }

  #onMenuKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.#onSelect(event);
        break;
      case 'Escape':
        this.hide();
        this._triggerElements?.at(0)?.focus();
    }
  }

  /**
   * Opens the dropdown
   */
  async show() {
    this.expanded = true;
    await this.updateComplete;
  }

  /**
   * Closes the dropdown
   */
  async hide() {
    this.expanded = false;
    await this.updateComplete;
  }

  async toggle() {
    this.expanded = !this.expanded;
    await this.updateComplete;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown': PfDropdown;
  }
}
