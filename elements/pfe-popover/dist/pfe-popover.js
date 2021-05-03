import PfeAbsolutePosition from '../../pfe-absolute-position/dist/pfe-absolute-position.js';
import '../../pfe-icon/dist/pfe-icon.js';
import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfePopover 1.6.0
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

class PfePopover extends PfeAbsolutePosition {

  // Injected at build-time
  static get version() {
    return "1.6.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:block;position:absolute;z-index:99999}:host([hidden]){display:none}@-webkit-keyframes keyFrameScaleUp{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes keyFrameScaleUp{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes keyFrameScaleDown{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0);transform:scale(0)}}@keyframes keyFrameScaleDown{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0);transform:scale(0)}}@-webkit-keyframes keyFrameFadeInOpacity{0%{opacity:0}100%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@keyframes keyFrameFadeInOpacity{0%{opacity:0}100%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@-webkit-keyframes keyFrameFadeOutOpacity{0%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}100%{opacity:0}}@keyframes keyFrameFadeOutOpacity{0%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}100%{opacity:0}}@-webkit-keyframes keyFrameSlideDownIn{0%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}10%{opacity:.2}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@keyframes keyFrameSlideDownIn{0%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}10%{opacity:.2}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@-webkit-keyframes keyFrameSlideDownOut{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}10%{opacity:.2}100%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}}@keyframes keyFrameSlideDownOut{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}10%{opacity:.2}100%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}}.fade-in-animation{opacity:0;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-delay:var(--simple-tooltip-delay-in,0ms);animation-delay:var(--simple-tooltip-delay-in,0ms);-webkit-animation-name:keyFrameFadeInOpacity;animation-name:keyFrameFadeInOpacity;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-duration:.1s;animation-duration:.1s;-webkit-animation-duration:var(--simple-tooltip-duration-in,100ms);animation-duration:var(--simple-tooltip-duration-in,100ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.fade-out-animation{opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-delay:var(--simple-tooltip-delay-out,0ms);animation-delay:var(--simple-tooltip-delay-out,0ms);-webkit-animation-name:keyFrameFadeOutOpacity;animation-name:keyFrameFadeOutOpacity;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-duration:.1s;animation-duration:.1s;-webkit-animation-duration:var(--simple-tooltip-duration-out,100ms);animation-duration:var(--simple-tooltip-duration-out,100ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.scale-up-animation{-webkit-transform:scale(0);transform:scale(0);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-in,500ms);animation-delay:var(--simple-tooltip-delay-in,500ms);-webkit-animation-name:keyFrameScaleUp;animation-name:keyFrameScaleUp;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-in,500ms);animation-duration:var(--simple-tooltip-duration-in,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.scale-down-animation{-webkit-transform:scale(1);transform:scale(1);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameScaleDown;animation-name:keyFrameScaleDown;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-down-animation{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0;-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameSlideDownIn;animation-name:keyFrameSlideDownIn;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-down-animation-out{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameSlideDownOut;animation-name:keyFrameSlideDownOut;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:cubic-bezier(.4,0,1,1);animation-timing-function:cubic-bezier(.4,0,1,1);-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.cancel-animation{-webkit-animation-delay:-30s!important;animation-delay:-30s!important}.hidden{display:none!important}:host{display:block}:host([hidden]){display:none}.pf-c-popover{font-size:16px;font-size:var(--pfe-popover--Fonsize,16px);position:relative;position:var(--pfe-popover--Position,relative);min-width:360px;min-width:var(--pfe-popover--MinWidth,360px);max-width:360px;max-width:var(--pfe-popover--MaxWidth,360px);-webkit-box-shadow:0 7px 15px #00000026;box-shadow:0 7px 15px #00000026;-webkit-box-shadow:var(--pfe-popover--BoxShadow,0 7px 15px #00000026);box-shadow:var(--pfe-popover--BoxShadow,0 7px 15px #00000026);background-color:#fff;background-color:var(--pfe-popover--BackgroundColor,#fff);color:#151515;color:var(--pfe-popover--Color,#151515);outline:transparent}.pf-c-popover .pf-c-popover__arrow{width:30px;width:var(--pfe-popover__arrow--Width,30px);height:30px;height:var(--pfe-popover__arrow--Height,30px);position:absolute;position:var(--pfe-popover__arrow--Position,absolute);background-color:#fff;background-color:var(--pfe-popover--BackgroundColor,#fff)}.pf-c-popover.pf-m-top .pf-c-popover__arrow{-webkit-transform:translate(-50%,50%) rotate(45deg);transform:translate(-50%,50%) rotate(45deg);-webkit-transform:var(--pfe-popover__arrow--top--Transform,translate(-50%,50%) rotate(45deg));transform:var(--pfe-popover__arrow--top--Transform,translate(-50%,50%) rotate(45deg));left:50%;left:var(--pfe-popover__arrow--top--Left,50%);bottom:0;bottom:var(--pfe-popover__arrow--top--Bottom,0);-webkit-box-shadow:0 3px 4px #0000000D;box-shadow:0 3px 4px #0000000D}.pf-c-popover.pf-m-bottom{-webkit-transform:translateY(20px);transform:translateY(20px)}.pf-c-popover.pf-m-bottom .pf-c-popover__arrow{top:0;top:var(--pfe-popover__arrow--bottom--Top,0);left:50%;left:var(--pfe-popover__arrow--bottom--Left,50%);-webkit-transform:translate(-50%,-50%) rotate(45deg);transform:translate(-50%,-50%) rotate(45deg);-webkit-transform:var(--pfe-popover__arrow--bottom--Transform,translate(-50%,-50%) rotate(45deg));transform:var(--pfe-popover__arrow--bottom--Transform,translate(-50%,-50%) rotate(45deg));-webkit-box-shadow:0 -3px 4px #0000000D;box-shadow:0 -3px 4px #0000000D}.pf-c-popover.pf-m-left .pf-c-popover__arrow{-webkit-transform:translate(50%,-50%) rotate(45deg);transform:translate(50%,-50%) rotate(45deg);-webkit-transform:var(--pfe-popover__arrow--left--Transform,translate(50%,-50%) rotate(45deg));transform:var(--pfe-popover__arrow--left--Transform,translate(50%,-50%) rotate(45deg));top:50%;top:var(--pfe-popover__arrow--left--Top,50%);right:0;right:var(--pfe-popover__arrow--left--Right,0);-webkit-box-shadow:3px 0 4px #0000000D;box-shadow:3px 0 4px #0000000D}.pf-c-popover.pf-m-right{-webkit-transform:translateX(20px);transform:translateX(20px)}.pf-c-popover.pf-m-right .pf-c-popover__arrow{-webkit-transform:translate(-50%,-50%) rotate(45deg);transform:translate(-50%,-50%) rotate(45deg);-webkit-transform:var(--pfe-popover__arrow--right--Transform,translate(-50%,-50%) rotate(45deg));transform:var(--pfe-popover__arrow--right--Transform,translate(-50%,-50%) rotate(45deg));top:50%;top:var(--pfe-popover__arrow--right--Top,50%);right:var(--pfe-popover__arrow--right--Right);-webkit-box-shadow:-3px 0 4px #0000000D;box-shadow:-3px 0 4px #0000000D}.pf-c-popover__content{position:relative;padding:24px;padding:var(--pfe-popover__content--Padding,24px);background-color:#fff;background-color:var(--pfe-popover--BackgroundColor,#fff)}.pf-c-popover__content #header::slotted(*),.pf-c-popover__content>.pf-c-title{font-family:"Red Hat Display",RedHatDisplay,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif);font-size:1.25rem;font-size:var(--pf-c-title--m-xl--FontSize,var(--pf-global--FontSize--xl,1.25rem));line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);font-weight:500;font-weight:var(--pfe-popover__header--FontWeight,500);margin-top:0;margin-bottom:8px;margin-bottom:var(--pfe-popover__header--MarginBottom,8px)}.pf-c-popover__content #header::slotted(*):not(:last-child),.pf-c-popover__content>.pf-c-title:not(:last-child){margin-bottom:1rem;margin-bottom:var(--pfe-theme--content-spacer--heading--sm,1rem)}.pf-c-popover__content>.pf-c-button{position:absolute;position:var(--pfe-popover__closeButton--Position,absolute);top:24px;top:var(--pfe-popover__closeButton--Top,24px);right:24px;right:var(--pfe-popover__closeButton--Right,24px);color:#6b6e74;color:var(--pfe-popover__closeButton--Color,#6b6e74);background-color:transparent;border-color:transparent}.pf-c-popover__content>.pf-c-button:hover{color:#151515;color:var(--pfe-popover__closeButton--hover--Color,#151515)}.pf-c-popover__content>.pf-c-button:focus{color:#151515;color:var(--pfe-popover__closeButton--hover--Color,#151515)}.pf-c-popover__content>.pf-c-button+*{padding-right:var(--pf-c-popover--c-button--sibling--PaddingRight)}.pf-c-popover__body{word-wrap:break-word}.pf-c-popover__footer{margin-top:16px;margin-top:var(--pfe-popover__footer--MarginTop,16px)}.pf-c-popover__button-group{margin-left:calc(24px / -2);margin-left:calc(var(--pfe-popover__buttonGroup--gap,24px)/ -2);margin-right:calc(24px / -2);margin-right:calc(var(--pfe-popover__buttonGroup--gap,24px)/ -2)}.pf-c-popover__button-group slot::slotted(*){margin-left:calc(24px / 2);margin-left:calc(var(--pfe-popover__buttonGroup--gap,24px)/ 2);margin-right:calc(24px / 2);margin-right:calc(var(--pfe-popover__buttonGroup--gap,24px)/ 2)}@supports (gap:24px) and (display:flex){.pf-c-popover__button-group{margin-left:unset;margin-right:unset;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-column-gap:24px;-moz-column-gap:24px;column-gap:24px;-webkit-column-gap:var(--pfe-popover__buttonGroup--gap,var(--X-pfe-popover__buttonGroup--gap,24px));-moz-column-gap:var(--pfe-popover__buttonGroup--gap,var(--X-pfe-popover__buttonGroup--gap,24px));column-gap:var(--pfe-popover__buttonGroup--gap,var(--X-pfe-popover__buttonGroup--gap,24px));row-gap:unset;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap}.pf-c-popover__button-group slot::slotted(*){margin-left:unset;margin-right:unset}}:host([theme=dark]){--pfe-popover--Color:var(--pfe-popover--dark--Color, #fff);--pfe-popover--BackgroundColor:var(--pfe-popover--dark--BackgroundColor, #151515);--pfe-popover__closeButton--Color:var(--pfe-popover--dark__closeButton--Color, #fff)}:host([theme=dark]) .pf-c-button:focus,:host([theme=dark]) .pf-c-button:hover{--pfe-popover__closeButton--hover--Color:var(--pfe-popover--dark__closeButton--hover--Color, #D2D2D2)} /*# sourceMappingURL=pfe-popover.min.css.map */</style>
<div id="tooltip" class="pf-c-popover pf-m-${this.position} hidden" role="dialog" aria-modal="true" aria-hidden="true" tabindex="-1">
  <div class="pf-c-popover__arrow"></div>
  <div class="pf-c-popover__content">
    <button id="close-button" class="pf-c-button pf-m-plain" type="button" aria-label="Close" tabindex="0">
      ${this.renderCloseIcon()}
    </button>
    <h1 class="pf-c-title pf-m-md" id="popover-top-header"><slot id="header" name="header"></slot></h1>
    <div class="pf-c-popover__body" id="popover-top-body"><slot name="body"></slot></div>
    <footer class="pf-c-popover__footer">
      <slot name="footer"></slot>
      <div class="pf-c-popover__button-group">
        <slot name="button-group"></slot>
      </div>
    </footer>
    <div class="pf-c-popover__focus-trap" tabindex="0"></div>
  </div>
</div>`;
  }

  static get tag() {
    return "pfe-popover";
  }

  static get meta() {
    return {
      title: "Popover",
      description: "An in-app messaging that provides more information on specific product areas."
    };
  }

  get templateUrl() {
    return "pfe-popover.html";
  }

  get styleUrl() {
    return "pfe-popover.scss";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  static get properties() {
    return {
      ...super.properties,
      theme: {
        title: "Theme",
        // Valid types are: String, Boolean, and Number
        type: Boolean
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfePopover, { type: PfePopover.PfeType });
    // enable auto position for absolute position behavior
    this.auto = true;
    if (!this.hasAttribute("offset")) this.offset = 8;
    this.mode = "click";
    this.positionAlign = "left";
  }

  connectedCallback() {
    super.connectedCallback();
    // @todo make sure these still work if we call render() again.
    this._closeButton = this.shadowRoot.querySelector("#close-button");
    this._tooltip = this.shadowRoot.querySelector("#tooltip");
    this._initialFocus = this._tooltip;
    this.shadowRoot
      .querySelector(".pf-c-popover__focus-trap")
      .addEventListener("focus", this._focusTrapHandler.bind(this));
    this.shadowRoot.querySelector("#close-button").addEventListener("click", this._clickHandler.bind(this));

    // set a11y states
    if (this.hasSlot("title")) {
      this._tooltip.setAttribute("aria-labeledby", "popover-top-header");
    }
    if (this.hasSlot("body")) {
      this._tooltip.setAttribute("aria-describedby", "popover-top-body");
    }

    // set correct button group settings
    this._setButtonGroupState();
  }

  // @todo this should be its own element
  _setButtonGroupState() {
    const buttonGroupSlot = this.shadowRoot.querySelector(`slot[name="button-group"]`);
    const children = buttonGroupSlot.assignedNodes({ flatten: true });
    // if the first child is a pfe-button then we will
    if (children[0]) {
      if (children[0].tagName === "PFE-BUTTON") {
        // @todo this needs to set an internal variable and leave a public empty variable.
        this.style.setProperty("--X-pfe-popover__buttonGroup--gap", "16px");
      }
    }
  }

  renderCloseIcon() {
    return `<svg style="vertical-align:-0.125em" fill="currentColor" height="1rem" width="1rem" viewBox="0 0 352 512" aria-hidden="true" role="img" aria-describedby="pf-tooltip-182" xmlns="http://www.w3.org/2000/svg"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>`;
  }

  _focusTrapHandler(event) {
    if (event.target.classList.contains("pf-c-popover__focus-trap")) {
      // Return focus to the close button which is the first in line
      // which will create a focus trap loop.
      this._closeButton.focus();
    }
  }

  _clickHandler(event) {
    this.hide();
  }

  // When the target is found we are going to make sure it has the correct a11y settings
  targetUpdated(target) {
    super.targetUpdated(target);
    if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "0");
    if (!target.hasAttribute("role")) target.setAttribute("role", "button");
    target.setAttribute("aria-expanded", "false");
  }

  /**
   * @todo We have to underscore this function because of unidirection data flow.
   *  We should see if we can do that without the underscore.
   */
  _show() {
    super._show();
    // Send focus into the popover
    this._initialFocus.focus();
    this.target.setAttribute("aria-expanded", "true");
    this._tooltip.setAttribute("aria-hidden", "false");
  }

  hide() {
    super.hide();
    // Send focus back to the target
    this.target.focus();
    this.target.setAttribute("aria-expanded", "false");
    this._tooltip.setAttribute("aria-hidden", "true");
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector("#close-button").removeEventListener("click", this._clickHandler.bind(this));
    this.shadowRoot.querySelector("#focus-trap").removeEventListener("focus", this._focusTrapHandler.bind(this));
    super.disconnectedCallback();
  }
}

PFElement.create(PfePopover);

export default PfePopover;
//# sourceMappingURL=pfe-popover.js.map
