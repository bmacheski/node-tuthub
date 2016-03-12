'use strict'

const express = require('express')
  , mongoose  = require('mongoose')
  , app       = express()
  , config    = require('./config/development.config')

mongoose.connect(config.dbUrl)

const port = process.env.PORT || 3000
const server = app.listen(port, () => console.log('✔ Server listening on port:', port))

require('./config/server.config.js')(app, express)
