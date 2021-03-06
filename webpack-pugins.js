const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const paths = require('./webpack-paths');


exports.htmlPlugin = new HtmlWebpackPlugin({
  template: path.join(paths.src, 'index.html')
});

// exports.extractText = new ExtractTextPlugin('app.style.css', {allChunks: true});
exports.extractText = (devMode) => {
  return new MiniCssExtractPlugin({
    // Options similar to the same options in webpackOptions.output
    // both options are optional
    filename: devMode ? '[name].css' : '[name].[hash].css',
    chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
  })
};

exports.manifest = new ManifestPlugin({
    fileName: 'asset-manifest.json'
  }),

  exports.jqueryPlugin = new webpack.ProvidePlugin({
    'window.$': 'jquery',
    'window.jQuery': 'jquery'
  });

exports.popperPlugin = new webpack.ProvidePlugin({
  'window.Popper': 'popper.js'
});

exports.HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

exports.loaderOptions = new webpack.LoaderOptionsPlugin({
  options: {
    context: __dirname,
  },
});

exports.environmentVariables = new webpack.DefinePlugin({
  'process.env': {
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
});

// exports.uglifyJs = new webpack.optimize.UglifyJsPlugin({
//   output: {
//     comments: false,
//   },
//   compress: {
//     warnings: false,
//     drop_console: true,
//   },
// });


exports.sw = new SWPrecacheWebpackPlugin({
  // By default, a cache-busting query parameter is appended to requests
  // used to populate the caches, to ensure the responses are fresh.
  // If a URL is already hashed by Webpack, then there is no concern
  // about it being stale, and the cache-busting can be skipped.
  dontCacheBustUrlsMatching: /\.\w{8}\./,
  filename: 'service-worker.js',
  logger(message) {
    if (message.indexOf('Total precache size is') === 0) {
      // This message occurs for every build and is a bit too noisy.
      return;
    }
    console.log(message);
  },
  minify: true,
  navigateFallback: '/index.html',
  staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
});

exports.copy = new CopyWebpackPlugin([
  'src/manifest.json',
  'src/logo.png'
]);