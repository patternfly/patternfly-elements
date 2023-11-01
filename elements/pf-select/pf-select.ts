import { LitElement, html, type PropertyValues } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { repeat } from 'lit/directives/repeat.js';
import { styleMap } from 'lit/directives/style-map.js';
import { classMap } from 'lit/directives/class-map.js';
import { type Placement } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { ToggleController } from '@patternfly/pfe-core/controllers/toggle-controller.js';
import { PfSelectOption, PfSelectOptionSelectEvent } from './pf-select-option.js';
import { PfChipGroup } from '@patternfly/elements/pf-chip/pf-chip-group.js';
import { PfSelectList, PfSelectListRefreshEvent } from './pf-select-list.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';


import styles from './pf-select.css';

export type PfSelectItemsDisplay = 'default' | 'badge' | 'chips';

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
 * @slot - insert `pf-select-option` and/or `pf-select-groups` here
 */
@customElement('pf-select')
export class PfSelect extends LitElement {
  static readonly styles = [styles];
  static override readonly shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * whether listbox is always expanded
   */
  @property({ attribute: 'always-expanded', type: Boolean }) alwaysExpanded = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * text for a special option that allows user to create an option from typeahead input text;
   * set to '' in order to disable this feature
   */
  @property({ attribute: 'create-option-text', type: String }) createOptionText = '';

  /**
   * Accessible label for chip group used to describe chips
   */
  @property({ attribute: 'current-selections-label', type: String }) currentSelectionsLabel = 'Current selections';

  /**
   * listbox button text when single-select listbox has no selected option text
   */
  @property({ attribute: 'default-text', type: String }) defaultText = 'Options';

  /**
   * whether select is disabled
   */
  @property({ type: Boolean }) disabled = false;

  /**
   * enable to flip listbox when it reaches boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  /**
   * listbox filter
   */
  @property({ type: String }) filter = '';

  /**
   * whether listbox is has checkboxes when `multi-select` is enabled
   */
  @property({ reflect: true, attribute: 'checkboxes', type: Boolean }) checkboxes = false;

