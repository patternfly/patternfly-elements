/* eslint-disable prefer-const */

function h2rgb(v1: number, v2: number, vH: number): number {
  if (vH < 0) {
    vH += 1;
  }
  if (vH > 1) {
    vH -= 1;
  }
  if (6 * vH < 1) {
    return v1 + (v2 - v1) * 6 * vH;
  }
  if (2 * vH < 1) {
    return v2;
  }
  if (3 * vH < 2) {
    return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
  }
  return v1;
}

export type RGBTriple = [R: number, G: number, B: number];
export type HSLTriple = [H: number, S: number, L: number];

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
export function hsl2rgb(_H: number, _S: number, _L: number): RGBTriple {
  let R; let G; let B;

  const H = Math.max(0, Math.min(1, _H));
  const S = Math.max(0, Math.min(1, _S));
  const L = Math.max(0, Math.min(1, _L));

  if (S === 0) {
    R = L * 255;
    G = L * 255;
    B = L * 255;
  } else {
    let a; let b;

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
export function rgb2hsl(_R: number, _G: number, _B: number): HSLTriple {
  let H; let S; let L;

  const R = Math.max(0, Math.min(255, _R));
  const G = Math.max(0, Math.min(255, _G));
  const B = Math.max(0, Math.min(255, _B));

  const r = R / 255;
  const g = G / 255;
  const b = B / 255;

  const varMin = Math.min(Math.min(r, g), b);
  const varMax = Math.max(Math.max(r, g), b);
  const delMax = varMax - varMin;

  L = (varMax + varMin) / 2;

  if (delMax === 0) {
    H = 0;
    S = 0;
  } else {
    if (L < 0.5) {
      S = delMax / (varMax + varMin);
    } else {
      S = delMax / (2 - varMax - varMin);
    }


    const delR = ((varMax - r) / 6 + delMax / 2) / delMax;
    const delG = ((varMax - g) / 6 + delMax / 2) / delMax;
    const delB = ((varMax - b) / 6 + delMax / 2) / delMax;

    if (r === varMax) {
      H = delB - delG;
    } else if (g === varMax) {
      H = 1 / 3 + delR - delB;
    } else if (b === varMax) {
      H = 2 / 3 + delG - delR;
    }

    H ??= 0;

    if (H < 0) {
      H += 1;
    } else if (H > 1) {
      H -= 1;
    }
  }

  return [H, S, L];
}
