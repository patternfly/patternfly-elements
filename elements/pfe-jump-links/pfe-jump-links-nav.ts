import type { Breakpoints } from '@patternfly/pfe-core';

import { LitElement, html } from 'lit';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { customElement, property, query, state } from 'lit/decorators.js';

import { pfelement, bound, observed } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
import { when } from '@patternfly/pfe-core/directives/when.js';

import { CssVariableController } from '@patternfly/pfe-core/controllers/css-variable-controller.js';
import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import { PfeJumpLinksPanel } from './pfe-jump-links-panel.js';

import style from './pfe-jump-links-nav.scss';

import '@patternfly/pfe-accordion';

interface ItemData {
  target: string;
  content: string|null;
  subsection: boolean;
}

function isAnchor(x: EventTarget|null): x is HTMLAnchorElement {
  return x instanceof HTMLAnchorElement;
}

function isQueryable(x: Node): x is Document|ShadowRoot {
  return x instanceof Document || x instanceof ShadowRoot;
}

// @TODO This needs a click handler for if the accordion is stuck to the top
// and the user clicks outside the accordion element (should close accordion).

/**
 * @fires pfe-jump-links-panel:active-navItem
 * @fires pfe-jump-links-nav:change
 * @fires pfe-jump-links-nav:stuck
 *
 * @slot heading - The label displayed above the navigation element describing it's function.  Defaults to "Jump to section".
 * @slot - The component creates a mirror shadowRoot based on the light DOM markup provided in the default slot.
 * @slot logo -
 * @slot cta -
 */
@customElement('pfe-jump-links-nav') @pfelement()
export class PfeJumpLinksNav extends LitElement {
  static readonly styles = [style];

  /**
   * List of all events in the component
   */
  static get events() {
    return {
      activeNavItem: `pfe-jump-links-panel:active-navItem`,
      change: `pfe-jump-links-panel:change`,
      stuck: `pfe-jump-links-nav:stuck`,
    };
  }

  /**
   * Breakpoint object mapping human-readable size names to viewport sizes
   * To overwrite this at the component-level, include `static get breakpoint` in your component's class definition
   * @returns {Object} keys are t-shirt sizes and values map to screen-sizes (sourced from PF4)
   */
  static readonly breakpoint: Breakpoints = Object.freeze({
    'xs': '0px',
    'sm': '576px',
    'md': '768px',
    'lg': '992px',
    'xl': '1200px',
    '2xl': '1450px',
  });

  static instances = new Set<PfeJumpLinksNav>();

  private logger = new Logger(this);

  /**
   * Flips the switch on the component to create its own markup for the navigation. You can add `pfe-jump-links-panel__section` to each section that should show in the nav. If you want to use sub-sections add `has-sub-section` to the parent section that should always show and the `sub-section` class to the children of that section. If you use this attribute, keep in mind that non-JavaScript environments (some search engines, browsers with JS disabled) will not see the proper markup.
   */
  @property({ type: Boolean, reflect: true }) autobuild = false;

  /** Horizontal */
  @property({ type: Boolean, reflect: true }) horizontal = false;

  // Reflects if the nav is stuck in place
  // @TODO note this in the documentation as a readonly property
  /** Stickiness state */
  @observed @property({ type: Boolean, reflect: true }) stuck = false;

  /** Opt-out of the header region */
  @property({ type: Boolean, reflect: true, attribute: 'no-header' }) noHeader = false;

  // @TODO: Document this more

  /**
   * This attribute is read when the component upgrades to provide the innerText of the heading. If there is no `sr-text` attribute then the component defaults to "JUMP TO SECTION". This attribute is to enable translations and internationalization.
   */
  @property({ type: String, reflect: true, attribute: 'sr-text' }) srText = 'Jump to section';

  // Supports only lightest and darkest background colors
  /** Color */
  @property({ type: String, reflect: true }) color: 'lightest'|'darkest' = 'lightest';

