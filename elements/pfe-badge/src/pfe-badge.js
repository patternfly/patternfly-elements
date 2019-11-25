import PFElement from "../../pfelement/dist/pfelement.js";

class PfeBadge extends PFElement {
  static get tag() {
    return "pfe-badge";
  }

  get templateUrl() {
    return "pfe-badge.html";
  }

  get styleUrl() {
    return "pfe-badge.scss";
  }

  static get observedAttributes() {
    return ["threshold"];
  }

  get pfeThreshold() {
    return this.getAttribute('threshold');
  }

  constructor() {
    super(PfeBadge);
    if (this.pfeThreshold) {
      // TODO: Confirm the logic
      this.textContent = this.pfeThreshold <= this.textContent ? `${this.pfeThreshold}+` : this.textContent;
    }
  }
}

PFElement.create(PfeBadge);

export default PfeBadge;
