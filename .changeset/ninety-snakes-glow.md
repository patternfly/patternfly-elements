---
"@patternfly/pfe-tools": minor
---

Allow for multiple demos.

Elements can now have multiple demos, and the demos now load their scripts using script tags,
instead of inlining them via nunjucks using filename conventions.

BREAKING CHANGES: dev server urls now use `/components` instead of `/demo`
