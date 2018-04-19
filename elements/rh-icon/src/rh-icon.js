import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-icon.html and css from
 * rh-icon.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhIcon extends Rhelement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super("rh-icon", template);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const use = this.querySelector("use");
    use.setAttribute("href", `#${newValue}`);
  }
}

window.customElements.define("rh-icon", RhIcon);

const templateId = "rh-icon-head";
if (!document.getElementById(templateId)) {
  const cpRHIconTemplate = document.createElement("div");

  cpRHIconTemplate.setAttribute("style", "display: none;");
  cpRHIconTemplate.setAttribute("id", templateId);

  cpRHIconTemplate.innerHTML = `<svg><use href="" /></svg>`;
  document.head.appendChild(cpRHIconTemplate);
}
