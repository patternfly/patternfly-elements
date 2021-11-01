# PatternFly Elements Dropdown
         
This element will provide a dropdown menu of links and/or actions. It's comprised of one sub-component, `pfe-dropdown-item` , which denotes an item in the dropdown menu. 

Read more about Dropdown in the [PatternFly Elements Dropdown documentation](https://patternflyelements.org/components/dropdown)

##  Installation

Load `<pfe-dropdown>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-dropdown?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-dropdown
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-dropdown';
```

## Usage

``` html
<pfe-dropdown label="Dropdown">
  <pfe-dropdown-item item-type="link">
    <a href="https://bit.ly/3b9wvWg">Link 1</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="link">
    <a href="https://bit.ly/3b9wvWg">Link 2</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="link" disabled>
    <a href="https://bit.ly/3b9wvWg">Link 2</a>
  </pfe-dropdown-item>
  <pfe-dropdown-item item-type="separator"></pfe-dropdown-item>
  <pfe-dropdown-item item-type="action">
    <button>Action 1</button>
  </pfe-dropdown-item>
</pfe-dropdown>
```

You can also provide a list of dropdown items dynamically: 

``` js
const dropdown = document.querySelector("pfe-dropdown");
dropdown.options = [
    {
        href: "https://bit.ly/3b9wvWg",
        text: "Link 1",
        type: "link",
        disabled: false
    },
    {
        href: "https://bit.ly/3b9wvWg",
        text: "Link 2",
        type: "link",
        disabled: false
    },
    {
        href: "https://bit.ly/3b9wvWg",
        text: "Link 3",
        type: "link",
        disabled: true
    },
    {
        type: "separator"
    },
    {
        text: "Action 1",
        type: "action",
        disabled: false
    },
    {
        text: "Action 2",
        type: "action",
        disabled: true
    }
];
```

Or you can add individual dropdown items with the `addDropdownOptions` method. Pass an array of pfe-dropdown-item objects to `addDropdownOptions` . 

``` js
await dropdown.updateComplete;
dropdown.addDropdownOptions([{
    href: "https://bit.ly/3b9wvWg",
    text: "Link 4",
    type: "link",
    disabled: false
}]);
```

