import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html as statichtml, unsafeStatic } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { deprecatedCustomEvent } from '@patternfly/pfe-core/functions/deprecatedCustomEvent.js';
import { debounce } from '@patternfly/pfe-core/functions/debounce.js';

import { SlotController } from '@patternfly/pfe-core/controllers/slot-controller.js';

import style from './pfe-primary-detail.scss';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

function isQueryable(x: Node): x is Document|ShadowRoot {
  return x instanceof Document || x instanceof ShadowRoot;
}

export class PrimaryDetailChangeEvent extends ComposedEvent {
  declare tab: HTMLElement;
  declare details: HTMLElement;

  declare previousTab?: HTMLElement;
  declare previousDetails?: HTMLElement;

  constructor(config: {
    previousTab?: HTMLElement,
    previousDetails?: HTMLElement,
    tab: HTMLElement,
    details: HTMLElement,
  }) {
    super('change');
    this.previousTab = config.previousTab;
    this.previousDetails = config.previousDetails;
    this.tab = config.tab;
    this.details = config.details;
  }
}

/**
 * A primary-detail layout is an interface that shows a list of items and the corresponding details of the selected item. This component is an implementation of one of the "Primary detail simple list in card" from [Patternfly React](https://www.patternfly.org/v4/demos/primary-detail).
 * Reworks title/description content into a vertical-primary-detail like interface.
 *
 * @summary A primary-detail layout is an interface that shows a list of items and the corresponding details of the selected item.
 *
 * @slot header - In case content needs to be added at the top of the navigation area; this will not be matched up with `details` content.
 * @slot nav - Added to each heading; builds the navigation that shows the related content.
 * @slot footer - In case content needs to be added at the bottom of the navigation; will not be matched up with `details` content.
 * @slot details - Added to the content, directly following the heading to which it relates.
 *
 * @fires {PrimaryDetailChangeEvent} change
 *        Fires when a new tab is selected.
 *        ```js
 *        primaryDetails.addEventListener('change', event => {
 *          console.log('selected tab is', event.tab);
 *          console.log('selected details is', event.details);
 *          if (event.previousTab)
 *            console.log('previous tab was', event.previousTab);
 *          if (event.previousDetails)
 *            console.log('previous details was', event.previousDetails);
 *        });
 *        ```
 * @fires {CustomEvent<{ tab: HTMLElement; details: HTMLElement }>} pfe-primary-detail:shown-tab - {@deprecated Use `change`} Fires when a new tab is selected.
 * @fires {CustomEvent<{ tab: HTMLElement; details: HTMLElement }>} pfe-primary-detail:hidden-tab - {@deprecated Use `change`} Fires when a selected tab is no longer the selected tab.
 *
 * @csspart nav - container for the nav items
 * @csspart details - container for the detailed content
 * @csspart footer - container for the element footer
 *
 * @cssprop --pfe-primary-details--Border - N/A {@default `1px solid #d2d2d2`}
 * @cssprop --pfe-primary-details--GridTemplateColumns - N/A {@default `1fr 2fr`}
 * @cssprop --pfe-primary-details__nav--Color - nav {@default `#151515!important`}
 * @cssprop --pfe-primary-details__nav--Color--active - nav {@default `#06c!important`}
 * @cssprop --pfe-primary-details__nav--Background--active - nav {@default `#f0f0f0!important`}
 * @cssprop --pfe-primary-details__details--Background - details {@default `#fff`}
 */
@customElement('pfe-primary-detail') @pfelement()
export class PfePrimaryDetail extends LitElement {
  static readonly version = '{{version}}';

  static readonly styles = [style];

  /**
   * Makes sure the primary details element doesn't change height when a different `details` item is shown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'consistent-height' })
    consistentHeight = false;

  /** The min-width of the _component_ where it has a desktop layout */
  @property({ attribute: 'breakpoint-width', type: Number, reflect: true }) breakpointWidth = 800;

  @observed
  @property({ type: String, reflect: true }) active: string|null = null;

  @property({ type: String }) expandedSectionTitle?: string;

  @observed
  @state() private breakpoint?: 'compact'|'desktop';

  @query('#details-wrapper__back') private _detailsBackButton?: HTMLElement|null;
  @query('#wrapper') private _wrapperDiv?: HTMLElement|null;

  private logger = new Logger(this);

  private get root(): Document|ShadowRoot|null {
    const root = this.getRootNode();
    if (!isQueryable(root)) {
      return null;
    } else {
      return root;
    }
  }

