# PatternFly Elements [![Build Status](https://travis-ci.org/patternfly/patternfly-elements.svg?branch=master)](https://travis-ci.org/patternfly/patternfly-elements)

## Table of Contents

1. [Getting started][getting-started]
2. [Element catalog][catalog]
3. [Creating components][creating]
4. [Theming components][theming]

[PatternFly Elements][pfe-home] is a collection of flexible and lightweight [Web Components][wc-org], and the tools to build them. PatternFly Elements are:

- **Lightweight**: small file size, minimal boilerplate, no "framework-like" features.
- **Universal**: write once, use everywhere. PatternFly Elements work in React, Vue, Angular, vanilla JS, anywhere HTML elements are used.
- **Themable**: Make overrides as needed via attributes or CSS variables

The result of these principles is that you can plug one set of components into a wide variety of applications; bringing UX consistency and developer familiarity to any web project.

A Yeoman generator is included for creating Web Components that meets these goals.

## Quick start

    git clone git@github.com:patternfly/patternfly-elements.git
    cd patternfly-elements
    npm install # this will take a while due to lerna bootstrap
    npm run storybook

The storybook script will launch the interactive demo pages.

_Note: You will need to use [Node](https://nodejs.org/en/) v.7 or higher._


## SUPPORT

**PFE component** | **web** | **angular** | **react** | **vue**
-----                    |----|-----|-----|----|
pfe-accordion            | yes| yes | yes | yes
pfe-autocomplete         | yes| no  | yes | yes
pfe-avatar               | yes| yes | yes | yes
pfe-band                 | yes| yes | yes | yes
pfe-card                 | yes| yes | yes | yes
pfe-collapse             | yes| yes | yes | yes
pfe-content-set          | yes| no  | yes | yes
pfe-cta                  | yes| yes | yes | yes
pfe-datetime             | yes| no  | yes | yes
pfe-health-index         | yes| yes | yes | yes
pfe-icon                 | yes| yes | yes | yes
pfe-icon-panel           | yes| yes | yes | yes
pfe-layouts              | yes| yes | yes | yes
pfe-markdown             | yes| yes | yes | yes
pfe-modal                | yes| yes | yes | yes
pfe-navigation           | yes| yes | yes | yes
pfe-number               | yes| no  | yes | yes
pfe-page-status          | yes| yes | yes | yes
pfe-progress-indicator   | yes| yes | yes | yes
pfe-sass                 | yes| yes | yes | yes
pfe-tabs                 | yes| yes | yes | yes
---

[home][pfe-home] |
[start][getting-started] |
[develop][creating] |
[theming][theming] |
[storybook][catalog] |
[web components][wc-org]


[pfe-home]: https://patternfly.github.io/patternfly-elements
[getting-started]: https://patternfly.github.io/patternfly-elements/getting-started
[catalog]: https://patternfly.github.io/patternfly-elements/demo
[creating]: https://patternfly.github.io/patternfly-elements/develop
[theming]: https://patternfly.github.io/patternfly-elements/theme
[wc-org]: https://webcomponents.org
