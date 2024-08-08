import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';

import styles from './pf-next-button.css';

export class NextButtonClickEvent extends Event {
  constructor(public event: Event, public month: number, public year: number) {
    super('nextMonthAndYear', { bubbles: true, cancelable: true });
  }
}

/**
 * Next Button
 * @slot - Place element content here
 */
@customElement('pf-next-button')
export class PfNextButton extends LitElement {
  static readonly styles = [styles];

  // Input properties from the parent
  @property() currentYear: number = (new Date).getFullYear();
  @property() currentMonth: number = (new Date).getMonth();

  render() {
    return html`
      <pf-button plain label="Next month" @click=${this.#nextMonth} class="date-previous-next-button">
        <pf-icon icon="angle-right" size="md"></pf-icon>
      </pf-button>
    `;
  }

  // Function to dispatch month and year
  #nextMonth(event: Event) {
    // Increment the current month by one
    this.currentMonth++;

    // If the current month is greater than 11 (December), set it to 0 (January) and increment the current year
    if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }

    this.dispatchEvent(new NextButtonClickEvent(event, this.currentMonth, this.currentYear));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-next-button': PfNextButton;
  }
}
