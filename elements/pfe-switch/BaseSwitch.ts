import { LitElement, html } from 'lit';
import { property, query } from 'lit/decorators.js';
import { observed } from '@patternfly/pfe-core/decorators.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import styles from './BaseSwitch.scss';

/**
 * Switch
 * @slot - Place element content here
 * @cssprop --pf-c-switch--FontSize {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch__label--PaddingLeft {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch--ColumnGap {@default `1rem`}
 * @cssprop --pf-c-switch__toggle-icon--FontSize {@default `calc(1rem * .625)`}
 * @cssprop {<color>} --pf-c-switch__toggle-icon--Color {@default `#fff`}
 * @cssprop {<length>} --pf-c-switch__toggle-icon--Left {@default `1rem`}
 * @cssprop {<length>} --pf-c-switch__toggle-icon--Offset {@default `0.125rem`}
 * @cssprop {<number>} --pf-c-switch--LineHeight {@default `1.5`}
 * @cssprop {<length>} --pf-c-switch--Height {@default `auto`}
 * @cssprop {<color>} --pf-c-switch__input--checked__toggle--BackgroundColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-switch__input--checked__toggle--before--TranslateX {@default `calc(100% + 0.125rem)`}
 * @cssprop {<color>} --pf-c-switch__input--checked__label--Color {@default `#151515`}
 * @cssprop {<color>} --pf-c-switch__input--not-checked__label--Color {@default `#6a6e73`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__label--Color {@default `#6a6e73`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__toggle--BackgroundColor {@default `#d2d2d2`}
 * @cssprop {<color>} --pf-c-switch__input--disabled__toggle--before--BackgroundColor {@default `#f5f5f5`}
 * @cssprop {<length>} --pf-c-switch__input--focus__toggle--OutlineWidth {@default `2px`}
 * @cssprop {<length>} --pf-c-switch__input--focus__toggle--OutlineOffset {@default `0.5rem`}
 * @cssprop {<color>} --pf-c-switch__input--focus__toggle--OutlineColor {@default `#06c`}
 * @cssprop {<length>} --pf-c-switch__toggle--Height {@default `calc(1rem * 1.5)`}
 * @cssprop {<color>} --pf-c-switch__toggle--BackgroundColor {@default `#8a8d90`}
 * @cssprop {<length>} --pf-c-switch__toggle--BorderRadius {@default `calc(1rem * 1.5)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Width {@default `calc(1rem - 0.125rem)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Height {@default `calc(1rem - 0.125rem)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Top {@default calc((calc(1rem * 1.5) - calc(1rem - 0.125rem)) / 2)`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--Left {@default `calc((calc(1rem * 1.5) - calc(1rem - 0.125rem)) / 2)`}
 * @cssprop {<color>} --pf-c-switch__toggle--before--BackgroundColor {@default `#fff`}
 * @cssprop {<length>} --pf-c-switch__toggle--before--BorderRadius {@default `30em`}
 * @cssprop --pf-c-switch__toggle--before--BoxShadow {@default `0 0.25rem 0.5rem 0rem rgba(3, 3, 3, 0.12), 0 0 0.25rem 0 rgba(3, 3, 3, 0.06)`}
 * @cssprop --pf-c-switch__toggle--before--Transition {@default `transform .25s ease 0s`}
 * @cssprop {<length>} --pf-c-switch__toggle--Width {@default `calc(calc(1rem * 1.5) + 0.125rem + calc(1rem - 0.125rem))`}
 * @cssprop {<color>} --pf-c-switch__label--Color {@default `#151515`}
 */
export abstract class BaseSwitch extends LitElement {
  static readonly styles = [styles];

  @query('#toggle') _toggle;

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
    this._toggle.focus();
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
