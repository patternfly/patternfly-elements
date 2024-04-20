import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators/property.js';
import { ref, createRef } from 'lit/directives/ref.js';
import styles from './pf-calendar.css';
import {
  getFormattedDate,
  getMonthNamesFromLocale,
  defaultWeekdays,
  defaultWeeks
} from './date-picker-helper.js';
import { ComposedEvent } from '@patternfly/pfe-core/core.js';

export interface FocusedDateValues{
  day: number;
  month: number;
  year: number;
}

export interface CalendarDateValues{
  day: number;
  month: number;
  year: number;
  isCurrentMonth: boolean;
}

/**
 * Date Calendar
 * @slot - Place element content here
 */

export class DayChangeEvent extends ComposedEvent {
  constructor(public event: Event, public day: number, public month: number, public year: number) {
    super('daySelected');
  }
}

export class FocusChangeEvent extends ComposedEvent {
  constructor(public dateToBeFocusedRef: HTMLButtonElement | undefined) {
    super('setDateFocus');
  }
}

export class KeyboardNavigationFocusEvent extends ComposedEvent {
  constructor(public event: Event, public day: number, public month: number, public year: number) {
    super('onCalendarKeydown');
  }
}

/**
 * Calendar
 * @slot - Place element content here
 */
@customElement('pf-calendar')
export class PfCalendar extends LitElement {
  static readonly styles = [styles];

  private currentDate: Date = new Date();
  private weekdays: number[] = defaultWeekdays;
  private weeks: number[] = defaultWeeks;

