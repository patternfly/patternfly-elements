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
    return ["pfe-icon", "pfe-circled"];
  }

  static get cascadingAttributes() {
    return {
      "pfe-icon": "pfe-icon",
      "pfe-circled": "pfe-icon"
    };
  }

  attributeChangedCallback() {
    super.attributeChangedCallback(...arguments);

    console.log(`attr changed ${[...arguments]}`);
  }

  constructor() {
    super(PfeIconPanel);
  }
}

PFElement.create(PfeIconPanel);
