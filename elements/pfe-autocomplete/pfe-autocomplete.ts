import type { DroplistSelectEvent, PfeSearchDroplist } from './pfe-search-droplist.js';
import type { ColorPalette, ColorTheme } from '@patternfly/pfe-core';

import { LitElement, html } from 'lit';
import { customElement, property, state, query } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, colorContextConsumer, colorContextProvider, deprecation } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import './pfe-search-droplist.js';

import style from './pfe-autocomplete.scss';

export type AutocompleteRequestFunction =
  (params: { query: string }, callback: (response: string[]) => void) => void;

export class AutocompleteClearEvent extends ComposedEvent {
  constructor() {
    super('clear');
  }
}

export class AutocompleteShowEvent extends ComposedEvent {
  constructor() {
    super('show');
  }
}

/** Fired when the user submits the autocomplete input */
export class AutocompleteSearchEvent extends ComposedEvent {
  constructor(
    /** The search query */
    public value: string
  ) {
    super('search');
  }
}

/** Fired when the user selects an option from the dropdown */
export class AutocompleteSelectEvent extends ComposedEvent {
  constructor(
    /** The selected value */
    public value: string
  ) {
    super('select');
  }
}

function isInputElement(el: Element): el is HTMLInputElement {
  return el?.tagName?.toLowerCase?.() === 'input';
}

// use this variable to debounce api call when user types very fast
let throttle = false;

/**
 * Autocomplete provides options in a dropdown list as user types in an input box by
 * showing result from an API call or a static list.
 *
 * @summary Provides options in a dropdown list as user types in an input box
 *
 * @slot - Users must slot a single `<input>` element in to `<pfe-autocomplete>`
 *
 * @fires {AutocompleteShowEvent} show - When the search dropdown is shown
 * @fires {Event} pfe-autocomplete:options-shown - When the search dropdown is shown {@deprecated Use `show`}
 *
 * @fires {AutocompleteClearEvent} clear - Fires when a user clears the input field using the clear button.
 * @fires {CustomEvent<{ searchValue: '' }>} pfe-autocomplete:option-cleared -
 *                                           When the search dropdown is cleared
 *                                           ```js
 *                                           detail: {
 *                                             searchValue: ''
 *                                           }
 *                                           ```
 *                                           {@deprecated Use `clear`}
 *
 * @fires {AutocompleteSearchEvent} search
 *        Fires when a user performs search. By listening to this event you can get
 *        selected phrase by getting `event.value`.
 *
 * @fires {CustomEvent<{ searchValue: string }>} pfe-autocomplete:search-event
 *        Fires when a user performs search. By listening to this event you can get
 *        selected phrase by getting `e.detail.searchValue`.
 *        {@deprecated Use `search`}
 *
 * @fires {AutocompleteSelectEvent} select - Fires when a user selects an option from the dropdown list.
 * @fires {CustomEvent<{ optionValue: '' }>} pfe-autocomplete:option-selected
 *        Fires when a user selects an option from the dropdown list.
 *        ```js
 *        detail: {
 *          optionValue: String
 *        }
 *        ```
 *        {@deprecated Use `select`}
 *
 * @csspart {HTMLElement} container - The input wrapper
 * @csspart {SVGElement} icon - The loading icon
 * @csspart {HTMLButtonElement} clear-button - The clear button
 * @csspart {HTMLButtonElement} search-button - The search button
 * @csspart {PfeSearchDroplist} droplist - The search droplist
 * @csspart {PfeButton} text-search-button - The textual search button
 *                      Shown when [button-text] attr provided
 */
