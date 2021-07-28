import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  static get meta() {
    return {
      title: "Card",
      description:
        "This element creates a header, body, and footer region in which to place content or other components.",
    };
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  // @TODO: How do we handle attributes for slotted content?
  static get properties() {
    return {
      color: {
        title: "Background color",
        type: String,
        values: ["lightest", "base", "darker", "darkest", "complement", "accent"],
        default: "base",
        observer: "_colorChanged",
      },
      // @TODO: Deprecate property in 1.0
      oldColor: {
        type: String,
        prefix: false,
        alias: "color",
        attr: "pfe-color",
      },
      imgSrc: {
        title: "Background image",
        type: String,
        observer: "_imageSrcChanged",
      },
      // @TODO: Deprecate property in 1.0
      pfeImgSrc: {
        type: String,
        prefix: false,
        alias: "imgSrc",
      },
      size: {
        title: "Padding size",
        type: String,
        values: ["small"],
      },
      // @TODO: Deprecate property in 1.0
      pfeSize: {
        type: String,
        values: ["small"],
        prefix: false,
        alias: "size",
      },
      border: {
        title: "Border",
        type: Boolean,
      },
      // @TODO: Deprecate property in 1.0
      oldBorder: {
        alias: "border",
        attr: "pfe-border",
      },
    };
  }

  static get slots() {
    return {
      header: {
        title: "Header",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: {
          $ref: "raw",
        },
      },
      body: {
        title: "Body",
        type: "array",
        namedSlot: false,
        items: {
          $ref: "raw",
        },
      },
      footer: {
        title: "Footer",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: {
          oneOf: [
            {
              $ref: "pfe-cta",
            },
            {
              $ref: "raw",
            },
          ],
        },
      },
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });

    this._colorChanged = this._colorChanged.bind(this);
    this._imageSrcChanged = this._imageSrcChanged.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    // If the general padding property is set, split it out and set it on the card
    // Why? Padding needs to be used distinctly in each region, separate from each other
    this.getExplicitProps("padding", ["padding-top", "padding-right", "padding-bottom", "padding-left"]);
  }

  // If the color changes, update the context
  _colorChanged(oldValue, newValue) {
    if (oldValue === newValue) return;

    // Update the context
    this.resetContext();
  }

  // Update the background image
  _imageSrcChanged(oldValue, newValue) {
    if (oldValue === newValue) return;

    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }

  /**
   * This fetches the computed value of a CSS property by attaching a temporary element to the DOM.
   * This is important specifically for properties like height or width that are influenced by layout.
   * Or in situations where a shorthand might be used or stored in a variable.
   *
   * @param {Object} set - CSS property name in hyphen-case (padding-top instead of paddingTop) as the key and the property to query for as the value.
   * @param {Array} props - A list of the properties to capture the computed value for (hyphen-case).
   * @return {Object} result - An object with the property name (hyphen-case) as key and the value is the computed value on the element.
   *
   * @example: `this.getComputedValue({ padding: 10px 16px }, ["padding-top", "padding-right", "padding-bottom", "padding-left"])`
   */
  getComputedValue(set, props = [], child = document.createElement("div")) {
    let computedStyle;
    let result = {};
    const temp = document.createElement("div");

    // Make sure the element is not visible
    temp.style.setProperty("position", "absolute");
    temp.style.setProperty("left", "-110vw");

    temp.appendChild(child);

    // Attach styles to child element
    Object.entries(set).forEach((item) => {
      child.style.setProperty(item[0], item[1]);
    });

    // Attach element to DOM
    document.querySelector("body").appendChild(temp);

    // Get the computed style
    computedStyle = window.getComputedStyle(child, temp);
    if (typeof props === "object") {
      props.map((prop) => {
        let obj = {};
        obj[prop] = computedStyle[prop];
        // Add the object to the overall result
        Object.assign(result, obj);
      });
    } else if (typeof props === "string") {
      let obj = {};
      obj[props] = computedStyle[props];
      // Add the object to the overall result
      Object.assign(result, obj);
    }

    // Clean up the DOM
    temp.remove();

    return result;
  }

  /**
   * This converts property names such as background-color into BEM format (i.e., BackgroundColor)
   * @param {String} property - CSS property name in hyphen format (padding-top, margin-bottom, etc.).
   * @example this.toBEM(padding-top);
   * @return {String} property - String where the provided property is converted to PascalCase.
   * @TODO needs to be migrated to a mixin of pfelement?
   */
  toBEM(property) {
    // Capitalize the first letter
    property = `${property.charAt(0).toUpperCase()}${property.slice(1)}`;
    // Replace dash with uppercase letter
    property = property.replace(/\-([a-z])/g, (match, letter) => {
      return letter.toUpperCase();
    });
    return property;
  }

  /**
   * This converts shorthand CSS variables to explicit variables; for example,
   * if a user sets --pfe-card--Padding, this captures that and converts it to
   * --pfe-card--PaddingTop, --pfe-card--PaddingBottom, --pfe-card--PaddingRight, --pfe-card--PaddingLeft.
   * @param {String} property - CSS property name in hyphen format (padding-top, margin-bottom, etc.).
   * @param {Array} parts - CSS properties to break the shorthand into ([border-width, border-style, border-color]).
   * @example getExplicitProps("padding", ["padding-top", "padding-right", "padding-bottom", "padding-left"]);
   * @TODO needs to be migrated to a mixin of pfelement?
   */
  getExplicitProps(property, parts) {
    const variable = this.cssVariable(`--${this.tag}--${this.toBEM(property)}`);
    if (variable) {
      let cssprops = {};
      cssprops[property] = variable;
      const actual = this.getComputedValue(cssprops, parts);

      if (actual) {
        // Set the CSS variable for each returned value
        Object.entries(actual).forEach((item) => {
          this.cssVariable(`--${this.tag}--${this.toBEM(item[0])}`, item[1]);
        });
      }
    }
  }
}

PFElement.create(PfeCard);

export { PfeCard as default };
