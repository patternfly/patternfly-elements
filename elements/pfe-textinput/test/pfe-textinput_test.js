import { pressEnter } from '/components/@polymer/iron-test-helpers/mock-interactions.js';

suite("<pfe-textinput>", () => {
  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-textinput"),
      customElements.get("pfe-textinput"),
      "pfe-textinput should be an instance of pfeTextinput"
    );
  });

  test("it should add a warning in the console if the pfe-textinput isn't provided any light DOM", () => {
    const spy = sinon.spy(console, 'warn');
    const pfeTextinput = document.createElement("pfe-textinput");

    document.body.appendChild(pfeTextinput);
    sinon.assert.calledWith(spy, 'pfe-textinput: You must have a text input in the light DOM');
    spy.restore();
  });

  test("it should add a warning in the console if there isn't an input in the light DOM", () => {
    const spy = sinon.spy(console, 'warn');
    const pfeTextinput = document.createElement("pfe-textinput");
    pfeTextinput.innerHTML = "<h1>Bad light DOM</h1>";

    document.body.appendChild(pfeTextinput);
    sinon.assert.calledWith(spy, 'pfe-textinput: The only child in the light DOM must be an input tag');
    spy.restore();
  });
});