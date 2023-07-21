/** @type {import('tailwindcss').Config} */

import typography from '@tailwindcss/typography';
import forms from '@tailwindcss/forms';
import aspectRatio from '@tailwindcss/aspect-ratio';

import theme from 'pbstyles/styles/tailwindcss/index.js';

export default {
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
    },
  },
  plugins: [typography, forms, aspectRatio],
};
