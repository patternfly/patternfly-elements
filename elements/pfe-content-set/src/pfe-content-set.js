// Import polyfills: matches, closest, includes, assign
import "./polyfills--pfe-content-set.js";

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
   * Getter: Capture all components in the _view slot
   * @returns {NodeList} All components in the _view slot
   */
  get viewAll() {
    return this.querySelectorAll(`[slot="_view"]`);
  }

  /**
   * Getter: Capture the rendering component from the _view slot
   * @returns {NodeItem} The rendering component from the _view slot
   */
  get view() {
    let views = [...this.viewAll].filter(view => [PfeTabs.tag, PfeAccordion.tag].includes(view.tag));
    if (views.length <= 0) return null;
    return views[0];
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
    PFElement._debugLog = true;
    super(PfeContentSet, { type: PfeContentSet.PfeType, delayRender: true });

    this.isIE11 = /MSIE|Trident|Edge\//.test(window.navigator.userAgent);

    this.build = this.build.bind(this);

    this._mutationHandler = this._mutationHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);

    this._cleanSet = this._cleanSet.bind(this);
    this._build = this._build.bind(this);
    this._buildWrapper = this._buildWrapper.bind(this);
    this._buildSets = this._buildSets.bind(this);

    this._observer = new MutationObserver(this._mutationHandler);
    if (window.ResizeObserver) this._resizeObserver = new ResizeObserver(this._resizeHandler);
    if (this.isIE11) this.render();
  }

  connectedCallback() {
    super.connectedCallback();

    // If the element has an ID, postfix container
    if (this.id) this.id = `${this.id.replace(/-container$/, "")}-container`;

    // Validate that the light DOM data exists before building
    if (this.hasValidLightDOM) {
      this._build();
      if (!this.isIE11) this.render();

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
        switch (mutation.type) {
          case "childList":
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
            break;
          case "characterData":
            if (mutation.target && mutation.target.parentNode)
              this._updateNode(mutation.target.parentNode, mutation.target.textContent);
            break;
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
    return !!(el.hasAttribute(`${this.tag}--header`) || el.tagName.match(/H[1-6]/));
  }

  /**
   * Checks if the element provided is a panel region
   * @returns {boolean} True if the element provided is a panel region
   */
  _isPanel(el) {
    return !!el.hasAttribute(`${this.tag}--panel`);
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
    if (node.nodeName !== "#text" && node.hasAttribute("maps-to")) {
      const id = node.getAttribute("maps-to");
      if (!id) return connection;

      connection = this.view.querySelector(`#${id}`);
      if (!connection) this.warn(`no element could be found with #${id}`);
    }

    // Return the connection
    return connection;
  }

  /**
   * Reflect the removal of a node from light DOM into the rendered view
   */
  _removeNode(node) {
    if (!this.view) return;

    const connection = _findConnection(node);
    if (connection) this.view.removeChild(connection);
    // Fire a full rebuild if it can't determine the mapped element
    else this._build();
  }

  _updateNode(node, textContent) {
    if (!this.view) return;

    const connection = _findConnection(node);
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

    // If no id is present, give it the id from the wrapper
    if (!view.id) view.id = this.id || this.pfeId || this.randomId;

    let rawSets = null;
    if (addedNodes) rawSets = addedNodes;
    if (!rawSets && [...this.children].length) rawSets = this.children;

    // Clear out the content of the host if we're using the full child list
    if (!addedNodes && rawSets) view.innerHTML = "";

    // If sets is not null, build them using the template
    if (rawSets) {
      let sets = this._buildSets(rawSets, template);
      if (sets) view.appendChild(sets);
    }

    // Render or re-cascade properties to the component after update
    if (!this._rendered) this.render();
    else this.cascadeProperties(view);

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
    if (this.view && this.view.tag === this.expectedTag) return this.view;

    // If the upgraded component matches the tag name of the expected rendering component, return now;
    if (this.view) {
      // One option was to just remove the existing element: existingEl.remove();
      // But it seems safer to clear out the entire slot to make sure nothing snuck in unexpectedly
      this.viewAll.forEach(item => item.remove());
    }

    // If there was no rendering component or it was the wrong one (and thus removed), create one!
    let newEl = document.createElement(this.expectedTag);
    newEl.setAttribute("slot", "_view");
    if (this.id) newEl.id = this.id.replace(/-container$/, "");
    this.appendChild(newEl);

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

          // Remove the section from the ID name in case it was already upgraded
          let regionId = region.id;
          if (region.hasAttribute("upgraded") && regionId) {
            regionId = regionId.replace(new RegExp(`--${section}$`), "");
          }
          // Capture the ID from the region, the pfe-id, a previous "maps-to" attr, or generate a random one
          const id = regionId || region.getAttribute("pfe-id") || region.getAttribute("maps-to") || this.randomId;

          // Update the region ID with a postfix to prevent duplication
          if (region.id) region.id = `${regionId}--${section}`;
          // Flag that this element was upgraded
          region.setAttribute("upgraded", "");

          const clone = region.cloneNode(true);

          // Remove the flag from the clone
          clone.removeAttribute(`${this.tag}--${section}`);

          // Append a clone of the region to the template item
          piece.appendChild(clone);

          // Flag light DOM as upgraded
          region.setAttribute("maps-to", id);

          piece.id = id;

          // Attach the template item to the fragment
          fragment.appendChild(piece);
        });
      }
    }

    return fragment;
  }

  _cleanSet(set) {
    return [...set].filter(item => item !== this.view);
  }

  _copyToId() {
    // Don't overwrite an existing ID but backwards support pfe-id
    if (!this.id) this.id = this.pfeId;
  }

  _alignmentHandler(oldVal, newVal) {
    if (oldVal !== newVal) this.tabAlign = newVal;
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
