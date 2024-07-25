import type { PfChipGroup } from '../pf-chip/pf-chip-group.js';
import type { Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import type { TemplateResult } from 'lit';
import type { ATFocusController } from '@patternfly/pfe-core/controllers/at-focus-controller.js';

import { LitElement, html, isServer, nothing } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ListboxController } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { ActivedescendantController } from '@patternfly/pfe-core/controllers/activedescendant-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { arraysAreEquivalent } from '@patternfly/pfe-core/functions/arraysAreEquivalent.js';
import { observes } from '@patternfly/pfe-core/decorators/observes.js';

import { PfOption } from './pf-option.js';
import { PfChipRemoveEvent } from '../pf-chip/pf-chip.js';

import styles from './pf-select.css';

export interface PfSelectUserOptions {
  id: string;
  value: string;
}

export class PfSelectChangeEvent extends Event {
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
 * @slot - insert `pf-option` and/or `pf-option-groups` here
 * @slot placeholder - placeholder text for the select. Overrides the `placeholder` attribute.
 * @fires open - when the menu toggles open
 * @fires close - when the menu toggles closed
 * @fires filter - when the filter value changes. used to perform custom filtering
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
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

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;

  @query('#toggle-input') private _input?: HTMLInputElement;

  @query('#toggle-button') private _toggle?: HTMLButtonElement;

  @query('#listbox') private _listbox?: HTMLElement;

  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  @query('#placeholder') private _placeholder?: PfOption;

  #isNotPlaceholderOption = (option: PfOption) => option !== this._placeholder;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  #atFocusController = this.#createATFocusController();

  #preventListboxGainingFocus = false;

