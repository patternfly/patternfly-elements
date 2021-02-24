import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAbsolutePosition from "../../pfe-absolute-position/dist/pfe-absolute-position.js";

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

  constructor() {
    super(PfeTooltip, { type: PfeTooltip.PfeType });
  }
}

PFElement.create(PfeTooltip);

export default PfeTooltip;
