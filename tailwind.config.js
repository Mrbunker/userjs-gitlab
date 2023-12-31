/** @type {import('tailwindcss').Config} */
export default {
  content: ["src/**/*.{html,jsx,vue}"],
  theme: {
    extend: {},
  },
  prefix: "tw-",
  plugins: [require("daisyui")],
  daisyui: {
    logs: false,
    themes: [
      {
        mytheme: {
          primary: "#570df8",
          secondary: "#f000b8",
          accent: "#1dcdbc",
          neutral: "#2b3440",
          "base-100": "#ffffff",
          info: "#3abff8",
          success: "#1AAA55",
          warning: "#fbbd23",
          error: "#DB3B21",
        },
      },
    ],
  },
};
