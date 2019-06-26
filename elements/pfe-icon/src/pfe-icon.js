import PFElement from "../pfelement/pfelement.js";
import PfeIconSet from "./pfe-icon-set.js";
import { addBuiltIns } from "./pfe-builtin-icon-sets.js";

class PfeIcon extends PFElement {
  static get tag() {
    return "pfe-icon";
  }

  get templateUrl() {
    return "pfe-icon.html";
  }

  get styleUrl() {
    return "pfe-icon.scss";
  }

  static get observedAttributes() {
    return ["pfe-icon"];
  }

  constructor() {
    super(PfeIcon);
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);
    this.updateIcon(newValue);
  }

  updateIcon(iconName) {
    const iconSet = PfeIcon.getIconSet(iconName);
    const { iconPath } = iconSet.parseIconName(iconName);

    this.style.backgroundImage = `url(${iconPath})`;
    this.style.filter = `url(#${
      ["lightblue", "redhatred"][Math.round(Math.random())]
    })`;
  }

  /**
   * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
   *
   * @param {String} name the name of the set, or the name of an icon from that set.
   * @return {PfeIconSet} the icon set
   */
  static getIconSet(name) {
    const [setName] = name.split("-");
    return this._iconSets[setName];
  }

  static addIconSet(name, path, parseIconName) {
    if (this._iconSets[name]) {
      throw new Error(
        `can't add icon set ${name}; a set with that name already exists.`
      );
    }

    this._iconSets[name] = new PfeIconSet(name, path, parseIconName);
  }

  /**
   * Create a placeholder SVG which will have SVG filters stuffed into it.
   */
  static createFilterSet() {
    if (!this.getFilterSet()) {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.id = "pfe-filters";
      // svg.style.display = "none";
      document.body.appendChild(svg);
    }
  }

  /**
   * Get the filter set SVG element.
   */
  static getFilterSet() {
    return document.querySelector("#pfe-filters");
  }

  /**
   * Create a filter to be placed into the #pfe-filters SVG.
   */
  static createFilter(name, color = "#ee0000") {
    if (/[^-_A-z0-1]/.test(name)) {
      throw new Error(
        `filter names must be valid html id's, so the provided filter name is invalid: ${name}`
      );
    }
    const filter = `
      <filter id="${name}" color-interpolation-filters="sRGB"
              x="0" y="0" height="100%" width="100%">
        <feFlood flood-color="${color}" result="COLOR" />
        <feComposite operator="in" in="COLOR" in2="SourceAlpha" />
      </filter>`;
    // this.getFilterSet().insertAdjacentHTML("beforeend", filter);
    this.getFilterSet().innerHTML += filter;
  }
}

PfeIcon._iconSets = {};
PfeIcon.createFilterSet();
PfeIcon.createFilter("lightblue", "#5CC8DF");
PfeIcon.createFilter("redhatred", "rgb(210, 0, 0)");

window.PfeIcon = PfeIcon;

addBuiltIns(PfeIcon);

setTimeout(() => PFElement.create(PfeIcon), 1000);

export default PfeIcon;
