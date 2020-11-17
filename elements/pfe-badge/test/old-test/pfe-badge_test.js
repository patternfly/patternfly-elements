// Background colors for the various states
const states = {
  default: "#ececec",
  info: "#0277bd",
  success: "#2e7d32",
  important: "#d73401",
  moderate: "#ffc024",
  critical: "#bb0000",
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

suite('<pfe-badge>', () => {
  test("it should set or reset textContent equivalent to the number attribute", () => {
    const pfeBadge = document.createElement("pfe-badge");
    pfeBadge.setAttribute("number", 100);
    pfeBadge.nodeValue = "10";
    document.body.appendChild(pfeBadge);
    assert.equal(pfeBadge.textContent, 100);
  });

  test("it should add '+' sign if value exceeds the threshold", () => {
    const pfeBadge = document.createElement("pfe-badge");
    pfeBadge.setAttribute("number", 900);
    pfeBadge.setAttribute("pfe-threshold", 100);
    pfeBadge.nodeValue = "900";
    document.body.appendChild(pfeBadge);
    assert.equal(pfeBadge.textContent, "100+");
  });

  test("it shouldn't add a '+' sign if the value doesn't exceed the threshold", () => {
    const pfeBadge = document.createElement("pfe-badge");
    pfeBadge.setAttribute("number", 900);
    pfeBadge.setAttribute("pfe-threshold", 1000);
    pfeBadge.nodeValue = "900";
    document.body.appendChild(pfeBadge);

    assert.equal(pfeBadge.textContent, "900");
  });

  // Iterate over the states object to test expected background color results
  Object.entries(states).forEach(set => {
    test(`it should have a background color of ${set[1]} when pfe-state is ${set[0]}`, done => {
      const pfeBadge = document.querySelector('pfe-badge');

      if (set[0] !== "default") {
        pfeBadge.setAttribute("pfe-state", set[0]);
      }

      flush(() => {
        const [r, g, b] = getColor(pfeBadge, "background-color");
        assert.deepEqual([r, g, b], hexToRgb(set[1]));
      });
      done();
    });
  });
});