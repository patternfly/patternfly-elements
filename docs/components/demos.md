---
layout: layout-demo.njk
pagination:
  data: elements
  size: 1
  alias: element
  before: xs => xs.filter(x => !!x.docsPath)
permalink: /components/{{ element.slug }}/demo/index.html
---
