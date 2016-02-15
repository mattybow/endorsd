var express = require('express');
import path         from 'path';
import favicon      from 'serve-favicon';
import logger       from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser   from 'body-parser';
// import passport     from 'passport';
// import { Strategy } from 'passport-twitter';
// import session      from 'express-session';
// const MongoStore = require('connect-mongo')(session);

import routes from './routes/index';
import api from './routes/api';
// import auth from './routes/auth';
// import mongodb from './mongoAccess';

const isProduction = process.env.NODE_ENV === 'production';

// //AUTH STUFF
// const callbackBaseUrl = isProduction ? "http://endorsement-data.mattbow.com/" : "http://localhost:3000/";
// passport.use(new Strategy({
//     consumerKey: process.env.CONSUMER_KEY,
//     consumerSecret: process.env.CONSUMER_SECRET,
//     callbackURL: `${callbackBaseUrl}auth/twitter/return`
//   },
//   function(token, tokenSecret, profile, next) {
//     // In this example, the user's Twitter profile is supplied as the user
//     // record.  In a production-quality application, the Twitter profile should
//     // be associated with a user record in the application's database, which
//     // allows for account linking and authentication with other identity
//     // providers.
//     const {username} = profile;
//     mongodb.twWhitelist.findOne({username}, (err, doc) => {
//       console.log({username}, err,doc)
//       if(doc){
//         return next(null, profile);
//       } else {
//         console.log(err);
//         return next(null, false, {message:'not authorized'});
//       }
//     });
//   }));
// passport.serializeUser(function(user, cb) {
//   cb(null, user);
// });
//
// passport.deserializeUser(function(obj, cb) {
//   cb(null, obj);
// });

var app = express();
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true,
//   store: new MongoStore({db:mongodb})
// }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use('/static', express.static(path.join(__dirname, '../dist')));

//SERVER ROUTING
app.use('/', routes);
app.use('/api', api);
//app.use('/auth', auth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') !== 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.send(JSON.stringify(err));
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send(JSON.stringify(err));
});


module.exports = app;