@customElement('pfe-autocomplete') @pfelement()
export class PfeAutocomplete extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true };

  /**
   * Sets color palette, which affects the element's styles as well as descendants' color theme.
   * Overrides parent color context.
   * Your theme will influence these colors so check there first if you are seeing inconsistencies.
   * See [Color](https://patternflyelements.org/theming/colors/) for default values
   */
  @colorContextProvider()
  @property({ reflect: true, attribute: 'color-palette' }) colorPalette?: ColorPalette;

  /** @deprecated use `color-palette` */
  @deprecation({ alias: 'colorPalette', attribute: 'color' }) color?: ColorPalette;

  /**
   * Sets color theme based on parent context
   */
  @colorContextConsumer()
  @property({ reflect: true }) on: ColorTheme = 'light';


  /**
   * Set this attribute when you want to set a value in input box when web component is added to page.
   */
  @observed
  @property({ attribute: 'init-value', reflect: true }) initValue = '';

  /**
   * If you add this attribute on element, a loading icon is added in input box.
   * Add this attribute before the autocomplete API call and remove it
   * when the response is ready.
   */
  @property({ type: Boolean, reflect: true }) loading = false;

  /**
   * Add this attribute to disable the element.
   * By adding this attribute input box and buttons become disabled.
   */
  @observed
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** @deprecated use `disabled` */
  @observed
  @property({ attribute: 'is-disabled', type: Boolean }) isDisabled?: boolean;

  /**
   * Users may type very fast. We allow to input box value changes trigger the
   * autocomplete API call only once per debounce period.
   * This attribute is optional. By default, it is set t0 300ms.
   */
  @property({ type: Number, reflect: true }) debounce = 300;

  /** By observing `selected-value` attribute you can detect autocomplete selected value. */
  @property({ reflect: true, attribute: 'selected-value' }) selectedValue?: string;

  /**
   * Set when you want to have a textual search button to the right of the input field.
   * The text in the button will contain the value you pass to the attribute.
   * If an empty string (`button-text=""`) or no string (`button-text`) is provided,
   * the text will default to "Search".
   */
  @observed
  @property({ attribute: 'button-text', reflect: true }) buttonText?: string;

  /** The list of search dropdown items */
  @property({ attribute: false }) data: string[] = [];

  /**
   * Optional translated string you provide for the [ARIA Live Region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)
   * which will politely announce that the number of options the user can
   * select from as the autocomplete displays options.
   *
   * The default template is `"There are ${numOptions} suggestions. Use the up and down arrows to browse."`
   * `${numOptions}` will be dynamically replaced with the number of options that are shown.
   */
  // @TODO: Confirm this is translatable
  @property({ attribute: 'announce-template', reflect: true })
    announceTemplate = 'There are ${numOptions} suggestions. Use the up and down arrows to browse.';

  /**
   * @deprecated {use 'announce-template'}
   */
  @property({ attribute: 'aria-announce-template' })
  get ariaAnnounceTemplate() {
    return this.announceTemplate;
  }

  set ariaAnnounceTemplate(v) {
    this.announceTemplate = v;
  }

  @state() private activeIndex: number|null = null;

  @state() private showTextualSearch = false;

  @query('slot') private _slot?: HTMLSlotElement;

  @query('#dropdown') private _dropdown?: PfeSearchDroplist;

  private _input?: HTMLInputElement;

  #logger = new Logger(this);

  constructor() {
    super();

    this.addEventListener('keyup', this._inputKeyUp);

    // these two events, fire search
    this.addEventListener('pfe-autocomplete:search-event', this._closeDroplist);
    // this.addEventListener('pfe-autocomplete:option-selected', this._optionSelected);
  }

  connectedCallback() {
    this._inputInit();
    super.connectedCallback();
  }

  render() {
    const searchButtonsDisabled =
      this.disabled || !(this._input?.value !== '' && !this._input?.hasAttribute?.('disabled'));
    const iconHidden = !this.loading || this._input?.value === '';
    return html`
      <div id="wrapper" part="container">
        <div id="input-box-wrapper">
          <!-- Input box -->
          <slot @slotchange="${this._inputInit}"></slot>

          <!-- loading icon -->
          <span class="loading" aria-hidden="${String(iconHidden) as 'true'|'false'}" ?hidden="${iconHidden}">
            <svg viewBox="0 0 40 40" enable-background="new 0 0 40 40" part="icon">
              <path opacity="0.2" fill="#000"
                d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z" />
              <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                C22.32,8.481,24.301,9.057,26.013,10.047z">
                <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 20 20" to="360 20 20"
                  dur="0.5s" repeatCount="indefinite" />
              </path>
            </svg>
          </span>

          <!-- clear search button -->
          <button class="clear-search"
              type="button"
              part="clear-button"
              aria-label="clear search query"
              ?disabled="${this.disabled}"
              ?hidden="${!this._input?.value}"
              @click="${this._clear}">
            <svg viewBox="0 0 40 40" enable-background="new 0 0 40 40">
              <line x1="5" y1="5" x2="35" y2="35" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10"></line>
              <line x1="35" y1="5" x2="5" y2="35" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10"></line>
            </svg>
          </button>

          <!-- Search button -->
          <button class="search-button"
              type="button"
              part="search-button"
              aria-label="Search"
              ?disabled="${!this._input?.value || this.disabled}"
              ?hidden="${this.showTextualSearch}"
              @click="${this._search}">
            <svg viewBox="0 0 512 512">
              <path d="M256.233,5.756c-71.07,15.793-141.44,87.863-155.834,159.233c-11.495,57.076,0.3,111.153,27.688,154.335L6.339,441.172
            c-8.596,8.596-8.596,22.391,0,30.987l33.286,33.286c8.596,8.596,22.391,8.596,30.987,0L192.26,383.796
            c43.282,27.688,97.559,39.683,154.734,28.188c79.167-15.893,142.04-77.067,159.632-155.934
            C540.212,104.314,407.968-27.93,256.233,5.756z M435.857,208.37c0,72.869-59.075,131.944-131.944,131.944
            S171.969,281.239,171.969,208.37S231.043,76.426,303.913,76.426S435.857,135.501,435.857,208.37z" />
            </svg>
          </button>
        </div>
        <pfe-search-droplist id="dropdown"
            part="droplist"
            exportparts="listbox,option,${this.data.map((_, i) => `item-index-${i}`).join(',')}"
            @select="${this._optionSelected}"
            .announceTemplate="${this.announceTemplate}"
            .activeIndex="${this.activeIndex}"
            .data="${this.data}"
        ></pfe-search-droplist>
      </div>

      <!-- Search button (when [button-text] attr provided) -->
      <pfe-button class="search-button--textual"
          part="text-search-button"
          ?hidden="${!this.showTextualSearch || searchButtonsDisabled}"
          @click="${this._search}">
        ${this.buttonText || 'Search'}
      </pfe-button>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this._input) {
      this._input.removeEventListener('input', this._inputChanged);
      this._input.removeEventListener('blur', this._closeDroplist);
    }
  }

  private async _inputInit() {
    await this.updateComplete;
    // input box
    const slotElems = this._slot?.assignedElements() as HTMLInputElement[] ?? [];

    if (slotElems.length === 0) {
      return this.#logger.error('There must be a input tag in the light DOM');
    }

    if (slotElems.length > 1 || slotElems.some(x => !isInputElement(x))) {
      return this.#logger.error('The only child in the light DOM must be an input tag');
    }

    [this._input] = slotElems;

    this._input.addEventListener('input', this._inputChanged);
    this._input.addEventListener('blur', this._closeDroplist);

    this._input.setAttribute('role', 'combobox');

    if (!this._input.hasAttribute('aria-label')) {
      this._input.setAttribute('aria-label', 'Search');
    }

    this._input.setAttribute('aria-autocomplete', 'list');
    this._input.setAttribute('aria-haspopup', 'true');
    this._input.setAttribute('aria-owns', 'droplist-items');
    this._input.setAttribute('aria-controls', 'droplist-items');
    this._input.setAttribute('aria-expanded', 'false');
    this._input.setAttribute('type', 'search');
    this._input.setAttribute('autocomplete', 'off');
    this._input.setAttribute('autocorrect', 'off');
    this._input.setAttribute('autocapitalize', 'off');
    this._input.setAttribute('spellcheck', 'false');
    this._isDisabledChanged();
    this._disabledChanged();
  }

  protected _initValueChanged(_oldVal: string|undefined, newVal: string) {
    // set inputbox and buttons in the inner component
    if (newVal && this._input) {
      this._input.value = newVal;
    }
  }

  protected _isDisabledChanged() {
    const deprecated = this.isDisabled;
    if (deprecated != null && this.disabled !== deprecated) {
      this.disabled = !!deprecated;
    }
  }

  protected _disabledChanged() {
    this._input?.toggleAttribute?.('disabled', this.disabled);
  }


  protected _buttonTextChanged(oldVal: string, newVal: string) {
    if (oldVal === null) {
      this.showTextualSearch = false;
    } else if (newVal === null || newVal === '') {
      this.showTextualSearch = false;
    }
  }

  @bound private _inputChanged() {
    if (this._input?.value === '') {
      return this._reset();
    }

    if (throttle === false) {
      throttle = true;

      window.setTimeout(() => {
        this._sendAutocompleteRequest(this._input?.value ?? '');
        throttle = false;
      }, this.debounce);
    }
    this.requestUpdate();
  }

  @bound private async _clear() {
    if (this._input) {
      this._closeDroplist();
      this._input.value = '';
      this.requestUpdate();
      await this.updateComplete;
      this._input.focus();
    }
    this.dispatchEvent(deprecatedCustomEvent('pfe-autocomplete:option-cleared', { searchValue: '' }));
    this.dispatchEvent(new AutocompleteClearEvent());
  }

  @bound private _search() {
    this._doSearch(this._input?.value);
  }

  @bound private async _closeDroplist() {
    if (this._dropdown) {
      this._dropdown.open = false;
    }
    this.activeIndex = null;
    this._input?.setAttribute('aria-expanded', 'false');
  }

  @bound private _openDroplist() {
    this.activeIndex = null;
    if (this._dropdown) {
      this._dropdown.open = true;
    }
    this.dispatchEvent(deprecatedCustomEvent('pfe-autocomplete:options-shown'));
    this.dispatchEvent(new AutocompleteShowEvent());
    this._input?.setAttribute?.('aria-expanded', 'true');
  }

  private _optionSelected(e: DroplistSelectEvent) {
    const { value: optionValue } = e;

    // update input box with selected value from options list
    if (this._input) {
      this._input.value = optionValue;
    }

    // send search request
    this._doSearch(optionValue);
  }

  @bound private async _doSearch(searchValue = '') {
    this.dispatchEvent(deprecatedCustomEvent('pfe-autocomplete:search-event', { searchValue }));
    this.dispatchEvent(new AutocompleteSearchEvent(searchValue));
    await this._reset();
    this.selectedValue = searchValue;
  }

  private _sendAutocompleteRequest(input: string) {
    this.autocompleteRequest?.({ query: input }, this._autocompleteCallback);
  }

  @bound private async _autocompleteCallback(response: string[]) {
    this.data = response;
    if (this._dropdown) {
      this._dropdown.reflow = true;
    }

    await this.updateComplete;

    if (response.length) {
      this._openDroplist();
    } else {
      this._closeDroplist();
    }
  }

  private async _reset() {
    await this.updateComplete;
    if (!this._dropdown || !this._input) {
      throw new Error('Unexpected Error');
    }
    this.activeIndex = null;
    this._input.setAttribute('aria-activedescendant', '');
    this.data = [];
    this._closeDroplist();
    this.requestUpdate();
    await this.updateComplete;
  }

  /**
   * Returns the text content of the active element
   * @param  activeIndex Index of an element in the droplist
   * @return  The text content inside of the given index as a string
   */
  private _activeOption(activeIndex: number|null) {
    if (typeof activeIndex === 'number') {
      return this._dropdown?.shadowRoot?.querySelector?.(`li:nth-child(${activeIndex + 1})`)?.textContent ?? '';
    }
  }

  /**
   * Handle keyboard input, we care about arrow keys, enter, and escape
   */
  @bound private async _inputKeyUp(e: KeyboardEvent) {
    const { key } = e;

    if (!this._input || !this._dropdown) {
      throw new Error('Unexpected error');
    }

    // Check to see if it's a key we care about
    if (
      this.data.length === 0 &&
      key !== 'ArrowDown' &&
      key !== 'ArrowUp' &&
      key !== 'Enter' &&
      key !== 'Escape'
    ) {
      return;
    }

    let { activeIndex } = this;
    const optionsLength = this.data.length;

    switch (key) {
      case 'Escape':
        this._closeDroplist();
        break;
      case 'ArrowUp':
        if (!this._dropdown.open) {
          return;
        }

        activeIndex = activeIndex === null ? optionsLength : activeIndex;

        activeIndex -= 1;

        // Go to the last item if we're at -1 index
        if (activeIndex < 0) {
          activeIndex = optionsLength - 1;
        }

        // Get the text content of the active element
        this._input.value = this._activeOption(activeIndex) ?? '';
        break;
      case 'ArrowDown':
        if (!this._dropdown.open) {
          return;
        }

        activeIndex = activeIndex === null ? -1 : activeIndex;
        activeIndex += 1;

        if (activeIndex > optionsLength - 1) {
          activeIndex = 0;
        }

        // Go to the last item if we're at -1 index
        this._input.value = this._activeOption(activeIndex) ?? '';
        break;
      case 'Enter': {
        const optionValue = this._activeOption(activeIndex);
        if (optionValue) {
          this.dispatchEvent(deprecatedCustomEvent('pfe-autocomplete:option-selected', { optionValue }));
          this.dispatchEvent(new AutocompleteSelectEvent(optionValue));
        } else {
          this._doSearch(this._input.value);
        }

        return;
      }
    }

    if (activeIndex !== null) {
      this._input.setAttribute('aria-activedescendant', `option-${activeIndex}`);
    } else {
      // QUESTION: removeAttribute?
      this._input.setAttribute('aria-activedescendant', '');
    }

    this.activeIndex = activeIndex;
  }

  /**
   * Optional callback to asynchronously return search items
   * @param params User input
   * @param callback Call with resolved search items to populate the list
   */
  declare autocompleteRequest?: AutocompleteRequestFunction;

  /** Clear the search dropdown */
  async clear() {
    await this._clear();
  }

  /** Perform the search */
  search() {
    this._search();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-autocomplete': PfeAutocomplete;
  }
}
