import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-icon/dist/pfe-icon.js';

// @POLYFILL  Array.prototype.findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, "findIndex", {
    value: function (predicate) {
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
    },
  });
}

/*!
 * PatternFly Elements: PfeAccordion 1.12.3
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
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle{background-color:#fff!important;color:#151515!important}}:host{position:relative;display:block;outline:0;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));-webkit-box-shadow:0 5px 4px transparent;box-shadow:0 5px 4px transparent;-webkit-box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);--pfe-icon--color:var(--pfe-accordion--Color, var(--pfe-broadcasted--text, #3c3f42));--pfe-icon--size:14px}:host([hidden]){display:none}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}#heading{margin:0}.pf-c-accordion__toggle{cursor:pointer;outline:0;position:relative;width:100%;margin:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;gap:calc(1rem * 1.5);gap:calc(var(--pfe-theme--container-padding,1rem) * 1.5);padding:1rem calc(1rem * 1.5);padding:var(--pfe-accordion--Padding,var(--pfe-theme--container-padding,1rem) calc(var(--pfe-theme--container-padding,1rem) * 1.5));background-color:transparent;color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));text-align:left;font-family:"Red Hat Display",RedHatDisplay,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif);font-size:1.25rem;font-size:var(--pfe-accordion--FontSize--header,var(--pf-global--FontSize--xl,1.25rem));font-weight:400;font-weight:var(--pfe-accordion--FontWeight--header,var(--pfe-theme--font-weight--normal,400));text-align:left;text-align:var(--pfe-accordion--TextAlign,left);line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);--_typography-offset:calc((1em * var(--pfe-theme--line-height, 1.5) - 1em) / 2);border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-width:1px;border-width:var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px));border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-right-color:transparent;border-left-color:transparent}.pf-c-accordion__toggle::before{position:absolute;content:"";top:-2px;left:-2px;width:calc(100% + 3px);width:calc(100% + var(--pfe-theme--ui--border-width--active,3px));height:calc(100% + 3px);height:calc(100% + var(--pfe-theme--ui--border-width--active,3px));border-radius:2px;border-radius:var(--pfe-theme--ui--border-radius,2px);border:2px solid transparent;border:var(--pfe-theme--ui--border-width--md,2px) var(--pfe-theme--ui--border-style,solid) transparent}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle::before{height:100%}}.pf-c-accordion__toggle:focus::before{border-color:#6b9ff0}.pf-c-accordion__toggle:focus:not(:focus-visible)::before{border:unset}.pf-c-accordion__toggle .pf-c-accordion__toggle-icon{--_typography-offset:calc((1em * var(--pfe-theme--line-height, 1.5) - var(--pfe-icon--size, 14px)) / 2)}.pf-c-accordion__toggle .pf-c-accordion__toggle-text{margin-top:calc(-1 * 5px);margin-top:calc(-1 * var(--_typography-offset,5px));margin-bottom:calc(-1 * 5px);margin-bottom:calc(-1 * var(--_typography-offset,5px))}.pf-c-accordion__toggle .pf-c-accordion__toggle-icon{margin-top:calc(5px / 4);margin-top:calc(var(--_typography-offset,5px)/ 4)}:host(:not(:first-of-type)) .pf-c-accordion__toggle{border-top-width:0}.pf-c-accordion__toggle::after{position:absolute;content:"";top:-1px;left:-1px;bottom:-1px;background-color:transparent;background-color:var(--pfe-accordion--accent,transparent);width:calc(3px - -1px);width:calc(var(--pfe-accordion--accent--width,var(--pfe-theme--surface--border-width--active,3px)) - -1px);height:calc(100% - -1px - -1px);z-index:4;z-index:calc(3 + 1);z-index:calc(var(--pfe-accordion--ZIndex,3) + 1)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle::after:active,.pf-c-accordion__toggle::after:hover,:host(.animating) .pf-c-accordion__toggle::after,:host(:not([expanded])) .pf-c-accordion__toggle::after:focus,:host([expanded]) .pf-c-accordion__toggle::after{background-color:#06c;background-color:var(--pfe-theme--color--ui-accent,#06c)}}.pf-c-accordion__toggle:active,.pf-c-accordion__toggle:hover,:host(:not([expanded])) .pf-c-accordion__toggle:focus{--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--active, var(--pfe-theme--color--surface--lighter, #f0f0f0));--pfe-accordion--Color:var(--pfe-accordion--Color--active, var(--pfe-broadcasted--text, #3c3f42))}:host(:not([expanded])) .pf-c-accordion__toggle:active,:host(:not([expanded])) .pf-c-accordion__toggle:focus,:host(:not([expanded])) .pf-c-accordion__toggle:hover{--pfe-accordion--accent:var(--pfe-accordion--accent--active, var(--pfe-theme--color--ui-accent, #06c))}:host([on=dark]) .pf-c-accordion__toggle:active,:host([on=dark]) .pf-c-accordion__toggle:hover,:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:focus{--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--active, rgba(247, 247, 249, 0.1));--pfe-accordion--Color:var(--pfe-accordion--Color--active, var(--pfe-broadcasted--text, #3c3f42))}:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:active,:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:focus,:host([on=dark]:not([expanded])) .pf-c-accordion__toggle:hover{--pfe-accordion--accent:var(--pfe-accordion--accent--active, var(--pfe-theme--color--ui-accent--on-dark, #73bcf7))}:host([on=saturated]) .pf-c-accordion__toggle:active,:host([on=saturated]) .pf-c-accordion__toggle:hover,:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:focus{--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--active, rgba(0, 0, 0, 0.2));--pfe-accordion--Color:var(--pfe-accordion--Color--active, var(--pfe-broadcasted--text, #3c3f42))}:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:active,:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:focus,:host([on=saturated]:not([expanded])) .pf-c-accordion__toggle:hover{--pfe-accordion--accent:var(--pfe-accordion--accent--active, var(--pfe-theme--color--ui-accent--on-saturated, #fff))}:host(.animating) .pf-c-accordion__toggle,:host([expanded]) .pf-c-accordion__toggle{border-bottom-width:0}:host(.animating) .pf-c-accordion__toggle,:host([disclosure]:not([disclosure=false])) .pf-c-accordion__toggle,:host([expanded]) .pf-c-accordion__toggle{border-right-color:#d2d2d2;border-right-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-left-color:#d2d2d2;border-left-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2))}:host([disclosure]:not([disclosure=false])) .pf-c-accordion__toggle{gap:calc(1rem / 2);gap:calc(var(--pfe-theme--container-padding,1rem)/ 2);font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);font-size:1rem;font-size:var(--pfe-accordion--FontSize--header,var(--pf-global--FontSize--md,1rem));font-weight:600;font-weight:var(--pfe-accordion--FontWeight--header,var(--pfe-theme--font-weight--semi-bold,600))}.pf-c-accordion__toggle-wrapper{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-box-pack:start;-webkit-justify-content:flex-start;-ms-flex-pack:start;justify-content:flex-start;gap:calc(1rem * 1.5);gap:calc(var(--pfe-theme--container-padding,1rem) * 1.5)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle-wrapper::after{content:"";position:absolute;top:calc(1rem + 14px);top:calc(var(--pfe-theme--container-spacer,1rem) + 14px);display:block;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);height:14px;width:14px;-webkit-transition:-webkit-transform .15s;transition:-webkit-transform .15s;transition:transform .15s;transition:transform .15s,-webkit-transform .15s;border-width:0 2px 2px 0;-webkit-transform:rotate(-45deg);transform:rotate(-45deg);right:calc(1rem * 1.3125);right:calc(var(--pfe-theme--container-spacer,1rem) * 1.3125);top:1em!important}:host(.animating) .pf-c-accordion__toggle-wrapper::after,:host([expanded]) .pf-c-accordion__toggle-wrapper::after{-webkit-transform:rotate(45deg);transform:rotate(45deg)}}.pf-c-accordion__toggle-text{max-width:80ch;max-width:var(--pfe-accordion--MaxWidth--content,80ch)}.pf-c-accordion__toggle-icon{-webkit-align-self:flex-start;-ms-flex-item-align:start;align-self:flex-start;-webkit-transition-property:-webkit-transform;transition-property:-webkit-transform;transition-property:transform;transition-property:transform,-webkit-transform;-webkit-transition-duration:.3s;transition-duration:.3s;-webkit-transition-duration:var(--pfe-theme--animation-speed,.3s);transition-duration:var(--pfe-theme--animation-speed,.3s);-webkit-transition-timing-function:cubic-bezier(.465,.183,.153,.946);transition-timing-function:cubic-bezier(.465,.183,.153,.946);-webkit-transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946))}:host([expanded]) .pf-c-accordion__toggle-icon{-webkit-transform:rotate(90deg);transform:rotate(90deg)}:host([disclosure]:not([disclosure=false])) .pf-c-accordion__toggle-icon{-webkit-box-ordinal-group:0;-webkit-order:-1;-ms-flex-order:-1;order:-1}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){.pf-c-accordion__toggle-icon{display:none!important}}.pf-c-accordion__toggle-accents{-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1}:host{-webkit-transition-property:border,-webkit-box-shadow;transition-property:border,-webkit-box-shadow;transition-property:box-shadow,border;transition-property:box-shadow,border,-webkit-box-shadow;-webkit-transition-timing-function:cubic-bezier(.465,.183,.153,.946);transition-timing-function:cubic-bezier(.465,.183,.153,.946);-webkit-transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-transition-duration:calc(pfe-var(animation-speed)/ 2);transition-duration:calc(pfe-var(animation-speed)/ 2)}:host(.animating),:host([expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, var(--pfe-theme--color--surface--lightest, #fff));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text, #3c3f42));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent, #06c))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, 0 5px 4px rgba(140, 140, 140, 0.35))}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(247, 247, 249, 0.1));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-dark, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-dark, #73bcf7))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)}:host([on=saturated].animating),:host([on=saturated][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(0, 0, 0, 0.2));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-saturated, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-saturated, #fff))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)} /*# sourceMappingURL=pfe-accordion-header.min.css.map */</style>
<${this.headingTag || "h3"} id="heading">
    <button aria-expanded="${this.expanded ? `true` : `false`}" id="button" class="pf-c-accordion__toggle">
        <span class="pf-c-accordion__toggle-wrapper">
            <span class="pf-c-accordion__toggle-text">${this.headingText || "<slot></slot>"}</span>
            ${this.hasSlot("accents") ? `<span class="pf-c-accordion__toggle-accents"><slot name="accents"></slot></span>` : ""}
        </span>
        <pfe-icon icon="web-icon-caret-thin-right" on-fail="collapse" class="pf-c-accordion__toggle-icon"></pfe-icon>
    </button>
