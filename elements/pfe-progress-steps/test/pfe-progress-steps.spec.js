// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect, assert, elementUpdated } from '@open-wc/testing/index-no-side-effects.js';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/pfe-progress-steps';

const itemTemplate = (title = "", description = "", state = "", current = false) => `
   <pfe-progress-steps-item${state ? ` state="${state}"` : ""}${current ? ` current` : ""}>
   ${title ? `<span slot="title">${title}</span>` : ""}
   ${description ? `<span slot="description">${description}</span>` : ""}
   </pfe-progress-steps-item>`;

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const element =
  `<pfe-progress-steps>
    ${itemTemplate("First", "View first step", "done")}
    ${itemTemplate("Current", "View current step", "active", true)}
    ${itemTemplate("Last", "View last step")}
   </pfe-progress-steps>
   `;

   // @TODO pfe-progress-steps needs more tests written
describe("<pfe-progress-steps>", () => {

    it("it should upgrade", async () => {
      const el = await createFixture(element);

      expect(el).to.be.an.instanceOf(
        customElements.get("pfe-progress-steps"),
        'pfe-progress-steps should be an instance of PfeProgressSteps'
      );
    });

    // Vertical attribute test.
    it("should cascade the vertical attribute to it's children", async () => {
      // Use the same markup that's declared at the top of the file.
      const el = await createFixture(element);
      const items = el.querySelectorAll("pfe-progress-steps-item");
      el.setAttribute("vertical", "");

      // Wait for the element to be done updating.
      await elementUpdated(el);

      items.forEach(item => {
        assert.isTrue(item.hasAttribute("vertical"));
      })
    });

    // Title slot test.
    it("should have a title slot", async () => {
      // If you need custom markup for this single test, pass it into the
      // fixture wrapper.
      const el = await createFixture(element);
      const item = el.querySelector("pfe-progress-steps-item");
      
      const shadowTitle = item.shadowRoot.querySelector("slot[name=title]");
      expect(shadowTitle).to.exist;
      
      const title = item.querySelector("[slot=title]");
      expect(title.textContent).to.equal("First");
    });

    // Description slot test.
    it("should have a description slot", async () => {
      // If you need custom markup for this single test, pass it into the
      // fixture wrapper.
      const el = await createFixture(element);
      const item = el.querySelector("pfe-progress-steps-item");
      
      const shadowDescription = item.shadowRoot.querySelector("slot[name=description]");
      expect(shadowDescription).to.exist;

      const description = item.querySelector("[slot=description]");
      expect(description.textContent).to.equal("View first step");
    });

    describe("<pfe-progress-steps-item>", () => {
      it("should be horizontal by default", async () => {
        const el = await createFixture(element);
        // get an array of the positions of each item
        const items = [...el.querySelectorAll("pfe-progress-steps-item")]
          .map(i => i.offsetTop);
        // see if these positions are stacked on top of one another
        // we use every so we can exit early.
        const isEven = items.every((i, index) => {
          // if there is a next item to work with
          if (typeof items[index + 1] === "undefined") return true;
          // check if the item offsets are equal to see if it's a row
          return items[index + 1] === items[index];
        });
        expect(isEven).to.be.true;
      });

      it("should have a stacked layout on vertical", async () => {
        const el = await createFixture(element);
        el.setAttribute("vertical", "");
        // get an array of the positions of each item
        const items = [...el.querySelectorAll("pfe-progress-steps-item")]
          .map(i => i.offsetTop);
        // see if these positions are stacked on top of one another
        // we use every so we can exit early.
        const isStacked = items.every((i, index) => {
          // if there is a next item to work with
          if (typeof items[index + 1] === "undefined") return true;
          // if the next item offset is greater than the current then it's stacked
          return items[index + 1] >= items[index];
        });
        expect(isStacked).to.be.true;
      });
    })

    describe("progress bar", () => {
      it("should have a length that spans from the middle of the first item to the middle of the last item", async () => {
        const el = await createFixture(element);
        const stepItems = [...el.querySelectorAll("pfe-progress-steps-item")];
        // get the centerpoint of the items
        let firstItemMidpoint = stepItems[0].offsetLeft + stepItems[0].offsetWidth / 2;
        let lastItemMidpoint = stepItems[stepItems.length - 1].offsetLeft + (stepItems[stepItems.length - 2].offsetWidth / 2);
        expect(el.shadowRoot.querySelector(".pfe-progress-steps__progress-bar").offsetWidth).to.equal(lastItemMidpoint - firstItemMidpoint);
      });
    });

});
