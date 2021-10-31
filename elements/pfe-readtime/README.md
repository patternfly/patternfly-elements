# PatternFly Elements Readtime
         
This component takes in the word count of a given section and does a calculation on that number to return an estimated read time based on language.  The words-per-minute values were sourced from [this article](https://irisreading.com/average-reading-speed-in-various-languages) with the data originating from [this research](https://iovs.arvojournals.org/article.aspx?articleid=2166061).  For more information, see the [Readtime calculation information](#readtime-calculation-information) below.


Read more about Readtime in the [PatternFly Elements Readtime documentation](https://patternflyelements.org/components/readtime)

##  Installation

Load `<pfe-readtime>` via CDN:

```html
<script src="https://unpkg.com/@patternfly/pfe-readtime?module"></script>
```

Or, if you are using [NPM](https://npm.im), install it

```bash
npm install @patternfly/pfe-readtime
```

Then once installed, import it to your application:

```js
import '@patternfly/pfe-readtime';
```

## Usage

```html
<pfe-readtime for="#readtime1" hidden>%t-minute readtime</pfe-readtime>
```

### Accessibility
This component functions purely as inline-content and does not require any focus state.  Should be read by screen-readers inline with it's contextual content.

## Readtime calculation

Average read time by country is determined using the following research: https://irisreading.com/average-reading-speed-in-various-languages

Korean read time research:
https://files.osf.io/v1/resources/xynwg/providers/osfstorage/5cb0b53ff2be3c0016ffe637?action=download&version=1&direct&format=pdf

*TLDR:*
For Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.

