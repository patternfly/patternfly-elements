// Import polyfills: matches, closest, includes
import "./polyfills--pfe-card.js";

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  static get meta() {
    return {
      title: "Card",
      description:
        "This element creates a header, body, and footer region in which to place content or other components."
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
        observer: "_colorChanged"
      },
      // @TODO: Deprecate property in 1.0
      oldColor: {
        type: String,
        prefix: false,
        alias: "color",
        attr: "pfe-color"
      },
      imgSrc: {
        title: "Background image",
        type: String,
        observer: "_imageSrcChanged"
      },
      // @TODO: Deprecate property in 1.0
      pfeImgSrc: {
        type: String,
        prefix: false,
        alias: "imgSrc"
      },
      size: {
        title: "Padding size",
        type: String,
        values: ["small"]
      },
      // @TODO: Deprecate property in 1.0
      pfeSize: {
        type: String,
        values: ["small"],
        prefix: false,
        alias: "size"
      },
      border: {
        title: "Border",
        type: Boolean
      },
      // @TODO: Deprecate property in 1.0
      oldBorder: {
        alias: "border",
        attr: "pfe-border"
      }
    };
  }

  updateVariables() {
    // If the general padding property is set, split it out and set it on the card
    // Why? Padding needs to be used distinctly in each region, separate from each other
    let padding = this.cssVariable("--pfe-card--Padding");
    if (padding) {
      let actual = this.getComputedValue(
        {
          padding: padding
        },
        ["padding-top", "padding-right", "padding-bottom", "padding-left"]
      );

      Object.entries(actual).forEach(item => {
        let prop = this.toBEM(item[0]),
          value = item[1];
        this.cssVariable(`--${this.tag}--${prop}`, value);
      });
    }
  }

  static get slots() {
    return {
      header: {
        title: "Header",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: {
          $ref: "raw"
        }
      },
      body: {
        title: "Body",
        type: "array",
        namedSlot: false,
        items: {
          $ref: "raw"
        }
      },
      footer: {
        title: "Footer",
        type: "array",
        namedSlot: true,
        maxItems: 3,
        items: {
          oneOf: [
            {
              $ref: "pfe-cta"
            },
            {
              $ref: "raw"
            }
          ]
        }
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });

    this._init = this._init.bind(this);
    this.updateVariables = this.updateVariables.bind(this);

    this._observer = new MutationObserver(() => {
      this._init();

      // Note: need to re-render if the markup changes to pick up template changes
      this.render();
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();

    this._observer.observe(this, {
      childList: true,
      subtree: true
    });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    this.updateVariables();

    // Get the last child in each slot and apply an attribute to it
    // Why? This allows us to apply last-child styles to light DOM
    // @TODO Is a [last] attribute useful for other components?
    Object.keys(this.slots).map(region => {
      let hide = 0;
      let slot = this.slots[region];
      if (slot.nodes && slot.nodes.length > 0) {
        let lastIdx = slot.nodes.length - 1;
        let lastNode = slot.nodes[lastIdx];
        // If this is the last node in the region, apply the last attribute
        if (lastNode) lastNode.setAttribute("last", "");
        // If all nodes in a region have a hidden attribute
        slot.nodes.forEach(node => {
          if (node.hasAttribute("hidden")) {
            hide += 1;
          }
        });
        if (hide === slot.nodes.length) {
          this.removeAttribute(`has_${region}`);
        }
      }
    });
  }

  // If the color changes, update the context
  _colorChanged() {
    // Update the context
    this.resetContext();
  }

  // Update the background image
  _imageSrcChanged(oldValue, newValue) {
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
    Object.entries(set).forEach(item => {
      child.style.setProperty(item[0], item[1]);
    });

    // Attach element to DOM
    document.querySelector("body").appendChild(temp);

    // Get the computed style
    computedStyle = window.getComputedStyle(child, temp);
    if (typeof props === "object") {
      props.map(prop => {
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
}

PFElement.create(PfeCard);

export { PfeCard as default };
