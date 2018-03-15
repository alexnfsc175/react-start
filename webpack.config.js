const merge = require('webpack-merge');
const paths = require('./webpack-paths');
const loaders = require('./webpack-loaders');
const plugins = require('./webpack-pugins');

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
            loaders.extractCss,
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
    plugins: [plugins.extractText, plugins.htmlPlugin]
};

let config;

switch (process.env.NODE_ENV) {
    case 'production':
        config = merge(common, {
            devtool: 'source-map',
            plugins: [
                plugins.loaderOptions,
                plugins.environmentVariables,
                plugins.uglifyJs,
                plugins.manifest,
                plugins.sw,
                plugins.copy
            ]
        });
        break;
    case 'development':
        config = merge(common, {
            devtool: 'eval-source-map'
        }, loaders.devServer({host: process.env.host, port: process.env.port}));
        console.log('host', process.env.host);
        console.log('port', process.env.port);
        break;
}

module.exports = config;