import numeral from "../../node_modules/numeral/min/numeral.min.js";

const numberTemplate = document.createElement("template");
numberTemplate.innerHTML = `
  <style>
    :host {
      display: inline;
      white-space: nowrap;
    }
  </style>

  <span></span>
`;

if (window.ShadyCSS) {
  ShadyCSS.prepareTemplate(numberTemplate, "rh-number");
}

// easy aliases for common format strings
const types = {
  abbrev: "0a", // or 'approx'?
  ordinal: "0o",
  percent: "0%",
  bytes: "0[.][00] ib",
  e: "0[.00]e+0"
};

class RhNumber extends HTMLElement {
  static get observedAttributes() {
    return ["number"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(numberTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }

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
