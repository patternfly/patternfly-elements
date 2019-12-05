import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-accordion/dist/pfe-accordion.js';
import '../../pfe-tabs/dist/pfe-tabs.js';

/*!
 * PatternFly Elements: PfeContentSet 1.0.0-prerelease.32
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
    return "1.0.0-prerelease.32";
  }

  get html() {
    return `<style>:host{display:block}:host([hidden]){display:none}
/*# sourceMappingURL=pfe-content-set.min.css.map */
</style><slot></slot>`;
  }

  static get properties() {
    return {"vertical":{"title":"Vertical orientation","type":"boolean","default":false,"prefixed":false},"variant":{"title":"Variant","type":"string","enum":["wind","earth"],"default":"wind","prefixed":true},"align":{"title":"Align","type":"string","enum":["center"],"prefixed":true},"on":{"title":"Context","type":"string","enum":["light","dark"],"default":"light","prefixed":false}};
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

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.children.length) {
      this._init();
    }

    this._observer.observe(this, { childList: true });
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (this.isTab) {
      this._buildTabs();
    } else {
      this._buildAccordion();
    }

    this.render();

    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, { childList: true });
      }, 0);
    }
  }

  _buildAccordion() {
    const existingAccordion = this.querySelector("pfe-accordion");
    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    // Use the existing accordion or create the accordion wrapper component
    const accordion = existingAccordion || document.createElement("pfe-accordion");

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the header region
      if (child.hasAttribute("pfe-content-set--header")) {
        const header = document.createElement("pfe-accordion-header");

        header.appendChild(child);
        accordion.appendChild(header);
      }

      if (child.hasAttribute("pfe-content-set--panel")) {
        const panel = document.createElement("pfe-accordion-panel");

        panel.appendChild(child);
        accordion.appendChild(panel);
      }
    });

    if (!existingAccordion) {
      fragment.appendChild(accordion);
    }

    // Pass the theme property down to the accordion component
    if (this.on) {
      accordion.setAttribute("on", this.on.value);
    }

    if (!existingAccordion) {
      this.appendChild(fragment);
    }
  }

  _buildTabs() {
    const existingTabs = this.querySelector("pfe-tabs");
    // Use a document fragment for efficiency
    const fragment = document.createDocumentFragment();
    // Use the existing tabs or create the tabs wrapper component
    const tabs = existingTabs || document.createElement("pfe-tabs");

    // Iterate over each element in the light DOM
    [...this.children].forEach(child => {
      // If one of them has the attribute indicating they belong in the panel region
      if (child.hasAttribute("pfe-content-set--header")) {
        const header = document.createElement("pfe-tab");

        header.setAttribute("slot", "tab");
        header.appendChild(child);

        tabs.appendChild(header);
      }

      if (child.hasAttribute("pfe-content-set--panel")) {
        const panel = document.createElement("pfe-tab-panel");

        panel.setAttribute("slot", "panel");
        panel.appendChild(child);

        tabs.appendChild(panel);
      }
    });

    if (!existingTabs) {
      fragment.appendChild(tabs);
    }

    // If the orientation is set to vertical, add that attribute to the tabs
    if (this.vertical.value !== null && this.vertical.value !== false) {
      tabs.setAttribute("vertical", true);
    }

    // Pass the variant attribute down to the tabs component
    if (this.variant.value !== this.variant.default) {
      tabs.setAttribute("pfe-variant", this.variant.value);
    }

    // Pass the theme property down to the tabs component
    if (this.on.value) {
      tabs.setAttribute("on", this.on.value);
    }

    if (this.align.value) {
      tabs.setAttribute("pfe-tab-align", this.align.value);
    }

    if (!existingTabs) {
      this.appendChild(fragment);
    }
  }
}

PFElement.create(PfeContentSet);

export default PfeContentSet;
//# sourceMappingURL=pfe-content-set.js.map
