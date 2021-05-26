import PFElement from '../../pfelement/dist/pfelement.js';

// @POLYFILL  NodeList.prototype.forEach
// https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach#Polyfill
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
// @POLYFILL Number.prototype.isInteger
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger#polyfill
if (window.Number && !Number.prototype.isInteger) {
  Number.isInteger =
    Number.isInteger ||
    function(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
}

// @POLYFILL Element.prototype.closest
// https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

// @POLYFILL Object.prototype.keys
if (!Object.keys) {
  Object.keys = function(obj) {
    if (obj !== Object(obj)) throw new TypeError("Object.keys called on a non-object");
    var k = [],
      p;
    for (p in obj) if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
    return k;
  };
  Object.keys.forEach = Array.forEach;
}

/*!
 * PatternFly Elements: PfeJumpLinks 1.9.0
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

class PfeJumpLinksNav extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.9.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host([hide-label]) .pfe-jump-links-nav__heading>h3{position:absolute;overflow:hidden;clip:rect(0,0,0,0);height:1px;width:1px;margin:-1px;padding:0;border:0}@media screen and (-ms-high-contrast:active),screen and (-ms-high-contrast:none){:host{color:#151515!important}}:host{--context:var(--pfe-jump-links--context);-webkit-box-sizing:border-box;box-sizing:border-box;font-family:"Red Hat Text",RedHatText,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family, "Red Hat Text", "RedHatText", "Overpass", Overpass, Arial, sans-serif);font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);font-weight:400;display:block;position:sticky;top:1rem;top:var(--pfe-jump-links-nav--offset,var(--pfe-theme--container-spacer,1rem));padding-left:0;background-color:transparent;background-color:var(--pfe-jump-links--BackgroundColor,transparent);z-index:97;z-index:var(--pfe-theme--zindex--subnavigation,97)}@media (min-width:992px){:host{border:1px solid transparent;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;padding:0;padding:var(--pfe-jump-links__nav--Padding,0)}}:host([on=light]){--pfe-broadcasted--text:var(--pfe-theme--color--text, #151515);--pfe-broadcasted--link:var(--pfe-theme--color--link, #06c);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover, #004080);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus, #004080);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited, #6753ac);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited, none)}:host([on=dark]){--pfe-broadcasted--text:var(--pfe-theme--color--text--on-dark, #fff);--pfe-broadcasted--link:var(--pfe-theme--color--link--on-dark, #73bcf7);--pfe-broadcasted--link--hover:var(--pfe-theme--color--link--hover--on-dark, #bee1f4);--pfe-broadcasted--link--focus:var(--pfe-theme--color--link--focus--on-dark, #bee1f4);--pfe-broadcasted--link--visited:var(--pfe-theme--color--link--visited--on-dark, #bee1f4);--pfe-broadcasted--link-decoration:var(--pfe-theme--link-decoration--on-dark, none);--pfe-broadcasted--link-decoration--hover:var(--pfe-theme--link-decoration--hover--on-dark, underline);--pfe-broadcasted--link-decoration--focus:var(--pfe-theme--link-decoration--focus--on-dark, underline);--pfe-broadcasted--link-decoration--visited:var(--pfe-theme--link-decoration--visited--on-dark, none)}:host([sticky=false]){position:relative}.pfe-jump-links-nav__heading>h3{font-family:"Red Hat Display",RedHatDisplay,Overpass,Overpass,Arial,sans-serif;font-family:var(--pfe-theme--font-family--heading, "Red Hat Display", "RedHatDisplay", "Overpass", Overpass, Arial, sans-serif);font-size:.875rem;font-size:var(--pf-c-title--m-sm--FontSize,var(--pf-global--FontSize--sm,.875rem));line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);font-weight:400;font-weight:var(--pfe-theme--font-weight--normal,400);color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);text-transform:uppercase}.pfe-jump-links-nav__heading>h3:not(:last-child){margin-bottom:1rem;margin-bottom:var(--pfe-theme--content-spacer--heading--sm,1rem)}@media (max-width:991px){.pfe-jump-links-nav__heading>h3{visibility:hidden}}.pfe-jump-links-nav__heading>h3:not(:empty){padding-bottom:1rem;padding-bottom:var(--pfe-theme--container-padding,1rem);border-bottom:1px solid #d2d2d2;border-bottom:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--surface--border,#d2d2d2)}nav{visibility:visible;margin:0;list-style:none;padding:0}ul{padding:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}li{border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;display:block;text-decoration:none;margin-left:calc(1px * -1);margin-left:calc(var(--pfe-theme--surface--border-width,1px) * -1)}li[active]{border-left-color:#06c;border-left-color:var(--pfe-jump-links--BorderColor,var(--pfe-theme--color--ui-accent,#06c))}a{position:relative;display:table;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);font-size:1rem;font-size:var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem));text-decoration:none;line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding-top:calc(calc(1.5rem / 6) * 2);padding-top:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) * 2);padding-right:calc(calc(1.5rem / 3) * 2);padding-right:calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2);padding-bottom:calc(calc(1.5rem / 6) * 2);padding-bottom:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) * 2);padding-left:calc(calc(1.5rem / 3) * 2);padding-left:calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}.has-sub-section>a{padding-bottom:calc(1.5rem / 6);padding-bottom:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6))}.sub-section>a{margin-left:calc(1rem * .75);margin-left:calc(var(--pfe-theme--container-spacer,1rem) * .75);font-size:calc(1rem * .85);font-size:calc(var(--pfe-jump-links--FontSize,var(--pf-global--FontSize--md,1rem)) * .85);padding:calc(1.5rem / 6) calc(calc(1.5rem / 3) * 2);padding:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 6)) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3)) * 2)}@media (min-width:992px){.sub-section>a{display:none}}.sub-section>a:last-child{padding-bottom:calc(1.5rem / 3);padding-bottom:var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,1.5rem)/ 3))}[aria-expanded=true] .sub-section>a{display:table;height:auto}a:focus{outline:0}a:focus::after{content:"";position:absolute;width:calc(100% - 4px);width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:calc(100% - 4px);height:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));top:0;left:0;border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);border:1px solid #06c;border:var(--pfe-theme--ui--focus-outline-width,1px) var(--pfe-theme--ui--focus-outline-style,solid) var(--pfe-broadcasted--link,#06c)}[active] a,a:hover{color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}ul ul{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-ms-flex:0;flex:0;margin:0;padding:0;border-left:none!important;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear;transition:-webkit-box-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-ms-flex 1s linear}ul ul li{border-left:none!important}ul ul[aria-expanded=true]{-webkit-box-flex:1;-ms-flex:1;flex:1}:host{--pfe-accordion__panel-container--Padding:0}@media (max-width:767px){:host{--pfe-accordion__panel-container--Padding:20px}}pfe-accordion{z-index:97;z-index:var(--pfe-theme--zindex--subnavigation,97)}@media (max-width:991px){pfe-accordion{border:1px solid #d2d2d2;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}}pfe-accordion-header{--pfe-theme--color--surface--border:transparent;--pfe-theme--color--ui-base--on-dark:transparent;--pfe-theme--color--ui-base:transparent;position:sticky;top:0}@media (max-width:991px){pfe-accordion-header{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);--context:var(--pfe-theme--color--surface--lightest--context, light)}}@media (min-width:992px){pfe-accordion-header{visibility:collapse!important;display:none}}pfe-accordion-panel{border-left-color:transparent;border-right:none}@media (min-width:992px){pfe-accordion-panel{visibility:collapse;display:none;opacity:1;display:block}pfe-accordion-panel>pfe-jump-links-nav{width:100%;display:block;visibility:visible}}:host([color=lightest]){background-color:#fff;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff));--context:var(--pfe-theme--color--surface--lightest--context, light)}:host([color=darkest]){background-color:#151515;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--darkest,#151515));--context:var(--pfe-theme--color--surface--darkest--context, dark);border:1px solid #6a6e73;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([horizontal]){padding:0;top:0;top:var(--pfe-jump-links-panel--offset,0);width:100%;z-index:98;z-index:var(--pfe-theme--zindex--navigation,98)}:host([horizontal]) nav{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:center;-ms-flex-pack:center;justify-content:center;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative;padding-left:calc(1rem * 2);padding-left:calc(var(--pfe-theme--container-spacer,1rem) * 2);padding-right:calc(1rem * 2);padding-right:calc(var(--pfe-theme--container-spacer,1rem) * 2)}@media (min-width:992px){:host([horizontal]) nav{padding-left:calc(1rem * 4);padding-left:calc(var(--pfe-theme--container-spacer,1rem) * 4);padding-right:calc(1rem * 4);padding-right:calc(var(--pfe-theme--container-spacer,1rem) * 4)}}:host([horizontal]) nav .pfe-jump-links-nav__heading>h3{-ms-flex-preferred-size:100%;flex-basis:100%;text-align:center}:host([horizontal]) nav ::slotted([slot=logo]){max-height:calc(1rem * 3.5);max-height:calc(var(--pfe-theme--container-spacer,1rem) * 3.5)}:host([horizontal]) nav ::slotted([slot=cta]),:host([horizontal]) nav ::slotted([slot=logo]){max-width:calc(1rem * 7);max-width:calc(var(--pfe-theme--container-spacer,1rem) * 7)}@media (min-width:992px){:host([horizontal]) nav ::slotted([slot=cta]),:host([horizontal]) nav ::slotted([slot=logo]){max-width:calc(1rem * 14);max-width:calc(var(--pfe-theme--container-spacer,1rem) * 14)}}:host([horizontal]) #container{-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-ms-flex-direction:column;flex-direction:column}:host([horizontal]) ul{border:none;text-align:center;-webkit-box-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-ms-flexbox;display:flex;padding:0;width:auto;margin:0 auto}:host([horizontal]) ul li{padding:0 calc(1rem * 1.5);padding:0 calc(var(--pfe-theme--container-spacer,1rem) * 1.5);display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;border-top:4px solid transparent;border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;border-bottom:4px solid transparent;border-bottom:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;border-left:none;border-right:none}:host([horizontal]) ul li[active]{border-top:4px solid #06c;border-top:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#06c)}:host([horizontal]) ul a{text-decoration:none;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);padding-top:1rem;padding-top:var(--pfe-jump-links__link--vertical-spacer,var(--pfe-theme--container-spacer,1rem));padding-right:1rem;padding-right:var(--pfe-jump-links__link--horizontal-spacer,var(--pfe-theme--container-spacer,1rem));padding-bottom:1rem;padding-bottom:var(--pfe-jump-links__link--vertical-spacer,var(--pfe-theme--container-spacer,1rem));padding-left:1rem;padding-left:var(--pfe-jump-links__link--horizontal-spacer,var(--pfe-theme--container-spacer,1rem))}:host([horizontal]) ul a:hover,[active] :host([horizontal]) ul a{color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42)}@media (max-width:991px){:host([horizontal]) nav{min-height:calc(1rem * 5.5);min-height:calc(var(--pfe-theme--container-spacer,1rem) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);--context:var(--pfe-theme--color--surface--lighter--context, light)}:host([horizontal]) .pfe-jump-links-nav{display:none}}:host([hidden]){display:none} /*# sourceMappingURL=pfe-jump-links-nav.min.css.map */</style>
${this.horizontal ? `

<nav>
  <slot class="pfe-jump-links-nav__heading" name="heading">
    <h3 id="heading">${this.srText ? this.srText : "Jump to section"}</h3>
  </slot>
  <slot class="pfe-jump-links-nav__logo" name="logo"></slot>
  <div id="container"></div>
  <slot class="pfe-jump-links-nav__cta" name="cta"></slot>
</nav>
` : `

<pfe-accordion>
  <pfe-accordion-header>
    <h3>${this.srText ? this.srText : "Jump to section"}</h3>
  </pfe-accordion-header>
  <pfe-accordion-panel>
    <nav>
      <slot class="pfe-jump-links-nav__heading" name="heading">
        <h3 id="heading">${this.srText ? this.srText : "Jump to section"}</h3>
      </slot>
      <slot class="pfe-jump-links-nav__logo" name="logo"></slot>
      <div id="container"></div>
      <slot class="pfe-jump-links-nav__cta" name="cta"></slot>
    </nav>
  </pfe-accordion-panel>
</pfe-accordion>`}`;
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

  static get events() {
    return {
      upgrade: `${this.tag}:upgraded`
    };
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      autobuild: {
        title: "Autobuild",
        type: Boolean
      },
      horizontal: {
        title: "Horizontal",
        type: Boolean,
        observer: "_horizontalHandler"
      },
      srText: {
        title: "Navigation label",
        type: String,
        default: "Jump to section"
      },
      color: {
        title: "Color",
        type: String,
        values: ["lightest", "lighter", "darkest"]
      },
      hideLabel: {
        title: "Hide label",
        type: Boolean
      },
      nesting: {
        title: "Support nested headings",
        type: Boolean,
        default: true
      },
      // @TODO: Deprecated in 2.0
      oldAutobuild: {
        alias: "autobuild",
        attr: "pfe-c-autobuild"
      },
      // @TODO: Deprecated in 2.0
      oldHorizontal: {
        alias: "horizontal",
        attr: "pfe-c-horizontal"
      },
      // @TODO: Deprecated in 2.0
      oldColor: {
        alias: "color",
        attr: "pfe-color"
      }
    };
  }

  static get observerSettings() {
    return {
      childList: true,
      subtree: true,
      characterData: true
    };
  }

  // Sets up backwards compatibility for tag prefixed slot names
  get logo() {
    return this.getSlot("logo") || this.getSlot(`${this.tag}--logo`);
  }

  get cta() {
    return this.getSlot("link") || this.getSlot(`${this.tag}--link`);
  }

  get heading() {
    return this.getSlot("heading") || this.getSlot(`${this.tag}--heading`);
  }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType, delayRender: true });

    // Do not render this in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }

    // Global pointer to the associated panel
    // If this is empty, we know that no panel exists for this nav
    this.panel;

    // Cache for build()
    this._building;

    // Global definition for link elements in the ShadowDOM
    this.links;
    this.panelRefs = [];
    this.activeLinks = [];

    // Public API
    this.build = this.build.bind(this);
    this.validateData = this.validateData.bind(this);
    this.getLinkById = this.getLinkById.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.setActive = this.setActive.bind(this);
    this.isActive = this.isActive.bind(this);
    this.removeActive = this.removeActive.bind(this);
    this.removeAllActive = this.removeAllActive.bind(this);
    this.upgradeA11y = this.upgradeA11y.bind(this);
    this.upgradeA11yListItem = this.upgradeA11yListItem.bind(this);
    this.connectPanel = this.connectPanel.bind(this);

    //-- Internal-only methods
    this._buildItem = this._buildItem.bind(this);
    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._copyListToShadow = this._copyListToShadow.bind(this);
    this._connectLightDOM = this._connectLightDOM.bind(this);
    // this._reportHeight = this._reportHeight.bind(this);
    this._init = this._init.bind(this);

    // Event handlers
    this._clickHandler = this._clickHandler.bind(this);
    this._upgradePanelHandler = this._upgradePanelHandler.bind(this);
    this._activeItemHandler = this._activeItemHandler.bind(this);
    this._horizontalHandler = this._horizontalHandler.bind(this);
    this._observer = new MutationObserver(this._init);

    // Note: We need the panel connection even if we're not using autobuild to determine where to scroll on click
    // document.body.addEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);

    // Start listening for if the panel has changed
    // @TODO: add a specialized handler for the change event
    // document.body.addEventListener("pfe-jump-links-panel:change", this._init);

    // If the active item changes, fire the handler
    // document.body.addEventListener("pfe-jump-links-panel:active-navItem", this._activeItemHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Do not render this in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }

    // Initialize the navigation
    this._init();
    this.render();

    // Trigger the mutation observer
    // if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // this._observer.disconnect();

    // document.body.removeEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);
    // document.body.removeEventListener("pfe-jump-links-panel:active-navItem", this._activeItemHandler);
    // document.body.removeEventListener("pfe-jump-links-panel:change", this._init);

    this.links.forEach(link => link.removeEventListener("click", this._clickHandler));
  }

  getLinkById(id) {
    if (!id) return;

    let getLink = function(id) {
      // Check if the shadow template contains links
      const links = this.shadowRoot.querySelectorAll("#container li > a");
      if (!links) return;
      const filter = [...links].filter(item => item.hash === `#${id}`);

      if (filter.length <= 0) return;
      // @TODO This is too noisy
      // this.warn(`No link was found with #${id} in the navigation links.`);

      return filter[0];
    };

    let link = getLink(id);

    // @TODO Post-IE11; convert to async / await
    if (this._building) {
      this._building.then(() => {
        link = getLink(id);
      });
    }

    return link;
  }

  closeAccordion() {
    this.shadowRoot.querySelector("pfe-accordion").collapseAll();
  }

  rebuild(navset) {
    // Capture sections from the panel if not provided
    // This is helpful for when this is used as an API
    // re: document.querySelector("pfe-jump-links-nav").rebuild();
    if (!navset) {
      if (this.panel.tagName === "pfe-jump-links-panel") navset = this.panel.sectionRefs;
      else return;
    }

    this.build(navset);
  }

  setActive(link) {
    if (!link) return;

    const listItem = link.closest("li");

    const checkForAncestors = item => {
      item.setAttribute("active", "");

      // if (item.classList.contains("has-sub-section")) {
      //   item.querySelector(":scope > ul").setAttribute("aria-expanded", "true");
      // }

      const parentItem = item.parentElement.closest("li");
      if (!parentItem || parentItem === item) return;

      if (parentItem && item.classList.contains("sub-section")) {
        parentItem.setAttribute("active", "");
        parentItem.querySelector(":scope > ul").setAttribute("aria-expanded", "true");
        item.tabindex = "0";
      }

      checkForAncestors(parentItem);
    };

    checkForAncestors(listItem);
  }

  isActive(link) {
    if (!link) return false;
    const listItem = link.closest("li");
    return listItem.hasAttribute("active");
  }

  removeActive(link) {
    if (!link) return;

    const listItem = link.closest("li");
    listItem.removeAttribute("active");

    const checkForAncestors = item => {
      // parentElement ensures the query doesn't return itself!
      const parentItem = item.parentElement.closest("li");
      if (!parentItem) return;

      if (item.classList.contains("sub-section")) {
        // Only remove status from parent if all children are removed
        const parentLink = parent.querySelector(":scope > a");
        if (this.isActive(parentLink)) {
          let activeChildren = false;
          parent.querySelectorAll("ul > li > a").forEach(link => {
            if (this.isActive(link)) activeChildren = true;
          });

          // If none of the children are active, remove the active settings
          if (!activeChildren) {
            parent.removeAttribute("active");
            parent.setAttribute("aria-expanded", "false");
          }
        }
      } else if (item.classList.contains("has-sub-section")) {
        item.setAttribute("aria-expanded", "false");
      }

      item.removeAttribute("active");

      if (item.classList.contains("has-sub-section")) {
        item.querySelector(":scope > ul").setAttribute("aria-expanded", "false");
      }

      if (parentItem && item.classList.contains("sub-section")) {
        parentItem.removeAttribute("active");
        parentItem.closest("ul").setAttribute("aria-expanded", "false");
        item.tabindex = "-1";
      }

      checkForAncestors(parentItem);
    };

    checkForAncestors(listItem);
  }

  removeAllActive() {
    this.activeLinks.forEach(link => this.removeActive(link));
    // Empty out the active links pointer
    this.activeLinks = [];
  }

  // @TODO: add a link to the WCAG page about role="tree"
  upgradeA11yListItem(item, isSubSection = false) {
    // Create the link to the section
    const link = item.querySelector("a");
    link.classList.add("pfe-jump-links-nav__link");

    item.className = "pfe-jump-links-nav__item"; // Goes on the li tag
    // List items get a role of "treeitem"
    item.role = "treeitem";
    // List items that are visible should be focusable
    item.tabindex = "0";

    if (isSubSection) {
      item.classList.add("sub-section");

      // Subsections are not visible and thus should not be focusable
      link.tabindex = "-1";
    }

    // If active links is initiated before the nav is upgrade, active the link
    if (this.activeLinks.length > 0 && this.activeLinks.includes(link)) this.setActive(link);

    // Build out the nested group
    let nested = item.querySelector(":scope > ul");
    if (nested) {
      nested.role = "group";

      const children = nested.querySelectorAll(":scope > li");
      if (children.length > 0) {
        item.classList.add("has-sub-section");
        item.setAttribute("aria-expanded", "false");
        children.forEach(child => this.upgradeA11yListItem(child, true));
      }
    }
  }

  upgradeA11y() {
    // Turn off the observer while we update the DOM
    // if (!this.autobuild) this._observer.disconnect();

    // Get the light DOM
    const parentList = this.querySelector("ul") || this.querySelector("ol");
    if (!parentList) return;

    // Loop through the markup and apply the appropriate tags
    parentList.classList.add("pfe-jump-links-nav");
    // Note: only the first UL gets the tree role
    parentList.role = "tree";

    // Check to see if there is a heading tag preceeding this list
    const label = parentList.closest("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]");
    if (label) parentList.setAttribute("aria-labelledby", label.id);

    // Iterate over each list item that is a direct child of the parentList
    const listItems = parentList.querySelectorAll(":scope > li");
    listItems.forEach(item => this.upgradeA11yListItem(item));

    // Trigger the mutation observer
    // if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  /**
   * Connect the nav to it's associated panel after upgrade
   * Note: this no longer has to be `pfe-jump-links-panel`
   */
  connectPanel(panel) {
    this.panel = panel;

    // If the panel does not have a scrolltarget attribute, go ahead and add it
    if (!this.panel.hasAttribute("scrolltarget")) this.panel.setAttribute("scrolltarget", this.id);

    // Set up a pointer to this nav element in the panel if it doesn't already exist
    if (!this.panel.nav) this.panel.nav = this;

    // Fire rebuild if autobuild is set
    if (this.autobuild) this.rebuild();
  }

  /**
   * Process the upgrade panel custom event to connect the panel to this navigation element
   */
  _upgradePanelHandler(evt) {
    if (!evt && !evt.detail) return;

    let panel = evt.detail.panel;

    // If the target does not match the id of this nav
    // Return but don't remove the event
    if (!(panel && panel.scrolltarget === this.id)) return;

    // Wire up the panel to this element
    this.connectPanel(panel);

    // Stop listening for the panel
    document.body.removeEventListener("pfe-jump-links-panel:upgraded", this._upgradePanelHandler);

    // Stop the panel from listening for the nav upgrade (prevents duplication)
    document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this.panel._connectToNav);
  }

  _horizontalHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    // @TODO await updateComplete re:lit
    setTimeout(() => {
      this.cssVariable(`${this.tag}--Height--actual`, `${this.clientHeight}px`, document.body);
    }, 1000);
  }

  /*
   * Build out a list item with the correct attributes and markup
   * reference: https://www.w3.org/WAI/GL/wiki/Using_ARIA_trees
   */
  _buildItem(data) {
    let item = document.createElement("li");

    // Create the link to the section
    let link = document.createElement("a");
    link.href = `#${data.id}`;
    link.textContent = data.label;

    // Add the link to the list
    item.appendChild(link);

    return item;
  }

  _buildList(items, id = null) {
    if (items.length <= 0) return;

    let wrapper = document.createElement("ul");
    if (id) wrapper.setAttribute("aria-labelledby", id);

    // Loop through each item
    items.forEach(item => {
      // Pass the data object to the item builder
      let result = this._buildItem(item);

      // If there are children, set the result to the new list
      // Otherwise, the result is the new list item
      if (item.children && item.children.length > 0) {
        // Pass the children array to a nested list call
        let nested = this._buildList(item.children);
        result.appendChild(nested);
      }

      wrapper.appendChild(result);
    });

    return wrapper;
  }

  /**
   * Build out a navigation element based on data from the panel object
   * @param {Array} set An array of section details
   * @returns {Promise} When the navigation is done being built
   * @TODO Post-IE11: convert to async / await
   **/
  build(set = this.data || []) {
    // If there is no provided array and the global data pointer is empty, escape
    if (!set) return;

    let items = this.validateData(set);

    // Create the list
    let wrapper = this._buildList(items, `heading`);
    console.log(wrapper);
    if (!wrapper.outerHTML) return;

    // Turn off the observer while we update the DOM
    if (this._observer) this._observer.disconnect();

    // Add the new content to the light DOM
    this.innerHTML = wrapper.outerHTML;

    // If it has not yet been rendered, fire it now
    if (!this.rendered) this.render();

    // Copy the light DOM to the shadow DOM
    // Returns a NodeList of links in the shadow DOM navigation
    this._copyListToShadow().then(links => this._connectLightDOM(links));

    // Trigger the mutation observer
    if (this._observer) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  /**
   * Validate the data array
   * @param {Array} set
   */
  validateData(set = []) {
    if (set.length === 0) return;

    let items = [];
    // Expect:
    //-- id: "sectionOne" (required)
    //-- label: "Section 1" (required)
    //-- ref: h3#sectionOne.pfe-jump-links-panel__section (optional)
    //-- isVisible: false (optional)
    //-- childOf: null (optional)
    Object.keys(set).forEach(key => {
      let data = set[key];

      if (!data.id && !data.ref) {
        this.warn(`Objects requires at least an ID or a pointer to the heading element.`);
        return;
      }

      if (!data.label) {
        this.warn(`Objects requires a label for the heading link.`);
        return;
      }

      // If the ID was provided but not a reference, capture it from the DOM
      if (data.id && !data.ref) {
        data.ref = document.querySelector(`#${data.id}`);
      }

      if (!data.ref) {
        this.warn(
          `If pointing to content inside a ShadowRoot, please provide the ref key with a pointer to that heading element.`
        );
        return;
      }

      if (data.childOf) {
        if (!this.horizontal && !this.nesting) {
          let lastItem = items[items.length - 1];
          if (lastItem)
            lastItem.children.push({
              id: data.id,
              ref: data.ref,
              isVisible: data.isVisible || false,
              label: data.label,
              children: []
            });
        } else {
          this.warn(`Horizontal jump links do not support nested sections. This item was skipped: #${data.id}`);
        }
      } else {
        items.push({
          id: data.id,
          ref: data.ref,
          isVisible: data.isVisible || false,
          label: data.label,
          children: []
        });
      }
    });

    return items;
  }

  /*
   * Validate the light DOM provided for the manually coded navigation
   */
  _isValidLightDom() {
    if (!this.hasLightDOM() || !(this.querySelector("ul") || this.querySelector("ol"))) {
      this.warn(`You must have a <ul> or <ol> tag in the light DOM or use the autobuild attribute.`);
      return false;
    }

    if ((this.logo || this.cta) && !this.horizontal) {
      this.warn(`logo and link slots are %cnot%c supported in vertical jump links`, "font-style: italic", "");
    }

    return true;
  }

  /*
   * Copy the light DOM list to the shadow DOM for control of styling
   */
  _copyListToShadow() {
    return new Promise((resolve, reject) => {
      const menu = this.querySelector("ul") || this.querySelector("ol");

      if (!menu) reject(`No menu elements (ul or ol) could be foundin the light DOM.`);

      // Upgrade the accessibility of the light DOM provided
      // including attaching appropriate classes
      this.upgradeA11y();

      if (!this.rendered) this.render();

      // Copy the menu into the shadow DOM
      this.shadowRoot.querySelector("#container").innerHTML = menu.outerHTML;

      // Return a NodeList of the links
      resolve(this.shadowRoot.querySelectorAll("#container li > a"));
    });
  }

  /*
   * Initialize the navigation element
   */
  _init() {
    // Set up backwards compatibility for slots with old tag-prefixed naming
    ["logo", "cta", "heading"].forEach(region => {
      this.getSlot(`${this.tag}--${region}`).forEach(slot => {
        slot.setAttribute("slot", region);
      });
    });

    // If this is a manually build component but it doesn't have valid light DOM, return
    // Note: The _isValidLightDOM function throws the necessary warnings, no warnings needed here
    if (!this.autobuild && !this._isValidLightDom()) return;

    // Capture the light DOM content from the panel
    // passing that to the build navigation method to render the markup
    if (this.autobuild) {
      // @TODO Set up an API for this instead
      if (this.panel) this.build(this.panel.sectionRefs);
      else return;
    }
  }

  _connectLightDOM(links) {
    // Recapture the panel references; start by emptying it
    this.panelRefs = [];

    // Attach event listeners to each link in the shadow DOM
    links.forEach(link => {
      // Add a click event listener
      link.addEventListener("click", this._clickHandler);

      // Capture the panel reference
      if (this.panel) {
        const ref = this.panel.getRefById(link.hash.replace(/^#/, ""));
        if (ref) this.panelRefs.push(ref);
      }

      // Pass information back the panels when the navigation was manually built
      // if (!this.autobuild) {
      //   console.log(this.panelRefs);
      // }
    });

    // Create a global pointer for the link elements
    this.links = links;

    // If the upgrade was successful, remove the hidden attribute
    if (links.length > 0) this.removeAttribute("hidden");
  }

  /*
   * Handle on click events
   */
  _clickHandler(evt) {
    evt.preventDefault();

    let entry;

    // Throw a warning if the returned value is using something other than px for units
    const getValue = variableName => {
      const value = this.cssVariable(variableName);
      if (!value) return;
      if (!Number.isInteger(Number(value)) && !value.match(/px$/)) {
        this.warn(
          `Using an integer with a unit (other than px) is not supported for custom property ${variableName}. Received ${value}. The component strips the unit using parseInt(). For example, 1rem would become 1 and behave as if you had entered 1px.`
        );
      }
      return value;
    };

    // Note that the offset attribute will override a value stored in the offset CSS variable
    let offsetInput = getValue(`${this.tag}--offset`) || 0;
    // Capture the height of the navigation component
    let navigation = getValue(`pfe-navigation--Height--actual`) || 0;
    // Capture the height of the navigation for jump links, including the older, deprecated --pfe-jump-links--nav-height
    let jumpLinksNav = getValue(`pfe-jump-links-nav--Height--actual`) || getValue(`pfe-jump-links--nav-height`) || 0;

    // The total offset value is the user-provided offset plus the height of the navigation plus the height of the jump links navigation
    let offset = parseInt(offsetInput) + parseInt(navigation) + parseInt(jumpLinksNav) + 8 || 200;

    // Fire scroll event to the section referenced
    if (!evt || !evt.path || !evt.path[0] || !evt.path[0].hash) return;

    const id = evt.path[0].hash;
    const key = id.replace(/^#/, "");

    if (!id) return;

    if (this.panel) {
      const refs = this.panel.sectionRefs;
      const capture = Object.values(refs).filter(data => data.id === key);
      if (capture.length === 1) entry = capture[0].ref;

      // Fallback to any ID reference from the panel light or shadow DOM
      if (!entry) entry = this.panel.querySelector(id) || this.panel.shadowRoot.querySelector(id);
    }

    // Fallback to any ID reference from the document
    if (!entry) entry = document.querySelector(id);

    if (!entry) {
      this.warn(`A corresponding panel was not found for ${id}`);
      return;
    }

    // If there are no attached panels, let the default click behavior do it's thing
    /* JavaScript MediaQueryList Interface */
    let behavior = "smooth";
    if (window.matchMedia("(prefers-reduced-motion)").matches) behavior = "auto";

    // Set up the scroll animation
    if (this.panel) offset = this.panel.offsetValue;

    window.scrollTo({
      top: entry.getBoundingClientRect().top + window.pageYOffset - offset,
      behavior: behavior
    });

    // @TODO: Create JSON tokens for media query breakpoints
    // If the window is less than 992px, escape (do nothing)
    if (window.matchMedia("(min-width: 992px)").matches) return;

    // Close the accordion after 750ms
    setTimeout(this.closeAccordion, 750);
  }

  /*
   * Sets a navigation item to active when event surfaced from panel
   */
  _activeItemHandler(evt) {
    // Capture the panel that fired the event
    const panel = evt.detail.panel;
    // @TODO Use this array to highlight all visible items
    const ids = evt.detail.activeIds;

    // If it's not the right panel, get out of here!
    if (!panel || (panel && panel.scrolltarget !== this.id)) return;

    // This this is an autobuild component and the nav is complete, process the activation
    if (!this.autobuild || (this.autobuild && this._building)) {
      // If the array is empty, clear active state
      if (!ids || ids.length === 0) {
        this.removeAllActive();
        return;
      }

      // Capture the first item in the set
      const firstId = ids[0];

      if (!firstId) return;

      // Get the link by ID
      const link = this.getLinkById(firstId);
      const ref = panel.getRefById(firstId);

      if (!link) return;

      // If this is already an active link, do nothing
      if (this.activeLinks.length > 0) {
        if (this.activeLinks.filter(active => active === link).length > 0) return;

        // If there are active links in the pointer, clear the array
        this.removeAllActive();
      }

      // Set the activeLinks array to the new link element
      this.activeLinks.push(link);

      // const checkForAncestors = (ref) => {
      //   if (!ref.childOf) return;

      //   // Get the link for the parent element
      //   const parentLink = this.getLinkById(ref.childOf);
      //   this.activeLinks.unshift(parentLink);

      //   // Get the reference to the parent
      //   const parentRef = panel.getRefById(ref.childOf);
      //   checkForAncestors(parentRef);
      // };

      // // Kick off the parent check
      // if (ref) checkForAncestors(ref);

      // Activate the link
      this.activeLinks.map(link => this.setActive(link));
    } else setTimeout(this._activeItemHandler(evt), 100);
  }
}

/*!
 * PatternFly Elements: PfeJumpLinks 1.9.0
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
    return "1.9.0";
  }

  static get tag() {
    return "pfe-jump-links-panel";
  }

  // No template or sass files because it's just a default slot
  get html() {
    return `<style>:host { display: block; } :host([hidden]) { display: none; }</style><slot></slot>`;
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`,
      upgrade: `${this.tag}:upgraded`
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
        observer: "_offsetChanged"
      },
      scrolltarget: {
        title: "Scroll target",
        type: String
      },
      // @TODO: Deprecated in 1.0
      oldOffset: {
        alias: "offset",
        attr: "pfe-c-offset"
      },
      // @TODO: Deprecated in 1.0
      oldScrolltarget: {
        alias: "scrolltarget",
        attr: "pfe-c-scrolltarget"
      }
    };
  }

  static get observerSettings() {
    return {
      childList: true,
      subtree: true,
      characterData: true
    };
  }

  get offsetValue() {
    // Throw a warning if the returned value is using something other than px for units
    const getValue = variableName => {
      const value = this.cssVariable(variableName);
      if (!value) return;
      if (!Number.isInteger(Number(value)) && !value.match(/px$/)) {
        this.warn(
          `Using an integer with a unit (other than px) is not supported for custom property ${variableName}. Received ${value}. The component strips the unit using parseInt(). For example, 1rem would become 1 and behave as if you had entered 1px.`
        );
      }
      return value;
    };

    // Note that the offset attribute will override a value stored in the offset CSS variable
    let offsetInput = this.offset || getValue(`${this.tag}--offset`) || 0;
    // Capture the height of the navigation component
    let navigation = getValue(`pfe-navigation--Height--actual`) || 0;
    // Capture the height of the navigation for jump links, including the older, deprecated --pfe-jump-links--nav-height
    let jumpLinksNav = getValue(`pfe-jump-links-nav--Height--actual`) || getValue(`pfe-jump-links--nav-height`) || 0;

    // The total offset value is the user-provided offset plus the height of the navigation plus the height of the jump links navigation
    return parseInt(offsetInput) + parseInt(navigation) + parseInt(jumpLinksNav) + 8 || 200;
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });

    // Global pointer to the associated navigation
    // If this is empty, we know that no nav is attached to this panel yet
    this.nav = undefined;

    // Placeholders for the sections list and reference object
    // This global variable stores a NodeList of all the sections
    this.sections = [];
    // This global variable stores an object using IDs as the keys
    // for each section in the panel, these objects are built using `_sectionReference`
    this.sectionRefs = {};

    // Connect the internal only methods to the this context
    this._connectToNav = this._connectToNav.bind(this);
    this._sectionReference = this._sectionReference.bind(this);
    this._parseSections = this._parseSections.bind(this);
    this._init = this._init.bind(this);
    this._attachIntersectionObservers = this._attachIntersectionObservers.bind(this);
    this._intersectionCallback = this._intersectionCallback.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);

    // Define the observers
    this._observer = new MutationObserver(this._init);
    this._intersectionObserver = new IntersectionObserver(this._intersectionCallback, {
      rootMargin: `${this.offsetValue}px 0px 0px 0px`,
      // Threshold is an array of intervals that fire intersection observer event
      // @TODO: Update this to be a dynamic property [0, 0.01, 0.02, 0.03, 0.04, ...]
      threshold: Array(100)
        .fill()
        .map((_, i) => i / 100 || 0)
    });
    this._resizeObserver = new ResizeObserver(this._resizeHandler);

    // Set up a listener for the paired navigation element, if one is not already attached
    if (!this.nav) document.body.addEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);
  }

  connectedCallback() {
    super.connectedCallback();

    // Fire the initalize method and when complete, announce the upgrade to the document
    this._init();

    // Once the upgrade is complete, emit an event announcing the panel upgrade
    if (this.sections) {
      this.emitEvent(PfeJumpLinksPanel.events.upgrade, {
        detail: {
          panel: this,
          sections: this.sections,
          navigation: this.sectionRefs
        }
      });
    }

    // Set up the mutation observer to watch the Jump Links Panel for updates
    this._observer.observe(this, PfeJumpLinksPanel.observerSettings);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._observer.disconnect();
    this._resizeObserver.disconnect();

    this.querySelectorAll("[section-container]").forEach(container => this._intersectionObserver.disconnect(container));

    document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);
  }

  getRefById(id) {
    let capture = Object.values(this.sectionRefs).filter(data => data.id === id);
    return capture[0];
  }

  updateActiveState() {
    const visible = Object.values(this.sectionRefs)
      // We want only sections that are visible
      .filter(section => section.isVisible);

    // Sort the items by largest intersectionRatio which will be the item
    // that is the most visible on the screen.
    // @todo we could take into account other variables like how big the section is on the page
    // .sort((a, b) => a.intersectionRatio - b.intersectionRatio)
    // .reverse()

    // Check if the first item has a large enough ratio visible; if not, remove it
    if (visible.length > 2 && visible[0].intersectionRatio < 1 && visible[1].intersectionRatio > 0.5) {
      visible.shift();
    }

    this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
      detail: {
        panel: this,
        activeIds: visible.map(item => item.id) // All we need is the section id
      }
    });
  }

  /**
   * Connect the panel to it's associated navigation after upgrade
   */
  _connectToNav(evt) {
    // If the target does not match the id of this panel
    if (!(evt.detail && evt.detail.nav && evt.detail.nav.id === this.scrolltarget)) {
      // Return but don't remove the event
      return;
    }

    // Assign the pointer to the nav reference
    this.nav = evt.detail.nav;

    // If a nav element is already defined, return without additional parsing
    if (this.nav) {
      // Stop listening for the navigation
      document.body.removeEventListener("pfe-jump-links-nav:upgraded", this._connectToNav);

      // Stop the nav from listening for the panel to prevent duplication
      document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this.nav._upgradePanelHandler);

      // Add the offset variable to the navigation component
      this.cssVariable(`--pfe-jump-links-nav--offset`, `${this.offsetValue}px`, this.nav);

      // If the nav does not have a pointer to this panel yet, add one
      if (!this.nav.panel) {
        this.nav.connectPanel(this);

        // Fire the intialization
        this.nav._init();
      } else {
        // If the navigation is set to autobuild, fire the build
        if (this.nav.autobuild) this.nav.rebuild(this.sectionRefs);
      }
    }
  }

  /**
   * Build an object reference to a section
   */
  _sectionReference(section) {
    return {
      id: section.id,
      ref: section,
      isVisible: false,
      // @TODO Document the nav-label in the README
      label: (section.getAttribute("nav-label") || section.textContent).trim(),
      childOf: null
    };
  }

  // Note: sections is type array
  _parseSections(sections, sets = [], type = "classes", lastItem = {}) {
    if (sections.length === 0) return sets;

    const section = sections[0];

    // If the section provided does not have the correct classes applied OR
    // If this section does not use an h-tag or is missing an ID
    // Remove it from the list without parsing it
    if (
      (type === "classes" && !section.classList.contains("pfe-jump-links-panel__section")) ||
      (type !== "classes" && !section.tagName.startsWith("H"))
    ) {
      sections.shift();
    }

    // Set defaults for relationship
    let isChild = false;
    let isParent = false;

    // Get details about the item
    const sectionRef = this._sectionReference(section);

    // If the section does not have an ID, add one now
    if (!section.id)
      if (sectionRef.label) {
        section.id = sectionRef.label
          .toLowerCase()
          .replace(/\./, "")
          .split(" ")
          .map(word => `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`)
          .join("");
      } else section.id = this.randomId;

    // If classes are present, determining sibling vs. child relationship
    if (type === "classes") {
      // If the last item has a sub-section class but this one does not, it's a parent element
      // (unless it contains has-sub-section in which case isChild will override)
      if (lastItem && lastItem.ref) {
        isParent = lastItem.ref.classList.contains("sub-section") && !section.classList.contains("sub-section");
        // If this item has a sub-section class but the last one did not, this is a child
        isChild = lastItem.ref.classList.contains("has-sub-section") && section.classList.contains("sub-section");
      }
    } else {
      // Level represents the h-tag level; this helps us determine depth and relationship
      // when no classes are present
      const newLevel = section.tagName.slice(1, 2);

      // Initialize previous level at 0, use last-item to set this value
      let previousLevel = 1;

      // Capture the previous level from the lastItem in the set
      if (lastItem.ref) previousLevel = lastItem.ref.tagName.slice(1, 2);

      // If the new heading is greater than the previous one, this is a child object
      isChild = newLevel > previousLevel;
      // If the new heading is less than the previous one, this is a parent object
      isParent = newLevel < previousLevel;
    }

    // Add the reference to the children of the lastItem
    if (isChild) {
      sectionRef.childOf = lastItem.id;
    } else if (!isParent && lastItem.childOf) {
      sectionRef.childOf = lastItem.childOf;
    } else if (isParent) {
      let parent;
      const sibling = Object.values(sets).filter(item => item.id === lastItem.id);
      if (sibling.length > 0 && sibling[0].childOf) {
        parent = Object.values(sets).filter(item => item.id === sibling[0].childOf);
        // Add the parent ID as the childOf for this element
        if (parent.length > 0 && parent[0].childOf) {
          sectionRef.childOf = parent[0].childOf;
        }
      }
    }

    // Add the sibling or parent to the array
    sets.push(sectionRef);

    // Remove the entry from the sections before looping
    sections.shift();

    // Recurse to see if this has siblings or children
    return this._parseSections(sections, sets, type, sectionRef);
  }

  _init() {
    // Fetch the light DOM sections via class name
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

    // If sections are found, parse the results and store the refs
    if (this.sections.length > 0) {
      this.sectionRefs = this._parseSections([...this.sections]);
    }

    if (this.sections.length <= 0) {
      this.warn(
        `No elements in ${this.tag} included the .${this.tag}__section class. Grepping instead for h-level tags as a fallback.`
      );

      // Search for sections using h-level tags with IDs (the IDs are critical to the navigation working)
      this.sections = this.querySelectorAll("h1[id],h2[id],h3[id],h4[id],h5[id],h6[id]");
      if (this.sections) this.sectionRefs = this._parseSections([...this.sections], [], "markup");
    }

    if (this.sectionRefs.length > 0) {
      // If nav exists, pass the sections to it for building
      if (this.nav) this.nav.buildNav(this.sectionRefs);
    }

    this.style.position = "relative";

    // Attach the intersection observer for each section to determine if it's visible
    this._attachIntersectionObservers();

    // Set the offset value as a variable on the document for sticky nav elements to use
    if (this.nav) this.cssVariable(`--pfe-jump-links-nav--offset`, `${this.offsetValue}px`, this.nav);

    // Attach the resize observer
    this._resizeObserver.observe(this);
  }

  _attachIntersectionObservers() {
    // Attach the intersection observer for each section to determine if it's visible
    this.sections.forEach(section => this._intersectionObserver.observe(section));
  }

  _resizeHandler(entries) {
    // Disconnect the observer while we process
    this._resizeObserver.disconnect();

    this._attachIntersectionObservers();

    // Attach the resize observer
    this._resizeObserver.observe(this);
  }

  /**
   * This handler processes the results of the intersection observer
   */
  _intersectionCallback(entries, observer) {
    // Get all the sections that are visible in the viewport
    entries.forEach(entry => {
      let section = entry.target.parentNode;
      if (section.id) {
        // Find the targeted ID in the references
        let ref = this.getRefById(section.id);
        if (ref) {
          (ref.isVisible = entry.isIntersecting), // && entry.intersectionRatio > 0.5 ? true : false;
            (ref.intersectionRatio = entry.intersectionRatio);
        }
      }
    });

    this.updateActiveState();
  }
}

/*!
 * PatternFly Elements: PfeJumpLinks 1.9.0
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

PFElement.create(PfeJumpLinksPanel);
PFElement.create(PfeJumpLinksNav);
//# sourceMappingURL=pfe-jump-links.js.map
