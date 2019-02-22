import PFElement from "../pfelement/pfelement.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

class PfeNavigationItem extends PFElement {
  static get tag() {
    return "pfe-navigation-item";
  }

  get schemaUrl() {
    return "pfe-navigation-item.json";
  }

  get templateUrl() {
    return "pfe-navigation-item.html";
  }

  get styleUrl() {
    return "pfe-navigation-item.scss";
  }

  get expanded() {
    return this.classList.contains("expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.classList.add("expanded");

      if (this.trigger) {
        this.trigger.setAttribute("aria-expanded", true);
      }

      if (this.tray) {
        this.tray.classList.remove("hide");
        this.tray.setAttribute("aria-expanded", true);
      }
    } else {
      this.classList.remove("expanded");

      if (this.trigger) {
        this.trigger.removeAttribute("aria-expanded");
      }

      if (this.tray) {
        this.tray.classList.add("hide");
        this.tray.removeAttribute("aria-expanded");
      }
    }

    this.dispatchEvent(
      new CustomEvent(`${PfeNavigationItem.tag}:toggled`, {
        detail: { navigationItem: this, expanded: this.expanded },
        bubbles: true,
        composed: true
      })
    );
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });

    this._clickHandler = this._clickHandler.bind(this);
    this._keydownHandler = this._keydownHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.tray = this.shadowRoot.querySelector(".pfe-navigation-item--wrapper");

    if (!this.tray) {
      return;
    }

    this.trigger = this.querySelector('a[slot="pfe-navigation-item--trigger"]')
    this.lightDomTray = this.querySelector('[slot="pfe-navigation-item--tray"]');
    this.expanded = false;

    if (this.trigger && !this.trigger.hasAttribute("role")) {
      this.trigger.setAttribute("role", "button");
    }

    if (this.lightDomTray) {
      this.lightDomTray.removeAttribute("hidden");
    }

    this.addEventListener("click", this._clickHandler);
    this.addEventListener("keydown", this._keydownHandler);
  }

  disconnectedCallback() {
    if (this.tray) {
      this.removeEventListener("click", this._changeHandler);
      this.removeEventListener("keydown", this._keydownHandler);
    }
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

  _clickHandler(event) {
    if (event.target === this.trigger) {
      event.preventDefault();
      this.expanded = !this.expanded;
    }
  }

  _keydownHandler(event) {
    switch (event.key) {
      case "Spacebar":
      case " ":
        event.preventDefault();
        this.expanded = !this.expanded;
        break;
      case "Esc":
      case "Escape":
        event.preventDefault();
        this.expanded = false;
        if (this.trigger) {
          this.trigger.focus();
        }
        break;
      default:
        return;
    }
  }

  // Update the icon attribute and return the SVG
  _updateIcon(attr, oldValue, newValue){
    switch (newValue) {
      case "Search":
        // Get the search SVG
      case "Globe":
        // Get the globe SVG
      case "Person":
        // Get the person SVG
      case "App":
        // Get the person SVG
      default:
        // @TODO is there a default icon?
    }
  }
}

PFElement.create(PfeNavigationItem);

export default PfeNavigationItem;
