import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';

import styles from './pf-checkbox.css';

/**
 * Checkbox
 * @slot - Place element content here
 */
@customElement('pf-checkbox')
export class PfCheckbox extends LitElement {
  static readonly styles = [styles];

  #getElement() {
    const checkbox = document.querySelector('pf-checkbox');
    const checkbasic = checkbox!.shadowRoot!.getElementById('check-basic') as HTMLInputElement;
    return checkbasic;
  }

  keydown(event: KeyboardEvent) {
    const checkbox = this.#getElement();
    if (event.code === 'Enter' || event.code === 'Space') {
      event.preventDefault();
      checkbox.checked = !checkbox.checked;
      // Optionally, you can also update aria-checked attribute for screen readers
      checkbox.setAttribute('aria-checked', checkbox.checked ? 'true' : 'false');
    }
  }

  click() {
    const checkbox = this.#getElement();
    checkbox.setAttribute('aria-checked', checkbox.checked ? 'true' : 'false');
  }

  render() {
    return html`
      <slot>
      <div class="container">
          <h1 class="heading">Uncontrolled </h1>
          <div class="pf-c-check">
              <input
                class="pf-c-check__input"
                type="checkbox"
                id="check-basic"
                name="check-basic"
                @keydown=${this.keydown} 
                @click=${this.click}

              />
              <label class="pf-c-check__label" for="check-basic">Uncontrolled CheckBox </label>
          </div>
      </div>
      </slot>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-checkbox': PfCheckbox;
  }
}

//

//     checkbox.addEventListener('click', function(event) {
//         // Update aria-checked attribute for screen readers
//         checkbox.setAttribute('aria-checked', checkbox.checked ? 'true' : 'false');
//     });

