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
    // return "pfe-badge.json";
  }

  static get properties() {
    return {
      state: {
        title: "State",
        type: String,
        enum: ["default", "moderate", "important", "critical", "success", "info"],
        default: "default"
      },
      // @TODO: Deprecate property
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
      // @TODO: Deprecate property
      _number: {
        // i feel dirty
        type: Number,
        prefix: false,
        attr: "number",
        alias: "number"
      },
      threshold: {
        title: "Threshold",
        type: Number,
        observer: "_thresholdChanged"
      },
      // @TODO: Deprecate property
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
