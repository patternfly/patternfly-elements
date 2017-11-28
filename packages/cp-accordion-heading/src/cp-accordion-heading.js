import Rhelement from "../rhelement/rhelement.js";
import "../cp-styles/cp-styles.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rhcc-freshnessgrade.html and css from
 * rhcc-freshnessgrade.css
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class CpAccordionHeading extends Rhelement {
  static get observedAttributes() {
    return ["aria-expanded"];
  }

  constructor() {
    super("cp-accordion-heading", template);

    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.button = this.shadowRoot.querySelector("button");
    this.addEventListener("click", this._clickHandler);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this._clickHandler);
  }

  get expanded() {
    return this.hasAttribute("aria-expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("aria-expanded", true);
      this.button.setAttribute("aria-expanded", true);
    } else {
      this.removeAttribute("aria-expanded");
      this.button.setAttribute("aria-expanded", false);
    }
  }

  _clickHandler(event) {
    this.dispatchEvent(
      new CustomEvent("cp-accordion-change", {
        detail: { expanded: !this.expanded },
        bubbles: true
      })
    );
  }
}

window.customElements.define("cp-accordion-heading", CpAccordionHeading);
