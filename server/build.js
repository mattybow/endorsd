import webpack from 'webpack';
import makeConfig from '../webpack.config';

const config = makeConfig('production');

webpack(config, (err,stats) => {
  if(err){
    console.log(err);
  }
  console.log(stats);
});
// , {
//     publicPath: config.output.publicPath,
//     hot: true,
//     quiet:false,
//     historyApiFallback: true,
//     stats: {
//       colors: true,
//       chunks:false
//     }
//   });
// }
