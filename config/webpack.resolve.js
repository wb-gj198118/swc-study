const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = () => {
  return {
    resolve: {
      modules: [
        'node_modules'
      ],
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.mjs.json'],
      // alias: {

      // },
      plugins   : [
        new TsconfigPathsPlugin({})
      ]
    }
  };
};
