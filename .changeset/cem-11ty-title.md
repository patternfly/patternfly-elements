---
"@patternfly/pfe-tools": minor
---

`11ty/plugins/custom-elements-manifest.cjs`: added `renderTitleInOverview` 
option, a boolean flag which defaults to `true`.

When true, this option renders an `<h1>` in the element's docs page's "Overview" 
section.

Note: the next major release will switch this option to `false` by default, so 
to prepare your docs pages, add your own headings:

BEFORE:
```md
{% renderOverview %}
  <pf-jazz-hands></pf-jazz-hands>
{% endrenderOverview %}
```

AFTER:
```md
<section class="band">
  <h1 id="jazz-hands">Jazz Hands</h1>
</section>

{% renderOverview %}
  <pf-jazz-hands></pf-jazz-hands>
{% endrenderOverview %}
```
