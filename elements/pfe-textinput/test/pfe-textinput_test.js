import { pressEnter } from '/components/@polymer/iron-test-helpers/mock-interactions.js';

suite("<pfe-textinput>", () => {
  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-textinput"),
      customElements.get("pfe-textinput"),
      "pfe-textinput should be an instance of pfeTextinput"
    );
  });

  test("it should set a tabindex of -1 on the light DOM input so it's not in the tab order", () => {
    const pfeTextinput = document.querySelector("pfe-textinput");
    const lightInput = pfeTextinput.querySelector("input");

    assert.equal(lightInput.getAttribute("tabindex"), "-1");
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
    sinon.assert.calledWith(spy, 'pfe-textinput: The only child in the light DOM must be a text input tag');
    spy.restore();
  });

  test("it should copy any of the attributes from the light DOM to the shadow DOM", () => {
    const pfeTextinput = document.querySelector("#attribute-copy");
    const shadowInput = pfeTextinput.shadowRoot.querySelector("span input");

    assert.equal(shadowInput.getAttribute("type"), "text");
    assert.equal(shadowInput.getAttribute("placeholder"), "Test");
    assert.isTrue(shadowInput.hasAttribute("required"));
    assert.equal(shadowInput.getAttribute("minlength"), "5");
  });

  test("it should NOT copy any of the attributes in the denyListAttributes array", done => {
    const pfeTextinput = document.querySelector("#deny-list");
    const lightInput = pfeTextinput.querySelector("input");
    const shadowInput = pfeTextinput.shadowRoot.querySelector("span input");

    assert.isFalse(shadowInput.hasAttribute("style"));
    assert.isFalse(shadowInput.hasAttribute("tabindex"));

    // try dynamically adding the style attribute
    lightInput.style.display = "none";

    flush(() => {
      assert.isFalse(shadowInput.hasAttribute("style"));
      done();
    });
  });

  test("it should update the shadow DOM input when the light DOM input attributes change", done => {
    const pfeTextinput = document.querySelector("#changes");
    const lightInput = pfeTextinput.querySelector("input");
    const shadowInput = pfeTextinput.shadowRoot.querySelector("span input");

    lightInput.setAttribute("required", true);
    lightInput.setAttribute("minlength", "5");
    lightInput.setAttribute("maxlength", "40");
    lightInput.setAttribute("disabled", true);
    lightInput.removeAttribute("placeholder");
    
    flush(() => {
      assert.isTrue(shadowInput.hasAttribute("required"));
      assert.equal(shadowInput.getAttribute("minlength"), "5");
      assert.equal(shadowInput.getAttribute("maxlength"), "40");
      assert.isTrue(shadowInput.hasAttribute("disabled"));
      assert.isFalse(shadowInput.hasAttribute("placeholder"));
      done();
    });
  });

  test("it should set focus on the shadow DOM input when the light DOM input receives focus", () => {
    const pfeTextinput = document.querySelector("pfe-textinput");
    const lightInput = pfeTextinput.querySelector("input");
    const shadowInput = pfeTextinput.shadowRoot.querySelector("span input");

    lightInput.focus();
    assert.isTrue(pfeTextinput.shadowRoot.activeElement === shadowInput);
  });

  test("it should submit the nearest form on the press of an enter key", () => {
    const form = document.querySelector("#form");
    const formPfeTextinput = document.querySelector("#form-pfe-textinput");
    const formInput = document.querySelector("#form-input");
    const shadowInput = formPfeTextinput.shadowRoot.querySelector("span input");

    form.addEventListener("submit", event => {
      event.preventDefault();
      assert.isTrue(true);
    });

    formInput.value = "some value";
    pressEnter(shadowInput);
  });
});