import PFElement from "../../pfelement/dist/pfelement.js";

class PfeHealthIndex extends PFElement {
  static get tag() {
    return "pfe-health-index";
  }

  get templateUrl() {
    return "pfe-health-index.html";
  }

  get styleUrl() {
    return "pfe-health-index.scss";
  }

  static get observedAttributes() {
    return ["health-index"];
  }

  constructor() {
    super(PfeHealthIndex.tag);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const healthIndex = newValue.toLowerCase();
    const healthIndexUpperCase = newValue.toUpperCase();
    const boxes = [...this.shadowRoot.querySelectorAll(".box")];

    this.innerHTML = healthIndexUpperCase;
    this.shadowRoot.querySelector(
      "#healthIndex"
    ).innerText = healthIndexUpperCase;

    boxes.forEach(box => {
      if (box.classList.contains(healthIndex)) {
        box.classList.add("active");
      } else {
        box.classList.remove("active");
      }
    });

    if (!this.shadowRoot.querySelector(".box.active")) {
      console.warn(
        `${
          PfeHealthIndex.tag
        }: a valid health-index was not provided. Please use A, B, C, D, E, or F`
      );
    }
  }
}

PFElement.create(PfeHealthIndex);

export default PfeHealthIndex;
