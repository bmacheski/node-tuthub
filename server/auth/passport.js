'use strict';

const LocalStrategy = require('passport-local').Strategy
    , User          = require('../models/user.model');

module.exports = (passport) => {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function(id, done) {
    User
      .findById(id, function(err, user) {
        done(err, user);
      })
  })

  passport.use(new LocalStrategy({ usernameField: 'username' },
    (username, password, done) => {
      User
        .findOne({ username: username }, (err, user) => {
          if (err) { return done(err); }

          if (user) {
            user.validatePassword(password, (err, valid) => {
              if (err) { return done(err); }
              if (valid) { return done(null, user); }

              else { done(); }
            })
          } else { done(); }
        })
    }
  ))
}
