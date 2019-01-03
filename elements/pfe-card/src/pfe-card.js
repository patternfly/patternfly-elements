/*
 * Copyright 2018 Red Hat, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import PFElement from "../pfelement/pfelement.js";
import { HAXWiring } from "@lrnwebcomponents/hax-body-behaviors/lib/HAXWiring.js";

class PfeCard extends PFElement {
  static get tag() {
    return "pfe-card";
  }

  get styleUrl() {
    return "pfe-card.scss";
  }

  get templateUrl() {
    return "pfe-card.html";
  }

  constructor() {
    super(PfeCard);
  }

  connectedCallback() {
    super.connectedCallback();
    let haxProps = {
      canScale: true,
      canPosition: true,
      canEditSource: false,
      gizmo: {
        title: "Card",
        description: "A simple UI Card for presenting related material.",
        icon: "icons:check-box-outline-blank",
        color: "red",
        groups: ["Red Hat"],
        handles: [
          {
            text: "slot"
          }
        ],
        meta: {
          author: "Red Hat",
          owner: "Red Hat"
        }
      },
      settings: {
        quick: [],
        configure: [
          {
            attribute: "color",
            title: "Color",
            type: "select",
            options: {
              accent: "accent",
              complement: "complement",
              lightest: "lightest",
              light: "light",
              dark: "dark",
              darkest: "darkest"
            }
          },
          {
            slot: "header",
            title: "Header",
            type: "code-editor"
          },
          {
            slot: "",
            title: "Body",
            type: "code-editor"
          },
          {
            slot: "footer",
            title: "Footer",
            type: "code-editor"
          }
        ],
        advanced: []
      }
    };
    this.HAXWiring = new HAXWiring();
    this.HAXWiring.setup(haxProps, PfeCard.tag, this);
  }
}

PFElement.create(PfeCard);

export default PfeCard;
