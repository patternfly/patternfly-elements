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
      },
      upgraded: {
        title: "Component upgraded",
        type: Boolean,
        prefix: false
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

  get existingStructure() {
    let tag = this.isTab ? PfeTabs.tag : PfeAccordion.tag;
    return this.shadowRoot.querySelector(`${tag}#${this.contentSetId}`);
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Combo;
  }

  static get events() {
    return {
      upgrade: `${this.tag}:upgrade`,
      slotchange: `slotchange`
    };
  }

  constructor() {
    super(PfeContentSet, { type: PfeContentSet.PfeTypes.Combo });

    this._init = this._init.bind(this);
    this._build = this._build.bind(this);

    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener(PfeContentSet.events.slotchange, this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length) {
      this._init();
    }
  }

  disconnectedCallback() {
    this._slot.removeEventListener(PfeContentSet.events.slotchange, this._init);
  }

  _init() {
    let existing = this.existingStructure;
    let renderClass = PfeAccordion;
    this.upgraded = false;

    if (this.isTab) {
      renderClass = PfeTabs;
    }

    // Create the tabs wrapper component or use the existing component
    if (existing) {
      this._build(existing, renderClass.template);
    } else {
      let element = document.createElement(renderClass.tag);
      element.id = this.contentSetId;

      this._build(element, renderClass.template);

      // If it doesn't exist yet, attach it to the shadow DOM
      this.shadowRoot.appendChild(element);
    }

    this.upgraded = true;
  }

  // Tag is a string, template is a function
  _build(component, template) {
    // Placeholder element to interpolate template
    let placeholder = document.createElement("div");
    placeholder.innerHTML = template.trim();

    const header = placeholder.firstChild;
    const panel = placeholder.lastChild;

    // Look for children that don't have an upgraded flag on them
    [...this.children]
      .filter(child => !child.hasAttribute("upgraded"))
      .forEach(child => {
        let item;
        let clone;
        // If one of them has the attribute indicating they belong in the a region
        if (child.hasAttribute(`${this.tag}--header`)) {
          item = header.cloneNode(true);
          // If an ID already exists on this element, add it to the shadow item
          if (child.id) item.id = child.id;
          clone = child.cloneNode(true);
          clone.removeAttribute(`${this.tag}--header`);
        } else if (child.hasAttribute(`${this.tag}--panel`)) {
          item = panel.cloneNode(true);
          // If an ID already exists on this element, add it to the shadow item
          if (child.id) item.id = child.id;
          clone = child.cloneNode(true);
          clone.removeAttribute(`${this.tag}--panel`);
        }

        item.appendChild(clone);
        component.appendChild(item);

        // Flag the light dom as having been upgraded
        child.setAttribute("upgraded", "");
      });
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