  /**
   * multi listbox button text
   */
  @property({ attribute: 'items-selected-text', type: String }) itemsSelectedText = 'items selected';

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if option starts with filter)
   */
  @property({ reflect: true, attribute: 'match-anywhere', type: Boolean }) matchAnywhere = false;

  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multi', type: Boolean }) multi = false;

  /**
   * whether listbox is always expanded
   */
  @property({ reflect: true, type: Boolean }) expanded = false;

  /**
   * Indicates initial popover position.
   * There are 6 options: `bottom`, `top`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
   * Default is `bottom`.
   */
  @property({ reflect: true }) position: Placement = 'bottom';

  /**
   * how listbox will display multiple items in toggle area:
   * 'badge' for a badge with item count,
   * 'chips' for a group of chips,
   * '' for # items selected text (default)
   */
  @property({ attribute: 'selected-items-display', type: String }) selectedItemsDisplay: PfSelectItemsDisplay = 'default';

  /**
   * whether listbox controlled by combobox that supports typing
   */
  @property({ type: Boolean }) typeahead = false;

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;
  @query('pf-select-list') private _listbox?: PfSelectList;
  @query('#suggested-option') private _suggestedOption?: PfSelectOption;
  @query('#toggle-input') private _input?: HTMLInputElement;
  @query('#toggle-button') private _toggle?: HTMLButtonElement;

  #toggle = new ToggleController(this, 'listbox');
  #controllerOn = true;

  #userCreatedOptions: PfSelectUserOptions[] = [];

  /**
   * label for toggle button
   */
  get #buttonLabel() {
    return this.hasBadge || this.hasChips ?
      this.defaultText : this.#isMulti ?
      `${this.#valueTextArray.length} ${this.itemsSelectedText}` : this.#valueText.length > 0 ?
        this.#valueText : this.defaultText;
  }

  /**
   * whether listbox is aria-multiselectable
   */
  get #isMulti() {
    return this.multi || this.checkboxes;
  }

  /**
   * listbox's array of selected options
   */
  get #selectedOptions() {
    const options: unknown[] = this._listbox?.selectedOptions || [];
    return options as PfSelectOption[];
  }

  /**
   * listbox template
   */
  get #selectList() {
    const { caseSensitive, checkboxes, createOptionText, disabled, expanded, filter, matchAnywhere } = this;
    const { height, width } = this.getBoundingClientRect() || {};
    const styles = this.alwaysExpanded ? '' : `margin-top: ${height || 0}px;width: ${width || 'auto'}px`;
    return html`
      <pf-select-list 
        id="listbox" 
        style="${styles}"
        class="${classMap({ checkboxes })}"
        ?disabled="${disabled}"
        ?hidden=${!this.alwaysExpanded && !expanded}
        ?case-sensitive=${caseSensitive}
        ?match-anywhere=${matchAnywhere}
        ?multi=${this.#isMulti}
        filter="${filter || ''}"
        @input=${this.#onListboxInput}
        @change=${this.#onListboxChange}
        @refresh=${this.#onListboxRefresh}
        @select=${this.#onListboxSelect}>
        <slot></slot>
        ${repeat(this.#userCreatedOptions, opt => opt.id, opt => opt.value === '' ? '' : html`
          <pf-select-option id="${opt.id}" ?selected="${this.#valueTextArray.includes(opt.value)}">${opt.value}</pf-select-option>
        `)}
        ${!this.typeahead || createOptionText === '' || filter.length === 0 ? '' : html`
          <pf-select-option id="suggested-option" 
            value="${filter}"
            ?selected="${this.#valueTextArray.includes(filter)}"        
            @select="${this.#createOption}">
            ${this.#valueTextArray.includes(filter) ? '' : html`
              <span slot="create">${createOptionText}: </span>
            `}
            ${filter}
          </pf-select-option>
        `}
      </pf-select-list>`;
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
  get hasBadge() {
    return this.#isMulti && this.selectedItemsDisplay === 'badge';
  }

  /**
   * whether select has removable chips for selected items
   */
  get hasChips() {
    return this.#isMulti && this.selectedItemsDisplay === 'chips';
  }

  /**
   * all listbox options
   */
  get options() {
    return this._listbox?.options;
  }

  set selected(optionsList: unknown | unknown[]) {
    if (this._listbox) {
      this._listbox.selected = optionsList;
    }
  }

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   * You can also specify `isSelected` on `SelectOption`.
   */
  get selected() {
    return this._listbox?.selected;
  }

  /**
   * list of values as comma separated list
   */
  get selectedList() {
    return this.#valueTextArray.map(txt => txt.replace(',', '\\,')).join(', ');
  }

  render() {
    const { alwaysExpanded, typeahead, disabled, expanded, hasBadge } = this;
    const { anchor, alignment } = this.#toggle || { 'expanded': true, 'anchor': 'bottom', 'alignment': 'start' };
    const toggles = !alwaysExpanded ? 'toggles' : false;
    const offscreen = typeahead ? 'offscreen' : false;
    const badge = hasBadge ? 'badge' : false;
    return html`
      <div id="outer" 
          style="${this.#toggle?.styles ? styleMap(this.#toggle.styles) : ''}"
          class="${classMap({ disabled, toggles, typeahead, expanded, [anchor]: !!anchor, [alignment]: !!alignment })}">
        <div id="toggle" ?hidden="${!typeahead && alwaysExpanded}">
          ${!this.hasChips || this.#selectedOptions.length < 1 ? '' : html`
            <pf-chip-group label="${this.currentSelectionsLabel}">
              ${repeat(this.#selectedOptions, opt => opt.id, opt => html`<pf-chip id="chip-${opt.textContent}" 
              .readonly="${this.disabled}"
              @remove=${(e: Event) => this.#onChipRemove(e, opt)}>${opt.textContent}</pf-chip>`)}
            </pf-chip-group>
          `}
          <input 
            id="toggle-input" 
            type="text" 
            aria-autocomplete="both" 
            aria-controls="listbox" 
            aria-expanded="${!!expanded}"
            aria-haspopup="listbox" 
            ?disabled="${disabled}"
            ?hidden="${!typeahead}" 
            placeholder="${this.#buttonLabel}"
            role="combobox"
            @input=${this.#onTypeaheadInput}>
            <button id="toggle-button" 
              ?hidden="${alwaysExpanded}"
              aria-controls="listbox" 
              aria-expanded="${!!expanded}" 
              aria-haspopup="listbox">
              <span id="toggle-text" class="${classMap({ offscreen, badge })}">
                ${this.#buttonLabel}
              </span>
              ${hasBadge ? html`
                <span id="toggle-badge">
                  <pf-badge number="${this.#selectedOptions.length}">${this.#selectedOptions.length}</pf-badge>
                </span> ` : ''}
              <svg viewBox="0 0 320 512" 
                fill="currentColor" 
                aria-hidden="true">
                  <path d="M31.3 192h257.3c17.8 0 26.7 21.5 14.1 34.1L174.1 354.8c-7.8 7.8-20.5 7.8-28.3 0L17.2 226.1C4.6 213.5 13.5 192 31.3 192z"></path>
              </svg>
            </button>
          </div>
          ${this.#selectList}
        </div>
    `;
  }

  willUpdate(changed: PropertyValues<this>) {
    if (changed.has('checkboxes') && this.checkboxes) {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('alwaysExpanded')) {
      this.#setToggle();
    }

    if (changed.has('position') && this.#toggle) {
      this.#toggle.position = this.position;
    }
  }

  firstUpdated() {
    this.#updateValueText();
  }

  #setToggle() {
    if (!this.alwaysExpanded) {
      if (!this.#controllerOn) {
        this.addController(this.#toggle);
        this.#controllerOn = true;
      }
      this.#toggle?.setPopupElement(this._listbox);
      this.#toggle?.addTriggerElement(this._input);
      this.#toggle?.addTriggerElement(this._toggle);
    } else if (this.#toggle) {
      this.removeController(this.#toggle);
      this.#controllerOn = false;
    }
  }

  /**
   * inserts a create option into listbox
   */
  async #createOption(event: Event) {
    const target = event?.target;
    const val = this.filter;
    const selected = target instanceof PfSelectOption && target.selected;
    event.preventDefault();
    event.stopPropagation();
    if (selected && event instanceof PfSelectOptionSelectEvent && val.length > 0) {
      if (target.selected) {
        const id = getRandomId();
        this.#userCreatedOptions.push({
          id: id,
          value: val
        });
        this.requestUpdate();
        await this.updateComplete;
        const option = this.shadowRoot.querySelector(`#${id}`);
        option?.focus();
        this.#onListboxSelect(event);
      }
    }
  }

  /**
   * handles chip's remove button clicking
   * @param txt chip text to be removed from values
   */
  #onChipRemove(event: Event, opt: PfSelectOption) {
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
   * @param event {PfSelectListRefreshEvent}
   */
  #onListboxRefresh(event: PfSelectListRefreshEvent) {
    if (event instanceof PfSelectListRefreshEvent) {
      this.#updateValueText();
    }
  }

  /**
   * handles listbox select event
   */
  #onListboxSelect(event: KeyboardEvent) {
    if (!this.#isMulti) {
      if (this._input) {
        this._input.value = this.#valueText;
        this._input?.focus();
        this._input?.setSelectionRange(this.#valueText.length, this.#valueText.length);
      }

      // prevent toggle firing a click event when focus is rest to it
      event.preventDefault();
      event.stopImmediatePropagation();
      this.hide();
    } else if (this._input) {
      this._input.value = '';
      this.filter = '';

      // set focus on input when a new chip is added
      if (this.hasChips) {
        this.requestUpdate();
      }
    }
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
    this.requestUpdate();
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
   * opens the dropdown
   */
  async show() {
    await this.#toggle?.show();
  }

  /**
   * allows new options to be inserted
   * @param option option to be inserted
   * @param insertBefore optional: reference option before which new will be inserted; if blank new option inserted at end of list
   */
  insertOption(option: PfSelectOption, insertBefore?: PfSelectOption) {
    this._listbox?.insertOption(option, insertBefore);
  }

  /**
   * closes listbox and sets focus
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
