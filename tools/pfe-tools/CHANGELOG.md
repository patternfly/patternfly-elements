# @patternfly/pfe-tools

## 1.0.0-next.13

### Patch Changes

- dd9b1128: Include dev server assets in the package bundle

## 1.0.0-next.12

### Minor Changes

- 9a957683: Moves development server wholly into pfe-tools, and exposes some customization properties so daughter repos can customize the page

## 1.0.0-next.11

### Minor Changes

- 6c39715c: Automatically replaces `process.env.NODE_ENV` with `production` both in the development server and in the production bundles.

### Patch Changes

- f1e4d5a9: Correctly resolve all node_modules sources in dev server

## 1.0.0-next.10

### Major Changes

- 447b2d75: Remove support for custom `esbuild` export condition

  Previously, the dev-server config would try to import typescript sources using
  the `esbuild` export condition, but this proved awkward when daughter repos
  would try to import the same packages by the esbuild condition, only to
  discover that there was no typescript source file because it was compiled away
  before hitting NPM

  Therefore, removed export conditions entirely and now rely on a hacky mod to
  the built-in web dev server node-resolution algorithm

  In our tests, this appeared to work in both primary cases:

  1. Developing local packages in `patternfly/patternfly-elements`
  2. Developing local packages in a 'daughter' repo which installed
     `@patternfly/pfe-tools`

  If you find that you're getting 404 errors to modules you're sure exist, or
  other such weird behaviour when resolving js sources from your monorepo, please
  open a [new
  issue](https://github.com/patternfly/patternfly-elements/issues/new/choose)

### Patch Changes

- f26d5ab5: fail gracefully when dev server can't find workspace packages
- f71bfa9c: update dependencies

## 0.1.0-next.9

### Patch Changes

- b5d40799: try to guess repository root dir when computing dev server config

## 0.1.0-next.8

### Minor Changes

- f726d147: Add `reporter` option to test runner config factory

## 0.1.0-next.7

### Patch Changes

- d9df3236: Update dependencies

## 0.1.0-next.6

### Patch Changes

- 0f235f7e: Update documentation

## 0.1.0-next.5

### Patch Changes

- 049aaca6: Update dependencies

## 0.1.0-next.4

### Minor Changes

- cd6ca2f0: minify lit-html template literals in builds

### Patch Changes

- a6253d3c: Generate the single-file bundle entrypoint at runtime

## 0.1.0-next.3

### Minor Changes

- cfd010ff: add `singleFileBuild` to esbuild helpers

## 0.1.0-next.2

### Patch Changes

- cbf0c490: Update dependencies

## 0.1.0-next.1

### Minor Changes

- a1da0422: export `transformSass` helper from esbuild.js

## 0.0.2-next.0

### Patch Changes

- 9765268c: Ship built files instead of sources
