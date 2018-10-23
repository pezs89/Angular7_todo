const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const config = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    watchOptions: {
      poll: true
    },
    port: 9000
  }
}

module.exports = merge(commonConfig, config);