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

import PFElement from "../../pfelement/dist/pfelement.js";

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

export default PfeAccordionHeader;