  private slots = new SlotController(this, {
    slots: ['header', 'nav', 'footer', 'details'],
    deprecations: {
      header: 'details-nav--header',
      footer: 'details-nav--footer',
      nav: 'details-nav',
    }
  });

  private controlsId?: string;
  private pristine = true;
  private navs: HTMLElement[] = [];
  private details: HTMLElement[] = [];
  private upgradedNavigation: HTMLElement[] = [];
  private upgradedDetails: HTMLElement[] = [];

  private _debouncedWindowWidthCheck:ReturnType<typeof debounce>|null = null;

  private _windowInnerWidth?: number;

  render() {
    const detailsBackButtonExpanded = (this.breakpoint === 'compact' && this.active) ? 'true' : undefined;
    return html`
      <div id="wrapper"
          part="container"
          class="${classMap({ active: !!this.active, compact: this.breakpoint === 'compact' })}">
        <div id="details-nav" part="nav">
          <slot name="header"></slot>
          <slot name="details-nav--header"></slot>
          <slot name="nav"></slot>
          <slot name="details-nav"></slot>
          <div id="details-nav__footer" part="footer">
            <slot name="footer"></slot>
            <slot name="details-nav--footer"></slot>
          </div>
        </div>
        <div id="details-wrapper" part="details">
          <div id="details-wrapper__header">
            <button
              id="details-wrapper__back"
              aria-controls="${ifDefined(this.controlsId)}"
              aria-expanded="${ifDefined(detailsBackButtonExpanded)}"
              @click="${this._back}">
              ${this._renderDetailsWrapperHeading()}
            </button>
          </div>
          <slot name="details"></slot>
        </div>
      </div>
    `;
  }

  /**
   * Initalizes component when light DOM is updated
   * @returns {void}
   */
  @initializer({ observe: { childList: true, subtree: false } }) protected async _init() {
    await this.updateComplete;
    this.navs = this.slots.getSlotted<HTMLElement>('nav', 'details-nav');
    this.details = this.slots.getSlotted<HTMLElement>('details');

    if (this._validLightDOM()) {
      Promise.all([
        this._upgradeNavigation(),
        this._upgradeDetails(),
        this._setAriaControls()
      ]).then(async () => {
        if (this.pristine) {
          this._setBreakPointState();
          this._setHostEventListeners();
          this._setAriaFeaturesOnHost();
          await this._setFirstItemSelected();
          this.pristine = false;
        }
      });
    }
  }

  /**
   * Upgrade navigation slot light DOM to include button element
   * attributes and event listeners
   * @return {Promise}
   */
  private _upgradeNavigation() {
    this.upgradedNavigation = [];
    return new Promise<boolean>(resolve => {
      this.navs.forEach((el: HTMLElement, index: number) => {
        const createButton = el.tagName !== 'BUTTON';
        const navButton = createButton ? this._createNavigationButton(el) : el;
        navButton.id ||= getRandomId('pfe-detail-toggle');
        navButton.addEventListener('click', this._navButtonClicked);
        navButton.dataset.index = index.toString();
        if (createButton) {
          el.parentElement?.replaceChild(navButton, el);
        }
        this.upgradedNavigation.push(navButton);
      });
      resolve(true);
    });
  }

  /**
   * Mutation observer callback for navigation button click
   * @return {void}
   */
  @bound private _navButtonClicked(e: { target: EventTarget|null }) {
    if (!(e.target instanceof HTMLElement)) {
      return;
    }
    // If the current target is already active return
    if (e.target.getAttribute('aria-selected') === 'true' && e.target.id === this.active) {
      return;
    }
    this.active = e.target.id;
  }

  /**
   * Mutation observer callback for active property
   * @return {void}
   */
  private async _activeChanged(oldVal?: string|null, newVal?: string|null) {
    if (newVal !== oldVal) {
      const selectedNav = this.upgradedNavigation.find(nav => nav.id === newVal);
      const selectedDetail = this.upgradedDetails.find(detail => detail.getAttribute('aria-labelledby') === newVal);

      if (selectedNav && selectedDetail) {
        await this._setNavItemAriaSelected(selectedNav, 'true');
        this.upgradedNavigation.filter(nav => nav.id !== newVal).forEach(async nav => {
          await this._setNavItemAriaSelected(nav, 'false');
        });

        await this._setDetailShown(selectedDetail);
        this.upgradedDetails.filter(detail => detail.getAttribute('aria-labelledby') !== newVal).forEach(async detail => {
          await this._setDetailHidden(detail);
        });

        this._setExpandedSectionTitle();
        this._setBackButtonFocus();
      }
      this._dispatchEvents(oldVal, newVal);
    }
  }

