const elements = [...document.querySelectorAll("pfe-progress-steps")];

suite("<pfe-progress-steps>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-progress-steps"),
            customElements.get("pfe-progress-steps"),
            "pfe-progress-steps should be an instance of PfeProgressSteps"
        );
    });

    // Write tests for each attribute

    // Write tests for each slot

});
