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
        // Paleta SENA FINANZAS: 100 #CFF0EA, 300 #88C9C4, 500 #3E9B94, 700 #20666B, 900 #0C3B45
        brand: {
          50: "#E8F7F4",
          100: "#CFF0EA",
          200: "#ABDDD7",
          300: "#88C9C4",
          400: "#55B3AB",
          500: "#3E9B94",
          600: "#2E8A85",
          700: "#20666B",
          800: "#165158",
          900: "#0C3B45",
          950: "#072A32",
        },
        navy: {
          800: "#165158",
          900: "#0C3B45",
          950: "#072A32",
        },
      },
    },
  },
  plugins: [],
};
export default config;
