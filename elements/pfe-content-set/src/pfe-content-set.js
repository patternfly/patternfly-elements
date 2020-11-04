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
      // @TODO: Deprecate in 1.0
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
      // @TODO: Deprecate in 1.0
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
    var breakpointValue;
    if (this.breakpoint) {
      breakpointValue = parseInt(this.breakpoint.replace(/\D/g, ""));
    } else {
      breakpointValue = 700;
    }
    return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
  }

  get displayElement() {
    // Check if the appropriate tag exists already
    return this.shadowRoot.querySelector(this.displayTag);
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

    this._init = this._init.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);

    this._observer = new MutationObserver(this._init);
    if (window.ResizeObserver) this._resizeObserver = new ResizeObserver(this._resizeHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._build();

    this._observer.observe(this, CONTENT_MUTATION_CONFIG);

    if (window.ResizeObserver && this.parentElement) this._resizeObserver.observe(this.parentElement);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    if (window.ResizeObserver) this._resizeObserver.disconnect();
  }

  _init(mutationsList) {
    if (window.ShadyCSS) this._observer.disconnect();

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

    if (window.ShadyCSS)
      setTimeout(() => {
        this._observer.observe(this, CONTENT_MUTATION_CONFIG);
      }, 0);
  }

  _isHeader(el) {
    return el.hasAttribute(`${this.tag}--header`);
  }

  _isPanel(el) {
    return el.hasAttribute(`${this.tag}--panel`);
  }

  _createNewDisplay() {
    // Remove the other rendering approach from the shadow DOM
    // This is removed instead of hidden so we don't have to maintain both sets
    const altRender = this.shadowRoot.querySelector(this.isTab ? PfeAccordion.tag : PfeTabs.tag);
    if (altRender) this.shadowRoot.removeChild(altRender);

    return document.createElement(this.displayTag);
  }

  _removeNodes(list) {
    let host = this.displayElement;
    if (!host) this.warn(`no host element was found for rendering this set.`);
    else {
      list.forEach(item => this._removeNode(item, host));

      // Check if the container is empty
      if (!host.hasChildNodes()) {
        this.shadowRoot.removeChild(host);
      }
    }
  }

  _removeNode(node, host) {
    const id = node.getAttribute("maps-to");
    if (id) {
      const connection = host.querySelector(`#${id}`);
      if (connection) host.removeChild(connection);
    } else {
      this.warn(`no element could be found with #${id}`);
    }
  }

  _updateNode(node, textContent) {
    let host = this.displayElement;
    if (!host) this.warn(`no host element was found for rendering this set.`);

    const id = node.getAttribute("maps-to");
    if (id) {
      const connection = host.querySelector(`#${id}`);
      if (connection) connection.textContent = textContent;
    } else {
      this.warn(`no element could be found with #${id}`);
    }
  }

  _buildSets(sets) {
    const fragment = document.createDocumentFragment();

    if (sets && sets.length % 2 === 0) {
      for (let i = 0; i < sets.length; i += 2) {
        const template = this.displayTemplate.content.cloneNode(true);
        const header = sets[i];
        const panel = sets[i + 1];

        if (this._isHeader(header) && this._isPanel(panel)) {
          // Capture the line-item from the template
          [header, panel].forEach((region, idx) => {
            const type = idx === 0 ? "header" : "panel";
            let piece = template.querySelector(`[content-type="${type}"]`);
            const id = region.id || region.getAttribute("pfe-id") || this.randomId;
            const clone = region.cloneNode(true);
            // Append a clone of the region to the template item
            piece.appendChild(clone);
            // Flag light DOM as upgraded
            region.setAttribute("maps-to", id);
            piece.id = id;
            // Attach the template item to the fragment
            fragment.appendChild(piece);
          });
        } else {
          if (!this._isHeader(sets[i]))
            this.warn(`${header.tagName.toLowerCase()}#${header.id} is not a header element.`);
          if (!this._isPanel(sets[i + 1]))
            this.warn(`${panel.tagName.toLowerCase()}#${panel.id} is not a panel element.`);
        }
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

    let fragment;
    if (addedNodes) fragment = this._buildSets(addedNodes);
    else if (this.children) {
      // Clear out the host and start fresh
      host.innerHTML = "";
      fragment = this._buildSets(this.children);
    }

    if (fragment) host.appendChild(fragment);
    if (!existed) {
      this.shadowRoot.appendChild(host);
      this.cascadeProperties();
    }
  }

  _copyToId() {
    // Don't overwrite an existing ID but backwards support pfe-id
    if (!this.id) this.id = this.pfeId;
  }

  _resizeHandler() {
    // If the element doesn't exist, build it
    if (!this.displayElement) this._build();
  }

  _updateBreakpoint(oldVal, newVal) {
    // If the element doesn't exist, build it
    if (!this.displayElement) this._build();
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
