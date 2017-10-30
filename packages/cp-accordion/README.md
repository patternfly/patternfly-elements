# RHElements Accordion Element

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

## Methods

### toggle(index)
Toggles an accordion heading and panel.
```
const accordion = document.querySelector('cp-accordion');
accordion.toggle(0);
```

### expand(index)
Expands an accordion heading and panel.
```
const accordion = document.querySelector('cp-accordion');
accordion.expand(0);
```

### expandAll()
Expands all of the headings and panels.
```
const accordion = document.querySelector('cp-accordion');
accordion.expandAll();
```

### collapse(index)
Collapses an accordion heading and panel.
```
const accordion = document.querySelector('cp-accordion');
accordion.collapse(0);
```

### collapseAll()
Collapses all of the headings and panels.
```
const accordion = document.querySelector('cp-accordion');
accordion.collapseAll();
```

## Events
### cp-accordion-change (listens for)
Listens for `cp-accordion-change` event coming from the cp-accordion-heading element. This triggers an expand or collapse on the heading that has been selected.
