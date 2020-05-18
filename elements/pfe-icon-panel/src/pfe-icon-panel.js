import PFElement from "../../pfelement/dist/pfelement.js";
import "../../pfe-icon/dist/pfe-icon.js";

class PfeIconPanel extends PFElement {
  static get tag() {
    return "pfe-icon-panel";
  }

  get styleUrl() {
    return "pfe-icon-panel.scss";
  }

  get templateUrl() {
    return "pfe-icon-panel.html";
  }

  get schemaUrl() {
    return "pfe-icon-panel.json";
  }

  static get observedAttributes() {
    return ["icon", "pfe-circled", "pfe-color", "pfe-stacked", "pfe-centered"];
  }

  static get cascadingAttributes() {
    return {
      icon: "pfe-icon",
      "pfe-circled": "pfe-icon",
      "pfe-color": "pfe-icon"
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);

export default PfeIconPanel;
