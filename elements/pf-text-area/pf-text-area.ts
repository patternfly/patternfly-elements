import { LitElement, html, isServer, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { classMap } from 'lit/directives/class-map.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-text-area.css';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

/**
 * A **text area** component is used for entering a paragraph of text that is longer than one line.
 * @alias Text Area
 */
@customElement('pf-text-area')
export class PfTextArea extends LitElement {
  static readonly styles: CSSStyleSheet[] = [styles];

  static readonly formAssociated = true;

  static override readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  };

  /** Accessible label for the input when no `<label>` element is provided. */
  @property({ reflect: true, attribute: 'accessible-label' }) accessibleLabel?: string;

  /**
   * Value to indicate if the input is modified to show that validation state.
   * If set to success, input will be modified to indicate valid state.
   * If set to warning,  input will be modified to indicate warning state.
   * Invalid inputs will display an error state
   */
  @property({ reflect: true }) validated?: 'success' | 'warning';

  /** Flag to show if the input is disabled. */
  @property({ type: Boolean, reflect: true }) disabled = false;

  /** Flag to show if the text area is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Flag to show if the input is read only. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Input placeholder. */
  @property() placeholder?: string;

  /** Value of the input. */
  @property() value = '';

  /** Sets the orientation to limit the resize to */
  @property() resize?: 'horizontal' | 'vertical' | 'both';

  /** Flag to modify height based on contents. */
  @property({ type: Boolean, attribute: 'auto-resize' }) autoResize = false;

  #logger = new Logger(this);

  #internals = InternalsController.of(this);

  #derivedLabel = '';

  get #disabled() {
    return (!isServer && this.matches(':disabled')) || this.disabled;
  }

  get #input() {
    return this.shadowRoot?.getElementById('textarea') as HTMLTextAreaElement ?? null;
  }

  override willUpdate(): void {
    this.#derivedLabel = this.accessibleLabel || this.#internals.computedLabelText;
  }

  override render(): TemplateResult<1> {
    const classes = { [String(this.resize)]: !!this.resize };

    return html`
      <textarea id="textarea" class="${classMap(classes)}"
                @input="${this.#onInput}"
                @change="${this.#onInput}"
                ?disabled="${this.#disabled}"
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                aria-label="${ifDefined(this.#derivedLabel)}"
                placeholder="${ifDefined(this.placeholder)}"
                .value="${this.value}"
      ></textarea>
    `;
  }

  override firstUpdated(): void {
    if (this.autoResize) {
      this.#autoSetHeight();
    }
  }

  #onInput(event: Event) {
    if (event.target instanceof HTMLTextAreaElement) {
      const { value } = event.target;
      this.value = value;
      this.#internals.setFormValue(value);
    }
    if (this.autoResize) {
      this.#autoSetHeight();
    }
  }

  #autoSetHeight() {
    this.#input.style.setProperty('--pf-c-form-control--textarea--Height', `auto`);
    this.#input.style.setProperty('--pf-c-form-control--textarea--Height', `${this.#input.scrollHeight}px`);
  }

  #setValidityFromInput() {
    if (!this.#input) {
      this.#logger.warn('await updateComplete before validating');
    } else {
      this.#internals.setValidity(
        this.#input.validity,
        this.#input.validationMessage,
      );
    }
  }

  async formDisabledCallback(): Promise<void> {
    await this.updateComplete;
    this.requestUpdate();
  }

  setCustomValidity(message: string): void {
    this.#internals.setValidity({}, message);
  }

  checkValidity(): boolean {
    this.#setValidityFromInput();
    return this.#internals.checkValidity();
  }

  reportValidity(): boolean {
    this.#setValidityFromInput();
    return this.#internals.reportValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-text-area': PfTextArea;
  }
}
