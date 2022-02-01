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

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeIcon from "../../pfe-icon/dist/pfe-icon.js";

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

export default PfeAccordionHeader;
