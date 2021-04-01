const elements = [...document.querySelectorAll("pfe-readtime")];

suite("<pfe-readtime>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-readtime"),
            customElements.get("pfe-readtime"),
            "pfe-readtime should be an instance of pfeReadtime"
        );
    });

    // Write tests for each attribute

    // Write tests for each slot

});
