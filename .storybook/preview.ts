import type { Preview } from '@storybook/react';
import { initialize, mswLoader } from 'msw-storybook-addon';

import '../src/app/styles/index.css';

initialize();

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      element: '#storybook-root',
      config: {},
      options: {},
      manual: false,
    },
  },
  loaders: [mswLoader],
};

export default preview;
