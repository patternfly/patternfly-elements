import type { PfV5ChipGroup } from '../pf-v5-chip/pf-v5-chip-group.js';
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import type { TemplateResult } from 'lit';

import { LitElement, html, isServer, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ComboboxController } from '@patternfly/pfe-core/controllers/combobox-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';

import { PfV5Option } from './pf-v5-option.js';
import { type PfV5Chip, PfV5ChipRemoveEvent } from '../pf-v5-chip/pf-v5-chip.js';

import styles from './pf-v5-select.css';

export class PfV5SelectChangeEvent extends Event {
  constructor() {
    super('change', { bubbles: true });
  }
}

/**
 * A select list enables users to select one or more items from a list.
 *
 * A select component consists of a toggle control to open and close a menu of actions or links.
 * Selects differ from dropdowns in that they persist selection,
 * whereas dropdowns are typically used to present a list of actions or links.
 * @alias Select
 * @fires open - when the menu toggles open
 * @fires close - when the menu toggles closed
 */
@customElement('pf-v5-select')
export class PfV5Select extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Variant of rendered Select */
  @property() variant: 'single' | 'checkbox' | 'typeahead' | 'typeaheadmulti' = 'single';

  /** Accessible label for the select */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Accessible label for chip group used to describe chips */
  @property({
    attribute: 'accessible-current-selections-label',
  }) accessibleCurrentSelectionsLabel = 'Current selections';

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

  /** Flag indicating if selection badge should be hidden for checkbox variant,default false */
  @property({
    attribute: 'checkbox-selection-badge-hidden',
    type: Boolean,
  }) checkboxSelectionBadgeHidden = false;

  @query('pf-v5-chip-group') private _chipGroup?: PfV5ChipGroup;

  @query('#toggle-input') private _toggleInput?: HTMLInputElement;

  @query('#toggle-button') private _toggleButton?: HTMLButtonElement;

  @query('#listbox') private _listbox?: HTMLElement;

  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  @query('#placeholder') private _placeholder?: PfV5Option;

  #isNotPlaceholderOption = (option: PfV5Option) => option !== this._placeholder;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  #combobox = ComboboxController.of(this, {
    multi: this.variant === 'typeaheadmulti' || this.variant === 'checkbox',
    getItems: () => this.options,
    getFallbackLabel: () => this.accessibleLabel
                         || this.#internals.computedLabelText
                         || this.placeholder
                         || this.#slots.getSlotted('placeholder').map(x => x.textContent).join(''),
    getListboxElement: () => this._listbox ?? null,
    getToggleButton: () => this._toggleButton ?? null,
    getComboboxInput: () => this._toggleInput ?? null,
    isExpanded: () => this.expanded,
    requestShowListbox: () => void (this.expanded ||= true),
    requestHideListbox: () => void (this.expanded &&= false),
    setItemHidden: (item, hidden) => (item.id !== 'placeholder') && void (item.hidden = hidden),
    isItem: item => item instanceof PfV5Option,
    setItemActive: (item, active) => item.active = active,
    setItemSelected: (item, selected) => item.selected = selected,
  });

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(selected: PfV5Option | PfV5Option[]) {
    const list = Array.isArray(selected) ? selected : [selected];
    this.#combobox.selected = list;
  }

  get selected(): PfV5Option[] {
    return this.#combobox.selected;
  }

  /** List of options */
  get options(): PfV5Option[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      return [
        this._placeholder,
        ...Array.from(this.querySelectorAll('pf-v5-option')),
      ].filter((x): x is PfV5Option => !!x && !x.hidden);
    }
  }

  /** Whether select has badge for number of selected items */
  get #hasBadge() {
    // NOTE: revisit this in v5
    return this.variant === 'checkbox' && !this.checkboxSelectionBadgeHidden;
  }

  get #buttonLabel(): string {
    const { selected } = this.#combobox;
    switch (this.variant) {
      case 'typeaheadmulti':
        return `${selected?.length ?? 0} ${this.itemsSelectedText}`;
      case 'checkbox':
        return this.#computePlaceholderText()
          || 'Options';
      default:
        return (selected ? this.value : '')
          || this.#computePlaceholderText()
          || 'Select a value';
    }
  }

  override render(): TemplateResult<1> {
    const { disabled, expanded, variant, placeholder } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { height, width } = this.getBoundingClientRect?.() || {};
    const hasBadge = this.#hasBadge;
    const selectedOptions = this.#combobox.selected ?? [];
    const typeahead = variant.startsWith('typeahead');
    const checkboxes = variant === 'checkbox';
    const badge = hasBadge && 'badge';
    const hasSelection = !!(Array.isArray(this.selected) ? this.selected.length : this.selected);
    const hideLightDomItems = typeahead && !ComboboxController.supportsCrossRootActiveDescendant;
    const placeholderIsInert = !placeholder && this.#slots.isEmpty('placeholder');

    return html`
      <div id="outer"
           style="${styleMap(styles)}"
           class="${classMap({ disabled, typeahead, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}">
        <div id="toggle">
          ${!(typeahead && selectedOptions.length < 1) ? '' : html`
          <pf-v5-chip-group label="${this.accessibleCurrentSelectionsLabel}">
            ${repeat(selectedOptions, opt => opt.id, opt => html`
            <pf-v5-chip id="chip-${opt.textContent}"
                     .readonly="${this.disabled}"
                     @remove="${this.#onChipRemove.bind(this, opt)}">${opt.textContent}</pf-v5-chip>`)}
          </pf-v5-chip-group>`}
          ${!typeahead ? '' : html`
          <input id="toggle-input"
                 ?hidden="${!typeahead}"
                 ?disabled="${disabled}"
                 placeholder="${placeholder || this.#buttonLabel}">`}
          <button tabindex=${typeahead ? '-1' : nothing} id="toggle-button">
            <span id="button-text" style="display: contents;">
              <span id="toggle-text"
                    class="${classMap({ 'visually-hidden': !!typeahead, badge })}">${this.#buttonLabel}</span>${!hasBadge ? '' : html`
              <span id="toggle-badge">
                <pf-v5-badge number="${selectedOptions.length}">${selectedOptions.length}</pf-v5-badge>
              </span>`}
            </span>
            <svg viewBox="0 0 320 512"
                 fill="currentColor"
                 aria-hidden="true">
              <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
            </svg>
          </button>
        </div>
        <div id="listbox-container"
             ?hidden="${!expanded}"
             style="${styleMap({
               marginTop: `${height || 0}px`,
               width: width ? `${width}px` : 'auto',
             })}">
          <div id="listbox" class="${classMap({ checkboxes })}">
            <pf-v5-option id="placeholder"
                       disabled
                       ?inert="${placeholderIsInert}"
                       aria-hidden="${ifDefined(placeholderIsInert ? undefined : String(!!hasSelection))}"
                       ?hidden="${!placeholder && this.#slots.isEmpty('placeholder')}"
            ><!-- placeholder text for the select. Overrides the \`placeholder\` attribute. --><slot name="placeholder">${placeholder ?? ''}</slot></pf-v5-option>
            ${this.#combobox.renderItemsToShadowRoot()}
            <!-- insert \`pf-v5-option\` and/or \`pf-v5-option-groups\` here -->
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
  private async selectedChanged(_: PfV5Option[], selected: PfV5Option[]) {
    this.value = selected.map(x => x.value).join();
    await this.updateComplete;
    switch (this.variant) {
      case 'single': {
        // Only focus toggle when closing after user selection; avoid stealing focus on init.
        const wasExpanded = this.expanded;
        this.hide();
        if (wasExpanded) {
          this._toggleButton?.focus();
        }
        break;
      }
      case 'typeahead':
        this._toggleInput!.value = this.value;
    }
  }

  @observes('variant')
  private async variantChanged() {
    this.#combobox.hostDisconnected();
    this.#combobox.multi = this.variant === 'typeaheadmulti' || this.variant === 'checkbox';
    this.#combobox.hostConnected();
    if (this.variant === 'checkbox') {
      import('@patternfly/elements/pf-v5-badge/pf-v5-badge.js');
    }
  }

  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfV5SelectChangeEvent());
  }

  @observes('variant')
  @observes('value')
  private focusChips(): void {
    // whether select has removable chips for selected items
    // NOTE: revisit this in v5
    // reset input if chip has been added
    const hasChips = this.variant === 'typeaheadmulti';
    if (hasChips && this._toggleInput?.value) {
      const chip =
        this.shadowRoot?.querySelector(`pf-v5-chip#chip-${this._toggleInput?.value}`) as PfV5Chip;
      if (chip && this._chipGroup) {
        this._chipGroup.focusOnChip(chip);
        this._toggleInput.value = '';
      }
    }
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
   * handles chip's remove button clicking
   * @param event remove event
   * @param opt pf-v5-option
   */
  #onChipRemove(opt: PfV5Option, event: Event) {
    if (event instanceof PfV5ChipRemoveEvent) {
      opt.selected = false;
      this._toggleInput?.focus();
    }
  }

  #computePlaceholderText() {
    return this.placeholder
      || this.querySelector?.<HTMLSlotElement>('[slot=placeholder]')
          ?.assignedNodes()
          ?.reduce((acc, node) => `${acc}${node.textContent}`, '')
          ?.trim()
      || this.#combobox.items
          .filter(this.#isNotPlaceholderOption)
          .at(0)
          ?.value
      || '';
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
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v5-select': PfV5Select;
  }
}

