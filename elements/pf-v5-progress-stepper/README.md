# PatternFly Elements Progress Stepper

A component that gives the user a visual representation of the current state of 
their progress through an application (typically a multistep form).

Read more about Progress Stepper in the [PatternFly Elements Progress Steps 
documentation][docs].

##  Installation

Load `<pf-v5-progress-stepper>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-progress-stepper/pf-v5-progress-stepper.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-progress-stepper/pf-v5-progress-stepper.js';
```

## Usage

```html
<pf-v5-progress-stepper>
  <pf-v5-progress-step variant="success">Completed</pf-v5-progress-step>
  <pf-v5-progress-step variant="warning">Issue</pf-v5-progress-step>
  <pf-v5-progress-step variant="danger">Failure</pf-v5-progress-step>
  <pf-v5-progress-step current variant="info">Running</pf-v5-progress-step>
  <pf-v5-progress-step>Last</pf-v5-progress-step>
</pf-v5-progress-stepper>
```

[docs]: https://patternflyelements.org/components/progress-stepper
