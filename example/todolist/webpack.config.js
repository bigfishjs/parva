var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    "app": "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
    publicPath: "/dist/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.join(__dirname, './src'),
        use: [{
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              require.resolve('babel-preset-es2015'),
              require.resolve('babel-preset-react'),
              require.resolve('babel-preset-stage-0'),
            ],
            plugins: [
              require.resolve('babel-plugin-add-module-exports'),
              require.resolve('babel-plugin-react-require'),
              require.resolve('babel-plugin-transform-runtime'),
              require.resolve('babel-plugin-transform-decorators-legacy'),
            ],
            cacheDirectory: false,
          },
        }],
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, './node_modules'),
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: false,
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
  },
}