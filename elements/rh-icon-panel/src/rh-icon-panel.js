import Rhelement from "../rhelement/rhelement.js";
import "../rh-icon/rh-icon.js";

class RhIconPanel extends Rhelement {
  static get tag() {
    return "rh-icon-panel";
  }

  get styleUrl() {
    return "rh-icon-panel.scss";
  }

  get templateUrl() {
    return "rh-icon-panel.html";
  }

  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super(RhIconPanel.tag);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "icon") {
      if (newVal) {
        let iconElem = this.shadowRoot.querySelector("rh-icon");
        iconElem.setAttribute("icon", newVal);
      }
    }
  }
}

Rhelement.create(RhIconPanel);
