const helpers = require('./helpers');
const webpackMerge = require('webpack-merge');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const commonConfig = require('./webpack.common');

const config = {
  mode: 'production',
  devtool: 'source-map',
  output: {
    path: helpers.root('dist'),
    filename: '[name].[chunkhash].bundle.js',
    sourceMapFilename: '[file].map',
    chunkFilename: '[name].[chunkhash].chunk.js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: helpers.root('webpack-cache/uglify-cache')
      })
    ],
    splitChunks: {
      chunks: 'all'
    }
  }
}

module.exports = webpackMerge(commonConfig, config);