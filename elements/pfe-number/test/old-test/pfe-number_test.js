suite('<pfe-number>', () => {
  test('it should show an ordinal number', () => {
    const pfeNumber = document.querySelector('pfe-number[type="ordinal"]');
    let content = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(content, '1st');
  });

  test('it should show bytes', () => {
    const pfeNumber = document.querySelector('pfe-number[type="bytes"]');
    const content = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(content, '1.97 KiB');
  });

  test('it should show a percentage', () => {
    const pfeNumber = document.querySelector('pfe-number[type="percent"]');
    const content = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(content, '57%');
  });

  test('it should show an exponential number', () => {
    const pfeNumber = document.querySelector('pfe-number[type="e"]');
    const content = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(content, '2.000e+6');
  });

  test('it should show a thousands number with a decimal', () => {
    const pfeNumber = document.querySelector('pfe-number[type="thousands"]#with-dec');
    const content = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(content, '1 234.12');
  });

  test('it should show a thousands number without a decimal', () => {
    const pfeNumber = document.querySelector('pfe-number[type="thousands"]#without-dec');
    const content = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(content, '1 234');
  });

  test('it should react to the number changing', () => {
    const pfeNumber = document.querySelector('#test-change');
    const before = pfeNumber.shadowRoot.querySelector('span').textContent;

    pfeNumber.setAttribute("number", 20);
    const after = pfeNumber.shadowRoot.querySelector('span').textContent;

    assert.equal(after, '20');
  });

  test("it should show nothing if the number is not valid", () => {
    const pfeNumber = document.querySelector("#invalid-number");
    const content = pfeNumber.shadowRoot.querySelector('span').textContent;
    assert.equal(content, "");
  });
});