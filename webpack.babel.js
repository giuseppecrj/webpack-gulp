import webpack from 'webpack'
import path from 'path'

export default {
  entry: [],
  output: {
    path: path.resolve('./public/client'),
    publicPath: '/client/',
    filename: 'main.js'
  },
  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  module: {
    loaders: [
      { test: /\.pug$/, loader: 'pug-html' },
      { test: /\.tsx?/, loader: 'ng-annotate!awesome-typescript' }
    ]
  },
  ts: {
    transpileOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}
