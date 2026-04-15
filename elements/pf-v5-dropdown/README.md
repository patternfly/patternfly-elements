# Dropdown

A dropdown presents a menu of actions or links in a constrained space that will 
trigger a process or navigate to a new location.

Read more about dropdown in the [PatternFly Elements Dropdown 
documentation](https://patternflyelements.org/components/dropdown)

##  Installation

Load `<pf-v5-dropdown>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-v5-dropdown/pf-v5-dropdown.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-v5-dropdown/pf-v5-dropdown.js';
```

## Usage

```html
<pf-v5-dropdown>
    <pf-v5-dropdown-item>item4</pf-v5-dropdown-item>
    <hr>
    <pf-v5-dropdown-group label="Group 1">
        <pf-v5-dropdown-item>item1</pf-v5-dropdown-item>
        <pf-v5-dropdown-item>item2</pf-v5-dropdown-item>
        <hr>
        <pf-v5-dropdown-item>item3</pf-v5-dropdown-item>
    </pf-v5-dropdown-group>
    <pf-v5-dropdown-group label="Group 2">
        <pf-v5-dropdown-item>item1</pf-v5-dropdown-item>
        <pf-v5-dropdown-item >item2</pf-v5-dropdown-item>
    </pf-v5-dropdown-group>
</pf-v5-dropdown>
```
