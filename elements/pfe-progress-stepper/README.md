# PatternFly Elements Progress Stepper

A component that gives the user a visual representation of the current state of 
their progress through an application (typically a multistep form).

Read more about Progress Stepper in the [PatternFly Elements Progress Steps 
documentation][docs].

##  Installation

Load `<pfe-progress-stepper>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pfe-progress-stepper/pfe-progress-stepper.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pfe-progress-stepper/pfe-progress-stepper.js';
```

## Usage

```html
<pfe-progress-stepper>
  <pfe-progress-step variant="success">Completed</pfe-progress-step>
  <pfe-progress-step variant="warning">Issue</pfe-progress-step>
  <pfe-progress-step variant="danger">Failure</pfe-progress-step>
  <pfe-progress-step current variant="info">Running</pfe-progress-step>
  <pfe-progress-step>Last</pfe-progress-step>
</pfe-progress-stepper>
```

[docs]: https://patternflyelements.org/components/progress-stepper
