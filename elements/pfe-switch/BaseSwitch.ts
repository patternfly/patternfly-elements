import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './BaseSwitch.scss';

/**
 * Switch
 */
export abstract class BaseSwitch extends LitElement {
  static readonly styles = [styles];

  static readonly shadowRootOptions = { ...LitElement.shadowRootOptions, delegatesFocus: true, };

  static readonly formAssociated = true;

  declare shadowRoot: ShadowRoot;

  #internals = this.attachInternals();

  #initiallyDisabled = this.hasAttribute('disabled');

  @property({ reflect: true }) label?: string;

  @property({ reflect: true, type: Boolean, attribute: 'show-check-icon' }) showCheckIcon = false;

  @property({ reflect: true, type: Boolean }) checked = false;

  disabled = this.#initiallyDisabled;

  get labels(): NodeListOf<HTMLLabelElement> {
    return this.#internals.labels as NodeListOf<HTMLLabelElement>;
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.setAttribute('role', 'checkbox');
    this.addEventListener('click', this.#onClick);
    this.addEventListener('keyup', this.#onKeyup);
    this.#updateLabels();
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.requestUpdate();
  }

  override render() {
    return html`
      <div id="label" tabindex="0">
        <svg id="toggle"
          ?hidden="${!this.showCheckIcon && !!this.labels.length}"
          fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512">
            <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/>
        </svg>
      </div>
    `;
  }

  override updated() {
    this.#internals.ariaChecked = String(this.checked);
    this.#internals.ariaDisabled = String(this.disabled);
  }

  #onClick() {
    this.checked = !this.checked;
    this.#updateLabels();
    const event = new Event('change', { bubbles: true });
    this.dispatchEvent(event);
  }

  #onKeyup(event: KeyboardEvent) {
    switch (event.key) {
      case ' ':
      case 'Enter':
        event.preventDefault();
        this.#onClick();
    }
  }

  #updateLabels() {
    const labelState = this.checked ? 'on' : 'off';
    for (const label of this.labels) {
      label.hidden = label.dataset.state !== labelState;
    }
  }
}
