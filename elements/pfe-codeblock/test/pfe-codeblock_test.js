const elements = [...document.querySelectorAll("pfe-codeblock")];

suite("<pfe-codeblock>", () => {

    test("it should upgrade", () => {
        assert.instanceOf(
            document.querySelector("pfe-codeblock"),
            customElements.get("pfe-codeblock"),
            "pfe-codeblock should be an instance of pfeCodeblock"
        );
    });

    // Write tests for each attribute
    test("it should set the code language for the codeblock to markup", () => {
        const element = document.getElementById('markup-test');
        const resultCount = element.shadowRoot.querySelectorAll('pre.language-markup').length;
        assert.equal(resultCount, 1);
    });

    test("it should set the code language for the codeblock to javascript", () => {
        const element = document.getElementById('javascript-test');
        const resultCount = element.shadowRoot.querySelectorAll('pre.language-javascript').length;
        assert.equal(resultCount, 1);
    });

    test("it should set the code language for the codeblock to default markup with an empty language property", () => {
        const element = document.getElementById('default-markup-test');
        const resultCount = element.shadowRoot.querySelectorAll('pre.language-markup').length;
        assert.equal(resultCount, 1);
    });

    test("it should set the line number option", () => {
        const element = document.getElementById('markup-test-linenumebrs');
        const resultCount = element.shadowRoot.querySelectorAll('pre.line-numbers').length;
        assert.equal(resultCount, 1);
    });

    test("it should set the starting line number value", () => {
        const element = document.getElementById('javascript-test-linenumebrs-offset');
        const styleDataLineCount = element.shadowRoot.querySelector('pre.line-numbers').style.counterReset;
        assert.equal(styleDataLineCount, "linenumber -3");
    });
});
