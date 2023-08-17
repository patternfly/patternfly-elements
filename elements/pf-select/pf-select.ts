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
 * List of selectable items
 * @see {@link https://www.w3.org/WAI/ARIA/apg/patterns/listbox/|WAI-ARIA Listbox Pattern}
 * @slot - Place element content here
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
   * listbox button text when listbox selected option has no text
   */
  @property({ attribute: 'items-selected-text', type: String }) itemsSelectedText = 'items selected';

  /**
   * whether listbox is always open
   */
  @property({ attribute: 'always-open', type: Boolean }) alwaysOpen = false;

  /**
   * whether listbox is has checkboxes when `multi-select` is enabled
   */
  @property({ attribute: 'has-checkboxes', type: Boolean }) hasCheckboxes = false;

  /**
   * whether listbox is always expanded
   */
  @property({ attribute: 'expanded', type: Boolean }) expanded = false;


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
   * whether listbox is a combobox that supports typing
   */
  @property({ attribute: 'typeahead', type: Boolean }) typeahead = false;

  @query('pf-chip-group') private _chipGroup?: PfChipGroup;


  #valueText = '';
  #valueTextArray: string[] = [];
  #selectedOptions: PfSelectOption[] = [];

  get options() {
    return this.#listbox?.options;
  }

  get #listbox(): PfSelectListbox | null | undefined {
    return this.shadowRoot?.querySelector('#listbox');
  }

  get #input(): HTMLInputElement | null | undefined {
    return this.shadowRoot?.querySelector('#toggle-input');
  }

  set filter(filterText: string) {
    if (this.#listbox) {
      this.#listbox.filter = filterText;
    }
  }

  get filter() {
    return this.#listbox?.filter || '';
  }

  set value(optionsList: ListboxValue) {
    if (this.#listbox) {
      this.#listbox.value = optionsList;
    }
  }

  get value() {
    return this.#listbox?.value;
  }

  get #valueTextList() {
    return this.#valueTextArray.map(txt => txt.replace(',', '\\,')).join(', ');
  }

  get #buttonLabel() {
    return this.multiSelectable ?
      `${this.#valueTextArray.length} ${this.itemsSelectedText}`
      : !this.hasCheckboxes && this.multiSelectable && this.#valueTextList.length > 0 ?
        this.#valueTextList
        : !this.hasCheckboxes && !this.multiSelectable && this.#valueText.length > 0 ?
          this.#valueText
          : this.defaultText;
  }

  get hasBadge() {
    return !this.typeahead && this.hasCheckboxes && this.#selectedOptions.length > 0;
  }

  get hasChips() {
    return this.typeahead && this.multiSelectable;
  }

  render() {
    const { hasBadge, typeahead } = this;
    const offscreen = typeahead ? 'offscreen' : false;
    const badge = hasBadge ? 'badge' : false;
    return html`
    ${this.alwaysOpen ? '' : html`
      <div id="toggle" 
        ?disabled=${this.disabled} 
        ?expanded=${this.expanded}>
        ${!this.hasChips ? '' : html`
          <pf-chip-group label="option-selected">
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
            aria-autocomplete="both" 
            aria-expanded="${!this.expanded ? 'false' : 'true'}" 
            placeholder="${this.#buttonLabel}"
            role="combobox"
            @input=${this.#onTypeaheadInput}
            @focus="${this.#onTypeaheadInputFocus}">
        `}
        <button 
          id="toggle-button" 
          aria-expanded="${!this.expanded ? 'false' : 'true'}" 
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
        class="${this.hasCheckboxes ? 'show-checkboxes' : ''}"
        ?disabled=${this.disabled}
        ?hidden=${!this.alwaysOpen && (!this.expanded || this.disabled)}
        ?case-sensitive=${this.caseSensitive}
        ?disable-filter="${this.disableFilter}"
        ?match-anywhere=${this.matchAnywhere}
        ?multi-selectable=${this.multiSelectable || this.hasCheckboxes}
        @input=${this.#onListboxInput}
        @change=${this.#onListboxChange}>
        <slot></slot>
      </pf-select-listbox>
    `;
  }

  updated(changed: PropertyValues<this>) {
    if (changed.has('hasCheckboxes') && this.hasCheckboxes) {
      import('@patternfly/elements/pf-badge/pf-badge.js');
    }
  }

  focus() {
    const listbox = this.shadowRoot?.querySelector('pf-select-listbox');
    const toggle = this.shadowRoot?.querySelector('button');
    (toggle || listbox)?.focus();
  }

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

  #onChipClick(txt: string) {
    const [opt] = this.#selectedOptions.filter(option => option.optionText === txt);
    // remove chip value from select value
    if (Array.isArray(this.value)) {
      this.value = this.value.filter(option => option !== opt);
      this.#input?.focus();
    }
  }

  #onTypeaheadInput() {
    // update the filter
    if (this.#listbox && this.#input?.value && !this.#valueTextArray.includes(this.#input?.value) && this.filter !== this.#input?.value) {
      this.filter = this.#input?.value || '';
    }
  }

  #onListboxInput() {
    this.#updateValueText();
  }

  #onListboxChange() {
    this.#updateValueText();
    if (this.#input && this.#listbox) {
      if (!this.multiSelectable && this.#valueText !== this.#input?.value) {
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

  #onToggleClick() {
    this.expanded = !this.expanded;
  }

  #onTypeaheadInputFocus() {
    this.expanded = true;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-select': PfSelect;
  }
}
