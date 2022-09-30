import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';
import styles from './BaseSwitch.scss';

/**
 * Switch
 * @slot - Place element content here
 */
export abstract class BaseSwitch extends LitElement {
  static readonly styles = [styles];

  @property({ reflect: true }) label?: string;
  @property({ reflect: true, attribute: 'label-off' }) labelOff?: string;
  @property({ reflect: true, type: Boolean }) checked = false;
  @property({ reflect: true, type: Boolean }) reversed = false;
  @property({ reflect: true, type: Boolean, attribute: 'has-check-icon' }) hasCheckIcon = false;
  @property({ reflect: true, type: Boolean }) disabled = false;

  override render() {
    return html`
      <label>
        <input type="checkbox" ?checked=${this.checked} ?disabled=${this.disabled} @change=${this.#changeHandler}>
        <span id="toggle">
          ${!this.label ? html`
            <span id="toggle-icon">
              <svg fill="currentColor" height="1em" width="1em" viewBox="0 0 512 512" aria-hidden="true" role="img"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>
            </span>
          ` : ''}
        </span>
        <span id="label">${this.checked ? this.label : this.labelOff}</span>
      </label>
    `;
  }

  #changeHandler(evt: Event) {
    this.checked = (<HTMLInputElement>evt.target).checked;
  }
}
