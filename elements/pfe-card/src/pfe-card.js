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

  static get properties() {
    return {
      color: {
        title: "Background Color",
        type: String,
        enum: ["lightest", "base", "darker", "darkest", "complement", "accent"],
        // default: "base",
        observer: "_colorChanged"
      },
      // @TODO: Deprecate property
      pfeColor: {
        type: String,
        enum: ["lightest", "base", "darker", "darkest", "complement", "accent"],
        // default: "base",
        prefix: false,
        alias: "color"
      },
      imgSrc: {
        title: "Background Image",
        type: String,
        observer: "_imgSrcChanged"
      },
      // @TODO: Deprecate property
      pfeImgSrc: {
        type: String,
        prefix: false,
        alias: "imgSrc"
      },
      size: {
        title: "Padding Size",
        type: String,
        enum: ["small"]
      },
      // @TODO: Deprecate property
      pfeSize: {
        type: String,
        enum: ["small"],
        prefix: false,
        alias: "size"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeCard, { type: PfeCard.PfeType });
    this._observer = new MutationObserver(() => {
      this._mapSchemaToSlots(this.tag, this.slots);
    });
  }

  connectedCallback() {
    super.connectedCallback();

    // Initialize the background image attachment
    if (this.imageSrc) {
      this._imgSrcChanged("", this.imageSrc);
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  // Update the color attribute and contexts
  _colorChanged(oldValue, newValue) {
    // Trigger an update in nested components
    console.log("color changed");
    this.context_update();
  }

  // Update the background image
  _imgSrcChanged(oldValue, newValue) {
    // Set the image as the background image
    this.style.backgroundImage = newValue ? `url('${newValue}')` : ``;
  }
}

PFElement.create(PfeCard);

export { PfeCard as default };
