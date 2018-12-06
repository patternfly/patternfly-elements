import RHElement from "../rhelement/rhelement.js";

class RhCard extends RHElement {
  static get tag() {
    return "rh-card";
  }

  get styleUrl() {
    return "rh-card.scss";
  }

  get templateUrl() {
    return "rh-card.html";
  }

  constructor() {
    super(RhCard);
  }
}

RHElement.create(RhCard);

export default RhCard;
