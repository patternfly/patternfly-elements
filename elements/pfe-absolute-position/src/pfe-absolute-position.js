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
    if (typeof this._targetUpdated == "function") this._targetUpdated(node);
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
    super.disconnectedCallback();
  }
}

PFElement.create(PfeAbsolutePosition);

export default PfeAbsolutePosition;
