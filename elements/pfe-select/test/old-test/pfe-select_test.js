suite('<pfe-select>', () => {
  test("it should log a warning if there are no children in the light DOM", done => {
    const spy = sinon.spy(console, 'warn');
    const pfeSelect = document.createElement("pfe-select");
    document.body.appendChild(pfeSelect);

    flush(() => {
      sinon.assert.calledWith(spy, '[pfe-select]: The first child in the light DOM must be a supported select tag');
      spy.restore();
      done();
    });

  });

  test("it should log a warning if select tag is not the first child of pfe-select element", done => {
    const spy = sinon.spy(console, 'warn');
    const pfeSelect = document.createElement("pfe-select");

    // creating div as first child element
    const div = document.createElement("div");
    pfeSelect.appendChild(div);

    document.body.appendChild(pfeSelect);

    flush(() => {
      sinon.assert.calledWith(spy, '[pfe-select]: The first child needs to be a select element');
      spy.restore();
      done();
    });

  });

  test("it should set the aria-invalid to true if pfe-invalid attribute is set to true", () => {
    const pfeSelect = document.querySelector("#pfe-select-with-error");
    pfeSelect.setAttribute("pfe-invalid", 'true');

    assert.equal(pfeSelect.getAttribute("pfe-invalid"), 'true');
    assert.isTrue(pfeSelect.children[0].hasAttribute("aria-invalid"));
    assert.equal(pfeSelect.children[0].getAttribute("aria-invalid"), pfeSelect.getAttribute("pfe-invalid"));
  });

  test('it should fire a pfe-select:change event when one of the options is selected', done => {
    const pfeSelect = document.querySelector('#pfe-select-success');

    const handlerSpy = sinon.spy(function() {
      const [event] = handlerSpy.getCall(0).args;
      sinon.assert.calledOnce(handlerSpy);
      assert.equal(event.detail.value, "2");

      // reset
      pfeSelect.removeEventListener('pfe-select:change', handlerSpy);
      pfeSelect.children[0].value = "1";
      done();
    });

    pfeSelect.addEventListener('pfe-select:change', handlerSpy);
    pfeSelect.children[0].value = "2";
    pfeSelect._inputChanged();
  });

  test("it should log a warning if multiple options exist with selected field set as true", () => {
    const spy = sinon.spy(console, 'warn');
    const pfeSelect = document.createElement("pfe-select");

    // setting JS options using setter method
    pfeSelect.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: true },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    document.body.appendChild(pfeSelect);

    sinon.assert.calledWith(spy, `[pfe-select]: The first 'selected' option will take precedence over others incase of multiple 'selected' options`);
    spy.restore();
  });

  test("it should add options to select through addOptions API", done => {
    const pfeSelect = document.createElement("pfe-select");

    const options = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    document.body.appendChild(pfeSelect);

    // setting JS options using addOptions API
    pfeSelect.addOptions(options);

    flush(() => {
      assert.equal(pfeSelect.children[0].options.length, options.length);
      done();
    });

  });

  test("it should call _modifyDOM method if pfeOptions exist", () => {
    const pfeSelect = document.createElement("pfe-select");
    const spy = sinon.spy(pfeSelect, "_modifyDOM");

    pfeSelect.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    document.body.appendChild(pfeSelect);
    assert(spy.called);
    assert.equal(pfeSelect.children[0].options.length, pfeSelect.pfeOptions.length);
  });

  test("it should replace lightDOM select (if exists) with pfeOptions", () => {
    const pfeSelect = document.querySelector("#pfe-select-with-js-options");
    const spy = sinon.spy(pfeSelect, "_modifyDOM");

    pfeSelect.pfeOptions = [
      { text: "Please select an Option", value: "", selected: true },
      { text: 'One', value: '1', selected: false },
      { text: 'Two', value: '2', selected: false },
      { text: 'Three', value: '3', selected: false}
    ];

    document.body.appendChild(pfeSelect);
    assert(spy.called);
    // checking if lightDOM select inside #pfe-select-with-js-options got replaced with new select
    assert.equal(document.querySelector("#example3"), null);
    assert.equal(pfeSelect.children[0].options.length, pfeSelect.pfeOptions.length);
  });

});