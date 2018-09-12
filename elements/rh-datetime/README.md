# RHElements Datetime Element

This RHElement enables developers to get a lot of the features from the [Intl Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) just by using attributes to set the format of the date and time they'd like to display.

## Usage

### Just the date: January 2, 2006
```html
<rh-datetime
  datetime="Mon Jan 2 15:04:05 EST 2006"
  type="local"
  day="numeric"
  month="long"
  year="numeric">
  Mon Jan 2 15:04:05 EST 2006
</rh-datetime>
```

### With time: Monday, Jan 02, 2006, 3:04:05 PM
```html
<rh-datetime
  datetime="Mon Jan 2 15:04:05 EST 2006"
  type="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit">
  Mon Jan 2 15:04:05 EST 2006
</rh-datetime>
```

### With an en-GB locale: Monday, 02 Jan 2006, 15:04:05
You can use any locale here.
```html
<rh-datetime
  datetime="Mon Jan 2 15:04:05 EST 2006"
  type="local"
  weekday="long"
  month="short"
  day="2-digit"
  year="numeric"
  hour="2-digit"
  minute="2-digit"
  second="2-digit"
  locale="en-GB">
  Mon Jan 2 15:04:05 EST 2006
</rh-datetime>
```

### Time adverbial: 13 years ago
```html
<rh-datetime
  type="relative"
  datetime="Mon Jan 2 15:04:05 EST 2006">
  Mon Jan 2 15:04:05 EST 2006
</rh-datetime>
```

## Attributes

### datetime (observed)

The value of this should be the same timestamp that you add to the light DOM.

### type (observed)

The options for type are:
- `local`: Shows a formatted time for the indicated locale if provided
- `relative`: Shows a relative time (1 hour ago, 2 hours until)

### weekday

Possible values: `narrow`, `short`, `long`

### month

Possible values: `numeric`, `2-digit`, `narrow`, `short`, `long`

### day

Possible values: `numeric`, `2-digit`

### year

Possible values: `numeric`, `2-digit`

### hour

Possible values: `numeric`, `2-digit`

### minute

Possible values: `numeric`, `2-digit`

### second

Possible values: `numeric`, `2-digit`

## Test

    npm run test

## Build

    npm run build

## Demo

From the RHElements root directory, run:

    npm start

## Code style

Datetime (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://prettier.io/docs/en/editors.html
[web-component-tester]: https://github.com/Polymer/web-component-tester
