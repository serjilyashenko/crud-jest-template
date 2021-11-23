import path from 'path'
const NodemonPlugin = require('nodemon-webpack-plugin')

export default {
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [new NodemonPlugin()],
}
