const dotenv = require('dotenv');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');
dotenv.config();

const src = path.resolve(__dirname, 'src');
const dist = path.resolve(__dirname, 'dist');

const { NODE_ENV: environment, URL: url } = process.env;
const [host, port] = url.split(':');

module.exports = () => ({
  mode: environment,
  entry: {
    app: `${src}/index.js`,
  },
  output: {
    path: dist,
    publicPath: '/',
    filename: '[name].[contenthash].js',
  },
  plugins: [
    new Dotenv(),
    new HtmlWebpackPlugin({ template: `${src}/index.html` }),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      { test: /\.js$/, use: { loader: 'babel-loader' } },
    ],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          priority: 0,
        },
        'react-vendors': {
          chunks: 'all',
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          priority: 1
        },
      },
    },
  },
  devServer: {
    host,
    port,
    contentBase: dist,
    compress: true,
    historyApiFallback: true,
    disableHostCheck: true,
  },
});