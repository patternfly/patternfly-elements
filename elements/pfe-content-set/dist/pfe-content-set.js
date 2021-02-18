import PFElement from '../../pfelement/dist/pfelement.js';
import PfeAccordion from '../../pfe-accordion/dist/pfe-accordion.js';
import PfeTabs from '../../pfe-tabs/dist/pfe-tabs.js';

// @POLYFILL  NodeList.prototype.forEach()
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function(callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

// @POLYFILL  Object.prototype.assign()
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill
if (typeof Object.assign !== "function") {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, "assign", {
    value: function assign(target, varArgs) {
      if (target === null || target === undefined) {
        throw new TypeError("Cannot convert undefined or null to object");
      }

      var to = Object(target);

      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];

        if (nextSource !== null && nextSource !== undefined) {
          for (var nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true
  });
}

/*!
 * PatternFly Elements: PfeContentSet 1.3.0
 * @license
 * Copyright 2021 Red Hat, Inc.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
*/

const CONTENT_MUTATION_CONFIG = {
  characterData: true,
  childList: true,
  subtree: true
};
class PfeContentSet extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.3.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:block}::slotted(:not(pfe-accordion,pfe-tabs)),::slotted([hidden]),:host([hidden]),[hidden]{display:none!important} /*# sourceMappingURL=pfe-content-set.min.css.map */</style>
<slot id="lightdom" hidden></slot>
<slot name="_view" private></slot>`;
  }

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

  /**
   * Getter: should this be rendered as a tabset based on the breakpoint size
   * @returns {boolean} Is this a tabset?
   */
  get isTab() {
    let breakpointValue = this.breakpoint ? parseInt(this.breakpoint.replace(/\D/g, "")) : 700;
    return this.parentNode ? this.parentNode.offsetWidth > breakpointValue : window.outerWidth > breakpointValue;
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
    let views = [...this.viewAll].filter(view => [PfeTabs.tag, PfeAccordion.tag].includes(view.tagName.toLowerCase()));
    if (views.length <= 0) return null;
    return views[0];
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
      let content = this.shadowRoot.querySelector(`slot#lightdom`);
      let valid = false;
      // Loop through the assigned nodes
      content.assignedNodes().forEach(node => {
        // Validate that any non-text nodes have the right attributes present
        // They don't have to be in the right order, just that they exist at all lets us progress
        if (node.nodeName !== "#text" && (this._isHeader(node) || this._isPanel(node))) valid = true;
      });
      return valid;
    } else return false;
  }

  constructor() {
    super(PfeContentSet);

    this.isIE11 = !!window.MSInputMethodContext && !!document.documentMode;

    this.build = this.build.bind(this);

    this._mutationHandler = this._mutationHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);

    this._cleanSet = this._cleanSet.bind(this);

    this._observer = new MutationObserver(this._mutationHandler);
    if (window.ResizeObserver) this._resizeObserver = new ResizeObserver(this._resizeHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // If the element has an ID, postfix container
    if (this.id) this.id = `${this.id}-container`;

    // Validate that the light DOM data exists before building
    if (this.hasValidLightDOM)
      this.build().then(
        () => {
          // If the browser supports the resizeObserver and the parentElement exists, set to observe
          if (window.ResizeObserver && this.parentElement) this._resizeObserver.observe(this.parentElement);
        },
        errorMsg => {
          this.error(`There was an issue building the component: ${errorMsg}`);
        }
      );

    // Attach the mutation observer
    this._observer.observe(this, CONTENT_MUTATION_CONFIG);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    if (window.ResizeObserver) this._resizeObserver.disconnect();
  }

  /**
   * Fetch the component if it exists in the right upgrade form
   * otherwise, remove the old element and build a new version
   * @returns {NodeItem} New or existing rendering component
   */
  build() {
    return new Promise((resolve, reject) => {
      // Get the name of the expected component
      let componentName = this.isTab ? PfeTabs.tag : PfeAccordion.tag;

      // If the upgraded component matches the tag name of the expected rendering component, return now;
      if (this.view) {
        if (this.view && this.view.tagName.toLowerCase() === componentName) return resolve(this.view);

        // One option was to just remove the existing element: existingEl.remove();
        // But it seems safer to clear out the entire slot to make sure nothing snuck in unexpectedly
        this.viewAll.forEach(item => item.remove());
      }

      // If there was no rendering component or it was the wrong one (and thus removed), create one!
      let newEl = document.createElement(componentName);
      newEl.setAttribute("slot", "_view");
      if (this.id) newEl.id = this.id.replace(/-container$/, "");
      this.appendChild(newEl);

      // Fire the build of the internals for the new component
      return this._build().then(() => resolve(newEl));
    });
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
              // Check the added nodes to make sure it's not assigned to the _upgradeComponent slot
              let nodes = [...mutation.addedNodes].filter(item => !item.hasAttribute("slot"));
              if (nodes.length > 0) this._build(nodes);
            }
            if (mutation.removedNodes) {
              // Check the added nodes to make sure it's not assigned to the _upgradeComponent slot
              let nodes = [...mutation.removedNodes].filter(item => !item.hasAttribute("slot"));
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

    // If no mutation list is provided, rebuild the whole thing
    this._build();
  }

  /**
   * Checks if the element provided is a header region
   * @returns {boolean} True if the element provided is a header region
   */
  _isHeader(el) {
    return el.hasAttribute(`${this.tag}--header`) || el.tagName.match(/H[1-6]/);
  }

  /**
   * Checks if the element provided is a panel region
   * @returns {boolean} True if the element provided is a panel region
   */
  _isPanel(el) {
    return el.hasAttribute(`${this.tag}--panel`);
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
    if (!this.view) this.build();

    const connection = _findConnection(node);
    if (connection) connection.textContent = textContent;
    // Fire a full rebuild if it can't determine the mapped element
    else this._build();
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
          // Capture the ID from the region, the pfe-id, or generate a random one
          const id = regionId || region.getAttribute("pfe-id") || this.randomId;

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

  _build(addedNodes) {
    return new Promise((resolve, reject) => {
      // Disconnect the observer while we parse it
      this._observer.disconnect();

      // Check if the appropriate tag exists already
      if (!this.view) {
        return reject(`No rendering container was found.`);
      }

      const template = this.view.tag === "pfe-tabs" ? PfeTabs.contentTemplate : PfeAccordion.contentTemplate;
      // If no id is present, give it the id from the wrapper
      if (!this.view.id) this.view.id = this.id || this.pfeId || this.randomId;

      const rawSets = addedNodes ? addedNodes : this.children ? this.children : null;

      // Clear out the content of the host if we're using the full child list
      if (!addedNodes && rawSets) this.view.innerHTML = "";

      // If sets is not null, build them using the template
      if (rawSets) {
        let sets = this._buildSets(rawSets, template);
        if (sets) this.view.appendChild(sets);
      }

      // Wait until the tabs upgrade before setting the selectedIndex value
      Promise.all([customElements.whenDefined(PfeTabs.tag)]).then(() => {
        // pass the selectedIndex property down from pfe-content-set
        // to pfe-tabs if there is a selectedIndex value that's not 0
        if (this.isTab) {
          // Pass the selectedIndex down to the tabset
          if (this.selectedIndex) {
            this.view.selectedIndex = this.selectedIndex;
          }
        }
      });

      // Attach the mutation observer
      this._observer.observe(this, CONTENT_MUTATION_CONFIG);

      return resolve();
    });
  }

  _copyToId() {
    // Don't overwrite an existing ID but backwards support pfe-id
    if (!this.id) this.id = this.pfeId;
  }

  _resizeHandler() {
    this.build();
  }

  _updateBreakpoint() {
    // If the correct rendering element isn't in use yet, build it from scratch
    this.build();
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
//# sourceMappingURL=pfe-content-set.js.map
