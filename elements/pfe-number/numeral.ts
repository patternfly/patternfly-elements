// Hi
// This file was ported from http://npm.im/numeral, an npm package last updated 5 years ago
// I've made the minimal effort to modernize it
// But there's still lots of code that can be removed, updated, and improved,

/* eslint-disable */

/* ! @preserve
 * numeral.js
 * version : 2.0.6
 * author : Adam Draper
 * license : MIT
 * http://adamwdraper.github.com/Numeral-js/
 */

/** **********************************
        Variables
    ************************************/

export default function numeral(input: number|string|Numeral): Numeral {
  let value;
  let kind;
  let unformatFunction;
  let regexp;

  if (numeral.isNumeral(input))
    value = input.value();
  else if (input === 0 || typeof input === 'undefined')
    value = 0;
  else if (input === null || Number.isNaN(input))
    value = null;
  else if (typeof input === 'string') {
    if (options.zeroFormat && input === options.zeroFormat)
      value = 0;
    else if (
      options.nullFormat &&
      input ===
      options.nullFormat ||
      !input.replace(/[^0-9]+/g, '').length
    )
      value = null;
    else {
      for (kind in formats) {
        if (Object.prototype.hasOwnProperty.call(formats, kind)) {
          regexp =
            typeof formats[kind].regexps.unformat === 'function' ?
              formats[kind].regexps.unformat()
              : formats[kind].regexps.unformat;

          if (regexp && input.match(regexp)) {
            unformatFunction = formats[kind].unformat;

            break;
          }
        }
      }

      unformatFunction = unformatFunction || numeral._.stringToNumber;

      value = unformatFunction(input);
    }
  } else
    value = Number(input) || null;


  return new Numeral(input as number, value);
}

