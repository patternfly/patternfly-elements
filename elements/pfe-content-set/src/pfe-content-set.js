// Import polyfills: matches, closest, includes, assign
import "./polyfills--pfe-content-set.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";
import PfeTabs from "../../pfe-tabs/dist/pfe-tabs.js";

const CONTENT_MUTATION_CONFIG = {
  characterData: false,
  childList: true,
  subtree: false
};
class PfeContentSet extends PFElement {
  static get tag() {
    return "pfe-content-set";
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

  /**
   * Property definitions for Content set combine the options available for Tabs & Accordion
   */
  static get properties() {
    return {
      //-- PFE-TABS specific properties
      vertical: {
        title: "Vertical orientation",
        type: Boolean,
        default: false,
        cascade: "pfe-tabs"
      },
      selectedIndex: {
        title: "Index of the selected tab",
        type: Number,
        cascade: "pfe-tabs"
      },
      tabAlign: {
        title: "Tab alignment",
        type: String,
        enum: ["center"],
        cascade: "pfe-tabs"
      },
      variant: {
        title: "Variant",
        type: String,
        enum: ["wind", "earth"],
        default: "wind",
        cascade: "pfe-tabs"
      },
      // @TODO: Deprecated for 1.0
      oldVariant: {
        type: String,
        attr: "pfe-variant",
        alias: "variant"
      },
      // @TODO: Deprecated for 1.0
      oldTabHistory: {
        type: Boolean,
        alias: "tabHistory",
        attr: "pfe-tab-history"
      },
      tabHistory: {
        title: "Tab History",
        type: Boolean,
        default: false,
        cascade: "pfe-tabs"
      },
      //-- PFE-ACCORDION specific properties
      disclosure: {
        // Leaving this as a string since it's an opt out
        title: "Disclosure",
        type: String,
        values: ["true", "false"],
        cascade: "pfe-accordion"
      },
      // @TODO: Deprecated pfe-disclosure in 1.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure"
      },
      //-- PFE-CONTENT-SET specific properties
      breakpoint: {
        title: "Custom breakpoint",
        type: String,
        default: "700",
        observer: "_updateBreakpoint"
      },
      // @TODO: Deprecated in 1.0
      oldBreakpoint: {
        type: String,
        alias: "breakpoint",
        attr: "pfe-breakpoint"
      },
      align: {
        type: String,
        enum: ["center"],
        observer: "_alignmentHandler"
      },
      // @TODO: Deprecated in 1.0
      oldAlign: {
        attr: "pfe-align",
        alias: "align"
      },
      // @TODO: Deprecated in 1.0
      pfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_copyToId"
      }
    };
  }

  /**
   * Schema definition for slotted content
   * Useful for CMS dynamic imports of components
   */
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

  get breakpointValue() {
    return parseInt(this.breakpoint.replace(/\D/g, ""));
  }

  /**
   * Getter: should this be rendered as a tabset based on the breakpoint size
   * @returns {boolean} Is this a tabset?
   */
  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > this.breakpointValue
      : window.outerWidth > this.breakpointValue;
  }

  /**
   * Getter: Alias now for this.view
   * @returns {NodeItem} The rendering component
   */
  get viewAll() {
    return this.view;
  }

  /**
   * Getter: Capture the rendering component from the shadow DOM
   * @returns {NodeItem} The rendering component from the shadow DOM
   */
  get view() {
    if (!this._rendered) return;

    return this.shadowRoot.querySelector(this.expectedTag);
  }

  /**
   * Getter: should this be rendered as a tabset based on the breakpoint size
   * @returns {boolean} Is this a tabset?
   */
  get expectedTag() {
    return this.isTab ? PfeTabs.tag : PfeAccordion.tag;
  }

  /**
   * Getter: Capture the tabs component from the _view slot (if it exists)
   * @returns {NodeItem} The tabs component from the _view slot
   */
  get tabs() {
    return this.querySelector(`pfe-tabs[slot="_view"]`);
  }

  /**
   * Getter: Capture the accordion component from the _view slot (if it exists)
   * @returns {NodeItem} The accordion component from the _view slot
   */
  get accordion() {
    return this.querySelector(`pfe-accordion[slot="_view"]`);
  }

  /**
   * Getter: Validates the incoming light DOM for some usable content
   * @returns {boolean} Returns true if some usable light DOM exists
   */
  get hasValidLightDOM() {
    // If any light DOM exists, validate it meets the requirements for rendering
    if (this.hasLightDOM()) {
      let valid = false;
      // Loop through the assigned nodes
      [...this.children].forEach(node => {
        // Validate that any non-text nodes have the right attributes present
        // They don't have to be in the right order, just that they exist at all lets us progress
        if (
          node.nodeName !== "#text" &&
          (this._isHeader(node) ||
            this._isPanel(node) ||
            (node.tagName && node.tagName.toLowerCase() === this.expectedTag))
        )
          valid = true;
      });
      return valid;
    } else return false;
  }

  constructor() {
    super(PfeContentSet, { type: PfeContentSet.PfeType });

    this.isIE11 = /MSIE|Trident|Edge\//.test(window.navigator.userAgent);

    this.build = this.build.bind(this);

    this._mutationHandler = this._mutationHandler.bind(this);
    this._alignmentHandler = this._alignmentHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._updateBreakpoint = this._updateBreakpoint.bind(this);

    this._cleanSet = this._cleanSet.bind(this);
    this._build = this._build.bind(this);
    this._buildWrapper = this._buildWrapper.bind(this);
    this._buildSets = this._buildSets.bind(this);

    this._isHeader = this._isHeader.bind(this);
    this._isPanel = this._isPanel.bind(this);
    this._removeNodes = this._removeNodes.bind(this);
    this._findConnection = this._findConnection.bind(this);
    this._removeNode = this._removeNode.bind(this);
    this._updateNode = this._updateNode.bind(this);
    this._copyToId = this._copyToId.bind(this);

    this._observer = new MutationObserver(this._mutationHandler);
    if (window.ResizeObserver) this._resizeObserver = new ResizeObserver(this._resizeHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // If the element has an ID, postfix container
    if (this.id) this.id = `${this.id.replace(/-container$/, "")}-container`;

    // Validate that the light DOM data exists before building
    if (this.hasValidLightDOM) {
      this._build();

      if (!this.isIE11 && window.ResizeObserver && this.parentElement) {
        this._resizeObserver.observe(this.parentElement);
      }
    } else if (!this.isIE11) this._observer.observe(this, CONTENT_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    if (window.ResizeObserver) this._resizeObserver.disconnect();
  }

  /**
   * Run the internal build task
   */
  build() {
    // Fire the build of the internals for the new component
    return this._build();
  }

  /**
   * Mutation handler
   * Read in and parse the mutation list, rebuilding as necessary
   */
  _mutationHandler(mutationsList) {
    if (!this.isIE11 && mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          if (mutation.addedNodes) {
            // Check the added nodes to make sure it's not assigned to the _view slot
            let nodes = this._cleanSet(mutation.addedNodes);
            if (nodes.length > 0) this._build(nodes);
          }
          if (mutation.removedNodes) {
            // Check the added nodes to make sure it's not assigned to the _view slot
            let nodes = this._cleanSet(mutation.removedNodes);
            if (nodes.length > 0) this._removeNodes(nodes);
          }
        }
      }

      return;
    }

    // If no mutation list is provided or it's IE11, rebuild the whole thing
    this._build();
  }

  /**
   * Checks if the element provided is a header region
   * @returns {boolean} True if the element provided is a header region
   */
  _isHeader(el) {
    // Ensure that we don't throw an error if we encounter a web component
    // yet to be defined.
    if (typeof el.hasAttribute !== "undefined") {
      return !!(el.hasAttribute(`${this.tag}--header`) || el.tagName.match(/H[1-6]/));
    }
    return false;
  }

  /**
   * Checks if the element provided is a panel region
   * @returns {boolean} True if the element provided is a panel region
   */
  _isPanel(el) {
    // Ensure that we don't throw an error if we encounter a web component
    // yet to be defined.
    if (typeof el.previousElementSibling !== "undefined") {
      return !!this._isHeader(el.previousElementSibling);
    }
    return false;
  }

  /**
   * Reflect the removal of nodes from light DOM into the rendered view
   */
  _removeNodes(list) {
    list.forEach(item => this._removeNode(item));

    // If a container doesn't exist, escape now
    if (!this.view) return;

    // Check if the container is empty, hide
    if (!this.view.hasChildNodes()) this.view.setAttribute("hidden", "");
    else this.view.removeAttribute("hidden");
  }

  /**
   * Find a connection between a node in light DOM that was added or removed
   * and the matching node in the rendered component; this makes upgrades more
   * efficient so we're not rebuilding everything every time.
   * @returns {Node} Returns the node in the rendered component that maps to the light DOM node provided
   */
  _findConnection(node) {
    let connection = null;

    if (!this.view) return connection;

    // If this node is mapped to one in the upgraded component
    if (node.nodeName !== "#text" && node.hasAttribute("slot")) {
      const id = node.getAttribute("slot");
      if (!id) return connection;

      connection = this.view.querySelector(`[name="${id}"]`);
      if (!connection) this.warn(`no slot could be found with [name="${id}"]`);
    }

    // Return the connection
    return connection;
  }

  /**
   * Reflect the removal of a node from light DOM into the rendered view
   */
  _removeNode(node) {
    if (!this.view) return;

    const connection = this._findConnection(node);
    if (connection) this.view.removeChild(connection);
    // Fire a full rebuild if it can't determine the mapped element
    else this._build();
  }

  _updateNode(node, textContent) {
    if (!this.view) return;

    const connection = this._findConnection(node);
    if (connection) connection.textContent = textContent;
    // Fire a full rebuild if it can't determine the mapped element
    else this._build();
  }

  _cleanSet(set) {
    return [...set].filter(item => item !== this.view);
  }

  /**
   * Manage the building of the rendering component
   * Optionally accepts the input of new nodes added to the DOM
   */
  _build(addedNodes) {
    // @TODO: Add back a promise here post-IE11
    let view = this.view;
    if (!view || view.tag !== this.expectedTag) {
      view = this._buildWrapper();
    }

    // Disconnect the observer while we parse it
    this._observer.disconnect();

    const template = view.tag === "pfe-tabs" ? PfeTabs.contentTemplate : PfeAccordion.contentTemplate;

    let rawSets = null;
    if (addedNodes) rawSets = addedNodes;
    if (!rawSets && [...this.children].length) rawSets = this.children;

    // Clear out the content of the host if we're using the full child list
    if (!addedNodes && rawSets) view.innerHTML = "";

    // If sets is not null, build them using the template
    if (rawSets) {
      let sets = this._buildSets(rawSets, template);
      if (sets) {
        view.appendChild(sets);
      }
    }

    this.shadowRoot.appendChild(view);

    // Wait until the tabs upgrade before setting the selectedIndex value
    Promise.all([customElements.whenDefined(PfeTabs.tag)]).then(() => {
      // pass the selectedIndex property down from pfe-content-set
      // to pfe-tabs if there is a selectedIndex value that's not 0
      // Pass the selectedIndex down to the tabset
      if (this.isTab && this.selectedIndex) {
        view.selectedIndex = this.selectedIndex;
      }

      // Attach the mutation observer
      if (!this.isIE11) this._observer.observe(this, CONTENT_MUTATION_CONFIG);

      return;
    });
  }

  /*
   * Note: be sure to disconnect the observer before running this
   */
  _buildWrapper() {
    // If the upgraded component matches the tag name of the expected rendering component, return now;
    if (this.view) return this.view;

    // Remove the existing element: existingEl.remove();
    const oldTag = this.expectedTag === "pfe-tabs" ? "pfe-accordion" : "pfe-tabs";
    const existingEl = this.shadowRoot.querySelector(oldTag);
    if (existingEl) existingEl.remove();

    // Now create the rendering element
    let newEl = document.createElement(this.expectedTag);
    newEl.id = this.id || this.pfeId || this.randomId;

    return newEl;
  }

  _buildSets(sets, template) {
    sets = this._cleanSet(sets);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < sets.length; i = i + 2) {
      let header = sets[i];
      let panel = sets[i + 1];

      // Set up the template for the sets of content
      const wrapper = document.createElement("template");
      wrapper.innerHTML = template.trim();
      const templateMarkup = wrapper.content.cloneNode(true);

      if (!header) this.warn(`no element found at position ${i} of the light DOM input.`);
      if (!panel) this.warn(`no element found at position ${i + 1} of the light DOM input.`);

      if (header && this._isHeader(header) && panel && this._isPanel(panel)) {
        // Capture the line-item from the template
        [header, panel].forEach((region, idx) => {
          const section = idx === 0 ? "header" : "panel";

          let piece = templateMarkup.querySelector(`[content-type="${section}"]`).cloneNode(true);

          // Flag that this element was upgraded
          region.setAttribute("upgraded", "");

          const slot = document.createElement("slot");
          slot.name = this.randomId.replace("pfe-", `${section}-`);

          // Append a clone of the region to the template item
          piece.appendChild(slot);

          // Flag light DOM as upgraded
          region.setAttribute("slot", slot.name);

          // Capture the ID from the region, the pfe-id, a previous "maps-to" attr, or generate a random one
          piece.id = region.id || region.getAttribute("pfe-id") || region.getAttribute("maps-to") || this.randomId;

          // Attach the template item to the fragment
          fragment.appendChild(piece);
        });
      }
    }

    return fragment;
  }

  _copyToId() {
    // Don't overwrite an existing ID but backwards support pfe-id
    if (!this.id) this.id = this.pfeId;
  }

  _alignmentHandler(oldVal, newVal) {
    if (oldVal !== newVal) {
      this.tabAlign = newVal;
    }
  }

  _resizeHandler() {
    if (!this.view || (this.view && this.view.tag !== this.expectedTag)) {
      this._build();
    }
  }

  _updateBreakpoint() {
    // If the correct rendering element isn't in use yet, build it from scratch
    if (!this.view || (this.view && this.view.tag !== this.expectedTag)) {
      this._build();
    }
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
