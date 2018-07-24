import RHElement from "../rhelement/rhelement.js";

class RhButton extends RHElement {
  static get tag() {
    return "rh-button";
  }

  get styleUrl() {
    return "rh-button.scss";
  }

  get templateUrl() {
    return "rh-button.html";
  }

  constructor() {
    super(RhButton.tag);
  }
}

RHElement.create(RhButton);
