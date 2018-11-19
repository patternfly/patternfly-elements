(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../rhelement/rhelement.umd.js')) :
  typeof define === 'function' && define.amd ? define(['../rhelement/rhelement.umd.js'], factory) :
  (global.RhAvatar = factory(global.RHElement));
}(this, (function (RHElement) { 'use strict';

  RHElement = RHElement && RHElement.hasOwnProperty('default') ? RHElement['default'] : RHElement;

  /**
   * djb2 string hashing function.
   *
   * @see http://www.cse.yorku.ca/~oz/hash.html
   * @param {String} str the string to hash.
   * @return {Number} a positive integer
   */

  function hash(str) {
    var hash = 5381;
    var i = str.length;

    while (i) {
      hash = hash * 33 ^ str.charCodeAt(--i);
    }

    return hash >>> 0;
  }

  var classCallCheck = function (instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  };

  var createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var get = function get(object, property, receiver) {
    if (object === null) object = Function.prototype;
    var desc = Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        return get(parent, property, receiver);
      }
    } else if ("value" in desc) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  };

  var inherits = function (subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  };

  var possibleConstructorReturn = function (self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  };

  var toConsumableArray = function (arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    } else {
      return Array.from(arr);
    }
  };

  /*
   * Copyright 2018 Red Hat, Inc.
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
   */

  var RhAvatar = function (_RHElement) {
    inherits(RhAvatar, _RHElement);
    createClass(RhAvatar, [{
      key: "html",
      get: function get$$1() {
        return "\n<style>\n:host {\n  --rh-avatar--pattern-color1: var(--rh-theme--color--ui-accent, #cce6ff);\n  --rh-avatar--pattern-color2: var(--rh-theme--color--ui-accent--hover, #cce6ff);\n  --rh-avatar--text-color: var(--rh-theme--color--text--on-dark, #333);\n  --rh-avatar--font-size: var(--rh-theme--font-size--heading--alpha, 1em);\n  --rh-avatar--border-radius: 16px;\n  --rh-avatar--width: 128px;\n  display: block;\n  position: relative;\n  width: var(--rh-avatar--width);\n  height: var(--rh-avatar--width); }\n  :host canvas {\n    width: 100%;\n    height: 100%;\n    image-rendering: optimizeSpeed;\n    \n    image-rendering: -moz-crisp-edges;\n    \n    image-rendering: -webkit-optimize-contrast;\n    \n    image-rendering: -o-crisp-edges;\n    \n    image-rendering: pixelated;\n    \n    -ms-interpolation-mode: nearest-neighbor;\n     }\n  :host #initials {\n    position: absolute;\n    top: 50%;\n    left: 50%;\n    transform: translate(-50%, -50%);\n    color: var(--rh-avatar--text-color);\n    font-size: calc(2 * var(--rh-avatar--font-size));\n    font-weight: bold;\n    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3); }\n\n:host([shape=rounded]) img, :host([shape=rounded]) canvas {\n  border-radius: calc( var(--rh-avatar--width) / 8 + 1px); }\n\n:host([shape=circle]) img, :host([shape=circle]) canvas {\n  border-radius: 50%; }\n\n:host([src]) canvas {\n  display: none; }\n\n:host([src]) img {\n  display: block;\n  width: 100%;\n  height: 100%;\n  object-fit: cover; }\n\n:host(:not([src])) img {\n  display: none; }\n\n:host(:not([show-initials])) #initials {\n  display: none; }\n\n:host([hidden]) {\n  display: none; }\n</style>\n<div id=\"initials\"></div>\n<canvas></canvas>\n<img>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "rh-avatar.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "rh-avatar.scss";
      }
    }, {
      key: "name",
      get: function get$$1() {
        return this.getAttribute("name");
      },
      set: function set$$1(val) {
        return this.setAttribute("name", val);
      }
    }, {
      key: "src",
      get: function get$$1() {
        return this.getAttribute("src");
      },
      set: function set$$1(href) {
        return this.setAttribute("src", href);
      }
    }, {
      key: "pattern",
      get: function get$$1() {
        return this.getAttribute("pattern") || RhAvatar.patterns.squares;
      },
      set: function set$$1(name) {
        if (!RhAvatar.patterns[name]) {
          this.log("invalid pattern \"" + name + "\", valid patterns are: " + Object.values(RhAvatar.patterns));
          return;
        }
        return this.setAttribute("pattern", name);
      }
    }], [{
      key: "tag",
      get: function get$$1() {
        return "rh-avatar";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["name", "pattern", "src", "shape"];
      }
    }, {
      key: "patterns",
      get: function get$$1() {
        return {
          triangles: "triangles",
          squares: "squares"
        };
      }
    }]);

    function RhAvatar() {
      classCallCheck(this, RhAvatar);
      return possibleConstructorReturn(this, (RhAvatar.__proto__ || Object.getPrototypeOf(RhAvatar)).call(this, RhAvatar));
    }

    createClass(RhAvatar, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(RhAvatar.prototype.__proto__ || Object.getPrototypeOf(RhAvatar.prototype), "connectedCallback", this).call(this);

        this._initCanvas();

        this.dispatchEvent(new CustomEvent(RhAvatar.tag + ":connected", {
          bubbles: false
        }));
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        var _this2 = this;

        get(RhAvatar.prototype.__proto__ || Object.getPrototypeOf(RhAvatar.prototype), "attributeChangedCallback", this).apply(this, arguments);

        if (this.connected) {
          this.update();
        } else {
          this.addEventListener(RhAvatar.tag + ":connected", function () {
            return _this2.update();
          });
        }
      }
    }, {
      key: "_initCanvas",
      value: function _initCanvas() {
        this._canvas = this.shadowRoot.querySelector("canvas");
        var size = this.var("--rh-avatar--width").replace(/px$/, "");
        this._canvas.width = size;
        this._canvas.height = size;

        this._squareSize = this._canvas.width / 8;
        this._triangleSize = this._canvas.width / 4;

        this._ctx = this._canvas.getContext("2d");
      }
    }, {
      key: "_findInitials",
      value: function _findInitials(name) {
        var nameArr = name.trim().split(/\s+/);
        var fi = nameArr[0][0];
        var li = nameArr.length > 1 ? nameArr[nameArr.length - 1][0] : "";
        return [fi, li];
      }
    }, {
      key: "_setInitials",
      value: function _setInitials(initials) {
        this.shadowRoot.querySelector("#initials").textContent = initials.join("");
      }
    }, {
      key: "_getColors",
      value: function _getColors() {
        this._color1 = this.var("--rh-avatar--pattern-color1");
        this._color2 = this.var("--rh-avatar--pattern-color2");
      }
    }, {
      key: "update",
      value: function update() {
        this._setInitials(this._findInitials(this.name));

        // if we have a src element, update the img, otherwise update the random pattern
        if (this.hasAttribute("src")) {
          this.shadowRoot.querySelector("img").src = this.src;
        } else {
          var bitPattern = hash(this.name).toString(2);
          var arrPattern = bitPattern.split("").map(function (n) {
            return Number(n);
          });

          this._getColors();
          this._clear();
          this._drawBackground();
          if (this.pattern === RhAvatar.patterns.squares) {
            this._drawSquarePattern(arrPattern);
          } else if (this.pattern === RhAvatar.patterns.triangles) {
            this._drawTrianglePattern(arrPattern);
          }
          this._drawGradient();
        }
      }
    }, {
      key: "_clear",
      value: function _clear() {
        this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
      }
    }, {
      key: "_drawBackground",
      value: function _drawBackground() {
        this._ctx.fillStyle = this._color1;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
      }
    }, {
      key: "_drawSquarePattern",
      value: function _drawSquarePattern(pattern) {
        this._ctx.fillStyle = this._color2;
        if (this._ctx) {
          var i = pattern.length;
          while (i--) {
            if (pattern[i]) {
              this._drawMirroredSquare(i % 4, Math.floor(i / 4));
            }
          }
        }
      }

      /**
       * Draw a square at the given position, mirrored onto both the left and right half of the canvas.
       */

    }, {
      key: "_drawMirroredSquare",
      value: function _drawMirroredSquare(x, y) {
        if (this._ctx) {
          this._drawSquare(x, y);
          this._drawSquare(7 - x, y);
        }
      }
    }, {
      key: "_drawSquare",
      value: function _drawSquare(x, y) {
        this._ctx.fillRect(this._squareSize * x, this._squareSize * y, this._squareSize, this._squareSize);
      }
    }, {
      key: "_drawTrianglePattern",
      value: function _drawTrianglePattern(pattern) {
        this._ctx.fillStyle = this._color2;
        if (this._ctx) {
          var i = pattern.length;
          while (i--) {
            if (pattern[i]) {
              var x = Math.floor(i / 2) % 2;
              var y = Math.floor(i / 4);
              var alt = i % 4;

              var p1 = [x, y];
              var p2 = [x, y];
              var p3 = [x, y];

              switch (alt) {
                case 0:
                  p2[1]++;
                  p3[0]++;
                  p3[1]++;
                  break;
                case 1:
                  p2[0]++;
                  p3[0]++;
                  p3[1]++;
                  break;
                case 2:
                  p2[0]++;
                  p3[1]++;
                  break;
                case 3:
                  p1[0]++;
                  p2[0]++;
                  p2[1]++;
                  p3[1]++;
                  break;
              }

              this._drawMirroredTriangle(p1, p2, p3);
            }
          }
        }
      }

      /**
       * Draw a square at the given position in the top-left quadrant of the
       * canvas, and mirrored to the other three quadrants.
       */

    }, {
      key: "_drawMirroredTriangle",
      value: function _drawMirroredTriangle(p1, p2, p3) {
        if (this._ctx) {
          this._drawTriangle(p1, p2, p3);
          this._drawTriangle([4 - p1[0], p1[1]], [4 - p2[0], p2[1]], [4 - p3[0], p3[1]]);
        }
      }
    }, {
      key: "_drawTriangle",
      value: function _drawTriangle(p1, p2, p3) {
        var _ctx,
            _this3 = this,
            _ctx2,
            _ctx3;

        this._ctx.beginPath();
        (_ctx = this._ctx).moveTo.apply(_ctx, toConsumableArray(p1.map(function (c) {
          return c * _this3._triangleSize;
        })));
        (_ctx2 = this._ctx).lineTo.apply(_ctx2, toConsumableArray(p2.map(function (c) {
          return c * _this3._triangleSize;
        })));
        (_ctx3 = this._ctx).lineTo.apply(_ctx3, toConsumableArray(p3.map(function (c) {
          return c * _this3._triangleSize;
        })));
        this._ctx.closePath();
        this._ctx.fill();
        this._ctx.fill();
      }
    }, {
      key: "_drawGradient",
      value: function _drawGradient() {
        var gradient = this._ctx.createLinearGradient(0, this._canvas.height, this._canvas.width, 0);
        var gradientColor1 = "" + this._color2;
        var gradientColor2 = "" + this._color2;
        if (/^#[A-f0-9]{3}$/.test(this._color2)) {
          // color is of the form "#fff"
          gradientColor1 += "c";
          gradientColor2 += "0";
        } else if (/^#[A-f0-9]{6}$/.test(this._color2)) {
          // color is of the form "#ffffff"
          gradientColor1 += "cc";
          gradientColor2 += "00";
        }
        gradient.addColorStop(0, gradientColor1);
        gradient.addColorStop(1, gradientColor2);
        gradient.addColorStop(1, gradientColor1);
        this._ctx.fillStyle = gradient;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
      }
    }]);
    return RhAvatar;
  }(RHElement);

  RHElement.create(RhAvatar);

  return RhAvatar;

})));
//# sourceMappingURL=rh-avatar.umd.js.map