  /**
   * Dispatches a synthetic events to communicate tab changes
   * @param {string} oldVal - previous active id string
   * @param {string} newVal - new active id string
   * @return {void}
   */
  private _dispatchEvents(oldVal?: string|null, newVal?: string|null) {
    const oldNavItem = oldVal ? this._getNavItemById(oldVal) : undefined;
    const oldDetailItem = oldVal ? this._getDetailItem(oldVal) : undefined;

    if (oldVal) {
      if (oldNavItem && oldDetailItem) {
        this.dispatchEvent(deprecatedCustomEvent('pfe-primary-detail:hidden-tab', {
          tab: oldNavItem,
          details: oldDetailItem,
        }));
      }
    }

    if (newVal) {
      const newNavItem = this._getNavItemById(newVal);
      const newDetailItem = this._getDetailItem(newVal);

      if (newNavItem && newDetailItem) {
        this.dispatchEvent(deprecatedCustomEvent('pfe-primary-detail:shown-tab', {
          tab: newNavItem,
          details: newDetailItem,
        }));

        this.dispatchEvent(new PrimaryDetailChangeEvent({
          previousTab: oldNavItem,
          previousDetails: oldDetailItem,
          tab: newNavItem,
          details: newDetailItem,
        }));
      }
    }
  }

  /**
   * Mutation observer callback for breakpoint property
   * @param {string} oldVal - previous active id string
   * @param {string} newVal - new active id string
   */
  private async _breakpointChanged(oldVal:string, newVal:string) {
    await this.updateComplete;
    if (newVal === 'desktop') {
      if (!this.active) {
        await this._setFirstItemSelected();
      }
    } else if (newVal === 'compact') {
      if (document.activeElement) {
        if (this.upgradedNavigation.includes(document.activeElement as HTMLElement)) {
          this._setBackButtonFocus();
        }
      }
      if (!this.active) {
        this._setNavigationAriaExpanded('false');
        this._setAllDetailsHidden();
      }
    }
    this._toggleNavAriaSelected();
  }

  /**
   * Converts a DOM element to navigation button
   * @param {HTMLElement} el - Element to convert
   * @returns {HTMLElement<Button>}
   */
  private _createNavigationButton(el: HTMLElement) {
    const allowedAttributes = this._filterAllowedAttributes(el.attributes);
    const button = document.createElement('button');
    button.innerHTML = el.innerHTML;
    button.setAttribute('role', 'tab');
    allowedAttributes.forEach(attr => {
      button.setAttribute(attr.name, attr.value);
    });
    button.dataset.wasTag = el.tagName;
    return button;
  }

  /**
   * Remove attributes from attribute list
   * @param {NamedNodeMap} attributes - attribute list to filter
   * @returns {Array<Attr>} - filtered array of attributes
   */
  private _filterAllowedAttributes(attributes: NamedNodeMap) {
    const denyAttributes = ['style', 'role'];
    const filtered: Array<Attr> = [];
    [...attributes].forEach(attr => {
      if (!denyAttributes.includes(attr.name)) {
        filtered.push(attr);
      }
    });
    return filtered;
  }

  /**
   * Upgrade details slot light DOM adding attributes and data
   * @returns {Promise}
   */
  private _upgradeDetails() {
    this.upgradedDetails = [];
    return new Promise<boolean>(resolve => {
      this.details.forEach((detail: HTMLElement, index: number) => {
        if (!detail.hasAttribute('id')) {
          detail.setAttribute('id', getRandomId('pfe-detail'));
        }
        detail.setAttribute('role', 'tabpanel');
        detail.setAttribute('tabindex', '-1');
        detail.setAttribute('aria-hidden', 'true');
        detail.setAttribute('hidden', '');
        detail.dataset.processed = 'true';
        detail.dataset.index = index.toString();
        this.upgradedDetails.push(detail);
      });
      resolve(true);
    });
  }

  /**
   * Set the first item in both navigation and detail to the selected state
   * @returns {Promise}
   */
  private _setFirstItemSelected() {
    return new Promise<boolean>(resolve => {
      this._setFirstNavItemSelected();
      this._setFirstDetailItemShown();
      resolve(true);
    });
  }

