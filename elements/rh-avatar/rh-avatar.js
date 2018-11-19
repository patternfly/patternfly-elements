import RHElement from "../rhelement/rhelement.js";
import { hash } from "./djb-hash.js";

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

class RhAvatar extends RHElement {
  get html() {
    return `
<style>
:host {
  --rh-avatar--pattern-color1: var(
    --rh-avatar--color--background,
    var(--rh-theme--color--ui-accent, #cce6ff)
  );
  --rh-avatar--pattern-color2: var(
    --rh-avatar--color--foreground,
    var(--rh-theme--color--ui-accent--hover, #cce6ff)
  );
  --rh-avatar--text-color: var(--rh-theme--color--text--on-dark, #333);
  --rh-avatar--font-size: var(--rh-theme--font-size--heading--alpha, 1em);
  --rh-avatar--width: 128px;
  display: block;
  position: relative;
  width: var(--rh-avatar--width);
  height: var(--rh-avatar--width); }
  :host canvas {
    width: 100%;
    height: 100%;
    image-rendering: optimizeSpeed;
    
    image-rendering: -moz-crisp-edges;
    
    image-rendering: -webkit-optimize-contrast;
    
    image-rendering: -o-crisp-edges;
    
    image-rendering: pixelated;
    
    -ms-interpolation-mode: nearest-neighbor;
     }
  :host #initials {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: var(--rh-avatar--text-color);
    font-size: calc(2 * var(--rh-avatar--font-size));
    line-height: 1em;
    font-weight: bold;
    text-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3); }

:host([shape="rounded"]) img,
:host([shape="rounded"]) canvas {
  border-radius: calc(var(--rh-avatar--width) / 8 + 1px); }

:host([shape="circle"]) img,
:host([shape="circle"]) canvas {
  border-radius: 50%; }

:host([src]) canvas {
  display: none; }

:host([src]) img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover; }

:host(:not([src])) img {
  display: none; }

:host(:not([show-initials])) #initials {
  display: none; }

:host([hidden]) {
  display: none; }
</style>
<div id="initials"></div>
<canvas></canvas>
<img>`;
  }

  static get tag() {
    return "rh-avatar";
  }

  get templateUrl() {
    return "rh-avatar.html";
  }

  get styleUrl() {
    return "rh-avatar.scss";
  }

  static get observedAttributes() {
    return ["name", "pattern", "src", "shape"];
  }

  static get patterns() {
    return {
      triangles: "triangles",
      squares: "squares"
    };
  }

  get name() {
    return this.getAttribute("name");
  }

  set name(val) {
    return this.setAttribute("name", val);
  }

  get src() {
    return this.getAttribute("src");
  }

  set src(href) {
    return this.setAttribute("src", href);
  }

  get pattern() {
    return this.getAttribute("pattern") || RhAvatar.patterns.squares;
  }

  set pattern(name) {
    if (!RhAvatar.patterns[name]) {
      this.log(
        `invalid pattern "${name}", valid patterns are: ${Object.values(
          RhAvatar.patterns
        )}`
      );
      return;
    }
    return this.setAttribute("pattern", name);
  }

  constructor() {
    super(RhAvatar);
  }

  connectedCallback() {
    super.connectedCallback();

    this._initCanvas();

    this.dispatchEvent(
      new CustomEvent(`${RhAvatar.tag}:connected`, {
        bubbles: false
      })
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);

    if (this.connected) {
      this.update();
    } else {
      this.addEventListener(`${RhAvatar.tag}:connected`, () => this.update());
    }
  }

  _initCanvas() {
    this._canvas = this.shadowRoot.querySelector("canvas");
    const size = this.var("--rh-avatar--width").replace(/px$/, "");
    this._canvas.width = size;
    this._canvas.height = size;

    this._squareSize = this._canvas.width / 8;
    this._triangleSize = this._canvas.width / 4;

    this._ctx = this._canvas.getContext("2d");
  }

  _findInitials(name) {
    if (!name || name.length === 0) {
      return [];
    }
    const nameArr = name.trim().split(/\s+/);
    const fi = nameArr[0][0];
    const li = nameArr.length > 1 ? nameArr[nameArr.length - 1][0] : "";
    return [fi, li];
  }

  _setInitials(initials) {
    this.shadowRoot.querySelector("#initials").textContent = initials.join("");
  }

  _getColors() {
    this._color1 = this.var("--rh-avatar--pattern-color1");
    this._color2 = this.var("--rh-avatar--pattern-color2");
  }

  update() {
    this._setInitials(this._findInitials(this.name));

    // if we have a src element, update the img, otherwise update the random pattern
    if (this.hasAttribute("src")) {
      this.shadowRoot.querySelector("img").src = this.src;
    } else {
      const bitPattern = hash(this.name).toString(2);
      const arrPattern = bitPattern.split("").map(n => Number(n));

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

  _clear() {
    this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _drawBackground() {
    this._ctx.fillStyle = this._color1;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }

  _drawSquarePattern(pattern) {
    this._ctx.fillStyle = this._color2;
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
    this._ctx.fillStyle = this._color2;
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
    let gradientColor1 = `${this._color2}`;
    let gradientColor2 = `${this._color2}`;
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
}

RHElement.create(RhAvatar);

export default RhAvatar;
//# sourceMappingURL=rh-avatar.js.map
