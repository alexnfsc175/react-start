const merge = require('webpack-merge');
const paths = require('./webpack-paths');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-pugins');
const devMode = process.env.NODE_ENV == 'development';

const common = {
    entry: paths.src,
    output: {
        path: paths.dist,
        filename: 'app.bundle.js'
    },
    module: {
        rules: [
            loaders.babel,
            loaders.eslint,
            loaders.extractCss(devMode),
            loaders.fontLoader,
            loaders.imageLoader,
            loaders.svgLoader
        ]
    },

    resolve: {
        alias: {
            components: paths.components
        },
        extensions: ['.js', '.jsx']
    },
    plugins: [plugins.extractText(devMode), plugins.htmlPlugin]
};

let config;

switch (process.env.NODE_ENV) {
    case 'production':
        config = merge(common, {
            mode: 'production',
            devtool: 'source-map',
            plugins: [
                plugins.loaderOptions,
                plugins.environmentVariables,
                // plugins.uglifyJs,
                plugins.manifest,
                plugins.sw,
                plugins.copy
            ],
            optimization: {
                minimize: true,
                namedModules: true,
                namedChunks: true,
                splitChunks: {
                    chunks: 'all'
                }
            }
        });
        break;
    case 'development':
        config = merge(common, {
            mode: 'development',
            devtool: 'eval-source-map',
            optimization: {
                splitChunks: {
                    chunks: 'all'
                }
            }
        }, loaders.devServer({
            host: process.env.host,
            port: process.env.port
        }));
        console.log('host', process.env.host);
        console.log('port', process.env.port);
        break;
}

module.exports = config;