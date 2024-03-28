import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { state } from 'lit/decorators/state.js';
import { property } from 'lit/decorators/property.js';
import '@patternfly/elements/pf-icon/pf-icon.js';
import '@patternfly/elements/pf-button/pf-button.js';
import '@patternfly/elements/pf-popover/pf-popover.js';
import { ComposedEvent } from '@patternfly/pfe-core/core.js';
import { PfPopover } from '@patternfly/elements/pf-popover/pf-popover.js';
import { bound } from '@patternfly/pfe-core/decorators.js';
import { query } from 'lit/decorators/query.js';
import { classMap } from 'lit/directives/class-map.js';
import {
  days,
  getDateFormat,
  getDateValues,
  getDatePatternFromLocale,
  getRegexPattern,
  getMonthNamesFromLocale
} from './date-picker-helper.js';
import styles from './pf-date-picker.css';
import './pf-previous-button.js';
import './pf-month-select.js';
import './pf-year-input.js';
import './pf-next-button.js';
import './pf-calendar.js';
import { PreviousButtonClickEvent } from './pf-previous-button.js';
import { NextButtonClickEvent } from './pf-next-button.js';
import { MonthChangeEvent, MonthPopupStateChangeEvent } from './pf-month-select.js';
import { DayChangeEvent, FocusChangeEvent, KeyboardNavigationFocusEvent } from './pf-calendar.js';

/**
 * Date Picker
 * @slot - Place element content here
 */

interface ErrorMessages{
  inValid: string;
  lessThanMinDate: string;
  greaterThanMaxDate: string;
}

export class DateChangeEvent extends ComposedEvent {
  constructor(public event: Event, public value: Date | null ) {
    super('selectedDate');
  }
}

/*
 * Date Picker
 * @slot - Place element content here
 */
@customElement('pf-date-picker')
export class PfDatePicker extends LitElement {
  static readonly styles = [styles];

  private _currentDate: Date = new Date();
  private errorMessages: ErrorMessages = {
    inValid: 'Invalid date',
    lessThanMinDate: 'Date is before the allowable range.',
    greaterThanMaxDate: 'Date is after the allowable range.'
  };

  @state() private isDateValid = true; // Checks if the date enetered by user in the input box is valid or not
  @state() private isValid = true; // Checks if the year enetered by user in the year input box is valid or not
  @state() private monthExpand = false; // Handles the closing and opening of the Month select

  @query('#date-input') _textInput!: HTMLInputElement; // Date picker input box reference
  @query('#popover') private _popover!: PfPopover; // Popover reference

  // ----------- Input properties from parent ------------ //
  @property({ reflect: true }) minDate: Date = new Date(1900, 0, 1); // Default minimum valid date set as 1st January 1900
  @property({ reflect: true }) maxDate: Date = new Date(9999, 11, 31); // Default maximum valid date set as 31st December 9999
  @property({ reflect: true }) inputDate!: Date; // Handle date value parent value sends to the component
  @property({ reflect: true }) isDisabled = false; // Handles if the date picker is disabled or not
  @property({ reflect: true }) localizationLanguageCode!: string; // Language code for date format based on localization
  @property({ reflect: true }) translationLanguageCode!: string; // Language code for translation of date input and month names
  @property({ reflect: true }) dateFormatInput!: // Date format input from parent
  'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY/MM/DD' | 'YYYY/DD/MM' | 'DD-MM-YYYY' | 'MM-DD-YYYY' | 'YYYY-MM-DD' |
  'YYYY-DD-MM' | 'DD.MM.YYYY' | 'MM.DD.YYYY' | 'YYYY.MM.DD' | 'YYYY.DD.MM';
  // ------------- //

  // 'current' refers to the temporary values of Month and Year the user selected before day is selected
  // and the input box is updated
  @property() monthNames: string[] = getMonthNamesFromLocale(this.translationLanguageCode);
  @property() currentMonthSelection: string = this.monthNames[this._currentDate.getMonth()];
  @property() currentMonthIndex: number = this._currentDate.getMonth();
  @property() currentYear: number = this._currentDate.getFullYear();

