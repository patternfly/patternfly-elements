import PfeIcon from "../../dist/pfe-icon.js";

let icon;
let svg;
let image;
let filter;
let feFlood;
let fallback;

suite('<pfe-icon>', () => {
  setup(() => {
    document.querySelector("#icon-container").innerHTML = "<pfe-icon></pfe-icon>";
    icon = document.body.querySelector('pfe-icon');
    fallback = icon.shadowRoot.querySelector(".pfe-icon--fallback");
    svg = icon.shadowRoot.querySelector("svg");
    image = svg.querySelector("image");
    filter = svg.querySelector("filter");
    feFlood = filter.querySelector("feFlood");
  });

  // test('it should error when adding the same icon set name twice', () => {
  //   // add an icon set named test
  //   PfeIcon.addIconSet('test');

  //   // adding the same icon set name again should throw
  //   assert.throws(() => PfeIcon.addIconSet('test'), "already exists");
  // });

  test('it should warn if the 3rd input to addIconSet is not a function', done => {
    const spy = sinon.spy(console, "warn");

    // 3rd input is a string
    PfeIcon.addIconSet('test', './', 'rh-icon-aed.svg');

    flush(() => {
      sinon.assert.calledWith(spy, "[pfe-icon]: The third input to addIconSet should be a function that parses and returns the icon's filename.");
        spy.restore();
        done();
      });
  });

  test('it should warn if there is no function provided to resolve the icon names', done => {
    const spy = sinon.spy(console, "warn");

    // No 3rd input
    PfeIcon.addIconSet('test', './');

    flush(() => {
      sinon.assert.calledWith(spy, "[pfe-icon]: The set test needs a resolve function for the icon names.");
        spy.restore();
        done();
      });
  });

  test('it should change icon when icon name is changed', done => {
    const image = icon.shadowRoot.querySelector("svg image");
    const testIcons = ["rh-aed", "rh-api", "rh-atom", "rh-bike"]

    // replace the default built-in icon set resolveIconName function
    // with one that loads local icons.  we don't want tests dependent on
    // prod servers.
    PfeIcon._iconSets.rh._resolveIconName = function (name, iconSetName, iconSetPath) {
      return `./${name.replace("rh", "rh-icon")}.svg`;
    };

    // a promise that triggers when a new image is loaded
    // note that the event listener is never removed, but that's okay
    // because the leftover event listeners are noops; they'll resolve an
    // already-resolved promise.
    function waitForLoad() {
      return new Promise(resolve => {
        image.addEventListener("load", resolve);
      });
    }

    async function test() {
      // wait for each test icon to be loaded, then move to the next one
      for (let iconName of testIcons) {
        icon.setAttribute("icon", iconName);
        await waitForLoad();
      }
      done();
    }

    test();
  });

  test('it should change color when pfe-icon\'s color CSS var is changed', () => {
    // we can't get the exact color of the image, but we can make sure
    // the feFlood element is getting `flood-color` from the appropriate
    // CSS variable.
    const newColor = "rgb(11, 12, 13)";

    icon.style.setProperty("--pfe-icon--Color", newColor);

    const { floodColor } = getComputedStyle(feFlood);

    assert.equal(floodColor, newColor);

    icon.style.removeProperty("--pfe-broadcasted--text");
  });

  test('it should change color when the broadcast CSS var is changed', () => {
    // we can't get the exact color of the image, but we can make sure
    // the feFlood element is getting `flood-color` from the appropriate
    // CSS variable.
    const newColor = "rgb(10, 11, 12)";

    icon.style.setProperty("--pfe-broadcasted--text", newColor);

    const { floodColor } = getComputedStyle(feFlood);

    assert.equal(floodColor, newColor);

    icon.style.removeProperty("--pfe-broadcasted--text");
  });

  test('it should change size based on the relative size attribute values', done => {
    // a function that accepts "size" values and makes sure they're
    // arranged in order from smallest to largest.
    function sizeCheck(sizes) {
      let lastSize = { width: 0, height: 0 };
      sizes.forEach(size => {
        icon.setAttribute("size", size);

        flush(() => {
          const { width, height } = icon.getBoundingClientRect();
          assert.isAbove(width, lastSize.width, `size "${size}" should be wider than the size below`);
          assert.isAbove(height, lastSize.height, `size "${size}" should be taller than the size below`);
          lastSize = { width, height };
          done();
        });
      });
    }

    // test all the valid values for "size"
    sizeCheck(["2x", "3x", "4x"]);
    sizeCheck(["sm", "md", "lg", "xl"]);
  });

  test('it should hide the fallback when it successfully upgrades', done => {
    icon.innerHTML = `<p>Icon failed to load.</p>`;
    // Get the styles for the fallback element
    const fallbackStyle = getComputedStyle(fallback);
    // Check that the fallback is hidden when the icon is successfully loaded
    assert.equal(fallbackStyle.display, "none", "Fallback text should be hidden when the icon loads successfully");
    done();
  });

  test('it should fetch an icon even when the icon set is registered after the element upgrades', done => {
    const image = icon.shadowRoot.querySelector("svg image");
    // set up an event handler to catch when the icon request is made
    // and use onerror because the icon set isn't real, but it will catch the request being made
    image.addEventListener("load", () => done());

    icon.setAttribute("icon", "asdfasdf-foo");

    PfeIcon.addIconSet('asdfasdf', '', () => './rh-icon-bike.svg');
  });

  //-- Tests with fallback provided
  test('it should hide <image> when given a valid icon set but invalid icon name, fallback provided', done => {
    const badIconName = "rh-badiconname";
    // Add fallback text
    icon.innerHTML = "<p>Image failed to load.</p>.";
    image.addEventListener("error", () => {
      // make sure the image is hidden
      const imageStyle = getComputedStyle(image);
      assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
      assert.equal(icon.classList.contains("has-fallback"), true, "icon should have class has-fallback");
      assert.equal(imageStyle.display, "none", "<image> should have display:none when icon load fails");
      // restore the old icon load error
      done();
    });
    icon.setAttribute("icon", badIconName);
  });

  test('<svg> should retain whitespace when icon fails to load, no fallback provided', done => {
    const badIconName = "rh-badiconname";
    // Clear fallback text
    icon.innerHTML = "";
    image.addEventListener("error", () => {
      // make sure the image is hidden
      const svgStyle = getComputedStyle(svg);
      assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
      assert.equal(icon.classList.contains("has-fallback"), false, "icon should NOT have class has-fallback");
      assert.notEqual(svgStyle.display, "none", "<svg> should not have display:none when icon load fails");
      // restore the old icon load error
      done();
    });
    icon.setAttribute("icon", badIconName);
  });

  test('it should hide <image> when given an invalid icon set, fallback provided', done => {
    const badIconName = "sdfsdfsdf-asdfasdfsdf";
    // Add fallback text
    icon.innerHTML = "<p>Image failed to load.</p>.";
    image.addEventListener("error", () => {
      // make sure the image is hidden
      const imageStyle = getComputedStyle(image);
      assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
      assert.equal(icon.classList.contains("has-fallback"), true, "icon should have class has-fallback");
      assert.equal(imageStyle.display, "none", "<image> should have display:none when icon load fails");
      // restore the old icon load error
      done();
    });
    icon.setAttribute("icon", badIconName);
  });

  //-- Tests with no fallback provided
  test('it should hide <image> when given a valid icon set but invalid icon name, no fallback provided', done => {
    const badIconName = "rh-badiconname";
    // Clear out fallback text
    icon.innerHTML = "";
    image.addEventListener("error", () => {
      // make sure the image is hidden
      const imageStyle = getComputedStyle(image);
      assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
      assert.equal(icon.classList.contains("has-fallback"), false, "icon should NOT have class has-fallback");
      assert.equal(imageStyle.display, "none", "<image> should have display:none when icon load fails");
      // restore the old icon load error
      done();
    });
    icon.setAttribute("icon", badIconName);
  });

  test('<svg> should retain whitespace when icon fails to load, no fallback provided', done => {
    const badIconName = "rh-badiconname";
    // Clear out fallback text
    icon.innerHTML = "";
    image.addEventListener("error", () => {
      // make sure the image is hidden
      const svgStyle = getComputedStyle(svg);
      assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
      assert.equal(icon.classList.contains("has-fallback"), false, "icon should NOT have class has-fallback");
      assert.notEqual(svgStyle.display, "none", "<svg> should not have display:none when icon load fails");
      // restore the old icon load error
      done();
    });
    icon.setAttribute("icon", badIconName);
  });

  test('it should hide <image> when given an invalid icon set, no fallback provided', done => {
    const badIconName = "sdfsdfsdf-asdfasdfsdf";
    // Clear out fallback text
    icon.innerHTML = "";
    image.addEventListener("error", () => {
      // make sure the image is hidden
      const imageStyle = getComputedStyle(image);
      assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
      assert.equal(icon.classList.contains("has-fallback"), false, "icon should NOT have class has-fallback");
      assert.equal(imageStyle.display, "none", "<image> should have display:none when icon load fails");
      // restore the old icon load error
      done();
    });
    icon.setAttribute("icon", badIconName);
  });

  //-- Test on-fail="collapse"
  test('when [on-fail="collapse"] is set on pfe-icon, the <svg> should be hidden on failure', done => {
      const badIconName = "sdfsdfsdf-asdfasdfsdf";
      // Clear out fallback text
      icon.innerHTML = "";
      // Set on-fail attribute
      icon.setAttribute("on-fail", "collapse");
      image.addEventListener("error", () => {
        // make sure the image is hidden
        const svgStyle = getComputedStyle(svg);
        assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
        assert.equal(icon.classList.contains("has-fallback"), false, "icon should NOT have class has-fallback");
        assert.equal(svgStyle.display, "none", "<svg> should have display:none");
        // restore the old icon load error
        done();
      });
      icon.setAttribute("icon", badIconName);
    });

  test('when [on-fail="collapse"] is NOT set on pfe-icon, the <svg> should retain its height on failure', done => {
      const badIconName = "sdfsdfsdf-asdfasdfsdf";
      icon.removeAttribute("on-fail");
      // Clear out fallback text
      icon.innerHTML = "";
      image.addEventListener("error", () => {
        // make sure the svg retains it's height
        const svgStyle = getComputedStyle(svg);
        assert.equal(icon.classList.contains("load-failed"), true, "icon should have class load-failed");
        assert.equal(icon.classList.contains("has-fallback"), false, "icon should NOT have class has-fallback");
        assert.notEqual(svgStyle.height, 0, "<svg> should have height when icon load fails and collapse is not set");
        // restore the old icon load error
        done();
      });
      icon.setAttribute("icon", badIconName);
    });
});