const elementName = "rh-icon";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-icon.html and css from
 * rh-icon.scss
 */

const iconTemplate = document.createElement("template");
iconTemplate.innerHTML = ``;
/* end DO NOT EDIT */

class RhIcon extends HTMLElement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super();
    this.appendChild(iconTemplate.content.cloneNode(true));
  }

  connectedCallback() {
    if (window.ShadyCSS) {
      ShadyCSS.styleElement(this);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    const use = this.querySelector("use");
    use.setAttribute("href", `#${newValue}`);
  }
}

window.customElements.define(elementName, RhIcon);

const templateId = "rh-icon-head";
if (!document.getElementById(templateId)) {
  const cpRHIconTemplate = document.createElement("div");

  cpRHIconTemplate.setAttribute("style", "display: none;");
  cpRHIconTemplate.setAttribute("id", templateId);

  cpRHIconTemplate.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg"></svg>`;
  document.head.appendChild(cpRHIconTemplate);
}
