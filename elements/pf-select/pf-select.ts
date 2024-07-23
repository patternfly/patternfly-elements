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

  /**
   * Accessible label for the select
   */
  @property({ attribute: 'accessible-label' }) accessibleLabel?: string;

  /**
   * Accessible label for chip group used to describe chips
   */
  @property({
    attribute: 'accessible-current-selections-label',
  }) accessibleCurrentSelectionsLabel = 'Current selections';

  /**
   * multi listbox button text
   */
  @property({ attribute: 'items-selected-text' }) itemsSelectedText = 'items selected';

  /**
   * whether select is disabled
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * Whether the select listbox is expanded
   */
  @property({ type: Boolean, reflect: true }) expanded = false;

  /**
   * enable to flip listbox when it reaches boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  // @property() filter = '';

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

  @property({ attribute: false }) filter?: (option: PfOption) => boolean;

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;

  @query('#toggle-input') private _input?: HTMLInputElement;

  @query('#toggle-button') private _toggle?: HTMLButtonElement;

  @query('#listbox') private _listbox?: HTMLElement;

  @query('#listbox-container') private _listboxContainer?: HTMLElement;

  @query('#placeholder') private _placeholder?: PfOption;

  #isNotPlaceholderOption = (option: PfOption) => option !== this._placeholder;

  #atFocusController = this.#createATFocusController();

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, { content: () => this._listboxContainer });

  #slots = new SlotController(this, null, 'placeholder');

  #listbox = ListboxController.of<PfOption>(this, {
    multi: this.variant === 'typeaheadmulti' || this.variant === 'checkbox',
    getItemsContainer: () => this._listbox ?? null,
    getControlsElement: () => this._input ?? null,
    getATFocusedItem: () => this.#atFocusController.atFocusedItem,
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
                 @keydown="${this.#onButtonKeydown}"
                 @input="${this.#onTypeaheadInput}">`}
          <button id="toggle-button"
                  role="combobox"
                  aria-label="${ifDefined(this.accessibleLabel || this.#internals.computedLabelText || undefined)}"
                  aria-describedby="placeholder"
                  aria-controls="listbox"
                  aria-haspopup="listbox"
                  aria-expanded="${String(this.expanded) as 'true' | 'false'}"
                  @keydown="${this.#onButtonKeydown}"
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
               @focusout="${this.#onListboxFocusout}"
               @keydown="${this.#onListboxKeydown}"
               class="${classMap({ checkboxes })}">
            <pf-option id="placeholder"
                       disabled
                       aria-hidden="${ifDefined(hasSelection ? 'true' : undefined)}"
                       ?hidden="${!this.placeholder && !this.#slots.hasSlotted('placeholder')}">
              <slot name="placeholder">${this.placeholder}</slot>
            </pf-option>
            ${!(this.#atFocusController instanceof ActivedescendantController) ? nothing
              : this.#atFocusController.renderItemsToShadowRoot()}
            <slot @slotchange="${this.#onListboxSlotchange}"
                  ?hidden=${typeahead && !ActivedescendantController.canControlLightDom}></slot>
          </div>
        </div>
      </div>
    `;
  }

  #createATFocusController(): ATFocusController<PfOption> {
    const getItems = () => this.options;
    const getItemsContainer = () => this._listbox ?? null;
    if (this.variant !== 'typeahead' && this.variant !== 'typeaheadmulti' ) {
      return RovingTabindexController.of(this, { getItems, getItemsContainer });
    } else {
      return ActivedescendantController.of(this, {
        getItems,
        getItemsContainer,
        getControlsElement: () => this._input ?? null,
        setItemActive(active) {
          this.active = active;
        },
      });
    }
  }

  @observes('disabled')
  private disabledChanged() {
    this.#listbox.disabled = this.disabled;
  }

  @observes('expanded')
  private async expandedChanged(old: boolean, expanded: boolean) {
    if (this.dispatchEvent(new Event(this.expanded ? 'close' : 'open'))) {
      if (expanded) {
        await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
        switch (this.variant) {
          case 'single':
          case 'checkbox':
            (this.#atFocusController.atFocusedItem
          ?? this.#atFocusController.nextATFocusableItem)?.focus();
        }
      } else {
        await this.#float.hide();
        switch (this.variant) {
          case 'single':
          case 'checkbox':
            this._toggle?.focus();
        }
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

  #onListboxKeydown(event: KeyboardEvent) {
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

  #onListboxFocusout(event: FocusEvent) {
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

  #onKeydownMenu(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        this.show();
    }
  }

  async #onKeydownTypeahead(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowUp':
        // TODO: per www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-autocomplete-list
        // alt + Down Arrow should Open the listbox without moving focus of changing selection
        await this.show();
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
    }
  }

  #onButtonKeydown(event: KeyboardEvent) {
    switch (this.variant) {
      case 'single':
      case 'checkbox': return this.#onKeydownMenu(event);
      case 'typeahead':
      case 'typeaheadmulti': return this.#onKeydownTypeahead(event);
    }
  }

  #onListboxSlotchange() {
    this.#listbox.items = this.options;
    this.options.forEach((option, index, options) => {
      option.setSize = options.length;
      option.posInSet = index;
    });
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

  /**
   * handles typeahead combobox input event
   */
  #onTypeaheadInput() {
    // update filter
    if (this.filter !== this._input?.value) {
      this.filter = option => option.value.includes(this._input?.value ?? '');
      this.show();
    }
    // TODO: handle hiding && aria hiding options
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

