const elements = [...document.querySelectorAll("pfe-absolute-position")];

suite("<pfe-absolute-position>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-absolute-position"),
            customElements.get("pfe-absolute-position"),
            "pfe-absolute-position should be an instance of pfeAbsolutePosition"
        );
    });

    // Write tests for each attribute
    test("auto attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" fitToVisibleBounds attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" for attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" offset attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" position attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" target attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot

});
