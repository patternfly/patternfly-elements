# PatternFly Element | Dropdown Element

This element will provide a dropdown menu of links and/or actions. It's comprised of one sub-component, `pfe-dropdown-item` , which denotes an item in the dropdown menu. 

## Usage

``` html
<pfe-dropdown pfe-label="Dropdown">
    <pfe-dropdown-item pfe-item-type="link">
        <a href="https://bit.ly/3b9wvWg">Link 1</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item pfe-item-type="link">
        <a href="https://bit.ly/3b9wvWg">Link 2</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item pfe-item-type="link" is_disabled>
        <a href="https://bit.ly/3b9wvWg">Link 2</a>
    </pfe-dropdown-item>
    <pfe-dropdown-item pfe-item-type="separator"></pfe-dropdown-item>
    <pfe-dropdown-item pfe-item-type="action">
        <button>Action 1</button>
    </pfe-dropdown-item>
</pfe-dropdown>
```

You can also provide a list of dropdown items dynamically: 

``` js
let dropdown = document.querySelector("pfe-dropdown");
```

When pfe-dropdown is defined, via the `whenDefined` method. Pass an array of pfe-dropdown-item objects to `pfeDropdownOptions`. 

``` js
customElements.whenDefined("pfe-dropdown").then(function() {
    dropdown.pfeDropdownOptions = [
        {
            href: "https://bit.ly/3b9wvWg",
            text: "Link 1",
            type: "link",
            is_disabled: false
        },
        {
            href: "https://bit.ly/3b9wvWg",
            text: "Link 2",
            type: "link",
            is_disabled: false
        },
        {
            href: "https://bit.ly/3b9wvWg",
            text: "Link 3",
            type: "link",
            is_disabled: true
        },
        {
            type: "separator"
        },
        {
            text: "Action 1",
            type: "action",
            is_disabled: false
        },
        {
            text: "Action 2",
            type: "action",
            is_disabled: true
        }
    ];
});
```

Or you can add individual dropdown items with the `addDropdownOptions` method. Pass an array of pfe-dropdown-item objects to `addDropdownOptions` . 

``` js
customElements.whenDefined("pfe-dropdown").then(function() {
    dropdown.addDropdownOptions(
        [{
            href: "https://bit.ly/3b9wvWg",
            text: "Link 4",
            type: "link",
            is_disabled: false
        }]
    );
});
```

## Slots

### Default slot

The default slot should contain at least one link or action `pfe-dropdown-item` .

## Attributes

### pfe-dropdown

* `pfe-label` : This is an optional attribute string that you can provide to describe your dropdown, which appears in the dropdown toggle.
* `is_disabled` : This is an optional attribute that you can provide to disable your dropdown. Visually the dropdown will look disabled and mouse or keyboard events will have no impact on it. 

### pfe-dropdown-item

* `pfe-item-type` : This is an optional attribute string that you should provide to indicate the type of dropdown item. This drives the appropriate assignment of accessibility attributes for each type of item.

 - `link` : an HTML link
 - `action` : a button that triggers some sort of action
 - `separator` : a visual separator for items in the list

## API

### open
Manually opens the dropdown menu.
`document.querySelector("pfe-dropdown").open()` ; 

### close

Manually closes the dropdown menu.
`document.querySelector("pfe-dropdown").close()` ; 

## Events

* `pfe-dropdown:change` : When an item is selected, this event is fired. It includes the inner text of the item that was selected. 

## Test

    npm run test

## Build

    npm run build

## Demo

From the PFElements root directory, run:

    npm start

## Code style

Dropdown (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
