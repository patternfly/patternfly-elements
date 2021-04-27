const elements = [...document.querySelectorAll("pfe-placeholder")];

suite("<pfe-placeholder>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-placeholder"),
            customElements.get("pfe-placeholder"),
            "pfe-placeholder should be an instance of pfePlaceholder"
        );
    });

    test("width attribute is applied correctly", () => {
        Promise.all([customElements.whenDefined("pfe-placeholder")]).then(() => {
            assert.equal(elements[1]._width, 400);
        });
    });

    test("height attribute is applied correctly", () => {
        Promise.all([customElements.whenDefined("pfe-placeholder")]).then(() => {
            assert.equal(elements[2]._height, 200);
        });
    });

    test("height attribute is applied correctly", () => {
        Promise.all([customElements.whenDefined("pfe-placeholder")]).then(() => {
            assert.equal(elements[0].textContent.trim(), "placeholder");
            assert.equal(elements[0].text.trim(), "placeholder");
        });
    });

});
