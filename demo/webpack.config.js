
var webpack = require('webpack')

module.exports = {

  entry:  {
    dev: [
      'webpack-dev-server/client?http://localhost:8080/',
      'webpack/hot/only-dev-server',
      './demo/entry.js'
    ],
    bundle: [
      './demo/entry.js'
    ],
  },

  output: {
    path: __dirname,
    publicPath: 'demo',
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ['babel']
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    hot: true
  }

}
