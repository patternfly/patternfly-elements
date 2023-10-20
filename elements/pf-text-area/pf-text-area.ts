import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { InternalsController } from '@patternfly/pfe-core/controllers/internals-controller.js';

import styles from './pf-text-area.css';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

/**
 * A **text area** component is used for entering a paragraph of text that is longer than one line.
 *
 */
@customElement('pf-text-area')
export class PfTextArea extends LitElement {
  static readonly styles = [styles];

  static readonly formAssociated = true;

  static override shadowRootOptions: ShadowRootInit = { ...LitElement.shadowRootOptions, delegatesFocus: true };

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

  /** Flag to show if the input is required. */
  @property({ type: Boolean, reflect: true }) required = false;

  /** Flag to show if the input is read only. */
  @property({ type: Boolean, reflect: true }) readonly = false;

  /** Input placeholder. */
  @property() placeholder?: string;

  /** Value of the input. */
  @property() value = '';

  /** Sets the orientation to limit the resize to */
  @property() resize?: 'horizontal' | 'vertical' | 'both';

  /** Sets the orientation to limit the resize to */
  @property({ type: Boolean, attribute: 'auto-resize' }) autoResize = false;

  #logger = new Logger(this);

  #internals = new InternalsController(this);

  #derivedLabel = '';

  get #input() {
    return this.shadowRoot?.getElementById('textarea') as HTMLTextAreaElement ?? null;
  }

  override willUpdate() {
    this.#derivedLabel = this.accessibleLabel || this.#internals.computedLabelText;
  }

  override render() {
    return html`
      <textarea id="textarea"
                @input="${this.#onInput}"
                ?disabled="${this.matches(':disabled') || this.disabled}"
                ?readonly="${this.readonly}"
                ?required="${this.required}"
                aria-label="${ifDefined(this.#derivedLabel)}"
                placeholder="${ifDefined(this.placeholder)}"
                .value="${this.value}"
      ></textarea>
    `;
  }

  #onInput(event: Event) {
    if (event.target instanceof HTMLTextAreaElement) {
      const { value } = event.target;
      this.value = value;
      this.#internals.setFormValue(value);
    }
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

  async formDisabledCallback() {
    await this.updateComplete;
    this.requestUpdate();
  }

  setCustomValidity(message: string) {
    this.#internals.setValidity({}, message);
  }

  checkValidity() {
    this.#setValidityFromInput();
    return this.#internals.checkValidity();
  }

  reportValidity() {
    this.#setValidityFromInput();
    return this.#internals.reportValidity();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-text-area': PfTextArea;
  }
}
