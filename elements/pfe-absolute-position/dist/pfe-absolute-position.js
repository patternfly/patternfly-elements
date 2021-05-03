import PFElement from '../../pfelement/dist/pfelement.js';

/*!
 * PatternFly Elements: PfeAbsolutePosition 1.6.0
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

// register globally so we can make sure there is only one
window.AbsolutePositionStateManager = window.AbsolutePositionStateManager || {};
// request if this exists. This helps invoke element existing in dom
// as well as that there is only one of them. That way we can ensure everything
// is rendered through same modal
window.AbsolutePositionStateManager.requestAvailability = () => {
  if (!window.AbsolutePositionStateManager.instance) {
    window.AbsolutePositionStateManager.instance = document.createElement("pfe-absolute-position-state-manager");
    let instance = window.AbsolutePositionStateManager.instance;
    document.body.appendChild(instance);
  }
  return window.AbsolutePositionStateManager.instance;
};

/**
 * `absolute-position-state-manager`
 * manages state of multiple absolute-positioned elements on a page
 *
 * @element absolute-position-state-manager
 */
class PfeAbsolutePositionStateManager extends HTMLElement {
  /**
   * Store tag name to make it easier to obtain directly.
   */
  static get tag() {
    return "pfe-absolute-position-state-manager";
  }

  /**
   * Makes sure there is a utility ready and listening for elements.
   */
  constructor() {
    super();
    this.elements = [];
    // Track the element that is currently open.
    this._activeElement = null;
    this.__timeout = false;
    this.__observer = new MutationObserver(mutations => this.checkMutations(mutations));
  }

  /**
   * Elements can request they be active through this method.
   * The manager will ensure only one element is active at a time.
   * The manager will call the _absolutePositionActiveChanged handler on
   * the currently active element and the new element request it be active.
   *
   * @example _absolutePositionActiveChanged(isActive)
   *
   * @param {node} element a reference to the element requesting active state
   * @param {ActivateElementOptions} options
   * @return {void}
   */
  activateElement(element) {
    // Notify current active element to deactivate
    if (this._activeElement) {
      if (typeof this._activeElement._absolutePositionActiveChanged !== "undefined") {
        this._activeElement._absolutePositionActiveChanged(false);
      }
    }
    // Notify the new element to activate
    if (typeof element._absolutePositionActiveChanged !== "undefined") {
      element._absolutePositionActiveChanged(true);
    }
    // updated activeElement state
    this._activeElement = element;
  }

  /**
   * Elements should notify the state manager that they have locally
   * been deactated so that the manager can update the state. Note that
   * this violates unidirectional data flow but we don't care because other
   * elements don't care if others deactivate. It's only on activation state
   * that others need care about.
   *
   * @param {node} element a reference to the element requesting active state
   * @return {void}
   */
  deactivateElement(element) {
    if (element === this._activeElement) {
      this._activeElement = null;
    }
  }

  /**
   * Loads element into array
   * @param {object} element to be added
   */
  loadElement(el) {
    //only have event listeners when there are elements using manager
    if (this.elements.length < 1) {
      this.__observer.observe(document, {
        attributes: true,
        childList: true,
        subtree: true,
        characterData: true
      });
      this.updateElements();
      document.addEventListener("load", this.updateElements);
      window.addEventListener("resize", this._handleResize);
    }
    this.elements.push(el);
    el.style.top = 0;
    el.style.left = 0;
    this.positionElement(el);
  }

  /**
   * Unloads element from array
   * @param {object} element to be removed
   */
  unloadElement(el) {
    this.elements.filter(element => element === el);
    if (this.elements.length < 1) this.removeEventListeners();
  }

  /**
   * handles resize event
   */
  _handleResize() {
    if (this.__timeout) clearTimeout(this.__timeout);
    this.__timeout = setTimeout(window.AbsolutePositionStateManager.instance.updateElements(), 250);
  }

