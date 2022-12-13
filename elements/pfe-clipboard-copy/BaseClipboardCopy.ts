import { LitElement, html } from 'lit';
import type { TemplateResult, PropertyValueMap } from 'lit';
import { property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import styles from './BaseClipboardCopy.scss';

export type ClipboardCopyBaseVariant = (
  | 'input'
  | 'block'
)

/**
 * Clipboard Copy
 * @slot - Place element content here
 */
export abstract class BaseClipboardCopy extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [styles];

  @property({ type: Boolean }) readonly = false;
  @property({ type: String }) value = '';
  @property({ type: Boolean }) code = false;
  @state() _disableInput = this.readonly;
  @state() _variant: ClipboardCopyBaseVariant = 'input';
  @state() _classes = {};

  #onSlotChange() {
    // Get children that are using the content or default slot.
    const children = [...this.childNodes].filter(i => (['content', '', null, false].includes(i?.getAttribute?.('slot') ?? false)));
    if (children.length > 0) {
      // Format the children
      this.value = children.map(child => {
        let _text = child?.textContent;
        _text = _text?.replace(/^[\s\\]*/gm, '') as string | null;
        return _text;
      }).join('');
    }
  }

  protected firstUpdated(): void {
    this.#onSlotChange();
  }

  /**
   * Copy the current value to the clipboard.
   */
  protected abstract _copyToClipboard(e: Event): void;

  /**
   * Update the value property when it changes in the input.
   */
  protected _valueChangeHandler(e: Event): void {
    const { value } = e.target as HTMLInputElement || HTMLTextAreaElement;
    this.value = value;
  }

  /**
   * Placeholder area for dropdown button.
   */
  protected abstract renderDropdownTrigger(): TemplateResult;

  /**
   * Placeholder area for dropdown area.
   */
  protected abstract renderDropdown(): TemplateResult;

  /**
   * Render action button.
   */
  protected renderActionButton(): TemplateResult {
    return html`
      <button part="action" @click=${this._copyToClipboard}>
        <slot name="action">
          <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img"
            style="vertical-align: -0.125em;">
            <path
              d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z">
            </path>
          </svg>
        </slot>
      </button>
    `;
  }

  protected renderTextTarget(): TemplateResult {
    return html`
      ${this._variant === 'input' ? html`
        <input part="content-target form-input" ?disabled=${this._disableInput} .value=${this.value} @input=${this._valueChangeHandler}><slot name="content" hidden @slotchange=${this.#onSlotChange}><slot></slot></slot></input>
      `
      : this.code ? html`
        <code part="content-target"><slot name="content"><slot></slot></slot></code>
      `
      : html`
        <div part="content-target"><slot name="content"><slot></slot></slot></div>
      `}
    `;
  }

  /**
   * Update computed properties
   */
  protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    if (changedProperties.has('readonly')) {
      this._disableInput = this.readonly;
    }
    this._classes = { [`variant-${this._variant}`]: true };
  }

  override render() {
    return html`
      <div part="base" class=${classMap(this._classes)}>
        <div part="input-group">
          ${this.renderDropdownTrigger()}
          ${this.renderTextTarget()}
          ${this.renderActionButton()}
        </div>
        ${this.renderDropdown()}
      </div>
    `;
  }
}
