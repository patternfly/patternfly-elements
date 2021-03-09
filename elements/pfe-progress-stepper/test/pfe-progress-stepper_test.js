const elements = [...document.querySelectorAll("pfe-progress-stepper")];

suite("<pfe-progress-stepper>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-progress-stepper"),
            customElements.get("pfe-progress-stepper"),
            "pfe-progress-stepper should be an instance of pfeProgressStepper"
        );
    });

    // Write tests for each attribute

    // Write tests for each slot

});