  // 'selected' refers to the active selected values of day, Month and Year the user selected
  // which is updated in the input box
  @property() selectedDay!: number | null;
  @property() selectedMonthIndex: number = this._currentDate.getMonth();
  @property() selectedMonthSelection: string = this.monthNames[this._currentDate.getMonth()];
  @property() selectedYear: number = this._currentDate.getFullYear();
  @property() formattedDate = ''; // The value which is updated in the date-picker input box
  @property() errorMessage!: string; // Handle the error message on invalid date
  @property() dateSelected!: Date; // The date selected by the user
  @property() dayToBeFocused!: number; // Handles the day that needs to be focused
  @property() dayToBeFocusedRef!: HTMLButtonElement | undefined; // Reference of the day that needs to be focused
  @property() firstDayToBeFocused!: number; // Handles the day to be focused on popover open
  @property() dateFormat: string = getDatePatternFromLocale(this.localizationLanguageCode, this.dateFormatInput); // Date format
  private minYear: number = new Date(this.minDate).getFullYear(); // Minimum Valid Year
  private maxYear: number = new Date(this.maxDate).getFullYear(); // Maximum Valid Year

  constructor() {
    super();
  }

  connectedCallback() {
    super.connectedCallback();
    document.addEventListener('click', this._onOutsideClick);
    this.#init();
    if (this.translationLanguageCode) {
      this.monthNames = getMonthNamesFromLocale(this.translationLanguageCode);
    }
    if (this.dateFormatInput || this.localizationLanguageCode) {
      this.dateFormat = getDatePatternFromLocale(this.localizationLanguageCode, this.dateFormatInput);
    }
  }

  render() {
    this.minDate = new Date(this.minDate);
    this.maxDate = new Date(this.maxDate);
    const invalidIconClasses = { isDateInvalid: !this.isDateValid, hidden: this.isDateValid };
    const invalidTextClasses = { showInvalidText: !this.isDateValid, hidden: this.isDateValid };
    const invalidInputClasses = { invalidDateInput: !this.isDateValid };

    return html`
      <div class="date-picker-container">
        <div class="datepicker">
          <div class="date-input-box">
            <div class="date-input-box-container">
              <input 
                type="text" 
                aria-label="Date picker"
                @input=${this.#onInput} 
                .value=${this.formattedDate ?? ''} 
                @click=${this.#dateInputClick}
                id="date-input" 
                .disabled=${this.isDisabled}
                placeholder=${this.dateFormat} 
                class=${classMap(invalidInputClasses)}
              />
              <pf-icon class=${classMap(invalidIconClasses)} size="md" icon="exclamation-circle" set="fas"></pf-icon>
              <div class=${classMap(invalidTextClasses)}> ${this.errorMessage} </div>
            </div>
            <pf-popover class=${this.isDisabled && 'disable-popover'} id="popover" part="popover" hide-close no-outside-click>
              <div part="toggle" class="date-picker-toggle-container">
                <pf-button 
                  label="Toggle date picker" 
                  .disabled=${this.isDisabled} 
                  id="datePickerToggleButton" 
                  @click=${this.#openPopover} 
                  variant="control" 
                  part="toggle-button"
                  class="date-picker-calendar-icon">
                    <pf-icon icon="calendar-alt" set="far" size="md"></pf-icon>
                </pf-button>
              </div>
              <div slot="body">
                <div class="calendar" id="calendarWrapper">
                  <div class="date-picker-table" id="datePickerTableContent">
                    <div class="date-picker-table-row date-picker-table-main-header">
                      <div class="date-picker-table-col">
                        <pf-previous-button 
                          .currentYear=${this.currentYear} 
                          .currentMonth=${this.currentMonthIndex} 
                          @previousMonthAndYear=${this.#getPreviousMonthAndYear}>
                        </pf-previous-button>
                      </div>
                      <div class="date-picker-table-col date-picker-table-month-year">
                        <pf-month-select 
                          .currentMonthName=${this.currentMonthSelection} 
                          @currentMonth=${this.#getCurrentMonth}
                          .translationLanguageCode=${this.translationLanguageCode}
                          @monthExpandState=${this.#getMonthExpandState}
                          .isMonthExpanded=${this.monthExpand}>
                        </pf-month-select>
                        <pf-year-input 
                          .currentYear=${this.currentYear} 
                          @setCurrentYear=${this.#getCurrentYear}
                          @currentYearOnStep=${this.#getCurrentStepValue}
                          .minDate=${this.minDate}
                          .maxDate=${this.maxDate}>
                        </pf-year-input>
                      </div>
                      <div class="date-picker-table-col">
                        <pf-next-button 
                          .currentYear=${this.currentYear} 
                          .currentMonth=${this.currentMonthIndex} 
                          @nextMonthAndYear=${this.#getNextMonthAndYear}>
                        </pf-next-button>
                      </div>
                    </div>
                    <div class="date-picker-table-row date-picker-week-days">
                      ${days.map((day: string) => {
                        return html`
                          <div class="date-picker-table-col">
                            ${day}
                          </div>
                        `;
                      })}
                    </div>
                    <pf-calendar 
                      .currentYear=${this.currentYear} 
                      .currentMonth=${this.currentMonthIndex}
                      @daySelected=${this.#getDaySelected}
                      .dateSelected=${this.dateSelected}
                      .selectedDay=${this.selectedDay}
                      .dayToBeFocused=${this.dayToBeFocused}
                      .firstDayToBeFocused=${this.firstDayToBeFocused}
                      .translationLanguageCode=${this.translationLanguageCode}
                      .minDate=${this.minDate}
                      .maxDate=${this.maxDate}
                      @setDateFocus=${this.#getDayRefToBeFocused}
                      @onCalendarKeydown=${this.#getFocusDate}>
                    </pf-calendar>
                  </div>
                </div>
              </div>
            </pf-popover>
          </div>
        </div>
      </div>
    `;
  }

