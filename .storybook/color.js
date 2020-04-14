export function Color(initial) {
  let set = {
    red: 0,
    green: 0,
    blue: 0,
    opacity: 0
  };

  if (typeof initial === "string") {
    set = this.toObj(initial);
  } else if (typeof initial === "string") {
    set = initial;
  }

  this.red = set.red;
  this.green = set.green;
  this.blue = set.blue;
  this.opacity = set.opacity;
}

Color.prototype.toObj = string => {
  let rgba;

  if (string && typeof string === "string") {
    // Remove spaces
    rgba = string.replace(/ /g, "");

    // Pull out colors into rgb array
    rgba = string.split(/[(|)]/)[1].split(",");

    // Return an rgb object
    return {
      red: rgba[0],
      green: rgba[1],
      blue: rgba[2],
      opacity: rgba[3]
    };
  } else {
    return {};
  }
};

Object.defineProperty(Color, "brightness", {
  get: () => {
    return (
      1 - (0.299 * this.red + 0.587 * this.green + 0.114 * this.blue) / 255
    );
  }
});

Color.prototype.difference = compare => {
  if (typeof compare === "Color") {
    return (
      Math.max(this.red, compare.red) -
      Math.min(this.red, compare.red) +
      (Math.max(this.green, compare.green) -
        Math.min(this.green, compare.green)) +
      (Math.max(this.blue, compare.blue) - Math.min(this.blue, compare.blue))
    );
  }
};

Color.prototype.accessible = compare => {
  return this.brightness > 0.5 && this.difference(compare) < 500;
};
