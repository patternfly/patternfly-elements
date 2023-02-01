# @patternfly/pfe-tooltip

## 2.0.0-next.9

### Patch Changes

- 457eaa9d0: `pfe-tools`: Set typescript compilerOptions `composite: true`

  `pfe-tooltip`: Added return type for anonymous function for content in constructor

- Updated dependencies [82da44c11]
  - @patternfly/pfe-core@2.0.0-next.14

## 2.0.0-next.8

### Major Changes

- b841afe40: `<pfe-tooltip>`:

  - updated `FloatingDOMController`
  - removed `offset` attribute
  - added `content` attribute
  - simplified DOM and CSS

### Patch Changes

- Updated dependencies [b841afe40]
- Updated dependencies [0fe6c52db]
- Updated dependencies [0fe6c52db]
  - @patternfly/pfe-core@2.0.0-next.13

## 1.1.0-next.7

### Patch Changes

- b51b551f: Use `NumberListConverter` from pfe-core
- Updated dependencies [6b6e2617]
  - @patternfly/pfe-core@2.0.0-next.12

## 1.1.0-next.6

### Minor Changes

- daba8a53: Adds styles to slotted timestamps.

  ```html
  <pfe-tooltip position="top">
    <pfe-timestamp
      date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"
    ></pfe-timestamp>
    <span slot="content"
      >Last updated on
      <pfe-timestamp
        date="Tue Aug 09 2022 14:57:00 GMT-0400 (Eastern Daylight Time)"
        date-format="long"
        time-format="short"
        display-suffix="UTC"
        utc
      >
      </pfe-timestamp>
    </span>
  </pfe-tooltip>
  ```

## 1.1.0-next.5

### Patch Changes

- 07ad1d3d: Updates use of `<pfe-icon>`
- Updated dependencies [07ad1d3d]
  - @patternfly/pfe-core@2.0.0-next.10

## 1.1.0-next.4

### Minor Changes

- 166ecee1: Improves performance of floating DOM (tooltip) by lazily initializing

### Patch Changes

- 0b90b899: Null check in tooltip's `show()` method
- Updated dependencies [166ecee1]
  - @patternfly/pfe-core@2.0.0-next.9

## 1.1.0-next.3

### Patch Changes

- bfad8b4b: Updates dependencies
- Updated dependencies [bfad8b4b]
  - @patternfly/pfe-core@2.0.0-next.8

## 1.1.0-next.2

### Patch Changes

- f25258e9: Updating the README.md, fixing an scss variable found in pfe-tooltip for the background color.

## 1.1.0-next.1

### Patch Changes

- b5fe1d3e: Use popper version from pfe-core

## 1.1.0-next.0

### Minor Changes

- 7c9b85cc: Adding `pfe-tooltip`

  ```html
  <pfe-tooltip position="left">
    <pfe-button><button>Left Tooltip</button></pfe-button>
    <span slot="content"
      >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Mi eget mauris
      pharetra et ultrices.</span
    >
  </pfe-tooltip>
  ```

### Patch Changes

- Updated dependencies [7c9b85cc]
  - @patternfly/pfe-core@2.0.0-next.7
