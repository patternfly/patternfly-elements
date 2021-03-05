import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAbsolutePosition from "../../pfe-absolute-position/dist/pfe-absolute-position.js";
import "../../pfe-icon/dist/pfe-icon.js";

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
    // @todo make sure these still work if we call render() again.
    this._closeButton = this.shadowRoot.querySelector("#close-button");
    this._tooltip = this.shadowRoot.querySelector("#tooltip");
    this._initialFocus = this._tooltip;
    this.shadowRoot.querySelector(".pf-c-popover__focus-trap").addEventListener("focus", this._focusTrapHandler.bind(this));
    this.shadowRoot.querySelector("#close-button").addEventListener("click", this._clickHandler.bind(this));
    if (this.hasSlot("title")) {
      this._tooltip.setAttribute("aria-labeledby", "popover-top-header");
    }
    if (this.hasSlot("body")) {
      this._tooltip.setAttribute("aria-describedby", "popover-top-body");
    }
  }

  _focusTrapHandler(event) {
    if (event.target.classList.contains("pf-c-popover__focus-trap")) {
      // Return focus to the close button which is the first in line
      // which will create a focus trap loop.
      this._closeButton.focus();
    }
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
    target.setAttribute("aria-expanded", "false");
    target.setAttribute("aria-describedby", this.id);
  }

  show() {
    super.show();
    // Send focus into the popover
    this._initialFocus.focus();
    this.target.setAttribute("aria-expanded", "true");
    this.tooltip.setAttribute("aria-hidden", "false");
  }

  hide() {
    super.hide();
    // Send focus back to the target
    this.target.focus();
    this.target.setAttribute("aria-expanded", "false");
    this.tooltip.setAttribute("aria-hidden", "true");
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#close-button").removeEventListener("click", this._clickHandler.bind(this));
    this.shadowRoot.querySelector("#focus-trap").removeEventListener("focus", this._focusTrapHandler.bind(this));h
    super.disconnectedCallback();
  }
}

PFElement.create(PfePopover);

export default PfePopover;
