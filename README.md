# PatternFly Elements 

 [![latest version](https://img.shields.io/github/package-json/v/patternfly/patternfly-elements?filename=elements%2Fpackage.json)](https://github.com/patternfly/patternfly-elements/releases) [![contributors](https://img.shields.io/github/contributors/patternfly/patternfly-elements?color=%2306c)](https://github.com/patternfly/patternfly-elements/graphs/contributors) \
 \
  ![build status](https://img.shields.io/github/actions/workflow/status/patternfly/patternfly-elements/tests.yml)
 ![last commit](https://img.shields.io/github/last-commit/patternfly/patternfly-elements?color=%2306c) [![Netlify status](https://api.netlify.com/api/v1/badges/bf40e3e7-4f98-4088-91d9-112dbe8a1872/deploy-status?branch=main)](https://patternflyelements.com)

## Table of Contents

1. [Getting started][getting-started]
2. [Element catalog][catalog]
3. [Creating components][creating]
4. [Theming components][theming]

[PatternFly Elements][home] is a work-in-progress collection of flexible and lightweight Web Components based on the Unified Design Kit. The repo also includes a generator to build new components. PatternFly Elements are:

- **Lightweight**: small file size, minimal boilerplate, no "framework-like" features.
- **Universal**: write once, use everywhere. PatternFly Elements work in React, Vue, Angular, vanilla JS, anywhere HTML elements are used.
- **Themable**: Make overrides as needed via attributes or CSS variables

The result of these principles is that you can plug one set of components into a wide variety of applications; bringing UX consistency and developer familiarity to any web project.

A generator is included for creating web components that meet these goals.

## Quick start
```
git clone git@github.com:patternfly/patternfly-elements.git
cd patternfly-elements
npm ci # install dependencies.
npm run start
```

### Additional dependencies

#### nvm

Building PatternFly Elements requires specific versions of Node.js.  To automate usage of the correct version, it is recommended that contributors install [nvm](https://github.com/nvm-sh/nvm#readme) as well an automatic version switcher like [avn](https://github.com/wbyoung/avn) or [shell-specific nvm integration](https://github.com/nvm-sh/nvm#deeper-shell-integration).  With those installed, your terminal will automatically switch to the correct Node.js version when you `cd` into the PatternFly Elements repository.

## Command Line Helper Scripts
Many commands have an optional argument of space-separated component name(s), if left off it will assume it should run on all components. These should run from the project root.

### Compile

```shell
# Build all components
npm run build
```

### Preview

Runs development server.

```shell
npm start
```

### Testing

#### ✨ Test using ([Web Test Runner](https://modern-web.dev/docs/test-runner/overview/))

```shell
# Run default test group in watch mode.
npm run test:watch

# Run a single test in watch mode.
npm run test:watch -- --files elements/pf-accordion/test/pf-accordion.spec.ts

# Or multiple:
npm run test:watch -- --files 'elements/pf-{select,card}/test/*.spec.ts'

# Run all tests excluding react and vue tests.
npm run test:watch

# Run all tests with and without React and Vue wrappers.
# This is run on pull request within CI.
npm run test:ci
```

### Development and Documentation servers
```shell
# Development and documentation servers load simultaneously on localhost:port `:8000` and `:8080` respectively.
npm run start
```

## Support

Though we have tested and verified general usability within these frameworks, PatternFly Elements makes no guarantees about compatibility within specific sites and applications. Please test accordingly.


## Stay informed

Sign up for the for the [active project participation email list](https://www.redhat.com/mailman/listinfo/patternfly-elements-contribute) and/or the [informed email list](https://www.redhat.com/mailman/listinfo/patternfly-elements-announce).

You can also participate in discussions on [patternfly.slack.com](https://patternfly.slack.com) in the #patternfly-elements channel.

---

[home][home] |
[start][getting-started] |
[develop][creating] |
[theming][theming] |
[catalog] |
[web components][wc-org]


[home]: https://patternflyelements.org
[getting-started]: https://patternflyelements.org/get-started
[catalog]: https://patternflyelements.org/components
[creating]: https://patternflyelements.org/docs/develop/create/
[theming]: https://patternflyelements.org/theming/
[wc-org]: https://webcomponents.org

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier) [![tested with webdriver.io](https://img.shields.io/badge/tested%20with-webdriver.io-%23ea5906)](https://webdriver.io/)
