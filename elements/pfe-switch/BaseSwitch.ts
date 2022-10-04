import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import { observed } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import styles from './BaseSwitch.scss';

/**
 * Switch
 * @slot - Place element content here
 */
export abstract class BaseSwitch extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) label?: string;
  @property({ reflect: true, attribute: 'label-off' }) labelOff?: string;
  @property({ reflect: true, type: Boolean }) reversed = false;
  @property({ reflect: true, type: Boolean, attribute: 'has-check-icon' }) hasCheckIcon = false;

  @observed
  @property({ reflect: true, type: Boolean }) checked = false;

  @observed
  @property({ reflect: true, type: Boolean }) disabled = false;

  get #input() {
    return this.querySelector('input');
  }

  #logger = new Logger(this);
  #mo = new MutationObserver(() => this.#onMutation());

  override connectedCallback() {
    this.#onSlotChange();
    super.connectedCallback();
    this.shadowRoot?.addEventListener('slotchange', () => this.#onSlotChange());
    this.addEventListener('click', this.#clickHandler);
    this.addEventListener('keyup', this.#keyHandler);
    this.addEventListener('keydown', this.#keyHandler);
  }

  override render() {
    return html`
      <label>
        <slot></slot>
        <span id="toggle" tabindex=${this.disabled ? -1 : 0}>
          ${!this.label || this.hasCheckIcon ? html`
            <span id="toggle-icon">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
            </span>
          ` : ''}
        </span>
        <span id="label" aria-hidden="true">${this.checked ? this.label : this.labelOff}</span>
      </label>
    `;
  }

  protected override firstUpdated(): void {
    this.#onMutation();
  }

  #clickHandler(evt: Event) {
    if (this.disabled) {
      evt.preventDefault();
      return;
    }

    this.checked = !this.checked;
  }

  #keyHandler(evt: KeyboardEvent) {
    if (evt.code.toLowerCase() === 'space') {
      evt.preventDefault();

      if (evt.type === 'keyup') {
        this.checked = !this.checked;
      }
    }
  }

  #onSlotChange() {
    this.#mo.disconnect();
    if (this.#input) {
      this.#mo.observe(this.#input, { attributes: true, attributeFilter: ['checked', 'disabled'] });
    }
  }

  protected _checkedChanged(oldValue: boolean, newValue: boolean) {
    if (!oldValue && newValue === false) {
      return;
    }

    if (this.#input && this.#input.checked !== this.checked) {
      if (newValue) {
        this.#input.setAttribute('checked', '');
      } else {
        this.#input.removeAttribute('checked');
      }
    }
  }

  protected _disabledChanged(oldValue: boolean, newValue: boolean) {
    if (!oldValue && newValue === false) {
      return;
    }

    if (this.#input && this.#input.disabled !== this.disabled) {
      this.#input.disabled = this.disabled;
    }
  }

  #onMutation() {
    const lightInputs = this.querySelectorAll('input');
    if (!this.#input) {
      this.#logger.warn('You must have an input in the light DOM');
    } else if (this.#input.type !== 'checkbox') {
      this.#logger.warn('The input must have a type of checkbox');
    } else {
      this.disabled = this.#input.hasAttribute('disabled') || this.#input.getAttribute('aria-disabled') === 'true';
      this.checked = this.#input.checked;
      this.#input.tabIndex = -1;

      if (lightInputs.length > 1) {
        this.#logger.warn('Only one input child is allowed');
      }
    }
  }
}
