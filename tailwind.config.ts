import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        '2/3vh': '66vh',
        '7/10vh': '70vh',
      },
      transitionDuration: {
        '1500': '1500ms'
      },
      backgroundImage: {
        'sunset': "url('/bg-1.png')"
      }
    }
  },
  plugins: [],
};
export default config;
