const score = res => (
    res == null ? '⚪️'
  : res >= 90 ? '🟢'
  : res >= 50 ? '🟠'
  : '🔴'
);

function titleCase(str) {
  return str.toLowerCase().replace(/\b([\w-])/g, s => s.toUpperCase()).replace('-', ' ');
}

module.exports = ({ links, assertionResults }) => {
  // pretty sure that's a false negative
  // eslint-disable-next-line unicorn/prefer-object-from-entries
  const failures = assertionResults.reduce((acc, result) => {
    const forUrl = acc[result.url] || {};

    if (!result.passed) {
      forUrl[result.auditId] = result;
    }

    return Object.assign(acc, { [result.url]: forUrl });
  }, {});

  return function getComment(acc, { url, summary }) {
    const [, slug] = url.match(/\/([\w-]+)\/demo\/?(([\w-_]+)\.html)?$/) || [];
    const title = slug ? titleCase(slug) : url;

    const {
      performance,
      accessibility,
      'best-practices': bestPractices,
      seo,
      pwa,
    } = Object.fromEntries(
      Object.entries(summary)
        .map(([key, value]) =>
          [key, Math.round(value * 100)])
    );

    const p = score(performance);
    const a = score(accessibility);
    const b = score(bestPractices);
    const s = score(seo);
    const w = score(pwa);

    const failed = Object.values(failures[url]);

    return `${acc}

<details><summary>${p} ${a} ${b} ${s} ${w} <strong>${title}</strong></summary>

### 🔦 Lighthouse Report for [${title}](${url})

[🔬 **View Detailed results** 🧾](${links[url]})

| Category            | Score            |
| ------------------- | ---------------- | ${performance == null ? '' : `
| ${p} Performance    | ${performance}   | `} ${accessibility == null ? '' : `
| ${a} Accessibility  | ${accessibility} | `} ${bestPractices == null ? '' : `
| ${b} Best practices | ${bestPractices} | `} ${seo == null ? '' : `
| ${s} SEO            | ${seo}           | `} ${pwa == null ? '' : `
| ${w} PWA            | ${pwa}           | `} ${!failed.length ? '' : `

#### 💥 Assertion Failures

| Audit           | Result                                                | Docs                              |
| --------------- | ----------------------------------------------------- | --------------------------------- | ${failed.map(f => `
| ${f.auditTitle} | **${f.actual}** (expected ${f.operator}${f.expected}) | [📗](${f.auditDocumentationLink}) |`).join('')}`}

</details>
`;
  };
};
