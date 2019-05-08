import PFElement from "../pfelement/pfelement.js";

class PfePageStatus extends PFElement {
  static get tag() {
    return "pfe-page-status";
  }

  get templateUrl() {
    return "pfe-page-status.html";
  }

  get styleUrl() {
    return "pfe-page-status.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfePageStatus);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfePageStatus);

export default PfePageStatus;
