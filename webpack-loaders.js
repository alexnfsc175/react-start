"use strict";

// const path = require('./webpack-paths');
const webpack = require('webpack');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postcssModules = require('postcss-modules');
const breakpoints = require('./breakpoints.json');

exports.devServer = function (options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port,
            contentBase: './dist',
            proxy: {
                '/api': 'http://localhost:8080'
            }
        },
        plugins: [new webpack.HotModuleReplacementPlugin({
            multistep: true
        })]
    };
};

exports.babel = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: ['@babel/preset-env']
        }
    }
};

exports.eslint = {
    test: /\.js$/,
    exclude: /node_modules/,
    // use: ['eslint-loader']
    use: [{
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        },
        'eslint-loader'
    ]
};

exports.imageLoader = {
    test: /\.(gif|png|jpe?g)$/i,
    use: [
        'file-loader', {
            loader: 'image-webpack-loader',
            options: {
                bypassOnDebug: true,
                mozjpeg: {
                    progressive: true,
                    quality: 65
                },
                // optipng.enabled: false will disable optipng
                optipng: {
                    enabled: false
                },
                pngquant: {
                    quality: '65-90',
                    speed: 4
                },
                gifsicle: {
                    interlaced: false
                },
                // the webp option will enable WEBP
                webp: {
                    quality: 75
                }
            }
        }
    ]
};

exports.svgLoader = {
    test: /\.inline\.svg$/,
    use: ['svg-react-loader']
};

exports.extractCss = (devMode) => ({
    // test: /\.(css|sass|scss)$/,
    // use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
    test: /\.(sa|sc|c)ss$/,
    use: [
        MiniCssExtractPlugin.loader,
        {
            loader: 'css-loader',
            options: {
                modules: true,
                // minimize: true,
                // localIdentName: '[hash:base64:5]'
                localIdentName: '[path][name]__[local]--[hash:base64:5]',
                getLocalIdent: getLocalIdent
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                plugins: function () {
                    return [
                        require('postcss-cssnext')({
                            features: {
                                customMedia: {
                                    extensions: breakpoints,
                                }
                            }
                        }),
                        require('cssnano')()
                    ]
                }
            }
        },
        {
            loader: 'sass-loader',
            options: {
                sourceMap: true
            }
        }
    ],
});

exports.fontLoader = {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader?limit=100000'
};

//
const {
    relative
} = require('path');

const scopeNames = {};
const cssExportMap = {};

const generateScopedName = function (name, filename) {
    let dir = relative(__dirname, filename);
    let hash = `${dir}:${name}`;
    if (!Object.prototype.hasOwnProperty.call(scopeNames, hash)) {
        // base 36 encode the unique scope name
        let i = Object.keys(scopeNames).length;
        scopeNames[hash] = `_${i.toString(36)}`;
    }
    return scopeNames[hash];
};


const getLocalIdent = (context, localIdentName, localName, options) => {
    let dir = relative(__dirname, context.resourcePath);
    let hash = `${dir}:${localName}`;
    if (!Object.prototype.hasOwnProperty.call(scopeNames, hash)) {
        // base 36 encode the unique scope name
        let i = Object.keys(scopeNames).length;
        scopeNames[hash] = `_${i.toString(36)}`;
    }
    return scopeNames[hash];
   
  }


const getJSON = function (path, exportTokens) {
    cssExportMap[path] = exportTokens;
    console.log(exportTokens);
}