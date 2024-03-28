import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { query } from 'lit/decorators/query.js';

import styles from './pf-year-input.css';

/**
 * Year Input
 * @slot - Place element content here
 */
@customElement('pf-year-input')
export class PfYearInput extends LitElement {
  static readonly styles = [styles];

  // Input properties from the parent
  @property() currentYear: number = (new Date).getFullYear();
  @property() isValid = true;
  @property() minDate!: Date;
  @property() maxDate!: Date;

  private minYear: number = new Date(this.minDate).getFullYear();
  private maxYear: number = new Date(this.maxDate).getFullYear();

  @query('#year-input') _numberInput!: HTMLInputElement;

  render() {
    return html`
      <div class="date-year-input-container">
        <input 
          type="number"
          id="year-input"
          aria-label="Select year"
          min=${this.minYear} 
          max=${this.maxYear} 
          @input=${this.#OnInput}
          @click=${this.#onChange}
          @keyup=${this.#onKeyUp}
          .value=${this.currentYear}
        />
      </div>
    `;
  }

  // Function to hanlde year input on input
  #OnInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.#dispatchInputYear(parseInt(value), 'setCurrentYear');
  }

  // Function to handle year input on step
  #onChange(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.#dispatchInputYear(parseInt(value), 'currentYearOnStep');
  }

  // Function to dispatch year input
  #dispatchInputYear(value: number, eventName: string) {
    if (isNaN(value)) {
      this.currentYear = 0;
    } else {
      this.currentYear = value;
    }

    const options = {
      detail: this.currentYear,
      bubbles: true,
      composed: true
    };
    this.dispatchEvent(new CustomEvent(eventName, options));
  }

  // Function to handle year input on keyUp
  #onKeyUp(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      this.#dispatchInputYear(this.currentYear, 'currentYearOnStep');
    }
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'pf-year-input': PfYearInput;
  }
}
