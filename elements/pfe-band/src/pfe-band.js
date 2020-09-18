// Import polyfills: matches, closest, includes
import "./polyfills--pfe-band.js";

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeBand extends PFElement {
  static get tag() {
    return "pfe-band";
  }

  get schemaUrl() {
    return "pfe-band.json";
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
      // @TODO: Deprecate property
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
      // @TODO: Deprecate property
      oldColor: {
        alias: "color",
        attr: "pfe-color"
      },
      asideDesktop: {
        title: "Aside positioning (desktop)",
        type: String,
        values: ["right", "left"],
        default: "right",
        cascade: [".pfe-band__container"]
      },
      // @TODO: Deprecate property
      oldAsideDesktop: {
        alias: "asideDesktop",
        attr: "pfe-aside-desktop"
      },
      asideMobile: {
        title: "Aside positioning (mobile)",
        type: String,
        values: ["top", "bottom"],
        default: "bottom",
        cascade: [".pfe-band__container"]
      },
      // @TODO: Deprecate property
      oldAsideMobile: {
        alias: "asideMobile",
        attr: "pfe-aside-mobile"
      },
      asideHeight: {
        title: "Aside height",
        type: String,
        values: ["full", "body"],
        default: "body",
        cascade: [".pfe-band__container"]
      },
      // @TODO: Deprecate property
      oldAsideHeight: {
        alias: "asideHeight",
        attr: "pfe-aside-height"
      },
      size: {
        title: "Padding size",
        type: String,
        values: ["small"]
      },
      // @TODO: Deprecate property
      oldSize: {
        alias: "size",
        attr: "pfe-size"
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

  // Update the color attribute and contexts
  _colorChanged() {
    // Trigger an update in nested components
    this.context_update();
  }

  // Update the background image
  _imgSrcChanged(oldVal, newVal) {
    // Set the image as the background image
    this.style.backgroundImage = newVal ? `url('${newVal}')` : ``;
  }
}

PFElement.create(PfeBand);

export { PfeBand as default };
