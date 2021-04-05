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
    } else {
      var words = target.innerText;
      wordCount = words.trim().split(" ").length;
      console.log("calculated word count:" + wordCount);
    }
    return wordCount;
  }

  _wordCountChangeHandler() {
    this.readtime = this._calculateReadTime(this.wordCount);
  }

  _calculateReadTime(wordCount) {
    //average readtime by country - https://irisreading.com/average-reading-speed-in-various-languages
    //all countries around 250 accept Japan is 360. Add var for Japan?
    var readRate = 250; //default readtime
    var isJapan = false;
    if (isJapan == true) {
      readRate = 360; //Japan readtime
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
