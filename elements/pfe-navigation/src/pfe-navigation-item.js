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

  // static get observedAttributes() {
  //   return [];
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeNavigationItem, { type: PfeNavigationItem.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();

    // Get the trigger slot
    // const trigger = 
    // Register click event on the trigger slot
    this.addEventListener("click", this._clickHandler);

    this.addEventListener(`${PfeNavigationItem.tag}:active`, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);
    

    // this.setAttribute("role", "presentation");
    // this.setAttribute("defined", "");
  }

  _clickHandler(event) {
    event.preventDefault();
    // Check that the event fired is from the trigger slot
    if (event.target.getAttribute("slot") === "pfe-navigation-item--trigger") {
      
      // Open the tray if it's not open, close if it is
    }
    // If the event is fired from the tray

    this.dispatchEvent(
      new CustomEvent(`${PfeNavigationItem.tag}:active`, {
        detail: { expanded: !this.expanded },
        bubbles: true
      })
    );
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

  _changeHandler(evt) {

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