  // Input properties from the parent
  @property() currentYear: number = this.currentDate.getFullYear();
  @property() currentMonth: number = this.currentDate.getMonth();
  @property() currentWeek = 0;
  @property() selectedDay: number = this.currentDate.getDate();
  @property() focusRef!: HTMLButtonElement;
  @property() dayToBeFocused!: number;
  @property() focusedDateValues!: FocusedDateValues;
  @property() dateSelected!: Date;
  @property() firstDayToBeFocused!: number;
  @property() minDate!: Date;
  @property() maxDate!: Date;
  @property() translationLanguageCode!: string;
  @property() monthNames: string[] = getMonthNamesFromLocale(this.translationLanguageCode);
  focusDateRef: any = createRef<HTMLButtonElement>(); // Reference to the button that needs to be focused

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    this.#init();
    if (this.translationLanguageCode) {
      this.monthNames = getMonthNamesFromLocale(this.translationLanguageCode);
    }
  }

  render() {
    this.focusedDateValues = getFormattedDate(new Date(this.currentYear, this.currentMonth, this.dayToBeFocused));

    // Get the total number of days of the current month
    const totalDays: number = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();

    // Find the day of the week for the first day of the month
    const firstDay: number = new Date(this.currentYear, this.currentMonth, 1).getDay();

    // Get the last date of the previous month
    const previousMonthLastDate: number = new Date(this.currentYear, this.currentMonth, 0).getDate();

    // Get the number of weeks in a month
    this.weeks = this.#getNoOfWeeks(this.currentYear, this.currentMonth);

    let day = 1;
    let nextMonthPointer = 0;

    return html`<div class="date-picker-table-tbody" id="calendarDatesList" @keydown=${this.#onCalendarKeydown}>
    ${this.weeks.map((week: number) => {
      return html`
        <div class="date-picker-table-row">
          ${this.weekdays.map((weekDay: number) => {
            let calendarDayTemplate: unknown;
            if (week === 0 && weekDay < firstDay) {
              // Add the last dates of the previous month
              const dateValue: CalendarDateValues = {
                day: (previousMonthLastDate - (firstDay - 1) + weekDay),
                month: this.currentMonth - 1,
                year: this.currentYear,
                isCurrentMonth: false
              };
              calendarDayTemplate = this.#renderCalendarDates(dateValue);
            } else if (day > totalDays) {
              // Add the first dates of the next month
              const dateValue: CalendarDateValues = {
                day: nextMonthPointer + 1,
                month: this.currentMonth + 1,
                year: this.currentYear,
                isCurrentMonth: false
              };
              calendarDayTemplate = this.#renderCalendarDates(dateValue);
              nextMonthPointer++;
            } else {
              // Add the dates of the current month
              const dateValue: CalendarDateValues = {
                day: day,
                month: this.currentMonth,
                year: this.currentYear,
                isCurrentMonth: true
              };
              calendarDayTemplate = this.#renderCalendarDates(dateValue);
              day++;
            }
            return calendarDayTemplate;
          })}
        </div>`;
      })}
    </div>`;
  }

  // Function to render the days of the calendar
  #renderCalendarDates(value: CalendarDateValues) {
    const isDayToBeFocused: boolean = ((value.day === this.dayToBeFocused) &&
      (value.month === this.focusedDateValues?.month) &&
      (value.year === this.focusedDateValues?.year));

    const selectedDate: Date = new Date(this.dateSelected);
    const isToday: boolean = ((value.day === this.currentDate.getDate()) &&
      (value.month === this.currentDate.getMonth()) &&
      (value.year === this.currentDate.getFullYear()));

    const isSelectedDay: boolean = ((value.day === selectedDate?.getDate()) &&
      (value.month === selectedDate?.getMonth()) &&
      (value.year === selectedDate?.getFullYear()));

    const dateRendering = new Date(value.year, value.month, value.day);
    const isDateInvalid = dateRendering.toString() === 'Invalid Date';
    const isDateDisabled: boolean = isDateInvalid || dateRendering < this.minDate || dateRendering > this.maxDate;

    const dateValue = html`<div class="date-picker-table-col">
                  <pf-button 
                    plain
                    label=${`${value.day} ${this.monthNames[value.month]} ${value.year}`}
                    tabIndex=${isDayToBeFocused ? 0 : -1}
                    ${value.isCurrentMonth && !isDateDisabled && isDayToBeFocused && ref(this.focusDateRef)}
                    value=${value.day} 
                    .disabled=${isDateDisabled}
                    @click=${(e: Event) => this.#selectDate(e, value.month, value.year)} 
                    class='${this.selectedDay && isSelectedDay ? 'selected-date' : ''} ${!value.isCurrentMonth ? 'previous-next-date' : ''} ${isToday ? 'isToday' : ''} calendar-date-button'>
                      ${value.day}
                  </pf-button>
                </div>`;

    return dateValue;
  }

  // Function to dispatch the selected date
  #selectDate(event: Event, month: number, year: number) {
    const { value } = event.target as HTMLButtonElement;
    const selectedDay: number = parseInt(value);
    let currentMonth: number = month;
    let currentYear: number = year;
    if (month < 0) {
      currentMonth = 11;
      currentYear = currentYear - 1;
    }
    if (month > 11) {
      currentMonth = 0;
      currentYear = currentYear + 1;
    }

    this.dispatchEvent(new DayChangeEvent(event, selectedDay, currentMonth, currentYear));
  }

  async #init() {
    await this.updateComplete;
    this.#setDateFocus();
  }

  // Function to focus date button;
  #setDateFocus() {
    const date: HTMLButtonElement = this.focusDateRef.value!;
    this.focusRef = date;
    setTimeout(() => {
      date?.focus();
    }, 25);
  }

  // Function to handle focus on property update
  updated() {
    this.dispatchEvent(new FocusChangeEvent(this.focusDateRef.value!));
    this.#setDateFocus();
  }

  // Funtion to handle focus based on arrow keys
  #onCalendarKeydown(event: KeyboardEvent) {
    const date = new Date(this.currentYear, this.currentMonth, this.dayToBeFocused);

    switch (event.key) {
      case 'ArrowUp':
        date.setDate(date.getDate() - 7);
        break;
      case 'ArrowDown':
        date.setDate(date.getDate() + 7);
        break;
      case 'ArrowLeft':
        date.setDate(date.getDate() - 1);
        break;
      case 'ArrowRight':
        date.setDate(date.getDate() + 1);
        break;
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      this.focusedDateValues = getFormattedDate(date);
      this.dispatchEvent(new KeyboardNavigationFocusEvent(event,
        this.focusedDateValues.day, this.focusedDateValues.month, this.focusedDateValues.year));
    }
  }

  // Find total number of weeks of the month
  #getNoOfWeeks(year: number, month: number) {
    const firstDayOfMonth: Date = new Date(year, month, 1);
    const lastDayOfMonth: Date = new Date(year, month + 1, 0);

    const totalNoOfDays: number = firstDayOfMonth.getDay() + lastDayOfMonth.getDate();
    const totalWeeks: number = Math.ceil( totalNoOfDays / 7);

    const weeks: number[] = [];

    for (let i = 0; i < totalWeeks; i++) {
      weeks.push(i);
    }
    return weeks;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-calendar': PfCalendar;
  }
}
