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
