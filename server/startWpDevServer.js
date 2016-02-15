import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import makeConfig from '../webpack.config';

const config = makeConfig('development');
let debug = require('debug')('endorsement-data-interface:webpackDevServer');
const webpackDevServerPort = 4001;

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  quiet:false,
  historyApiFallback: true,
  stats: {
    colors: true,
    chunks:false
  }
}).listen(webpackDevServerPort, 'localhost', function (err) {
  if (err) debug(err);
  debug('Listening at localhost:%s',webpackDevServerPort);
});
