import PFElement from "../pfelement/pfelement.js";

if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

class PfeCta extends PFElement {
  static get tag() {
    return "pfe-cta";
  }

  get styleUrl() {
    return "pfe-cta.scss";
  }

  get templateUrl() {
    return "pfe-cta.html";
  }

  get schemaUrl() {
    return "pfe-cta.json";
  }

  get defaultStyle() {
    return this.hasAttribute("priority") ? false : true;
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeCta);
    this.cta = null;

    this._init = this._init.bind(this);
    this._focusHandler = this._focusHandler.bind(this);
    this._blurHandler = this._blurHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);

    if (this.children.length) {
      this._init();
    }
  }

  disconnectedCallback() {
    this._slot.removeEventListener("slotchange", this._init);

    // Remove the focus state listeners
    if (this.cta) {
      this.cta.removeEventListener("focus", this._focusHandler);
      this.cta.removeEventListener("blur", this._blurHandler);
    }
  }

  _init() {
    const firstChild = this.children[0];

    if (!firstChild || (firstChild && !["A", "BUTTON", "INPUT"].includes(firstChild.tagName))) {
      console.warn(
        `${
          PfeCta.tag
        }:The first child in the light DOM must be a supported call-to-action tag (<a>, <button>, <input>)`
      );
    } else {
      this.cta = firstChild;
      this.cta.addEventListener("focus", this._focusHandler);
      this.cta.addEventListener("blur", this._blurHandler);
    }
  }

  _focusHandler(event) {
    this.classList.add("focus-within");
  }

  _blurHandler(event) {
    this.classList.remove("focus-within");
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }
}

PFElement.create(PfeCta);

export { PfeCta as default };
