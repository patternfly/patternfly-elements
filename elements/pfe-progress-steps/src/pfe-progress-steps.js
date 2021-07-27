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
        "A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form).",
    };
  }

  get templateUrl() {
    return "pfe-progress-steps.html";
  }

  get styleUrl() {
    return "pfe-progress-steps.scss";
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  get stepItems() {
    return [...this.querySelectorAll("pfe-progress-steps-item")];
  }

  get _progressBar() {
    return this.shadowRoot.querySelector(`.${this.tag}__progress-bar--fill`);
  }

  static get properties() {
    return {
      vertical: {
        type: Boolean,
        default: false,
        cascade: ["pfe-progress-steps-item"],
      },
      variant: {
        type: String,
        values: ["count"],
        cascade: ["pfe-progress-steps-item"],
      },
    };
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
    if (this.isIE11) return;

    const items = this.stepItems;

    // find what child item has the active state
    const activeItemIndex = items.findIndex((element) => element.current);
    if (activeItemIndex >= 0) {
      // Calculate the size of the progress bar.
      const size = (activeItemIndex / (items.length - 1)) * 100 + "%";
      const dimension = this.vertical ? "height" : "width";
      this._progressBar.style[dimension] = size;
    }

    for (let index = 0; index < items.length; index++) {
      const item = items[index];

      // Set the count on the children
      if (this.variant === "count") item.setAttribute("count", index + 1);

      if (!this.vertical) {
        Promise.all([customElements.whenDefined(item.tagName.toLowerCase())]).then(() => {
          if (index === 0) {
            this.style.setProperty(
              `--${this.tag}__item--size--first`,
              `${parseInt(item.getBoundingClientRect().width)}px`
            );
          } else if (index === items.length - 1) {
            this.style.setProperty(
              `--${this.tag}__item--size--last`,
              `${parseInt(item.getBoundingClientRect().width)}px`
            );
          }
        });
      }

      // Add spacing to the each of the items except for the top item
      // @todo we have to do it in javascript until everyone supports
      // targeting siblings in :slotted. i.e. slot:slotted(pfe-progress-steps-item + pfe-progress-steps-item) { margin-top }
      else {
        // if it's the last item then we'll explicitly set the min-height
        // to 0 so the circle and lines stop at the top of the last item.
        if (index === items.length - 1) item.style.minHeight = "0";
        // if it's not the last item then unset any inline min-height style
        // that was set.
        else item.style.minHeight = "";
      }
    }
  }
}

PFElement.create(PfeProgressSteps);

export default PfeProgressSteps;
