const { DefinePlugin } = require('webpack');
const DotenvPlugin = require('dotenv-webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');

const packageJson = require('../package.json');

const ManifestOptions = {
  // ManifestOptions
};

module.exports = ({ isProd, isDevel, WEBPACK_BUNDLE, WEBPACK_BUILD, WEBPACK_SERVE }) => {
  return {
    plugins: [
      new DefinePlugin({
        APP_NAME: JSON.stringify(packageJson.name),
        APP_VERSION: JSON.stringify(packageJson.version),
        APP_MODE: JSON.stringify(isProd ? 'production' : 'development'),
        WEBPACK_BUNDLE: JSON.stringify(!!WEBPACK_BUNDLE),
        WEBPACK_BUILD: JSON.stringify(!!WEBPACK_BUILD),
        WEBPACK_SERVE: JSON.stringify(!!WEBPACK_SERVE)
      }),
      new DotenvPlugin({
        allowEmptyValues: true,
        systemvars: true,
        silent: true,
        defaults: true
      }),
      new HTMLWebpackPlugin(
        Object.assign(
          {},
          {
            title: packageJson.name,
            inject: true,
            template: './src/index.html'
          },
          isProd ? {
            minify: {
              removeComments: true,
              collapseWhitespace: true,
              removeRedundantAttributes: true,
              useShortDoctype: true,
              removeEmptyAttributes: true,
              removeStyleLinkTypeAttributes: true,
              keepClosingSlash: true,
              minifyJS: true,
              minifyCSS: true,
              minifyURLs: true
            }
          } : undefined
        )
      ),
      isProd ? new InlineChunkHtmlPlugin(HTMLWebpackPlugin, [/runtime-.+[.]js/]) : undefined,
      isDevel ? new ReactRefreshWebpackPlugin({ overlay: false }) : undefined,
      isDevel ? new CaseSensitivePathsPlugin() : undefined,
      isProd ? new MiniCSSExtractPlugin({
        filename: 'css/[name].css',
        chunkFilename: 'css/[name].[fullhash:8].chunk.css'
      }) : undefined,
      new WindiCSSWebpackPlugin(),
      new WebpackManifestPlugin(ManifestOptions)
    ].filter(Boolean)
  };
};
