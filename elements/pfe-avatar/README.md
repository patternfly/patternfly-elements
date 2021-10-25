# PatternFly Elements Avatar
         
`<pfe-avatar>` is an element for displaying a user's avatar image. If the user in question has provided a custom avatar, provide it and it will be displayed. If they don't, a nice colored pattern will be generated based on their name. A specific name will always generate the same pattern, so users' avatars will stay static without the need for storing their generated image.

Read more about Avatar in the [PatternFly Elements Avatar documentation](https://patternflyelements.org/components/avatar)

##  Installation

Load `<pfe-avatar>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-avatar?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-avatar
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-avatar';
```
## Usage

```html
<pfe-avatar name="Eleanore Stillwagon"></pfe-avatar>

<pfe-avatar name="Libbie Koscinski" shape="rounded" pattern="squares"></pfe-avatar>

<pfe-avatar name="Blanca Rohloff" pattern="triangles"></pfe-avatar>

<pfe-avatar name="Edwardo Lindsey" src="https://clayto.com/2014/03/rgb-webgl-color-cube/colorcube.jpg"></pfe-avatar>
```

