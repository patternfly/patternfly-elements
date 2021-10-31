# PatternFly Elements Icon
     
Read more about Icon in the [PatternFly Elements Icon documentation](https://patternflyelements.org/components/icon)

##  Installation

Load `<pfe-icon>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-icon?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-icon
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-icon';
```

## Usage

```html
<pfe-icon icon="rh-leaf"></pfe-icon>
```

### Fallback Content

There are no slots, but if you wish to display some text when JS is disabled, you can put some text inside the pfe-icon tag.  For instance, when using a checkmark icon in a server status table, you may wish to display "success" if JS is disabled.

```html
<pfe-icon icon="rh-check-mark">✅</pfe-icon>
```

### Icon sets

Icon sets are defined in detail in [this blog post][icon-sets].  The blog post should eventually be absorbed into the official documentation.

#### Register a new icon set

To register a new icon set, choose a global namespace for that set and identify the path at which the SVGs for that set will be hosted.  Consider also the function needed to convert the icon name into the filename on that hosted location.  The `addIconSet` call accepts the namespace (as a string), the path to the SVGs (as a string), and a function for parsing the icon name into the filename.

```javascript
await customElements.whenDefined('pfe-icon');
const PfeIcon = customElements.get('pfe-icon');
PfeIcon.addIconSet(
  "local",
  "./",
  function(name, iconSetName, iconSetPath) {
    var regex = new RegExp("^" + iconSetName + "-(.*)");
    var match = regex.exec(name);
    return iconSetPath + match[1] + ".svg";
  }
);
```

#### Override the default icon sets

Out of the box, the default icon set (using the rh / web namespace) is hosted on [access.redhat.com](https://access.redhat.com). If you would like to override the `rh / web` namespace, you can add the following to a global variable named `PfeConfig`.

The config must be set _before_ the PfeIcon class is defined.

```javascript
window.PfeConfig = {
  IconSets: [
    {
      name: "web",
      path: "path/to/svg/directory", // Or https://hosted-icons.com/,
      resolveIconName: function(name, iconSetName, iconSetPath) { // Optional function to resolve icon paths.
        var regex = new RegExp("^" + iconSetName + "-(.*)");
        var match = regex.exec(name);
        return iconSetPath + match[1] + ".svg";
      }
    }
  ]
};
```

Now when `<pfe-icon>` is used, it will automatically reference the icon set defined in the config.

If you would like to opt out of any defaults so that you can dynamically add icon sets later using `PfeIcon.addIconSet()`, use the following:

```javascript
window.PfeConfig = {
  IconSets: []
};
```

#### Updating an existing icon set

To updating an existing icon set, you use the same `addIconSet` function.  The first input which is the icon set namespace is required, as is the new path.  You can optionally pass in a new function for parsing the icon names into filenames.

```javascript
PfeIcon.addIconSet("local", "https://hosted-icons.com/");
```

