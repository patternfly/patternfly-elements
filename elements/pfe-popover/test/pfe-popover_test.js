const elements = [...document.querySelectorAll("pfe-popover")];

suite("<pfe-popover>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-popover"),
            customElements.get("pfe-popover"),
            "pfe-popover should be an instance of pfePopover"
        );
    });

    // Write tests for each attribute
    test("theme attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot

});
