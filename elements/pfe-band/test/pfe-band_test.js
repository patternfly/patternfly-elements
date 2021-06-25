// Themes and their expected hex values
const colors = {
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
  const computedStyle = getComputedStyle(el, null).getPropertyValue(prop);
  if (computedStyle === null) return;

  const [, r, g, b] = computedStyle.match(/rgba?\((\d+),\s+(\d+),\s+(\d+).*\)/)
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
    test(`it should have a background color of ${set[1]} when color is ${set[0]}`, done => {
      //Update the color attribute
      band[0].setAttribute("color", set[0]);
      flush(() => {
        assert.deepEqual(getColor(band[0], "background-color"), hexToRgb(set[1]));
        done();
      });
    });
  });

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
  test("it should have reduced padding when the size attribute is small", done => {
    //Update the color attribute
    band[0].setAttribute("size", "small");

    flush(() => {
      // Test that the color is rendering as expected
      // if(window.outerWidth <= 576) {
      //   assert.equal(getComputedStyle(band[0], null)["padding"], "32px 16px");
      // } else {
        assert.equal(getComputedStyle(band[0], null)["padding"], "16px");
      // }
      done();
    });
  });

  // Test that the padding is reduced if the size is set to small
  test("it should have no padding when the size attribute is none", done => {
    //Update the color attribute
    band[0].setAttribute("size", "none");

    flush(() => {
      // Test that the color is rendering as expected
      if(window.outerWidth <= 576) {
        assert.equal(getComputedStyle(band[0], null)["padding"], "0px 16px");
      } else {
        assert.equal(getComputedStyle(band[0], null)["padding"], "0");
      }
      done();
    });
  });
  
  // Test the default positions of the aside region in the DOM
  test("it should have rendered the markup correctly for the aside defaults", () => {
    // @TODO
    // skipping this test in React since there is a bug with body.className (returning pfe-band__header)
    if (window.React) return;

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
