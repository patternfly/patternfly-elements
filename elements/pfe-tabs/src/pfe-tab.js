import PFElement from "../../pfelement/dist/pfelement.js";

const TAB_CONTENT_MUTATION_CONFIG = {
  characterData: true,
  childList: true,
  subtree: true
};
class PfeTab extends PFElement {
  static get tag() {
    return "pfe-tab";
  }

  get styleUrl() {
    return "pfe-tab.scss";
  }

  get templateUrl() {
    return "pfe-tab.html";
  }

  static get properties() {
    return {
      selected: {
        title: "Selected tab",
        type: String,
        default: "false",
        attr: "aria-selected",
        values: ["true", "false"],
        observer: "_selectedHandler"
      },
      controls: {
        title: "Connected panel ID",
        type: String,
        attr: "aria-controls"
      },
      role: {
        type: String,
        default: "tab"
      },
      tabindex: {
        type: Number,
        default: -1
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"]
      },
      // @TODO: Deprecated in 1.0
      oldPfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_oldPfeIdChanged"
      }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeTab, { type: PfeTab.PfeType });

    this._tabItem;
    this._init = this._init.bind(this);
    this._setTabContent = this._setTabContent.bind(this);
    this._getTabElement = this._getTabElement.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    this._tabItem = this.shadowRoot.querySelector(`#tab`);

    if (this.hasLightDOM()) this._init();

    this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _selectedHandler() {
    if (this.selected === "true") this.tabindex = 0;
    else this.tabindex = -1;
  }

  _oldPfeIdChanged(oldVal, newVal) {
    if (!this.id) this.id = newVal;
  }

  _init() {
    if (window.ShadyCSS) this._observer.disconnect();

    // Force role to be set to tab
    this.role = "tab";

    // Copy the tab content into the template
    this._setTabContent();

    // If an ID is not defined, generate a random one
    if (!this.id) this.id = this.randomId;

    if (window.ShadyCSS) this._observer.observe(this, TAB_CONTENT_MUTATION_CONFIG);
  }

  _getTabElement() {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No tab content provided`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      // If the first element is a slot, query for it's content
      if (this.firstElementChild.tagName === "SLOT") {
        const slotted = this.firstElementChild.assignedNodes();
        // If there is no content inside the slot, return empty with a warning
        if (slotted.length === 0) {
          this.warn(`No heading information exists within this slot.`);
          return;
        }
        // If there is more than 1 element in the slot, capture the first h-tag
        if (slotted.length > 1) this.warn(`Tab heading currently only supports 1 heading tag.`);
        const htags = slotted.filter(slot => slot.tagName.match(/^H[1-6]/) || slot.tagName === "P");
        if (htags.length > 0) return htags[0];
        else return;
      } else if (this.firstElementChild.tagName.match(/^H[1-6]/) || this.firstElementChild.tagName === "P") {
        return this.firstElementChild;
      } else {
        this.warn(`Tab heading should contain at least 1 heading tag for correct semantics.`);
      }
    }

    return;
  }

  _setTabContent() {
    let label = "";
    let isTag = false;
    let tabElement = this._getTabElement();
    if (tabElement) {
      // Copy the tab content into the template
      label = tabElement.textContent.trim().replace(/\s+/g, " ");
      isTag = true;
    }

    if (!tabElement) {
      // If no element is found, try for a text node
      if (this.textContent.trim().replace(/\s+/g, " ")) {
        label = this.textContent.trim().replace(/\s+/g, " ");
      }
    }

    if (!label) {
      this.warn(`There does not appear to be any content in the tab region.`);
      return;
    }

    let semantics = "h3";

    if (isTag) {
      semantics = tabElement.tagName.toLowerCase();
    }

    // Create an h-level tag for the shadow tab, default h3
    // or use the provided semantics from light DOM
    let heading = document.createElement(semantics);

    // Assign the label content to the new heading
    heading.textContent = label;

    // Attach the heading to the tabItem
    if (this._tabItem) {
      this._tabItem.innerHTML = "";
      this._tabItem.appendChild(heading);
    }
  }
}

export default PfeTab;
