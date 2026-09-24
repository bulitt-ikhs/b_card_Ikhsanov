import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        card: "var(--card)",
        outline: "var(--outline)",
        white: "var(--white)",
        "dark-1": "var(--dark-1)",
        "on-bg-low": "var(--on-bg-low)",
        "on-bg-medium": "var(--on-bg-medium)",
        "on-bg-high": "var(--on-bg-high)",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
