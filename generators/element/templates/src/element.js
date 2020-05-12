import PFElement from "<%= pfeElementLocation %>";

class <%= elementClassName %> extends PFElement {
  static get tag() {
    return "<%= elementName %>";
  }

  get schemaUrl() {
    return "<%= elementName %>.json";
  }

  get templateUrl() {
    return "<%= elementName %>.html";
  }

  get styleUrl() {
<%_ if (useSass) { _%>
    return "<%= elementName %>.scss";
<%_ } else { _%>
    return "<%= elementName %>.css";
<%_ } _%>
  }

  <% if (events.length < 1) { %>// <% } %>static get events() {
  <% if (events.length < 1) { %>//   <% } %>return {<% for(let i = 0; i < events.length; i++) { %>
      <%= events[i] %>: `${this.tag}:<%= events[i] %>`<% if (i < (events.length - 1)) { %>,<% } } %>
    <% if (events.length < 1) { %>//   <% } %>};
  <% if (events.length < 1) { %>// <% } %>}

  // Declare the type of this component
  static get PfeType() {
    return PFElement.PfeTypes.<%= _.capitalize(template_type) %>;
  }

  <% if (attributes.length < 1) { %>// <% } %>static get observedAttributes() {
    <% if (attributes.length < 1) { %>//   <% } %>return [<% if (isPfelement) { %><%- _.join(attributes.map(item => `"pfe-${item}"`), ", ") %><% } else { %><%- _.join(attributes.map(item => `"${item}"`), ", ") %><% } %>];
  <% if (attributes.length < 1) { %>// <% } %>}

  constructor() {
    super(<%= elementClassName %>, { type: <%= elementClassName %>.PfeType });
    <%_ if (slots.length > 0) { %>
    <%_ for(let i = 0; i < slots.length; i++) { _%>
    this._<%= _.camelCase(slots[i]) %> = this.shadowRoot.querySelector(`.${this.tag}__<%= slots[i] %>`);
    <%_ } } _%>
  }

  connectedCallback() {
    super.connectedCallback();
    // If you need to initialize any attributes, do that here
    <%_ if (slots.length > 0) { %>
    <%_ for(let i = 0; i < slots.length; i++) { _%>
    this.<%= _.camelCase(slots[i]) %> = this.querySelector(`[slot="${this.tag}--<%= slots[i] %>"]`);
    <%_ } _%>
    <%_ for(let i = 0; i < slots.length; i++) { %>
    // Add a slotchange listener to the lightDOM trigger
    // this.<%= _.camelCase(slots[i]) %>.addEventListener("slotchange", this._init);
    <%_ } _%>
    <%_ } _%>

    <%_ for(let i = 0; i < events.length; i++) { _%>
    this.addEventListener(<%= elementClassName %>.events.<%= events[i] %>, this._<%= events[i] %>Handler);
    <%_ } _%>
  }

  disconnectedCallback() {
    <%_ for(let i = 0; i < events.length; i++) { _%>
    this.removeEventListener(<%= elementClassName %>.events.<%= events[i] %>, this._<%= events[i] %>Handler);
    <%_ } _%>
  }

<%_ if (attributes.length > 0) { _%>
  // Process the attribute change
  <% if (attributes.length < 1) { %>// <% } %>attributeChangedCallback(attr, oldValue, newValue) {
    <% if (attributes.length < 1) { %>//   <% } %>super.attributeChangedCallback(attr, oldValue, newValue);
    <% if (attributes.length < 1) { %>//   <% } %>}
<%_ } _%>

<%_ for(let i = 0; i < events.length; i++) { _%>
  _<%= events[i] %>Handler(event) {
    this.emitEvent(<%= elementClassName %>.events.<%= events[i] %>, {
      detail: {}
    });
  }
<%_ } _%>
}

PFElement.create(<%= elementClassName %>);

export default <%= elementClassName %>;
