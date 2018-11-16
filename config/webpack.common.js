const webpack = require('webpack');
const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
var helpers = require('./helpers');

const isDevMode = process.env.NODE_ENV !== 'production' ? true : false;

const config = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'main': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    modules: [helpers.root('src'), helpers.root('node_modules')]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        exclude: [/\.(spec|e2e)\.ts$/, /node_modules/],
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: ['@angular-devkit/build-optimizer/webpack-loader', '@ngtools/webpack']
      },
      {
        test: /\.ts$/,
        loader: 'null-loader',
        include: [/\.(spec|e2e)\.ts$/],
      },
      {
        test: /[\/\\]@angular[\/\\]core[\/\\].+\.js$/,
        parser: {
          system: true
        },
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      {
        test: /\.(eot|woff|woff2|ttf|png|jpg|gif|svg|ico)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          context: helpers.root('src', 'assets'),
          name: '[path][name].[ext]'
        },
      },
      {
        test: /\.(css|scss)$/,
        include: helpers.root('src', 'app'),
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      favicon: './src/assets/images/favicon-pencil.ico',
      chunksSortMode: (a, b) => {
        const entryPoints = ['polyfills', 'vendor', 'main'];
        return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
      },
      inject: 'body',
      xhtml: true,
      minify: isDevMode ?
        {
          collapseWhitespace: true,
          collapseInlineTagWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true
        }
        : false
    }),
    new ProgressPlugin(),
    new AngularCompilerPlugin({
      platform: 0,
      polyfills: './src/polyfills.ts',
      mainPath: './src/main.ts',
      entryModule: path.join('src', 'app/app.module#AppModule'),
      sourceMap: true,
      tsConfigPath: path.join('', 'tsconfig.json'),
      skipCodeGeneration: true,
    }),
    new WebpackInlineManifestPlugin(),
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core/,
      path.join(__dirname, '../src'),
      {}
    )
  ]
}

module.exports = config;
