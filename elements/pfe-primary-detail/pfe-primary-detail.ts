import type { TemplateResult } from 'lit';

import { LitElement, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { html as statichtml, unsafeStatic } from 'lit/static-html.js';
import { classMap } from 'lit/directives/class-map.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ComposedEvent } from '@patternfly/pfe-core';
import { pfelement, bound, observed, initializer } from '@patternfly/pfe-core/decorators.js';
import { getRandomId } from '@patternfly/pfe-core/functions/random.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';
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
 * @cssprop --pfe-primary-details--Border - N/A {@default `1px solid #d2d2d2`}
 * @cssprop --pfe-primary-details--GridTemplateColumns - N/A {@default `1fr 2fr`}
 * @cssprop --pfe-primary-details__nav--Color - nav {@default `#151515!important`}
 * @cssprop --pfe-primary-details__nav--Color--active - nav {@default `#06c!important`}
 * @cssprop --pfe-primary-details__nav--Background--active - nav {@default `#f0f0f0!important`}
 * @cssprop --pfe-primary-details__details--Background - details {@default `#fff`}
 */
@customElement('pfe-primary-detail') @pfelement()
export class PfePrimaryDetail extends LitElement {
  static readonly styles = [style];

  /**
   * Makes sure the primary details element doesn't change height when a different `details` item is shown.
   */
  @property({ type: Boolean, reflect: true, attribute: 'consistent-height' })
    consistentHeight = false;

  /** The min-width of the _component_ where it has a desktop layout */
  @property({ attribute: 'breakpoint-width', type: Number, reflect: true }) breakpointWidth = 800;

  /** Read only: Displays the id of an open 'detailNav' element */
  @observed
  @property({ type: String, reflect: true }) active: string|null = null;

  /** Read only: Displays what breakpoint is currently being used */
  @property({ type: String, reflect: true }) breakpoint?: 'compact'|'desktop';

  /** Used to set text of back button **/
  @property({ type: String }) expandedSectionTitle?: string;

  @state() private pristine = true;
  @state() private controlsId?: string;
  @state() private nextToggle: HTMLElement|null = null;

  @query('#details-wrapper__back') private _detailsBackButton?: HTMLElement|null;

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

  private _debouncedSetBreakpoint:ReturnType<typeof debounce>|null = null;

  private _windowInnerWidth?: number;

  connectedCallback() {
    super.connectedCallback();

    this.setAttribute('aria-orientation', 'vertical');
    this.setAttribute('role', 'tablist');

    // Lower debounce delay for automated testing
    const debounceDelay = this.hasAttribute('automated-testing') ? 0 : 100;

    this._debouncedSetBreakpoint = debounce(this._setBreakpoint, debounceDelay);

    window.addEventListener('resize', this._debouncedSetBreakpoint);

    // A11y: add keydown event listener to activate keyboard controls
    this.addEventListener('keydown', this._keyboardControls);
  }

  render() {
    const detailsBackButtonExpanded = (this.breakpoint === 'compact' && this.active) ? 'true' : undefined;
    return html`
      <div id="wrapper"
          class="${classMap({ active: !!this.active })}"
          ?data-pristine="${this.pristine}">
        <div id="details-nav">
          <slot name="header"></slot>
          <slot name="details-nav--header"></slot>
          <slot name="nav"></slot>
          <slot name="details-nav"></slot>
        </div>
        <div id="details-wrapper">
          <div id="details-wrapper__header">
            <button
                id="details-wrapper__back"
                aria-controls="${ifDefined(this.controlsId)}"
                aria-expanded="${ifDefined(detailsBackButtonExpanded)}"
                @click="${this.closeAll}">
              ${this.expandedSectionTitle}
            </button>
          </div>
          <slot name="details"></slot>
        </div>
        <div id="details-nav__footer">
          <slot name="footer"></slot>
          <slot name="details-nav--footer"></slot>
        </div>
      </div>
    `;
  }

  disconnectedCallback() {
    if (this._debouncedSetBreakpoint) {
      window.removeEventListener('resize', this._debouncedSetBreakpoint);
    }

    const navs = this.slots.getSlotted('nav', 'details-nav');
    if (navs) {
      for (const nav of navs) {
        nav?.removeEventListener('click', this._handleHideShow);
      }
    }

    // Remove keydown event listener if component disconnects
    this.removeEventListener('keydown', this._keyboardControls);
  }

  protected _activeChanged(oldVal?: string|null, newVal?: string|null) {
    try {
      this._setActiveOnToggle(oldVal);
      this._setActiveOnToggle(newVal);
    } catch (error) {
      this.logger.warn((error as Error).message);
    }
  }

  /**
   * Updates markup of details-nav elements to be toggle buttons
   * @param  toggle Slotted element (probably a headline, unless it's been initialized already)
   * @param  index The index of the item in the details-nav slot
   */
  @bound private _initDetailsNav(slotted: HTMLElement, index: number) {
    const createToggleButton = slotted.tagName !== 'BUTTON';
    const toggle = createToggleButton ? this._createToggleButton(slotted) : slotted;

    // If the detailNavElement does not have a ID, set a unique ID
    toggle.id ||= getRandomId('pfe-detail-toggle');
    toggle.addEventListener('click', this._handleHideShow);
    toggle.dataset.index = index.toString();

    // Store a reference to our new detailsNav item
    if (this.slots.getSlotted('nav', 'details-nav')) {
      this.slots.getSlotted('nav', 'details-nav')[index] = toggle;
    }

    if (createToggleButton) {
      slotted.parentElement?.replaceChild(toggle, slotted);
    }
  }

  private _createToggleButton(detailNavElement: HTMLElement) {
    const attr = detailNavElement.attributes;
    const button = document.createElement('button');

    button.innerHTML = detailNavElement.innerHTML;
    button.setAttribute('role', 'tab');

    // list of attributes that we DO NOT want to pass to our shadow DOM.
    const denyListAttributes = ['style', 'role'];

    // Copy over attributes from original element that aren't in denyList
    [...attr].forEach(detailNavElement => {
      if (!denyListAttributes.includes(detailNavElement.name)) {
        button?.setAttribute(detailNavElement.name, detailNavElement.value);
      }
    });

    // Keeping track of tagName which is used in mobile layout to maintain heading order
    button.dataset.wasTag = detailNavElement.tagName;

    return button;
  }

  /**
   * Process detail wrapper elements
   * @param  detail DOM Object of detail wrapper
   * @param  index The index of the item when detail wrappers are queried
   */
  @bound private _initDetail(detail: HTMLElement, index: number) {
    detail.dataset.index = index.toString();

    const navs = this.slots.getSlotted('nav', 'details-nav');

    // If the toggle does not have a ID, set a unique ID
    if (!detail.hasAttribute('id')) {
      detail.setAttribute('id', getRandomId('pfe-detail'));
    }

    detail.setAttribute('role', 'tabpanel');
    // Set initial tabindex state for detail panel, -1 one when panel is inactive
    detail.setAttribute('tabindex', '-1');

    const toggleId = navs[index].getAttribute('id');

    if (!detail.hasAttribute('aria-labelledby') && toggleId) {
      detail.setAttribute('aria-labelledby', toggleId);
    }

    // Swing back to detailsNav to add aria-controls, now that details have an Id
    if (!navs[index].hasAttribute('aria-controls') && detail.id) {
      navs[index].setAttribute('aria-controls', detail.id);
    }

    // Leave a reliable indicator that this has been initialized so we don't do it again
    detail.dataset.processed = 'true';

    try {
      this._setActiveOnToggle(toggleId);
    } catch (error) {
      this.logger.warn((error as Error).message);
    }
  }

  /**
   * Evaluate whether component is smaller than breakpoint
   * Then manage state of component and manage active/inactive elements
   */
  @bound private _setBreakpoint() {
    // We don't need to do anything if the page width is unchanged
    if (this._windowInnerWidth === window.innerWidth) {
      return;
    }

    const breakpointWas = this.breakpoint;
    const breakpointIs = this.offsetWidth < this.breakpointWidth ? 'compact' : 'desktop';

    this.breakpoint = breakpointIs;

    // If nothing has been touched and we move to mobile, the details nav should be shown,
    // not the item that was opened by default so the desktop design would work
    if (this.pristine && breakpointIs === 'compact') {
      const activeToggle = this.active ? this.root?.getElementById(this.active) : false;
      if (activeToggle) {
        this.active = null;
      }
    }

    // If we've switched breakpoints or one wasn't set
    if (breakpointWas !== 'desktop' && breakpointIs === 'desktop') {
      const [target = null] = this.slots.getSlotted('nav', 'details-nav') || [];
      // Desktop should never have nothing selected, default to first item if nothing is selected
      if (!this.active) {
        this._handleHideShow({ target });
      }


      // Make sure the left column items are visible
      this._setDetailsNavVisibility(true);
    } else if (breakpointWas !== 'compact' && breakpointIs === 'compact') {
      // Hide the left column if it is out of view
      if (this.active) {
        this._setDetailsNavVisibility(false);
      }
    }

    for (const toggle of this.querySelectorAll('[slot$="nav"]')) {
      try {
        this._setActiveOnToggle(toggle.id);
      } catch (error) {
        this.logger.warn((error as Error).message);
      }
    }

    this._windowInnerWidth = window.innerWidth;
  }

  /**
   * Utility function to hide elements in details nav
   * @param  visible True to show nav elements, false to hide
   */
  @bound private _setDetailsNavVisibility(visible: boolean) {
    const SELECTORS = [
      ['nav', 'details-nav'],
      ['header', 'details-nav--header'],
      ['footer', 'details-nav--footer'],
    ];

    for (const slotNames of SELECTORS) {
      for (const detailNavItem of this.slots.getSlotted<HTMLElement>(...slotNames)) {
        if (detailNavItem) {
          detailNavItem.hidden = !visible;
        }
      }
    }
  }

  /**
   * Adds nav functionality and adds additional HTML/attributes to markup
   */
  @initializer() protected async _init() {
    await this.updateComplete;
    const navs = this.slots.getSlotted<HTMLElement>('nav', 'details-nav');
    const details = this.slots.getSlotted<HTMLElement>('details');
    if (navs?.length !== details?.length) {
      this.logger.error(`The number of item headings does not match the number of item details. Found ${navs?.length} item headings & ${details?.length} item details.`);
      return;
    }

    for (const [i, nav] of navs.entries()) {
      this._initDetailsNav(nav, i);
      this._initDetail(details[i], i);
    }

    this._setBreakpoint();

    // Desktop layout requires that something is active, if nothing is active make first item active
    if (!this.active && this.breakpoint === 'desktop') {
      const [target = null] = navs ?? [];
      this._handleHideShow({ target });
    }
  }

  private _setActiveOnToggle(toggleId?: string|null) {
    if (toggleId == null) {
      return;
    }

    const toggle = this.root?.getElementById(toggleId);

    if (!(toggle instanceof HTMLElement)) {
      return;
    }


    const active = this.active === toggle.id;
    const detailId = toggle.getAttribute('aria-controls');

    if (!detailId) {
      throw new Error(`Toggle ${toggle.id} has no associated detail panel`);
    }

    const detail = this.root?.getElementById(detailId);

    if (!detail) {
      throw new Error(`Toggle ${toggle.id} has no associated detail panel`);
    }

    detail.hidden = !active;
    detail.setAttribute('aria-hidden', String(!active));

    // Ideal toggle markup at desktop
    // [aria-selected=true]:not([aria-expanded])
    //
    // Ideal toggle markup at mobile
    // [aria-expanded=true]:not([aria-selected])
    const ariaAttr = this.breakpoint === 'desktop' ? 'aria-selected' : 'aria-expanded';

    toggle.setAttribute(ariaAttr, String(active));

    /**
     * A11y note:
     * tabindex = -1 removes element from the tab sequence, set when tab is not selected
     * so that only the active tab (selected tab) is in the tab sequence.
     * @see https://www.w3.org/TR/wai-aria-practices/examples/primary-detail/primary-detail-2/primary-detail.html
     */
    if (active) {
      detail.removeAttribute('tabindex');
    } else {
      detail.setAttribute('tabindex', '-1');
    }
  }

  private _renderDetailsWrapperHeading(): TemplateResult {
    if (!this.expandedSectionTitle) {
      return html`<strong id="details-wrapper__heading"></strong>`;
    } else {
      const { wasTag } = this.nextToggle?.dataset ?? {};
      // If wasTag isn't a headline, use strong
      const tag = unsafeStatic(wasTag?.match(/^H/i) ? wasTag : 'strong');

      return statichtml`
        <${tag} id="details-wrapper__heading">
          ${this.expandedSectionTitle}
        </${tag}>`;
    }
  }

  /**
   * Handles changes in state
   */
  @bound private async _handleHideShow(e: { target: EventTarget|null }) {
    // Detect if handleHideShow was called by an event listener or manually in code
    // If the user has interacted with the component remove the pristine attribute
    if (e instanceof Event) {
      this.pristine = false;
    }

    if (!(e.target instanceof HTMLElement)) {
      return;
    }

    // If the clicked toggle is already open, no need to do anything
    if (
      e.target.getAttribute('aria-selected') === 'true' &&
      e.target.id === this.active
    ) {
      return;
    }

    const previousToggle = this.active ? this.root?.getElementById(this.active) : false;
    const previousDetails =
        !previousToggle ? null
      : this.root?.getElementById(previousToggle.getAttribute('aria-controls') as string);

    this.nextToggle = e.target;

    // Update attribute to show which toggle is active
    this.active = this.nextToggle.id;

    const nextDetails =
      this.slots.getSlotted('details')?.[parseInt(this.nextToggle.dataset.index ?? '')] ?? null;

    await this.updateComplete;

    const currentToggle = this.active ? this.root?.getElementById(this.active) : null;

    // Make sure the aria-controls attribute is set to the details wrapper
    this.controlsId = nextDetails?.id;

    // Set the back button text
    this.expandedSectionTitle = this.nextToggle.innerText;

    // Shut previously active detail
    if (currentToggle) {
      this.dispatchEvent(pfeEvent('pfe-primary-detail:hidden-tab', {
        tab: previousToggle,
        details: previousDetails,
      }));
    }

    // At compact make sure elements in left sidebar are hidden, otherwise make sure they're shown
    if (this.breakpoint === 'compact') {
      if (this.active) {
        this._setDetailsNavVisibility(false);
        this._detailsBackButton?.focus();
      } else {
        this._setDetailsNavVisibility(true);
        if (previousToggle) {
          previousToggle.focus();
        }
      }
    }

    this.dispatchEvent(pfeEvent('pfe-primary-detail:shown-tab', {
      tab: this.nextToggle,
      details: nextDetails,
    }));

    this.dispatchEvent(new PrimaryDetailChangeEvent({
      previousTab: previousToggle || undefined,
      previousDetails: previousDetails ?? undefined,
      tab: this.nextToggle,
      details: nextDetails as HTMLElement,
    }));
  }

  /**
   * Closes the open toggle and details
   */
  @bound closeAll() {
    this._setDetailsNavVisibility(true);

    if (this.active) {
      const tab = this.root?.getElementById(this.active) as HTMLElement;
      const details = this.root?.getElementById(this.controlsId ?? '');
      // Set focus back to toggle that was activated
      this.active = null;
      this._detailsBackButton?.removeAttribute('aria-expanded');
      this.dispatchEvent(pfeEvent('pfe-primary-detail:hidden-tab', { tab, details }));
      tab.focus();
    }
  }

  /**
   * Check if active element is a tab toggle
   */
  private _isToggle(element: EventTarget|null): element is HTMLElement {
    return element instanceof HTMLElement && element.getAttribute('slot') === 'details-nav';
  }

  /**
   * Get previous toggle in relation to the active toggle
   * @return  DOM Element for toggle before the active one
   */
  private _getPrevToggle(): HTMLElement|null {
    const toggles = this.slots.getSlotted<HTMLElement>('nav', 'details-nav');
    const newIndex = (toggles?.findIndex(toggle => toggle === document.activeElement) ?? -1) - 1;

    return toggles?.[(newIndex + toggles.length) % toggles.length] ?? null;
  }

  /**
   * Get next toggle in list order from currently focused
   * @return {object} DOM Element for element after active toggle
   */
  private _getNextToggle(): HTMLElement|null {
    const toggles = this.slots.getSlotted('nav', 'details-nav');
    const newIndex = (toggles?.findIndex(toggle => toggle === document.activeElement) ?? -1) + 1;

    return toggles?.[newIndex % toggles.length] as HTMLElement ?? null;
  }

  /**
   * Manual user activation vertical tab
   */
  @bound private _keyboardControls(event: KeyboardEvent) {
    const currentElement = event.target;
    let newToggle;

    switch (event.key) {
      case 'Escape':
        // Only closing all at compact sizes since something should always be selected at non-compact
        if (this.getAttribute('breakpoint') === 'compact') {
          this.closeAll();
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
        newToggle = this._getPrevToggle();
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

        newToggle = this._getNextToggle();
        break;

      case 'Home':
        if (!this._isToggle(currentElement)) {
          return;
        }

        event.preventDefault(); // Prevent scrolling
        // Home
        /// / When a tab has focus, moves focus to the first tab

        [newToggle] = this.slots.getSlotted('nav', 'details-nav') ?? [];
        break;

      case 'End': {
        if (!this._isToggle(currentElement)) {
          return;
        }

        event.preventDefault(); // Prevent scrolling
        // End
        /// When a tab has focus, moves focus to the last tab

        const nodes = this.slots.getSlotted('nav', 'details-nav');
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
