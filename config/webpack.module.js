const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = ({ isProd, isDevel }) => {
  const makeStyleLoaders = (cssOptions, callback) => {
    const _loaders = [];
    if (isDevel) {
      _loaders.push({
        loader : require.resolve('style-loader'),
        options: {}
      });
    }
    if (isProd) {
      _loaders.push({
        loader : MiniCSSExtractPlugin.loader,
        options: {}
      });
    }
    _loaders.push(...[
      {
        loader : require.resolve('css-loader'),
        options: {
          ...(cssOptions || {})
        }
      },
      {
        loader : require.resolve('postcss-loader'),
        options: {} // 建议通过 postcss.config.js 来添加
      }
    ]);
    // 这里我们通过一个 callback 的方式，来处理追加的 loader 处理
    if (typeof callback === 'function') {
      return callback(_loaders);
    }
    return _loaders;
  };

  return {
    module: {
      strictExportPresence: true,
      rules               : [
        { parser: { requireEnsure: false } },
        {
          oneOf: [
            { // 将 SVG 转为组件，作为最高优先级
              test  : /\.svg$/i,
              issuer: /\.[jt]sx?$/,
              // resourceQuery: { not: [/url/] }, // 官方示例做法，在 TS 环境并不适合
              use: ['@svgr/webpack']
            },
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /\.svg$/],
              use : [
                {
                  loader : require.resolve('file-loader'),
                  options: {
                    limit: 10000,
                    name : 'img/[name].[contenthash:8].[ext]'
                  }
                }
                // isDevel ? undefined : { // 可选图片压缩处理，如需启用，请安装 image-webpack-loader
                //   loader : require.resolve('image-webpack-loader'),
                //   options: {
                //     // mozjpeg: { // @see https://github.com/imagemin/imagemin-mozjpeg
                //     //   quality: 70
                //     //   progressive: true,
                //     // },
                //     // optipng : { // @see https://github.com/imagemin/imagemin-optipng
                //     //   enabled: false,
                //     // },
                //     // pngquant: { // @see https://github.com/imagemin/imagemin-pngquant
                //     //   quality: [0.65, 0.90],
                //     //   speed  : 4
                //     // },
                //     // svgo: { // @see https://github.com/imagemin/imagemin-svgo
                //     //
                //     // },
                //     // gifsicle: { // @see https://github.com/imagemin/imagemin-gifsicle
                //     //   interlaced: false,
                //     // },
                //     // webp: { // @see https://github.com/imagemin/imagemin-webp
                //     //   quality: 70
                //     // }
                //   },
                // }
              ].filter(Boolean)
            },
            {
              test   : /\.(js|mjs|jsx|ts|tsx)$/,
              exclude: /(node_modules|bower_components)/,
              use    : [
                {
                  loader : require.resolve('swc-loader'),
                  options: {
                    jsc: {
                      transform: {
                        react: {
                          development: isDevel,
                          refresh    : isDevel
                        }
                      }
                    }
                  }
                }
              ]
            },
            {
              test   : /\.css$/,
              exclude: /\.module\.css$/,
              use    : makeStyleLoaders({
                importLoaders: 1,
                sourceMap    : isDevel,
                modules      : {
                  mode: 'icss'
                }
              }),
              // Don't consider CSS imports dead code even if the
              // containing package claims to have no side effects.
              // Remove this when webpack adds a warning or an error for this.
              // See https://github.com/webpack/webpack/issues/6571
              sideEffects: true
            },
            {
              test: /\.module\.css$/,
              use : makeStyleLoaders({
                importLoaders: 1,
                sourceMap    : isDevel,
                modules      : {
                  mode         : 'local',
                  getLocalIdent: getCSSModuleLocalIdent
                }
              })
            },
            {
              loader : require.resolve('file-loader'),
              exclude: [/(^|\.(svg|mjs|json|js|jsx|ts|tsx|html))$/],
              type   : 'asset/resource',
              options: {
                name: 'files/[name].[contenthash:8].[ext]'
              }
            }
          ]
        }
      ]
    }
  };
};
