---
layout: layout-blog.njk
title: PatternFly Elements 2.0 Preview
tagline: Migrating PFE to LitElement
tags:
  - blog
---

Following two months of effort we're happy to announce the next major version of PatternFly elements
is now available in prerelease. PatternFly Elements 2.0 migrates our existing component set to
**Lit** and **TypeScript**, simplifies and speeds up the build toolchain, improves the developer
experience, and improves the documentation with generated element manifests. In this post, we'll
explore the changes in detail, but first we should review what our goals were.

## Goals

The goals of this project were up with two terms: **UX** (User Experience) and **DX** (Developer
Experience). We wanted to improve both without damaging either. The changes made during this effort
worked towards supporting either or both of these goals.

From a technical / engineering perspective, there were two major goals going into this project:
1. Adopt LitElement to improve maintainability
2. Package up our toolchain for external projects to use

LitElement was important to us so that we could focus on our design system instead of maintaining a
custom element base class and attendant custom build tooling. Along with LitElement, we also chose
to adopt TypeScript to make development at scale more consistent and clear.

Our goal in packaging build tooling was to make web components development more enticing for teams
that do not work primarily within the NPM ecosystem.

### Non-Goals

Going in to the migration, we had lots of ideas for improving and changing components. We tried hard
to make all our API changes backwards-compatible, i.e. to deprecate unwanted APIs without removing
them. We also chose to defer most of the larger API changes to subsequent PRs, in a (perhaps vain)
attempt to limit the scope.

### Handling a Giant PR

