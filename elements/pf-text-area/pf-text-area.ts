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
 * @cssprop [--pf-c-form-control--Color=var(--pf-global--Color--100, #151515)] -
 * @cssprop [--pf-c-form-control--FontSize=var(--pf-global--FontSize--md, 1rem)] -
 * @cssprop [--pf-c-form-control--LineHeight=var(--pf-global--LineHeight--md, 1.5)] -
 * @cssprop [--pf-c-form-control--BorderWidth=var(--pf-global--BorderWidth--sm, 1px)] -
 * @cssprop [--pf-c-form-control--BorderTopColor=var(--pf-global--BorderColor--300, #f0f0f0)] -
 * @cssprop [--pf-c-form-control--BorderRightColor=var(--pf-global--BorderColor--300, #f0f0f0)] -
 * @cssprop [--pf-c-form-control--BorderBottomColor=var(--pf-global--BorderColor--200, #8a8d90)] -
 * @cssprop [--pf-c-form-control--BorderLeftColor=var(--pf-global--BorderColor--300, #f0f0f0)] -
 * @cssprop [--pf-c-form-control--BorderRadius=0] -
 * @cssprop [--pf-c-form-control--BackgroundColor=var(--pf-global--BackgroundColor--100, #fff)] -
 * @cssprop [--pf-c-form-control--Width=100] -
 * @cssprop [--pf-c-form-control--Height=calc(var(--pf-c-form-control--FontSize) * var(--pf-c-form-control--LineHeight) + var(--pf-c-form-control--BorderWidth) * 2 + var(--pf-c-form-control--PaddingTop) + var(--pf-c-form-control--PaddingBottom))] -
 * @cssprop [--pf-c-form-control--inset--base=var(--pf-global--spacer--sm, 0.5rem)] -
 * @cssprop [--pf-c-form-control--PaddingTop=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px))] -
 * @cssprop [--pf-c-form-control--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px))] -
 * @cssprop [--pf-c-form-control--PaddingRight=var(--pf-c-form-control--inset--base)] -
 * @cssprop [--pf-c-form-control--PaddingLeft=var(--pf-c-form-control--inset--base)] -
 * @cssprop [--pf-c-form-control--hover--BorderBottomColor=var(--pf-global--primary-color--100, #06c)] -
 * @cssprop [--pf-c-form-control--focus--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)] -
 * @cssprop [--pf-c-form-control--focus--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--focus--BorderBottomWidth))] -
 * @cssprop [--pf-c-form-control--focus--BorderBottomColor=var(--pf-global--primary-color--100, #06c)] -
 * @cssprop [--pf-c-form-control--m-expanded--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)] -
 * @cssprop [--pf-c-form-control--m-expanded--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--focus--BorderBottomWidth))] -
 * @cssprop [--pf-c-form-control--m-expanded--BorderBottomColor=var(--pf-global--primary-color--100, #06c)] -
 * @cssprop [--pf-c-form-control--placeholder--Color=var(--pf-global--Color--dark-200, #6a6e73)] -
 * @cssprop [--pf-c-form-control--placeholder--child--Color=var(--pf-global--Color--100, #151515)] -
 * @cssprop [--pf-c-form-control--disabled--Color=var(--pf-global--disabled-color--100, #6a6e73)] -
 * @cssprop [--pf-c-form-control--disabled--BackgroundColor=var(--pf-global--disabled-color--300, #f0f0f0)] -
 * @cssprop [--pf-c-form-control--disabled--BorderColor=transparent] -
 * @cssprop [--pf-c-form-control--readonly--BackgroundColor=var(--pf-global--disabled-color--300, #f0f0f0)] -
 * @cssprop [--pf-c-form-control--readonly--hover--BorderBottomColor=var(--pf-global--BorderColor--200, #8a8d90)] -
 * @cssprop [--pf-c-form-control--readonly--focus--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-global--BorderWidth--sm, 1px))] -
 * @cssprop [--pf-c-form-control--readonly--focus--BorderBottomWidth=var(--pf-global--BorderWidth--sm, 1px)] -
 * @cssprop [--pf-c-form-control--readonly--focus--BorderBottomColor=var(--pf-global--BorderColor--200, #8a8d90)] -
 * @cssprop [--pf-c-form-control--readonly--m-plain--BackgroundColor=transparent] -
 * @cssprop [--pf-c-form-control--readonly--m-plain--inset--base=0] -
 * @cssprop [--pf-c-form-control--success--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)] -
 * @cssprop [--pf-c-form-control--success--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--success--BorderBottomWidth))] -
 * @cssprop [--pf-c-form-control--success--BorderBottomColor=var(--pf-global--success-color--100, #3e8635)] -
 * @cssprop [--pf-c-form-control--success--PaddingRight=var(--pf-global--spacer--xl, 2rem)] -
 * @cssprop [--pf-c-form-control--success--BackgroundPositionX=calc(100 - var(--pf-c-form-control--PaddingLeft))] -
 * @cssprop [--pf-c-form-control--success--BackgroundPositionY=center] -
 * @cssprop [--pf-c-form-control--success--BackgroundPosition=var(--pf-c-form-control--success--BackgroundPositionX) var(--pf-c-form-control--success--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control--success--BackgroundSizeX=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--success--BackgroundSizeY=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--success--BackgroundSize=var(--pf-c-form-control--success--BackgroundSizeX) var(--pf-c-form-control--success--BackgroundSizeY)] -
 * @cssprop --pf-c-form-control--success--BackgroundUrl
 * @cssprop [--pf-c-form-control--m-warning--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)] -
 * @cssprop [--pf-c-form-control--m-warning--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--m-warning--BorderBottomWidth))] -
 * @cssprop [--pf-c-form-control--m-warning--BorderBottomColor=var(--pf-global--warning-color--100, #f0ab00)] -
 * @cssprop [--pf-c-form-control--m-warning--PaddingRight=var(--pf-global--spacer--xl, 2rem)] -
 * @cssprop [--pf-c-form-control--m-warning--BackgroundPositionX=calc(100 - calc(var(--pf-c-form-control--PaddingLeft) - 0.0625rem))] -
 * @cssprop [--pf-c-form-control--m-warning--BackgroundPositionY=center] -
 * @cssprop [--pf-c-form-control--m-warning--BackgroundPosition=var(--pf-c-form-control--m-warning--BackgroundPositionX) var(--pf-c-form-control--m-warning--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control--m-warning--BackgroundSizeX=1.25rem] -
 * @cssprop [--pf-c-form-control--m-warning--BackgroundSizeY=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--m-warning--BackgroundSize=var(--pf-c-form-control--m-warning--BackgroundSizeX) var(--pf-c-form-control--m-warning--BackgroundSizeY)] -
 * @cssprop --pf-c-form-control--m-warning--BackgroundUrl -
 * @cssprop [--pf-c-form-control--invalid--BorderBottomWidth=var(--pf-global--BorderWidth--md, 2px)] -
 * @cssprop [--pf-c-form-control--invalid--PaddingBottom=calc(var(--pf-global--spacer--form-element, 0.375rem) - var(--pf-c-form-control--invalid--BorderBottomWidth))] -
 * @cssprop [--pf-c-form-control--invalid--BorderBottomColor=var(--pf-global--danger-color--100, #c9190b)] -
 * @cssprop [--pf-c-form-control--invalid--PaddingRight=var(--pf-global--spacer--xl, 2rem)] -
 * @cssprop [--pf-c-form-control--invalid--BackgroundPositionX=calc(100 - var(--pf-c-form-control--PaddingLeft))] -
 * @cssprop [--pf-c-form-control--invalid--BackgroundPositionY=center] -
 * @cssprop [--pf-c-form-control--invalid--BackgroundPosition=var(--pf-c-form-control--invalid--BackgroundPositionX) var(--pf-c-form-control--invalid--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control--invalid--BackgroundSizeX=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--invalid--BackgroundSizeY=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--invalid--BackgroundSize=var(--pf-c-form-control--invalid--BackgroundSizeX) var(--pf-c-form-control--invalid--BackgroundSizeY)] -
 * @cssprop --pf-c-form-control--invalid--BackgroundUrl -
 * @cssprop [--pf-c-form-control--invalid--exclamation--Background=var(--pf-c-form-control--invalid--BackgroundUrl) var(--pf-c-form-control--invalid--BackgroundPosition) / var(--pf-c-form-control--invalid--BackgroundSize) no-repeat] -
 * @cssprop [--pf-c-form-control--invalid--Background=var(--pf-c-form-control--BackgroundColor) var(--pf-c-form-control--invalid--exclamation--Background)] -
 * @cssprop [--pf-c-form-control--m-search--PaddingLeft=var(--pf-global--spacer--xl, 2rem)] -
 * @cssprop [--pf-c-form-control--m-search--BackgroundPosition=var(--pf-c-form-control--PaddingRight)] -
 * @cssprop [--pf-c-form-control--m-search--BackgroundSize=var(--pf-c-form-control--FontSize) var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--m-search--BackgroundUrl=] -
 * @cssprop [--pf-c-form-control--m-icon--PaddingRight=calc(var(--pf-c-form-control--inset--base) + var(--pf-c-form-control--m-icon--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer))] -
 * @cssprop [--pf-c-form-control--m-icon--BackgroundUrl=none] -
 * @cssprop [--pf-c-form-control--m-icon--BackgroundPositionX=calc(100 - var(--pf-c-form-control--inset--base))] -
 * @cssprop [--pf-c-form-control--m-icon--BackgroundPositionY=center] -
 * @cssprop [--pf-c-form-control--m-icon--BackgroundSizeX=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--m-icon--BackgroundSizeY=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--m-icon--icon--spacer=var(--pf-global--spacer--sm, 0.5rem)] -
 * @cssprop [--pf-c-form-control--m-icon--icon--PaddingRight=calc(var(--pf-c-form-control--inset--base) + var(--pf-c-form-control--invalid--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer) + var(--pf-c-form-control--m-icon--BackgroundSizeX) + var(--pf-c-form-control--m-icon--icon--spacer))] -
 * @cssprop [--pf-c-form-control--m-icon--icon--BackgroundPositionX=calc(var(--pf-c-form-control--m-icon--BackgroundPositionX) - var(--pf-c-form-control--m-icon--icon--spacer) - var(--pf-c-form-control--invalid--BackgroundSizeX))] -
 * @cssprop [--pf-c-form-control--m-icon--invalid--BackgroundUrl=var(--pf-c-form-control--invalid--BackgroundUrl), var(--pf-c-form-control--m-icon--BackgroundUrl)] -
 * @cssprop [--pf-c-form-control--m-icon--invalid--BackgroundPosition=var(--pf-c-form-control--invalid--BackgroundPosition), var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control--m-icon--invalid--BackgroundSize=var(--pf-c-form-control--invalid--BackgroundSize), var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)] -
 * @cssprop [--pf-c-form-control--m-icon--success--BackgroundUrl=var(--pf-c-form-control--success--BackgroundUrl), var(--pf-c-form-control--m-icon--BackgroundUrl)] -
 * @cssprop [--pf-c-form-control--m-icon--success--BackgroundPosition=var(--pf-c-form-control--success--BackgroundPosition), var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control--m-icon--success--BackgroundSize=var(--pf-c-form-control--success--BackgroundSize), var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)] -
 * @cssprop [--pf-c-form-control--m-icon--m-warning--BackgroundUrl=var(--pf-c-form-control--m-warning--BackgroundUrl), var(--pf-c-form-control--m-icon--BackgroundUrl)] -
 * @cssprop [--pf-c-form-control--m-icon--m-warning--BackgroundPosition=var(--pf-c-form-control--m-warning--BackgroundPosition), var(--pf-c-form-control--m-icon--icon--BackgroundPositionX) var(--pf-c-form-control--m-icon--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control--m-icon--m-warning--BackgroundSize=var(--pf-c-form-control--m-warning--BackgroundSize), var(--pf-c-form-control--m-icon--BackgroundSizeX) var(--pf-c-form-control--m-icon--BackgroundSizeY)] -
 * @cssprop --pf-c-form-control--m-calendar--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-clock--BackgroundUrl -
 * @cssprop [--pf-c-form-control__select--PaddingRight=calc(var(--pf-global--spacer--lg, 1.5rem) + var(--pf-c-form-control--BorderWidth) + var(--pf-c-form-control--BorderWidth))] -
 * @cssprop [--pf-c-form-control__select--PaddingLeft=calc(var(--pf-global--spacer--sm, 0.5rem) - var(--pf-c-form-control--BorderWidth))] -
 * @cssprop --pf-c-form-control__select--BackgroundUrl -
 * @cssprop [--pf-c-form-control__select--BackgroundSize=.625em] -
 * @cssprop [--pf-c-form-control__select--BackgroundPositionX=calc(100 - var(--pf-global--spacer--md, 1rem) + 1px)] -
 * @cssprop [--pf-c-form-control__select--BackgroundPositionY=center] -
 * @cssprop [--pf-c-form-control__select--BackgroundPosition=var(--pf-c-form-control__select--BackgroundPositionX) var(--pf-c-form-control__select--BackgroundPositionY)] -
 * @cssprop [--pf-c-form-control__select--success--PaddingRight=var(--pf-global--spacer--3xl, 4rem)] -
 * @cssprop [--pf-c-form-control__select--success--BackgroundPosition=calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem))] -
 * @cssprop [--pf-c-form-control__select--m-warning--PaddingRight=var(--pf-global--spacer--3xl, 4rem)] -
 * @cssprop [--pf-c-form-control__select--m-warning--BackgroundPosition=calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem) + 0.0625rem)] -
 * @cssprop [--pf-c-form-control__select--invalid--PaddingRight=var(--pf-global--spacer--3xl, 4rem)] -
 * @cssprop [--pf-c-form-control__select--invalid--BackgroundPosition=calc(var(--pf-c-form-control__select--BackgroundPositionX) - var(--pf-global--spacer--lg, 1.5rem))] -
 * @cssprop [--pf-c-form-control--textarea--Width=var(--pf-c-form-control--Width)] -
 * @cssprop [--pf-c-form-control--textarea--Height=auto] -
 * @cssprop [--pf-c-form-control--textarea--success--BackgroundPositionY=var(--pf-c-form-control--PaddingLeft)] -
 * @cssprop [--pf-c-form-control--textarea--m-warning--BackgroundPositionY=var(--pf-c-form-control--PaddingLeft)] -
 * @cssprop [--pf-c-form-control--textarea--invalid--BackgroundPositionY=var(--pf-c-form-control--PaddingLeft)] -
 * @cssprop --pf-c-form-control--m-icon-sprite--success--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-icon-sprite--m-warning--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-icon-sprite--invalid--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-icon-sprite__select--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-icon-sprite--m-search--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-icon-sprite--m-calendar--BackgroundUrl -
 * @cssprop --pf-c-form-control--m-icon-sprite--m-clock--BackgroundUrl -
 * @cssprop [--pf-c-form-control--m-icon-sprite__select--BackgroundSize=var(--pf-c-form-control--FontSize)] -
 * @cssprop [--pf-c-form-control--m-icon-sprite__select--BackgroundPositionX=calc(100 - var(--pf-global--spacer--md, 1rem) + 7px)] -
 * @cssprop [--pf-c-form-control--m-icon-sprite__select--success--BackgroundPosition=calc(100 - var(--pf-global--spacer--md, 1rem) + 1px - var(--pf-global--spacer--lg, 1.5rem))] -
 * @cssprop [--pf-c-form-control--m-icon-sprite__select--m-warning--BackgroundPosition=calc(100 - var(--pf-global--spacer--md, 1rem) - var(--pf-global--spacer--lg, 1.5rem) + 0.0625rem)] -
 * @cssprop [--pf-c-form-control--m-icon-sprite__select--invalid--BackgroundPosition=calc(100 - var(--pf-global--spacer--md, 1rem) - var(--pf-global--spacer--lg, 1.5rem))] -
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
