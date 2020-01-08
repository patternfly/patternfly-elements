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


## Support

Though we have tested and verified general usability within these frameworks, PFE makes no guarantees about compatibility within specific sites & applications. Please test accordingly. For more details, check out the [official status card per component](https://github.com/patternfly/patternfly-elements/issues?q=is%3Aopen+is%3Aissue+label%3A%22status+tracking+only%22) or visit the [status page on the documentation site](https://patternfly.github.io/patternfly-elements/getting-started/component-status/). 


## Stay informed

Sign up for the for the [active project participation email list](https://www.redhat.com/mailman/listinfo/patternfly-elements-contribute) and/or the [informed email list](https://www.redhat.com/mailman/listinfo/patternfly-elements-announce).

You can also participate in discussions on [patternfly.slack.com](https://patternfly.slack.com) in the #patternfly-elements channel.

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
