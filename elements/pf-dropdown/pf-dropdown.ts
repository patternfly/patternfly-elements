import { LitElement, html, type PropertyValues, type TemplateResult } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { queryAssignedElements } from 'lit/decorators/query-assigned-elements.js';
import { provide } from '@lit/context';

import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';

import { context, type PfDropdownContext } from './context.js';
import { PfDropdownItem } from './pf-dropdown-item.js';
import { PfDropdownMenu } from './pf-dropdown-menu.js';

import '@patternfly/elements/pf-button/pf-button.js';

import styles from './pf-dropdown.css';


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
 * @alias Dropdown
 * @slot - Must contain one or more `<pf-dropdown-item>` or `<pf-dropdown-group>`
 * @slot toggle - Custom toggle button
 * @slot menu - when using a custom toggle, you must slot a `<pf-dropdown-menu>` in alongside it
 * @csspart menu - The dropdown menu wrapper
 * @cssprop {<length>} [--pf-c-dropdown__menu--PaddingTop=0.5rem] Dropdown top padding
 * @cssprop {<length>} [--pf-c-tooltip__content--PaddingRight=0.5rem] Dropdown right padding
 * @cssprop {<length>} [--pf-c-dropdown__menu--ZIndex=200] Dropdown z-index
 * @cssprop [--pf-c-dropdown__menu--BoxShadow=0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)] Dropdown box shadow
 * @cssprop {<length>} [--pf-c-dropdown__menu--Top=100% + 0.25rem] Dropdown top
 * @fires {PfDropdownSelectEvent} select - when a user select dropdown value
 * @fires open - when the dropdown toggles open
 * @fires close - when the dropdown toggles closed
 */
@customElement('pf-dropdown')
export class PfDropdown extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /**
   * When disabled, the dropdown can still be toggled open and closed via keyboard, but menu items cannot be activated.
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Whether the dropdown is expanded
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  @queryAssignedElements({ slot: 'toggle', flatten: true })
  private _toggleElements!: HTMLElement[];

  @queryAssignedElements({ slot: 'menu', flatten: true })
  private _menuElements!: HTMLElement[];

  @provide({ context }) private ctx: PfDropdownContext = { disabled: false };

  #logger = new Logger(this);

  #float = new FloatingDOMController(this, {
    content: () => this._menuElements?.at(0),
  });

  protected override async getUpdateComplete(): Promise<boolean> {
    const ps = await Promise.all([
      super.getUpdateComplete(),
      this._menuElements?.map(x => (x as LitElement).updateComplete),
    ]);
    return ps.every(x=>!!x);
  }

  willUpdate(changed: PropertyValues): void {
    if (changed.has('disabled')) {
      const { disabled } = this;
      this.ctx = { disabled };
    }
  }

  render(): TemplateResult<1> {
    const { expanded } = this;
    const { anchor, alignment, styles = {} } = this.#float;
    const { disabled } = this;
    return html`
    <div class="${classMap({ disabled,
                             expanded,
                             [anchor ?? '']: !!anchor,
                             [alignment ?? '']: !!alignment })}"
         style="${styleMap(styles)}"
         @slotchange="${this.#onSlotchange}">
      <slot name="toggle"
            @keydown="${this.#onButtonKeydown}"
            @click="${() => this.toggle()}">
        <pf-button id="default-toggle" variant="control">
          Dropdown
          <pf-icon icon="caret-down" size="md"></pf-icon>
        </pf-button>
      </slot>
      <slot name="menu"
            ?hidden="${!this.expanded}"
            @focusout="${this.#onMenuFocusout}"
            @keydown="${this.#onMenuKeydown}"
            @click="${this.#onSelect}">
        <pf-dropdown-menu id="menu" part="menu" ?disabled="${disabled}">
          <slot></slot>
        </pf-dropdown-menu>
      </slot>
    </div>`;
  }

  override firstUpdated(): void {
    this.#onSlotchange();
  }

  updated(changed: PropertyValues<this>): void {
    if (changed.has('expanded')) {
      this.#expandedChanged();
    }
    if (changed.has('disabled')) {
      this.#disabledChanged();
    }
  }

  #validateDOM() {
    const [toggle] = this._toggleElements;
    const [menu] = this._menuElements;
    if (!toggle) {
      this.#logger.warn('no toggle found');
      return false;
    } else if (!menu) {
      this.#logger.warn('no menu found');
      return false;
    } else if (![toggle, menu].map(x => this.shadowRoot?.contains(x))
        .every((p, _, a) => p === a[0])) {
      this.#logger.warn('toggle and menu must be located in the same root');
      return false;
    } else {
      return true;
    }
  }

  #onSlotchange() {
    if (this.#validateDOM()) {
      const [menu] = this._menuElements;
      const [toggle] = this._toggleElements;
      menu.id ||= getRandomId('menu');
      toggle.setAttribute('aria-controls', menu.id);
      toggle.setAttribute('aria-haspopup', menu.id);
      toggle.setAttribute('aria-expanded', String(this.expanded) as 'true' | 'false');
    }
  }

  async #expandedChanged() {
    const will = this.expanded ? 'close' : 'open';
    const [menu] = this._menuElements;
    const [toggle] = this._toggleElements;
    toggle.setAttribute('aria-expanded', `${String(this.expanded) as 'true' | 'false'}`);
    this.dispatchEvent(new Event(will));
    if (this.expanded) {
      await this.#float.show();
      if (menu instanceof PfDropdownMenu) {
        menu.activeItem?.focus();
      }
    } else {
      await this.#float.hide();
    }
  }

  #disabledChanged() {
    if (this.#validateDOM()) {
      const [toggle] = this._toggleElements;
      toggle.setAttribute('aria-disabled', String(!!this.disabled));
    }
  }

  #onSelect(event: KeyboardEvent | Event & { target: PfDropdownItem }) {
    const [menu] = this._menuElements;
    if (menu instanceof PfDropdownMenu) {
      const target = event.target as PfDropdownItem || menu.activeItem;
      this.dispatchEvent(new PfDropdownSelectEvent(event, `${target?.value}`));
      this.hide();
    }
  }

  #onButtonKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown': {
        this.show();
      }
    }
  }

  #onMenuFocusout(event: FocusEvent) {
    if (this.expanded) {
      const root = this.getRootNode();
      const [menu] = this._menuElements;
      if (root instanceof ShadowRoot
          || root instanceof Document
          && event.relatedTarget instanceof PfDropdownItem
          && menu instanceof PfDropdownMenu
          && !menu.items.includes(event.relatedTarget)
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
        this._toggleElements?.at(0)?.focus();
    }
  }

  /**
   * Opens the dropdown
   */
  async show(): Promise<void> {
    this.expanded = true;
    await this.updateComplete;
  }

  /**
   * Closes the dropdown
   */
  async hide(): Promise<void> {
    this.expanded = false;
    await this.updateComplete;
  }

  async toggle(): Promise<void> {
    this.expanded = !this.expanded;
    await this.updateComplete;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-dropdown': PfDropdown;
  }
}