  /**
   * Returns the first navigation item
   * @returns {HTMLElment}
   */
  private _getFirstNavItem() {
    return this.upgradedNavigation[0];
  }

  /**
   * Get a navigation item by id
   * @param {string} id - id attribute of nav item
   * @returns {HTMLElement}
   */
  private _getNavItemById(id: string) {
    return this.upgradedNavigation.find(nav => nav.id === id);
  }

  /**
   * Toggles the aria-selected and aria-expanded attributes
   * retaining previous value
   * @returns {void}
   */
  private _toggleNavAriaSelected() {
    let previousValue: string | null;
    this.upgradedNavigation.forEach(nav => {
      if (nav.hasAttribute('aria-selected')) {
        previousValue = nav.getAttribute('aria-selected');
      } else {
        previousValue = nav.getAttribute('aria-expanded');
      }
      if (nav.id === this.active) {
        previousValue = 'true';
      }
      this._setNavItemAriaSelected(nav, previousValue);
    });
  }

  /**
   * Set aria-selected or aria-expanded attribute on navigation item
   * depending on the current breakpoint value
   * @param {HTMLElemnt} nav - nav item to set aria attributes
   * @param {string} val - value to set on the aria attribute
   * @returns {Promise}
   */
  private _setNavItemAriaSelected(nav: HTMLElement, val: string|null) {
    return new Promise<boolean>(resolve => {
      if (!val) {
        val = 'false';
      }
      if (this.breakpoint === 'desktop') {
        nav.setAttribute('aria-selected', val);
        nav.removeAttribute('aria-expanded');
      } else if (this.breakpoint === 'compact') {
        nav.setAttribute('aria-expanded', val);
        nav.removeAttribute('aria-selected');
      }
      resolve(true);
    });
  }

  /**
   * Set aria-expanded on all navigation items,
   * removes aria-selected
   * @param {string} value - value to set on aria-expanded
   */
  private _setNavigationAriaExpanded(value: string) {
    this.upgradedNavigation.forEach(nav => {
      nav.removeAttribute('aria-selected');
      nav.setAttribute('aria-expanded', value);
    });
  }

  /**
   * Set the first navigation item to selected state
   * @return {void}
   */
  private _setFirstNavItemSelected() {
    const firstNavItem = this._getFirstNavItem();
    this._setNavItemAriaSelected(firstNavItem, 'true');
    const notFirstNavs = this._getAllButFirstNavItems();
    notFirstNavs.forEach(nav => {
      this._setNavItemAriaSelected(nav, 'false');
    });
  }

  /**
   * Get all navigation items except the first
   * @returns {Array<HTMLElement>}
   */
  private _getAllButFirstNavItems() {
    return this.upgradedNavigation.filter((nav, index) => index !== 0);
  }

  /**
   * Get current active navigation item
   * @returns {HTMLElement|undefined}
   */
  private _getActiveNavItem() {
    return this.upgradedNavigation.find(nav => nav.id === this.active);
  }

  /**
   * Get the first detail item
   * @returns {HTMLElement}
   */
  private _getFirstDetailsItem() {
    return this.upgradedDetails[0];
  }

  /**
   * Get all detail items except the first
   * @returns {Array<HTMLElement>}
   */
  private _getAllButFirstDetailItems() {
    return this.upgradedDetails.filter((detail, index) => index !== 0);
  }

  /**
   * Get the detail item by aria-labelleby value
   * @param {string} id - value of the aria-labelledby on the detail item
   * @returns {HTMLElement|undefined}
   */
  private _getDetailItem(id: string) {
    return this.upgradedDetails.find(detail => detail.getAttribute('aria-labelledby') === id);
  }

  /**
   * Set the first detail item to shown state, sets reminder
   * of the details to hidden state.
   * @returns {void}
   */
  private _setFirstDetailItemShown() {
    this._setDetailShown(this._getFirstDetailsItem());
    const notFirstDetails = this._getAllButFirstDetailItems();
    notFirstDetails.forEach(detail => {
      this._setDetailHidden(detail);
    });
  }

  /**
   * Set detail item to shown state
   * @param {HTMLElement} detail - detail item to show
   * @returns {Promise}
   */
  private _setDetailShown(detail: HTMLElement) {
    return new Promise<boolean>(resolve => {
      detail.setAttribute('aria-hidden', 'false');
      detail.removeAttribute('hidden');
      detail.removeAttribute('tabindex');
      resolve(true);
    });
  }

