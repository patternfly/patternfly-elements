# PatternFly Elements Timestamp
     
A timestamp provides consistent formats for displaying date and time values.

Read more about Datetime in the [PatternFly Elements Timestamp documentation](https://patternflyelements.org/components/timestamp)

##  Installation

Load `<pf-timestamp>` via CDN:

```html
<script src="https://jspm.dev/@patternfly/elements/pf-timestamp/pf-timestamp.js"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/elements
```

Then once installed, import it to your application:

```js
import '@patternfly/elements/pf-timestamp/pf-timestamp.js';
```

## Usage

### Just the date: January 2, 2006
```html
<pf-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="long">
</pf-timestamp>
```

### With time: Monday, January 2, 2006 at 3:04:05 PM EST
```html
<pf-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="full"
  time-format="long">
</pf-timestamp>
```

### With an en-GB locale: Monday, 2 January 2006 at 15:04:05 GMT-5
You can use any locale here.
```html
<pf-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  date-format="full"
  time-format="long"
  locale="en-GB">
</pf-timestamp>
```

### Relative time: 17 years ago
```html
<pf-timestamp
  date="Mon Jan 2 15:04:05 EST 2006"
  relative>
</pf-timestamp>
```

