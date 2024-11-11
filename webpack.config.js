const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "production",
    devtool: 'inline-source-map',
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'test.html',
        template: 'src/assets/test.html',
        scriptLoading: 'blocking',
    })],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: "window",
        library: "Gantt2",
    },
};
