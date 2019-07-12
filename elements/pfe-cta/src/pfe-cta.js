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

    // Get the slot
    this._slot = this.shadowRoot.querySelector("slot");

    // If the slot exists, attach the slotchange listener
    if(this._slot) {
      this._slot.addEventListener("slotchange", this._init);
    }

    if (this.children.length) {
      this._init();
    }

    // Watch the light DOM link for focus and blur events
    if(this.cta) {
      this.cta.addEventListener("focus", this._focusHandler);
      this.cta.addEventListener("blur", this._blurHandler);
    }
  }

  disconnectedCallback() {
    // Remove the slot change listeners
    if(this._slot) {
      this._slot.removeEventListener("slotchange", this._init);
    }

    // Remove the focus state listeners
    if(this.cta) {
      this.cta.removeEventListener("focus", this._focusHandler);
      this.cta.removeEventListener("blur", this._blurHandler);
    }
  }

  // Initialize the component
  _init() {
    // Get the first child of the web component (light DOM)
    const firstChild = this.children[0];
    const supportedTags = ["a", "button", "input"];
    let supportedTag = false;

    // If the first child does not exist or that child is not a supported tag
    if (firstChild) {
      supportedTags.forEach(tag => {
        if (firstChild.tagName.toLowerCase() === tag) {
          supportedTag = true;
        }
      });
    }

    if (!firstChild || !supportedTag) {
      console.warn(
        `${
          PfeCta.tag
        }:The first child in the light DOM must be a supported call-to-action tag (<a>, <button>, <input>)`
      );
    } else {
      // Capture the first child as the CTA element
      this.cta = firstChild;
      this.cta.addEventListener("focus", this._focusHandler);
      this.cta.addEventListener("blur", this._blurHandler);
    }
  }

  // On focus, add a class
  _focusHandler(event) {
    this.classList.add("focus-within");
  }

  // On focus out, remove that class
  _blurHandler(event) {
    this.classList.remove("focus-within");
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }
}

PFElement.create(PfeCta);

export { PfeCta as default };