  /**
   * Set all detail items hidden
   * @returns {void}
   */
  private _setAllDetailsHidden() {
    this.upgradedDetails.forEach(detail => {
      this._setDetailHidden(detail);
    });
  }

  /**
   * Set detail item to hidden state
   * @param {HTMLElement} detail - detail item to set to hidden state
   * @returns {Promise}
   */
  private _setDetailHidden(detail: HTMLElement) {
    return new Promise<boolean>(resolve => {
      detail.setAttribute('aria-hidden', 'true');
      detail.setAttribute('hidden', '');
      detail.setAttribute('tabindex', '-1');
      resolve(true);
    });
  }

  /**
   * Set aria-controls on navigation and aria-labelledby on details
   * @returns {Promise}
   */
  private _setAriaControls() {
    return new Promise<boolean>(resolve => {
      this.upgradedNavigation.forEach((nav, index) => {
        // Set aria-controls on nav from details.id
        if (!nav.hasAttribute('aria-controls')) {
          nav.setAttribute('aria-controls', this.upgradedDetails[index].id);
        }
        // Set aria-labbelledby on details from nav.id
        if (!this.upgradedDetails[index].hasAttribute('aria-labelledby')) {
          this.upgradedDetails[index].setAttribute('aria-labelledby', nav.id);
        }
      });
      resolve(true);
    });
  }

  /**
   * Set expanded section title from active nav item
   * @returns {void}
   */
  private _setExpandedSectionTitle() {
    const activeNavItem = this._getActiveNavItem();
    if (activeNavItem) {
      this.expandedSectionTitle = activeNavItem.textContent || undefined;
      this.controlsId = activeNavItem.id;
    }
  }

  private _renderDetailsWrapperHeading(): TemplateResult {
    if (!this.expandedSectionTitle) {
      return html`<strong id="details-wrapper__heading"></strong>`;
    } else {
      const { wasTag } = this._getActiveNavItem()?.dataset ?? {};
      // If wasTag isn't a headline, use strong
      const tag = unsafeStatic(wasTag?.match(/^H/i) ? wasTag : 'strong');

      return statichtml`
        <${tag} id="details-wrapper__heading">
          ${this.expandedSectionTitle}
        </${tag}>`;
    }
  }

  /**
   * Set focus on a nav item
   * @param {string} id - nav item to focus id
   */
  private _setFocustNavItemById(id: string) {
    const nav = this._getNavItemById(id);
    nav?.focus();
  }

  /**
   * Set focus on back button after animation completes
   * @returns {void}
   */
  private _setBackButtonFocus() {
    const wrapper = this._wrapperDiv;
    if (wrapper) {
      Promise.all(
        wrapper.getAnimations().map(
          animation => {
            return animation.finished;
          }
        )
      ).then(
        () => {
          this._detailsBackButton?.focus();
        }
      );
    }
  }

  /**
   * Return navigation and detail state back to unselected/inactive
   * returns focus to last selected navigation
   * @returns {void}
   */
  private _back() {
    this.active = null;
    this._setNavigationAriaExpanded('false');
    this._setAllDetailsHidden();
    if (this.controlsId) {
      this._setFocustNavItemById(this.controlsId);
    }
  }

  /**
   * Validity check to ensure light DOM for navs and details is equal in length
   * for proper paring of navigation tab buttons and details
   * @returns {true}
   */
  private _validLightDOM() {
    if (this.navs.length !== this.details.length) {
      throw new Error(`The number of item headings does not match the number of item details.`);
    }
    return true;
  }

  /**
   * Set Event Listeners on host element, resize and keydown
   * @returns {void}
   */
  private _setHostEventListeners() {
    // Lower debounce delay for automated testing
    const debounceDelay = this.hasAttribute('automated-testing') ? 0 : 100;

    this._debouncedWindowWidthCheck = debounce(this._windowWidthCheck, debounceDelay);

    window.addEventListener('resize', this._debouncedWindowWidthCheck);

    // A11y: add keydown event listener to activate keyboard controls
    this.addEventListener('keydown', this._keyboardControls);
  }

  /**
   * Remove event listeners from host
   * @returns {void}
   */
  private _removeHostEventListeners() {
    if (this._debouncedWindowWidthCheck) {
      window.removeEventListener('resize', this._debouncedWindowWidthCheck);
    }
  }

