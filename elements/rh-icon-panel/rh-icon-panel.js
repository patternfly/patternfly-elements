import Rhelement from "../rhelement/rhelement.js";
import "../rh-icon/rh-icon.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-icon-panel.html and css from
 * rh-icon-panel.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: flex;
  align-content: flex-start;
  flex-direction: column; }
  @media (min-width: 576px) {
    :host {
      flex-direction: row; } }

:host rh-icon {
  margin-right: var(--rh-icon-panel__icon--MarginRight, 1rem);
  font-size: var(--rh-icon-panel__icon--size, 4rem);
  line-height: var(--rh-icon-panel__icon--size, 4rem);
  min-width: 1em;
  max-width: 1em; }

:host ::slotted([slot="header"]),
:host ::slotted([slot="footer"]) {
  display: block; }

:host ::slotted([slot="footer"]) {
  margin-top: var(--rhe-icon-panel__footer--MarginTop, 16px); }

:host([stacked]) {
  flex-direction: column !important; }

:host([stacked][centered]) {
  align-items: center;
  text-align: center; }

:host([circled]) rh-icon {
  border-radius: 50%;
  background: #d2d2d2;
  border: 1px solid #d2d2d2; }

:host([circled="darkgray"]) rh-icon {
  background: #333;
  border-color: #333; }
  :host([circled="darkgray"]) rh-icon svg {
    fill: #fff; }

:host([circled][bordered]) rh-icon {
  background: none; }</style>
<rh-icon></rh-icon>
<div class="content">
  <slot class="header" name="header"></slot>
  <slot class="body"></slot>
  <slot class="footer" name="footer"></slot>
</div>
`;
/* end DO NOT EDIT */

class RhIconPanel extends Rhelement {
  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super("rh-icon-panel", template);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "icon") {
      if (newVal) {
        let iconElem = this.shadowRoot.querySelector("rh-icon");
        iconElem.setAttribute("icon", newVal);
      }
    }
  }
}

window.customElements.define("rh-icon-panel", RhIconPanel);
