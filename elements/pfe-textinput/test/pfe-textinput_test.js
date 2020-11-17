import { keyUpOn } from '/components/@polymer/iron-test-helpers/mock-interactions.js';

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

  test("it should add a novalidate attribute when the novalidate property is set to true", () => {
    const textinput = document.querySelector("pfe-textinput");
    assert.equal(textinput.hasAttribute("novalidate"), false);

    textinput.novalidate = true;
    assert.equal(textinput.hasAttribute("novalidate"), true);
  });

  test("it should remove a novalidate attribute when the novalidate property is set to false", () => {
    const textinput = document.querySelector("pfe-textinput");
    textinput.novalidate = true;
    assert.equal(textinput.hasAttribute("novalidate"), true);

    textinput.novalidate = false;
    assert.equal(textinput.hasAttribute("novalidate"), false);
  });

  test("it should add event listeners to the input", () => {
    const textinput = document.querySelector("pfe-textinput");
    assert.equal(textinput._listenersAdded, true);
  });

  test("it should remove the event listeners if novalidate is true", () => {
    const textinput = document.querySelector("pfe-textinput");
    textinput.novalidate = true;

    assert.equal(textinput._listenersAdded, false);
    // reset
    textinput.novalidate = false;
  });

  test("it should set novalidate to true if the parent form has a novalidate attribute", () => {
    const textinput = document.querySelector("#novalidate pfe-textinput");
    assert.equal(textinput.hasAttribute("novalidate"), true);
  });

  test("it should set novalidate to true if the textinput has a formnovalidate attribute on a sibling button", () => {
    const textinput = document.querySelector("#btn-novalidate pfe-textinput");
    assert.equal(textinput.hasAttribute("novalidate"), true);
  });

  test("it should set novalidate to true if the textinput has a formnovalidate attribute on a sibling input[type=\"submit\"]", () => {
    const textinput = document.querySelector("#submit-novalidate pfe-textinput");
    assert.equal(textinput.hasAttribute("novalidate"), true);
  });

  test("it should add a pfe-touched class when the textinput receives focus", () => {
    const textinput = document.querySelector("pfe-textinput");
    textinput._input.focus();
    assert.equal(textinput.classList.contains("pfe-touched"), true);
  });

  test("it should add a pfe-invalid class when the textinput validity check does not pass", () => {
    const form = document.querySelector("#add-invalid-class");
    const textinput = form.querySelector("pfe-textinput");
    const button = form.querySelector("button");

    button.click();
    assert.equal(textinput.classList.contains("pfe-invalid"), true);
  });

  test("it should remove a pfe-invalid class when the textinput validity check does pass", () => {
    const form = document.querySelector("#add-invalid-class");
    const textinput = form.querySelector("pfe-textinput");
    textinput._input.focus();
    textinput.querySelector("input").value = "something";
    textinput._input.blur();
    assert.equal(textinput.classList.contains("pfe-invalid"), false);
  });

  test("it should add a pfe-invalid class if the textinput emits an invalid event", () => {
    const form = document.querySelector("#add-invalid-class-submit");
    const textinput = form.querySelector("pfe-textinput");
    const button = form.querySelector("button");

    textinput._input.addEventListener("invalid", event => {
      assert.equal(textinput.classList.contains("pfe-invalid"), true);
    });

    button.click();
  });
});