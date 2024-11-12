const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
    mode: "production",
    entry: './doc-page/index.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [{
                    loader: 'ts-loader',
                    options: {
                        configFile: "gh-page.tsconfig.json"
                    }
                }],
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'doc-page/index.html',
        scriptLoading: 'blocking',
    })],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'docs'),
        libraryTarget: "umd",
        library: "gantt2",
    },
};
