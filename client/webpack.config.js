/* eslint comma-dangle: ["error",
 {"functions": "never", "arrays": "only-multiline", "objects":
 "only-multiline"} ] */

const webpack = require('webpack')
const path = require('path')

const devBuild = process.env.NODE_ENV !== 'production'

if (devBuild) {
  require('dotenv').config()
}

const config = {
  entry: ['es5-shim/es5-shim', 'es5-shim/es5-sham', 'babel-polyfill', './src'],

  output: {
    filename: 'webpack-bundle.js',
    path: path.resolve(__dirname, '../app/assets/webpack')
  },

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js']
  },

  plugins: [new webpack.EnvironmentPlugin(['NODE_ENV', 'API_URL'])],

  module: {
    rules: [
      {
        test: require.resolve('react'),
        use: {
          loader: 'imports-loader',
          options: {
            shim: 'es5-shim/es5-shim',
            sham: 'es5-shim/es5-sham'
          }
        }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
}

module.exports = config

if (devBuild) {
  console.log('Webpack dev build for Rails') // eslint-disable-line no-console
  module.exports.devtool = 'eval-source-map'
} else {
  console.log('Webpack production build for Rails') // eslint-disable-line no-console
}
