const elements = [...document.querySelectorAll("pfe-navigation-account")];

suite("<pfe-navigation-account>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-navigation-account"),
            customElements.get("pfe-navigation-account"),
            "pfe-navigation-account should be an instance of pfeNavigationAccount"
        );
    });

    // Write tests for each attribute
    test("login-link attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" logout-link attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" avatar-url attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });
    test(" full-name attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });

    // Write tests for each slot

});
