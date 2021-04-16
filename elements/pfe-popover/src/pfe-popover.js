import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAbsolutePosition from "../../pfe-absolute-position/dist/pfe-absolute-position.js";
import "../../pfe-icon/dist/pfe-icon.js";

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
    if (!this.hasAttribute("offset")) this.offset = 8;
    this.mode = "click";
    this.positionAlign = "left";
  }

  connectedCallback() {
    super.connectedCallback();
    // @todo make sure these still work if we call render() again.
    this._closeButton = this.shadowRoot.querySelector("#close-button");
    this._tooltip = this.shadowRoot.querySelector("#tooltip");
    this._initialFocus = this._tooltip;
    this.shadowRoot
      .querySelector(".pf-c-popover__focus-trap")
      .addEventListener("focus", this._focusTrapHandler.bind(this));
    this.shadowRoot.querySelector("#close-button").addEventListener("click", this._clickHandler.bind(this));
    if (this.hasSlot("title")) {
      this._tooltip.setAttribute("aria-labeledby", "popover-top-header");
    }
    if (this.hasSlot("body")) {
      this._tooltip.setAttribute("aria-describedby", "popover-top-body");
    }
  }

  renderCloseIcon() {
    return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1rem" width="1rem" viewBox="0 0 352 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-182" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`;
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
    if (!target.hasAttribute("role")) target.setAttribute("role", "button");
    target.setAttribute("aria-expanded", "false");
  }

  /**
   * @todo We have to underscore this function because of unidirection data flow.
   *  We should see if we can do that without the underscore.
   */
  _show() {
    super._show();
    // Send focus into the popover
    this._initialFocus.focus();
    this.target.setAttribute("aria-expanded", "true");
    this._tooltip.setAttribute("aria-hidden", "false");
  }

  hide() {
    super.hide();
    // Send focus back to the target
    this.target.focus();
    this.target.setAttribute("aria-expanded", "false");
    this._tooltip.setAttribute("aria-hidden", "true");
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#close-button").removeEventListener("click", this._clickHandler.bind(this));
    this.shadowRoot.querySelector("#focus-trap").removeEventListener("focus", this._focusTrapHandler.bind(this));
    super.disconnectedCallback();
  }
}

PFElement.create(PfePopover);

export default PfePopover;
