import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ComposedEvent } from '@patternfly/pfe-core/core.js';
import styles from './pf-previous-button.css';

export class PreviousButtonClickEvent extends ComposedEvent {
  constructor(public event: Event, public month: number, public year: number) {
    super('previousMonthAndYear');
  }
}
/**
 * Previous Button
 * @slot - Place element content here
 */
@customElement('pf-previous-button')
export class PfPreviousButton extends LitElement {
  static readonly styles = [styles];

  // Input properties from the parent
  @property() currentYear: number = (new Date).getFullYear();
  @property() currentMonth: number = (new Date).getMonth();

  render() {
    return html`
      <pf-button label="Previous month" plain @click=${this.#previousMonth} class="date-previous-next-button">
        <pf-icon class="date-previous-next-button-icon" icon="angle-left" size="md"></pf-icon>
      </pf-button>
    `;
  }

  // Function to dispatch month and year
  #previousMonth(event: Event) {
    // Decrement the current month by one
    this.currentMonth--;

    // If the current month is less than 0, set it to 11 (December) and decrement the current year
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    }

    this.dispatchEvent(new PreviousButtonClickEvent(event, this.currentMonth, this.currentYear));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-previous-button': PfPreviousButton;
  }
}
