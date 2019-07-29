"use strict";

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: [
            ["@babel/preset-env", {
              //debug: true,
              "useBuiltIns": "entry", // entry or usage
              "corejs": 3,
              "modules": false,
              "loose": true
            }]
          ],
          plugins: [
            ["transform-react-pug", { "classAttribute": "styleName" }], // transform pug to jsx
            ["react-css-modules", {
              "generateScopedName": "[local]__[sha1:hash:hex:5]",
              "filetypes": { ".sass": { "syntax": "postcss-sass" } }
            }],
            "transform-react-jsx", // transform react jsx
            "transform-react-remove-prop-types", // remove prop-types in production
            ["@babel/plugin-proposal-decorators", { "legacy": true }], // decorators
            ["@babel/plugin-proposal-class-properties", { "loose": true }], // es6 class arrow function
            "@babel/plugin-proposal-function-bind", // x.bind(this) => ::x
            "@babel/plugin-proposal-object-rest-spread", // rest/spred operator for object
            ["@babel/plugin-proposal-private-methods", { "loose": true }], // es6 class private methods
            "@babel/plugin-transform-async-to-generator", // transform async to generator
            ["@babel/plugin-proposal-pipeline-operator", { "proposal": "fsharp" }] // add pipeline operator (minimal, smart, fsharp)
          ],
          cacheDirectory: true
        }
      }]
    }
  };
};
