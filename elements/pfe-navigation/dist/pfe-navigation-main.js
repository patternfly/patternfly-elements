/*!
 * PatternFly Elements: PfeNavigation 1.0.0-prerelease.27
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

import PFElement from "../../pfelement/dist/pfelement.js";

class PfeNavigationMain extends PFElement {
  static get version() {
    return "1.0.0-prerelease.27";
  }

  get html() {
    return `<style>:host{height:100%}::slotted(*){margin:0;padding:0;height:100%;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap}:host([show_content]) ::slotted(*){-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}::slotted(ul){list-style-type:none}:host([show_content]) ::slotted(ul){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap}
/*# sourceMappingURL=pfe-navigation-main.min.css.map */
</style><slot></slot>`;
  }
    static get tag() {
      return "pfe-navigation-main";
    }
  
    get templateUrl() {
      return "pfe-navigation-main.html";
    }
  
    get styleUrl() {
      return "pfe-navigation-main.scss";
    }
  
    static get PfeType() {
      return PFElement.PfeTypes.Container;
    }
  
    static get observedAttributes() {
      return ["show_content"];
    }
  
    constructor() {
      super(PfeNavigationMain);
  
      this._init = this._init.bind(this);
    }
  
    connectedCallback() {
      super.connectedCallback();
  
      this._init();
  
      // Add a slotchange listener to the lightDOM trigger
      this.addEventListener("slotchange", this._init);
    }
  
    disconnectedCallback() {
      this.removeEventListener("slotchange", this._init);
    }
  
    _init() {
      // Get all the nested navigation items
      this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

      // Find the first nested element
      this.first = this.navItems.length > 0 ? this.navItems[0] : null;
      // Find the last nested element
      this.last = this.navItems[this.navItems.length - 1];
  
      // Ensure the necessary a11y is set
      this.setAttribute("role", "navigation");
      this.setAttribute("aria-label", "Main");
  
      // For each nested navigation item, tag it with context
      this.navItems.forEach(item => {
        item.nested = true;
      });
  
      // Tag the first and last navigation items for styling in mobile
      if (this.first) this.first.setAttribute("first", "");
      if (this.last) this.last.setAttribute("last", "");
    }
  }

  export default PfeNavigationMain;