'use strict';

const path       = require('path')
    , bodyParser = require('body-parser')
    , passport   = require('passport')
    , session    = require('express-session')
    , config     = require('./environment')();

const secret = config.sessionSecret;

module.exports = (app, express) => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static(path.join(config.root, 'client/public')));

  app.use(session({ secret: secret, resave: true, saveUninitialized: false }));
  app.use(passport.initialize());
  app.use(passport.session());

  require('../auth/passport')(passport);
  require('../routes')(app);

  app.use(function(err, req, res, next) {
    console.error(err);
    res.status(500).send('server error');
  });
}
