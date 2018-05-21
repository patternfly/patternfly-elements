import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rhcc-freshnessgrade.html and css from
 * rhcc-freshnessgrade.css
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: none;
  overflow: hidden;
  background: white;
  will-change: height; }

:host([expanded]) {
  display: block; }

:host(.animating) {
  display: block;
  transition: height 0.3s ease-in-out; }

.container {
  border: 2px solid #f7f7f7;
  border-top: none;
  padding: 20px; }</style>
<div tabindex="-1" role="tabpanel">
  <div class="container">
    <slot></slot>
  </div>
</div>
`;
/* end DO NOT EDIT */

class CpAccordionPanel extends Rhelement {
  constructor() {
    super("cp-accordion-panel", template);
  }

  get expanded() {
    return this.hasAttribute("expanded");
  }

  set expanded(val) {
    const value = Boolean(val);

    if (value) {
      this.setAttribute("expanded", "");
    } else {
      this.removeAttribute("expanded");
    }
  }
}

window.customElements.define("cp-accordion-panel", CpAccordionPanel);
