suite("<pfe-markdown>", () => {
  test("it should upgrade", () => {
    assert.instanceOf(
      document.querySelector("pfe-markdown"),
      customElements.get(
        "pfe-markdown",
        "pfe-markdown should be an instance of pfeMarkdown"
      )
    );
  });

  test("it should take markdown from the pfe-markdown-container and format it in the pfe-markdown-render div", () => {
    const markdownRender = document.querySelector("#original [pfe-markdown-render]");
    const markdown = markdownRender.innerHTML.trim();
    assert.equal(markdown, `<h1 id="pfe-markdown">pfe-markdown</h1>`);
  });

  test("it should render as markdown any dynamically added markdown in the pfe-markdown-container div", done => {
    const markdownText = "# Dynamic Markdown";
    const dynamicMarkdownElement = document.querySelector("#dynamic");

    dynamicMarkdownElement.querySelector("[pfe-markdown-container]").innerHTML = markdownText;

    flush(() => {
      const markdownRender = dynamicMarkdownElement.querySelector("[pfe-markdown-render]");
      const markdown = markdownRender.innerHTML.trim();

      assert.equal(
        markdown,
        `<h1 id="dynamic-markdown">Dynamic Markdown</h1>`
      );

      done();
    });
  });

  test("it should render any additional markdown added to the light dom", done => {
    const element = document.querySelector("#added");
    const markdownRender = element.querySelector("[pfe-markdown-render]");
    const markdown = markdownRender.innerHTML.trim();
    assert.equal(markdown, `<h1 id="pfe-markdown">pfe-markdown</h1>`);

    element.querySelector("[pfe-markdown-container]").innerHTML += `\n## Heading Level 2`;

    flush(() => {
      const updatedMarkdown = element.querySelector("[pfe-markdown-render]").innerHTML.trim();
      assert.equal(
        updatedMarkdown,
        `<h1 id="pfe-markdown">pfe-markdown</h1>
<h2 id="heading-level-2">Heading Level 2</h2>`
      );

      done();
    });
  });

  test("it should clear the markdown render if markdown container innerHTML is removed", done => {
    const element = document.querySelector("#removed");
    element.querySelector("[pfe-markdown-container]").innerHTML = "";

    flush(() => {
      const markdownRender = element.querySelector("[pfe-markdown-render]");
      const markdownElementInnerHTML = markdownRender.innerHTML.trim();
      assert.equal(markdownElementInnerHTML, "");
      done();
    });
  });
});