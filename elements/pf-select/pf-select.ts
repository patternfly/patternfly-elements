import type { PfChipRemoveEvent } from '@patternfly/elements/pf-chip/pf-chip.js';

import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ListboxController } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { RovingTabindexController } from '@patternfly/pfe-core/controllers/roving-tabindex-controller.js';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import {
  FloatingDOMController,
  type Placement,
} from '@patternfly/pfe-core/controllers/floating-dom-controller.js';

import { PfOption } from './pf-option.js';

import styles from './pf-select.css';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

export interface PfSelectUserOptions {
  id: string;
  value: string;
}

export class PfSelectChangeEvent extends Event {
  constructor() {
    super('change', { bubbles: true });
  }
}

// NOTE: this file contains numerous // comments, which ordinarily would be deleted
// They are here to save the work already done on typeahead, which has a much more complex
// accessibility model, and which is planned for the next release
// * @fires filter - when the filter value changes. used to perform custom filtering

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
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
  static readonly styles = [styles];

  static override readonly shadowRootOptions = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  static readonly formAssociated = true;

  #internals = InternalsController.of(this);

  #float = new FloatingDOMController(this, {
    content: () => this.shadowRoot?.getElementById('listbox-container') ?? null,
  });

  #slots = new SlotController(this, null, 'placeholder');

  #listbox?: ListboxController<PfOption>; /* | ListboxActiveDescendantController */

  /** Variant of rendered Select */
  @property() variant: 'single' | 'checkbox' /* | 'typeahead' | 'typeaheadmulti' */ = 'single';

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

  // @property({ attribute: false }) customFilter?: (option: PfOption) => boolean;

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  set selected(optionsList: PfOption | PfOption[]) {
    this.#listbox?.setValue(optionsList);
  }

  get selected(): PfOption | PfOption[] | undefined {
    return this.#listbox?.value;
  }

  /**
   * array of slotted options
   */
  get options(): PfOption[] {
    const opts = Array.from(this.querySelectorAll('pf-option'));
    const placeholder = this.shadowRoot?.getElementById('placeholder') as PfOption | null;
    if (placeholder) {
      return [placeholder, ...opts];
    } else {
      return opts;
    }
  }

  // @query('pf-chip-group') private _chipGroup?: PfChipGroup;

  // @query('#toggle-input') private _input?: HTMLInputElement;

  @query('#toggle-button') private _toggle?: HTMLButtonElement;

  #lastSelected = this.selected;

  get #listboxElement() {
    return this.shadowRoot?.getElementById('listbox') ?? null;
  }

  /**
   * whether select has badge for number of selected items
   */
  get #hasBadge() {
    // NOTE: revisit this in v5
    return this.variant === 'checkbox' && !this.checkboxSelectionBadgeHidden;
  }

  get #buttonLabel() {
    switch (this.variant) {
      // TODO: implement typeaheadmulti with ActiveDescendantController
      // case 'typeaheadmulti':
      //   return `${this.#listbox?.selectedOptions?.length ?? 0} ${this.itemsSelectedText}`
      case 'checkbox':
        return this.#listbox
            ?.selectedOptions
            ?.map?.(option => option.optionText || '')
            ?.join(' ')
            ?.trim()
          || this.#computePlaceholderText()
          || 'Options';
      default:
        return (this.selected ? this.value : '')
          || this.#computePlaceholderText()
          || 'Select a value';
    }
  }

  override willUpdate(changed: PropertyValues<this>) {
    if (this.variant === 'checkbox') {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }
    if (changed.has('variant')) {
      this.#variantChanged();
    }
    if (changed.has('value')) {
      this.#internals.setFormValue(this.value ?? '');
    }
    if (changed.has('disabled')) {
      this.#listbox!.disabled = this.disabled;
    }
    // TODO: handle filtering in the element, not the controller
    // if (changed.has('filter')) {
    //   this.#listbox.filter = this.filter;
    // }
  }

  override render() {
    const { disabled, expanded, variant } = this;
    const { anchor = 'bottom', alignment = 'start', styles = {} } = this.#float;
    const { computedLabelText } = this.#internals;
    const { height, width } = this.getBoundingClientRect() || {};
    const buttonLabel = this.#buttonLabel;
    const hasBadge = this.#hasBadge;
    const selectedOptions = this.#listbox?.selectedOptions ?? [];
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
                 aria-label="${this.accessibleLabel ?? (computedLabelText || buttonLabel)}"
                 aria-autocomplete="both"
                 ?disabled="${disabled}"
                 ?hidden="${!typeahead}"
                 placeholder="${buttonLabel}"
                 @input="${this.#onTypeaheadInput}">
          `}
          <button id="toggle-button"
                  role="combobox"
                  aria-hidden="${typeahead.toString() as 'true' | 'false'}"
                  aria-label="${ifDefined(this.accessibleLabel || this.#internals.computedLabelText || undefined)}"
                  aria-describedby="placeholder"
                  aria-controls="listbox"
                  aria-haspopup="listbox"
                  aria-expanded="${String(this.expanded) as 'true' | 'false'}"
                  @keydown="${this.#onButtonKeydown}"
                  @click="${() => !typeahead && this.toggle()}"
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
            <slot @slotchange="${this.#onListboxSlotchange}"></slot>
          </div>
        </div>
      </div>
    `;
  }

  override updated(changed: PropertyValues<this>) {
    if (changed.has('expanded')) {
      this.#expandedChanged();
    }
    if (changed.has('value')) {
      this.dispatchEvent(new PfSelectChangeEvent());
    }
    // whether select has removable chips for selected items
    // NOTE: revisit this in v5
    // const hasChips = this.variant === 'typeaheadmulti';
    // reset input if chip has been added
    // if (this.hasChips && this._input?.value) {
    //   const chip = this.shadowRoot?.querySelector(`pf-chip#chip-${this._input?.value}`) as HTMLElement;
    //   if (chip && this._chipGroup) {
    //     this._chipGroup.focusOnChip(chip);
    //     this._input.value = '';
    //   }
    // }
  }

  override firstUpdated() {
    // kick the renderer to that the placeholder gets picked up
    this.requestUpdate();
    // TODO: don't do filtering in the controller
    // if (this.variant === 'typeaheadmulti') {
    //   this.#listbox.filter = this.filter;
    // }
  }

  #variantChanged() {
    this.#listbox?.hostDisconnected();
    const getHTMLElement = () => this.#listboxElement;
    switch (this.variant) {
      // TODO
      // case 'typeahead':
      // case 'typeaheadmulti':
      //   this.#controller = new ListboxController.of<PfOption>(this, {
      //     multi: this.variant==='typeaheadmulti',
      //     a11yController: ActiveDescendantController.of(this)
      //   });
      //   break;
      default:
        this.#listbox = ListboxController.of<PfOption>(this, {
          multi: this.variant === 'checkbox',
          getHTMLElement,
          isSelected: option => option.selected,
          requestSelect: (option, selected) => {
            this.#lastSelected = this.selected;
            option.selected = !option.disabled && !!selected;
            this.#selectedChanged();
            return true;
          },
          a11yController: RovingTabindexController.of(this, {
            getHTMLElement,
            getItems: () => this.options,
          }),
        });
        break;
    }
  }

  async #expandedChanged() {
    const will = this.expanded ? 'close' : 'open';
    this.dispatchEvent(new Event(will));
    if (this.expanded) {
      await this.#float.show({ placement: this.position || 'bottom', flip: !!this.enableFlip });
      const focusableItem = this.#listbox?.activeItem ?? this.#listbox?.nextItem;
      focusableItem?.focus();
    } else if (this.#lastSelected === this.selected) {
      await this.#float.hide();
      this._toggle?.focus();
    }
  }

  async #selectedChanged() {
    await this.updateComplete;
    this.value = [this.selected]
        .flat()
        .filter(x => !!x)
        .map(x => x!.value)
        .join();
    switch (this.variant) {
      case 'single':
        this.hide();
        this._toggle?.focus();
    }
  }

  #onListboxKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Escape':
        this.hide();
        this._toggle?.focus();
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

  #onButtonKeydown(event: KeyboardEvent) {
    switch (this.variant) {
      case 'single':
      case 'checkbox':
        switch (event.key) {
          case 'ArrowDown':
            this.show();
        }
    }
  }

  #onListboxSlotchange() {
    this.#listbox?.setOptions(this.options);
    this.options.forEach((option, index, options) => {
      option.setSize = options.length;
      option.posInSet = index;
    });
  }

  /**
   * handles chip's remove button clicking
   * @param opt chip text to be removed from values
   */
  #onChipRemove(opt: PfOption, event: PfChipRemoveEvent) {
  //   if (event.chip) {
  //     opt.selected = false;
  //     this._input?.focus();
  //   }
  }

  /**
   * handles typeahead combobox input event
   */
  #onTypeaheadInput() {
    // update filter
    // if (this.filter !== this._input?.value) {
    //   this.filter = this._input?.value || '';
    //   this.show();
    // }
    // TODO: handle hiding && aria hiding options
  }

  #computePlaceholderText() {
    return this.placeholder
      || this.querySelector<HTMLSlotElement>('[slot=placeholder]')
          ?.assignedNodes()
          ?.reduce((acc, node) => `${acc}${node.textContent}`, '')?.trim()
      || this.#listbox?.options
          ?.filter(x => x !== this.shadowRoot?.getElementById('placeholder'))
          ?.at(0)?.value
      || '';
  }

  /**
   * Opens the dropdown
   */
  async show() {
    this.expanded = true;
    await this.updateComplete;
  }

  /**
   * Closes listbox
   */
  async hide() {
    this.expanded = false;
    await this.updateComplete;
  }

  /**
   * toggles popup based on current state
   */
  async toggle() {
    this.expanded = !this.expanded;
    await this.updateComplete;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
