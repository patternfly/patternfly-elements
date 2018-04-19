import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-icon.html and css from
 * rh-icon.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: block; }</style>
<slot></slot>
`;
/* end DO NOT EDIT */

class RhIcon extends Rhelement {
  constructor() {
    super("rh-icon", template);
  }
}

window.customElements.define("rh-icon", RhIcon);
