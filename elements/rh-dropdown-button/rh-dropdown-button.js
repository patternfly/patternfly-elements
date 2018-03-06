import Rhelement from "../rhelement/rhelement.js";
import "../cp-styles/cp-styles.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rhcc-freshnessgrade.html and css from
 * rhcc-freshnessgrade.css
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host *, :host *::before, :host *::after {
  box-sizing: border-box; }

:host button {
  padding: 8px 16px;
  border: 1px solid #ccc;
  background: transparent;
  font-size: 16px;
  line-height: 1.5em;
  color: #333;
  cursor: pointer; }
  :host button::after {
    content: '';
    display: inline-block;
    margin-left: 8px;
    border-top: 5px solid #333;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    vertical-align: middle; }
  :host button:hover, :host button:focus {
    background: #e7e7e7; }
  :host button[aria-expanded="true"] {
    color: #fff;
    background: #004080;
    border-color: #004080; }
    :host button[aria-expanded="true"]::after {
      border-bottom: 5px solid #fff;
      border-top: 0; }</style>
<button></button>
`;
/* end DO NOT EDIT */

class RhDropdownButton extends Rhelement {
  static get observedAttributes() {
    return ["data-expanded"];
  }

  constructor() {
    super("rh-dropdown-button", template);

    this._clickHandler = this._clickHandler.bind(this);
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector("button");

    const child = this.children[0];
    let isHeadingTag = false;

    if (child) {
      switch (child.tagName) {
        case "H1":
        case "H2":
        case "H3":
        case "H4":
        case "H5":
        case "H6":
          isHeadingTag = true;
          break;
      }
      this.button.innerHTML = child.innerHTML;
    } else {
      this.button.innerHTML = this.textContent.trim();
    }

    if (!isHeadingTag) {
      console.warn(
        "The first child in the light DOM must be a heading level tag (h1, h2, h3, h4, h5, or h6)"
      );
    }

    this.button.setAttribute("aria-haspopup", "true");
    this.button.setAttribute("aria-expanded", "false");

    this.button.addEventListener("click", this._clickHandler);
  }

  disconnectedCallback() {
    this.button.removeEventListener("click", this._clickHandler);
  }

  get expanded() {
    return this.hasAttribute("data-expanded");
  }

  set expanded(val) {
    val = Boolean(val);

    if (val) {
      this.setAttribute("data-expanded", true);
      this.button.setAttribute("aria-expanded", true);
    } else {
      this.removeAttribute("data-expanded");
      this.button.setAttribute("aria-expanded", false);
    }
  }

  _clickHandler(event) {
    this.dispatchEvent(
      new CustomEvent("rh-dropdown-change", {
        detail: { expanded: !this.expanded },
        bubbles: true
      })
    );
  }
}

window.customElements.define("rh-dropdown-button", RhDropdownButton);
