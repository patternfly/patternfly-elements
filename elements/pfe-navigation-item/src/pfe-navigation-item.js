import PFElement from "../pfelement/pfelement.js";

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeNavigationItem);
  }

  // connectedCallback() {
  //   super.connectedCallback();
  // }

  // disconnectedCallback() {}

  // attributeChangedCallback(attr, oldValue, newValue) {}
}

PFElement.create(PfeNavigationItem);

export default PfeNavigationItem;
