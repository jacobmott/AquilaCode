const { createGlobPatternsForDependencies } = require("@nx/angular/tailwind");
const { join } = require("path");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(__dirname, "src/**/!(*.stories|*.spec).{ts,html}"),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      screens: {
        tall: { raw: "(min-height: 800px)" },
        // => @media (min-height: 800px) { ... }
      },
      backgroundSize: {
        "size-200": "200% 200%",
      },
      backgroundPosition: {
        "pos-0": "0% 0%",
        "pos-100": "100% 100%",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      colors: {
        aquila: {
          50: "#2B2F53",
          400: "#1D1C34",
          900: "#1D1C34",
        },
        aquilapink: {
          50: "#f0c8fe",
          100: "#FFC0FF",
          400: "#FF8DFF",
          600: "#F75AFF",
          900: "#C427FB",
        },
      },
    },
  },
  plugins: [],
};