  // @TODO Need to incorporate support for breakpoint customizations i.e., offset="@500px: 200, @800px: 150"
  /**
   * This attribute determines the distance from the top of the browser window to trigger a switch from one link being active to the next. For instance `offset="600"` would mean that threshold flips at 600px from the top. The default is set at 200, and if you desire 200px then you can leave this attribute off. The `offset` attribute should be placed on `pfe-jump-links-panel`. There is a css solution to control the offset, however the attribute value takes precedence over css. To read more about a css solution see below.
   */
  @property({ type: Number, reflect: true }) offset?: number;

  // Breakpoint at which the nav switches to an accordion
  /** Mobile breakpoint (max-width) */
  @property({ type: String, reflect: true, attribute: 'mobile-breakpoint' })
  mobileBreakpoint?: string;

  /** Number of ms to wait before collapsing the accordion on click */
  @property({ type: Number, reflect: true, attribute: 'accordion-collapse-timing' })
  accordionCollapseTiming = 750;

  /** Container element from the shadow DOM for the nav list */
  @query('#container') container?: HTMLElement|null;

  @state() private containerInnerHTML = '';

  private isBuilding = false;

  private isVisible = false;

  private scrollTimeout?: number;

  /** This flag indicates if the rebuild should update the light DOM */
  private updateLightDom = false;

  private currentActive?: number;

  private _panel?: PfeJumpLinksPanel;

  private _sections: NodeListOf<HTMLElement>|null = null;

  private _clicked = false;

  private _observer = new MutationObserver(this._mutationHandler);

  private css = new CssVariableController(this);

  private slots = new SlotController(this, ['heading', 'logo', 'cta']);

  /**
   * @requires {this.mobileBreakpoint || LitElement.breakpoint}
   * @returns true if this is at or below the mobile breakpoint
   */
  get isMobile(): boolean | '991px' {
    if (this.mobileBreakpoint) return window.matchMedia(`(max-width: ${this.mobileBreakpoint})`).matches;

    // Default to the LitElement breakpoints
    const data = PfeJumpLinksNav.breakpoint.lg.match(/([0-9]+)([a-z]*)/) as string[];
    if (data.length < 1) return '991px';

    // Subtract one because LitElement breakpoints uses mobile-first numbering
    return window.matchMedia(`(max-width: ${parseInt(data[1], 10) - 1}${data[2]})`).matches;
  }

  /**
   * Slot assigned to heading
   */
  get header(): Element {
    const [header] = this.slots.getSlotted('heading');
    return header;
  }

  /**
   * Slot assigned to cta
   */
  get cta(): Element {
    const [cta] = this.slots.getSlotted('cta');
    return cta;
  }

  /**
   * Slot assigned to logo
   */
  get logo(): Element {
    const [logo] = this.slots.getSlotted('logo');
    return logo;
  }

  /**
   * This setter lets you pass in a custom panel NodeItem to the navigation
   * @param  Pointer to the panel content
   */
  set panel(node: PfeJumpLinksPanel|null) {
    if (node) {
      this._panel = node;

      // Attach a scrolltarget attribute if one does not yet exist
      if (!this._panel.hasAttribute('scrolltarget'))
        this._panel.setAttribute('scrolltarget', this.id);


      // Emit an event to indicate a change in the panel
      this.dispatchEvent(pfeEvent(PfeJumpLinksNav.events.change));
    }
  }

