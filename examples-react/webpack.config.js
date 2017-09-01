var path = require('path');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, './node_modules')],
    alias: {
      'droplet-tree': path.resolve(__dirname, '../droplet-tree'),
      'droplet-core': path.resolve(__dirname, '../droplet-core')
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: "babel-loader",
      query: {
        presets: [
          'babel-preset-es2015',
          'babel-preset-react',
          'babel-preset-stage-0',
        ].map(require.resolve)
      }
    },{
      test: /\.scss$/,
      use: [{
        loader: "style-loader" // creates style nodes from JS strings
      }, {
        loader: "css-loader" // translates CSS into CommonJS
      }, {
        loader: "sass-loader" // compiles Sass to CSS
      }]
    }]
  }
};
