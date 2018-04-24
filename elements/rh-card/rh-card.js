import Rhelement from "../rhelement/rhelement.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rh-card.html and css from
 * rh-card.scss
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: block;
  padding: var(--rhe-theme--spacer, 1rem);
  border: var(--rhe-theme--border--BorderWidth, 1px) var(--rhe-theme--border--BorderStyle, solid) transparent; }

:host([theme="dark"]) {
  background: var(--rhe-theme--bg-color--shade7, #252527);
  color: var(--rhe-theme--text-color--shade7, #fff); }

:host([theme="light"]) {
  background: var(--rhe-theme--bg-color--shade2, #e7e7e7);
  color: var(--rhe-theme--text-color--shade2, #333); }

:host .rh-card__header::slotted(h1:first-child),
:host .rh-card__header::slotted(h2:first-child),
:host .rh-card__header::slotted(h3:first-child),
:host .rh-card__header::slotted(h4:first-child),
:host .rh-card__header::slotted(h5:first-child),
:host .rh-card__header::slotted(h6:first-child) {
  margin-top: 0 !important; }</style>
<slot class="rh-card__header" name="header"></slot>
<slot class="rh-card__body"></slot>
<slot class="rh-card__footer" name="footer"></slot>
`;
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
