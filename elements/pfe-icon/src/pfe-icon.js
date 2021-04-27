// Import polyfills: window.CustomEvent
import "./polyfills--pfe-icon.js";

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

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      icon: {
        type: String,
        observer: "updateIcon",
        prefix: false
      },
      size: {
        type: String,
        values: ["xl", "lg", "md", "sm", "1x", "2x", "3x", "4x"],
        default: "1x"
      },
      color: {
        type: String,
        values: [
          "complement",
          "accent",
          "lightest",
          "base",
          "darker",
          "darkest",
          "critical",
          "important",
          "moderate",
          "success",
          "info"
        ],
        observer: "_colorChanged"
      },
      onFail: {
        type: String,
        values: ["collapse"]
      },
      circled: {
        type: Boolean
      },
      block: {
        type: Boolean
      },

      // TODO: Deprecated for 1.0
      oldColor: {
        type: String,
        alias: "color",
        attr: "pfe-color"
      },
      // TODO: Deprecated for 1.0
      oldSize: {
        type: String,
        alias: "size",
        attr: "pfe-size"
      },
      // TODO: Deprecated for 1.0
      oldCircled: {
        type: Boolean,
        alias: "circled",
        attr: "pfe-circled"
      },
      // TODO: Deprecated for 1.0
      oldBlock: {
        type: Boolean,
        alias: "block",
        attr: "data-block"
      }
    };
  }

  static get EVENTS() {
    return {
      ADD_ICON_SET: `${this.tag}:add-icon-set`
    };
  }

  get upgraded() {
    return this.image.hasAttribute("xlink:href");
  }

  _iconLoad() {
    this.classList.remove("load-failed");
  }

  _iconLoadError(e) {
    this.classList.add("load-failed");
    if (this.hasLightDOM()) this.classList.add("has-fallback");
  }

  _colorChanged() {
    // Update the context
    this.resetContext();
  }

  constructor() {
    super(PfeIcon, { type: PfeIcon.PfeType });

    this._iconLoad = this._iconLoad.bind(this);
    this._iconLoadError = this._iconLoadError.bind(this);

    this.image = this.shadowRoot.querySelector("svg image");
    if (this.image) {
      this.image.addEventListener("load", this._iconLoad);
      this.image.addEventListener("error", this._iconLoadError);
    }

    // Attach a listener for the registration of an icon set
    // Leaving this attached allows for the registered set to be updated
    document.body.addEventListener(PfeIcon.EVENTS.ADD_ICON_SET, () => this.updateIcon());
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.image) {
      this.image.removeEventListener("load", this._iconLoad);
      this.image.removeEventListener("error", this._iconLoadError);
    }
  }

  updateIcon() {
    const { set } = PfeIcon.getIconSet(this.icon);
    if (set) {
      const iconPath = set.resolveIconName(this.icon);
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
    let resolveFunction;

    if (typeof resolveIconName === "function") {
      resolveFunction = resolveIconName;
    } else if (
      typeof resolveIconName === "undefined" &&
      this._iconSets[name] &&
      typeof this._iconSets[name]._resolveIconName === "function"
    ) {
      resolveFunction = this._iconSets[name]._resolveIconName;
    } else if (typeof resolveIconName !== "function" && typeof resolveIconName !== "undefined") {
      PfeIcon.warn(
        `[${this.tag}]: The third input to addIconSet should be a function that parses and returns the icon's filename.`
      );
    } else {
      PfeIcon.warn(`[${this.tag}]: The set ${name} needs a resolve function for the icon names.`);
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
}

PfeIcon._iconSets = {};

addBuiltIns(PfeIcon);

PFElement.create(PfeIcon);

export default PfeIcon;
