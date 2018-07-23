import Rhelement from "../rhelement/rhelement.js";
import "../rh-icon/rh-icon.js";

class RhIconPanel extends Rhelement {
  get html() {
    return `
<style>
:host {
  display: flex;
  align-content: flex-start; }

:host rh-icon {
  margin-right: var(--rhe-c-icon-panel__icon--MarginRight, 1rem);
  font-size: var(--rhe-c-icon-panel__icon--size, 4rem);
  line-height: var(--rhe-c-icon-panel__icon--size, 4rem); }

:host ::slotted([slot="header"]),
:host ::slotted([slot="footer"]) {
  display: block; }

:host ::slotted([slot="footer"]) {
  margin-top: var(--rhe-c-icon-panel__footer--MarginTop, 16px); }
</style>

<rh-icon></rh-icon>
<div class="content">
  <slot class="header" name="header"></slot>
  <slot class="body"></slot>
  <slot class="footer" name="footer"></slot>
</div>`;
  }

  static get tag() {
    return "rh-icon-panel";
  }

  get styleUrl() {
    return "rh-icon-panel.scss";
  }

  get templateUrl() {
    return "rh-icon-panel.html";
  }

  static get observedAttributes() {
    return ["icon"];
  }

  constructor() {
    super(RhIconPanel.tag);
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

Rhelement.create(RhIconPanel);
