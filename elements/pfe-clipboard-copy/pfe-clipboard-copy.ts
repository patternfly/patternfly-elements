import type { TemplateResult, PropertyValueMap } from 'lit';
import { html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { BaseClipboardCopy } from './BaseClipboardCopy.js';
import styles from './pfe-clipboard-copy.scss';
import baseStyles from './BaseClipboardCopy.scss';
import { ComposedEvent } from '@patternfly/pfe-core';
import '@patternfly/pfe-tooltip';

export type ClipboardCopyVariantExtended = (
  | 'inline'
  | 'inline-compact'
  | 'expansion'
)

export class ClipboardCopyCopiedEvent extends ComposedEvent {
  constructor(
    public text: string
  ) {
    super('copy');
  }
}

/**
 * Clipboard Copy
 * @slot - Place element content here
 */
@customElement('pfe-clipboard-copy')
export class PfeClipboardCopy extends BaseClipboardCopy {
  static readonly version = '{{version}}';

  static readonly styles = [baseStyles, styles];

  @property({ reflect: true }) variant: ClipboardCopyVariant = 'inline';
  @property({ type: Boolean }) expanded = false;
  @property({ type: String }) hoverTip = 'Copy';
  @property({ type: String }) clickTip = 'Copied';
  @property({ type: Number }) entryDelay = 300;
  @property({ type: Number }) exitDelay = 1500;
  @state() _copied = false;

  /* @property({ type: Boolean, reflect: true }) block = false; */
  /* @property({ type: Boolean, reflect: true }) code = false; */

  /**
   * Togggle the dropdown element.
   */
  protected _dropdownClickHandler(): void {
    this.expanded = !this.expanded;
  }

  protected override _copyToClipboard(): void {
    navigator.clipboard.writeText(this.value);
    this.dispatchEvent(new ClipboardCopyCopiedEvent(this.value));
    setTimeout(() => {
      this._copied = true;
    }, this.entryDelay);
    this._copied = true;
    setTimeout(() => {
      this._copied = false;
    }, this.exitDelay);
  }

  /**
   * Update computed properties
   */
  protected willUpdate(changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>): void {
    super.willUpdate(changedProperties);
    // Disable input if the dropdown is expanded
    // @todo make test for this
    if (changedProperties.has('expanded')) {
      this._disableInput = this.expanded ? true : this.readonly;
    }
    // Combine extended variant options with the base class
    if (changedProperties.has('variant')) {
      this._variant = this.variant === 'inline-compact' ? 'block' : 'input';
    }
  }

  /**
   * Add the dropdown button for the expansion variant
   */
  protected override renderDropdownTrigger() {
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

  /**
   * Add the dropdown area for the expansion variant
   */
  protected override renderDropdown() {
    return html`
      ${(this.variant === 'expansion' && this.expanded) ? html`
      <div part="dropdown">
        <textarea part="dropdown-textarea form-input" .value=${this.value} .disabled=${this.readonly}
          @input=${this._valueChangeHandler}></textarea>
      </div>
      ` : ''}
    `;
  }

  protected override renderActionButton() {
    const content = super.renderActionButton();
    return html`
      <pfe-tooltip part="tooltip">
        ${content}
        <span slot="content">
          <slot part="hover-tip" name="hover-tip" ?hidden=${this._copied}>${this.hoverTip}</slot>
          <slot part="click-tip" name="click-tip" ?hidden=${!this._copied}>${this.clickTip}</slot>
        </span>
      </pfe-tooltip>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-clipboard-copy': PfeClipboardCopy;
  }
}
