import Rhelement from "../rhelement/rhelement.js";

class RhButton extends Rhelement {
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

Rhelement.create(RhButton);
