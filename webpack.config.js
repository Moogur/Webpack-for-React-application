'use strict';
/* global require __dirname */

const path = require("path");
const merge = require("webpack-merge");
const CleanWebpackPlugin = require("clean-webpack-plugin");

const js = require("./webpack/js.webpack");
const sass = require("./webpack/sass.webpack");
const img = require("./webpack/img.webpack");
const plugins = require("./webpack/plugins.webpack");
const analyzer = require("./webpack/analyzer.webpack");

let settings = merge([{
  entry: "./src/js/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js"
  },
  cache: true,
  plugins: [
    new CleanWebpackPlugin([
      "./dist/"
    ])
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: "lib",
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial'
        },
        common: {
          name: "chunk-common",
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src/js"),
      "~c": path.resolve(__dirname, "src/js/components"),
      "~s": path.resolve(__dirname, "src/js/store"),
      "~r": path.resolve(__dirname, "src/js/routes"),
      "~h": path.resolve(__dirname, "src/js/hoc"),
      "~n": path.resolve(__dirname, "src/js/containers"),
      "~a": path.resolve(__dirname, "src/js/api")
    }
  },
  devServer: {
    contentBase: "/",
    overlay: true,
    compress: true,
    historyApiFallback: true,
    port: 3000
  }
},
js(),
sass(),
img(),
plugins()]);

module.exports = (env, options) => {
  if (options.mode === "development") {
    settings.devtool = "cheap-eval-source-map";
    settings.watch = true;
    settings.watchOptions = {
      ignored: /node_modules/
    };
  } else if (options.mode === "production" && options.analyze) {
    settings = merge([settings, analyzer()]);
  }
  return settings;
};
