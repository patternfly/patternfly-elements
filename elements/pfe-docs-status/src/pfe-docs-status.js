import PFElement from "../pfelement/pfelement.js";

class PfeDocsStatus extends PFElement {
  static get tag() {
    return "pfe-docs-status";
  }

  get templateUrl() {
    return "pfe-docs-status.html";
  }

  get styleUrl() {
    return "pfe-docs-status.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeDocsStatus);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeDocsStatus);

export default PfeDocsStatus;
