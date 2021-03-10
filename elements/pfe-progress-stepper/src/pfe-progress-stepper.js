import PFElement from "../../pfelement/dist/pfelement.js";
import "./pfe-progress-stepper-item.js";
class PfeProgressStepper extends PFElement {
  static get tag() {
    return "pfe-progress-stepper";
  }

  static get meta() {
    return {
      title: "Progress stepper",
      description:
        "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
    };
  }

  get templateUrl() {
    return "pfe-progress-stepper.html";
  }

  get styleUrl() {
    return "pfe-progress-stepper.scss";
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
    return {};
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeProgressStepper, { type: PfeProgressStepper.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    this._build();
  }

  disconnectedCallback() {}

  _build() {
    const stepperItems = [...this.querySelectorAll("pfe-progress-stepper-item")];
    // find what child item has the active state
    const activeItemIndex = stepperItems.findIndex(element => element.getAttribute("state") === "current");
    if (activeItemIndex >= 0) {
      // Calculate the width of the progress bar.
      const width = (activeItemIndex / (stepperItems.length - 1)) * 100 + "%";
      this.shadowRoot.querySelector(".pfe-progress-stepper__progress-bar-fill").style.width = width;
    }
  }
}

PFElement.create(PfeProgressStepper);

export default PfeProgressStepper;
