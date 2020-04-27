// Import polyfills: matches, closest, includes
import "./polyfills--pfe-card.js";

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  get schemaUrl() {
    return "pfe-card.json";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get imageSrc() {
    return this.getAttribute("pfe-img-src");
  }

  get backgroundColor() {
    return this.getAttribute("pfe-color") || "base";
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

  static get observedAttributes() {
    return ["pfe-color", "pfe-img-src", "pfe-size"];
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
      this._mapSchemaToSlots(this.tag, this.slots);
      this._init();

      // Note: need to re-render if the mark-up changes to pick up template changes
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

  _init() {
    this.updateVariables();

    // Get the last child in each slot and apply an attribute to it
    // Why? This allows us to apply last-child styles to light DOM
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

    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("pfe-img-src", "", this.imageSrc);
    }
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
    // Strip the prefix from the attribute
    attr = attr.replace("pfe-", "");
    // If the observer is defined in the attribute properties
    if (this[attr] && this[attr].observer) {
      // Get the observer function
      let observer = this[this[attr].observer].bind(this);
      // If it's a function, allow it to run
      if (typeof observer === "function") observer(attr, oldValue, newValue);
    }
  }

  _basicAttributeChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
  }

  // Update the color attribute and contexts
  _colorChanged(attr, oldValue, newValue) {
    this[attr].value = newValue;
    // Trigger an update in nested components
    this.context_update();
  }

  // Update the background image
  _imgSrcChanged(attr, oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

PFElement.create(PfeCard);

export { PfeCard as default };
