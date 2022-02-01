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

export default PfeAccordionPanel;
