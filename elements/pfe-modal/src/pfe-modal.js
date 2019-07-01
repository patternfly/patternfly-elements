import PFElement from "../pfelement/pfelement.js";

class PfeModal extends PFElement {
  static get tag() {
    return "pfe-modal";
  }

  get templateUrl() {
    return "pfe-modal.html";
  }

  get styleUrl() {
    return "pfe-modal.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeModal);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

class PfeModalHeader extends PFElement {
  static get tag() {
    return "pfe-modal-header";
  }

  get templateUrl() {
    return "pfe-modal-header.html";
  }

  get styleUrl() {
    return "pfe-modal-header.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeModalHeader);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeModal);
PFElement.create(PfeModalHeader);

export default PfeModal;
