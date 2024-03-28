import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { bound } from '@patternfly/pfe-core/decorators.js';
import { query } from 'lit/decorators/query.js';
import styles from './pf-month-select.css';
import { createRef, ref } from 'lit/directives/ref.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { getMonthNamesFromLocale } from './date-picker-helper.js';
import { ComposedEvent } from '@patternfly/pfe-core/core.js';

export class MonthChangeEvent extends ComposedEvent {
  constructor(public event: Event, public name: string, public index: number) {
    super('currentMonth');
  }
}

export class MonthPopupStateChangeEvent extends ComposedEvent {
  constructor(public event: Event, public isExpanded: boolean) {
    super('monthExpandState');
  }
}

/**
 * Month Select
 * @slot - Place element content here
 */
@customElement('pf-month-select')
export class PfMonthSelect extends LitElement {
  static readonly styles = [styles];

  // Input properties from the parent
  @property() translationLanguageCode!: string;
  @property() monthNames: string[] = getMonthNamesFromLocale(this.translationLanguageCode);
  @property() currentDate: Date = new Date();
  @property() currentMonthName: string = this.monthNames[this.currentDate.getMonth()];
  @property() currentMonthIndex: number = this.currentDate.getMonth();
  @property() isMonthExpanded = false;
  @property() monthToBeFocused!: number;

  focusMonthRef: any = createRef<HTMLButtonElement>(); // Reference to the month that needs to be focused on keyboard navigation

  @query('#date-picker-month-select') private datePickerMonthToggle!: HTMLButtonElement;

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onOutsideClick);
    if (this.translationLanguageCode) {
      this.monthNames = getMonthNamesFromLocale(this.translationLanguageCode);
      this.currentMonthName = this.monthNames[this.currentDate.getMonth()];
    }
  }

  render() {
    return html`
      <div @keydown=${this.#onMonthSelectKeydown} class="month-select-container">
        <div part="toggle">
          <pf-button variant="control" label="Toggle options list" part="toggle-button" aria-expanded=${ifDefined(this.isMonthExpanded || undefined)} @click=${this.#showMonthSelect} class="month-select-input" id="date-picker-month-select" type="button"> 
            ${this.currentMonthName} <pf-icon class="date-month-select-icon" icon="caret-down" size="md"></pf-icon>
          </pf-button>
        </div>
        <div part="menu" ?hidden=${!this.isMonthExpanded} id="date-picker-month-select-popup">
          <ul aria-label="Select month" role="listbox">
            ${this.monthNames.map((month: string, key: number) => {
              return html`
              <li>
                <pf-button 
                  aria-selected=${key === this.currentMonthIndex}
                  role="option"
                  label=${month}
                  tabIndex=${this.monthToBeFocused === key ? 0 : -1} 
                  ${(this.monthToBeFocused === key) && ref(this.focusMonthRef)}
                  plain key=${key} @click=${(event: Event) => this.#selectMonth(event, month, key)}>${month}
                </pf-button>
              </li>`;
            })}
          </ul>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideClick);
  }

  // Function to focus month on keyboard navigation
  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('monthToBeFocused')) {
      const month: HTMLButtonElement | undefined = this.focusMonthRef.value!;
      month?.focus();
    }
  }

  // Function to handle closing of month select popup on clicking outside
  @bound private _onOutsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this.datePickerMonthToggle) && this.isMonthExpanded) {
      this.isMonthExpanded = false;
    }
  }

  // Function to dispatch selected month
  #selectMonth(event: Event, monthName: string, monthIndex: number) {
    this.currentMonthIndex = monthIndex;
    if (monthName && (monthName.toString() !== this.currentMonthName)) {
      this.currentMonthName = monthName.toString();
      this.dispatchEvent(new MonthChangeEvent(event, this.currentMonthName, this.currentMonthIndex));
    }
    this.isMonthExpanded = !this.isMonthExpanded;
  }

  // Function to handle focus on keyboard navigation
  #onMonthSelectKeydown(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        if (this.monthToBeFocused > 0) {
          this.monthToBeFocused = this.monthToBeFocused - 1;
        } else {
          this.monthToBeFocused = 11;
        }
        break;
      case 'ArrowDown':
        if (this.monthToBeFocused < 11) {
          this.monthToBeFocused = this.monthToBeFocused + 1;
        } else {
          this.monthToBeFocused = 0;
        }
        break;
    }
  }

  // Function to dispatch value to handle the opening and closing of month select popup
  #showMonthSelect(event: Event) {
    this.isMonthExpanded = !this.isMonthExpanded;
    this.monthToBeFocused = -1;
    this.dispatchEvent(new MonthPopupStateChangeEvent(event, this.isMonthExpanded));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-month-select': PfMonthSelect;
  }
}
