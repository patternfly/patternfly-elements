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
  display: block; }
  :host canvas {
    width: 100%;
    image-rendering: optimizeSpeed;
    
    image-rendering: -moz-crisp-edges;
    
    image-rendering: -webkit-optimize-contrast;
    
    image-rendering: -o-crisp-edges;
    
    image-rendering: pixelated;
    
    -ms-interpolation-mode: nearest-neighbor;
     }

:host([hidden]) {
  display: none; }
</style>
<canvas></canvas>`;
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
    return ["value", "shape"];
  }

  static get shapes() {
    return {
      triangle: "triangle",
      square: "square"
    };
  }

  get value() {
    return this.getAttribute("value");
  }

  set value(val) {
    return this.setAttribute("value", val);
  }

  get shape() {
    return this.getAttribute("shape") || RhAvatar.shapes.square;
  }

  set shape(name) {
    if (!RhAvatar.shapes[name]) {
      this.log(
        `invalid shape "${name}", valid shapes are: ${Object.values(
          RhAvatar.shapes
        )}`
      );
      return;
    }
    return this.setAttribute("shape", name);
  }

  constructor() {
    super(RhAvatar);
  }

  connectedCallback() {
    super.connectedCallback();

    this._canvas = this.shadowRoot.querySelector("canvas");
    this._canvas.width = 608;
    this._canvas.height = 608;

    this._squareSize = this._canvas.width / 8;
    this._triangleSize = this._canvas.width / 4;

    this._ctx = this._canvas.getContext("2d");

    this._color1 =
      window
        .getComputedStyle(this)
        .getPropertyValue("--rh-theme--color--ui-accent")
        .trim() || "#cce6ff";
    this._color2 =
      window
        .getComputedStyle(this)
        .getPropertyValue("--rh-theme--color--ui-accent--hover")
        .trim() || "#464646";

    this.dispatchEvent(
      new CustomEvent(`${RhAvatar.tag}:connected`, {
        bubbles: false
      })
    );
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(...arguments);

    const value = this.getAttribute("value");

    if (this.connected) {
      this._update(value);
    } else {
      this.addEventListener(`${RhAvatar.tag}:connected`, () =>
        this._update(value)
      );
    }
  }

  _update(newValue) {
    const bitPattern = hash(newValue).toString(2);
    const arrPattern = bitPattern.split("").map(n => Number(n));

    this._clear();
    this._drawBackground();
    if (this.shape === RhAvatar.shapes.square) {
      this._drawSquarePattern(arrPattern);
    } else if (this.shape === RhAvatar.shapes.triangle) {
      this._drawTrianglePattern(arrPattern);
    }
    this._drawGradient();

    console.log(arrPattern.join("").padStart(32, 0));
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
      const patternFlip = pattern;
      let i = patternFlip.length;
      while (i--) {
        if (patternFlip[i]) {
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
    gradient.addColorStop(0, `${this._color2}cc`);
    gradient.addColorStop(1, `${this._color2}00`);
    gradient.addColorStop(1, `${this._color2}CC`);
    this._ctx.fillStyle = gradient;
    this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
  }
}

RHElement.create(RhAvatar);

export default RhAvatar;
//# sourceMappingURL=rh-avatar.js.map
