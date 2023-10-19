const { readFile } = require('node:fs/promises');
const { dirname, join } = require('node:path');

function dedent(str) {
  const stripped = str.replace(/^\n/, '');
  const match = stripped.match(/^\s+/);
  return match ? stripped.replace(new RegExp(`^${match[0]}`, 'gm'), '') : str;
}

async function renderFromFile(content, { src }) {
  let path;
  if (src.startsWith('/')) {
    path = join(process.cwd(), src);
  } else {
    path = join(dirname(this.ctx._.docsTemplatePath), src);
  }
  if (path) {
    const fileContent = await readFile(path, 'utf-8');
    return fileContent;
  } else {
    return content;
  }
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPairedShortcode('htmlexample', async function(content, kwargs) {
    if (kwargs?.src) {
      content = await renderFromFile.call(this, dedent(content), kwargs);
    }
    return /* html */`
<div class="example-preview ${kwargs?.class ?? ''}">${content.trim()}</div>
<details class="html-example ${kwargs?.class ?? ''}"${!kwargs?.style ? '' : ` style="${kwargs.style}"`}>
  <summary>View HTML Source</summary>

~~~html
${dedent(content)}
~~~

</details>`;
  });
};
