export function Color(initial) {
  this.red = 0;
  this.green = 0;
  this.blue = 0;
  this.opacity = 0;

  Object.defineProperty(this, "brightness", {
    get() {
      return (
        1 - (0.299 * this.red + 0.587 * this.green + 0.114 * this.blue) / 255
      );
    }
  });

  this.difference = compare => {
    if (typeof compare === "object") {
      return (
        Math.max(this.red, compare.red) -
        Math.min(this.red, compare.red) +
        (Math.max(this.green, compare.green) -
          Math.min(this.green, compare.green)) +
        (Math.max(this.blue, compare.blue) - Math.min(this.blue, compare.blue))
      );
    }
  };

  this.accessible = compare => {
    return this.brightness > 0.5 && this.difference(compare) < 500;
  };

  this.toObj = string => {
    let rgba;

    if (string && typeof string === "string") {
      // Remove spaces
      rgba = string.replace(/ /g, "");

      // Pull out colors into rgb array
      rgba = string.split(/[(|)]/)[1].split(",");

      // Return an rgb object
      this.red = rgba[0];
      this.green = rgba[1];
      this.blue = rgba[2];
      this.opacity = rgba[3];
    }
  };

  if (typeof initial === "string") {
    this.toObj(initial);
  } else if (typeof initial === "object") {
    this.red = initial.red;
    this.green = initial.green;
    this.blue = initial.blue;
    this.opacity = initial.opacity;
  }
}
