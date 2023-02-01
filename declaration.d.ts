declare module '*.css' {
  import type { CSSResult } from 'lit';

  // import style from './some-styles.css';
  const style: CSSResult;
  export default style;
}
