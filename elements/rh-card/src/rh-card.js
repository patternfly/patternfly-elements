import Rhelement from "../rhelement/rhelement.js";

class RhCard extends Rhelement {
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
    super(RhCard.tag);
  }
}

Rhelement.create(RhCard);
