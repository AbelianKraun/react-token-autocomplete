var path = require('path');
var webpackConf = require('peters-toolbelt').webpack;

var plugins = [];

var conf = new webpackConf({
  devtool: 'source-map',
  entry: './src',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
    library: 'TokenAutocomplete',
    libraryTarget: 'umd'
  },
  resolve: {
    alias: {
      utils: path.join(__dirname, 'src/_utils')
    },
    modulesDirectories: ['node_modules']
  },
  plugins: plugins
})
  .iNeedReact()
  .iNeedWebFonts()
  .iNeedSCSS()
  .iNeedHotDevServer()
  .getConfig();

/*RegExp.prototype.toJSON = RegExp.prototype.toString;
console.log('CURRENT CONFIG', JSON.stringify(conf, null, 4));*/

module.exports = conf;
