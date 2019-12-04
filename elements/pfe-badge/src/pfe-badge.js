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
    return ["number", "text", "pfe-state", "pfe-threshold"];
  }

  get threshold() {
    return this.getAttribute('pfe-threshold');
  }

  constructor() {
    super(PfeBadge);   
  }

  connectedCallback() {
    super.connectedCallback();
  }

  attributeChangedCallback(attr, oldVal, newVal) {   
    switch(attr) {
      case "pfe-threshold":
        this.textContent = this.threshold < this.textContent ? `${this.threshold}+` : this.textContent;
        break;
      case "number":
        this.textContent = this.threshold && Number(this.threshold) < Number(newVal) ? `${this.threshold}+` : newVal;
        break;
      case "text":      
        if (this.threshold) {
          console.warn("`pfe-threshold` attribute shouldn't be used with `text` value");
        }
        this.textContent = newVal;
        break;
      default:
        return;
    }
  }
}

PFElement.create(PfeBadge);

export default PfeBadge;
