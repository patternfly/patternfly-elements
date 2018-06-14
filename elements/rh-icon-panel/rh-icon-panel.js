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
  display: block; }</style>
<rh-icon data-size="2x" icon="rh-icon-server"></rh-icon>
<slot class="rh-icon-panel__header" name="header"></slot>
<slot class="rh-icon-panel__body"></slot>
<slot class="rh-icon-panel__footer" name="footer"></slot>
`;
/* end DO NOT EDIT */

class RhIconPanel extends Rhelement {
  constructor() {
    super("rh-icon-panel", template);
  }

  connectedCallback() {
    super.connectedCallback();

    const attrs = this.attributes;

    if (attrs.getNamedItem("icon") == null) {
      console.warn("You must provide an icon attribute on rh-icon-panel");
    } else {
      let iconElem = this.shadowRoot.querySelector("rh-icon");
      // iconElem.setAttribute("icon", attrs.getNamedItem("icon").value);
    }
  }

  disconnectedCallback() {}
}

window.customElements.define("rh-icon-panel", RhIconPanel);
