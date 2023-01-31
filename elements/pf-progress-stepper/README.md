# PatternFly Elements Progress Stepper

A component that gives the user a visual representation of the current state of 
their progress through an application (typically a multistep form).

Read more about Progress Stepper in the [PatternFly Elements Progress Steps 
documentation][docs].

##  Installation

Load `<pf-progress-stepper>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-progress-stepper/pf-progress-stepper.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-progress-stepper/pf-progress-stepper.js';
```

## Usage

```html
<pf-progress-stepper>
  <pf-progress-step variant="success">Completed</pf-progress-step>
  <pf-progress-step variant="warning">Issue</pf-progress-step>
  <pf-progress-step variant="danger">Failure</pf-progress-step>
  <pf-progress-step current variant="info">Running</pf-progress-step>
  <pf-progress-step>Last</pf-progress-step>
</pf-progress-stepper>
```

[docs]: https://patternflyelements.org/components/progress-stepper
