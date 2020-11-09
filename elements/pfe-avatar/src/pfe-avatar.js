import PFElement from "../../pfelement/dist/pfelement.js";
import { hash } from "./djb-hash.js";
import { hsl2rgb, rgb2hsl } from "./hslrgb.js";

class PfeAvatar extends PFElement {
  static get tag() {
    return "pfe-avatar";
  }

  static get properties() {
    return {
      name: {
        title: "Username",
        type: String,
        default: "",
        observer: "_updateWhenConnected"
      },
      src: {
        title: "Avatar image URL",
        type: String,
        observer: "_updateWhenConnected"
      },
      pattern: {
        title: "Shape pattern",
        type: String,
        default: PfeAvatar.patterns.squares,
        observer: "_updateWhenConnected"
      },
      // @TODO Deprecated pfe-name in 1.0
      oldName: {
        alias: "name",
        attr: "pfe-name"
      },
      // @TODO Deprecated pfe-src in 1.0
      oldSrc: {
        alias: "src",
        attr: "pfe-src"
      },
      // @TODO Deprecated pfe-pattern in 1.0
      oldPattern: {
        alias: "pattern",
        attr: "pfe-pattern"
      }
    };
  }

  get templateUrl() {
    return "pfe-avatar.html";
  }

  get styleUrl() {
    return "pfe-avatar.scss";
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

  get customColors() {
    return this.cssVariable("pfe-avatar--colors");
  }

  constructor() {
    super(PfeAvatar);

    this._initCanvas = this._initCanvas.bind(this);
  }

  connectedCallback() {
    // initCanvas comes before parent's connectedCallback because the
    // connectedCallback sets attribute values, triggering, the observer
    // functions, which require the canvas to already be initialized.
    this._initCanvas();

    super.connectedCallback();

    this.emitEvent(PfeAvatar.events.connected, {
      bubbles: false
    });
  }

  _initCanvas() {
    this._canvas = this.shadowRoot.querySelector("canvas");
    const cssVarWidth = this.cssVariable("pfe-avatar--width");
    const size = (cssVarWidth && cssVarWidth.replace(/px$/, "")) || PfeAvatar.defaultSize;
    this._canvas.width = size;
    this._canvas.height = size;

    this._squareSize = this._canvas.width / 8;
    this._triangleSize = this._canvas.width / 4;

    this._ctx = this._canvas.getContext("2d");
  }

  static _registerColors() {
    this.colors = [];
    const contextColors = this.customColors || this.defaultColors;

    contextColors.split(/\s+/).forEach(colorCode => {
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
          pattern = /^#([A-f0-9]{2})([A-f0-9]{2})([A-f0-9]{2})$/.exec(colorCode);
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

  _updateWhenConnected() {
    if (this.hasAttribute("pfelement")) {
      this.update();
    } else {
      this.addEventListener(PfeAvatar.events.connected, () => this.update());
    }
  }

  update() {
    // if we have a src element, update the img, otherwise update the random pattern
    if (this.src) {
      this.shadowRoot.querySelector("img").src = this.src;
    } else {
      const bitPattern = hash(this.name).toString(2);
      const arrPattern = bitPattern.split("").map(n => Number(n));
      this._colorIndex = Math.floor((PfeAvatar.colors.length * parseInt(bitPattern, 2)) / Math.pow(2, 32));
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
    this._ctx.fillRect(this._squareSize * x, this._squareSize * y, this._squareSize, this._squareSize);
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
      this._drawTriangle([4 - p1[0], p1[1]], [4 - p2[0], p2[1]], [4 - p3[0], p3[1]]);
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
    const gradient = this._ctx.createLinearGradient(0, this._canvas.height, this._canvas.width, 0);
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
