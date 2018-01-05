import Rhelement from "../rhelement/rhelement.js";
import "../cp-styles/cp-styles.js";

/*
 * DO NOT EDIT. This will be autopopulated with the
 * html from rhcc-freshnessgrade.html and css from
 * rhcc-freshnessgrade.css
 */
const template = document.createElement("template");
template.innerHTML = `
<style>:host {
  display: inline-block;
  position: absolute;
  background: #1a1a1a;
  color: white;
  padding: 4px 6px;
  border-radius: 2px;
  max-width: 200px;
  font-size: 0.9em; }

:host([hidden]) {
  display: none; }

:host::after {
  display: block;
  content: '';
  width: 0;
  height: 0;
  border: 4px solid black;
  border-right-color: transparent;
  border-left-color: transparent;
  border-bottom: 0;
  position: absolute;
  top: auto;
  right: auto;
  bottom: -4px;
  left: 50%;
  margin-left: -2px; }

:host([data-position="left"])::after {
  display: block;
  content: '';
  width: 0;
  height: 0;
  border: 4px solid black;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-right: 0;
  position: absolute;
  top: 50%;
  right: -4px;
  bottom: auto;
  left: auto;
  margin-top: -2px; }

:host([data-position="right"])::after {
  display: block;
  content: '';
  width: 0;
  height: 0;
  border: 4px solid black;
  border-top-color: transparent;
  border-bottom-color: transparent;
  border-left: 0;
  position: absolute;
  top: 50%;
  right: auto;
  bottom: auto;
  left: -4px;
  margin-top: -2px; }

:host([data-position="bottom"])::after {
  display: block;
  content: '';
  width: 0;
  height: 0;
  border: 4px solid black;
  border-right-color: transparent;
  border-left-color: transparent;
  border-top: 0;
  position: absolute;
  top: -4px;
  right: auto;
  bottom: auto;
  left: 50%;
  margin-left: -2px; }</style>
<slot></slot>
`;
/* end DO NOT EDIT */

class CpTooltip extends Rhelement {
  constructor() {
    super("cp-tooltip", template);

    this._show = this._show.bind(this);
    this._hide = this._hide.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (!this.hasAttribute("role")) {
      this.setAttribute("role", "tooltip");
    }

    if (!this.hasAttribute("tabindex")) {
      this.setAttribute("tabindex", -1);
    }

    this._hide();

    this._target = this.getRootNode().querySelector(
      `[aria-describedby=${this.id}]`
    );
    if (!this._target) {
      return;
    }

    this._target.addEventListener("focus", this._show);
    this._target.addEventListener("blur", this._hide);
    this._target.addEventListener("mouseenter", this._show);
    this._target.addEventListener("mouseleave", this._hide);
  }

  disconnectedCallback() {
    if (!this._target) {
      return;
    }

    this._target.removeEventListener("focus", this._show);
    this._target.removeEventListener("blur", this._hide);
    this._target.removeEventListener("mouseenter", this._show);
    this._target.removeEventListener("mouseleave", this._hide);
  }

  _show() {
    this.hidden = false;

    const top = this._target.offsetTop;
    const left = this._target.offsetLeft;
    const boundingClientRect = this._target.getBoundingClientRect();
    const tooltipBoundingClientRect = this.getBoundingClientRect();
    const triangleSize = 4;
    const extraPadding = 2;
    const padding = triangleSize + extraPadding;

    switch (this.getAttribute("data-position")) {
      case "left":
        this.style.top = `${top - boundingClientRect.height / 4}px`;
        this.style.left = `${left -
          tooltipBoundingClientRect.width -
          padding}px`;
        break;

      case "right":
        this.style.top = `${top - boundingClientRect.height / 4}px`;
        this.style.left = `${left + boundingClientRect.width + padding}px`;
        break;

      case "top":
        this.style.top = `${top -
          tooltipBoundingClientRect.height -
          padding}px`;
        this.style.left = `${left +
          boundingClientRect.width / 2 -
          tooltipBoundingClientRect.width / 2}px`;
        break;

      case "bottom":
        this.style.top = `${top + boundingClientRect.height + padding}px`;
        this.style.left = `${left +
          boundingClientRect.width / 2 -
          tooltipBoundingClientRect.width / 2}px`;
        break;
      default:
        this.style.top = `${top -
          tooltipBoundingClientRect.height -
          padding}px`;
        this.style.left = `${left +
          boundingClientRect.width / 2 -
          tooltipBoundingClientRect.width / 2}px`;
    }
  }

  _hide() {
    this.hidden = true;
  }
}

window.customElements.define("cp-tooltip", CpTooltip);
