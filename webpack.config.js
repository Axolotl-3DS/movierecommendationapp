const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    publicPath: '/build/',
    compress: true,
    port: 8080,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: {
      '/api/**': {target: 'http://localhost:3000/'},
      '/login/**': {target: 'http://localhost:3000/'}
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
            presets: ["@babel/preset-env", "@babel/preset-react" ]
      }},
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 8192,
            },
          },
      ]}
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    })
  ],
};