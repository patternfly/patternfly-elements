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

{% band %}
| Description | Location |
| --- | --- |
{% for item in todos %}| {{ item.text }} | <a href="https://github.com/patternfly/patternfly-elements/blob/master/{{ item.file }}#L{{ item.line }}" target="_blank">{{ item.file }}#L{{ item.line }}</a> |
{% endfor %}
{% endband %}
