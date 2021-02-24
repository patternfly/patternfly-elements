const statuses = {
  default: "#4f5255",
  moderate: "#f0ab00",
  warning: "#f0ab00",
  important: "#c9190b",
  critical: "#a30000",
  success: "#3e8635",
  info: "#0066cc",
  normal: "#0066cc",
  accent: "#0066cc",
  complement: "#4f5255",
};
// Converts a hex value to RGBA
const hexToRgb = hex => {
  const [, r, g, b] = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})/.exec(hex);
    return [
        parseInt(r, 16),
        parseInt(g, 16),
        parseInt(b, 16)
      ];
};
// Gets the rgba value from an element
const getColor = (el, prop) => {
  const [, r, g, b] = getComputedStyle(el, null)[prop].match(/rgba?\((\d+),\s+(\d+),\s+(\d+).*\)/)
    .map(n => +n);
  return [r, g, b];
};

suite('<pfe-page-status>', () => {
  let banner;

  suiteSetup(() => {
    banner = [...document.querySelectorAll("pfe-page-status")];
  });

  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-page-status'), customElements.get("pfe-page-status", 'pfe-page-status should be an instance of pfePageStatus'));
  });

  // Iterate over the colors object to test expected background color results
  Object.entries(statuses).forEach(set => {
    test(`it should have a background color of ${set[1]} when pfe-status is ${set[0]}`, () => {
      // If this is not the default color, update the variable
      if(set[0] !== "default") {
        //Update the color attribute
        banner[0].setAttribute("status", set[0]);
      }
      // Test that the color is rendering as expected
      assert.deepEqual(getColor(banner[0], "background-color"), hexToRgb(set[1]));
    });
  });
});