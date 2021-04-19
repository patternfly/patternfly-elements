---
layout: layout-basic.html
title: Polyfills
order: 9
tags:
  - develop
packages:
  - pfe-band
---
::: section header
# Polyfills
:::

::: section
## Overview
What polyfills are currently being shipped with our components?  Check the table below for details.
:::

::: section
| Polyfill | Component | Location |
| --- | --- | --- |
{% for item in polyfills %}| {{ item.text }} | {{ item.file | remove: "elements/" | split: "/" | first }} |<a href="https://github.com/patternfly/patternfly-elements/blob/master/{{ item.file }}#L{{ item.line }}" target="_blank">{{ item.file }}#L{{ item.line }}</a> |
{% endfor %}
:::