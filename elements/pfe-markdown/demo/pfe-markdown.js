import '@patternfly/pfe-band';
import '@patternfly/pfe-cta';
import '@patternfly/pfe-markdown';

const root = document.querySelector('[data-demo="pfe-markdown"]')?.shadowRoot ?? document;

const markdownSample = `
Sometimes you want numbered lists:

1. One
2. Two
3. Three

Sometimes you want bullet points:

* Start a line with a star
* Profit!

Alternatively,

- Dashes work just as well
- And if you have sub points, put two spaces before the dash or star:
\t- Like this
\t- And this`.trimStart();

const firstMarkdownSample = '# First Markdown Sample';
const secondMarkdownSample = '## Second Markdown Sample';

root.getElementById('update-dynamic').addEventListener('click', function() {
  root.querySelector('#markdownTag').innerHTML = markdownSample;
});

root.querySelector('#markdownTagSecondTime').innerHTML = firstMarkdownSample;

root.getElementById('update-dynamic-twice').addEventListener('click', function() {
  root.querySelector('#markdownTagSecondTime').innerHTML = secondMarkdownSample;
});

root.getElementById('update-light-dom').addEventListener('click', function() {
  const element = root.querySelector('#markdownTagUpdatedLightDom');
  element.innerHTML += '\n### This is a heading level 3';
});
