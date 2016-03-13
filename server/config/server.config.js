'use strict'

const path       = require('path')
    , bodyParser = require('body-parser')
    , passport   = require('passport')
    , session    = require('express-session')
    , config     = require('./development.config')

const SESSION_SECRET = process.env.SESSION_SECRET || 'supersecret'

module.exports = (app, express) => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.join(config.root, 'client/public')))

  app.use(session({ secret: SESSION_SECRET }))
  app.use(passport.initialize())
  app.use(passport.session())

  require('../auth/passport')(passport)
  require('../routes')(app)
}
