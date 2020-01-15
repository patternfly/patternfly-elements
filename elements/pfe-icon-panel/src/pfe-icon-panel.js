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

  static get observedAttributes() {
    return ["icon", "circled", "color"];
  }

  static get cascadingAttributes() {
    return {
      icon: "pfe-icon",
      circled: "pfe-icon",
      color: "pfe-icon"
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);
