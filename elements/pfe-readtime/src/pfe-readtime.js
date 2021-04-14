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
        type: Number
      },
      wordCount: {
        title: "Number of words in the content",
        type: Number,
        default: 0
      },
      templateString: {
        title: "Template for printing the readtime",
        description:
          "Translatable string for printing out the readtime in a readable format. Use %t as a stand-in for the calculated value.",
        attr: "template",
        type: String,
        default: el => el.textContent.trim() || "%t-minute readtime"
      },
      _lang: {
        title: "Language of content",
        type: String,
        attr: "lang",
        enum: ["en", "ko", "zh", "fr", "ja", "de", "it", "pt-br", "es"],
        default: () => document.documentElement.lang || "en"
      },
      for: {
        title: "Element containing content",
        //This is the unique selector of the target
        type: String,
        observer: "_forChangeHandler"
      }
    };
  }

  get wpm() {
    switch (this._lang) {
      case "en": // 228 wpm
      case "ko": // for Korean, we were able to locate 7 studies in five articles: 5 with silent reading and 2 with reading aloud. Silent reading rate was 226 wpm, reading aloud 133 wpm.
        this.log("English and Korean readtime is ~228wpm");
        return 228;
      case "zh": // 158 wpm
        this.log("Chinese readtime is 158wpm");
        return 158;
      case "fr": // 195 wpm
        this.log("French readtime is 195wpm");
        return 195;
      case "ja": // 193 wpm
        this.log("Japanese readtime is 193wpm");
        return 193;
      case "de":
        this.log("German readtime is 179wpm");
        return 179;
      case "it": // 188 wpm
        this.log("Italian readtime is 188wpm");
        return 188;
      case "pt-br": // 181 wpm
        this.log("Portuguese readtime is 181wpm");
        return 181;
      case "es":
        this.log("Spanish readtime is 218wpm");
        return 218;
      default:
        this.log(
          `No supported language provided. Current calculations support: en, ko, zh, fr, ja, de, it, pt-br, es. Default value of 228wpm will be used.`
        );
        return 228;
    }
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
        this.wordCount = target.textContent.trim().split(" ").length;
      }

      // If a new target element is identified, re-render
      this.render();
    }
  }
}

PFElement.create(PfeReadtime);

export default PfeReadtime;
