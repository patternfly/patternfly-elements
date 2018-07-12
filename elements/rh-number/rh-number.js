import Rhelement from "../rhelement/rhelement.js";
import "../../numeral/numeral.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-number.html and css from
 * rh-number.css
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: inline;
  white-space: nowrap; }</style>
<span></span>
`;
/* end DO NOT EDIT */

// easy aliases for common format strings
const types = {
  abbrev: "0a", // or 'approx'?
  ordinal: "0o",
  percent: "0%",
  bytes: "0[.][00] ib",
  e: "0[.00]e+0",
  thousands: "0,0[.00]"
};

// use thin spaces to separate thousands chunks
// debugger;
numeral.locales.en.delimiters.thousands = " ";

class RhNumber extends Rhelement {
  static get observedAttributes() {
    return ["number"];
  }

  constructor() {
    super("rh-number", template);
  }

  connectedCallback() {
    super.connectedCallback();

    this._determineFormat();
    this._setInitialNumber();
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    // dynamically find handler function so other attributes can be watched
    // simply by creating a function with the right name to handle their
    // changes
    this[`_${attr}AttrUpdate`](oldVal, newVal);
  }

  _setInitialNumber() {
    const initialNumber =
      typeof this.number === "undefined" ? this.textContent : this.number;
    this.setAttribute("number", initialNumber);
  }

  _determineFormat() {
    let type = this.getAttribute("type");

    if (type && types[type]) {
      this.setAttribute("format", types[type]);
    } else {
      this.setAttribute("format", this.getAttribute("format") || "0");
    }
  }

  _numberAttrUpdate(oldVal, newVal) {
    this.shadowRoot.querySelector("span").textContent = numeral(newVal).format(
      this.getAttribute("format")
    );
  }
}

window.customElements.define("rh-number", RhNumber);
