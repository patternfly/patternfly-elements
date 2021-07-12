import PFElement from '../../pfelement/dist/pfelement.js';
import '../../pfe-accordion/dist/pfe-accordion.js';

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

// @POLYFILL  Element.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    do {
      if (el.matches(s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

/*!
 * PatternFly Elements: PfeJumpLinks 1.10.1
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

// @TODO This needs a click handler for if the accordion is stuck to the top
// and the user clicks outside the accordion element (should close accordion).
class PfeJumpLinksNav extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.10.1";
  }

  // Injected at build-time
  get html() {
    return `
<style>slot[name=heading][sr-only]{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}:host{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);display:block;position:-webkit-sticky;position:sticky;z-index:80;z-index:var(--pfe-theme--zindex--jumplinks,80);top:0;padding:0}@media (min-width:992px){:host([horizontal][color=darkest]){background-color:#151515;background-color:var(--pfe-theme--color--surface--darkest,#151515);--context:var(--pfe-theme--color--surface--darkest--context, dark);--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}}@media (min-width:992px){:host([horizontal][color=darker]){background-color:#3c3f42;background-color:var(--pfe-theme--color--surface--darker,#3c3f42);--context:var(--pfe-theme--color--surface--darker--context, dark);--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted--on-dark, #d2d2d2);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}}@media (min-width:992px){:host([horizontal][color=lightest]){background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);--context:var(--pfe-theme--color--surface--lightest--context, light);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}}@media (min-width:992px){:host([horizontal][color=lighter]){background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);--context:var(--pfe-theme--color--surface--lighter--context, light);--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--text--muted:var(--pfe-theme--color--text--muted, #6a6e73);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}}:host([stuck][horizontal]){-webkit-box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06) 0 .0625rem .125rem 0 rgba(3,3,3,.2);box-shadow:0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06) 0 .0625rem .125rem 0 rgba(3,3,3,.2);-webkit-box-shadow:var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06)0 .0625rem .125rem 0 rgba(3,3,3,.2));box-shadow:var(--pfe-theme--box-shadow--sm,0 .0625rem .125rem 0 rgba(3,3,3,.12),0 0 .125rem 0 rgba(3,3,3,.06)0 .0625rem .125rem 0 rgba(3,3,3,.2))}.pfe-jump-links-nav__heading{margin-top:0;margin-bottom:.5rem;margin-bottom:var(--pfe-theme--content-spacer--body--sm,.5rem)}.pfe-jump-links-nav__heading h3,::slotted([slot=heading]){color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);margin:0;font-size:.875rem;font-size:var(--pfe-jump-links__heading--FontSize,var(--pf-global--FontSize--sm,.875rem));font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);text-transform:uppercase;text-transform:var(--pfe-jump-links__heading--TextTransform,uppercase)}slot[name=logo]{display:none}slot[name=cta]{display:none}nav{visibility:visible;margin:0;list-style:none;padding:0}pfe-accordion-panel nav{width:100%}@media (min-width:992px){:host([horizontal][no-header]) nav{padding-top:1px;padding-bottom:0}}#container{padding:32px 0}pfe-accordion-panel #container{padding:24px 0}ul{padding:0;margin:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}li{display:block;position:relative;margin-left:calc(1px * -1);margin-left:calc(var(--pfe-theme--surface--border-width,1px) * -1)}.sub-nav li{margin-left:0}li[expand] ul{height:auto;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}li[expand] .sub-nav{display:table;height:auto}li::before{position:absolute;content:"";top:0;left:0;width:4px;width:var(--pfe-theme--surface--border-width--heavy,4px);height:100%;background-color:transparent}li::before else{height:4px;height:var(--pfe-theme--surface--border-width--heavy,4px);width:100%}li :hover::before,li:not([expand]) li:hover::before{background-color:#d2d2d2;background-color:var(--pfe-theme--color--ui-disabled,#d2d2d2)}li[active]::before,li[expand]::before{background-color:#06c;background-color:var(--pfe-jump-links--accent,var(--pfe-jump-links--BorderColor,var(--pfe-theme--color--ui-accent,#06c)));z-index:2}a{position:relative;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);font-size:1rem;font-size:var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem));text-decoration:none;line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:calc(calc(1.5rem / 6) * 2) calc(calc(1.5rem / 3) * 2);padding:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) * 2) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}a,a:focus+ul>li>a,li:hover a,li[expand] a{display:table}li>a:hover,li[active]>a{color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}:host([on=dark]) a{color:#d2d2d2;color:var(--pfe-theme--color--text--muted--on-dark,#d2d2d2)}:host([on=saturated]) a{color:#d2d2d2;color:var(--pfe-theme--color--text--muted--on-saturated,#d2d2d2)}.has-sub-section a{padding-bottom:calc(1.5rem / 6);padding-bottom:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6))}.sub-section a{margin-left:calc(1rem * .75);margin-left:calc(var(--pfe-theme--container-spacer,1rem) * .75);font-size:calc(1rem * .85);font-size:calc(var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem)) * .85);padding:calc(1.5rem / 6) calc(calc(1.5rem / 3) * 2);padding:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}@media (min-width:992px){.sub-section a{display:none}}.sub-section a:last-child{padding-bottom:calc(1.5rem / 3);padding-bottom:var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3))}a:focus:focus-visible{outline:0}a:focus:focus-visible::after{position:absolute;content:"";top:0;left:0;width:calc(100% - 4px);width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:calc(100% - 4px);height:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);border:2px solid #06c;border:2px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--link,#06c)}ul ul{margin:0;padding:0;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear}ul ul,ul ul li{border-left:none!important}pfe-accordion{border:1px solid #d2d2d2;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2);--context:light;--pfe-accordion--BackgroundColor:var(--pfe-theme--color--surface--lightest, #fff)}:host([color=darkest]) pfe-accordion{--context:dark;--pfe-accordion--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-theme--color--ui-accent--on-dark:transparent}pfe-accordion,pfe-accordion-panel.animating,pfe-accordion-panel[expanded]{--pfe-accordion--accent:transparent;--pfe-accordion--BorderColor:transparent;--pfe-accordion--BorderColor--accent:transparent;--pfe-accordion--BorderTopWidth:0;--pfe-accordion--BorderBottomWidth:0;--pfe-accordion--panel-container--Padding:0 0 0 calc(var(--pfe-accordion__base--Padding,var(--pfe-theme--container-spacer,1rem)) * 1.5)}@media screen and (min-width:992px){:host([horizontal]){width:100%;background-color:#fff;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));--context:var(--pfe-jump-links--context, var(--pfe-theme--color--surface--lightest--context, light));z-index:calc(80 + 1);z-index:calc(var(--pfe-theme--zindex--jumplinks,80) + 1);border:none;padding:0}:host([horizontal]) .pfe-jump-links-nav__heading{-webkit-flex-basis:100%;-ms-flex-preferred-size:100%;flex-basis:100%;-webkit-align-self:center;-ms-flex-item-align:center;-ms-grid-row-align:center;align-self:center;-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;display:block;margin:0;padding-bottom:1rem;padding-bottom:var(--pfe-theme--container-padding,1rem);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}:host([horizontal]) .pfe-jump-links-nav__heading h3,:host([horizontal]) ::slotted([slot=heading]){text-align:center;text-align:var(--pfe-jump-links__heading--TextAlign,center)}:host([horizontal]) ::slotted([slot=logo]){position:absolute;max-height:calc(1rem * 3.5);max-height:calc(var(--pfe-theme--container-spacer,1rem) * 3.5);max-width:calc(1rem * 14);max-width:calc(var(--pfe-theme--container-spacer,1rem) * 14);top:1rem;top:var(--pfe-theme--container-spacer,1rem);left:calc(1rem * 4);left:calc(var(--pfe-theme--container-spacer,1rem) * 4)}:host([horizontal]) ::slotted([slot=cta]){position:absolute;top:calc(1rem * 1);top:calc(var(--pfe-theme--container-spacer,1rem) * 1);right:calc(1rem * 4);right:calc(var(--pfe-theme--container-spacer,1rem) * 4)}}@media screen and (min-width:992px){:host([horizontal]) nav{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-flow:row wrap;-ms-flex-flow:row wrap;flex-flow:row wrap;padding-top:32px;padding-bottom:8px;max-width:calc(992px - (var(--pfe-jump-links--Padding--horizontal) * 4));max-width:var(--pfe-jump-links--Width,calc(992px - (var(--pfe-jump-links--Padding--horizontal) * 4)))}}@media screen and (min-width:1200px){:host([horizontal]) nav{max-width:calc(1200px - (var(--pfe-jump-links--Padding--horizontal) * 4));max-width:var(--pfe-jump-links--Width,calc(1200px - (var(--pfe-jump-links--Padding--horizontal) * 4)))}}@media screen and (min-width:992px){:host([horizontal]) #container{padding:0;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([horizontal]) ul{border:none;text-align:center;-webkit-box-flex:1;-webkit-flex-grow:1;-ms-flex-positive:1;flex-grow:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin:0 auto}:host([horizontal]) li{margin-left:0;padding:0;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;margin-top:calc(1px * -1);margin-top:calc(var(--pfe-theme--surface--border-width,1px) * -1)}:host([horizontal]) li::before{height:4px;height:var(--pfe-theme--surface--border-width--heavy,4px);width:100%}:host([horizontal]) a{padding:16px;text-decoration:none;font-size:16px;color:var(--pfe-broadcasted--text--muted,)}:host([horizontal]) a:hover,:host([horizontal]) a[active]{color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}}:host([hidden]){display:none!important} /*# sourceMappingURL=pfe-jump-links-nav.min.css.map */</style>
${this.isMobile ? `
<pfe-accordion>
  <pfe-accordion-header>
    <slot class="pfe-jump-links-nav__heading" name="heading">
      <h3>${this.srText || "Jump to section"}</h3>
    </slot>
  </pfe-accordion-header>
  <pfe-accordion-panel>
` : ""}

<nav>
  ${!this.isMobile ? `<slot class="pfe-jump-links-nav__heading" name="heading"${this.noHeader ? " sr-only" : ""}>
    <h3>${this.srText || "Jump to section"}</h3>
  </slot>` : ""}
  ${this.horizontal ? `<slot class="pfe-jump-links-nav__logo" name="logo"></slot>` : ""}
  <div id="container"></div>
  ${this.horizontal ? `<slot class="pfe-jump-links-nav__cta" name="cta"></slot>` : ""}
</nav>

${this.isMobile ? `
  </pfe-accordion-panel>
</pfe-accordion>
` : ""}`;
  }

  static get tag() {
    return "pfe-jump-links-nav";
  }

  get templateUrl() {
    return "pfe-jump-links-nav.html";
  }

  get styleUrl() {
    return "pfe-jump-links-nav.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  /**
   * List of all events in the component
   */
  static get events() {
    return {
      activeNavItem: `pfe-jump-links-panel:active-navItem`,
      change: `pfe-jump-links-panel:change`,
      stuck: `pfe-jump-links-nav:stuck`,
      resize: `resize`,
      scroll: `scroll`,
      keyup: `keyup`,
    };
  }

  /**
   * Alias events to allow easier console logging
   */
  get events() {
    return PfeJumpLinksNav.events;
  }

  /**
   * Observe the children, subtree, and character changes to allow
   * custom-built navigation to migrate to shadow DOM if updated
   * @returns {Object} Mutation observer settings
   */
  static get observer() {
    return {
      childList: true,
      subtree: true,
      characterData: true,
    };
  }

  static get properties() {
    return {
      autobuild: {
        title: "Autobuild",
        type: Boolean,
      },
      horizontal: {
        title: "Horizontal",
        type: Boolean,
        default: false,
      },
      // @TODO: Document this more
      srText: {
        title: "Screen reader text",
        type: String,
        default: "Jump to section",
      },
      // Supports only lightest and darkest background colors
      color: {
        title: "Color",
        type: String,
        default: "lightest",
        values: ["lightest", "darkest"],
      },
      // @TODO Need to incorporate support for breakpoint customizations i.e., offset="@500px: 200, @800px: 150"
      offset: {
        title: "Offset",
        type: Number,
      },
      // Breakpoint at which the nav switches to an accordion
      mobileBreakpoint: {
        title: "Mobile breakpoint (max-width)",
        type: String,
      },
      accordionCollapseTiming: {
        title: "Number of ms to wait before collapsing the accordion on click",
        type: Number,
        default: 750,
      },
      // Reflects if the nav is stuck in place
      // @TODO note this in the documentation as a readonly property
      stuck: {
        title: "Stickiness state",
        type: Boolean,
        attr: "stuck",
        observer: "_stickyHandler",
      },
      noHeader: {
        title: "Opt-out of the header region",
        type: Boolean,
      },
      // @TODO: Deprecated in 2.0
      oldAutobuild: {
        alias: "autobuild",
        attr: "pfe-c-autobuild",
      },
      // @TODO: Deprecated in 2.0
      oldHorizontal: {
        alias: "horizontal",
        attr: "pfe-c-horizontal",
      },
      // @TODO: Deprecated in 2.0
      oldColor: {
        alias: "color",
        attr: "pfe-color",
      },
    };
  }

  /**
   * @requires {this.mobileBreakpoint || PFElement.breakpoint}
   * @returns {Boolean} true if this is at or below the mobile breakpoint
   */
  get isMobile() {
    if (this.mobileBreakpoint) return window.matchMedia(`(max-width: ${this.mobileBreakpoint})`).matches;

    // Default to the PFElement breakpoints
    const data = PFElement.breakpoint.lg.match(/([0-9]+)([a-z]*)/);
    if (data.length < 1) return "991px";

    // Subtract one because PFElement breakpoints uses mobile-first numbering
    return window.matchMedia(`(max-width: ${Number.parseInt(data[1], 10) - 1}${data[2]})`).matches;
  }

  /**
   * @returns {NodeItem} Slot assigned to heading or pfe-jump-links-nav--heading
   * @TODO deprecating pfe-jump-links-nav--heading slot in 2.0
   */
  get header() {
    return this.getSlot(["heading", "pfe-jump-links-nav--heading"])[0];
  }

  /**
   * @returns {NodeItem} Slot assigned to cta or pfe-jump-links-nav--cta
   * @TODO deprecating pfe-jump-links-nav--cta slot in 2.0
   */
  get cta() {
    return this.getSlot(["link", "pfe-jump-links-nav--link"])[0];
  }

  /**
   * @returns {NodeItem} Slot assigned to logo or pfe-jump-links-nav--logo
   * @TODO deprecating pfe-jump-links-nav--logo slot in 2.0
   */
  get logo() {
    return this.getSlot(["logo", "pfe-jump-links-nav--logo"])[0];
  }

  /**
   * @returns {NodeItem} Container element from the shadow DOM for the nav list
   */
  get container() {
    return this.shadowRoot.querySelector("#container");
  }

  /**
   * This setter lets you pass in a custom panel NodeItem to the navigation
   * @param {NodeItem} Pointer to the panel content
   */
  set panel(NodeItem) {
    if (NodeItem) {
      this._panel = NodeItem;

      // Attach a scrolltarget attribute if one does not yet exist
      if (!this._panel.hasAttribute("scrolltarget")) {
        this._panel.setAttribute("scrolltarget", this.id);
      }

      // Emit an event to indicate a change in the panel
      this.emitEvent(PfeJumpLinksNav.events.change);
    }
  }

  /**
   * This getter returns the panel for the navigation item; if a custom pointer was set
   * it will return that, otherwise, it tries to find the panel
   * @returns {NodeItem} Pointer to the panel content
   */
  get panel() {
    // If a custom panel is already set, use that
    if (this._panel) return this._panel;

    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.id) {
      // Check for a scrolltarget element pointing to that ID
      // Note: include fallback for scrolltarget in case pfe-jump-links-panel has not upgraded yet?
      const target = document.querySelector(`[scrolltarget="${this.id}"],[pfe-c-scrolltarget="${this.id}"]`);
      if (target) return target;
    }

    // Get all instances of the panel components registered with the DOM
    let panels = [];
    Promise.all([customElements.whenDefined("pfe-jump-links-panel")]).then(() => {
      panels = customElements.get("pfe-jump-links-panel").instances || [];

      // Look for a panel with this scrolltarget (can capture the attribute better after component upgrades)
      const panelWithId = panels.filter((panel) => panel.getAttribute("scrolltarget") === this.id);
      if (panelWithId.length === 1) return panelWithId[0];

      // If only one panel is found, let's assume that goes to this nav
      if (panels.length === 1) {
        // Capture a random ID to connect this to the panel
        this.id = this.randomId;
        panels[0].setAttribute("scrolltarget", this.id);

        return panels[0];
      }

      // Throw a few warning messages suggesting how to connect the nav and panels
      if (panels.length > 1) {
        this.warn(
          `Cannot locate which panel is connected to this navigation element.${
            this.id ? ` Please add scrolltarget="${this.id}" to the appropriate panel.` : ""
          }`
        );
      } else {
        this.warn(
          `Cannot locate any panels on this page. Please see documentation for connecting the navigation and panel.`
        );
      }
    });

    return;
  }

  /**
   * API hook for setting up custom sections without a panel
   */
  set sections(NodeList) {
    this._sections = NodeList;

    // Emit an event to indicate a change in the sections
    this.emitEvent(PfeJumpLinksNav.events.change);
  }

  /**
   * Capture the sections from inside the "panel"; default to this._sections first
   * then fallback to grepping the sections from the panel
   * @returns {NodeList} All sections inside the panel
   */
  get sections() {
    // If a custom set of sections is already defined, use that
    if (this._sections) return this._sections;

    let panel = this.panel;

    // If we can't find a panel element and this is using autobuild, return b/c we can't determine the sections automatically
    if (!panel && this.autobuild) return;

    // If this is not autobuilt, use the IDs from the light DOM
    if (!this.autobuild) {
      let links = [...this.querySelectorAll("ul > li > a[href]")];
      // Parse the links for the anchor tag and create a selector from it
      const ids = links.map((link) => `[id="${link.href.split("#").pop()}"]`);
      // Capture these from the panel or if nothing is returned, check the document
      return panel.querySelectorAll(ids.join(",")) || document.querySelectorAll(ids.join(","));
    }

    // NOTE: since the panel element is not necessarily pfe-jump-links-panel
    // it _could_ contain a shadowRoot with the sections defined in it
    return (
      panel.querySelectorAll(`.pfe-jump-links-panel__section`) ||
      panel.shadowRoot.querySelectorAll(`.pfe-jump-links-panel__section`) ||
      panel.querySelectorAll(`[id]`)
    );
  }

  get links() {
    return [...this.container.querySelectorAll("a")];
  }

  get items() {
    return [...this.shadowRoot.querySelectorAll(`.${this.tag}__item`)];
  }

  // @TODO It seems like the offset is 0 when non-horizontal jumps links are mobile
  get offsetValue() {
    // If the offset attribute has been set, use that (no calculations)
    if (this.offset) return this.offset;

    // If the offset CSS variable has been set, use that (no calculations)
    // @TODO: deprecate --pfe-jump-links-panel--offset in 2.0 release
    // Note: deprecated @1.0 --jump-links-nav--nudge
    let offsetVariable = this.cssVariable("pfe-jump-links--offset") || this.cssVariable("pfe-jump-links-panel--offset");

    if (offsetVariable) {
      offsetVariable = this._castPropertyValue(
        {
          type: Number,
        },
        Number.parseInt(offsetVariable, 10)
      );
      if (offsetVariable && offsetVariable >= 0) return offsetVariable;
    }

    //--
    // If the offsets are not provided, calculate the height of what is currently sticky
    let height = 0;

    // Get the primary navigation height
    let navHeightVariable = this.cssVariable(`pfe-navigation--Height--actual`);
    if (navHeightVariable) {
      navHeightVariable = this._castPropertyValue(
        {
          type: Number,
        },
        Number.parseInt(navHeightVariable, 10)
      );
      if (navHeightVariable && navHeightVariable > 0) height = navHeightVariable;
    }

    // If this is mobile or horizontal & current stuck, return with the nav-height only
    if (this.stuck && (this.isMobile || this.horizontal)) return height;

    // If this is not a horizontal jump link, check if any other horizontal jump links exist
    let stickyJumpLinks = this.cssVariable("pfe-jump-links--Height--actual");
    if (stickyJumpLinks) {
      stickyJumpLinks = this._castPropertyValue(
        {
          type: Number,
        },
        Number.parseInt(stickyJumpLinks, 10)
      );
      if (stickyJumpLinks && stickyJumpLinks > 0) height = height + stickyJumpLinks;
    }

    // No offset if this is a horizontal element, should sit beneath the pfe-navigation (if it exists)
    return height;
  }

  constructor() {
    super(PfeJumpLinksNav, {
      type: PfeJumpLinksNav.PfeType,
    });

    this.currentActive;
    this.isBuilding = false;
    this.isVisible = false;

    // This flag indicates if the rebuild should update the light DOM
    this.update = false;
    this._panel, this._sections;
    this._clicked = false;

    this.build = this.build.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.active = this.active.bind(this);
    this.inactive = this.inactive.bind(this);
    this.clearActive = this.clearActive.bind(this);
    this.getActive = this.getActive.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);
    this.scrollToSection = this.scrollToSection.bind(this);
    this.updateItem = this.updateItem.bind(this);
    this.updateLightDOM = this.updateLightDOM.bind(this);

    this._buildWrapper = this._buildWrapper.bind(this);
    this._buildItem = this._buildItem.bind(this);
    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._reportHeight = this._reportHeight.bind(this);
    this._updateOffset = this._updateOffset.bind(this);
    this._checkVisible = this._checkVisible.bind(this);

    this._stickyHandler = this._stickyHandler.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._mutationHandler = this._mutationHandler.bind(this);
    this._panelChangedHandler = this._panelChangedHandler.bind(this);
    // this._keyboardHandler = this._keyboardHandler.bind(this);

    this._observer = new MutationObserver(this._mutationHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Do not try to render navigation in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }

    // Attaches necessary listeners; does not include the mutation observer
    // because that is attached after processing the component
    this._attachListeners(PfeJumpLinksNav.events);

    // Check that the light DOM is there and accurate
    if (!this.autobuild && this._isValidLightDom()) {
      this.updateLightDOM();
    } else if (this.autobuild) {
      // Try to build the navigation based on the panel
      this.build();
    }

    // Capture the updated UL tag
    const menu = this.querySelector("ul, ol");
    // If the menu is found, process and move to the shadow DOM
    if (!menu) {
      // Throw a warning if the menu could not be built
      this.warn(`Navigation could not be built.`);
    } else {
      // Move the menu into the shadow DOM
      this._toShadowDOM(menu);
      // Update the offset if necessary
      this._updateOffset();

      // Check if this navigation element is visible
      const visible = this._checkVisible();
      const idx = this.getActive();

      // Activate initial active item
      if (visible && idx >= 0) this.active(idx);
      else if (visible) this.active(0);
      // @TODO: would be good to set the last item as active if the visible nav is below this one
    }

    // Trigger the mutation observer
    this._observer.observe(this, PfeJumpLinksNav.observer);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._dettachListeners(PfeJumpLinksNav.events);
  }

  /**
   * Builds the navigation based on the provided data or the defined sections
   * @param {NodeList} [sections=this.sections] List of the sections the navigation should link to
   */
  build(sections = this.sections) {
    // Can't build the navigation dynamically without sections defined
    if (!sections) return;

    // Convert NodeList to array
    sections = [...sections];

    this.isBuilding = true;

    // Validations complete, start the build
    let child;
    let wrapper = this._buildWrapper();
    let currentWrapper = wrapper;
    let previousWrapper = currentWrapper;

    // Build markup for the navigation
    for (let i = 0; i < sections.length; i++) {
      const sectionHeading = sections[i];
      let is_subsection = sectionHeading.classList.contains("sub-section");
      let has_subsection = sectionHeading.classList.contains("has-sub-section");

      // Get ID for the navigation
      let id = sectionHeading.id;
      if (!id) {
        let spacer = sectionHeading.previousElementSibling;
        if (spacer && spacer.classList.contains("pfe-jump-links__section--spacer") && spacer.id) {
          id = spacer.id;
        } else {
          sectionHeading.id = this.randomId.replace("pfe-", "pfe-jump-links--");
          id = sectionHeading.id;
        }
      }

      // Build the li tag; the child item
      child = this._buildItem(
        {
          target: id,
          content: sectionHeading.getAttribute("nav-label") || sectionHeading.textContent,
          subsection: has_subsection,
        },
        is_subsection
      );

      // Add the item to the list
      currentWrapper.appendChild(child);

      if (has_subsection) {
        previousWrapper = currentWrapper;
        currentWrapper = this._buildWrapper("sub-nav");
        child.appendChild(currentWrapper);
      }

      // If the next item exists and is a sub-section, reset the ul build to the previous one
      if (sections[i + 1] && !sections[i + 1].classList.contains("sub-section")) {
        currentWrapper = previousWrapper || wrapper;
      }
    }

    this.isBuilding = false;

    // Return the mark-up
    this.innerHTML = "";
    this.appendChild(wrapper);
  }

  /**
   * Close the mobile accordion
   * @requires {Boolean} [this.isMobile] Indicates whether the navigation is in a mobile state
   * @requires {Boolean} [this.accordionCollapseTiming=750]
   */
  closeAccordion() {
    if (!this.isMobile) return;

    const accordion = this.shadowRoot.querySelector("pfe-accordion");
    // After a short wait, close the accordion
    setTimeout(() => {
      Promise.all([customElements.whenDefined("pfe-accordion")]).then(() => {
        accordion.collapseAll();
      });
    }, this.accordionCollapseTiming);
  }

  /**
   * Rebuild the navigation if the sections or panels are updated
   */
  rebuild() {
    // If the build is happening, wait until it is complete
    if (this.isBuilding) {
      setTimeout(this.rebuild, 10);
    } else {
      // Re-render the template if necessary
      // If this is a mobile state and it does use an accordion, or vise-versa
      if (
        (this.isMobile && !this.shadowRoot.querySelector("pfe-accordion")) ||
        (!this.isMobile && this.shadowRoot.querySelector("pfe-accordion"))
      ) {
        this.render();
      }

      let menu;

      if (this.autobuild && this.update) {
        menu = this.build();
      } else {
        menu = this.querySelector("ul");
      }

      // Move the menu into the shadow DOM
      if (menu && this.container.innerHTML !== menu.outerHTML.toString()) {
        this.container.innerHTML = menu.outerHTML.toString();
      }

      this._updateOffset();

      // Activate initial active item
      this.active(this.getActive());

      // Attach the event listeners
      this.items.forEach((item) => {
        item.querySelector("a").addEventListener("click", this._clickHandler);
      });
    }

    this.update = false;
  }

  /**
   * @param {} item Accepts an index or the link element itself
   */
  active(item) {
    let idx;
    let items = this.items;

    if (typeof item === "number") idx = item;
    else idx = items.findIndex((el) => el === item);

    // If idx is less than 0, it could not be found
    if (idx < 0 || idx >= items.length || !items[idx]) return;

    // If found, clear current active items
    this.clearActive();
    this.currentActive = idx;

    const li = items[idx].closest("li");
    const parentli = li.closest("ul").closest("li");
    const is_subsection = li.classList.contains("sub-section");
    const has_subsection = li.classList.contains("has-sub-section");

    // Set the item's active attribute
    li.setAttribute("active", "");

    if (has_subsection) li.setAttribute("expand", "");
    else if (is_subsection) parentli.setAttribute("expand", "");

    // Emit event for tracking
    this.emitEvent(PfeJumpLinksNav.events.activeNavItem, {
      detail: {
        activeNavItem: idx,
      },
    });
  }

  getActive() {
    // If there are no sections, we can't process
    // @TODO: should this processing even be happening?
    if (!this.sections) return;

    // Make an array from the node list
    const sections = [...this.sections];

    // Capture the offset to prevent recalculation below
    const offset = this.offsetValue;

    // Get all the sections that match this point in the scroll
    const matches = sections.filter((section, idx) => {
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

      // @TODO: The next logic only works for scrolling down; need to reverse for scrolling up
      const next = sections[idx + 1];
      const nextTop = next ? next.getBoundingClientRect().top : 0;
      const sectionTop = section.getBoundingClientRect().top;

      // If the top of this section is greater than/equal to the offset
      // and if there is a next item, that item is
      // or the bottom is less than the height of the window
      return (
        sectionTop >= 0 &&
        sectionTop <= viewportHeight &&
        (!next ||
          (nextTop >= offset &&
            // Check whether the previous section is closer than the next section
            offset - sectionTop < nextTop - offset))
      );
    });

    // Don't change anything if no items were found
    if (!matches || matches.length === 0) return;

    // Identify the first one queried as the current section
    return sections.indexOf(matches[0]);
  }

  inactive(item) {
    let idx;
    let items = this.items;

    if (typeof item === "number") idx = item;
    else idx = items.findIndex((el) => el === item);

    // If idx is less than 0, it could not be found
    if (idx < 0 || idx >= items.length || !items[idx]) return;

    const li = items[idx].closest("li");
    const parentli = li.closest("ul").closest("li");
    const is_subsection = li.classList.contains("sub-section");
    const has_subsection = li.classList.contains("has-sub-section");

    li.removeAttribute("active");

    if (has_subsection) li.removeAttribute("expand");
    else if (is_subsection) parentli.removeAttribute("expand");
  }

  clearActive() {
    const items = this.items;
    items.forEach((item) => this.inactive(item));
  }

  /**
   * Attach the listeners
   * @param {Object} Definition of available events
   */
  _attachListeners(events) {
    // Listen for a change in the panel content if the navigation is autobuilt
    // need to reflect changes in the navigation markup
    if (this.autobuild) {
      document.addEventListener(PfeJumpLinksNav.events.change, this._panelChangedHandler);
    }

    window.addEventListener(events.resize, this._resizeHandler);
    window.addEventListener(events.scroll, this._scrollHandler);
    // window.addEventListener(events.keyup, this._keyboardHandler);

    // If the stickiness changes, update the sticky navigation offset
    window.addEventListener(events.stuck, this._updateOffset);

    // @TODO respond to URL change? Ensure anchor link alignment accounts for sticky nav(s)
    // window.addEventListener("locationchange", (evt) => console.log("locationchange", evt));
    // window.addEventListener("hashchange", (evt) => console.log("hashchange", evt));
  }

  /**
   * Remove the listeners
   * @param {Object} Definition of available events
   */
  _dettachListeners(events) {
    this._observer.disconnect();

    document.removeEventListener(events.change, this._panelChangedHandler);

    window.removeEventListener(events.resize, this._resizeHandler);
    window.removeEventListener(events.scroll, this._scrollHandler);
    window.removeEventListener(events.keyup, this._keyboardHandler);

    // If the stickiness changes, update the sticky navigation offset
    window.removeEventListener(events.stuck, this._updateOffset);

    // @TODO respond to URL change? Ensure anchor link alignment accounts for sticky nav(s)
    // window.removeEventListener("locationchange", (evt) => console.log("locationchange", evt));
    // window.removeEventListener("hashchange", (evt) => console.log("hashchange", evt));
  }

  _buildItem(data, isSubSection = false) {
    let item = document.createElement("li");
    item.className = `${this.tag}__item`;

    let link = document.createElement("a");
    link.className = `${this.tag}__link`;
    link.href = `#${data.target}`;
    link.setAttribute("data-target", data.target);
    link.innerHTML = data.content;

    if (data.subsection) item.classList.add("has-sub-section");
    if (isSubSection) item.classList.add("sub-section");

    item.appendChild(link);
    return item;
  }

  _buildWrapper(className = "pfe-jump-links-nav") {
    let wrapper = document.createElement("ul");
    wrapper.className = className;
    return wrapper;
  }

  _siblingJumpLinks(filterMethod = (item) => item !== this) {
    return PfeJumpLinksNav.instances.filter(filterMethod);
  }

  /**
   * Report the height of the jump links navigation
   */
  _reportHeight() {
    let height = 0;

    // Check all elements to see if any are sticky and in horizontal or mobile state
    const stuckItems = this._siblingJumpLinks((item) => item.stuck && (item.horizontal || item.isMobile));

    if (stuckItems.length > 0) {
      // Get the height of the last sticky element in the DOM tree
      height = stuckItems[stuckItems.length - 1].getBoundingClientRect().height;

      // @TODO Do other items in the stack need to be unstuck?
      // Unstick the other items by popping off the last item in the array
      // stuckItems.pop();
      // Set the rest of the items stuck attribute to false
      // stuckItems.forEach(item => item.stuck = false);
    }

    // Check if we need to update the variable:
    const currentHeight = this.cssVariable(`pfe-jump-links--Height--actual`, null, document.body);
    if (!currentHeight || Number.parseInt(currentHeight, 10) !== height) {
      // If there are no other sticky jump links, set the height on the body
      // Note: we set it on the body to be consistent with pfe-navigation
      this.cssVariable(`pfe-jump-links--Height--actual`, `${height}px`, document.body);
    }
  }

  /**
   * Validate the provided light DOM and provide helpful console messages
   * to facilitate debugging
   */
  _isValidLightDom() {
    let valid = true;

    if ((!this.hasLightDOM() || (!this.querySelector("ul") && !this.querySelector("ol"))) && !this.autobuild) {
      this.warn(
        `This component requires a list in the light DOM to .\nAlternatively, add the \`autobuild\` attribute to dynamically generate the list from the provided panel.`
      );
      valid = false;
    }

    if (this.logo && !this.horizontal) {
      this.warn(`The logo slot is NOT supported in vertical jump links.`);
      // Gentle warning, CSS force-hides this content
      // valid = false;
    }

    if (this.cta && !this.horizontal) {
      this.warn(`The link slot is NOT supported in vertical jump links.`);
      // Gentle warning, CSS force-hides this content
      // valid = false;
    }

    // Gentle warning
    if (Number.isInteger(Number(this.customVar))) {
      this.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }

    return valid;
  }

  updateItem(item, nested = false) {
    item.classList = `${this.tag}__item${nested ? ` sub-section` : ``}`;
    const link = item.querySelector("a");
    link.classList = `${this.tag}__link`;
    const nestedList = item.querySelector("ul");
    if (nestedList) {
      item.classList.add("has-sub-section");
      nestedList.querySelectorAll(":scope > li").forEach((item) => this.updateItem(item, true));
    }
  }

  updateLightDOM() {
    const menu = this.querySelector("ul");

    // Update the mark-up in the light DOM if necessary
    // If the class is not already on the list wrapper
    menu.classList = this.tag;

    // Ensure valid identifiers on the provided mark-up
    menu.querySelectorAll(":scope > li").forEach((item) => this.updateItem(item));
  }

  _toShadowDOM(menu) {
    if (this.container.innerHTML !== menu.outerHTML.toString()) {
      this.container.innerHTML = menu.outerHTML.toString();
    }

    // Attach the event listeners
    this.links.forEach((link) => {
      link.addEventListener("click", this._clickHandler);
    });
  }

  _checkVisible() {
    this.isVisible =
      this.getBoundingClientRect().top <= document.documentElement.clientHeight &&
      this.getBoundingClientRect().right >= 0 &&
      this.getBoundingClientRect().bottom >= 0 &&
      this.getBoundingClientRect().left <= document.documentElement.clientWidth;

    return this.isVisible;
  }

  // This updates the offset value on this component based on the reported offset height on the document
  _updateOffset() {
    this._reportHeight();

    // Set the offset on the nav element
    if (this.horizontal) this.style.top = `${this.offsetValue}px`;
    else this.style.top = `${this.offsetValue + 20}px`;
  }

  /**
   * Click events on the navigation items
   * Prevents conflicts between scroll state and user choice
   * @param {ClickEvent} evt
   */
  _clickHandler(evt) {
    const link = evt.target;
    const li = link.closest(`.${this.tag}__item`);

    // Set this item as active
    this.active(li);

    // Escaping here if no sections are defined and letting default behavior
    // handle the scrolling
    if (!this.sections) return;

    const idx = [...this.sections].findIndex((item) => item.id === link.hash.replace("#", ""));

    // Escaping if we can't find this link in our sections
    if (idx < 0) return;

    // If we have defined sections, use custom scrolling placement
    evt.preventDefault();

    this._clicked = true;

    // Update the URL but don't impact the back button
    history.replaceState({}, "", link.href);

    this.scrollToSection(idx);
  }

  /**
   * This handles scrolling to a section in the panel on click
   * @param {Number} Index of the section to scroll-to
   * @TODO On page load, if an anchor exists, fire this event
   */
  scrollToSection(idx) {
    // Get the offset value to scroll-to
    const section = this.sections[idx];
    const offset = this.offsetValue;

    // Update stickiness if necessary
    this.stuck = !!(this.getBoundingClientRect().top === offset);

    // Initialize the target we want to scroll to
    let scrollTarget = window.pageYOffset + section.getBoundingClientRect().top;

    // If the section uses the spacers, don't include the calculations below
    if (!section.classList.contains("pfe-jump-links__section--spacer")) {
      // Top of the section minus the calculated offset via nav
      scrollTarget = scrollTarget - offset;

      // Account for it's height as well
      // this.offsetVar does not account for this because this only affects scrolling to sections
      let height = 0;

      if (this.horizontal) height = this.getBoundingClientRect().height;

      // On mobile, get the accordion-header height rather than the height of the full component
      // this prevents the height from taking into account the open accordion tray
      if (this.isMobile) {
        const accordionHeader = this.shadowRoot.querySelector("pfe-accordion-header");
        height = accordionHeader.getBoundingClientRect().height - this.getBoundingClientRect().height;
      }

      if (height > 0) scrollTarget = scrollTarget - height;
    }

    // If the section has a custom offset attribute defined, use that; default to 20
    // 20 default is so that the headings aren't smooshed against the sticky navigation
    let itemOffset = 20;
    if (section.hasAttribute("offset")) {
      // Use the property casting from PFElement
      const sectionOffsetProp = this._castPropertyValue(
        {
          type: Number,
        },
        Number.parseInt(section.getAttribute("offset"), 10)
      );
      if (sectionOffsetProp) itemOffset = sectionOffsetProp;
    } else if (this.panel && this.panel.offset) {
      itemOffset = this.panel.offset;
    }

    // This is the point that we're scrolling to
    scrollTarget = scrollTarget - itemOffset;

    // Prevent negative position scrolling
    if (scrollTarget < 0) scrollTarget = 0;

    // Use JS to fire the scroll event
    // smooth-scroll CSS support is spotty and complicated
    // especially as relates to offsets; this was a faster
    // solution for managing state changes
    window.scroll({
      top: scrollTarget,
      behavior: "smooth",
    });

    // Close the accordion
    this.closeAccordion();

    // Update stickiness if necessary
    this.stuck = !!(this.getBoundingClientRect().top === offset);

    setTimeout(() => {
      // Update the focus state
      section.focus();

      this._clicked = false;
    }, 1000);
  }

  /**
   * Sticky state handler; emits event with change in sticky state
   * @param {String} oldVal
   * @param {String} newVal
   */
  _stickyHandler(oldVal, newVal) {
    // If there is no change, do nothing
    if (oldVal === newVal) return;

    this._reportHeight();

    this.emitEvent(PfeJumpLinksNav.events.stuck, {
      detail: {
        stuck: newVal,
      },
    });
  }

  /**
   * Scrolling event processing; control stickiness and active state
   */
  _scrollHandler() {
    // If this is from a click event, do nothing
    if (this._clicked) return;

    clearTimeout(this._scrollHandler._tId);
    this._scrollHandler._tId = setTimeout(() => {
      // Check the current visibility of this jump links navigation
      this._checkVisible();

      // If this navigation is not visible, exit processing now
      if (!this.isVisible) return;

      this.stuck = !!(this.getBoundingClientRect().top === this.offsetValue);

      const currentIdx = this.getActive();

      // If that section isn't already active,
      // remove active from the other links and make it active
      if (currentIdx >= 0 && currentIdx !== this.currentActive) {
        this.currentActive = currentIdx;

        this.active(currentIdx);
      }
    }, 10);
  }

  /**
   * Rebuild the navigation on resize if the view has changed from mobile->desktop or vise versa
   */
  _resizeHandler() {
    this.rebuild();
  }

  /**
   * Run the rebuild when the mutation observer sees change
   */
  _mutationHandler() {
    // Ignore the mutation if using autobuild
    if (this.autobuild) return;

    this.update = true;
    this.rebuild();
  }

  /**
   * Panel changed event
   */
  _panelChangedHandler() {
    // If this is manually built, we don't need to process the panel change
    if (!this.autobuild) return;

    this.update = true;

    // Reset the sections object to allow refetching
    this._sections = null;

    this.rebuild();
  }

  /**
   * Keyboard event manager
   */
  // @TODO: Add a keyboard handler when focus is set on the parent via keyboard; should expand
  // _keyboardHandler() {
  // Handle the focus state to expand parent when child is focused
  // }
}

