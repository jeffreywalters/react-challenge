const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'build')
}

module.exports = {
  // Entry accepts a path or an object of entries.
  // We'll be using the latter form given it's
  // convenient with more complex configurations.
  entry: {
    app: PATHS.app
  },
  output: {
    path: PATHS.build,
    publicPath: '/assets/',
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React Challenge'
    })
  ],
  devtool: 'eval-source-map',
  module: {
    preloaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
        // ,query: {
        //   presets: ['react', 'es2015', 'stage-2']
        // }
      },
      {
        test: /\.png$/,
        loader: 'url'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(ttf|svg|woff)$/,
        loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]'
      }
    ]
  },

  resolve: {
    root: [
      path.resolve(__dirname, 'app'),
      path.resolve(__dirname, 'node_modules')
    ],
    modules: [
      path.resolve(__dirname, 'app'),
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    color: true,
    reason: true,
    chunks: false
  }
}
