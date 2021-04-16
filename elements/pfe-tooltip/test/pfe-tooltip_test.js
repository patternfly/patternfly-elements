const elements = [...document.querySelectorAll("pfe-tooltip")];

suite("<pfe-tooltip>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-tooltip"),
            customElements.get("pfe-tooltip"),
            "pfe-tooltip should be an instance of pfeTooltip"
        );
    });

    // Write tests for each attribute
    test("position attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot

});
