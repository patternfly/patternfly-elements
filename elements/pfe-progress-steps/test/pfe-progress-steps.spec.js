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
});
