// Import polyfills: matches, closest, includes
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

  static get properties() {
    return {
      vertical: {
        title: "Vertical orientation",
        type: Boolean,
        cascade: "pfe-tabs"
      },
      variant: {
        title: "Variant",
        type: String,
        values: ["wind", "earth"],
        cascade: "pfe-tabs"
      },
      // @TODO: Deprecated in 1.0
      oldVariant: {
        type: String,
        alias: "variant",
        attr: "pfe-variant"
      },
      tabAlign: {
        title: "Align",
        type: String,
        values: ["center"],
        cascade: "pfe-tabs"
      },
      align: {
        title: "Align",
        type: String,
        values: ["center"],
        alias: "tabAlign"
      },
      // @TODO: Deprecated in 1.0
      oldAlign: {
        type: String,
        alias: "align",
        attr: "pfe-align"
      },
      breakpoint: {
        title: "Custom breakpoint",
        type: String,
        observer: "_updateBreakpoint"
      },
      // @TODO: Deprecated in 1.0
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
      // @TODO: Deprecated in 1.0
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
      // @TODO: Deprecated pfe-disclosure in 1.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure",
        cascade: "pfe-accordion"
      },
      // @TODO: Deprecated in 1.0
      pfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_copyToId"
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
    let breakpointValue = this.breakpoint ? parseInt(this.breakpoint.replace(/\D/g, "")) : 700;
    return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
  }

  get displayElement() {
    // Check if the appropriate tag exists already
    return this.shadowRoot.querySelector(`${this.displayTag}`);
  }

  get contentSets() {
    return this.children;
  }

  get displayTag() {
    return this.isTab ? PfeTabs.tag : PfeAccordion.tag;
  }

  get displayTemplate() {
    const template = document.createElement("template");

    // // Set up the template for the sets of content
    template.innerHTML = this.isTab ? PfeTabs.template : PfeAccordion.template;

    return template;
  }

  get contentSetId() {
    return `${this.id || this.pfeId || this.randomId}`;
  }

  constructor() {
    super(PfeContentSet);

    this._mutationHandler = this._mutationHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);

    this._observer = new MutationObserver(this._mutationHandler);
    if (window.ResizeObserver) this._resizeObserver = new ResizeObserver(this._resizeHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._build();

    this._observer.observe(this, CONTENT_MUTATION_CONFIG);

    // If the browser supports the resizeObserver and the parentElement exists, set to observe
    if (window.ResizeObserver && this.parentElement) this._resizeObserver.observe(this.parentElement);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    if (window.ResizeObserver) this._resizeObserver.disconnect();
  }

  _mutationHandler(mutationsList) {
    if (window.ShadyCSS) {
      this._observer.disconnect();

      // Use the vanilla build tasks in IE11
      this._build();

      setTimeout(() => {
        this._observer.observe(this, CONTENT_MUTATION_CONFIG);
      }, 0);
      return;
    }

    if (mutationsList) {
      for (let mutation of mutationsList) {
        switch (mutation.type) {
          case "childList":
            if (mutation.addedNodes) this._build(mutation.addedNodes);
            if (mutation.removedNodes) this._removeNodes(mutation.removedNodes);
            break;
          case "characterData":
            if (mutation.target && mutation.target.parentNode)
              this._updateNode(mutation.target.parentNode, mutation.target.textContent);
            break;
        }
      }
    } else {
      // If no mutation list is provided, rebuild the whole thing
      this._build();
    }
  }

  _isHeader(el) {
    return el.hasAttribute(`${this.tag}--header`) || el.tagName.match(/H[1-6]/);
  }

  _isPanel(el) {
    return el.hasAttribute(`${this.tag}--panel`);
  }

  _createNewDisplay() {
    // Remove the other rendering approach from the shadow DOM
    // This is removed instead of hidden so we don't have to maintain both sets
    const altRender = this.shadowRoot.querySelector(`${this.isTab ? PfeAccordion.tag : PfeTabs.tag}`);
    if (altRender) this.shadowRoot.removeChild(altRender);

    return document.createElement(this.displayTag);
  }

  _removeNodes(list) {
    let host = this.displayElement;
    if (!host) this.warn(`no host element was found for rendering this set.`);
    else {
      list.forEach(item => {
        // If item is not a text node
        this._removeNode(item, host);
      });

      // Check if the container is empty
      if (!host.hasChildNodes()) this.shadowRoot.removeChild(host);
    }
  }

  _findConnection(node, host) {
    if (node.nodeName !== "#text") {
      // If this node is mapped to one in the shadow DOM
      if (node.hasAttribute("maps-to")) {
        const id = node.getAttribute("maps-to");
        if (id !== null) {
          const connection = host.querySelector(`#${id}`);
          if (connection) {
            return connection;
          } else {
            this.warn(`no element could be found with #${id}`);
          }
        }
      }
    }

    return null;
  }

  _removeNode(node, host) {
    const connection = _findConnection(node, host);
    if (connection) return host.removeChild(connection);

    // Fire a full rebuild if it can't determine the mapped element
    this._build();
  }

  _updateNode(node, textContent) {
    let host = this.displayElement;
    if (!host) {
      this.warn(`no host element was found for rendering this set.`);
    } else {
      const connection = _findConnection(node, host);
      if (connection) return (connection.textContent = textContent);
    }

    // Fire a full rebuild if it can't determine the mapped element
    this._build();
  }

  _buildSets(sets) {
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < sets.length; i = i + 2) {
      let header = sets[i];
      let panel = sets[i + 1];
      const template = this.displayTemplate.content.cloneNode(true);

      if (!header) this.warn(`no element found at position ${i} of the light DOM input.`);
      if (!panel) this.warn(`no element found at position ${i + 1} of the light DOM input.`);

      if (header && this._isHeader(header) && panel && this._isPanel(panel)) {
        // Capture the line-item from the template
        [header, panel].forEach((region, idx) => {
          const type = idx === 0 ? "header" : "panel";
          let piece = template.querySelector(`[content-type="${type}"]`);
          const id = region.id || region.getAttribute("pfe-id") || this.randomId;
          const clone = region.cloneNode(true);
          // Remove the flag from the clone
          clone.removeAttribute(`${this.tag}--${type}`);
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

  _build(addedNodes) {
    let existed = true;
    // Check if the appropriate tag exists already
    let host = this.displayElement;

    if (!host) {
      existed = false;
      host = this._createNewDisplay();
    }

    // If no id is present, give it one
    if (!host.id) host.id = this.contentSetId;

    let content;
    if (addedNodes) {
      content = this._buildSets(addedNodes);
    } else if (this.children) {
      // Clear out the host and start fresh
      host.innerHTML = "";
      content = this._buildSets(this.contentSets);
    } else {
      // Remove the host
      if (existed) this.shadowRoot.removeChild(host);
      return;
    }

    if (content) host.appendChild(content);

    if (!existed) this.shadowRoot.appendChild(host);

    // Trigger the cascade after the nested components are updated
    this.cascadeProperties();
  }

  _copyToId() {
    // Don't overwrite an existing ID but backwards support pfe-id
    if (!this.id) this.id = this.pfeId;
  }

  _resizeHandler() {
    // If the correct rendering element isn't in use yet, build it from scratch
    if (!this.displayElement) this._build();
  }

  _updateBreakpoint(oldVal, newVal) {
    // If the correct rendering element isn't in use yet, build it from scratch
    if (!this.displayElement) this._build();
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
