# PatternFly Element | Progress stepper element
A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form).

## Usage
Describe how best to use this web component along with best practices.

```html
  <pfe-progress-steps>
    <pfe-progress-steps-item state="active" current>
      <div slot="title">Current</div>
      <a slot="link" href="#">View current step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Next</div>
      <a slot="link" href="#">View next step</a>
    </pfe-progress-steps-item>
    <pfe-progress-steps-item>
      <div slot="title">Last</div>
      <a slot="link" href="#">View last step</a>
    </pfe-progress-steps-item>
  </pfe-progress-steps>
```

### Accessibility
Explain how this component meets accessibility standards.

## Slots

- `namedSlot`: Describe each available slot and best practices around what markup it can contain.

## Attributes

- `attr`: Describe each available attribute and what function is serves.

## Variable hooks

Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-progress-steps__item--Width` | var(--pfe-theme--ui--element--size--lg, 75px) | item |
| `--pfe-progress-steps__circle--Size` | var(--pfe-theme--ui--element--size--md, 32px) | circle |
| `--pfe-progress-steps__progress-bar--Color` | var(--pfe-theme--color--ui--border--lighter, #d2d2d2) | progress |
| `--pfe-progress-steps__progress-bar--Fill` | var(--pfe-theme--color--ui-accent, #06c) | progress |
| `--pfe-progress-steps__progress-bar--Width` | var(--pfe-theme--ui--border-width--md, 2px) | progress |
| --- | --- | --- |
| `--pfe-progress-steps-item--Width` | auto |  |
| `--pfe-progress-steps-item--MinHeight--vertical` | var(--pfe-progress-steps__item--Width, var(--pfe-theme--ui--element--size--lg, 75px)) |  |
| `--pfe-progress-steps-item__circle--Size` | var(--pfe-theme--ui--element--size--md, 32px) | circle |
| `--pfe-progress-steps-item__circle--Color` | var(--pfe-theme--color--feedback--info, #06c) | circle |
| `--pfe-progress-steps-item__circle--Color--hover` | var(--pfe-theme--color--feedback--info, #06c) | circle |
| `--pfe-progress-steps-item__circle--Color--focus` | var(--pfe-theme--color--feedback--info, #06c) | circle |
| `--pfe-progress-steps-item__circle--Background` | radial-gradient(circle, white 60%, rgba(255, 255, 255, 0) 61%) | circle |
| `--pfe-progress-steps-item__circle--Width` | var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) | circle |
| `--pfe-progress-steps-item__circle--Height` | var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) | circle |
| `--pfe-progress-steps-item__circle-wrapper--Width` | var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |
| `--pfe-progress-steps-item__circle-wrapper--Height` | var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |
| `--pfe-progress-steps-item__title--Color` | var(--pfe-theme--color--text, #151515) | title |
| `--pfe-progress-steps-item__title--Color--active` | var(--pfe-theme--color--feedback--info, #06c) | title |
| `--pfe-progress-steps-item__title--Color--error` | var(--pfe-theme--color--feedback--critical--lighter, #c9190b) | title |
| `--pfe-progress-steps-item__title--MarginTop--vertical` | calc( var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px)) / 6) | title |
| `--pfe-progress-steps-item__description--Color` | var(--pfe-theme--color--text--muted, #6a6e73) | description |
| `--pfe-progress-steps-item__description--Color--error` | var(--pfe-theme--color--feedback--critical--lighter, #c9190b) | description |
| `--pfe-progress-steps-item--spacer` | var(--pfe-theme--content-spacer--body--sm, 0.5rem) |  |
| `--pfe-progress-steps-item__circle-inner--Width` | calc( var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) / 2.2) | circle |
| `--pfe-progress-steps-item__circle-inner--Height` | calc( var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) / 2.2) | circle |
| `--pfe-progress-steps-item__circle-outer--Width` | var(--pfe-progress-steps-item__circle--Width, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |
| `--pfe-progress-steps-item__circle-outer--Height` | var(--pfe-progress-steps-item__circle--Height, var(--pfe-progress-steps-item__circle--Size, var(--pfe-theme--ui--element--size--md, 32px))) | circle |

## Events
Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.


## Dependencies
Describe any dependent elements or libraries here too.

## Dev

    `npm start`

## Test

    `npm run test`

## Build

    `npm run build`

## Demo

From the PFElements root directory, run:

    `npm run demo`

## Code style

Progress stepper (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
