import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { type Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { ToggleController } from '@patternfly/pfe-core/controllers/toggle-controller.js';
import { PfChipGroup } from '@patternfly/elements/pf-chip/pf-chip-group.js';

import { PfOption } from './pf-option.js';
import { PfListbox, PfListboxRefreshEvent } from './pf-listbox.js';

import styles from './pf-select.css';
import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

export interface PfSelectUserOptions {
  id: string;
  value: string;
}

/**
 * A select list enables users to select one or more items from a list.
 *
 * A select component consists of a toggle control to open and close a menu of actions or links.
 * Selects differ from dropdowns in that they persist selection,
 * whereas dropdowns are typically used to present a list of actions or links.
 *
 * @slot - insert `pf-option` and/or `pf-option-groups` here
 * @fires open - when the menu toggles open
 * @fires close - when the menu toggles closed
 * @fires filter - when the filter value changes. used to perform custom filtering
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
  static readonly styles = [styles];

  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  static readonly formAssociated = true;

  /**
   * Accessible label for the select's typeahead input
   */
  @property({ attribute: 'accessible-label' }) accessibleLabel = '';

  /**
   * Accessible label for the select's toggle button
   */
  @property({ attribute: 'accessible-toggle-label' }) accessibleToggleLabel?: string;

  /**
   * Accessible label for chip group used to describe chips
   */
  @property({ attribute: 'accessible-current-selections-label' }) accessibleCurrentSelectionsLabel = 'Current selections';

  /**
   * listbox button text when single-select listbox has no selected option text
   */
  @property({ attribute: 'default-text' }) defaultText = 'Options';

  /**
   * multi listbox button text
   */
  @property({ attribute: 'items-selected-text' }) itemsSelectedText = 'items selected';

  /**
   * whether select is disabled
   */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /**
   * enable to flip listbox when it reaches boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  /**
   * listbox filter
   */
  @property() filter = '';

  /**
   * Indicates initial popover position.
   * There are 6 options: `bottom`, `top`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
   * Default is `bottom`.
   */
  @property({ reflect: true }) position: Placement = 'bottom';

  /** Variant of rendered Select */
  @property() variant: 'single' | 'checkbox' | 'typeahead' | 'typeaheadmulti' = 'single';

  /** Flag indicating if selection badge should be hidden for checkbox variant,default false */
  @property({ attribute: 'hide-badge', type: Boolean }) hideBadge = false;

  @property({ attribute: false }) customFilter?: (option: PfOption) => boolean;

  /**
   * Whether the select listbox is expanded
   *
   */
  @property({ type: Boolean, reflect: true })
  get expanded() {
    return this.#toggle.expanded;
  }

  set expanded(expanded: boolean) {
    this.#toggle.toggle(expanded);
  }

  set selected(optionsList: undefined | PfOption | PfOption[]) {
    if (this._listbox && optionsList) {
      this._listbox.selected = optionsList;
    }
  }

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   */
  get selected() {
    return this._listbox?.selected;
  }

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;
  @query('pf-listbox') private _listbox?: PfListbox;
  @query('#toggle-input') private _input?: HTMLInputElement;
  @query('#toggle-button') private _toggle?: HTMLButtonElement;

  #lastSelected = this.selected;

  #internals = InternalsController.of(this);

  #toggle = new ToggleController(this, {
    kind: 'listbox',
    onChange: async expanded => {
      this.dispatchEvent(new Event(expanded ? 'open' : 'close'));
      if (expanded) {
        this.querySelector<PfOption>('pf-option[tabindex="0"]')?.focus();
      } else {
        const valueChanged = this.#lastSelected === this.selected;
        if (this.variant.startsWith('typeahead') && valueChanged) {
          this._input?.focus();
        } else {
          this._toggle?.focus();
        }
        await this.updateComplete;
        this.#lastSelected = this.selected;
      }
    }
  });

  /**
   * label for toggle button
   */
  get #buttonLabel() {
    return this.variant === 'checkbox' ? this.defaultText
        : this.variant === 'typeaheadmulti' ? `${this.#valueTextArray.length} ${this.itemsSelectedText}`
        : this.#valueText.length > 0 ? this.#valueText
        : this.defaultText;
  }

  /**
   * listbox's array of selected options
   */
  get #selectedOptions() {
    return this._listbox?.selectedOptions || [];
  }

  /**
   * array of text content from listbox's array of selected options
   */
  get #valueTextArray() {
    return this.#selectedOptions.map(option => option.optionText || '');
  }

  /**
   * text content from listbox's first selected option
   */
  get #valueText() {
    const [text] = this.#valueTextArray;
    return text || '';
  }

  /**
   * whether select has badge for number of selected items
   */
  private get hasBadge() {
    // NOTE: revisit this in v5
    return this.variant === 'checkbox' && !this.hideBadge;
  }

  /**
   * whether select has removable chips for selected items
   */
  private get hasChips() {
    // NOTE: revisit this in v5
    return this.variant === 'typeaheadmulti';
  }

  override willUpdate() {
    if (this.variant === 'checkbox') {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }
  }

  render() {
    const {
      disabled,
      hasBadge,
      filter,
      variant,
    } = this;
    const {
      anchor = 'bottom',
      alignment = 'start',
      expanded = true,
      styles = {},
    } = this.#toggle;
    const {
      height,
      width,
    } = this.getBoundingClientRect() || {};
    const typeahead = variant.startsWith('typeahead');
    const checkboxes = variant === 'checkbox';
    const offscreen = typeahead && 'offscreen';
    const badge = hasBadge && 'badge';
    const multi = checkboxes || variant === 'typeaheadmulti';

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
          ${!this.hasChips || this.#selectedOptions.length < 1 ? '' : html`
          <pf-chip-group label="${this.accessibleCurrentSelectionsLabel}">
            ${repeat(this.#selectedOptions, opt => opt.id, opt => html`
            <pf-chip id="chip-${opt.textContent}"
                     .readonly="${this.disabled}"
                     @remove=${(e: Event) => this.#onChipRemove(e, opt)}>${opt.textContent}</pf-chip>`)}
          </pf-chip-group>`}
          <input id="toggle-input"
                 aria-label="${this.accessibleLabel}"
                 aria-autocomplete="both"
                 aria-controls="listbox"
                 aria-expanded="${!!expanded}"
                 aria-haspopup="listbox"
                 ?disabled="${disabled}"
                 ?hidden="${!typeahead}"
                 placeholder="${this.#buttonLabel}"
                 role="combobox"
                 @input="${this.#onTypeaheadInput}">
          <button id="toggle-button"
                  aria-label="${ifDefined(this.accessibleToggleLabel)}"
                  aria-controls="listbox"
                  aria-expanded="${!!expanded}"
                  aria-haspopup="listbox">
            <span id="toggle-text"
                  class="${classMap({ offscreen, badge })}">${this.#buttonLabel}</span>${!hasBadge ? '' : html`
            <span id="toggle-badge">
              <pf-badge number="${this.#selectedOptions.length}">${this.#selectedOptions.length}</pf-badge>
            </span>`}
            <svg viewBox="0 0 320 512"
                 fill="currentColor"
                 aria-hidden="true">
              <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
            </svg>
          </button>
        </div>
        <pf-listbox id="listbox"
                    class="${classMap({ checkboxes })}"
                    style="${styleMap({
                      marginTop: `${height || 0}px`,
                      width: width ? `${width}px` : 'auto',
                    })}"
                    ?hidden="${!expanded}"
                    .disabled="${disabled}"
                    .multi="${multi}"
                    .filter="${filter || ''}"
                    .customFilter="${this.customFilter}"
                    @input="${this.#onListboxInput}"
                    @change="${this.#onListboxChange}"
                    @refresh="${this.#onListboxRefresh}"
                    @select="${this.#onListboxSelect}">
          <slot></slot>
        </pf-listbox>
      </div>
    `;
  }

  protected override async getUpdateComplete(): Promise<boolean> {
    return [
      await super.getUpdateComplete(),
      await this._listbox?.updateComplete,
    ].every(x => !!x);
  }

  override updated(changed: PropertyValues<this>) {
    if (changed.has('position') && this.#toggle) {
      this.#toggle.position = this.position;
    }
  }

  firstUpdated() {
    this.#toggle.setPopupElement(this._listbox);
    this.#toggle.addTriggerElement(this._input);
    this.#toggle.addTriggerElement(this._toggle);
    this.#updateValueText();
  }

  /**
   * handles chip's remove button clicking
   * @param opt chip text to be removed from values
   */
  #onChipRemove(_event: Event, opt: PfOption) {
    if (opt) {
      setTimeout(() => {
        // deselect option
        opt.selected = false;
        this._input?.focus();
      }, 1);
    }
  }

  /**
   * handles listbox change event
   */
  #onListboxChange() {
    this.#updateValueText();
  }

  /**
   * handles listbox input event
   */
  #onListboxInput() {
    this.#updateValueText();
  }

  /**
   * handles listbox options refresh
   */
  #onListboxRefresh(event: PfListboxRefreshEvent) {
    if (event instanceof PfListboxRefreshEvent) {
      this.#updateValueText();
    }
  }

  /**
   * handles listbox select event
   */
  #onListboxSelect() {
    if (!(this.variant === 'checkbox' || this.variant === 'typeaheadmulti')) {
      if (this._input) {
        this._input.value = this.#valueText;
        this._input?.focus();
        this._input?.setSelectionRange(this.#valueText.length, this.#valueText.length);
      }
      this.hide();
    } else if (this._input) {
      this._input.value = '';
      this.filter = '';
    }
    const valueStr = [this.selected]
      .flat()
      .filter(x => !!x)
      .map(x => x!.value)
      .join();
    this.#internals.setFormValue(valueStr);
    this.requestUpdate();
  }

  /**
   * handles typeahead combobox input event
   */
  #onTypeaheadInput() {
    // update filter
    if (this._listbox && this.filter !== this._input?.value) {
      this.filter = this._input?.value || '';
      this.show();
    }
  }

  /**
   * updates text indicating current value(s)
   */
  async #updateValueText() {
    await this.updateComplete;
    // reset input if chip has been added
    if (this.hasChips && this._input?.value) {
      const chip = this.shadowRoot?.querySelector(`pf-chip#chip-${this._input?.value}`) as HTMLElement;
      if (chip && this._chipGroup) {
        this._chipGroup.focusOnChip(chip);
        this._input.value = '';
      } else {
        this._input.focus();
      }
    }
  }

  /**
   * Opens the dropdown
   */
  async show() {
    await this.#toggle?.show();
  }

  /**
   * Allows new options to be inserted
   * @param option option to be inserted
   * @param insertBefore optional: reference option before which new will be inserted; if blank new option inserted at end of list
   */
  insertOption(option: PfOption, insertBefore?: PfOption) {
    this._listbox?.insertOption(option, insertBefore);
  }

  /**
   * Closes listbox and sets focus
   */
  async hide() {
    await this.#toggle?.hide(true);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
