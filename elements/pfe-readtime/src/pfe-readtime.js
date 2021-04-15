import PFElement from "../../pfelement/dist/pfelement.js";

function getEstimatedWPM(language) {
  switch (language) {
    case "en": // 228 wpm
    case "ko": // for Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
      return 228;
    case "zh": // 158 wpm
      return 158;
    case "fr": // 195 wpm
      return 195;
    case "ja": // 193 wpm
      return 193;
    case "de":
      return 179;
    case "it": // 188 wpm
      return 188;
    case "pt-br": // 181 wpm
      return 181;
    case "es":
      return 218;
    default:
      return 228;
  }
}

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
    return "pfe-readtime.scss";
  }

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.Content;
  }

  static get properties() {
    return {
      wpm: {
        title: "Words per minute",
        type: Number,
        default: el => getEstimatedWPM(el._lang),
        observer: `render`
      },
      wordCount: {
        title: "Number of words in the content",
        type: Number,
        default: 0,
        observer: `render`
      },
      templateString: {
        title: "Template for printing the readtime",
        description:
          "Translatable string for printing out the readtime in a readable format. Use %t as a stand-in for the calculated value.",
        attr: "template",
        type: String,
        default: el => el.textContent.trim() || "%t-minute readtime",
        observer: `render`
      },
      _lang: {
        title: "Language of content",
        type: String,
        attr: "lang",
        enum: ["en", "ko", "zh", "fr", "ja", "de", "it", "pt-br", "es"],
        default: () => document.documentElement.lang || "en",
        observer: `_langChangedHandler`
      },
      for: {
        title: "Element containing content",
        //This is the unique selector of the target
        type: String,
        observer: "_forChangeHandler"
      }
    };
  }

  get readtime() {
    return Math.floor(this.wordCount / this.wpm) || 0;
  }

  get readString() {
    if (this.readtime <= 0) {
      this.setAttribute("hidden", "");
      return;
    }

    this.removeAttribute("hidden");

    if (this.templateString && this.templateString.match(/%t/)) {
      return this.templateString.replace("%t", this.readtime);
    } else {
      return `${this.readtime}${this.templateString}`;
    }
  }

  constructor() {
    // Note: Delay render is important here for the timing of variable definitions
    // we want to render after all the inputs have been read in and parsed
    super(PfeReadtime, { type: PfeReadtime.PfeType, delayRender: true });

    this._forChangeHandler = this._forChangeHandler.bind(this);
    this._langChangedHandler = this._langChangedHandler.bind(this);
  }

  connectedCallback() {
    super.connectedCallback();

    this.render();
  }

  // disconnectedCallback() {}

  _forChangeHandler(oldVal, newVal) {
    if (newVal === oldVal) return;

    const target = document.querySelector(newVal) || document.querySelector(`#${newVal}`);
    if (target) {
      this.content = target;

      if (target.hasAttribute("word-count")) {
        const wcAttr = target.getAttribute("word-count");
        if (Number(wcAttr) >= 0) {
          this.wordCount = Number(wcAttr);
        }
      } else if (target.textContent.trim()) {
        this.wordCount = target.textContent.split(/\b\w+\b/).length;
      }

      // If a new target element is identified, re-render
      this.render();
    }
  }

  _langChangedHandler(oldVal, newVal) {
    if (newVal === oldVal) return;

    this.wpm = getEstimatedWPM(newVal);
    this.render();
  }
}

PFElement.create(PfeReadtime);

export default PfeReadtime;
