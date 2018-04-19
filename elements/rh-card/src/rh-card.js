import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-card.html and css from
 * rh-card.scss
 */
const template = document.createElement("template");
template.innerHTML = ``;
/* end DO NOT EDIT */

class RhCard extends Rhelement {
  static get observedAttributes() {
    return ["theme"];
  }

  constructor() {
    super("rh-card", template);
  }

  connectedCallback() {
    super.connectedCallback();

    console.log(this);

    // this.button = this.shadowRoot.querySelector("button");
    //
    // const child = this.children[0];
    // let isHeadingTag = false;
    //
    // if (child) {
    //   switch (child.tagName) {
    //     case "H1":
    //     case "H2":
    //     case "H3":
    //     case "H4":
    //     case "H5":
    //     case "H6":
    //       isHeadingTag = true;
    //       break;
    //   }
    //
    //   const wrapperTag = document.createElement(child.tagName);
    //   this.button.innerText = child.innerText;
    //
    //   wrapperTag.appendChild(this.button);
    //   this.shadowRoot.appendChild(wrapperTag);
    // } else {
    //   this.button.innerText = this.textContent.trim();
    // }
    //
    // if (!isHeadingTag) {
    //   console.warn(
    //     "The first child in the light DOM must be a heading level tag (h1, h2, h3, h4, h5, or h6)"
    //   );
    // }
  }

  disconnectedCallback() {}

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === "theme") {
    }
  }
}

window.customElements.define("rh-card", RhCard);
