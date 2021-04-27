suite("<pfe-button>", () => {
  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-button"),
      customElements.get("pfe-button"),
      "pfe-button should be an instance of pfeButton"
    );
  });

  test("it should log a console warning if the light dom inside pfe-button is not a button", () => {
    const spy = sinon.spy(console, 'warn');
    const badButton = document.createElement("pfe-button");

    badButton.innerHTML = "<div>Bad Button</div>";
    document.body.appendChild(badButton);

    sinon.assert.calledWith(spy, "[pfe-button]: The only child in the light DOM must be a button tag");
  });

  test("it should copy any attributes from the light dom button to the shadow dom button", done => {
    const pfeButton = document.querySelector("pfe-button");
    const lightDomBtn = pfeButton.querySelector("button");

    lightDomBtn.setAttribute("disabled", "");
    lightDomBtn.setAttribute("type", "reset");
    lightDomBtn.id = "myBtn";

    flush(() => {
      const shadowBtn = pfeButton.shadowRoot.querySelector("button");

      assert.isTrue(shadowBtn.hasAttribute("disabled"));
      assert.equal(shadowBtn.getAttribute("type"), "reset");
      assert.equal(shadowBtn.id, "myBtn");

      // reset
      lightDomBtn.removeAttribute("disabled");
      lightDomBtn.removeAttribute("type");
      lightDomBtn.removeAttribute("id");
      done();
    });
  });

  test("it should not accept any deny list attributes from the light dom button", done => {
    // style is the only deny list attribute
    const pfeButton = document.querySelector("pfe-button");
    const lightDomBtn = pfeButton.querySelector("button");

    lightDomBtn.setAttribute("style", "background:red");

    flush(() => {
      const shadowBtn = pfeButton.shadowRoot.querySelector("button");
      assert.isTrue(!shadowBtn.hasAttribute("style"));
      done();
    });
  });

  test("it should update the shadow dom button text if the light dom button text changes", done => {
    const pfeButton = document.querySelector("pfe-button");
    const lightDomBtn = pfeButton.querySelector("button");
    const shadowBtn = pfeButton.shadowRoot.querySelector("button");

    assert.equal(lightDomBtn.textContent, shadowBtn.textContent);

    lightDomBtn.textContent = "New Text";

    flush(() => {
      const lightDomBtn = pfeButton.querySelector("button");
      const shadowBtn = pfeButton.shadowRoot.querySelector("button");
      assert.equal(lightDomBtn.textContent, shadowBtn.textContent);
      done();
    });
  });

  test("it should send a pfe-button:click event on click", () => {
    const button = document.querySelector("pfe-button");
    const handlerSpy = sinon.spy();

    document.addEventListener('pfe-button:click', handlerSpy);
    button.click();

    sinon.assert.calledOnce(handlerSpy);
  });
});