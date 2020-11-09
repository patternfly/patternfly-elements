suite('<pfelement>', () => {
  teardown(() => {
    const testElement = document.getElementById("test-element");

    if (!testElement) {
      return;
    }

    document.body.removeChild(testElement);
  });

  test("it should default to the provided --context variable in the component's stylesheet", () => {
    const testElement = document.createElement("pfe-test-element");

    testElement.id = "test-element";
    document.body.appendChild(testElement);

    assert.equal(testElement.getAttribute("on"), "dark");
  });

  test("it should update the on attribute if style with --context is manually added after upgrade", () => {
    const testElement = document.createElement("pfe-test-element");

    testElement.id = "test-element";
    document.body.appendChild(testElement);

    testElement.setAttribute("style", "color: pink; --context: light;");

    assert.equal(testElement.getAttribute("on"), "light");
  });

  test("it should favor context attribute over the --context variable", () => {
    const testElement = document.createElement("pfe-test-element");

    testElement.id = "test-element";
    document.body.appendChild(testElement);

    testElement.setAttribute("context", "saturated");
    testElement.setAttribute("style", "color: pink; --context: light;");

    assert.equal(testElement.getAttribute("on"), "saturated");
  });

  test("it should update the on attribute if context is manually added after upgrade", () => {
    const testElement = document.createElement("pfe-test-element");

    testElement.id = "test-element";
    document.body.appendChild(testElement);

    document.querySelector("#test-element").setAttribute("context", "light");

    assert.equal(testElement.getAttribute("on"), "light");
  });

  test("it should push down the context to children", done => {
    const testElement = document.createElement("pfe-test-element");
    const testChildElement = document.createElement("pfe-test-child-element");

    testElement.id = "test-element";
    testChildElement.id = "test-child-element";

    testElement.appendChild(testChildElement);
    document.body.appendChild(testElement);

    flush(() => {
      assert.equal(testChildElement.getAttribute("on"), "dark");
      done();
    });
  });

  test("it should push an attribute override context down to the children", done => {
    const testElement = document.createElement("pfe-test-element");
    const testChildElement = document.createElement("pfe-test-child-element");

    testElement.id = "test-element";
    testChildElement.id = "test-child-element";

    testElement.appendChild(testChildElement);
    document.body.appendChild(testElement);

    // Add the context information
    testElement.setAttribute("context", "light");

    flush(() => {
      assert.equal(testChildElement.getAttribute("on"), "light");
      done();
    });
  });

  test("it should push a variable override context down to the children", done => {
    const testElement = document.createElement("pfe-test-element");
    const testChildElement = document.createElement("pfe-test-child-element");

    testElement.id = "test-element";
    testChildElement.id = "test-child-element";

    testElement.appendChild(testChildElement);
    document.body.appendChild(testElement);

    // Add the context information
    testElement.setAttribute("style", "--context: light;");

    flush(() => {
      assert.equal(testChildElement.getAttribute("on"), "light");
      done();
    });
  });

  test("it should favor child's context if set via variable --context", () => {
    const testElement = document.createElement("pfe-test-element");
    const testChildElement = document.createElement("pfe-test-child-element");

    testElement.id = "test-element";
    testChildElement.id = "test-child-element";

    testElement.appendChild(testChildElement);
    document.body.appendChild(testElement);

    // Add the context information
    testChildElement.setAttribute("style", "--context: light;");

    assert.equal(testChildElement.getAttribute("on"), "light");
  });

  test("it should favor child's context if the child has context set", () => {
    const testElement = document.createElement("pfe-test-element");
    const testChildElement = document.createElement("pfe-test-child-element");

    testElement.id = "test-element";
    testChildElement.id = "test-child-element";

    testElement.appendChild(testChildElement);
    document.body.appendChild(testElement);

    // Add the context information
    testChildElement.setAttribute("context", "light");

    assert.equal(testChildElement.getAttribute("on"), "light");
  });

  // @TODO Deprecated for 1.0
  test("it should update the on attribute if style with --theme is manually added after upgrade", () => {
    const testElement = document.createElement("pfe-test-element");

    testElement.id = "test-element";
    document.body.appendChild(testElement);

    assert.equal(testElement.getAttribute("on"), "dark");
    testElement.setAttribute("style", "color: pink; --theme: light;");
    assert.equal(testElement.getAttribute("on"), "light");
  });

  // @TODO Deprecated for 1.0
  test("it should update the on and context attributes if pfe-theme is manually added after upgrade", () => {
    const testElement = document.createElement("pfe-test-element");

    testElement.id = "test-element-theme";
    document.body.appendChild(testElement);

    document.querySelector("#test-element-theme").setAttribute("pfe-theme", "light");

    assert.equal(testElement.getAttribute("on"), "light");
    assert.equal(testElement.getAttribute("context"), "light");
  });

});
