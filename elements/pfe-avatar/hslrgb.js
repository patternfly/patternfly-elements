function h2rgb(v1, v2, vH) {
  if (vH < 0) vH += 1;
  if (vH > 1) vH -= 1;
  if (6 * vH < 1) return v1 + (v2 - v1) * 6 * vH;
  if (2 * vH < 1) return v2;
  if (3 * vH < 2) return v1 + (v2 - v1) * (2 / 3 - vH) * 6;
  return v1;
}

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
export function hsl2rgb(_H, _S, _L) {
  let R, G, B;

  const H = Math.max(0, Math.min(1, _H));
  const S = Math.max(0, Math.min(1, _S));
  const L = Math.max(0, Math.min(1, _L));

  if (S == 0) {
    R = L * 255;
    G = L * 255;
    B = L * 255;
  } else {
    let a, b;

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
export function rgb2hsl(_R, _G, _B) {
  let H, S, L;

  const R = Math.max(0, Math.min(255, _R));
  const G = Math.max(0, Math.min(255, _G));
  const B = Math.max(0, Math.min(255, _B));

  const r = R / 255;
  const g = G / 255;
  const b = B / 255;

  const var_min = Math.min(Math.min(r, g), b);
  const var_max = Math.max(Math.max(r, g), b);
  const del_max = var_max - var_min;

  L = (var_max + var_min) / 2;

  if (del_max === 0) {
    H = 0;
    S = 0;
  } else {
    if (L < 0.5) {
      S = del_max / (var_max + var_min);
    } else {
      S = del_max / (2 - var_max - var_min);
    }

    const del_r = ((var_max - r) / 6 + del_max / 2) / del_max;
    const del_g = ((var_max - g) / 6 + del_max / 2) / del_max;
    const del_b = ((var_max - b) / 6 + del_max / 2) / del_max;

    if (r == var_max) {
      H = del_b - del_g;
    } else if (g == var_max) {
      H = 1 / 3 + del_r - del_b;
    } else if (b == var_max) {
      H = 2 / 3 + del_g - del_r;
    }

    if (H < 0) {
      H += 1;
    } else if (H > 1) {
      H -= 1;
    }
  }

  return [H, S, L];
}
