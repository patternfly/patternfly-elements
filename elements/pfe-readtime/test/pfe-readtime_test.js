const elements = [...document.querySelectorAll("pfe-readtime")];

suite("<pfe-readtime>", () => {
  let pfeReadtime;

  suiteSetup(() => {
    pfeReadtime = document.querySelector("pfe-readtime");

    // Remove all attributes
    pfeReadtime.removeAttribute("hidden");
    pfeReadtime.removeAttribute("readtime");
    pfeReadtime.removeAttribute("wpm");
    pfeReadtime.removeAttribute("word-count");
    pfeReadtime.removeAttribute("template");
    pfeReadtime.removeAttribute("for");
  })

  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-readtime"),
      customElements.get("pfe-readtime"),
      "pfe-readtime should be an instance of pfeReadtime"
    );
  });

  // @TODO: Tests need to be updated to work in React & Vue

  // If pfe-readtime has word-count attribute make sure it is getting that values
  //wpm is set to X expect readtime value to be Y
  test("it should calculate readtime based on given wpm", () => {
    pfeReadtime.setAttribute("wpm", "100");
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.getAttribute("readtime"), "5");
  });

  test("it should hide the component if readtime is < 1", () => {
    pfeReadtime.setAttribute("word-count", "0");
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.getAttribute("readtime"), "0");
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.shadowRoot.querySelector(".pfe-readtime__text").textContent, "");
    if (!window.Vue && !window.React) assert.isTrue(pfeReadtime.hasAttribute("hidden"));
  });

  test("it should update readtime if language is set to zh", () => {
    pfeReadtime.setAttribute("lang", "zh");
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.getAttribute("wpm"), "158");
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.getAttribute("readtime"), "1");
  });

  test("it should update the template used if the attribute is set", () => {
    pfeReadtime.setAttribute("template", "Custom template");
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.shadowRoot.querySelector(".pfe-readtime__text").textContent, "Custom template");
  });

  test("it should update the template used if the light DOM is provided", () => {
    pfeReadtime.textContent = "Custom template";
    if (!window.Vue && !window.React) assert.equal(pfeReadtime.shadowRoot.querySelector(".pfe-readtime__text").textContent, "Custom template");
  });

});
