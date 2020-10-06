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
      // @TODO: Deprecate property in 1.0.0
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
      // @TODO: Deprecate property in 1.0.0
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
      // @TODO: Deprecate property in 1.0.0
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
      // @TODO: Deprecate property in 1.0.0
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
      // @TODO: Deprecate property in 1.0.0
      oldAsideHeight: {
        alias: "asideHeight",
        attr: "pfe-aside-height"
      },
      size: {
        title: "Padding size",
        type: String,
        values: ["small"]
      },
      // @TODO: Deprecate property in 1.0.0
      oldSize: {
        alias: "size",
        attr: "pfe-size"
      },
      // Need this for cascading, no observers
      hasHeader: {
        title: "Header slot exists",
        type: Boolean,
        attr: "has_header",
        cascade: [".pfe-band__container"]
      },
      hasAside: {
        title: "Aside slot exists",
        type: Boolean,
        attr: "has_aside",
        cascade: [".pfe-band__container"]
      },
      hasFooter: {
        title: "Footer slot exists",
        type: Boolean,
        attr: "has_footer",
        cascade: [".pfe-band__container"]
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
    // Update the context if necessary
    this.context_set(this.cssVariable("context"));
  }

  // Update the background image
  _imgSrcChanged(oldVal, newVal) {
    // Set the image as the background image
    this.style.backgroundImage = newVal ? `url('${newVal}')` : ``;
  }
}

PFElement.create(PfeBand);

export { PfeBand as default };
