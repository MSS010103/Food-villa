/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],//konsi files use krengi tailwind
  theme: {
    extend: {},
  },
  plugins: [],
}
//the postcssrc file is used to tell the bundler to convert our tailwindcss to normal css while bundling
