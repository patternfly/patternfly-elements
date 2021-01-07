// Import polyfills: isNaN
import "./polyfills--pfe-number.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import numeral from "numeral";

// use thin spaces to separate thousands chunks
numeral.locales.en.delimiters.thousands = " ";

class PfeNumber extends PFElement {
  static get tag() {
    return "pfe-number";
  }

  get styleUrl() {
    return "pfe-number.scss";
  }

  get templateUrl() {
    return "pfe-number.html";
  }

  static get properties() {
    return {
      number: {
        type: Number,
        title: "Number",
        observer: "_updateNumber"
      },

      _type: {
        type: String,
        title: "Type",
        observer: "_determineFormat"
      },

      format: {
        type: String,
        title: "Custom format",
        observer: "_updateNumber"
      }
    };
  }

  static get types() {
    return {
      abbrev: "0a", // or 'approx'?
      ordinal: "0o",
      percent: "0%",
      bytes: "0[.][00] ib",
      e: "0[.00]e+0",
      thousands: "0,0[.][00]"
    };
  }

  constructor() {
    super(PfeNumber);
  }

  connectedCallback() {
    super.connectedCallback();

    this._determineFormat();
    this._setInitialNumber();
  }

  _setInitialNumber() {
    const numberContentDefined = !isNaN(parseFloat(this.textContent));

    if (numberContentDefined) {
      // this.setAttribute("number", this.textContent);
      this.number = this.textContent;
    }
  }

  _determineFormat() {
    if (this._type && this.constructor.types[this._type]) {
      this.format = this.constructor.types[this._type];
    } else {
      this.format = this.format || "0";
    }
  }

  _updateNumber() {
    if (!this.number || isNaN(parseFloat(this.number))) {
      this.textContent = "";
      this.shadowRoot.querySelector("span").textContent = "";

      return;
    }

    this.textContent = this.number;
    this.shadowRoot.querySelector("span").textContent = this._format(this.number, this.format);
  }

  _format(num, formatString) {
    return numeral(num).format(formatString);
  }
}

PFElement.create(PfeNumber);
