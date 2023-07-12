const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = (env, argv) => {
    // проверить плагин на чистку dist файла
    const isProd = argv.mode === 'production'
    const isDev = !isProd

    console.log('isProd', isProd)
    console.log('isDev', isDev)

    const filename = ext => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`

    return {
        context: path.resolve(__dirname, 'src'),
        entry: {
            main: ['@babel/polyfill', './index.js']
        },
        output: {
            filename: filename('js'),
            path: path.resolve(__dirname, 'dist'),
            clean: true,
        },
        resolve: {
            extensions: ['.js'],
            alias: {
                '@': path.resolve(__dirname, 'src'),
                // '@core': path.resolve(__dirname, 'src', 'core')
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            new CopyPlugin({
                patterns: [
                  { from: path.resolve(__dirname, 'src', 'favicon.ico'), 
                  to: path.resolve(__dirname, 'dist') },
                ],
              }),
            new MiniCssExtractPlugin({
                filename: filename('css')
            })
        ],
        devtool: isDev ? 'source-map' : false,
        module: {
            rules: [
              {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
              },
              {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
              }
            ],
          },
    }
}