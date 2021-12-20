import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { pfelement } from '@patternfly/pfe-core/decorators.js';
import { when } from '@patternfly/pfe-core/directives/when.js';
import { Logger } from '@patternfly/pfe-core/controllers/logger.js';

import style from './pfe-health-index.scss';

/**
 * Allow only one char in range `A-F`
 *
 * `^`        From the start of the string
 * `[^A-F]*`  Exclude any char in range A-F zero or more times, then
 * `[A-F]`    Require one char in range A-F, then
 * `[^A-F]*`  Exclude any char in range A-F zero or more times, until
 * `$`        The end of the string
 * `/i`       Case insensitive flag
 */
const GRADE_SCORE_REGEXP = /^[^A-F]*[A-F][^A-F]*$/i;

const isValidGradeScore = (x: unknown): x is 'A'|'B'|'C'|'D'|'E'|'F' =>
  typeof x === 'string' &&
  !!x.match(GRADE_SCORE_REGEXP);

/**
 * Health index shows a health grade in either a default, mini, or large variation.
 */
@customElement('pfe-health-index') @pfelement()
export class PfeHealthIndex extends LitElement {
  static readonly styles = [style];

  private logger = new Logger(this);

  /** Sets the value for the health index in the UI. */
  @property({ type: String, reflect: true, attribute: 'health-index' })
  healthIndex: 'A'|'B'|'C'|'D'|'E'|'F'|null;

  /** Changes the size. */
  @property({ reflect: true })
  size: 'mini'|'lg'|null = null;

  render() {
    const healthIndex = (this.healthIndex ?? '').toLowerCase();
    return html`
      <div id="healthIndex" ${when(!this.size)}>${healthIndex.toUpperCase()}</div>
      <div class="box-container">
        ${this.size === 'mini' ? html`
        <div class="box ${classMap({ [healthIndex]: true, active: true })}">
          <div class="grade" id="healthIndex">${healthIndex.toUpperCase()}</div>
        </div>
        ` : ['a', 'b', 'c', 'd', 'e', 'f'].map(grade => html`
        <div class="box ${classMap({ active: healthIndex === grade, [grade]: true })}">
          ${this.size === 'lg' ? html`
          <div class="grade">${grade.toUpperCase()}</div>
          <div class="bottom"></div>
          ` : html`
          <div class="box ${classMap({ active: healthIndex === grade, [grade]: true })}"></div>
          `}
        </div>
        `)}
      </div>
    `;
  }

  constructor() {
    super();
    if (
      this.textContent &&
      !this.hasAttribute('health-index') &&
      !isValidGradeScore(this.textContent)
    ) {
      this.logger.warn('a valid health-index was not provided. Please use A, B, C, D, E, or F');
    }
    this.healthIndex ??= isValidGradeScore(this.textContent) ? this.textContent : 'A';
  }

  updated() {
    if (!this.healthIndex) {
      this.logger.warn('a valid health-index was not provided. Please use A, B, C, D, E, or F');
      this.textContent = '';
    } else if (!isValidGradeScore(this.healthIndex)) {
      this.healthIndex = null;
    } else if (this.textContent !== this.healthIndex.toUpperCase()) {
      this.textContent = this.healthIndex.toUpperCase();
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'pfe-health-index': PfeHealthIndex;
  }
}
