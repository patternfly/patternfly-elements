# PatternFly Elements Progress Steps
     
A component that gives the user a visual representation of the current state of their progress through an application (typically a multistep form).

Read more about Progress Steps in the [PatternFly Elements Progress Steps documentation](https://patternflyelements.org/components/progress-steps)

##  Installation

Load `<pfe-progress-steps>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-progress-steps?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-progress-steps
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-progress-steps';
```

## Usage

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

