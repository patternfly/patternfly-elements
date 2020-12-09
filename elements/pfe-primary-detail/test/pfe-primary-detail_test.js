const elements = [...document.querySelectorAll("pfe-primary-detail")];

suite("<pfe-primary-detail>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-primary-detail"),
            customElements.get("pfe-primary-detail"),
            "pfe-primary-detail should be an instance of pfePrimaryDetail"
        );
    });

    // Write tests for each attribute

    // Write tests for each slot

});
