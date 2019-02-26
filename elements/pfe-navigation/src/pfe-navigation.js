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

  static get observedAttributes() {
    return [ "pfe-color" ];
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigation, { type: PfeNavigation.PfeType });
    // Initialize a placeholder for the active navigation item
    this.activeNavigationItem = null;
    // Bind the toggle handler to the base
    this._toggledHandler = this._toggledHandler.bind(this);
    // Add an event listener for the toggled state
    this.addEventListener(
      `${PfeNavigationItem.tag}:toggled`,
      this._toggledHandler
    );

    // Connect to the body element and trigger the lock
  }

  connectedCallback() {
    super.connectedCallback();

    // Define the name of the slots
    const slots = {
      "pfe-navigation--main": "[pfe-id=\"pfe-navigation--main\"]",
      "pfe-navigation--utility": "[pfe-id=\"pfe-navigation--utility\"]",
    };

    // Move the content from the main and utility slots into the shadowDOM
    this._pfeClass.moveToShadowDOM(slots, this);
  }

  disconnectedCallback() {
    // Remove the event listeners
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
    // If there is not an active navigation item
    if (!this.activeNavigationItem) {
        // Attach the item to the base 
        this.activeNavigationItem = event.detail.navigationItem;
        return;
    }

    // If the event is fired on the currently active item
    if (this.activeNavigationItem === event.detail.navigationItem) {
      return;
    }

    // Otherwise, close the navigation item
    this.activeNavigationItem.expanded = false;
    // Assign this item to the navigation item
    this.activeNavigationItem = event.detail.navigationItem;
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
