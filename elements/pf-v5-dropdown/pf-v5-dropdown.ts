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

import { context, type PfV5DropdownContext } from './context.js';
import { PfV5DropdownItem } from './pf-v5-dropdown-item.js';
import { PfV5DropdownMenu } from './pf-v5-dropdown-menu.js';

import '@patternfly/elements/pf-v5-button/pf-v5-button.js';

import styles from './pf-v5-dropdown.css';


export class PfV5DropdownSelectEvent extends Event {
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
 * @fires {PfV5DropdownSelectEvent} select - when a user select dropdown value
 * @fires open - when the dropdown toggles open
 * @fires close - when the dropdown toggles closed
 */
@customElement('pf-v5-dropdown')
export class PfV5Dropdown extends LitElement {
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

  @provide({ context }) private ctx: PfV5DropdownContext = { disabled: false };

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
      <!-- Custom toggle button -->
      <slot name="toggle"
            @keydown="${this.#onButtonKeydown}"
            @click="${() => this.toggle()}">
        <pf-v5-button id="default-toggle" variant="control">
          Dropdown
          <pf-v5-icon icon="caret-down" size="md"></pf-v5-icon>
        </pf-v5-button>
      </slot>
      <!-- when using a custom toggle, you must slot a \`<pf-v5-dropdown-menu>\` in alongside it -->
      <slot name="menu"
            ?hidden="${!this.expanded}"
            @focusout="${this.#onMenuFocusout}"
            @keydown="${this.#onMenuKeydown}"
            @click="${this.#onSelect}">
        <!-- The dropdown menu wrapper -->
        <pf-v5-dropdown-menu id="menu" part="menu" ?disabled="${disabled}">
          <!-- Must contain one or more \`<pf-v5-dropdown-item>\` or \`<pf-v5-dropdown-group>\` -->
          <slot></slot>
        </pf-v5-dropdown-menu>
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
      if (menu instanceof PfV5DropdownMenu) {
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

  #onSelect(event: KeyboardEvent | Event & { target: PfV5DropdownItem }) {
    const [menu] = this._menuElements;
    if (menu instanceof PfV5DropdownMenu) {
      const target = event.target as PfV5DropdownItem || menu.activeItem;
      this.dispatchEvent(new PfV5DropdownSelectEvent(event, `${target?.value}`));
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
          && event.relatedTarget instanceof PfV5DropdownItem
          && menu instanceof PfV5DropdownMenu
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
    'pf-v5-dropdown': PfV5Dropdown;
  }
}
