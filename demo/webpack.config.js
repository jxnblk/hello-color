const webpack = require('webpack')

module.exports = {
  entry: './demo/index.js',
  output: {
    path: __dirname,
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.js?$/,
        include: /bikeshed/,
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    contentBase: 'demo',
    // hot: true
  }
}
