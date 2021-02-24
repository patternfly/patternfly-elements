// Themes and their expected hex values
const colors = {
  default: "#f0f0f0",
  darker: "#3c3f42",
  darkest: "#151515",
  accent: "#004080",
  complement: "#002952",
  lightest: "#ffffff"
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

suite("<pfe-band>", () => {
  let band;

  suiteSetup(() => {
    band = [...document.querySelectorAll("pfe-band")];
  });

  // Test that the web component rendered
  test("it should upgrade", () => {
    assert.instanceOf(
      band[0],
      customElements.get("pfe-band"),
      "pfe-band should be an instance of PfeBand"
    );
  });

  // Iterate over the colors object to test expected background color results
  Object.entries(colors).forEach(set => {
    test(`it should have a background color of ${set[1]} when color is ${set[0]}`, () => {
      // If this is not the default background, update the variable
      if(set[0] !== "default") {
        //Update the color attribute
        band[0].setAttribute("color", set[0]);
      }
      // Test that the color is rendering as expected
      assert.deepEqual(getColor(band[0], "background-color"), hexToRgb(set[1]));
    });
  });

  /*

  // Test that the default padding is correct
  test("it should have default padding when no size attribute is set", () => {
    // Test that the color is rendering as expected
    // @TODO need a way to adjust the viewport
    if(window.outerWidth <= 576) {
      assert.equal(getComputedStyle(band[0], null)["padding"], "32px 16px");
    } else {
      assert.equal(getComputedStyle(band[0], null)["padding"], "64px 16px");
    }
  });

  // Test that the padding is reduced if the size is set to small
  test("it should have reduced padding when the size attribute is small", () => {
    //Update the color attribute
    band[0].setAttribute("pfe-size", "small");
    // Test that the color is rendering as expected
    if(window.outerWidth <= 576) {
      assert.equal(getComputedStyle(band[0], null)["padding"], "32px 16px");
    } else {
      assert.equal(getComputedStyle(band[0], null)["padding"], "16px");
    }
  });
  
  */
  
  // Test the default positions of the aside region in the DOM
  test("it should have rendered the markup correctly for the aside defaults", () => {
    // @TODO
    // skipping this test in React since there is a bug with hasSlot
    if (window.React) {
      return;
    }

    const container = band[0].shadowRoot.querySelector(".pfe-band__container");
    const header    = container.children[0];
    const body      = container.children[1];
    const aside     = container.children[2];
    const footer    = container.children[3];

    // Test that the container exists
    assert.isDefined(container, '.pfe-band__container is not `undefined`');

    if(container) {
      // Test that the header is the first item in the container
      assert.equal(header.className, "pfe-band__header");
      // Test that the body is the second item in the container
      assert.equal(body.className, "pfe-band__body");
      // Test that the aside is the third item in the container
      assert.equal(aside.className, "pfe-band__aside");
      // Test that the footer is the last item in the container
      assert.equal(footer.className, "pfe-band__footer");
    }
  });

  // @TODO Write tests for aside layout variations and rendered view
});
