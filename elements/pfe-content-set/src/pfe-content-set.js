import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";
import PfeTabs from "../../pfe-tabs/dist/pfe-tabs.js";

const CONTENT_MUTATION_CONFIG = {
  characterData: true,
  childList: true,
  subtree: true
};
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
        cascade: "pfe-tabs"
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
        cascade: "pfe-tabs"
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
        cascade: "pfe-tabs"
      },
      // @TODO: Deprecate in 1.0
      oldAlign: {
        type: String,
        alias: "align",
        attr: "pfe-align"
      },
      // @TODO: Does this need an observer?
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
      },
      disclosure: {
        // leaving this as a string since it's an opt out
        title: "Disclosure",
        type: String,
        values: ["true", "false"],
        cascade: "pfe-accordion"
      },
      // @TODO: Deprecate pfe-disclosure in 1.0.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure",
        cascade: "pfe-accordion"
      },
      // @TODO: Deprecate for 1.0?
      pfeId: {
        type: String,
        attr: "pfe-id"
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
    return `${this.id || this.pfeId || this.randomId}`;
  }

  constructor() {
    super(PfeContentSet);

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    // if (this.hasLightDOM()) this._init();

    // this.render();

    this._observer.observe(this, CONTENT_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // this._build();
    // TODO: When shadow root is updated, what fires the rerendering?

    if (window.ShadyCSS)
      setTimeout(() => {
        this._observer.observe(this, CONTENT_MUTATION_CONFIG);
      }, 0);
  }

  _build() {
    const host = document.createElement(this.isTab ? PfeTabs.tag : PfeAccordion.tag);

    // If no id is present, give it a randomly generated one
    if (!host.id) host.id = this.contentSetId;

    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    const template = document.createElement("template");

    // // Set up the template for the sets of content
    template.innerHTML = this.isTab ? PfeTabs.template : PfeAccordion.template;

    // Capture all the panels preceeded by headers
    [...this.querySelectorAll(`[pfe-content-set--header] + [pfe-content-set--panel]`)].forEach(panel => {
      const set = template.content.cloneNode(true);
      const header = panel.previousElementSibling;

      // Capture the line-item from the template set
      let piece = set.querySelector(`[content-type="header"]`);
      // Append a clone of the header to the template item
      piece.appendChild(header.cloneNode(true));
      // TODO: Flag light DOM as upgraded?
      // header.setAttribute("upgraded", "");
      // Attach the template item to the fragment
      fragment.appendChild(piece);

      // Capture the line-item from the template set
      piece = set.querySelector(`[content-type="panel"]`);
      // Append a clone of the header to the template item
      piece.appendChild(panel.cloneNode(true));
      // TODO: Flag light DOM as upgraded?
      // panel.setAttribute("upgraded", "");
      // Attach the template item to the fragment
      fragment.appendChild(piece);
    });

    host.appendChild(fragment);
    return host.outerHTML;
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
