import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeJumpLinks 1.0.0-prerelease.39
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

class PfeJumpLinks extends PFElement {
  static get version() {
    return "1.0.0-prerelease.39";
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

  // static get events() {
  //   return {
  //   };
  // }

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeJumpLinks, { type: PfeJumpLinks.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}
}

class PfeJumpLinksNav extends PFElement {
  static get version() {
    return "1.0.0-prerelease.39";
  }

  get html() {
    return `<style>:host{font-weight:400;display:block;position:-webkit-sticky;position:sticky;top:calc(16px * 4);top:calc(var(--pfe-theme--container-spacer,16px) * 4);padding:calc(16px * 2);padding:calc(var(--pfe-theme--container-spacer,16px) * 2);--pfe-jump-links--BackgroundColor:BackgroundColor}::slotted([slot=heading]){margin:0 0 1rem 0!important;margin-bottom:calc(16px * 1);margin-bottom:calc(var(--pfe-theme--container-spacer,16px) * 1);font-size:14px;font-weight:400;text-transform:uppercase}ul.pfe-jump-links-nav{padding:1rem 1rem 1rem 0;padding:1rem 1rem 1rem 0;margin:0;list-style:none}ul.sub-nav{margin:0;padding:0;overflow-y:hidden;-webkit-transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:-webkit-box-flex 1s linear,-webkit-flex 1s linear;transition:flex 1s linear;transition:flex 1s linear,-webkit-box-flex 1s linear,-webkit-flex 1s linear,-ms-flex 1s linear;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-flex:0;-webkit-flex:0;-ms-flex:0;flex:0}li{border-left:3px solid transparent;display:block;text-decoration:none}li.expand ul.sub-nav{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1}li.expand a.sub-section{display:table;height:auto}a{display:table;text-decoration:none;font-size:16px;padding:8px;line-height:1.5;border-left:3px solid transparent;position:relative}a.sub-section{display:none;margin-left:12px;font-size:14px}a::after{content:"";position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:0;left:0}a:focus{outline:0}a:focus::after{border-radius:3px;border:2px solid #62a1f4}:host([default]){border:1px solid #d2d2d2}:host([default]) ::slotted([slot=heading]){color:#151515}:host([default]) ul.pfe-jump-links-nav{border-left:1px solid #d2d2d2}:host([default]) li[active]{border-left:3px solid #06c}:host([default]) a{color:#72767b;position:relative}:host([default]) a:hover{color:#151515}:host([default]) a[active]{color:#151515}:host([default]) a::after{content:"";position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:0;left:0}:host([default]) a:focus{outline:0}:host([default]) a:focus::after{border-radius:3px;border:2px solid #62a1f4}:host([dark]){background-color:#151515;border:1px solid #72767b}:host([dark]) ::slotted([slot=heading]){color:#ccc}:host([dark]) ul.pfe-jump-links-nav{border-left:1px solid #72767b}:host([dark]) li[active]{border-left:3px solid #e00}:host([dark]) a{color:#ccc}:host([dark]) a:hover{color:#999}:host([dark]) a[active]{color:#fff}:host([dark]) a::after{content:"";position:absolute;width:calc(100% - 4px);height:calc(100% - 4px);top:0;left:0}:host([dark]) a:focus{outline:0}:host([dark]) a:focus::after{border-radius:3px;border:2px solid #62a1f4}:host([hidden]){display:none}:host([horizontal]){padding:0;top:0;width:100%;background-color:#f0f0f0}:host([horizontal]) nav{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;position:relative}:host([horizontal]) nav ::slotted([slot=heading]){display:none}:host([horizontal]) nav ::slotted([slot=logo]){position:absolute;left:0;max-height:56px;max-width:224px;top:1rem;left:64px}:host([horizontal]) nav ::slotted([slot=link]){position:absolute;right:64px;top:1rem;background-color:red;padding:16px 32px;border-radius:3px;color:#fff!important}:host([horizontal]) .heading{display:none}:host([horizontal]) #container{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;justify-items:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column}:host([horizontal]) ul{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;padding:0;width:auto;margin-left:auto;margin-right:auto}:host([horizontal]) ul li{padding:0 24px;display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;height:80px;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;border-top:4px solid transparent;border-bottom:4px solid transparent;border-left:none;border-right:none}:host([horizontal]) ul li[active]{border-top:4px solid #e00}:host([horizontal]) a{color:#72767b}:host([horizontal]) a[active]{color:#151515}
/*# sourceMappingURL=pfe-jump-links-nav.min.css.map */
</style><nav>
  <h2 class="sr-only" hidden>Page navigation</h2>
  ${ this.has_slot("heading") ?
  `<slot class="heading" name="heading" id="heading"></slot>`
  : `<h4 class="heading" id="heading">Jump to section</h4>`
  }
  ${ this.has_slot("logo") ?
  `<slot class="logo" name="logo" id="logo"></slot>`
  : ``
  }

  <div id="container"></div>
  ${ this.has_slot("link") ?
  `<slot class="link" name="link" id="link"></slot>`
  : ``
  }
</nav>`;
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

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeJumpLinksNav, { type: PfeJumpLinksNav.PfeType });

    this._buildNav = this._buildNav.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._menuContainer = this.shadowRoot.querySelector("#container");
    this._observer = new MutationObserver(this._mutationCallback);
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here

