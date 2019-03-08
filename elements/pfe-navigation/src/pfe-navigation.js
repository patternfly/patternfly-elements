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

    this._linked = false;
    this._onSlotChange = this._onSlotChange.bind(this);

    this.slots = {};
    ["main", "search", "language", "login", "site-switcher"].forEach((region) => {
      this.slots[region] = this.shadowRoot.querySelector(`slot[name="${region}"]`);
      this.slots[region].addEventListener("slotchange", this._onSlotChange(region));
    });

    // Initialize a placeholder for the active navigation item
    this._activeNavigationItem = null;

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

    this.navigationItems = [...this.querySelectorAll("pfe-navigation-item")];
    this.overlay = this.shadowRoot.querySelector(".pfe-navigation__overlay");

    const fragment = document.createDocumentFragment();
    const mobile = this.shadowRoot.querySelector(".pfe-navigation__utility--mobile");
    let copies = {};

    ["logo", "main", "search", "login", "language", "site-switcher"].map(slot => {
      this[slot] = this.querySelector(`[slot="${slot}"]`);
      if(this[slot]) {
        copies[slot] = this[slot].cloneNode(true);
      }
    });

    // Attach each item for the mobile navigation
    fragment.appendChild(copies.search);
    fragment.appendChild(copies.main);
    fragment.appendChild(copies.login);
    fragment.appendChild(copies.language);

    // Add the fragment to the mobile navigation
    mobile.appendChild(fragment);
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
    console.log(event);
    this.overlay.removeAttribute("hidden");

    // If there is not an active navigation item
    if (!this._activeNavigationItem) {
        // Attach the item to the base 
        this._activeNavigationItem = event.detail.navigationItem;
        return;
    }

    // If the event is fired on the currently active item
    if (this._activeNavigationItem === event.detail.navigationItem) {
      this.overlay.setAttribute("hidden", true);
      return;
    }

    // Otherwise, close the navigation item
    this._activeNavigationItem.expanded = false;
    // Assign this item to the navigation item
    this._activeNavigationItem = event.detail.navigationItem;
  }

  _onSlotChange(region) {
    this._linked = false;
    
    this.slots[region].context = region;

    this._linked = true;
  }
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
