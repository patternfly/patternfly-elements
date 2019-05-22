import PFElement from "../pfelement/pfelement.js";

class PfePageStatus extends PFElement {
  static get tag() {
    return "pfe-page-status";
  }

  get schemaUrl() {
    return "pfe-page-status.json";
  }

  get templateUrl() {
    return "pfe-page-status.html";
  }

  get styleUrl() {
    return "pfe-page-status.scss";
  }

  static get observedAttributes() {
    return ["pfe-status"];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfePageStatus);
  }

  connectedCallback() {
    super.connectedCallback();
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

PFElement.create(PfePageStatus);

export default PfePageStatus;
