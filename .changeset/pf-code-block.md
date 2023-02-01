---
"@patternfly/elements": major
---
✨ Added `<pf-code-block>` and removed `<pfe-codeblock>`. Code block now closely 
follows the PatternFly design spec.

```html
<pf-code-block>
  <script type="application/openshift">
    apiVersion: helm.openshift.io/v1beta1/
    kind: HelmChartRepository
    metadata:
    name: azure-sample-repo0oooo00ooo
    spec:
    connectionConfig:
    url: https://raw.githubusercontent.com/Azure-Samples/helm-charts/master/docs
  </script>
</pf-code-block>
```

### Breaking Changes

- ❌ Removed `--pfe-*` CSS custom properties in favour of `--pf-*` ones. See 
  [PFv4][PFv4] docs.

There are more changes than these, including breaking changes. See the [docs][docs] for more info.

[docs]: https://patternflyelements.org/components/code-block/
[PFv4]: https://patternfly.org/v4/
