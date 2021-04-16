import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAbsolutePosition from "../../pfe-absolute-position/dist/pfe-absolute-position.js";

function generateId() {
  return Math.random()
    .toString(36)
    .substr(2, 9);
}

class PfeTooltip extends PfeAbsolutePosition {
  static get tag() {
    return "pfe-tooltip";
  }

  static get meta() {
    return {
      title: "Tooltip",
      description: "A tooltip is in-app messaging used to identify elements on a page with short, clarifying text."
    };
  }

  get templateUrl() {
    return "pfe-tooltip.html";
  }

  get styleUrl() {
    return "pfe-tooltip.scss";
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      ...super.properties,
      theme: { type: String, default: "light" },
      /**
       * Define the aria-label for the target element.
       */
      label: { type: String }
    };
  }

  constructor() {
    super(PfeTooltip, { type: PfeTooltip.PfeType });
    this.auto = true;
    this.id = this.id || `${PfeTooltip.tag}-${generateId()}`;
    this.label = "More information";
  }

  // When the target is found we are going to make sure it has the correct a11y settings
  targetUpdated(target) {
    super.targetUpdated(target);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "0");
    // We need to set aria-label in addition to aria-describedby
    if (!target.hasAttribute("aria-label")) target.setAttribute("aria-label", this.label);
    target.setAttribute("aria-describedby", this.id);
  }
}

PFElement.create(PfeTooltip);

export default PfeTooltip;
