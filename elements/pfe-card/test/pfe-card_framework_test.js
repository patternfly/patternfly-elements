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
    content: "Card header"
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

const overflow = ["top", "right", "bottom", "left"];

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
    css: {
      default: {
        "padding-top": "32px",
        "padding-right": "32px",
        "padding-bottom": "32px",
        "padding-left": "32px"
      },
      custom: {
        "padding-top": "20px",
        "padding-right": "10px",
        "padding-bottom": "20px",
        "padding-left": "10px"
      }
    },
    default:  "32px",
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
    custom: "1px solid rgb(238, 238, 238)"
  },
  backgroundColor: {
    variable: "--pfe-card--BackgroundColor",
    css: "background-color",
    default:  "#dfdfdf",
    custom: "hotpink"
  }
};

suite("<pfe-card>", () => {
  let card, cardSimple, cardImage;

  setup( () => {
    card = document.getElementById("card");
    cardSimple = document.getElementById("simple-card");
    cardImage = document.getElementById("image-card");
  });

  test("it should upgrade", () => {
    assert.instanceOf(
      card,
      customElements.get("pfe-card"),
      "the <pfe-card> should be an instance of PfeCard"
    );
  });

  test("it should add has_body, has_header, has_footer attributes if the slots exist", () => {
    assert.isTrue(card.hasAttribute("has_header"));
    assert.isTrue(card.hasAttribute("has_body"));
    assert.isTrue(card.hasAttribute("has_footer"));
  });
  
  test("it should remove has_body, has_header attributes when the slots don't exist", () => {
    assert.isFalse(cardSimple.hasAttribute("has_header"));
    assert.isTrue(cardSimple.hasAttribute("has_body"));
    assert.isFalse(cardSimple.hasAttribute("has_footer"));
  });

  test("it should render a header and footer when content for those slots are added dynamically", done => {
    const header = document.createElement("h2");
    header.setAttribute("slot", "pfe-card--header");
    header.textContent = "Card header";

    const footer = document.createElement("div");
    footer.setAttribute("slot", "pfe-card--footer");
    footer.textContent = "This is the footer";

    cardSimple.appendChild(header);
    cardSimple.appendChild(footer);

    flush(() => {
      assert.isTrue(cardSimple.hasAttribute("has_header"));
      assert.isTrue(cardSimple.hasAttribute("has_footer"));

      const cardHeaderSlot = cardSimple.shadowRoot.querySelector(`slot[name="pfe-card--header"]`);
      const cardFooterSlot = cardSimple.shadowRoot.querySelector(`slot[name="pfe-card--footer"]`);

      assert.equal(cardHeaderSlot.assignedNodes().length, 1);
      assert.equal(cardFooterSlot.assignedNodes().length, 1);

      done();
    });
  });

  // Iterate over the colors object to test expected background color results
  Object.entries(colors).forEach(set => {
    test(`it should have a background color of ${set[1]} when color is ${set[0]}`, done => {
      // If this is not the default color, update the color attribute
      if(set[0] !== "default") {
        card.setAttribute("color", set[0]);
      }

      flush(() => {
        // Get the background color value
        const [r, g, b] = getColor(card, "background-color");

        // Test that the color is rendering as expected
        assert.deepEqual([r, g, b], hexToRgb(set[1]));

        // Test that the color is working
        if(["dark", "darker", "darkest", "complement", "accent"].includes(set[0])) {
          assert.isBelow(luminance(r, g, b), 0.5);
        }
        else {
          assert.isAbove(luminance(r, g, b), 0.5);
        }

        done();
      });
    });
  });

  test("it should have standard padding when size is not set", () => {
    assert.equal(getComputedStyle(card, null)["padding"], "32px");
  });

  test("it should have reduced padding when size is small", done => {
    card.setAttribute("size", "small");
    
    flush(() => {
      assert.equal(getComputedStyle(card, null)["padding"], "16px");
      done();
    });
  });

  test("it should have a standard border when border is set", done => {
    card.setAttribute("border", "");

    flush(() => {
      assert.deepEqual(getColor(card, "border-left-color"), hexToRgb("#d2d2d2"));
      assert.equal(getComputedStyle(card, null)["border-left-width"], "1px");
      done();
    });
  });

  // Iterate over the slots object to test expected results
  Object.entries(slots).forEach(slot => {
    test(`${slot[0]} content is placed into correct slot`, () => {
      let selector = slot[0] !== "body" ? `[slot=${slot[1].name}]` : "p";
      assert.equal(
        card.querySelector(selector).assignedSlot,
        card.shadowRoot.querySelector(`.${slot[1].class} > *`)
      );

      const content = card.shadowRoot
        .querySelector(`.${slot[1].class} > *`)
        .assignedNodes()
        .map(n => n.textContent)
        .join("")
        .trim();
      assert.equal(content, slot[1].content);
    });
  });

  // Iterate over possibilities for images
  overflow.forEach(direction => {
    test(`image should overflow to the ${direction}`, done => {
      let image = cardImage.querySelector("img");
      image.setAttribute("overflow", direction);
      
      flush(() => {
        assert.equal(getComputedStyle(image, null)[`margin-${direction}`], direction === "bottom" ? "-35px" : "-32px");
        done();
      });
    });
  });

  test("image should overflow all padding", done => {
    let image = cardImage.querySelector("img");
    image.setAttribute("overflow", "top bottom right left");
    
    flush(() => {
      assert.equal(getComputedStyle(image, null)["margin-top"], "-32px");
      assert.equal(getComputedStyle(image, null)["margin-right"], "-32px");
      assert.equal(getComputedStyle(image, null)["margin-bottom"], "-35px");
      assert.equal(getComputedStyle(image, null)["margin-left"], "-32px");
      done();
    });
  });

  // Iterate over the custom properties to test overrides work
  Object.entries(customProperties).forEach(set => {
    let property = set[1];
    test(`Test the default value of ${property.variable}`, done => {
      // Test default value
      flush(() => {
        if (typeof property.css === "String") {
          assert.equal(getComputedStyle(card, null)[property.css], property.default, `${property.css} should equal ${property.default}`);
        } else if (typeof property.css === "Object") {
          Object.keys(property.css).forEach(prop => {
            const val = property.css.default[prop];
            assert.equal(getComputedStyle(card, null)[prop], val, `${prop} should equal ${val}`);
          });
        }
        done();
      });
    });

    test(`Test that ${property.variable} allows user customization`, done => {
      // Update the variable
      card.style.setProperty(property.variable, property.custom);
      
      // Test the update worked
      flush(() => {
        if (typeof property.css === "String") {
          assert.equal(getComputedStyle(card, null)[property.css], property.custom, `${property.css} should equal ${property.custom}`);
        } else if (typeof property.css === "Object") {
          Object.keys(property.css).forEach(prop => {
            const val = property.css.custom[prop];
            assert.equal(getComputedStyle(card, null)[prop], val, `${prop} should equal ${val}`);
          });
        }
        done();
      });
    });
  });
});