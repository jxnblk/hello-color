
var webpack = require('webpack')

module.exports = {
  entry:  {
    dev: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './demo/index.js'
    ],
    bundle: [
      './demo/index.js'
    ],
  },

  output: {
    path: __dirname,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.js?$/,
        include: /bikeshed/,
        loader: 'babel'
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    contentBase: 'demo',
    hot: true
  }
}
