# PatternFly Element | Navigation account element

This is a companion component with pfe-navigation, it creates an account dropdown in conjunction with cpx-user.

## Usage
Describe how best to use this web component along with best practices.

```html
<pfe-navigation-account login-url="/login"></pfe-navigation-account>
```

## Attributes

- `pfe-login-link`: Link to login user, required for anonymous users non-keycloack implementations will be put directly into an `<a>` tag.
- `pfe-logout-link`: Link to logout user, required for logged in users non-keycloack implementations will be put directly into an `<a>` tag.
- `pfe-avatar-url`: Provided by the component, used by `pfe-navigation`
- `pfe-full-name`: Provided by the component, used by `pfe-navigation`

## Variable hooks

@todo Available hooks for styling:

| Variable name | Default value | Region |
| --- | --- | --- |
| `--pfe-pfe-navigation-account--Color` | `#252527` | N/A |

## Events
@todo Describe any events that are accessible external to the web component. There is no need to describe all the internal-only functions.


## Dependencies
Requires @chapeaux/cpx-user component to function

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

Navigation-account (and all PFElements) use [Prettier][prettier] to auto-format JS and JSON. The style rules get applied when you commit a change. If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
