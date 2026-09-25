import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bank: {
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#b9ddfe",
          300: "#7cc1fd",
          400: "#36a1fa",
          500: "#0c83eb",
          600: "#0266c9",
          700: "#0351a3",
          800: "#074586",
          900: "#0c3b70",
          950: "#082549",
        },
        navy: {
          800: "#0f2038",
          900: "#0a1626",
          950: "#060e18",
        },
        emerald: {
          500: "#10b981",
          600: "#059669",
          700: "#047857",
        },
      },
    },
  },
  plugins: [],
};
export default config;
