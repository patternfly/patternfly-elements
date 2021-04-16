const elements = [...document.querySelectorAll("pfe-alert")];

suite("<pfe-alert>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-alert"),
            customElements.get("pfe-alert"),
            "pfe-alert should be an instance of pfeAlert"
        );
    });

    // Write tests for each attribute

    // Write tests for each slot

});
