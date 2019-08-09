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
    return ["icon"];
  }

  constructor() {
    super(PfeIcon);

    this.image = this.shadowRoot.querySelector("svg image");
    this.image.addEventListener("load", () => this.iconLoad());
    this.image.addEventListener("error", () => this.iconLoadError());
  }

  iconLoad() {
    this.image.classList.remove("load-failed");
  }

  iconLoadError() {
    console.warn(
      `icon named "${this.getAttribute(
        "icon"
      )}" failed to load from URL ${this.image.getAttribute("xlink:href")}`
    );
    this.image.classList.add("load-failed");
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);
    this.updateIcon(newValue);
  }

  updateIcon(iconName) {
    const { setName, set } = PfeIcon.getIconSet(iconName);

    if (set) {
      const { iconPath } = set.resolveIconName(iconName);
      this.image.setAttribute("xlink:href", iconPath);
    } else {
      console.warn(
        `icon "${iconName}" was requested but no icon set "${setName}" is registered`
      );
    }
  }

  /**
   * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
   *
   * @param {String} iconName the name of the set, or the name of an icon from that set.
   * @return {PfeIconSet} the icon set
   */
  static getIconSet(iconName) {
    const [setName] = iconName.split("-");
    const set = this._iconSets[setName];
    return { setName, set };
  }

  static addIconSet(name, path, resolveIconName) {
    if (this._iconSets[name]) {
      throw new Error(
        `can't add icon set ${name}; a set with that name already exists.`
      );
    }

    this._iconSets[name] = new PfeIconSet(name, path, resolveIconName);
  }
}

PfeIcon._iconSets = {};

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;
