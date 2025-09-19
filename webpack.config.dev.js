const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    liveReload: true,
    hot: true,
    open: true,
    static: ['./'],
    host: '0.0.0.0', // Allow external connections
    port: 3000,
    allowedHosts: 'all', // Allow all hosts
  },
});
