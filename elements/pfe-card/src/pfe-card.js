// Import polyfills: matches, closest, includes
import "./polyfills--pfe-card.js";

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  get schemaUrl() {
    return "pfe-card.json";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return this.getAttribute("pfe-color") || "base";
  }

  static get observedAttributes() {
    return ["pfe-color", "pfe-img-src", "pfe-size"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
    this._observer = new MutationObserver(() => {
      this._mapSchemaToSlots(this.tag, this.slots);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
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

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
    // Trigger an update in nested components
    this.context_update();
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

PFElement.create(PfeCard);

export { PfeCard as default };