  #createATFocusController(): ATFocusController<PfOption> {
    const getItems = () => this.options;
    const getItemsContainer = () => this._listbox ?? null;
    const getControlsElements = () => [this._input, this._toggle].filter(x => !!x);
    if (this.variant !== 'typeahead' && this.variant !== 'typeaheadmulti' ) {
      return RovingTabindexController.of(this, { getItems, getItemsContainer });
    } else {
      return ActivedescendantController.of(this, {
        getItems,
        getItemsContainer,
        getControlsElements,
        setItemActive(active) {
          this.active = active;
        },
      });
    }
  }

  #listbox = ListboxController.of<PfOption>(this, {
    multi: this.variant === 'typeaheadmulti' || this.variant === 'checkbox',
    getItemsContainer: () => this.#atFocusController.container,
    getControlsElements: () => this.#atFocusController.controlsElements,
    getATFocusedItem: () => this.options.at(this.#atFocusController.atFocusedItemIndex) ?? null,
    setItemSelected(selected) {
      this.selected = selected;
    },
  });

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  @property({ hasChanged: (a, b) => !arraysAreEquivalent(a, b) })
  set selected(optionsList: PfOption | PfOption[]) {
    this.#listbox.selected = optionsList;
  }

  get selected(): PfOption[] {
    return this.#listbox.selected;
  }

  /**
   * array of slotted options
   */
  get options(): PfOption[] {
    if (isServer) {
      return []; // TODO: expose a DOM property to allow setting options in SSR scenarios
    } else {
      const opts = Array.from(this.querySelectorAll('pf-option'));
      if (this._placeholder) {
        return [this._placeholder, ...opts];
      } else {
        return opts;
      }
    }
  }

  /**
   * whether select has badge for number of selected items
   */
  get #hasBadge() {
    // NOTE: revisit this in v5
    return this.variant === 'checkbox' && !this.checkboxSelectionBadgeHidden;
  }

  get #buttonLabel() {
    const { selected } = this.#listbox;
    switch (this.variant) {
      case 'typeaheadmulti':
        return `${selected?.length ?? 0} ${this.itemsSelectedText}`;
      case 'checkbox':
        return selected
            .map(option => option.optionText || '')
            .join(' ')
            .trim()
          || this.#computePlaceholderText()
          || 'Options';
      default:
        return (selected ? this.value : '')
          || this.#computePlaceholderText()
          || 'Select a value';
    }
  }

  override render(): TemplateResult<1> {
    const { disabled, expanded, variant } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { computedLabelText } = this.#internals;
    const { height, width } = this.getBoundingClientRect?.() || {};
    const buttonLabel = this.#buttonLabel;
    const hasBadge = this.#hasBadge;
    const selectedOptions = this.#listbox.selected ?? [];
    const typeahead = variant.startsWith('typeahead');
    const checkboxes = variant === 'checkbox';
    const offscreen = typeahead && 'offscreen';
    const badge = hasBadge && 'badge';
    const hasSelection = !!(Array.isArray(this.selected) ? this.selected.length : this.selected);

    return html`
      <div id="outer"
           style="${styleMap(styles)}"
           class="${classMap({
             disabled,
             typeahead,
             expanded,
             [anchor]: !!anchor,
             [alignment]: !!alignment,
           })}">
        <div id="toggle">
          ${!(typeahead && selectedOptions.length < 1) ? '' : html`
          <pf-chip-group label="${this.accessibleCurrentSelectionsLabel}">
            ${repeat(selectedOptions, opt => opt.id, opt => html`
            <pf-chip id="chip-${opt.textContent}"
                     .readonly="${this.disabled}"
                     @remove="${this.#onChipRemove.bind(this, opt)}">${opt.textContent}</pf-chip>`)}
          </pf-chip-group>`}
          ${!typeahead ? '' : /* TODO: aria attrs */ html`
          <input id="toggle-input"
                 role="combobox"
                 aria-label="${this.accessibleLabel ?? (computedLabelText || buttonLabel)}"
                 aria-describedby="placeholder"
                 aria-autocomplete="both"
                 aria-controls="listbox"
                 aria-expanded="${String(this.expanded) as 'true' | 'false'}"
                 aria-haspopup="listbox"
                 ?disabled="${disabled}"
                 ?hidden="${!typeahead}"
                 placeholder="${buttonLabel}"
                 @click="${this.toggle}"
                 @keyup="${this.#onKeyupInput}"
                 @keydown="${this.#onKeydownInput}">`}
          <button id="toggle-button"
                  role="combobox"
                  aria-label="${ifDefined(this.accessibleLabel || this.#internals.computedLabelText || undefined)}"
                  aria-describedby="placeholder"
                  aria-controls="listbox"
                  aria-haspopup="listbox"
                  aria-expanded="${String(this.expanded) as 'true' | 'false'}"
                  @keydown="${this.#onKeydownButton}"
                  @click="${this.toggle}"
                  tabindex="${ifDefined(typeahead ? -1 : undefined)}">
            <span id="button-text" style="display: contents;">
              <span id="toggle-text"
                    class="${classMap({ offscreen, badge })}">${buttonLabel}</span>${!hasBadge ? '' : html`
              <span id="toggle-badge">
                <pf-badge number="${selectedOptions.length}">${selectedOptions.length}</pf-badge>
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
          <div id="listbox"
               @focusout="${this.#onFocusoutListbox}"
               @keydown="${this.#onKeydownListbox}"
               class="${classMap({ checkboxes })}">
            <pf-option id="placeholder"
                       disabled
                       aria-hidden="${ifDefined(hasSelection ? 'true' : undefined)}"
                       ?hidden="${!this.placeholder && !this.#slots.hasSlotted('placeholder')}">
              <slot name="placeholder">${this.placeholder}</slot>
            </pf-option>
            ${!(this.#atFocusController instanceof ActivedescendantController) ? nothing
              // Abstraction leaks here
              : this.#atFocusController.renderItemsToShadowRoot()}
            <slot @slotchange="${this.#onSlotchangeListbox}"
                  ?hidden=${typeahead && !ActivedescendantController.canControlLightDom}></slot>
          </div>
        </div>
      </div>
    `;
  }

  @observes('disabled')
  private disabledChanged() {
    this.#listbox.disabled = this.disabled;
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
    switch (this.variant) {
      case 'single':
        this.hide();
        this._toggle?.focus();
        break;
      case 'typeahead':
        this._input!.value = this.value;
    }
  }

  @observes('variant')
  private variantChanged() {
    const controller = this.#createATFocusController();
    this.#atFocusController = controller;
    this.#listbox.hostDisconnected();
    this.#listbox.multi = this.variant === 'typeaheadmulti' || this.variant === 'checkbox';
    this.#listbox.hostConnected();
    if (this.variant === 'checkbox') {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }
  }

  @observes('value')
  private valueChanged() {
    this.#internals.setFormValue(this.value ?? '');
    this.dispatchEvent(new PfSelectChangeEvent());
  }

  @observes('variant')
  @observes('value')
  private focusChips(): void {
    // whether select has removable chips for selected items
    // NOTE: revisit this in v5
    // reset input if chip has been added
    const hasChips = this.variant === 'typeaheadmulti';
    if (hasChips && this._input?.value) {
      const chip =
        this.shadowRoot?.querySelector(`pf-chip#chip-${this._input?.value}`) as HTMLElement;
      if (chip && this._chipGroup) {
        this._chipGroup.focusOnChip(chip);
        this._input.value = '';
      }
    }
  }

  #onSlotchangeListbox() {
    this.#listbox.items = this.options;
    this.options.forEach((option, index, options) => {
      option.setSize = options.length;
      option.posInSet = index;
    });
  }

  #onFocusoutListbox(event: FocusEvent) {
    switch (this.variant) {
      case 'single':
      case 'checkbox':
        if (this.expanded) {
          const root = this.getRootNode();
          if ((root instanceof ShadowRoot || root instanceof Document)
              && !this.options.includes(event.relatedTarget as PfOption)
          ) {
            this.hide();
          }
        }
    }
  }

  #onKeydownButton(event: KeyboardEvent) {
    switch (this.variant) {
      case 'single':
      case 'checkbox': return this.#onKeydownMenu(event);
      case 'typeahead':
      case 'typeaheadmulti': return this.#onKeydownInput(event);
    }
  }

  #onKeydownListbox(event: KeyboardEvent) {
    switch (this.variant) {
      case 'single':
      case 'checkbox':
        switch (event.key) {
          case 'Escape':
            this.hide();
            this._toggle?.focus();
        }
    }
  }

  #onKeydownMenu(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.show();
    }
  }

  /**
   * Handle keypresses on the input
   * @see https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list
   * +-----------------------------------+-----------------------------------+
   * | Key                               | Function                          |
   * +===================================+===================================+
   * | [Down Arrow]{.kbd}                | -   If the textbox is not empty   |
   * |                                   |     and the listbox is displayed, |
   * |                                   |     moves visual focus to the     |
   * |                                   |     first suggested value.        |
   * |                                   | -   If the textbox is empty and   |
   * |                                   |     the listbox is not displayed, |
   * |                                   |     opens the listbox and moves   |
   * |                                   |     visual focus to the first     |
   * |                                   |     option.                       |
   * |                                   | -   In both cases DOM focus       |
   * |                                   |     remains on the textbox.       |
   * +-----------------------------------+-----------------------------------+
   * | [Alt + Down Arrow]{.kbd}          | Opens the listbox without moving  |
   * |                                   | focus or changing selection.      |
   * +-----------------------------------+-----------------------------------+
   * | [Up Arrow]{.kbd}                  | -   If the textbox is not empty   |
   * |                                   |     and the listbox is displayed, |
   * |                                   |     moves visual focus to the     |
   * |                                   |     last suggested value.         |
   * |                                   | -   If the textbox is empty,      |
   * |                                   |     first opens the listbox if it |
   * |                                   |     is not already displayed and  |
   * |                                   |     then moves visual focus to    |
   * |                                   |     the last option.              |
   * |                                   | -   In both cases DOM focus       |
   * |                                   |     remains on the textbox.       |
   * +-----------------------------------+-----------------------------------+
   * | [Enter]{.kbd}                     | Closes the listbox if it is       |
   * |                                   | displayed.                        |
   * +-----------------------------------+-----------------------------------+
   * | [Escape]{.kbd}                    | -   If the listbox is displayed,  |
   * |                                   |     closes it.                    |
   * |                                   | -   If the listbox is not         |
   * |                                   |     displayed, clears the         |
   * |                                   |     textbox.                      |
   * +-----------------------------------+-----------------------------------+
   * | Standard single line text editing | -   Keys used for cursor movement |
   * | keys                              |     and text manipulation, such   |
   * |                                   |     as [Delete]{.kbd} and         |
   * |                                   |     [Shift + Right Arrow]{.kbd}.  |
   * |                                   | -   An HTML `input` with          |
   * |                                   |     `type="text"` is used for the |
   * |                                   |     textbox so the browser will   |
   * |                                   |     provide platform-specific     |
   * |                                   |     editing keys.                 |
   * +-----------------------------------+-----------------------------------+
   * @param event keydown event
   */
  #onKeydownInput(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.#preventListboxGainingFocus = event.altKey;
        this.show();
        break;
      case 'Enter':
        this.hide();
        break;
      case 'Escape':
        if (!this.expanded) {
          this._input!.value = '';
          this.requestUpdate();
        }
        this.hide();
        break;
      case 'Alt':
      case 'AltGraph':
      case 'Shift':
      case 'Control':
      case 'Fn':
      case 'Symbol':
      case 'Hyper':
      case 'Super':
      case 'Meta':
      case 'CapsLock':
      case 'FnLock':
      case 'NumLock':
      case 'ScrollLock':
      case 'SymbolLock':
        break;
      default:
        this.show();
    }
  }

  #onKeyupInput() {
    const { value } = this._input!;
    for (const option of this.options) {
      option.hidden =
        !!this.expanded
     && !!value
     && !option.value
         .toLowerCase()
         .startsWith(value.toLowerCase());
    }
  }

  async #doExpand() {
    await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
    switch (this.variant) {
      case 'single':
      case 'checkbox':
        if (!this.#preventListboxGainingFocus) {
          (this.#atFocusController.items.at(this.#atFocusController.atFocusedItemIndex)
            ?? this.#atFocusController.nextATFocusableItem)?.focus();
          this.#preventListboxGainingFocus = false;
        }
    }
  }

  async #doCollapse() {
    await this.#float.hide();
    switch (this.variant) {
      case 'single':
      case 'checkbox':
        this._toggle?.focus();
    }
  }

  /**
   * handles chip's remove button clicking
   * @param event remove event
   * @param opt pf-option
   */
  #onChipRemove(opt: PfOption, event: Event) {
    if (event instanceof PfChipRemoveEvent) {
      opt.selected = false;
      this._input?.focus();
    }
  }

  #computePlaceholderText() {
    return this.placeholder
      || this.querySelector?.<HTMLSlotElement>('[slot=placeholder]')
          ?.assignedNodes()
          ?.reduce((acc, node) => `${acc}${node.textContent}`, '')
          ?.trim()
      || this.#listbox.items
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
    'pf-select': PfSelect;
  }
}