  async #init() {
    await this.updateComplete;
    this.#setInputDate();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    document.removeEventListener('click', this._onOutsideClick);
  }

  // Function to handle the closing of popover and month select popup on outside click
  @bound private _onOutsideClick(event: MouseEvent) {
    const path = event.composedPath();
    if (!path.includes(this._popover)) {
      if (this.monthExpand) {
        this.monthExpand = false;
      } else {
        this._popover.hide();
      }
    }
  }

  // Function to set the date input from parent component
  #setInputDate() {
    if (this.inputDate) {
      this.selectedDay = new Date(this.inputDate).getDate();
      this.selectedMonthIndex = new Date(this.inputDate).getMonth();
      this.selectedYear = new Date(this.inputDate).getFullYear();
      this.selectedMonthSelection = this.monthNames[this.selectedMonthIndex];
      this.currentMonthIndex = new Date(this.inputDate).getMonth();
      this.currentMonthSelection = this.monthNames[this.currentMonthIndex];
      this.currentYear = new Date(this.inputDate).getFullYear();
      this.dateSelected = this.inputDate;
      this.#setDayToBeFocused();
      this.#getFormattedDate();
    }
  }

  // Function to get the reference of the button that needs to be focused
  #getDayRefToBeFocused(event: FocusChangeEvent) {
    this.dayToBeFocusedRef = event.dateToBeFocusedRef;
  }

  // Function to get the month user selected
  #getCurrentMonth(event: MonthChangeEvent) {
    this.currentMonthSelection = event.name;
    this.currentMonthIndex = event.index;
    this.#setDayToBeFocused();
  }

  // Function to get the year user entered
  #getCurrentYear(event: CustomEvent) {
    if (event.detail < 100) {
      this.currentYear = this.#validateYearInput(event.detail);
    } else {
      this.currentYear = event.detail;
    }
    this.#setDayToBeFocused();
  }

  // Function to get the year user entered on KeyUp/KeyDown
  #getCurrentStepValue(event: CustomEvent) {
    this.currentYear = this.#validateYearInput(event.detail);
    this.#setDayToBeFocused();
  }

  // Function to check if the year entered by the user is valid or not
  #validateYearInput(year: number) {
    this.minYear = new Date(this.minDate).getFullYear();
    this.maxYear = new Date(this.maxDate).getFullYear();
    const yearInput: number = year;

    this.isValid = yearInput > this.minYear && yearInput < this.maxYear;
    if (this.isValid) {
      return yearInput;
    } else if (yearInput < this.minYear) {
      let inputYear: number;
      const date: Date = new Date(year, this.currentMonthIndex, this.selectedDay ?
        this.selectedDay : this._currentDate.getDate());

      if (date.getFullYear() >= this.minYear) {
        inputYear = date.getFullYear();
      } else {
        inputYear = year;
      }
      return inputYear;
    } else if (yearInput > this.maxYear) {
      return this.maxYear;
    } else {
      return this.currentYear;
    }
  }

  // Function to get the year and month on previous button click
  #getPreviousMonthAndYear(event: PreviousButtonClickEvent) {
    this.currentMonthSelection = this.monthNames[event.month];
    this.currentMonthIndex = event.month;
    this.currentYear = event.year;
    this.#setDayToBeFocused();
  }

  // Function to get the year and month on next button click
  #getNextMonthAndYear(event: NextButtonClickEvent) {
    this.currentMonthSelection = this.monthNames[event.month];
    this.currentMonthIndex = event.month;
    this.currentYear = event.year;
    this.#setDayToBeFocused();
  }

  // Function to get the day to be focused on KeyDown
  #getFocusDate(event: KeyboardNavigationFocusEvent) {
    this.currentMonthSelection = this.monthNames[event.month];
    this.currentMonthIndex = event.month;
    this.currentYear = event.year;
    this.dayToBeFocused = event.day;
  }

  // Function to get the selected day and set and update the input box
  #getDaySelected(event: DayChangeEvent) {
    this.selectedDay = event.day;
    this.currentMonthSelection = this.monthNames[event.month];
    this.currentMonthIndex = event.month;
    this.selectedMonthIndex = event.month;
    this.selectedYear = event.year;
    this.currentYear = event.year;
    this.selectedMonthSelection = this.monthNames[event.month];
    this.monthExpand = false;
    this.#getFormattedDate();
    this.#dispatchSelectedDate(event);
    this.isDateValid = true;
    this._popover.hide();
  }

  // Function to dispatch selected date values to the parent component
  #dispatchSelectedDate(event: Event) {
    if (this.selectedDay) {
      this.dateSelected = new Date(this.selectedYear, this.selectedMonthIndex, this.selectedDay);
      this.dispatchEvent(new DateChangeEvent(event, this.dateSelected));
    } else {
      this.dispatchEvent(new DateChangeEvent(event, null));
    }
  }

  // Function to get the month select expansion state
  #getMonthExpandState(event: MonthPopupStateChangeEvent) {
    this.monthExpand = event.isExpanded;
  }

  // Function to handle opening of Popover
  #openPopover() {
    if (this.isDateValid) {
      this.currentMonthIndex = this.selectedMonthIndex;
      this.currentYear = this.selectedYear;
      this.currentMonthSelection = this.selectedMonthSelection;
      if (this.selectedDay) {
        this.#getFormattedDate();
        this.firstDayToBeFocused = this.selectedDay;
      } else {
        this.firstDayToBeFocused = this._currentDate.getDate();
      }
    } else {
      this.currentMonthIndex = this._currentDate.getMonth();
      this.currentYear = this._currentDate.getFullYear();
      this.currentMonthSelection = this.monthNames[this.currentMonthIndex];
      this.firstDayToBeFocused = this._currentDate.getDate();
      this.selectedDay = null;
    }

    this.#setDayToBeFocused();
    setTimeout(() => {
      this.dayToBeFocusedRef?.focus();
    }, 50);
  }

  // Function to set the day to be focused
  #setDayToBeFocused() {
    const totalDays: number = new Date(this.currentYear, this.currentMonthIndex + 1, 0).getDate();
    if (this.isDateValid && this.selectedDay) {
      this.dayToBeFocused = this.selectedDay <= totalDays ? this.selectedDay : totalDays;
    } else {
      this.dayToBeFocused = this._currentDate.getDate();
    }
  }

  // Function to handle click on date input box
  #dateInputClick() {
    this._popover.hide();
    setTimeout(() => {
      this._textInput.focus();
    }, 1);
  }

  // Function to handle date input by user
  #onInput(event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.formattedDate = value;

    this.isDateValid = this.#isValidDate(value);

    if (this.isDateValid && value !== '') {
      const dateValues = getDateValues(value, this.localizationLanguageCode, this.dateFormatInput);
      this.selectedDay = dateValues.day;
      this.currentMonthIndex = dateValues.month - 1;
      this.currentMonthSelection = this.monthNames[this.currentMonthIndex];
      this.currentYear = dateValues.year;
      this.selectedMonthIndex = dateValues.month - 1;
      this.selectedYear = dateValues.year;
      this.selectedMonthSelection = this.monthNames[this.selectedMonthIndex];
      this.#dispatchSelectedDate(event);
    } else if (this.isDateValid && value === '') {
      this.selectedDay = null;
      this.currentMonthIndex = this._currentDate.getMonth();
      this.currentMonthSelection = this.monthNames[this.currentMonthIndex];
      this.currentYear = this._currentDate.getFullYear();
      this.selectedMonthIndex = this._currentDate.getMonth();
      this.selectedYear = this._currentDate.getFullYear();
      this.selectedMonthSelection = this.monthNames[this.selectedMonthIndex];
      this.#dispatchSelectedDate(event);
    }
  }

  // Function to check if the date user entered is valid or not
  #isValidDate(dateString: string) {
    let isValid = true;
    if (dateString) {
      const monthLength: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      // const regex = /^[0-9./-]*$/g;  // Commented for reference

      // Parse the date parts to integers
      const dateValues = getDateValues(dateString, this.localizationLanguageCode, this.dateFormatInput);
      const selectedDayInput: number = dateValues.day;
      const selectedMonthInput: number = dateValues.month;
      const selectedYearInput: number = dateValues.year;
      const date: Date = new Date(selectedYearInput, selectedMonthInput - 1, selectedDayInput);
      const regex = new RegExp(getRegexPattern(this.localizationLanguageCode, this.dateFormatInput));

      if (date.toString() === 'Invalid Date') {
        this.errorMessage = this.errorMessages.inValid;
        return false;
      }
      if (date < this.minDate) {
        this.errorMessage = this.errorMessages.lessThanMinDate;
        return false;
      }
      if (date > this.maxDate) {
        this.errorMessage = this.errorMessages.greaterThanMaxDate;
        return false;
      }

      // if (!dateString.match(regex)) { // Commented for reference
      if (!regex.test(dateString)) {
        isValid = false;
        this.errorMessage = this.errorMessages.inValid;
        return isValid;
      }

      // Check the ranges of month and year
      if (selectedYearInput < this.minYear || selectedYearInput > this.maxYear ||
          selectedMonthInput === 0 || selectedMonthInput > 12) {
        this.errorMessage = this.errorMessages.inValid;
        return false;
      }

      // Adjust for leap years
      if (selectedYearInput % 400 === 0 || (selectedYearInput % 100 !== 0 && selectedYearInput % 4 === 0)) {
        monthLength[1] = 29;
      }

      // Check the range of the day
      isValid = selectedDayInput > 0 && selectedDayInput <= monthLength[selectedMonthInput - 1];
      if (!isValid) {
        this.errorMessage = this.errorMessages.inValid;
      }
    } else if (dateString === '') {
      isValid = true;
    }

    return isValid;
  }

  // Function to get the formatted date string according to date format selected in parent component
  #getFormattedDate() {
    const monthSelected: number = this.currentMonthIndex + 1; // Months start at 0!
    const daySelected: number = this.selectedDay ? this.selectedDay : this._currentDate.getDate();
    const yearSelected: number = this.selectedYear;
    let dd: string = daySelected.toString();
    let mm: string = monthSelected.toString();
    const yyyy: string = yearSelected.toString();

    if (daySelected < 10) {
      dd = `0${dd}`;
    }
    if (monthSelected < 10) {
      mm = `0${mm}`;
    }

    this.formattedDate = getDateFormat(dd, mm, yyyy, this.localizationLanguageCode, this.dateFormatInput);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pf-date-picker': PfDatePicker;
  }
}
