import type { TemplateResult, PropertyValueMap } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseClipboardCopy } from './BaseClipboardCopy.js';
import styles from './pfe-clipboard-copy.scss';
import baseStyles from './BaseClipboardCopy.scss';
import '@patternfly/pfe-tooltip';
import '@patternfly/pfe-button';

export type ClipboardCopyVariant = (
  | 'inline'
  | 'inline-compact'
  | 'expansion'
)

/**
 * Clipboard Copy
 * @slot - Place element content here
 */
@customElement('pfe-clipboard-copy')
export class PfeClipboardCopy extends BaseClipboardCopy {
  static readonly version = '{{version}}';

  static readonly styles = [baseStyles, styles];

  @property({ type: Boolean }) block = false;
  @property({ type: Boolean }) code = false;
  @property() clickTip = 'Copied';
  @property({ type: Boolean, reflect: true }) expanded = false;
  @property() hoverTip = 'Copy';
  @property({ type: Number }) entryDelay = 300;
  @property({ type: Number }) exitDelay = 1500;
  @property() textAriaLabel = 'Copyable input';
  @property() toggleAriaLabel = 'Show content';
  @property({ type: Boolean }) readonly = false;
  @property() variant: ClipboardCopyVariant = 'inline';
  // Extends value from base class
  @property() value = '';
  @state() _copied = false;

  /**
   * Togggle the dropdown element.
   */
  protected _dropdownClickHandler(): void {
    this.expanded = !this.expanded;
  }

  /**
   * Update the value property when it changes in the input.
   */
  protected _valueChangeHandler(e: Event): void {
    const { value } = e.target as HTMLInputElement || HTMLTextAreaElement;
    this.value = value;
  }

  protected firstUpdated(): void {
    this._onSlotChange();
  }

  /**
   * Slotchange callback.
   */
  protected _onSlotChange(): void {
    // Collect all text node from either the slot[name=value] or the default slot content.
    const children = [...this.childNodes].filter(i => (['value', '', null, false].includes(i?.getAttribute?.('slot') ?? false)));
    if (children.length > 0) {
      this.value = children.map(child => {
        // Get the textContent of each child
        let _text = child?.textContent;
        // Romove unecessary whitespace.
        // @todo This needs more comprehensive formatting to properly convert markup to text.
        _text = _text?.replace(/^[\s\\]*/gm, '') as string | null;
        return _text;
      }).join('');
    }
  }

  /**
   * Extends _copyToClipboard action from base class
   */
  protected override _copyToClipboard(): void {
    super._copyToClipboard();
    setTimeout(() => {
      this._copied = true;
    }, this.entryDelay);
    this._copied = true;
    setTimeout(() => {
      this._copied = false;
    }, this.exitDelay);
  }

  render() {
    /**
     * @todo fix the collapsed whitespace between the end of the "inline-compact" variant and the text node.
     * This demonstrates the collapsed whitespace issue.
     * The extra space between the closing slot tag and the closing template literal results in a collapsed whitespace.
     *
     * @example
     * return html`<slot></slot> `;
     */
    return html`<div part="base" class=${classMap({ [`variant-${this.variant}`]: true, block: this.block })}>
      ${this.variant === 'inline-compact' ? html`
        ${this.renderTextTarget()}
        ${this.renderActionButton()}
        <slot name="additional-actions"></slot>
      ` : html`
        <div part="input-group">
          ${this.renderDropdownTrigger()}
          ${this.renderTextTarget()}
          ${this.renderActionButton()}
          <slot name="additional-actions"></slot>
        </div>
        ${this.renderDropdown()}
      `}
      </div>
    `;
  }

  /**
   * Add the dropdown button for the expansion variant
   */
  protected renderDropdownTrigger() {
    return html`
      ${this.variant === 'expansion' ? html`
      <pfe-button variant="control" part="button dropdown-button">
        <button @click=${this._dropdownClickHandler} aria-label=${this.textAriaLabel}>
          ${this.expanded ? html`
          <slot name="dropdown-button-opened-icon">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 320 512" aria-hidden="true" role="img"
              style="vertical-align: -0.125em;">
              <path
                d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z">
              </path>
            </svg>
          </slot>
          ` : html`
          <slot name="dropdown-button-closed-icon">
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img"
              style="vertical-align: -0.125em;">
              <path
                d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z">
              </path>
            </svg>
          </slot>
          `}
        </button>
      </pfe-button>
      ` : ''}
    `;
  }

  protected renderTextTarget(): TemplateResult {
    return html`
      ${this.variant === 'expansion' || this.variant === 'inline' ? html`
        <input part="value form-input" ?disabled=${this.expanded ? true : this.readonly} .value=${this.value} @input=${this._valueChangeHandler} aria-label=${this.textAriaLabel}><slot name="value" hidden @slotchange=${this._onSlotChange}><slot></slot></slot></input>
      `
      : this.code ? html`
        <code part="value"><slot name="value"><slot></slot></slot></code>
      `
      : html`
        <span part="value"><slot name="value"><slot></slot></slot></span>
      `}
    `;
  }

  protected renderActionButton() {
    const buttonPlain = this.variant === 'inline-compact';
    const buttonVariant = this.variant === 'inline-compact' ? 'primary' : 'control';
    return html`
      <pfe-tooltip part="tooltip">
        <pfe-button ?plain=${buttonPlain} variant=${buttonVariant} part="button copy-button">
          <button aria-label="${this.hoverTip}" @click=${this._copyToClipboard}>
            <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 448 512" aria-hidden="true" role="img" style="vertical-align: -0.125em;">
              <path d="M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z"> </path>
            </svg>
          </button>
        </pfe-button>
        <span slot="content">
          <slot part="hover-tip" name="hover-tip" ?hidden=${this._copied}>${this.hoverTip}</slot>
          <slot part="click-tip" name="click-tip" ?hidden=${!this._copied}>${this.clickTip}</slot>
        </span>
      </pfe-tooltip>
    `;
  }

  protected renderDropdown() {
    return html`
      ${(this.variant === 'expansion' && this.expanded) ? html`
      <div part="dropdown">
        <textarea part="dropdown-textarea form-input" .value=${this.value} .disabled=${this.readonly}
          @input=${this._valueChangeHandler}></textarea>
      </div>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard-copy': PfeClipboardCopy;
  }
}
