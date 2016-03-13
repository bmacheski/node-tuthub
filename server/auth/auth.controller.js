'use strict'

const User = require('../models/user.model')

const AuthController = {}

AuthController.login = (req, res) => {
  res.cookie('email', req.body.email)
  res.send({ message: 'Login success.' })
}

AuthController.logout = (req, res) => {
  req.session.regenerate(function(err) {
    if (err) throw err
    else {
      res.clearCookie('email')
      res.send({ message: 'Logout successful.' })
    }
  })
}

AuthController.register = (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) throw err
    if (err) res.send({ message: 'That email already exists.' })
    else {
      User.create(req.body, (err) => {
        if (err) throw err
        res.cookie('email', req.body.email)
        res.send({ message: 'User registered succesfully.' })
      })
    }
  })
}

module.exports = AuthController
