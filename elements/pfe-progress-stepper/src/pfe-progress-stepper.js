import PFElement from "../../pfelement/dist/pfelement.js";
import "./pfe-progress-stepper-item.js";

// const CONTENT_MUTATION_CONFIG = {
//   characterData: true,
//   childList: true,
//   subtree: true
// };

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
    // this._mutationHandler = this._mutationHandler.bind(this);
    // this._observer = new MutationObserver(this._mutationHandler);
  }

  connectedCallback() {
    super.connectedCallback();
    // this._observer.observe(this, CONTENT_MUTATION_CONFIG);
    // this._build();
  }

  disconnectedCallback() {}

  // /**
  //  * Copy the lightdom, transform it, and place it in
  //  * the _view slot.
  //  */
  // _build() {
  //   const fragment = document.createElement("div");
  //   fragment.innerHTML = this.innerHTML;
  //   // find list parents
  //   const listParent = fragment.querySelector("ul,ol");
  //   if (listParent) {
  //     let newItems = ;
  //     const listItems = listParent
  //   }
  //   console.log(listParent);
  // }
}

PFElement.create(PfeProgressStepper);

export default PfeProgressStepper;
