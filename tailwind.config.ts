import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./modules/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        section: "-10px 4px 50px 0px rgba(70, 32, 120, 1)",
      },
      backgroundImage: {
        "zenith-gradient":
          "linear-gradient(60deg, #25BDB3 13.01%, #9747FF 65%, #462078 91.58%)",
        "zenith-gradient-to-t":
          "linear-gradient(90deg, #25BDB3 13.01%, #9747FF 70.76%, #462078 91.58%)",
        "background-zenith-gradient":
          "linear-gradient(105deg, #9848FF 20.24%, #5297D6 34.21%, #21CFBA 46.36%, #2AA7AB 59.72%, #462078 71.57%), linear-gradient(0deg, #9747FF, #9747FF);",
      },
      colors: {
        primary: "#462078",
        secondary: "#F0E4FF",
        accent: "#9747FF",
        text: "#282828",
      },
    },
  },
  plugins: [],
};
export default config;
