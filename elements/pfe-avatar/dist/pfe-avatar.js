import PFElement from '../../pfelement/dist/pfelement.js';

/**
 * djb2 string hashing function.
 *
 * @see http://www.cse.yorku.ca/~oz/hash.html
 * @param {String} str the string to hash.
 * @return {Number} a positive integer
 */

function hash(str) {
  let hash = 5381;
  let i = str.length;

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i);
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
  let R, G, B;

  const H = Math.max(0, Math.min(1, _H));
  const S = Math.max(0, Math.min(1, _S));
  const L = Math.max(0, Math.min(1, _L));

  if (S == 0) {
    R = L * 255;
    G = L * 255;
    B = L * 255;
  } else {
    let a, b;

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
  let H, S, L;

  const R = Math.max(0, Math.min(255, _R));
  const G = Math.max(0, Math.min(255, _G));
  const B = Math.max(0, Math.min(255, _B));

  const r = R / 255;
  const g = G / 255;
  const b = B / 255;

  const var_min = Math.min(Math.min(r, g), b);
  const var_max = Math.max(Math.max(r, g), b);
  const del_max = var_max - var_min;

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

    const del_r = ((var_max - r) / 6 + del_max / 2) / del_max;
    const del_g = ((var_max - g) / 6 + del_max / 2) / del_max;
    const del_b = ((var_max - b) / 6 + del_max / 2) / del_max;

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

class PfeAvatar extends PFElement {
  static get version() {
    return "1.0.0-prerelease.55";
  }

  get html() {
    return `<style>:host{display:block;position:relative;width:128px;width:var(--pfe-avatar--size,var(--pfe-avatar--width,128px));height:128px;height:var(--pfe-avatar--size,var(--pfe-avatar--width,128px))}:host canvas{width:100%;height:100%;image-rendering:optimizeSpeed;image-rendering:-moz-crisp-edges;image-rendering:-webkit-optimize-contrast;image-rendering:-o-crisp-edges;image-rendering:-o-pixelated;image-rendering:pixelated;-ms-interpolation-mode:nearest-neighbor}:host([pfe-shape=rounded]) canvas,:host([pfe-shape=rounded]) img{border-radius:calc(128px / 8 + 1px);border-radius:calc(var(--pfe-avatar--size,var(--pfe-avatar--width,128px))/ 8 + 1px)}:host([pfe-shape=circle]) canvas,:host([pfe-shape=circle]) img{border-radius:50%}:host([pfe-src]) canvas{display:none}:host([pfe-src]) img{display:block;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}:host(:not([pfe-src])) img{display:none}:host([hidden]){display:none}
/*# sourceMappingURL=pfe-avatar.min.css.map */
</style><canvas></canvas>
<img>`;
  }
  static get tag() {
    return "pfe-avatar";
  }

  get templateUrl() {
    return "pfe-avatar.html";
  }

  get styleUrl() {
    return "pfe-avatar.scss";
  }

  static get observedAttributes() {
    return ["pfe-name", "pfe-pattern", "pfe-src", "pfe-shape"];
  }

  static get events() {
    return {
      connected: `${this.tag}:connected`
    };
  }

  static get patterns() {
    return {
      triangles: "triangles",
      squares: "squares"
    };
  }

  static get defaultSize() {
    return 128;
  }

  static get defaultColors() {
    return "#67accf #448087 #709c6b #a35252 #826cbb";
  }

  get name() {
    return this.getAttribute("pfe-name");
  }

  set name(val) {
    return this.setAttribute("pfe-name", val);
  }

  get src() {
    return this.getAttribute("pfe-src");
  }

  set src(href) {
    return this.setAttribute("pfe-src", href);
  }

  get pattern() {
    return this.getAttribute("pfe-pattern") || PfeAvatar.patterns.squares;
  }

  set pattern(name) {
    if (!PfeAvatar.patterns[name]) {
      this.log(
        `invalid pattern "${name}", valid patterns are: ${Object.values(
          PfeAvatar.patterns
        )}`
      );
      return;
    }
    return this.setAttribute("pfe-pattern", name);
  }

  constructor() {
    super(PfeAvatar);
  }

  connectedCallback() {
    super.connectedCallback();

    this._initCanvas();

    this.emitEvent(PfeAvatar.events.connected, {
      bubbles: false
    });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);

    if (this.connected) {
      this.update();
    } else {
      this.addEventListener(PfeAvatar.events.connected, () => this.update());
    }
  }

  _initCanvas() {
    this._canvas = this.shadowRoot.querySelector("canvas");
    const size =
      this.var("--pfe-avatar--width").replace(/px$/, "") ||
      PfeAvatar.defaultSize;
    this._canvas.width = size;
    this._canvas.height = size;

    this._squareSize = this._canvas.width / 8;
    this._triangleSize = this._canvas.width / 4;

    this._ctx = this._canvas.getContext("2d");
  }

  static _registerColors() {
    this.colors = [];
    const themeColors = this.var("--pfe-avatar--colors") || this.defaultColors;

    themeColors.split(/\s+/).forEach(colorCode => {
      let pattern;
      switch (colorCode.length) {
        case 4: // ex: "#0fc"
          pattern = /^#([A-f0-9])([A-f0-9])([A-f0-9])$/.exec(colorCode);
          if (pattern) {
            pattern.shift();
            const color = pattern.map(c => parseInt(c + c, 16));
            this._registerColor(color);
          } else {
            this.log(`[pfe-avatar] invalid color ${colorCode}`);
          }
          break;
        case 7: // ex: "#00ffcc"
          pattern = /^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/.exec(
            colorCode
          );
          if (pattern) {
            pattern.shift();
            const color = pattern.map(c => parseInt(c, 16));
            this._registerColor(color);
          } else {
            this.log(`[pfe-avatar] invalid color ${colorCode}`);
          }
      }
    });

    return this.colors;
  }

  static _registerColor(color) {
    PfeAvatar.colors.push({
      color1: `rgb(${color.join(",")})`,
      color2: `rgb(${this._adjustColor(color).join(",")})`
    });
  }

  static _adjustColor(color) {
    const dark = 0.1;
    const l_adj = 0.1; // luminance adjustment
    const hsl = rgb2hsl(...color);

    // if luminance is too dark already, then lighten the alternate color
    // instead of darkening it.
    hsl[2] += hsl[2] > dark ? -l_adj : l_adj;

    return hsl2rgb(...hsl);
  }

  update() {
    // if we have a src element, update the img, otherwise update the random pattern
    if (this.hasAttribute("pfe-src")) {
      this.shadowRoot.querySelector("img").src = this.src;
    } else {
      const bitPattern = hash(this.name).toString(2);
      const arrPattern = bitPattern.split("").map(n => Number(n));
      this._colorIndex = Math.floor(
        (PfeAvatar.colors.length * parseInt(bitPattern, 2)) / Math.pow(2, 32)
      );
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

  _clear() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _drawBackground() {
    this._ctx.fillStyle = this.color1;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _drawSquarePattern(pattern) {
    this._ctx.fillStyle = this.color2;
    if (this._ctx) {
      let i = pattern.length;
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
  _drawMirroredSquare(x, y) {
    if (this._ctx) {
      this._drawSquare(x, y);
      this._drawSquare(7 - x, y);
    }
  }

  _drawSquare(x, y) {
    this._ctx.fillRect(
      this._squareSize * x,
      this._squareSize * y,
      this._squareSize,
      this._squareSize
    );
  }

  _drawTrianglePattern(pattern) {
    this._ctx.fillStyle = this.color2;
    if (this._ctx) {
      let i = pattern.length;
      while (i--) {
        if (pattern[i]) {
          const x = Math.floor(i / 2) % 2;
          const y = Math.floor(i / 4);
          const alt = i % 4;

          const p1 = [x, y];
          const p2 = [x, y];
          const p3 = [x, y];

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
  _drawMirroredTriangle(p1, p2, p3) {
    if (this._ctx) {
      this._drawTriangle(p1, p2, p3);
      this._drawTriangle(
        [4 - p1[0], p1[1]],
        [4 - p2[0], p2[1]],
        [4 - p3[0], p3[1]]
      );
    }
  }

  _drawTriangle(p1, p2, p3) {
    this._ctx.beginPath();
    this._ctx.moveTo(...p1.map(c => c * this._triangleSize));
    this._ctx.lineTo(...p2.map(c => c * this._triangleSize));
    this._ctx.lineTo(...p3.map(c => c * this._triangleSize));
    this._ctx.closePath();
    this._ctx.fill();
    this._ctx.fill();
  }

  _drawGradient() {
    const gradient = this._ctx.createLinearGradient(
      0,
      this._canvas.height,
      this._canvas.width,
      0
    );
    const color = this.color2;
    let gradientColor1 = color;
    let gradientColor2 = color;
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
}

PfeAvatar._registerColors();

PFElement.create(PfeAvatar);

export default PfeAvatar;
//# sourceMappingURL=pfe-avatar.js.map
