import webpack from 'webpack';

import paths from 'config/paths';
import loaders from '../loaders';
import aliases from '../aliases';
import vendors from '../vendors';


module.exports = {
    target: 'electron-main',
    entry: paths.electron_entry,
    output: {
        path: paths.build,
        filename: 'electron.bundle.js',
    },
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss', '.sass', '.json'], // .json for babel package.json
        alias: aliases,
        modules: ['node_modules', paths.app_modules]
    },
    module: { loaders },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     warnings: false,
        //     sourceMap: true,
        //     compress: {
        //       screw_ie8: true, // React doesn't support IE8
        //       warnings: false,
        //       unused: true,
        //       dead_code: true
        //     },
        //     mangle: {
        //       screw_ie8: true
        //     },
        //     output: {
        //       comments: false,
        //       screw_ie8: true
        //     }
        // }),
        // new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        })
    ]
};
