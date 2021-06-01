# PatternFly Element | Navigation account element

This is a companion component with pfe-navigation, it creates an account dropdown with appropriate content based on a user's roles and permissions.

## Usage
This component should be a direct child of `pfe-navigation`, and should have the attribute `slot="account"`
```html
<pfe-navigation-account slot="account"></pfe-navigation-account>
```

If it should be in logged out state:
* `login-link` should be set to a valid login URL

If it should be in a logged in state:
* `logout-link` should be set to a valid logout URL
* The component should be provided the information from the JWT via one of these methods:
  * Using the userData setter: Provide the JSON object from the JWT to the setter. Make a reference to the DOM object and set `.userData`, e.g.:
    ```js
    document.querySelector('pfe-navigation-account').userData = howeverYouGetTheJWT('make it so');
    ```
  * @todo via chapeaux and keycloack.js

> Tip: Don't add the `login-link` attribute until the auth state of the user is known, this will prevent a login link from flashing while the user's status is being figured out.

### UserData Object

The `userData` method expects an object that at minimum should have:

```json
{
      realm_access: {
        roles: []
      },
      REDHAT_LOGIN: "wesruv@wakka-wakka.com",
      lastName: "Ruvalcaba",
      account_number: "123456",
      preferred_username: "wesruv@wakka-wakka.com",
      firstName: "Wes",
      email: "wesruv@wakka-wakka.com",
      username: "wesruv@wakka-wakka.com",
      fullName: "Wes Ruvalcaba"
}
```

`realm_access.roles` is checked for two roles:
* `admin:org:all`
* `portal_manage_subscriptions`

If the user has these roles they should be present in the array, if not they can be left out.

@todo: update to ask users to file an issue in the repository
For any questions or help, contact the CPFED group.


## Attributes

- `login-link`: Link to login user, required for anonymous users non-keycloack implementations will be put directly into an `<a>` tag.
- `logout-link`: Link to logout user, required for logged in users non-keycloack implementations will be put directly into an `<a>` tag.
- `avatar-url`: Provided by the component, used by `pfe-navigation`
- `full-name`: Provided by the component, used by `pfe-navigation`

## Events
- `pfe-shadow-dom-event`: Fires when an element is clicked inside of a dropdown in the shadow root. This is for analytics to properly categorize and report the event. `event.detail` has:
  - `target` Element clicked
  - `parent` the `pfe-navigation` element


## Dependencies
Is meant to be used inside of pfe-navigation as optional functionality.

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
