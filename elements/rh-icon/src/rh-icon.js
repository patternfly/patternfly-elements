import Rhelement from "../rhelement/rhelement.js";

const templateId = "rh-icon-head";
if (!document.getElementById(templateId)) {
  const cpRHIconTemplate = document.createElement("div");

  cpRHIconTemplate.setAttribute("style", "display: none;");
  cpRHIconTemplate.setAttribute("id", templateId);

  cpRHIconTemplate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
  document.head.appendChild(cpRHIconTemplate);
}

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-icon.html and css from
 * rh-icon.scss
 */

const iconTemplate = document.createElement("template");
iconTemplate.innerHTML = ``;
/* end DO NOT EDIT */

class RhIcon extends Rhelement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super("rh-icon", iconTemplate);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "icon") {
      if (!newVal) {
        console.warn(`rh-icon: no icon name provided`);
        return;
      }

      const svgPath = this.ownerDocument.head.querySelector(`#${newVal} path`);

      if (!svgPath) {
        console.warn(`rh-icon: unable to find svg path for ${newVal}`);
        return;
      }

      this.shadowRoot
        .querySelector("svg g path")
        .setAttribute("d", svgPath.getAttribute("d"));
    }
  }
}

window.customElements.define("rh-icon", RhIcon);
