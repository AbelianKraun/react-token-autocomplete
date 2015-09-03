var path = require('path');
var webpackConf = require('peters-toolbelt').webpack;
var plugins = [];
var conf = new webpackConf({
                entry: './src',
                output: {
                    path: path.join(__dirname, '/dist'),
                    filename: 'index.js'
                },
                plugins: plugins
            })
            .iNeedReact()
            .iNeedHotDevServer()
            .getConfig();

module.exports = conf;
