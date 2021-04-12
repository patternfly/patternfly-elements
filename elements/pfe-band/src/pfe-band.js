// Import polyfills: matches, closest, includes
import "./polyfills--pfe-band.js";

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeBand extends PFElement {
  static get tag() {
    return "pfe-band";
  }

  static get meta() {
    return {
      title: "Band",
      description:
        "This element creates a header, body, footer, and aside region in which to place content or other components."
    };
  }

  get templateUrl() {
    return "pfe-band.html";
  }

  get styleUrl() {
    return "pfe-band.scss";
  }

  get asidePosition() {
    return {
      desktop: this.asideDesktop,
      mobile: this.asideMobile,
      height: this.asideHeight
    };
  }

  static get properties() {
    return {
      imgSrc: {
        title: "Background image",
        type: String,
        observer: "_imgSrcChanged"
      },
      // @TODO: Deprecated property in 1.0
      oldImgSrc: {
        alias: "imgSrc",
        attr: "pfe-img-src"
      },
      color: {
        title: "Background color",
        type: String,
        values: ["lightest", "base", "darker", "darkest", "complement", "accent"],
        default: "base",
        observer: "_colorChanged"
      },
      // @TODO: Deprecated property in 1.0
      oldColor: {
        alias: "color",
        attr: "pfe-color"
      },
      asideDesktop: {
        title: "side positioning (desktop)",
        type: String,
        values: ["right", "left"],
        default: "right"
      },
      // @TODO: Deprecated property in 1.0
      oldAsideDesktop: {
        alias: "asideDesktop",
        attr: "pfe-aside-desktop"
      },
      asideMobile: {
        title: "Aside positioning (mobile)",
        type: String,
        values: ["top", "bottom"],
        default: "bottom"
      },
      // @TODO: Deprecated property in 1.0
      oldAsideMobile: {
        alias: "asideMobile",
        attr: "pfe-aside-mobile"
      },
      asideHeight: {
        title: "Aside height",
        type: String,
        values: ["full", "body"],
        default: "body"
      },
      // @TODO: Deprecated property in 1.0
      oldAsideHeight: {
        alias: "asideHeight",
        attr: "pfe-aside-height"
      },
      size: {
        title: "Padding size",
        type: String,
        values: ["small"]
      },
      // @TODO: Deprecated property in 1.0
      oldSize: {
        alias: "size",
        attr: "pfe-size"
      },
      useGrid: {
        title: "Default grid on for the light DOM regions (header, body, footer, aside)",
        type: Boolean,
        default: false
      }
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
          $ref: "raw"
        }
      },
      body: {
        title: "Body",
        type: "array",
        namedSlot: false,
        items: {
          oneOf: [
            {
              $ref: "pfe-card"
            },
            {
              $ref: "raw"
            }
          ]
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
      },
      aside: {
        title: "Aside",
        type: "array",
        namedSlot: true,
        maxItems: 5,
        items: {
          oneOf: [
            {
              $ref: "pfe-card"
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
    super(PfeBand, { type: PfeBand.PfeType });
  }

  _colorChanged() {
    // Update the context
    this.resetContext();
  }

  // Update the background image
  _imgSrcChanged(oldVal, newVal) {
    // Set the image as the background image
    this.style.backgroundImage = newVal ? `url('${newVal}')` : ``;
  }
}

PFElement.create(PfeBand);

export { PfeBand as default };
