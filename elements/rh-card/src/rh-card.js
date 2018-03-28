import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from cp-dialog.html and css from
 * cp-dialog.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhCard extends Rhelement {
  constructor() {
    super("rh-card", template);
  }
}

window.customElements.define("rh-card", RhCard);