const _ = {
  // formats numbers separators, decimals places, signs, abbreviations
  numberToFormat(value: number, format: string, roundingFunction: Function) {
    const locale = locales[numeral.options.currentLocale];
    let negP = false;
    let optDec = false;
    let leadingCount = 0;
    let abbr = '';
    const trillion = 1000000000000;
    const billion = 1000000000;
    const million = 1000000;
    const thousand = 1000;
    let decimal = '';
    let neg = false;
    let abbrForce; // force abbreviation
    let abs;
    let min;
    let max;
    let power;
    let int;
    let precision;
    let signed;
    let thousands;
    let output;

    // make sure we never format a null value
    value = value || 0;

    abs = Math.abs(value);

    // see if we should use parentheses for negative number or if we should prefix with a sign
    // if both are present we default to parentheses
    if (numeral._.includes(format, '(')) {
      negP = true;
      format = format.replace(/[\(|\)]/g, '');
    } else if (numeral._.includes(format, '+') || numeral._.includes(format, '-')) {
      signed = numeral._.includes(format, '+') ? format.indexOf('+') : value < 0 ? format.indexOf('-') : -1;
      format = format.replace(/[\+|\-]/g, '');
    }

    // see if abbreviation is wanted
    if (numeral._.includes(format, 'a')) {
      abbrForce = format.match(/a(k|m|b|t)?/);

      abbrForce = abbrForce ? abbrForce[1] : false;

      // check for space before abbreviation
      if (numeral._.includes(format, ' a'))
        abbr = ' ';


      format = format.replace(new RegExp(`${abbr}a[kmbt]?`), '');

      if (abs >= trillion && !abbrForce || abbrForce === 't') {
        // trillion
        abbr += locale.abbreviations.trillion;
        value = value / trillion;
      } else if (abs < trillion && abs >= billion && !abbrForce || abbrForce === 'b') {
        // billion
        abbr += locale.abbreviations.billion;
        value = value / billion;
      } else if (abs < billion && abs >= million && !abbrForce || abbrForce === 'm') {
        // million
        abbr += locale.abbreviations.million;
        value = value / million;
      } else if (abs < million && abs >= thousand && !abbrForce || abbrForce === 'k') {
        // thousand
        abbr += locale.abbreviations.thousand;
        value = value / thousand;
      }
    }

    // check for optional decimals
    if (numeral._.includes(format, '[.]')) {
      optDec = true;
      format = format.replace('[.]', '.');
    }

    // break number and format
    int = value.toString().split('.')[0];
    precision = format.split('.')[1];
    thousands = format.indexOf(',');
    leadingCount = (format.split('.')[0].split(',')[0].match(/0/g) || []).length;

    if (precision) {
      if (numeral._.includes(precision, '[')) {
        precision = precision.replace(']', '');
        precision = precision.split('[');
        // @ts-ignore
        decimal = numeral._.toFixed(
          value,
          (precision[0].length + precision[1].length),
          roundingFunction,
          precision[1].length
        );
      } else
      // @ts-ignore
        decimal = numeral._.toFixed(value, precision.length, roundingFunction);


      int = decimal.split('.')[0];

      if (numeral._.includes(decimal, '.'))
        decimal = locale.delimiters.decimal + decimal.split('.')[1];
      else
        decimal = '';


      if (optDec && Number(decimal.slice(1)) === 0)
        decimal = '';
    } else
    // @ts-ignore
      int = numeral._.toFixed(value, 0, roundingFunction);


    // check abbreviation again after rounding
    if (abbr && !abbrForce && Number(int) >= 1000 && abbr !== locale.abbreviations.trillion) {
      int = String(Number(int) / 1000);

      switch (abbr) {
        case locale.abbreviations.thousand:
          abbr = locale.abbreviations.million;
          break;
        case locale.abbreviations.million:
          abbr = locale.abbreviations.billion;
          break;
        case locale.abbreviations.billion:
          abbr = locale.abbreviations.trillion;
          break;
      }
    }


    // format number
    if (numeral._.includes(int, '-')) {
      int = int.slice(1);
      neg = true;
    }

    if (int.length < leadingCount) {
      for (let i = leadingCount - int.length; i > 0; i--)
        int = `0${int}`;
    }

    if (thousands > -1)
      int = int.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${locale.delimiters.thousands}`);


    if (format.indexOf('.') === 0)
      int = '';


    output = int + decimal + (abbr ? abbr : '');

    if (negP)
      output = (negP && neg ? '(' : '') + output + (negP && neg ? ')' : '');
    else {
      // @ts-ignore
      if (signed >= 0)
        output = signed === 0 ? (neg ? '-' : '+') + output : output + (neg ? '-' : '+');
      else if (neg)
        output = `-${output}`;
    }

    return output;
  },

  // unformats numbers separators, decimals places, signs, abbreviations
  stringToNumber(string: string) {
    const locale = locales[options.currentLocale];
    const stringOriginal = string;
    const abbreviations = {
      thousand: 3,
      million: 6,
      billion: 9,
      trillion: 12,
    };
    let abbreviation;
    let value;
    let i;
    let regexp;

    if (options.zeroFormat && string === options.zeroFormat)
      value = 0;
    else if (options.nullFormat && string === options.nullFormat || !string.replace(/[^0-9]+/g, '').length)
      value = null;
    else {
      value = 1;

      if (locale.delimiters.decimal !== '.')
        string = string.replace(/\./g, '').replace(locale.delimiters.decimal, '.');


      for (abbreviation in abbreviations) {
        regexp = new RegExp(`[^a-zA-Z]${locale.abbreviations[abbreviation]}(?:\\)|(\\${locale.currency.symbol})?(?:\\))?)?$`);

        if (stringOriginal.match(regexp)) {
          // @ts-ignore
          value *= Math.pow(10, abbreviations[abbreviation]);
          break;
        }
      }

      // check for negative number
      value *= (string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1;

      // remove non numbers
      string = string.replace(/[^0-9\.]+/g, '');

      value *= Number(string);
    }

    return value;
  },

  // @ts-ignore
  includes(string, search) {
    return string.indexOf(search) !== -1;
  },

  // @ts-ignore
  insert(string, subString, start) {
    return string.slice(0, start) + subString + string.slice(start);
  },

  /**
         * Computes the multiplier necessary to make x >= 1,
         * effectively eliminating miscalculations caused by
         * finite precision.
         */
  // @ts-ignore
  multiplier(x) {
    const parts = x.toString().split('.');

    return parts.length < 2 ? 1 : Math.pow(10, parts[1].length);
  },

  /**
         * Given a variable number of arguments, returns the maximum
         * multiplier that must be used to normalize an operation involving
         * all of them.
         */
  correctionFactor() {
    const args = Array.prototype.slice.call(arguments);

    return args.reduce(function(accum, next) {
      const mn = _.multiplier(next);
      return accum > mn ? accum : mn;
    }, 1);
  },

  /**
         * Implementation of toFixed() that treats floats more like decimals
         *
         * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
         * problems for accounting- and finance-related software.
         */
  // @ts-ignore
  toFixed(value, maxDecimals, roundingFunction, optionals) {
    const splitValue = value.toString().split('.');
    const minDecimals = maxDecimals - (optionals || 0);
    let boundedPrecision;
    let optionalsRegExp;
    let power;
    let output;

    // Use the smallest precision value possible to avoid errors from floating point representation
    if (splitValue.length === 2)
      boundedPrecision = Math.min(Math.max(splitValue[1].length, minDecimals), maxDecimals);
    else
      boundedPrecision = minDecimals;


    power = Math.pow(10, boundedPrecision);

    // Multiply up by precision, round accurately, then divide and use native toFixed():
    output = (roundingFunction(`${value}e+${boundedPrecision}`) / power).toFixed(boundedPrecision);

    if (optionals > maxDecimals - boundedPrecision) {
      optionalsRegExp = new RegExp(`\\.?0{1,${optionals - (maxDecimals - boundedPrecision)}}$`);
      output = output.replace(optionalsRegExp, '');
    }

    return output;
  },
};

const VERSION = '2.0.6';
const formats: Record<string, Parameters<typeof numeral.register>[2]> = {};
const locales: Record<string, Parameters<typeof numeral.register>[2]> = {};
const defaults = {
  currentLocale: 'en',
  zeroFormat: null,
  nullFormat: null,
  defaultFormat: '0,0',
  scalePercentBy100: true,
};
const options = {
  currentLocale: defaults.currentLocale,
  zeroFormat: defaults.zeroFormat,
  nullFormat: defaults.nullFormat,
  defaultFormat: defaults.defaultFormat,
  scalePercentBy100: defaults.scalePercentBy100,
};


/** **********************************
        Constructors
    ************************************/

// Numeral prototype object
class Numeral {
  private _input: number;
  private _value: number;

  constructor(input: number, number: number) {
    this._input = input;
    this._value = number;
  }

  clone() {
    return numeral(this);
  }

  format(inputString?: string, roundingFunction?: Function) {
    const value = this._value;
    const format = inputString || options.defaultFormat;
    let kind;
    let output;
    let formatFunction;

    // make sure we have a roundingFunction
    roundingFunction = roundingFunction || Math.round;

    // format based on value
    if (value === 0 && options.zeroFormat !== null)
      output = options.zeroFormat;
    else if (value === null && options.nullFormat !== null)
      output = options.nullFormat;
    else {
      for (kind in formats) {
        if (format.match(formats[kind].regexps.format)) {
          formatFunction = formats[kind].format;

          break;
        }
      }

      formatFunction = formatFunction || numeral._.numberToFormat;

      output = formatFunction(value, format, roundingFunction);
    }

    return output;
  }

  value() {
    return this._value;
  }

  input() {
    return this._input;
  }

  set(value: string|number) {
    this._value = Number(value);

    return this;
  }

  add(value: number) {
    // @ts-ignore
    const corrFactor = _.correctionFactor.call(null, this._value, value);

    function cback(accum: number, curr: number) {
      return accum + Math.round(corrFactor * curr);
    }

    this._value = [this._value, value].reduce(cback, 0) / corrFactor;

    return this;
  }

  subtract(value: number) {
    // @ts-ignore
    const corrFactor = _.correctionFactor.call(null, this._value, value);

    function cback(accum: number, curr: number) {
      return accum - Math.round(corrFactor * curr);
    }

    this._value = [value].reduce(cback, Math.round(this._value as number * corrFactor)) / corrFactor;

    return this;
  }

  multiply(value: number) {
    function cback(accum: number, curr: number) {
      // @ts-ignore
      const corrFactor = _.correctionFactor(accum, curr);
      return (
        Math.round(accum * corrFactor) *
        Math.round(curr * corrFactor) /
        Math.round(corrFactor * corrFactor)
      );
    }

    this._value = [this._value, value].reduce(cback, 1);

    return this;
  }

  divide(value: number) {
    function cback(accum: number, curr: number) {
      // @ts-ignore
      const corrFactor = _.correctionFactor(accum, curr);
      return Math.round(accum * corrFactor) / Math.round(curr * corrFactor);
    }

    // @ts-ignore
    this._value = [this._value, value].reduce(cback);

    return this;
  }

  difference(value: number) {
    return Math.abs(numeral(this._value).subtract(value).value());
  }
}


// version number
numeral.version = VERSION;

// compare numeral object
numeral.isNumeral = function(obj: unknown): obj is Numeral {
  return obj instanceof Numeral;
};

// helper functions
numeral._ = _;

// avaliable options
numeral.options = options;

// avaliable formats
numeral.formats = formats;

// avaliable formats
numeral.locales = locales;

// This function sets the current locale.  If
// no arguments are passed in, it will simply return the current global
// locale key.
// @ts-ignore
numeral.locale = function(key) {
  if (key)
    options.currentLocale = key.toLowerCase();


  return options.currentLocale;
};

// This function provides access to the loaded locale data.  If
// no arguments are passed in, it will simply return the current
// global locale object.
// @ts-ignore
numeral.localeData = function(key) {
  if (!key)
    return locales[options.currentLocale];


  key = key.toLowerCase();

  if (!locales[key])
    throw new Error(`Unknown locale : ${key}`);


  return locales[key];
};

numeral.reset = function() {
  // @ts-ignore
  for (const property in defaults)
  // @ts-ignore
    options[property] = defaults[property];
};

// @ts-ignore
numeral.zeroFormat = function(format) {
  // @ts-ignore
  options.zeroFormat = typeof (format) === 'string' ? format : null;
};

// @ts-ignore
numeral.nullFormat = function(format) {
  // @ts-ignore
  options.nullFormat = typeof (format) === 'string' ? format : null;
};

// @ts-ignore
numeral.defaultFormat = function(format) {
  // @ts-ignore
  options.defaultFormat = typeof (format) === 'string' ? format : '0.0';
};

// @ts-ignore
numeral.register = function(type, name, format) {
  name = name.toLowerCase();

  // @ts-ignore
  if (this[`${type}s`][name])
    throw new TypeError(`${name} ${type} already registered.`);

  // @ts-ignore

  this[`${type}s`][name] = format;

  return format;
};


// @ts-ignore
numeral.validate = function(val, culture) {
  let _decimalSep;
  let _thousandSep;
  let _currSymbol;
  let _valArray;
  let _abbrObj;
  let _thousandRegEx;
  let localeData;
  let temp;

  // coerce val to string
  if (typeof val !== 'string') {
    val += '';

    if (console.warn)
      console.warn('Numeral.js: Value is not string. It has been co-erced to: ', val);
  }

  // trim whitespaces from either sides
  val = val.trim();

  // if val is just digits return true
  if (val.match(/^\d+$/))
    return true;


  // if val is empty return false
  if (val === '')
    return false;


  // get the decimal and thousands separator from numeral.localeData
  try {
    // check if the culture is understood by numeral. if not, default it to current locale
    localeData = numeral.localeData(culture);
  } catch (e) {
    // @ts-ignore
    localeData = numeral.localeData(numeral.locale());
  }

  // setup the delimiters and currency symbol based on culture/locale
  _currSymbol = localeData.currency.symbol;
  _abbrObj = localeData.abbreviations;
  _decimalSep = localeData.delimiters.decimal;
  if (localeData.delimiters.thousands === '.')
    _thousandSep = '\\.';
  else
    _thousandSep = localeData.delimiters.thousands;


  // validating currency symbol
  temp = val.match(/^[^\d]+/);
  if (temp !== null) {
    val = val.substr(1);
    if (temp[0] !== _currSymbol)
      return false;
  }

  // validating abbreviation symbol
  temp = val.match(/[^\d]+$/);
  if (temp !== null) {
    val = val.slice(0, -1);
    if (
      temp[0] !==
      _abbrObj.thousand &&
      temp[0] !==
      _abbrObj.million &&
      temp[0] !==
      _abbrObj.billion &&
      temp[0] !==
      _abbrObj.trillion
    )
      return false;
  }

  _thousandRegEx = new RegExp(`${_thousandSep}{2}`);

  if (!val.match(/[^\d.,]/g)) {
    _valArray = val.split(_decimalSep);
    if (_valArray.length > 2)
      return false;
    else {
      if (_valArray.length < 2)
        return ( !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx));
      else {
        if (_valArray[0].length === 1) {
          return (
            !!_valArray[0].match(/^\d+$/) &&
            !_valArray[0].match(_thousandRegEx) &&
            !!_valArray[1].match(/^\d+$/)
          );
        } else {
          return (
            !!_valArray[0].match(/^\d+.*\d$/) &&
            !_valArray[0].match(_thousandRegEx) &&
            !!_valArray[1].match(/^\d+$/)
          );
        }
      }
    }
  }

  return false;
};


/** **********************************
        Numeral Prototype
    ************************************/

numeral.fn = Numeral.prototype;

/** **********************************
        Default Locale && Format
    ************************************/

numeral.register('locale', 'en', {
  delimiters: {
    thousands: ',',
    decimal: '.',
  },
  abbreviations: {
    thousand: 'k',
    million: 'm',
    billion: 'b',
    trillion: 't',
  },
  // @ts-ignore
  ordinal(number) {
    const b = number % 10;
    return (~~(number % 100 / 10) === 1) ? 'th'
                : (b === 1) ? 'st'
                : (b === 2) ? 'nd'
                : (b === 3) ? 'rd' : 'th';
  },
  currency: {
    symbol: '$',
  },
});


numeral.register('format', 'bps', {
  regexps: {
    format: /(BPS)/,
    unformat: /(BPS)/,
  },
  // @ts-ignore
  format(value, format, roundingFunction) {
    const space = numeral._.includes(format, ' BPS') ? ' ' : '';
    let output;

    value = value * 10000;

    // check for space before BPS
    format = format.replace(/\s?BPS/, '');

    output = numeral._.numberToFormat(value, format, roundingFunction);

    if (numeral._.includes(output, ')')) {
      output = output.split('');

      output.splice(-1, 0, `${space}BPS`);

      output = output.join('');
    } else
      output = `${output + space}BPS`;


    return output;
  },
  // @ts-ignore
  unformat(string) {
    // @ts-ignore
    // @ts-ignore
    return +(numeral._.stringToNumber(string) * 0.0001).toFixed(15);
  },
});


const decimal = {
  base: 1000,
  suffixes: ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
};
const binary = {
  base: 1024,
  suffixes: ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
};

const allSuffixes = decimal.suffixes.concat(binary.suffixes.filter(function(item) {
  return decimal.suffixes.indexOf(item) < 0;
}));
let unformatRegex = allSuffixes.join('|');
// Allow support for BPS (http://www.investopedia.com/terms/b/basispoint.asp)
unformatRegex = `(${unformatRegex.replace('B', 'B(?!PS)')})`;

numeral.register('format', 'bytes', {
  regexps: {
    format: /([0\s]i?b)/,
    unformat: new RegExp(unformatRegex),
  },
  // @ts-ignore
  format(value, format, roundingFunction) {
    let output;
    const bytes = numeral._.includes(format, 'ib') ? binary : decimal;
    let suffix = numeral._.includes(format, ' b') || numeral._.includes(format, ' ib') ? ' ' : '';
    let power;
    let min;
    let max;

    // check for space before
    format = format.replace(/\s?i?b/, '');

    for (power = 0; power <= bytes.suffixes.length; power++) {
      min = Math.pow(bytes.base, power);
      max = Math.pow(bytes.base, power + 1);

      if (value === null || value === 0 || value >= min && value < max) {
        suffix += bytes.suffixes[power];

        if (min > 0)
          value = value / min;


        break;
      }
    }

    output = numeral._.numberToFormat(value, format, roundingFunction);

    return output + suffix;
  },
  // @ts-ignore
  // @ts-ignore
  unformat(string) {
    let value = numeral._.stringToNumber(string);
    let power;
    let bytesMultiplier;

    if (value) {
      for (power = decimal.suffixes.length - 1; power >= 0; power--) {
        if (numeral._.includes(string, decimal.suffixes[power])) {
          bytesMultiplier = Math.pow(decimal.base, power);

          break;
        }

        if (numeral._.includes(string, binary.suffixes[power])) {
          bytesMultiplier = Math.pow(binary.base, power);

          break;
        }
      }

      value *= (bytesMultiplier || 1);
    }

    return value;
  },
});


numeral.register('format', 'currency', {
  regexps: {
    format: /(\$)/,
  },
  // @ts-ignore
  format(value, format, roundingFunction) {
    const locale = numeral.locales[numeral.options.currentLocale];
    const symbols = {
      before: format.match(/^([\+|\-|\(|\s|\$]*)/)[0],
      after: format.match(/([\+|\-|\)|\s|\$]*)$/)[0],
    };
    let output;
    let symbol;
    let i;

    // strip format of spaces and $
    format = format.replace(/\s?\$\s?/, '');

    // format the number
    output = numeral._.numberToFormat(value, format, roundingFunction);

    // update the before and after based on value
    if (value >= 0) {
      symbols.before = symbols.before.replace(/[\-\(]/, '');
      symbols.after = symbols.after.replace(/[\-\)]/, '');
    } else if (
      value <
      0 &&
      (!numeral._.includes(symbols.before, '-') && !numeral._.includes(symbols.before, '('))
    )
      symbols.before = `-${symbols.before}`;


    // loop through each before symbol
    for (i = 0; i < symbols.before.length; i++) {
      symbol = symbols.before[i];

      switch (symbol) {
        case '$':
          output = numeral._.insert(output, locale.currency.symbol, i);
          break;
        case ' ':
          output = numeral._.insert(output, ' ', i + locale.currency.symbol.length - 1);
          break;
      }
    }

    // loop through each after symbol
    for (i = symbols.after.length - 1; i >= 0; i--) {
      symbol = symbols.after[i];

      switch (symbol) {
        case '$':
          output =
            i === symbols.after.length - 1 ?
              output + locale.currency.symbol
              : numeral._.insert(output, locale.currency.symbol, -(symbols.after.length - (1 + i)));
          break;
        case ' ':
          output = i === symbols.after.length - 1 ? `${output} ` : numeral._.insert(output, ' ', -(symbols.after.length - (1 + i) + locale.currency.symbol.length - 1));
          break;
      }
    }


    return output;
  },
});


numeral.register('format', 'exponential', {
  regexps: {
    format: /(e\+|e-)/,
    unformat: /(e\+|e-)/,
  },
  // @ts-ignore
  format(value, format, roundingFunction) {
    let output;
    const exponential = typeof value === 'number' && !Number.isNaN(value) ?
      value.toExponential()
      : '0e+0';
    const parts = exponential.split('e');

    format = format.replace(/e[\+|\-]{1}0/, '');

    output = numeral._.numberToFormat(Number(parts[0]), format, roundingFunction);

    return `${output}e${parts[1]}`;
  },
  // @ts-ignore
  unformat(string) {
    const parts = numeral._.includes(string, 'e+') ? string.split('e+') : string.split('e-');
    const value = Number(parts[0]);
    let power = Number(parts[1]);

    power = numeral._.includes(string, 'e-') ? power *= -1 : power;

    // @ts-ignore
    function cback(accum, curr, currI, O) {
      // @ts-ignore
      const corrFactor = numeral._.correctionFactor(accum, curr);
      const num = (accum * corrFactor) * (curr * corrFactor) / (corrFactor * corrFactor);
      return num;
    }

    return [value, Math.pow(10, power)].reduce(cback, 1);
  },
});


numeral.register('format', 'ordinal', {
  regexps: {
    format: /(o)/,
  },
  // @ts-ignore
  format(value, format, roundingFunction) {
    const locale = numeral.locales[numeral.options.currentLocale];
    let output;
    let ordinal = numeral._.includes(format, ' o') ? ' ' : '';

    // check for space before
    format = format.replace(/\s?o/, '');

    ordinal += locale.ordinal(value);

    output = numeral._.numberToFormat(value, format, roundingFunction);

    return output + ordinal;
  },
});


numeral.register('format', 'percentage', {
  regexps: {
    format: /(%)/,
    unformat: /(%)/,
  },
  // @ts-ignore
  format(value, format, roundingFunction) {
    const space = numeral._.includes(format, ' %') ? ' ' : '';
    let output;

    if (numeral.options.scalePercentBy100)
      value = value * 100;


    // check for space before %
    format = format.replace(/\s?\%/, '');

    output = numeral._.numberToFormat(value, format, roundingFunction);

    if (numeral._.includes(output, ')')) {
      output = output.split('');

      output.splice(-1, 0, `${space}%`);

      output = output.join('');
    } else
      output = `${output + space}%`;


    return output;
  },
  // @ts-ignore
  unformat(string) {
    const number = numeral._.stringToNumber(string);
    if (numeral.options.scalePercentBy100)
    // @ts-ignore
      return number * 0.01;

    return number;
  },
});


numeral.register('format', 'time', {
  regexps: {
    format: /(:)/,
    unformat: /(:)/,
  },
  // @ts-ignore
  // @ts-ignore
  format(value: number, format: string, roundingFunction: Function) {
    const hours = Math.floor(value / 60 / 60);
    const minutes = Math.floor((value - (hours * 60 * 60)) / 60);
    const seconds = Math.round(value - (hours * 60 * 60) - (minutes * 60));

    return `${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  },
  unformat(string: string) {
    const timeArray = string.split(':');
    let seconds = 0;

    // turn hours and minutes into seconds and add them all up
    if (timeArray.length === 3) {
      // hours
      seconds = seconds + (Number(timeArray[0]) * 60 * 60);
      // minutes
      seconds = seconds + (Number(timeArray[1]) * 60);
      // seconds
      seconds = seconds + Number(timeArray[2]);
    } else if (timeArray.length === 2) {
      // minutes
      seconds = seconds + (Number(timeArray[0]) * 60);
      // seconds
      seconds = seconds + Number(timeArray[1]);
    }
    return Number(seconds);
  },
});
