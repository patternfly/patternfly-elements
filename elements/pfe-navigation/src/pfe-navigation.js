import PFElement from "../pfelement/pfelement.js";
import PfeNavigationItem from "./pfe-navigation-item.js";

class PfeNavigation extends PFElement {
  static get tag() {
    return "pfe-navigation";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });
    this.activeNavigationItem = null;
    this._toggledHandler = this._toggledHandler.bind(this);
    this.addEventListener(
      `${PfeNavigationItem.tag}:toggled`,
      this._toggledHandler
    );
  }

  connectedCallback() {
    super.connectedCallback();

    // Define the name of the slots
    const slots = {
      "[slot=\"pfe-navigation--main\"]": "[pfe-id=\"pfe-navigation--main\"]",
      "[slot=\"pfe-navigation--utility\"]": "[pfe-id=\"pfe-navigation--utility\"]",
    };
    // Move the content from the main and utility slots into the shadowDOM
    this._pfeClass.moveToShadowDOM(slots, this);
  }

  disconnectedCallback() {
    this.removeEventListener(
      `${PfeNavigationItem.tag}:toggled`,
      this._toggledHandler
    );
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

  _toggledHandler(event) {
    if (!this.activeNavigationItem) {
      this.activeNavigationItem = event.detail.navigationItem;
      return;
    }

    if (this.activeNavigationItem === event.detail.navigationItem) {
      return;
    }

    this.activeNavigationItem.expanded = false;
    this.activeNavigationItem = event.detail.navigationItem;
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
