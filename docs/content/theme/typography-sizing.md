
+++
title = "Typography sizing"
description = ""
weight = 10
draft = false
bref = ""
toc = true
menu = "theme"
tags = [ "theme" ]
+++
 

### Typography sizing variables

| **Pixels**  | **PF** | **Global**                   | **Title and Text (body copy)**   |  **Semantic HTML**          |
| ----------- | ------ | --------------------------   | ------------------------------   | -----------------------------   |
| **Titles**  |        |                              |                                  |                                 |
| 48px        | 6xl    | `--pf-global--FontSize--6xl` | `--pf-c--title--m-6xl--FontSize` |                                 |
| 40px        | 5xl    | `--pf-global--FontSize--5xl` | `--pf-c--title--m-5xl--FontSize` |                                 |
| 36px        | 4xl    | `--pf-global--FontSize--4xl` | `--pf-c--title--m-4xl--FontSize` |                                 |
| 28px        | 3xl    | `--pf-global--FontSize--3xl` | `--pf-c--title--m-3xl--FontSize` | `--pf-c--content--h1--FontSize` |
| 24px        | 2xl    | `--pf-global--FontSize--2xl` | `--pf-c--title--m-2xl--FontSize` | `--pf-c--content--h2--FontSize` |
| 20px        | xl     | `--pf-global--FontSize--xl ` | `--pf-c--title--m-xl--FontSize ` | `--pf-c--content--h3--FontSize` |
| 18px        | lg     | `--pf-global--FontSize--lg ` | `--pf-c--title--m-lg--FontSize ` | `--pf-c--content--h4--FontSize` |
| 16px        | md     | `--pf-global--FontSize--md ` | `--pf-c--title--m-md--FontSize ` | `--pf-c--content--h5--FontSize` |
| 14px        | sm     | `--pf-global--FontSize--sm ` | `--pf-c--title--m-sm--FontSize ` | `--pf-c--content--h6--FontSize` |
| 12px        |        | `--pf-global--FontSize--xs ` | `--pf-c--title--m-xs--FontSize ` |                                 |
| **Content** |        |                              |                                  |                                 |
| 20px        | xl     | `--pf-global--FontSize--xl ` | `--pf-c--text--m-xl--FontSize  ` |                                 |
| 18px        | lg     | `--pf-global--FontSize--lg ` | `--pf-c--text--m-lg--FontSize  ` |                                 |
| 16px        | md     | `--pf-global--FontSize--md ` | `--pf-c--text--m-md--FontSize  ` | `--pf-c--content--FontSize`     |
| 14px        | sm     | `--pf-global--FontSize--sm ` | `--pf-c--text--m-sm--FontSize  ` |                                 |
| 12px        | xs     | `--pf-global--FontSize--xs ` | `--pf-c--text--m-xs--FontSize  ` |                                 |


### Typography classes & mixin

| **Pixels**  | **PF** | **Class**         |  **Mixin**                                               |
| ----------- | ------ | ---------------   | -------------------------------------------------------- |
| **Titles**  |        |                   |                                                          |
| 48px        | 6xl    | `.pfe-title--6xl` | `@include pfe-c-typography($sizing: 6xl, $type: title);` |
| 40px        | 5xl    | `.pfe-title--5xl` | `@include pfe-c-typography($sizing: 5xl, $type: title);` |
| 36px        | 4xl    | `.pfe-title--4xl` | `@include pfe-c-typography($sizing: 4xl, $type: title);` |
| 28px        | 3xl    | `.pfe-title--3xl` | `@include pfe-c-typography($sizing: 3xl, $type: title);` |
| 24px        | 2xl    | `.pfe-title--2xl` | `@include pfe-c-typography($sizing: 2xl, $type: title);` |
| 20px        | xl     | `.pfe-title--xl ` | `@include pfe-c-typography($sizing: xl, $type: title);`  |
| 18px        | lg     | `.pfe-title--lg ` | `@include pfe-c-typography($sizing: lg, $type: title);`  |
| 16px        | md     | `.pfe-title--md ` | `@include pfe-c-typography($sizing: md, $type: title);`  |
| 14px        | sm     | `.pfe-title--sm ` | `@include pfe-c-typography($sizing: sm, $type: title);`  |
| 12px        |        | `.pfe-title--xs ` | `@include pfe-c-typography($sizing: xs, $type: title);`  |
| **Content** |        |                   |                                                    |
| 20px        | xl     | `.pfe-text--xl  ` | `@include pfe-c-typography($sizing: xl, $type: text);`   |
| 18px        | lg     | `.pfe-text--lg  ` | `@include pfe-c-typography($sizing: lg, $type: text);`   |
| 16px        | md     | `.pfe-text--md  ` | `@include pfe-c-typography($sizing: md, $type: text);`   |
| 14px        | sm     | `.pfe-text--sm  ` | `@include pfe-c-typography($sizing: sm, $type: text);`   |
| 12px        | xs     | `.pfe-text--xs  ` | `@include pfe-c-typography($sizing: xs, $type: text);`   |