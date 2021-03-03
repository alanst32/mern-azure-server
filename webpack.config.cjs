const path = require('path');
const webpackNodeExternals = require('webpack-node-externals');
const isProduction = typeof NODE_ENV !== 'undefined' && NODE_ENV === 'production';
const devtool = isProduction ? false : 'inline-source-map';

const serverConfig = {
    target: 'node',
    entry: './src/index.ts',
    output: {
        path: path.join(__dirname, 'server', 'dist'),
        filename: 'bundle.js',
    },
    externals: [webpackNodeExternals()], // Does not include code from node_modules in the server-side bundle
    devtool: 'inline-source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react', '@babel/preset-env'],
                        }
                    }
                ]
            },
            {
                test: /\.(tsx|ts)$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    }
};

module.exports = [serverConfig];