/*!
 * PatternFly Elements: PfeJumpLinks 1.10.1
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

class PfeJumpLinksPanel extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.10.1";
  }

  static get tag() {
    return "pfe-jump-links-panel";
  }

  /**
   * No custom styles for the panel or template mark-up; just a slot
   */
  get html() {
    return `<slot></slot>`;
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
    };
  }

  static get observer() {
    return {
      childList: true,
      subtree: true,
      // characterData: true,
      // attributes: true,
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      offset: {
        title: "Offset",
        type: Number,
      },
      scrolltarget: {
        title: "Scroll target",
        type: String,
      },
      spacers: {
        title: "Inject spacers",
        type: Boolean,
        default: false,
        observer: "_makeSpacers",
      },
      // @TODO: Deprecated in 1.0
      oldOffset: {
        alias: "offset",
        attr: "pfe-c-offset",
      },
      // @TODO: Deprecated in 1.0
      oldScrolltarget: {
        alias: "scrolltarget",
        attr: "pfe-c-scrolltarget",
      },
    };
  }
  /**
   * @param {NodeList} Returns all elements from the panel's light DOM with the class .pfe-jump-links-panel__section
   */
  get sections() {
    return this.querySelectorAll(`.${this.tag}__section`);
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    this._init = this._init.bind(this);
    this._makeSpacers = this._makeSpacers.bind(this);
    this._isValidMarkup = this._isValidMarkup.bind(this);

    this._observer = new MutationObserver(() => {
      this._init();

      // Emit an event indicating a change to the panel
      this.emitEvent(PfeJumpLinksPanel.events.change, {});
    });
  }

  connectedCallback() {
    super.connectedCallback();

    this._init();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
  }

  _isValidMarkup() {
    if ([...this.sections].length === 0) {
      this.warn(
        `This panel does not contain any headings labeled with the ${this.tag}__section class. Please add that class and an ID to any heading you would like surfaced in the jump links navigation.`
      );
    }
  }

  _makeSpacers() {
    if (!this.spacers) return;
    if (!this.sections || [...this.sections].length <= 0) return;

    // Disconnect the mutation observer to update the spacers
    this._observer.disconnect();

    [...this.sections].forEach((section) => {
      const parentEl = section.parentNode;
      let spacer = section.previousElementSibling;

      // If the previous element is not a spacer, create one
      if (!spacer || !spacer.classList.contains("pfe-jump-links__section--spacer")) {
        spacer = document.createElement("div");
        spacer.classList.add("pfe-jump-links__section--spacer");
        parentEl.insertBefore(spacer, section);
      }

      // Move the ID from the section to the spacer
      if (section.id && (!spacer.id || spacer.id !== section.id)) {
        spacer.id = section.id;
        section.removeAttribute("id");
        section.setAttribute("data-target", spacer.id);
      }

      spacer.style.marginTop = `calc(-1 * (var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px)))`;
      spacer.style.height = `calc(var(--pfe-navigation--Height--actual, 0px) + var(--pfe-jump-links--Height--actual, 0px))`;
    });

    // Set up the mutation observer
    this._observer.observe(this, PfeJumpLinksPanel.observer);
  }

  _init() {
    // Validate and throw warnings about improper markup
    this._isValidMarkup();

    // Adding spacers to the panel is opt-in
    // note: this was because determining the scroll-to point
    // was easier with the scroll animation than working through
    // cross-browser support for smooth scroll CSS (looking at Safari)
    this._makeSpacers();
  }
}

/*!
 * PatternFly Elements: PfeJumpLinks 1.10.1
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

// @TODO Migrate pfe-jump-links-nav to pfe-jump-links in 2.0?
// class PfeJumpLinks extends PfeJumpLinksNav {
//     static get tag() {
//       return "pfe-jump-links";
//     }
// }
// PFElement.create(PfeJumpLinks);

PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinksPanel);

var pfeJumpLinks = { PfeJumpLinksNav, PfeJumpLinksPanel };

export default pfeJumpLinks;
//# sourceMappingURL=pfe-jump-links.js.map
