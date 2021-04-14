const elements = [...document.querySelectorAll("pfe-readtime")];

suite("<pfe-readtime>", () => {
  let pfeReadtime;
  let langCode;

  suiteSetup(() => {
    pfeReadtime = document.querySelector("pfe-readtime");
    langCode = document.querySelector("html").getAttribute("lang");
  })

  test("it should upgrade", () => {
    assert.instanceOf(
        document.querySelector("pfe-readtime"),
        customElements.get("pfe-readtime"),
        "pfe-readtime should be an instance of pfeReadtime"
    );
  });


  // Write tests for each attribute

  // Write tests for each slot

  test("it calculates readtime based on wordcount given", done => {
    pfeReadtime.setAttribute("wpm", "100");

    assert.equal(pfeReadtime.getAttribute("readtime"), "5");
    done();
  });

  test("that readtime is hidden if readtime is < 1", done => {
    pfeReadtime.setAttribute("word-count", "0");

    assert.equal(pfeReadtime.shadowRoot.textContent, "");
    assert.isTrue(pfeReadtime.hasAttriute("hidden"));
    done();
  });

  test("if lang=zh that wpm and readtime update accordingly", done => {
    pfeReadtime.setAttribute("word-count", "158");

    langCode.setAttribute("lang", "zh");

    assert.equal(pfeReadtime.getAttribute("wpm"), "158");
    assert.equal(pfeReadtime.readtime, "1");
    done();
  });

  test("if lang=zh that wpm and readtime update accordingly", done => {
    pfeReadtime.setAttribute("template", "Custom readtime template: %t-minute");

    assert.equal(pfeReadtime.getAttribute("template"), "Custom readtime template: 1-minute");
    done();
  });
});
