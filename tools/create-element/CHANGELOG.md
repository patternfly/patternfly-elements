# @patternfly/create-element

## 1.0.0

### Major Changes

- 034eed047: ✨ Added `@patternfly/create-element` package. Use it with the command

  ```shell
  npm init @patternfly/element
  ```

### Patch Changes

- 5d3315fd4: Prepared release candidate

## 1.0.0-rc.1

### Patch Changes

- 5d3315fd: Prepared release candidate

## 1.0.0-next.15

### Patch Changes

- fdf12c782: Removed `@pfelement` decorator

## 1.0.0-next.14

### Patch Changes

- b51b551f: Fixed a TypeScript error in the main entrypoint

## 1.0.0-next.13

### Patch Changes

- bfad8b4b: Updates dependencies

## 1.0.0-next.12

### Patch Changes

- fce3a836: Simplify element demo templates

## 1.0.0-next.11

### Minor Changes

- f2463122: Provides the `css` option to choose the css flavour for the element
  e.g. `scss`, `css`, or `postcss`

  Also fixes templates and generator code for users in single-package repos.

## 1.0.0-next.10

### Patch Changes

- b4ac6f24: Updates dependencies

## 1.0.0-next.9

### Minor Changes

- 22464c00: Adds `--monorepo` flag to generator.
  In most cases, this is automatically derived from the root package.json.
  Override with `--monorepo` or `--no-monorepo`.

## 1.0.0-next.8

### Patch Changes

- 447b2d75: Remove `esbuild` export condition, as this anyways was a runtime error

## 1.0.0-next.7

### Patch Changes

- 7e5591c0: ship _all_ javascript files with create-element

## 1.0.0-next.6

### Major Changes

- 1c99aa06: - fix build script (ship .js to npm)
  - bump version to 1.0.0

## 0.0.2-next.5

### Patch Changes

- 56baa0ec: update components entrypoint filename
- a6253d3c: Generate the single-file bundle entrypoint at runtime

## 0.0.2-next.4

### Patch Changes

- 8c4011d4: Adds docs folder and index.md file on initial creation of a new element

## 0.0.2-next.3

### Patch Changes

- 317115f8: Update generator config file templates

## 0.0.2-next.2

### Patch Changes

- cbf0c490: Update dependencies

## 0.0.2-next.1

### Patch Changes

- 9765268c: Fix 'cannot find module' errors
- ba895249: Fixes compiler errors

## 0.0.2-next.0

### Patch Changes

- 987508db: Add publishconfig to template package.json
