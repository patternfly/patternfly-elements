suite('<pfe-health-index>', () => {
  test('it should upgrade', () => {
    assert.instanceOf(document.querySelector('pfe-health-index'), customElements.get("pfe-health-index", 'pfe-health-index should be an instance of rhHealthIndex'));
  });

  test("it should show a health index", () => {
    const healthIndex = document.querySelector("#original");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "A");
    assert.isTrue(activeBox.classList.contains('a'));
    assert.equal(shadowRootTextContent, "A");
  });

  test("it should show a health index with uppercase text when given lowercase text", done => {
    const healthIndex = document.querySelector("#lowercase");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    flush(() => {
      // @TODO
      // fix text casing in React
      if (!window.React) {
        assert.equal(healthIndexTextContent, "A");
      }

      assert.isTrue(activeBox.classList.contains('a'));
      assert.equal(shadowRootTextContent, "A");

      done();
    });
  });

  test("it should show a console warning if an invalid health index is provided", () => {
    const spy = sinon.spy(console, "warn");
    const healthIndex = document.querySelector("#badIndex");
    healthIndex.setAttribute("health-index", "fjkas")

    sinon.assert.calledWith(spy,`[pfe-health-index#badIndex]: a valid health-index was not provided. Please use A, B, C, D, E, or F`);

    console.warn.restore();
  });

  test("it should change the index if the health-index attribute is updated", done => {
    const healthIndex = document.querySelector("#changingIndex");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "A");
    assert.isTrue(activeBox.classList.contains('a'));
    assert.equal(shadowRootTextContent, "A");

    healthIndex.setAttribute("health-index", "B");

    flush(() => {
      const newHealthIndex = document.querySelector("#changingIndex");
      const newHealthIndexTextContent = healthIndex.textContent;
      const newActiveBox = healthIndex.shadowRoot.querySelector(".box.active");
      const newShadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

      assert.equal(newHealthIndexTextContent, "B");
      assert.isTrue(newActiveBox.classList.contains('b'));
      assert.equal(newShadowRootTextContent, "B");

      done();
    });
  });

  test("it should show a health index of A", () => {
    const healthIndex = document.querySelector("#A");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "A");
    assert.isTrue(activeBox.classList.contains('a'));
    assert.equal(shadowRootTextContent, "A");
  });

  test("it should show a health index of B", () => {
    const healthIndex = document.querySelector("#B");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "B");
    assert.isTrue(activeBox.classList.contains('b'));
    assert.equal(shadowRootTextContent, "B");
  });

  test("it should show a health index of C", () => {
    const healthIndex = document.querySelector("#C");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "C");
    assert.isTrue(activeBox.classList.contains('c'));
    assert.equal(shadowRootTextContent, "C");
  });

  test("it should show a health index of D", () => {
    const healthIndex = document.querySelector("#D");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "D");
    assert.isTrue(activeBox.classList.contains('d'));
    assert.equal(shadowRootTextContent, "D");
  });

  test("it should show a health index of E", () => {
    const healthIndex = document.querySelector("#E");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "E");
    assert.isTrue(activeBox.classList.contains('e'));
    assert.equal(shadowRootTextContent, "E");
  });

  test("it should show a health index of F", () => {
    const healthIndex = document.querySelector("#F");
    const healthIndexTextContent = healthIndex.textContent;
    const activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const shadowRootTextContent = healthIndex.shadowRoot.querySelector("#healthIndex").textContent;

    assert.equal(healthIndexTextContent, "F");
    assert.isTrue(activeBox.classList.contains('f'));
    assert.equal(shadowRootTextContent, "F");
  });

  test("it should increase in size if size attribute is set to lg", () => {
    const healthIndex = document.querySelector('#largeSize');
    let activeBox = healthIndex.shadowRoot.querySelector(".box.active");
    const defaultWidth = activeBox.offsetWidth;
    const defaultHeight = activeBox.offsetHeight;

    healthIndex.setAttribute("size", "lg");
    activeBox = healthIndex.shadowRoot.querySelector(".box.active");

    assert.isTrue(defaultWidth < activeBox.offsetWidth);
    assert.isTrue(defaultHeight < activeBox.offsetHeight);
  });

  test("it should only show a single box if the size attribute is set to mini", () => {
    const healthIndex = document.querySelector("#miniSize");
    const boxes = healthIndex.shadowRoot.querySelectorAll(".box");
    assert.equal(boxes.length, 1);
  });
});