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
    return this.tray.hasAttribute("aria-expanded");
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
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });
    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.trigger = this.querySelector('a[slot="pfe-navigation-item--trigger"]')
    this.lightDomTray = this.querySelector('[slot="pfe-navigation-item--tray"]');
    this.tray = this.shadowRoot.querySelector(".pfe-navigation-item--wrapper");
    this.expanded = false;

    if (!this.trigger.hasAttribute("role")) {
      this.trigger.setAttribute("role", "button");
    }

    if (this.lightDomTray) {
      this.lightDomTray.removeAttribute("hidden");
    }

    this.addEventListener("click", this._clickHandler);
    this.addEventListener("keydown", this._keydownHandler);
  }

  _clickHandler(event) {
    event.preventDefault();

    if (event.target === this.trigger) {
      this.expanded = !this.expanded;

      this.dispatchEvent(
        new CustomEvent(`${PfeNavigationItem.tag}:active`, {
          detail: { expanded: this.expanded },
          bubbles: true,
          composed: true
        })
      );
    }
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
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
