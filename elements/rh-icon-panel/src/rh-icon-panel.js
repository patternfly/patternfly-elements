import RHElement from "../rhelement/rhelement.js";
import "../rh-icon/rh-icon.js";

class RhIconPanel extends RHElement {
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
    return ["icon", "circled"];
  }

  static get cascadingAttributes() {
    return {
      icon: "rh-icon",
      circled: "rh-icon"
    };
  }

  constructor() {
    super(RhIconPanel);
  }
}

RHElement.create(RhIconPanel);
