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

  get meta() {
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
        default: false,
        prefixed: false,
        cascade: "pfe-tabs"
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"],
        default: "wind"
      },
      // TODO: Deprecate pfe-tab-history for 1.0
      oldVariant: {
        attr: "pfe-variant",
        alias: "variant",
        cascade: "pfe-tabs"
      },
      align: {
        title: "Align",
        type: String,
        enum: ["center"]
      },
      // TODO: Deprecate pfe-tab-history for 1.0
      oldAlign: {
        attr: "pfe-align",
        alias: "align",
        cascade: "pfe-tabs"
      },
      breakpoint: {
        title: "Custom breakpoint",
        type: String
      },
      tabHistory: {
        title: "Tab History",
        type: Boolean
      },
      // TODO: Deprecate pfe-tab-history for 1.0
      oldTabHistory: {
        alias: "tabHistory",
        attr: "pfe-tab-history",
        cascade: "pfe-tabs"
      },
      id: {
        type: String
      },
      // TODO: Deprecate pfe-id for 1.0
      oldId: {
        alias: "id",
        attr: "pfe-id"
      }
    };
  }

  static get slots() {
    return {
      default: {
        type: "array",
        namedSlot: false,
        items: {
          oneOf: [
            {
              $ref: "raw"
            }
          ]
        }
      }
    };
  }

  get isTab() {
    var breakpointValue;
    if (this.breakpoint) {
      breakpointValue = this.breakpoint;
      breakpointValue = breakpointValue.replace(/\D/g, "");
    } else {
      breakpointValue = 700;
    }
    return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
  }

  get contentSetId() {
    return this.id || this.id || this.randomId;
  }

  constructor() {
    super(PfeContentSet, { delayRender: true });

    this._init = this._init.bind(this);
    this._buildAccordion = this._buildAccordion.bind(this);
    this._buildTabs = this._buildTabs.bind(this);

    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length) {
      this._init();
    }

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
    this.context_update();

    if (window.ShadyCSS) {
      this._observer.observe(this, { childList: true });
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
      accordion = document.createElement(PfeAccordion.tag);
      accordion.id = this.contentSetId;
    } else {
      accordion = existingAccordion;
    }

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute(`${this.tag}--header`)) {
        const header = document.createElement(`${PfeAccordion.tag}-header`);

        header.appendChild(child);
        accordion.appendChild(header);
      }

      if (child.hasAttribute(`${this.tag}--panel`)) {
        const panel = document.createElement(`${PfeAccordion.tag}-panel`);

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
    let existingTabs = this.querySelector(`[pfe-id="${this.contentSetId}"]`);

    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();

    // Create the tabs wrapper component or use the existing tabs
    if (!existingTabs) {
      tabs = document.createElement("pfe-tabs");
      tabs.setAttribute("pfe-id", this.contentSetId);
    } else {
      tabs = existingTabs;
    }

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute(`${this.tag}--header`)) {
        const header = document.createElement("pfe-tab");

        header.setAttribute("slot", "tab");

        if (child.id) {
          header.setAttribute("pfe-id", child.id);
        }

        header.appendChild(child);
        tabs.appendChild(header);
      }

      if (child.hasAttribute(`${this.tag}--panel`)) {
        const panel = document.createElement("pfe-tab-panel");

        panel.setAttribute("slot", "panel");

        if (child.id) {
          panel.setAttribute("pfe-id", child.id);
        }

        panel.appendChild(child);
        tabs.appendChild(panel);
      }
    });

    if (!existingTabs) {
      fragment.appendChild(tabs);
      this.appendChild(fragment);
    }
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
