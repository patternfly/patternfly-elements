# PatternFly Elements Timestamp
     
A timestamp provides consistent formats for displaying date and time values.

Read more about Datetime in the [PatternFly Elements Timestamp documentation](https://patternflyelements.org/components/timestamp)

##  Installation

Load `<pfe-timestamp>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-timestamp?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-timestamp
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-timestamp';
```

## Usage

### Just the date: January 2, 2006
```html
<pfe-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="long">
</pfe-timestamp>
```

### With time: Monday, January 2, 2006 at 3:04:05 PM EST
```html
<pfe-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="full"
  time-format="long">
</pfe-timestamp>
```

### With an en-GB locale: Monday, 2 January 2006 at 15:04:05 GMT-5
You can use any locale here.
```html
<pfe-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="full"
  time-format="long"
  locale="en-GB">
</pfe-timestamp>
```

### Relative time: 17 years ago
```html
<pfe-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  relative>
</pfe-timestamp>
```

