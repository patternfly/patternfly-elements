# Dropdown

A dropdown presents a menu of actions or links in a constrained space that will 
trigger a process or navigate to a new location.

Read more about dropdown in the [PatternFly Elements Dropdown 
documentation](https://patternflyelements.org/components/dropdown)

##  Installation

Load `<pf-dropdown>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-dropdown/pf-dropdown.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-dropdown/pf-dropdown.js';
```

## Usage

```html
<pf-dropdown>
    <pf-dropdown-item>item4</pf-dropdown-item>
    <hr>
    <pf-dropdown-group label="Group 1">
        <pf-dropdown-item>item1</pf-dropdown-item>
        <pf-dropdown-item>item2</pf-dropdown-item>
        <hr>
        <pf-dropdown-item>item3</pf-dropdown-item>
    </pf-dropdown-group>
    <pf-dropdown-group label="Group 2">
        <pf-dropdown-item>item1</pf-dropdown-item>
        <pf-dropdown-item >item2</pf-dropdown-item>
    </pf-dropdown-group>
</pf-dropdown>
```
