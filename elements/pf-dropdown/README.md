# Dropdown

A dropdown presents a menu of actions or links in a constrained space that will trigger a process or navigate to a new location.

Read more about dropdown in the [PatternFly Elements Dropdown documentation](https://patternflyelements.org/components/dropdown)

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

### Default Trigger element

```html
<pf-dropdown id="dropdownDefaultTrigger">
    <pf-dropdown-item value="value4">item4</pf-dropdown-item>
    <pf-dropdown-item divider></pf-dropdown-item>
    <pf-dropdown-items-group label="Group 1">
        <pf-dropdown-item value="value1">item1</pf-dropdown-item>
        <pf-dropdown-item value="value2">item2</pf-dropdown-item>
        <pf-dropdown-item divider></pf-dropdown-item>
        <pf-dropdown-item value="value3">item3</pf-dropdown-item>
    </pf-dropdown-items-group>
    <pf-dropdown-items-group label="Group 2">
        <pf-dropdown-item value="value1">item1</pf-dropdown-item>
        <pf-dropdown-item  value="value2">item2</pf-dropdown-item>
    </pf-dropdown-items-group>
</pf-dropdown>
```

### Custom Trigger element

```html
<pf-dropdown id="dropdownCustomTrigger">
    <pf-button slot="trigger">Toggle dropdown</pf-button>
    <pf-dropdown-item value="value4">item4</pf-dropdown-item>
    <pf-dropdown-item divider></pf-dropdown-item>
    <pf-dropdown-items-group label="Group 1">
        <pf-dropdown-item value="value1">item1</pf-dropdown-item>
        <pf-dropdown-item value="value2">item2</pf-dropdown-item>
        <pf-dropdown-item divider></pf-dropdown-item>
        <pf-dropdown-item value="value3">item3</pf-dropdown-item>
    </pf-dropdown-items-group>
    <pf-dropdown-items-group label="Group 2">
        <pf-dropdown-item value="value1">item1</pf-dropdown-item>
        <pf-dropdown-item  value="value2">item2</pf-dropdown-item>
        <pf-dropdown-item  value="value3">item3</pf-dropdown-item>
        <pf-dropdown-item disabled value="disabled">disabled</pf-dropdown-item>
    </pf-dropdown-items-group>
</pf-dropdown>
```
