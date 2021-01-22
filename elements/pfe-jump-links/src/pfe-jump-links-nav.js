// Import polyfills: NodeList.prototype.forEach
import "./polyfills--pfe-jump-links-nav.js";

import PFElement from "../../pfelement/dist/pfelement.js";
import PfeJumpLinksPanel from "./pfe-jump-links-panel.js";

class PfeJumpLinksNav extends PFElement {
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
        type: Boolean
      },
      srText: {
        title: "Screen reader text",
        type: String,
        default: "Jump to section"
      },
      color: {
        title: "Color",
        type: String,
        values: ["darkest"]
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
      characterData: true,
      attributes: true
    };
  }

  // get panel() {
  //   // Use the ID from the navigation to target the panel elements
  //   // Automatically if there's only one set of tags on the page
  //   if (this.id) {
  //     this.removeAttribute("hidden");
  //     return document.querySelector(`[scrolltarget=${this.id}]`);
  //   } else {
  //     const panels = document.querySelectorAll(PfeJumpLinksPanel.tag);
  //     if (panels.length === 1) {
  //       this.removeAttribute("hidden");
  //       panels[0].id = this.randomId;
  //       return panels[0];
  //     } else if (panels.length > 1) {
  //       this.warn(
  //         `Cannot locate a panel that is connected to this navigation element.${
  //           this.id ? ` Please add scrolltarget="${this.id}" to the appropriate panel.` : ""
  //         }`
  //       );
  //     } else {
  //       this.warn(
  //         `Cannot locate any panels on this page. Please add a ${PfeJumpLinksPanel.tag} element around the content you want to target.`
  //       );
  //     }
  //   }

  //   // Hide the navigation if no content can be found
  //   this.setAttribute("hidden", "");
  //   return;
  // }

  constructor() {
    super(PfeJumpLinksNav, {
      type: PfeJumpLinksNav.PfeType
    });

    // Global pointer to the associated panel
    this.panel = undefined;

    // List of panel sections
    this.list = [];

    // this._scrollHandler = this._scrollHandler.bind(this);

    // Debouncer state for buildNav()
    this._buildingNav = false;
    this.links = [];

    // this._connectToPanel = this._connectToPanel.bind(this);

    this._buildNav = this._buildNav.bind(this);
    this._buildItem = this._buildItem.bind(this);

    // this._parsePanel = this._parsePanel.bind(this);

    this._init = this._init.bind(this);
    this._reportHeight = this._reportHeight.bind(this);
    this._clickHandler = this._clickHandler.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);

    // this.getItemById = this.getItemById.bind(this);

    this._observer = new MutationObserver(this._init);
  }

  // _connectToPanel(evt) {
  //   console.log(evt.detail);
  //   if (!this.panel && evt.detail && evt.detail.panel) {
  //     let pointer = evt.detail.panel;
  //     if (pointer.scrolltarget === this.id) {
  //       this.panel = pointer;

  //       // Stop the panel from listening for the nav upgrade
  //       document.body.removeEventListener(PfeJumpLinksNav.events.upgrade, this.panel._connectToNav);

  //       if (!this.panel.nav) {
  //         this.panel.nav = this;
  //         console.dir(this);
  //       }
  //       // Fire rebuild if necessary...
  //     } else {
  //       // Escape without removing the event
  //       return;
  //     }
  //   }

  //   // Stop listening for the panel
  //   document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this._connectToPanel);
  // }

  connectedCallback() {
    super.connectedCallback();

    // if (!this.panel) {
    //   document.body.addEventListener(PfeJumpLinksPanel.events.upgrade, this._connectToPanel);
    // }

    this._init();

    // if (this.panel)
    //   this.panel.addEventListener(PfeJumpLinksPanel.events.activeNavItem, evt => {
    // console.log(evt.detail.activeNavId);
    // console.log(this.getItemById(evt.detail.activeNavId));
    // let item = this.getItemById(evt.detail.activeNavId);
    // if (item) this.setActive(item);
    // });

    // Trigger the mutation observer
    if (!this.autobuild) this._observer.observe(this, PfeJumpLinksNav.observerSettings);

    // const anchors = this.shadowRoot.querySelectorAll("#container li > a");

    // for (const anchor of anchors) {
    //   console.log(anchor);
    //   // @TODO: This wouldn't work if the headline is in a shadow root
    //   // const headline = document.getElementById(anchor.hash.substring(1));
    //   // if (headline) {
    //   //   this.list.push({
    //   //     top: headline.getBoundingClientRect().top,
    //   //     headline,
    //   //     anchor
    //   //   });
    //   // }
    // }

    // @TODO: debounce
    // window.addEventListener("scroll", this._scrollHandler);

    // this._scrollHandler();

    this.emitEvent(PfeJumpLinksNav.events.upgrade, {
      detail: {
        nav: this
      }
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    // this._observer.disconnect();

    document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this._parsePanel);

    if (this.panel) {
      this.panel.removeEventListener(PfeJumpLinksPanel.events.change, this._init);
      // this.panel.removeEventListener(PfeJumpLinksPanel.events.activeNavItem, () => {});
    }

    [...this.links].forEach(link => {
      link.removeEventListener("click", this._clickHandler);
    });
  }

  _clickHandler() {
    // @TODO
    // Create JSON tokens for media query breakpoints
    if (window.matchMedia("(min-width: 992px)").matches) {
      return;
    }
    setTimeout(this.closeAccordion, 750);
  }

  closeAccordion() {
    this.shadowRoot.querySelector("pfe-accordion").collapseAll();
  }

  rebuild(navset = []) {
    return this._buildNav(navset);
  }

  getItemById(id) {
    // console.log(this.links);
    if (!this.links) return;
    return [...this.links].filter(el => el.id === id);
  }

  setActive(link) {
    if (!link) return;

    this.removeAllActive();

    // let activeLink = this.links.item(link);
    let listItem = link.closest("li");
    // Check if this is a subnav or has subsections
    if (link.classList.contains("sub-section")) {
      let parent = listItem.closest("li");
      parent.setAttribute("active", "");
      parent.classList.add("expand");
    } else if (link.classList.contains("has-sub-section")) {
      listItem.classList.add("expand");
    }

    listItem.setAttribute("active", "");
  }

  removeActive(link) {
    if (!this.links.item(link)) return;

    if (link.classList.contains("sub-section")) {
      link
        .closest("li")
        .closest("li")
        .classList.remove("expand");
    }

    link.removeAttribute("active");
    link.closest("li").removeAttribute("active");
  }

  removeAllActive() {
    this.links.forEach(link => this.removeActive(link));
  }

  _buildItem(data, isSubSection = false) {
    let item = document.createElement("li");
    item.className = "pfe-jump-links-nav__item";

    let link = document.createElement("a");
    link.className = "pfe-jump-links-nav__link";
    link.href = `#${data.id}`;
    link.setAttribute("data-target", data.id);
    link.innerHTML = data.label;

    if (data.subsection) link.classList.add("has-sub-section");
    if (isSubSection) link.classList.add("sub-section");

    item.appendChild(link);
    return item;
  }

  // _parsePanel(evt) {
  //   // Remove the listener
  //   document.body.removeEventListener(PfeJumpLinksPanel.events.upgrade, this._parsePanel);
  // }

  _buildNav(set = []) {
    // If there is no panel, there is no way to build the nav

    if (!this.panel && set.length === 0) {
      // Attach a listener for the panel upgrade
      // document.body.addEventListener(PfeJumpLinksPanel.events.upgrade, this._parsePanel);
      return;
    }

    // Add debouncer to prevent this function being run more than once
    // at the same time. Prevents IE from being stuck in infinite loop
    if (this._buildingNav) return;

    // Flag that the nav is being actively built/rebuilt
    this._buildingNav = true;

    if (window.ShadyCSS) this._observer.disconnect();

    let wrapper = document.createElement("ul");
    wrapper.className = "pfe-jump-links-nav";

    set.forEach(item => {
      let child = this._buildItem(item);

      if (item.subsection) {
        let nested = document.createElement("ul");
        nested.className = "sub-nav";
        item.subsection.forEach(subsection => {
          nested.appendChild(this._buildItem(subsection, true));
        });

        child.appendChild(nested);
      }

      wrapper.appendChild(child);
    });

    this.innerHTML = wrapper.outerHTML;

    // Reset debouncer to allow buildNav() to run on the next cycle
    this._buildingNav = false;

    if (window.ShadyCSS) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }

  _isValidLightDom() {
    if (!this.hasLightDOM() || !(this.querySelector("ul") || this.querySelector("ol"))) {
      this.warn(`You must have a <ul> or <ol> tag in the light DOM or use the autobuild attribute`);
      return false;
    }

    if (
      (this.hasSlot("logo") ||
        this.hasSlot(`${this.tag}--logo`) ||
        this.hasSlot("link") ||
        this.hasSlot(`${this.tag}--link`)) &&
      !this.horizontal
    ) {
      this.warn(`logo and link slots are NOT supported in vertical jump links`);
    }

    // if (this.children[1].tagName !== "UL") {
    //   if (!this.horizontal) {
    //     this.warn(`The top-level list of links MUST be a <ul>`);
    //   }

    //   return false;
    // }

    if (Number.isInteger(Number(this.customVar))) {
      this.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }

    return true;
  }

  _reportHeight() {
    const cssVarName = `--${this.tag}--Height--actual`;
    const styles = window.getComputedStyle(this);

    let height = styles.getPropertyValue("height");
    if (window.matchMedia("(min-width: 992px)").matches) {
      height = "0";
    }

    if (this.panel) this.panel.style.setProperty(cssVarName, height);
  }

  _copyListToShadow() {
    const menu = this.querySelector("ul") || this.querySelector("ol");

    if (!menu) return;

    // If the class is not already on the list wrapper
    if (!menu.classList.contains("pfe-jump-links-nav")) {
      menu.classList.add("pfe-jump-links-nav");
    }

    // Copy the menu into the shadow DOM
    this.shadowRoot.querySelector("#container").innerHTML = menu.outerHTML;
  }

  _init() {
    // If this is not an autobuild component AND it does not have valid light DOM, return
    if (!this.autobuild && !this._isValidLightDom()) return;

    // Disconnect the observer
    if (window.ShadyCSS) this._observer.disconnect();

    // Capture the light DOM list
    if (this.autobuild) {
      // Fire the build navigation and when it is done, fetch the links
      this._buildNav();
    }

    this._copyListToShadow();
    this.links = this.shadowRoot.querySelectorAll("#container li > a");

    this._reportHeight();

    // Attach event listeners to each link in the list
    this.links.forEach(link => {
      link.addEventListener("click", this._clickHandler);
    });

    // Listen for any panel changes if autobuild is in place
    if (this.panel && this.autobuild) this.panel.addEventListener(PfeJumpLinksPanel.events.change, this._init);

    // Set the scroll behavior of the html tag
    // document.set.scrollBehavior = "smooth";

    // Trigger the mutation observer
    if (window.ShadyCSS) this._observer.observe(this, PfeJumpLinksNav.observerSettings);
  }
}

export default PfeJumpLinksNav;
