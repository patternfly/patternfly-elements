import PFElement from "../pfelement/pfelement.js";
import "../pfe-icon/pfe-icon.js";

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
    return ["icon", "circled"];
  }

  static get cascadingAttributes() {
    return {
      icon: "pfe-icon",
      circled: "pfe-icon"
    };
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);
