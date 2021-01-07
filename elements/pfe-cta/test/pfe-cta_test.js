// Priority states and one of the properties they influence for testing
// property should be the one that gets the main color pop
// const priorities = {
//   default: "color",
//   primary: "background-color",
//   secondary: "color"
// };

// Colors and their expected hex values
// const color_bgs = {
//   default: "#0477a4",
//   complement: "#464646",
//   accent: "#ee0000"
// };

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

suite("<pfe-cta>", () => {
  test("should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-cta"),
      customElements.get("pfe-cta"),
      "the <pfe-cta> should be an instance of PfeCta"
    );
  });

  test("it should log a warning if there are no children in the light DOM", done => {
    const spy = sinon.spy(console, "warn");
    const pfeCta = document.createElement("pfe-cta");
    pfeCta.textContent = "This is wrong";

    document.body.appendChild(pfeCta);

    flush(() => {
      sinon.assert.calledWith(spy, "[pfe-cta]: The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)");
      spy.restore();
      done();
    });
  });

  test("it should log a warning if the first child in the light DOM is not an anchor", done => {
    const spy = sinon.spy(console, "warn");
    const pfeCta = document.createElement("pfe-cta");
    pfeCta.innerHTML = `<p>Something</p><a href="#">A link</a>`;

    document.body.appendChild(pfeCta);

    flush(() => {
      sinon.assert.calledWith(spy, "[pfe-cta]: The first child in the light DOM must be a supported call-to-action tag (<a>, <button>)");
      spy.restore();
      done();
    });
  });

  // @TODO: reinstate after pfe-cta is converted to new format
  // test("it should log a warning if the first child in the light DOM is a default style button", done => {
  //   const spy = sinon.spy(console, "warn");
  //   const pfeCta = document.createElement("pfe-cta");
  //   pfeCta.innerHTML = `<button>A button</button>`;

  //   document.body.appendChild(pfeCta);

  //   flush(() => {
  //     sinon.assert.calledWith(spy, "[pfe-cta]: Button tag is not supported semantically by the default link styles");
  //     spy.restore();
  //     done();
  //   });
  // });

  test("it should properly initialize when the contents of the slot change", done => {
    const pfeCta = document.querySelector("pfe-cta");
    assert.equal(pfeCta.data.href, "https://redhat.com/");

    pfeCta.innerHTML = `<a href="https://access.redhat.com">Customer Portal</a>`;

    flush(() => {
      assert.equal(pfeCta.data.href, "https://access.redhat.com/");
      done();
    });
  });

  test("it should register an event when clicked", done => {
    const pfeCta = document.querySelector("pfe-cta");
    const spy = sinon.spy(pfeCta, "click");
    const event = new Event("click");

    pfeCta.dispatchEvent(event);

    flush(() => {
      setTimeout(function () {
        expect(spy.callCount).to.equal(1);
      }, 2000);
      spy.restore();
      done();
    });
  });

  test("it should register an event when enter key is pressed", done => {
    const pfeCta = document.querySelector("pfe-cta");
    const spy = sinon.spy(pfeCta, "click");
    const event = new KeyboardEvent("keyup", {
      key: "Enter"
    });

    pfeCta.dispatchEvent(event);

    flush(() => {
      setTimeout(function () {
        expect(spy.callCount).to.equal(1);
      }, 2000);
      spy.restore();
      done();
    });
  });

  test("it should register an event when the click function is run", done => {
    const pfeCta = document.querySelector("pfe-cta");
    const spy = sinon.spy(pfeCta, "click");

    pfeCta.click();

    flush(() => {
      setTimeout(function () {
        expect(spy.callCount).to.equal(1);
      }, 2000);
      spy.restore();
      done();
    });
  });
});