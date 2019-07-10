import PFElement from "../pfelement/pfelement.js";

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

  get defaultStyle() {
    return this.hasAttribute("priority") ? false : true;
  }

  static get observedAttributes() {
    return [
      "pfe-priority",
      "pfe-color",
      "pfe-alt",
      "on"
    ];
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

    this._init();

    // Get the lightDOM link if it exists
    this.cta.addEventListener("focus", this._focusHandler);
    this.cta.addEventListener("blur", this._blurHandler);
  }

  disconnectedCallback() {
    this._slot.removeEventListener("slotchange", this._init);

    // Remove the focus state listeners
    this.cta.removeEventListener("focus", this._focusHandler);
    this.cta.removeEventListener("blur", this._blurHandler);
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
    }
  }

  _focusHandler(event) {
    this.classList.add("focus-within");
  }

  _blurHandler(event) {
    this.classList.remove("focus-within");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix form the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }
}

PFElement.create(PfeCta);

export { PfeCta as default };
