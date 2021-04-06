import PFElement from "../../pfelement/dist/pfelement.js";

class PfeReadtime extends PFElement {
  static get tag() {
    return "pfe-readtime";
  }

  static get meta() {
    return {
      title: "Readtime",
      description:
        "This element will collect a word count on a given section and calculate the readtime based on that count."
    };
  }

  get templateUrl() {
    return "pfe-readtime.html";
  }

  get styleUrl() {
    return "pfe-readtime.css";
  }

  // static get events() {
  //   return {
  //   };
  // }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      wordCount: {
        title: "Word count",
        // Valid types are: String, Boolean, and Number
        type: String,
        observer: "_wordCountChangeHandler"
      },
      for: {
        title: "For",
        //This is the uniqueId of the target
        type: String,
        observer: "_forChangedHandler"
      },
      readtime: {
        title: "Readtime",
        type: String,
        observer: "render"
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    super(PfeReadtime, { type: PfeReadtime.PfeType });
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
  }

  disconnectedCallback() {}

  // Process the attribute change
  attributeChangedCallback(attr, oldValue, newValue) {
    super.attributeChangedCallback(attr, oldValue, newValue);
  }

  _forChangedHandler() {
    if (this.for) {
      const target = document.getElementById(this.for);
      if (target) {
        this.wordCount = this._getWordCountOfSection(target);
      }
    }
  }

  _getWordCountOfSection(target) {
    //WIP for API to leverage outside of data attribute in webrh
    let wordCount;
    if (target.hasAttribute("word-count")) {
      wordCount = target.getAttribute("word-count");
      console.log("Word count: " + wordCount);
    } else {
      var words = target.innerText;
      wordCount = words.trim().split(" ").length;
      console.log("Calculated word count: " + wordCount);
    }
    return wordCount;
  }

  _wordCountChangeHandler() {
    this.readtime = this._calculateReadTime(this.wordCount);
  }

  _calculateReadTime(wordCount) {
    //average readtime by country - https://irisreading.com/average-reading-speed-in-various-languages

    const lang = "en"; // Pass language in here for readtime calulation
    let readRate = 228;
    //WIP solution to get translation string from URL
    let langCode = window.location.href;
    langCode = langCode
      .split(".com/")
      .pop()
      .split("/")[0]; // take string between ".com/" and first "/" after ".com/"
    console.log("langCode = " + langCode);

    switch (langCode) {
      case "en": // 228 wpm
      case "ko": // for Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
        readRate = 228;
        console.log("English and Korean readtime is around" + readRate + " wpm");
        break;
      case "zh": // 158 wpm
        readRate = 158;
        console.log("Chinese readtime is " + readRate + " wpm");
        break;
      case "fr": // 195 wpm
      case "ja": // 193 wpm
        readRate = 195;
        console.log("French readtime is " + readRate + " wpm");
        break;
      case "de":
        readRate = 179;
        console.log("German readtime is " + readRate + " wpm");
        break;
      case "it": // 188 wpm
      case "pt-br": // 181 wpm
        readRate = 185;
        console.log("Italian and Portuguess readtimes are around " + readRate + " wpm");
        break;
      case "es":
        readRate = 218;
        console.log("Spanish readtime is " + readRate + " wpm");
        break;
      default:
        console.log(`Sorry, no lang provided`);
    }

    //devide number of words by average wpm readtime
    var length = wordCount / readRate; //make rate of reading an attribute
    var rounded = Math.floor(length); //round down to get even readtime
    console.log("readtime = " + rounded);
    if (rounded < 1) {
      rounded = "Less than 1";
    }
    return rounded;
  }
}

PFElement.create(PfeReadtime);

export default PfeReadtime;
