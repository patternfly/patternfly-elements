// Returns the luminance value from rgb
export const luminance = (r, g, b) => {
  return (0.2126 * r / 255 + 0.7152 * g / 255 + 0.0722 * b / 255);
}

// Converts a hex value to RGBA
export const hexToRgb = hex => {
  const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/.exec(hex);
  return [
    parseInt(r, 16),
    parseInt(g, 16),
    parseInt(b, 16)
  ];
};

// Gets the rgba value from an element
export const getColor = (el, prop) => {
  const [, r, g, b] = getComputedStyle(el, null)[prop].match(/rgba?\((\d+),\s+(\d+),\s+(\d+).*\)/)
    .map(n => +n);
  return [r, g, b];
};
