/**
 * Icons copyright FontAwesome 2017
 * @license MIT
 */

import { PfeIcon } from './pfe-icon.js';

PfeIcon.addIconSet('fa', './', function(name) {
  switch (name) {
    case 'fa-external-link-square':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='vertical-align:-0.125em' fill='currentColor' height='1em' width='1em' viewBox='0 0 448 512' aria-hidden='true' role='img'%3E%3Cpath d='M448 80v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V80c0-26.51 21.49-48 48-48h352c26.51 0 48 21.49 48 48zm-88 16H248.029c-21.313 0-32.08 25.861-16.971 40.971l31.984 31.987L67.515 364.485c-4.686 4.686-4.686 12.284 0 16.971l31.029 31.029c4.687 4.686 12.285 4.686 16.971 0l195.526-195.526 31.988 31.991C358.058 263.977 384 253.425 384 231.979V120c0-13.255-10.745-24-24-24z'%3E%3C/path%3E%3C/svg%3E`;

    case 'fa-plus-circle':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='vertical-align:-0.125em' fill='currentColor' height='1em' width='1em' viewBox='0 0 512 512' aria-hidden='true' role='img'%3E%3Cpath d='M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm144 276c0 6.6-5.4 12-12 12h-92v92c0 6.6-5.4 12-12 12h-56c-6.6 0-12-5.4-12-12v-92h-92c-6.6 0-12-5.4-12-12v-56c0-6.6 5.4-12 12-12h92v-92c0-6.6 5.4-12 12-12h56c6.6 0 12 5.4 12 12v92h92c6.6 0 12 5.4 12 12v56z'%3E%3C/path%3E%3C/svg%3E`;

    case 'fa-info-circle':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='vertical-align:-0.125em' fill='currentColor' height='1em' width='1em' viewBox='0 0 512 512' aria-hidden='true' role='img'%3E%3Cpath d='M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z'%3E%3C/path%3E%3C/svg%3E`;

    case 'fa-bars':
      return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' style='vertical-align:-0.125em' fill='currentColor' height='1em' width='1em' viewBox='0 0 448 512' aria-hidden='true' role='img'%3E%3Cpath d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'%3E%3C/path%3E%3C/svg%3E`;

    default:
      return '';
  }
});
