---
layout: layout-basic.njk
tags: ['component']
permalink: "/{{ element.category }}/{{ element.slug }}/index.html"
package: "{{ element.package }}"
description: "{{ element.description }}"
pagination:
  data: elements
  size: 1
  alias: element
  before: xs => xs.filter(x => !!x.docsPath)
---
{%- renderFile element.docsPath, element -%}
