import PFElement from "../pfelement/pfelement.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  constructor() {
    super(PfeCard);
  }
}

PFElement.create(PfeCard);

export default PfeCard;
