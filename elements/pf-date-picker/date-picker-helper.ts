export interface DateFormatDetails {
  dateParts: string[];
  literal: string | undefined;
}

export interface InputDate {
  day: number;
  month: number;
  year: number;
  literal: string;
}

export const days: string[] = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

// Function to return date object
export const getFormattedDate = (date: Date) => {
  const focusDate = {
    day: date.getDate(),
    month: date.getMonth(),
    year: date.getFullYear()
  };

  return focusDate;
};


// Function to get the date format locale parts
export const getLocaleParts = (language?: string) => {
  // Get the browser user locale - Commented for reference
  // const userLocale: string = navigator.languages && navigator.languages.length ?
  //   navigator.languages[0] : navigator.language;

  const { timeZone } = Intl.DateTimeFormat().resolvedOptions();
  let formatter: Intl.DateTimeFormatPart[] = [];

  // Set date format options
  const options: Intl.DateTimeFormatOptions = {
    timeZone: timeZone,
    dateStyle: 'short',
    localeMatcher: 'lookup'
  };

  // If there is locale passed from parent, pass locale else use "default"
  const locale: string = language ? language : 'default';

  // Try - Catch block is used to catch error and format date using default locale if invalid locale is passed from parent
  try {
    // Get the date components breakdown array
    formatter = new Intl.DateTimeFormat(locale, options).formatToParts(new Date());
  } catch (error) {
    if (error) { // Get the date components breakdown array with default locale
      formatter = new Intl.DateTimeFormat('default', options).formatToParts(new Date());
    }
  }

  return formatter;
};


// Function to return the date values from user input
export const getDateValues = (dateString: string, languageCode?: string, dateFormatInput?: string) => {
  let parseDay!: number;
  let parseMonth!: number;
  let parseYear!: number;
  let splitWith!: string;

  // If there is a dateFormat input from parent, the input format will be applied
  // else date format will be generated and applied from languageCode input or default locale
  if (dateFormatInput && isInputDateFormatValid(dateFormatInput)) {
    const dateFormatDetails: DateFormatDetails = parseDateFormat(dateFormatInput);
    let index = 0;

    dateFormatDetails.dateParts.map((part: string) => { // Generate the date format
      switch (part) {
        case 'MM':
          parseMonth = index;
          index++;
          break;
        case 'DD':
          parseDay = index;
          index++;
          break;
        case 'YYYY':
          parseYear = index;
          index++;
          break;
        default:
          break;
      }
    });
    splitWith = dateFormatDetails.literal ? dateFormatDetails.literal : '/';
  } else {
    const formatter: Intl.DateTimeFormatPart[] = getLocaleParts(languageCode);
    let index = 0;

    formatter.map((part: Intl.DateTimeFormatPart) => { // Generate the date format
      switch (part.type) {
        case 'month':
          parseMonth = index;
          index++;
          break;
        case 'day':
          parseDay = index;
          index++;
          break;
        case 'year':
          parseYear = index;
          index++;
          break;
        default:
          splitWith = part.value;
      }
    });
  }

  const dateStringArray: string[] = dateString.split(splitWith);
  const selectedDayInput: number = parseInt(dateStringArray[parseDay], 10);
  const selectedMonthInput: number = parseInt(dateStringArray[parseMonth], 10);
  const selectedYearInput: number = parseInt(dateStringArray[parseYear], 10);
  const inputDate: InputDate = {
    day: selectedDayInput,
    month: selectedMonthInput,
    year: selectedYearInput,
    literal: splitWith
  };

  return inputDate;
};

// Function to return the fomatted date string
export const getDateFormat = (day: string, month: string, year: string, languageCode?: string, dateFormatInput?: string) => {
  let formattedDate = ``;
  const dd: string = day;
  const mm: string = month;
  const yyyy: string = year;

  // If there is a dateFormat input from parent, the input format will be applied
  // else date format will be generated and applied from languageCode input or default locale
  if (dateFormatInput && isInputDateFormatValid(dateFormatInput)) {
    const dateFormatDetails: DateFormatDetails = parseDateFormat(dateFormatInput);

    dateFormatDetails.dateParts.map((part: string, index: number) => { // Generate the date format
      switch (part) {
        case 'MM':
          formattedDate += `${mm}`;
          break;
        case 'DD':
          formattedDate += `${dd}`;
          break;
        case 'YYYY':
          formattedDate += `${yyyy}`;
          break;
        default:
          break;
      }
      if (index < 2) {
        formattedDate += dateFormatDetails.literal ? dateFormatDetails.literal : '/';
      }
    });
  } else {
    const formatter: Intl.DateTimeFormatPart[] = getLocaleParts(languageCode);

    formatter.map((part: Intl.DateTimeFormatPart) => { // Generate the date format
      switch (part.type) {
        case 'month':
          formattedDate += `${mm}`;
          break;
        case 'day':
          formattedDate += `${dd}`;
          break;
        case 'year':
          formattedDate += `${yyyy}`;
          break;
        default:
          formattedDate += part.value;
      }
    });
  }

  return formattedDate;
};

