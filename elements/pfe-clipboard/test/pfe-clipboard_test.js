const elements = [...document.querySelectorAll("pfe-clipboard")];

suite("<pfe-clipboard>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-clipboard"),
            customElements.get("pfe-clipboard"),
            "pfe-clipboard should be an instance of pfeClipboard"
        );
    });

    // Write tests for each attribute

    // Write tests for each slot
    test("icon slot is working correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

});
