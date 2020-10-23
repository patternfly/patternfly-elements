import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";
import PfeTabs from "../../pfe-tabs/dist/pfe-tabs.js";

class PfeContentSet extends PFElement {
  static get tag() {
    return "pfe-content-set";
  }

  get templateUrl() {
    return "pfe-content-set.html";
  }

  get styleUrl() {
    return "pfe-content-set.scss";
  }

  static get meta() {
    return {
      title: "Content set",
      description:
        "This element creates a flexible component that renders an accordion or tabset depending on screen size."
    };
  }

  static get pfeType() {
    return PFElement.pfeType.combo;
  }

  static get properties() {
    return {
      vertical: {
        title: "Vertical orientation",
        type: Boolean,
        cascade: ["pfe-tabs"]
      },
      // @TODO: Deprecate in 1.0
      oldVertical: {
        type: Boolean,
        alias: "vertical",
        attr: "vertical"
      },
      variant: {
        title: "Variant",
        type: String,
        values: ["wind", "earth"],
        default: "wind",
        cascade: ["pfe-tabs"]
      },
      // @TODO: Deprecate in 1.0
      oldVariant: {
        type: String,
        alias: "variant",
        attr: "pfe-variant"
      },
      align: {
        title: "Align",
        type: String,
        values: ["center"],
        cascade: ["pfe-tabs"]
      },
      // @TODO: Deprecate in 1.0
      oldAlign: {
        type: String,
        alias: "align",
        attr: "pfe-align"
      },
      breakpoint: {
        title: "Custom breakpoint",
        type: String
      },
      // @TODO: Deprecate in 1.0
      oldBreakpoint: {
        type: String,
        alias: "breakpoint",
        attr: "pfe-breakpoint"
      },
      tabHistory: {
        title: "Tab history",
        type: Boolean,
        cascade: "pfe-tabs"
      },
      // @TODO: Deprecate in 1.0
      oldTabHistory: {
        type: Boolean,
        alias: "tabHistory",
        attr: "pfe-tab-history"
      }
    };
  }

  static get slots() {
    return {
      default: {
        title: "Default",
        type: "array",
        namedSlot: false,
        items: {
          $ref: "raw"
        }
      }
    };
  }

  get isTab() {
    var breakpointValue;
    if (this.breakpoint) {
      breakpointValue = parseInt(this.breakpoint.replace(/\D/g, ""));
    } else {
      breakpointValue = 700;
    }
    return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
  }

  get contentSetId() {
    return this.id || this.getAttribute("pfe-id") || this.randomId;
  }

  constructor() {
    super(PfeContentSet, { delayRender: true });

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (this.isTab) {
      this._buildTabs();
    } else {
      this._buildAccordion();
    }

    this.render();
    this.resetContext();

    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, { childList: true });
      }, 0);
    }
  }

  _buildAccordion() {
    let accordion;

    // Use the existing accordion if it exists
    const existingAccordion = this.querySelector(`#${this.contentSetId}`);

    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();

    // Create the accordion wrapper component or use the existing component
    if (!existingAccordion) {
      // Create the accordion wrapper component with a unique ID
      accordion = document.createElement("pfe-accordion");
      accordion.id = this.contentSetId;
    } else {
      accordion = existingAccordion;
    }

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute("pfe-content-set--header")) {
        const header = document.createElement("pfe-accordion-header");

        header.appendChild(child);
        accordion.appendChild(header);
      }

      if (child.hasAttribute("pfe-content-set--panel")) {
        const panel = document.createElement("pfe-accordion-panel");

        panel.appendChild(child);
        accordion.appendChild(panel);
      }
    });

    if (!existingAccordion) {
      fragment.appendChild(accordion);
      this.appendChild(fragment);
    }
  }

  _buildTabs() {
    let tabs;

    // Use the existing tabs if they exist
    let existingTabs = this.querySelector(`#${this.contentSetId}`);

    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();

    // Create the tabs wrapper component or use the existing tabs
    if (!existingTabs) {
      tabs = document.createElement("pfe-tabs");
      tabs.id = this.contentSetId;
    } else {
      tabs = existingTabs;
    }

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute("pfe-content-set--header")) {
        const header = document.createElement("pfe-tab");

        header.setAttribute("slot", "tab");

        header.appendChild(child);
        tabs.appendChild(header);

        if (child.id) {
          header._id = child.id;
        }
      }

      if (child.hasAttribute("pfe-content-set--panel")) {
        const panel = document.createElement("pfe-tab-panel");

        panel.setAttribute("slot", "panel");

        panel.appendChild(child);
        tabs.appendChild(panel);

        if (child.id) {
          panel._id = child.id;
        }
      }
    });

    if (!existingTabs) {
      fragment.appendChild(tabs);
    }

    if (!existingTabs) {
      this.appendChild(fragment);
    }
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
