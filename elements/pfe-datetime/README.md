# PatternFly Elements Datetime
     
This element enables developers to get a lot of the features from the [Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) just by using attributes to set the format of the date and time they'd like to display.

Read more about Datetime in the [PatternFly Elements Datetime documentation](https://patternflyelements.org/components/datetime)

##  Installation

Load `<pfe-datetime>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-datetime?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-datetime
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-datetime';
```

## Usage

### Just the date: January 2, 2006
```html
<pfe-datetime
  datetime="Mon Jan 2 15:04:05 EST 2006"
  format="local"
  day="numeric"
  month="long"
  year="numeric">
  Mon Jan 2 15:04:05 EST 2006
</pfe-datetime>
```

### With time: Monday, Jan 02, 2006, 3:04:05 PM
```html
<pfe-datetime
  datetime="Mon Jan 2 15:04:05 EST 2006"
  format="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit">
  Mon Jan 2 15:04:05 EST 2006
</pfe-datetime>
```

### With an en-GB locale: Monday, 02 Jan 2006, 15:04:05
You can use any locale here.
```html
<pfe-datetime
  datetime="Mon Jan 2 15:04:05 EST 2006"
  format="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit"
  locale="en-GB">
  Mon Jan 2 15:04:05 EST 2006
</pfe-datetime>
```

### Time adverbial: 13 years ago
```html
<pfe-datetime
  format="relative"
  datetime="Mon Jan 2 15:04:05 EST 2006">
  Mon Jan 2 15:04:05 EST 2006
</pfe-datetime>
```

