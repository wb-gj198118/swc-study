'use strict';
const { resolve, join } = require('path');

module.exports = async function ({ WEBPACK_BUNDLE, WEBPACK_BUILD, WEBPACK_SERVE }) {
  const isProd = process.env.NODE_ENV === 'production';
  const isDevel = !isProd;

  const env = {
    root: process.cwd(),
    isProd, isDevel,
    WEBPACK_BUNDLE, WEBPACK_BUILD, WEBPACK_SERVE
  };

  const devServer = {
    compress: true,
    open: true,
    static: {
      directory: join(__dirname, 'public')
    }
  };

  return {
    mode: isProd ? 'production' : 'development',
    entry: {
      main: './src/index.tsx'
    },
    output: {
      publicPath: '/',
      path: resolve('dist'),
      filename: 'js/[name].js',
      chunkFilename: 'js/[name].[fullhash:8].chunk.js',
      pathinfo: isDevel
    },
    devtool: isDevel ? 'eval-source-map' : false,
    performance: false,
    devServer,
    cache: {
      type: 'memory'
    },
    ...require('./config/webpack.optimization')(env),
    ...require('./config/webpack.resolve')(env),
    ...require('./config/webpack.module')(env),
    ...require('./config/webpack.plugins')(env)
  };
};
