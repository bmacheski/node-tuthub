'use strict'

const User = require('../models/user.model')

const AuthController = {}

AuthController.login = (req, res) => {
  res.cookie('username', req.body.username)
  res.send({ message: 'Login success.' })
}

AuthController.logout = (req, res) => {
  req.session.regenerate(function(err) {
    if (err) throw err
    else {
      res.clearCookie('username')
      res.send({ message: 'Logout successful.' })
    }
  })
}

AuthController.register = (req, res) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if (err) throw err
    if (user) { res.sendStatus(403) }
    else {
      User.create(req.body, (err) => {
        if (err) throw err
        res.cookie('username', req.body.username)
        res.send({ message: 'User registered succesfully.' })
      })
    }
  })
}

module.exports = AuthController
