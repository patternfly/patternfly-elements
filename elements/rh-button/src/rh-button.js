import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-button.html and css from
 * rh-button.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhButton extends Rhelement {
  constructor() {
    super("rh-button", template);
  }
}

window.customElements.define("rh-button", RhButton);
