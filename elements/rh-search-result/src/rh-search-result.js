import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-search-result.html and css from
 * rh-search-result.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhSearchResult extends Rhelement {
  constructor() {
    super("rh-search-result", template);
  }
}

window.customElements.define("rh-search-result", RhSearchResult);
