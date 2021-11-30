---
layout: layout-demo.njk
pagination:
  data: elements
  size: 1
  alias: element
  before: xs => xs.filter(x => !!x.docsPath)
permalink: /{{ element.category }}/{{ element.slug }}/demo/index.html
---
