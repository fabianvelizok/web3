const path = require('path');
const distPath = path.join(__dirname, './dist');

module.exports = {
  entry: path.join(__dirname, 'src', 'index.js'),
  output: {
    filename: 'main.js',
    path: distPath
  },
  devServer: {
    contentBase: distPath,
    port: 9000,
    compress: true
  },
  mode: 'development'
}