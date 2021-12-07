declare module '*.scss' {
  import type { CSSResult } from 'lit';

  // import style from './some-styles.scss';
  const style: CSSResult;
  export default style;
}