  /**
   * Checks if there are any chances other than to
   * element's position and updates accordioning.
   * This is needed so that positioning elements
   * doesn't trigger an infinite loop of updates.
   *
   * @param {array} mutation records
   * @return {void}
   */
  checkMutations(mutations) {
    let update = false;

    mutations.forEach(mutation => {
      if (update) return;
      update = update;
      !(
        mutation.type === "attributes" &&
        // We need to ignore any changes that the pfe-absolute-position
        // element is making on the target to prevent an infinite loop.
        // In this case we need to ignore role and tabindex.
        // @todo this should be abstracted into an options argument.
        mutation.attributeName !== "role" &&
        mutation.attributeName !== "tabindex" &&
        mutation.attributeName !== "aria-label" &&
        mutation.attributeName !== "aria-describedby" &&
        mutation.attributeName !== "aria-expanded" &&
        mutation.attributeName !== "aria-hidden" &&
        mutation.attributeName !== "style" &&
        this.elements.includes(mutation.target)
      );
    });
    if (update) this.updateElements();
  }

  /**
   * Returns target element that this element is anchored to. It is
   * either element given by `for` attribute, or immediate parent
   * of element.
   *
   * Uses `target` object if specified.
   * If not, queries document for elements with id specified in `for` attribute.
   * If there is more than one element that matches, gets closest matching element.
   *
   * @param {object} element using pfe-absolute-position behavior
   * @return {object} target element for positioning
   */
  findTarget(el) {
    let selector = "#" + el.for,
      target = el.target,
      ancestor = el;

    while (!!el.for && !target && !!ancestor && !!ancestor.parentNode && ancestor !== document) {
      ancestor = ancestor.parentNode;
      target = ancestor ? ancestor.querySelector(selector) : undefined;
      if (ancestor.nodeType === 11) ancestor = ancestor.host;
      target = !target && ancestor ? ancestor.querySelector(selector) : target;
    }

    // Hook to notify element that its target has been updated.
    if (typeof el.targetUpdated == "function") el.targetUpdated(target);
    return target;
  }

  /**
   * Removes event listeners
   * Centrally manage the event listeners
   * @return {void}
   */
  removeEventListeners() {
    if (this.__observer && this.__observer.disconnect) this.__observer.disconnect();
    document.removeEventListener("load", this.updateElements);
    window.removeEventListener("resize", this._handleResize);
  }

  /**
   * Updates position for all elements on page.
   * @return {void}
   */
  updateElements() {
    this.elements.forEach(element => this.positionElement(element));
  }

  _getParentNode(node) {
    let parent = node.parentNode;
    if (parent !== undefined && parent !== null && parent.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      parent = parent.host;
    }
    return parent;
  }

  /**
   * Gets an updated position based on target.
   * @param {object} element using absolute-position behavior
   * @return {void}
   */
  positionElement(el) {
    if (!el.position) {
      el.position = "bottom";
    }
    let target = this.findTarget(el),
      parent = el.offsetParent;
    if (!target || !parent) return;
    let offset = parseFloat(el.offset),
      w = document.body.getBoundingClientRect(),
      p = parent.getBoundingClientRect(),
      t = target.getBoundingClientRect(),
      e = el.getBoundingClientRect(),
      //place element before vertically?
      vertical = (pos = el.position) => pos !== "left" && pos !== "right",
      //place element before target?
      before = (pos = el.position) => pos === "left" || pos === "top",
      /**
       * aligns horizontally if position is vertical
       * or aligns vertically if position is horizontal
       */
      setAlign = (v = vertical(el.position)) => {
        //fits element within parent's boundaries
        let pxToNum = px => parseFloat(px.replace("px", "")),
          min = v ? pxToNum(el.style.left) - e.left : pxToNum(el.style.top) - e.top,
          startAt = v ? "left" : "top",
          distance = rect => (v ? rect.width : rect.height),
          max = min + distance(w) - distance(e),
          align = min;
        if (el.positionAlign === "end") {
          align += t[startAt] - distance(e) + distance(t);
        } else if (el.positionAlign === "start") {
          align += t[startAt];
        } else {
          align += t[startAt] - distance(e) / 2 + distance(t) / 2;
        }
        return el.fitToVisibleBounds ? Math.max(min, Math.min(max, align)) + "px" : align + "px"; //if element size > parent, align where parent begins
      },
      getCoord = (pos = el.position) => {
        let pxToNum = px => parseFloat(px.replace("px", "")),
          adjust = vertical(pos) ? pxToNum(el.style.top) - e.top : pxToNum(el.style.left) - e.left,
          eh =
            window.getComputedStyle(el, null).overflowY == "visible" ? Math.max(e.height, el.scrollHeight) : e.height,
          ew = window.getComputedStyle(el, null).overflowX == "visible" ? Math.max(e.width, el.scrollWidth) : e.width;
        return pos === "top"
          ? t.top + adjust - eh - offset + "px"
          : pos === "left"
          ? t.left + adjust - ew - offset + "px"
          : t[pos] + adjust + offset + "px";
      },
      isFit = (pos = el.position) => {
        //determines if room for element between parent and target
        let distance = rect => (vertical(pos) ? e.height + offset : e.width + offset);
        return before(pos) ? t[pos] - w[pos] > distance : w[pos] - t[pos] > distance; //if no room, return original position
      },
      flip = el.fitToVisibleBounds !== false && !isFit(el.position),
      flipData = {
        top: ["bottom", "left", "right"],
        left: ["right", "top", "bottom"],
        bottom: ["top", "right", "left"],
        right: ["left", "bottom", "top"]
      };
    el.style.position = "absolute";
    /*
     * fits element according to specified postion,
     * or finds an alternative position that fits
     */
    if (flip && isFit(flipData[el.position][0])) {
      el.position = flipData[el.position][0];
    } else if (flip && isFit(flipData[el.position][1])) {
      el.position = flipData[el.position][1];
    } else if (flip && isFit(flipData[el.position][2])) {
      el.position = flipData[el.position][2];
    } else {
      el.style.top = vertical(el.position) ? getCoord() : setAlign();
      el.style.left = vertical(el.position) ? setAlign() : getCoord();
      //provide positions for element and target (in case furthor positioning adjustments are needed)
      el.__positions = {
        self: e,
        parent: p,
        target: t
      };
    }
  }

