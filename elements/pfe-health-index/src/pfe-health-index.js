import PFElement from "../../pfelement/dist/pfelement.js";

class PfeHealthIndex extends PFElement {
  static get tag() {
    return "pfe-health-index";
  }

  get schemaUrl() {
    return "pfe-health-index.json";
  }

  get templateUrl() {
    return "pfe-health-index.html";
  }

  get styleUrl() {
    return "pfe-health-index.scss";
  }

  static get properties() {
    return {
      healthIndex: {
        title: "Health index",
        type: String,
        values: ["A", "B", "C", "D", "E", "F"],
        default: "A",
        observer: "_healthIndexChanged"
      },
      size: {
        title: "Size",
        type: String,
        values: ["mini", "lg"],
        observer: "_sizeChanged",
        default: ""
      }
    };
  }

  constructor() {
    super(PfeHealthIndex, { delayRender: true });
  }

  _healthIndexChanged(oldValue, newValue) {
    // this.schemaProps.size.value = newValue;
    this.render();
    this.updateHealthIndex(newValue);
  }

  _sizeChanged(oldValue, newValue) {
    // this.schemaProps.size.value = this.getAttribute("size");
    this.render();
    this.updateHealthIndex(this.healthIndex, oldValue);
  }

  updateHealthIndex(grade, oldValue) {
    const healthIndex = grade.toLowerCase();
    const healthIndexUpperCase = grade.toUpperCase();
    const boxes = [...this.shadowRoot.querySelectorAll(".box")];
    this.innerHTML = healthIndexUpperCase;

    if (this.size === "mini") {
      this.shadowRoot.querySelector(".box").classList.remove(oldValue);
      this.shadowRoot.querySelector(".box").classList.add(healthIndex);
    }

    boxes.forEach(box => {
      if (box.classList.contains(healthIndex)) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });

    if (this.size !== "lg") {
      this.shadowRoot.querySelector("#healthIndex").innerText = healthIndexUpperCase;
    }

    if (!this.shadowRoot.querySelector(".box.active")) {
      this.warn(`a valid health-index was not provided. Please use A, B, C, D, E, or F`);
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
