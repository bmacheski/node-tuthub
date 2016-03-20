'use strict';

const User = require('../models/user.model');

const AuthController = {};

AuthController.login = (req, res) => {
  res.cookie('username', req.body.username);
  res.sendStatus(200);
}

AuthController.logout = (req, res) => {
  req.session.regenerate(function(err) {
    if (err) { return done(err); }

    else {
      res.clearCookie('username');
      res.send({ message: 'Logout successful.' });
    }
  })
}

AuthController.register = (req, res) => {
  User
    .findOne({ username: req.body.username }, (err, user) => {
      if (err) { return done(err); }
      if (user) { res.sendStatus(403); }
      else {
        User
          .create(req.body, (err) => {
            if (err) { return done(err); }
            res.cookie('username', req.body.username);
            res.send({ message: 'User registered succesfully.' });
          })
      }
  })
}

module.exports = AuthController;
