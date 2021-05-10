import PFElement from '../../pfelement/dist/pfelement.js';

// @POLYFILL  Array.prototype.findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function(predicate) {
      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== "function") {
        throw new TypeError("predicate must be a function");
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}

/*!
 * PatternFly Elements: PfeAccordion 1.7.0
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

class PfeAccordionHeader extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.7.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{-webkit-transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946);transition:transform .3s cubic-bezier(.465,.183,.153,.946),-webkit-transform .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946)),-webkit-transform .3s var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));display:block}:host([hidden]){display:none}:host>*{margin:0}:host button{--pfe-accordion--BorderBottomWidth:0;--pfe-accordion--ZIndex:3;--pfe-accordion__trigger--Padding:var(--pfe-accordion__base--Padding, var(--pfe-theme--container-spacer, 1rem)) 50px var(--pfe-accordion__base--Padding, var(--pfe-theme--container-spacer, 1rem)) calc(var(--pfe-accordion__base--Padding, var(--pfe-theme--container-spacer, 1rem)) * 1.5);margin:0;width:100%;width:var(--pfe-accordion--Width,100%);max-width:100%;height:auto;position:relative;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));border-width:0;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-top-width:1px;border-top-width:var(--pfe-accordion--BorderTopWidth,var(--pfe-theme--surface--border-width,1px));border-right-width:0;border-right-width:var(--pfe-accordion--BorderRightWidth,0);border-bottom-width:1px;border-bottom-width:var(--pfe-accordion--BorderBottomWidth,var(--pfe-theme--surface--border-width,1px));border-left-width:4px;border-left-width:var(--pfe-accordion--BorderLeftWidth,var(--pfe-theme--surface--border-width--heavy,4px));border-left-color:transparent;border-left-color:var(--pfe-accordion--BorderColor--accent,transparent);-webkit-box-shadow:var(--pfe-accordion--BoxShadow);box-shadow:var(--pfe-accordion--BoxShadow);z-index:var(--pfe-accordion--ZIndex);cursor:pointer;font-family:inherit;font-size:calc(1rem * 1.1);font-size:var(--pfe-accordion--FontSize--header,calc(var(--pfe-theme--font-size,1rem) * 1.1));font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);text-align:left;text-align:var(--pfe-accordion--TextAlign,left);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:var(--pfe-accordion__trigger--Padding)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button{border-top-width:1px;border-right-width:0;border-bottom-width:1px;border-left-width:4px}}:host button:focus,:host button:hover{--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button:focus,:host button:hover{border-left-color:#06c}}:host button:hover{outline:0;border-left-width:4px;border-left-width:var(--pfe-theme--surface--border-width--heavy,4px)}:host button:focus{outline:0;text-decoration:underline}:host button::-moz-focus-inner{border:0}@supports (-ms-ime-align:auto){:host button{text-align:left}}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button{padding:16px 24px}:host button:hover{border-left-color:#06c}}:host button[aria-expanded=true]{--pfe-accordion--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-accordion--BackgroundColor:white;--pfe-accordion--Color:var(--pfe-theme--color--text, #151515);--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c));--pfe-accordion--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);--pfe-accordion--ZIndex:3}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host button[aria-expanded=true]{border-bottom-width:0;border-left-color:#06c;border-right-color:#d2d2d2}}:host(:not([disclosure=true])) button::after{content:"";position:absolute;top:calc(1rem + .4em);top:calc(var(--pfe-theme--container-spacer,1rem) + .4em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .1em .1em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:calc(1rem * 1.3125);right:calc(var(--pfe-theme--container-spacer,1rem) * 1.3125)}:host(:not([disclosure=true])) button[aria-expanded=true]::after{-webkit-transform:rotate(-135deg);transform:rotate(-135deg)}:host(:last-of-type) button:not([aria-expanded=true]){--pfe-accordion--BorderBottomWidth:var(--pfe-theme--surface--border-width, 1px)}:host(:last-of-type.animating) button{--pfe-accordion--BorderBottomWidth:0}:host([on=dark]) button[aria-expanded=true]{--pfe-accordion--BackgroundColor:rgba(247, 247, 249, 0.1);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-dark, #73bcf7);--pfe-accordion--BoxShadow:none}:host([on=saturated]) button[aria-expanded=true]{--pfe-accordion--BackgroundColor:rgba(0, 0, 0, 0.2);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-saturated, #fff);--pfe-accordion--BoxShadow:none}:host([disclosure=true]) button{padding-left:calc(1rem * 3);padding-left:calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([disclosure=true]) button{padding:16px 24px 16px 47px;border-right-color:#d2d2d2;border-left-color:#d2d2d2;border-left-width:1px}}:host([disclosure=true]) button::before{content:"";position:absolute;top:calc(1rem + .55em);top:calc(var(--pfe-theme--container-spacer,1rem) + .55em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.4em;width:.4em;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .1em .1em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);left:calc(1rem * 1.3125);left:calc(var(--pfe-theme--container-spacer,1rem) * 1.3125);-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([disclosure=true]) button[aria-expanded=true]::before{-webkit-transform:rotate(45deg);transform:rotate(45deg)}:host([disclosure=true]) button:not([aria-expanded=true]):hover,:host([disclosure=true]) button[aria-expanded=true]{padding-left:calc(1rem * 3 - 4px + 1px);padding-left:calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3 - var(--pfe-theme--surface--border-width--heavy,4px) + var(--pfe-theme--surface--border-width,1px))}:host([disclosure=true]) button:not([aria-expanded=true]):hover::before,:host([disclosure=true]) button[aria-expanded=true]::before{margin-left:calc((4px - 1px) * -1);margin-left:calc((var(--pfe-theme--surface--border-width--heavy,4px) - var(--pfe-theme--surface--border-width,1px)) * -1)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host([disclosure=true]) button:not([aria-expanded=true]):hover,:host([disclosure=true]) button[aria-expanded=true]{border-left-color:#06c;border-left-width:4px;border-right-color:#d2d2d2}} /*# sourceMappingURL=pfe-accordion-header.min.css.map */</style>
`;
  }

  static get tag() {
    return "pfe-accordion-header";
  }

  get styleUrl() {
    return "pfe-accordion-header.scss";
  }

  get templateUrl() {
    return "pfe-accordion-header.html";
  }

  static get properties() {
    return {
      _id: {
        type: String,
        default: el => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false
      },
      ariaControls: {
        type: String,
        prefix: false
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id"
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        cascade: "#pfe-accordion-header--button",
        observer: "_expandedChanged"
      }
    };
  }

  static get events() {
    return {
      change: `pfe-accordion:change`
    };
  }

  constructor() {
    super(PfeAccordionHeader);

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._observer = new MutationObserver(this._init);
    this._slotObserver = new MutationObserver(this._init);

    this._getHeaderElement = this._getHeaderElement.bind(this);
    this._createButton = this._createButton.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) this._init();

    this.addEventListener("click", this._clickHandler);
    this._observer.observe(this, {
      childList: true
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
  }

  _init() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    const existingButton = this.shadowRoot.querySelector(`#${this.tag}--button`);
    const button = existingButton || this._createButton();
    const existingHeader = existingButton ? existingButton.parentElement : null;
    const header = this._getHeaderElement();

    if (header) {
      let wrapperTag = document.createElement(header.tagName.toLowerCase() || "h3");
      if (existingHeader && existingHeader.tagName === header.tagName) {
        wrapperTag = existingHeader;
      } else if (existingHeader && existingHeader.tagName !== header.tagName) {
        existingHeader.remove();
      }

      button.innerText = header.innerText;

      wrapperTag.appendChild(button);
      this.shadowRoot.appendChild(wrapperTag);
    } else {
      button.innerText = this.textContent.trim();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, {
        childList: true
      });
    }
  }

  _getHeaderElement() {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No header content provided`);
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
        if (slotted.length > 1) this.warn(`Heading currently only supports 1 tag.`);
        const htags = slotted.filter(slot => slot.tagName.match(/^H[1-6]/) || slot.tagName === "P");
        if (htags.length > 0) {
          // Return the first htag and attach an observer event to watch for it
          slotted.forEach(slot =>
            this._slotObserver.observe(slot, {
              characterData: true,
              childList: true,
              subtree: true
            })
          );
          return htags[0];
        } else return;
      } else if (this.firstElementChild.tagName.match(/^H[1-6]/) || this.firstElementChild.tagName === "P") {
        return this.firstElementChild;
      } else {
        this.warn(`Heading should contain at least 1 heading tag for correct semantics.`);
      }
    }

    return;
  }

  _createButton(expanded = "false") {
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-expanded", expanded);
    button.id = `${this.tag}--button`;
    return button;
  }

  _clickHandler(event) {
    this.emitEvent(PfeAccordionHeader.events.change, {
      detail: {
        expanded: !this.expanded
      }
    });
  }

  _expandedChanged() {
    this.setAttribute("aria-expanded", this.expanded);

    const button = this.shadowRoot.querySelector(`#${this.tag}--button`);
    if (button) button.setAttribute("aria-expanded", this.expanded);
  }
}

