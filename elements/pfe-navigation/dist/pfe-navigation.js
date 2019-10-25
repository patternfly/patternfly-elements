import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-icon/dist/pfe-icon.js';

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

// -- @TODO Needing to manually add polyfills at the moment; check into why babel is not doing this
// -- @TODO Set icons to hide if they all fail to load, else set them to preserve space

// -- POLYFILL: Array.prototype.filter
if (!Array.prototype.filter){
  Array.prototype.filter = function(func, thisArg) {
    if ( ! ((typeof func === 'Function' || typeof func === 'function') && this) )
        throw new TypeError();
   
    var len = this.length >>> 0,
        res = new Array(len), // preallocate array
        t = this, c = 0, i = -1;

    var kValue;
    if (thisArg === undefined){
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i]; // in case t is changed in callback
          if (func(t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
    else{
      while (++i !== len){
        // checks to see if the key was set
        if (i in this){
          kValue = t[i];
          if (func.call(thisArg, t[i], i, t)){
            res[c++] = kValue;
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
  };
}

// -- POLYFILL: Element.prototype.matches
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || 
                              Element.prototype.webkitMatchesSelector;
}

// -- POLYFILL: Element.prototype.closest
if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// -- POLYFILL: Array.prototype.includes
if (!Array.prototype.includes) {
  Object.defineProperty(Array.prototype, 'includes', {
    value: function (searchElement, fromIndex) {

      // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If len is 0, return false.
      if (len === 0) {
        return false;
      }

      // 4. Let n be ? ToInteger(fromIndex).
      //    (If fromIndex is undefined, this step produces the value 0.)
      var n = fromIndex | 0;

      // 5. If n ≥ 0, then
      //  a. Let k be n.
      // 6. Else n < 0,
      //  a. Let k be len + n.
      //  b. If k < 0, let k be 0.
      var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

      function sameValueZero(x, y) {
        return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
      }

      // 7. Repeat, while k < len
      while (k < len) {
        // a. Let elementK be the result of ? Get(O, ! ToString(k)).
        // b. If SameValueZero(searchElement, elementK) is true, return true.
        // c. Increase k by 1.
        if (sameValueZero(o[k], searchElement)) {
          return true;
        }
        k++;
      }

      // 8. Return false
      return false;
    }
  });
}

// -- POLYFILL: Event.prototype.path
if (!("path" in Event.prototype)) {
    Object.defineProperty(Event.prototype, "path", {
      get: function() {
        var path = [];
        var currentElem = this.target;
        while (currentElem) {
          path.push(currentElem);
          currentElem = currentElem.parentElement;
        }
        if (path.indexOf(window) === -1 && path.indexOf(document) === -1)
          path.push(document);
        if (path.indexOf(window) === -1)
          path.push(window);
        return path;
      }
    });
}

class PfeNavigation extends PFElement {
  static get version() {
    return "1.0.0-prerelease.27";
  }

  get html() {
    return `<style>:host{--pfe-navigation--Padding--vertical:var(--pfe-theme--container-padding, 16px);--pfe-navigation--Padding--horizontal:var(--pfe-theme--container-padding, 16px);--pfe-navigation--Padding:0 var(--pfe-navigation--Padding--horizontal);--pfe-navigation--BackgroundColor:var(--pfe-theme--color--surface--darkest, #131313);--pfe-navigation--Color:var(--pfe-theme--color--surface--darkest--text, #fff);--pfe-navigation--BorderTopColor:transparent;--pfe-navigation--BorderColor:transparent;--pfe-navigation--Border:var(--pfe-theme--surface--border-width, 1px) var(--pfe-theme--surface--border-style, solid) var(--pfe-navigation--BorderColor);--pfe-navigation--MaxHeight:72px;--pfe-navigation--icon:none;--pfe-navigation__overlay--BackgroundColor:var(--pfe-theme--overlay--BackgroundColor, rgba(37, 37, 37, 0.5));--pfe-navigation__trigger--FontWeight:100;--pfe-navigation__tray--Padding:var(--pfe-theme--container-padding, 16px);display:block;z-index:0;z-index:var(--pfe-theme--zindex--content,0);width:100%}@media print{:host{--pfe-navigation--Padding:calc(var(--pfe-navigation--Padding--vertical) / 2) var(--pfe-navigation--Padding--horizontal)}}@media screen and (min-width:576px){:host{--pfe-navigation--Padding--horizontal:calc(var(--pfe-theme--container-padding, 16px) * 2)}}@media screen and (min-width:992px){:host{--pfe-navigation--Padding--horizontal:calc(var(--pfe-theme--container-padding, 16px) / 2);--pfe-navigation__tray--Padding:calc(var(--pfe-theme--container-padding, 16px) * 2)}}@media screen and (min-width:1200px){:host{--pfe-navigation--Padding--horizontal:var(--pfe-theme--container-padding, 16px)}}:host(.sticky){position:-webkit-sticky;position:sticky;top:0;left:0;width:100vw;z-index:98;z-index:var(--pfe-theme--zindex--navigation,98)}pfe-icon{--pfe-icon--Color:var(--pfe-navigation--Color)}::slotted([slot=logo]){margin:0;max-height:var(--pfe-navigation--MaxHeight)}::slotted([slot=mobile-language]),::slotted([slot=mobile-login]){color:#06c;color:var(--pfe-broadcasted--color--ui-link,#06c);text-decoration:underline;-webkit-text-decoration:var(--pfe-broadcasted--link--text-decoration,underline);text-decoration:var(--pfe-broadcasted--link--text-decoration,underline)}::slotted([slot=mobile-menu--label]){font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-size:var(--pfe-navigation--FontSize);font-weight:var(--pfe-navigation--FontWeight);color:var(--pfe-navigation--Color);margin-bottom:0}.pfe-navigation__wrapper{--pfe-broadcasted--color--text:var(--pfe-navigation--Color, var(--pfe-theme--color--surface--darkest--text, #fff));--pfe-broadcasted--color--ui-link:var(--pfe-navigation--Color, var(--pfe-theme--color--surface--darkest--text, #fff));--pfe-broadcasted--color--ui-link--hover:var(--pfe-navigation--Color, var(--pfe-theme--color--surface--darkest--text, #fff));--pfe-broadcasted--color--ui-link--visited:var(--pfe-navigation--Color, var(--pfe-theme--color--surface--darkest--text, #fff));--pfe-broadcasted--color--ui-link--focus:var(--pfe-navigation--Color, var(--pfe-theme--color--surface--darkest--text, #fff));display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative;z-index:98;z-index:var(--pfe-theme--navigation,98);background-color:var(--pfe-navigation--BackgroundColor);color:var(--pfe-navigation--Color);min-height:var(--pfe-navigation--MaxHeight)}.pfe-navigation__container{width:100%;max-width:var(--pfe-navigation--Width);margin:0 auto;padding:0 var(--pfe-navigation--Padding--horizontal);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between}@media screen and (min-width:768px){.pfe-navigation__container{--pfe-navigation--Width:calc(768px)}}@media screen and (min-width:992px){.pfe-navigation__container{--pfe-navigation--Width:calc(992px)}}@media screen and (min-width:1200px){.pfe-navigation__container{--pfe-navigation--Width:calc(1200px)}}@media (min-width:992px){.pfe-navigation__container{padding:0}}.pfe-navigation__container>pfe-navigation-item:not([hidden]){-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;-webkit-box-align:end;-webkit-align-items:flex-end;-ms-flex-align:end;align-items:flex-end}.pfe-navigation__overlay{display:block;background-color:rgba(37,37,37,.5);background-color:var(--pfe-navigation__overlay--BackgroundColor,rgba(37,37,37,.5));position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:97;z-index:var(--pfe-theme--zindex--overlay,97)}.pfe-navigation__overlay[hidden]{display:none}.pfe-navigation__logo{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-flow:column nowrap;-ms-flex-flow:column nowrap;flex-flow:column nowrap;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;padding-top:var(--pfe-navigation--Padding--vertical);padding-right:16px;padding-right:var(--pfe-theme--container-padding,16px);padding-bottom:var(--pfe-navigation--Padding--vertical)}.pfe-navigation__skip{display:block;position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0;margin:0 -2em -1px -1px}.pfe-navigation__main{display:-ms-grid;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));height:100%;width:100%}.pfe-navigation__main--menu-label{color:var(--pfe-navigation--Color)}[show_login][show_language] .pfe-navigation__main,[show_search] .pfe-navigation__main{grid-gap:16px;grid-gap:var(--pfe-theme--container-spacer,16px)}.pfe-navigation__main ::slotted(:not([hidden])){display:block;grid-column:1/-1}.pfe-navigation__utility{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row nowrap;-ms-flex-flow:row nowrap;flex-flow:row nowrap;-webkit-box-align:stretch;-webkit-align-items:stretch;-ms-flex-align:stretch;align-items:stretch;-webkit-box-pack:end;-webkit-justify-content:flex-end;-ms-flex-pack:end;justify-content:flex-end}
/*# sourceMappingURL=pfe-navigation.min.css.map */
</style><div class="pfe-navigation__wrapper">
  <div class="pfe-navigation__container">
    ${ this.has_slot("logo") ? `<div class="pfe-navigation__logo">
      <slot name="logo" tabindex="2"></slot>
    </div>` : ""}
    ${ this.has_slot("skip") ? `<div class="pfe-navigation__skip">
      <slot name="skip" tabindex="1"></slot>
    </div>` : ""}
    <pfe-navigation-item pfe-icon="web-mobile-menu">
      ${this.hasAttribute("pfe-menu-label") ? `<h2 slot="trigger" class="pfe-navigation__main--menu-label">${this.getAttribute("pfe-menu-label")}</h2>` : `<span slot="trigger"></span>`}
      <div slot="tray">
        <div class="pfe-navigation__main">
          <slot name="mobile-search"></slot>
          <slot></slot>
          <pfe-navigation-item pfe-icon="web-user" variant="wind" hidden>
            <slot name="mobile-login"></slot>
          </pfe-navigation-item>
          <pfe-navigation-item pfe-icon="web-globe" variant="wind" hidden>
            <slot name="mobile-language"></slot>
          </pfe-navigation-item>
        </div>
      </div>
    </pfe-navigation-item>
    ${ this.has_slot("language") || this.has_slot("search") || this.has_slot("login") || this.has_slot("site-switcher") ? `<div class="pfe-navigation__utility">
      <slot name="language"></slot>
      <slot name="search"></slot>
      <slot name="login"></slot>
      <slot name="site-switcher"></slot>
    </div>` : ""}
  </div>
</div>
<div class="pfe-navigation__overlay" hidden></div>`;
  }

  static get properties() {
    return {"sticky":{"title":"Sticky navigation","type":"boolean","default":true,"prefixed":true},"close-on-click":{"title":"Close navigation on click event","type":"string","enum":["external"],"default":"external","prefixed":true},"menu-label":{"title":"Mobile menu label","type":"string","default":"Menu","prefixed":true}};
  }

  static get slots() {
    return {"skip":{"title":"Skip navigation","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"logo":{"title":"Logo","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"search":{"title":"Search","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}},"mobile-search":{"title":"Mobile search functionality","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"raw"}]}},"main":{"title":"Main navigation","type":"array","namedSlot":false,"items":{"title":"Item","oneOf":[{"$ref":"nav"},{"$ref":"raw"}]}},"language":{"title":"Language switcher","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}},"mobile-language":{"title":"Mobile link to language page","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"a"}]}},"login":{"title":"Log in","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}},"mobile-login":{"title":"Mobile link to log in page","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"a"}]}},"site-switcher":{"title":"Site switcher","type":"array","namedSlot":true,"items":{"title":"Item","oneOf":[{"$ref":"pfe-navigation-item"}]}}};
  }
  static get tag() {
    return "pfe-navigation";
  }

  get templateUrl() {
    return "pfe-navigation.html";
  }

  get styleUrl() {
    return "pfe-navigation.scss";
  }

  get schemaUrl() {
    return "pfe-navigation.json";
  }

  get overlay() {
    return !this._overlay.hasAttribute("hidden");
  }

  set overlay(state) {
    if (state) {
      // Add the overlay to the page
      this._overlay.removeAttribute("hidden");
      // This prevents background scroll while nav is open
      document.body.style.overflow = "hidden";
    } else {
      // Remove the overlay from the page
      this._overlay.setAttribute("hidden", "");
      // Allow background to scroll again
      document.body.style.overflow = "auto";

    }
  }

  constructor() {
    super(PfeNavigation);

    // Attach functions for use below
    this._init = this._init.bind(this);
    this._setVisibility = this._setVisibility.bind(this);

    // -- handlers
    this._resizeHandler = this._resizeHandler.bind(this);
    this._stickyHandler = this._stickyHandler.bind(this);
    this._outsideListener = this._outsideListener.bind(this);
    this._observer = new MutationObserver(this._init);

    // Capture shadow elements
    this._overlay = this.shadowRoot.querySelector(`.${this.tag}__overlay`);
    this._menuItem = this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[pfe-icon="web-mobile-menu"]`);

    this._slots = {
      language: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[pfe-icon="web-user"]`),
      login: this.shadowRoot.querySelector(`${PfeNavigationItem.tag}[pfe-icon="web-globe"]`)
    };

    // Initialize active navigation item to empty array
    this._activeNavigationItems = [];
    this.overlay = false;
  }

  connectedCallback() {
    super.connectedCallback();

    Promise.all([
      customElements.whenDefined(PfeNavigationItem.tag),
      customElements.whenDefined(PfeNavigationMain.tag)
    ]).then(() => {
      // If this element contains light DOM, initialize it
      if (this.children.length) {
        // If only one value exists in the array, it starts at that size and goes up
        this.breakpoints = {
          main: [0, 1199], // visible from 0 - 1200px
          search: [768],   // visible from 768px +
          "mobile-search": [0, 767],
          language: [768],
          "mobile-language": [0, 767],
          login: [768],
          "mobile-login": [0, 767]
        };

        // Kick off the initialization of the light DOM elements
        this._init();

        // Watch for screen resizing
        window.addEventListener("resize", this._resizeHandler);
      } else {
        console.error("This component does not have any light DOM children.  Please check documentation for requirements.");
      }

      this._observer.observe(this, { childList: true });
    });
  }

  disconnectedCallback() {
    // Remove the scroll, resize, and outside click event listeners
    window.removeEventListener("resize", this._resizeHandler);

    if(this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      document.removeEventListener("click", this._outsideListener);
    }

    if(this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      window.removeEventListener("scroll", this._stickyHandler);
    }

    this._observer.disconnect();
  }

  _resizeHandler(event) {
    // Set the visibility of items
    this._setVisibility(this.offsetWidth);

    // Check what the active item is
    this._activeNavigationItems.forEach(item => {
      // If the item is open but not visible, update it to hidden
      if (item.expanded && !item.visible) {
        item.expanded = false;
        this._activeNavigationItems = this._activeNavigationItems.filter(i => i !== item);
      } else if (item.expanded && item.parent && item.parent.visible) {
        item.parent.expanded = true; // Ensure the parent is open
        // If the parent item doesn't exist in the active array, add it
        if (!this._activeNavigationItems.includes(item.parent)) {
          this._activeNavigationItems.push(item.parent);
        }
      }
    });

    this.overlay = this._activeNavigationItems.length > 0;
  }

  _stickyHandler() {
    if(window.pageYOffset >= this.top) {
      this.classList.add("sticky");
    } else {
      this.classList.remove("sticky");
    }
  }

  _outsideListener(event) {
    // Check if the clicked element is the navigation object
    let isSelf = event.target === this;
    // Check if the clicked element contains or is contained by the navigation element
    let isChild = event.target.closest("pfe-navigation");
    let insideWrapper = event.target.tagName.includes("-") ? event.target.shadowRoot.querySelector("pfe-navigation") : null;
    // Check if the clicked element is the overlay object
    let isOverlay = event && event.path && event.path.length > 0 && event.path[0] === this._overlay;
    // Check states to determine if the navigation items should close
    if (isOverlay || (!isSelf && !(isChild || insideWrapper))) {
      this._activeNavigationItems.map(item => item.close());
    }
  }

  _setVisibility(width) {
    Object.keys(this.breakpoints).forEach(label => {
      let bps = this.breakpoints[label];
      let start = bps[0];
      let end = bps[1];
      let isVisible = false;

      // If the slot exists, set attribute based on supported breakpoints
      if (this.slots[label] && this.slots[label].nodes.length > 0) {
        if (width >= start && (!end || (end && width <= end))) {
          isVisible = true;
        }

        this.slots[label].nodes.forEach(node => {
          switch(label) {
            case "main":
              if (isVisible) {
                node.removeAttribute("show_content");
                this._menuItem.removeAttribute("show_links");
              } else {
                node.setAttribute("show_content", "");
                this._menuItem.setAttribute("show_links", "");
                this._menuItem.expanded = false;
                this._menuItem.tray.removeAttribute("hidden");
                // Remove menuItem from active items
                this._activeNavigationItems = this._activeNavigationItems.filter(item => item !== this._menuItem);
              }
              node.navItems.forEach(item => {
                if (isVisible) {
                  item.removeAttribute("parent_hidden");
                 } else {
                   item.setAttribute("parent_hidden", "");
                 }
                });
              break;
            case (label.match(/^mobile/) || {}).input:
              if (isVisible) {
                // Set an attribute to show this region (strip the mobile prefix)
                this._menuItem.setAttribute(`show_${label.slice(7)}`, "");
                if (this._slots[label.slice(7)]) this._slots[label.slice(7)].removeAttribute("hidden");
                node.removeAttribute("hidden");
              } else {
                this._menuItem.removeAttribute(`show_${label.slice(7)}`);
                if (this._slots[label.slice(7)]) this._slots[label.slice(7)].setAttribute("hidden", "");
                node.setAttribute("hidden", "");
              }
              break;
            default:
              node.visible = isVisible;
              break;
          }
        });
      }
    });
  }

  _init() {
    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    // Initial position of this element from the top of the screen
    this.top = this.getBoundingClientRect().top || 0;

    // Get all nav items contained in this element
    this.navItems = [...this.querySelectorAll("pfe-navigation-item")];

    // Add the menu element to the list of navigation items
    // do this manually because menu item is in the shadow dom
    if (this._menuItem) this.navItems.push(this._menuItem);

    // Attach a reference to the navigation container to the children
    this.navItems.forEach(item => {
      item.navigationWrapper = this;
    });

    // Connect the shadow menu with the main component
    let mainNav = this.querySelector("pfe-navigation-main");
    if (mainNav && mainNav.navItems) {
      mainNav.navItems.forEach(item => {
        item.parent = this._menuItem;
      });
    }

    // Remove focusability from mobile links
    Object.keys(this.slots).forEach(section => {
      if (section.match(/^mobile-(login|language)/)) {
        this.slots[section].nodes.forEach(node => {
          node.setAttribute("tabindex", -1);
        });
      }
    });

    // Start by setting the visibility of the slots
    this._setVisibility(this.offsetWidth);

    // If the nav is set to sticky, inject the height of the nav to the next element in the DOM
    if(this.hasAttribute("pfe-sticky") && this.getAttribute("pfe-sticky") != "false") {
      // Run the sticky check on first page load
      this._stickyHandler();

      // Attach the scroll event to the window
      window.addEventListener("scroll", this._stickyHandler);
    }

    // Listen for clicks outside the navigation element
    if(this.hasAttribute("pfe-close-on-click") && this.getAttribute("pfe-close-on-click") === "external") {
      document.addEventListener("click", this._outsideListener);
    }

    // @IE11 This is necessary so the script doesn't become non-responsive
    if (window.ShadyCSS) {
      setTimeout(() => {
        this._observer.observe(this, {
          childList: true,
          subtree: true,
          characterData: true
        });
      }, 0);
    }
  }
}

PFElement.create(PfeNavigationItem);
PFElement.create(PfeNavigationMain);
PFElement.create(PfeNavigation);

export default PfeNavigation;
//# sourceMappingURL=pfe-navigation.js.map
