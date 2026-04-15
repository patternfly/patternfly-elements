---
"@patternfly/elements": major
---

Removed the bundled entrypoint (`pfe.min.js`). Import individual
elements directly instead, e.g. `import '@patternfly/elements/pf-button/pf-button.js'`.

The bundled entrypoint caused custom element double-registration issues
and is not recommended for production use.
