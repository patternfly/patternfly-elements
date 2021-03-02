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
npm run storybook
```

The storybook script will launch the interactive demo pages.

### Additional dependencies
If you will be doing any release work, it is recommended that you install Hub.

To install on a MacOS: `brew install hub`.

For other systems, please see documentation:
    - [Hub](https://hub.github.com/)

_Note: You will need to use [Node](https://nodejs.org/en/) v10 or higher._

## Command Line Helper Scripts
Many commands have an optional argument of space-separated component name(s), if left off it will assume it should run on all components. These should run from the project root.

### Compile

```shell
# Build and watch all components, run the server to preview demo pages
npm run dev

# Build and watch on one or more components, run the server to preview demo pages
npm run dev [component-name(s)]
```

### Preview

```shell
# Runs server process to preview files
npm start

# Runs storybook preview tool
npm run storybook
```

### Compile & Preview

```shell
# Runs build and server (but doesn't watch)
npm run demo [component-name(s)]

# Runs build, watch, and server processes, both demo pages and storybook
npm run live-demo [component-name(s)]
```

### Testing

```shell
# Build and run tests on all components
npm run test

# Build and run tests on one component
npm run test [component-name(s)]
```

### Open a new pull request

```shell
# Open a new pull request
npm run pr
```

### Documentation site
Make sure you install the documentation site dependencies first.
```shell
cd docs && npm install
```

View the documentation locally
```shell
cd docs && npm start
```

Build the documentation site
```shell
npm run build-docs
```

## Support

Though we have tested and verified general usability within these frameworks, PFE makes no guarantees about compatibility within specific sites & applications. Please test accordingly. For more details, check out the [official status card per component](https://github.com/patternfly/patternfly-elements/issues?q=is%3Aopen+is%3Aissue+label%3A%22status+tracking+only%22).


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


[pfe-home]: https://patternflyelements.org
[getting-started]: https://patternflyelements.org/get-started
[catalog]: https://patternflyelements.org/components
[creating]: https://patternflyelements.org/docs/develop/create/
[theming]: https://patternflyelements.org/theming/
[wc-org]: https://webcomponents.org

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) ![Dependabot](https://api.dependabot.com/badges/status?host=github&repo=patternfly/patternfly-elements)