import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAbsolutePosition from "../../pfe-absolute-position/dist/pfe-absolute-position.js";
import "../../pfe-icon/dist/pfe-icon.js";
import "../../pfe-button/dist/pfe-button.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

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
    this.auto = true;
    this.id = this.id || `${PfePopover.tag}-${generateId()}`;
    this.mode = "click";
    this.positionAlign = "left";
  }

  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector("#close-button").addEventListener("click", this._clickHandler.bind(this));
  }

  _clickHandler(event) {
    this.hide();
  }

  // When the target is found we are going to make sure it has the correct a11y settings
  targetUpdated(target) {
    super.targetUpdated(target);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "0");
    // We need to set aria-label in addition to aria-describedby
    if (!target.hasAttribute("role")) target.setAttribute("role", "button");
    target.setAttribute("aria-describedby", this.id);
  }
}

PFElement.create(PfePopover);

export default PfePopover;