// Function to return date format based on date format input or locale
export const getDatePatternFromLocale = (languageCode?: string, dateFormatInput?: string) => {
  let localeDateFormat = '';

  // If there is a dateFormat input from parent, the input format will be applied
  // else date format will be generated and applied from languageCode input or default locale
  if (dateFormatInput && isInputDateFormatValid(dateFormatInput)) {
    localeDateFormat = dateFormatInput;
  } else {
    const formatter: Intl.DateTimeFormatPart[] = getLocaleParts(languageCode);

    formatter.map((part: Intl.DateTimeFormatPart) => { // Generate the date format
      switch (part.type) {
        case 'month':
          localeDateFormat += 'MM';
          break;
        case 'day':
          localeDateFormat += 'DD';
          break;
        case 'year':
          localeDateFormat += 'YYYY';
          break;
        default:
          localeDateFormat += part.value;
      }
    });
  }

  return localeDateFormat;
};

// Function to generate regex pattern based on date format input or locale
export const getRegexPattern = (languageCode?: string, dateFormatInput?: string) => {
  const regDay = '[0-9]{1,2}';
  const regMonth = '[0-9]{1,2}';
  const regYear = '[0-9]{2,4}';
  let regex = '^';

  // If there is a dateFormat input from parent, the input format will be applied
  // else date format will be generated and applied from languageCode input or default locale
  if (dateFormatInput && isInputDateFormatValid(dateFormatInput)) {
    const dateFormatDetails: DateFormatDetails = parseDateFormat(dateFormatInput);

    dateFormatDetails.dateParts.map((part: string, index: number) => { // Generate the date format
      switch (part) {
        case 'MM':
          regex += regMonth;
          break;
        case 'DD':
          regex += regDay;
          break;
        case 'YYYY':
          regex += regYear;
          break;
        default:
          break;
      }
      if (index < 2) {
        regex += dateFormatDetails.literal ? dateFormatDetails.literal : '/';
      }
    });
  } else {
    const formatter: Intl.DateTimeFormatPart[] = getLocaleParts(languageCode);

    formatter.map((part: Intl.DateTimeFormatPart) => { // Generate the regex for the date format according to locale
      switch (part.type) {
        case 'month':
          regex += regMonth;
          break;
        case 'day':
          regex += regDay;
          break;
        case 'year':
          regex += regYear;
          break;
        default:
          regex += part.value; // Will append the part literal '/' or '.' or '-' to the regex
          break;
      }
    });
  }
  regex += '$';

  return regex;
};

// Function to generate date parts array from date format input
export const parseDateFormat = (dateFormatInput: string) => {
  const literals: string[] = ['/', '-', '.']; // Supported date format literals
  let datePartsArray: string[] = [];

  const literal = literals.find((literal: string) => { // Find the literal in the format
    if (dateFormatInput.includes(literal)) {
      return literal;
    }
  });

  if (literal) {
    datePartsArray = dateFormatInput.split(literal); // Split the format to date parts
  }

  const dateFormatParts = {
    dateParts: datePartsArray,
    literal: literal
  };

  return dateFormatParts;
};

// Function to check validity of the date format input
export const isInputDateFormatValid = (dateFormatInput: string) => {
  let isDateFormatValid = false;
  const supportedDateFormats: string[] = [ // Supported date formats from parent
    'DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY/MM/DD', 'YYYY/DD/MM', 'DD-MM-YYYY', 'MM-DD-YYYY',
    'YYYY-MM-DD', 'YYYY-DD-MM', 'DD.MM.YYYY', 'MM.DD.YYYY', 'YYYY.MM.DD', 'YYYY.DD.MM'
  ];

  if (supportedDateFormats.includes(dateFormatInput)) {
    isDateFormatValid = true;
  } else {
    isDateFormatValid = false;
  }

  return isDateFormatValid;
};

export const getMonthNamesFromLocale = (languageCode?: string) => {
  const monthNames: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ];

  if (languageCode) {
    const date: Date = new Date();
    try {
      const translatedMonthNames: string[] = [];
      for (let i = 0; i < 12; i++) {
        date.setMonth(i);
        const monthName: string = new Intl.DateTimeFormat(languageCode, { month: 'long' }).format(new Date(date.getFullYear(), i, date.getDate()));
        translatedMonthNames.push(monthName);
      }
      return translatedMonthNames;
    } catch (error) {
      if (error) {
        return monthNames;
      }
    }
  }
  return monthNames;
};