</${this.headingTag || "h3"}>`;
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

  // @TODO this is for navigation 1.0 updates
  // get isDirectLink() {
  //   return this.hasAttribute("is-direct-link");
  // }

  // get link() {
  //   return this.querySelector("a[href]");
  // }

  static get observer() {
    return {
      childList: true,
    };
  }

  static get properties() {
    return {
      _id: {
        type: String,
        default: (el) => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false,
      },
      ariaControls: {
        type: String,
        prefix: false,
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id",
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        observer: "_expandedChanged",
      },
    };
  }

  static get events() {
    return {
      change: `pfe-accordion:change`,
    };
  }

  constructor() {
    super(PfeAccordionHeader);

    this._init = this._init.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._observer = new MutationObserver(this._init);
    this._slotObserver = new MutationObserver(this._init);

    this._getHeaderElement = this._getHeaderElement.bind(this);

    this.headingTag = "h3";

    this.addEventListener("click", this._clickHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Capture the button and the text
    this.button = this.shadowRoot.querySelector(`.pf-c-accordion__toggle`);
    this._buttonText = this.button.querySelector(`.pf-c-accordion__toggle-text`);

    if (this.hasLightDOM()) this._init();
    else {
      this._observer.observe(this, PfeAccordionHeader.observer);
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this.removeEventListener("click", this._clickHandler);
    this._observer.disconnect();
  }

  _init() {
    this._observer.disconnect();

    const header = this._getHeaderElement();

    if (header) {
      this.headingTag = header.tagName ? header.tagName.toLowerCase() : "h3";
      this.headingText = header.textContent ? header.textContent.trim() : "";
    }

    // Update button text
    this._buttonText.innerHTML = this.headingText;

    // Remove the hidden attribute after upgrade
    this.removeAttribute("hidden");

    this._observer.observe(this, PfeAccordionHeader.observer);

    // @TODO this is for navigation 1.0 updates
    // Validate that headers with the `is-direct-link` attribute contain a link
    // if (this.isDirectLink && !this.link) {
    //   this.warn(`This component expects to find a link in the light DOM due to the "is-direct-link" attribute`);
    // }
  }

  _getHeaderElement() {
    // Check if there is no nested element or nested textNodes
    if (!this.firstElementChild && !this.firstChild) {
      this.warn(`No header content provided`);
      return;
    }

    if (this.firstElementChild && this.firstElementChild.tagName) {
      const htags = this.fetchElement(
        this.children,
        (el) => el.tagName && (el.tagName.match(/^H[1-6]/) || el.tagName === "P"),
        this._slotObserver
      );

      // If there is no content inside the slot, return empty with a warning
      if (htags.length === 0) {
        this.warn(`No heading information was provided.`);
        return;
      }
      // If there is more than 1 element in the slot, capture the first h-tag
      else if (htags.length > 1) {
        this.warn(`Heading currently only supports 1 tag; extra tags will be ignored.`);
        return htags[0];
      } else return htags[0];
    } else {
      const htag = document.createElement("h3");

      if (this.firstChild && this.firstChild.nodeType === "#text") {
        // If a text node was provided but no semantics, default to an h3
        htag.textContent = this.firstChild.textContent;
      } else {
        this.warn(`Header should contain at least 1 heading tag for correct semantics.`);

        // If incorrect semantics were used, create an H3 and try to capture the content
        htag.textContent = this.textContent;
      }

      return htag;
    }
  }

  _clickHandler(event) {
    this.emitEvent(PfeAccordionHeader.events.change, {
      detail: {
        expanded: !this.expanded,
        toggle: event.target,
      },
    });
  }

  _expandedChanged() {
    if (this.button) {
      this.button.setAttribute("aria-expanded", this.expanded ? "true" : "false");
    }
  }

  /**
   * Provides a standard way of fetching light DOM that may or may not be provided inside
   * of a slot; optional filtering of results and way to pass in an observer if you need to
   * track updates to the slot
   * @param  {NodeItem} el
   * @param  {function} filter [optional] Filter for the returned results of the NodeList
   * @param  {function} observer [optional] Pointer to the observer defined for that slot
   */
  fetchElement(els, filter, observer) {
    if (!els) return [];
    let nodes = [...els];

    // Parse the nodes for slotted content
    [...nodes]
      .filter((node) => node && node.tagName === "SLOT")
      .forEach((node) => {
        // Remove node from the list
        const idx = nodes.findIndex((item) => item === node);
        // Capture it's assigned nodes for validation
        let slotted = node.assignedNodes();
        // If slotted elements were found, add it to the nodeList
        if (slotted && slotted.length > 0) {
          // Remove the slot from the set, add the slotted content
          nodes.splice(idx, 1, ...slotted);
        } else {
          // If no content exists in the slot, check for default content in the slot template
          const defaults = node.children;
          if (defaults && defaults.length > 0) nodes[idx] = defaults[0];
        }

        // Attach the observer if provided to watch for updates to the slot
        // Useful if you are moving content from light DOM to shadow DOM
        if (typeof observer === "function") {
          observer.observer(node, PfeAccordionHeader.observer);
        }
      });

    if (typeof filter === "function") return nodes.filter(filter);
    else return nodes;
  }
}

/*!
 * PatternFly Elements: PfeAccordion 1.12.3
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
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:none;overflow:hidden;will-change:height}:host([expanded]){display:block;position:relative}:host(.animating){display:block;-webkit-transition:height .3s ease-in-out;transition:height .3s ease-in-out}.pf-c-accordion__expanded-content{position:relative;display:block;width:100%;padding:1rem;padding:var(--pfe-theme--container-padding,1rem)}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{background-color:#fff!important;color:#151515!important}}:host{display:block;position:relative;-webkit-transition:height .3s cubic-bezier(.465,.183,.153,.946);transition:height .3s cubic-bezier(.465,.183,.153,.946);-webkit-transition:height var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition:height var(--pfe-theme--animation-speed,.3s) var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));will-change:height;overflow-y:clip;height:0;width:100%;z-index:0;margin:0;padding:0;background-color:transparent;background-color:var(--pfe-accordion--BackgroundColor,transparent);color:#3c3f42;color:var(--pfe-accordion--Color,var(--pfe-broadcasted--text,#3c3f42));-webkit-box-shadow:0 5px 4px transparent;box-shadow:0 5px 4px transparent;-webkit-box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);box-shadow:var(--pfe-accordion--BoxShadow,0 5px 4px transparent);-webkit-box-sizing:border-box;box-sizing:border-box;border-style:solid;border-style:var(--pfe-theme--surface--border-style,solid);border-color:#d2d2d2;border-color:var(--pfe-accordion--BorderColor,var(--pfe-theme--color--surface--border,#d2d2d2));border-width:1px;border-width:var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px));border-top-width:0;border-bottom-width:0}:host *,:host ::after,:host ::before{-webkit-box-sizing:border-box;box-sizing:border-box}:host ::slotted(*){--pfe-accordion--BoxShadow:none}:host::after{position:absolute;content:"";bottom:calc(-1 * 1px);bottom:calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px)));left:calc(-1 * 1px);left:calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px)));background-color:transparent;background-color:var(--pfe-accordion--accent,transparent);width:calc(3px - calc(-1 * 1px));width:calc(var(--pfe-accordion--accent--width,var(--pfe-theme--surface--border-width--active,3px)) - calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px))));height:calc(100% - calc(-1 * 1px));height:calc(100% - calc(-1 * var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px))));z-index:calc(3 + 1);z-index:calc(var(--pfe-accordion--ZIndex,3) + 1)}.pf-c-accordion__expanded-content{display:inline-block;padding:1rem calc(1rem * 1.5);padding:var(--pfe-accordion--Padding,var(--pfe-theme--container-padding,1rem) calc(var(--pfe-theme--container-padding,1rem) * 1.5))}.pf-c-accordion__expanded-content::after{clear:both;content:"";display:table}:host([disclosure=true]) .pf-c-accordion__expanded-content{padding:0 calc(1rem * 3) calc(1rem) calc(1rem * 1.5);padding:var(--pfe-accordion__panel-container--Padding,0 calc(var(--pfe-theme--container-padding,1rem) * 3) calc(var(--pfe-theme--container-padding,1rem)) calc(var(--pfe-theme--container-padding,1rem) * 1.5))}:host(:not([full-width])) .pf-c-accordion__expanded-content{max-width:80ch;max-width:var(--pfe-accordion--MaxWidth--content,80ch)}:host(.animating){border-left-color:transparent;border-left-color:var(--pfe-accordion--accent,transparent)}:host([expanded]:not(.animating)){overflow:visible;margin-bottom:0;border-bottom-width:1px;border-bottom-width:var(--pfe-accordion--BorderWidth,var(--pfe-theme--surface--border-width,1px));opacity:1;height:auto}:host{-webkit-transition-property:border,-webkit-box-shadow;transition-property:border,-webkit-box-shadow;transition-property:box-shadow,border;transition-property:box-shadow,border,-webkit-box-shadow;-webkit-transition-timing-function:cubic-bezier(.465,.183,.153,.946);transition-timing-function:cubic-bezier(.465,.183,.153,.946);-webkit-transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));transition-timing-function:var(--pfe-theme--animation-timing,cubic-bezier(.465,.183,.153,.946));-webkit-transition-duration:calc(pfe-var(animation-speed)/ 2);transition-duration:calc(pfe-var(animation-speed)/ 2)}:host(.animating),:host([expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, var(--pfe-theme--color--surface--lightest, #fff));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text, #3c3f42));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent, #06c))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, 0 5px 4px rgba(140, 140, 140, 0.35))}:host([on=dark].animating),:host([on=dark][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(247, 247, 249, 0.1));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-dark, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-dark, #73bcf7))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)}:host([on=saturated].animating),:host([on=saturated][expanded]){--pfe-accordion--BackgroundColor:var(--pfe-accordion--BackgroundColor--expanded, rgba(0, 0, 0, 0.2));--pfe-accordion--Color:var(--pfe-accordion--Color--expanded, var(--pfe-broadcasted--text--on-saturated, #fff));--pfe-accordion--accent:var(--pfe-accordion--accent--expanded, var(--pfe-theme--color--ui-accent--on-saturated, #fff))}:host([expanded]:not(.animating)){--pfe-accordion--BoxShadow:var(--pfe-accordion--BoxShadow--expanded, none)} /*# sourceMappingURL=pfe-accordion-panel.min.css.map */</style>
<div tabindex="-1">
  <div id="container" class="pf-c-accordion__expanded-content">
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
        default: (el) => `${el.randomId.replace("pfe", el.tag)}`,
        prefix: false,
      },
      role: {
        type: String,
        default: "region",
        prefix: false,
      },
      // @TODO Deprecated pfe-id in 1.0
      oldPfeId: {
        type: String,
        alias: "_id",
        attr: "pfe-id",
      },
      expanded: {
        title: "Expanded",
        type: Boolean,
        default: false,
        observer: "_expandedChanged"
      },
      ariaLabelledby: {
        type: String,
        prefix: false,
      },
    };
  }

  constructor() {
    super(PfeAccordionPanel);
  }

  connectedCallback() {
    super.connectedCallback();
    this._expandedChanged();
  }

  _expandedChanged() {
    if (this.expanded) {
      this.removeAttribute("aria-hidden");
      this.removeAttribute("tabindex");
    } else {
      this.setAttribute("aria-hidden", "true");
      this.setAttribute("tabindex", "-1");
    }
  }
}

/*!
 * PatternFly Elements: PfeAccordion 1.12.3
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
    return "1.12.3";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:block;position:relative;overflow:hidden;margin:0;width:100%;width:var(--pfe-accordion--Width,100%)}:host{overflow:visible}:host([hidden]){display:none} /*# sourceMappingURL=pfe-accordion.min.css.map */</style>
<slot></slot>`;
  }

  static get tag() {
    return "pfe-accordion";
  }

  static get meta() {
    return {
      title: "Accordion",
      description: "This element renders content sets in an expandable format.",
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
        cascade: ["pfe-accordion-header", "pfe-accordion-panel"],
      },
      // @TODO: Deprecated pfe-disclosure in 1.0
      oldDisclosure: {
        type: String,
        alias: "disclosure",
        attr: "pfe-disclosure",
      },
      // Do not set a default of 0, it causes a the URL history to
      // be updated on load for every tab; infinite looping goodness
      // Seriously, don't set a default here unless you do a rewrite
      expandedIndex: {
        title: "Expanded index(es)",
        type: String,
        observer: "_expandedIndexHandler",
      },
      history: {
        title: "History",
        type: Boolean,
        default: false,
        observer: "_historyHandler",
      },
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
              $ref: "pfe-accordion-header",
            },
            {
              $ref: "pfe-accordion-panel",
            },
          ],
        },
      },
    };
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      expand: `${this.tag}:expand`,
      collapse: `${this.tag}:collapse`,
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
    this.expandedSets = [];

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
        customElements.whenDefined(PfeAccordionPanel.tag),
      ]).then(this._init);
    }

    this.addEventListener(PfeAccordion.events.change, this._changeHandler);
    this.addEventListener("keydown", this._keydownHandler);

    // Set up the observer on the child tree
    this._observer.observe(this, {
      childList: true,
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

    this.emitEvent(PfeAccordion.events.expand, {
      detail: {
        toggle: header,
        panel: panel,
      },
    });
  }

  /**
   * Expands all accordion items.
   */
  expandAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach((header) => this._expandHeader(header));
    panels.forEach((panel) => this._expandPanel(panel));
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

    this.emitEvent(PfeAccordion.events.collapse, {
      detail: {
        toggle: header,
        panel: panel,
      },
    });
  }

  /**
   * Collapses all accordion items.
   */
  collapseAll() {
    const headers = this._allHeaders();
    const panels = this._allPanels();

    headers.forEach((header) => this._collapseHeader(header));
    panels.forEach((panel) => this._collapsePanel(panel));
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
    headers.forEach((header) => {
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

    // If this index is not already listed in the expandedSets array, add it
    if (this.expandedSets.indexOf(index) < 0 && index > -1) this.expandedSets.push(index);

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
    let idx = this.expandedSets.indexOf(index);
    if (idx >= 0) this.expandedSets.splice(idx, 1);

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

    if (!(currentHeader instanceof customElements.get(PfeAccordionHeader.tag))) {
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
    else return this.children.filter((el) => el.tagName.toLowerCase() === "pfe-accordion-header");
  }

  _allPanels() {
    if (!this.isIE11) return [...this.querySelectorAll(`:scope > pfe-accordion-panel`)];
    else return this.children.filter((el) => el.tagName.toLowerCase() === "pfe-accordion-panel");
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
    let newIndex = headers.findIndex((header) => header === document.activeElement) - 1;
    return headers[(newIndex + headers.length) % headers.length];
  }

  _nextHeader() {
    const headers = this._allHeaders();
    let newIndex = headers.findIndex((header) => header === document.activeElement) + 1;
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
    const indexes = newVal.split(",").map((idx) => parseInt(idx, 10) - 1);
    indexes.reverse().forEach((index) => this.expand(index));
  }

  _getIndex(_el) {
    if (this._isHeader(_el)) {
      const headers = this._allHeaders();
      return headers.findIndex((header) => header.id === _el.id);
    }

    if (this._isPanel(_el)) {
      const panels = this._allPanels();
      return panels.findIndex((panel) => panel.id === _el.id);
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
      return indexes.map((item) => parseInt(item.trim(), 10) - 1);
    }
  }

  /**
   * This handles updating the URL parameters based on the current state
   * of the global this.expanded array
   * @requires this.expandedSets {Array}
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
    const openIndexes = this.expandedSets
      .map((item) => item + 1)
      .sort((a, b) => a - b)
      .join("-");

    // If values exist in the array, add them to the parameter string
    if (this.expandedSets.length > 0) urlParams.set(this.id, openIndexes);
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
    indexesFromURL.forEach((idx) => this.expand(idx));
    this._updateHistory = true;
  }
}

PFElement.create(PfeAccordionHeader);
PFElement.create(PfeAccordionPanel);
PFElement.create(PfeAccordion);

export default PfeAccordion;
//# sourceMappingURL=pfe-accordion.js.map
