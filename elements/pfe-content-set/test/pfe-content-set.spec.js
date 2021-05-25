// Import testing helpers. For more information check out:
// https://open-wc.org/docs/testing/helpers/
import { expect } from "@open-wc/testing/index-no-side-effects.js";

// Import our custom fixture wrapper. This allows us to run tests
// in React and Vue as well as a normal fixture.
import { createFixture } from "../../../test/utils/create-fixture.js";

// Import the element we're testing.
import "../dist/pfe-content-set";

// One element, defined here, is used
// in multiple tests. It's torn down and recreated each time.
const element =
  `<div id="container">
    <pfe-content-set id="default">
      <h2 pfe-content-set--header id="heading1">Heading 1</h2>
      <p pfe-content-set--panel>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
        invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores
        et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
        dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
        aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet.</p>
      <h2 pfe-content-set--header id="heading2">Heading 2</h2>
      <p pfe-content-set--panel>Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore
        magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
        gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
        sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam
        voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
        sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
        eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et
        justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus.</p>
      <h2 pfe-content-set--header id="heading3">Heading 3</h2>
      <p pfe-content-set--panel>At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
        sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
        sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos
        et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum
        dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, At accusam aliquyam diam diam dolore
        dolores duo eirmod eos erat, et nonumy sed tempor et et invidunt justo labore Stet clita ea et gubergren, kasd
        magna no rebum. sanctus sea sed takimata ut vero voluptua. est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
        amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
        erat.</p>
    </pfe-content-set>
  </div>
   `;

describe("<pfe-content-set>", () => {

    it("should upgrade", async () => {
      const el = await createFixture(element);
      const pfeContentSet = el.firstElementChild;

      expect(pfeContentSet).to.be.an.instanceOf(
        customElements.get("pfe-content-set"),
        "pfe-content-set should be an instance of PfeContentSet"
      );
    });

    it("should have the proper attributes for tabs", async () => {
      const el = await createFixture(element);
      const pfeContentSet = el.firstElementChild;
      const pfeTabs = pfeContentSet.view;

      const firstHeader = pfeTabs.querySelector("pfe-tab:nth-child(1)");
      const thirdHeader = pfeTabs.querySelector("pfe-tab:nth-child(5)");
      const panel = pfeTabs.querySelector("pfe-tab-panel");

      expect(firstHeader.hasAttribute("aria-controls")).to.be.true;
      expect(firstHeader.getAttribute("tabindex")).to.equal("0");
      expect(firstHeader.getAttribute("aria-selected")).to.equal("true");

      expect(thirdHeader.hasAttribute("aria-controls")).to.be.true;
      expect(thirdHeader.getAttribute("tabindex")).to.equal("-1");
      expect(thirdHeader.getAttribute("aria-selected")).to.equal("false");

      expect(panel.hasAttribute("aria-labelledby")).to.be.true;
    });

    // it("should be an accordion", async () => {
    //   const el = await createFixture(element);

    //   // Limit the size of the container
    //   el.style.width = "600px";

    //   const pfeContentSet = el.firstElementChild;
    //   const pfeAccordion = pfeContentSet.view;

    //   const firstHeader = pfeAccordion.querySelector("pfe-accordion-header:nth-of-type(1)");
    //   const firstPanel = pfeAccordion.querySelector("pfe-accordion-panel:nth-of-type(2)");
    //   const secondPanel = pfeAccordion.querySelector("pfe-accordion-panel:nth-of-type(2)");
    //   const thirdHeader = pfeAccordion.querySelector("pfe-accordion-header:nth-of-type(3)");

    //   expect(firstHeader.hasAttribute("aria-controls")).to.be.true;
    //   expect(firstPanel.hasAttribute("aria-labelledby")).to.be.true;
    //   expect(secondPanel.hasAttribute("aria-labelledby")).to.be.true;
    //   expect(thirdHeader.hasAttribute("aria-controls")).to.be.true;
    // });
});
