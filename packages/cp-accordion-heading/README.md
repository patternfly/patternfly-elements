# RHElements Accordion Heading Element

## Dev
```
npm run dev
```

## Build
```
npm run build
```

## Demo
Run http-server or python SimpleHTTPServer in the root directory of the component

## Properties
### expanded
Boolean value

## Events
### cp-accordion-change (fires)
This event is fired when the cp-accordion-heading element is clicked.
```
this.dispatchEvent(
  new CustomEvent('cp-accordion-change', {
    detail: { expanded: this.expanded },
    bubbles: true
  })
);
```
