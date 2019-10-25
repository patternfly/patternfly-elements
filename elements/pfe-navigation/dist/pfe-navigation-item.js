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
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";

class PfeNavigationItem extends PFElement {
  static get version() {
    return "1.0.0-prerelease.27";
  }

  get html() {
    return `<style>::slotted([slot=trigger]){font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:14px;font-size:var(--pfe-navigation__trigger--FontSize,14px);font-weight:300;font-weight:var(--pfe-navigation--FontWeight,300);color:#fff;color:var(--pfe-navigation--Color,#fff);white-space:nowrap;margin:0!important}:host{--pfe-navigation--BackgroundColor:transparent;--pfe-navigation--Color:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-navigation--BorderColor:transparent;--pfe-navigation--BorderTopColor:transparent;--pfe-navigation__trigger-icon--Visible:hidden;--pfe-navigation__trigger--FontSize:16px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;height:100%;width:100%}:host([aria-current=location]){--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d)}:host(.expanded){--pfe-navigation__trigger-icon--Visible:visible;--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-navigation--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--Color:var(--pfe-theme--color--surface--lightest--text, #333)}:host([pfe-icon]){--pfe-navigation__trigger--FontSize:14px}:host(:not([has_tray])),:host(:not([pfe-icon]):not([is_nested]):not(.expanded)),:host([pfe-icon]){--pfe-navigation__trigger-icon--Visible:hidden}.pfe-navigation-item__trigger{--pfe-theme--link--text-decoration:none;--pfe-theme--link--text-decoration--hover:none;--pfe-theme--link--text-decoration--focus:none;--pfe-broadcasted--color--text:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link--hover:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link--visited:var(--pfe-navigation--Color, #fff);--pfe-broadcasted--color--ui-link--focus:var(--pfe-navigation--Color, #fff);--pfe-theme--font-size--alpha:var(--pfe-navigation__trigger--FontSize, 14px);--pfe-theme--font-weight--alpha:var(--pfe-navigation--FontWeight, 300);--pfe-theme--font-size--beta:var(--pfe-navigation__trigger--FontSize, 14px);--pfe-theme--font-weight--beta:var(--pfe-navigation--FontWeight, 300);--pfe-theme--font-size--gamma:var(--pfe-navigation__trigger--FontSize, 14px);--pfe-theme--font-weight--gamma:var(--pfe-navigation--FontWeight, 300);border-top:4px solid var(--pfe-navigation--BorderTopColor);border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderTopColor);border-right:1px dashed var(--pfe-navigation--BorderColor);border-right:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor);border-bottom:1px dashed var(--pfe-navigation--BorderColor);border-bottom:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor);border-left:1px dashed var(--pfe-navigation--BorderColor);border-left:var(--pfe-theme--surface--border-width,1px) dashed var(--pfe-navigation--BorderColor);background-color:var(--pfe-navigation--BackgroundColor);padding:calc(16px / 2) 16px!important;padding:calc(var(--pfe-theme--container-padding,16px)/ 2) var(--pfe-theme--container-padding,16px)!important;position:relative;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;-webkit-transition:all cubic-bezier(.465,.183,.153,.946);transition:all cubic-bezier(.465,.183,.153,.946);-webkit-transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));outline:0}.pfe-navigation-item__trigger:hover{--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-navigation__trigger-icon--Visible:visible;cursor:pointer}:host([variant=wind]) .pfe-navigation-item__trigger:hover{--pfe-navigation--Color:var(--pfe-theme--color--ui-link--hover, #003366)}:host([has_tray]:not([pfe-icon]):not([is_nested]):not(.expanded)) .pfe-navigation-item__trigger:hover{--pfe-navigation__trigger-icon--Visible:visible;border-top-color:var(--pfe-navigation--Color)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger:hover{border-left:4px solid var(--pfe-navigation--BorderLeftColor--focus);border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-navigation--BorderLeftColor--focus)}@media screen and (min-width:1200px){:host([has_tray]:not(.expanded)) .pfe-navigation-item__trigger:hover{--pfe-navigation__trigger-icon--Visible:visible}}.pfe-navigation-item__trigger:focus{--pfe-navigation--BorderTopColor:var(--pfe-theme--color--surface--accent, #fe460d);--pfe-navigation--BorderColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([variant=wind]) .pfe-navigation-item__trigger:focus{--pfe-navigation--Color:var(--pfe-theme--color--ui-link--focus, #003366)}:host(:not([pfe-icon])) .pfe-navigation-item__trigger::after{display:block;content:" ";visibility:hidden;visibility:var(--pfe-navigation__trigger-icon--Visible,hidden);border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:6px 6px 0;border-color:transparent;border-top-color:#606060;border-top-color:var(--pfe-theme--color--feedback--default,#606060);-webkit-transform:rotate(0);transform:rotate(0);position:absolute;bottom:16px;bottom:var(--pfe-theme--container-spacer,16px)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger{--pfe-navigation--Color:var(--pfe-navigation--aux);margin:0;width:100%;height:auto;font-family:inherit;font-weight:700;font-weight:var(--pfe-theme--font-weight--bold,700);text-align:left;cursor:pointer;z-index:1;position:relative;font-size:calc(16px * 1.1);font-size:calc(var(--pfe-theme--font-size,16px) * 1.1);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);color:var(--pfe-navigation--aux);background-color:var(--pfe-navigation--main);border-left:var(--pfe-navigation--BorderLeft);border-right:var(--pfe-navigation--BorderRight);border-bottom:var(--pfe-navigation--BorderBottom);border-top:0;padding:16px 50px 16px calc(16px * 1.5)!important;padding:var(--pfe-theme--container-spacer,16px) 50px var(--pfe-theme--container-spacer,16px) calc(var(--pfe-theme--container-spacer,16px) * 1.5)!important;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger:hover{outline:0;border-left-color:var(--pfe-navigation--BorderLeftColor--focus);z-index:2}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger:focus{outline:0;z-index:2;text-decoration:underline}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger::-moz-focus-inner{border:0}:host([is_nested].expanded:not([parent_hidden])) .pfe-navigation-item__trigger{position:relative;display:block;border-bottom:0;--pfe-navigation--main:var(--pfe-theme--color--surface--lightest, #fff);--pfe-navigation--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-navigation--focus:var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-navigation--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--lightest--link, #06c);--pfe-navigation--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2)}:host([is_nested]:not(.expanded):not([parent_hidden])) .pfe-navigation-item__trigger::after{content:"";position:absolute;top:calc((16px * .75) + .5935em);top:calc((var(--pfe-theme--container-spacer,16px) * .75) + .5935em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.313em;width:.313em;text-align:center;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 .15em .15em 0;-webkit-transform:rotate(45deg);transform:rotate(45deg);right:calc(16px * 1.5);right:calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host([is_nested].expanded:not([parent_hidden])) .pfe-navigation-item__trigger::after{content:"";position:absolute;top:calc((16px * .75) + .5935em);top:calc((var(--pfe-theme--container-spacer,16px) * .75) + .5935em);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:.313em;width:.313em;text-align:center;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:.15em .15em 0 0;border-bottom:0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:calc(16px * 1.5);right:calc(var(--pfe-theme--container-spacer,16px) * 1.5)}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__trigger::after{--pfe-navigation__trigger-icon--Visible:visible;border-color:var(--pfe-navigation--Color)}:host([is_nested]:not([has_tray]):not([parent_hidden])) .pfe-navigation-item__trigger::after{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}:host([variant=wind]) .pfe-navigation-item__trigger{--pfe-navigation--Color:var(--pfe-theme--color--ui-link, #06c);--pfe-navigation--BackgroundColor:transparent!important;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;-ms-flex-direction:row;flex-direction:row;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;border:none;padding:calc(16px / 2) 0;padding:calc(var(--pfe-theme--container-padding,16px)/ 2) 0}.pfe-navigation-item__trigger pfe-icon{--pfe-icon--Color:var(--pfe-navigation--Color);margin-bottom:calc(16px / 2);margin-bottom:calc(var(--pfe-theme--container-spacer,16px)/ 2)}:host([variant=wind]) .pfe-navigation-item__trigger pfe-icon{margin-bottom:0;margin-right:calc(16px / 2);margin-right:calc(var(--pfe-theme--container-spacer,16px)/ 2)}.pfe-navigation-item__trigger pfe-icon[icon=web-plus]{-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.pfe-navigation-item__tray{--pfe-navigation--Color:var(--pfe-theme--color--text, #333);--pfe-navigation--FontWeight:var(--pfe-theme--color--text, #333);--pfe-broadcasted--color--text:var(--pfe-theme--color--text, #333);--pfe-broadcasted--color--ui-link:var(--pfe-theme--color--ui-link, #06c);--pfe-broadcasted--color--ui-link--hover:var(--pfe-theme--color--ui-link--hover, #003366);--pfe-broadcasted--color--ui-link--visited:var(--pfe-theme--color--ui-link--visited, rebeccapurple);--pfe-broadcasted--color--ui-link--focus:var(--pfe-theme--color--ui-link--focus, #003366);-webkit-transition:all cubic-bezier(.465,.183,.153,.946);transition:all cubic-bezier(.465,.183,.153,.946);-webkit-transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:all var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-box-sizing:border-box;box-sizing:border-box;display:none;visibility:hidden}.pfe-navigation-item__tray[aria-expanded=true]{display:block;visibility:visible}:host([show_links]:not([parent_hidden])) .pfe-navigation-item__tray{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;visibility:visible;width:100%}:host(:not([pfe-icon=web-mobile-menu]):not([is_nested])) .pfe-navigation-item__tray,:host([is_nested][parent_hidden]) .pfe-navigation-item__tray,:host([pfe-icon=web-mobile-menu]:not([show_links])) .pfe-navigation-item__tray{position:absolute;top:100%;left:0;background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);color:var(--pfe-navigation--Color);padding:var(--pfe-navigation__tray--Padding);width:100%;max-height:calc(100vh - 84px);max-height:calc(100vh - var(--pfe-navigation--Height,84px));overflow-x:hidden;overflow-y:scroll}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray{--pfe-navigation--Padding:calc(var(--pfe-navigation--Padding--vertical) / 2) var(--pfe-navigation--Padding--horizontal);position:relative;display:block;width:100%;padding:calc(var(--pfe-navigation--Padding--vertical)/ 2) var(--pfe-navigation--Padding--horizontal)}@media (min-width:576px){:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray{padding:var(--pfe-navigation--Padding)}}:host([is_nested]:not([parent_hidden])) .pfe-navigation-item__tray{display:none;overflow:hidden;will-change:height;border-color:transparent;opacity:0;-webkit-box-sizing:border-box;box-sizing:border-box;width:100%}:host([is_nested].expanded:not([parent_hidden])) .pfe-navigation-item__tray{display:block;position:relative;opacity:1;border-right:1px solid transparent;border-right:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;-webkit-box-shadow:0 5px 4px rgba(140,140,140,.35);box-shadow:0 5px 4px rgba(140,140,140,.35);-webkit-box-shadow:0 5px var(--pfe-theme--surface--border-width--heavy,4px) rgba(140,140,140,.35);box-shadow:0 5px var(--pfe-theme--surface--border-width--heavy,4px) rgba(140,140,140,.35);border-left-color:#06c;border-left-color:var(--pfe-theme--color--surface--lightest--link,#06c);background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);border-right-color:#d2d2d2;border-right-color:var(--pfe-theme--color--surface--border,#d2d2d2);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}::slotted([slot=tray]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}:host([is_nested]:not([parent_hidden])){--pfe-navigation--main:transparent;--pfe-navigation--aux:var(--pfe-theme--color--surface--lightest--text, #333);--pfe-navigation--BorderLeft:var(--pfe-theme--surface--border-width--heavy, 4px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-navigation--BorderRight:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) transparent;--pfe-navigation--BorderBottom:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-theme--color--surface--border, #d2d2d2);--pfe-navigation--BorderLeftColor--focus:var(--pfe-theme--color--surface--lightest--link, #06c)}:host([is_nested][first]:not([parent_hidden])){border-top:1px solid #d2d2d2;border-top:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host(:not(.expanded):not([show_links])) .pfe-navigation-item__tray,:host([hidden]) .pfe-navigation-item__tray,:host([hidden]) .pfe-navigation-item__trigger,:host([hidden]:not([show_tray])),:host([show_links])>.pfe-navigation-item__trigger{display:none;visibility:hidden}:host([show_links]) ::slotted([slot=tray][hidden]),:host([show_tray]){display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;visibility:visible;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}
/*# sourceMappingURL=pfe-navigation-item.min.css.map */
</style><div class="pfe-navigation-item__trigger" aria-expanded="false" tabindex="0">
    ${this.hasIcon ? `<pfe-icon icon="${this.iconName}"></pfe-icon>` : ""}
    <slot name="trigger"></slot>
</div>
${ this.has_slot("tray") ? `<div class="pfe-navigation-item__tray">
    <slot name="tray"></slot>
</div>` : ""}`;
  }

