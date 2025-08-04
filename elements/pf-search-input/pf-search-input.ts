import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import type { TemplateResult } from 'lit';

import { LitElement, html, isServer } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';

import { ComboboxController } from '@patternfly/pfe-core/controllers/combobox-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { PfOption } from '../pf-select/pf-option.js';
import styles from './pf-search-input.css';

/** Fired when a `<pf-search-input>` element's value changes */
export class PfSearchChangeEvent extends Event {
  constructor() {
    super('change', { bubbles: true });
  }
}

/**
 * A search input lets users type in words to find specific items or information.
 * As they type, it can show matching results to help them quickly find what they are looking for.
 *
 * A search input consists of a text field where users can type to find specific content or items.
 * Unlike selects or dropdowns, which offer predefined options, a search input lets users enter
 * their own keywords to filter or locate results. It includes a clear (×) button to easily
 * remove the current input, allowing users to start a new search quickly.
 *
 * @summary Allows users to search through a list for specific search terms
 *
 * @fires open - when the menu toggles open
 * @fires close - when the menu toggles closed
 */
@customElement('pf-search-input')
export class PfSearchInput extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Accessible label for the search input */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Whether the search input is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the search input's listbox is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /** Current form value */
  @property() value?: string;

  /** Placeholder entry. Overridden by the `placeholder` slot */
  @property() placeholder?: string;

  /**
   * Indicates initial popover position.
   * There are 6 options: `bottom`, `top`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
   * Default is `bottom`.
   */
  @property({ reflect: true }) position: Placement = 'bottom';

  @query('#toggle-input') private _toggleInput?: HTMLInputElement;

  @query('#toggle-button') private _toggleButton?: HTMLDivElement;

  @query('#listbox') private _listbox?: HTMLElement;

  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  @query('#placeholder') private _placeholder?: PfOption;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  /** True when the user just clicked the close button */
  #clickedCloseButton = false;
  #setExpanded = false;

  #combobox = ComboboxController.of(this, {
    getItems: () => this.options,
    getFallbackLabel: () => this.accessibleLabel
      || this.#internals.computedLabelText
      || this.placeholder
      || this.#slots.getSlotted('placeholder').map(x => x.textContent).join(''),
    getListboxElement: () => this._listbox ?? null,
    getToggleButton: () => this._toggleButton ?? null,
    getComboboxInput: () => this._toggleInput ?? null,
    isExpanded: () => this.#setIsExpanded(),
    requestShowListbox: () => this.#showListbox(),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemHidden: (item, hidden) => (item.id !== 'placeholder') && void (item.hidden = hidden),
    isItem: item => item instanceof PfOption,
    setItemActive: (item, active) => this.#setItemActive(item, active),
    setItemSelected: (item, selected) => this.#setItemSelected(item, selected),
  });

  connectedCallback(): void {
    super.connectedCallback();
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
  }

  /** List of options */
  get options(): PfOption[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      return [
        this._placeholder,
        ...Array.from(this.querySelectorAll('pf-option')),
      ].filter((x): x is PfOption => !!x && !x.hidden);
    }
  }

  override render(): TemplateResult<1> {
    const { disabled, expanded, placeholder } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { height, width } = this.getBoundingClientRect?.() || {};

    return html`
      <div id="outer"
           style="${styleMap(styles)}"
           class="${classMap({ disabled, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}">
        <div id="toggle">
          <div class="search-icon">
            <pf-icon size="md" icon="search" set="fas">search</pf-icon>
          </div>
          <input id="toggle-input"
                 aria-disabled="${disabled}"
                 placeholder="${placeholder}"
                 @input="${this.#onChange}"
                 @keyup="${this.#onSubmit}"
                 @keydown="${this.#onKeyDown}">
          <div class="close-button-container">
            <pf-button id="toggle-button"
                       class="close-button"
                       plain
                       label="Close"
                       ?hidden="${this.#hideCloseButton()}"
                       @click="${this.#onClickCloseButton}">
              <pf-icon size="md"
                       icon="close"
                       set="patternfly">close</pf-icon>
            </pf-button>
          </div>
        </div>
        <div id="listbox-container"
             ?hidden="${!expanded}"
             tabindex="-1"
             style="${styleMap({
               marginTop: `${height || 0}px`,
               width: width ? `${width}px` : 'auto',
             })}">
          <div id="listbox">
            ${this.#combobox.renderItemsToShadowRoot()}
            <!-- insert \`<pf-option>\` and/or \`<pf-option-groups>\` here -->
            <slot ?hidden="${!ComboboxController.supportsCrossRootActiveDescendant}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  @observes('disabled')
  private disabledChanged() {
    this.#combobox.disabled = this.disabled;
  }

  @observes('expanded')
  private async expandedChanged(old: boolean, expanded: boolean) {
    if (this.dispatchEvent(new Event(this.expanded ? 'close' : 'open'))) {
      if (expanded) {
        this.#doExpand();
      } else {
        this.#doCollapse();
      }
    }
  }

  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSearchChangeEvent());
  }

  async #doExpand() {
    try {
      await this.#float.show({ placement: this.position || 'bottom', flip: true });
      return true;
    } catch {
      return false;
    }
  }

  async #doCollapse() {
    try {
      await this.#float.hide();
      return true;
    } catch {
      return false;
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
   * Closes listbox
   */
  async hide(): Promise<void> {
    this.expanded = false;
    await this.updateComplete;
  }

  /**
   * toggles popup based on current state
   */
  async toggle(): Promise<void> {
    if (this.expanded) {
      await this.hide();
    } else {
      await this.show();
    }
  }

  #onClickCloseButton() {
    this._toggleInput!.value = '';
    this.#updateValue(this._toggleInput?.value ?? '');
    this.#combobox.selected = [];
    this.#clickedCloseButton = true;
    this._toggleInput?.focus();
  }

  #hideCloseButton() {
    if (!isServer) {
      return !this.expanded && this._toggleInput?.value.trim() === ''; // SSR or server-side environment: don't hide the element
    }
    return false;
  }

  #onChange() {
    this.#updateValue(this._toggleInput?.value ?? '');
    if (this.value !== this.#combobox.selected[0]?.value) {
      this.#combobox.selected = [];
    }
    // Will remove after review
    // for (const item of this.#combobox.items){
    //   if (item.hasAttribute('selected')) {
    //     if(item.value !== this.value){
    //       this.#setItemSelected(item, false);
    //       this.requestUpdate();
    //     }
    //   }
    // }
  }

  #onSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.dispatchEvent(new PfSearchChangeEvent());
    }
  }

  #updateValue(value: string) {
    this.value = value;
  }

  #onKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (target?.getAttribute('aria-disabled') === 'true') {
      // Allow Tab and Shift+Tab to move focus
      if (event.key === 'Tab') {
        return;
      }
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }

  async #showListbox() {
    await new Promise(requestAnimationFrame);
    if (this.disabled) {
      return;
    };

    if (this.#setExpanded) {
      // If expanded is set to true on clicking close button
      // set expanded to false
      this.#setExpanded = false;
      this.expanded = false;
    } else {
      this.expanded ||= true;
    }
  }

  #setItemSelected(item: PfOption, selected: boolean) {
    item.selected = selected;
    if (selected) {
      this._toggleInput!.value = item.value;
      this.#updateValue(this._toggleInput?.value ?? '');
    }
  }

  #setItemActive(item: PfOption, active: boolean) {
    item.active = active;
    if (this.expanded && active) {
      item?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
    }
  }

  #setIsExpanded() {
    if (this.#clickedCloseButton) {
      this.#clickedCloseButton = false;
      this.#setExpanded = true;
      return true;
    }
    return this.expanded;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-search-input': PfSearchInput;
  }
}
