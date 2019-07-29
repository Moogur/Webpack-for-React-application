"use strict";

module.exports = function () {
  return {
    module: {
      rules: [{
        test: /\.(jpg|jpeg|png)$/i,
        exclude: /node_modules/,
        use: [{
          loader: "url-loader",
          options: {
            limit: 4096,
            quality: 75
          }
        }]
      }]
    }
  };
};