  static get properties() {
    return {"icon":{"title":"Icon name","type":"string","prefixed":true}};
  }

  static get slots() {
    return {"trigger":{"title":"Navigation trigger","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"tray":{"title":"Navigation tray","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}}};
  }
    static get tag() {
      return "pfe-navigation-item";
    }
  
    get templateUrl() {
      return "pfe-navigation-item.html";
    }
  
    get styleUrl() {
      return "pfe-navigation-item.scss";
    }
  
    get schemaUrl() {
      return "pfe-navigation-item.json";
    }
  
    static get PfeType() {
      return PFElement.PfeTypes.Container;
    }
  
    static get observedAttributes() {
      return ["pfe-icon"];
    }

    get hasIcon() {
      return this.hasAttribute("pfe-icon");
    }

    get iconName() {
      return this.getAttribute("pfe-icon");
    }
  
    get nested() {
      return this.hasAttribute("is_nested");
    }
  
    set nested(isNested) {
      isNested = Boolean(isNested);
  
      if (isNested) {
        this.setAttribute("is_nested", "");
      } else {
        this.removeAttribute("is_nested");
      }
    }
  
    get expanded() {
      return this.classList.contains("expanded");
    }
  
    set expanded(isExpanded) {
      isExpanded = Boolean(isExpanded);

      if (isExpanded) {
        this.classList.add("expanded");
  
        if (this.iconName === "web-mobile-menu") {
          if (this._icon) this._icon.setAttribute("icon", "web-plus");
        }

        if (this._trigger) {
          this._trigger.setAttribute("aria-expanded", true);
        }
  
        if (this.tray) {
          this.tray.removeAttribute("hidden");
        }
  
        if (this._tray) {
          this._tray.setAttribute("aria-expanded", true);
        }
      } else {
        this.classList.remove("expanded");
  
        if (this.iconName === "web-mobile-menu") {
          if (this._icon) this._icon.setAttribute("icon", "web-mobile-menu");
        }
  
        if (this._trigger) {
          this._trigger.setAttribute("aria-expanded", false);
        }
  
        if (this.tray) {
          this.tray.setAttribute("hidden", "");
        }
  
        if (this._tray) {
          this._tray.setAttribute("aria-expanded", false);
        }
      }
    }
  
    get visible() {
      return !this.hasAttribute("hidden");
    }
  
    set visible(isVisible) {
      isVisible = Boolean(isVisible);
  
      if (isVisible) {
        this.removeAttribute("hidden");
      } else {
        this.setAttribute("hidden", "");
      }
    }
  
    open(event) {
      if (event) event.preventDefault();
  
      // Close the other active item(s) unless it's this item's parent
      if (this.navigationWrapper) {
        this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(item => {
          let stayOpen = item === this.parent;
          if (!stayOpen) item.close();
          return stayOpen;
        });
  
        // Open that item and add it to the active array
        this.navigationWrapper._activeNavigationItems.push(this);
  
        this.expanded = true;
        this.navigationWrapper.overlay = true;
      }
  
      // Dispatch the event
      this.dispatchEvent(
        new CustomEvent(`${this.tag}:open`, {
          detail: {},
          bubbles: true,
          composed: true
        })
      );
    }
  
    close(event) {
      if (event) event.preventDefault();
  
      // Close the children elements
      this.navigationWrapper._activeNavigationItems = this.navigationWrapper._activeNavigationItems.filter(item => {
        let close = this.nestedItems && this.nestedItems.includes(item);
        if (close) item.close();
        return !close && item !== this;
      });
  
      this.expanded = false;
  
      // Clear the overlay
      this.navigationWrapper.overlay = this.navigationWrapper._activeNavigationItems.length > 0;
  
      this.focus();
  
      // Dispatch the event
      this.dispatchEvent(
        new CustomEvent(`${this.tag}:close`, {
          detail: {},
          bubbles: true,
          composed: true
        })
      );
    }
  
    toggle(event) {
      if (event) event.preventDefault();
  
      if (this.visible && !this.expanded) {
        this.open(event);
      } else {
        this.close(event);
      }
    }
  
    constructor() {
      super(PfeNavigationItem);
  
      // States
      this.nested = false;
      this.expanded = false;
  
      // Objects
      this.trigger = null;
      this.tray = null;
      this.directLink = null;
      this.linkUrl = null;
  
      // Lists
      this.nestedItems = [];
  
      // Shadow elements
      this._trigger = this.shadowRoot.querySelector(`.${this.tag}__trigger`);
      this._icon = this.shadowRoot.querySelector("pfe-icon");
      this._tray = this.shadowRoot.querySelector(`.${this.tag}__tray`);
  
      // Externally accessible events
      this.close = this.close.bind(this);
      this.open = this.open.bind(this);
      this.toggle = this.toggle.bind(this);
  
      // Initializers
      this._init__trigger = this._init__trigger.bind(this);
      this._init__tray = this._init__tray.bind(this);
  
      // Event handlers
      this._keydownHandler = this._keydownHandler.bind(this);
      this._keyupHandler = this._keyupHandler.bind(this);
      this._navigateToUrl = this._navigateToUrl.bind(this);
      this._directLinkHandler = this._directLinkHandler.bind(this);
    }
  
    connectedCallback() {
      super.connectedCallback();
  
      this._init__trigger();
      this._init__tray();
  
      // Add a slotchange listeners to the lightDOM elements
      if (this.trigger) this.trigger.addEventListener("slotchange", this._init__trigger);
      if (this.tray) this.tray.addEventListener("slotchange", this._init__tray);
    }
  
    disconnectedCallback() {
      this.trigger.removeEventListener("slotchange", this._init);
  
      if (this.tray) {
        this.tray.removeEventListener("slotchange", this._init);
  
        this.removeEventListener("keydown", this._keydownHandler);
        this.removeEventListener("keyup", this._exit);
  
        this._trigger.removeEventListener("click", this.toggle);
        this._trigger.removeEventListener("keyup", this._keyupHandler);
      } else {
        this._trigger.removeEventListener("click", this._navigateToUrl);
        this._trigger.removeEventListener("keyup", this._directLinkHandler);
      }
    }
  
    _init__trigger() {
      // If no slots have been assigned, assign it to the trigger slot
      const unassigned = [...this.children].filter(child => !child.hasAttribute("slot"));
      unassigned.map(item => item.setAttribute("slot", "trigger"));
  
      // Get the LightDOM trigger & tray content
      this.trigger = this.querySelector(`[slot="trigger"]`);
  
      this.directLink = this.trigger.querySelector("a");
      this.linkUrl = this.directLink ? this.directLink.href : "#";
  
      // Turn off the fallback link
      if (this.directLink) this.directLink.setAttribute("tabindex", "-1");
  
      this._trigger.addEventListener("click", this._navigateToUrl);
      this._trigger.addEventListener("keyup", this._directLinkHandler);
    }
  
    _init__tray() {
      // Get the LightDOM trigger & tray content
      this.tray = this.querySelector(`[slot="tray"]`);
  
      //-- Check for any nested navigation items
      // If a light DOM tray exists, check for descendents
      if (this.tray) {
        this.nestedItems = this.nestedItems.concat([...this.tray.querySelectorAll(`${this.tag}`)]);
        let array = [];
  
        // Search the tray for nested slots
        if (!window.ShadyCSS) {
          [...this.tray.querySelectorAll("slot")].forEach(slot => {
            [...slot.assignedElements()].forEach(node => {
              array = array.concat([...node.querySelectorAll(`${this.tag}`)]);
            });
          });
        }
  
        this.nestedItems = this.nestedItems.concat(array.filter(el => {
          return !this.nestedItems.includes(el);
        }));
        
        this._init__handlers();
      }
    }
  
    _init__handlers() {
      this._trigger.removeEventListener("click", this._navigateToUrl);
      this._trigger.removeEventListener("keyup", this._directLinkHandler);
  
      // Toggle the navigation when the trigger is clicked
      this._trigger.addEventListener("click", this.toggle);
  
      // Attaching to the parent element allows the exit key to work inside the tray too
      this.addEventListener("keyup", this._exit);
      this.addEventListener("keydown", this._keydownHandler);
  
      this._trigger.addEventListener("keyup", this._keyupHandler);
    }
  
    _navigateToUrl(event) {
      event.preventDefault();
      window.location.href = this.linkUrl;
    }
  
    _directLinkHandler(event) {
      let key = event.key || event.keyCode;
      switch (key) {
        case "Spacebar":
        case " ":
        case 32:
        case "Enter":
        case 13:
          this._navigateToUrl(event);
          break;
        default:
          return;
      }
    }
  
    _keydownHandler(event) {
      let key = event.key || event.keyCode;
      let clicked = event.path && event.path.length > 0 ? event.path[0] : this;
  
      switch (key) {
        case "Spacebar":
        case " ":
        case 32:
          if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
            event.preventDefault();
          }
          break;
      }
    }
  
    _keyupHandler(event) {
      let key = event.key || event.keyCode;
      let clicked = event.path && event.path.length > 0 ? event.path[0] : this;
  
      switch (key) {
        case "Spacebar":
        case " ":
        case 32:
          if (!["INPUT", "TEXTAREA", "SELECT"].includes(clicked.tagName)) {
            this.toggle(event);
          }
          break;
        case "Enter":
        case 13:
          if (!["A"].includes(clicked.tagName)) {
            this.toggle(event);
          }
          break;
      }
    }
  
    // Note: Escape will always exit the entire menu
    _exit(event) {
      let key = event.key || event.keyCode;
      switch (key) {
        case "Esc":
        case "Escape":
        case 27:
          this.close(event);
          break;
      }
    }
}

export default PfeNavigationItem;