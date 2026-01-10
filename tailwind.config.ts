import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "var(--scrollbar-thumb)",
        "scrollbar-bg": "var(--scrollbar-bg)",
        "focus-blue": "rgb(var(--focus-ring-color) / <alpha-value>)",
        main: "var(--color-text-main)",
        secondary: "var(--color-text-secondary)",
        "input-border": "var(--color-border-input)",
      },
    },
  },
  plugins: [],
};

export default config;
