// Import polyfills: findIndex, closest
import "./polyfills--pfe-jump-links-nav.js";

import PFElement from "../../pfelement/dist/pfelement.js";

// Used for rendering
import PfeAccordion from "../../pfe-accordion/dist/pfe-accordion.js";

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
      sticky: `pfe-jump-links-nav:sticky-change`,
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
      // @TODO Need to incorporate support for breakpoint customizations i.e., offset="@500px: 200, @800px: 150"
      offset: {
        title: "Offset",
        type: Number,
      },
      mobileBreakpoint: {
        title: "Mobile breakpoint (max-width)",
        type: String,
      },
      isStuck: {
        title: "Stickiness state",
        type: Boolean,
        attr: "stuck",
        observer: "_stickyHandler",
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
   * @requires {this.mobileBreakpoint} or {PFElement.breakpoint}
   * @returns {Boolean} true if this is at or below the mobile breakpoint
   */
  get isMobile() {
    if (this.mobileBreakpoint) return window.matchMedia(`(max-width: ${this.mobileBreakpoint})`).matches;

    // Default to the PFElement breakpoints
    const data = PFElement.breakpoint.lg.match(/([0-9]+)([a-z]*)/);
    if (data.length < 1) return "991px";

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
    }
  }

  /**
   * This getter returns the panel for the navigation item; if a custom pointer was set
   * it will return that, otherwise, it tries to find the panel
   * @param {NodeItem} Pointer to the panel content
   */
  get panel() {
    // If a custom panel is already set, use that
    if (this._panel) return this._panel;

    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.id) {
      return document.querySelector(`[scrolltarget="${this.id}"]`);
    } else {
      this.id = this.randomId;
      const panels = customElements.get("pfe-jump-links-panel").instances || [];
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

  // @TODO Explore if we can build jump links sections without panels; @castastrophe to add issue for this feature
  set sections(NodeList) {
    this._sections = NodeList;
  }

  get sections() {
    // If a custom set of sections is already defined, use that
    if (this._sections) return this._sections;

    // @TODO this requirement could possibly be loosened
    const panel = this.panel;
    if (!panel) return;

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

    // @TODO @castastrophe look into --pfe-c-offset variables?
    const offsetVariable =
      this.cssVariable("pfe-jump-links--offset") || this.cssVariable("pfe-jump-links-panel--offset");

    if (offsetVariable && Number.parseInt(offsetVariable, 10) >= 0) {
      return Number.parseInt(offsetVariable, 10);
    }

    //--
    // If the offsets are not provided, calculate the height of what is currently sticky
    let height = 0;

    // Get the primary navigation height
    const navHeightVariable = this.cssVariable(`pfe-navigation--Height--actual`);
    if (navHeightVariable && Number.parseInt(navHeightVariable, 10) > 0) {
      height = Number.parseInt(navHeightVariable, 10);
    }

    // If this is mobile or horizontal & current stuck, return with the nav-height only
    if (this.isStuck && (this.isMobile || this.horizontal)) return height;

    // If this is not a horizontal jump link, check if any other horizontal jump links exist
    const stickyJumpLinks = this.cssVariable("pfe-jump-links--Height--actual");
    if (stickyJumpLinks && Number.parseInt(stickyJumpLinks, 10) > 0) {
      height = height + Number.parseInt(stickyJumpLinks, 10);
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

    this._buildWrapper = this._buildWrapper.bind(this);
    this._buildItem = this._buildItem.bind(this);
    this._init = this._init.bind(this);

    this._isValidLightDom = this._isValidLightDom.bind(this);
    this._updateLightDOM = this._updateLightDOM.bind(this);
    this._reportHeight = this._reportHeight.bind(this);
    this._updateOffset = this._updateOffset.bind(this);
    this._checkVisible = this._checkVisible.bind(this);
    this._scrollTo = this._scrollTo.bind(this);

    this._stickyHandler = this._stickyHandler.bind(this);
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

    // If the stickiness changes, update the offset (unless the offset is manually set)
    if (!this.offset) {
      window.addEventListener(PfeJumpLinksNav.events.sticky, this._updateOffset);
    }

    // @TODO respond to URL change?
    // window.addEventListener("locationchange", (evt) => console.log("locationchange", evt));
    // window.addEventListener("hashchange", (evt) => console.log("hashchange", evt));

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
    window.removeEventListener(PfeJumpLinksNav.events.sticky, this._updateOffset);
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
    if (!this.isMobile) return;

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
        this.update = false;
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
  }

  // Accepts an index or the link element itself
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

    if (has_subsection) {
      li.setAttribute("active", "");
      li.setAttribute("expand", "");
    } else if (is_subsection) {
      parentli.setAttribute("active", "");
      parentli.setAttribute("expand", "");
    } else {
      li.setAttribute("active", "");
    }

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
    item.className = `${this.tag}__item`;

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

  _siblingJumpLinks(filterMethod = (item) => item !== this) {
    return PfeJumpLinksNav.instances.filter(filterMethod);
  }

  _reportHeight() {
    let height = 0;

    // If this navigation is sticky and is either horizontal or in a mobile state, get it's actual height
    if (this.isStuck && (this.horizontal || this.isMobile)) height = this.getBoundingClientRect().height;

    const siblings = this._siblingJumpLinks(
      (item) => item !== this && item.isStuck && (item.horizontal || this.isMobile)
    );

    // Check if other jump link items are in a sticky state (so that we don't accidentally overwrite it with 0)
    // Loop through each sibling to get the max height
    siblings.forEach((item) => {
      let itemHeight = item.getBoundingClientRect().height;
      if (itemHeight > height) height = itemHeight;
    });

    // Check if we need to update the variable:
    const currentHeight = this.cssVariable(`pfe-jump-links--Height--actual`, null, document.body);
    if (!currentHeight || Number.parseInt(currentHeight, 10) !== height) {
      // If there are no other sticky jump links, set the height on the body
      // Note: we set it on the body to be consistent with pfe-navigation
      this.cssVariable(`pfe-jump-links--Height--actual`, `${height}px`, document.body);
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
      if (!item.classList.contains(`${this.tag}__item`)) {
        item.classList.add(`${this.tag}__item`);
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

      this._updateOffset();

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

    // Run the scroll handler at initialization to determine active item
    this._checkVisible();

    const idx = this.getActive();

    // Activate initial active item
    if (this.isVisible && idx >= 0) this.active(idx);
    else if (this.isVisible) this.active(0);

    // Trigger the mutation observer
    this._observer.observe(this, PfeJumpLinksNav.observer);
  }

  _checkVisible() {
    this.isVisible =
      this.getBoundingClientRect().top <= document.documentElement.clientHeight &&
      this.getBoundingClientRect().right >= 0 &&
      this.getBoundingClientRect().bottom >= 0 &&
      this.getBoundingClientRect().left <= document.documentElement.clientWidth;
  }

  // This updates the offset value on this component based on the reported offset height on the document
  _updateOffset() {
    this._reportHeight();

    // Set the offset on the nav element
    if (this.horizontal) this.style.top = `${this.offsetValue}px`;
    else this.style.top = `${this.offsetValue + 20}px`;
  }

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

    this._scrollTo(idx);
  }

  _scrollTo(idx) {
    // Get the offset value to scroll-to
    const section = this.sections[idx];
    let scrollTarget = section.offsetTop - this.offsetValue;

    // Prevent negative margin scrolling
    if (scrollTarget < 0) scrollTarget = section.offsetTop;

    this.isStuck = !!(this.getBoundingClientRect().top === this.offsetValue);

    if ((this.horizontal || this.isMobile) && this.isStuck) {
      scrollTarget = scrollTarget - this.getBoundingClientRect().height;
    }
    
    window.scroll({
      top: scrollTarget - 20,
      behavior: "smooth",
    });

    // Close the accordion
    this.closeAccordion();

    setTimeout(()=> {
      // Update the focus state
      section.focus();

      this._clicked = false;
    }, 1000);
  }

  _stickyHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    this._reportHeight();
    
    this.emitEvent(PfeJumpLinksNav.events.sticky, {
      detail: {
        isStuck: newVal,
      },
    });
  }

  _scrollHandler() {
    // If this is from a click event, do nothing
    if (this._clicked) return;

    clearTimeout(this._scrollHandler._tId);
    this._scrollHandler._tId = setTimeout(() => {
      // Check the current visibility of this jump links navigation
      this._checkVisible();

      // If this navigation is not visible, exit processing now
      if (!this.isVisible) return;

      this.isStuck = !!(this.getBoundingClientRect().top === this.offsetValue);

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

  _mutationHandler() {
    this.update = true;
    this.rebuild();
  }

  _panelChangedHandler() {
    this.update = true;

    // Reset the sections object to allow refetching
    this._sections = null;

    this.rebuild();
  }
}

export default PfeJumpLinksNav;
