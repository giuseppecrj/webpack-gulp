import gulp from 'gulp'
import stream from 'webpack-stream'
import webpack from 'webpack'
import webpackConfig from './webpack.babel'
import server from 'browser-sync'

import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import historyApiFallback from 'connect-history-api-fallback'

gulp.task('scripts', () => {
  return gulp.src('./modules/client/main.ts')
    .pipe(stream(webpackConfig))
    .pipe(gulp.dest('./public/client/javascripts'))
})

gulp.task('scripts:watch', () => {
  let watch = Object.create(webpackConfig)
  watch.watch = true
  return gulp.src('./modules/client/main.ts')
    .pipe(stream(watch))
    .pipe(gulp.dest('./public/client/javascripts'))
})

gulp.task('server', () => {
  let config = Object.create(webpackConfig)
  config.entry = [
    'webpack-hot-middleware/client?reload=true'
  ].concat('./modules/client/main.ts')

  const compiler = webpack(config)

  server({
    port: process.env.PORT || 3000,
    open: false,
    server: { baseDir: './public/client' },
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        stats: {
          chunks: false,
          modules: false
        },
        publicPath: config.output.publicPath
      }),
      webpackHotMiddleware(compiler)
    ],
    files: [
      './public/client/index.html'
    ]
  })
})

gulp.task('watch', ['scripts:watch'])
