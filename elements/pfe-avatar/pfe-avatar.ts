import type { RGBTriple } from './lib/hslrgb.js';

import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { Logger } from '@patternfly/pfe-core/controllers/logger.js';
import { CssVariableController } from '@patternfly/pfe-core/controllers/css-variable-controller.js';
import { pfelement, bound, observed } from '@patternfly/pfe-core/decorators.js';
import { pfeEvent } from '@patternfly/pfe-core/functions/pfeEvent.js';

import { hash } from './lib/djb-hash';
import { hsl2rgb, rgb2hsl } from './lib/hslrgb';

import styles from './pfe-avatar.scss';

type Vector2D = [x: number, y: number];
type Colors = Record<`color${number}`, string>;

/** Ensure avatar colours are registered before custom elements upgrade */
function register(klass: typeof PfeAvatar) {
  klass.registerColors();
}

/**
 * Avatar is an element for displaying a user's avatar image.
 * If the user in question has provided a custom avatar, provide it and it will be displayed.
 * If they don't, a nice colored pattern will be generated based on their name.
 * A specific name will always generate the same pattern, so users' avatars will stay static
 * without the need for storing their generated image.
 *
 * @fires {Event} pfe-avatar:connected - When the element connects to the DOM {@deprecated Use `await pfeAvatar.updateComplete` instead}
 *
 * @csspart {HTMLCanvasElement} canvas - The canvas element for when an image is not provided
 * @csspart {HTMLImageElement} img - The image element for when an image URL is provided
 */
@customElement('pfe-avatar') @pfelement() @register
export class PfeAvatar extends LitElement {
  static readonly styles = styles;

  private static readonly defaultSize = 128;

  private static readonly defaultColors = '#67accf #448087 #709c6b #a35252 #826cbb';

  private static _registerColor(color: RGBTriple): void {
    PfeAvatar.colors.push({
      color1: `rgb(${color.join(',')})`,
      color2: `rgb(${this._adjustColor(color).join(',')})`,
    });
  }

  private static _adjustColor(color: RGBTriple): RGBTriple {
    const dark = 0.1;
    const lAdj = 0.1; // luminance adjustment
    const hsl = rgb2hsl(...color);

    // if luminance is too dark already, then lighten the alternate color
    // instead of darkening it.
    hsl[2] += hsl[2] > dark ? -lAdj : lAdj;

    return hsl2rgb(...hsl);
  }

  static colors: Colors[] = [];

  static customColors: string;

  static registerColors() {
    PfeAvatar.colors = [];

    const contextColors = this.customColors || this.defaultColors;

    contextColors.split(/\s+/).forEach(colorCode => {
      let pattern;
      switch (colorCode.length) {
        case 4: // ex: "#0fc"
          pattern = /^#([A-f0-9])([A-f0-9])([A-f0-9])$/.exec(colorCode);
          if (pattern) {
            pattern.shift();
            const color = pattern.map(c => parseInt(c + c, 16)) as RGBTriple;
            PfeAvatar._registerColor(color);
          } else {
            Logger.log(`[pfe-avatar] invalid color ${colorCode}`);
          }

          break;
        case 7: // ex: "#00ffcc"
          pattern = /^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/.exec(colorCode);
          if (pattern) {
            pattern.shift();
            const color = pattern.map(c => parseInt(c, 16)) as RGBTriple;
            PfeAvatar._registerColor(color);
          } else {
            Logger.log(`[pfe-avatar] invalid color ${colorCode}`);
          }
      }
    });

    return this.colors;
  }

  get customColors() {
    return this.css.getVariable('pfe-avatar--colors');
  }

  /**
   * The URL to the user's custom avatar image.
   *
   * It will be displayed instead of a random pattern.
   */
  @observed('_update')
  @property({ reflect: true }) src?: string;

  /**
   * The user's name, either given name and family name, or username.
   *
   * When displaying a pattern, the name will be used to seed the pattern generator.
   */
  @observed('_update')
  @property({ reflect: true }) name = '';

  /**
   * The type of pattern to display.
   */
  @observed('_update')
  @property({ reflect: true }) pattern: 'squares'|'triangles' = 'squares';

  /**
   * The shape of the avatar itself.
   */
  @property({ reflect: true }) shape: 'square'|'circle'|'rounded' = 'square';

