import { expect, elementUpdated } from "@open-wc/testing/index-no-side-effects";
import { spy } from "sinon";
import { createFixture } from "../../../test/utils/create-fixture";
import PfeButton from "../dist/pfe-button.js";

const element = `
  <pfe-button>
    <button>Button</button>
  </pfe-button>
`;

const badElement = `
  <pfe-button>
    <div>Bad button</div>
  </pfe-button>
`;

const attributeElement = `
  <pfe-button>
    <button id="myBtn" disabled type="reset">Button</button>
  </pfe-button>
`;

const denyAttributeElement = `
  <pfe-button>
    <button style="background: red;">Button</button>
  </pfe-button>
`;

const largeSizeElement = `
  <pfe-button size="large">
    <button>Button</button>
  </pfe-button>
`;

describe("<pfe-button>", () => {
  it("should upgrade", async () => {
    const el = await createFixture(element);
    expect(el).to.be.an.instanceOf(customElements.get(PfeButton.tag), "pfe-card should be an instance of PfeButton");
  });

  it("should log a console warning if the light dom inside pfe-button is not a button", async () => {
    const spyConsole = spy(console, 'warn');
    const el = await createFixture(badElement);

    expect(el).to.exist;
    expect(spyConsole.calledWith("[pfe-button]", "The only child in the light DOM must be a button tag")).to.be.true;
    spyConsole.restore();
  });

  it("should copy any attributes from the light dom button to the shadow dom button", async () => {
    const el = await createFixture(attributeElement);
    const shadowBtn = el.shadowRoot.querySelector("button");

    await elementUpdated(el);

    expect(shadowBtn.hasAttribute("disabled")).to.be.true;
    expect(shadowBtn.getAttribute("type")).to.equal("reset");
    expect(shadowBtn.id).to.equal("myBtn");
  });

  /**
   * @todo denyAttributeElement throws errors in React. We should an option to skip running
   *       tests in certain environments.
   */
  // it("should not accept any deny list attributes from the light dom button", async () => {
  //   const el = await createFixture(denyAttributeElement);
  //   const shadowBtn = el.shadowRoot.querySelector("button");
  //   expect(shadowBtn.hasAttribute("style")).to.be.false;
  // });

  it("should add a disabled attribute to the light DOM button if pfe-button has a disabled attribute", async () => {
    const el = await createFixture(element);
    let lightDomBtn = el.querySelector("button");
    el.setAttribute("disabled", "");

    await elementUpdated(el);
    expect(lightDomBtn.hasAttribute("disabled")).to.be.true;

    el.removeAttribute("disabled");

    await elementUpdated(el);
    expect(lightDomBtn.hasAttribute("disabled")).to.be.false;
  });

  it("should update the shadow dom button text if the light dom button text changes", async () => {
    const el = await createFixture(element);
    const lightDomBtn = el.querySelector("button");
    const newText = "New Text";
    let shadowBtn = el.shadowRoot.querySelector("button");

    expect(lightDomBtn.textContent).to.equal(shadowBtn.textContent);

    lightDomBtn.textContent = newText;

    await elementUpdated(el);
    shadowBtn = el.shadowRoot.querySelector("button");
    expect(shadowBtn.textContent).to.equal(newText);
  });

  it("should send a pfe-button:click event on click", async () => {
    const el = await createFixture(element);
    const handlerSpy = spy();

    document.addEventListener('pfe-button:click', handlerSpy);
    el.click();

    expect(handlerSpy.calledOnce).to.be.true;
    document.removeEventListener("pfe-button:click", handlerSpy);
  });

  describe("with size=large attribute", () => {
    it("should have large size styles", async () => {
      const el = await createFixture(largeSizeElement);
      const shadowBtn = el.shadowRoot.querySelector("button");
      expect(getComputedStyle(shadowBtn).getPropertyValue('padding')).to.equal('12px 24px');
      expect(getComputedStyle(shadowBtn).getPropertyValue('font-weight')).to.equal('600');
    });
  });
});
