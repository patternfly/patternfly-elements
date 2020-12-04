const elements = [...document.querySelectorAll("<%= elementName %>")];

suite("<<%= elementName %>>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("<%= name %>"),
            customElements.get("<%= name %>"),
            "<%= elementName %> should be an instance of <%= camelCaseName %>"
        );
    });

    // Write tests for each attribute<% for(let i = 0; i < attributes.length; i++) { %>
    test("<%= attributes[i] %> attribute is applied correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });<% } %>

    // Write tests for each slot<% for(let i = 0; i < slots.length; i++) { %>
    test("<%= slots[i] %> slot is working correctly", () => {
        // Test that the attribute applied correctly
        // assert.equal();
    });<% } %>

});
