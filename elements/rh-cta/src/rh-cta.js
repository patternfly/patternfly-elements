import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-cta.html and css from
 * rh-cta.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhCta extends Rhelement {
  static get observedAttributes() {
    return ["is"];
  }

  constructor() {
    super("rh-cta", template);
  }

  connectedCallback() {
    super.connectedCallback();

    const firstChild = this.children[0];

    if (!firstChild) {
      console.warn(
        "The first child in the light DOM must be an anchor tag (<a>)"
      );
    } else if (firstChild && firstChild.tagName.toLowerCase() !== "a") {
      console.warn(
        "The first child in the light DOM must be an anchor tag (<a>)"
      );
    } else {
      this.link = this.querySelector("a");
      console.log(this.link);
    }
  }

  disconnectedCallback() {}

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "is") {
    }
  }
}

window.customElements.define("rh-cta", RhCta);
