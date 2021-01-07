export function Color(initial) {
  const getsRGB = c => {
    let item = c / 255;
    item = item <= 0.03928 ? item / 12.92 : Math.pow((item + 0.055) / 1.055, 2.4);
    return item;
  };

  this.getRGBA = string => {
    const rgbRegex = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
    let match, check, getColor;

    // Create an element upon which to attach this color
    check = document.createElement("span");
    check.style.setProperty("background-color", string);
    check.style.setProperty("display", "none");
    document.querySelector("body").appendChild(check);

    // Get the color from this new element
    getColor = window.getComputedStyle(check, null).getPropertyValue("background-color");

    if ((match = getColor.match(rgbRegex))) {
      this.red = match[1];
      this.green = match[2];
      this.blue = match[3];
      this.opacity = match[4] || 1;
    }

    return this;
  };

  this.setHSL = () => {
    let r = this.red / 255;
    let g = this.green / 255;
    let b = this.blue / 255;

    let min = Math.min(r, g, b);
    let max = Math.max(r, g, b);
    let diff = max - min;

    this.lightness = (max + min) / 2;

    if (max === min) {
      // Achromatic
      this.hue = 0;
      this.saturation = 0;
    } else {
      this.saturation = this.lightness < 0.5 ? diff / (max + min) : diff / (2 - max - min);

      switch (max) {
        case r:
          this.hue = (g - b) / diff + (g < b ? 6 : 0);
          break;
        case g:
          this.hue = (b - r) / diff + 2;
          break;
        case b:
          this.hue = (r - g) / diff + 4;
          break;
      }

      this.hue = this.hue / 6;
    }
  };

  this.random = (limit = {}) => {
    let lower;
    let upper;
    function checkRange(lower, upper) {
      if (lower > upper) {
        console.warn(
          `Color.random() | ${color}: The lower limit (${lower}) must be a smaller number than the upper limit (${upper}).`
        );
        // Switch the values
        return [upper, lower];
      }

      return [lower, upper];
    }

    limit = Object.assign(
      {
        red: {},
        green: {},
        blue: {},
        opacity: {}
      },
      limit
    );

    ["red", "green", "blue"].forEach(color => {
      lower = limit[color].lower || 1;
      upper = limit[color].upper || 255;
      [lower, upper] = checkRange(lower, upper);
      this[color] = Math.floor(Math.random() * (upper - lower)) + lower;
    });

    lower = limit.opacity.lower || 0;
    upper = limit.opacity.upper || 1;
    [lower, upper] = checkRange(lower, upper);
    this.opacity = Math.round((Math.random() * (upper - lower) + lower) * 100) / 100;

    this.setHSL();
    return this;
  };

  // Initialize color
  if (typeof initial === "string") {
    this.getRGBA(initial);
  } else if (typeof initial === "object") {
    this.red = initial.red || 0;
    this.green = initial.green || 0;
    this.blue = initial.blue || 0;
    this.opacity = initial.opacity || 1;
  }

  this.setHSL();

  Object.defineProperty(this, "brightness", {
    get() {
      return 1 - (0.299 * this.red + 0.587 * this.green + 0.114 * this.blue) / 255;
    }
  });

  Object.defineProperty(this, "luminance", {
    get() {
      return 0.2126 * getsRGB(this.red) + 0.7152 * getsRGB(this.green) + 0.0722 * getsRGB(this.blue);
    }
  });

  Object.defineProperty(this, "rgba", {
    get() {
      return `rgba(${this.red}, ${this.green}, ${this.blue}, ${this.opacity})`;
    }
  });

  Object.defineProperty(this, "rgb", {
    get() {
      return `rgb(${this.red}, ${this.green}, ${this.blue})`;
    }
  });

  Object.defineProperty(this, "hex", {
    get() {
      function convert(num) {
        let hex;
        num = num < 1 ? Math.round(num * 255) : num;
        hex = Number(num).toString(16);
        return hex.length < 2 ? "0" + hex : hex;
      }

      return `#${convert(this.red)}${convert(this.green)}${convert(this.blue)}${convert(this.opacity)}`;
    }
  });

  Object.defineProperty(this, "hsla", {
    get() {
      return `hsla(${Math.floor(this.hue * 360)}, ${Math.floor(this.saturation * 100)}%, ${Math.floor(
        this.lightness * 100
      )}%, ${this.opacity})`;
    }
  });

  this.difference = compare => {
    if (typeof compare === "object") {
      return (
        Math.max(this.red, compare.red) -
        Math.min(this.red, compare.red) +
        (Math.max(this.green, compare.green) - Math.min(this.green, compare.green)) +
        (Math.max(this.blue, compare.blue) - Math.min(this.blue, compare.blue))
      );
    }
  };

  // WIP
  this.a11yRating = type => {
    const results = ["FAIL", "AA", "AAA"];
    let l1, l2, contrast;
    let ret = results[0];

    // Collect typography values
    const styles = window.getComputedStyle(type, null);
    const size = parseInt(styles.getPropertyValue("font-size"));
    const weight = parseInt(styles.getPropertyValue("font-weight"));
    const color = new Color(styles.getPropertyValue("color"));

    l1 = color.luminance;
    l2 = this.luminance;

    contrast = Math.floor(((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)) * 100) / 100;

    // AAA Large means that your large text has a contrast ratio of 4.5 or higher, which is the same score as AA
    // The WCAG describes 14pt bold and 18pt as "large" sizes
    if (size < 24 && (size < 18.5 || weight < 400)) {
      // Requires 4.5:1 contrast ratio
      if (contrast > 4.5) {
        ret = results[1];
      } else if (contrast > 7) {
        ret = results[2];
      }
    } else {
      // Requires 3:1 contrast ratio
      if (contrast > 3) {
        ret = results[1];
      } else if (contrast > 4.5) {
        ret = results[2];
      }
    }

    // @TODO how to include opacity in this?

    return {
      background: this.hex,
      foreground: color.hex,
      ratio: contrast,
      rating: ret
    };
  };
}
