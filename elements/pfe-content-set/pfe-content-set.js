import PFElement from '../pfelement/pfelement.js';
import '../pfe-accordion/pfe-accordion.js';
import '../pfe-tabs/pfe-tabs.js';

/*!
 * PatternFly Elements: PfeContentSet 1.0.0-prerelease.20
 * @license
 * Copyright 2019 Red Hat, Inc.
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

class PfeContentSet extends PFElement {
  static get version() {
    return "1.0.0-prerelease.20";
  }

  get html() {
    return `<style>:host{display:block}:host([hidden]){display:none}</style><slot></slot>`;
  }

  static get properties() {
    return {"vertical":{"title":"Vertical orientation","type":"boolean","default":false,"prefixed":false},"variant":{"title":"Variant","type":"string","enum":["wind","earth"],"default":"wind","prefixed":true},"on":{"title":"Context","type":"string","enum":["light","dark"],"default":"light","prefixed":false}};
  }

  static get slots() {
    return {"default":{"title":"Default","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
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

  get schemaUrl() {
    return "pfe-content-set.json";
  }

  static get pfeType() {
    return PFElement.pfeType.combo;
  }

  get isTab() {
    return this.parentNode
      ? this.parentNode.offsetWidth > 768
      : window.outerWidth > 768;
  }

  constructor() {
    super(PfeContentSet, { delayRender: true });
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.isTab) {
      this._buildTabs();
    } else {
      this._buildAccordion();
    }

    this.render();
  }

  _buildAccordion() {
    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    // Create the accordion wrapper component
    const accordion = document.createElement("pfe-accordion");

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute("pfe-content-set--header")) {
        // Create a header component
        const header = document.createElement("pfe-accordion-header");
        // Append the light DOM element to that component
        header.appendChild(child);
        // Append the component to the accordion parent
        accordion.appendChild(header);
      }
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute("pfe-content-set--panel")) {
        // Create a panel component
        const panel = document.createElement("pfe-accordion-panel");
        // Append the light DOM element to that component
        panel.appendChild(child);
        // Append the component to the accordion parent
        accordion.appendChild(panel);
      }
    });

    // Append the accordion to the document fragment
    fragment.appendChild(accordion);

    // Pass the theme property down to the accordion component
    if (this.on) {
      accordion.setAttribute("on", this.on);
    }

    // Append the fragment to the component
    this.appendChild(fragment);
  }

  _buildTabs() {
    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    // Create the tabs wrapper component
    const tabs = document.createElement("pfe-tabs");

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute("pfe-content-set--header")) {
        // Create a tab component
        const header = document.createElement("pfe-tab");
        // Set the attribute indicating its slot
        header.setAttribute("slot", "tab");
        // Append the light DOM element to that component
        header.appendChild(child);
        // Append the component to the tabs parent
        tabs.appendChild(header);
      }
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute("pfe-content-set--panel")) {
        // Create the panel component
        const panel = document.createElement("pfe-tab-panel");
        // Set the attribute indicating its slot
        panel.setAttribute("slot", "panel");
        // Append the light DOM element to that component
        panel.appendChild(child);
        // Append the component to the tabs parent
        tabs.appendChild(panel);
      }
    });

    // Append the tabs to the document fragment
    fragment.appendChild(tabs);

    // If the orientation is set to vertical, add that attribute to the tabs
    if (this.vertical.value !== null && this.vertical.value !== false) {
      tabs.setAttribute("vertical", true);
    }

    // Pass the variant attribute down to the tabs component
    if (this.variant.value !== this.variant.default) {
      tabs.setAttribute("pfe-variant", this.variant.value);
    }

    // Pass the theme property down to the accordion component
    if (this.on.value) {
      tabs.setAttribute("on", this.on.value);
    }

    // Append the fragment to the component
    this.appendChild(fragment);
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
//# sourceMappingURL=pfe-content-set.js.map
