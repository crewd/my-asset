/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: "#223144",
        secondary: "#2D4059",
        plus: "#13DE7C",
        minus: "#F13B3B"
      },
      fontSize: {
        regular: "16px",
        xxl: "36px",
        xl: "24px",
        lg: "21px",
        md: "18px",
        xs: "14px",
        xxs: "12px"
      },
      fontFamily: {
        sans: ["Noto Sans", 'sans-serif']
      }
    },
  },
  plugins: [],
};
