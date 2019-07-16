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

    this.shadowRoot
      .querySelector(".pfe-icon-container")
      .setAttribute("xlink:href", iconPath);
    // this.shadowRoot.querySelector(
    //   ".pfe-icon-container"
    // ).style.backgroundImage = `url(${iconPath})`;

    const randomId =
      "filter-" +
      Math.random()
        .toString()
        .slice(2, 10);

    // this.setFilterId(randomId);

    // this.shadowRoot.querySelector("svg feFlood").style.floodColor =
    //   "var(--pfe-broadcasted--color--text)";
  }

  /**
   * Sets the id attribute on the <filter> element and points the CSS `filter` at that id.
   */
  setFilterId(id) {
    // set the CSS filter property to point at the given id
    this.shadowRoot.querySelector(
      ".pfe-icon-container"
    ).style.filter = `url(#${id})`;

    // set the id attribute on the SVG filter element to match
    this.shadowRoot.querySelector("svg filter").setAttribute("id", id);
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
}

PfeIcon._iconSets = {};

window.PfeIcon = PfeIcon;

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;
