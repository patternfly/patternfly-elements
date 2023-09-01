import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';
import { styleMap } from 'lit/directives/style-map.js';
import type { PropertyValues } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { FloatingDOMController } from '@patternfly/pfe-core/controllers/floating-dom-controller.js';
import { type ListboxValue } from '@patternfly/pfe-core/controllers/listbox-controller.js';
import { PfSelectList } from './pf-select-list.js';

import styles from './pf-select.css';
import type { PfSelectOption } from './pf-select-option.js';
import { PfChipGroup } from '@patternfly/elements/pf-chip/pf-chip-group.js';

export type PfSelectItemsDisplay = '' | 'badge' | 'chips';
export type Placement = 'bottom' | 'top' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
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
   * whether listbox is always open
   */
  @property({ attribute: 'always-open', type: Boolean }) alwaysOpen = false;

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
   * ARIA label for chip group used to describe chips
   */
  @property({ attribute: 'current-selections-label', type: String }) currentSelectionsLabel = 'Current selections';

  /**
   * listbox button text when single-select listbox has no selected option text
   */
  @property({ attribute: 'default-text', type: String }) defaultText = 'Options';

  /**
   * whether select is disabled
   */
  @property({ reflect: true, attribute: 'disabled', type: Boolean }) disabled = false;

  /**
   * whether option filtering is disabled
   */
  @property({ reflect: true, attribute: 'disable-filter', type: Boolean }) disableFilter = false;

  /**
   * enable to flip the listbox when it reaches the boundary
   */
  @property({ attribute: 'enable-flip', type: Boolean }) enableFlip = false;

  /**
   * whether listbox is has checkboxes when `multi-select` is enabled
   */
  @property({ reflect: true, attribute: 'has-checkboxes', type: Boolean }) hasCheckboxes = false;

  /**
   * multi-selectable listbox button text
   */
  @property({ attribute: 'items-selected-text', type: String }) itemsSelectedText = 'items selected';

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
  @property({ reflect: true, attribute: 'open', type: Boolean }) open = false;

  /**
   * Indicates the initial popover position.
   * There are 6 options: `bottom`, `top`, `top-start`, `top-end`, `bottom-start`, `bottom-end`.
   * The default is `bottom`.
   */
  @property({ reflect: true, attribute: 'position' }) position: Placement = 'bottom';

  /**
   * how listbox will display multiple items in the toggle area:
   * 'badge' for a badge with item count,
   * 'chips' for a group of chips,
   * '' for # itmes selected text (default)
   */
  @property({ attribute: 'selected-items-display', type: String }) selectedItemsDisplay: PfSelectItemsDisplay = '';

  /**
   * whether listbox controlled by combobox that supports typing
   */
  @property({ attribute: 'typeahead', type: Boolean }) typeahead = false;

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;
  @query('pf-select-list') private _listbox?: PfSelectList;
  @query('#toggle-input') private _input?: HTMLInputElement;
  @query('#toggle-button') private _toggle?: HTMLButtonElement;

  #createOption!: PfSelectOption;
  #float = new FloatingDOMController(this, {
    content: (): HTMLElement | undefined | null => this._listbox
  });

  #hovered = false;
  #focused = false;

  /**
   * label for toggle button
   */
  get #buttonLabel() {
    return this.hasBadge ?
      this.defaultText : this.#isMulti ?
      `${this.#valueTextArray.length} ${this.itemsSelectedText}` : this.#valueText.length > 0 ?
        this.#valueText : this.defaultText;
  }

  /**
   * whether listbox is aria-multiselectable
   */
  get #isMulti() {
    return this.multiSelectable || this.hasCheckboxes;
  }

  /**
   * listbox template
   */
  get #selectList() {
    const checkboxes = this.hasCheckboxes ? 'checkboxes' : false;
    const { height, width } = this.getBoundingClientRect() || {};
    const styles = this.alwaysOpen ? '' : `margin-top: ${height || 0}px;width: ${width || 'auto'}px`;
    return html`
      <pf-select-list 
        id="listbox" 
        style="${styles}"
        class="${classMap({ checkboxes })}"
        ?disabled=${this.disabled}
        ?hidden=${!this.alwaysOpen && (!this.open || this.disabled)}
        ?case-sensitive=${this.caseSensitive}
        ?disable-filter="${this.disableFilter}"
        ?match-anywhere=${this.matchAnywhere}
        ?multi-selectable=${this.#isMulti}
        @input=${this.#onListboxInput}
        @change=${this.#onListboxChange}
        @keydown=${this.#onListboxKeydown}
        @listboxoptions=${this.#updateValueText}
        @select=${this.#onListboxSelect}
        @optionfocus=${this.#onSelectFocus}
        @optionblur=${this.#onSelectBlur}
        @optioncreated=${this.#onOptionCreated}>
        <slot></slot>
      </pf-select-list>`;
  }

  /**
   * listbox's array of selected options
   */
  get #selectedOptions() {
    return (this._listbox?.selectedOptions || []) as PfSelectOption[];
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
   * list of values as comma separated list
   */
  get selectedList() {
    return this.#valueTextArray.map(txt => txt.replace(',', '\\,')).join(', ');
  }

  set filter(filterText: string) {
    if (this._listbox) {
      this._listbox.filter = filterText;
    }
  }

  /**
   * filter string for visible options
   */
  get filter() {
    return this._listbox?.filter || '';
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

  set selected(optionsList: ListboxValue) {
    if (this._listbox) {
      this._listbox.selected = optionsList;
    }
  }

  /**
   * Single select option value for single select menus,
   * or array of select option values for multi select.
   * You can also specify `isSelected` on the `SelectOption`.
   */
  get selected() {
    return this._listbox?.selected;
  }

  render() {
    const { hasBadge, typeahead } = this;
    const offscreen = typeahead ? 'offscreen' : false;
    const badge = hasBadge ? 'badge' : false;
    const autocomplete = this.disableFilter ? 'none' : 'list';
    const { alignment, anchor, styles, open } = this.#float;
    return this.alwaysOpen ? html`${this.#selectList}` : html`
      <div id="outer" 
        style="${styleMap(styles)}"
        class="${classMap({ open, [anchor]: !!anchor, [alignment]: !!alignment })}"
        @mouseover=${this.#onSelectMouseover}
        @mouseout=${this.#onSelectMouseout}
        @focus=${this.#onSelectFocus}
        @blur=${this.#onSelectBlur}>
        <div id="toggle" 
          ?disabled=${this.disabled} 
          ?expanded=${this.open}>
          ${!this.hasChips || this.#valueTextArray.length < 1 ? '' : html`
            <pf-chip-group label="${this.currentSelectionsLabel}">
              ${this.#valueTextArray.map(txt => html`
                <pf-chip id="chip-${txt}" @click=${() => this.#onChipClick(txt)}>${txt}</pf-chip>
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
              @keydown=${this.#onToggleKeydown}
              @input=${this.#onTypeaheadInput}
              @focus=${this.#onTypeaheadFocus}>
          `}
          <button 
            id="toggle-button" 
            aria-expanded="${!this.open ? 'false' : 'true'}" 
            aria-controls="listbox" 
            aria-haspopup="listbox"
            ?disabled=${this.disabled}
            @keydown=${this.#onToggleKeydown}
            @click=${this.#onToggleClick}>
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

  updated(changed: PropertyValues<this>) {
    if (changed.has('hasCheckboxes') && this.hasCheckboxes) {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }

    if (changed.has('typeahead') || changed.has('createOptionText')) {
      this.#updateCreateOptionText();
    }

    if (changed.has('open')) {
      this.#onOpenChanged();
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
    (this._input || this._toggle || this._listbox)?.focus();
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
   * inserts a create option into listbox
   */
  #addCreateOption() {
    if (!this.#createOption || this.#createOption?.userCreatedOption) {
      this.#createOption = document.createElement('pf-select-option');
      this.#updateCreateOptionValue();
      this.appendChild(this.#createOption);
    }
  }

  /**
   * handles chip's remove button clicking
   * @param txt chip text to be removed from values
   */
  #onChipClick(txt: string) {
    const [opt] = this.#selectedOptions.filter(option => option.optionText === txt.trim());
    if (opt) {
      // deselect chip
      opt.selected = false;
      this.requestUpdate();
      this._input?.focus();
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
   * handles listbox keydown event
   */
  #onListboxKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      event.stopImmediatePropagation();
      this.#close(true);
    }
  }

  /**
   * closes listbox and sets focus
   */
  async #close(force = false) {
    if (force || (!this.#focused && !this.#hovered)) {
      this.open = false;
      await this.updateComplete;
      this.focus();
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
      this.#close(true);
    } else if (this._input) {
      this._input.value = '';

      // set focus on input when a new chip is added
      if (this.hasChips) {
        this._input?.focus();
      }
    }
  }

  async #onOpenChanged() {
    if (this.open && !this.alwaysOpen) {
      await this.#float.show({
        placement: this.position,
        flip: this.enableFlip,
      });
    } else {
      await this.#float.hide();
    }

    /**
     * @fires open-change
     */
    this.dispatchEvent(new Event('open-change'));
  }

  /**
   * handles listbox option being created and creates a new "create option"
   */
  #onOptionCreated() {
    this.#addCreateOption();
    this.filter = '';
    this.#updateCreateOptionValue();
  }

  #onSelectBlur() {
    this.#focused = false;
    setTimeout(this.#close.bind(this, true), 300);
  }

  #onSelectFocus() {
    this.#focused = true;
  }

  #onSelectMouseout() {
    this.#hovered = false;
    setTimeout(this.#close.bind(this, false), 300);
  }

  #onSelectMouseover() {
    this.#hovered = true;
  }

  /**
   * handles toggle keydown event
   * @param event {KeyboardEvent}
   */
  async #onToggleKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!this.open) {
        this.open = true;
        await this.updateComplete;
      }
      if (this.open && this._listbox) {
        this._listbox.focus();
      }
    }
  }

  /**
   * handles toggle button click event
   */
  async #onToggleClick(event: MouseEvent) {
    this.open = !this.open;
    if (this.open && this._listbox) {
      event.preventDefault();
      event.stopImmediatePropagation();
      await this.updateComplete;
      this._listbox.focus();
    }
  }

  /**
   * handles typeahead combobox focus event
   */
  #onTypeaheadFocus() {
    this.open = true;
  }

  /**
   * handles typeahead combobox input event
   */
  #onTypeaheadInput() {
    // update the filter
    this.#updateCreateOptionValue(this._input?.value || '');
    if (this._listbox && this.filter !== this._input?.value) {
      this.filter = this._input?.value || '';
    }
  }

  /**
   * updates create option text to match input value
   */
  #updateCreateOptionText() {
    const optionText = `${this.#createOption.getAttribute('value') || ''}`;
    this.#createOption.innerHTML = optionText;
    const [optionExists] = (this.options || []).filter(option => {
      return option !== this.#createOption &&
        (optionText === option?.textContent || this.#createOption.getAttribute('value') === option?.getAttribute('value'));
    });
    const createOptionText = !this.typeahead || optionText === '' || !!optionExists ? '' : this.createOptionText;
    this.#createOption.createOptionText = createOptionText;
  }

  /**
   * updates create option value to match current filter
   */
  #updateCreateOptionValue(inputValue: string = this.filter) {
    let optionValue = inputValue || '';
    if (optionValue === '*') {
      optionValue = '';
    }
    this.#createOption.setAttribute('value', optionValue);
    this.#updateCreateOptionText();
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
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
