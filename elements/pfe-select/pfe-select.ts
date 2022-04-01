import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { bound, initializer, observed, pfelement } from '@patternfly/pfe-core/decorators.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-select.scss';

const isSelected = (el: { selected?: boolean }): boolean =>
  !!el.selected;

export class SelectChangeEvent extends ComposedEvent {
  constructor(
    /** The selected value */
    public value?: string
  ) {
    super('select');
  }
}

export interface PfeOption {
  text: string;
  value: string;
  selected: boolean;
}

/**
 * Select provides a way to create a stylized list of options for a form.
 *
 * @summary Organizes content in a contained view on the same page
 *
 * @slot - Place a `<select>` element with or without `<option>`s' here.
 *
 * @fires {SelectChangeEvent} select - When an item is selected.
 * @fires {CustomEvent<{ value: string }>} pfe-select:change {@deprecated Use `select`} The detail object contains the selected `value` - a string
 *
 * @cssprop --pfe-select--BackgroundColor          - Default `<pfe-select>` background color     {@default $pfe-color--ui--lightest}
 * @cssprop --pfe-select--BorderWidth              - Default `<pfe-select>` border width         {@default $pfe-var--ui--border-width}
 * @cssprop --pfe-select--BorderBottomWidth        - Default `<pfe-select>` border bottom width  {@default $pfe-var--ui--border-width}
 * @cssprop --pfe-select--BorderColor              - Default `<pfe-select>` border color         {@default $pfe-color--surface--lighter}
 * @cssprop --pfe-select--BorderBottomColor        - Default `<pfe-select>` border bottom color  {@default $pfe-color--surface--darker}
 * @cssprop --pfe-select--BorderBottomColor--hover - Border bottom color on `<pfe-select>` hover {@default $pfe-color--surface--ui-link}
 * @cssprop --pfe-select--BorderBottomColor--error - Border bottom color on `<pfe-select>` error {@default $pfe-color--feedback--critical}
 * @cssprop --pfe-select--BorderTop                - Default `<pfe-select>` border top           {@default $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor}
 * @cssprop --pfe-select--BorderLeft               - Default `<pfe-select>` border left          {@default $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor}
 * @cssprop --pfe-select--BorderRight              - Default `<pfe-select>` border right         {@default $pfe-var--pfe-select--BorderWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderColor}
 * @cssprop --pfe-select--BorderBottom             - Default `<pfe-select>` border bottom        {@default $pfe-var--pfe-select--BorderBottomWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderBottomColor}
 * @cssprop --pfe-select--BorderBottom--hover      - Border bottom on `<pfe-select>` hover       {@default $pfe-var--pfe-select--BorderBottomWidth $pfe-var--ui--border-style $pfe-var--pfe-select--BorderBottomColor--hover}
 * @cssprop --pfe-select--BackgroundColor          - Default `<pfe-select>` background color     {@default $pfe-color--ui--lightest}
 * @cssprop --pfe-select--Color                    - Default `<pfe-select>` color                {@default $pfe-color--text}
 */
@customElement('pfe-select') @pfelement()
export class PfeSelect extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Changes the color and width of border-bottom of `<pfe-select>`.
   *
   * When present, sets the border-bottom-color to `feedback--critical` theme color and border-bottom-width to 2px
   * When absent, sets the border-bottom-color to `surface--darker` theme color and border-bottom-width to default 1px
   */
  @observed
  @property({ type: Boolean, reflect: true }) invalid = false;

  @observed
  @property({ attribute: false }) options?: PfeOption[]|null;

  /** The selected value */
  get value() {
    return this._input?.value ?? '';
  }

  set value(value: string) {
    if (this._input) {
      this._input.value = value;
    }
  }

  /**
   * @deprecated Use `options`
   */
  get pfeOptions(): PfeOption[]|null {
    return this.options ?? null;
  }

  set pfeOptions(options: PfeOption[]|null) {
    this.options = options;
  }

  private logger = new Logger(this);

  private _options: PfeOption[]|null = null;

  private get _input() {
    return this.querySelector('select');
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.options) {
      this._modifyDOM();
    }
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  protected _optionsChanged(_: null, options: PfeOption[]|null) {
    this._options =
        (options?.filter(isSelected)?.length ?? 0) < 1 ? options
      : this._handleMultipleSelectedValues(options ?? []);
    this._modifyDOM();
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this._input) {
      this._input.removeEventListener('input', this._inputChanged);
    }
  }

  @initializer({ emptyWarning: 'The first child in the light DOM must be a supported select tag' })
  protected _init() {
    if (!this._input) {
      this.logger.warn(`The first child needs to be a select element`);
      return;
    }
    this._input.addEventListener('change', this._inputChanged);
  }

  protected _invalidChanged(_oldVal?: boolean, newVal?: boolean) {
    this.querySelector('select')?.setAttribute('aria-invalid', String(!!newVal));
  }

  private _handleMultipleSelectedValues(options: PfeOption[]) {
    // Warn if options array has more than one selected value set as true
    this.logger.warn(`The first 'selected' option will take precedence over others in case of multiple 'selected' options`);
    // Get the index of the first element with selected "true"
    const firstIndex = options.findIndex(el => el.selected);
    // Update the options array with precedence to first element with selected value as true
    options.forEach((el, i) => {
      el.selected = firstIndex === i;
    });
    return options;
  }

  @bound private _inputChanged() {
    const { value } = this;
    this.dispatchEvent(new SelectChangeEvent(value));
    this.dispatchEvent(deprecatedCustomEvent('pfe-select:change', { value }));
  }

  private _modifyDOM() {
    // Create select element
    const select = document.createElement('select');
    // Create option element for each element in options array
    // and add it to the select's options list
    for (const el of this.options ?? []) {
      select.add(Object.assign(document.createElement('option'), el), null);
    }

    // if select already exists in the DOM then replace the old select with the new _options array
    // Otherwise create a new select element
    if (this._input) {
      this._input.parentNode?.replaceChild(select, this._input);
    } else {
      this.appendChild(select);
    }
  }

  /** Reset the options by concatenating newly added options with previous options */
  addOptions(options: PfeOption[]) {
    this.options = this._options ? this._options.concat(options) : options;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-select': PfeSelect;
  }
}
