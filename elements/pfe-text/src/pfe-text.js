import PFElement from "../pfelement/pfelement.js";

class PfeText extends PFElement {
  static get tag() {
    return "pfe-text";
  }

  get templateUrl() {
    return "pfe-text.html";
  }

  get styleUrl() {
    return "pfe-text.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeText);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeText);

export default PfeText;
