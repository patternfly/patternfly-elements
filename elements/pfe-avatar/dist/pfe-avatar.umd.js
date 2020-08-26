(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('../../pfelement/dist/pfelement.umd')) :
  typeof define === 'function' && define.amd ? define(['../../pfelement/dist/pfelement.umd'], factory) :
  (global.PfeAvatar = factory(global.PFElement));
}(this, (function (PFElement) { 'use strict';

  PFElement = PFElement && PFElement.hasOwnProperty('default') ? PFElement['default'] : PFElement;

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

  function h2rgb(v1, v2, vH) {
    if (vH < 0) vH += 1;
    if (vH > 1) vH -= 1;
    if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH;
    if (2 * vH < 1) return v2;
    if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
    return v1;
  }

  /**
   * Convert an HSL color to RGB.
   *
   * @param {Number} H the hue component
   * @param {Number} S the saturation component
   * @param {Number} L the luminance component
   * @return {Array} [R, G, B]
   *
   * @see https://www.easyrgb.com/en/math.php
   */
  function hsl2rgb(_H, _S, _L) {
    var R = void 0,
        G = void 0,
        B = void 0;

    var H = Math.max(0, Math.min(1, _H));
    var S = Math.max(0, Math.min(1, _S));
    var L = Math.max(0, Math.min(1, _L));

    if (S == 0) {
      R = L * 255;
      G = L * 255;
      B = L * 255;
    } else {
      var a = void 0,
          b = void 0;

      if (L < 0.5) {
        b = L * (1 + S);
      } else {
        b = L + S - S * L;
      }

      a = 2 * L - b;

      R = Math.floor(255 * h2rgb(a, b, H + 1 / 3));
      G = Math.floor(255 * h2rgb(a, b, H));
      B = Math.floor(255 * h2rgb(a, b, H - 1 / 3));
    }

    return [R, G, B];
  }

  /**
   * Convert an RGBcolor to HSL.
   *
   * @param {Number} R the red component
   * @param {Number} G the green component
   * @param {Number} B the blue component
   * @return {Array} [H, S, L]
   *
   * @see https://www.easyrgb.com/en/math.php
   */
  function rgb2hsl(_R, _G, _B) {
    var H = void 0,
        S = void 0,
        L = void 0;

    var R = Math.max(0, Math.min(255, _R));
    var G = Math.max(0, Math.min(255, _G));
    var B = Math.max(0, Math.min(255, _B));

    var r = R / 255;
    var g = G / 255;
    var b = B / 255;

    var var_min = Math.min(Math.min(r, g), b);
    var var_max = Math.max(Math.max(r, g), b);
    var del_max = var_max - var_min;

    L = (var_max + var_min) / 2;

    if (del_max === 0) {
      H = 0;
      S = 0;
    } else {
      if (L < 0.5) {
        S = del_max / (var_max + var_min);
      } else {
        S = del_max / (2 - var_max - var_min);
      }

      var del_r = ((var_max - r) / 6 + del_max / 2) / del_max;
      var del_g = ((var_max - g) / 6 + del_max / 2) / del_max;
      var del_b = ((var_max - b) / 6 + del_max / 2) / del_max;

      if (r == var_max) {
        H = del_b - del_g;
      } else if (g == var_max) {
        H = 1 / 3 + del_r - del_b;
      } else if (b == var_max) {
        H = 2 / 3 + del_g - del_r;
      }

      if (H < 0) {
        H += 1;
      } else if (H > 1) {
        H -= 1;
      }
    }

    return [H, S, L];
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

  /*!
   * PatternFly Elements: PfeAvatar 1.0.0-prerelease.55
   * @license
   * Copyright 2020 Red Hat, Inc.
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

  var PfeAvatar = function (_PFElement) {
    inherits(PfeAvatar, _PFElement);
    createClass(PfeAvatar, [{
      key: "html",
      get: function get$$1() {
        return "<style>:host{display:block;position:relative;width:128px;width:var(--pfe-avatar--size,var(--pfe-avatar--width,128px));height:128px;height:var(--pfe-avatar--size,var(--pfe-avatar--width,128px))}:host canvas{width:100%;height:100%;image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:-o-crisp-edges;image-rendering:-o-pixelated;image-rendering:pixelated;-ms-interpolation-mode:nearest-neighbor}:host([pfe-shape=rounded]) canvas,:host([pfe-shape=rounded]) img{border-radius:calc(128px / 8 + 1px);border-radius:calc(var(--pfe-avatar--size,var(--pfe-avatar--width,128px))/ 8 + 1px)}:host([pfe-shape=circle]) canvas,:host([pfe-shape=circle]) img{border-radius:50%}:host([pfe-src]) canvas{display:none}:host([pfe-src]) img{display:block;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host(:not([pfe-src])) img{display:none}:host([hidden]){display:none}\n/*# sourceMappingURL=pfe-avatar.min.css.map */\n</style><canvas></canvas>\n<img>";
      }
    }, {
      key: "templateUrl",
      get: function get$$1() {
        return "pfe-avatar.html";
      }
    }, {
      key: "styleUrl",
      get: function get$$1() {
        return "pfe-avatar.scss";
      }
    }, {
      key: "name",
      get: function get$$1() {
        return this.getAttribute("pfe-name");
      },
      set: function set$$1(val) {
        return this.setAttribute("pfe-name", val);
      }
    }, {
      key: "src",
      get: function get$$1() {
        return this.getAttribute("pfe-src");
      },
      set: function set$$1(href) {
        return this.setAttribute("pfe-src", href);
      }
    }, {
      key: "pattern",
      get: function get$$1() {
        return this.getAttribute("pfe-pattern") || PfeAvatar.patterns.squares;
      },
      set: function set$$1(name) {
        if (!PfeAvatar.patterns[name]) {
          this.log("invalid pattern \"" + name + "\", valid patterns are: " + Object.values(PfeAvatar.patterns));
          return;
        }
        return this.setAttribute("pfe-pattern", name);
      }
    }], [{
      key: "version",
      get: function get$$1() {
        return "1.0.0-prerelease.55";
      }
    }, {
      key: "tag",
      get: function get$$1() {
        return "pfe-avatar";
      }
    }, {
      key: "observedAttributes",
      get: function get$$1() {
        return ["pfe-name", "pfe-pattern", "pfe-src", "pfe-shape"];
      }
    }, {
      key: "events",
      get: function get$$1() {
        return {
          connected: this.tag + ":connected"
        };
      }
    }, {
      key: "patterns",
      get: function get$$1() {
        return {
          triangles: "triangles",
          squares: "squares"
        };
      }
    }, {
      key: "defaultSize",
      get: function get$$1() {
        return 128;
      }
    }, {
      key: "defaultColors",
      get: function get$$1() {
        return "#67accf #448087 #709c6b #a35252 #826cbb";
      }
    }]);

    function PfeAvatar() {
      classCallCheck(this, PfeAvatar);
      return possibleConstructorReturn(this, (PfeAvatar.__proto__ || Object.getPrototypeOf(PfeAvatar)).call(this, PfeAvatar));
    }

    createClass(PfeAvatar, [{
      key: "connectedCallback",
      value: function connectedCallback() {
        get(PfeAvatar.prototype.__proto__ || Object.getPrototypeOf(PfeAvatar.prototype), "connectedCallback", this).call(this);

        this._initCanvas();

        this.emitEvent(PfeAvatar.events.connected, {
          bubbles: false
        });
      }
    }, {
      key: "attributeChangedCallback",
      value: function attributeChangedCallback(attr, oldValue, newValue) {
        var _this2 = this;

        get(PfeAvatar.prototype.__proto__ || Object.getPrototypeOf(PfeAvatar.prototype), "attributeChangedCallback", this).apply(this, arguments);

        if (this.connected) {
          this.update();
        } else {
          this.addEventListener(PfeAvatar.events.connected, function () {
            return _this2.update();
          });
        }
      }
    }, {
      key: "_initCanvas",
      value: function _initCanvas() {
        this._canvas = this.shadowRoot.querySelector("canvas");
        var size = this.var("--pfe-avatar--width").replace(/px$/, "") || PfeAvatar.defaultSize;
        this._canvas.width = size;
        this._canvas.height = size;

        this._squareSize = this._canvas.width / 8;
        this._triangleSize = this._canvas.width / 4;

        this._ctx = this._canvas.getContext("2d");
      }
    }, {
      key: "update",
      value: function update() {
        // if we have a src element, update the img, otherwise update the random pattern
        if (this.hasAttribute("pfe-src")) {
          this.shadowRoot.querySelector("img").src = this.src;
        } else {
          var bitPattern = hash(this.name).toString(2);
          var arrPattern = bitPattern.split("").map(function (n) {
            return Number(n);
          });
          this._colorIndex = Math.floor(PfeAvatar.colors.length * parseInt(bitPattern, 2) / Math.pow(2, 32));
          this.color1 = PfeAvatar.colors[this._colorIndex].color1;
          this.color2 = PfeAvatar.colors[this._colorIndex].color2;

          this._clear();
          this._drawBackground();
          if (this.pattern === PfeAvatar.patterns.squares) {
            this._drawSquarePattern(arrPattern);
          } else if (this.pattern === PfeAvatar.patterns.triangles) {
            this._drawTrianglePattern(arrPattern);
          }
          // this._drawGradient();
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
        this._ctx.fillStyle = this.color1;
        this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
      }
    }, {
      key: "_drawSquarePattern",
      value: function _drawSquarePattern(pattern) {
        this._ctx.fillStyle = this.color2;
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
        this._ctx.fillStyle = this.color2;
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
        var color = this.color2;
        var gradientColor1 = color;
        var gradientColor2 = color;
        if (/^#[A-f0-9]{3}$/.test(color)) {
          // color is of the form "#fff"
          gradientColor1 += "c";
          gradientColor2 += "0";
        } else if (/^#[A-f0-9]{6}$/.test(color)) {
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
    }], [{
      key: "_registerColors",
      value: function _registerColors() {
        var _this4 = this;

        this.colors = [];
        var themeColors = this.var("--pfe-avatar--colors") || this.defaultColors;

        themeColors.split(/\s+/).forEach(function (colorCode) {
          var pattern = void 0;
          switch (colorCode.length) {
            case 4:
              // ex: "#0fc"
              pattern = /^#([A-f0-9])([A-f0-9])([A-f0-9])$/.exec(colorCode);
              if (pattern) {
                pattern.shift();
                var color = pattern.map(function (c) {
                  return parseInt(c + c, 16);
                });
                _this4._registerColor(color);
              } else {
                _this4.log("[pfe-avatar] invalid color " + colorCode);
              }
              break;
            case 7:
              // ex: "#00ffcc"
              pattern = /^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/.exec(colorCode);
              if (pattern) {
                pattern.shift();
                var _color = pattern.map(function (c) {
                  return parseInt(c, 16);
                });
                _this4._registerColor(_color);
              } else {
                _this4.log("[pfe-avatar] invalid color " + colorCode);
              }
          }
        });

        return this.colors;
      }
    }, {
      key: "_registerColor",
      value: function _registerColor(color) {
        PfeAvatar.colors.push({
          color1: "rgb(" + color.join(",") + ")",
          color2: "rgb(" + this._adjustColor(color).join(",") + ")"
        });
      }
    }, {
      key: "_adjustColor",
      value: function _adjustColor(color) {
        var dark = 0.1;
        var l_adj = 0.1; // luminance adjustment
        var hsl = rgb2hsl.apply(undefined, toConsumableArray(color));

        // if luminance is too dark already, then lighten the alternate color
        // instead of darkening it.
        hsl[2] += hsl[2] > dark ? -l_adj : l_adj;

        return hsl2rgb.apply(undefined, toConsumableArray(hsl));
      }
    }]);
    return PfeAvatar;
  }(PFElement);

  PfeAvatar._registerColors();

  PFElement.create(PfeAvatar);

  return PfeAvatar;

})));
//# sourceMappingURL=pfe-avatar.umd.js.map
