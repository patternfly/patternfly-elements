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

  static get properties() {
    return {
      state: {
        title: "State",
        type: String,
        values: ["default", "moderate", "important", "critical", "success", "info"],
        default: "default"
      },
      // @TODO: Deprecated property in 1.0
      pfeState: {
        type: String,
        prefix: false,
        alias: "state"
      },
      number: {
        title: "Number",
        type: Number,
        observer: "_numberChanged"
      },
      threshold: {
        title: "Threshold",
        type: Number,
        observer: "_thresholdChanged"
      },
      // @TODO: Deprecated property in 1.0
      pfeThreshold: {
        type: Number,
        alias: "threshold",
        prefix: false
      }
    };
  }

  constructor() {
    super(PfeBadge);
    this._textContainer = this.shadowRoot.querySelector("span");
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(...arguments);
    this._textContainer.textContent = this.textContent;
  }

  _thresholdChanged(oldVal, newVal) {
    this.textContent = Number(this.threshold) < Number(this.textContent) ? `${this.threshold}+` : this.textContent;
  }

  _numberChanged(oldVal, newVal) {
    this.textContent = this.threshold && Number(this.threshold) < Number(newVal) ? `${this.threshold}+` : newVal;
  }
}

PFElement.create(PfeBadge);

export default PfeBadge;