  private _squareSize = 0;
  private _triangleSize = 0;
  private _ctx?: CanvasRenderingContext2D;
  private _colorIndex = -1;
  private color1 = '';
  private color2 = '';

  private css = new CssVariableController(this);

  @query('canvas') private _canvas?: HTMLCanvasElement;

  render() {
    return html`
      <canvas part="canvas"></canvas>
      <img src="${ifDefined(this.src)}" alt="" part="img"/>
    `;
  }

  firstUpdated() {
    this._initCanvas();
    this.dispatchEvent(pfeEvent('pfe-avatar:connected'));
  }

  @bound private _initCanvas() {
    if (!this._canvas) {
      throw new Error('canvas unavailable');
    }
    const cssVarWidth = this.css.getVariable('pfe-avatar--width');
    const size = parseInt(cssVarWidth ?? PfeAvatar.defaultSize.toString());
    this._canvas.width = size;
    this._canvas.height = size;

    this._squareSize = this._canvas.width / 8;
    this._triangleSize = this._canvas.width / 4;

    this._ctx = this._canvas.getContext('2d') as CanvasRenderingContext2D;
    this._update();
  }

  protected _update() {
    // if we have a src element, update the img, otherwise update the random pattern
    if (!this.src) {
      const bitPattern = hash(this.name).toString(2);
      const arrPattern = bitPattern.split('').map(n => Number(n)) as Vector2D;
      this._colorIndex = Math.floor(
        (PfeAvatar.colors.length * parseInt(bitPattern, 2)) /
        Math.pow(2, 32)
      );
      this.color1 = PfeAvatar.colors[this._colorIndex].color1;
      this.color2 = PfeAvatar.colors[this._colorIndex].color2;

      this._clear();
      this._drawBackground();
      if (this.pattern === 'squares') {
        this._drawSquarePattern(arrPattern);
      } else if (this.pattern === 'triangles') {
        this._drawTrianglePattern(arrPattern);
      }
    }
  }

  private _clear() {
    if (this._ctx && this._canvas) {
      this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }

  private _drawBackground() {
    if (this._ctx && this._canvas) {
      this._ctx.fillStyle = this.color1;
      this._ctx.fillRect(0, 0, this._canvas.width, this._canvas.height);
    }
  }

  private _drawSquarePattern(pattern: Vector2D) {
    if (this._ctx) {
      this._ctx.fillStyle = this.color2;
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
  private _drawMirroredSquare(x: number, y: number) {
    if (this._ctx) {
      this._drawSquare(x, y);
      this._drawSquare(7 - x, y);
    }
  }

  private _drawSquare(x: number, y: number) {
    if (this._ctx) {
      this._ctx.fillRect(
        this._squareSize * x,
        this._squareSize * y,
        this._squareSize,
        this._squareSize
      );
    }
  }

  private _drawTrianglePattern(pattern: number[]) {
    if (this._ctx) {
      this._ctx.fillStyle = this.color2 ?? '';
      let i = pattern.length;
      while (i--) {
        if (pattern[i]) {
          const x = Math.floor(i / 2) % 2;
          const y = Math.floor(i / 4);
          const alt = i % 4;

          const p1: Vector2D = [x, y];
          const p2: Vector2D = [x, y];
          const p3: Vector2D = [x, y];

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
  private _drawMirroredTriangle(p1: Vector2D, p2: Vector2D, p3: Vector2D) {
    if (this._ctx) {
      this._drawTriangle(p1, p2, p3);
      this._drawTriangle([4 - p1[0], p1[1]], [4 - p2[0], p2[1]], [4 - p3[0], p3[1]]);
    }
  }

  private _drawTriangle(p1: Vector2D, p2: Vector2D, p3: Vector2D) {
    const mult = (c: number) => c * this._triangleSize;
    if (this._ctx) {
      this._ctx.beginPath();
      this._ctx.moveTo(...p1.map(mult) as Vector2D);
      this._ctx.lineTo(...p2.map(mult) as Vector2D);
      this._ctx.lineTo(...p3.map(mult) as Vector2D);
      this._ctx.closePath();
      this._ctx.fill();
      this._ctx.fill();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-avatar': PfeAvatar;
  }
}
