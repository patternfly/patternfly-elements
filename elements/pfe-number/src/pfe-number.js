// Import polyfills: isNaN
import "./polyfills--pfe-number.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import numeral from "numeral";

// easy aliases for common format strings
const types = {
  abbrev: "0a", // or 'approx'?
  ordinal: "0o",
  percent: "0%",
  bytes: "0[.][00] ib",
  e: "0[.00]e+0",
  thousands: "0,0[.][00]"
};

// use thin spaces to separate thousands chunks
// debugger;
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

  static get observedAttributes() {
    return ["number", "format", "type"];
  }

  constructor() {
    super(PfeNumber);
  }

  connectedCallback() {
    super.connectedCallback();
    this.connected = true;

    this._determineFormat();
    this._setInitialNumber();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(...arguments);
    switch (attr) {
      case "type":
        this._determineFormat();
        break;
      case "format":
        this._updateNumber(this.getAttribute("number"), newVal);
        break;
      case "number":
        this._updateNumber(newVal, this.getAttribute("format"));
    }
  }

  _setInitialNumber() {
    const numberAttrDefined = !isNaN(parseFloat(this.getAttribute("number")));
    const numberContentDefined = !isNaN(parseFloat(this.textContent));

    if (numberAttrDefined) {
      this.setAttribute("number", this.getAttribute("number"));
    } else if (numberContentDefined) {
      this.setAttribute("number", this.textContent);
    }
  }

  _determineFormat() {
    let type = this.getAttribute("type");

    if (type && types[type]) {
      this.setAttribute("format", types[type]);
    } else {
      this.setAttribute("format", this.getAttribute("format") || "0");
    }
  }

  _updateNumber(num, type) {
    if (!num || isNaN(parseFloat(num))) {
      this.textContent = "";
      this.shadowRoot.querySelector("span").textContent = "";

      return;
    }

    this.textContent = num;
    this.shadowRoot.querySelector("span").textContent = this._format(num, type);
  }

  _format(num, type) {
    return numeral(num).format(type);
  }
}

PFElement.create(PfeNumber);
