---
layout: layout-docs.njk
title: To-do items
order: 10
tags:
  - develop
packages:
  - pfe-markdown
---

## Overview
The items below represent in-code `// @TODO` notes we have left for ourselves to ensure updates are made later on when we have more time.

{%- band %}

<table>
  <thead>
    <tr><th>Description</th><th>Location</th></tr>
  </thead>
  <tbody>{%- for item in todos -%}
    <tr>
      <td>{{ item.text }}</td>
      <td>
        <a href="https://github.com/patternfly/patternfly-elements/blob/master/{{ item.file }}#L{{ item.line }}" target="_blank">{{ item.file }}:{{ item.line }}</a>
      </td>
    </tr> {%- endfor -%}
  </tbody>
</table>

{% endband -%}
