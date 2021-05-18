const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        open: false,
        port: 1337,
        historyApiFallback: true
    },
    module: {
        rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
            loader: 'babel-loader',
            },
        },
        {
          test: /\.css$/,
          use:
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true
              },
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                esModule: true,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
          ],
        },
        {
          test: /\.s[ac]ss$/i,
          use:
          [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: true
              },
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                esModule: true,
                modules: {
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        ],
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css'
      })
    ],
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: 'source-map',
};
