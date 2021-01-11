suite("<pfe-collapse>", () => {
  test("it should initialize with the correct attributes", () => {
    const collapse = document.querySelector("pfe-collapse");
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    assert.equal(toggle.getAttribute("aria-expanded"), "false");
    assert.equal(toggle.getAttribute("role"), "button");
    assert.equal(toggle.getAttribute("tabindex"), "0");
    assert.equal(toggle.getAttribute("aria-controls"), panel.id);

    assert.isNotTrue(panel.hasAttribute("pfe-expanded"));
  });

  test("it should toggle a panel inside pfe-collapse on click", done => {
    const collapse = document.querySelector("pfe-collapse");
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    assert.equal(toggle.getAttribute("aria-expanded"), "false");
    assert.isNotTrue(panel.hasAttribute("pfe-expanded"));

    toggle.click();

    flush(() => {
      assert.equal(toggle.getAttribute("aria-expanded"), "true");
      assert.isTrue(panel.hasAttribute("pfe-expanded"));

      toggle.click();

      flush(() => {
        assert.equal(toggle.getAttribute("aria-expanded"), "false");
        assert.isNotTrue(panel.hasAttribute("pfe-expanded"));

        done();
      });
    });
  });

  test("it should toggle a panel inside pfe-collapse when the toggle method is called on pfe-collapse", done => {
    const collapse = document.querySelector("pfe-collapse");
    const toggle = collapse.querySelector("pfe-collapse-toggle");
    const panel = collapse.querySelector("pfe-collapse-panel");

    collapse.toggle();

    flush(() => {
      assert.equal(toggle.getAttribute("aria-expanded"), "true");
      assert.isTrue(panel.hasAttribute("pfe-expanded"));

      collapse.toggle();

      flush(() => {
        assert.equal(toggle.getAttribute("aria-expanded"), "false");
        assert.isNotTrue(panel.hasAttribute("pfe-expanded"));

        done();
      });
    });
  });

  test("a pfe-collapse-toggle should be able to control a pfe-collapse-panel without being wrapped in a pfe-collapse tag", done => {
    const outsidePfeCollapse = document.querySelector(
      "#outsidePfeCollapse"
    );
    const toggle = outsidePfeCollapse.querySelector(
      "pfe-collapse-toggle"
    );
    const panel = outsidePfeCollapse.querySelector(
      "pfe-collapse-panel"
    );

    toggle.click();

    flush(() => {
      assert.equal(toggle.getAttribute("aria-expanded"), "true");
      assert.isTrue(panel.hasAttribute("pfe-expanded"));

      done();
    });
  });

  test("a pfe-collapse-panel should be able to be controlled without a pfe-collapse-toggle", done => {
    const standalonePanel = document.querySelector("#standalonePanel");
    const panel = standalonePanel.querySelector("pfe-collapse-panel");

    panel.expanded = true;

    flush(() => {
      assert.isTrue(panel.hasAttribute("pfe-expanded"));
      panel.expanded = false;

      flush(() => {
        assert.isNotTrue(panel.hasAttribute("pfe-expanded"));
        done();
      });
    });
  });

  test('it should fire a pfe-collapse:change event when the element is expanded or collapsed', () => {
    const collapse = document.querySelector('pfe-collapse');
    const toggle = collapse.querySelector('pfe-collapse-toggle');
    const panel = collapse.querySelector("pfe-collapse-panel");
    const handlerSpy = sinon.spy();

    document.addEventListener('pfe-collapse:change', handlerSpy);

    toggle.click();

    const [event] = handlerSpy.getCall(0).args;

    sinon.assert.calledOnce(handlerSpy);
    assert.deepEqual(event.detail, {
      expanded: true,
      toggle: toggle,
      panel: panel
    });

    // reset
    document.removeEventListener('pfe-collapse:change', handlerSpy);
    toggle.click();
  });

  test('a pfe-collapse-panel should fire a pfe-collapse-panel:animation-start event when the panel is expanded or collapsed', () => {
    const collapse = document.querySelector('pfe-collapse');
    const toggle = collapse.querySelector('pfe-collapse-toggle');
    const panel = collapse.querySelector("pfe-collapse-panel");
    const handlerSpy = sinon.spy();

    document.addEventListener('pfe-collapse-panel:animation-start', handlerSpy);

    toggle.click();

    const [event] = handlerSpy.getCall(0).args;

    sinon.assert.calledOnce(handlerSpy);
    assert.deepEqual(event.detail, {
      state: "opening",
      panel: panel
    });

    // reset
    document.removeEventListener('pfe-collapse-panel:animation-start', handlerSpy);
    toggle.click();
  });

  test('a pfe-collapse-panel should fire a pfe-collapse-panel:animation-end event when the panel has finished expanding or collapsing', done => {
    const collapse = document.querySelector('#animationComplete pfe-collapse');
    const toggle = collapse.querySelector('pfe-collapse-toggle');
    const panel = collapse.querySelector("pfe-collapse-panel");
    const handlerSpy = sinon.spy(function() {
      const [event] = handlerSpy.getCall(0).args;
      sinon.assert.calledOnce(handlerSpy);
      assert.deepEqual(event.detail, {
        expanded: true,
        panel: panel
      });

      // reset
      document.querySelector("#animationComplete").removeEventListener('pfe-collapse-panel:animation-end', handlerSpy);
      toggle.click();
      done();
    });

    document.querySelector("#animationComplete").addEventListener('pfe-collapse-panel:animation-end', handlerSpy);

    toggle.click();
  });

  test("it should add a pfe-animation attribute to a pfe-collapse-panel when the attribute is added to pfe-collapse", () => {
    const collapse = document.querySelector("pfe-collapse");
    const panel = collapse.querySelector("pfe-collapse-panel");

    collapse.setAttribute("animation", "false");
    assert.equal(panel.getAttribute("animation"), "false");
  });

  test("it should log a warning if a pfe-collapse-toggle doesn't have an associated pfe-collapse-panel", () => {
    const toggleWithoutAssociatedPanel = document.querySelector(
      "#toggleWithoutAssociatedPanel"
    );
    const toggle = toggleWithoutAssociatedPanel.querySelector(
      "pfe-collapse-toggle"
    );
    const spy = sinon.spy(console, "warn");

    toggle.click();

    sinon.assert.calledWith(
      spy,
      `[pfe-collapse-toggle#toggle-element]: This toggle doesn't have a panel associated with it`
    );
  });

  test("it should not open the panel if the toggle has been disabled", done => {
    const collapse = document.querySelector('#disabled pfe-collapse');
    const toggle = collapse.querySelector('pfe-collapse-toggle');
    const panel = collapse.querySelector("pfe-collapse-panel");

    toggle.click();

    flush(() => {
      assert.equal(toggle.getAttribute("aria-expanded"), "false");
      assert.isTrue(!panel.hasAttribute("pfe-expanded"));

      done();
    });
  });

  test("it should still be able to open a panel that is added to the DOM after the toggle has been added", done => {
    const collapseContainer = document.querySelector('#latePanel');
    const toggle = collapseContainer.querySelector('pfe-collapse-toggle');
    const panel = document.createElement("pfe-collapse-panel");
    panel.id = "latePanel1";
    panel.innerText = "Panel";

    collapseContainer.appendChild(panel);
    toggle.click();

    flush(() => {
      assert.equal(toggle.getAttribute("aria-expanded"), "true");
      assert.isTrue(panel.hasAttribute("pfe-expanded"));
      done();
    });
  });
});