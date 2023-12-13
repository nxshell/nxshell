const path = require('path');

module.exports = {
  entry: './app/renderer.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app_bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
