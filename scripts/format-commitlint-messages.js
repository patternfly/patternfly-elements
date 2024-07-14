/**
 * formats commitlint action results
 * @param {object} opts
 * @param {*[]} opts.results
 * @param {boolean} opts.titleGood is the PR title acceptable
 */
export function format({ results, titleGood }) {
  try {
    const totalErrors = results.reduce((a, r) => a + r.errors.length, 0);
    const totalWarnings = results.reduce((a, r) => a + r.warnings.length, 0);

    const header = /* markdown */`
## 👕 Commitlint Problems for this PR: ${!titleGood ? '' : /* markdown */`

**The PR title conforms to conventional commit style**

👉 **Make sure the PR is squashed into a single commit using the PR title** 👈`}

🔎   found ${totalErrors} errors, ${totalWarnings} warnings
ℹ️   Get help: https://github.com/conventional-changelog/commitlint/#what-is-commitlint
`;

    const comment = results.reduce((acc, result) => {
      if (!result.errors.length && !result.warnings.length) {
        return acc;
      }

      const [firstLine, ...rest] = result.message.split('\n');

      const body = rest.join('\n').trim();
      const hash = result.hash.substring(0, 8);

      return `${acc} ${!body.length ? '\n\n' : /* markdown */`

<details><summary>`}
${hash} - ${firstLine} ${!body.length ? '\n\n' : /* markdown */`\
</summary>

${body}

</details>

`}${result.errors.map(error => /* markdown */`
- ❌ ${error}`).join('')} ${result.warnings.map(warn => `
- ⚠️ ${warn}`).join('')}`;
    }, header);

    return comment.replaceAll('\\n', '\n');
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return '';
  }
}
