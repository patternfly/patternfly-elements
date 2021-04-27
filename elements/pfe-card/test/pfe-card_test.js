// Returns the luminance value from rgb
const luminance = (r, g, b) => {
  return (0.2126*r/255 + 0.7152*g/255 + 0.0722*b/255);
}
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

// Themes and their expected hex values
const colors = {
  default: "#f0f0f0",
  darker: "#3c3f42",
  darkest: "#151515",
  accent: "#004080",
  complement: "#002952",
  lightest: "#ffffff"
};

const slots = {
  header: {
    name: "pfe-card--header",
    class: "pfe-card__header",
    content: "Card 1"
  },
  body: {
    class: "pfe-card__body",
    content: "This is pfe-card."
  },
  footer: {
    name: "pfe-card--footer",
    class: "pfe-card__footer",
    content: "Text in footer"
  }
};

const overflow = {
  top: "",
  right: "",
  bottom: "",
  left: ""
};

const customProperties = {
  paddingTop: {
    variable: "--pfe-card--PaddingTop",
    css: "padding-top",
    default:  "32px",
    custom: "28px"
  },
  paddingRight: {
    variable: "--pfe-card--PaddingRight",
    css: "padding-right",
    default:  "32px",
    custom: "28px"
  },
  paddingBottom: {
    variable: "--pfe-card--PaddingBottom",
    css: "padding-bottom",
    default:  "32px",
    custom: "28px"
  },
  paddingLeft: {
    variable: "--pfe-card--PaddingLeft",
    css: "padding-left",
    default:  "32px",
    custom: "28px"
  },
  padding: {
    variable: "--pfe-card--Padding",
    css: "padding",
    default:  "32px 32px 32px 32px",
    custom: "20px 10px 20px 10px"
  },
  borderRadius: {
    variable: "--pfe-card--BorderRadius",
    css: "border-radius",
    default:  "3px",
    custom: "50%"
  },
  border: {
    variable: "--pfe-card--Border",
    css: "border",
    default:  "0 solid transparent",
    custom: "1px solid #eee"
  },
  backgroundColor: {
    variable: "--pfe-card--BackgroundColor",
    css: "background-color",
    default:  "#dfdfdf",
    custom: "hotpink"
  }
};

suite("<pfe-card>", () => {
  let card;

  suiteSetup(() => {
    card = [...document.querySelectorAll("pfe-card")];
  });

  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-card"),
      customElements.get("pfe-card"),
      "the <pfe-card> should be an instance of PfeCard"
    );
  });

  test("it should add or remove has_body, has_header, has_footer attributes if the slots exist", done => {
    const card = document.querySelector("#card4");
    assert.isTrue(card.hasAttribute("has_header"));
    assert.isTrue(card.hasAttribute("has_body"));
    assert.isTrue(card.hasAttribute("has_footer"));

    card.querySelector("h2").remove();
    card.querySelector("div").remove();

    flush(() => {
      assert.isFalse(card.hasAttribute("has_header"));
      assert.isFalse(card.hasAttribute("has_footer"));
      done();
    })
  });

  test("it should render a header and footer when content for those slots are added dynamically", done => {
    const card = document.querySelector("#dynamicHeaderFooter");
    
    const header = document.createElement("h2");
    header.setAttribute("slot", "pfe-card--header");
    header.textContent = "Card Header";

    const footer = document.createElement("div");
    footer.setAttribute("slot", "pfe-card--footer");
    footer.textContent = "This is the footer";

    card.prepend(header);
    card.appendChild(footer);

    flush(() => {
      const cardHeaderSlot = card.shadowRoot.querySelector(`slot[name="pfe-card--header"]`);
      const cardFooterSlot = card.shadowRoot.querySelector(`slot[name="pfe-card--footer"]`);

      assert.equal(cardHeaderSlot.assignedNodes().length, 1);
      assert.equal(cardFooterSlot.assignedNodes().length, 1);
      done();
    });
  });

  // Iterate over the colors object to test expected background color results
  Object.entries(colors).forEach(set => {
    test(`it should have a background color of ${set[1]} when color is ${set[0]}`, () => {
      // If this is not the default color, update the color attribute
      if(set[0] !== "default") {
        card[0].setAttribute("color", set[0]);
      }
      // Get the background color value
      const [r, g, b] = getColor(card[0], "background-color");
      // Test that the color is rendering as expected
      assert.deepEqual([r, g, b], hexToRgb(set[1]));
      // Test that the color is working
      if(["dark", "darker", "darkest", "complement", "accent"].includes(set[0])) {
        assert.isBelow(luminance(r, g, b), 0.5);
      }
      else {
        assert.isAbove(luminance(r, g, b), 0.5);
      }
    });
  });

  test("it should have standard padding when size is not set", () => {
    assert.equal(getComputedStyle(card[0], null)["padding"], "32px");
  });

  test("it should have reduced padding when size is small", () => {
    card[0].setAttribute("size", "small");
    assert.equal(getComputedStyle(card[0], null)["padding"], "16px");
    card[0].removeAttribute("size");
  });

  test("it should have a standard border when border is set", done => {
    card[0].setAttribute("border", "");

    flush(() => {
      assert.deepEqual(getColor(card[0], "border-left-color"), hexToRgb("#d2d2d2"));
      assert.equal(getComputedStyle(card[0], null)["border-left-width"], "1px");
      done();
    });
  });

  // Iterate over the slots object to test expected results
  Object.entries(slots).forEach(slot => {
    test(`${slot[0]} content is placed into correct slot`, () => {
      let selector = slot[0] !== "body" ? `[slot=${slot[1].name}]` : "p";
      assert.equal(
        card[0].querySelector(selector).assignedSlot,
        card[0].shadowRoot.querySelector(`.${slot[1].class} > *`)
      );

      const content = card[0].shadowRoot
        .querySelector(`.${slot[1].class} > *`)
        .assignedNodes()
        .map(n => n.textContent)
        .join("")
        .trim();
      assert.equal(content, slot[1].content);
    });
  });

  // Iterate over possibilities for images
  Object.entries(overflow).forEach(direction => {
    test(`image should overflow to the ${direction}`, () => {
      let image = card[1].querySelector("img");
      image.setAttribute("overflow", direction);
      setTimeout(function(){
        let margin = direction !== "bottom" ? "-32px" : "-35px";
        assert.equal(getComputedStyle(image, null)[`margin-${direction}`], margin);
      }, 50);
    });
  });

  test("image should overflow all padding", () => {
    let image = card[2].querySelector("img");
    setTimeout(function(){
      assert.equal(getComputedStyle(image, null)["margin-top"], "-16px");
      assert.equal(getComputedStyle(image, null)["margin-right"], "-32px");
      assert.equal(getComputedStyle(image, null)["margin-bottom"], "-35px");
      assert.equal(getComputedStyle(image, null)["margin-left"], "-32px");
    }, 50);
  });

  // Iterate over the custom properties to test overrides work
  Object.entries(customProperties).forEach(set => {
    let property = set[1];
    test(`Test that ${property.variable} allows user customization`, () => {
      // Test default value
      setTimeout(function(){
        assert.equal(getComputedStyle(card[0], null)[property.css], property.default, `${property.css} should equal ${property.default}`);
      }, 50);
      // Update the variable
      card[0].style.setProperty(property.variable, property.custom);
      // Test the update worked
      setTimeout(function(){
        assert.equal(getComputedStyle(card[0], null)[property.css], property.custom, `${property.css} should equal ${property.custom}`);
      }, 50);
    });
  });
});