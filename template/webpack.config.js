const webpack = require('webpack');
const path = require("path");
const HTML = require('html-webpack-plugin');

module.exports =  {
  entry: './index.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      { test: /\.js$/, exclude: /(node_modules)/, use: ['babel-loader'] },
      { test: /\.(glsl|frag|vert)$/, use: ['raw-loader', 'glslify-loader'] },
      { test: /\.(png|jpg)$/, use: ['url-loader']},
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
    ]
  },
  plugins: [ new HTML() ]
}