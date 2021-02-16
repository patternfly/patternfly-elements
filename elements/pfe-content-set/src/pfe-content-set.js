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

  static get properties() {
    // @TODO: Move this logic to pfelement

    // This removes observers that live in the dependent components
    // and cascades the property to the relevant component if it's not
    // an aliased property (just cascade the source of truth instead of both)
    const inheritProperties = (obj, tagName) => {
      let newObj = Object.assign({}, obj);
      for (const [key, value] of Object.entries(newObj)) {
        // Delete the observer from the property
        if (value.observer) delete newObj[key].observer;
        if (value.cascade) delete newObj[key].cascade;

        // If alias exists, don't add cascade
        if (!value.alias) newObj[key].cascade = tagName;
      }
      return newObj;
    };

    // Set up the inheritance for tabs and accordion
    let tabProps = inheritProperties(PfeTabs.properties, PfeTabs.tag);
    let accordionProps = inheritProperties(PfeAccordion.properties, PfeAccordion.tag);

    // Merge these two sets of properties
    const dependentProps = Object.assign(tabProps, accordionProps);

    // Assign these values to the combo along with it's own properties
    return Object.assign(dependentProps, {
      breakpoint: {
        title: "Custom breakpoint",
        type: String,
        observer: "_updateBreakpoint"
      },
      // @TODO: Deprecated in 1.0
      align: {
        type: String,
        enum: ["center"],
        alias: "tabAlign"
      },
      oldAlign: {
        attr: "pfe-align",
        alias: "tabAlign"
      },
      // @TODO: Deprecated in 1.0
      oldBreakpoint: {
        type: String,
        alias: "breakpoint",
        attr: "pfe-breakpoint"
      },
      // @TODO: Deprecated in 1.0
      pfeId: {
        type: String,
        attr: "pfe-id",
        observer: "_copyToId"
      }
    });
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

  get tabs() {
    // @TODO: Move to the :scope selector after we drop IE11
    // return this.querySelector(`:scope > pfe-tabs[visible-at="large"]`);
    let capture = [...this.childNodes].filter(
      child =>
        child.nodeName !== "#text" &&
        child.tagName.toLowerCase() === "pfe-tabs" &&
        child.getAttribute("visible-at") === "large"
    );
    if (capture.length > 0) return capture[0];
    else return null;
  }

  get accordion() {
    // @TODO: Move to the :scope selector after we drop IE11
    // return this.querySelector(`:scope > pfe-accordion[visible-at="small"]`);
    let capture = [...this.childNodes].filter(
      child =>
        child.nodeName !== "#text" &&
        child.tagName.toLowerCase() === "pfe-accordion" &&
        child.getAttribute("visible-at") === "small"
    );
    if (capture.length > 0) return capture[0];
    else return null;
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

    if (this.hasLightDOM()) {
      // If the tab does not exist in the light DOM, add it
      if (!this.tabs) {
        let newEl = document.createElement("pfe-tabs");
        newEl.setAttribute("visible-at", "large");
        newEl.setAttribute("hidden", "");
        this.appendChild(newEl);
      }

      // If the accordion does not exist in the light DOM, add it
      if (!this.accordion) {
        let newEl = document.createElement("pfe-accordion");
        newEl.setAttribute("visible-at", "small");
        newEl.setAttribute("hidden", "");
        this.appendChild(newEl);
      }

      Promise.all([customElements.whenDefined(PfeTabs.tag), customElements.whenDefined(PfeAccordion.tag)]).then(() => {
        this._build();
      });
    }

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

  _toggleVisible() {
    if (this.isTab) {
      if (this.tabs) this.tabs.removeAttribute("hidden");
      if (this.accordion) this.accordion.setAttribute("hidden", "");
    } else {
      if (this.accordion) this.accordion.removeAttribute("hidden");
      if (this.tabs) this.tabs.setAttribute("hidden", "");
    }
  }

  _removeNodes(list) {
    list.forEach(item => this._removeNode(item));

    // Check if the container is empty
    [this.tabs, this.accordion].forEach(host => {
      if (!host.hasChildNodes()) host.setAttribute("hidden", "");
    });
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

  _removeNode(node) {
    [this.tabs, this.accordion].forEach(host => {
      const connection = _findConnection(node, host);
      if (connection) host.removeChild(connection);
      // Fire a full rebuild if it can't determine the mapped element
      else this._build();
    });
  }

  _updateNode(node, textContent) {
    [this.tabs, this.accordion].forEach(host => {
      const connection = _findConnection(node, host);
      if (connection) connection.textContent = textContent;
      // Fire a full rebuild if it can't determine the mapped element
      else this._build();
    });
  }

  _buildSets(sets, template) {
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

          const id = region.id || region.getAttribute("pfe-id") || this.randomId;
          const clone = region.cloneNode(true);

          // Remove the flag from the clone
          clone.removeAttribute(`${this.tag}--${section}`);
          clone.removeAttribute("hidden");

          // Append a clone of the region to the template item
          piece.appendChild(clone);

          // Flag light DOM as upgraded
          region.setAttribute("maps-to", id);
          piece.id = id;

          // Attach the template item to the fragment
          fragment.appendChild(piece);
        });
      }

      // Hide the light DOM header and panel
      header.setAttribute("hidden", "");
      panel.setAttribute("hidden", "");
    }

    return fragment;
  }

  _build(addedNodes) {
    // Check if the appropriate tag exists already
    [this.tabs, this.accordion].forEach(host => {
      const template = host.tag === "pfe-tabs" ? PfeTabs.contentTemplate : PfeAccordion.contentTemplate;
      // If no id is present, give it the id from the wrapper
      if (!host.id) host.id = this.id || this.pfeId || this.randomId;

      const rawSets = addedNodes ? addedNodes : this.children ? this.children : null;

      // Clear out the content of the host if we're using the full child list
      if (!addedNodes && rawSets) host.innerHTML = "";

      // If sets is not null, build them using the template
      if (rawSets) {
        let sets = this._buildSets(rawSets, template);
        if (sets) host.appendChild(sets);
      }

      this._toggleVisible();
    });

    // Wait until the tags upgrade before setting the selectedIndex value
    Promise.all([customElements.whenDefined(PfeTabs.tag), customElements.whenDefined(PfeAccordion.tag)]).then(() => {
      // pass the selectedIndex property down from pfe-content-set
      // to pfe-tabs if there is a selectedIndex value that's not 0
      if (this.isTab) {
        // Pass the selectedIndex down to the tabset
        if (this.selectedIndex) {
          this.tabs.selectedIndex = this.selectedIndex;
        }
      }
    });
  }

  _copyToId() {
    // Don't overwrite an existing ID but backwards support pfe-id
    if (!this.id) this.id = this.pfeId;
  }

  _resizeHandler() {
    this._toggleVisible();
  }

  _updateBreakpoint(oldVal, newVal) {
    // If the correct rendering element isn't in use yet, build it from scratch
    this._toggleVisible();
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
