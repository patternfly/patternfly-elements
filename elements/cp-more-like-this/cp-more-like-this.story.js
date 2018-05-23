import { storiesOf } from '@storybook/polymer';
import { withKnobs, text } from '@storybook/addon-knobs/polymer';
import './cp-more-like-this';

const stories = storiesOf("More Like This", module);
stories.addDecorator(withKnobs);

stories.add('cp-more-like-this', () => {
  const apiUrl = text("API URL", "https://api.access.redhat.com/rs/search?q=id:1336663&mltDocSearch=true&rows=3");
  const contentType = text("Content Type", "Solution");

  return `
    <cp-more-like-this
      api-url="${apiUrl}"
      content-type="${contentType}">
    </cp-more-like-this>
  `;
});
