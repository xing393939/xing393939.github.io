const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'main.js'),
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
  output: {
    path: path.resolve(__dirname, '../js'),
    filename: 'build.js'
  },
  module: {
    rules: [
      {test: /\.css$/, use: 'css-loader' }, 
      {test: /\.vue$/, use: 'vue-loader' }, 
      {test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  resolve:{
    alias:{
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('')
    }
  }
};