# RHElements More Like This Element

```
<cp-more-like-this
  q="https://api.access.redhat.com/rs/solutions/1336663"
  content-type="Solution">
</cp-more-like-this>
```

## Attributes
### q
String value that provides a URL for Solr to query

### content-type
String value that will set the content type for the string at the top of the component

```
content-type="Solution"

Results in:
People who viewed this Solution also viewed

content-type="Article"

Results in:
People who viewed this Article also viewed
```

## Dependencies

Make sure you have [Polyserve][polyserve] and [Web Component Tester][web-component-tester] installed.

    npm install -g polyserve web-component-tester

## Dev

    npm start

## Test

    npm run test

## Build

    npm run build

## Demo

Run `npm start` and Polyserve will start a server and open your default browser to the demo page of the element.

## Code style

CpMoreLikeThis (and all RHElements) use [Prettier][prettier] to auto-format JS and JSON.  The style rules get applied when you commit a change.  If you choose to, you can [integrate your editor][prettier-ed] with Prettier to have the style rules applied on every save.

[prettier]: https://github.com/prettier/prettier/
[prettier-ed]: https://github.com/prettier/prettier/#editor-integration
[polyserve]: https://github.com/Polymer/polyserve
[web-component-tester]: https://github.com/Polymer/web-component-tester
