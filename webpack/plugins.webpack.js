"use strict";
/* global __dirname */

const copyPlugin = require("copy-webpack-plugin");
const path = require("path");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");

module.exports = function () {
  return {
    plugins: [
      new copyPlugin([
        { from: `./src/html`, to: "./" }, // copy pug
      ]),
      new ParallelUglifyPlugin(
        process.env.NODE_ENV === "development" ? {} : uglifyJS()
      )
    ]
  };
};

function uglifyJS() {
  return {
    cacheDir: path.join(__dirname, "node_modules", ".cache", "parallel-uglify"),
    uglifyJS: {
      warnings: false,
      output: {
        comments: false,
        beautify: false
      },
      compress: {
        sequences: true,
        booleans: true,
        loops: true,
        unused: true,
        drop_console: true,
        unsafe: true
      }
    }
  };
}