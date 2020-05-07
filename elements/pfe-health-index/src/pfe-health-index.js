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

  static get observedAttributes() {
    return ["health-index", "size"];
  }

  constructor() {
    super(PfeHealthIndex, { delayRender: true });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);

    switch (attr) {
      case "size":
        this.props.size.value = newValue;
        this.render();
        this.updateHealthIndex(this.getAttribute("health-index"), oldValue);
        break;
      case "health-index":
        this.props.size.value = this.getAttribute("size");
        this.render();
        this.updateHealthIndex(newValue);
        break;
      default:
        break;
    }
  }

  updateHealthIndex(grade, oldValue) {
    const healthIndex = grade.toLowerCase();
    const healthIndexUpperCase = grade.toUpperCase();
    const boxes = [...this.shadowRoot.querySelectorAll(".box")];
    this.innerHTML = healthIndexUpperCase;

    if (this.props.size.value === "mini") {
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

    if (this.props.size.value !== "lg") {
      this.shadowRoot.querySelector(
        "#healthIndex"
      ).innerText = healthIndexUpperCase;
    }

    if (!this.shadowRoot.querySelector(".box.active")) {
      console.warn(
        `${PfeHealthIndex.tag}: a valid health-index was not provided. Please use A, B, C, D, E, or F`
      );
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
