suite('<pfe-datetime>', () => {
  test('it should show a simple date format if just a datetime attribute is provided', () => {
    const element = document.getElementById('simple');
    const text = element.shadowRoot.querySelector('span').textContent;

    assert.equal(text, "1/2/2006", "should just show a simple date");
  });

  test('it should show a formatted date', () => {
    const element = document.getElementById('justdate');
    const text = element.shadowRoot.querySelector('span').textContent;

    assert.equal(text, "January 2, 2006", "should show a formatted date");
  });

  test('it should show a formatted date with time', () => {
    const element = document.getElementById('withtime');
    const text = element.shadowRoot.querySelector('span').textContent;
    const regex = /.*?, .*?, \d{4}, \d+:\d+:\d+ .{2}/;

    assert.isTrue(regex.test(text), "should show a formatted date with time");
  });

  test('it should show a relative time since the date', () => {
    const element = document.getElementById('yearsago');
    const text = element.shadowRoot.querySelector('span').textContent;

    assert.match(text, /\d+ years ago/, "should show a relative time since the date");
  });

  test('unix timestamp should convert and display properly', () => {
    const element = document.getElementById('simpleUnixtime');
    const text = element.shadowRoot.querySelector('span').textContent;

    assert.equal(text, '1/2/2006', "should show a relative time since the date");
  });

  test('it should show a formatted date with time for a different locale', () => {
    const element = document.getElementById('esLocale');
    const text = element.shadowRoot.querySelector('span').textContent;

    assert.equal(text, 'lunes, 02 de ene de 2006', "should show a (locally) formatted date with time");
  });

  test("it should show formatted date for a specified time zone", () => {
    const element = document.getElementById("withTimeZone");
    const text = element.shadowRoot.querySelector("span").textContent;

    assert.equal(text, "1/2/2006, UTC", "should show a formatted date for a specified time zone");
  });
})