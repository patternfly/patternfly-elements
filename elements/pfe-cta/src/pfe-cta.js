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
    this._init = this._init.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);

    // Get the lightDOM link if it exists
    this.link = this.querySelector("a");

    // Check if this element has focus
    this.link.addEventListener("focus", (event) => {
      this.classList.add("focus-within");  
    });

    this.link.addEventListener("blur", (event) => {
      this.classList.remove("focus-within");  
    });
  }

  disconnectedCallback() {
    this._slot.removeEventListener("slotchange", this._init);

    // Check if this element has focus
    this.link.removeEventListener("focus", (event) => {
      this.classList.add("focus-within");  
    });

    this.link.removeEventListener("blur", (event) => {
      this.classList.remove("focus-within");  
    });
  }

  _init() {
    const firstChild = this.children[0];

    if (!firstChild) {
      console.warn(
        `${
          PfeCta.tag
        }:The first child in the light DOM must be an anchor tag (<a>)`
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "a") {
      console.warn(
        `${
          PfeCta.tag
        }:The first child in the light DOM must be an anchor tag (<a>)`
      );
    } else {
      this.link = this.querySelector("a");
    }
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