  /**
   * This getter returns the panel for the navigation item; if a custom pointer was set
   * it will return that, otherwise, it tries to find the panel
   * @returns {NodeItem} Pointer to the panel content
   */
  get panel(): PfeJumpLinksPanel|null {
    // If a custom panel is already set, use that
    if (this._panel)
      return this._panel;

    // Use the ID from the navigation to target the panel elements
    // Automatically if there's only one set of tags on the page
    if (this.id) {
      // Check for a scrolltarget element pointing to that ID
      // Note: include fallback for scrolltarget in case pfe-jump-links-panel has not upgraded yet?
      const _root = this.getRootNode();
      const root = isQueryable(_root) ? _root : document;
      const target = root.querySelector<PfeJumpLinksPanel>(`[scrolltarget="${this.id}"],[pfe-c-scrolltarget="${this.id}"]`);
      if (target)
        return target;
    }

    // Get all instances of the panel components registered with the DOM
    const panels = [...PfeJumpLinksPanel.instances] || [];

    // Look for a panel with this scrolltarget (can capture the attribute better after component upgrades)
    const panelWithId =
      panels.filter(panel =>
        panel.getAttribute('scrolltarget') === this.id);

    if (panelWithId.length === 1)
      return panelWithId[0];

    // If only one panel is found, let's assume that goes to this nav
    if (panels.length === 1) {
      // Capture a random ID to connect this to the panel
      this.id = getRandomId();
      panels[0].setAttribute('scrolltarget', this.id);

      return panels[0];
    }

    // Throw a few warning messages suggesting how to connect the nav and panels
    if (panels.length > 1) {
      this.logger.warn(
        'Cannot locate which panel is connected to this navigation element.',
        this.id ? `Please add scrolltarget="${this.id}" to the appropriate panel.`
        : ''
      );
    } else {
      this.logger.warn(
        `Cannot locate any panels on this page. Please see documentation for connecting the navigation and panel.`
      );
    }

    return null;
  }

  /**
   * API hook for setting up custom sections without a panel
   */
  set sections(nodeList: NodeListOf<HTMLElement>|null) {
    this._sections = nodeList;

    // Emit an event to indicate a change in the sections
    this.dispatchEvent(pfeEvent(PfeJumpLinksNav.events.change));
  }

  /**
   * Capture the sections from inside the "panel"; default to this._sections first
   * then fallback to grepping the sections from the panel
   */
  get sections(): NodeListOf<HTMLElement>|null {
    // If a custom set of sections is already defined, use that
    if (this._sections)
      return this._sections;

    const { panel } = this;

    // If we can't find a panel element and this is using autobuild, return b/c we can't determine the sections automatically
    if (!panel && this.autobuild)
      return null;

    // If this is not autobuilt, use the IDs from the light DOM
    if (!this.autobuild) {
      const links = [...this.querySelectorAll<HTMLAnchorElement>('ul > li > a[href]')];
      // Parse the links for the anchor tag and create a selector from it
      const ids = links.map(link => `[id="${link.href.split('#').pop()}"]`);
      // Capture these from the panel or if nothing is returned, check the document
      return (
        panel?.querySelectorAll(ids.join(',')) ||
        (this.getRootNode() as Document|ShadowRoot).querySelectorAll(ids.join(','))
      );
    }

    // NOTE: since the panel element is not necessarily pfe-jump-links-panel
    // it _could_ contain a shadowRoot with the sections defined in it
    return (
      panel?.querySelectorAll<HTMLElement>('.pfe-jump-links-panel__section') ||
      panel?.shadowRoot?.querySelectorAll<HTMLElement>('.pfe-jump-links-panel__section') ||
      panel?.querySelectorAll<HTMLElement>('[id]')
    ) ?? null;
  }

  get links(): HTMLAnchorElement[] {
    return [...this.container?.querySelectorAll('a') ?? []];
  }

  get items(): HTMLLIElement[] {
    return [
      ...this.shadowRoot?.querySelectorAll<HTMLLIElement>('.pfe-jump-links-nav__item') ?? [],
    ];
  }

