const path = require('path');

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
  },
  devServer: {
    // proxy: { // proxy URLs to backend development server
    //   '/api': 'http://localhost:3000'
    // },
    contentBase: path.join(__dirname, "public"),
 },
}