/*!
 * PatternFly Elements: PfeAccordion 1.7.0
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

class PfeAccordionPanel extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.7.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>.container{position:relative;display:block;width:100%;padding:1rem;padding:var(--pfe-theme--container-spacer,1rem)}:host{display:none;overflow:hidden;will-change:height;border-color:transparent;opacity:0;margin:0;width:100%;width:var(--pfe-accordion--Width,100%);max-width:100%;height:auto;position:relative;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));border-width:0;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-top-width:1px;border-top-width:var(--pfe-accordion--BorderTopWidth,var(--pfe-theme--surface--border-width,1px));border-right-width:0;border-right-width:var(--pfe-accordion--BorderRightWidth,0);border-bottom-width:1px;border-bottom-width:var(--pfe-accordion--BorderBottomWidth,var(--pfe-theme--surface--border-width,1px));border-left-width:4px;border-left-width:var(--pfe-accordion--BorderLeftWidth,var(--pfe-theme--surface--border-width--heavy,4px));border-left-color:transparent;border-left-color:var(--pfe-accordion--BorderColor--accent,transparent);-webkit-box-shadow:var(--pfe-accordion--BoxShadow);box-shadow:var(--pfe-accordion--BoxShadow);z-index:var(--pfe-accordion--ZIndex);-webkit-box-sizing:border-box;box-sizing:border-box}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{border-top-width:1px;border-right-width:0;border-bottom-width:1px;border-left-width:4px}}:host:focus,:host:hover{--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host:focus,:host:hover{border-left-color:#06c}}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out}.container{--pfe-accordion--BoxShadow:none;padding:var(--pfe-accordion__panel-container--Padding);padding:0 calc(1rem * 3) 1rem calc(1rem * 1.5);padding:var(--pfe-accordion__panel-container--Padding,0 var(--pfe-accordion__panel--Padding,calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3)) var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) var(--pfe-accordion__panel--Padding,calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 1.5)))}.container::after{clear:both;content:"";display:table}:host([disclosure=true]) .container{padding:0 calc(1rem * 3) calc(1rem) calc(1rem * 1.5);padding:var(--pfe-accordion__panel-container--Padding,0 calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 3) calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem))) calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 1.5))}pfe-jump-links-nav .container{padding:0;padding:var(--pfe-accordion__panel-container--Padding,0);--pfe-accordion__panel-container--Padding:0}@media (max-width:767px){pfe-jump-links-nav .container{padding:0;padding:var(--pfe-accordion__panel-container--Padding,0)}}:host(:last-of-type[expanded]){margin-bottom:0}:host(.animating),:host([expanded]){--pfe-accordion--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-accordion--BackgroundColor:white;--pfe-accordion--Color:var(--pfe-theme--color--text, #151515);--pfe-accordion--BorderColor--accent:var(--pfe-accordion--accent, var(--pfe-theme--color--ui-accent, #06c));--pfe-accordion--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);--pfe-accordion--ZIndex:3;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BoxShadow:0 5px var(--pfe-theme--surface--border-width--heavy, 4px) rgba(140, 140, 140, 0.35);display:block;position:relative;opacity:1}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host(.animating),:host([expanded]){border-top-width:0;border-left-color:#06c;border-left-color:var(--pfe-theme--color--ui-accent,#06c);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2)}}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-accordion--BackgroundColor:rgba(247, 247, 249, 0.1);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-dark, #73bcf7);--pfe-accordion--BoxShadow:none;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BoxShadow:none}:host([on=saturated].animating),:host([on=saturated][expanded]){--pfe-accordion--BackgroundColor:rgba(0, 0, 0, 0.2);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--ui-accent--on-saturated, #fff);--pfe-accordion--BoxShadow:none;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BoxShadow:none} /*# sourceMappingURL=pfe-accordion-panel.min.css.map */</style>
<div tabindex="-1">
  <div class="container">
    <slot></slot>
  </div>
