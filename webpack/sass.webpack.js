"use strict";

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.s(c|a)ss$/i,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: process.env.NODE_ENV === "development"
          }
        }, {
          loader: "css-loader",
          options: {
            importLoaders: 2,
            modules: {
              localIdentName: "[local]__[sha1:hash:hex:5]"
            }
          }
        }, {
          loader: "postcss-loader",
          options: process.env.NODE_ENV === "development" ? "none" : postcss()
        }, {
          loader: "sass-loader"
        }, {
          test: /\.css$/i,
          use: [{
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === "development"
            }
          }, {
            loader: "css-loader"
          }]
        }]
      }]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/style.css"
      })
    ]
  };
};

function postcss() {
  return {
    plugins: [
      require("autoprefixer"),
      require("postcss-flexbugs-fixes"),
      require("css-mqpacker"),
      require("cssnano")({
        preset: [
          "default", {
            discardComments: {
              removeAll: true
            }
          }
        ]
      })
    ]
  };
}