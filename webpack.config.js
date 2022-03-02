//webpack.config.js
const path = require('path')
const webpack = require('webpack')

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require('vue-loader')
module.exports = {
  //mode: 'none',
  mode:"production",
  entry: {
    "sp-ui": "./src/index.js",
    // "sp-ui.min":"./src/index.js",

  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
    library: "sp-ui",
    libraryExport: "default",
    libraryTarget: "umd"
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new webpack.ProvidePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('development')
    // }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      scriptLoading: 'blocking',
      inject: 'head'
    })
  ]
}
