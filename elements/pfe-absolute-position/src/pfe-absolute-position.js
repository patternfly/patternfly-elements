/**
 * This is heavily inspired by LRN Web Component's absolute-position-behaviors element
 * https://github.com/elmsln/lrnwebcomponents/tree/master/elements/absolute-position-behavior
 */

import PFElement from "../../pfelement/dist/pfelement.js";
import "./absolute-position-state-manager.js";

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
        default: false
      },
      /**
       * If true, no parts of the tooltip will ever be shown offscreen.
       */
      fitToVisibleBounds: {
        type: Boolean,
        default: false
      },
      /**
       * If true, no parts of the tooltip will ever be shown offscreen.
       */
      hidden: {
        type: Boolean,
        reflect: true
      },
      /**
       * The id of the element that the tooltip is anchored to. This element
       * must be a sibling of the tooltip. If this property is not set,
       * then the tooltip will be centered to the parent node containing it.
       */
      for: {
        type: String,
        reflect: true,
        default: null
      },
      /**
       * The spacing between the top of the tooltip and the element it is
       * anchored to.
       */
      offset: {
        type: Number,
        default: 0
      },
      /**
       * Positions the tooltip to the top, right, bottom, left of its content.
       */
      position: {
        type: String,
        reflect: true,
        default: "top"
      },
      /**
       * Aligns at the start, or end fo target. Default is centered.
       */
      positionAlign: {
        type: String,
        reflect: true,
        default: "center"
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
      this.addEventListener("mouseenter", this.hide.bind(this));
    }, 0);
  }

  connectedCallback() {
    super.connectedCallback();
    Object.keys(PfeAbsolutePosition.properties).forEach(prop => this._updated(prop, null, this[prop]));
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    super.attributeChangedCallback(...arguments);
    this._updated(...arguments);
  }

  _updated(attr, oldVal, newVal) {
    if (attr === "auto" && this.auto) this.setPosition();
    if (attr === "auto" && !this.auto) this.unsetPosition();
    if (attr === "fitToVisibleBounds") this.updatePosition();
    if (attr === "for") this.updatePosition();
    if (attr === "offset") this.updatePosition();
    if (attr === "position") this.updatePosition();
    if (attr === "positionAlign") this.updatePosition();
    if (attr === "target") this.updatePosition();
    if (attr === "hidden") this.updatePosition();
  }

  _targetUpdated(target) {
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

  _addListeners() {
    if (this.target) {
      this.target.addEventListener("mouseenter", this.show.bind(this));
      this.target.addEventListener("focus", this.show.bind(this));
      this.target.addEventListener("mouseleave", this.hide.bind(this));
      this.target.addEventListener("blur", this.hide.bind(this));
      this.target.addEventListener("tap", this.hide.bind(this));
    }
  }

  /**
   * @deprecated Use show and hide instead.
   * @param {string} type Either `entry` or `exit`
   */
  playAnimation(type) {
    if (type === "entry") {
      this.show();
    } else if (type === "exit") {
      this.hide();
    }
  }

  /**
   * Cancels the animation and either fully shows or fully hides tooltip
   */
  cancelAnimation() {
    // Short-cut and cancel all animations and hide
    this.shadowRoot.querySelector("#tooltip").classList.add("cancel-animation");
  }

  /**
   * Shows the tooltip programatically
   * @return {void}
   */
  show() {
    // If the tooltip is already showing, there's nothing to do.
    if (this._showing) return;

    if (this.textContent.trim() === "") {
      // Check if effective children are also empty
      var allChildrenEmpty = true;
      var effectiveChildren = this.children;
      for (var i = 0; i < effectiveChildren.length; i++) {
        if (effectiveChildren[i].textContent.trim() !== "") {
          allChildrenEmpty = false;
          break;
        }
      }
      if (allChildrenEmpty) {
        return;
      }
    }

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
    this._showing = false;
    this._animationPlaying = true;
    // force hide if we are open too long
    // helps older platforms and the monster known as Safari
    clearTimeout(this.__debounceCancel);
    this.__debounceCancel = setTimeout(() => {
      this._cancelAnimation();
    }, 5000);
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

  _removeListeners() {
    if (this._target) {
      this._target.removeEventListener("mouseover", this.show.bind(this));
      this._target.removeEventListener("focusin", this.show.bind(this));
      this._target.removeEventListener("mouseout", this.hide.bind(this));
      this._target.removeEventListener("focusout", this.hide.bind(this));
      this._target.removeEventListener("click", this.hide.bind(this));
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