  /**
   * Mutation observer callback for window size change
   * calls breakpoint state if size has changed
   * @returns {void}
   */
  @bound private _windowWidthCheck() {
    // We don't need to do anything if the page width is unchanged
    if (this._windowInnerWidth === window.innerWidth) {
      return;
    }
    // Otherwise we set the breakpoint state
    this._setBreakPointState();
    this._windowInnerWidth = window.innerWidth;
  }

  /**
   * Set breakpoint property if the offset is less than the breakpointWidth property
   * @returns {void}
   */
  private _setBreakPointState() {
    const newBreakPoint = this.offsetWidth < this.breakpointWidth ? 'compact' : 'desktop';
    // _setBreakPointState is triggered often on resize, only trigger the
    // mutation observer when the breakpoint value actually changes.
    if (this.breakpoint !== newBreakPoint) {
      this.breakpoint = newBreakPoint;
    }
  }

  /**
   * Set aria-controls and role on host
   * @returns {void}
   */
  private _setAriaFeaturesOnHost() {
    this.setAttribute('aria-orientation', 'vertical');
    this.setAttribute('role', 'tablist');
  }

  /**
   * Check if element is a navigation element
   * @param {HTMLElement} element - element to check if its a navigation toggle
   * @returns
   */
  private _isToggle(element: EventTarget|null) {
    return this.upgradedNavigation.includes(element as HTMLElement);
  }

  /**
   * Get previous navigation item from focused navigation item
   * @returns {HTMLElement|null}
   */
  private _getPrevNav(): HTMLElement|null {
    const prevNavIndex = (this._getFocusedNavIndex() ?? -1) - 1;
    return this.upgradedNavigation?.[(prevNavIndex + this.upgradedNavigation.length) % this.upgradedNavigation.length] ?? null;
  }

  /**
   * Get next navigation item from focused navigation item
   * @returns {HTMLElement|null}
   */
  private _getNextNav(): HTMLElement|null {
    const nextNavIndex = (this._getFocusedNavIndex() ?? -1) + 1;
    return this.upgradedNavigation?.[nextNavIndex % this.upgradedNavigation.length] as HTMLElement ?? null;
  }

  /**
   * Get current index value of focused navigation item
   * @returns {number}
   */
  private _getFocusedNavIndex(): number {
    const index = this.upgradedNavigation.findIndex(nav =>
      nav === document.activeElement ||
      nav.matches(':focus')
    );
    return index;
  }

  /**
   * Mutation observer callback for keydown event, sets focus on
   * navigation item after event
   * @param {KeyboardEvent} event - keyboard keydown event
   * @returns {void}
   */
  @bound private _keyboardControls(event: KeyboardEvent) {
    const currentElement = event.target;
    let newToggle;

    switch (event.key) {
      case 'Escape':
        // Only closing all at compact sizes since something should always be selected at non-compact
        if (this.breakpoint === 'compact') {
          this._back();
        }
        break;
        // case "Tab":
        // Tab (Default tab behavior)
        /// When focus moves into the tab list, places focus on the active tab element
        /// When the focus is in the tab list, move focus away from active tab element to next element in tab order which is the tabpanel element
        /// When focus is moved outside of the tab list focus moves to the next focusable item in the DOM order

      case 'ArrowUp':
      case 'Up':
      case 'ArrowLeft':
      case 'Left':
        if (!(currentElement instanceof HTMLElement)) {
          return;
        }
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling

        // Up Arrow/Left Arrow
        /// When tab has focus:
        /// Moves focus to the next tab
        /// If focus is on the last tab, moves focus to the first tab
        newToggle = this._getPrevNav();
        break;

      case 'ArrowDown':
      case 'Down':
      case 'ArrowRight':
      case 'Right':
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // Down Arrow/Right Arrow
        /// When tab has focus:
        /// Moves focus to previous tab
        /// If focus is on the first tab, moves to the last tab
        /// Activates the newly focused tab
        newToggle = this._getNextNav();
        break;

      case 'Home':
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // Home
        /// / When a tab has focus, moves focus to the first tab
        [newToggle] = this.upgradedNavigation ?? [];
        break;

      case 'End': {
        if (!this._isToggle(currentElement)) {
          return;
        }
        event.preventDefault(); // Prevent scrolling
        // End
        /// When a tab has focus, moves focus to the last tab
        const nodes = this.upgradedNavigation;
        newToggle = nodes?.[nodes.length - 1];
        break;
      }
      default:
        return;
    }

    if (newToggle instanceof HTMLElement) {
      newToggle.focus();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-primary-detail': PfePrimaryDetail;
  }
}