  // @TODO It seems like the offset is 0 when non-horizontal jumps links are mobile
  get offsetValue(): number {
    // If the offset attribute has been set, use that (no calculations)
    if (this.offset)
      return parseInt(this.offset.toString(), 10);

    // If the offset CSS variable has been set, use that (no calculations)
    // Note: deprecated @1.0 --jump-links-nav--nudge
    const offsetVariable =
      parseInt(this.css.getVariable('pfe-jump-links--offset') ?? '', 10);

    if (!Number.isNaN(offsetVariable) && offsetVariable >= 0)
      return offsetVariable;

    // --
    // If the offsets are not provided, calculate the height of what is currently sticky
    let height = 0;

    // Get the primary navigation height
    // @TODO: remove this when deprecating pfe-navigation, instead set the offset variable in nav cases
    const navHeightVariable =
      parseInt(this.css.getVariable('pfe-navigation--Height--actual') ?? '', 10);

    if (!Number.isNaN(navHeightVariable) && navHeightVariable > 0)
      height = navHeightVariable;

    // If this is mobile or horizontal & current stuck, return with the nav-height only
    if (this.stuck && (this.isMobile || this.horizontal))
      return height;

    // If this is not a horizontal jump link, check if any other horizontal jump links exist
    const stickyJumpLinks =
      parseInt(this.css.getVariable('pfe-jump-links--Height--actual') ?? '', 10);

    if (!Number.isNaN(stickyJumpLinks) && stickyJumpLinks > 0)
      height = height + stickyJumpLinks;

    // No offset if this is a horizontal element, should sit beneath the pfe-navigation (if it exists)
    return height;
  }

