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
        type: Number,
        observer: "_wordCountChangeHandler"
      },
      wpm: {
        title: "Words per minute",
        type: Number,
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
        observer: "_wordCountChangeHandler"
      }
    };
  }

  static get slots() {
    return {};
  }

  constructor() {
    PFElement._debugLog = true;
    super(PfeReadtime, { type: PfeReadtime.PfeType, delayRender: true });

    this.readStringTemplate = "%t-minute read";
    this.readStringLessTemplate = "Less than %t-minute read";
  }

  connectedCallback() {
    super.connectedCallback();

    this.slots = {
      readString: this.querySelector(`[slot="read-string"]`),
      readStringLess: this.querySelector(`[slot="read-string-less"]`)
    };

    if (this.slots.readString) this.readStringTemplate = this.slots.readString.textContent;
    if (this.slots.readStringLess) this.readStringLessTemplate = this.slots.readStringLess.textContent;

    // On upgrade, reveal the component
    this.removeAttribute("hidden");

    this.render();
  }

  disconnectedCallback() {}

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


  _getWordsPerMinute(wordCount, lang) {
    //average readtime by country - https://irisreading.com/average-reading-speed-in-various-languages
    if (!this.wordCount && !wordCount) return 0;

    if (!wordCount) wordCount = this.wordCount;

    // Default readRate is 228 wpm
    let readRate = 228;

    // Check the component for a provided language code
    var pass;
    if (!lang && pass === null) { //`pass === null` is kind a bit of a hack. Research why each observer go through this (causing 3 calls)
      pass=1; //only run through once
      if (this.lang) lang = this.lang;

      // If a language is not provided, get it from HTML lang code
      const rootTag = document.querySelector("html");
      if (rootTag && rootTag.lang) lang = rootTag.lang;

      // If no language code is found on the HTML tag, fallback to "en"
      lang = "en";
      console.log("getwordcount funtion: " + lang);
    }
    if (lang){
      switch (lang) {
        case "en": // 228 wpm
        case "ko": // for Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
          readRate = 228;
          console.log("en or ko");
          this.log("English and Korean readtime is around " + readRate + " wpm");
          break;
        case "zh": // 158 wpm
          readRate = 158;
          this.log("Chinese readtime is " + readRate + " wpm");
          break;
        case "fr": // 195 wpm
        case "ja": // 193 wpm
          readRate = 195;
          this.log("French readtime is " + readRate + " wpm");
          break;
        case "de":
          readRate = 179;
          this.log("German readtime is " + readRate + " wpm");
          break;
        case "it": // 188 wpm
        case "pt-br": // 181 wpm
          readRate = 185;
          this.log("Italian and Portuguess readtimes are around " + readRate + " wpm");
          break;
        case "es":
          readRate = 218;
          this.log("Spanish readtime is " + readRate + " wpm");
          break;
        default:
          this.log(
            `Sorry, no supported language provided. Current calculations support: en, ko, zh, fr, ja, de, it, pt-br, es. Default value of ${readRate} wpm will be used.`
          );
      }
    }

    this.wpm = readRate;
  }

  _calculateReadTime() {
    // Divide number of words by average wpm readtime
    // Round down to get even readtime
    this.readtime = Math.floor(this.wordCount / this.wpm);

    //this.render();
  }


  _wordCountChangeHandler(oldVal, newVal) {
    if (oldVal === newVal) return;

    // Assign the words per minute to the global this.wpm variable
    this._getWordsPerMinute();

    // Calculate the readtime, assign to global this.readtime variable
    this._calculateReadTime();

    if (this.readtime > 0) {
      this.readString = this.readStringTemplate.replace("%t", this.readtime);
    } else {
      this.readString = this.readStringLessTemplate.replace("%t", this.readtime);
    }
  }
}

PFElement.create(PfeReadtime);

export default PfeReadtime;
