import PFElement from "../pfelement/pfelement.js";
import PfeIconSet from "../pfe-icon-set/pfe-icon-set.js";

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
    this.useRemoteIcon(newValue);
    // this.useLocalIcon(newValue);
  }

  useRemoteIcon(iconName) {
    const setName = PfeIconSet.getSetName(iconName);
    const iconSet = PfeIconSet.getIconSet(setName);
    const { iconPath, iconId } = iconSet.resolveIconName(iconName);

    const use = this.shadowRoot.querySelector("svg use");
    // use.setAttribute("href", `${iconPath}#${name}`); // href is recommended but not as well supported
    // use.setAttribute("xlinks:href", `${iconPath}#${iconId}`); // xlinks:href is better supported but deprecated
    use.setAttribute("href", `${iconPath}#${iconId}`); // xlinks:href is better supported but deprecated
  }

  useLocalIcon(iconName) {
    PfeIconSet.loadIcon(iconName);
    // const iconPath = PfeIconSet.getIconPath(newValue);
    const setName = PfeIconSet.getSetName(iconName);
    const iconSet = PfeIconSet.getIconSet(setName);
    const { iconPath, iconId } = iconSet.resolveIconName(iconName);

    const svg = this.shadowRoot.querySelector("svg");
    const use = svg.querySelector("use");
    use.setAttribute("href", `#${iconId}`);

    this.appendChild(svg);
  }
}

PFElement.create(PfeIcon);

export default PfeIcon;
