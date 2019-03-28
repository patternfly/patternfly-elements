import PFElement from "../../pfelement/dist/pfelement.js";

const templateId = "pfe-icon-head";
if (!document.getElementById(templateId)) {
  const cpRHIconTemplate = document.createElement("div");

  cpRHIconTemplate.setAttribute("style", "display: none;");
  cpRHIconTemplate.setAttribute("id", templateId);

  cpRHIconTemplate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
  document.head.appendChild(cpRHIconTemplate);
}

class PfeIcon extends PFElement {
  static get tag() {
    return "pfe-icon";
  }

  get styleUrl() {
    return "pfe-icon.scss";
  }

  get templateUrl() {
    return "pfe-icon.html";
  }

  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super(PfeIcon);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "icon") {
      if (!newVal) {
        console.warn(`pfe-icon: no icon name provided`);
        return;
      }

      const svgPath = this.ownerDocument.head.querySelector(`#${newVal} path`);

      if (!svgPath) {
        console.warn(`pfe-icon: unable to find svg path for ${newVal}`);
        return;
      }

      this.shadowRoot
        .querySelector("svg g path")
        .setAttribute("d", svgPath.getAttribute("d"));
    }
  }
}

PFElement.create(PfeIcon);
