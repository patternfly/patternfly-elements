import PFElement from "../pfelement/pfelement.js";
import PfeNavigationItem from "./pfe-navigation-item.js";

const KEYCODE = {
  ENTER: 13,
  DOWN: 40,
  UP: 38,
  ESC: 27
};

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
  }

  connectedCallback() {
    super.connectedCallback();

    // Define the name of the slots
    const slots = {
        main: "pfe-navigation--main",
        utility: "pfe-navigation--utility"
    };
    // Copy the content of the main and utility slots into the ShadowDOM
    Object.values(slots).forEach(slotName => {
        const fraggle = document.createDocumentFragment();
        // Get the content and the slots
        const contents = [...this.querySelectorAll(`[slot="${slotName}"]`)];
        const slot = this.shadowRoot.querySelector(`[pfe-id="${slotName}"]`);
        contents.forEach(content => {
            fraggle.appendChild(content);
        });
        // If the slot and contents exist, append the fragment to the DOM
        if(slot && contents.length) {
            slot.appendChild(fraggle);
        }
    });
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
}

PFElement.create(PfeNavigation);

export default PfeNavigation;
