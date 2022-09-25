const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  purge: { enabled: true, content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],},
  theme: {
    extend: {},
  },
  plugins: [],
});

 
