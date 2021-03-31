const elements = [...document.querySelectorAll("pfe-placeholder")];

suite("<pfe-placeholder>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-placeholder"),
            customElements.get("pfe-placeholder"),
            "pfe-placeholder should be an instance of pfePlaceholder"
        );
    });

    // Write tests for each attribute
    test("width attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test("height attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot

});
