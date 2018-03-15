"use strict";

const path = require('./webpack-paths');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

exports.devServer = function (options) {
    return {
        devServer: {
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'errors-only',
            host: options.host,
            port: options.port,
            contentBase: './dist'
        },
        plugins: [new webpack.HotModuleReplacementPlugin({multistep: true})]
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
    use: [
        {
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

exports.extractCss = {
    test: /\.(css|sass|scss)$/,
    use: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
};

exports.fontLoader = {
    test: /\.(woff|woff2|eot|ttf|svg)$/,
    loader: 'url-loader?limit=100000'
};