  connectedCallback() {
    super.connectedCallback();
    PfeJumpLinksNav.instances.add(this);

    // Attaches necessary listeners; does not include the mutation observer
    // because that is attached after processing the component
    this._attachListeners();

    // Check that the light DOM is there and accurate
    if (!this.autobuild && this._isValidLightDom())
      this.updateLightDOM();
    else if (this.autobuild) {
      // Try to build the navigation based on the panel
      this.build();
    }

    // Trigger the mutation observer
    this._observer.observe(this, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }

  render() {
    const content = html`
      <nav>
        <slot name="heading" ${when(!this.isMobile)} class="pfe-jump-links-nav__heading" ?sr-only=${this.noHeader}>
          <h3>${this.srText || 'Jump to section'}</h3>
        </slot>
        <slot name="logo" ${when(this.horizontal)} class="pfe-jump-links-nav__logo"></slot>
        <div id="container">${unsafeHTML(this.containerInnerHTML)}</div>
        <slot name="cta" ${when(this.horizontal)} class="pfe-jump-links-nav__cta"></slot>
      </nav>
    `;

    return !this.isMobile ? content : html`
      <pfe-accordion>
        <pfe-accordion-header>
          <slot name="heading" class="pfe-jump-links-nav__heading">
            <h3>${this.srText || 'Jump to section'}</h3>
          </slot>
        </pfe-accordion-header>
        <pfe-accordion-panel>${content} </pfe-accordion-panel>
      </pfe-accordion>
    `;
  }

  firstUpdated() {
    this._scrollHandler();
    // Capture the updated UL tag
    const menu = this.querySelector<HTMLElement>('ul, ol');
    // If the menu is found, process and move to the shadow DOM
    if (!menu) {
      // Throw a warning if the menu could not be built
      this.logger.warn(`Navigation could not be built.`);
    } else {
      // Move the menu into the shadow DOM
      this._toShadowDOM(menu);
      // Update the offset if necessary
      this._updateOffset();

      // Check if this navigation element is visible
      const visible = this._checkVisible();
      const idx = this.getActive() ?? 0;

      // Activate initial active item
      if (visible)
        this.active(idx);
      // @TODO: would be good to set the last item as active if the visible nav is below this one
    }
  }

  disconnectedCallback() {
    PfeJumpLinksNav.instances.delete(this);
    super.disconnectedCallback();
    this._detachListeners();
  }

  /**
   * Attach the listeners
   * @param {Object} Definition of available events
   */
  @bound private _attachListeners() {
    const { events } = PfeJumpLinksNav;
    // Listen for a change in the panel content if the navigation is autobuilt
    // need to reflect changes in the navigation markup
    if (this.autobuild)
      document.addEventListener(PfeJumpLinksNav.events.change, this._panelChangedHandler);


    window.addEventListener('resize', this._resizeHandler);
    window.addEventListener('scroll', this._scrollHandler);
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
  @bound private _detachListeners() {
    const { events } = PfeJumpLinksNav;
    this._observer.disconnect();

    document.removeEventListener(events.change, this._panelChangedHandler);

    window.removeEventListener('resize', this._resizeHandler);
    window.removeEventListener('scroll', this._scrollHandler);
    window.removeEventListener('keyup', this._keyboardHandler);

    // If the stickiness changes, update the sticky navigation offset
    window.removeEventListener(events.stuck, this._updateOffset);

    // @TODO respond to URL change? Ensure anchor link alignment accounts for sticky nav(s)
    // window.removeEventListener("locationchange", (evt) => console.log("locationchange", evt));
    // window.removeEventListener("hashchange", (evt) => console.log("hashchange", evt));
  }

  @bound private _buildItem(data: ItemData, isSubSection = false) {
    const item = document.createElement('li');
    item.className = 'pfe-jump-links-nav__item';

    const link = document.createElement('a');
    link.className = 'pfe-jump-links-nav__link';
    link.href = `#${data.target}`;
    link.setAttribute('data-target', data.target);
    link.innerHTML = data.content ?? '';

    if (data.subsection)
      item.classList.add('has-sub-section');
    if (isSubSection)
      item.classList.add('sub-section');

    item.appendChild(link);
    return item;
  }

  @bound private _buildWrapper(className = 'pfe-jump-links-nav') {
    const wrapper = document.createElement('ul');
    wrapper.className = className;
    return wrapper;
  }

  @bound private _siblingJumpLinks(
    filterMethod: ((item: PfeJumpLinksNav) => boolean) =
    item => item !== this
  ): PfeJumpLinksNav[] {
    return [...PfeJumpLinksNav.instances].filter(filterMethod);
  }

  /**
   * Report the height of the jump links navigation
   */
  @bound private _reportHeight() {
    let height = 0;

    // Check all elements to see if any are sticky and in horizontal or mobile state
    const stuckItems =
      this._siblingJumpLinks(item =>
        item.stuck &&
        (item.horizontal || item.isMobile === true));

    if (stuckItems.length > 0) {
      // Get the height of the last sticky element in the DOM tree
      ({ height } = stuckItems[stuckItems.length - 1].getBoundingClientRect());

      // @TODO Do other items in the stack need to be unstuck?
      // Unstick the other items by popping off the last item in the array
      // stuckItems.pop();
      // Set the rest of the items stuck attribute to false
      // stuckItems.forEach(item => item.stuck = false);
    }


    // Check if we need to update the variable:
    // If there are no other sticky jump links, set the height on the body
    // Note: we set it on the body to be consistent with pfe-navigation
    const currentHeight = getComputedStyle(document.body).getPropertyValue(`pfe-jump-links--Height--actual`);
    if (!currentHeight || parseInt(currentHeight, 10) !== height)
      document.body.style.setProperty(`pfe-jump-links--Height--actual`, `${height}px`);
  }

  /**
   * Validate the provided light DOM and provide helpful console messages
   * to facilitate debugging
   */
  @bound private _isValidLightDom() {
    let valid = true;

    if (!this.querySelector(':is(ul, ol)') && !this.autobuild) {
      this.logger.warn(`
This component requires a list in the light DOM to .
Alternatively, add the \`autobuild\` attribute to dynamically generate the list from the provided panel.`
      );
      valid = false;
    }

    if (this.logo && !this.horizontal)
      this.logger.warn(`The logo slot is NOT supported in vertical jump links.`);
      // Gentle warning, CSS force-hides this content
      // valid = false;


    if (this.cta && !this.horizontal)
      this.logger.warn(`The link slot is NOT supported in vertical jump links.`);
      // Gentle warning, CSS force-hides this content
      // valid = false;

    return valid;
  }

  @bound private _toShadowDOM(menu: HTMLElement) {
    if (menu && this.container && this.container?.innerHTML !== menu.outerHTML.toString())
      this.containerInnerHTML = menu.outerHTML.toString();

    // Attach the event listeners
    this.links.forEach(link => {
      link.addEventListener('click', this._clickHandler);
    });
  }

  @bound private _checkVisible() {
    this.isVisible =
      this.getBoundingClientRect().top <= document.documentElement.clientHeight &&
      this.getBoundingClientRect().right >= 0 &&
      this.getBoundingClientRect().bottom >= 0 &&
      this.getBoundingClientRect().left <= document.documentElement.clientWidth;

    return this.isVisible;
  }

  // This updates the offset value on this component based on the reported offset height on the document
  @bound private _updateOffset() {
    this._reportHeight();

    const offset = this.horizontal ? 0 : 20;
    // Set the offset on the nav element
    this.style.top = `${this.offsetValue + offset}px`;
  }

  /**
   * Click events on the navigation items
   * Prevents conflicts between scroll state and user choice
   * @param {ClickEvent} evt
   */
  @bound private _clickHandler(evt: MouseEvent) {
    const link = evt.target;
    if (!isAnchor(link))
      return;

    const li = link.closest('.pfe-jump-links-nav__item');

    // Set this item as active
    this.active(li);

    // Escaping here if no sections are defined and letting default behavior
    // handle the scrolling
    if (!this.sections) return;

    const idx = [...this.sections]
      .findIndex(item => item.id === link.hash.replace('#', ''));

    // Escaping if we can't find this link in our sections
    if (idx < 0) return;

    // If we have defined sections, use custom scrolling placement
    evt.preventDefault();

    this._clicked = true;

    // Update the URL but don't impact the back button
    history.replaceState({}, '', link.href);

    this.scrollToSection(idx);
  }

  /**
   * Sticky state handler; emits event with change in sticky state
   */
  @bound protected _stuckChanged(oldVal?: boolean, stuck?: boolean) {
    // If there is no change, do nothing
    if (oldVal === stuck) return;

    this._reportHeight();

    this.dispatchEvent(pfeEvent(PfeJumpLinksNav.events.stuck, { stuck }));
  }

  /**
   * Scrolling event processing; control stickiness and active state
   */
  @bound private _scrollHandler() {
    // If this is from a click event, do nothing
    if (this._clicked) return;

    clearTimeout(this.scrollTimeout);
    // XXX: Benny Fix this, plz
    this.scrollTimeout = window.setTimeout(() => {
      // Check the current visibility of this jump links navigation
      this._checkVisible();

      // If this navigation is not visible, exit processing now
      if (!this.isVisible) return;

      this.stuck = !!(this.getBoundingClientRect().top === this.offsetValue);

      const currentIdx = this.getActive() ?? -1;

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
  @bound private _resizeHandler() {
    this.rebuild();
  }

  /**
   * Run the rebuild when the mutation observer sees change
   */
  @bound private _mutationHandler() {
    // Ignore the mutation if using autobuild
    if (this.autobuild) return;

    this.updateLightDom = true;
    this.rebuild();
  }

  /**
   * Panel changed event
   */
  @bound private _panelChangedHandler() {
    // If this is manually built, we don't need to process the panel change
    if (!this.autobuild) return;

    this.updateLightDom = true;

    // Reset the sections object to allow refetching
    this._sections = null;

    this.rebuild();
  }

  /**
   * Keyboard event manager
   */
  private _keyboardHandler() {
    // @TODO: Add a keyboard handler when focus is set on the parent via keyboard; should expand
    // Handle the focus state to expand parent when child is focused
  }

  /**
   * This handles scrolling to a section in the panel on click
   * @param {Number} Index of the section to scroll-to
   * @TODO On page load, if an anchor exists, fire this event
   */
  @bound scrollToSection(idx: number) {
    // Get the offset value to scroll-to
    const section = this.sections?.[idx];
    if (!section)
      return;
    const offset = this.offsetValue;

    // Update stickiness if necessary
    this.stuck = !!(this.getBoundingClientRect().top === offset);

    // Initialize the target we want to scroll to
    let scrollTarget = window.pageYOffset + section.getBoundingClientRect().top;

    // If the section uses the spacers, don't include the calculations below
    if (!section.classList.contains('pfe-jump-links__section--spacer')) {
      // Top of the section minus the calculated offset via nav
      scrollTarget = scrollTarget - offset;

      // Account for it's height as well
      // this.offsetVar does not account for this because this only affects scrolling to sections
      let height = 0;

      if (this.horizontal)
        ({ height } = this.getBoundingClientRect());

      // On mobile, get the accordion-header height rather than the height of the full component
      // this prevents the height from taking into account the open accordion tray
      if (this.isMobile) {
        const accordionHeader = this.shadowRoot?.querySelector('pfe-accordion-header');
        if (accordionHeader) {
          height =
            accordionHeader.getBoundingClientRect().height - this.getBoundingClientRect().height;
        }
      }

      if (height > 0) scrollTarget = scrollTarget - height;
    }

    // If the section has a custom offset attribute defined, use that; default to 20
    // 20 default is so that the headings aren't smooshed against the sticky navigation
    let itemOffset = 20;
    if (section.hasAttribute('offset')) {
      // Use the property casting from LitElement
      const sectionOffsetProp =
        parseInt(section.getAttribute('offset') ?? '', 10);
      if (!Number.isNaN(sectionOffsetProp))
        itemOffset = sectionOffsetProp;
    } else if (this.panel && this.panel.offset)
      itemOffset = this.panel.offset;


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
      behavior: 'smooth',
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
   * Builds the navigation based on the provided data or the defined sections
   * @param [sections=this.sections] List of the sections the navigation should link to
   */
  @bound build(_sections?: NodeListOf<HTMLElement>|null) {
    _sections ??= this.sections;

    // Can't build the navigation dynamically without sections defined
    if (!_sections) return;

    // Convert NodeList to array
    const sections = [..._sections];

    this.isBuilding = true;

    // Validations complete, start the build
    let child;
    const wrapper = this._buildWrapper();
    let currentWrapper = wrapper;
    let previousWrapper = currentWrapper;

    // Build markup for the navigation
    for (let i = 0; i < sections.length; i++) {
      const sectionHeading = sections[i];
      const isSubsection = sectionHeading.classList.contains('sub-section');
      const hasSubsection = sectionHeading.classList.contains('has-sub-section');

      // Get ID for the navigation
      let { id } = sectionHeading;
      if (!id) {
        const spacer = sectionHeading.previousElementSibling;
        if (spacer && spacer.classList.contains('pfe-jump-links__section--spacer') && spacer.id)
          ({ id } = spacer);
        else {
          sectionHeading.id = getRandomId('pfe-jump-links--');
          ({ id } = sectionHeading);
        }
      }

      // Build the li tag; the child item
      child = this._buildItem({
        target: id,
        content: sectionHeading.getAttribute('nav-label') || sectionHeading.textContent,
        subsection: hasSubsection,
      },
      isSubsection
      );

      // Add the item to the list
      currentWrapper.appendChild(child);

      if (hasSubsection) {
        previousWrapper = currentWrapper;
        currentWrapper = this._buildWrapper('sub-nav');
        child.appendChild(currentWrapper);
      }

      // If the next item exists and is a sub-section, reset the ul build to the previous one
      if (sections[i + 1] && !sections[i + 1].classList.contains('sub-section'))
        currentWrapper = previousWrapper || wrapper;
    }

    this.isBuilding = false;

    // Return the mark-up
    this.innerHTML = '';
    this.appendChild(wrapper);
  }

  /**
   * Close the mobile accordion
   * @requires {Boolean} [this.isMobile] Indicates whether the navigation is in a mobile state
   * @requires {Boolean} [this.accordionCollapseTiming=750]
   */
  @bound closeAccordion() {
    if (!this.isMobile) return;

    const accordion = this.shadowRoot?.querySelector('pfe-accordion');
    // After a short wait, close the accordion
    setTimeout(async function() {
      await customElements.whenDefined('pfe-accordion');
      accordion?.collapseAll();
    }, this.accordionCollapseTiming);
  }

  /**
   * Rebuild the navigation if the sections or panels are updated
   */
  @bound rebuild() {
    // If the build is happening, wait until it is complete
    if (this.isBuilding)
      setTimeout(this.rebuild, 10);
    else {
      const hasAccordion = this.shadowRoot?.querySelector('pfe-accordion');
      // Re-render the template if necessary
      // If this is a mobile state and it does use an accordion, or vise-versa
      if ( (this.isMobile && !hasAccordion) || (!this.isMobile && hasAccordion))
        this.render();

      let menu;

      if (this.autobuild && this.update)
        menu = this.build();
      else
        menu = this.querySelector('ul');


      // Move the menu into the shadow DOM
      if (menu && this.container && this.container?.innerHTML !== menu.outerHTML.toString())
        this.container.innerHTML = menu.outerHTML.toString();


      this._updateOffset();

      // Activate initial active item
      this.active(this.getActive());

      // Attach the event listeners
      this.items.forEach(item => {
        item.querySelector('a')?.addEventListener('click', this._clickHandler);
      });
    }

    this.updateLightDom = false;
  }

  /**
   * @param {} item Accepts an index or the link element itself
   */
  @bound active(item?: number|Element|null) {
    const { items } = this;

    const idx =
        typeof item === 'number' ? item
      : items.findIndex(el => el === item);

    // If idx is less than 0, it could not be found
    if (idx < 0 || idx >= items.length || !items[idx])
      return;

    // If found, clear current active items
    this.clearActive();
    this.currentActive = idx;

    const li = items[idx].closest('li');
    if (li) {
      const parentli = li.closest('ul')?.closest('li');
      const isSubsection = li.classList.contains('sub-section');
      const hasSubsection = li.classList.contains('has-sub-section');

      // Set the item's active attribute
      li.setAttribute('active', '');

      if (hasSubsection)
        li.setAttribute('expand', '');
      else if (isSubsection)
        parentli?.setAttribute('expand', '');
    }
    // Emit event for tracking
    this.dispatchEvent(pfeEvent(PfeJumpLinksNav.events.activeNavItem, { activeNavItem: idx }));
  }

  @bound getActive() {
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

  @bound inactive(item: number|Element) {
    const { items } = this;
    const idx = (
        typeof item === 'number' ? item
      : items.findIndex(el => el === item)
    );

    // If idx is less than 0, it could not be found
    if (idx < 0 || idx >= items.length || !items[idx])
      return;

    const li = items[idx].closest('li');
    const parentli = li?.closest('ul')?.closest('li');
    const isSubsection = li?.classList.contains('sub-section');
    const hasSubsection = li?.classList.contains('has-sub-section');

    li?.removeAttribute('active');

    if (hasSubsection)
      li?.removeAttribute('expand');
    else if (isSubsection)
      parentli?.removeAttribute('expand');
  }

  @bound clearActive() {
    const { items } = this;
    items.forEach(item => this.inactive(item));
  }

  @bound updateItem(item: HTMLLIElement, nested = false) {
    item.classList.add('pfe-jump-links-nav__item', ...nested ? ['sub-section'] : []);
    const link = item.querySelector('a');
    link?.classList.add('pfe-jump-links-nav__link');
    const nestedList = item.querySelector('ul');
    if (nestedList) {
      item.classList.add('has-sub-section');
      nestedList.querySelectorAll<HTMLLIElement>(':scope > li')
        .forEach(item => this.updateItem(item, true));
    }
  }

  @bound updateLightDOM() {
    const menu = this.querySelector('ul');

    if (menu) {
      // Update the mark-up in the light DOM if necessary
      // If the class is not already on the list wrapper
      menu.classList.add('pfe-jump-links-nav');

      // Ensure valid identifiers on the provided mark-up
      menu.querySelectorAll<HTMLLIElement>(':scope > li')
        .forEach(item => this.updateItem(item));
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-jump-links-nav': PfeJumpLinksNav;
  }
}
