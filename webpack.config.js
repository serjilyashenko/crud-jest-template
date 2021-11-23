const path = require('path')
const NodemonPlugin = require('nodemon-webpack-plugin')

module.exports = {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new NodemonPlugin(), // Dong
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
