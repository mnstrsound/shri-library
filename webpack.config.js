'use strict';

module.exports = {
    entry: './js/lib/SHRI',
    output: {
        path: './build/js',
        filename: 'lib.js',
        library: 'lib'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    }
};