</div>`;
  }

  static get tag() {
    return "pfe-accordion-panel";
  }

  get styleUrl() {
    return "pfe-accordion-panel.scss";
  }

  get templateUrl() {
    return "pfe-accordion-panel.html";
  }

  static get properties() {
    return {
      _id: {
        type: String,
        default: el => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false
      },
      role: {
        type: String,
        default: "region",
        prefix: false
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id"
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false
      },
      ariaLabelledby: {
        type: String,
        prefix: false
      }
    };
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();
  }
}

/*!
 * PatternFly Elements: PfeAccordion 1.7.0
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

class PfeAccordion extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.7.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{--pfe-accordion--BorderColor--accent:transparent;--pfe-accordion--BorderColor:var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-accordion--BorderTopWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderRightWidth:0;--pfe-accordion--BorderBottomWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width--heavy, 4px);--pfe-accordion--Color:var(--pfe-broadcasted--text, #3c3f42);--pfe-accordion--TextAlign:left;--pfe-accordion--accent:var(--pfe-theme--color--ui-accent, #06c);--pfe-accordion__base--Padding:var(--pfe-theme--container-spacer, 1rem);display:block;position:relative;overflow:hidden;margin:0;color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42))}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;color:#151515!important}}:host([on=dark]){--pfe-accordion--accent:var(--pfe-theme--color--ui-accent--on-dark, #73bcf7)}:host([on=saturated]){--pfe-accordion--accent:var(--pfe-theme--color--ui-accent--on-saturated, #fff)}:host([disclosure=true]){--pfe-accordion--BorderRightWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderLeftWidth:var(--pfe-theme--surface--border-width, 1px);--pfe-accordion--BorderColor--accent:var(--pfe-theme--color--surface--border, #d2d2d2)}:host([hidden]){display:none} /*# sourceMappingURL=pfe-accordion.min.css.map */</style>
<slot></slot>`;
  }

  static get tag() {
    return "pfe-accordion";
  }

  static get meta() {
    return {
      title: "Accordion",
      description: "This element renders content sets in an expandable format."
    };
  }

  get styleUrl() {
    return "pfe-accordion.scss";
  }

  get templateUrl() {
    return "pfe-accordion.html";
  }

  static get properties() {
    return {
      disclosure: {
        // Leaving this as a string since it's an opt out
        title: "Disclosure",
        type: String,
        values: ["true", "false"],
        cascade: ["pfe-accordion-header", "pfe-accordion-panel"]
      },
      // @TODO: Deprecated pfe-disclosure in 1.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure"
      },
      // Do not set a default of 0, it causes a the URL history to
      // be updated on load for every tab; infinite looping goodness
      // Seriously, don't set a default here unless you do a rewrite
      expandedIndex: {
        title: "Expanded index(es)",
        type: String,
        observer: "_expandedIndexHandler"
      },
      history: {
        title: "History",
        type: Boolean,
        default: false,
        observer: "_historyHandler"
      }
    };
  }

  static get slots() {
    return {
      default: {
        type: "array",
        namedSlot: false,
        items: {
          oneOf: [
            {
              $ref: "pfe-accordion-header"
            },
            {
              $ref: "pfe-accordion-panel"
            }
          ]
        }
      }
    };
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      expand: `${this.tag}:expand`,
      collapse: `${this.tag}:collapse`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  // Each set contains a header and a panel
  static get contentTemplate() {
    return `
    <pfe-accordion-header content-type="header"></pfe-accordion-header>
    <pfe-accordion-panel content-type="panel"></pfe-accordion-panel>
    `;
  }

  constructor() {
    super(PfeAccordion, { type: PfeAccordion.PfeType });

    this._manualDisclosure = null;
    this._updateHistory = true;
    this.expanded = [];

    this._init = this._init.bind(this);
    this._observer = new MutationObserver(this._init);
    this._updateStateFromURL = this._updateStateFromURL.bind(this);
    this._getIndexesFromURL = this._getIndexesFromURL.bind(this);
    this._updateURLHistory = this._updateURLHistory.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    if (this.hasLightDOM()) {
      this._manualDisclosure = this.getAttribute("disclosure") || this.getAttribute("pfe-disclosure");

      Promise.all([
        customElements.whenDefined(PfeAccordionHeader.tag),
        customElements.whenDefined(PfeAccordionPanel.tag)
      ]).then(this._init);
    }

    this.addEventListener(PfeAccordion.events.change, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);

    // Set up the observer on the child tree
    this._observer.observe(this, {
      childList: true
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener(PfeAccordion.events.change, this._changeHandler);
    this.removeEventListener("keydown", this._keydownHandler);
    this._observer.disconnect();

    window.removeEventListener("popstate", this._updateStateFromURL);
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand or collapse.
   * @param {Number} index
   */
  toggle(index) {
    const headers = this._allHeaders();
    const header = headers[index];

    if (!header.expanded) this.expand(index);
    else this.collapse(index);
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to expand.
   * @param {Number} index
   */
  expand(_index) {
    if (_index === undefined || _index === null) return;

    // Ensure the input is a number
    const index = parseInt(_index, 10);

    // Get all the headers and capture the item by index value
    const headers = this._allHeaders();
    const header = headers[index];
    if (!header) return;

    const panel = this._panelForHeader(header);
    if (!header || !panel) return;

    // If the header and panel exist, open both
    this._expandHeader(header);
    this._expandPanel(panel);

    header.focus();

    this.emitEvent(PfeAccordion.events.expand);
  }

  /**
   * Expands all accordion items.
   */
  expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._expandHeader(header));
    panels.forEach(panel => this._expandPanel(panel));
  }

  /**
   * Accepts a 0-based index value (integer) for the set of accordion items to collapse.
   * @param {Number} index
   */
  collapse(index) {
    const headers = this._allHeaders();
    const panels = this._allPanels();
    const header = headers[index];
    const panel = panels[index];

    if (!header || !panel) return;

    this._collapseHeader(header);
    this._collapsePanel(panel);

    this.emitEvent(PfeAccordion.events.collapse);
  }

  /**
   * Collapses all accordion items.
   */
  collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach(header => this._collapseHeader(header));
    panels.forEach(panel => this._collapsePanel(panel));
  }

  /**
   * Initialize the accordion by connecting headers and panels
   * with aria controls and labels; set up the default disclosure
   * state if not set by the author; and check the URL for default
   * open
   */
  _init() {
    const headers = this._allHeaders();
    // For each header in the accordion, attach the aria connections
    headers.forEach(header => {
      const panel = this._panelForHeader(header);
      // Escape if no matching panel can be found
      if (!panel) return;

      header.ariaControls = panel._id;
      panel.ariaLabelledby = header._id;
    });

    // If disclosure was not set by the author, set up the defaults
    if (!this._manualDisclosure) {
      if (headers.length === 1) {
        this.disclosure = "true";
      } else if (headers.length > 1) {
        this.disclosure = "false";
      }
    }

    // Update state if params exist in the URL
    if (!this.isIE11) this._updateStateFromURL();
  }

  _changeHandler(evt) {
    if (this.classList.contains("animating")) return;

    const index = this._getIndex(evt.target);

    if (evt.detail.expanded) this.expand(index);
    else this.collapse(index);

    this._updateURLHistory();
  }

  _historyHandler() {
    if (!this.history) window.removeEventListener("popstate", this._updateStateFromURL);
    else window.addEventListener("popstate", this._updateStateFromURL);
  }

  _expandHeader(header) {
    const index = this._getIndex(header);

    // If this index is not already listed in the expanded array, add it
    if (this.expanded.indexOf(index) < 0 && index > -1) this.expanded.push(index);

    header.expanded = true;
  }

  _expandPanel(panel) {
    if (!panel) {
      this.error(`Trying to expand a panel that doesn't exist.`);
      return;
    }

    if (panel.expanded) return;

    panel.expanded = true;

    const height = panel.getBoundingClientRect().height;
    this._animate(panel, 0, height);
  }

  _collapseHeader(header) {
    const index = this._getIndex(header);

    // If this index is exists in the expanded array, remove it
    let idx = this.expanded.indexOf(index);
    if (idx >= 0) this.expanded.splice(idx, 1);

    header.expanded = false;
  }

  _collapsePanel(panel) {
    if (!panel) {
      this.error(`Trying to collapse a panel that doesn't exist`);
      return;
    }

    if (!panel.expanded) return;

    const height = panel.getBoundingClientRect().height;
    panel.expanded = false;

    this._animate(panel, height, 0);
  }

  _animate(panel, start, end) {
    if (panel) {
      const header = panel.previousElementSibling;
      if (header) {
        header.classList.add("animating");
      }
      panel.classList.add("animating");
      panel.style.height = `${start}px`;

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          panel.style.height = `${end}px`;
          panel.addEventListener("transitionend", this._transitionEndHandler);
        });
      });
    }
  }

  _keydownHandler(evt) {
    const currentHeader = evt.target;

    if (!this._isHeader(currentHeader)) {
      return;
    }

    let newHeader;

    switch (evt.key) {
      case "ArrowDown":
      case "Down":
      case "ArrowRight":
      case "Right":
        newHeader = this._nextHeader();
        break;
      case "ArrowUp":
      case "Up":
      case "ArrowLeft":
      case "Left":
        newHeader = this._previousHeader();
        break;
      case "Home":
        newHeader = this._firstHeader();
        break;
      case "End":
        newHeader = this._lastHeader();
        break;
      default:
        return;
    }

    if (newHeader) {
      newHeader.shadowRoot.querySelector("button").focus();

      const index = this._getIndex(newHeader);
      this.expand(index);
      this._setFocus = true;
    }
  }

  _transitionEndHandler(evt) {
    const header = evt.target.previousElementSibling;
    if (header) header.classList.remove("animating");

    evt.target.style.height = "";
    evt.target.classList.remove("animating");
    evt.target.removeEventListener("transitionend", this._transitionEndHandler);
  }

  _allHeaders() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > pfe-accordion-header`)];
    else return this.children.filter(el => el.tagName.toLowerCase() === "pfe-accordion-header");
  }

  _allPanels() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > pfe-accordion-panel`)];
    else return this.children.filter(el => el.tagName.toLowerCase() === "pfe-accordion-panel");
  }

  _panelForHeader(header) {
    const next = header.nextElementSibling;

    if (!next) return;

    if (next.tagName.toLowerCase() !== PfeAccordionPanel.tag) {
      this.error(`Sibling element to a header needs to be a panel`);
      return;
    }

    return next;
  }

  _previousHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex(header => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  _nextHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex(header => header === document.activeElement) + 1;
    return headers[newIndex % headers.length];
  }

  _firstHeader() {
    const headers = this._allHeaders();
    return headers[0];
  }

  _lastHeader() {
    const headers = this._allHeaders();
    return headers[headers.length - 1];
  }

  _isHeader(element) {
    return element.tagName.toLowerCase() === PfeAccordionHeader.tag;
  }

  _isPanel(element) {
    return element.tagName.toLowerCase() === PfeAccordionPanel.tag;
  }

  _expandedIndexHandler(oldVal, newVal) {
    if (oldVal === newVal) return;
    const indexes = newVal.split(",").map(idx => parseInt(idx, 10) - 1);
    indexes.reverse().map(index => this.expand(index));
  }

  _getIndex(_el) {
    if (this._isHeader(_el)) {
      const headers = this._allHeaders();
      return headers.findIndex(header => header.id === _el.id);
    }

    if (this._isPanel(_el)) {
      const panels = this._allPanels();
      return panels.findIndex(panel => panel.id === _el.id);
    }

    this.warn(`The _getIndex method expects to receive a header or panel element.`);
    return -1;
  }

  _getIndexesFromURL() {
    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (!window.URLSearchParams) return [];

    // Capture the URL parameters
    const urlParams = new URLSearchParams(window.location.search);

    // If parameters exist and they contain the ID for this accordion
    if (urlParams && urlParams.has(this.id)) {
      const params = urlParams.get(this.id);
      // Split the parameters by underscore to see if more than 1 item is expanded
      const indexes = params.split("-");
      if (indexes.length < 0) return [];

      // Clean up the results by converting to array count
      return indexes.map(item => parseInt(item.trim(), 10) - 1);
    }
  }

  /**
   * This handles updating the URL parameters based on the current state
   * of the global this.expanded array
   * @requires this.expanded {Array}
   */
  _updateURLHistory() {
    // @IE11 doesn't support URLSearchParams
    // https://caniuse.com/#search=urlsearchparams
    if (!this.history || !this._updateHistory || !window.URLSearchParams) return;

    if (!this.id) {
      this.error(`The history feature cannot update the URL without an ID added to the pfe-accordion tag.`);
      return;
    }

    // Capture the URL and rebuild it using the new state
    const urlParams = new URLSearchParams(window.location.search);
    // Iterate the expanded array by 1 to convert to human-readable vs. array notation;
    // sort values numerically and connect them using a dash
    const openIndexes = this.expanded
      .map(item => item + 1)
      .sort((a, b) => a - b)
      .join("-");

    // If values exist in the array, add them to the parameter string
    if (this.expanded.length > 0) urlParams.set(this.id, openIndexes);
    // Otherwise delete the set entirely
    else urlParams.delete(this.id);

    // Note: Using replace state protects the user's back navigation
    history.replaceState(
      {},
      "",
      `${window.location.pathname}${urlParams ? `?${urlParams.toString()}` : ""}${window.location.hash}`
    );
  }

  /**
   * This captures the URL parameters and expands each item in the array
   * @requires this._getIndexesFromURL {Method}
   */
  _updateStateFromURL() {
    const indexesFromURL = this._getIndexesFromURL() || [];

    this._updateHistory = false;
    indexesFromURL.forEach(idx => this.expand(idx));
    this._updateHistory = true;
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export default PfeAccordion;
//# sourceMappingURL=pfe-accordion.js.map
