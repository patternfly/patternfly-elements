import type { TemplateResult, PropertyValueMap } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { BaseClipboardCopy } from './BaseClipboardCopy.js';
import styles from './pfe-clipboard-copy.scss';
import baseStyles from './BaseClipboardCopy.scss';
import '@patternfly/pfe-tooltip';

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

  @property({ type: String }) variant: ClipboardCopyVariant = 'inline';
  @property({ type: Boolean }) expanded = false;
  @property({ type: String }) hoverTip = 'Copy';
  @property({ type: String }) clickTip = 'Copied';
  @property({ type: Number }) entryDelay = 300;
  @property({ type: Number }) exitDelay = 1500;
  @property({ type: Boolean }) readonly = false;
  @property({ type: Boolean }) code = false;
  @state() _copied = false;

  /**
   * Togggle the dropdown element.
   */
  protected _dropdownClickHandler(): void {
    this.expanded = !this.expanded;
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
    return html`
      <div part="base" class=${classMap({ [`variant-${this.variant}`]: true })}>
        <div part="input-group">
          ${this.renderDropdownTrigger()}
          ${this.renderTextTarget()}
          ${this.renderActionButton()}
        </div>
        ${this.renderDropdown()}
      </div>
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

  protected renderActionButton() {
    return html`
      <pfe-tooltip part="tooltip">
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
        <span slot="content">
          <slot part="hover-tip" name="hover-tip" ?hidden=${this._copied}>${this.hoverTip}</slot>
          <slot part="click-tip" name="click-tip" ?hidden=${!this._copied}>${this.clickTip}</slot>
        </span>
      </pfe-tooltip>
    `;
  }

  protected renderTextTarget(): TemplateResult {
    return html`
      ${this.variant === 'expansion' || this.variant === 'inline' ? html`
        <input part="value-target form-input" ?disabled=${this.expanded ? true : this.readonly} .value=${this.value} @input=${this._valueChangeHandler}><slot name="value" hidden @slotchange=${this._onSlotChange}><slot></slot></slot></input>
      `
      : this.code ? html`
        <code part="value-target"><slot name="value"><slot></slot></slot></code>
      `
      : html`
        <div part="value-target"><slot name="value"><slot></slot></slot></div>
      `}
    `;
  }

  /**
   * Add the dropdown button for the expansion variant
   */
  protected renderDropdownTrigger() {
    return html`
      ${this.variant === 'expansion' ? html`
      <button part="action dropdown-action" @click=${this._dropdownClickHandler}>
        ${this.expanded ? html`
        <slot name="dropdown-button-opened">
          <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 320 512" aria-hidden="true" role="img"
            style="vertical-align: -0.125em;">
            <path
              d="M143 352.3L7 216.3c-9.4-9.4-9.4-24.6 0-33.9l22.6-22.6c9.4-9.4 24.6-9.4 33.9 0l96.4 96.4 96.4-96.4c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9l-136 136c-9.2 9.4-24.4 9.4-33.8 0z">
            </path>
          </svg>
        </slot>
        ` : html`
        <slot name="dropdown-button-closed">
          <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 256 512" aria-hidden="true" role="img"
            style="vertical-align: -0.125em;">
            <path
              d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z">
            </path>
          </svg>
        </slot>
        `}
      </button>
      ` : ''}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard-copy': PfeClipboardCopy;
  }
}