Perhaps foolishly, but perhaps unavoidably as well, we combined all of these changes into one
massive, long-lived feature branch. This raised a number of difficulties, like how to do code review
on a GitHub PR with 1300+ changed files (GitHub won't even display that many changes). The solution
that we settled into involved regular rebases to combine per-package changes into single commits, so
for example, all the changes for `<pfe-card>` were concentrated in a single commit labelled
`feat(card)!: migrate to lit`, with smaller changes listed in the commit body. 

This isn't a great way-of-working. Force-pushing to feature branches should generally be
discouraged, and rebasing large branches can be frought. Although we did manage the transition this
way competently, we can't recommend this approach to every team or any circumstance.

With that preamble behind us, let's take a look at the changes we've made.

## User-Facing Changes

### Renamed slots and attributes

> **Gains**: Simplified markup, web components best-practices

PFE 1 used slots names and attributes with prefixes like `pfe-card--header`. In PFE 2 we simplified
names like that to `header`. This is in line with web components community best practices and
conventions and simplifies element APIs, amking them easier to use. The old slots will still work,
until the next major version, so upgrading should be smooth.

### Renamed events and deprecated `CustomEvent`

> **Gains**: API surface, semantics, stricter types

`CustomEvent` is a throwback to a time when the spec did not allow us to subclass `Event`. Now that
we can, we can prefer to define our own event classes. This lets us validate event's data at run
time, use instanceof to validate them in listeners, and generally improve API readability. Events
are still composed, so analytics code should be able to pick them up.

As well, events like `pfe-clipboard:copied` are renamed (in their new form) to `copied`, for
simplicity, and framework compatibility.

The old CustomEvent-based events are still used, under their old names, until the next version, to
aid in migration

### Removed `<pfe-navigation>` and `<pfe-content-set>`

The decision was taken to move `<pfe-navigation>` `<pfe-content-set>` downstream to Red Hat's design
system. This frees up PFE to concentrate on lower-level components

## Developer-Facing Changes

Most of the action in this change should be more-or-less invisible to end users, and mostly has to
do with how we write components internally.

### Adopting Lit

> **Gains**: maintainability, performance, complexity

Version 1 of PFE used a custom `PFElement` base class, which implemented a wide variety of features,
some related to DOM templating and component lifecycle, others related to analytics, still more
related to [colour context](theming/colors/#contextually-aware-content). `PFElement` served us well,
but the time came to move on. The DOM templating and component lifecycle features are the main
reason we're switching to Lit - they are well maintained there, so removing that code from PFE frees
us up to 'move up the stack' and focus on UI problems. Other features like colour context, analytics
events, etc, could therefore be replaced by [reactive
controllers](https://lit.dev/docs/composition/controllers/) and [typescript
decorators](https://www.typescriptlang.org/docs/handbook/decorators.html), allowing component
authors to add them to elements a la carte. This will result in smaller javascript payloads for some
pages

### Adopt TypeScript

> **Gains**: code correctness, API documentation, developer ergonomics

TypeScript allows us to find and eliminate bugs before they hit production. In the process of
converting components, several of these types of problems were identified and ameliorated.
TypeScript also lets us develop faster and with confidence, as the objects in our project and their
behaviour are now are well-defined. As well, adopting TypeScript is an a11y feature for
contributors, as the IDE features of ts language server let them access information about the
objects 'under their cursor' faster, without having to page back and forth between docs (as much) 

### Adopt Custom Elements Manifest

> **Gains**: standards, complexity, bundle size, tooling

This PR removes the custom manifest schema developed for PFE in favour of the [custom elements
manifest](https://github.com/webcomponents/custom-elements-manifest/), a community standard for
documenting javascript packages, particularly geared to web components. By documenting our
components in the manifest, tooling such as docs-site generators and IDEs will be able to understand
the contents of our components and their abilities without requiring us to ship that code over the
wire to end users. 

In particular, our 11ty docs site now uses the generated manifests to generate docs pages.

### Adopt a 'buildless' development workflow

> **Gains**: Developer's time

Contributors no longer need to keep a file watcher to re-compile components when working on
elements. Instead, source files (typescript and sass) are compiled on-the-fly by the dev server.
Just install dependencies and run `npm start`

### Adopt Playwright for E2E and visual regression tests

### Update to `dart-sass`

> **Gains**: build performance, language features, security

`node-sass` is deprecated. Updating to dart-sass improved performance and made new language features
available.

### Rewrite the element generator

> **Gains**: fewer dependencies

Removed the dependency on yeoman and rewrote the element generator to generate LitElements for PFE.
once published, contributors will be able to `npm init @patternfly/element`

### Add `@patternfly/pfe-tools`

> **Gains**: Simplify root repository, unblock template repo

Users wishing to develop their own set of elements based on patternfly will be able to clone a
template repo and import tooling helpers from `@patternfly/pfe-tools`. This will include things like
- dev server and testing configuration build scripts and config custom-elements manifest analyzer
- config

### Add Linting Rules

> **Gains**: code standards, readability, consistency

This PR adds eslint rules for PFE. It's recommended to install an ESLint plugin for your editor and
enable "fix on save"

### Add Lighthouse Testing in CI

> **Gains**: performance and a11y visibility

PRs will now be tested using lighthouse against each element's demo page and the results formatted
and printed to the PR thread

### Commitlint Reporting

> **Gains**: repo consistency

Commitlint errors and warnings will now be reported to the PR thread. 

## What's Next for PatternFly elements?
We have a lot of (dare I say) exciting plans for this project going forward that we'd itching to
share with you, but until then, and while we're in pre-release, it's best to keep a few things in
mind:

1. The APIs in pfe-core and some of the components aren't 100% stable yet, so if you're planning to
  build something based on our tools and library, subscribe to releases and read the changelogs 
  carefully
2. We're eager to receive feedback on the tools and libraries we've developed for this release. 
  Think we could have named something better? Have an idea for a controller or library function?
  Can't escape your drive to refactor? Send us an
  [issue](https://github.com/patternfly/patternfly-elements/issues/new/choose)

We have a lot more ideas to share with you in the near future, so stay tuned.

In the mean time, enjoy the PatternFly Elements 2.0 release!