  /**
   * life cycle, element is removed from DOM
   */
  disconnectedCallback() {
    this.removeEventListeners();
    super.disconnectedCallback();
  }
}

window.customElements.define(PfeAbsolutePositionStateManager.tag, PfeAbsolutePositionStateManager);

/*!
 * PatternFly Elements: PfeAbsolutePosition 1.6.0
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

class PfeAbsolutePosition extends PFElement {

  // Injected at build-time
  static get version() {
    return "1.6.0";
  }

  // Injected at build-time
  get html() {
    return `
<style>:host{display:block;position:absolute;z-index:99999}:host([hidden]){display:none}@-webkit-keyframes keyFrameScaleUp{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes keyFrameScaleUp{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1)}}@-webkit-keyframes keyFrameScaleDown{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0);transform:scale(0)}}@keyframes keyFrameScaleDown{0%{-webkit-transform:scale(1);transform:scale(1)}100%{-webkit-transform:scale(0);transform:scale(0)}}@-webkit-keyframes keyFrameFadeInOpacity{0%{opacity:0}100%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@keyframes keyFrameFadeInOpacity{0%{opacity:0}100%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@-webkit-keyframes keyFrameFadeOutOpacity{0%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}100%{opacity:0}}@keyframes keyFrameFadeOutOpacity{0%{opacity:1;opacity:var(--simple-tooltip-opacity,1)}100%{opacity:0}}@-webkit-keyframes keyFrameSlideDownIn{0%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}10%{opacity:.2}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@keyframes keyFrameSlideDownIn{0%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}10%{opacity:.2}100%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}}@-webkit-keyframes keyFrameSlideDownOut{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}10%{opacity:.2}100%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}}@keyframes keyFrameSlideDownOut{0%{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1)}10%{opacity:.2}100%{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0}}.fade-in-animation{opacity:0;-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-delay:var(--simple-tooltip-delay-in,0ms);animation-delay:var(--simple-tooltip-delay-in,0ms);-webkit-animation-name:keyFrameFadeInOpacity;animation-name:keyFrameFadeInOpacity;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-duration:.1s;animation-duration:.1s;-webkit-animation-duration:var(--simple-tooltip-duration-in,100ms);animation-duration:var(--simple-tooltip-duration-in,100ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.fade-out-animation{opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:0s;animation-delay:0s;-webkit-animation-delay:var(--simple-tooltip-delay-out,0ms);animation-delay:var(--simple-tooltip-delay-out,0ms);-webkit-animation-name:keyFrameFadeOutOpacity;animation-name:keyFrameFadeOutOpacity;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:linear;animation-timing-function:linear;-webkit-animation-duration:.1s;animation-duration:.1s;-webkit-animation-duration:var(--simple-tooltip-duration-out,100ms);animation-duration:var(--simple-tooltip-duration-out,100ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.scale-up-animation{-webkit-transform:scale(0);transform:scale(0);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-in,500ms);animation-delay:var(--simple-tooltip-delay-in,500ms);-webkit-animation-name:keyFrameScaleUp;animation-name:keyFrameScaleUp;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-in,500ms);animation-duration:var(--simple-tooltip-duration-in,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.scale-down-animation{-webkit-transform:scale(1);transform:scale(1);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameScaleDown;animation-name:keyFrameScaleDown;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:ease-in;animation-timing-function:ease-in;-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-down-animation{-webkit-transform:translateY(-2000px);transform:translateY(-2000px);opacity:0;-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameSlideDownIn;animation-name:keyFrameSlideDownIn;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:cubic-bezier(0,0,.2,1);animation-timing-function:cubic-bezier(0,0,.2,1);-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.slide-down-animation-out{-webkit-transform:translateY(0);transform:translateY(0);opacity:1;opacity:var(--simple-tooltip-opacity,1);-webkit-animation-delay:.5s;animation-delay:.5s;-webkit-animation-delay:var(--simple-tooltip-delay-out,500ms);animation-delay:var(--simple-tooltip-delay-out,500ms);-webkit-animation-name:keyFrameSlideDownOut;animation-name:keyFrameSlideDownOut;-webkit-animation-iteration-count:1;animation-iteration-count:1;-webkit-animation-timing-function:cubic-bezier(.4,0,1,1);animation-timing-function:cubic-bezier(.4,0,1,1);-webkit-animation-duration:.5s;animation-duration:.5s;-webkit-animation-duration:var(--simple-tooltip-duration-out,500ms);animation-duration:var(--simple-tooltip-duration-out,500ms);-webkit-animation-fill-mode:forwards;animation-fill-mode:forwards}.cancel-animation{-webkit-animation-delay:-30s!important;animation-delay:-30s!important}.hidden{display:none!important} /*# sourceMappingURL=pfe-absolute-position.min.css.map */</style>
<slot></slot>`;
  }

  static get tag() {
    return "pfe-absolute-position";
  }

  static get meta() {
    return {
      title: "Absolute position",
      description: "Make any element absolute positioned over another element."
    };
  }

  get templateUrl() {
    return "pfe-absolute-position.html";
  }

  get styleUrl() {
    return "pfe-absolute-position.scss";
  }

  static get properties() {
    return {
      /**
       * Element is positioned from connected to disconnected?
       * Otherwise setPosition and unsetPosition must be called manually.
       */
      auto: {
        type: Boolean,
        default: false,
        observer: "_autoChanged"
      },
      /**
       * If true, no parts of the tooltip will ever be shown offscreen.
       */
      fitToVisibleBounds: {
        type: Boolean,
        default: false,
        observer: "updatePosition"
      },
      /**
       * If true, no parts of the tooltip will ever be shown offscreen.
       */
      hidden: {
        type: Boolean,
        reflect: true,
        observer: "updatePosition"
      },
      /**
       * The id of the element that the tooltip is anchored to. This element
       * must be a sibling of the tooltip. If this property is not set,
       * then the tooltip will be centered to the parent node containing it.
       */
      for: {
        type: String,
        reflect: true,
        default: null,
        observer: "updatePosition"
      },
      /**
       * The spacing between the top of the tooltip and the element it is
       * anchored to.
       */
      offset: {
        type: Number,
        default: 0,
        observer: "updatePosition"
      },
      /**
       * Positions the tooltip to the top, right, bottom, left of its content.
       */
      position: {
        type: String,
        reflect: true,
        default: "top",
        observer: "updatePosition"
      },
      /**
       * Aligns at the start, or end fo target. Default is centered.
       */
      positionAlign: {
        type: String,
        reflect: true,
        default: "center",
        observer: "updatePosition"
      },
      /**
       * Set the mode to either hover or click
       */
      mode: {
        type: String,
        default: "hover",
        observer: "updatePosition"
      }
    };
  }

  /**
   * Get the actual target element
   * @type {Node}
   */
  get target() {
    return this._target;
  }

  /**
   * Set the actual target element
   * @type {Node}
   */
  set target(node) {
    this._target = node;
    return this._target;
  }

  /**
   * Get the actual target element
   * @type {Object}
   */
  get _positions() {
    return this._target;
  }

  /**
   * Set the actual target element
   * @type {Object}
   */
  set _positions(positions) {
    this.__positions = positions;
    return this.__positions;
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeAbsolutePosition, { type: PfeAbsolutePosition.PfeType });
    this._positions = {};
    this.target = null;
    this.__observe = false;
    this.__manager = window.AbsolutePositionStateManager.requestAvailability();

    this.animationEntry = "";
    this.animationExit = "";
    this.animationConfig = {
      entry: [{ name: "fade-in-animation", node: this, timing: { delay: 0 } }],
      exit: [{ name: "fade-out-animation", node: this }]
    };
    setTimeout(() => {
      this.addEventListener("webkitAnimationEnd", this._onAnimationEnd.bind(this));
    }, 0);
  }

  connectedCallback() {
    super.connectedCallback();
    // initialize set position immediately in auto changed
    this._autoChanged(null, this.auto);
  }

  // auto property change handler
  _autoChanged(oldValue, newValue) {
    // if the component is set to auto then we are going to handle setting the
    // position for the user.
    if (this.auto) this.setPosition();
    // if the user explicitly turned off auto then we'll unset position for them.
    if (oldValue === true && this.auto) {
      if (!this.auto) this.unsetPosition();
    }
  }

  /**
   * Target Updated Hook
   *
   * Called when a target element is found.
   * @param {Node} target
   */
  targetUpdated(target) {
    this._target = target;
    this._addListeners();
  }

  /**
   * Registers element with AbsolutePositionStateManager
   * @returns {void}
   */
  setPosition() {
    this.__observe = true;
    this.__manager.loadElement(this);
  }

  /**
   * Unregisters element with AbsolutePositionStateManager
   * @returns {void}
   */
  unsetPosition() {
    this.__observe = false;
    this.__manager.unloadElement(this);
  }

  /**
   * Updates  element's position
   * @returns {void}
   */
  updatePosition() {
    if (this.__observe === true) {
      this.__manager.positionElement(this);
    }
  }
  /**
   * life cycle, element is removed from DOM
   * @returns {void}
   */
  disconnectedCallback() {
    this.unsetPosition();
    this._removeListeners();
    super.disconnectedCallback();
  }

  /**
   * Cancels the animation and either fully shows or fully hides tooltip
   */
  cancelAnimation() {
    // Short-cut and cancel all animations and hide
    this.shadowRoot.querySelector("#tooltip").classList.add("cancel-animation");
  }

  // Hook into absolute state manager to see if we
  // have been activated or deactivated
  _absolutePositionActiveChanged(isActive) {
    isActive ? this._show() : this.hide();
  }

  /**
   * Shows the tooltip programatically
   * @return {void}
   */
  show() {
    this.__manager.activateElement(this);
  }

  _show() {
    // If the tooltip is already showing, there's nothing to do.
    if (this._showing) return;
    this._showing = true;
    this.shadowRoot.querySelector("#tooltip").classList.remove("hidden");
    this.shadowRoot.querySelector("#tooltip").classList.remove("cancel-animation");
    this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("exit"));
    this.updatePosition();
    this._animationPlaying = true;
    this.shadowRoot.querySelector("#tooltip").classList.add(this._getAnimationType("entry"));
  }

  /**
   * Hides the tooltip programatically
   * @return {void}
   */
  hide() {
    // If the tooltip is already hidden, there's nothing to do.
    if (!this._showing) {
      return;
    }

    // If the entry animation is still playing, don't try to play the exit
    // animation since this will reset the opacity to 1. Just end the animation.
    if (this._animationPlaying) {
      this._showing = false;
      this._cancelAnimation();
      return;
    } else {
      // Play Exit Animation
      this._onAnimationFinish();
    }
    this._animationPlaying = true;
    this._showing = false;
    // Let the manager know that to remove us from its activeElement state.
    this.__manager.deactivateElement(this);
    // force hide if we are open too long
    // helps older platforms and the monster known as Safari
    clearTimeout(this.__debounceCancel);
    this.__debounceCancel = setTimeout(() => {
      this._cancelAnimation();
    }, 5000);
  }

  /**
   * Toggle the visibility of the tooltip programatically
   * @return {void}
   */
  toggle() {
    if (!this._showing || typeof this._showing === "undefined") {
      this.show();
    } else {
      this.hide();
    }
  }

  _manualModeChanged() {
    if (this.manualMode) this._removeListeners();
    else this._addListeners();
  }

  _cancelAnimation() {
    // Short-cut and cancel all animations and hide
    this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("entry"));
    this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("exit"));
    this.shadowRoot.querySelector("#tooltip").classList.remove("cancel-animation");
    this.shadowRoot.querySelector("#tooltip").classList.add("hidden");
  }

  _onAnimationFinish() {
    if (this._showing) {
      this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("entry"));
      this.shadowRoot.querySelector("#tooltip").classList.remove("cancel-animation");
      this.shadowRoot.querySelector("#tooltip").classList.add(this._getAnimationType("exit"));
    }
  }

  _onAnimationEnd() {
    // If no longer showing add class hidden to completely hide tooltip
    this._animationPlaying = false;
    if (!this._showing) {
      this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("exit"));
      this.shadowRoot.querySelector("#tooltip").classList.add("hidden");
    }
  }

  _getAnimationType(type) {
    // These properties have priority over animationConfig values
    if (type === "entry" && this.animationEntry !== "") {
      return this.animationEntry;
    }
    if (type === "exit" && this.animationExit !== "") {
      return this.animationExit;
    }
    // If no results then return the legacy value from animationConfig
    if (this.animationConfig[type] && typeof this.animationConfig[type][0].name === "string") {
      // Checking Timing and Update if necessary - Legacy for animationConfig
      if (
        this.animationConfig[type][0].timing &&
        this.animationConfig[type][0].timing.delay &&
        this.animationConfig[type][0].timing.delay !== 0
      ) {
        var timingDelay = this.animationConfig[type][0].timing.delay;
        // Has Timing Change - Update CSS
        if (type === "entry") {
          document.documentElement.style.setProperty("--simple-tooltip-delay-in", timingDelay + "ms");
        } else if (type === "exit") {
          document.documentElement.style.setProperty("--simple-tooltip-delay-out", timingDelay + "ms");
        }
      }
      return this.animationConfig[type][0].name;
    }
  }

  _addListeners() {
    if (this.target) {
      if (this.mode === "hover") {
        this.target.addEventListener("mouseenter", this.show.bind(this));
        this.target.addEventListener("focus", this.show.bind(this));
        this.target.addEventListener("mouseleave", this.hide.bind(this));
        this.target.addEventListener("blur", this.hide.bind(this));
        this.target.addEventListener("tap", this.hide.bind(this));
      }
      if (this.mode === "click") {
        this.target.addEventListener("keydown", this._keydownHandler.bind(this));
        this.target.addEventListener("click", this.show.bind(this));
        this.target.addEventListener("tap", this.show.bind(this));
      }
    }
  }

  _removeListeners() {
    if (this.target) {
      if (this.mode === "hover") {
        this.target.removeEventListener("mouseenter", this.show.bind(this));
        this.target.removeEventListener("focus", this.show.bind(this));
        this.target.removeEventListener("mouseleave", this.hide.bind(this));
        this.target.removeEventListener("blur", this.hide.bind(this));
        this.target.removeEventListener("tap", this.hide.bind(this));
      }
      if (this.mode === "click") {
        this.target.removeEventListener("click", this.toggle.bind(this));
        this.target.removeEventListener("keydown", this._keydownHandler.bind(this));
        this.target.removeEventListener("tap", this.hide.bind(this));
      }
    }
  }

  // Listen for keyboard events and map them to their
  // corresponding mouse events.
  _keydownHandler(event) {
    let key = event.key || event.keyCode;
    switch (key) {
      case "Enter" :
        this.show();
        break;
      case " " :
        // Prevent the browser from scolling when the user hits the space key
        this.show();
        event.stopPropagation();
        event.preventDefault();
        break;
    }
  }

  _delayChange(newValue) {
    // Only Update delay if different value set
    if (newValue !== 500) {
      document.documentElement.style.setProperty("--simple-tooltip-delay-in", newValue + "ms");
    }
  }
}

PFElement.create(PfeAbsolutePosition);

export default PfeAbsolutePosition;
//# sourceMappingURL=pfe-absolute-position.js.map
