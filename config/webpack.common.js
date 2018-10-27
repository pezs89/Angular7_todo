const webpack = require('webpack');
const path = require('path');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackInlineManifestPlugin = require('webpack-inline-manifest-plugin');
const helpers = require('./helpers');

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
        exclude: [/node_modules/]
      },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        use: ['@angular-devkit/build-optimizer/webpack-loader', '@ngtools/webpack']
      },
      {
        test: /\.js$/,
        loader: '@angular-devkit/build-optimizer/webpack-loader'
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
        test: /\.(scss|sass)$/,
        exclude: helpers.root('src', 'app'),
        use: [
          'css-hot-loader',
          process.env.NODE_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('autoprefixer')({
                'browsers': ['last 5 versions']
              })],
            }
          },
          'css-loader',
          'sass-loader',
        ]
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
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      chunksSortMode: (a, b) => {
        const entryPoints = ['inline', 'polyfills', 'sw-register', 'styles', 'vendor', 'main'];
        return entryPoints.indexOf(a.names[0]) - entryPoints.indexOf(b.names[0]);
      },
      inject: 'body',
      xhtml: true,
      minify: process.env.NODE_ENV === 'production'
        ? {
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
    new WebpackInlineManifestPlugin()
  ]
}

module.exports = config;