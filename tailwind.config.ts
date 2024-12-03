import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      screens: {
        sm: "390px",
        md: "768px",
        lg: "1280px",
        xl: "1440px",
        "2xl": "1920px",
      },
      colors: {
        app: "#FACD32",
        appbase: "#1A1A1D",
      },
    },
  },
  plugins: [],
};
export default config;
