# PatternFly Elements ![build status](https://img.shields.io/github/workflow/status/patternfly/patternfly-elements/Build%20&%20test/master) ![commit](https://badgen.net/github/last-commit/patternfly/patternfly-elements) ![latest version](https://img.shields.io/github/lerna-json/v/patternfly/patternfly-elements?label=version) ![contributors](https://img.shields.io/github/contributors/patternfly/patternfly-elements)

## Table of Contents

1. [Getting started][getting-started]
2. [Element catalog][catalog]
3. [Creating components][creating]
4. [Theming components][theming]

[PatternFly Elements][pfe-home] is a work-in-progress collection of flexible and lightweight Web Components based on the Unified Design Kit. The repo also includes a generator to build new components. PatternFly Elements are:

- **Lightweight**: small file size, minimal boilerplate, no "framework-like" features.
- **Universal**: write once, use everywhere. PatternFly Elements work in React, Vue, Angular, vanilla JS, anywhere HTML elements are used.
- **Themable**: Make overrides as needed via attributes or CSS variables

The result of these principles is that you can plug one set of components into a wide variety of applications; bringing UX consistency and developer familiarity to any web project.

A Yeoman generator is included for creating web components that meet these goals.

## Quick start
```
git clone git@github.com:patternfly/patternfly-elements.git
cd patternfly-elements
npm install # this will take a while due to lerna bootstrap
npm run build
npm run storybook
```

The storybook script will launch the interactive demo pages.

### Additional dependencies
If you will be doing any release work, it is recommended that you install Hugo and Hub.

To install on a MacOS: `brew install hugo hub`.

For other systems, please see documentation:
    - [Hub](https://hub.github.com/)
    - [Hugo](https://gohugo.io/getting-started/quick-start/)

_Note: You will need to use [Node](https://nodejs.org/en/) v.7 or higher._

## Command Line Helper Scripts
Many commands have an optional argument of space-separated component name(s), if left off it will assume it should run on all components. These should run from the project root.

### Compile

```shell
# Build all components
npm run build

# Build one or more components
npm run build [component-name(s)]
```

The build command can accept a few flags; for more details, use `npm run build -- --help`.

### Preview

```shell
# Runs server process to preview files (does not build)
npm start

# Builds, sets up the watch, and runs server process to preview files
npm run dev

# Runs storybook preview tool
npm run storybook

# Open documentation
npm run docs
```

### Testing

```shell
# Build and run tests on all components
npm run test

# Build and run tests on one component
npm run test [component-name(s)]

# Run tests on one component without rebuilding
npm run test [component-name(s)] -- --nobuild
```

The test command can accept a flags; for more details, use `npm run test -- --help`.

### Open a new pull request

```shell
# Open a new pull request
npm run pr
```

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

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) ![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=patternfly/patternfly-elements)
