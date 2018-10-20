const webpack = require('webpack');
const path = require('path');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const helpers = require('./helpers');
const { AngularCompilerPlugin } = require('@ngtools/webpack');

const config = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: '@ngtools/webpack',
        exclude: [/node_modules/]
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
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
    }),
    new webpack.ContextReplacementPlugin(
      /\@angular(\\|\/)core(\\|\/)fesm5/,
      path.resolve(__dirname, 'src'), {}
    ),
    new ProgressPlugin(),
    new AngularCompilerPlugin({
      platform: 0,
      entryModule: path.join(__dirname, '../src/app/app.module#AppModule'),
      sourceMap: true,
      tsConfigPath: path.join(__dirname, '../tsconfig.json'),
      skipCodeGeneration: true,
    })
  ]
}

module.exports = config;