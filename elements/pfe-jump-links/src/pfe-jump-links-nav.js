// Import polyfills: findIndex, closest
import "./polyfills--pfe-jump-links-nav.js";

import PFElement from "../../pfelement/dist/pfelement.js";

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

  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get events() {
    return {
      activeNavItem: `pfe-jump-links-panel:active-navItem`,
    };
  }

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
      color: {
        title: "Color",
        type: String,
        default: "lightest",
        values: ["lightest", "darkest"],
      },
      offset: {
        title: "Offset",
        type: Number,
      },
      mobileBreakpoint: {
        title: "Mobile breakpoint (max-width)",
        type: String,
        default: "991px",
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

  get isMobile() {
    return window.matchMedia(`(max-width: ${this.mobileBreakpoint})`).matches;
  }

  get header() {
    return this.getSlot(["heading", "pfe-jump-links-nav--heading"])[0];
  }

  get container() {
    return this.shadowRoot.querySelector("#container");
  }

  set panel(NodeItem) {
    this._panel = NodeItem;
  }

  get panel() {
    // If a custom panel is already set, use that
    if (this._panel) return this._panel;

    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.id) {
      return document.querySelector(`[scrolltarget=${this.id}]`);
    } else {
      this.id = this.randomId;
      const panels = customElements.get("pfe-jump-links-panel").instances || [];
      console.log(panels);
      // If only one panel is found, let's assume that goes to this nav
      if (panels.length === 1) {
        panels[0].setAttribute("scrolltarget", this.id);
        return panels[0];
      } else if (panels.length > 1) {
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
    }

    return;
  }

  set sections(NodeList) {
    this._sections = NodeList;
  }

  get sections() {
    const panel = this.panel;
    if (!panel) return;

    // If a custom set of sections is already defined, use that
    if (this._sections) return this._sections;

    // If this is not autobuilt, use the IDs from the light DOM
    if (!this.autobuild) {
      const links = [...this.querySelectorAll("ul > li > a[href]")];
      const ids = links.map((link) => `[id="${link.href.replace(/^.*\/\#(.*?)/, "$1")}"]`);
      return panel.querySelectorAll(ids.join(","));
    }

    return (
      panel.querySelectorAll(`.pfe-jump-links-panel__section`) ||
      panel.shadowRoot.querySelectorAll(`.pfe-jump-links-panel__section`) ||
      panel.querySelectorAll(`[id]`)
    );
  }

  get links() {
    return [...this.container.querySelectorAll("a")];
    // return [...this.shadowRoot.querySelectorAll("a")];
  }

  get items() {
    return [...this.shadowRoot.querySelectorAll(`.${this.tag}__item`)];
  }

  listVariables() {
    console.table({
      "--pfe-jump-links--offset": this.cssVariable(`pfe-jump-links--offset`),
      "--pfe-jump-links-panel--offset": this.cssVariable(`pfe-jump-links-panel--offset`),
      "--pfe-jump-links-nav--Height--actual": this.cssVariable(`pfe-jump-links-nav--Height--actual`),
      "--pfe-navigation--Height--actual": this.cssVariable(`pfe-navigation--Height--actual`)
    });
  }

  get offsetValue() {
    // Get the primary navigation height
    let pfeNavigationHeight = parseInt(this.cssVariable(`pfe-navigation--Height--actual`), 10);

    // If the variable is not set, see if the component exists
    if (!pfeNavigationHeight) {
      const pfeNavigation = document.querySelector("pfe-navigation");
      if (pfeNavigation) pfeNavigationHeight = pfeNavigation.getBoundingClientRect().height;
    }

    // No offset if this is a horizontal element, should sit beneath the pfe-navigation if it exists
    if (this.horizontal) return pfeNavigationHeight || 0;

    return (
        this.offset ||
        parseInt(this.cssVariable(`pfe-jump-links--offset`), 10) ||
        parseInt(this.cssVariable(`pfe-jump-links-panel--offset`), 10)
      ) + ( pfeNavigationHeight || 10 );
  }

  constructor() {
    super(PfeJumpLinksNav, {
      type: PfeJumpLinksNav.PfeType,
    });

    this.isBuilding = false;
    this.isVisible = false;
    
    this.scrolling = false;
    // This flag indicates if the rebuild should update the light DOM
    this.update = false;
    this._panel, this._sections;

    this.build = this.build.bind(this);
    this.rebuild = this.rebuild.bind(this);
    this.active = this.active.bind(this);
    this.inactive = this.inactive.bind(this);
    this.clearActive = this.clearActive.bind(this);
    this.closeAccordion = this.closeAccordion.bind(this);

    this._buildWrapper = this._buildWrapper.bind(this);
    this._buildItem = this._buildItem.bind(this);
    this._init = this._init.bind(this);

    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._updateLightDOM = this._updateLightDOM.bind(this);
    this._reportHeight = this._reportHeight.bind(this);

    this._clickHandler = this._clickHandler.bind(this);
    this._scrollHandler = this._scrollHandler.bind(this);
    this._resizeHandler = this._resizeHandler.bind(this);
    this._mutationHandler = this._mutationHandler.bind(this);
    this._panelChangedHandler = this._panelChangedHandler.bind(this);

    this._observer = new MutationObserver(this._mutationHandler);
  }

  connectedCallback() {
    super.connectedCallback();

    // Do not try to render navigation in IE11
    if (this.isIE11) {
      this.setAttribute("hidden", "");
      return;
    }
    
    window.addEventListener('locationchange', evt => console.log("locationchange", evt));
    window.addEventListener('hashchange', evt => console.log("hashchange", evt));

    this._init();

    window.addEventListener("resize", this._resizeHandler);
    window.addEventListener("scroll", this._scrollHandler);
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    this._observer.disconnect();

    if (this.autobuild) document.removeEventListener("pfe-jump-links-panel:change", this._panelChangedHandler);

    window.removeEventListener("resize", this._resizeHandler);
    window.removeEventListener("scroll", this._scrollHandler);
  }

  build(data) {
    if (!data && !this.sections) return;

    let sections = data;
    if (!sections && this.sections) sections = [...this.sections];

    // Can't build the navigation dynamically without sections defined
    if (!sections) return;

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
          content: sectionHeading.getAttribute("nav-label") || sectionHeading.innerHTML,
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
    return wrapper;
  }

  closeAccordion() {
    // @TODO
    // Create JSON tokens for media query breakpoints
    if (window.matchMedia("(min-width: 992px)").matches) {
      return;
    }
    const accordion = this.shadowRoot.querySelector("pfe-accordion");
    setTimeout(() => {
      Promise.all([customElements.whenDefined("pfe-accordion")]).then(() => {
        accordion.collapseAll();
      });
    }, 750);
  }

  rebuild() {
    // If the build is happening, wait until it is complete
    if (this.isBuilding) {
      setTimeout(this.rebuild, 10);
    } else {
      // Re-render the template first
      this.render();

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

      this._reportHeight();

      // Set the offset on the nav element, if it's horizontal, only take the navigation into account
      if (this.horizontal) {
        this.style.top = `${Number.parseInt(this.cssVariable(`pfe-navigation--Height--actual`), 10)}px`;
      } else {
        this.style.top = `${
          Number.parseInt(this.cssVariable(`pfe-navigation--Height--actual`), 10) + this.offsetValue
        }px`;
      }

      // Attach the event listeners
      this.items.forEach((item) => {
        item.querySelector("a").addEventListener("click", this._clickHandler);
      });

      this.update = false;
    }
  }

  // Accepts an index or the link element itself
  active(item) {
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

    if (has_subsection) {
      li.setAttribute("active", "");
      li.setAttribute("expand", "");
    } else if (is_subsection) {
      parentli.setAttribute("active", "");
      parentli.setAttribute("expand", "");
    } else {
      li.setAttribute("active", "");
    }
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

    if (has_subsection) {
      li.removeAttribute("active");
      li.removeAttribute("expand");
    } else if (is_subsection) {
      parentli.removeAttribute("active");
      parentli.removeAttribute("expand");
    } else {
      li.removeAttribute("active");
    }
  }

  clearActive() {
    const items = this.items;
    items.forEach((item) => this.inactive(item));
  }

  _buildItem(data, isSubSection = false) {
    let item = document.createElement("li");
    item.className = "pfe-jump-links-nav__item";

    let link = document.createElement("a");
    link.className = "pfe-jump-links-nav__link";
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

  _reportHeight() {
    const styles = window.getComputedStyle(this);

    let height = styles.getPropertyValue("height");
    if (!this.isMobile && !this.horizontal) height = "0px";

    const current = this.cssVariable(`pfe-jump-links-nav--Height--actual`, null, document.documentElement) || 0;
    if (Number.parseInt(height) >= Number.parseInt(current)) {
      this.cssVariable(`pfe-jump-links-nav--Height--actual`, height, document.documentElement);
    }
  }

  // Run this if the component is _not_ set to autobuild
  _isValidLightDom() {
    if (!this.hasLightDOM()) {
      this.warn(
        `This component requires an unordered list in the light DOM to render; alternatively, add the attribute \`autobuild\` attribute to dynamically generate the list.`
      );
      return false;
    }

    if (
      (this.hasSlot(["logo", "pfe-jump-links-nav--logo"]) || this.hasSlot(["link", "pfe-jump-links-nav--link"])) &&
      !this.horizontal
    ) {
      this.warn(`The logo and link slots are NOT supported in vertical jump links.`);
    }

    if (!this.querySelector("ul")) {
      if (!this.horizontal && !this.autobuild) {
        this.warn(`The mark-up for the navigation should contain a <ul> element`);
      }

      return false;
    }

    if (Number.isInteger(Number(this.customVar))) {
      this.warn(
        "Using an integer with a unit is not supported for custom property --pfe-jump-links-panel--offset. The component strips the unit using parseInt(). For example so 1rem would become 1 and behave as if you had entered 1px. Values with a pixel unit will behave correctly."
      );
    }

    return true;
  }

  _updateLightDOM() {
    const menu = this.querySelector("ul");

    // Update the mark-up in the light DOM if necessary
    // If the class is not already on the list wrapper
    if (!menu.classList.contains("pfe-jump-links-nav")) {
      menu.classList.add("pfe-jump-links-nav");
    }

    menu.querySelectorAll("li").forEach((item) => {
      if (!item.classList.contains("pfe-jump-links-nav__item")) {
        item.classList.add("pfe-jump-links-nav__item");
      }
    });

    menu.querySelectorAll("ul").forEach((item) => {
      if (!item.classList.contains("sub-nav")) {
        item.classList.add("sub-nav");
      }
    });
  }

  _init() {
    this._observer.disconnect();

    let menu;
    // Check that the light DOM is there and accurate
    if (!this.autobuild && this._isValidLightDom()) {
      this._updateLightDOM();
      menu = this.querySelector("ul");
    } else {
      // Try to build the navigation based on the panel
      menu = this.build();
    }

    // Move the menu into the shadow DOM
    if (menu) {
      if (this.container.innerHTML !== menu.outerHTML.toString()) {
        this.container.innerHTML = menu.outerHTML.toString();
      }

      this._reportHeight();

      // Attach the event listeners
      this.links.forEach((link) => {
        link.addEventListener("click", this._clickHandler);
      });
    }

    // Listen for a change in the panel content if the navigation is autobuilt
    // need to reflect changes in the navigation markup
    if (this.autobuild) {
      document.addEventListener("pfe-jump-links-panel:change", this._panelChangedHandler);
    }

    // Set the offset on the nav element, if it's horizontal, only take the navigation into account
    let navHeight = Number.parseInt(this.cssVariable(`pfe-navigation--Height--actual`), 10) || 0;
    // If it's not a horizontal navigation, look for the offset value
    if (!this.horizontal) navHeight += this.offsetValue;
    this.style.top = `${navHeight}px`;

    // Run the scroll handler at initialization to determine active item
    this._scrollHandler();

    // Trigger the mutation observer
    this._observer.observe(this, PfeJumpLinksNav.observer);
  }

  _clickHandler(evt) {
    evt.preventDefault();

    const link = evt.target;
    const li = link.closest(`.${this.tag}__item`);
    const idx = this.items.findIndex((el) => el === li);
    const section = this.sections[idx];

    this.scrolling = true;

    scroll({
      top: section.offsetTop - this.offsetValue,
      behavior: "smooth",
    });

    console.log(`scroll to ${section.offsetTop} - ${this.offsetValue}px`);

    // Pause briefly before allowing scroll events again
    setTimeout(() => {
      this.scrolling = false;
    }, 100);

    // Update the URL but don't impact the back button
    history.replaceState({}, "", link.href);

    // Clear current active items
    this.clearActive();

    // Set this item as active
    this.active(li);

    // If this is mobile, close the accordion
    if (this.isMobile) this.closeAccordion();
  }

  _scrollHandler() {
    // If scrolling is being managed, do not use this handler
    if (this.scrolling) return;

    clearTimeout(this._scrollHandler._tId);
    this._scrollHandler._tId = setTimeout(() => {    
      this.isVisible = (
        this.getBoundingClientRect().bottom >= 0 &&
        this.getBoundingClientRect().top <= document.documentElement.clientHeight && 
        this.getBoundingClientRect().right >= 0 &&
        this.getBoundingClientRect().left <= document.documentElement.clientWidth
      );

      // If this element is not visible, exit processing now
      if (!this.isVisible) return;

      // Offset details
      console.log(this.id);
      this.listVariables();

      // If this element is at the top of the viewport, add attribute "stuck"
      if (this.getBoundingClientRect().top === 0) {
        // this.offsetValue
        this.setAttribute("stuck", "");
      } else {
        this.removeAttribute("stuck");
      }

      // Make an array from the node list
      if (!this.sections) return;

      const sections = [...this.sections];

      // Get all the sections that match this point in the scroll
      const matches = sections.filter((section) => {
        return (
          section.getBoundingClientRect().top > 0 && // this.offsetValue
          section.getBoundingClientRect().bottom < window.innerHeight
        );
      });

      // Don't change anything if no items were found
      if (matches.length === 0) return;

      // Identify the first one queried as the current section
      let current = matches[0];

      // If there is more than 1 match, check it's distance from the top
      // whichever is within 200px, that is our current.
      if (matches.length > 1) {
        const close = matches.filter((section) => section.getBoundingClientRect().top <= 200);
        // If 1 or more items are found, use the last one.
        if (close.length > 0) {
          // current = close[close.length - 1];
          current = close[0];
        }
      }

      if (current) {
        const currentIdx = sections.indexOf(current);

        // If that section isn't already active,
        // remove active from the other links and make it active
        if (currentIdx !== this.currentActive) {
          this.currentActive = currentIdx;

          this.clearActive();
          this.active(currentIdx);

          // Emit event for tracking
          this.emitEvent(PfeJumpLinksNav.events.activeNavItem, {
            detail: {
              activeNavItem: currentIdx,
            },
          });
        }
      }
    }, 10);
  }

  _resizeHandler() {
    clearTimeout(this.rebuild._tId);
    this.rebuild._tId = setTimeout(this.rebuild, 10);
  }

  _mutationHandler() {
    this.update = true;
    this.rebuild();
  }

  _panelChangedHandler() {
    this.update = true;
    this.rebuild();
  }
}

export default PfeJumpLinksNav;
