import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './BaseSwitch.scss';

/**
 * Switch
 * @slot - Place element content here
 * @cssprop --pf-c-switch--FontSize {@default `1rem`}
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
  }

  formDisabledCallback(disabled: boolean) {
    this.disabled = disabled;
    this.requestUpdate();
  }

  override render() {
    return html`
      <div id="label">
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
    const labelState = this.checked ? 'on' : 'off';
    for (const label of this.labels) {
      label.hidden = label.dataset.state !== labelState;
    }
    const event = new Event('change', { bubbles: true });
    this.dispatchEvent(event);
  }
}
