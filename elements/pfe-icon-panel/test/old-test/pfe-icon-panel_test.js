suite('<pfe-icon-panel>', () => {
  let panel1;
  let panel2;

  suiteSetup(() => {
    panel1 = document.querySelector("#panel1");
    panel2 = document.querySelector("#panel2");
  });

  test('it should show an icon', done => {
    const icon = panel1.shadowRoot.querySelector("pfe-icon");
    const image = icon.shadowRoot.querySelector("svg image");
    image.addEventListener("load", () => {
      done();
    });
    icon.setAttribute("icon", "rh-bike");
  });

  test("header, body, and footer are placed into correct slot", () => {
    // header wound up in the header slot
    assert.equal(
      panel1.querySelector("[slot=pfe-icon-panel--header]").assignedSlot,
      panel1.shadowRoot.querySelector(".pfe-icon-panel__content .pfe-icon-panel__header")
    );

    const bodyText = panel1.shadowRoot
      .querySelector(".pfe-icon-panel__content .pfe-icon-panel__body")
      .assignedNodes()
      .map(n => n.textContent)
      .join("")
      .trim();
    assert.equal(bodyText, "Lorem ipsum dolor sit amet.");

    // footer wound up in the footer slot
    assert.equal(
      panel1.querySelector("[slot=pfe-icon-panel--footer]").assignedSlot,
      panel1.shadowRoot.querySelector(".pfe-icon-panel__content .pfe-icon-panel__footer")
    );
  });
});