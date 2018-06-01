import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-search-result.html and css from
 * rh-search-result.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: block; }

::slotted([slot=heading]) {
  margin: 0;
  font-size: 1.125rem;
  line-height: 1.6875rem; }

::slotted([slot=meta]) {
  font-size: .875rem;
  line-height: 1.3125rem;
  margin: 0 0 .375rem;
  color: var(--rhe-c-search-result_meta--Color, #6e6e6e); }</style>
<slot name="heading"></slot>
<slot name="meta"></slot>
<slot></slot>
`;
/* end DO NOT EDIT */

class RhSearchResult extends Rhelement {
  constructor() {
    super("rh-search-result", template);
  }
}

window.customElements.define("rh-search-result", RhSearchResult);
