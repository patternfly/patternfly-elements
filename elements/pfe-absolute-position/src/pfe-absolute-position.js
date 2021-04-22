/**
 * This is heavily inspired by LRN Web Component's absolute-position-behaviors element
 * https://github.com/elmsln/lrnwebcomponents/tree/master/elements/absolute-position-behavior
 */

import PFElement from "../../pfelement/dist/pfelement.js";
import "./pfe-absolute-position-state-manager.js";

class PfeAbsolutePosition extends PFElement {
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
      case "Enter" || 13:
        this.show();
        break;
      case " " || 32:
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
