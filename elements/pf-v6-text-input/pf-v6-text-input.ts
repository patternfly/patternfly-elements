import { LitElement, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import styles from './pf-v6-text-input.css';

export type TextInputType =
  | 'text'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'month'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'time'
  | 'url';

export type TextInputValidated = 'success' | 'warning' | 'error';

/**
 * A **text input** is used to gather free-form text from a user.
 * Use `pf-v6-text-input` for single-line text entry in forms.
 * MUST have an accessible name via `<label>` or `accessible-label` attribute.
 * Participates in native form submission via Form-Associated Custom Element (FACE).
 * Keyboard: Press Enter to submit the parent form (when valid).
 *
 * @summary Single-line text input with validation states and icon support
 *
 * @fires {Event} change - Fires when the input value changes (on blur or Enter).
 *        Cancelable: call `preventDefault()` to reject the value change.
 */
@customElement('pf-v6-text-input')
export class PfV6TextInput extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  override createRenderRoot(): ShadowRoot {
    const root = super.createRenderRoot() as ShadowRoot;
    // Progressive enhancement: when referenceTarget is supported,
    // external <label for="host-id"> and aria-describedby references transparently
    // resolve to the internal <input>. Browsers without support fall back to
    // aria-label string copy via computedLabelText in willUpdate().
    if (!isServer && 'referenceTarget' in root) {
      (root as ShadowRoot & { referenceTarget: string }).referenceTarget = 'input';
      this.#hasReferenceTarget = true;
    }
    return root;
  }

  /** Type that the input accepts. */
  @property({ reflect: true }) type?: TextInputType;

  /**
   * Validation state indicator.
   * When set to `success`, `warning`, or `error`, a status icon appears
   * and the border color changes accordingly. `error` also sets `aria-invalid`.
   */
  @property({ reflect: true }) validated?: TextInputValidated;

  /** Accessible label for the input when no `<label>` element is provided. */
  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Flag to show if the input is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Flag to show if the input is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Flag to show if the input is read only. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** When combined with `readonly`, renders with no visible border or background. */
  @property({ type: Boolean, reflect: true }) plain = false;

  /** Controls text truncation direction for overflowing content. */
  @property({ reflect: true }) truncated?: 'start';

  /** Regular expression the value must match for constraint validation. */
  @property() pattern?: string;

  /** Input placeholder. */
  @property() placeholder?: string;

  /** Value of the input. */
  @property() value = '';

  /** Maximum number of characters allowed. */
  @property({ type: Number, attribute: 'maxlength' }) maxLength?: number;

  /** Minimum number of characters required. */
  @property({ type: Number, attribute: 'minlength' }) minLength?: number;


  /** Hint for the virtual keyboard layout on touch devices. */
  @property({ attribute: 'inputmode' }) override inputMode = '';

  #internals = InternalsController.of(this);

  #slots = new SlotController(this, 'icon');

  #hasReferenceTarget = false;

  #derivedLabel = '';

  #touched = false;

  get #disabled() {
    return (!isServer && this.matches(':disabled')) || this.disabled;
  }

  get #input() {
    return this.shadowRoot?.getElementById('input') as HTMLInputElement ?? null;
  }

  get labels(): NodeListOf<HTMLLabelElement> {
    return this.#internals.labels as NodeListOf<HTMLLabelElement>;
  }

  override willUpdate(): void {
    // Fallback: copies external label text to aria-label on the inner input.
    // Skipped when referenceTarget is active (browser resolves natively).
    if (this.#hasReferenceTarget) {
      this.#derivedLabel = this.accessibleLabel || '';
    } else {
      this.#derivedLabel = this.accessibleLabel || this.#internals.computedLabelText;
    }
    this.#internals.ariaInvalid = this.validated === 'error' ? 'true' : null;
    this.#internals.setFormValue(this.value || null);
  }

  get #isInvalid(): boolean {
    return this.validated === 'error'
      || (!isServer && !this.#internals.validity.valid);
  }

  override render(): TemplateResult<1> {
    const hasStatusIcon = this.validated === 'success'
      || this.validated === 'warning'
      || this.#isInvalid;
    const statusMessage = this.#getStatusMessage();
    const classes = {
      'disabled': this.#disabled,
      'readonly': this.readonly,
      'plain': this.plain,
      'start-truncated': this.truncated === 'start',
      'success': this.validated === 'success',
      'warning': this.validated === 'warning',
      'error': this.#isInvalid,
    };

    return html`
      <div id="container" class="${classMap(classes)}">
        <input id="input"
               .placeholder="${this.placeholder ?? ''}"
               .value="${this.value}"
               pattern="${ifDefined(this.pattern)}"
               maxlength="${ifDefined(this.maxLength)}"
               minlength="${ifDefined(this.minLength)}"
               inputmode="${ifDefined(this.inputMode)}"
               @input="${this.#onInput}"
               @change="${this.#onChange}"
               @keydown="${this.#onKeydown}"
               ?disabled="${this.#disabled}"
               ?readonly="${this.readonly}"
               ?required="${this.required}"
               aria-label="${ifDefined(this.#derivedLabel || undefined)}"
               aria-invalid="${ifDefined(this.#isInvalid ? 'true' : undefined)}"
               aria-describedby="${ifDefined(statusMessage ? 'status-message' : undefined)}"
               type="${ifDefined(this.type)}">
        <span id="utilities"
              ?hidden="${this.#slots.isEmpty('icon') && !hasStatusIcon}">
          <!-- summary: Custom icon content -->
        <slot name="icon"></slot>
          ${!hasStatusIcon ? '' : html`
          <span id="status-icon">${this.#renderStatusIcon()}</span>`}
        </span>
        <span id="status-message"
              role="${ifDefined(this.#isInvalid ? 'alert' : undefined)}"
              aria-live="${ifDefined(this.#isInvalid ? 'assertive' : undefined)}"
              ?hidden="${!statusMessage}">${statusMessage}</span>
      </div>
    `;
  }

  #getStatusMessage(): string {
    if (this.#isInvalid) {
      return this.#internals.validationMessage;
    }
    return '';
  }

  #renderStatusIcon(): TemplateResult<1> | string {
    if (this.#isInvalid && this.validated !== 'error') {
      return html`<svg role="presentation" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`;
    }
    switch (this.validated) {
      case 'success':
        return html`<svg role="presentation" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`;
      case 'warning':
        return html`<svg role="presentation" fill="currentColor" height="1em" width="1em" viewBox="0 0 576 512"><path d="M569.517 440.013C587.975 472.007 564.806 512 527.94 512H48.054c-36.937 0-59.999-40.055-41.577-71.987L246.423 23.985c18.467-32.009 64.72-31.951 83.154 0l239.94 416.028zM288 354c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`;
      case 'error':
        return html`<svg role="presentation" fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512"><path d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zm-248 50c-25.405 0-46 20.595-46 46s20.595 46 46 46 46-20.595 46-46-20.595-46-46-46zm-43.673-165.346l7.418 136c.347 6.364 5.609 11.346 11.982 11.346h48.546c6.373 0 11.635-4.982 11.982-11.346l7.418-136c.375-6.874-5.098-12.654-11.982-12.654h-63.383c-6.884 0-12.356 5.78-11.981 12.654z"/></svg>`;
      default:
        return '';
    }
  }

  #onInput(event: Event & { target: HTMLInputElement }) {
    this.value = event.target.value;
    if (this.#touched && !this.#internals.validity.valid) {
      this.#setValidityFromInput();
    }
    this.#touched = true;
  }

  #onChange() {
    const previous = this.value;
    if (!this.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }))) {
      this.value = previous;
    }
  }

  #onKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'Enter':
        if (this.reportValidity()) {
          this.#internals.form?.requestSubmit();
        }
    }
  }


  #setValidityFromInput() {
    this.#internals.setValidity(
      this.#input?.validity,
      this.#input?.validationMessage,
    );
    this.requestUpdate();
  }

  async formStateRestoreCallback(state: string, mode: string): Promise<void> {
    if (mode === 'restore') {
      this.value = state;
      this.requestUpdate();
      await this.updateComplete;
      this.#setValidityFromInput();
    }
  }

  async formDisabledCallback(): Promise<void> {
    await this.updateComplete;
    this.requestUpdate();
  }

  formResetCallback(): void {
    this.value = '';
    this.requestUpdate();
  }

  setCustomValidity(message: string): void {
    this.#internals.setValidity(message ? { customError: true } : {}, message);
    this.requestUpdate();
  }

  checkValidity(): boolean {
    this.#setValidityFromInput();
    const validity = this.#internals.checkValidity();
    this.requestUpdate();
    return validity;
  }

  reportValidity(): boolean {
    this.#setValidityFromInput();
    return this.#internals.reportValidity();
  }

  select(): void {
    this.#input?.select();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-v6-text-input': PfV6TextInput;
  }
}
