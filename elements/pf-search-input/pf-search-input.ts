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

import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';
import { PfOption } from '../pf-select/pf-option.js';
import { bound } from '@patternfly/pfe-core/decorators.js';
import styles from './pf-search-input.css';

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
 * @slot - insert `pf-option` and/or `pf-option-groups` here
 * @slot placeholder - placeholder text for the search input. Overrides the `placeholder` attribute.
 * @fires open - when the menu toggles open
 * @fires close - when the menu toggles closed
 * @cssprop [--pf-c-search-input__toggle--PaddingTop=var(--pf-global--spacer--form-element, 0.375rem)]
 * @cssprop [--pf-c-search-input__toggle--PaddingRight=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-search-input__toggle--PaddingBottom=var(--pf-global--spacer--form-element, 0.375rem)]
 * @cssprop [--pf-c-search-input__toggle--PaddingLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-search-input__toggle--MinWidth=var(--pf-global--target-size--MinWidth, 44px)]
 * @cssprop [--pf-c-search-input__toggle--FontSize=var(--pf-global--FontSize--md, 1rem)]
 * @cssprop [--pf-c-search-input__toggle--FontWeight=var(--pf-global--FontWeight--normal, 400)]
 * @cssprop [--pf-c-search-input__toggle--LineHeight=var(--pf-global--LineHeight--md, 1.5)]
 * @cssprop [--pf-c-search-input__toggle--BackgroundColor=var(--pf-global--BackgroundColor--100, #fff)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderTopWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderRightWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderLeftWidth=var(--pf-global--BorderWidth--sm, 1px)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderWidth=initial]
 * @cssprop [--pf-c-search-input__toggle--before--BorderTopColor=var(--pf-global--BorderColor--300, #f0f0f0)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderRightColor=var(--pf-global--BorderColor--300, #f0f0f0)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderBottomColor=var(--pf-global--BorderColor--200, #8a8d90)]
 * @cssprop [--pf-c-search-input__toggle--before--BorderLeftColor=var(--pf-global--BorderColor--300, #f0f0f0)]
 * @cssprop [--pf-c-search-input__toggle--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-search-input__toggle--hover--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-search-input__toggle--focus--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-search-input__toggle--focus--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-search-input__toggle--active--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-search-input__toggle--active--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-search-input__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--active-color--100, #06c)]
 * @cssprop [--pf-c-search-input__toggle--m-expanded--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-search-input__toggle--disabled--BackgroundColor=var(--pf-global--disabled-color--300, #f0f0f0)]
 * @cssprop [--pf-c-search-input__toggle--m-plain--before--BorderColor=transparent]
 * @cssprop [--pf-c-search-input__toggle--m-placeholder--Color=transparent]
 * @cssprop [--pf-c-search-input--m-invalid__toggle--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-search-input--m-invalid__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-search-input--m-invalid__toggle--hover--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-search-input--m-invalid__toggle--focus--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-search-input--m-invalid__toggle--active--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-search-input--m-invalid__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-search-input--m-invalid__toggle-status-icon--Color=var(--pf-global--danger-color--100, #c9190b)]
 * @cssprop [--pf-c-search-input--m-success__toggle--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-search-input--m-success__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-search-input--m-success__toggle--hover--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-search-input--m-success__toggle--focus--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-search-input--m-success__toggle--active--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-search-input--m-success__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-search-input--m-success__toggle-status-icon--Color=var(--pf-global--success-color--100, #3e8635)]
 * @cssprop [--pf-c-search-input--m-warning__toggle--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-search-input--m-warning__toggle--before--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)]
 * @cssprop [--pf-c-search-input--m-warning__toggle--hover--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-search-input--m-warning__toggle--focus--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-search-input--m-warning__toggle--active--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-search-input--m-warning__toggle--m-expanded--before--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-search-input--m-warning__toggle-status-icon--Color=var(--pf-global--warning-color--100, #f0ab00)]
 * @cssprop [--pf-c-search-input__toggle-wrapper--not-last-child--MarginRight=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-search-input__toggle-wrapper--MaxWidth=calc(100% - var(--pf-global--spacer--lg, 1.5rem))]
 * @cssprop [--pf-c-search-input__toggle--m-placeholder__toggle-text--Color=var(--pf-global--Color--dark-200, #6a6e73)]
 * @cssprop [--pf-c-search-input__toggle-icon--toggle-text--MarginLeft=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-search-input__toggle-status-icon--MarginLeft=var(--pf-global--spacer--xs, 0.25rem)]
 * @cssprop [--pf-c-search-input__toggle-status-icon--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-search-input--m-plain__toggle-arrow--Color=var(--pf-global--Color--200, #6a6e73)]
 * @cssprop [--pf-c-search-input--m-plain--hover__toggle-arrow--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-search-input__toggle-clear--PaddingRight=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-search-input__toggle-clear--PaddingLeft=var(--pf-global--spacer--md, 1rem)]
 * @cssprop [--pf-c-search-input__toggle-clear--toggle-button--PaddingLeft=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-search-input__toggle-button--Color=var(--pf-global--Color--100, #151515)]
 * @cssprop [--pf-c-search-input__list-item--m-loading--PaddingTop=var(--pf-global--spacer--sm, 0.5rem)]
 * @cssprop [--pf-c-search-input__menu-content--MaxHeight=20rem;]
 **/
@customElement('pf-search-input')
export class PfSearchInput extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];
  static readonly formAssociated = true;
  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static instances: Set<PfSearchInput> = new Set<PfSearchInput>();

  /** Accessible label for the select */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Multi listbox button text */
  @property({ attribute: 'items-selected-text' }) itemsSelectedText = 'items selected';

  /** Whether the select is disabled */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Whether the select listbox is expanded */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * Enable to flip listbox when it reaches boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

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

  @query('#outer') private _searchInputContainer!: HTMLElement;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  #combobox = ComboboxController.of(this, {
    getItems: () => this.options,
    getFallbackLabel: () => this.accessibleLabel
      || this.#internals.computedLabelText
      || this.placeholder
      || this.#slots.getSlotted('placeholder').map(x => x.textContent).join(''),
    getListboxElement: () => this._listbox ?? null,
    getToggleButton: () => this._toggleButton ?? null,
    getComboboxInput: () => this._toggleInput ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => this.#showListbox(),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemHidden: (item, hidden) => (item.id !== 'placeholder') && void (item.hidden = hidden),
    isItem: item => item instanceof PfOption,
    setItemActive: (item, active) => this.#setItemActive(item, active),
    setItemSelected: (item, selected) => this.#setItemSelected(item, selected),
  });

  static {
    if (!isServer) {
      document.addEventListener('click', event => {
        for (const instance of PfSearchInput.instances) {
          instance._onOutsideClick(event);
        }
      });
      document.addEventListener('focusout', () => {
        for (const instance of PfSearchInput.instances) {
          instance._onFocusOut();
        }
      });
    }
  }

  connectedCallback(): void {
    super.connectedCallback();
    PfSearchInput.instances.add(this);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    PfSearchInput.instances.delete(this);
  }

  // Function to handle the closing of popover on outside click
  @bound private _onOutsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this._searchInputContainer)) {
      if (this.expanded) {
        this.expanded = false;
      }
    }
  }

  // Function to handle the closing of popover on focus out
  @bound private _onFocusOut() {
    if (this.expanded) {
      this.expanded = false;
    }
  }

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: PfOption | PfOption[]) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }

  get selected(): PfOption[] {
    return this.#combobox.selected;
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
    const hideLightDomItems = !ComboboxController.supportsCrossRootActiveDescendant;

    return html`
      <div 
        id="outer"
        style="${styleMap(styles)}"
        class="${classMap({ disabled, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}"
      >
        <div id="toggle">
          <div class="search-icon">
            <pf-icon size="md" icon="search" set="fas">search</pf-icon>
          </div>
          <input 
            id="toggle-input"
            @input=${this.#onChange}
            @keyup=${this.#onSubmit}
            @keydown=${this.#onKeyDown}
            aria-disabled="${disabled}"
            placeholder="${placeholder}"
          >
          <div class="close-button-container">
            <pf-button 
              @click="${this.#OnClose}" 
              ?hidden="${this.#hideCloseButton()}" 
              id="close-button"  
              plain 
              label="Close"
            >
              <pf-icon size="md" icon="close" set="patternfly">close</pf-icon>
            </pf-button>
          </div>
          <button aria-label="toggle button" inert class="visually-hidden" id="toggle-button"></button>
        </div>
        <div 
          id="listbox-container"
          ?hidden="${!expanded}"
          tabindex="-1"
          style="${styleMap({
            marginTop: `${height || 0}px`,
            width: width ? `${width}px` : 'auto',
            })}">
          <div id="listbox">
            ${this.#combobox.renderItemsToShadowRoot()}
            <slot ?hidden="${hideLightDomItems}"></slot>
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

  @observes('selected')
  private async selectedChanged(_: PfOption[], selected: PfOption[]) {
    this.value = selected.map(x => x.value).join();
    await this.updateComplete;
    this._toggleInput!.value = this.value;
  }


  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSearchChangeEvent());
  }

  async #doExpand() {
    try {
      await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
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

  async #OnClose() {
    if (this.expanded) {
      await this.hide();
    }
    this.value = '';
    this._toggleInput!.value = this.value;
    this.#combobox.selected = [];
  }

  #hideCloseButton() {
    if (!isServer) {
      return !this.expanded && this._toggleInput?.value.trim() === ''; // SSR or server-side environment: don't hide the element
    }
    return false;
  }

  #onChange(event: Event) {
    this.value = this._toggleInput?.value;
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSearchChangeEvent());
  }

  #onSubmit(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.dispatchEvent(new PfSearchChangeEvent());
    }
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

  #delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async #showListbox() {
    await this.#delay(10);
    if (!this.disabled) {
      this.expanded ||= true;
    }
  }

  #setItemSelected(item: PfOption, selected: boolean) {
    item.selected = selected;
    this.#setItemActive(item, selected);
  }

  #setItemActive(item: PfOption, active: boolean) {
    item.active = active;
    if (this.expanded && active) {
      item?.scrollIntoView({ behavior: 'auto', block: 'nearest', inline: 'nearest' });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-search-input': PfSearchInput;
  }
}
