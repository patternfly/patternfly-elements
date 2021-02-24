import PFElement from "../../pfelement/dist/pfelement.js";

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
      for: { type: String, observer: "_forHandler" },
      position: { type: String, observer: "updatePosition" },
      offset: { type: Number, observer: "updatePosition" }
    };
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Container;
  }

  constructor() {
    super(PfeAbsolutePosition, { type: PfeAbsolutePosition.PfeType });
    this.manualMode = false;
    this.fitToVisibleBounds = false;
    this.offset = 0;
    this.marginTop = 0;
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

  /**
   * Returns the target element that this tooltip is anchored to. It is
   * either the element given by the `for` attribute, or the immediate parent
   * of the tooltip.
   *
   * @type {Node}
   */
  get target() {
    var parentNode = this.parentNode;
    // If the parentNode is a document fragment, then we need to use the host.
    var ownerRoot = this.getRootNode();
    var target;
    if (this.for) {
      target = ownerRoot.querySelector("#" + this.for);
    } else {
      target = parentNode.nodeType == Node.DOCUMENT_FRAGMENT_NODE ? ownerRoot.host : parentNode;
    }
    return target;
  }

  connectedCallback() {
    this._findTarget();
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

  /**
   * @return {void}
   */
  updatePosition() {
    if (!this._target || !this.offsetParent) return;
    var offset = this.offset;
    // If a marginTop has been provided by the user (pre 1.0.3), use it.
    if (this.marginTop != 14 && this.offset == 14) offset = this.marginTop;
    var parentRect = this.offsetParent.getBoundingClientRect();
    var targetRect = this._target.getBoundingClientRect();
    var thisRect = this.getBoundingClientRect();
    var horizontalCenterOffset = (targetRect.width - thisRect.width) / 2;
    var verticalCenterOffset = (targetRect.height - thisRect.height) / 2;
    var targetLeft = targetRect.left - parentRect.left;
    var targetTop = targetRect.top - parentRect.top;
    var tooltipLeft, tooltipTop;
    switch (this.position) {
      case "top":
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop - thisRect.height - offset;
        break;
      case "bottom":
        tooltipLeft = targetLeft + horizontalCenterOffset;
        tooltipTop = targetTop + targetRect.height + offset;
        break;
      case "left":
        tooltipLeft = targetLeft - thisRect.width - offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
      case "right":
        tooltipLeft = targetLeft + targetRect.width + offset;
        tooltipTop = targetTop + verticalCenterOffset;
        break;
    }
    // TODO(noms): This should use IronFitBehavior if possible.
    if (this.fitToVisibleBounds) {
      // Clip the left/right side
      if (parentRect.left + tooltipLeft + thisRect.width > window.innerWidth) {
        this.style.right = "0px";
        this.style.left = "auto";
      } else {
        this.style.left = Math.max(0, tooltipLeft) + "px";
        this.style.right = "auto";
      }
      // Clip the top/bottom side.
      if (parentRect.top + tooltipTop + thisRect.height > window.innerHeight) {
        this.style.bottom = parentRect.height - targetTop + offset + "px";
        this.style.top = "auto";
      } else {
        this.style.top = Math.max(-parentRect.top, tooltipTop) + "px";
        this.style.bottom = "auto";
      }
    } else {
      this.style.left = tooltipLeft + "px";
      this.style.top = tooltipTop + "px";
    }
  }

  _findTarget() {
    this._removeListeners();
    this._target = this.target;
    this.updatePosition();
    this._addListeners();
  }

  _forHandler(prev, newValue) {
    if (newValue) {
      this._target = this.parentElement.querySelector(`#${newValue}`);
    }
    this._findTarget();
  }

  _positionChangeHandler(prev, newValue) {
    this.updatePosition();
  }

  _addListeners() {
    if (this._target) {
      this._target.addEventListener("mouseenter", this.show.bind(this));
      this._target.addEventListener("focus", this.show.bind(this));
      this._target.addEventListener("mouseleave", this.hide.bind(this));
      this._target.addEventListener("blur", this.hide.bind(this));
      this._target.addEventListener("tap", this.hide.bind(this));
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
          document.documentElement.style.setProperty("--pfe-tooltip-delay-in", timingDelay + "ms");
        } else if (type === "exit") {
          document.documentElement.style.setProperty("--pfe-tooltip-delay-out", timingDelay + "ms");
        }
      }
      return this.animationConfig[type][0].name;
    }
  }

  _cancelAnimation() {
    // Short-cut and cancel all animations and hide
    this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("entry"));
    this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("exit"));
    this.shadowRoot.querySelector("#tooltip").classList.remove("cancel-animation");
    this.shadowRoot.querySelector("#tooltip").classList.add("hidden");
  }

  _onAnimationEnd() {
    // If no longer showing add class hidden to completely hide tooltip
    this._animationPlaying = false;
    if (!this._showing) {
      this.shadowRoot.querySelector("#tooltip").classList.remove(this._getAnimationType("exit"));
      this.shadowRoot.querySelector("#tooltip").classList.add("hidden");
    }
  }
}

PFElement.create(PfeAbsolutePosition);

export default PfeAbsolutePosition;
