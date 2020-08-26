import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeJumpLinks 1.0.0-prerelease.55
 * @license
 * Copyright 2020 Red Hat, Inc.
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

const pfeJumpLinksNavObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
};

const pfeJumpLinksPanelObserverConfig = {
  childList: true,
  subtree: true,
  characterData: true,
  attributes: true
};

class PfeJumpLinks extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{display:block}:host([hidden]){display:none}
/*# sourceMappingURL=pfe-jump-links.min.css.map */
</style><slot></slot>`;
  }

  static get properties() {
    return {};
  }

  static get slots() {
    return {"default":{"title":"Default slot","type":"array","namedSlot":false,"items":{"oneOf":[{"$ref":"raw"}]}}};
  }
  static get tag() {
    return "pfe-jump-links";
  }

  get schemaUrl() {
    return "pfe-jump-links.json";
  }

  get templateUrl() {
    return "pfe-jump-links.html";
  }

  get styleUrl() {
    return "pfe-jump-links.scss";
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  constructor() {
    super(PfeJumpLinks, { type: PfeJumpLinks.PfeType });
  }
}

class PfeJumpLinksNav extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{-webkit-box-sizing:border-box;box-sizing:border-box;font-family:Overpass,Overpass,Helvetica,helvetica,arial,sans-serif;font-family:var(--pfe-theme--font-family, "Overpass", Overpass, Helvetica, helvetica, arial, sans-serif);font-weight:500;font-weight:var(--pfe-theme--font-weight--normal,500);font-weight:400;display:block;position:-webkit-sticky;position:sticky;top:calc(16px * 4);top:calc(var(--pfe-theme--container-spacer,16px) * 4);padding-left:0;background-color:#fff;background-color:var(--pfe-jump-links--BackgroundColor,var(--pfe-theme--color--surface--lightest,#fff))}@media (min-width:992px){:host{border:1px solid transparent;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) transparent;padding:calc(16px * 2) calc(16px * 2);padding:var(--pfe-jump-links--vertical-spacer,calc(var(--pfe-theme--container-padding,16px) * 2)) var(--pfe-jump-links--horizontal-spacer,calc(var(--pfe-theme--container-padding,16px) * 2))}}:host ::slotted([slot=pfe-jump-links-nav--heading]){color:#3c3f42;color:var(--pfe-broadcasted--text,#3c3f42);margin:0 0 16px;margin:0 0 var(--pfe-theme--container-spacer,16px);font-size:14px;font-size:var(--pfe-jump-links__heading--FontSize,var(--pfe-theme--font-size--heading--zeta,14px));font-weight:400;text-transform:uppercase}@media (max-width:991px){:host ::slotted([slot=pfe-jump-links-nav--heading]){display:none}}:host([pfe-sticky=false]){position:relative}nav{visibility:visible;margin:0;list-style:none;padding:0}nav ul{padding:0;border-left:1px solid #d2d2d2;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}nav li{border-left:4px solid transparent;border-left:var(--pfe-theme--surface--border-width--heavy,4px) var(--pfe-theme--surface--border-style,solid) transparent;display:block;text-decoration:none;margin-left:calc(1px * -1);margin-left:calc(var(--pfe-theme--surface--border-width,1px) * -1)}nav li.expand ul{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}nav li.expand .sub-section{display:table;height:auto}nav li[active]{border-left-color:#06c;border-left-color:var(--pfe-jump-links--BorderColor,var(--pfe-theme--color--ui-accent,#06c))}nav a{position:relative;display:table;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73);font-size:16px;font-size:var(--pfe-jump-links--FontSize,var(--pfe-theme--font-size--heading--epsilon,16px));text-decoration:none;line-height:1.5;line-height:var(--pfe-theme--line-height,1.5);padding:calc(calc(24px / 6) * 2) calc(calc(24px / 3) * 2);padding:calc(var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 6)) * 2) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 3)) * 2)}nav a.has-sub-section{padding-bottom:calc(24px / 6);padding-bottom:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 6))}nav a.sub-section{margin-left:calc(16px * .75);margin-left:calc(var(--pfe-theme--container-spacer,16px) * .75);font-size:calc(16px * .85);font-size:calc(var(--pfe-jump-links--FontSize,var(--pfe-theme--font-size--heading--epsilon,16px)) * .85);padding:calc(24px / 6) calc(calc(24px / 3) * 2);padding:var(--pfe-jump-links__link--vertical-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 6)) calc(var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 3)) * 2)}@media (min-width:992px){nav a.sub-section{display:none}}nav a.sub-section:last-child{padding-bottom:calc(24px / 3);padding-bottom:var(--pfe-jump-links__link--horizontal-spacer,calc(var(--pfe-theme--content-spacer,24px)/ 3))}nav a::after{content:"";position:absolute;width:calc(100% - 4px);width:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));height:calc(100% - 4px);height:calc(100% - var(--pfe-theme--surface--border-width--heavy,4px));top:0;left:0}nav a:focus{outline:0}nav a:focus::after{border-radius:3px;border-radius:var(--pfe-theme--surface--border-radius,3px);border:2px solid #06c;border:2px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--link,#06c)}nav a:hover{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}nav a[active]{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}nav ul ul{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-webkit-flex:0;-ms-flex:0;flex:0;margin:0;padding:0;border-left:none!important;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear}nav ul ul li{border-left:none!important}pfe-accordion{--pfe-accordion--BackgroundColor:transparent;--pfe-accordion--accent:transparent;--pfe-accordion--BorderLeftWidth:0;--pfe-accordion--BorderColor:transparent;--pfe-accordion--BorderColor--accent:transparent}@media (min-width:992px){pfe-accordion{--pfe-accordion__base--Padding:0}}@media (max-width:991px){pfe-accordion{border:1px solid #d2d2d2;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled,#d2d2d2)}}pfe-accordion-header{--pfe-theme--color--surface--border:transparent;--pfe-theme--color--ui-base--on-dark:transparent;--pfe-theme--color--ui-base:transparent;position:-webkit-sticky;position:sticky;top:0}@media (max-width:991px){pfe-accordion-header{background-color:#fff;background-color:var(--pfe-theme--color--surface--lightest,#fff);--theme:light}}@media (min-width:992px){pfe-accordion-header{visibility:collapse!important;display:none}}pfe-accordion-panel{border-left-color:transparent}@media (min-width:992px){pfe-accordion-panel{visibility:collapse;display:none;opacity:1;display:block}}@media (min-width:992px){pfe-accordion-panel>pfe-jump-links-nav{width:100%;display:block;visibility:visible}}:host([pfe-color=darkest]){--pfe-jump-links--theme:dark;--pfe-jump-links--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);border:1px solid #6a6e73;border:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([pfe-color=darkest]) button[aria-expanded=true],:host([pfe-color=darkest]) pfe-accordion-header,:host([pfe-color=darkest]) pfe-accordion-panel{--pfe-accordion--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515);--pfe-jump-links--BackgroundColor:var(--pfe-theme--color--surface--darkest, #151515)}:host([pfe-color=darkest]) ::slotted([slot=pfe-jump-links-nav--heading]){color:#f0f0f0;color:var(--pfe-theme--color--surface--lighter,#f0f0f0)}:host([pfe-color=darkest]) ul{border-left:1px solid #6a6e73;border-left:var(--pfe-theme--surface--border-width,1px) var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([pfe-color=darkest]) ul li[active]{border-left:3px solid #06c;border-left:3px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#06c)}:host([pfe-color=darkest]) ul a{color:#2b9af3;color:var(--pfe-theme--color--ui-accent--focus--on-dark,#2b9af3)}:host([pfe-color=darkest]) ul a:hover{color:#2b9af3;color:var(--pfe-theme--color--ui-accent--hover--on-dark,#2b9af3)}:host([pfe-color=darkest]) ul a[active]{color:#73bcf7;color:var(--pfe-theme--color--ui-accent--on-dark,#73bcf7)}:host([pfe-color=darkest]) ul a:focus::after{border-color:#73bcf7;border-color:var(--pfe-theme--color--link--on-dark,#73bcf7)}:host([hidden]){display:none}:host([pfe-c-horizontal]){padding:0;top:0;width:100%}:host([pfe-c-horizontal]) nav{min-height:calc(16px * 5.5);min-height:calc(var(--pfe-theme--container-spacer,16px) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}:host([pfe-c-horizontal]) nav .pfe-jump-links-nav__heading{display:none}:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){position:absolute;left:0;max-height:calc(16px * 3.5);max-height:calc(var(--pfe-theme--container-spacer,16px) * 3.5);max-width:calc(16px * 14);max-width:calc(var(--pfe-theme--container-spacer,16px) * 14);top:calc(16px * 1);top:calc(var(--pfe-theme--container-spacer,16px) * 1)}@media (max-width:991px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){left:calc(16px * 2);left:calc(var(--pfe-theme--container-spacer,16px) * 2)}}@media (min-width:992px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--logo]){left:calc(16px * 4);left:calc(var(--pfe-theme--container-spacer,16px) * 4)}}:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){position:absolute;top:calc(16px * 1);top:calc(var(--pfe-theme--container-spacer,16px) * 1)}@media (max-width:991px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){right:calc(16px * 2);right:calc(var(--pfe-theme--container-spacer,16px) * 2)}}@media (min-width:992px){:host([pfe-c-horizontal]) nav ::slotted([slot=pfe-jump-links-nav--cta]){right:calc(16px * 4);right:calc(var(--pfe-theme--container-spacer,16px) * 4)}}:host([pfe-c-horizontal]) #container{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([pfe-c-horizontal]) ul{border:none;display:block;text-align:center;-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin:0;margin-left:auto;margin-right:auto}:host([pfe-c-horizontal]) ul li{padding:0 calc(16px * 1.5);padding:0 calc(var(--pfe-theme--container-spacer,16px) * 1.5);display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:calc(16px * 5);height:calc(var(--pfe-theme--container-spacer,16px) * 5);-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-top:4px solid transparent;border-top:4px var(--pfe-theme--surface--border-style,solid) transparent;border-bottom:4px solid transparent;border-bottom:4px var(--pfe-theme--surface--border-style,solid) transparent;border-left:none;border-right:none}:host([pfe-c-horizontal]) ul li[active]{border-top:4px solid #06c;border-top:4px var(--pfe-theme--surface--border-style,solid) var(--pfe-theme--color--ui-accent,#06c)}:host([pfe-c-horizontal]) ul a{text-decoration:none;color:#6a6e73;color:var(--pfe-theme--color--ui-disabled--text,#6a6e73)}:host([pfe-c-horizontal]) ul a[active]{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}:host([pfe-c-horizontal]) ul a:hover{color:#151515;color:var(--pfe-theme--color--surface--darkest,#151515)}@media (max-width:991px){:host([pfe-c-horizontal]) nav{min-height:calc(16px * 5.5);min-height:calc(var(--pfe-theme--container-spacer,16px) * 5.5);background-color:#f0f0f0;background-color:var(--pfe-theme--color--surface--lighter,#f0f0f0)}:host([pfe-c-horizontal]) .pfe-jump-links-nav{display:none}}
/*# sourceMappingURL=pfe-jump-links-nav.min.css.map */
</style>
  ${this.hasAttribute("pfe-c-horizontal") ? `` :
  `<pfe-accordion>
    <pfe-accordion-header>
    </pfe-accordion-header>
    <pfe-accordion-panel>`
      }
      <nav>
        <slot class="pfe-jump-links-nav__heading" name="pfe-jump-links-nav--heading" id="pfe-jump-links-nav--heading">
        </slot>
        <slot class="pfe-jump-links-nav__logo" name="pfe-jump-links-nav--logo"></slot>
        <div id="container"></div>
        <slot class="pfe-jump-links-nav__cta" name="pfe-jump-links-nav--cta"></slot>
      </nav>
      ${this.hasAttribute("pfe-c-horizontal") ? `` :
      `</pfe-accordion-panel>
  </pfe-accordion>`
  }`;
  }
  static get tag() {
    return "pfe-jump-links-nav";
  }

  get schemaUrl() {
    return "pfe-jump-links-nav.json";
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

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType });

    this._buildNav = this._buildNav.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._menuContainer = this.shadowRoot.querySelector("#container");
    this._observer = new MutationObserver(this._mutationCallback);
    this._reportHeight = this._reportHeight.bind(this);
    this.panel = document.querySelector(`[pfe-c-scrolltarget=${this.id}]`);

    window.addEventListener("resize", () => {});
  }

  connectedCallback() {
    super.connectedCallback();
    //Check that the light DOM is there
    if (this.hasAttribute("autobuild")) {
      this._buildNav();
    } else {
      //Check that the light DOM is valid
      if (this._isValidLightDom()) {
        const menu = this.querySelector("ul");
        menu.classList.add("pfe-jump-links-nav");
        this._menuContainer.innerHTML = menu.outerHTML;

        let div = document.createElement("div");

        div.innerHTML = `<h2 class="sr-only" hidden>${this.getAttribute(
          "sr-text"
        )}</h2>`;

        if (this.getAttribute("sr-text")) {
          this.shadowRoot.querySelector("nav").prepend(div);
        }

        let html = "";
        if (this.querySelector("[slot='pfe-jump-links-nav--heading']")) {
          html = this.querySelector(
            "[slot='pfe-jump-links-nav--heading']"
          ).cloneNode(true);
        }
        if (!this.hasAttribute("pfe-c-horizontal") && html !== "") {
          this.shadowRoot
            .querySelector("pfe-accordion-header")
            .appendChild(html);
        } else {
          const heading = document.createElement("h3");
          heading.id = "pfe-jump-links-nav--heading";

          this.shadowRoot
            .querySelector("pfe-accordion-header")
            .appendChild(heading);
          this.shadowRoot.querySelector(
            "#pfe-jump-links-nav--heading"
          ).innerHTML = "Jump to section";
        }
      }
    }
    this._reportHeight();

    this._observer.observe(this, pfeJumpLinksNavObserverConfig);

    this.panel = document.querySelector(`[pfe-c-scrolltarget="${this.id}"]`);

    this.panel.addEventListener(
      PfeJumpLinksPanel.events.change,
      this._buildNav
    );
  }

  disconnectedCallback() {
    this._observer.disconnect();
    this.panel.removeEventListener(
      PfeJumpLinksPanel.events.change,
      this._buildNav
    );
    this.removeEventListener("click");
  }

  _rebuildNav() {
    this._buildNav();
  }

  _buildNav() {
    const buildLinkList = () => {
      let linkList = ``;
      if (!this.panel) {
        this.panel = document.querySelector(
          `[pfe-c-scrolltarget="${this.id}"]`
        );
      }
      let panelSections = this.panel.querySelectorAll(
        ".pfe-jump-links-panel__section"
      );

      for (let i = 0; i < panelSections.length; i++) {
        let arr = [...panelSections];
        if (arr[i].classList.contains("has-sub-section")) {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link has-sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
            <ul class="sub-nav">
        `;
          linkList += linkListItem;
        } else if (arr[i].classList.contains("sub-section")) {
          let linkSubItem = `
        <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
        </li>`;
          if (!arr[i + 1].classList.contains("sub-section")) {
            linkSubItem += `</ul></li>`;
          }
          linkList += linkSubItem;
        } else {
          let linkListItem = `
          <li class="pfe-jump-links-nav__item">
            <a
              class="pfe-jump-links-nav__link"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
          </li>
        `;
          linkList += linkListItem;
        }
      }
      return linkList;
    };

    let html = `
      <ul class="pfe-jump-links-nav">
        ${buildLinkList()}
    `;
    this.shadowRoot.querySelector("#container").innerHTML = html;
    let heading = document.createElement("h3");
    heading.innerHTML = "Jump to section";
    this.shadowRoot.querySelector("pfe-accordion-header").appendChild(heading);
  }

  _mutationCallback() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    if (!this.hasAttribute("autobuild")) {
      const menu = this.querySelector("ul");
      this._menuContainer.innerHTML = menu.outerHTML;
    } else if (this.hasAttribute("autobuild")) {
      this._buildNav();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, pfeJumpLinksNavObserverConfig);
    }
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(
        `${PfeJumpLinks.tag}: You must have a <ul> tag in the light DOM`
      );
      return false;
    }
    if (
      (this.has_slot("logo") || this.has_slot("link")) &&
      !this.hasAttribute("pfe-c-horizontal")
    ) {
      console.warn(
        `${PfeJumpLinks.tag}: logo and link slots NOT supported in vertical jump links`
      );
    }
    if (this.children[1].tagName !== "UL") {
      if (!this.hasAttribute("pfe-c-horizontal")) {
        console.warn(
          `${PfeJumpLinks.tag}: The top-level list of links MUST be a <ul>`
        );
      }

      return false;
    }

    return true;
  }

  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const height = this.clientHeight + "px";
    this.panel.style.setProperty(cssVarName, height);
  }
}

class PfeJumpLinksPanel extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<slot></slot>`;
  }
  static get tag() {
    return "pfe-jump-links-panel";
  }

  get schemaUrl() {
    return "pfe-jump-links-panel.json";
  }

  get templateUrl() {
    return "pfe-jump-links-panel.html";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`
    };
  }

  get offsetValue() {
    return this.sectionMargin || this.customVar;
  }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get observedAttributes() {
    return ["pfe-c-offset"];
  }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._handleResize = this._handleResize.bind(this);
    this._observer = new MutationObserver(this._mutationCallback);
    this.currentActive = null;
    this.currentActive = 0;
    this.current = -1;
    window.addEventListener("resize", this._handleResize);
  }

  connectedCallback() {
    super.connectedCallback();
    this.nav = this._getNav();
    this._init();
    this.sectionMargin = this.getAttribute("pfe-c-offset");
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;
    if (this.nav && this.nav.hasAttribute("pfe-c-autobuild")) {
      this.nav._rebuildNav();
    }

    this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
  }

  disconnectedCallback() {
    this._observer.disconnect();
    window.removeEventListener("scroll");
    this._slot.removeEventListener("slotchange", this._init);
    window.removeEventListener("resize", this._handleResize);
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(attr, oldVal, newVal);

    switch (attr) {
      case "pfe-c-offset":
        this.sectionMargin = newVal;
        break;
    }
  }

  _init() {
    window.addEventListener("scroll", this._scrollCallback);
    this.scrollTarget = this.getAttribute("pfe-c-scrolltarget");
    this.JumpLinksNav = document.querySelector(`#${this.scrollTarget}`);
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");

    if (this.JumpLinksNav) {
      this.menu_links = this.JumpLinksNav.querySelectorAll("a");
    }
  }

  _handleResize() {
    this.nav._reportHeight();
    this.sectionMargin = this.getAttribute("pfe-c-offset");
    this.customVar = this.cssVariable("--pfe-jump-links-panel--offset") || 200;
  }

  _getNav() {
    return document.querySelector(
      `pfe-jump-links-nav#${this.getAttribute("pfe-c-scrolltarget")}`
    );
  }

  _makeActive(link) {
    if (this.menu_links[link]) {
      // Check if this is a subnav or has subsections
      if (this.menu_links[link].classList.contains("sub-section")) {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.parentNode.parentNode.setAttribute(
          "active",
          ""
        );
        this.menu_links[link].parentNode.parentNode.parentNode.classList.add(
          "expand"
        );
      } else if (this.menu_links[link].classList.contains("has-sub-section")) {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.setAttribute("active", "");
        this.menu_links[link].parentNode.classList.add("expand");
      } else {
        this.menu_links[link].setAttribute("active", "");
        this.menu_links[link].parentNode.setAttribute("active", "");
      }

      let activeLink = this.JumpLinksNav.querySelector("[active]");
      this.emitEvent(PfeJumpLinksPanel.events.activeNavItem, {
        detail: {
          activeNavItem: activeLink
        }
      });
    }
  }

  _removeActive(link) {
    if (this.menu_links[link]) {
      if (this.menu_links[link].classList.contains("sub-section")) {
        this.menu_links[link].parentNode.parentNode.parentNode.classList.remove(
          "expand"
        );
      }
      this.menu_links[link].removeAttribute("active");
      this.menu_links[link].parentNode.removeAttribute("active");
    }
  }

  _removeAllActive() {
    if (!Object.keys) {
      Object.keys = function(obj) {
        if (obj !== Object(obj))
          throw new TypeError("Object.keys called on a non-object");
        var k = [],
          p;
        for (p in obj)
          if (Object.prototype.hasOwnProperty.call(obj, p)) k.push(p);
        return k;
      };
      Object.keys.forEach = Array.forEach;
    }
    [...Array(this.sections.length).keys()].forEach(link => {
      this._removeActive(link);
    });
  }

  _mutationCallback() {
    if (window.ShadyCSS) {
      this._observer.disconnect();
    }

    //If we didn't get nav in the constructor, grab it now
    if (!this.nav) {
      this.nav = document.querySelector(
        `pfe-jump-links-nav#${this.getAttribute("pfe-c-scrolltarget")}`
      );
    }
    //If we want the nav to be built automatically, re-init panel and rebuild nav
    if (this.nav.hasAttribute("autobuild")) {
      this._init();
      this.emitEvent(PfeJumpLinksPanel.events.change);
      this.nav._rebuildNav();
    }

    if (window.ShadyCSS) {
      this._observer.observe(this, pfeJumpLinksPanelObserverConfig);
    }
  }

  _scrollCallback() {
    let sections;
    let menu_links;
    //Check sections to make sure we have them (if not, get them)
    if (!this.sections || typeof this.sections === "undefined") {
      this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    } else {
      sections = this.sections;
    }
    //Check list of links to make sure we have them (if not, get them)
    if (this.menu_links.length < 1 || !this.menu_links) {
      this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll("a");
      menu_links = this.menu_links;
    }

    // Make an array from the node list
    const sectionArr = [...sections];
    // Get all the sections that match this point in the scroll
    const matches = sectionArr
      .filter(section => window.scrollY >= section.offsetTop - this.offsetValue)
      .reverse();

    //Identify the last one queried as the current section
    const current = sectionArr.indexOf(matches[0]);

    // If that section isn't already active,
    // remove active from the other links and make it active
    if (current !== this.currentActive) {
      this._removeAllActive();
      this.currentActive = current;
      this._makeActive(current);
    }
  }
}

PFElement.create(PfeJumpLinks);
PFElement.create(PfeJumpLinksNav);
PFElement.create(PfeJumpLinksPanel);

export default PfeJumpLinks;
//# sourceMappingURL=pfe-jump-links.js.map
