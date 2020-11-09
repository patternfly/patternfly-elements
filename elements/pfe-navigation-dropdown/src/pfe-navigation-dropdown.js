import PFElement from "../../pfelement/dist/pfelement.js";

class PfeNavigationDropdown extends PFElement {
  static get tag() {
    return "pfe-navigation-dropdown";
  }

  get schemaUrl() {
    return "pfe-navigation-dropdown.json";
  }

  get templateUrl() {
    return "pfe-navigation-dropdown.html";
  }

  get styleUrl() {
    return "pfe-navigation-dropdown.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get observedAttributes() {
    // return [
    //   // Some of these are just for pfe-navigation to use
    //   // "pfe-icon",
    //   // "pfe-name",
    //   // "pfe-alerts",
    //   // "pfe-height",
    //   // "pfe-state",
    // ];
  }

  constructor() {
    super(PfeNavigationDropdown, { type: PfeNavigationDropdown.PfeType });

    // Ensure 'this' is tied to the component object in these member functions
    this.setDropdownHeight = this.setDropdownHeight.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    this.addEventListener(PfeNavigationDropdown.events.change, this._changeHandler);
  }

  disconnectedCallback() {
    this.removeEventListener(PfeNavigationDropdown.events.change, this._changeHandler);
  }

  /**
   * Utility function that is used to display more console logging in non-prod env
   */
  _isDevelopment() {
    return document.domain === "localhost";
  }

  /**
   * Caches the heights of the dropdowns for animation
   */
  setDropdownHeight() {
    if (this._isDevelopment()) {
      console.log(`${this.tag} setDropdownHeight has been run.`);
    }

    const dropdown = this.shadowRoot.getElementById("dropdown-container");
    const dropdownHeight = dropdown.offsetHeight;
    if (dropdownHeight) {
      this.style.setProperty("height", `${dropdownHeight}px`);
    } else {
      dropdownWrapper.style.setProperty("height", "auto");
    }
  }

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _changeHandler(event) {
    this.emitEvent(PfeNavigationDropdown.events.change, {
      detail: {}
    });
  }
}

PFElement.create(PfeNavigationDropdown);

export default PfeNavigationDropdown;
