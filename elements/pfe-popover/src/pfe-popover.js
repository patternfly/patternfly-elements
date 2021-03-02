import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAbsolutePosition from "../../pfe-absolute-position/dist/pfe-absolute-position.js";
import "../../pfe-icon/dist/pfe-icon.js";
import "../../pfe-button/dist/pfe-button.js";

class PfePopover extends PfeAbsolutePosition {
  static get tag() {
    return "pfe-popover";
  }

  static get meta() {
    return {
      title: "Popover",
      description: "An in-app messaging that provides more information on specific product areas."
    };
  }

  get templateUrl() {
    return "pfe-popover.html";
  }

  get styleUrl() {
    return "pfe-popover.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      ...super.properties,
      theme: {
        title: "Theme",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfePopover, { type: PfePopover.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }
}

PFElement.create(PfePopover);

export default PfePopover;
