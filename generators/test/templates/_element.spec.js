// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect } from '@open-wc/testing/index-no-side-effects.js';

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from '../../../test/utils/create-fixture.js';

// Import the element we're testing.
import '../dist/<%= elementName %>';

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const testElement =
  `<<%= elementName %>>
   </<%= elementName %>>
   `;

describe("<<%= elementName %>>", () => {

  it("it should upgrade", async () => {
    const el = await createFixture(testElement);

    expect(el).to.be.an.instanceOf(
      customElements.get("<%= elementName %>"),
      '<%= elementName %> should be an instance of <%= className %>'
    );
  });

  // Example test.
  it("should apply attributes correctly", async () => {
    // Use the same markup that's declared at the top of the file.
    const el = await createFixture(testElement);
  });

  // Example test.
  it("should have a slot", async () => {
    // If you need custom markup for this single test, pass it into the
    // fixture wrapper.
    const el = await createFixture(`
      <<%= elementName %>>
        <div>Hello world 👋</div>
      </<%= elementName %>>
    `);
    expect(el).to.exist;
  });
});
