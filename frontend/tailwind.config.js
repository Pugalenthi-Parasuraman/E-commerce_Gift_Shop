/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  require: "@designbycode/tailwindcss-text-shadow",
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        rubik: ["Rubik", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        ubuntu_sans: ["Ubuntu Sans", "sans-serif"],
        futura: ["futura-medium", "sans-serif"],
      },
    },
    screens: {
      // => @media (max-width: 1536px)
      xl: { min: "1024px" },
    },
  },
  plugins: [
    // require("flowbite/plugin"),
    require("@designbycode/tailwindcss-text-shadow")({
      shadowColor: "rgba(0, 0, 0, 0.55)",
      shadowBlur: "2px",
      shadowOffsetX: "1px",
      shadowOffsetY: "1px",
    }),
  ],
};

