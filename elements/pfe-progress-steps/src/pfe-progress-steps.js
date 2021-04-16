// Import polyfills: findIndex
import "./polyfills--pfe-progress-steps.js";
import PFElement from "../../pfelement/dist/pfelement.js";
import "./pfe-progress-steps-item.js";
class PfeProgressSteps extends PFElement {
  static get tag() {
    return "pfe-progress-steps";
  }

  static get meta() {
    return {
      title: "Progress stepper",
      description:
        "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
    };
  }

  get templateUrl() {
    return "pfe-progress-steps.html";
  }

  get styleUrl() {
    return "pfe-progress-steps.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      vertical: { type: Boolean, default: false, cascade: ["pfe-progress-steps-item"] }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeProgressSteps, { type: PfeProgressSteps.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    this._build();
  }

  disconnectedCallback() {}

  _build() {
    const stepItems = [...this.querySelectorAll("pfe-progress-steps-item")];
    // find what child item has the active state
    const activeItemIndex = stepItems.findIndex(element => element.hasAttribute("current"));
    if (activeItemIndex >= 0) {
      // Calculate the width of the progress bar.
      const width = (activeItemIndex / (stepItems.length - 1)) * 100 + "%";
      if (this.vertical) {
        this.shadowRoot.querySelector(".pfe-progress-steps__progress-bar-fill").style.height = width;
      } else {
        this.shadowRoot.querySelector(".pfe-progress-steps__progress-bar-fill").style.width = width;
      }
    }

    // Add spacing to the each of the items except for the top item
    // @todo we have to do it in javascript until everyone supports
    // targeting siblings in :slotted. i.e. slot:slotted(pfe-progress-steps-item + pfe-progress-steps-item) { margin-top }
    if (this.vertical) {
      stepItems.forEach((item, index) => {
        if (index === stepItems.length - 1) return;
        // @todo this needs to bee dynamic
        item.style.minHeight = "75px";
      });
    }
  }
}

PFElement.create(PfeProgressSteps);

export default PfeProgressSteps;
