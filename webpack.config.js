const webpack = require('webpack');
const path = require('path');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

module.exports = {
  devtool: isProd ? 'hidden-source-map' : 'cheap-eval-source-map',
  context: path.join(__dirname, './src'),
  entry: {
    js: './index.js',
  },
  output: {
    path: path.join(__dirname, './build'),
    libraryTarget: 'umd',
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        // exclude: /node_modules/,
        include: [
          path.join(__dirname, './src'),
        ],
        loader: 'babel-loader',
        query: {
          plugins: [
            // node4 with native modules
            'transform-es2015-function-name',
            'transform-es2015-sticky-regex',
            'transform-es2015-unicode-regex',
            'transform-es2015-spread',
            'transform-es2015-parameters',
            'transform-es2015-destructuring',
            'transform-es2015-shorthand-properties',
          ],
        },
      },
    ],
  },
  externals: [
    'aws-sdk',
  ],
  resolve: {
    extensions: ['', '.js'],
    modules: [
      path.resolve('./src'),
      'node_modules',
    ],
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: false,
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
  ],
};
