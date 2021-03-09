import PFElement from "../../pfelement/dist/pfelement.js";

class PfeProgressStepperItem extends PFElement {
  static get tag() {
    return "pfe-progress-stepper-item";
  }

  static get meta() {
    return {
      title: "Progress stepper",
      description:
        "A component that gives the user a visual representation of the current state of their progress through an application (typeically a multistep form)."
    };
  }

  get templateUrl() {
    return "pfe-progress-stepper-item.html";
  }

  get styleUrl() {
    return "pfe-progress-stepper-item.scss";
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
    super(PfeProgressStepperItem, { type: PfeProgressStepperItem.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
  }

  disconnectedCallback() {}

}

PFElement.create(PfeProgressStepperItem);

export default PfeProgressStepperItem;
