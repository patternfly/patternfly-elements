import { LitElement, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { styleMap } from 'lit/directives/style-map.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-text-input.css';

/**
 * A **text input** is used to gather free-form text from a user.
 * @alias Text Input
 */
@customElement('pf-text-input')
export class PfTextInput extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Trim text on left */
  @property({ type: Boolean, reflect: true, attribute: 'left-truncated' }) leftTruncated = false;

  /**
   * Value to indicate if the input is modified to show that validation state.
   * If set to success, input will be modified to indicate valid state.
   * If set to warning,  input will be modified to indicate warning state.
   * Invalid inputs will display an error state
   */
  @property({ reflect: true }) validated?: 'success' | 'warning';

  /** icon variant */
  @property({ reflect: true }) icon?: 'calendar' | 'clock' | 'search';

  /** Accessible label for the input when no `<label>` element is provided. */
  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel?: string;

  /** Custom icon url to set as the text input's background-image */
  @property({ reflect: true, attribute: 'custom-icon-url' }) customIconUrl?: string;

  /** Dimensions for the custom icon set as the text input's background-size */
  @property({ reflect: true, attribute: 'custom-icon-dimensions' }) customIconDimensions?: string;

  @property({ type: Boolean, reflect: true }) plain = false;

  /** Type that the input accepts. */
  @property({ reflect: true }) type?:
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

  /** Flag to show if the input is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Flag to show if the input is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Validation pattern, like `<input>` */
  @property() pattern?: string;

  /** Flag to show if the input is read only. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Helper text is text below a form field that helps a user provide the right information, like "Enter a unique name". */
  @property({ attribute: 'helper-text' }) helperText?: string;

  /** If set to 'blur', will validate when focus leaves the input */
  @property({ attribute: 'validate-on' }) validateOn?: 'blur';

  /** Displayed when validation fails */
  @property({ attribute: 'error-text' }) errorText?: string;

  /** Input placeholder. */
  @property() placeholder?: string;

  /** Value of the input. */
  @property() value = '';

  #internals = InternalsController.of(this);

  #derivedLabel = '';

  #touched = false;

  get #disabled() {
    return (!isServer && this.matches(':disabled')) || this.disabled;
  }

  get #input() {
    return this.shadowRoot?.getElementById('input') as HTMLInputElement ?? null;
  }

  override willUpdate(): void {
    this.#derivedLabel = this.accessibleLabel || this.#internals.computedLabelText;
  }

  override render(): TemplateResult<1> {
    const { valid } = this.#internals.validity;
    return html`
      <input id="input"
             .placeholder="${this.placeholder ?? ''}"
             .value="${this.value}"
             pattern="${ifDefined(this.pattern)}"
             @input="${this.#onInput}"
             @keydown="${this.#onKeydown}"
             @blur="${this.#onBlur}"
             ?disabled="${this.#disabled}"
             ?readonly="${this.readonly}"
             ?required="${this.required}"
             aria-label="${this.#derivedLabel}"
             type="${ifDefined(this.type)}"
             style="${ifDefined(this.customIconUrl && styleMap({
               backgroundImage: `url('${this.customIconUrl}')`,
               backgroundSize: this.customIconDimensions,
             }))}">
        <span id="helper-text" ?hidden="${!this.helperText || valid}">${this.helperText}</span>
        <span id="error-text" ?hidden="${valid}">${this.#internals.validationMessage}</span>
    `;
  }

  #onInput(event: Event & { target: HTMLInputElement }) {
    const { value } = event.target;
    this.value = value;
    this.#internals.setFormValue(value);
    if (this.#touched && !this.#internals.validity.valid) {
      this.#onBlur();
    }
    this.#touched = true;
  }

  #onKeydown(event: Event) {
    switch ((event as KeyboardEvent).key) {
      case 'Enter':
        if (this.reportValidity()) {
          this.#internals.form?.requestSubmit(null);
        }
    }
  }

  #onBlur() {
    if (this.validateOn === 'blur') {
      this.checkValidity();
    }
  }

  #setValidityFromInput() {
    this.#internals.setValidity(
      this.#input?.validity,
      this.errorText ?? this.#input.validationMessage,
    );
    this.requestUpdate();
  }

  async formStateRestoreCallback(state: string, mode: string): Promise<void> {
    if (mode === 'restore') {
      const [controlMode, value] = state.split('/');
      this.value = value ?? controlMode;
      this.requestUpdate();
      await this.updateComplete;
      this.#setValidityFromInput();
    }
  }


  async formDisabledCallback(): Promise<void> {
    await this.updateComplete;
    this.requestUpdate();
  }

  setCustomValidity(message: string): void {
    this.#internals.setValidity({}, message);
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
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-text-input': PfTextInput;
  }
}
