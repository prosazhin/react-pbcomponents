/** @type {import('tailwindcss').Config} */

import theme from 'pbstyles/styles/tailwindcss';

export default {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    ...theme,
    extend: {
      ...theme.extend,
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/aspect-ratio"),
  ],
}