    //Check that the light DOM is there
    if (this.hasAttribute("autobuild")) {
      this._buildNav();
    } else {
      //Check that the light DOM is valid
      if (this._isValidLightDom()) {
        const menu = this.querySelector("ul");
        this._menuContainer.innerHTML = menu.outerHTML;
      }
    }

    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });

    this.panel = document.querySelector(`[scrolltarget="${this.id}"]`);

    this.panel.addEventListener(
      PfeJumpLinksPanel.events.change,
      this._buildNav
    );
  }

  disconnectedCallback() {
    this.removeEventListener("click");
    this.removeEventListener(PfeJumpLinksPanel.events.change, _eventCallback);
  }

  _rebuildNav() {
    this._buildNav();
  }

  _buildNav() {
    const buildLinkList = () => {
      let linkList = ``;
      if (!this.panel) {
        this.panel = document.querySelector(`[scrolltarget="${this.id}"]`);
      }
      let panelSections = this.panel.querySelectorAll(
        ".pfe-jump-links-panel__section"
      );

      for (let i = 0; i < panelSections.length; i++) {
        let arr = [...panelSections];
        if (arr[i].classList.contains("has-sub-section")) {
          let linkListItem = `
          <li>
            <a
              class="pfe-jump-links-nav__item has-sub-section"
              href="#${arr[i].id}"
              data-target="${arr[i].id}">
                ${arr[i].innerHTML}
            </a>
            <ul class="sub-nav">
        `;
          linkList += linkListItem;
        } else if (arr[i].classList.contains("sub-section")) {
          let linkSubItem = `
        <li>
            <a
              class="pfe-jump-links-nav__item sub-section"
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
          <li>
            <a
              class="pfe-jump-links-nav__item"
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
  }

  _mutationCallback() {
    if (!this.hasAttribute("autobuild")) {
      const menu = this.querySelector("ul");
      this._menuContainer.innerHTML = menu.outerHTML;
    }
  }

  _isValidLightDom() {
    if (!this.children.length) {
      console.warn(
        `${PfeJumpLinks.tag}: You must have a <ul> tag in the light DOM`
      );
      return false;
    }

    if (this.children[1].tagName !== "UL") {
      console.warn(
        `${PfeJumpLinks.tag}: The top-level list of links MUST be a <ul>`
      );

      return false;
    }

    return true;
  }
}

class PfeJumpLinksPanel extends PFElement {
  static get version() {
    return "1.0.0-prerelease.39";
  }

  get html() {
    return `<style>
/*# sourceMappingURL=pfe-jump-links-panel.min.css.map */
</style><slot></slot>`;
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

  get styleUrl() {
    return "pfe-jump-links-panel.scss";
  }

  static get events() {
    return {
      change: `${this.tag}:change`,
      activeNavItem: `${this.tag}:active-navItem`
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  // static get observedAttributes() {
  //   return [];
  // }

  constructor() {
    super(PfeJumpLinksPanel, { type: PfeJumpLinksPanel.PfeType });
    this._init = this._init.bind(this);
    this._slot = this.shadowRoot.querySelector("slot");
    this._slot.addEventListener("slotchange", this._init);
    this._scrollCallback = this._scrollCallback.bind(this);
    this._mutationCallback = this._mutationCallback.bind(this);
    this._observer = new MutationObserver(this._mutationCallback);
    this.currentActive = null;
    this.sectionMargin = this.getAttribute("offset") || 200;
    this.currentActive = 0;
    this.current = -1;
    this.nav = this._getNav();
  }

  connectedCallback() {
    super.connectedCallback();
    this._init();
    this.nav._rebuildNav();
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true
    });
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {
    window.removeEventListener("scroll");
    this._slot.removeEventListener("slotchange", this._init);
  }

  _init() {
    window.addEventListener("scroll", this._scrollCallback);
    this.scrollTarget = this.getAttribute("scrolltarget");
    this.JumpLinksNav = document.querySelector(`#${this.scrollTarget}`);
    this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    if (this.JumpLinksNav) {
      this.menu_links = this.JumpLinksNav.querySelectorAll(
        ".pfe-jump-links-nav__item"
      );
    }
  }

  _getNav() {
    return document.querySelector(
      `pfe-jump-links-nav#${this.getAttribute("scrolltarget")}`
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
      //@TODO Should add logic here that doesn't remove active attribute
      // when ones of its children is the active link

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
    [...Array(this.sections.length).keys()].forEach(link => {
      this._removeActive(link);
    });
  }

  _mutationCallback() {
    //If we didn't get nav in the constructor, grab it now
    if (!this.nav) {
      this.nav = document.querySelector(
        `pfe-jump-links-nav#${this.getAttribute("scrolltarget")}`
      );
    }
    //If we want the nav to be built automatically, re-init panel and rebuild nav
    if (this.nav.hasAttribute("autobuild")) {
      this._init();
      //@TODO change this to emit an event that nav is subscribed to
      this.emitEvent(PfeJumpLinksPanel.events.change);
      this.nav._rebuildNav();
    }
  }

  _scrollCallback() {
    let sections;
    let menu_links;
    let sectionMargin;

    //Check sections to make sure we have them (if not, get them)
    if (!this.sections || typeof this.sections === "undefined") {
      this.sections = this.querySelectorAll(".pfe-jump-links-panel__section");
    } else {
      sections = this.sections;
    }
    //Check list of links to make sure we have them (if not, get them)
    if (this.menu_links.length < 1 || !this.menu_links) {
      this.menu_links = this.JumpLinksNav.shadowRoot.querySelectorAll(
        ".pfe-jump-links-nav__item"
      );
      menu_links = this.menu_links;
    }

    //@TODO read value from an attribute so devs can customize
    // margin from the top of the window
    if (!this.sectionMargin) {
      sectionMargin = 200;
    } else {
      sectionMargin = this.sectionMargin;
    }

    // Make an array from the node list
    const sectionArr = [...sections];
    // Get all the sections that match this point in the scroll
    const matches = sectionArr
      .filter(section => window.scrollY >= section.offsetTop - sectionMargin)
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
