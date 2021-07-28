// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import {
  expect, assert, elementUpdated
} from '@open-wc/testing/index-no-side-effects.js';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import {
  createFixture
} from '../../../test/utils/create-fixture.js';

// Color parsing utilities
import {
  luminance,
  hexToRgb,
  getColor
} from '../../../test/utils/color-parsing.js';

// Import the element we're testing.
import '../dist/pfe-card';

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
    default: "32px",
    custom: "28px"
  },
  paddingRight: {
    variable: "--pfe-card--PaddingRight",
    css: "padding-right",
    default: "32px",
    custom: "28px"
  },
  paddingBottom: {
    variable: "--pfe-card--PaddingBottom",
    css: "padding-bottom",
    default: "32px",
    custom: "28px"
  },
  paddingLeft: {
    variable: "--pfe-card--PaddingLeft",
    css: "padding-left",
    default: "32px",
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
    default: "32px",
    custom: "20px 10px 20px 10px"
  },
  borderRadius: {
    variable: "--pfe-card--BorderRadius",
    css: "border-radius",
    default: "3px",
    custom: "50%"
  },
  border: {
    variable: "--pfe-card--Border",
    css: "border",
    default: "0 solid transparent",
    custom: "1px solid rgb(238, 238, 238)"
  },
  backgroundColor: {
    variable: "--pfe-card--BackgroundColor",
    css: "background-color",
    default: "#dfdfdf",
    custom: "hotpink"
  }
};

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const card =
  `<pfe-card>
    <h3 slot="pfe-card--header">Card header</h3>
    <p>This is pfe-card.</p>
    <div slot="pfe-card--footer">
      <p>Text in footer</p>
    </div>
   </pfe-card>
   `;

const simpleCard =
  `<pfe-card>
      <p>This is pfe-card.</p>
    </pfe-card>`;

const imageCard =
  `<pfe-card>
      <img src="https://placekitten.com/200/150" />
    </pfe-card>`;

describe("<pfe-card>", () => {

  it("should upgrade", async () => {
    const el = await createFixture(card);

    expect(el).to.be.an.instanceOf(
      customElements.get("pfe-card"),
      'pfe-card should be an instance of PfeCard'
    );
  });

  // @TODO Update pfe-card test suite to use consistent testing language
  it("should add has_default, has_header, has_footer attributes if the slots exist", async () => {
    const el = await createFixture(card);
    assert.isTrue(el.hasAttribute("has_header"));
    assert.isTrue(el.hasAttribute("has_default"));
    assert.isTrue(el.hasAttribute("has_footer"));
  });
  
  it("should remove has_default, has_header attributes when the slots don't exist", async () => {
    const el = await createFixture(simpleCard);
    assert.isFalse(el.hasAttribute("has_header"));
    assert.isTrue(el.hasAttribute("has_default"));
    assert.isFalse(el.hasAttribute("has_footer"));
  });



  it("should render a header and footer when content for those slots are added dynamically", async () => {
    const el = await createFixture(simpleCard);

    const header = document.createElement("h2");
    header.setAttribute("slot", "pfe-card--header");
    header.textContent = "Card header";

    const footer = document.createElement("div");
    footer.setAttribute("slot", "pfe-card--footer");
    footer.textContent = "This is the footer";

    el.appendChild(header);
    el.appendChild(footer);

    await elementUpdated(el);

    assert.isTrue(el.hasAttribute("has_header"));
    assert.isTrue(el.hasAttribute("has_footer"));

    const cardHeaderSlot = el.shadowRoot.querySelector(`slot[name="pfe-card--header"]`);
    const cardFooterSlot = el.shadowRoot.querySelector(`slot[name="pfe-card--footer"]`);

    assert.equal(cardHeaderSlot.assignedNodes().length, 1);
    assert.equal(cardFooterSlot.assignedNodes().length, 1);
  });

  // Iterate over the colors object to test expected background color results
  Object.entries(colors).forEach(set => {
    it(`should have a background color of ${set[1]} when color is ${set[0]}`, async () => {
      const el = await createFixture(card);

      // If this is not the default color, update the color attribute
      if(set[0] !== "default") {
        el.setAttribute("color", set[0]);
      }

      await elementUpdated(el);

      // Get the background color value
      const [r, g, b] = getColor(el, "background-color");

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

  it("should have standard padding when size is not set", async () => {
    const el = await createFixture(card);
    assert.equal(getComputedStyle(el, null)["padding"], "32px");
  });

  it("should have reduced padding when size is small", async () => {
    const el = await createFixture(card);
    el.setAttribute("size", "small");
    
    await elementUpdated(el);
    assert.equal(getComputedStyle(el, null)["padding"], "16px");
  });

  it("should have a standard border when border is set", async () => {
    const el = await createFixture(card);
    el.setAttribute("border", "");

    await elementUpdated(el);
    assert.deepEqual(getColor(el, "border-left-color"), hexToRgb("#d2d2d2"));
    assert.equal(getComputedStyle(el, null)["border-left-width"], "1px");
  });

  // Iterate over the slots object to test expected results
  Object.entries(slots).forEach(slot => {
    it(`${slot[0]} content is placed into correct slot`, async () => {
      const el = await createFixture(card);

      let selector = slot[0] !== "body" ? `[slot=${slot[1].name}]` : "p";
      assert.equal(
        el.querySelector(selector).assignedSlot,
        el.shadowRoot.querySelector(`.${slot[1].class} > *`)
      );

      const content = el.shadowRoot
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
    it(`image should overflow to the ${direction}`, async () => {
      const el = await createFixture(imageCard);
      let image = el.querySelector("img");
      image.setAttribute("overflow", direction);
      
      await elementUpdated(el);

      assert.equal(getComputedStyle(image, null)[`margin-${direction}`], direction === "bottom" ? "-35px" : "-32px");
    });
  });

  it("image should overflow all padding", async () => {
    const el = await createFixture(imageCard);
    let image = el.querySelector("img");
    image.setAttribute("overflow", "top bottom right left");

    await elementUpdated(el);

    assert.equal(getComputedStyle(image, null)["margin-top"], "-32px");
    assert.equal(getComputedStyle(image, null)["margin-right"], "-32px");
    assert.equal(getComputedStyle(image, null)["margin-bottom"], "-35px");
    assert.equal(getComputedStyle(image, null)["margin-left"], "-32px");
  });

  // Iterate over the custom properties to test overrides work
  Object.entries(customProperties).forEach(set => {
    let property = set[1];
    it(`should have a default value for ${property.variable}`, async () => {
      const el = await createFixture(card);

      if (typeof property.css === "String") {
        assert.equal(getComputedStyle(el, null)[property.css], property.default, `${property.css} should equal ${property.default}`);
      } else if (typeof property.css === "Object") {
        Object.keys(property.css).forEach(prop => {
          const val = property.css.default[prop];
          assert.equal(getComputedStyle(el, null)[prop], val, `${prop} should equal ${val}`);
        });
      }
    });

    it(`should allow ${property.variable} to be customized by a user`, async () => {
      const el = await createFixture(card);
      
      // Update the variable
      el.style.setProperty(property.variable, property.custom);
      
      // Test the update worked
      await elementUpdated(el);

      if (typeof property.css === "String") {
        assert.equal(getComputedStyle(el, null)[property.css], property.custom, `${property.css} should equal ${property.custom}`);
      } else if (typeof property.css === "Object") {
        Object.keys(property.css).forEach(prop => {
          const val = property.css.custom[prop];
          assert.equal(getComputedStyle(el, null)[prop], val, `${prop} should equal ${val}`);
        });
      }
    });
  });
});
