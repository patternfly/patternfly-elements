import '@patternfly/elements/pf-progress/pf-progress.js';

const progressElements = document.querySelectorAll('pf-progress');

function toggleMarkdown(event) {
  progressElements.forEach(element => {
    element.markdown = event.target.value;
  });
}

for (const input of document.querySelectorAll('input[name="example_markdown"]')) {
  input.addEventListener('change', toggleMarkdown);
}
