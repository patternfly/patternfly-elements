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
    // this.useRemoteIcon(newValue);
    // this.useLocalIcon(newValue);
    this.useIcon(newValue);
  }

  useIcon(iconName) {
    switch (this.getAttribute("pfe-method")) {
      case "use-local":
        this.useLocalIcon(iconName);
        break;
      case "use-remote":
        this.useRemoteIcon(iconName);
        break;
      case "duplicate":
        this.useDuplicatedIcon(iconName);
        break;
      case "img":
        this.useImgTag(iconName);
        break;
      default:
        this.useDuplicatedIcon(iconName);
    }
  }

  useRemoteIcon(iconName) {
    const setName = PfeIconSet.getSetName(iconName);
    const iconSet = PfeIconSet.getIconSet(setName);
    const { iconPath, iconId } = iconSet.resolveIconName(iconName);

    const svg = this.shadowRoot.querySelector("svg");
    const use = this.shadowRoot.querySelector("svg use");
    use.setAttribute("href", `${iconPath}#${iconId}`); // href is recommended but not as well supported
    // use.setAttribute("xlink:href", `${iconPath}#${iconId}`); // xlink:href is better supported but deprecated

    // This is a bummer.  We have to move the svg into the light DOM (ie, into
    // the default slot).  this is required for Safari 10 and 11, where <use>
    // doesn't work inside the shadow DOM.
    this.appendChild(svg);
  }

  useImgTag(iconName) {
    const setName = PfeIconSet.getSetName(iconName);
    const iconSet = PfeIconSet.getIconSet(setName);
    const { iconPath } = iconSet.resolveIconName(iconName);

    // remove the svg so it won't take up space (this goes away if we pick img tag as the solution)
    this.shadowRoot.removeChild(this.shadowRoot.querySelector("svg"));

    this.shadowRoot.querySelector("img").src = iconPath;
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

    // if the svg stays in the light dom, it's <use> can't see other light dom
    // elements, so we move the svg into this element's default slot.
    this.appendChild(svg);
  }

  useDuplicatedIcon(iconName) {
    const loader = PfeIconSet.loadIcon(iconName);
    if (loader && loader.then) {
      loader.then(svg => {
        // remove the placeholder svg from the shadowRoot (this is the svg with
        // <use>).  If we go with this "duplicate" method, this won't be
        // necessary because we'll remove it from the template.
        this.shadowRoot.removeChild(this.shadowRoot.querySelector("svg"));
        this.insertAdjacentHTML("beforeend", svg);
      });
    }
    // else {
    //   this.insertAdjacentHTML(
    //     "beforeend",
    //     PfeIconSet.installedIcons[iconName].svgText
    //   );
    // }
  }
}

PFElement.create(PfeIcon);

export default PfeIcon;
