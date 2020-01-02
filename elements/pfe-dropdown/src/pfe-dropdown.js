import PFElement from "../pfelement/pfelement.js";

class PfeDropdown extends PFElement {
  static get tag() {
    return "pfe-dropdown";
  }

  get templateUrl() {
    return "pfe-dropdown.html";
  }

  get styleUrl() {
    return "pfe-dropdown.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeDropdown);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeDropdown);

export default PfeDropdown;
