import PFElement from "../../pfelement/dist/pfelement.js";
import PfeIconSet from "./icon-set.js";
import { addBuiltIns } from "./builtin-icon-sets.js";

/**
 * Sets the id attribute on the <filter> element and points the CSS `filter` at that id.
 */
function _setRandomFilterId(el) {
  const randomId =
    "filter-" +
    Math.random()
      .toString()
      .slice(2, 10);

  // set the CSS filter property to point at the given id
  el.shadowRoot.querySelector("svg image").style.filter = `url(#${randomId})`;

  // set the id attribute on the SVG filter element to match
  el.shadowRoot.querySelector("svg filter").setAttribute("id", randomId);
}

function _iconLoad(el) {
  el.classList.remove("load-failed");
}

function _iconLoadError(el) {
  el.classList.add("load-failed");
  if (el.has_fallback) {
    el.classList.add("has-fallback");
  }
}

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

  get schemaUrl() {
    return "pfe-icon.json";
  }

  get has_fallback() {
    return this.children.length > 0 || this.innerText.length > 0;
  }

  static get observedAttributes() {
    return ["icon", "on-fail", "pfe-circled", "pfe-color"];
  }

  constructor() {
    super(PfeIcon);

    this.image = this.shadowRoot.querySelector("svg image");
    this.image.addEventListener("load", () => _iconLoad(this));
    this.image.addEventListener("error", () => _iconLoadError(this));

    document.body.addEventListener(PfeIcon.EVENTS.ADD_ICON_SET, () =>
      this.updateIcon()
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);
    this.context_update();
    this.updateIcon(newValue);
  }

  updateIcon(iconName = this.getAttribute("icon")) {
    const { set } = PfeIcon.getIconSet(iconName);
    if (set) {
      const iconPath = set.resolveIconName(iconName);
      this.image.setAttribute("xlink:href", iconPath);
      _setRandomFilterId(this);
    }
  }

  /**
   * Get an icon set by providing the set's name, _or_ the name of an icon from that set.
   *
   * @param {String} iconName the name of the set, or the name of an icon from that set.
   * @return {PfeIconSet} the icon set
   */
  static getIconSet(iconName) {
    let set;
    if (iconName) {
      const [setName] = iconName.split("-");
      set = this._iconSets[setName];
    }
    return { set };
  }

  static addIconSet(name, path, resolveIconName) {
    let resolveFunction = resolveIconName;
    if (
      typeof resolveIconName !== "function" &&
      typeof resolveIconName !== "undefined"
    ) {
      console.warn(
        `${this.tag}: The third input to addIconSet should be a function that parses and returns the icon's filename.`
      );
    } else if (
      typeof resolveIconName !== "function" &&
      this._iconSets[name] &&
      typeof this._iconSets[name]._resolveIconName === "function"
    ) {
      resolveFunction = this._iconSets[name]._resolveIconName;
    }

    if (typeof resolveFunction !== "function") {
      console.warn(
        `${this.tag}: The set ${name} needs a resolve function for the icon names.`
      );
    }

    // Register the icon set and set up the event indicating the change
    this._iconSets[name] = new PfeIconSet(name, path, resolveFunction);

    document.body.dispatchEvent(
      new CustomEvent(this.EVENTS.ADD_ICON_SET, {
        bubbles: false,
        detail: {
          set: this._iconSets[name]
        }
      })
    );
  }

  static get EVENTS() {
    return {
      ADD_ICON_SET: `${this.tag}:add-icon-set`
    };
  }
}

PfeIcon._iconSets = {};

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;
