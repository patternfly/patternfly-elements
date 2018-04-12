# RHElements More Like This Element

```
<cp-more-like-this
  q="https://api.access.redhat.com/rs/solutions/1336663"
  content-type="Solution">
</cp-more-like-this>
```

## Attributes
### api-url
String value that provides a URL for Solr to query.

Example API URL
```
https://api.access.redhat.com/rs/search?q=id:1336663&mltDocSearch=true&limit=3
```

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

## Events
### cp-more-like-this:no-data
If there is an error from the API or no data is found, A custom event, `cp-more-like-this:no-data`,
will be fired and will bubble.

Capture the event example:
```
document.addEventListener('cp-more-like-this:no-data', function () {
  // react to no data
});
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
