type RGBTuple = [R: number, G: number, B: number, A?: number];

/** Converts a hex value to RGBA */
export const hexToRgb = (hex: string): RGBTuple => {
  const [, r, g, b, a] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?/.exec(hex) ?? [];
  const NOTHING = Symbol();
  const values: [number, number, number, number | typeof NOTHING] = [
    parseInt(r, 16),
    parseInt(g, 16),
    parseInt(b, 16),
    (typeof a === 'string' && a.length) ? parseInt(a, 16) : NOTHING,
  ];
  return values.filter(x => x !== NOTHING) as RGBTuple;
};

// Gets the rgba value from an element
export const getColor = (el: Element, prop: string): RGBTuple => {
  const [, r, g, b] = (getComputedStyle(el, null)
      .getPropertyValue(prop)
      .match(/rgba?\((\d+),\s+(\d+),\s+(\d+).*\)/) ?? [])
      .map(n => +n);
  return [r, g, b];
};
