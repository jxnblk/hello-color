
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'umd.js',
    library: 'hello',
    libraryTarget: 'umd'
  },

  module: {
    loaders: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          plugins: 'add-module-exports'
        }
      },
      {
        test: /\.m?js?$/,
        include: /bikeshed/,
        loader: 'babel'
      }
    ]
  },
}
