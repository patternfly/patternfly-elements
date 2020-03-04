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

  get schemaUrl() {
    return "pfe-badge.json";
  }

  static get observedAttributes() {
    return ["number", "pfe-threshold"];
  }

  get threshold() {
    return this.getAttribute("pfe-threshold");
  }

  constructor() {
    super(PfeBadge);
    this._textContainer = this.shadowRoot.querySelector("span");
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    switch (attr) {
      case "pfe-threshold":
        this.textContent =
          Number(this.threshold) < Number(this.textContent)
            ? `${this.threshold}+`
            : this.textContent;
        break;
      case "number":
        this.textContent =
          this.threshold && Number(this.threshold) < Number(newVal)
            ? `${this.threshold}+`
            : newVal;
        break;
      default:
        return;
    }
    this._textContainer.textContent = this.textContent;
  }
}

PFElement.create(PfeBadge);

export default PfeBadge;
