const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const devtool = isProduction ? false : 'inline-source-map';

const serverConfig = {
    target: 'node', 
    entry: './src/index.ts', // Server NodeJs file
    output: {
        path: path.join(__dirname, 'dist'), // Specify bundle location directory
        filename: 'bundle.js',
    },
    externals: [webpackNodeExternals()], // Does not include code from node_modules in the server-side bundle
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'], // Specify extensions used in the project
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts)$/,
                use: 'ts-loader', // With ts-loader tsx adn ts files are translated to bundle.
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = [serverConfig];
