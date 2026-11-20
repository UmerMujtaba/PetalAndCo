import type { Config } from 'tailwindcss';
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ivory: "#FAF7F2",
        charcoal: "#2B2B2B",
        sage: "#8A9A86",
        rose: "#D8A7A7",
        gold: "#C9A96E",
        line: "#E9E4DC",
      },
      fontFamily: {
        serif: ['"Playfair Display"', "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
  