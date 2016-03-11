'use strict'

const path     = require('path')
  , bodyParser = require('body-parser')
  , config     = require('./development.config')

module.exports = (app, express) => {

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))
  app.use(express.static(path.join(config.root, 'client/public')))

  require('./routes')(app)
}
