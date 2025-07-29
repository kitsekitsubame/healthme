/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./**/*.html",
      "./**/*.{js,jsx,ts,tsx}",
      "./twlayout-plugin/demo/**/*.html"
  ],
  theme: {
    extend: {},
  },
  corePlugins: {
    // Disable Tailwind's grid column utilities that conflict with our layout system
    gridColumn: false,
    gridColumnStart: false,
    gridColumnEnd: false,
  },
  plugins: [
    require("./twlayout-plugin/scripts/twlayout-plugin")
  ],
}