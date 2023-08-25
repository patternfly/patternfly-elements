import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import type { PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { type ListboxValue } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { PfSelectListbox } from './pf-select-listbox.js';

import styles from './pf-select.css';
import type { PfSelectOption } from './pf-select-option.js';
import { PfChipGroup } from '@patternfly/elements/pf-chip/pf-chip-group.js';

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

  /**
   * whether select is disabled
   */
  @property({ reflect: true, attribute: 'disabled', type: Boolean }) disabled = false;

  /**
   * listbox button text when listbox selected option has no text
   */
  @property({ attribute: 'default-text', type: String }) defaultText = 'Options';

  /**
   * multi-selectable listbox button text
   */
  @property({ attribute: 'items-selected-text', type: String }) itemsSelectedText = 'items selected';

  /**
   * text for a special option that allows user to create an option from typeahead input text;
   * set to '' in order to disable this feature
   */
  @property({ attribute: 'create-option-text', type: String }) createOptionText = '';

  /**
   * ARIA label for chip group used to describe chips
   */
  @property({ attribute: 'current-selections-label', type: String }) currentSelectionsLabel = 'Current selections';

  /**
   * whether listbox is always open
   */
  @property({ attribute: 'always-open', type: Boolean }) alwaysOpen = false;

  /**
   * whether listbox is has checkboxes when `multi-select` is enabled
   */
  @property({ attribute: 'has-checkboxes', type: Boolean }) hasCheckboxes = false;

  /**
   * whether filtering (if enabled) will be case-sensitive
   */
  @property({ attribute: 'case-sensitive', type: Boolean }) caseSensitive = false;

  /**
   * whether option filtering is disabled
   */
  @property({ reflect: true, attribute: 'disable-filter', type: Boolean }) disableFilter = false;

  /**
   * whether filtering (if enabled) will look for filter match anywhere in option text
   * (by default it will only match if the option starts with filter)
   */
  @property({ reflect: true, attribute: 'match-anywhere', type: Boolean }) matchAnywhere = false;

  /**
   * whether multiple items can be selected
   */
  @property({ reflect: true, attribute: 'multi-selectable', type: Boolean }) multiSelectable = false;

  /**
   * whether listbox is always open
   */
  @property({ attribute: 'open', type: Boolean }) open = false;

  /**
   * whether listbox is plain
   */
  @property({ attribute: 'plain', type: Boolean }) plain = false;

  /**
   * whether listbox controlled by combobox that supports typing
   */
  @property({ attribute: 'typeahead', type: Boolean }) typeahead = false;

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;

  #createOption!: PfSelectOption;
  #selectedOptions: PfSelectOption[] = [];
  #valueText = '';
  #valueTextArray: string[] = [];

  get #buttonLabel() {
    return (this.multiSelectable || this.hasCheckboxes) && !this.hasBadge && !this.hasChips ?
      `${this.#valueTextArray.length} ${this.itemsSelectedText}` : this.#valueText.length > 0 && !this.hasChips ?
        this.#valueText : this.defaultText;
  }

  get #listbox(): PfSelectListbox | null | undefined {
    return this.shadowRoot?.querySelector('#listbox');
  }

  get #input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('#toggle-input');
  }

  get #toggle(): HTMLButtonElement | null | undefined {
    return this.shadowRoot?.querySelector('#toggle-button');
  }

  get #valueTextList() {
    return this.#valueTextArray.map(txt => txt.replace(',', '\\,')).join(', ');
  }

  /**
   * filter string for visible options
   */
  set filter(filterText: string) {
    if (this.#listbox) {
      this.#listbox.filter = filterText;
    }
  }

  get filter() {
    return this.#listbox?.filter || '';
  }

  /**
   * whether select has badge for number of selected items
   */
  get hasBadge() {
    return !this.typeahead && this.#selectedOptions.length > 0 && this.multiSelectable;
  }

  /**
   * whether select has removable chips for selected items
   */
  get hasChips() {
    return this.typeahead && this.multiSelectable;
  }

  /**
   * all listbox options
   */
  get options() {
    return this.#listbox?.options;
  }

  set selected(optionsList: ListboxValue) {
    if (this.#listbox) {
      this.#listbox.selected = optionsList;
    }
  }

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   * You can also specify `isSelected` on the `SelectOption`.
   */
  get selected() {
    return this.#listbox?.selected;
  }

  render() {
    const { hasBadge, typeahead, plain } = this;
    const offscreen = typeahead ? 'offscreen' : false;
    const badge = hasBadge ? 'badge' : false;
    const checkboxes = this.hasCheckboxes ? 'checkboxes' : false;
    const autocomplete = this.disableFilter ? 'none' : 'both';
    return html`
    ${this.alwaysOpen ? '' : html`
      <div id="toggle" 
        ?disabled=${this.disabled} 
        ?expanded=${this.open}>
        ${!this.hasChips || this.#valueTextArray.length < 1 ? '' : html`
          <pf-chip-group label="${this.currentSelectionsLabel}">
            ${this.#valueTextArray.map(txt => html`
              <pf-chip id="chip-${txt}" @click="${() => this.#onChipClick(txt)}">${txt}</pf-chip>
            `)}
          </pf-chip-group>
        `}
        ${!typeahead ? '' : html`
          <input 
            id="toggle-input" 
            type="text" 
            aria-controls="listbox" 
            aria-autocomplete="${autocomplete}" 
            aria-expanded="${!this.open ? 'false' : 'true'}" 
            placeholder="${this.#buttonLabel}"
            role="combobox"
            @input=${this.#onTypeaheadInput}
            @focus="${this.#onTypeaheadInputFocus}">
        `}
        <button 
          id="toggle-button" 
          aria-expanded="${!this.open ? 'false' : 'true'}" 
          aria-controls="listbox" 
          aria-haspopup="listbox"
          ?disabled=${this.disabled}
          @click="${this.#onToggleClick}">
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
    `}
      <pf-select-listbox 
        id="listbox" 
        class="${classMap({ plain, checkboxes })}"
        ?disabled=${this.disabled}
        ?hidden=${!this.alwaysOpen && (!this.open || this.disabled)}
        ?case-sensitive=${this.caseSensitive}
        ?disable-filter="${this.disableFilter}"
        ?match-anywhere=${this.matchAnywhere}
        ?multi-selectable=${this.multiSelectable || this.hasCheckboxes}
        @input=${this.#onListboxInput}
        @change=${this.#onListboxChange}
        @keydown=${this.#onListboxKeydown}
        @listboxoptions=${this.#updateValueText}
        @select=${this.#onListboxSelect}
        @optioncreated="${this.#onOptionCreated}">
        <slot></slot>
      </pf-select-listbox>
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('hasCheckboxes') && this.hasCheckboxes) {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }

    if (changed.has('typeahead') || changed.has('createOptionText')) {
      this.#updateCreateOptionText();
    }

    if (changed.has('open')) {
      /**
       * @fires open-change
       */
      this.dispatchEvent(new Event('open-change'));
    }
  }

  firstUpdated() {
    this.#addCreateOption();
    this.#updateValueText();
  }

  /**
   * sets focus
   */
  focus() {
    const listbox = this.shadowRoot?.querySelector('pf-select-listbox');
    const toggle = this.shadowRoot?.querySelector('button');
    (toggle || listbox)?.focus();
  }

  /**
   * allows new options to be inserted
   * @param option option to be inserted
   * @param insertBefore optional: reference option before which new will be inserted; if blank new option inserted at end of list
   */
  insertOption(option: PfSelectOption, insertBefore?: PfSelectOption) {
    this.#listbox?.insertOption(option, insertBefore);
  }

  #addCreateOption() {
    this.#createOption = document.createElement('pf-select-option');
    this.#updateCreateOptionValue();
    this.appendChild(this.#createOption);
  }

  #updateCreateOptionText() {
    this.#createOption.innerHTML = `${this.#createOption.value}`;
    const createOptionText = !this.typeahead || this.#createOption.value === '' ? '' : this.createOptionText;
    this.#createOption.createOptionText = createOptionText;
  }

  #updateCreateOptionValue() {
    let filter = this.filter || '';
    if (filter === '*') {
      filter = '';
    }
    this.#createOption.value = filter;
    this.#updateCreateOptionText();
  }

  /**
   * updates text indicating current value(s)
   */
  #updateValueText() {
    this.#selectedOptions = (this.#listbox?.selectedOptions || []) as PfSelectOption[];
    this.#valueTextArray = this.#selectedOptions.map(option => option.optionText || '');
    const [selectedOption] = this.#valueTextArray;
    this.#valueText = selectedOption || '';
    this.requestUpdate();

    // reset input if chip has been added
    if (this.hasChips && this.#input?.value) {
      const chip = this.shadowRoot?.querySelector(`pf-chip#chip-${this.#input?.value}`) as HTMLElement;
      this.#input.value = '';
      if (chip && this._chipGroup) {
        this._chipGroup.focusOnChip(chip);
      } else {
        this.#input.focus();
      }
    }
  }

  /**
   * handles chip's remove button clicking
   * @param txt chip text to be removed from values
   */
  #onChipClick(txt: string) {
    const [opt] = this.#selectedOptions.filter(option => option.optionText === txt);
    // remove chip value from select value
    if (Array.isArray(this.selected)) {
      this.selected = this.selected.filter(option => option !== opt);
      this.#input?.focus();
    }
  }

  /**
   * handles listbox change event
   */
  #onListboxChange() {
    this.#updateValueText();
    if (this.#input && this.#listbox) {
      if (!this.multiSelectable && !this.hasCheckboxes && this.#valueText !== this.#input?.value) {
        this.filter = this.#valueText.slice(0, this.#input.value.length);
        this.#input.value = this.#valueText;
        this.#input.focus();
        this.#input.setSelectionRange(
          this.filter.length,
          this.#valueText.length
        );
      }
    }
  }

  /**
   * handles listbox input event
   */
  #onListboxInput() {
    this.#updateValueText();
  }

  /**
   * handles listbox keydown event
   */
  #onListboxKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.open = false;
      (this.#input || this.#toggle)?.focus();
    }
  }

  /**
   * handles listbox select event
   */
  #onListboxSelect() {
    if (!this.multiSelectable && !this.hasCheckboxes) {
      this.open = false;
      (this.#input || this.#toggle)?.focus();
    }
  }

  /**
   * handles listbox option being created and creates a new "create option"
   */
  #onOptionCreated() {
    this.#addCreateOption();
    this.filter = '';
    this.#updateCreateOptionValue();
  }

  /**
   * handles toggle button click event
   */
  #onToggleClick() {
    this.open = !this.open;
  }

  /**
   * handles typeahead combobox input event
   */
  #onTypeaheadInput() {
    // update the filter
    if (this.#listbox && this.#input?.value && !this.#valueTextArray.includes(this.#input?.value) && this.filter !== this.#input?.value) {
      this.filter = this.#input?.value || '';
    }

    this.#updateCreateOptionValue();
  }

  /**
   * handles typeahead combobox focus event
   */
  #onTypeaheadInputFocus() {
    this.open = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
