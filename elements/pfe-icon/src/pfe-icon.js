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
    const { iconPath, iconId } = iconSet.parseIconName(iconName);

    const svg = this.shadowRoot.querySelector("svg");
    const use = svg.querySelector("svg use");
    use.setAttribute("href", `${iconPath}#${iconId}`); // href is recommended but not as well supported

    // This is a bummer.  We have to move the svg into the light DOM (ie, into
    // the default slot).  this is required for Safari 10 and 11, where <use>
    // doesn't work inside the shadow DOM.
    this.appendChild(svg);
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

    console.log(`adding icon set ${name}`);
    this._iconSets[name] = new PfeIconSet(name, path, parseIconName);
  }
}

PfeIcon._iconSets = {};

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;
